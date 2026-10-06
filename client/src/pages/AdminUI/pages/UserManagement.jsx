import {
  Users,
  ShieldCheck,
  ClipboardList,
  Eye,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "../../../components/admin/PageLayout";
import StatsCard from "../../../components/admin/StatsCard";
import SearchFilterBar from "../../../components/admin/SearchFilterBar";
import Pagination from "../../../components/admin/Pagination";
import { getUsersListApi } from "../../../api/user_api";

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const itemsPerPage = 8;

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["usersList", { search, role: roleFilter, status: statusFilter }],
    queryFn: () =>
      getUsersListApi({
        search: search || undefined,
        role: roleFilter !== "all" ? roleFilter : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
      }),
  });

  const totalResidents = users.filter((u) => u.role === "Resident").length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const totalStaff = users.filter((u) => u.role === "Staff" || u.role === "Admin").length;

  const totalPages = Math.ceil(users.length / itemsPerPage) || 1;
  const currentUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const roleFilters = [
    { label: "All Roles", value: "all" },
    { label: "Admin", value: "Admin" },
    { label: "Staff", value: "Staff" },
    { label: "Resident", value: "Resident" },
  ];

  const statusFilters = [
    { label: "All Statuses", value: "all" },
    { label: "Active", value: "Active" },
    { label: "Suspended", value: "Suspended" },
    { label: "Deactivated", value: "Deactivated" },
  ];

  const getStatusBadgeClass = (status) => {
    const classes = {
      Active: "badge-success",
      Suspended: "badge-error",
      Deactivated: "badge-neutral",
    };
    return classes[status] || "badge-neutral";
  };

  return (
    <PageLayout title="User Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Residents"
            value={totalResidents}
            subtitle="Registered residents"
            icon={Users}
            iconColor="text-primary"
            iconBg="bg-primary/10"
          />
          <StatsCard
            title="Active Accounts"
            value={activeUsers}
            subtitle="In good standing"
            icon={ShieldCheck}
            iconColor="text-success"
            iconBg="bg-success/10"
          />
          <StatsCard
            title="Barangay Personnel"
            value={totalStaff}
            subtitle="Admins & Staff members"
            icon={ClipboardList}
            iconColor="text-warning"
            iconBg="bg-warning/10"
          />
        </div>

        {/* Search and Filters */}
        <SearchFilterBar
          searchPlaceholder="Search by name, email, or mobile..."
          onSearchChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          filters={[
            {
              placeholder: "Filter by Role",
              options: roleFilters,
              onChange: (value) => {
                setRoleFilter(value);
                setCurrentPage(1);
              },
            },
            {
              placeholder: "Filter by Status",
              options: statusFilters,
              onChange: (value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              },
            },
          ]}
        />

        {/* Users Table */}
        <div className="card bg-base-100 shadow-2xs">
          <div className="card-body p-0">
            {isLoading ? (
              <div className="flex justify-center items-center p-12 gap-3">
                <Loader2 className="animate-spin text-primary" size={24} />
                <span>Loading users...</span>
              </div>
            ) : error ? (
              <div className="alert alert-error m-4">
                <span>Failed to load users.</span>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center p-12 text-base-content/60">
                No users found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead className="bg-base-200">
                    <tr>
                      <th className="w-16">#</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Address</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((u, index) => (
                      <tr key={u._id || index} className="hover">
                        <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                        <td className="font-semibold">
                          {u.firstName} {u.lastName}
                        </td>
                        <td className="text-sm">{u.email}</td>
                        <td className="text-sm">{u.mobile}</td>
                        <td className="text-sm max-w-xs truncate">{u.address}</td>
                        <td>
                          <span
                            className={`badge badge-sm ${
                              u.role === "Admin"
                                ? "badge-error"
                                : u.role === "Staff"
                                  ? "badge-warning"
                                  : "badge-ghost"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <span className={`badge badge-sm ${getStatusBadgeClass(u.status)}`}>
                            {u.status || "Active"}
                          </span>
                        </td>
                        <td>
                          <div className="flex justify-center gap-1">
                            <button
                              className="btn btn-ghost btn-xs"
                              title="View user details"
                              onClick={() => setSelectedUser(u)}
                            >
                              <Eye size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* View User Modal */}
        {selectedUser && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-3">User Details</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {selectedUser.mobile}
                </p>
                <p>
                  <strong>Address:</strong> {selectedUser.address}
                </p>
                <p>
                  <strong>Role:</strong> {selectedUser.role}
                </p>
                <p>
                  <strong>Status:</strong> {selectedUser.status || "Active"}
                </p>
                <p>
                  <strong>Member Since:</strong>{" "}
                  {selectedUser.createdAt
                    ? new Date(selectedUser.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
                {selectedUser.idUpload && (
                  <div>
                    <strong>ID Attachment:</strong>
                    <div className="mt-1">
                      <a
                        href={`/uploads/${selectedUser.idUpload}`}
                        target="_blank"
                        rel="noreferrer"
                        className="link link-primary"
                      >
                        View Uploaded ID
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-sm"
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {users.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={users.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default UserManagement;
