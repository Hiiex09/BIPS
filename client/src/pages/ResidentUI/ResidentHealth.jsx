import { CalendarDays, MapPin, Phone, AlertCircle } from "lucide-react";
import { healthCenterStats, healthServices, doctorSchedule } from "../../data/residentMockData";

/* ── Stat Card ──────────────────────────────────────── */
const StatCard = ({ stat }) => (
  <div className="card bg-base-100 border border-base-300 shadow-sm flex-1">
    <div className="card-body p-4 gap-1">
      <p className="text-xs text-muted font-medium uppercase tracking-wide">{stat.label}</p>
      <div className="flex items-end gap-2">
        <span className="text-2xl">{stat.icon}</span>
        <p className="text-2xl font-bold text-base-content">{stat.value}</p>
      </div>
      <p className="text-xs text-muted">{stat.trend}</p>
    </div>
  </div>
);

/* ── Status Badge ───────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const map = {
    available: { cls: "badge-success badge-soft", label: "Available" },
    limited: { cls: "badge-warning badge-soft", label: "Limited" },
    full: { cls: "badge-error badge-soft", label: "Fully Booked" },
  };
  const { cls, label } = map[status] || { cls: "badge-ghost", label: status };
  return <span className={`badge badge-sm font-semibold ${cls}`}>{label}</span>;
};

/* ── Main Page ──────────────────────────────────────── */
const ResidentHealth = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-base-content">Community Health Services</h2>
          <p className="text-sm text-muted mt-0.5">Quality care for every resident, right in the heart of the city.</p>
        </div>
        <button className="btn btn-primary btn-sm gap-2 shrink-0">
          <CalendarDays size={14} /> Book Appointment
        </button>
      </div>

      {/* Alert Notice */}
      <div role="alert" className="alert alert-info alert-soft">
        <AlertCircle size={16} />
        <div>
          <span className="font-semibold">Flu Season Update</span>
          <span className="text-sm"> · Walk-in vaccinations are available every Monday and Wednesday from 8:00 AM to 11:00 AM.</span>
        </div>
        <button className="btn btn-sm btn-ghost ml-auto">Learn More</button>
      </div>

      {/* Stats Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {healthCenterStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Our Specialized Services */}
      <div>
        <h3 className="font-bold text-base text-base-content mb-4">Our Specialized Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {healthServices.map((service) => (
            <div key={service.id} className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <figure className="h-40 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body p-4 gap-2">
                <h4 className="font-bold text-sm">{service.name}</h4>
                <p className="text-xs text-muted leading-relaxed">{service.description}</p>
                <a className="link link-primary text-xs font-semibold mt-1">{service.link}</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Medical Schedule */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body p-5 gap-3">
          <div>
            <h3 className="font-bold text-base text-base-content">Weekly Medical Schedule</h3>
            <p className="text-xs text-muted mt-0.5">Current availability for specialized consultations.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr className="text-xs text-muted uppercase tracking-wide">
                  <th>Practitioner</th>
                  <th>Specialty</th>
                  <th className="hidden sm:table-cell">Days</th>
                  <th className="hidden md:table-cell">Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {doctorSchedule.map((doc) => (
                  <tr key={doc.name} className="hover:bg-base-50">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-9 h-9 rounded-full">
                            <img src={doc.avatar} alt={doc.name} />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-base-content">{doc.name}</p>
                          <p className="text-xs text-muted">{doc.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-xs">{doc.specialty}</td>
                    <td className="text-xs hidden sm:table-cell">{doc.days}</td>
                    <td className="text-xs hidden md:table-cell">{doc.hours}</td>
                    <td><StatusBadge status={doc.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ready to schedule CTA */}
      <div className="card bg-primary/5 border border-primary/20 shadow-sm">
        <div className="card-body p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-2">
              <h3 className="font-bold text-base text-base-content">Ready to schedule your visit?</h3>
              <p className="text-sm text-muted leading-relaxed">
                We offer easy online booking for all our services. Most appointments can be confirmed within minutes.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button className="btn btn-primary btn-sm gap-2">
                  <CalendarDays size={14} /> Book Now
                </button>
                <button className="btn btn-outline btn-primary btn-sm gap-2">
                  View Patient Portal
                </button>
              </div>
            </div>
            <div className="hidden md:flex w-32 h-28 bg-base-100 rounded-xl border border-base-300 items-center justify-center shrink-0">
              <CalendarDays size={48} className="text-primary/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-base-100 border border-base-300">
          <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-base-content">Location</p>
            <p className="text-xs text-muted">Barangay Health Center,<br />Purok 3, San Jose</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-xl bg-base-100 border border-base-300">
          <Phone size={16} className="text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-base-content">Contact</p>
            <p className="text-xs text-muted">(555) 123-4567<br />health@barangay.gov</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-xl bg-error/5 border border-error/20">
          <AlertCircle size={16} className="text-error mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-base-content">Emergency</p>
            <p className="text-xs text-muted">For immediate medical emergencies, please dial 911 or visit the nearest ER.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentHealth;
