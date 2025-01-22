import { useEffect } from "react";

function Hero() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const parallaxElement = document.querySelector(".hero");
      if (parallaxElement) {
        parallaxElement.style.backgroundPosition = `center ${
          scrollPosition * 0.5
        }px`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const Judul = "Unlocking Creativity, One Project at a Time";
  const Deskripsi = ` Explore my journey of crafting innovative solutions, from
              cutting-edge web applications to dynamic mobile experiences. Join
              me as I push the boundaries of what's possible in technology,
              design, and user experience.`;
  const judulButton = ` Let's Build Something Amazing`;

  return (
    <>
      <div
        id="home"
        className="hero min-h-screen relative"
        style={{
          backgroundImage: `url('/img/programmer-2.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-position 0.1s",
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="hero-content text-neutral-content text-center relative z-10">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{Judul}</h1>
            <p className="mb-5">{Deskripsi}</p>
            <button className="btn btn-primary">{judulButton}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
