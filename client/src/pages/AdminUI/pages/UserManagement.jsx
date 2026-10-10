import {
  Users,
  ShieldCheck,
  ClipboardList,
  Eye,
  Loader2,
  X,
  Plus,
  Edit2,
  Trash2,
  Save,
  UserPlus,
  KeyRound
} from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PageLayout from "../../../components/admin/PageLayout";
import StatsCard from "../../../components/admin/StatsCard";
import SearchFilterBar from "../../../components/admin/SearchFilterBar";
import Pagination from "../../../components/admin/Pagination";
import { 
  getUsersListApi, 
  createUserApi, 
  updateUserApi, 
  deleteUserApi 
} from "../../../api/user_api";

const UserManagement = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Modals state
  const [selectedUser, setSelectedUser] = useState(null); // View Dossier
  const [editingUser, setEditingUser] = useState(null);   // Edit Modal
  const [showCreateModal, setShowCreateModal] = useState(false); // Create Modal

  const itemsPerPage = 10;

  // Form State for Create
  const [createForm, setCreateForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    mobile: "",
    password: "",
    role: "Resident",
    status: "Active",
  });

  // Query users
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["usersList", { search, role: roleFilter, status: statusFilter }],
    queryFn: () =>
      getUsersListApi({
        search: search || undefined,
        role: roleFilter !== "all" ? roleFilter : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
      }),
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
      toast.success("User account registered successfully");
      setShowCreateModal(false);
      setCreateForm({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        mobile: "",
        password: "",
        role: "Resident",
        status: "Active",
      });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create user");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
      toast.success("User record updated successfully");
      setEditingUser(null);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update user");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
      toast.success("User removed permanently");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to delete user");
    },
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(createForm);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      id: editingUser._id,
      data: editingUser,
    });
  };

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

        {/* ── Search & Filter Controls with + Add User ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex-1">
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
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-sm btn-primary rounded-xs font-bold text-xs gap-1.5 shadow-2xs mb-5 sm:mb-0 cursor-pointer shrink-0"
          >
            <UserPlus size={14} />
            <span>Register New User</span>
          </button>
        </div>

        {/* ── Swiss Ledger Table (Layout 01 with CRUD actions) ── */}
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
                    <th className="py-2.5 px-4 font-bold text-right">Actions</th>
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
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Dossier */}
                          <button
                            type="button"
                            title="Inspect details"
                            className="btn btn-2xs btn-ghost border border-base-300 hover:border-primary rounded-xs text-[10px] font-bold cursor-pointer"
                            onClick={() => setSelectedUser(u)}
                          >
                            <Eye size={12} />
                          </button>

                          {/* Edit User */}
                          <button
                            type="button"
                            title="Edit user"
                            className="btn btn-2xs btn-ghost border border-base-300 hover:border-primary rounded-xs text-[10px] font-bold cursor-pointer"
                            onClick={() => setEditingUser({ ...u, password: "" })}
                          >
                            <Edit2 size={12} />
                          </button>

                          {/* Delete User */}
                          <button
                            type="button"
                            title="Delete user"
                            disabled={deleteMutation.isPending}
                            className="btn btn-2xs btn-ghost border border-base-300 hover:border-error hover:text-error rounded-xs text-[10px] font-bold cursor-pointer"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete user ${u.firstName} ${u.lastName}? This action cannot be undone.`)) {
                                deleteMutation.mutate(u._id);
                              }
                            }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
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

        {/* ── View Dossier Modal (R) ── */}
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
                  aria-label="Close user dossier"
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

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="btn btn-sm btn-ghost border border-base-300 rounded-xs font-bold text-xs"
                  onClick={() => setSelectedUser(null)}
                >
                  Close Dossier
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-primary rounded-xs font-bold text-xs gap-1"
                  onClick={() => {
                    setEditingUser({ ...selectedUser, password: "" });
                    setSelectedUser(null);
                  }}
                >
                  <Edit2 size={12} />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Create User Modal (C) ── */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-base-100 border border-base-300 rounded-xs shadow-xl w-full max-w-lg p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between pb-3 border-b border-base-300">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    Citizen & Staff Enrollment
                  </span>
                  <h3 className="text-base font-black text-base-content">
                    Register New User Account
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Close user registration modal"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-xs btn-ghost btn-square"
                >
                  <X size={14} />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="create-firstname" className="block text-[11px] font-bold text-base-content/70 mb-1">
                      First Name
                    </label>
                    <input
                      id="create-firstname"
                      type="text"
                      required
                      aria-label="First Name"
                      placeholder="e.g., Juan"
                      className="input input-sm input-bordered w-full rounded-xs text-xs focus:outline-primary"
                      value={createForm.firstName}
                      onChange={(e) => setCreateForm({ ...createForm, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="create-lastname" className="block text-[11px] font-bold text-base-content/70 mb-1">
                      Last Name
                    </label>
                    <input
                      id="create-lastname"
                      type="text"
                      required
                      aria-label="Last Name"
                      placeholder="e.g., Dela Cruz"
                      className="input input-sm input-bordered w-full rounded-xs text-xs focus:outline-primary"
                      value={createForm.lastName}
                      onChange={(e) => setCreateForm({ ...createForm, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="create-email" className="block text-[11px] font-bold text-base-content/70 mb-1">
                      Email Address
                    </label>
                    <input
                      id="create-email"
                      type="email"
                      required
                      aria-label="Email Address"
                      placeholder="juan@example.com"
                      className="input input-sm input-bordered w-full rounded-xs text-xs focus:outline-primary"
                      value={createForm.email}
                      onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="create-mobile" className="block text-[11px] font-bold text-base-content/70 mb-1">
                      Mobile Number (11 digits)
                    </label>
                    <input
                      id="create-mobile"
                      type="text"
                      required
                      maxLength={11}
                      aria-label="Mobile Number (11 digits)"
                      placeholder="09123456789"
                      className="input input-sm input-bordered w-full rounded-xs text-xs focus:outline-primary font-mono"
                      value={createForm.mobile}
                      onChange={(e) => setCreateForm({ ...createForm, mobile: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="create-password" className="block text-[11px] font-bold text-base-content/70 mb-1">
                    Initial Password (min. 8 characters)
                  </label>
                  <input
                    id="create-password"
                    type="password"
                    required
                    minLength={8}
                    aria-label="Initial Password"
                    placeholder="••••••••••••"
                    className="input input-sm input-bordered w-full rounded-xs text-xs focus:outline-primary font-mono"
                    value={createForm.password}
                    onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="create-address" className="block text-[11px] font-bold text-base-content/70 mb-1">
                    Registered Home Address
                  </label>
                  <textarea
                    id="create-address"
                    required
                    rows={2}
                    aria-label="Registered Home Address"
                    placeholder="Purok, Street, Barangay Tejero, Cebu City"
                    className="textarea textarea-bordered w-full rounded-xs text-xs focus:outline-primary"
                    value={createForm.address}
                    onChange={(e) => setCreateForm({ ...createForm, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-base-content/70 mb-1">
                      Account Role
                    </label>
                    <select
                      aria-label="Account role"
                      className="select select-sm select-bordered w-full rounded-xs text-xs font-semibold focus:outline-primary"
                      value={createForm.role}
                      onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                    >
                      <option value="Resident">Resident</option>
                      <option value="Staff">Staff</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-base-content/70 mb-1">
                      Initial Status
                    </label>
                    <select
                      aria-label="Initial account status"
                      className="select select-sm select-bordered w-full rounded-xs text-xs font-semibold focus:outline-primary"
                      value={createForm.status}
                      onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Deactivated">Deactivated</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 border-t border-base-300 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn btn-sm btn-ghost border border-base-300 rounded-xs text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="btn btn-sm btn-primary rounded-xs text-xs font-bold gap-1 shadow-2xs"
                  >
                    <UserPlus size={13} />
                    <span>Create User</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Edit User Modal (U) ── */}
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-base-100 border border-base-300 rounded-xs shadow-xl w-full max-w-lg p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between pb-3 border-b border-base-300">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    Record Modification
                  </span>
                  <h3 className="text-base font-black text-base-content">
                    Update User: {editingUser.firstName} {editingUser.lastName}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Close edit user modal"
                  onClick={() => setEditingUser(null)}
                  className="btn btn-xs btn-ghost btn-square"
                >
                  <X size={14} />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-base-content/70 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      aria-label="First Name"
                      className="input input-sm input-bordered w-full rounded-xs text-xs focus:outline-primary"
                      value={editingUser.firstName}
                      onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-base-content/70 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      aria-label="Last Name"
                      className="input input-sm input-bordered w-full rounded-xs text-xs focus:outline-primary"
                      value={editingUser.lastName}
                      onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-base-content/70 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      aria-label="Email Address"
                      className="input input-sm input-bordered w-full rounded-xs text-xs focus:outline-primary font-mono"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-base-content/70 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={11}
                      aria-label="Mobile Number"
                      className="input input-sm input-bordered w-full rounded-xs text-xs focus:outline-primary font-mono"
                      value={editingUser.mobile}
                      onChange={(e) => setEditingUser({ ...editingUser, mobile: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-base-content/70 mb-1">
                    Home Address
                  </label>
                  <textarea
                    required
                    rows={2}
                    aria-label="Home Address"
                    className="textarea textarea-bordered w-full rounded-xs text-xs focus:outline-primary"
                    value={editingUser.address}
                    onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-base-content/70 mb-1">
                      Assign Role
                    </label>
                    <select
                      aria-label="Assign Role"
                      className="select select-sm select-bordered w-full rounded-xs text-xs font-semibold focus:outline-primary"
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    >
                      <option value="Resident">Resident</option>
                      <option value="Staff">Staff</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-base-content/70 mb-1">
                      Account Status
                    </label>
                    <select
                      aria-label="Account Status"
                      className="select select-sm select-bordered w-full rounded-xs text-xs font-semibold focus:outline-primary"
                      value={editingUser.status}
                      onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Deactivated">Deactivated</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="edit-password" className="block text-[11px] font-bold text-base-content/70 mb-1 flex items-center gap-1">
                    <KeyRound size={12} />
                    <span>Reset Password (leave blank to keep unchanged)</span>
                  </label>
                  <input
                    id="edit-password"
                    type="password"
                    aria-label="Reset Password"
                    placeholder="Leave blank or enter min. 8 chars to change"
                    className="input input-sm input-bordered w-full rounded-xs text-xs focus:outline-primary font-mono"
                    value={editingUser.password || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                  />
                </div>

                <div className="pt-2 border-t border-base-300 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="btn btn-sm btn-ghost border border-base-300 rounded-xs text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="btn btn-sm btn-primary rounded-xs text-xs font-bold gap-1 shadow-2xs"
                  >
                    <Save size={13} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default UserManagement;
