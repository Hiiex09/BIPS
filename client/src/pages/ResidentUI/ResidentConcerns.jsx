import { useState } from "react";
import { UploadCloud, MapPin, Send, ChevronDown, ChevronUp, ListChecks } from "lucide-react";
import toast from "react-hot-toast";
import { concernCategories, submissionHistory } from "../../data/residentMockData";

/* ── Status badge helper ──────────────────────────── */
const StatusBadge = ({ status }) => {
  const map = {
    RESOLVED: "badge-success badge-soft",
    "IN PROGRESS": "badge-info badge-soft",
    "UNDER REVIEW": "badge-warning badge-soft",
  };
  return (
    <span className={`badge badge-sm font-semibold ${map[status] || "badge-ghost"}`}>
      {status}
    </span>
  );
};

/* ── History Item ─────────────────────────────────── */
const HistoryItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-base-300 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-base-100 hover:bg-base-200 transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <div className={`w-2 h-2 rounded-full shrink-0 ${
            item.status === "RESOLVED" ? "bg-success" :
            item.status === "IN PROGRESS" ? "bg-info" : "bg-warning"
          }`} />
          <div>
            <p className="text-sm font-semibold text-base-content">{item.title}</p>
            <p className="text-xs text-muted">Submitted: {item.submittedDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <StatusBadge status={item.status} />
          {open ? <ChevronUp size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" />}
        </div>
      </button>
      {open && (
        <div className="px-4 py-3 bg-base-50 border-t border-base-300 text-xs text-muted space-y-1">
          <p><span className="font-semibold text-base-content">Reference ID:</span> BRG-{2023000 + item.id}</p>
          <p><span className="font-semibold text-base-content">Status:</span> {item.status}</p>
          <p><span className="font-semibold text-base-content">Last Updated:</span> {item.submittedDate}</p>
          {item.status === "RESOLVED" && (
            <p className="text-success font-medium mt-1">✓ This concern has been resolved by barangay officials.</p>
          )}
          {item.status === "IN PROGRESS" && (
            <p className="text-info font-medium mt-1">↻ Barangay staff are currently addressing this concern.</p>
          )}
          {item.status === "UNDER REVIEW" && (
            <p className="text-warning font-medium mt-1">⏳ Your concern is being reviewed. You will be notified soon.</p>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Main Page ────────────────────────────────────── */
const ResidentConcerns = () => {
  const [form, setForm] = useState({
    category: "",
    subject: "",
    description: "",
    location: "",
  });
  const [photoName, setPhotoName] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.subject || !form.description) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Concern submitted successfully! We'll get back to you soon.");
    setForm({ category: "", subject: "", description: "", location: "" });
    setPhotoName("");
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-base-content">Resident Concern Submission</h2>
        <p className="text-sm text-muted mt-1">
          Your voice matters. Submit community issues and track their progress in real-time.
        </p>
      </div>

      {/* New Concern Form */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body p-6 gap-5">
          <div className="flex items-center gap-2">
            <Send size={15} className="text-primary" />
            <h3 className="font-semibold text-sm">New Concern Form</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category + Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="fieldset gap-1.5">
                <legend className="fieldset-legend text-xs font-semibold">
                  Category <span className="text-error">*</span>
                </legend>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="" disabled>Select concern category</option>
                  {concernCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="fieldset gap-1.5">
                <legend className="fieldset-legend text-xs font-semibold">
                  Subject <span className="text-error">*</span>
                </legend>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Brief title of your concern"
                />
              </div>
            </div>

            {/* Description */}
            <div className="fieldset gap-1.5">
              <legend className="fieldset-legend text-xs font-semibold">
                Detailed Description <span className="text-error">*</span>
              </legend>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full h-28 resize-none"
                placeholder="Provide as much detail as possible about the issue..."
              />
            </div>

            {/* Supporting Photos */}
            <div className="fieldset gap-1.5">
              <legend className="fieldset-legend text-xs font-semibold">Supporting Photos</legend>
              <label className="border-2 border-dashed border-base-300 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                <UploadCloud size={28} className="text-muted" />
                <div className="text-center">
                  <span className="link link-primary text-sm font-medium">Click to upload</span>
                  <span className="text-sm text-muted"> or drag and drop</span>
                </div>
                <p className="text-xs text-muted">PNG, JPG or PDF (Max 5MB)</p>
                {photoName && <p className="text-xs text-success font-medium">{photoName}</p>}
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => setPhotoName(e.target.files?.[0]?.name || "")}
                />
              </label>
            </div>

            {/* Location */}
            <div className="fieldset gap-1.5">
              <legend className="fieldset-legend text-xs font-semibold">Location / Landmark</legend>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <MapPin size={14} className="text-muted shrink-0" />
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Street name, house number, or nearby landmark"
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </label>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary gap-2">
                Submit Concern <Send size={15} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Submission History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ListChecks size={16} className="text-primary" />
            <h3 className="font-semibold text-sm text-base-content">Submission History</h3>
          </div>
          <span className="badge badge-ghost badge-sm">{submissionHistory.length} Total Records</span>
        </div>
        <div className="space-y-3">
          {submissionHistory.map((item) => (
            <HistoryItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-muted pb-2">
        © 2023 Barangay Digital Office. Service First, Community Always.
      </p>
    </div>
  );
};

export default ResidentConcerns;
