import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ──────────────────────────────────────────────────────────────────
   DARK-MODE HOOK  (listens to Tailwind's `dark` class on <html>)
────────────────────────────────────────────────────────────────── */
function useDarkMode() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() =>
      setIsDark(el.classList.contains("dark"))
    );
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

/* ──────────────────────────────────────────────────────────────────
   DATA
────────────────────────────────────────────────────────────────── */
const ACHIEVEMENTS = [
  {
    id: 1, year: "2025 – Now",
    title: "Software Engineer", company: "PT Emas Perak Indonesia",
    desc: "Full-cycle development of an Order Management System — from architecture design to cloud deployment.",
    icon: "💻", tag: "Full-time", color: "#84cc16",
    lat: -6.2088, lng: 106.8456,
  },
  {
    id: 2, year: "2024",
    title: "Junior Software Engineer", company: "Wintech",
    desc: "Developed and maintained a Warehouse Management System serving enterprise logistics workflows.",
    icon: "⚙️", tag: "Full-time", color: "#6366f1",
    lat: -6.9175, lng: 107.6191,
  },
  {
    id: 3, year: "Mar–Sep 2025",
    title: "Mobile Developer Intern", company: "PT Kawan Kerja",
    desc: "Built a job-matching mobile app bridging seekers and employers across Indonesia.",
    icon: "💼", tag: "Internship", color: "#f97316",
    lat: -7.2575, lng: 112.7521,
  },
  {
    id: 4, year: "Mar 2025 – Now",
    title: "Part-Time Programmer", company: "Codingo Pte Ltd",
    desc: "Developed a startup mobile app focused on UX excellence and performance optimization.",
    icon: "👩‍💻", tag: "Part-time", color: "#ef4444",
    lat: 1.3521, lng: 103.8198,
  },
  {
    id: 5, year: "1 Year",
    title: "Web Developer Intern", company: "Pusat Pengembangan Bahasa",
    desc: "Built the company profile site and the TOAFL exam application end-to-end.",
    icon: "🌐", tag: "Internship", color: "#14b8a6",
    lat: -6.3728, lng: 106.8282,
  },
  {
    id: 6, year: "Aug 2024",
    title: "🏆 Best Member Award", company: "GDSC UIN Jakarta — UI/UX Bootcamp",
    desc: "Recognised for outstanding design thinking, collaboration, and delivery in the bootcamp cohort.",
    icon: "🏆", tag: "Award", color: "#eab308",
    lat: -6.3728, lng: 106.8282,
  },
  {
    id: 7, year: "2023–2024",
    title: "Assistant Lecturer", company: "Teknik Informatika · UIN Jakarta",
    desc: "Mentored 24th-batch students in Fundamental Programming, bridging theory with practice.",
    icon: "👨‍🏫", tag: "Academic", color: "#a855f7",
    lat: -6.3728, lng: 106.8282,
  },
  {
    id: 8, year: "2024",
    title: "Head of Android Dev", company: "GDGoC UIN Jakarta",
    desc: "Led a weekly Android class series mentoring 30+ members and growing the community.",
    icon: "📱", tag: "Leadership", color: "#22d3ee",
    lat: -6.3728, lng: 106.8282,
  },
  {
    id: 9, year: "2023 – Now",
    title: "Freelance Developer", company: "Web & Android · Indonesia",
    desc: "Delivered 15+ high-quality web and mobile projects across diverse industries.",
    icon: "🚀", tag: "Freelance", color: "#f59e0b",
    lat: -2.5, lng: 118.0,
  },
];

const STATS = [
  { value: "3+", label: "Years Exp." },
  { value: "15+", label: "Projects" },
  { value: "10+", label: "Clients" },
  { value: "12+", label: "Tech Stack" },
];

/* ──────────────────────────────────────────────────────────────────
   INDONESIA ISLAND OUTLINES  (simplified lat/lng polylines)
────────────────────────────────────────────────────────────────── */
// INDONESIA OUTLINES removed (we now use ThreeGlobe's high-res texture map where Indonesia is physical and clear)

/* ──────────────────────────────────────────────────────────────────
   GLOBE THEME PALETTES
────────────────────────────────────────────────────────────────── */
const GLOBE_THEME = {
  dark: {
    specular:    0x84cc16,
    atmos:       0x84cc16,
    ambLight:    0xffffff,
    ambI:        0.3,
    sunColor:    0x84cc16,
    sunI:        0.8,
    rimColor:    0x6366f1,
    rimI:        0.4,
  },
  light: {
    specular:    0x84cc16,
    atmos:       0x93c5fd,
    ambLight:    0xffffff,
    ambI:        0.7,
    sunColor:    0x84cc16,
    sunI:        0.6,
    rimColor:    0x6366f1,
    rimI:        0.2,
  },
};

/* ──────────────────────────────────────────────────────────────────
   GLOBE 3D COMPONENT (Powered by three-globe)
────────────────────────────────────────────────────────────────── */
function Globe3D({ activeId, achievements, isDark }) {
  const mountRef      = useRef(null);
  const rendererRef   = useRef(null);
  const globeRef      = useRef(null);
  const frameRef      = useRef(null);
  const isDragging    = useRef(false);
  const prevMouse     = useRef({ x: 0, y: 0 });
  const autoRotate    = useRef(true);

  /* ── Build scene once ── */
  useEffect(() => {
    const container = mountRef.current;
    const W = container.clientWidth;
    const H = container.clientHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.z = 270; // three-globe default radius is 100

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const T = isDark ? GLOBE_THEME.dark : GLOBE_THEME.light;

    const customMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: isDark ? 0x020202 : 0x101010,
      specular: new THREE.Color(T.specular),
      shininess: 25,
    });

    const globe = new ThreeGlobe()
      .showGlobe(true)
      .showAtmosphere(true)
      .atmosphereColor(new THREE.Color(T.atmos).getStyle())
      .atmosphereAltitude(0.15)
      .globeMaterial(customMat)
      .globeImageUrl(isDark ? '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg' : '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png');

    /* ── Achievement rings & pins ── */
    globe
      .ringsData(achievements)
      .ringLat('lat')
      .ringLng('lng')
      .ringColor('color')
      .ringMaxRadius(3.5)
      .ringPropagationSpeed(1.2)
      .ringRepeatPeriod(1000)
      .pointsData(achievements)
      .pointLat('lat')
      .pointLng('lng')
      .pointColor('color')
      .pointAltitude(0.01)
      .pointRadius(0.8);

    scene.add(globe);
    globeRef.current = globe;

    /* Lights */
    const ambLight = new THREE.AmbientLight(T.ambLight, T.ambI);
    ambLight.name = 'ambLight';
    scene.add(ambLight);
    const sun = new THREE.DirectionalLight(T.sunColor, T.sunI);
    sun.position.set(300, 200, 500);
    sun.name = 'sunLight';
    scene.add(sun);
    const rim = new THREE.DirectionalLight(T.rimColor, T.rimI);
    rim.position.set(-300, -100, -300);
    rim.name = 'rimLight';
    scene.add(rim);

    /* Animate loop */
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (autoRotate.current && globe) globe.rotation.y += 0.0025;
      renderer.render(scene, camera);
    };
    animate();

    /* Resize */
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    /* Drag */
    const onDown = (e) => {
      isDragging.current = true;
      autoRotate.current = false;
      prevMouse.current = { x: e.clientX ?? e.touches?.[0]?.clientX, y: e.clientY ?? e.touches?.[0]?.clientY };
    };
    const onMove = (e) => {
      if (!isDragging.current) return;
      const cx = e.clientX ?? e.touches?.[0]?.clientX;
      const cy = e.clientY ?? e.touches?.[0]?.clientY;
      const dx = cx - prevMouse.current.x;
      const dy = cy - prevMouse.current.y;
      if (globe) {
        globe.rotation.y += dx * 0.005;
        globe.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, globe.rotation.x + dy * 0.005));
      }
      prevMouse.current = { x: cx, y: cy };
    };
    const onUp = () => {
      isDragging.current = false;
      setTimeout(() => { autoRotate.current = true; }, 2500);
    };

    renderer.domElement.addEventListener("mousedown",  onDown);
    renderer.domElement.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mousemove",  onMove);
    window.addEventListener("touchmove",  onMove, { passive: true });
    window.addEventListener("mouseup",    onUp);
    window.addEventListener("touchend",   onUp);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize",     onResize);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("touchmove",  onMove);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("touchend",   onUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [achievements]);

  /* ── Theme update (no scene rebuild) ── */
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    const T = isDark ? GLOBE_THEME.dark : GLOBE_THEME.light;
    
    // Update textures dynamically
    globe.globeImageUrl(isDark ? '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg' : '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg');

    const mat = globe.globeMaterial();
    if (mat) {
      if (mat.color) mat.color.setHex(0xffffff);
      if (mat.emissive) mat.emissive.setHex(isDark ? 0x020202 : 0x101010);
      if (mat.specular) mat.specular.setHex(T.specular);
    }
    globe.atmosphereColor(new THREE.Color(T.atmos).getStyle());

    if (globe.parent) {
      const scene = globe.parent;
      const ambLight = scene.getObjectByName('ambLight');
      const sunLight = scene.getObjectByName('sunLight');
      const rimLight = scene.getObjectByName('rimLight');
      
      if (ambLight) {
        ambLight.color.setHex(T.ambLight);
        ambLight.intensity = T.ambI;
      }
      if (sunLight) {
        sunLight.color.setHex(T.sunColor);
        sunLight.intensity = T.sunI;
      }
      if (rimLight) {
        rimLight.color.setHex(T.rimColor);
        rimLight.intensity = T.rimI;
      }
    }
  }, [isDark]);

  /* ── Active pin highlight ── */
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    
    globe.pointColor(d => d.id === activeId ? '#ffffff' : d.color);
    globe.pointRadius(d => d.id === activeId ? 1.5 : 0.8);
    globe.ringColor(d => d.id === activeId ? '#ffffff' : d.color);
  }, [activeId, achievements]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
    />
  );
}

/* ──────────────────────────────────────────────────────────────────
   TIMELINE CARD
────────────────────────────────────────────────────────────────── */
function TimelineCard({ a, isActive, onClick, index, isDark }) {
  const cardBg    = isActive
    ? `linear-gradient(135deg, ${a.color}18, ${a.color}08)`
    : isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.03)";
  const cardBorder = isActive ? `${a.color}50` : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)";
  const textMain   = isActive ? (isDark ? "#fff" : "#111") : isDark ? "#d1d5db" : "#374151";

  return (
    <div
      className="timeline-item relative flex gap-4 cursor-pointer"
      onClick={() => onClick(a.id)}
    >
      {/* Node + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="relative w-10 h-10 rounded-full flex items-center justify-center text-lg z-10 flex-shrink-0 border-2 transition-all duration-400"
          style={{
            background: isActive
              ? `linear-gradient(135deg, ${a.color}, ${a.color}aa)`
              : isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            borderColor: isActive ? a.color : isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
            boxShadow: isActive ? `0 0 18px ${a.color}70, 0 0 36px ${a.color}25` : "none",
            transform: isActive ? "scale(1.15)" : "scale(1)",
          }}
        >
          {a.icon}
          {isActive && (
            <span className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ background: a.color }} />
          )}
        </div>
        {index < ACHIEVEMENTS.length - 1 && (
          <div
            className="w-px flex-1 mt-1 min-h-8 transition-all duration-300"
            style={{
              background: isActive
                ? `linear-gradient(to bottom, ${a.color}80, transparent)`
                : isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="mb-4 flex-1 rounded-xl border p-4 transition-all duration-300"
        style={{
          background: cardBg,
          borderColor: cardBorder,
          boxShadow: isActive ? `0 6px 28px -8px ${a.color}40` : "none",
        }}
      >
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <h3 className="text-sm font-bold leading-snug transition-colors" style={{ color: textMain }}>
              {a.title}
            </h3>
            <p className="text-[11px] font-semibold mt-0.5" style={{ color: a.color }}>
              {a.company}
            </p>
          </div>
          <span
            className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
            style={{
              background: `${a.color}18`, color: a.color,
              border: `1px solid ${a.color}35`,
            }}
          >
            {a.tag}
          </span>
        </div>

        {/* Expandable desc */}
        <div
          className="overflow-hidden transition-all duration-400"
          style={{ maxHeight: isActive ? "100px" : "0", opacity: isActive ? 1 : 0 }}
        >
          <p className={`text-[11px] leading-relaxed mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {a.desc}
          </p>
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-1 h-1 rounded-full" style={{ background: a.color }} />
          <span className={`text-[10px] font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            {a.year}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────────────────── */
export default function Achievement() {
  const sectionRef = useRef(null);
  const [activeId, setActiveId]   = useState(1);
  const isDark = useDarkMode();

  /* GSAP entrance */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".ach-header > *",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: ".ach-header", start: "top 85%" } });

      gsap.fromTo(".ach-globe-wrap",
        { opacity: 0, scale: 0.9, x: -40 },
        { opacity: 1, scale: 1, x: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: ".ach-globe-wrap", start: "top 82%" } });

      gsap.fromTo(".timeline-item",
        { opacity: 0, x: 32 },
        { opacity: 1, x: 0, stagger: 0.09, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: ".timeline-item", start: "top 85%" } });

      gsap.fromTo(".ach-stat",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "back.out(1.5)",
          scrollTrigger: { trigger: ".ach-stat", start: "top 88%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── theme-aware tokens ── */
  const bg          = isDark ? "bg-gray-950" : "bg-gray-50";
  const textMain    = isDark ? "text-white"  : "text-gray-900";
  const textMuted   = isDark ? "text-gray-400" : "text-gray-500";
  const statBg      = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const statBorder  = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)";
  const globeBg     = isDark
    ? "radial-gradient(ellipse at center, #0d1a0a 0%, #060b14 70%)"
    : "radial-gradient(ellipse at center, #dbeafe 0%, #e0f2fe 60%, #bfdbfe 100%)";
  const gridColor   = isDark ? "rgba(132,204,22,0.04)" : "rgba(99,102,241,0.06)";
  const blob1       = isDark ? "#84cc16" : "#84cc16";
  const blob2       = isDark ? "#6366f1" : "#6366f1";
  const sectionBg   = isDark
    ? "linear-gradient(to bottom, #030712, #0b1120, #030712)"
    : "linear-gradient(to bottom, #f8fafc, #eff6ff, #f8fafc)";

  const activeAch = ACHIEVEMENTS.find((x) => x.id === activeId);

  return (
    <section
      id="achievement"
      ref={sectionRef}
      className={`relative overflow-hidden ${bg} ${textMain} py-28 transition-colors duration-500`}
      style={{ background: sectionBg }}
    >
      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />
        <div className="absolute -top-40 left-0 w-[600px] h-[600px] rounded-full blur-[130px] opacity-20 dark:opacity-20"
          style={{ background: `radial-gradient(circle, ${blob1} 0%, transparent 70%)` }} />
        <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full blur-[110px] opacity-10 dark:opacity-15"
          style={{ background: `radial-gradient(circle, ${blob2} 0%, transparent 70%)` }} />
      </div>

      <div className="relative mx-auto px-6 lg:px-12 max-w-7xl">

        {/* ── Header ── */}
        <div className="ach-header text-center mb-16">
          <div
            className="inline-flex items-center gap-2.5 mb-5 border border-lime-500/25 text-lime-600 dark:text-lime-400 text-[11px] font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full"
            style={{ background: "rgba(132,204,22,0.07)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500" />
            </span>
            My Journey
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-5 leading-tight">
            <span className={textMain}>Experience </span>
            <span style={{
              background: "linear-gradient(135deg, #84cc16 0%, #4ade80 50%, #22d3ee 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              &amp; Achievements
            </span>
          </h2>

          <p className={`max-w-xl mx-auto text-base leading-relaxed ${textMuted}`}>
            Click any timeline entry to explore the story. Drag the globe to explore locations.
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {STATS.map((s) => (
            <div key={s.label} className="ach-stat text-center py-5 px-4 rounded-xl border"
              style={{ background: statBg, borderColor: statBorder }}>
              <p className="text-3xl font-black text-lime-500 dark:text-lime-400 tracking-tight">{s.value}</p>
              <p className={`text-xs uppercase tracking-widest mt-1 ${textMuted}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── 2-col layout ── */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left — Globe */}
          <div className="ach-globe-wrap lg:sticky lg:top-24">
            <div
              className="relative rounded-2xl overflow-hidden border"
              style={{
                height: "440px",
                background: globeBg,
                borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.15)",
              }}
            >
              <Globe3D activeId={activeId} achievements={ACHIEVEMENTS} isDark={isDark} />

              {/* Active info overlay */}
              {activeAch && (
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <div
                    className="rounded-xl border px-4 py-3 backdrop-blur-md transition-all duration-500"
                    style={{
                      background: isDark
                        ? `linear-gradient(135deg, ${activeAch.color}18, rgba(0,0,0,0.55))`
                        : `linear-gradient(135deg, ${activeAch.color}14, rgba(255,255,255,0.75))`,
                      borderColor: `${activeAch.color}40`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{activeAch.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold truncate ${textMain}`}>{activeAch.title}</p>
                        <p className="text-[10px] truncate" style={{ color: activeAch.color }}>
                          {activeAch.company}
                        </p>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: `${activeAch.color}20`, color: activeAch.color, border: `1px solid ${activeAch.color}40` }}>
                        {activeAch.tag}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Drag hint */}
              <div className={`absolute top-3 right-3 flex items-center gap-1 text-[9px] ${textMuted}`}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 9l7-7 7 7M5 15l7 7 7-7"/>
                </svg>
                Drag to rotate
              </div>

              {/* Indonesia label */}
              <div
                className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-bold uppercase tracking-wider"
                style={{ background: "rgba(132,204,22,0.1)", borderColor: "rgba(132,204,22,0.3)", color: "#84cc16" }}
              >
                🇮🇩 Indonesia highlighted
              </div>
            </div>

            <p className={`mt-2 text-center text-xs ${textMuted}`}>
              🌏 Locations span Indonesia &amp; beyond
            </p>
          </div>

          {/* Right — Timeline */}
          <div
            className="overflow-y-auto pr-1 timeline-scroll"
            style={{ maxHeight: "520px" }}
          >
            <div className="py-1">
              {ACHIEVEMENTS.map((a, i) => (
                <TimelineCard
                  key={a.id} a={a} index={i}
                  isActive={activeId === a.id}
                  onClick={setActiveId}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-20 flex items-center justify-center gap-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-lime-500/30" />
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-lime-500/25"
            style={{ background: "rgba(132,204,22,0.06)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
            <span className={`text-xs font-medium ${textMuted}`}>Open to new opportunities</span>
          </div>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-lime-500/30" />
        </div>

      </div>
    </section>
  );
}
