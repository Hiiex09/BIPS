import { Home, Newspaper, Heart, ScrollText, ShieldAlert, BrickWall, FileText, MessageSquareWarning } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", to: "/Resident" },
  { icon: Newspaper, label: "Community News", to: "/Resident/news" },
  { icon: Heart, label: "Health Center", to: "/Resident/health" },
  { icon: ScrollText, label: "Ordinances", to: "/Resident/ordinances" },
  { icon: ShieldAlert, label: "Emergency", to: "/Resident/emergency" },
];

const quickLinks = [
  { icon: FileText, label: "Request Documents", to: "/Resident/documents" },
  { icon: MessageSquareWarning, label: "Submit Concern", to: "/Resident/concerns" },
];

const ResidentSidebar = () => {
  return (
    <aside className="w-60 min-h-screen bg-base-100 border-r border-base-300 flex flex-col shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-base-300">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
          <BrickWall size={20} className="text-primary-content" />
        </div>
        <div>
          <div className="font-bold text-sm leading-tight">Barangay</div>
          <div className="text-xs text-muted">Digital Portal</div>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-3 py-4">
        <p className="text-xs font-semibold text-muted uppercase tracking-wider px-2 mb-3">
          Main Menu
        </p>
        <ul className="menu menu-sm p-0 gap-1">
          {navItems.map(({ icon: Icon, label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/Resident"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-content"
                      : "text-base-content hover:bg-base-200"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="divider my-3 text-xs text-muted">Quick Access</div>

        <ul className="menu menu-sm p-0 gap-1">
          {quickLinks.map(({ icon: Icon, label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-content"
                      : "text-base-content hover:bg-base-200"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Need Help */}
      <div className="mx-3 mb-4 p-4 bg-primary/8 rounded-xl border border-primary/20">
        <p className="text-xs font-semibold text-base-content mb-1">Need help?</p>
        <p className="text-xs text-muted mb-3 leading-snug">
          Contact the helpdesk for any concerns or certificate requests.
        </p>
        <button className="btn btn-primary btn-xs btn-block">Support Center</button>
      </div>
    </aside>
  );
};

export default ResidentSidebar;
