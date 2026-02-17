import {
  Landmark,
  LayoutDashboard,
  User,
  File,
  TriangleAlert,
  Megaphone,
  ClipboardClock,
} from "lucide-react";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Sidebar content here */}
        <ul className="menu w-full grow">
          {/* List item */}
          <li>
            <div
              className="flex justify-even items-center flex-row is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Barangay Portal"
            >
              <div>
                <Landmark size={20} />
              </div>
              <div>
                <p className="is-drawer-close:hidden">Barangay Portal</p>
                <span className="text-xs is-drawer-close:hidden">
                  Official Admin Access
                </span>
              </div>
            </div>
          </li>
          <li>
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Dashboard"
            >
              <LayoutDashboard size={20} />
              <Link to="/welcome">
                <span className="is-drawer-close:hidden">Dashboard</span>
              </Link>
            </button>
          </li>
          <li>
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="User Management"
            >
              <User size={20} />
              <Link to="/user-management">
                <span className="is-drawer-close:hidden">User Management</span>
              </Link>
            </button>
          </li>
          <li>
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="File"
            >
              <File size={20} />
              <Link to="/document-management">
                <span className="is-drawer-close:hidden">Document Request</span>
              </Link>
            </button>
          </li>
          <li>
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Incident Reports"
            >
              <TriangleAlert size={20} />
              <span className="is-drawer-close:hidden">Incident Reports</span>
            </button>
          </li>
          <li>
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Announcements"
            >
              <Megaphone size={20} />
              <span className="is-drawer-close:hidden">Announcements</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
