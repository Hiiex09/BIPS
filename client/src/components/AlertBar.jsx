import { Link } from "react-router-dom";
import { useAnnouncements } from "../hooks/UseAnnouncementRouteHooks";

const MAX_TILES = 4;

const formatDate = (value) => {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return { day: "--", month: "" };
  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
  };
};

const AlertBar = () => {
  const { data = [], isLoading, error } = useAnnouncements();

  if (isLoading) {
    return <p>Loading please wait</p>;
  }

  if (error) {
    return <p>Error no data</p>;
  }

  const tiles = data.slice(0, MAX_TILES);
  if (tiles.length === 0) return null;

  return (
    <nav
      aria-label="Latest announcements"
      className="w-full bg-base-100 border-b border-base-300"
    >
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${tiles.length}, minmax(0, 1fr))` }}
      >
        {tiles.map((d) => {
          const { day, month } = formatDate(d.createdAt || d.date);
          return (
            <Link
              key={d._id}
              to="/announcements"
              className="group block px-3 sm:px-5 py-3 border-r border-base-300 last:border-r-0 text-base-content transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-primary focus-visible:-outline-offset-2 hover:shadow-[inset_0_-2px_0_var(--color-primary)]"
            >
              <span className="block text-2xl sm:text-3xl font-black tracking-tighter leading-none text-primary">
                {day}
              </span>
              <span className="block text-[10px] font-bold tracking-widest text-base-content/60">
                {month}
              </span>
              <span className="block mt-1.5 text-xs sm:text-sm font-semibold truncate">
                {d.title}
              </span>
              <span className="block mt-1.5 text-[11px] font-bold text-primary">
                Read more <span className="inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default AlertBar;
