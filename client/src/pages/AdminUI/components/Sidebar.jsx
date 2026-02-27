import {
  Landmark,
  LayoutDashboard,
  User,
  File,
  TriangleAlert,
  Megaphone
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      path: "/welcome",
      icon: LayoutDashboard,
      label: "Dashboard",
      tooltip: "Dashboard"
    },
    {
      path: "/user-management",
      icon: User,
      label: "User Management",
      tooltip: "User Management"
    },
    {
      path: "/document-management",
      icon: File,
      label: "Document Requests",
      tooltip: "Document Requests"
    },
    {
      path: "/incident-reports",
      icon: TriangleAlert,
      label: "Incident Reports",
      tooltip: "Incident Reports"
    },
    {
      path: "/announcements",
      icon: Megaphone,
      label: "Announcements",
      tooltip: "Announcements"
    }
  ];

  return (
    <div className="drawer-side is-drawer-close:overflow-visible z-10">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-64 border-r border-base-content/10">
        {/* Sidebar Header */}
        <div className="w-full p-4 border-b border-base-content/10">
          <div
            className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Barangay Portal"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <Landmark size={24} className="text-primary" />
            </div>
            <div className="is-drawer-close:hidden">
              <p className="font-bold text-base">Barangay Portal</p>
              <span className="text-xs text-muted">Official Admin Access</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <ul className="menu w-full grow p-2 gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                    ${active ? 'active bg-primary text-primary-content' : ''}
                  `}
                  data-tip={item.tooltip}
                >
                  <Icon size={20} />
                  <span className="is-drawer-close:hidden">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="w-full p-4 border-t border-base-content/10">
          <div className="text-xs text-muted text-center is-drawer-close:hidden">
            <p>Barangay Management</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
