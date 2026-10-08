import {
  Users,
  ShieldCheck,
  ClipboardList,
  Eye,
  Loader2,
  X
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
  const itemsPerPage = 10;

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

  const getRoleBadge = (role) => {
    switch (role) {
      case "Admin":
        return (
          <span className="inline-block px-1.5 py-0.2 rounded-2xs text-[9px] font-black uppercase text-primary bg-primary/10 border border-primary/20">
            Admin
          </span>
        );
      case "Staff":
        return (
          <span className="inline-block px-1.5 py-0.2 rounded-2xs text-[9px] font-black uppercase text-amber-600 bg-amber-500/10 border border-amber-500/20">
            Staff
          </span>
        );
      default:
        return (
          <span className="inline-block px-1.5 py-0.2 rounded-2xs text-[9px] font-black uppercase text-base-content/60 bg-base-200 border border-base-300">
            Resident
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-block px-1.5 py-0.2 rounded-2xs text-[9px] font-black uppercase text-teal-700 bg-teal-600/10 border border-teal-600/20">
            Active
          </span>
        );
      case "Suspended":
        return (
          <span className="inline-block px-1.5 py-0.2 rounded-2xs text-[9px] font-black uppercase text-red-700 bg-red-500/10 border border-red-500/20">
            Suspended
          </span>
        );
      default:
        return (
          <span className="inline-block px-1.5 py-0.2 rounded-2xs text-[9px] font-black uppercase text-base-content/50 bg-base-200 border border-base-300">
            {status || "Inactive"}
          </span>
        );
    }
  };

  return (
    <PageLayout title="User Directory & Identity Records">
      <div className="space-y-5">
        {/* ── KPI Ledger Strip ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <StatsCard
            title="Registered Residents"
            value={totalResidents}
            subtitle="Citizen verified accounts"
            icon={Users}
          />
          <StatsCard
            title="Active Standing Accounts"
            value={activeUsers}
            subtitle="Authorized identity records"
            icon={ShieldCheck}
          />
          <StatsCard
            title="Appointed Personnel"
            value={totalStaff}
            subtitle="Admins & authorized staff"
            icon={ClipboardList}
          />
        </div>

        {/* ── Search & Filter Controls ── */}
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

        {/* ── Swiss Ledger Table (Layout 01) ── */}
        <div className="bg-base-100 border border-base-300 rounded-xs shadow-2xs overflow-hidden">
          <div className="p-3 border-b border-base-300 bg-base-200/40 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
              Directory Ledger ({users.length} Records)
            </span>
            <span className="text-[11px] font-semibold text-base-content/60">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {isLoading ? (
            <div className="p-12 flex justify-center items-center gap-3 text-xs font-bold text-base-content/60">
              <Loader2 className="animate-spin text-primary" size={20} />
              <span>Loading resident records...</span>
            </div>
          ) : error ? (
            <div className="alert alert-error rounded-xs m-4 text-xs">
              <span>Failed to load directory.</span>
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center text-xs text-base-content/60 font-semibold">
              No matching records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-base-300 text-[10px] uppercase tracking-wider text-base-content/50 bg-base-200/20">
                    <th className="py-2.5 px-4 font-bold w-12">#</th>
                    <th className="py-2.5 px-4 font-bold">Resident / Staff Name</th>
                    <th className="py-2.5 px-4 font-bold">Email</th>
                    <th className="py-2.5 px-4 font-bold">Mobile</th>
                    <th className="py-2.5 px-4 font-bold">Registered Address</th>
                    <th className="py-2.5 px-4 font-bold">Role</th>
                    <th className="py-2.5 px-4 font-bold">Status</th>
                    <th className="py-2.5 px-4 font-bold text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300 font-medium">
                  {currentUsers.map((u, index) => (
                    <tr
                      key={u._id || index}
                      className="hover:bg-base-200/40 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-[11px] text-base-content/50">
                        {String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, "0")}
                      </td>
                      <td className="py-3 px-4 font-bold text-base-content">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="py-3 px-4 text-base-content/70 font-mono text-[11px]">
                        {u.email}
                      </td>
                      <td className="py-3 px-4 text-base-content/70 font-mono text-[11px]">
                        {u.mobile}
                      </td>
                      <td className="py-3 px-4 text-base-content/70 max-w-xs truncate">
                        {u.address}
                      </td>
                      <td className="py-3 px-4">{getRoleBadge(u.role)}</td>
                      <td className="py-3 px-4">{getStatusBadge(u.status)}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          className="btn btn-2xs btn-ghost border border-base-300 hover:border-primary rounded-xs text-[10px] font-bold cursor-pointer"
                          onClick={() => setSelectedUser(u)}
                        >
                          <Eye size={12} />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Footer */}
          {users.length > 0 && (
            <div className="p-3 border-t border-base-300 bg-base-100 flex justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={users.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>

        {/* ── Swiss Inspection Modal ── */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-base-100 border border-base-300 rounded-xs shadow-xl w-full max-w-md p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between pb-3 border-b border-base-300">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    Identity Dossier
                  </span>
                  <h3 className="text-base font-black text-base-content">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="btn btn-xs btn-ghost btn-square"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="bg-base-200/40 border border-base-300 rounded-xs divide-y divide-base-300 text-xs">
                <div className="p-2.5 flex justify-between">
                  <span className="text-base-content/60 font-semibold">Email</span>
                  <span className="font-mono font-bold text-base-content">{selectedUser.email}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-base-content/60 font-semibold">Mobile</span>
                  <span className="font-mono font-bold text-base-content">{selectedUser.mobile}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-base-content/60 font-semibold">Role</span>
                  <span>{getRoleBadge(selectedUser.role)}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-base-content/60 font-semibold">Status</span>
                  <span>{getStatusBadge(selectedUser.status)}</span>
                </div>
                <div className="p-2.5 flex flex-col gap-1">
                  <span className="text-base-content/60 font-semibold">Residential Address</span>
                  <span className="font-medium text-base-content">{selectedUser.address}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-base-content/60 font-semibold">Registered On</span>
                  <span className="font-mono text-base-content">
                    {selectedUser.createdAt
                      ? new Date(selectedUser.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  className="btn btn-sm btn-ghost border border-base-300 rounded-xs font-bold text-xs"
                  onClick={() => setSelectedUser(null)}
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default UserManagement;
