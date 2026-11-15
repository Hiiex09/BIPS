import { Link } from "react-router-dom";
import { useAnnouncements } from "../hooks/UseAnnouncementRouteHooks";

const MAX_TILES = 4;

const formatDate = (value) => {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return { day: "", month: "" };
  return {
    day: date.getDate(),
    month: date.toLocaleString("en-US", { month: "short" }),
  };
};

/** Latest notices from the API, pinned under the navbar like slips on the hall's board. */
const AlertBar = () => {
  const { data = [], isLoading, error } = useAnnouncements();

  // The strip is supplementary: stay out of the way while loading or if the API is unreachable.
  if (isLoading || error) return null;

  const tiles = data.slice(0, MAX_TILES);
  if (tiles.length === 0) return null;

  return (
    <nav aria-label="Latest notices" className="border-b border-base-300 bg-base-200">
      <ul className="page-wrap flex gap-px overflow-x-auto scrollbar-hidden py-0">
        {tiles.map((d) => {
          const { day, month } = formatDate(d.createdAt || d.date);
          return (
            <li key={d._id} className="min-w-[13rem] flex-1">
              <Link
                to="/announcements"
                className="flex h-full items-baseline gap-3 px-3 py-3 hover:bg-base-100"
              >
                <span className="shrink-0 text-sm font-bold text-primary tabular-nums">
                  {month} {day}
                </span>
                <span className="truncate text-sm font-medium">{d.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AlertBar;
