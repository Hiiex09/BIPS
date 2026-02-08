import { Users } from "lucide-react";
import { getAllResidentCount } from "../../../hooks/UseUserRouteHooks";

const TotalResidents = () => {
  const { data, isLoading, error } = getAllResidentCount();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>No data fetch</p>;
  }
  return (
    <div className="p-5 rounded-lg  dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm">
      <Users size={50} className="bg-blue-200 p-2 text-blue-900 rounded-md" />
      <p className="text-sm font-semibold text-neutral pt-3">Total Residents</p>
      <span className="text-3xl font-bold">{data || 0}</span>
    </div>
  );
};

export default TotalResidents;
