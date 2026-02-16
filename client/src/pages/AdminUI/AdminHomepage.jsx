import { ClipboardClock, TriangleAlert, User, Users } from "lucide-react";
import AdminTable from "./AdminTable";
import AnnouncementPortal from "./AnnouncementPortal";
import TotalResidents from "./components/TotalResidents";

const AdminHomepage = () => {
  return (
    <div className="p-5">
      <div className=" grid grid-flow-col grid-cols-3 gap-10">
        <TotalResidents />
        <div className="p-5 rounded-lg  dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm">
          <ClipboardClock
            size={50}
            className="bg-yellow-100 p-2 text-yellow-900 rounded-md"
          />
          <p className="text-sm font-semibold text-neutral pt-3">
            Pending Request
          </p>
          <span className="text-3xl font-bold">15</span>
        </div>
        <div className="p-5 rounded-lg  dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm">
          <TriangleAlert
            size={50}
            className="bg-red-100 p-2 text-red-900 rounded-md"
          />
          <p className="text-sm font-semibold text-neutral pt-3">
            Active Incidents
          </p>
          <span className="text-3xl font-bold">08</span>
        </div>
      </div>
      <AdminTable />
      <AnnouncementPortal />
    </div>
  );
};

export default AdminHomepage;
