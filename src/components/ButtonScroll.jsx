import { useState, useEffect } from "react";
import { ArrowUpIcon } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

    // Scroll to top function
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    return (
      <>
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-lime-500 hover:bg-lime-600 text-white dark:text-gray-900 rounded-lg p-3 shadow-lg shadow-lime-500/30 transition-all duration-300 z-50"
            aria-label="Scroll to top"
          >
            <ArrowUpIcon size={20} />
          </button>
        )}
      </>
    );
  };

export default ScrollToTopButton;
