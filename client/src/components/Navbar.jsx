import { BrickWall, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm w-screen px-3">
        {/* Left Section */}
        <div className="flex-1 flex items-center gap-3">
          <BrickWall size={30} />

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 font-medium">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="#">Services</Link>
            </li>
            <li>
              <Link to="#">Announcements</Link>
            </li>
            <li>
              <Link to="#">About</Link>
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
          <Link to={"/login"} className="btn btn-primary btn-sm">
            Resident Login
          </Link>
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
              <a href="#Home">Home</a>
            </li>
            <li>
              <a href="#Services">Services</a>
            </li>
            <li>
              <a href="#Announcements">Announcements</a>
            </li>
            <li>
              <a href="#About">About</a>
            </li>

            <input
              type="text"
              placeholder="Search Services"
              className="input input-bordered input-sm w-full"
            />

            <button className="btn btn-primary btn-sm w-full">
              Resident Login
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
