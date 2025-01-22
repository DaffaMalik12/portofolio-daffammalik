import { useEffect } from "react";
import { gsap } from "gsap";

function ServiceCards() {
  const services = [
    {
      title: "Frontend Developer",
      description: [
        "Expert in React, Angular, and Vue",
        "Responsive design with Tailwind CSS",
        "Performance optimization and SEO best practices",
      ],
      icon: "🎨", // Ikon untuk Frontend Developer
    },
    {
      title: "Backend Developer",
      description: [
        "Proficient in Node.js, Express, and Python/Django",
        "Database management: MySQL, MongoDB, PostgreSQL",
        "RESTful API and GraphQL development",
      ],
      icon: "🖥️", // Ikon untuk Backend Developer
    },
    {
      title: "Mobile Developer",
      description: [
        "Building apps with React Native and Flutter",
        "Experience in Android (Kotlin) and iOS (Swift)",
        "Integration with APIs and cloud services",
      ],
      icon: "📱", // Ikon untuk Mobile Developer
    },
    {
      title: "UI/UX Designer",
      description: [
        "Crafting user-centric designs with Figma and Adobe XD",
        "Wireframing, prototyping, and user testing",
        "Design systems and accessibility standards",
      ],
      icon: "🎨", // Ikon untuk UI/UX Designer
    },
  ];

  useEffect(() => {
    // Animasi menggunakan GSAP saat komponen dimuat
    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 5, stagger: 0.2 }
    );
    gsap.fromTo(
      ".service-icon",
      { scale: 0.5 },
      { scale: 1, duration: 2, stagger: 0.2 }
    );
  }, []);

  return (
    <div id="services" className="bg-base-100 mt-12 text-white py-10">
      <h2 className="text-center text-3xl font-bold mb-8">Services</h2>
      <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 px-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card flex flex-col items-center rounded-lg bg-gray-900 p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-800"
          >
            <div className="service-icon text-5xl mb-4 transition-transform transform hover:scale-125">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <ul className="text-sm space-y-2">
              {service.description.map((desc, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceCards;
