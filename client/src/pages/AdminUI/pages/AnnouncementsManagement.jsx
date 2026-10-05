import {
  Megaphone,
  Calendar,
  FileText,
  Plus,
  Trash2,
  Eye,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PageLayout from "../../../components/admin/PageLayout";
import StatsCard from "../../../components/admin/StatsCard";
import SearchFilterBar from "../../../components/admin/SearchFilterBar";
import Pagination from "../../../components/admin/Pagination";
import {
  useAnnouncements,
  useCreateAnnouncement,
} from "../../../hooks/UseAnnouncementRouteHooks";
import { axiosInstance } from "../../../api/axios";

const AnnouncementsManagement = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const itemsPerPage = 6;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    priority: "Normal",
    status: "Published",
  });

  const { data: rawAnnouncements, isLoading, error } = useAnnouncements();
  const createMutation = useCreateAnnouncement();

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/announcement/delete-announcement/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Announcement deleted successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to delete announcement");
    },
  });

  const announcements = Array.isArray(rawAnnouncements)
    ? rawAnnouncements
    : rawAnnouncements?.allAnnouncementData || [];

  const filtered = announcements.filter((item) => {
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.title?.toLowerCase().includes(q) ||
        item.content?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const currentAnnouncements = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const publishedCount = announcements.filter((a) => a.status === "Published").length;
  const draftCount = announcements.filter((a) => a.status === "Draft").length;
  const urgentCount = announcements.filter((a) => a.priority === "Urgent").length;

  const statusFilters = [
    { label: "All Statuses", value: "all" },
    { label: "Published", value: "Published" },
    { label: "Draft", value: "Draft" },
  ];

  const categoryFilters = [
    { label: "All Categories", value: "all" },
    { label: "General", value: "General" },
    { label: "Meeting", value: "Meeting" },
    { label: "Emergency", value: "Emergency" },
    { label: "Event", value: "Event" },
    { label: "Curfew", value: "Curfew" },
  ];

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Announcement published successfully!");
        setShowModal(false);
        setFormData({
          title: "",
          content: "",
          category: "General",
          priority: "Normal",
          status: "Published",
        });
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Failed to create announcement");
      },
    });
  };

  return (
    <PageLayout title="Announcements Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Published"
            value={publishedCount}
            subtitle="Live for residents"
            icon={Megaphone}
            iconColor="text-success"
            iconBg="bg-success/10"
          />
          <StatsCard
            title="Drafts"
            value={draftCount}
            subtitle="Unpublished posts"
            icon={FileText}
            iconColor="text-warning"
            iconBg="bg-warning/10"
          />
          <StatsCard
            title="Urgent Alerts"
            value={urgentCount}
            subtitle="High priority announcements"
            icon={Calendar}
            iconColor="text-error"
            iconBg="bg-error/10"
          />
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={20} />
            Create Announcement
          </button>
        </div>

        {/* Search and Filters */}
        <SearchFilterBar
          searchPlaceholder="Search by announcement title or content..."
          onSearchChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          filters={[
            {
              placeholder: "Filter by Category",
              options: categoryFilters,
              onChange: (value) => {
                setCategoryFilter(value);
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

        {/* Announcements Table */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body p-0">
            {isLoading ? (
              <div className="flex justify-center items-center p-12 gap-3">
                <Loader2 className="animate-spin text-primary" size={24} />
                <span>Loading announcements...</span>
              </div>
            ) : error ? (
              <div className="alert alert-error m-4">
                <span>Failed to load announcements.</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center p-12 text-base-content/60">
                No announcements found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead className="bg-base-200">
                    <tr>
                      <th className="w-16">#</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Date Created</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAnnouncements.map((item, index) => (
                      <tr key={item._id || index} className="hover">
                        <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                        <td className="font-semibold max-w-xs truncate">{item.title}</td>
                        <td>
                          <span className="badge badge-sm badge-ghost">{item.category}</span>
                        </td>
                        <td>
                          <span
                            className={`badge badge-sm ${
                              item.priority === "Urgent"
                                ? "badge-error"
                                : item.priority === "Important"
                                  ? "badge-warning"
                                  : "badge-neutral"
                            }`}
                          >
                            {item.priority || "Normal"}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge badge-sm ${
                              item.status === "Published" ? "badge-success" : "badge-warning"
                            }`}
                          >
                            {item.status || "Published"}
                          </span>
                        </td>
                        <td className="text-sm">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          <div className="flex justify-center gap-1">
                            <button
                              className="btn btn-ghost btn-xs"
                              title="View details"
                              onClick={() => setSelectedAnnouncement(item)}
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="btn btn-ghost btn-xs text-error"
                              title="Delete"
                              disabled={deleteMutation.isPending}
                              onClick={() => {
                                if (confirm("Delete this announcement?")) {
                                  deleteMutation.mutate(item._id);
                                }
                              }}
                            >
                              <Trash2 size={16} />
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

        {/* Create Modal */}
        {showModal && (
          <div className="modal modal-open">
            <div className="modal-box max-w-lg">
              <h3 className="font-bold text-lg mb-4">Create New Announcement</h3>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Title</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter announcement title..."
                    className="input input-bordered w-full"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Category</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option value="General">General</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Event">Event</option>
                      <option value="Curfew">Curfew</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Priority</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value })
                      }
                    >
                      <option value="Normal">Normal</option>
                      <option value="Important">Important</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">Content</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write announcement details..."
                    className="textarea textarea-bordered w-full"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? "Publishing..." : "Publish Announcement"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {selectedAnnouncement && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-2">{selectedAnnouncement.title}</h3>
              <div className="flex gap-2 mb-4">
                <span className="badge badge-primary">{selectedAnnouncement.category}</span>
                <span className="badge badge-ghost">{selectedAnnouncement.priority}</span>
              </div>
              <p className="text-sm whitespace-pre-line text-base-content/80">
                {selectedAnnouncement.content}
              </p>
              <div className="modal-action">
                <button
                  className="btn btn-sm"
                  onClick={() => setSelectedAnnouncement(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default AnnouncementsManagement;
