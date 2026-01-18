const HeroSection = () => {
  return (
    <div
      className="hero min-h-105 rounded-box"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1509099836639-18ba1795216d')",
      }}
    >
      <div className="hero-overlay bg-primary/70 rounded-box" />
      <div className="hero-content text-neutral-content max-w-xl">
        <div>
          <h1 className="text-4xl font-black mb-4">
            Official Portal of Barangay San Jose
          </h1>
          <p className="mb-6">
            Access barangay services, announcements, and official documents
            online.
          </p>
          <div className="flex gap-3">
            <button className="btn btn-white text-primary">
              Request Document
            </button>
            <button className="btn btn-outline text-white">
              View Programs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
