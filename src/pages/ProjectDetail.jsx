import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const fetchProject = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('id', id)
        .single();
        
      if (!error && data) {
        setProject(data);
      }
      setLoading(false);
    };

    if (id) fetchProject();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <Link 
            to="/#portfolio" 
            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-500 mb-8 transition-colors font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Projects
          </Link>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : !project ? (
            <div className="text-center py-32">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Project not found</h2>
              <p className="text-gray-600 dark:text-gray-400">The project you're looking for doesn't exist or has been removed.</p>
            </div>
          ) : (
            <article className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="w-full h-[400px] md:h-[500px] bg-gray-200 dark:bg-gray-700 relative">
                {project.image_url && (
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="bg-lime-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Tag size={14} /> Web Development
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-200">
                      <Calendar size={14} />
                      {new Date(project.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-2">{project.title}</h1>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                  Project Overview
                </h3>
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </div>
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
