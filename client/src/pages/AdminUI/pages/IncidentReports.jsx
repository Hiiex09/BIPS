import {
  AlertTriangle,
  CircleAlert,
  CheckCircle,
  ChevronDown,
  UserCheck,
  XCircle,
  Play
} from "lucide-react";
import { useState } from "react";
import PageLayout from "../../../components/admin/PageLayout";
import StatsCard from "../../../components/admin/StatsCard";
import SearchFilterBar from "../../../components/admin/SearchFilterBar";
import Pagination from "../../../components/admin/Pagination";
import { mockIncidents, incidentStats } from "../../../data/mockData";

const IncidentReports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedIncident, setExpandedIncident] = useState(null);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockIncidents.length / itemsPerPage);

  const currentIncidents = mockIncidents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categoryFilters = [
    { label: "All Categories", value: "all" },
    { label: "Traffic", value: "Traffic" },
    { label: "Public Disturbance", value: "Public Disturbance" },
    { label: "Infrastructure", value: "Infrastructure" },
    { label: "Animal Control", value: "Animal Control" },
    { label: "Sanitation", value: "Sanitation" }
  ];

  const statusFilters = [
    { label: "All Statuses", value: "all" },
    { label: "Open", value: "Open" },
    { label: "In Progress", value: "In Progress" },
    { label: "Resolved", value: "Resolved" },
    { label: "Closed", value: "Closed" }
  ];

  const priorityFilters = [
    { label: "All Priorities", value: "all" },
    { label: "Critical", value: "Critical" },
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" }
  ];

  const getStatusBadgeClass = (status) => {
    const classes = {
      Open: "badge-error",
      "In Progress": "badge-warning",
      Resolved: "badge-success",
      Closed: "badge-neutral"
    };
    return classes[status] || "badge-neutral";
  };

  const getPriorityBadgeClass = (priority) => {
    const classes = {
      Critical: "badge-error",
      High: "badge-warning",
      Medium: "badge-info",
      Low: "badge-neutral"
    };
    return classes[priority] || "badge-neutral";
  };

  return (
    <PageLayout title="Incident Reports Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Open Incidents"
            value={incidentStats.openIncidents}
            icon={AlertTriangle}
            iconColor="text-error"
            iconBg="bg-error/10"
          />
          <StatsCard
            title="In Progress"
            value={incidentStats.inProgress}
            icon={CircleAlert}
            iconColor="text-warning"
            iconBg="bg-warning/10"
          />
          <StatsCard
            title="Resolved This Month"
            value={incidentStats.resolvedThisMonth}
            icon={CheckCircle}
            iconColor="text-success"
            iconBg="bg-success/10"
          />
          <StatsCard
            title="Critical"
            value={incidentStats.criticalIncidents}
            subtitle="Needs immediate action"
            icon={CircleAlert}
            iconColor="text-error"
            iconBg="bg-error/10"
          />
        </div>

        {/* Search and Filters */}
        <SearchFilterBar
          searchPlaceholder="Search by title, location, or reporter..."
          filters={[
            {
              placeholder: "Filter by Category",
              options: categoryFilters,
              onChange: (value) => console.log("Category filter:", value)
            },
            {
              placeholder: "Filter by Status",
              options: statusFilters,
              onChange: (value) => console.log("Status filter:", value)
            },
            {
              placeholder: "Filter by Priority",
              options: priorityFilters,
              onChange: (value) => console.log("Priority filter:", value)
            }
          ]}
        />

        {/* Incidents List */}
        <div className="space-y-4">
          {currentIncidents.map((incident) => (
            <div key={incident.id} className="card bg-base-100 shadow-md">
              <div className="card-body">
                {/* Incident Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{incident.title}</h3>
                      <span className={`badge badge-sm ${getStatusBadgeClass(incident.status)}`}>
                        {incident.status}
                      </span>
                      <span className={`badge badge-sm ${getPriorityBadgeClass(incident.priority)}`}>
                        {incident.priority}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted">
                      <span>📍 {incident.location}</span>
                      <span>📂 {incident.category}</span>
                      <span>👤 {incident.reportedBy}</span>
                      <span>📅 {incident.dateReported}</span>
                    </div>
                  </div>
                  <button
                    className="btn btn-ghost btn-sm btn-circle"
                    onClick={() => setExpandedIncident(
                      expandedIncident === incident.id ? null : incident.id
                    )}
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${expandedIncident === incident.id ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                {/* Collapsed View - Brief Description */}
                {expandedIncident !== incident.id && (
                  <p className="text-sm text-muted mt-2">{incident.description}</p>
                )}

                {/* Expanded View - Full Details */}
                {expandedIncident === incident.id && (
                  <div className="mt-4 space-y-4 border-t pt-4">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm">{incident.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-1">Assigned To</h4>
                        <p className="text-sm">{incident.assignedTo || "Unassigned"}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">Location</h4>
                        <p className="text-sm">{incident.location}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      {incident.status === "Open" && (
                        <>
                          <button className="btn btn-sm btn-primary">
                            <UserCheck size={16} />
                            Assign
                          </button>
                          <button className="btn btn-sm btn-warning">
                            <Play size={16} />
                            Start Progress
                          </button>
                        </>
                      )}
                      {incident.status === "In Progress" && (
                        <button className="btn btn-sm btn-success">
                          <CheckCircle size={16} />
                          Mark Resolved
                        </button>
                      )}
                      {incident.status === "Resolved" && (
                        <button className="btn btn-sm btn-neutral">
                          <XCircle size={16} />
                          Close Incident
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={mockIncidents.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </PageLayout>
  );
};

export default IncidentReports;
