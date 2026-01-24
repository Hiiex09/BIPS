import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserInfo, logout as logoutApi } from "../../api/auth_api.js";

const ResidetNav = () => {
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Invalidate the checkAuth query so React Query refetches it
      queryClient.invalidateQueries(["checkAuth"]);
    },
    onError: (err) => console.log("Logout failed", err),
  });

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["resident"],
    queryFn: getUserInfo,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  if (!user) return null; // 👈 VERY IMPORTANT

  console.log(user);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
        <div className="dropdown dropdown-end">
          <p>
            <strong> {user.fullname}</strong>
            <strong> {user.role}</strong>
          </p>
          <span>Registered Resident</span>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={() => logout()} className="btn btn-ghost">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResidetNav;
