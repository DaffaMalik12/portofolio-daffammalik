import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const fetchArticle = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();
        
      if (!error && data) {
        setArticle(data);
      }
      setLoading(false);
    };

    if (slug) fetchArticle();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <Link 
            to="/#articles" 
            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-500 mb-8 transition-colors font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Articles
          </Link>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : !article ? (
            <div className="text-center py-32">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Article not found</h2>
              <p className="text-gray-600 dark:text-gray-400">The article you're looking for doesn't exist or has been removed.</p>
            </div>
          ) : (
            <article className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              {article.image_url && (
                <div className="w-full h-[300px] md:h-[400px] bg-gray-200 dark:bg-gray-700">
                  <img 
                    src={article.image_url} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 pb-6">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} className="text-lime-500" />
                    {new Date(article.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-2">
                    <User size={16} className="text-lime-500" />
                    Muhammad Daffa Malik
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-lime-500" />
                    {Math.max(1, Math.ceil(article.content?.length / 1000 || 1))} min read
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-10 leading-tight">
                  {article.title}
                </h1>

                <div 
                  className="prose prose-lg md:prose-xl dark:prose-invert max-w-none prose-a:text-lime-600 prose-img:rounded-xl prose-headings:text-gray-900 dark:prose-headings:text-white text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: article.content ? article.content.replace(/\n/g, '<br/>') : '' }}
                />
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
