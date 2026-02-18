import { BrickWall, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { checkAuthUsers, logoutAuthUsers } from "../hooks/UseAuthRouteHooks.js";
const Navbar = () => {
  const { user, isLoading, error } = checkAuthUsers();
  const { mutate } = logoutAuthUsers();

  const handleLogout = () => {
    mutate();
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm w-screen px-3">
        {/* Left Section */}
        <div className="flex-1 flex items-center gap-3">
          <BrickWall size={30} />

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 font-medium">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
            </li>
            <li>
              <Link to="/announcements" className="hover:text-primary transition-colors">Announcements</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <input
            type="text"
            placeholder="Search Services"
            className="input input-bordered input-sm"
          />
          {user ? (
            <button onClick={handleLogout} className="btn btn-error btn-sm">
              Logout
            </button>
          ) : (
            <Link to={"/login"} className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-ghost">
            <Menu size={26} />
          </button>

          {/* Mobile Dropdown */}
          <ul
            tabIndex={0}
            className="dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-56 space-y-3"
          >
            <li>
              <Link to="/" className="block py-2">Home</Link>
            </li>
            <li>
              <Link to="/services" className="block py-2">Services</Link>
            </li>
            <li>
              <Link to="/announcements" className="block py-2">Announcements</Link>
            </li>
            <li>
              <Link to="/about" className="block py-2">About</Link>
            </li>

            <input
              type="text"
              placeholder="Search Services"
              className="input input-bordered input-sm w-full"
            />
            {user ? (
              <button
                onClick={handleLogout}
                className="btn btn-md bg-blue-300 text-blue-900 w-full"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm w-full">
                Login
              </Link>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
