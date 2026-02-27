import { useState } from "react";
import { Users, ShieldCheck, ClipboardList } from "lucide-react";
import StatsCard from "../../components/admin/StatsCard";
import SearchFilterBar from "../../components/admin/SearchFilterBar";
import Pagination from "../../components/admin/Pagination";
import { mockUsers, userStats } from "../../data/mockData";

const DemoPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockUsers.length / itemsPerPage);

  const currentUsers = mockUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const roleFilters = [
    { label: "All Roles", value: "all" },
    { label: "Admin", value: "Admin" },
    { label: "Staff", value: "Staff" },
    { label: "Resident", value: "Resident" }
  ];

  const statusFilters = [
    { label: "All Statuses", value: "all" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "Suspended", value: "Suspended" },
    { label: "Pending", value: "Pending" }
  ];

  const getStatusBadgeClass = (status) => {
    const classes = {
      Active: "badge-success",
      Inactive: "badge-neutral",
      Suspended: "badge-error",
      Pending: "badge-warning"
    };
    return classes[status] || "badge-neutral";
  };

  const getVerifiedBadgeClass = (verified) => {
    const classes = {
      Verified: "badge-success",
      Pending: "badge-warning",
      Rejected: "badge-error"
    };
    return classes[verified] || "badge-neutral";
  };

  return (
    <div className="min-h-screen bg-base-200/30">
      {/* Header */}
      <div className="bg-base-100 border-b border-base-content/10 p-6 mb-6">
        <h1 className="text-3xl font-bold text-primary">Barangay Management System</h1>
        <p className="text-muted mt-2">User Management Dashboard - Demo</p>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Residents"
            value={userStats.totalResidents.toLocaleString()}
            subtitle={`+${userStats.growthFromLastMonth} from last month`}
            icon={Users}
            iconColor="text-primary"
            iconBg="bg-primary/10"
            trend={true}
          />
          <StatsCard
            title="Verified"
            value={userStats.verified.toLocaleString()}
            subtitle={`${Math.round((userStats.verified / userStats.totalResidents) * 100)}% of total population`}
            icon={ShieldCheck}
            iconColor="text-success"
            iconBg="bg-success/10"
          />
          <StatsCard
            title="Pending Verification"
            value={userStats.pendingVerification}
            subtitle="Requires Action"
            icon={ClipboardList}
            iconColor="text-warning"
            iconBg="bg-warning/10"
          />
        </div>

        {/* Search and Filters */}
        <SearchFilterBar
          searchPlaceholder="Search by name, email, or address..."
          filters={[
            {
              placeholder: "Filter by Role",
              options: roleFilters,
              onChange: (value) => console.log("Role filter:", value)
            },
            {
              placeholder: "Filter by Status",
              options: statusFilters,
              onChange: (value) => console.log("Status filter:", value)
            }
          ]}
        />

        {/* Users Table */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead className="bg-base-200">
                  <tr>
                    <th className="w-16">#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Verified</th>
                    <th>Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr key={user.id} className="hover">
                      <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                      <td>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted">{user.address}</div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className="badge badge-outline badge-sm">
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-sm ${getStatusBadgeClass(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-sm ${getVerifiedBadgeClass(user.verified)}`}>
                          {user.verified}
                        </span>
                      </td>
                      <td className="text-sm">{user.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={mockUsers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DemoPage;
