import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../api/auth_api.js";
import { Link } from "react-router";
import ResidetNav from "./ResidentComponents/ResidetNav.jsx";

const Navbar = () => {
  const { data: users } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
  });

  return (
    <>
      <div className="navbar bg-base-100 sticky top-0 z-50 shadow px-4 lg:px-10">
        <div className="flex-1">
          <span className="text-xl font-bold text-primary">
            Barangay Tejero
          </span>
        </div>

        {!users ? (
          <>
            <div className="hidden lg:flex">
              <ul className="menu menu-horizontal gap-2">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/services"}>Services</Link>
                </li>
                <li>
                  <Link to={"/announcements"}>Announcements</Link>
                </li>
                <li>
                  <Link to={"/about"}>About</Link>
                </li>
              </ul>
            </div>
            <button className="btn btn-primary mx-2">
              <Link to={"/login"}>Login</Link>
            </button>
          </>
        ) : (
          <div className="flex justify-center ">
            <ResidetNav />
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
