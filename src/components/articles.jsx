import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3); // Fetch only the 3 latest articles
        
      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    if (loading || articles.length === 0) return;

    let ctx = gsap.context(() => {
      // Title Animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Cards Animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, articles]);

  return (
    <section id="articles" ref={sectionRef} className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-sm font-bold text-lime-600 dark:text-lime-500 uppercase tracking-wider mb-2">
            My Blog
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Articles
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts, insights, and tutorials about software development, design, and technology.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-10 h-10 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No articles published yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <article
                key={article.id}
                ref={(el) => (cardsRef.current[i] = el)}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 dark:border-gray-700 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {article.image_url ? (
                    <img 
                      src={article.image_url} 
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <BookOpen size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1 shadow-sm">
                    <Calendar size={12} />
                    {new Date(article.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-sm flex-grow">
                    {article.content.replace(/<[^>]+>/g, '')}
                  </p>
                  
                  <Link 
                    to={`/article/${article.slug}`}
                    className="inline-flex items-center text-lime-600 dark:text-lime-500 font-medium hover:text-lime-700 dark:hover:text-lime-400 transition-colors mt-auto"
                  >
                    Read More 
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
