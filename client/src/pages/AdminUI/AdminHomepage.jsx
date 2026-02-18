import { Users, ClipboardClock, TriangleAlert, Megaphone } from "lucide-react";
import StatsCard from "../../components/admin/StatsCard";
import { userStats, documentStats, incidentStats, announcementStats } from "../../data/mockData";

const AdminHomepage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-base-content">Dashboard Overview</h1>
        <p className="text-muted mt-2">Welcome to the Barangay Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Residents"
          value={userStats.totalResidents.toLocaleString()}
          subtitle={`+${userStats.growthFromLastMonth} from last month`}
          icon={Users}
          iconColor="text-primary"
          iconBg="bg-primary/10"
          trend={true}
        />
        <StatsCard
          title="Pending Requests"
          value={documentStats.totalPending}
          subtitle={`${documentStats.urgentRequests} urgent`}
          icon={ClipboardClock}
          iconColor="text-warning"
          iconBg="bg-warning/10"
        />
        <StatsCard
          title="Active Incidents"
          value={incidentStats.openIncidents}
          subtitle={`${incidentStats.criticalIncidents} critical`}
          icon={TriangleAlert}
          iconColor="text-error"
          iconBg="bg-error/10"
        />
        <StatsCard
          title="Published Announcements"
          value={announcementStats.published}
          subtitle={`${announcementStats.scheduled} scheduled`}
          icon={Megaphone}
          iconColor="text-success"
          iconBg="bg-success/10"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Documents */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-lg mb-4">Recent Document Requests</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-base-200/50 rounded-lg">
                <div>
                  <p className="font-medium">Barangay Clearance</p>
                  <p className="text-sm text-muted">Juan Dela Cruz</p>
                </div>
                <span className="badge badge-warning badge-sm">Pending</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-base-200/50 rounded-lg">
                <div>
                  <p className="font-medium">Certificate of Residency</p>
                  <p className="text-sm text-muted">Maria Santos</p>
                </div>
                <span className="badge badge-info badge-sm">Processing</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-base-200/50 rounded-lg">
                <div>
                  <p className="font-medium">Business Permit</p>
                  <p className="text-sm text-muted">Pedro Reyes</p>
                </div>
                <span className="badge badge-success badge-sm">Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-lg mb-4">Recent Incident Reports</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-base-200/50 rounded-lg">
                <div>
                  <p className="font-medium">Illegal Parking Complaint</p>
                  <p className="text-sm text-muted">Market Street area</p>
                </div>
                <span className="badge badge-error badge-sm">Open</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-base-200/50 rounded-lg">
                <div>
                  <p className="font-medium">Noise Complaint</p>
                  <p className="text-sm text-muted">Bonifacio Ave</p>
                </div>
                <span className="badge badge-warning badge-sm">In Progress</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-base-200/50 rounded-lg">
                <div>
                  <p className="font-medium">Street Light Malfunction</p>
                  <p className="text-sm text-muted">Rizal Street</p>
                </div>
                <span className="badge badge-success badge-sm">Resolved</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-md mt-6">
        <div className="card-body">
          <h2 className="card-title text-lg mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button className="btn btn-primary btn-sm">
              Process Document Request
            </button>
            <button className="btn btn-warning btn-sm">
              Review Pending Verifications
            </button>
            <button className="btn btn-error btn-sm">
              Check Critical Incidents
            </button>
            <button className="btn btn-success btn-sm">
              Create Announcement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
