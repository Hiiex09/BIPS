import { Users, FileText, AlertTriangle, Megaphone, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import StatsCard from "../../components/admin/StatsCard";
import { userStats, documentStats, incidentStats, announcementStats } from "../../data/mockData";

const AdminHomepage = () => {
  return (
    <div className="space-y-6">
      {/* ── Executive KPI Strip (Swiss Ledger Format) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard
          title="Registered Residents"
          value={userStats.totalResidents.toLocaleString()}
          subtitle={`+${userStats.growthFromLastMonth} added this month`}
          icon={Users}
        />
        <StatsCard
          title="Pending Requests"
          value={documentStats.totalPending}
          subtitle={`${documentStats.urgentRequests} requires priority review`}
          icon={FileText}
        />
        <StatsCard
          title="Active Incident Cases"
          value={incidentStats.openIncidents}
          subtitle={`${incidentStats.criticalIncidents} flagged high priority`}
          icon={AlertTriangle}
        />
        <StatsCard
          title="Active Bulletins"
          value={announcementStats.published}
          subtitle={`${announcementStats.scheduled} scheduled for release`}
          icon={Megaphone}
        />
      </div>

      {/* ── Two-Column Operational Ledger ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Documents Ledger */}
        <div className="bg-base-100 border border-base-300 rounded-xs shadow-2xs">
          <div className="px-5 py-3.5 border-b border-base-300 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                Queue 01
              </span>
              <h2 className="text-sm font-black text-base-content">Recent Document Requests</h2>
            </div>
            <Link
              to="/document-management"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              Open Inbox <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-base-300 text-[10px] uppercase tracking-wider text-base-content/50 bg-base-200/40">
                  <th className="py-2.5 px-4 font-bold">Document</th>
                  <th className="py-2.5 px-4 font-bold">Requester</th>
                  <th className="py-2.5 px-4 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300 font-medium">
                <tr className="hover:bg-base-200/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-base-content">
                    Barangay Clearance
                  </td>
                  <td className="py-3 px-4 text-base-content/70">Juan Dela Cruz</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-block px-1.5 py-0.5 rounded-2xs text-[10px] font-black uppercase text-amber-600 bg-amber-500/10 border border-amber-500/20">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-base-200/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-base-content">
                    Certificate of Residency
                  </td>
                  <td className="py-3 px-4 text-base-content/70">Maria Santos</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-block px-1.5 py-0.5 rounded-2xs text-[10px] font-black uppercase text-primary bg-primary/10 border border-primary/20">
                      Approved
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-base-200/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-base-content">
                    Business Permit
                  </td>
                  <td className="py-3 px-4 text-base-content/70">Pedro Reyes</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-block px-1.5 py-0.5 rounded-2xs text-[10px] font-black uppercase text-teal-700 bg-teal-600/10 border border-teal-600/20">
                      Ready
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Incidents Ledger */}
        <div className="bg-base-100 border border-base-300 rounded-xs shadow-2xs">
          <div className="px-5 py-3.5 border-b border-base-300 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                Queue 02
              </span>
              <h2 className="text-sm font-black text-base-content">Recent Incident Reports</h2>
            </div>
            <Link
              to="/incident-reports"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              Open Board <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-base-300 text-[10px] uppercase tracking-wider text-base-content/50 bg-base-200/40">
                  <th className="py-2.5 px-4 font-bold">Incident Type</th>
                  <th className="py-2.5 px-4 font-bold">Location</th>
                  <th className="py-2.5 px-4 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300 font-medium">
                <tr className="hover:bg-base-200/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-base-content">
                    Illegal Parking Complaint
                  </td>
                  <td className="py-3 px-4 text-base-content/70">Market Street Area</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-block px-1.5 py-0.5 rounded-2xs text-[10px] font-black uppercase text-amber-600 bg-amber-500/10 border border-amber-500/20">
                      Open
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-base-200/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-base-content">
                    Noise Complaint
                  </td>
                  <td className="py-3 px-4 text-base-content/70">Bonifacio Ave</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-block px-1.5 py-0.5 rounded-2xs text-[10px] font-black uppercase text-primary bg-primary/10 border border-primary/20">
                      In Progress
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-base-200/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-base-content">
                    Street Light Malfunction
                  </td>
                  <td className="py-3 px-4 text-base-content/70">Rizal Street</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-block px-1.5 py-0.5 rounded-2xs text-[10px] font-black uppercase text-teal-700 bg-teal-600/10 border border-teal-600/20">
                      Resolved
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Quick Administrative Triggers ── */}
      <div className="bg-base-100 border border-base-300 rounded-xs p-5 shadow-2xs">
        <div className="mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">
            Direct Routing
          </span>
          <h2 className="text-sm font-black text-base-content">Administrative Operations</h2>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link
            to="/document-management"
            className="btn btn-sm btn-primary rounded-xs text-xs font-bold shadow-2xs"
          >
            Review Document Queue
          </Link>
          <Link
            to="/user-management"
            className="btn btn-sm btn-ghost border border-base-300 hover:border-primary rounded-xs text-xs font-bold"
          >
            Inspect Resident Directory
          </Link>
          <Link
            to="/incident-reports"
            className="btn btn-sm btn-ghost border border-base-300 hover:border-primary rounded-xs text-xs font-bold"
          >
            Manage Incident Board
          </Link>
          <Link
            to="/announcement-management"
            className="btn btn-sm btn-ghost border border-base-300 hover:border-primary rounded-xs text-xs font-bold"
          >
            Draft Bulletin Announcement
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
