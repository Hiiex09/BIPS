import {
  File,
  Home,
  Landmark,
  LayoutDashboard,
  Megaphone,
  MessageCircleQuestion,
  Settings,
  TriangleAlert,
  User,
} from "lucide-react";
import AdminHomepage from "./AdminHomepage";

const AdminLandingPage = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <div>
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
          </div>
          <div className="px-4 w-full flex justify-even items-center gap-8">
            <div className="flex justify-between items-center gap-2">
              <Home size={30} />
              <span className="font-bold">Official Admin Dashboard</span>
            </div>
            <input
              type="text"
              placeholder="Search Service"
              className="input w-75"
            />
          </div>
          <div className="me-15 flex justify-center items-center gap-3">
            <div>
              <p>Sample</p>
              <span></span>
            </div>
            <div className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
          </div>
        </nav>

        <AdminHomepage />
      </div>

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
                <span className="is-drawer-close:hidden">Dashboard</span>
              </button>
            </li>

            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="User Management"
              >
                <User size={20} />
                <span className="is-drawer-close:hidden">User Management</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="File"
              >
                <File scale={20} />
                <span className="is-drawer-close:hidden">Document Request</span>
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
            {/* <hr className="pt-90 mt-20" />
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <Settings size={20} />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Help"
              >
                <MessageCircleQuestion size={20} />
                <span className="is-drawer-close:hidden">Help</span>
              </button>
            </li>
            <li className="footer">Captain</li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLandingPage;
