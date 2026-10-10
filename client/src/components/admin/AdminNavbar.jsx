import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  Menu, 
  ChevronRight, 
  Plus, 
  ExternalLink 
} from "lucide-react";

const routeConfig = {
  "/welcome": {
    category: "Overview",
    title: "Executive Dashboard",
    action: null
  },
  "/user-management": {
    category: "Records",
    title: "User Directory",
    action: null
  },
  "/document-management": {
    category: "Workflow",
    title: "Document Requests",
    action: null
  },
  "/incident-reports": {
    category: "Safety",
    title: "Incident Reports",
    action: null
  },
  "/announcement-management": {
    category: "Publishing",
    title: "Announcements",
    action: {
      label: "New Announcement",
      icon: Plus,
      targetId: "create-announcement-btn"
    }
  }
};

const AdminNavbar = ({ title, showSearch = true, onActionClick }) => {
  const location = useLocation();

  const currentCfg = routeConfig[location.pathname] || {
    category: "Admin",
    title: title || "Console",
    action: null
  };


  return (
    <header className="w-full bg-base-100 border-b border-base-300 select-none sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 gap-4">
        {/* Left: Mobile Drawer Trigger + Swiss Breadcrumb (01) */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost btn-xs lg:hidden"
          >
            <Menu size={18} />
          </label>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-base-content/50">
              <span>Admin</span>
              <ChevronRight size={10} />
              <span className="text-primary font-black">{currentCfg.category}</span>
            </div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-base-content leading-tight">
              {title || currentCfg.title}
            </h1>
          </div>
        </div>

        {/* Right Section: Search + Page Action (04) + Notifications + Profile (05) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Filter Search */}
          {showSearch && (
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Quick lookup (Press '/' to search)"
                aria-label="Quick lookup (Press '/' to search)"
                className="input input-xs input-bordered w-48 sm:w-60 rounded-xs pl-7 text-xs focus:outline-primary"
                onKeyDown={(e) => {
                  if (e.key === "Escape") e.currentTarget.blur();
                }}
              />
              <Search size={12} className="absolute left-2.5 text-base-content/40" />
            </div>
          )}

          {/* Contextual Primary Action Button (Option 04) */}
          {currentCfg.action && (
            <button
              onClick={() => {
                if (onActionClick) {
                  onActionClick();
                } else if (currentCfg.action.targetId) {
                  const el = document.getElementById(currentCfg.action.targetId);
                  if (el) el.click();
                }
              }}
              className="btn btn-xs btn-primary font-bold gap-1 rounded-xs shadow-2xs"
            >
              <Plus size={12} />
              <span className="hidden sm:inline">{currentCfg.action.label}</span>
            </button>
          )}

          {/* Public Portal Link */}
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-xs border border-base-300 rounded-xs text-[11px] font-semibold gap-1 flex"
            title="Open Public Portal in New Tab"
          >
            <ExternalLink size={12} />
            <span>Public Site</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
