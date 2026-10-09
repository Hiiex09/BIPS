import {
  ClipboardList,
  CheckCircle,
  Clock,
  Loader2,
  FileText,
  User,
  Calendar,
  Phone,
  FileCheck,
  Ban,
  ArrowRight,
  ShieldCheck,
  Check
} from "lucide-react";
import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PageLayout from "../../../components/admin/PageLayout";
import StatsCard from "../../../components/admin/StatsCard";
import SearchFilterBar from "../../../components/admin/SearchFilterBar";
import {
  getCertificateRequestsApi,
  approveCertificateRequestApi,
  readyCertificateRequestApi,
  rejectCertificateRequestApi,
} from "../../../api/certificate_api";

const DocumentsManagement = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedDocId, setSelectedDocId] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["certificateRequests", { search, status: statusFilter, certificate_type: typeFilter }],
    queryFn: () =>
      getCertificateRequestsApi({
        search: search || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        certificate_type: typeFilter !== "all" ? typeFilter : undefined,
      }),
  });

  const requests = useMemo(() => {
    return Array.isArray(data) ? data : data?.requests || [];
  }, [data]);

  // Keep selected doc in sync
  const activeDoc = useMemo(() => {
    if (!requests || requests.length === 0) return null;
    if (selectedDocId) {
      const found = requests.find((r) => r._id === selectedDocId);
      if (found) return found;
    }
    return requests[0];
  }, [requests, selectedDocId]);

  const approveMutation = useMutation({
    mutationFn: (id) => approveCertificateRequestApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificateRequests"] });
      toast.success("Request approved");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to approve request");
    },
  });

  const readyMutation = useMutation({
    mutationFn: (id) => readyCertificateRequestApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificateRequests"] });
      toast.success("Marked ready for release");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update request");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => rejectCertificateRequestApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificateRequests"] });
      toast.success("Request marked as rejected");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to reject request");
    },
  });

  const totalPending = requests.filter((r) => r.status === "Pending").length;
  const totalApproved = requests.filter((r) => r.status === "Approved").length;
  const totalReady = requests.filter((r) => r.status === "Ready for Pickup").length;

  const documentTypeFilters = [
    { label: "All Document Types", value: "all" },
    { label: "Barangay Clearance", value: "Barangay Clearance" },
    { label: "Barangay Residency", value: "Barangay Residency" },
    { label: "Barangay Indigency", value: "Barangay Indigency" },
    { label: "Business Permit", value: "Business Permit" },
  ];

  const statusFilters = [
    { label: "All Statuses", value: "all" },
    { label: "Pending", value: "Pending" },
    { label: "Approved", value: "Approved" },
    { label: "Ready for Pickup", value: "Ready for Pickup" },
    { label: "Rejected", value: "Rejected" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-block px-1.5 py-0.5 rounded-2xs text-[10px] font-black uppercase text-amber-600 bg-amber-500/10 border border-amber-500/20">
            Pending
          </span>
        );
      case "Approved":
        return (
          <span className="inline-block px-1.5 py-0.5 rounded-2xs text-[10px] font-black uppercase text-primary bg-primary/10 border border-primary/20">
            Approved
          </span>
        );
      case "Ready for Pickup":
        return (
          <span className="inline-block px-1.5 py-0.5 rounded-2xs text-[10px] font-black uppercase text-teal-700 bg-teal-600/10 border border-teal-600/20">
            Ready
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-block px-1.5 py-0.5 rounded-2xs text-[10px] font-black uppercase text-base-content/50 bg-base-200 border border-base-300">
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-block px-1.5 py-0.5 rounded-2xs text-[10px] font-black uppercase text-base-content/60 bg-base-200">
            {status}
          </span>
        );
    }
  };

  return (
    <PageLayout title="Document Requests Management">
      <div className="space-y-5">
        {/* ── KPI Ledger Strip ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <StatsCard
            title="Pending Review"
            value={totalPending}
            subtitle="Requires staff verification"
            icon={ClipboardList}
          />
          <StatsCard
            title="Approved (In Process)"
            value={totalApproved}
            subtitle="Printing and seal issuance"
            icon={Clock}
          />
          <StatsCard
            title="Ready for Pickup"
            value={totalReady}
            subtitle="Claimable at barangay hall"
            icon={CheckCircle}
          />
        </div>

        {/* ── Search & Filter Controls ── */}
        <SearchFilterBar
          searchPlaceholder="Search requester or purpose..."
          onSearchChange={(value) => setSearch(value)}
          filters={[
            {
              placeholder: "Filter by Document Type",
              options: documentTypeFilters,
              onChange: (value) => setTypeFilter(value),
            },
            {
              placeholder: "Filter by Status",
              options: statusFilters,
              onChange: (value) => setStatusFilter(value),
            },
          ]}
        />

        {/* ── Master-Detail Inbox View (Layout 05) ── */}
        {isLoading ? (
          <div className="bg-base-100 border border-base-300 rounded-xs p-12 flex justify-center items-center gap-3 text-xs font-bold text-base-content/60">
            <Loader2 className="animate-spin text-primary" size={20} />
            <span>Loading request queue...</span>
          </div>
        ) : error ? (
          <div className="alert alert-error rounded-xs text-xs">
            <span>Failed to load document requests.</span>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-base-100 border border-base-300 rounded-xs p-12 text-center text-xs text-base-content/60 font-semibold">
            No document requests match your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-base-100 border border-base-300 rounded-xs overflow-hidden min-h-[580px] shadow-2xs">
            {/* Left Queue Panel (Master List) */}
            <div className="lg:col-span-5 border-r border-base-300 flex flex-col h-full bg-base-100">
              <div className="p-3 border-b border-base-300 bg-base-200/40 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                  Queue ({requests.length})
                </span>
                <span className="text-[11px] font-semibold text-base-content/60">
                  Select item to inspect
                </span>
              </div>

              <div className="divide-y divide-base-300 overflow-y-auto max-h-[620px]">
                {requests.map((doc, idx) => {
                  const residentName = doc.residentId
                    ? `${doc.residentId.firstName || ""} ${doc.residentId.lastName || ""}`
                    : "Unknown Resident";
                  const isSelected = activeDoc?._id === doc._id;

                  return (
                    <button
                      key={doc._id}
                      type="button"
                      onClick={() => setSelectedDocId(doc._id)}
                      className={`w-full p-3.5 text-left transition-colors flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-primary/5 border-l-3 border-l-primary"
                          : "hover:bg-base-200/50"
                      }`}
                    >
                      <span className="font-mono text-xs font-bold text-base-content/40 mt-0.5">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="text-xs font-black text-base-content truncate">
                            {residentName}
                          </p>
                          {getStatusBadge(doc.status)}
                        </div>
                        <p className="text-[11px] font-bold text-primary truncate">
                          {doc.certificate_type}
                        </p>
                        <p className="text-[10px] text-base-content/60 truncate mt-0.5">
                          {doc.purpose || "No stated purpose"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Inspection & Action Panel (Detail View) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full bg-base-100 p-5 sm:p-6">
              {activeDoc ? (
                <div className="space-y-6">
                  {/* Header Titleplate */}
                  <div className="pb-4 border-b border-base-300 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-primary">
                          #{activeDoc._id.slice(-6).toUpperCase()}
                        </span>
                        {getStatusBadge(activeDoc.status)}
                      </div>
                      <h2 className="text-lg font-black text-base-content leading-tight">
                        {activeDoc.certificate_type}
                      </h2>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-base-content/50 uppercase block">
                        Date Filed
                      </span>
                      <span className="text-xs font-bold text-base-content font-mono">
                        {activeDoc.dateRequested
                          ? new Date(activeDoc.dateRequested).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>
                  </div>

                  {/* Document Attributes Ledger */}
                  <div className="bg-base-200/40 border border-base-300 rounded-xs divide-y divide-base-300 text-xs">
                    <div className="p-3 flex items-center justify-between">
                      <span className="text-base-content/60 font-semibold flex items-center gap-2">
                        <User size={14} /> Requester
                      </span>
                      <span className="font-bold text-base-content">
                        {activeDoc.residentId
                          ? `${activeDoc.residentId.firstName} ${activeDoc.residentId.lastName}`
                          : "Unknown"}
                      </span>
                    </div>

                    <div className="p-3 flex items-center justify-between">
                      <span className="text-base-content/60 font-semibold flex items-center gap-2">
                        <Phone size={14} /> Contact Number
                      </span>
                      <span className="font-mono font-bold text-base-content">
                        {activeDoc.contactNumber || activeDoc.residentId?.mobile || "N/A"}
                      </span>
                    </div>

                    <div className="p-3 flex flex-col gap-1">
                      <span className="text-base-content/60 font-semibold">
                        Stated Purpose / Use
                      </span>
                      <p className="font-medium text-base-content bg-base-100 p-2 border border-base-300 rounded-xs">
                        {activeDoc.purpose || "Standard clearance and verification application"}
                      </p>
                    </div>

                    {activeDoc.remarks && (
                      <div className="p-3 flex flex-col gap-1">
                        <span className="text-base-content/60 font-semibold">
                          Staff Remarks
                        </span>
                        <p className="font-medium text-base-content/80 text-[11px]">
                          {activeDoc.remarks}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Processing Status & Responsible Officer */}
                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-xs flex items-center justify-between text-xs">
                    <span className="text-primary font-bold flex items-center gap-1.5">
                      <ShieldCheck size={15} /> Assigned Processing Official
                    </span>
                    <span className="font-bold text-base-content">
                      {activeDoc.processedBy
                        ? `${activeDoc.processedBy.firstName} ${activeDoc.processedBy.lastName}`
                        : "Unassigned / Auto-queued"}
                    </span>
                  </div>

                  {/* Primary Decision Action Bar */}
                  <div className="pt-4 border-t border-base-300 flex flex-wrap gap-2.5 items-center justify-end">
                    {activeDoc.status === "Pending" && (
                      <>
                        <button
                          type="button"
                          disabled={rejectMutation.isPending}
                          onClick={() => rejectMutation.mutate(activeDoc._id)}
                          className="btn btn-sm btn-ghost border border-base-300 hover:border-error hover:text-error rounded-xs font-bold text-xs gap-1.5 cursor-pointer"
                        >
                          <Ban size={14} />
                          <span>Reject Application</span>
                        </button>
                        <button
                          type="button"
                          disabled={approveMutation.isPending}
                          onClick={() => approveMutation.mutate(activeDoc._id)}
                          className="btn btn-sm btn-primary rounded-xs font-bold text-xs gap-1.5 shadow-2xs cursor-pointer"
                        >
                          <FileCheck size={14} />
                          <span>Approve & Authorize</span>
                        </button>
                      </>
                    )}

                    {activeDoc.status === "Approved" && (
                      <button
                        type="button"
                        disabled={readyMutation.isPending}
                        onClick={() => readyMutation.mutate(activeDoc._id)}
                        className="btn btn-sm btn-primary rounded-xs font-bold text-xs gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <Check size={14} />
                        <span>Mark Ready for Pickup</span>
                      </button>
                    )}

                    {activeDoc.status === "Ready for Pickup" && (
                      <div className="text-xs font-bold text-teal-700 bg-teal-600/10 border border-teal-600/20 px-3 py-1.5 rounded-xs flex items-center gap-1.5">
                        <CheckCircle size={14} />
                        <span>Ready for Resident Collection at Counter</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-base-content/50">
                  Select a document from the queue to inspect details.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default DocumentsManagement;
