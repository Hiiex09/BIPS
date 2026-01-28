import { Plus } from "lucide-react";

const AnnouncementPortal = () => {
  return (
    <div className="grid grid-cols-2 gap-5 mt-5">
      <div className="p-5 rounded-lg  dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Recent Announcements</h2>
          <button className="inline-flex bg-primary px-3 py-1 rounded-md text-white">
            <Plus />
            Post New
          </button>
        </div>
        <div className="bg-gray-100 p-2 mt-3 rounded">
          <h3 className="text-blue-500 font-bold">Health & Wellness</h3>
          <p className="font-bold">Scheduled Vaccination Drive</p>
          <span className="text-gray-500">
            Oct 30, 8:00 AM at the Barangay Plaza Hall
          </span>
        </div>
        <div className="bg-gray-100 p-2 mt-3 rounded">
          <h3 className="text-blue-500 font-bold">Community</h3>
          <p className="font-bold">Monthly Clean-up Drive</p>
          <span className="text-gray-500">
            All residents of zone 4 are encouraged to participate
          </span>
        </div>
      </div>
      <div className="p-5 rounded-lg  dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm">
        <h2 className="font-bold">Portal Activity Feed</h2>
        <div className="float-start">
          <ul className="timeline timeline-vertical">
            <li>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box font-bold text-green-900 bg-green-300">
                <p>Admin Approved Clearance Request</p>
              </div>
              <hr />
            </li>
            <li>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box font-bold text-blue-900 bg-blue-300">
                <p>New Resident Registered</p>
              </div>
              <hr />
            </li>
            <li>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box font-bold text-red-900 bg-red-300">
                <p>New Incident Report</p>
              </div>
              <hr />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPortal;
