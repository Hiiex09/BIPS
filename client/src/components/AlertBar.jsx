import { Megaphone } from "lucide-react";
import { getAnnouncement } from "../hooks/UseAnnouncementRouteHooks";

const AlertBar = () => {
  const { data, isLoading, error } = getAnnouncement();

  if (isLoading) {
    return <p>Loading please wait</p>;
  }

  if (error) {
    return <p>Error no data</p>;
  }

  return (
    <div className="w-full overflow-hidden bg-blue-300 shadow">
      <div className="flex items-center gap-3 px-4 py-2">
        <Megaphone size={18} className="shrink-0" />
        {/* Mobile: show first announcement only, truncated */}
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-4 overflow-x-auto scrollbar-hidden whitespace-nowrap">
            {data.map((d) => (
              <span key={d._id} className="font-medium text-sm shrink-0">
                {d.title}
              </span>
            ))}
          </div>
        </div>
        <button className="btn btn-sm btn-primary shrink-0">Details</button>
      </div>
    </div>
  );
};

export default AlertBar;
