import React from "react";

const Hero = () => {
  return (
    <>
      <div className="lg:col-span-8 bg-base-300 rounded-2xl p-8 min-h-65 flex flex-col justify-start">
        <h1 className="text-5xl font-bold mb-3">
          Welcome to Barangay Official Portal of Barangay Tejero
        </h1>
        <p className="opacity-80 mb-5 w-3/4">
          Digitalizing local governance for a better community. Access services,
          news, and officila documents from the comfort of your home. Empowering
          citizends through Transparency.
        </p>
        <div className="flex gap-3">
          <button className="btn btn-primary">Request Document</button>
          <button className="btn btn-outline">View Programs</button>
        </div>
      </div>

      <div className="lg:col-span-4 bg-blue-800 text-primary-content rounded-2xl p-6">
        <h2 className="font-bold mb-4">Emergency Hotlines</h2>
        <ul className="space-y-3 text-sm">
          <li>Barangay Desk — (02) 8888-1234</li>
          <li>Police — (02) 8123-4567</li>
          <li>Fire — 911</li>
          <li>Ambulance — 0917-XXX-XXXX</li>
        </ul>
        <button className="btn btn-error w-full mt-5">
          Contact Emergency Center
        </button>
      </div>
    </>
  );
};

export default Hero;
