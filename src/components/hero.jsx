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
    const cvUrl = "/img/CV_DeVeloper_Muhammad Daffa Malik.pdf";

    // Create an anchor element and trigger download
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "MuhammadDaffa-CV.pdf";
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
    <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800/80 to-gray-900 opacity-90"></div>

      {/* Content container */}
      <div className="relative z-10 max-w-6xl w-full px-4 mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Main hero content */}
        <div
          className={`text-left transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-2 flex items-center">
            <div className="h-1 w-12 bg-lime-400 mr-4"></div>
            <p className="text-lime-400 font-medium text-sm tracking-widest">
              WELCOME TO MY PORTFOLIO
            </p>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            I&apos;m{" "}
            <span className="text-lime-400 relative">
              Muhammad Daffa
              <span className="absolute -bottom-2 left-0 h-1 w-full bg-lime-400/30"></span>
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl text-white font-bold mb-6">
            Full Stack Developer
          </h2>

          <p className="text-gray-300 mb-8 max-w-md">
            Passionate about creating beautiful, functional, and user-friendly
            applications with modern technologies.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleDownloadCV}
              className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-bold py-3 px-6 rounded-md flex items-center gap-2 transition-all duration-300 shadow-lg shadow-lime-400/20"
            >
              Download CV
              <Download size={18} />
            </button>

            <button
              onClick={handleViewProjects}
              className="border-2 border-lime-400/30 hover:border-lime-400 text-white hover:text-lime-400 font-bold py-3 px-6 rounded-md transition-all duration-300"
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
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full border-2 border-dashed border-lime-400/20 animate-spin-slow"></div>
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full border-2 border-dashed border-lime-400/20 animate-spin-slow"></div>

            <img
              src="/img/foto-ghibli.png"
              alt="Muhammad Daffa"
              className="h-auto max-h-[550px]  object-cover object-top z-20 relative"
            />

            <div className="absolute -bottom-8 -left-8 rotate-6 z-30 bg-gray-800/90 backdrop-blur-lg p-5 rounded-lg shadow-xl border-t border-gray-700 w-64 transform transition-all duration-500 hover:rotate-0 hover:scale-105">
              <p className="text-lime-400 font-medium mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
                MY EXPERTISE
              </p>

              {displayedSkills.map((skill, index) => (
                <p key={index} className="text-white text-sm mb-1">
                  {skill}
                </p>
              ))}

              <p className="text-gray-400 text-xs mt-2">
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
