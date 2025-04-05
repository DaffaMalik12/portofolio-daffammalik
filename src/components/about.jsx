import { useEffect, useState } from "react";
import { gsap } from "gsap";

function ComponentsAbout() {
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    // Timeline GSAP untuk animasi yang lebih terkoordinasi
    const tl = gsap.timeline();

    tl.fromTo(
      ".profile-blob",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.8, ease: "elastic.out(1, 0.5)" }
    )
      .fromTo(
        ".profile-image",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=1.4"
      )
      .fromTo(
        ".heading-highlight",
        { width: 0 },
        { width: "100%", duration: 1, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(
        ".about-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=1"
      )
      .fromTo(
        ".about-text p",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        ".social-icons-container",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        ".social-icon",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(2)",
        },
        "-=0.6"
      );

    // Cleanup
    return () => tl.kill();
  }, []);

  // Data sosial media
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/muhamad_daffa_malik/",
      color: "from-purple-500 to-pink-500",
      icon: (
        <svg
          role="img"
          width={22}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/daffa.malik.5055/",
      color: "from-blue-600 to-blue-400",
      icon: (
        <svg
          role="img"
          width={22}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.158 11.86v-8.385h-3.054v-3.475h3.054v-2.567c0-3.027 1.785-4.686 4.523-4.686 1.314 0 2.678.247 2.678.247v3.39h-1.5c-1.5 0-1.95.932-1.95 1.878v2.511h3.9l-.5 3.475h-3.4v8.385c5.771-.906 10.158-5.87 10.158-11.86z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@dfhv123?lang=en",
      color: "from-black to-gray-800",
      icon: (
        <svg
          role="img"
          width={22}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/DaffaMalik12",
      color: "from-gray-800 to-gray-600",
      icon: (
        <svg
          role="img"
          width={22}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/muhammad-daffa-malik-akram/",
      color: "from-blue-700 to-blue-500",
      icon: (
        <svg
          role="img"
          width={22}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Card style container with glass effect */}
        <div className="relative rounded-3xl overflow-hidden backdrop-blur-sm bg-white/10 dark:bg-gray-900/40 shadow-2xl">
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-lime-300/20 blur-3xl"></div>
            <div className="absolute top-40 -right-20 w-80 h-80 rounded-full bg-lime-500/10 blur-3xl"></div>
            <div className="absolute -bottom-40 left-1/3 w-72 h-72 rounded-full bg-blue-300/10 blur-3xl"></div>
          </div>

          {/* Content container */}
          <div className="relative z-10 p-6 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Profile image section - enhanced */}
              <div className="w-full lg:w-1/2 relative flex justify-center">
                <div className="relative">
                  {/* Background blob with animation */}
                  <div className="absolute -z-10 inset-0 profile-blob">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-lime-300 to-lime-500 blur-2xl opacity-30 transform translate-x-10 -translate-y-10"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gradient-to-tr from-sky-300 to-blue-500 blur-2xl opacity-20 transform -translate-x-10 translate-y-10"></div>
                  </div>

                  {/* Decorative ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-lime-400/40 animate-spin-slow"></div>

                  {/* Image container with advanced effects */}
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl profile-image">
                    {/* Border glow effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-lime-300 z-20 pointer-events-none"></div>

                    {/* Actual image */}
                    <img
                      src="img/foto-daffa-2.jpg"
                      alt="Daffa Malik"
                      className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-lime-400/30 via-transparent to-transparent"></div>
                  </div>
                </div>

                {/* Experience badge */}
                <div className="absolute bottom-0 right-0 lg:bottom-10 lg:right-10 bg-gradient-to-r from-lime-400 to-lime-500 text-white px-4 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                  <span className="font-bold">Fullstack Developer</span>
                </div>
              </div>

              {/* About text content - enhanced */}
              <div className="w-full lg:w-1/2 about-text">
                <div className="relative inline-block mb-6">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 pb-2 dark:text-white about-title">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-lime-600">
                      About Me
                    </span>
                  </h3>
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-lime-400 to-lime-600 rounded-full heading-highlight"></div>
                </div>

                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                  }}
                  className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-6"
                >
                  Welcome to my online portfolio! I am a student of UIN JAKARTA
                  who is passionate about web and mobile development. On this
                  website, I share my projects in both web and mobile app
                  development.
                </p>

                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                  }}
                  className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-6"
                >
                  With my educational background in computer science and my
                  passion for designing and building engaging applications, I
                  hope you can find inspiration and see my growth as a web and
                  mobile developer.
                </p>

                {/* Social icons with brand colors */}
                <div className="social-icons-container">
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Connect With Me
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className="social-icon group relative"
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(null)}
                        aria-label={social.name}
                      >
                        <div
                          className={`
                          w-12 h-12 flex items-center justify-center rounded-xl 
                          transition-all duration-300 transform
                          ${
                            hovered === index
                              ? "bg-gradient-to-br " +
                                social.color +
                                " text-white scale-110 shadow-lg"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                          }
                        `}
                        >
                          <div
                            className={`transition-transform duration-300 ${
                              hovered === index ? "scale-110" : ""
                            }`}
                          >
                            {social.icon}
                          </div>
                        </div>
                        {/* Tooltip */}
                        <div
                          className={`
                          absolute -top-10 left-1/2 transform -translate-x-1/2 
                          px-3 py-1 rounded-md text-xs font-medium text-white
                          bg-gray-800 dark:bg-gray-700
                          transition-all duration-200
                          ${
                            hovered === index
                              ? "opacity-100 -translate-y-0"
                              : "opacity-0 translate-y-2 pointer-events-none"
                          }
                        `}
                        >
                          {social.name}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800 dark:bg-gray-700"></div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Custom CSS class for slow spinning animation
const style = document.createElement("style");
style.textContent = `
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
`;
document.head.appendChild(style);

export default ComponentsAbout;
