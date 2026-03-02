import { ArrowRight, CalendarDays, MapPin, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import {
  residentStats,
  latestAnnouncement,
  communityNewsArticle,
  healthSchedule,
  localOrdinances,
} from "../../data/residentMockData";

/* ── Stat Card ─────────────────────────────────────── */
const StatCard = ({ emoji, label, value, detail, detailColor }) => (
  <div className="card bg-base-100 shadow-sm border border-base-300">
    <div className="card-body p-4 gap-1">
      <span className="text-2xl">{emoji}</span>
      <p className="text-xs text-muted font-medium uppercase tracking-wide">{label}</p>
      <p className="text-xl font-bold text-base-content">{value}</p>
      <p className={`text-xs ${detailColor}`}>{detail}</p>
    </div>
  </div>
);

/* ── Community News Card ───────────────────────────── */
const CommunityNewsCard = ({ article }) => (
  <div className="card bg-base-100 shadow-sm border border-base-300 overflow-hidden">
    <div className="relative">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-36 object-cover"
      />
      <span className="absolute top-2 left-2 badge badge-primary badge-sm font-semibold">
        {article.category}
      </span>
    </div>
    <div className="card-body p-4 gap-2">
      <p className="text-xs text-muted">{article.date}</p>
      <h3 className="font-bold text-sm leading-snug">{article.title}</h3>
      <p className="text-xs text-muted line-clamp-3">{article.excerpt}</p>
      <a className="link link-primary text-xs font-semibold mt-1 flex items-center gap-1">
        Read Article <ArrowRight size={12} />
      </a>
    </div>
  </div>
);

/* ── Health Center Card ───────────────────────────── */
const HealthCenterCard = ({ schedule }) => (
  <div className="card bg-base-100 shadow-sm border border-base-300">
    <div className="card-body p-4 gap-3">
      <h3 className="font-bold text-sm">Health Center Schedule</h3>
      <p className="text-xs text-muted">Week of October 23-28</p>
      <div className="space-y-2">
        {schedule.map((item) => (
          <div key={item.service} className="flex items-center justify-between py-1.5 border-b border-base-200 last:border-0">
            <div>
              <p className="text-xs font-semibold">{item.service}</p>
              <p className="text-xs text-muted">{item.detail}</p>
            </div>
            <span className="badge badge-ghost badge-sm text-xs">{item.days}</span>
          </div>
        ))}
      </div>
      <Link to="/Resident/health" className="btn btn-outline btn-primary btn-xs btn-block mt-2">
        <CalendarDays size={12} /> Book Appointment
      </Link>
    </div>
  </div>
);

/* ── Local Ordinances Card ───────────────────────── */
const OrdinancesCard = ({ ordinances }) => (
  <div className="card bg-base-100 shadow-sm border border-base-300">
    <div className="card-body p-4 gap-3">
      <div className="flex items-center gap-2">
        <BookOpen size={16} className="text-primary" />
        <h3 className="font-bold text-sm">Local Ordinances</h3>
      </div>
      <p className="text-xs text-muted">Recent Implementations</p>
      <div className="space-y-3">
        {ordinances.map((ord) => (
          <div key={ord.id} className="space-y-1 pb-3 border-b border-base-200 last:border-0 last:pb-0">
            <span className="badge badge-soft badge-primary badge-xs font-mono">{ord.id}</span>
            <p className="text-xs font-medium leading-snug">{ord.title}</p>
          </div>
        ))}
      </div>
      <Link to="/Resident/ordinances" className="link link-primary text-xs font-semibold flex items-center gap-1 mt-1">
        <BookOpen size={12} /> Browse Document Library
      </Link>
    </div>
  </div>
);

/* ── Main Dashboard ──────────────────────────────── */
const ResidentDashboard = () => {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Hero Announcement Banner */}
      <div
        className="relative rounded-2xl overflow-hidden min-h-44"
        style={{
          backgroundImage: `url(${latestAnnouncement.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-neutral/85 via-neutral/70 to-neutral/30 rounded-2xl" />
        <div className="relative p-6 md:p-8 max-w-2xl">
          <span className="badge badge-primary badge-sm font-bold tracking-wider mb-3">
            {latestAnnouncement.badge}
          </span>
          <h2 className="text-white text-xl md:text-2xl font-bold leading-snug mb-2">
            {latestAnnouncement.title}
          </h2>
          <p className="text-white/80 text-sm mb-4 leading-relaxed">
            {latestAnnouncement.description}
          </p>
          <Link to="/announcements" className="btn btn-primary btn-sm gap-2">
            View Full Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {residentStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Community Updates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-base-content">Community Updates</h2>
          <Link to="/Resident/news" className="link link-primary text-xs font-semibold">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CommunityNewsCard article={communityNewsArticle} />
          <HealthCenterCard schedule={healthSchedule} />
          <OrdinancesCard ordinances={localOrdinances} />
        </div>
      </div>

      {/* Important Locations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <h2 className="text-base font-bold text-base-content">Important Locations</h2>
          </div>
          <button className="link link-primary text-xs font-semibold">Expand Map</button>
        </div>
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body p-4">
            <div className="aspect-[16/6] bg-base-200 rounded-xl flex items-center justify-center">
              <div className="text-center text-muted">
                <MapPin size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm opacity-50">Map integration — Barangay San Jose</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentDashboard;
