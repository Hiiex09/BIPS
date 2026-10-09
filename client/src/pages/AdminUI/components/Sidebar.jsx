import {
  LayoutDashboard,
  Users,
  FileText,
  AlertTriangle,
  Megaphone,
  LogOut,
  ChevronRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCheckAuth, useLogout } from "../../../hooks/UseAuthRouteHooks.js";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useCheckAuth();
  const { mutate: logoutUser } = useLogout();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      path: "/welcome",
      icon: LayoutDashboard,
      num: "01",
      label: "Dashboard",
      badge: null
    },
    {
      path: "/user-management",
      icon: Users,
      num: "02",
      label: "User Directory",
      badge: null
    },
    {
      path: "/document-management",
      icon: FileText,
      num: "03",
      label: "Document Requests",
      badge: null
    },
    {
      path: "/incident-reports",
      icon: AlertTriangle,
      num: "04",
      label: "Incident Reports",
      badge: null
    },
    {
      path: "/announcement-management",
      icon: Megaphone,
      num: "05",
      label: "Announcements",
      badge: null
    }
  ];

  return (
    <aside className="drawer-side z-40">
      <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className="flex min-h-full flex-col justify-between bg-accent text-accent-content w-64 border-r border-white/10 select-none">
        {/* Brand Header */}
        <div>
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link to="/welcome" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-xs bg-white text-accent flex items-center justify-center font-black text-sm shadow-2xs group-hover:scale-105 transition-transform">
                T
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-black text-sm tracking-tight text-white">
                  Barangay Tejero
                </span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-white/50">
                  Admin Console
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="p-3">
            <p className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-white/40">
              Workspace Menu
            </p>
            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xs text-xs font-semibold transition-all group ${
                      active
                        ? "bg-primary text-white shadow-2xs"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-[11px] ${active ? "text-white/90" : "text-white/40 group-hover:text-white/70"}`}>
                        {item.num}
                      </span>
                      <Icon size={16} className={active ? "text-white" : "text-white/60 group-hover:text-white"} />
                      <span>{item.label}</span>
                    </div>
                    {active && <ChevronRight size={14} className="text-white/70" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer Identity & Status */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xs bg-primary text-white flex items-center justify-center font-bold text-xs uppercase">
              {user?.firstName?.[0] || "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">
                {user ? `${user.firstName} ${user.lastName}` : "Administrator"}
              </p>
              <span className="inline-block px-1.5 py-0.2 rounded-2xs text-[9px] font-black uppercase tracking-wider bg-white/10 text-white/80 border border-white/15">
                {user?.role || "Admin"}
              </span>
            </div>
          </div>

          <button
            onClick={() => logoutUser()}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xs text-xs font-bold text-white/80 hover:text-white hover:bg-white/10 border border-white/15 transition-all cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
