import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  Bell, 
  Menu, 
  ChevronRight, 
  LogOut, 
  User as UserIcon, 
  ShieldCheck, 
  Plus, 
  ExternalLink 
} from "lucide-react";
import { useCheckAuth, useLogout } from "../../hooks/UseAuthRouteHooks.js";

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
  const { user } = useCheckAuth();
  const { mutate: logoutUser } = useLogout();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const currentCfg = routeConfig[location.pathname] || {
    category: "Admin",
    title: title || "Console",
    action: null
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            className="btn btn-ghost btn-xs border border-base-300 rounded-xs text-[11px] font-semibold gap-1 hidden lg:flex"
            title="Open Public Portal in New Tab"
          >
            <ExternalLink size={12} />
            <span>Public Site</span>
          </Link>

          {/* Profile Menu with Role Identity Panel (Option 05) */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 p-1 rounded-xs border border-base-300 hover:border-primary transition-colors cursor-pointer"
              aria-label="User profile options"
            >
              <div className="w-6 h-6 rounded-xs bg-primary text-white flex items-center justify-center font-bold text-xs uppercase">
                {user?.firstName?.[0] || "A"}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none pr-1">
                <span className="text-xs font-bold text-base-content">
                  {user?.firstName ? `${user.firstName}` : "Admin"}
                </span>
                <span className="text-[9px] font-black uppercase text-primary">
                  {user?.role || "Staff"}
                </span>
              </div>
            </button>

            {/* Profile Dropdown Panel */}
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-base-100 border border-base-300 rounded-xs shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="pb-2.5 mb-2.5 border-b border-base-300">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xs bg-primary text-white flex items-center justify-center font-bold text-xs">
                      {user?.firstName?.[0] || "A"}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold truncate">
                        {user ? `${user.firstName} ${user.lastName}` : "Administrator"}
                      </p>
                      <p className="text-[10px] text-base-content/60 truncate">
                        {user?.email || "admin@barangaytejero.gov.ph"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-2xs text-[9px] font-black uppercase bg-primary/10 text-primary border border-primary/20">
                      <ShieldCheck size={10} />
                      {user?.role || "Admin"} Privileges
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="px-2 py-1.5 text-[11px] text-base-content/70">
                    <span className="block font-medium">Session Active</span>
                    <span className="text-[10px] text-base-content/50">Verified Administrative Token</span>
                  </div>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      logoutUser();
                    }}
                    className="w-full flex items-center gap-2 px-2 py-2 text-error hover:bg-error/10 rounded-xs font-bold transition-colors text-left cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
