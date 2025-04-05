import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const portfolioItems = [
    {
      id: 1,
      image: "/img/web-1.png",
      title: "Website Ekstrakurikuler Rohis SMPN 189 Jakarta",
      desc: "Sebuah situs web untuk ekstrakurikuler Rohis di SMPN 189 Jakarta yang memungkinkan siswa untuk mengakses informasi terkait kegiatan, jadwal, dan kegiatan lainnya.",
      tags: ["React", "Tailwind CSS", "Firebase"],
      link: "#",
      category: "web",
    },
    {
      id: 2,
      image: "/img/web-2.png",
      title: "Article Website",
      desc: "Sebuah platform berbasis web untuk artikel, tempat para penulis dapat mempublikasikan konten mereka. Situs ini memungkinkan pembaca untuk mengakses artikel terbaru dan mencari berdasarkan kategori.",
      tags: ["Next.js", "MongoDB", "Express"],
      link: "#",
      category: "web",
    },
    {
      id: 3,
      image: "/img/android-1.png",
      title: "Aplikasi Absensi",
      desc: "Aplikasi mobile berbasis Android yang memudahkan pencatatan absensi. Pengguna dapat memonitor kehadiran siswa atau karyawan, serta menghasilkan laporan absensi.",
      tags: ["React Native", "Firebase", "Redux"],
      link: "#",
      category: "mobile",
    },
    {
      id: 4,
      image: "/img/web-3-final.png",
      title: "Website Ticket Konser",
      desc: "Sebuah situs web untuk menjual tiket konser dan acara musik lainnya. Dirancang untuk memberikan pengalaman pengguna yang mudah dalam memilih, membeli, dan mencetak tiket.",
      tags: ["Vue.js", "Node.js", "MySQL"],
      link: "#",
      category: "web",
    },
    {
      id: 5,
      image: "/img/android-2.png",
      title: "Notes App React Native",
      desc: "Aplikasi mobile yang dikembangkan menggunakan React Native untuk membantu pengguna mencatat ide, tugas, dan catatan penting lainnya. Dengan fitur sinkronisasi data dan antarmuka yang user-friendly.",
      tags: ["React Native", "Redux", "AsyncStorage"],
      link: "#",
      category: "mobile",
    },
    {
      id: 6,
      image: "/img/dashboars-absen.png",
      title: "Dashboard Absensi SMP Negeri 189 Jakarta",
      desc: "Sebuah sistem dashboard berbasis web untuk mengelola absensi di SMP Negeri 189 Jakarta. Memberikan antarmuka yang intuitif untuk guru dan administrasi untuk memantau kehadiran siswa.",
      tags: ["React", "Chart.js", "Material UI"],
      link: "#",
      category: "web",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const filterRef = useRef(null);
  const projectsRef = useRef([]);
  const timelineRef = useRef(null);

  // Function to handle hover effects programmatically
  const handleProjectHover = (index, isEnter) => {
    if (projectsRef.current[index]) {
      gsap.to(projectsRef.current[index].querySelector(".project-image"), {
        scale: isEnter ? 1.1 : 1,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(projectsRef.current[index].querySelector(".overlay"), {
        opacity: isEnter ? 1 : 0,
        duration: 0.3,
      });

      gsap.to(projectsRef.current[index].querySelector(".project-button"), {
        y: isEnter ? 0 : 20,
        opacity: isEnter ? 1 : 0,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    }
  };

  useEffect(() => {
    // Create a timeline for staggered animations
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    // Animation for the title
    mainTimeline.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
      }
    );

    // Animation for filters
    mainTimeline.fromTo(
      filterRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
      },
      "-=0.5"
    );

    // Animation for timeline
    if (timelineRef.current) {
      mainTimeline.fromTo(
        timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.inOut",
          transformOrigin: "top",
        },
        "-=0.3"
      );
    }

    // Create individual animations for each project with scroll triggers
    projectsRef.current.forEach((project, index) => {
      // Don't add these to the main timeline - use separate scroll triggers
      if (!project) return;

      const direction = index % 2 === 0 ? -30 : 30;

      gsap.set(project, {
        opacity: 0,
        x: direction,
      });

      ScrollTrigger.create({
        trigger: project,
        start: "top 80%",
        onEnter: () => {
          gsap.to(project, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          });

          // Animate timeline dots
          const dot = project.querySelector(".timeline-dot");
          if (dot) {
            gsap.fromTo(
              dot,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                delay: 0.3,
                ease: "back.out(1.7)",
              }
            );
          }

          const year = project.querySelector(".year-label");
          if (year) {
            gsap.fromTo(
              year,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4, delay: 0.5 }
            );
          }
        },
        once: true,
      });
    });

    // Create a floating animation for the background particles
    const particlesContainer = sectionRef.current.querySelector(".particles");
    if (particlesContainer) {
      gsap.to(particlesContainer.children, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        opacity: "random(0.1, 0.6)",
        scale: "random(0.8, 1.2)",
        duration: 4,
        stagger: 0.01,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Add hover animations for the "View All Projects" button
    const viewAllButton = sectionRef.current.querySelector(".view-all-button");
    if (viewAllButton) {
      viewAllButton.addEventListener("mouseenter", () => {
        gsap.to(viewAllButton, {
          scale: 1.05,
          boxShadow: "0 8px 25px rgba(132, 204, 22, 0.4)",
          duration: 0.3,
        });
      });

      viewAllButton.addEventListener("mouseleave", () => {
        gsap.to(viewAllButton, {
          scale: 1,
          boxShadow: "0 4px 15px rgba(132, 204, 22, 0.2)",
          duration: 0.3,
        });
      });
    }

    // Clean up animations
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      const ctx = gsap.context(() => {}, sectionRef);
      ctx.revert();
    };
  }, [activeFilter]);

  const handleFilterChange = (filter) => {
    // First fade out existing projects
    gsap.to(projectsRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        // Change the filter
        setActiveFilter(filter);

        // Reset the refs array for the new filtered items
        projectsRef.current = [];

        // Allow DOM to update before animating in new items
        setTimeout(() => {
          document.querySelectorAll(".project-card").forEach((el, i) => {
            projectsRef.current[i] = el;

            // Animate new items in
            gsap.fromTo(
              el,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: i * 0.1,
                ease: "power2.out",
              }
            );
          });
        }, 100);
      },
    });
  };

  return (
    <section
      id="portofolio"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
    >
      {/* Modern animated background with particles and gradient mesh */}
      <div className="absolute inset-0 z-0">
        {/* Abstract gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(132,204,22,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(234,179,8,0.15),transparent_70%)]"></div>

        {/* Modern grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Animated particles - reduced for mobile */}
        <div className="particles absolute inset-0 overflow-hidden">
          {Array.from({ length: 80 }).map((_, index) => (
            <div
              key={index}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 1 + "px",
                height: Math.random() * 4 + 1 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                backgroundColor:
                  index % 5 === 0
                    ? "#84cc16"
                    : index % 7 === 0
                    ? "#eab308"
                    : index % 3 === 0
                    ? "#10b981"
                    : "#6366f1",
                opacity: Math.random() * 0.5 + 0.1,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Glowing Orbs - adjusted positioning for mobile */}
      <div className="absolute top-1/4 -left-24 w-64 md:w-96 h-64 md:h-96 bg-lime-500 rounded-full filter blur-[120px] md:blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-24 w-64 md:w-96 h-64 md:h-96 bg-yellow-500 rounded-full filter blur-[120px] md:blur-[150px] opacity-10 animate-pulse-slower"></div>
      <div
        className="absolute top-3/4 left-1/4 w-48 md:w-64 h-48 md:h-64 bg-indigo-500 rounded-full filter blur-[100px] md:blur-[120px] opacity-10 animate-pulse-slow"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12 md:mb-20" ref={titleRef}>
          <div className="inline-block mb-2">
            <span className="text-xs md:text-sm font-medium text-transparent bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text uppercase tracking-wider px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-lime-500/20 backdrop-blur-sm">
              Top Projects
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white">
            Featured{" "}
            <span className="text-transparent bg-gradient-to-r from-lime-400 via-lime-300 to-yellow-400 bg-clip-text">
              Work
            </span>
          </h2>
          <div className="w-24 md:w-32 h-1.5 mx-auto bg-gradient-to-r from-lime-400 to-yellow-400 rounded-full mb-6 md:mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-yellow-500 animate-pulse-slow"></div>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg px-2">
            Showcase of my recent projects and creative work that demonstrates
            my skills and expertise in web and mobile development.
          </p>
        </div>

        {/* Mobile-friendly Filters - scrollable on small screens */}
        <div
          className="flex justify-center mb-10 md:mb-16 overflow-x-auto pb-2 scrollbar-hide"
          ref={filterRef}
        >
          <div className="flex gap-1 md:gap-2 p-1 md:p-1.5 rounded-full bg-gray-800/50 backdrop-blur-md border border-white/5 shadow-lg whitespace-nowrap">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-lime-500 to-lime-400 text-gray-900 shadow-md shadow-lime-500/20"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => handleFilterChange("web")}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeFilter === "web"
                  ? "bg-gradient-to-r from-lime-500 to-lime-400 text-gray-900 shadow-md shadow-lime-500/20"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Web Development
            </button>
            <button
              onClick={() => handleFilterChange("mobile")}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeFilter === "mobile"
                  ? "bg-gradient-to-r from-lime-500 to-lime-400 text-gray-900 shadow-md shadow-lime-500/20"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Mobile Apps
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Timeline dotted line - visible only on md screens and up */}
          <div
            ref={timelineRef}
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-px z-0 hidden md:block"
            style={{
              background:
                "linear-gradient(to bottom, rgba(132, 204, 22, 0.5) 50%, transparent 50%)",
              backgroundSize: "2px 12px",
              boxShadow: "0 0 8px rgba(132, 204, 22, 0.3)",
            }}
          ></div>

          <div className="space-y-12 md:space-y-20 relative z-10">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`project-card flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8 md:gap-12 relative`}
                ref={(el) => (projectsRef.current[index] = el)}
                onMouseEnter={() => handleProjectHover(index, true)}
                onMouseLeave={() => handleProjectHover(index, false)}
              >
                {/* Timeline dot and year - visible only on md screens and up */}
                <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full z-20 hidden md:flex items-center justify-center bg-gray-800/80 backdrop-blur-md border border-lime-500/30 shadow-lg shadow-lime-500/20">
                  <div className="w-6 h-6 bg-gradient-to-br from-lime-400 to-yellow-400 rounded-full glow-effect"></div>
                </div>
                <div
                  className={`year-label absolute top-0 ${
                    index % 2 === 0
                      ? "md:right-1/2 md:mr-16"
                      : "md:left-1/2 md:ml-16"
                  } font-mono text-xl bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-yellow-400 font-bold hidden md:block`}
                >
                  {item.year}
                </div>

                {/* Project Card with improved mobile styling */}
                <div className="w-full md:w-5/12 group">
                  <div className="bg-gray-800/30 backdrop-blur-xl rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/5 h-full transform hover:-translate-y-1 md:hover:-translate-y-2 hover:border-lime-500/20">
                    <div className="relative overflow-hidden h-48 md:h-64">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="project-image w-full h-full object-cover object-top transition-transform duration-700"
                      />
                      <div className="overlay absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent opacity-50 md:opacity-0 transition-opacity duration-300 flex items-center justify-center">
                        <a
                          href={item.link}
                          className="project-button px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-lime-500 to-yellow-500 text-gray-900 font-medium rounded-full transition-all duration-300 transform md:translate-y-20 opacity-100 md:opacity-0 hover:shadow-lg hover:shadow-lime-500/30 flex items-center group"
                        >
                          View Project
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 md:h-5 md:w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <div className="p-5 md:p-8 flex flex-col">
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div className="text-transparent bg-gradient-to-r from-lime-400 to-yellow-400 bg-clip-text text-xs md:text-sm font-mono block md:hidden">
                          {item.year}
                        </div>
                        <div className="flex items-center">
                          {item.category === "web" ? (
                            <span className="flex items-center text-xs font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-gray-700/50 text-lime-300 border border-lime-500/20">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                                />
                              </svg>
                              Web App
                            </span>
                          ) : (
                            <span className="flex items-center text-xs font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-gray-700/50 text-lime-300 border border-lime-500/20">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                              Mobile App
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-lime-400 group-hover:to-yellow-400 group-hover:bg-clip-text transition-all duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 flex-grow line-clamp-3 md:line-clamp-none">
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
                        {item.tags.slice(0, 4).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 md:px-3 py-0.5 md:py-1 text-xs font-medium rounded-full bg-gray-800/70 text-lime-300 border border-lime-500/10 hover:border-lime-500/30 transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 4 && (
                          <span className="px-2 md:px-3 py-0.5 md:py-1 text-xs font-medium rounded-full bg-gray-800/70 text-lime-300">
                            +{item.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty space for alternate layout */}
                <div className="w-full md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16 md:mt-24">
          <a
            href="/projects"
            className="view-all-button inline-flex items-center px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-lime-500 to-yellow-500 text-gray-900 font-medium rounded-full transition-all duration-300 shadow-md shadow-lime-500/20 group hover:shadow-xl hover:shadow-lime-500/30 text-sm md:text-base"
          >
            View All Projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
        }

        @keyframes pulse-slow {
          0% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.1;
          }
        }

        @keyframes pulse-slower {
          0% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.15;
          }
          100% {
            opacity: 0.1;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s infinite ease-in-out;
        }

        .animate-pulse-slower {
          animation: pulse-slower 8s infinite ease-in-out;
        }

        .glow-effect {
          box-shadow: 0 0 10px rgba(132, 204, 22, 0.5),
            0 0 20px rgba(132, 204, 22, 0.3), 0 0 30px rgba(132, 204, 22, 0.1);
        }
      `}</style>
    </section>
  );
}

export default Portfolio;
