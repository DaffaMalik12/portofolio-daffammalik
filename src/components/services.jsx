import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ServiceCards() {
  const sectionRef = useRef(null);

  const services = [
    {
      title: "Frontend Developer",
      description: [
        "Expert in React, Angular, and Vue",
        "Responsive design with Tailwind CSS",
        "Performance optimization and SEO best practices",
      ],
      icon: "🎨",
      gradient: "from-lime-400 to-purple-500",
      shadowColor: "shadow-lime-500/20",
    },
    {
      title: "Backend Developer",
      description: [
        "Proficient in Node.js, Express, and Python/Django",
        "Database management: MySQL, MongoDB, PostgreSQL",
        "RESTful API and GraphQL development",
      ],
      icon: "🖥️",
      gradient: "from-green-400 to-teal-500",
      shadowColor: "shadow-green-500/20",
    },
    {
      title: "Mobile Developer",
      description: [
        "Building apps with React Native and Flutter",
        "Experience in Android (Kotlin) and iOS (Swift)",
        "Integration with APIs and cloud services",
      ],
      icon: "📱",
      gradient: "from-orange-400 to-red-500",
      shadowColor: "shadow-orange-500/20",
    },
    {
      title: "UI/UX Designer",
      description: [
        "Crafting user-centric designs with Figma and Adobe XD",
        "Wireframing, prototyping, and user testing",
        "Design systems and accessibility standards",
      ],
      icon: "🎨",
      gradient: "from-purple-400 to-pink-500",
      shadowColor: "shadow-purple-500/20",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animasi untuk heading dan subheading
    gsap.fromTo(
      ".services-heading",
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".services-subheading",
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Animasi untuk kartu layanan
    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".service-cards-container",
          start: "top 75%",
        },
      }
    );

    // Animasi untuk ikon
    gsap.fromTo(
      ".service-icon",
      { scale: 0, rotation: -15 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".service-cards-container",
          start: "top 75%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      id="services"
      ref={sectionRef}
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-2">
            <div className="h-1 w-12 bg-lime-500 mx-auto mb-2"></div>
            <h4 className="text-lime-400 font-medium tracking-widest text-sm services-heading">
              WHAT I OFFER
            </h4>
          </div>
          <h2 className="text-5xl font-bold mb-4 services-heading">
            My Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto services-subheading">
            Bringing together technical expertise and creative solutions to
            deliver exceptional digital experiences tailored to your needs.
          </p>
        </div>

        {/* Service Cards */}
        <div className="service-cards-container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-lime-500/30"
            >
              {/* Background gradient that appears on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              {/* Corner decorations */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full"></div>

              {/* Icon container with glowing effect */}
              <div className="relative mb-6">
                <div
                  className={`service-icon w-16 h-16 flex items-center justify-center text-3xl rounded-lg bg-gradient-to-br ${service.gradient} ${service.shadowColor} shadow-lg mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}
                >
                  {service.icon}
                </div>

                {/* Shine effect on icon */}
                <div className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-4 group-hover:text-lime-400 transition-colors">
                {service.title}
              </h3>

              <ul className="space-y-3">
                {service.description.map((desc, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-300 group-hover:text-white transition-colors"
                  >
                    <span className="text-lime-400 mt-1">•</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>

              {/* Call-to-action button that appears on hover */}
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <button className="w-full py-2 px-4 bg-transparent border border-lime-500/30 rounded-lg text-lime-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-lime-500/10">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Need a custom solution? Let&apos;s discuss your project
            requirements.
          </p>
          <button className="py-3 px-8 bg-lime-400  rounded-lg font-medium shadow-lg shadow-lime-500/20 hover:shadow-lime-500/40 transition-all duration-300 hover:-translate-y-1">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceCards;
