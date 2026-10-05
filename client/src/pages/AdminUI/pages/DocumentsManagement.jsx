import {
  ClipboardList,
  AlertCircle,
  CheckCircle,
  Eye,
  FileCheck,
  Ban,
  Clock,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PageLayout from "../../../components/admin/PageLayout";
import StatsCard from "../../../components/admin/StatsCard";
import SearchFilterBar from "../../../components/admin/SearchFilterBar";
import Pagination from "../../../components/admin/Pagination";
import {
  getCertificateRequestsApi,
  approveCertificateRequestApi,
  readyCertificateRequestApi,
  rejectCertificateRequestApi,
} from "../../../api/certificate_api";

const DocumentsManagement = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const itemsPerPage = 8;

  const { data, isLoading, error } = useQuery({
    queryKey: ["certificateRequests", { search, status: statusFilter, certificate_type: typeFilter }],
    queryFn: () =>
      getCertificateRequestsApi({
        search: search || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        certificate_type: typeFilter !== "all" ? typeFilter : undefined,
      }),
  });

  const requests = Array.isArray(data) ? data : data?.requests || [];

  const approveMutation = useMutation({
    mutationFn: (id) => approveCertificateRequestApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificateRequests"] });
      toast.success("Request approved successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to approve request");
    },
  });

  const readyMutation = useMutation({
    mutationFn: (id) => readyCertificateRequestApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificateRequests"] });
      toast.success("Request marked ready for pickup");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update request");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => rejectCertificateRequestApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificateRequests"] });
      toast.success("Request rejected");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to reject request");
    },
  });

  const totalPending = requests.filter((r) => r.status === "Pending").length;
  const totalApproved = requests.filter((r) => r.status === "Approved").length;
  const totalReady = requests.filter((r) => r.status === "Ready for Pickup").length;

  const totalPages = Math.ceil(requests.length / itemsPerPage) || 1;
  const currentDocuments = requests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const documentTypeFilters = [
    { label: "All Types", value: "all" },
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

  const getStatusBadgeClass = (status) => {
    const classes = {
      Pending: "badge-warning",
      Approved: "badge-info",
      "Ready for Pickup": "badge-success",
      Rejected: "badge-error",
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
            value={totalPending}
            subtitle="Awaiting staff review"
            icon={ClipboardList}
            iconColor="text-info"
            iconBg="bg-info/10"
          />
          <StatsCard
            title="Approved"
            value={totalApproved}
            subtitle="Processing / printing"
            icon={AlertCircle}
            iconColor="text-warning"
            iconBg="bg-warning/10"
          />
          <StatsCard
            title="Ready for Pickup"
            value={totalReady}
            subtitle="Available for resident claim"
            icon={CheckCircle}
            iconColor="text-success"
            iconBg="bg-success/10"
          />
        </div>

        {/* Search and Filters */}
        <SearchFilterBar
          searchPlaceholder="Search by requester name or purpose..."
          onSearchChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
          filters={[
            {
              placeholder: "Filter by Document Type",
              options: documentTypeFilters,
              onChange: (value) => {
                setTypeFilter(value);
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
          ]}
        />

        {/* Documents Table */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body p-0">
            {isLoading ? (
              <div className="flex justify-center items-center p-12 gap-3">
                <Loader2 className="animate-spin text-primary" size={24} />
                <span>Loading requests...</span>
              </div>
            ) : error ? (
              <div className="alert alert-error m-4">
                <span>Failed to load document requests.</span>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center p-12 text-base-content/60">
                No document requests found.
              </div>
            ) : (
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
                    {currentDocuments.map((doc, index) => {
                      const residentName =
                        doc.residentId
                          ? `${doc.residentId.firstName || ""} ${doc.residentId.lastName || ""}`
                          : "Unknown Resident";
                      const processorName = doc.processedBy
                        ? `${doc.processedBy.firstName || ""} ${doc.processedBy.lastName || ""}`
                        : "-";

                      return (
                        <tr key={doc._id || index} className="hover">
                          <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                          <td>
                            <div className="font-medium">{residentName}</div>
                            {doc.contactNumber && (
                              <div className="text-xs text-base-content/60">
                                {doc.contactNumber}
                              </div>
                            )}
                          </td>
                          <td className="font-semibold">{doc.certificate_type}</td>
                          <td className="text-sm max-w-xs truncate">{doc.purpose}</td>
                          <td className="text-sm">
                            {doc.dateRequested
                              ? new Date(doc.dateRequested).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>
                            <span className={`badge badge-sm ${getStatusBadgeClass(doc.status)}`}>
                              {doc.status}
                            </span>
                          </td>
                          <td className="text-sm">{processorName}</td>
                          <td>
                            <div className="flex justify-center gap-1">
                              <button
                                className="btn btn-ghost btn-xs"
                                title="View details"
                                onClick={() => setSelectedDoc(doc)}
                              >
                                <Eye size={16} />
                              </button>
                              {doc.status === "Pending" && (
                                <>
                                  <button
                                    className="btn btn-ghost btn-xs text-success"
                                    title="Approve"
                                    disabled={approveMutation.isPending}
                                    onClick={() => approveMutation.mutate(doc._id)}
                                  >
                                    <FileCheck size={16} />
                                  </button>
                                  <button
                                    className="btn btn-ghost btn-xs text-error"
                                    title="Reject"
                                    disabled={rejectMutation.isPending}
                                    onClick={() => rejectMutation.mutate(doc._id)}
                                  >
                                    <Ban size={16} />
                                  </button>
                                </>
                              )}
                              {doc.status === "Approved" && (
                                <button
                                  className="btn btn-ghost btn-xs text-info"
                                  title="Mark Ready for Pickup"
                                  disabled={readyMutation.isPending}
                                  onClick={() => readyMutation.mutate(doc._id)}
                                >
                                  <Clock size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modal for viewing details */}
        {selectedDoc && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-3">Document Request Details</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Requester:</strong>{" "}
                  {selectedDoc.residentId
                    ? `${selectedDoc.residentId.firstName} ${selectedDoc.residentId.lastName}`
                    : "N/A"}
                </p>
                <p>
                  <strong>Document:</strong> {selectedDoc.certificate_type}
                </p>
                <p>
                  <strong>Purpose:</strong> {selectedDoc.purpose}
                </p>
                <p>
                  <strong>Contact:</strong> {selectedDoc.contactNumber || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {selectedDoc.status}
                </p>
                <p>
                  <strong>Remarks:</strong> {selectedDoc.remarks || "None"}
                </p>
              </div>
              <div className="modal-action">
                <button className="btn btn-sm" onClick={() => setSelectedDoc(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {requests.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={requests.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default DocumentsManagement;
