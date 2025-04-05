import ComponentsAbout from "./components/about";
import Achievement from "./components/achievment";
import ScrollToTopButton from "./components/ButtonScroll";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Portfolio from "./components/portofolio";
import ServiceCards from "./components/services";

function App() {
  return (
    <>
      <div className=" container mx-auto">
        <Navbar />
        <Hero />
        <ComponentsAbout />
        <ServiceCards />
        <Achievement />
        <Portfolio />
        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
}

export default App;
