import { Megaphone, Calendar, Search, Filter } from "lucide-react";
import { useState } from "react";
import AnnouncementCard from "../components/public/AnnouncementCard";

const Announcements = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const announcements = [
    {
      id: 1,
      title: "Community Clean-up Drive This Saturday",
      content: "Join us this Saturday for our monthly barangay clean-up drive. Meeting point at the basketball court at 7:00 AM. Bring gloves and cleaning materials. Snacks will be provided.",
      date: "Feb 15, 2024",
      category: "Events",
      urgent: false
    },
    {
      id: 2,
      title: "Water Interruption Notice",
      content: "Please be advised that water supply will be temporarily interrupted on February 20, 2024, from 9:00 AM to 3:00 PM for maintenance work. Please store enough water for your needs.",
      date: "Feb 14, 2024",
      category: "Public Service",
      urgent: true
    },
    {
      id: 3,
      title: "Free Medical Check-up Available",
      content: "Free medical check-up and consultation will be available at the barangay health center on February 25, 2024. First come, first served. Bring your barangay ID.",
      date: "Feb 12, 2024",
      category: "Health",
      urgent: false
    },
    {
      id: 4,
      title: "Basketball League Registration Now Open",
      content: "Registration for the annual barangay basketball league is now open. Deadline for registration is March 1, 2024. Open to ages 18-35. Team limit: 15 players.",
      date: "Feb 10, 2024",
      category: "Sports",
      urgent: false
    },
    {
      id: 5,
      title: "Road Repair Schedule",
      content: "Major road repairs will be conducted on Rizal Street from March 1-15. Expect traffic delays and follow alternative routes. We appreciate your patience and understanding.",
      date: "Feb 8, 2024",
      category: "Public Service",
      urgent: false
    },
    {
      id: 6,
      title: "Senior Citizens' Monthly Pension Distribution",
      content: "Senior citizens can claim their monthly pension at the barangay hall on February 28-29, 2024, from 9:00 AM to 3:00 PM. Please bring valid ID and pension booklet.",
      date: "Feb 7, 2024",
      category: "Public Service",
      urgent: false
    }
  ];

  const categories = ["all", "Events", "Public Service", "Health", "Sports"];

  const filteredAnnouncements = selectedCategory === "all" 
    ? announcements 
    : announcements.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/20 via-base-100 to-accent/20 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Megaphone size={40} className="text-primary" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Community <span className="text-primary">Announcements</span>
            </h1>
            <p className="text-xl opacity-80 mb-8">
              Stay updated with the latest news, events, and important notices from our barangay
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-base-100 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <label className="input input-bordered flex items-center gap-2">
                  <Search size={20} className="opacity-50" />
                  <input type="text" placeholder="Search announcements..." className="grow" />
                </label>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`btn btn-sm ${
                      selectedCategory === category 
                        ? 'btn-primary' 
                        : 'btn-outline'
                    } flex-shrink-0`}
                  >
                    {category === "all" ? "All" : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Grid */}
      <section className="py-12 bg-base-200/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Urgent Announcements */}
            {filteredAnnouncements.some(a => a.urgent) && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="badge badge-error">Urgent</span>
                  Important Notices
                </h2>
                <div className="space-y-4">
                  {filteredAnnouncements
                    .filter(a => a.urgent)
                    .map((announcement) => (
                      <AnnouncementCard key={announcement.id} {...announcement} />
                    ))}
                </div>
              </div>
            )}

            {/* Regular Announcements */}
            <div>
              <h2 className="text-2xl font-bold mb-6">All Announcements</h2>
              <div className="space-y-4">
                {filteredAnnouncements
                  .filter(a => !a.urgent)
                  .map((announcement) => (
                    <AnnouncementCard key={announcement.id} {...announcement} />
                  ))}
              </div>
            </div>

            {filteredAnnouncements.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl opacity-20 mb-4">📢</div>
                <h3 className="text-2xl font-bold mb-2">No announcements found</h3>
                <p className="opacity-70">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Never Miss an Update
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Get important announcements delivered straight to your phone or email
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="input input-lg flex-1 text-base-content"
              />
              <button className="btn btn-secondary btn-lg">
                Subscribe
              </button>
            </div>
            <p className="text-sm opacity-70 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Announcements;
