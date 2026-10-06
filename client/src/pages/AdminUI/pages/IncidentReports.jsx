import {
  AlertTriangle,
  CircleAlert,
  CheckCircle,
  ChevronDown,
  XCircle,
  Play,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PageLayout from "../../../components/admin/PageLayout";
import StatsCard from "../../../components/admin/StatsCard";
import SearchFilterBar from "../../../components/admin/SearchFilterBar";
import Pagination from "../../../components/admin/Pagination";
import { getIncidentsApi, updateIncidentApi } from "../../../api/incident_api";

const IncidentReports = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedIncident, setExpandedIncident] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const itemsPerPage = 6;

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "incidents",
      { search, category: categoryFilter, status: statusFilter, priority: priorityFilter },
    ],
    queryFn: () =>
      getIncidentsApi({
        search: search || undefined,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        priority: priorityFilter !== "all" ? priorityFilter : undefined,
      }),
  });

  const incidents = Array.isArray(data) ? data : data?.incidents || [];

  const updateMutation = useMutation({
    mutationFn: updateIncidentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      toast.success("Incident updated successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update incident");
    },
  });

  const openIncidentsCount = incidents.filter((i) => i.status === "Open" || i.status === "Pending").length;
  const inProgressCount = incidents.filter((i) => i.status === "In Progress" || i.status === "Under Review").length;
  const resolvedCount = incidents.filter((i) => i.status === "Resolved").length;
  const criticalCount = incidents.filter((i) => i.priority === "Critical" || i.priority === "Urgent").length;

  const totalPages = Math.ceil(incidents.length / itemsPerPage) || 1;
  const currentIncidents = incidents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
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

  const statusFilters = [
    { label: "All Statuses", value: "all" },
    { label: "Open", value: "Open" },
    { label: "In Progress", value: "In Progress" },
    { label: "Resolved", value: "Resolved" },
    { label: "Closed", value: "Closed" },
  ];

  const priorityFilters = [
    { label: "All Priorities", value: "all" },
    { label: "Critical", value: "Critical" },
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

  const getStatusBadgeClass = (status) => {
    const classes = {
      Open: "badge-error",
      Pending: "badge-error",
      "In Progress": "badge-warning",
      "Under Review": "badge-warning",
      Resolved: "badge-success",
      Closed: "badge-neutral",
    };
    return classes[status] || "badge-neutral";
  };

  const getPriorityBadgeClass = (priority) => {
    const classes = {
      Critical: "badge-error",
      Urgent: "badge-error",
      High: "badge-warning",
      Medium: "badge-info",
      Low: "badge-neutral",
    };
    return classes[priority] || "badge-neutral";
  };

  return (
    <PageLayout title="Incident Reports Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Open Concerns"
            value={openIncidentsCount}
            icon={AlertTriangle}
            iconColor="text-error"
            iconBg="bg-error/10"
          />
          <StatsCard
            title="In Progress"
            value={inProgressCount}
            icon={CircleAlert}
            iconColor="text-warning"
            iconBg="bg-warning/10"
          />
          <StatsCard
            title="Resolved"
            value={resolvedCount}
            icon={CheckCircle}
            iconColor="text-success"
            iconBg="bg-success/10"
          />
          <StatsCard
            title="Critical Priority"
            value={criticalCount}
            subtitle="Needs immediate attention"
            icon={CircleAlert}
            iconColor="text-error"
            iconBg="bg-error/10"
          />
        </div>

        {/* Search and Filters */}
        <SearchFilterBar
          searchPlaceholder="Search by subject, description, or reporter..."
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
            {
              placeholder: "Filter by Priority",
              options: priorityFilters,
              onChange: (value) => {
                setPriorityFilter(value);
                setCurrentPage(1);
              },
            },
          ]}
        />

        {/* Incidents List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center p-12 gap-3">
              <Loader2 className="animate-spin text-primary" size={24} />
              <span>Loading incidents...</span>
            </div>
          ) : error ? (
            <div className="alert alert-error">
              <span>Failed to load incidents.</span>
            </div>
          ) : incidents.length === 0 ? (
            <div className="text-center p-12 text-base-content/60">
              No incident reports found.
            </div>
          ) : (
            currentIncidents.map((incident) => {
              const incidentId = incident._id;
              const reporterName = incident.residentId
                ? `${incident.residentId.firstName || ""} ${incident.residentId.lastName || ""}`
                : "Resident";

              return (
                <div key={incidentId} className="card bg-base-100 shadow-2xs">
                  <div className="card-body">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">
                            {incident.subject || incident.title}
                          </h3>
                          <span className={`badge badge-sm ${getStatusBadgeClass(incident.status)}`}>
                            {incident.status}
                          </span>
                          <span className={`badge badge-sm ${getPriorityBadgeClass(incident.priority)}`}>
                            {incident.priority || "Normal"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-base-content/70">
                          {incident.location && <span>📍 {incident.location}</span>}
                          <span>📂 {incident.category}</span>
                          <span>👤 {reporterName}</span>
                          <span>
                            📅{" "}
                            {incident.createdAt
                              ? new Date(incident.createdAt).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                      <button
                        className="btn btn-ghost btn-sm btn-circle"
                        onClick={() =>
                          setExpandedIncident(
                            expandedIncident === incidentId ? null : incidentId,
                          )
                        }
                      >
                        <ChevronDown
                          size={20}
                          className={`transition-transform ${
                            expandedIncident === incidentId ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Brief description */}
                    {expandedIncident !== incidentId && (
                      <p className="text-sm text-base-content/80 mt-2 line-clamp-2">
                        {incident.description}
                      </p>
                    )}

                    {/* Expanded details */}
                    {expandedIncident === incidentId && (
                      <div className="mt-4 space-y-4 border-t border-base-200 pt-4">
                        <div>
                          <h4 className="font-medium mb-1">Full Description</h4>
                          <p className="text-sm bg-base-200/50 p-3 rounded-lg">
                            {incident.description}
                          </p>
                        </div>

                        {incident.resolutionNotes && (
                          <div>
                            <h4 className="font-medium text-sm mb-1">Resolution Notes</h4>
                            <p className="text-sm text-success">{incident.resolutionNotes}</p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {incident.status !== "In Progress" && incident.status !== "Resolved" && (
                            <button
                              className="btn btn-sm btn-warning"
                              disabled={updateMutation.isPending}
                              onClick={() =>
                                updateMutation.mutate({
                                  id: incidentId,
                                  data: { status: "In Progress" },
                                })
                              }
                            >
                              <Play size={16} />
                              Mark In Progress
                            </button>
                          )}
                          {incident.status !== "Resolved" && (
                            <button
                              className="btn btn-sm btn-success"
                              disabled={updateMutation.isPending}
                              onClick={() =>
                                updateMutation.mutate({
                                  id: incidentId,
                                  data: { status: "Resolved" },
                                })
                              }
                            >
                              <CheckCircle size={16} />
                              Mark Resolved
                            </button>
                          )}
                          {incident.status === "Resolved" && (
                            <button
                              className="btn btn-sm btn-neutral"
                              disabled={updateMutation.isPending}
                              onClick={() =>
                                updateMutation.mutate({
                                  id: incidentId,
                                  data: { status: "Closed" },
                                })
                              }
                            >
                              <XCircle size={16} />
                              Close Concern
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {incidents.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={incidents.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default IncidentReports;
