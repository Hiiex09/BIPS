import {
  ClipboardList,
  AlertCircle,
  CheckCircle,
  Eye,
  FileCheck,
  Ban,
  Clock
} from "lucide-react";
import { useState } from "react";
import PageLayout from "../../../components/admin/PageLayout";
import StatsCard from "../../../components/admin/StatsCard";
import SearchFilterBar from "../../../components/admin/SearchFilterBar";
import Pagination from "../../../components/admin/Pagination";
import { mockDocuments, documentStats } from "../../../data/mockData";

const DocumentsManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockDocuments.length / itemsPerPage);

  const currentDocuments = mockDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const documentTypeFilters = [
    { label: "All Types", value: "all" },
    { label: "Barangay Clearance", value: "Barangay Clearance" },
    { label: "Certificate of Residency", value: "Certificate of Residency" },
    { label: "Business Permit", value: "Business Permit" },
    { label: "Indigency Certificate", value: "Indigency Certificate" }
  ];

  const statusFilters = [
    { label: "All Statuses", value: "all" },
    { label: "Pending", value: "Pending" },
    { label: "Processing", value: "Processing" },
    { label: "Ready", value: "Ready" },
    { label: "Completed", value: "Completed" },
    { label: "Rejected", value: "Rejected" }
  ];

  const getStatusBadgeClass = (status) => {
    const classes = {
      Pending: "badge-warning",
      Processing: "badge-info",
      Ready: "badge-success",
      Completed: "badge-neutral",
      Rejected: "badge-error"
    };
    return classes[status] || "badge-neutral";
  };

  return (
    <PageLayout title="Document Requests Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Pending"
            value={documentStats.totalPending}
            icon={ClipboardList}
            iconColor="text-info"
            iconBg="bg-info/10"
          />
          <StatsCard
            title="Urgent Requests"
            value={documentStats.urgentRequests}
            subtitle="Requires immediate attention"
            icon={AlertCircle}
            iconColor="text-error"
            iconBg="bg-error/10"
          />
          <StatsCard
            title="Completed This Month"
            value={documentStats.completedThisMonth}
            subtitle={`Avg: ${documentStats.averageProcessingTime}`}
            icon={CheckCircle}
            iconColor="text-success"
            iconBg="bg-success/10"
          />
        </div>

        {/* Search and Filters */}
        <SearchFilterBar
          searchPlaceholder="Search by requester name or purpose..."
          filters={[
            {
              placeholder: "Filter by Document Type",
              options: documentTypeFilters,
              onChange: (value) => console.log("Type filter:", value)
            },
            {
              placeholder: "Filter by Status",
              options: statusFilters,
              onChange: (value) => console.log("Status filter:", value)
            }
          ]}
        />

        {/* Documents Table */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead className="bg-base-200">
                  <tr>
                    <th className="w-16">#</th>
                    <th>Requester</th>
                    <th>Document Type</th>
                    <th>Purpose</th>
                    <th>Date Requested</th>
                    <th>Status</th>
                    <th>Processed By</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDocuments.map((doc, index) => (
                    <tr key={doc.id} className="hover">
                      <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                      <td>
                        <div className="flex items-center gap-2">
                          {doc.urgent && (
                            <div className="indicator-item badge badge-error badge-xs"></div>
                          )}
                          <span className="font-medium">{doc.requester}</span>
                        </div>
                      </td>
                      <td>{doc.documentType}</td>
                      <td className="text-sm">{doc.purpose}</td>
                      <td className="text-sm">{doc.dateRequested}</td>
                      <td>
                        <span className={`badge badge-sm ${getStatusBadgeClass(doc.status)}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="text-sm">{doc.processedBy || "-"}</td>
                      <td>
                        <div className="flex justify-center gap-2">
                          <button className="btn btn-ghost btn-xs" title="View">
                            <Eye size={16} />
                          </button>
                          {doc.status === "Pending" && (
                            <>
                              <button className="btn btn-ghost btn-xs text-success" title="Approve">
                                <FileCheck size={16} />
                              </button>
                              <button className="btn btn-ghost btn-xs text-error" title="Reject">
                                <Ban size={16} />
                              </button>
                            </>
                          )}
                          {doc.status === "Processing" && (
                            <button className="btn btn-ghost btn-xs text-info" title="Mark Ready">
                              <Clock size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={mockDocuments.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </PageLayout>
  );
};

export default DocumentsManagement;
