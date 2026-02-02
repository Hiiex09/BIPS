import bgImage from "../assets/Barangay Hall and community park scene.png";
import { DigitalServices } from "./DigitalServices";
import Footer from "./Footer";
import Hero from "./Hero";
import { InformationCenter } from "./InformationCenter";
import { LatestUpdate } from "./LatestUpdate";
import { Maps } from "./Maps";

const LandingPage = () => {
  return (
    <>
      <div className="max-w-full mx-auto p-5 grid gap-5 grid-cols-1 lg:grid-cols-12">
        <Hero />
        <DigitalServices />
        <Maps />
        <LatestUpdate />
        <InformationCenter />
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
