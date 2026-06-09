import { Routes, Route } from "react-router-dom";
import ComponentsAbout from "./components/about";
import Achievement from "./components/achievment";
import ScrollToTopButton from "./components/ButtonScroll";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Portfolio from "./components/portofolio";
import ServiceCards from "./components/services";
import Articles from "./components/articles";

// Public Detail pages
import ProjectDetail from "./pages/ProjectDetail";
import ArticleDetail from "./pages/ArticleDetail";

// Admin components
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import ManagePortfolios from "./pages/admin/ManagePortfolios";
import ManageArticles from "./pages/admin/ManageArticles";

const PublicView = () => (
  <div className="container mx-auto">
    <Navbar />
    <Hero />
    <ComponentsAbout />
    <ServiceCards />
    <Achievement />
    <Portfolio />
    <Articles />
    <Footer />
    <ScrollToTopButton />
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<PublicView />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/article/:slug" element={<ArticleDetail />} />

      {/* Auth Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ManagePortfolios />} />
        <Route path="portfolios" element={<ManagePortfolios />} />
        <Route path="articles" element={<ManageArticles />} />
      </Route>
    </Routes>
  );
}

export default App;
