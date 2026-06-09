import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Achievement() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const achievements = [
    {
      title: "Software Engineer - PT Emas Perak Indonesia",
      description:
        "Working full-time as a Software Engineer handling the Order Management System project.",
      date: "Present",
      icon: "💻",
      color: "bg-blue-500",
    },
    {
      title: "Junior Software Engineer - Wintech",
      description:
        "Worked full-time developing and managing the Warehouse Management System project.",
      date: "Full-time",
      icon: "⚙️",
      color: "bg-indigo-500",
    },
    {
      title: "Internship - Pusat Pengembangan Bahasa",
      description:
        "Completed a 1-year internship developing the company profile and TOAFL application.",
      date: "1 Year",
      icon: "🌐",
      color: "bg-teal-500",
    },
    {
      title: "Part Time - Programmers at Codingo Pte Ltd",
      description:
        "Developed a mobile application for a startup, focusing on user experience and performance optimization.",
      date: "March 2025 - Present",
      icon: "👩‍💻",
      color: "bg-red-500",
    },
    {
      title: "Internship - Mobile Developer at PT Kawan Kerja",
      description:
        "Developed a mobile application for job seekers and employers, enhancing user experience and functionality.",
      date: "March 2025 - September 2025",
      icon: "💼",
      color: "bg-lime-500",
    },
    {
      title: "Best Member in UI/UX Bootcamp",
      description:
        "Awarded as the Best Member in the UI/UX Bootcamp organized by the Google Developer Student Club at UIN Jakarta.",
      date: "August 2024",
      icon: "🏆",
      color: "bg-lime-500",
    },
    {
      title: "Assistant Lecturer - Programming",
      description:
        "Mentoring Fundamental Programming for 24nd batch students in Teknik Informatika Major",
      date: "2023 - 2024",
      icon: "👨‍🏫",
      color: "bg-purple-500",
    },
    {
      title: "Freelance Web and Android Developer",
      description:
        "Completed various freelance projects for clients, delivering high-quality web and mobile applications.",
      date: "2023 - Present",
      icon: "🚀",
      color: "bg-amber-500",
    },
    {
      title: "Head of Android Development - GDGoc UIN Jakarta",
      description: "Organized a Weekly Class for Android Development.",
      date: "2024",
      icon: "📱",
      color: "bg-orange-500",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reset",
        },
      });

      // Heading animations
      tl.fromTo(
        ".achievement-heading",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      // Description animations
      tl.fromTo(
        ".achievement-description",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );

      // Timeline animations
      tl.fromTo(
        ".timeline-line",
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 1.5, ease: "power1.inOut" },
        "-=0.4"
      );

      // Achievement items animations with stagger
      tl.fromTo(
        ".achievement-item",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15 },
        "-=1"
      );

      // Image animation
      tl.fromTo(
        ".achievement-img",
        { opacity: 0, x: 50, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1 },
        "-=1.5"
      );

      timelineRef.current = tl;
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      id="achievement"
      ref={sectionRef}
      className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white py-20 transition-colors duration-300"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="h-1 w-12 bg-lime-500 mx-auto mb-2"></div>
            <h4 className="text-lime-600 dark:text-lime-400 font-medium tracking-widest text-sm achievement-heading transition-colors duration-300">
              MY JOURNEY
            </h4>
          </div>
          <h1 className="text-5xl font-bold mb-6 achievement-heading transition-colors duration-300">
            Experience & Achievements
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto achievement-description transition-colors duration-300">
            Recognizing milestones and dedication through various achievements
            that have shaped my professional journey and contributed to my
            growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left Section - Content with Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-lime-500/30 dark:bg-lime-500/20 timeline-line"></div>

            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-item flex group">
                  <div className="relative flex-shrink-0 mr-6">
                    <div
                      className={`w-16 h-16 ${achievement.color} rounded-lg flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {achievement.icon}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-full bg-lime-500/30 dark:bg-lime-500/20 -z-10 group-last:hidden"></div>
                  </div>

                  <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-200 dark:border-gray-700 flex-1 hover:shadow-lg hover:shadow-lime-500/10 transition-all duration-300 hover:-translate-y-1 shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                        {achievement.title}
                      </h3>
                      {achievement.date && (
                        <span className="text-lime-600 dark:text-lime-400 text-sm font-medium bg-lime-500/10 px-3 py-1 rounded-full transition-colors duration-300 whitespace-nowrap ml-4">
                          {achievement.date}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Image and Stats */}
          <div className="relative lg:sticky lg:top-32">
            <div className="achievement-img relative z-10">
              <img
                src="/img/coding.png"
                alt="Achievement"
                className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-xl"
              />

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border-2 border-dashed border-lime-500/50 dark:border-lime-500/30 animate-spin-slow z-0"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full border-2 border-dashed border-lime-500/50 dark:border-lime-500/30 animate-spin-slow z-0"></div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4 mt-12">
              <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-lime-500/50 transition-all duration-300 hover:-translate-y-1 shadow-md">
                <h4 className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">Experience</h4>
                <p className="text-3xl font-bold text-lime-600 dark:text-lime-400 transition-colors duration-300">3+ Years</p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-lime-500/50 transition-all duration-300 hover:-translate-y-1 shadow-md">
                <h4 className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">Projects</h4>
                <p className="text-3xl font-bold text-lime-600 dark:text-lime-400 transition-colors duration-300">15+</p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-lime-500/50 transition-all duration-300 hover:-translate-y-1 shadow-md">
                <h4 className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">Clients</h4>
                <p className="text-3xl font-bold text-lime-600 dark:text-lime-400 transition-colors duration-300">10+</p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-lime-500/50 transition-all duration-300 hover:-translate-y-1 shadow-md">
                <h4 className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">Technologies</h4>
                <p className="text-3xl font-bold text-lime-600 dark:text-lime-400 transition-colors duration-300">12+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Achievement;
