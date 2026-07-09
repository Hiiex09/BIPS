import {
  ShieldCheck,
  MapPin,
  HandHeart,
  Clock,
  PhilippinePeso,
  CheckCircle2,
  Circle,
  Package,
  Info,
  History,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { availableDocuments } from "../../data/residentMockData";
import {
  createCertificateRequestApi,
  getMyCertificateRequestsApi,
} from "../../api/certificate_api";

const certificateTypeMap = {
  "Barangay Clearance": "Barangay Clearance",
  "Residency Certificate": "Barangay Residency",
  "Indigency Certificate": "Barangay Indigency",
};

const steps = ["Submitted", "Approved", "For Pickup"];

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" }) : "N/A";

const statusStep = (status) => {
  if (status === "Approved") return 1;
  if (status === "Ready for Pickup") return 2;
  return 0;
};

const statusBadge = (status) => {
  const map = {
    Pending: "badge-warning",
    Approved: "badge-info",
    "Ready for Pickup": "badge-success",
    Rejected: "badge-error",
  };
  return map[status] || "badge-ghost";
};

const DocIcon = ({ type }) => {
  const cls = "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3";
  if (type === "clearance")
    return <div className={`${cls} bg-primary/10`}><ShieldCheck size={28} className="text-primary" /></div>;
  if (type === "residency")
    return <div className={`${cls} bg-info/10`}><MapPin size={28} className="text-info" /></div>;
  return <div className={`${cls} bg-success/10`}><HandHeart size={28} className="text-success" /></div>;
};

const DocumentCard = ({ doc, onRequest }) => (
  <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
    <div className="card-body p-5 text-center gap-2">
      <DocIcon type={doc.iconType} />
      <h3 className="font-bold text-sm">{doc.title}</h3>
      <p className="text-xs text-muted leading-relaxed">{doc.description}</p>
      <div className="flex items-center justify-center gap-3 mt-1">
        <span className="flex items-center gap-1 text-xs font-semibold text-base-content">
          <PhilippinePeso size={12} className="text-muted" />
          {doc.fee === "FREE" ? <span className="text-success font-bold">FREE</span> : doc.fee.replace("â‚±", "")}
        </span>
        <span className="text-base-300">|</span>
        <span className="flex items-center gap-1 text-xs text-muted">
          <Clock size={11} /> {doc.processing}
        </span>
      </div>
      <button onClick={() => onRequest(doc)} className="btn btn-primary btn-sm btn-block mt-2">
        Request Document
      </button>
    </div>
  </div>
);

const StepTracker = ({ currentStep, rejected }) => (
  <div className="flex items-center w-full my-4">
    {steps.map((step, idx) => {
      const done = !rejected && idx < currentStep;
      const active = !rejected && idx === currentStep;
      return (
        <div key={step} className="flex-1 flex flex-col items-center relative">
          {idx > 0 && (
            <div
              className={`absolute top-4 right-1/2 w-full h-0.5 -translate-y-1/2 ${
                idx <= currentStep && !rejected ? "bg-primary" : "bg-base-300"
              }`}
            />
          )}
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

const ActiveRequestCard = ({ request }) => {
  const rejected = request.status === "Rejected";
  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body p-5 gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm">{request.certificate_type}</h3>
            <p className="text-xs text-muted">
              Reference #{request._id?.slice(-8).toUpperCase()} - Requested on {formatDate(request.dateRequested || request.createdAt)}
            </p>
          </div>
          <span className={`badge badge-sm font-semibold shrink-0 ${statusBadge(request.status)}`}>
            {request.status}
          </span>
        </div>

        <StepTracker currentStep={statusStep(request.status)} rejected={rejected} />

        <div className="bg-base-200 rounded-lg p-3 space-y-1">
          <p className="text-xs"><span className="font-semibold">Purpose:</span> {request.purpose}</p>
          {request.contactNumber && (
            <p className="text-xs"><span className="font-semibold">Contact:</span> {request.contactNumber}</p>
          )}
          {request.remarks && (
            <p className="text-xs"><span className="font-semibold">Remarks:</span> {request.remarks}</p>
          )}
        </div>

        <div className="flex gap-2 items-start bg-info/10 border border-info/20 rounded-lg p-3">
          <Info size={14} className="text-info shrink-0 mt-0.5" />
          <p className="text-xs text-info-content/80">
            {request.status === "Ready for Pickup"
              ? "Your document is ready. Please bring a valid ID and any required payment."
              : request.status === "Rejected"
                ? "Please contact the barangay office for the next steps."
                : "Barangay staff will update this request as it moves through processing."}
          </p>
        </div>
      </div>
    </div>
  );
};

const RequestModal = ({ doc, onClose }) => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ purpose: "", contactNumber: "" });
  const mutation = useMutation({
    mutationFn: createCertificateRequestApi,
    onSuccess: () => {
      toast.success("Document request submitted.");
      queryClient.invalidateQueries({ queryKey: ["my-certificate-requests"] });
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to submit request.");
    },
  });

  if (!doc) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.purpose.trim()) {
      toast.error("Please enter your request purpose.");
      return;
    }

    mutation.mutate({
      certificate_type: certificateTypeMap[doc.title],
      purpose: form.purpose,
      contactNumber: form.contactNumber,
    });
  };

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-sm">
        <h3 className="font-bold text-lg mb-1">Request {doc.title}</h3>
        <p className="text-sm text-muted mb-4">Fill in the details to submit your document request.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="fieldset">
            <legend className="fieldset-legend text-xs">Purpose</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. Employment requirement"
              value={form.purpose}
              onChange={(e) => setForm((prev) => ({ ...prev, purpose: e.target.value }))}
            />
          </div>
          <div className="fieldset">
            <legend className="fieldset-legend text-xs">Contact Number</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="09XXXXXXXXX"
              value={form.contactNumber}
              onChange={(e) => setForm((prev) => ({ ...prev, contactNumber: e.target.value }))}
            />
          </div>
          {doc.fee !== "FREE" && (
            <div className="alert alert-info alert-soft text-xs">
              Payment of {doc.fee} required upon pickup.
            </div>
          )}
          <div className="modal-action gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={mutation.isPending}>
              {mutation.isPending ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
};

const ResidentDocuments = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const { data = [], isLoading } = useQuery({
    queryKey: ["my-certificate-requests"],
    queryFn: getMyCertificateRequestsApi,
  });

  const activeRequests = useMemo(
    () => data.filter((request) => request.status !== "Rejected"),
    [data],
  );

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold text-base-content">Document Request Portal</h2>
        <p className="text-sm text-muted mt-1">
          Request official barangay certifications and track your application status in real time.
        </p>
      </div>

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

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History size={16} className="text-primary" />
            <h3 className="font-semibold text-sm text-base-content">My Active Requests</h3>
          </div>
          <span className="badge badge-ghost badge-sm">{data.length} Total Records</span>
        </div>
        {isLoading ? (
          <div className="p-6 text-sm text-muted">Loading requests...</div>
        ) : activeRequests.length > 0 ? (
          <div className="space-y-4">
            {activeRequests.map((request) => (
              <ActiveRequestCard key={request._id} request={request} />
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

      <RequestModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </div>
  );
};

export default ResidentDocuments;
