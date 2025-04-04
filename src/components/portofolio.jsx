/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Portfolio() {
  const portfolioItems = [
    {
      id: 1,
      image: "/img/web-1.png",
      title: "Website Ekstrakurikuler Rohis SMPN 189 Jakarta",
      desc: "Sebuah situs web untuk ekstrakurikuler Rohis di SMPN 189 Jakarta yang memungkinkan siswa untuk mengakses informasi terkait kegiatan, jadwal, dan kegiatan lainnya.",
      tags: ["React", "Tailwind CSS", "Firebase"],
    },
    {
      id: 2,
      image: "/img/web-2.png",
      title: "Article Website",
      desc: "Sebuah platform berbasis web untuk artikel, tempat para penulis dapat mempublikasikan konten mereka. Situs ini memungkinkan pembaca untuk mengakses artikel terbaru dan mencari berdasarkan kategori.",
      tags: ["Next.js", "MongoDB", "Express"],
    },
    {
      id: 3,
      image: "/img/android-1.png",
      title: "Aplikasi Absensi",
      desc: "Aplikasi mobile berbasis Android yang memudahkan pencatatan absensi. Pengguna dapat memonitor kehadiran siswa atau karyawan, serta menghasilkan laporan absensi.",
      tags: ["React Native", "Firebase", "Redux"],
    },
    {
      id: 4,
      image: "/img/web-3-final.png",
      title: "Website Ticket Konser",
      desc: "Sebuah situs web untuk menjual tiket konser dan acara musik lainnya. Dirancang untuk memberikan pengalaman pengguna yang mudah dalam memilih, membeli, dan mencetak tiket.",
      tags: ["Vue.js", "Node.js", "MySQL"],
    },
    {
      id: 5,
      image: "/img/android-2.png",
      title: "Notes App React Native",
      desc: "Aplikasi mobile yang dikembangkan menggunakan React Native untuk membantu pengguna mencatat ide, tugas, dan catatan penting lainnya. Dengan fitur sinkronisasi data dan antarmuka yang user-friendly.",
      tags: ["React Native", "Redux", "AsyncStorage"],
    },
    {
      id: 6,
      image: "/img/dashboars-absen.png",
      title: "Dashboard Absensi SMP Negeri 189 Jakarta",
      desc: "Sebuah sistem dashboard berbasis web untuk mengelola absensi di SMP Negeri 189 Jakarta. Memberikan antarmuka yang intuitif untuk guru dan administrasi untuk memantau kehadiran siswa.",
      tags: ["React", "Chart.js", "Material UI"],
    },
  ];

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Animasi untuk judul
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Animasi untuk cards
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="portofolio"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-base-100 to-base-200 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16" ref={titleRef}>
          <h2 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-purple-600 dark:from-lime-400 dark:to-purple-500">
            Portfolio
          </h2>
          <div className="w-24 h-1 mx-auto bg-lime-500 rounded-full mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Showcase of my recent projects and creative work that demonstrates
            my skills and expertise.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 2.5, spaceBetween: 30 },
          }}
          className="portfolio-swiper"
        >
          {portfolioItems.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div
                className="rounded-xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6">
                      <button className="px-6 py-2 bg-lime-600 hover:bg-lime-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105">
                        View Project
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-lime-600 to-purple-600 hover:from-lime-700 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Lihat Semua Proyek
          </button>
        </div>
      </div>

      <style jsx>{`
        .portfolio-swiper {
          padding: 40px 0;
        }
        .portfolio-swiper .swiper-pagination-bullet {
          background: #6366f1;
        }
        .portfolio-swiper .swiper-button-next,
        .portfolio-swiper .swiper-button-prev {
          color: #6366f1;
        }
      `}</style>
    </section>
  );
}

export default Portfolio;
