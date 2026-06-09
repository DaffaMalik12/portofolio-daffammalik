import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function Footer() {
  const footerRef = useRef(null);
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://instagram.com/yourusername",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
  ];

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative mt-20 bg-gradient-to-r from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
    >
      {/* Wave SVG top decoration */}
      <div className="absolute top-0 left-0 w-full transform -translate-y-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-24 text-gray-100 dark:text-gray-900 transition-colors duration-300"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,149.3C960,149,1056,203,1152,213.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand & Copyright */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center">
                <img src="/img/logo.png" alt="" />
              </div>
              <h2 className="text-xl font-bold">Muhammad Daffa</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md transition-colors duration-300">
              Passionate developer creating elegant solutions for complex
              problems. Building modern web and mobile experiences.
            </p>
            <p className="text-gray-500 text-sm transition-colors duration-300">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block text-gray-900 dark:text-white transition-colors duration-300">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-lime-500 rounded-full"></span>
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">
              <li>
                <a
                  href="#home"
                  className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-lime-500">›</span> Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-lime-500">›</span> About
                </a>
              </li>
              <li>
                <a
                  href="#portofolio"
                  className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-lime-500">›</span> Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-lime-500">›</span> Services
                </a>
              </li>
              <li>
                <a
                  href="#achievement"
                  className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-lime-500">›</span> Experience
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block text-gray-900 dark:text-white transition-colors duration-300">
              Contact Me
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-lime-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 transition-colors duration-300">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-1 mr-3 text-lime-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Jakarta, Indonesia</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-1 mr-3 text-lime-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>daffa@example.com</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-1 mr-3 text-lime-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+62 812 3456 7890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright on Mobile */}
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center transition-colors duration-300">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-lime-500 dark:hover:bg-lime-600 text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <p className="text-gray-500 text-sm text-center md:text-right transition-colors duration-300">
            Designed & Developed by{" "}
            <span className="text-lime-600 dark:text-lime-500">Muhammad Daffa</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
