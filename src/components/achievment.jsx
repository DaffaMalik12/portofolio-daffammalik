import { useEffect } from "react";
import { gsap } from "gsap";

function Achievement() {
  const achievements = [
    {
      title: "Best Member in UI/UX Bootcamp",
      description:
        "Awarded as the Best Member in the UI/UX Bootcamp organized by the Google Developer Student Club at UIN Jakarta.",
      date: "August 2024",
    },
    {
      title: "Asisstent Lecture",
      description:
        "Mentoring Fundamental Programming for 24nd batch students in Teknik Informatika Major",
    },
    {
      title: "Asisstent Lecture",
      description:
        "Mentoring Joomla for 22nd batch students in Ilmu Tafsir dan Hadits Major",
    },
    {
      title: "Freelance Web and Android Developer",
      description:
        "Completed various freelance projects for clients, delivering high-quality web and mobile applications.",
      date: "2023 - Present",
    },
    {
      title: "Moderator Tech Talk Android - XML Native",
      description:
        "Organized a tech talk on XML Native part of the GDGoc UIN Jakarta initiative.",
      date: "November 2024",
    },
    {
      title: "Head of Android Development - GDGoc UIN Jakarta",
      description: "Organized a Weekly Class for Android Development.",
    },
  ];

  useEffect(() => {
    // Animasi untuk daftar achievement
    gsap.fromTo(
      ".achievement-item",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 8, stagger: 0.2 }
    );

    // Animasi untuk gambar
    gsap.fromTo(
      ".achievement-img",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 8 }
    );
  }, []);

  return (
    <div id="achievment" className="bg-base-100 text-white py-12">
      <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 lg:px-12">
        {/* Bagian Kiri - Konten */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Experience</h1>
          <p className="dark:text-gray-400 text-gray-700 mb-6">
            Recognizing milestones and dedication through various achievements.
          </p>
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-item flex items-start">
                <h2 className="text-3xl font-bold text-blue-500 mr-4">
                  {achievement.number}.
                </h2>
                <div>
                  <h3 className="text-xl font-semibold">{achievement.title}</h3>
                  <p className="dark:text-gray-400 text-gray-700 mt-2">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Bagian Kanan - Gambar */}
        <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-12">
          <img
            src="/img/programmer.png"
            alt="Achievement"
            className="achievement-img rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Achievement;
