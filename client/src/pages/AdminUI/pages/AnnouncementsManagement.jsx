import {
  Megaphone,
  Calendar,
  Archive,
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { useState } from "react";
import PageLayout from "../../../components/admin/PageLayout";
import StatsCard from "../../../components/admin/StatsCard";
import SearchFilterBar from "../../../components/admin/SearchFilterBar";
import Pagination from "../../../components/admin/Pagination";
import { mockAnnouncements, announcementStats } from "../../../data/mockData";

const AnnouncementsManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockAnnouncements.length / itemsPerPage);

  const currentAnnouncements = mockAnnouncements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusFilters = [
    { label: "All Statuses", value: "all" },
    { label: "Published", value: "Published" },
    { label: "Scheduled", value: "Scheduled" },
    { label: "Draft", value: "Draft" },
    { label: "Archived", value: "Archived" }
  ];

  const categoryFilters = [
    { label: "All Categories", value: "all" },
    { label: "Events", value: "Events" },
    { label: "Public Service", value: "Public Service" },
    { label: "Sports", value: "Sports" },
    { label: "Health", value: "Health" },
    { label: "Announcement", value: "Announcement" }
  ];

  const getStatusBadgeClass = (status) => {
    const classes = {
      Published: "badge-success",
      Scheduled: "badge-info",
      Draft: "badge-warning",
      Archived: "badge-neutral"
    };
    return classes[status] || "badge-neutral";
  };

  return (
    <PageLayout title="Announcements Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Published"
            value={announcementStats.published}
            icon={Megaphone}
            iconColor="text-success"
            iconBg="bg-success/10"
          />
          <StatsCard
            title="Scheduled"
            value={announcementStats.scheduled}
            icon={Calendar}
            iconColor="text-info"
            iconBg="bg-info/10"
          />
          <StatsCard
            title="Drafts"
            value={announcementStats.drafts}
            icon={FileText}
            iconColor="text-warning"
            iconBg="bg-warning/10"
          />
          <StatsCard
            title="Archived"
            value={announcementStats.archived}
            icon={Archive}
            iconColor="text-neutral"
            iconBg="bg-neutral/10"
          />
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <Plus size={20} />
            Create Announcement
          </button>
        </div>

        {/* Search and Filters */}
        <SearchFilterBar
          searchPlaceholder="Search announcements..."
          filters={[
            {
              placeholder: "Filter by Status",
              options: statusFilters,
              onChange: (value) => console.log("Status filter:", value)
            },
            {
              placeholder: "Filter by Category",
              options: categoryFilters,
              onChange: (value) => console.log("Category filter:", value)
            }
          ]}
        />

        {/* Announcements List */}
        <div className="grid grid-cols-1 gap-4">
          {currentAnnouncements.map((announcement) => (
            <div key={announcement.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{announcement.title}</h3>
                      <span className={`badge ${getStatusBadgeClass(announcement.status)}`}>
                        {announcement.status}
                      </span>
                      <span className="badge badge-outline badge-sm">
                        {announcement.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted mb-3">{announcement.content}</p>
                    <div className="flex gap-4 text-xs text-muted">
                      <span>📝 By {announcement.author}</span>
                      <span>📅 Created: {announcement.dateCreated}</span>
                      {announcement.status === "Scheduled" && (
                        <span className="text-info">🕐 Publish: {announcement.publishDate}</span>
                      )}
                      {announcement.status === "Published" && (
                        <span>📢 Published: {announcement.publishDate}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-ghost btn-sm btn-square" title="View">
                      <Eye size={18} />
                    </button>
                    <button className="btn btn-ghost btn-sm btn-square" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button className="btn btn-ghost btn-sm btn-square text-error" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={mockAnnouncements.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Create Announcement Modal */}
      {showModal && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Create New Announcement</h3>
            <form className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Announcement title"
                  className="input input-bordered w-full"
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select className="select select-bordered w-full">
                  <option value="">Select category</option>
                  <option value="Events">Events</option>
                  <option value="Public Service">Public Service</option>
                  <option value="Sports">Sports</option>
                  <option value="Health">Health</option>
                  <option value="Announcement">General Announcement</option>
                </select>
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Announcement content"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option value="Draft">Save as Draft</option>
                    <option value="Published">Publish Now</option>
                    <option value="Scheduled">Schedule</option>
                  </select>
                </div>
                
                <div>
                  <label className="label">
                    <span className="label-text">Publish Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            </form>
            
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary">
                Save Announcement
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowModal(false)}>close</button>
          </form>
        </dialog>
      )}
    </PageLayout>
  );
};

export default AnnouncementsManagement;
