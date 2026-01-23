import { Services } from "../pages/Services";
import AlertBar from "./AlertBar";
import HeroSection from "./HeroSection";
import { Updates } from "./Updates";
import { Sidebar } from "./Sidebar";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <AlertBar />
      <main className="max-w-8xl mx-auto px-4 lg:px-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <HeroSection />
            <Services />
            <Updates />
          </div>
          <aside className="lg:col-span-4">
            <Sidebar />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
