import React from "react";

const AdminTable = () => {
  return (
    <div className="mt-5 overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="bg-base-300">
            <th>RESIDENT NAME</th>
            <th>DOCUMENT TYPE</th>
            <th>DATE REQUESTED</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="inline-flex justify-center items-center gap-2">
              <p className="bg-blue-200 w-10 h-10 rounded-full flex items-center justify-center text-blue-800 font-semibold">
                JC
              </p>
              <p>Juan Dela Cruz</p>
            </th>
            <td className="text-gray-500 font-semibold">Barangay Clearance</td>
            <td className="text-gray-500 font-semibold">Oct 24, 2023</td>
            <td>
              <span className="bg-yellow-200 p-2 rounded text-orange-900 font-semibold">
                Pending
              </span>
            </td>
            <td className="flex gap-2">
              <button className="px-2 py-1 font-semibold bg-primary text-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm rounded btn">
                Approve
              </button>
              <button className="px-2 py-1 font-semibold bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm rounded btn">
                Reject
              </button>
            </td>
          </tr>
          <tr>
            <th className="inline-flex justify-center items-center gap-2">
              <p className="bg-green-200 w-10 h-10 rounded-full flex items-center justify-center text-green-800 font-semibold">
                DB
              </p>
              <p>Devon Barangan</p>
            </th>
            <td className="text-gray-500 font-semibold">Barangay Indigency</td>
            <td className="text-gray-500 font-semibold">Oct 24, 2023</td>
            <td>
              <span className="bg-yellow-200 p-2 rounded text-orange-900 font-semibold">
                Pending
              </span>
            </td>
            <td className="flex gap-2">
              <button className="px-2 py-1 font-semibold bg-primary text-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm rounded btn">
                Approve
              </button>
              <button className="px-2 py-1 font-semibold bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm rounded btn">
                Reject
              </button>
            </td>
          </tr>
          <tr>
            <th className="inline-flex justify-center items-center gap-2">
              <p className="bg-purple-200 w-10 h-10 rounded-full flex items-center justify-center text-purple-800 font-semibold">
                JE
              </p>
              <p>Juan Dela Cruz</p>
            </th>
            <td className="text-gray-500 font-semibold">Barangay Clearance</td>
            <td className="text-gray-500 font-semibold">Oct 24, 2023</td>
            <td>
              <span className="bg-yellow-200 p-2 rounded text-orange-900 font-semibold">
                Pending
              </span>
            </td>
            <td className="flex gap-2">
              <button className="px-2 py-1 font-semibold bg-primary text-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm rounded btn">
                Approve
              </button>
              <button className="px-2 py-1 font-semibold bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm rounded btn">
                Reject
              </button>
            </td>
          </tr>
          <tr>
            <th className="inline-flex justify-center items-center gap-2">
              <p className="bg-red-200 w-10 h-10 rounded-full flex items-center justify-center text-red-900 font-semibold">
                PJ
              </p>
              <p>Park Von Jae</p>
            </th>
            <td className="text-gray-500 font-semibold">Barangay Clearance</td>
            <td className="text-gray-500 font-semibold">Oct 24, 2023</td>
            <td>
              <span className="bg-yellow-200 p-2 rounded text-orange-900 font-semibold">
                Pending
              </span>
            </td>
            <td className="flex gap-2">
              <button className="px-2 py-1 font-semibold bg-primary text-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm rounded btn">
                Approve
              </button>
              <button className="px-2 py-1 font-semibold bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm rounded btn">
                Reject
              </button>
            </td>
          </tr>
          <tr>
            <th className="inline-flex justify-center items-center gap-2">
              <p className="bg-yellow-200 w-10 h-10 rounded-full flex items-center justify-center text-yellow-800 font-semibold">
                MC
              </p>
              <p>Juan Dela Cruz</p>
            </th>
            <td className="text-gray-500 font-semibold">Barangay Clearance</td>
            <td className="text-gray-500 font-semibold">Oct 24, 2023</td>
            <td>
              <span className="bg-yellow-200 p-2 rounded text-orange-900 font-semibold">
                Pending
              </span>
            </td>
            <td className="flex gap-2">
              <button className="px-2 py-1 font-semibold bg-primary text-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm rounded btn">
                Approve
              </button>
              <button className="px-2 py-1 font-semibold bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm rounded btn">
                Reject
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
