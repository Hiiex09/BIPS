import {
  AlertTriangle,
  CircleAlert,
  CheckCircle,
  Loader2,
  Calendar,
  MapPin,
  ChevronRight,
  User,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PageLayout from "../../../components/admin/PageLayout";
import StatsCard from "../../../components/admin/StatsCard";
import SearchFilterBar from "../../../components/admin/SearchFilterBar";
import { getIncidentsApi, updateIncidentApi } from "../../../api/incident_api";

const IncidentReports = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "incidents",
      { search, category: categoryFilter, priority: priorityFilter },
    ],
    queryFn: () =>
      getIncidentsApi({
        search: search || undefined,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
        priority: priorityFilter !== "all" ? priorityFilter : undefined,
      }),
  });

  const incidents = Array.isArray(data) ? data : data?.incidents || [];

  const updateMutation = useMutation({
    mutationFn: updateIncidentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      toast.success("Incident status updated");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update incident");
    },
  });

  const handleStatusChange = (id, newStatus) => {
    updateMutation.mutate({
      id,
      data: { status: newStatus }
    });
  };

  const openIncidents = incidents.filter(
    (i) => i.status === "Open" || i.status === "Pending"
  );
  const inProgressIncidents = incidents.filter(
    (i) => i.status === "In Progress" || i.status === "Under Review"
  );
  const resolvedIncidents = incidents.filter(
    (i) => i.status === "Resolved" || i.status === "Closed"
  );

  const categoryFilters = [
    { label: "All Categories", value: "all" },
    { label: "Noise", value: "Noise" },
    { label: "Dispute", value: "Dispute" },
    { label: "Infrastructure", value: "Infrastructure" },
    { label: "Security", value: "Security" },
    { label: "Sanitation", value: "Sanitation" },
    { label: "Other", value: "Other" },
  ];

  const priorityFilters = [
    { label: "All Priorities", value: "all" },
    { label: "Critical", value: "Critical" },
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

  const renderCard = (inc) => {
    const isCritical = inc.priority === "Critical" || inc.priority === "Urgent";
    const residentName = inc.residentId
      ? `${inc.residentId.firstName || ""} ${inc.residentId.lastName || ""}`
      : "Anonymous / Unlisted";

    return (
      <div
        key={inc._id}
        className="bg-base-100 border border-base-300 rounded-xs p-3.5 shadow-2xs space-y-2.5 transition-colors hover:border-primary/40"
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-[10px] font-mono font-bold text-primary">
            #{inc._id.slice(-5).toUpperCase()}
          </span>
          <span
            className={`px-1.5 py-0.2 rounded-2xs text-[9px] font-black uppercase tracking-wider ${
              isCritical
                ? "text-red-700 bg-red-500/10 border border-red-500/20"
                : "text-base-content/60 bg-base-200 border border-base-300"
            }`}
          >
            {inc.priority || "Normal"}
          </span>
        </div>

        <div>
          <h4 className="text-xs font-black text-base-content leading-snug">
            {inc.category || "General Concern"}
          </h4>
          <p className="text-[11px] text-base-content/70 mt-1 line-clamp-2">
            {inc.description}
          </p>
        </div>

        <div className="pt-2 border-t border-base-300 text-[10px] space-y-1 text-base-content/60">
          <div className="flex items-center gap-1.5 truncate">
            <User size={11} className="shrink-0 opacity-60" />
            <span className="truncate">{residentName}</span>
          </div>
          {inc.location && (
            <div className="flex items-center gap-1.5 truncate">
              <MapPin size={11} className="shrink-0 opacity-60" />
              <span className="truncate">{inc.location}</span>
            </div>
          )}
        </div>

        {/* Workflow State Advance Actions */}
        <div className="pt-2 border-t border-base-300 flex items-center justify-between gap-1">
          {inc.status !== "Open" && inc.status !== "Pending" && (
            <button
              type="button"
              disabled={updateMutation.isPending}
              onClick={() => handleStatusChange(inc._id, "Open")}
              className="text-[10px] font-bold text-base-content/50 hover:text-base-content cursor-pointer"
            >
              &larr; Reopen
            </button>
          )}

          <div className="ml-auto flex items-center gap-1.5">
            {(inc.status === "Open" || inc.status === "Pending") && (
              <button
                type="button"
                disabled={updateMutation.isPending}
                onClick={() => handleStatusChange(inc._id, "In Progress")}
                className="btn btn-2xs btn-primary rounded-xs text-[10px] font-bold shadow-2xs cursor-pointer"
              >
                <span>Move In Progress</span> &rarr;
              </button>
            )}

            {(inc.status === "In Progress" || inc.status === "Under Review") && (
              <button
                type="button"
                disabled={updateMutation.isPending}
                onClick={() => handleStatusChange(inc._id, "Resolved")}
                className="btn btn-2xs btn-primary rounded-xs text-[10px] font-bold shadow-2xs cursor-pointer"
              >
                <span>Resolve Case</span> &rarr;
              </button>
            )}

            {inc.status === "Resolved" && (
              <span className="text-[10px] font-black text-teal-700 uppercase">
                Case Closed
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <PageLayout title="Incident Reports Management">
      <div className="space-y-5">
        {/* ── KPI Ledger Strip ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <StatsCard
            title="Open Incident Reports"
            value={openIncidents.length}
            subtitle="Immediate desk intake"
            icon={AlertTriangle}
          />
          <StatsCard
            title="Under Active Investigation"
            value={inProgressIncidents.length}
            subtitle="Assigned to barangay officers"
            icon={CircleAlert}
          />
          <StatsCard
            title="Resolved / Closed Cases"
            value={resolvedIncidents.length}
            subtitle="Completed peace & order logs"
            icon={CheckCircle}
          />
        </div>

        {/* ── Search & Filter Controls ── */}
        <SearchFilterBar
          searchPlaceholder="Search incident descriptions, locations..."
          onSearchChange={(value) => setSearch(value)}
          filters={[
            {
              placeholder: "Filter Category",
              options: categoryFilters,
              onChange: (value) => setCategoryFilter(value),
            },
            {
              placeholder: "Filter Priority",
              options: priorityFilters,
              onChange: (value) => setPriorityFilter(value),
            },
          ]}
        />

        {/* ── Workflow Board (Layout 04) ── */}
        {isLoading ? (
          <div className="bg-base-100 border border-base-300 rounded-xs p-12 flex justify-center items-center gap-3 text-xs font-bold text-base-content/60">
            <Loader2 className="animate-spin text-primary" size={20} />
            <span>Loading incident board...</span>
          </div>
        ) : error ? (
          <div className="alert alert-error rounded-xs text-xs">
            <span>Failed to load incident reports.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: Open / Intake */}
            <div className="bg-base-200/40 border border-base-300 rounded-xs p-3 flex flex-col min-h-[500px]">
              <div className="pb-2.5 mb-3 border-b border-base-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-base-content">
                    Intake / Open
                  </span>
                </div>
                <span className="font-mono text-xs font-bold px-1.5 py-0.2 bg-base-100 border border-base-300 rounded-2xs">
                  {openIncidents.length}
                </span>
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto">
                {openIncidents.length === 0 ? (
                  <p className="text-[11px] text-base-content/40 p-4 text-center">
                    No open reports in queue
                  </p>
                ) : (
                  openIncidents.map(renderCard)
                )}
              </div>
            </div>

            {/* Column 2: In Progress */}
            <div className="bg-base-200/40 border border-base-300 rounded-xs p-3 flex flex-col min-h-[500px]">
              <div className="pb-2.5 mb-3 border-b border-base-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs font-black uppercase tracking-wider text-base-content">
                    In Progress
                  </span>
                </div>
                <span className="font-mono text-xs font-bold px-1.5 py-0.2 bg-base-100 border border-base-300 rounded-2xs">
                  {inProgressIncidents.length}
                </span>
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto">
                {inProgressIncidents.length === 0 ? (
                  <p className="text-[11px] text-base-content/40 p-4 text-center">
                    No active investigations
                  </p>
                ) : (
                  inProgressIncidents.map(renderCard)
                )}
              </div>
            </div>

            {/* Column 3: Resolved */}
            <div className="bg-base-200/40 border border-base-300 rounded-xs p-3 flex flex-col min-h-[500px]">
              <div className="pb-2.5 mb-3 border-b border-base-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600" />
                  <span className="text-xs font-black uppercase tracking-wider text-base-content">
                    Resolved
                  </span>
                </div>
                <span className="font-mono text-xs font-bold px-1.5 py-0.2 bg-base-100 border border-base-300 rounded-2xs">
                  {resolvedIncidents.length}
                </span>
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto">
                {resolvedIncidents.length === 0 ? (
                  <p className="text-[11px] text-base-content/40 p-4 text-center">
                    No resolved records logged
                  </p>
                ) : (
                  resolvedIncidents.map(renderCard)
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default IncidentReports;
