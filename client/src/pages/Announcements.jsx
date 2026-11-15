import { useState } from "react";
import { Search } from "lucide-react";
import AnnouncementCard from "../components/public/AnnouncementCard";

const announcements = [
  {
    id: 1,
    title: "Community clean-up drive this Saturday",
    content: "Join us this Saturday for our monthly barangay clean-up drive. Meeting point at the basketball court at 7:00 AM. Bring gloves and cleaning materials. Snacks will be provided.",
    date: "Feb 15, 2024",
    category: "Events",
    urgent: false,
  },
  {
    id: 2,
    title: "Water interruption on February 20",
    content: "Water supply will be temporarily interrupted on February 20, 2024, from 9:00 AM to 3:00 PM for maintenance work. Please store enough water for your needs.",
    date: "Feb 14, 2024",
    category: "Public Service",
    urgent: true,
  },
  {
    id: 3,
    title: "Free medical check-up at the health center",
    content: "Free medical check-up and consultation at the barangay health center on February 25, 2024. First come, first served. Bring your barangay ID.",
    date: "Feb 12, 2024",
    category: "Health",
    urgent: false,
  },
  {
    id: 4,
    title: "Basketball league registration is open",
    content: "Registration for the annual barangay basketball league is open until March 1, 2024. Open to ages 18 to 35. Up to 15 players per team.",
    date: "Feb 10, 2024",
    category: "Sports",
    urgent: false,
  },
  {
    id: 5,
    title: "Road repairs on Rizal Street, March 1 to 15",
    content: "Major road repairs will be done on Rizal Street from March 1 to 15. Expect traffic delays and use alternative routes.",
    date: "Feb 8, 2024",
    category: "Public Service",
    urgent: false,
  },
  {
    id: 6,
    title: "Senior citizens' pension distribution",
    content: "Senior citizens can claim their monthly pension at the barangay hall on February 28 to 29, 2024, from 9:00 AM to 3:00 PM. Bring a valid ID and your pension booklet.",
    date: "Feb 7, 2024",
    category: "Public Service",
    urgent: false,
  },
];

const categories = ["All", "Events", "Public Service", "Health", "Sports"];

const Announcements = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = announcements.filter(
    (a) =>
      (selectedCategory === "All" || a.category === selectedCategory) &&
      (!q || a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)),
  );
  const urgent = filtered.filter((a) => a.urgent);
  const regular = filtered.filter((a) => !a.urgent);

  return (
    <main>
      <header className="border-b border-base-300">
        <div className="page-wrap py-12 sm:py-16">
          <h1 className="type-display">Notices from the hall</h1>
          <p className="type-lede mt-5">
            Interruptions, schedules, events and advisories for Tejero residents.
          </p>
        </div>
      </header>

      {/* Filters */}
      <div className="sticky top-0 z-10 border-b border-base-300 bg-base-100/95 backdrop-blur">
        <div className="page-wrap flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter by category" className="flex gap-1 overflow-x-auto scrollbar-hidden">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-content"
                    : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="input input-sm w-full md:w-72 rounded-md border-base-300 bg-base-100 flex items-center gap-2">
            <Search size={16} className="opacity-50" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search notices"
              aria-label="Search notices"
              className="grow"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
      </div>

      <section className="page-section pt-10 sm:pt-12">
        <div className="page-wrap">
          <div className="max-w-4xl">
          {urgent.length > 0 && (
            <div className="mb-14">
              <h2 className="type-heading text-error">Urgent</h2>
              <div className="ruled mt-4 border-y border-base-300">
                {urgent.map((a) => (
                  <AnnouncementCard key={a.id} {...a} />
                ))}
              </div>
            </div>
          )}

          {regular.length > 0 && (
            <div>
              <h2 className="type-heading">All notices</h2>
              <div className="ruled mt-4 border-y border-base-300">
                {regular.map((a) => (
                  <AnnouncementCard key={a.id} {...a} />
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="py-16">
              <h2 className="type-heading">No notices match your search</h2>
              <p className="mt-2 text-base-content/70">
                Try another word, or choose All to see every notice.
              </p>
              <button
                type="button"
                className="btn-line btn-sm mt-5"
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Announcements;
