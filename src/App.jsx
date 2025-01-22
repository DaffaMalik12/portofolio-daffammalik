import ComponentsAbout from "./components/about";
import Achievement from "./components/achievment";
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
      </div>
    </>
  );
}

export default App;
