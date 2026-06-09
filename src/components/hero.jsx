import { Download } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skills = [
    "ReactJS",
    "TailwindCSS",
    "NodeJS",
    "ExpressJS",
    "TypeScript",
    "NextJS",
    "React Native",
    "Kotlin",
    "Flutter",
    "AWS",
  ];
  const [displayedSkills, setDisplayedSkills] = useState(skills.slice(0, 3));

  useEffect(() => {
    setIsVisible(true);

    // Rotate skills every 3 seconds
    const interval = setInterval(() => {
      const startIndex = Math.floor(Math.random() * (skills.length - 3));
      setDisplayedSkills(skills.slice(startIndex, startIndex + 3));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Function to handle CV download
  const handleDownloadCV = () => {
    // Replace this URL with the actual path to your CV file
    const cvUrl = "/img/CV_Muhammad Daffa Malik_2026.pdf";

    // Create an anchor element and trigger download
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "CV_Muhammad Daffa Malik_2026.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to scroll to portfolio section
  const handleViewProjects = () => {
    // Find the portfolio section element
    const portfolioSection = document.getElementById("portfolio");

    // Scroll to the portfolio section with smooth behavior
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback if element not found - just scroll by ID
      window.location.hash = "portofolio";
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden transition-colors duration-300">
      {/* Animated particles background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-lime-400/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-100/80 to-gray-50 dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-900 opacity-90 transition-colors duration-300"></div>

      {/* Content container */}
      <div className="relative z-10 max-w-6xl w-full px-4 mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Main hero content */}
        <div
          className={`text-left transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-2 flex items-center">
            <div className="h-1 w-12 bg-lime-500 mr-4"></div>
            <p className="text-lime-600 dark:text-lime-400 font-medium text-sm tracking-widest transition-colors duration-300">
              WELCOME TO MY PORTFOLIO
            </p>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight text-gray-900 dark:text-white transition-colors duration-300">
            I&apos;m{" "}
            <span className="text-lime-500 dark:text-lime-400 relative transition-colors duration-300">
              Muhammad Daffa
              <span className="absolute -bottom-2 left-0 h-1 w-full bg-lime-400/30"></span>
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl text-gray-800 dark:text-white font-bold mb-6 transition-colors duration-300">
            Full Stack Developer
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md transition-colors duration-300">
            Passionate about creating beautiful, functional, and user-friendly
            applications with modern technologies.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleDownloadCV}
              className="bg-lime-500 hover:bg-lime-600 text-white dark:text-gray-900 font-bold py-3 px-6 rounded-md flex items-center gap-2 transition-all duration-300 shadow-lg shadow-lime-500/30"
            >
              Download CV
              <Download size={18} />
            </button>

            <button
              onClick={handleViewProjects}
              className="border-2 border-lime-500/50 dark:border-lime-400/30 hover:border-lime-600 dark:hover:border-lime-400 text-gray-700 dark:text-white hover:text-lime-600 dark:hover:text-lime-400 font-bold py-3 px-6 rounded-md transition-all duration-300"
            >
              View Projects
            </button>
          </div>
        </div>

        {/* Person image container with overlay */}
        <div className="relative hidden md:block h-full">
          <div
            className={`relative z-10 transition-all duration-1000 delay-300 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full border-2 border-dashed border-lime-400/30 dark:border-lime-400/20 animate-spin-slow"></div>
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full border-2 border-dashed border-lime-400/30 dark:border-lime-400/20 animate-spin-slow"></div>

            <img
              src="/img/foto-ghibli.png"
              alt="Muhammad Daffa"
              className="h-auto max-h-[550px]  object-cover object-top z-20 relative"
            />

            <div className="absolute -bottom-8 -left-8 rotate-6 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-5 rounded-lg shadow-xl border-t border-gray-100 dark:border-gray-700 w-64 transform transition-all duration-500 hover:rotate-0 hover:scale-105">
              <p className="text-lime-600 dark:text-lime-400 font-medium mb-3 flex items-center gap-2 transition-colors duration-300">
                <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></span>
                MY EXPERTISE
              </p>

              {displayedSkills.map((skill, index) => (
                <p
                  key={index}
                  className="text-gray-800 dark:text-white text-sm mb-1 transition-colors duration-300"
                >
                  {skill}
                </p>
              ))}

              <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 transition-colors duration-300">
                {skills.length - 3}+ more
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile image - only visible on mobile */}
      <div className="absolute  bottom-0 left-1/2 transform -translate-x-1/2 z-0 md:hidden">
        <img
          src="/img/foto-ghibli.png"
          alt="Muhammad Daffa"
          className="h-72  hidden object-cover object-top"
        />
      </div>
    </div>
  );
};

export default Hero;
