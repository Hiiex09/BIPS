import { Calendar, Clock } from "lucide-react";

const AnnouncementCard = ({ title, content, date, category, urgent = false }) => {
  const borderColors = {
    Events: "border-primary",
    "Public Service": "border-info",
    Health: "border-success",
    Sports: "border-secondary",
    default: "border-accent"
  };

  return (
    <div className={`announcement-card ${borderColors[category] || borderColors.default}`}>
      <div className="card-body">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="badge badge-sm badge-outline">{category}</span>
            {urgent && <span className="badge badge-sm badge-error">Urgent</span>}
          </div>
          <div className="flex items-center gap-2 text-sm opacity-60">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
        </div>
        <h3 className="card-title text-xl mb-2">{title}</h3>
        <p className="opacity-80 line-clamp-3">{content}</p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
