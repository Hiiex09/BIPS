import {
  Megaphone,
  FileText,
  AlertTriangle,
  Plus,
  Trash2,
  Eye,
  Loader2,
  Calendar,
  X,
  Send
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
  const itemsPerPage = 8;

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
      setSelectedAnnouncement(null);
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

  const formatDateTile = (value) => {
    const d = value ? new Date(value) : new Date();
    return {
      day: String(d.getDate()).padStart(2, "0"),
      month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    };
  };

  return (
    <PageLayout 
      title="Public Bulletins & Announcements"
      onActionClick={() => setShowModal(true)}
    >
      <div className="space-y-5">
        {/* Hidden anchor for Navbar primary action trigger */}
        <button
          id="create-announcement-btn"
          className="hidden"
          onClick={() => setShowModal(true)}
          aria-hidden="true"
        />

        {/* ── KPI Ledger Strip ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <StatsCard
            title="Active Bulletins"
            value={publishedCount}
            subtitle="Visible on resident portal"
            icon={Megaphone}
          />
          <StatsCard
            title="Unpublished Drafts"
            value={draftCount}
            subtitle="Pending clearance or review"
            icon={FileText}
          />
          <StatsCard
            title="Urgent Alerts"
            value={urgentCount}
            subtitle="High broadcast priority"
            icon={AlertTriangle}
          />
        </div>

        {/* ── Search & Filter Controls ── */}
        <div className="w-full">
          <SearchFilterBar
            searchPlaceholder="Search bulletin titles, body text..."
            onSearchChange={(val) => {
              setSearch(val);
              setCurrentPage(1);
            }}
            filters={[
              {
                placeholder: "Filter Category",
                options: categoryFilters,
                onChange: (val) => setCategoryFilter(val),
              },
              {
                placeholder: "Filter Status",
                options: statusFilters,
                onChange: (val) => setStatusFilter(val),
              },
            ]}
          />
        </div>

        {/* ── Full-Width Editorial Feed (Layout 03) ── */}
        <div className="bg-base-100 border border-base-300 rounded-xs shadow-2xs overflow-hidden">
          <div className="p-3 border-b border-base-300 bg-base-200/40 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
              Bulletin Feed ({filtered.length} Announcements)
            </span>
            <span className="text-[11px] font-semibold text-base-content/60">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {isLoading ? (
            <div className="p-12 flex justify-center items-center gap-3 text-xs font-bold text-base-content/60">
              <Loader2 className="animate-spin text-primary" size={20} />
              <span>Loading bulletins...</span>
            </div>
          ) : error ? (
            <div className="alert alert-error rounded-xs m-4 text-xs">
              <span>Failed to load announcements.</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-base-content/60 font-semibold">
              No bulletin records match criteria.
            </div>
          ) : (
            <div className="divide-y divide-base-300">
              {currentAnnouncements.map((item, idx) => {
                const dateTile = formatDateTile(item.createdAt || item.date);
                const isUrgent = item.priority === "Urgent";

                return (
                  <div
                    key={item._id || idx}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-base-200/30 transition-colors"
                  >
                    {/* Date Tile Element (matching public banner style) */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="shrink-0 w-12 text-center border-r border-base-300 pr-4">
                        <span className="block font-black text-2xl text-primary font-mono leading-none">
                          {dateTile.day}
                        </span>
                        <span className="block text-[9px] font-black tracking-widest text-base-content/50 uppercase mt-0.5">
                          {dateTile.month}
                        </span>
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-2xs bg-primary/10 text-primary border border-primary/20">
                            {item.category || "General"}
                          </span>
                          {isUrgent && (
                            <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-2xs bg-red-500/10 text-red-700 border border-red-500/20">
                              Urgent Broadcast
                            </span>
                          )}
                          <span className="text-[10px] font-bold uppercase text-base-content/40">
                            Status: {item.status}
                          </span>
                        </div>

                        <h3 className="text-sm font-black text-base-content truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs text-base-content/70 line-clamp-1 max-w-2xl">
                          {item.content}
                        </p>
                      </div>
                    </div>

                    {/* Quick Row Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => setSelectedAnnouncement(item)}
                        className="btn btn-xs btn-ghost border border-base-300 hover:border-primary rounded-xs text-[11px] font-bold cursor-pointer"
                      >
                        <Eye size={12} />
                        <span>Inspect</span>
                      </button>
                      <button
                        type="button"
                        disabled={deleteMutation.isPending}
                        onClick={() => {
                          if (window.confirm(`Delete bulletin "${item.title}"?`)) {
                            deleteMutation.mutate(item._id);
                          }
                        }}
                        className="btn btn-xs btn-ghost border border-base-300 hover:border-error hover:text-error rounded-xs text-[11px] font-bold cursor-pointer"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Footer */}
          {filtered.length > 0 && (
            <div className="p-3 border-t border-base-300 bg-base-100 flex justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filtered.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>

        {/* ── Inspect Announcement Modal ── */}
        {selectedAnnouncement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-base-100 border border-base-300 rounded-xs shadow-xl w-full max-w-lg p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between pb-3 border-b border-base-300">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    Bulletin Preview
                  </span>
                  <h3 className="text-base font-black text-base-content">
                    {selectedAnnouncement.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAnnouncement(null)}
                  className="btn btn-xs btn-ghost btn-square"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex gap-2">
                  <span className="px-1.5 py-0.5 rounded-2xs text-[9px] font-black uppercase bg-primary/10 text-primary border border-primary/20">
                    {selectedAnnouncement.category}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-2xs text-[9px] font-black uppercase bg-base-200 border border-base-300">
                    Priority: {selectedAnnouncement.priority}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-2xs text-[9px] font-black uppercase bg-base-200 border border-base-300">
                    Status: {selectedAnnouncement.status}
                  </span>
                </div>

                <div className="p-3 bg-base-200/40 border border-base-300 rounded-xs max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed text-base-content">
                  {selectedAnnouncement.content}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  className="btn btn-sm btn-ghost border border-base-300 rounded-xs font-bold text-xs"
                  onClick={() => setSelectedAnnouncement(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Create Announcement Modal ── */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-base-100 border border-base-300 rounded-xs shadow-xl w-full max-w-lg p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between pb-3 border-b border-base-300">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    Publishing Console
                  </span>
                  <h3 className="text-base font-black text-base-content">
                    Draft New Public Bulletin
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-xs btn-ghost btn-square"
                >
                  <X size={14} />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-base-content/70 mb-1">
                    Bulletin Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Scheduled Water Interruption in Purok 4"
                    className="input input-sm input-bordered w-full rounded-xs text-xs focus:outline-primary"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-base-content/70 mb-1">
                      Category
                    </label>
                    <select
                      className="select select-sm select-bordered w-full rounded-xs text-xs font-semibold focus:outline-primary"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="General">General</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Event">Event</option>
                      <option value="Curfew">Curfew</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-base-content/70 mb-1">
                      Broadcast Priority
                    </label>
                    <select
                      className="select select-sm select-bordered w-full rounded-xs text-xs font-semibold focus:outline-primary"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    >
                      <option value="Normal">Normal</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-base-content/70 mb-1">
                      Initial Status
                    </label>
                    <select
                      className="select select-sm select-bordered w-full rounded-xs text-xs font-semibold focus:outline-primary"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-base-content/70 mb-1">
                    Announcement Details / Body
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide full details, schedules, requirements or contact persons..."
                    className="textarea textarea-bordered w-full rounded-xs text-xs focus:outline-primary"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </div>

                <div className="pt-2 border-t border-base-300 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn btn-sm btn-ghost border border-base-300 rounded-xs text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="btn btn-sm btn-primary rounded-xs text-xs font-bold gap-1 shadow-2xs"
                  >
                    <Send size={12} />
                    <span>Publish Announcement</span>
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

export default AnnouncementsManagement;
