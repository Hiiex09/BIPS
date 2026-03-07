import { useState } from "react";
import { CalendarDays, Pencil, ListFilter } from "lucide-react";
import { newsFilters, upcomingEvents, featuredNewsEvent, newsArticles } from "../../data/residentMockData";

/* ── Upcoming Event Item ────────────────────────────── */
const EventItem = ({ event }) => (
  <div className="flex items-start gap-3">
    <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-content text-center shrink-0">
      <span className="text-[8px] font-bold leading-none uppercase">{event.month}</span>
      <span className="text-sm font-bold leading-none">{event.day}</span>
    </div>
    <div>
      <p className="text-xs font-semibold text-base-content leading-snug">{event.title}</p>
      <p className="text-xs text-muted">{event.time} · {event.location}</p>
    </div>
  </div>
);

/* ── News Card ──────────────────────────────────────── */
const NewsCard = ({ article }) => (
  <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
    <figure className="h-40 overflow-hidden">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover"
      />
    </figure>
    <div className="card-body p-4 gap-2">
      <div className="flex items-center gap-2">
        <span className={`badge badge-soft badge-xs font-bold tracking-wide ${article.badgeClass}`}>
          {article.category}
        </span>
      </div>
      <h3 className="font-bold text-sm leading-snug">{article.title}</h3>
      <p className="text-xs text-muted line-clamp-2">{article.excerpt}</p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-muted">{article.timestamp}</span>
        <a className="link link-primary text-xs font-semibold">{article.action}</a>
      </div>
    </div>
  </div>
);

/* ── Main Page ──────────────────────────────────────── */
const ResidentNews = () => {
  const [activeFilter, setActiveFilter] = useState("All News");

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-6xl">
      {/* ── Left Sidebar ── */}
      <aside className="w-full lg:w-56 shrink-0 space-y-5">
        {/* Submit a Story */}
        <button className="btn btn-primary btn-sm btn-block gap-2">
          <Pencil size={14} /> Submit a Story
        </button>

        {/* Filters */}
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body p-3 gap-1">
            <ul className="menu menu-sm p-0 gap-0.5">
              {newsFilters.map((f) => (
                <li key={f}>
                  <button
                    onClick={() => setActiveFilter(f)}
                    className={`flex items-center gap-2 text-sm rounded-lg ${
                      activeFilter === f
                        ? "bg-base-200 font-semibold text-base-content"
                        : "text-muted hover:bg-base-100"
                    }`}
                  >
                    <ListFilter size={14} />
                    {f}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body p-4 gap-4">
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-primary" />
              <h3 className="font-semibold text-sm">Upcoming Events</h3>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((ev) => (
                <EventItem key={ev.day + ev.title} event={ev} />
              ))}
            </div>
            <a className="link link-primary text-xs font-semibold">View Full Calendar</a>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 space-y-6 min-w-0">
        {/* Page Header */}
        <div>
          <h2 className="text-xl font-bold text-base-content">Community News</h2>
          <p className="text-sm text-muted mt-0.5">
            The heart of our barangay: Stay informed, get involved, and share your stories.
          </p>
        </div>

        {/* Featured Event */}
        <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-2/5 h-52 md:h-auto shrink-0">
              <img
                src={featuredNewsEvent.image}
                alt={featuredNewsEvent.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 badge badge-primary badge-sm font-bold">
                {featuredNewsEvent.badge}
              </span>
            </div>
            <div className="card-body p-5 gap-3">
              <span className="text-xs font-bold text-primary tracking-wider uppercase flex items-center gap-1">
                <CalendarDays size={12} /> {featuredNewsEvent.category}
              </span>
              <h3 className="text-lg font-bold leading-snug">{featuredNewsEvent.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{featuredNewsEvent.description}</p>
              <div className="card-actions mt-1">
                <button className="btn btn-primary btn-sm">{featuredNewsEvent.action}</button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Updates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-base-content">Recent Updates</h3>
            <select className="select select-sm select-bordered text-xs">
              <option>Sort: Newest First</option>
              <option>Sort: Oldest First</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {newsArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="join">
            <button className="join-item btn btn-sm btn-ghost">«</button>
            <button className="join-item btn btn-sm btn-primary">1</button>
            <button className="join-item btn btn-sm btn-ghost">2</button>
            <button className="join-item btn btn-sm btn-ghost">3</button>
            <button className="join-item btn btn-sm btn-ghost">»</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentNews;
