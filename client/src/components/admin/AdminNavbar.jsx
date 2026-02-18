import { Home, Search } from "lucide-react";
import { logoutAuthUsers } from "../../hooks/UseAuthRouteHooks.js";

const AdminNavbar = ({ title = "Dashboard", showSearch = true }) => {
  const { mutate } = logoutAuthUsers();

  const handleLogout = () => {
    mutate();
  };

  return (
    <nav className="navbar w-full bg-base-300 border-b border-base-content/10">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-4"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="inline-block size-5"
          >
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 4v16"></path>
            <path d="M14 10l2 2l-2 2"></path>
          </svg>
        </label>
      </div>

      <div className="flex-1 px-4">
        <div className="flex items-center gap-3">
          <Home size={24} className="text-primary" />
          <span className="text-lg font-semibold">{title}</span>
        </div>
      </div>

      {showSearch && (
        <div className="flex-none hidden md:flex px-4">
          <label className="input input-sm flex items-center gap-2 w-64">
            <Search size={16} className="opacity-50" />
            <input type="text" placeholder="Search..." className="grow" />
          </label>
        </div>
      )}

      <div className="flex-none px-4">
        <button
          onClick={handleLogout}
          className="btn btn-sm btn-primary"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
