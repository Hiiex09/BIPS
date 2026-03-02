import { ShieldCheck, MapPin, HandHeart, Clock, PhilippinePeso, CheckCircle2, Circle, Package, Info, History } from "lucide-react";
import { useState } from "react";
import { availableDocuments, activeRequests } from "../../data/residentMockData";

/* ── Document icon by type ─────────────────────────── */
const DocIcon = ({ type }) => {
  const cls = "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3";
  if (type === "clearance")
    return <div className={`${cls} bg-primary/10`}><ShieldCheck size={28} className="text-primary" /></div>;
  if (type === "residency")
    return <div className={`${cls} bg-info/10`}><MapPin size={28} className="text-info" /></div>;
  return <div className={`${cls} bg-success/10`}><HandHeart size={28} className="text-success" /></div>;
};

/* ── Document Card ─────────────────────────────────── */
const DocumentCard = ({ doc, onRequest }) => (
  <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
    <div className="card-body p-5 text-center gap-2">
      <DocIcon type={doc.iconType} />
      <h3 className="font-bold text-sm">{doc.title}</h3>
      <p className="text-xs text-muted leading-relaxed">{doc.description}</p>
      <div className="flex items-center justify-center gap-3 mt-1">
        <span className="flex items-center gap-1 text-xs font-semibold text-base-content">
          <PhilippinePeso size={12} className="text-muted" />
          {doc.fee === "FREE" ? <span className="text-success font-bold">FREE</span> : doc.fee.replace("₱", "")}
        </span>
        <span className="text-base-300">|</span>
        <span className="flex items-center gap-1 text-xs text-muted">
          <Clock size={11} /> {doc.processing}
        </span>
      </div>
      <button
        onClick={() => onRequest(doc)}
        className="btn btn-primary btn-sm btn-block mt-2"
      >
        Request Document
      </button>
    </div>
  </div>
);

/* ── Step Tracker ─────────────────────────────────── */
const StepTracker = ({ steps, currentStep }) => (
  <div className="flex items-center w-full my-4">
    {steps.map((step, idx) => {
      const done = idx < currentStep;
      const active = idx === currentStep;
      return (
        <div key={step} className="flex-1 flex flex-col items-center relative">
          {/* Connector line left */}
          {idx > 0 && (
            <div
              className={`absolute top-4 right-1/2 w-full h-0.5 -translate-y-1/2 ${
                idx <= currentStep ? "bg-primary" : "bg-base-300"
              }`}
            />
          )}
          {/* Step circle */}
          <div className="relative z-10">
            {done ? (
              <CheckCircle2 size={28} className="text-primary" />
            ) : active ? (
              <div className="w-7 h-7 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              </div>
            ) : (
              <Circle size={28} className="text-base-300" />
            )}
          </div>
          <span className={`text-xs mt-1.5 font-medium ${done || active ? "text-primary" : "text-muted"}`}>
            {step}
          </span>
        </div>
      );
    })}
  </div>
);

/* ── Active Request Card ──────────────────────────── */
const ActiveRequestCard = ({ req }) => (
  <div className="card bg-base-100 border border-base-300 shadow-sm">
    <div className="card-body p-5 gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-sm">{req.type}</h3>
          <p className="text-xs text-muted">
            Reference #{req.id} · Requested on {req.requestedOn}
          </p>
        </div>
        <span className="badge badge-warning badge-soft badge-sm font-semibold shrink-0">
          {req.status}
        </span>
      </div>

      {/* Progress Tracker */}
      <StepTracker steps={req.steps} currentStep={req.currentStep} />

      {/* Required for Pickup */}
      <div className="bg-base-200 rounded-lg p-3 space-y-2">
        <p className="text-xs font-semibold text-base-content">Required for Pickup:</p>
        {req.requiredItems.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <span className="text-xs text-base-content">{item}</span>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="flex gap-2 items-start bg-info/10 border border-info/20 rounded-lg p-3">
        <Info size={14} className="text-info shrink-0 mt-0.5" />
        <p className="text-xs text-info-content/80">{req.note}</p>
      </div>
    </div>
  </div>
);

/* ── Request Modal ────────────────────────────────── */
const RequestModal = ({ doc, onClose }) => {
  if (!doc) return null;
  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-sm">
        <h3 className="font-bold text-lg mb-1">Request {doc.title}</h3>
        <p className="text-sm text-muted mb-4">
          Fill in the details to submit your document request.
        </p>
        <div className="space-y-3">
          <div className="fieldset">
            <legend className="fieldset-legend text-xs">Purpose</legend>
            <input type="text" className="input input-bordered w-full" placeholder="e.g. Employment Requirement" />
          </div>
          <div className="fieldset">
            <legend className="fieldset-legend text-xs">Number of Copies</legend>
            <select className="select select-bordered w-full">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          {doc.fee !== "FREE" && (
            <div className="alert alert-info alert-soft text-xs">
              Payment of {doc.fee} required upon pickup.
            </div>
          )}
        </div>
        <div className="modal-action gap-2">
          <button onClick={onClose} className="btn btn-ghost btn-sm">Cancel</button>
          <button onClick={onClose} className="btn btn-primary btn-sm">Submit Request</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
};

/* ── Main Page ────────────────────────────────────── */
const ResidentDocuments = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-base-content">Document Request Portal</h2>
        <p className="text-sm text-muted mt-1">
          Request official barangay certifications and permits from the comfort of your home. Track your application status in real-time.
        </p>
      </div>

      {/* Available Documents */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Package size={16} className="text-primary" />
          <h3 className="font-semibold text-sm text-base-content">Available Documents</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {availableDocuments.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} onRequest={setSelectedDoc} />
          ))}
        </div>
      </div>

      {/* Active Requests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History size={16} className="text-primary" />
            <h3 className="font-semibold text-sm text-base-content">My Active Requests</h3>
          </div>
          <button className="link link-primary text-xs font-semibold">View History</button>
        </div>
        {activeRequests.length > 0 ? (
          <div className="space-y-4">
            {activeRequests.map((req) => (
              <ActiveRequestCard key={req.id} req={req} />
            ))}
          </div>
        ) : (
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body items-center text-center py-12">
              <Package size={40} className="text-base-300 mb-2" />
              <p className="text-sm text-muted">No active requests at the moment.</p>
            </div>
          </div>
        )}
      </div>

      {/* Request modal */}
      <RequestModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </div>
  );
};

export default ResidentDocuments;
