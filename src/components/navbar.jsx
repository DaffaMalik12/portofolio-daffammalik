import { useState, useEffect } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle active navigation item
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "services",
        "achievment",
        "portofolio",
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Experience", href: "#achievement" },
    { name: "Portfolio", href: "#portofolio" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-600 flex items-center justify-center transition-all duration-300 ${
                scrolled ? "shadow-md shadow-lime-500/20" : ""
              }`}
            >
              <img src="/img/logo.png" alt="" />
            </div>
            <div className="hidden md:block">
              <h1
                className={`font-bold transition-all duration-300 ${
                  scrolled
                    ? "text-gray-800 dark:text-white text-lg"
                    : "text-gray-800 dark:text-white text-xl"
                }`}
              >
                Muhammad Daffa
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                FullStack Developer
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <ul className="flex items-center space-x-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`px-4 py-2 mx-1 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                      activeSection === item.href.substring(1)
                        ? "text-lime-600 dark:text-lime-500"
                        : "text-gray-700 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-500"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-lime-500 transform scale-x-0 origin-left transition-transform duration-300 ${
                        activeSection === item.href.substring(1)
                          ? "scale-x-100"
                          : "group-hover:scale-x-100"
                      }`}
                    ></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors duration-300"
            >
              {!mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="https://wa.me/6281287819593"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-medium shadow-md hover:shadow-lg hover:shadow-lime-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Hubungi Saya</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="py-2 px-1 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "bg-lime-50 dark:bg-lime-900/20 text-lime-600 dark:text-lime-500"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-800">
              <a
                href="https://wa.me/6281287819593"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-medium rounded-md shadow-md"
              >
                <span>Hubungi Saya via WhatsApp</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
