import {
  Users,
  ChartNoAxesCombined,
  ShieldCheck,
  ClipboardList,
  ClipboardClock,
  ClockAlert,
  FileExclamationPoint,
  Circle,
  CircleCheck,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import UserTable from "./UserTable";

const DocumentsManagement = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <Sidebar />
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
          <h1 className="font-semibold">Documents Request</h1>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <div className="flex justify-between items-center py-5">
            {/* Card 1 */}
            <div className="card card-border bg-base-100 w-96 shadow-lg">
              <div className="card-body">
                <div className="flex justify-between gap-10">
                  <h2 className="card-title text-sm text-gray-500">
                    Total Pending
                  </h2>
                </div>
                <div className="inline-flex">
                  <p className="text-3xl font-bold mt-2">24</p>
                  <span className="bg-blue-100 p-3 rounded-sm">
                    <ClipboardClock size={25} color="blue" />
                  </span>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="card card-border bg-base-100 w-96 shadow-lg">
              <div className="card-body">
                <div className="flex justify-between gap-10">
                  <h2 className="card-title text-sm text-gray-500">
                    Urgent Request
                    <Circle color="red" size={5} className="m-1" />
                  </h2>
                </div>
                <div className="inline-flex">
                  <p className="text-3xl font-bold">1,150</p>
                  <span className="bg-red-100 p-3 rounded-sm">
                    <FileExclamationPoint size={25} color="red" />
                  </span>
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
                </div>
                <div className="inline-flex">
                  <p className="text-3xl font-bold">134</p>
                  <span className="bg-green-100 p-3 rounded-sm">
                    <CircleCheck size={25} color="green" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-full my-5">
              <label className="input">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <div>
                  <input type="search" className="grow" placeholder="Search" />
                </div>
              </label>
            </div>
            <div className="inline-flex my-5 w-full space-x-5">
              <select class="select w-full">
                <option disabled selected>
                  Filter by Role
                </option>
                <option>Admin</option>
                <option>Staff</option>
                <option>Resident</option>
              </select>
              <select class="select w-full">
                <option disabled selected>
                  Status
                </option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Suspended</option>
                <option>Deactivated</option>
              </select>
            </div>
          </div>
          <UserTable />
          <div className="mt-10 flex justify-between">
            <div>
              <span className="text-xs ">Showing 1 to 4 of 20 entries</span>
            </div>
            <div className="join me-20">
              <button className="join-item btn">1</button>
              <button className="join-item btn btn-active">2</button>
              <button className="join-item btn">3</button>
              <button className="join-item btn">4</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsManagement;
