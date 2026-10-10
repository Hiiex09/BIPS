import { useState } from "react";
import {
  CalendarDays,
  Pencil,
  ListFilter,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Trash2,
  X,
  Send,
  Loader2,
  FileText,
  Bookmark
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getPublishedStoriesApi,
  getMyStoriesApi,
  submitStoryApi,
  deleteMyStoryApi,
} from "../../api/story_api";
import { newsFilters, upcomingEvents } from "../../data/residentMockData";

/* ── Upcoming Event Item ────────────────────────────── */
const EventItem = ({ event }) => (
  <div className="flex items-start gap-3">
    <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xs bg-primary text-primary-content text-center shrink-0">
      <span className="text-[8px] font-bold leading-none uppercase">{event.month}</span>
      <span className="text-sm font-bold leading-none">{event.day}</span>
    </div>
    <div>
      <p className="text-xs font-semibold text-base-content leading-snug">{event.title}</p>
      <p className="text-xs text-muted">{event.time} · {event.location}</p>
    </div>
  </div>
);

/* ── News Card ──────────────────────────────────────── */
const NewsCard = ({ article, onRead }) => (
  <div className="card bg-base-100 border border-base-300 shadow-2xs hover:border-primary/40 transition-colors rounded-xs overflow-hidden flex flex-col justify-between">
    <div>
      <figure className="h-44 overflow-hidden relative bg-base-200">
        <img
          src={article.image || "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80"}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 left-2 badge badge-neutral badge-xs font-semibold rounded-xs">
          {article.category}
        </span>
      </figure>
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-sm leading-snug line-clamp-2 text-base-content">
          {article.title}
        </h3>
        <p className="text-xs text-muted line-clamp-3 leading-relaxed">
          {article.excerpt || article.content}
        </p>
      </div>
    </div>
    <div className="px-4 pb-4 pt-1 flex items-center justify-between border-t border-base-200 text-xs">
      <span className="text-muted text-[11px]">
        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Recent"}
      </span>
      <button
        onClick={() => onRead(article)}
        className="link link-primary font-semibold text-xs cursor-pointer"
      >
        Read Full Story →
      </button>
    </div>
  </div>
);

/* ── Status Badge ───────────────────────────────────── */
const StatusBadge = ({ status }) => {
  switch (status) {
    case "Published":
      return (
        <span className="badge badge-success badge-xs font-bold gap-1 rounded-xs">
          <CheckCircle2 size={10} /> Published
        </span>
      );
    case "Approved":
      return (
        <span className="badge badge-info badge-xs font-bold gap-1 rounded-xs">
          <CheckCircle2 size={10} /> Approved
        </span>
      );
    case "Rejected":
      return (
        <span className="badge badge-error badge-xs font-bold gap-1 rounded-xs">
          <XCircle size={10} /> Rejected
        </span>
      );
    default:
      return (
        <span className="badge badge-warning badge-xs font-bold gap-1 rounded-xs">
          <Clock size={10} /> Pending Review
        </span>
      );
  }
};

/* ── Main Page ──────────────────────────────────────── */
const ResidentNews = () => {
  const queryClient = useQueryClient();
  const [activeFilter, setActiveFilter] = useState("All News");
  const [activeTab, setActiveTab] = useState("feed"); // 'feed' | 'my-stories'
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    excerpt: "",
    content: "",
    image: "",
  });

  // Queries
  const { data: publishedData, isLoading: isFeedLoading } = useQuery({
    queryKey: ["publishedStories", activeFilter],
    queryFn: () => getPublishedStoriesApi({ category: activeFilter }),
  });

  const { data: myStoriesData, isLoading: isMyStoriesLoading } = useQuery({
    queryKey: ["myStories"],
    queryFn: getMyStoriesApi,
    enabled: activeTab === "my-stories",
  });

  // Mutations
  const submitMutation = useMutation({
    mutationFn: submitStoryApi,
    onSuccess: () => {
      toast.success("Story submitted! Awaiting staff review.");
      setIsSubmitModalOpen(false);
      setFormData({
        title: "",
        category: "General",
        excerpt: "",
        content: "",
        image: "",
      });
      queryClient.invalidateQueries({ queryKey: ["myStories"] });
      setActiveTab("my-stories");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to submit story");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMyStoryApi,
    onSuccess: () => {
      toast.success("Story proposal withdrawn");
      queryClient.invalidateQueries({ queryKey: ["myStories"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to delete submission");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in both title and story content");
      return;
    }
    submitMutation.mutate(formData);
  };

  const stories = publishedData?.stories || [];
  const myStories = myStoriesData?.stories || [];
  const featured = stories.length > 0 ? stories[0] : null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* ── Left Sidebar ── */}
      <aside className="w-full lg:w-60 shrink-0 space-y-4">
        {/* Action Button */}
        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="btn btn-primary btn-sm btn-block gap-2 rounded-xs font-bold shadow-2xs cursor-pointer"
        >
          <Pencil size={14} /> Submit a Story
        </button>

        {/* Tab Toggle: Public Feed vs My Submissions */}
        <div className="join w-full grid grid-cols-2">
          <button
            onClick={() => setActiveTab("feed")}
            className={`join-item btn btn-xs font-semibold rounded-xs ${
              activeTab === "feed" ? "btn-primary" : "btn-outline border-base-300"
            }`}
          >
            Public Feed
          </button>
          <button
            onClick={() => setActiveTab("my-stories")}
            className={`join-item btn btn-xs font-semibold rounded-xs ${
              activeTab === "my-stories" ? "btn-primary" : "btn-outline border-base-300"
            }`}
          >
            My Stories
          </button>
        </div>

        {/* Category Filters */}
        {activeTab === "feed" && (
          <div className="card bg-base-100 border border-base-300 shadow-2xs rounded-xs">
            <div className="card-body p-3 gap-1">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1 px-2">
                Filter Category
              </span>
              <ul className="menu menu-xs p-0 gap-0.5">
                {newsFilters.map((f) => (
                  <li key={f}>
                    <button
                      onClick={() => setActiveFilter(f)}
                      className={`flex items-center gap-2 rounded-xs py-1.5 ${
                        activeFilter === f
                          ? "bg-primary text-primary-content font-bold"
                          : "text-base-content/70 hover:bg-base-200"
                      }`}
                    >
                      <ListFilter size={13} />
                      {f}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <div className="card bg-base-100 border border-base-300 shadow-2xs rounded-xs">
          <div className="card-body p-4 gap-3">
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-primary" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-base-content">
                Upcoming Events
              </h3>
            </div>
            <div className="space-y-3 pt-1">
              {upcomingEvents.map((ev) => (
                <EventItem key={ev.day + ev.title} event={ev} />
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 space-y-5 min-w-0">
        {/* Header */}
        <div>
          <h2 className="text-xl font-extrabold text-base-content tracking-tight">
            {activeTab === "feed" ? "Community News & Bulletins" : "My Submitted Stories"}
          </h2>
          <p className="text-xs text-muted mt-0.5">
            {activeTab === "feed"
              ? "Verified stories and project updates published by Barangay Tejero."
              : "Track the review status and editorial remarks of stories you submitted."}
          </p>
        </div>

        {/* TAB 1: PUBLIC FEED */}
        {activeTab === "feed" && (
          <>
            {/* Featured Article Banner */}
            {featured && (
              <div className="card bg-base-100 border border-base-300 shadow-2xs rounded-xs overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-2/5 h-48 md:h-auto shrink-0 bg-base-200">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 badge badge-primary badge-xs font-bold rounded-xs">
                      Featured Bulletin
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                        {featured.category}
                      </span>
                      <h3 className="text-base font-extrabold text-base-content mt-1 leading-snug">
                        {featured.title}
                      </h3>
                      <p className="text-xs text-muted mt-2 leading-relaxed">
                        {featured.excerpt || featured.content}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-base-200">
                      <span className="text-[11px] text-muted">
                        Published by {featured.authorName}
                      </span>
                      <button
                        onClick={() => setSelectedStory(featured)}
                        className="btn btn-primary btn-xs rounded-xs font-bold"
                      >
                        Read Full Story
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stories Grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-base-content">
                  Recent Stories ({stories.length})
                </h3>
              </div>

              {isFeedLoading ? (
                <div className="p-12 text-center text-xs text-muted flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin text-primary" size={16} />
                  <span>Loading community news...</span>
                </div>
              ) : stories.length === 0 ? (
                <div className="p-12 border border-dashed border-base-300 text-center rounded-xs text-xs text-muted">
                  No published stories found under this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stories.map((article) => (
                    <NewsCard
                      key={article._id}
                      article={article}
                      onRead={(item) => setSelectedStory(item)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* TAB 2: MY SUBMISSIONS (RESIDENT CRUD VIEW) */}
        {activeTab === "my-stories" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted">
                {myStories.length} story proposal(s) found
              </span>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="btn btn-primary btn-xs rounded-xs font-bold gap-1"
              >
                <Pencil size={12} /> New Submission
              </button>
            </div>

            {isMyStoriesLoading ? (
              <div className="p-12 text-center text-xs text-muted flex items-center justify-center gap-2">
                <Loader2 className="animate-spin text-primary" size={16} />
                <span>Loading your submissions...</span>
              </div>
            ) : myStories.length === 0 ? (
              <div className="card bg-base-100 border border-dashed border-base-300 rounded-xs p-8 text-center space-y-3">
                <FileText size={32} className="mx-auto text-base-content/30" />
                <h4 className="font-bold text-sm">No Story Proposals Yet</h4>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  Have an event, community milestone, or neighborhood update to share? Click below to submit a story to barangay officials.
                </p>
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="btn btn-primary btn-sm rounded-xs font-bold mx-auto"
                >
                  Submit Your First Story
                </button>
              </div>
            ) : (
              <div className="divide-y divide-base-300 border border-base-300 bg-base-100 rounded-xs">
                {myStories.map((item) => (
                  <div key={item._id} className="p-4 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={item.status} />
                        <span className="text-[11px] font-mono text-muted uppercase">
                          {item.category}
                        </span>
                        <span className="text-[11px] text-muted">
                          · Submitted on {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-base-content">{item.title}</h4>
                      <p className="text-xs text-muted line-clamp-2">{item.content}</p>

                      {/* Moderator remarks if rejected or pending */}
                      {item.reviewerNotes && (
                        <div className="bg-base-200/60 p-2.5 rounded-xs border-l-2 border-primary text-xs mt-2">
                          <span className="font-bold text-base-content">Staff Feedback: </span>
                          <span className="text-muted">{item.reviewerNotes}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <button
                        onClick={() => setSelectedStory(item)}
                        className="btn btn-ghost btn-xs font-semibold"
                      >
                        Preview
                      </button>
                      {item.status !== "Published" && (
                        <button
                          onClick={() => {
                            if (window.confirm("Are you sure you want to withdraw this story submission?")) {
                              deleteMutation.mutate(item._id);
                            }
                          }}
                          className="btn btn-ghost btn-xs text-error hover:bg-error/10 gap-1"
                        >
                          <Trash2 size={12} /> Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── SUBMIT A STORY MODAL (CRUD CREATE) ── */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="card bg-base-100 border border-base-300 shadow-xl rounded-xs w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-base-300 flex items-center justify-between sticky top-0 bg-base-100 z-10">
              <div className="flex items-center gap-2">
                <Pencil size={16} className="text-primary" />
                <h3 className="font-extrabold text-sm text-base-content">Submit Community Story</h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                aria-label="Close submit story modal"
                className="btn btn-ghost btn-xs btn-circle"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="story-title" className="block text-xs font-bold text-base-content mb-1">
                  Story Title <span className="text-error">*</span>
                </label>
                <input
                  id="story-title"
                  type="text"
                  required
                  aria-label="Story Title"
                  placeholder="e.g., Purok 2 Weekend Sports Clinic"
                  className="input input-sm input-bordered w-full rounded-xs text-xs"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="story-category" className="block text-xs font-bold text-base-content mb-1">
                    Category
                  </label>
                  <select
                    id="story-category"
                    aria-label="Story category"
                    className="select select-sm select-bordered w-full rounded-xs text-xs"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="General">General</option>
                    <option value="Local Events">Local Events</option>
                    <option value="Project Updates">Project Updates</option>
                    <option value="Highlights">Highlights</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="story-image" className="block text-xs font-bold text-base-content mb-1">
                    Cover Photo URL (Optional)
                  </label>
                  <input
                    id="story-image"
                    type="url"
                    aria-label="Cover Photo URL (Optional)"
                    placeholder="https://..."
                    className="input input-sm input-bordered w-full rounded-xs text-xs"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="story-excerpt" className="block text-xs font-bold text-base-content mb-1">
                  Short Excerpt / Summary
                </label>
                <input
                  id="story-excerpt"
                  type="text"
                  aria-label="Short Excerpt / Summary"
                  placeholder="Brief 1-2 sentence overview"
                  className="input input-sm input-bordered w-full rounded-xs text-xs"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="story-content" className="block text-xs font-bold text-base-content mb-1">
                  Story Content <span className="text-error">*</span>
                </label>
                <textarea
                  id="story-content"
                  required
                  rows={5}
                  aria-label="Story Content"
                  placeholder="Write the details of the event, initiative, or update..."
                  className="textarea textarea-bordered w-full rounded-xs text-xs leading-relaxed"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div className="bg-base-200/70 p-3 rounded-xs border border-base-300 text-xs text-muted space-y-1">
                <p className="font-bold text-base-content flex items-center gap-1.5">
                  <AlertCircle size={13} className="text-info" /> Editorial Notice
                </p>
                <p>
                  All resident submissions undergo review by the Barangay Information Office before being published to the community feed.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-base-300">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="btn btn-xs btn-ghost rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="btn btn-xs btn-primary rounded-xs font-bold gap-1.5"
                >
                  {submitMutation.isPending ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Send size={12} />
                  )}
                  <span>Submit for Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── STORY PREVIEW / DETAIL MODAL ── */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="card bg-base-100 border border-base-300 shadow-xl rounded-xs w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative h-56 bg-base-200">
              <img
                src={selectedStory.image || "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80"}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedStory(null)}
                aria-label="Close story details"
                className="btn btn-circle btn-xs bg-base-100/90 hover:bg-base-100 border-0 absolute top-3 right-3 shadow-md"
              >
                <X size={14} />
              </button>
              <span className="absolute bottom-3 left-3 badge badge-primary badge-sm font-bold rounded-xs">
                {selectedStory.category}
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-muted mb-1">
                  <span>Author: {selectedStory.authorName}</span>
                  <span>{new Date(selectedStory.createdAt).toLocaleDateString()}</span>
                </div>
                <h2 className="text-xl font-black text-base-content leading-tight">
                  {selectedStory.title}
                </h2>
              </div>
              <div className="prose text-xs text-base-content/80 leading-relaxed whitespace-pre-wrap">
                {selectedStory.content}
              </div>
              <div className="pt-4 border-t border-base-300 flex justify-end">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="btn btn-xs btn-outline rounded-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResidentNews;
