import {
  Landmark,
  LayoutDashboard,
  User,
  File,
  TriangleAlert,
  Megaphone,
  Users,
  ChartNoAxesCombined,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";

const UserManagement = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
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
                  <span className="is-drawer-close:hidden">
                    User Management
                  </span>
                </Link>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="File"
              >
                <File size={20} />
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
          </ul>
        </div>
      </div>
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
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
          <div className="px-4">Admin</div>
          <h1 className="font-semibold">User Management</h1>
        </nav>
        {/* Page content here */}
        <div className="min-h-screen w-full bg-[#f9fafb] relative">
          {/* Diagonal Fade Center Grid Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
        linear-gradient(to right, #6188c2 1px, transparent 1px),
        linear-gradient(to bottom, #6188c2 1px, transparent 1px)
      `,
              backgroundSize: "32px 32px",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
              maskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
            }}
          />
          <div className="p-4">
            <div className="flex justify-evenly items-center py-5">
              {/* Card 1 */}
              <div className="card card-border bg-base-100 w-96 shadow-lg">
                <div className="card-body">
                  <div className="flex justify-between gap-10">
                    <h2 className="card-title text-sm text-gray-500">
                      Total Residents
                    </h2>
                    <span className="bg-blue-100 p-3 rounded-sm">
                      <Users size={15} color="blue" />
                    </span>
                  </div>
                  <div className="inline">
                    <p className="text-3xl font-bold">1,284</p>
                    <div className="text-green-600 inline-flex mt-2">
                      <ChartNoAxesCombined color="green" />
                      <span className="text-xs mt-2 font-semibold">
                        +12 from last month
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className="card card-border bg-base-100 w-96 shadow-lg">
                <div className="card-body">
                  <div className="flex justify-between gap-10">
                    <h2 className="card-title text-sm text-gray-500">
                      Verified
                    </h2>
                    <span className="bg-green-100 p-3 rounded-sm">
                      <ShieldCheck size={15} color="green" />
                    </span>
                  </div>
                  <div className="inline">
                    <p className="text-3xl font-bold">1,150</p>
                    <div className="text-gray-600 inline-flex mt-2">
                      <span className="text-xs mt-2 font-semibold">
                        89% of total population
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="card card-border bg-base-100 w-96 shadow-lg">
                <div className="card-body">
                  <div className="flex justify-between gap-10">
                    <h2 className="card-title text-sm text-gray-500">
                      Pending Verification
                    </h2>
                    <span className="bg-orange-100 p-3 rounded-sm">
                      <ClipboardList size={15} color="orange" />
                    </span>
                  </div>
                  <div className="inline">
                    <p className="text-3xl font-bold">134</p>
                    <div className="text-orange-600 inline-flex mt-2">
                      <span className="text-xs mt-2 font-semibold">
                        Requires Action
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
