import { Bell, LogOut, User, Menu } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserInfo, logout as logoutApi } from "../../../api/auth_api.js";
import { useNavigate } from "react-router-dom";

const ResidentNavbar = ({ pageTitle, drawerId }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ["resident"],
    queryFn: getUserInfo,
  });

  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["resident"]);
      navigate("/login");
    },
  });

  return (
    <header className="h-14 bg-base-100 border-b border-base-300 flex items-center justify-between px-4 shrink-0">
      {/* Hamburger — mobile only */}
      <div className="flex items-center gap-3">
        <label
          htmlFor={drawerId}
          aria-label="open sidebar"
          className="btn btn-square btn-ghost btn-sm lg:hidden"
        >
          <Menu size={20} />
        </label>
        <h1 className="text-base font-semibold text-base-content">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="indicator">
          <span className="indicator-item badge badge-error badge-xs"></span>
          <button className="btn btn-ghost btn-circle btn-sm">
            <Bell size={18} />
          </button>
        </div>

        {/* User dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-lg hover:bg-base-200 transition-colors">
            <div className="avatar avatar-placeholder">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-bold">
                <User size={16} />
              </div>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold leading-tight">
                {user?.fullname || "Resident"}
              </p>
              <p className="text-xs text-muted leading-tight">Registered Resident</p>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu menu-sm bg-base-100 rounded-box z-50 mt-2 w-48 p-2 shadow-lg border border-base-300"
          >
            <li>
              <a className="text-sm">
                <User size={14} /> Profile
              </a>
            </li>
            <li>
              <button
                onClick={() => logout()}
                className="text-sm text-error"
              >
                <LogOut size={14} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default ResidentNavbar;
