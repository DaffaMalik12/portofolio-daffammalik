import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { gsap } from "gsap"; // Import GSAP

function Portfolio() {
  const portfolioItems = [
    {
      id: 1,
      image: "/img/web-1.png",
      title: "Website Esktrakulikuler Rohis SMPN 189 Jakarta",
      desc: "Sebuah situs web untuk ekstrakurikuler Rohis di SMPN 189 Jakarta yang memungkinkan siswa untuk mengakses informasi terkait kegiatan, jadwal, dan kegiatan lainnya. Dirancang untuk memberikan pengalaman pengguna yang mudah diakses dan informatif.",
    },
    {
      id: 2,
      image: "/img/web-2.png",
      title: "Article Website",
      desc: "Sebuah platform berbasis web untuk artikel, tempat para penulis dapat mempublikasikan konten mereka. Situs ini memungkinkan pembaca untuk mengakses artikel terbaru, mencari berdasarkan kategori, dan berinteraksi dengan penulis melalui komentar.",
    },
    {
      id: 3,
      image: "/img/android-1.png",
      title: "Aplikasi Absensi",
      desc: "Aplikasi mobile berbasis Android yang memudahkan pencatatan absensi. Pengguna dapat memonitor kehadiran siswa atau karyawan, serta menghasilkan laporan absensi dalam format yang mudah dibaca dan diakses.",
    },
    {
      id: 4,
      image: "/img/web-3-final.png",
      title: "Website Ticket Konser",
      desc: "Sebuah situs web untuk menjual tiket konser dan acara musik lainnya. Dirancang untuk memberikan pengalaman pengguna yang mudah dalam memilih, membeli, dan mencetak tiket, dengan sistem pembayaran yang aman. ",
    },
    {
      id: 5,
      image: "/img/android-2.png",
      title: "Notes App React Native",
      desc: "Aplikasi mobile yang dikembangkan menggunakan React Native untuk membantu pengguna mencatat ide, tugas, dan catatan penting lainnya. Dengan fitur sinkronisasi data dan antarmuka yang user-friendly, aplikasi ini mendukung produktivitas pengguna.",
    },
    {
      id: 6,
      image: "/img/dashboars-absen.png",
      title: "Dashboard Absensi SMP Negeri 189 Jakarta",
      desc: "Sebuah sistem dashboard berbasis web untuk mengelola absensi di SMP Negeri 189 Jakarta. Memberikan antarmuka yang intuitif untuk guru dan administrasi untuk memantau kehadiran siswa dan menghasilkan laporan absensi.",
    },
  ];

  const slideRef = useRef([]);

  useEffect(() => {
    // Animasi ketika komponen dimuat
    gsap.fromTo(
      slideRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 10,
        stagger: 0.3, // Memberi jeda antara setiap elemen
      }
    );
  }, []);

  return (
    <section
      id="portofolio"
      className="portfolio lg:py-12 bg-gradient-to-r bg-base-100 dark:text-white text-gray-700"
    >
      <div className="container mx-auto lg:px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Portfolio</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
        >
          {portfolioItems.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div
                className="card dark:bg-gray-800 bg-gray-300 rounded-lg overflow-hidden shadow-lg"
                ref={(el) => (slideRef.current[index] = el)} // Set reference for each slide
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-96 object-cover rounded-md"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button className="btn btn-primary btn-sm">Check</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Portfolio;
