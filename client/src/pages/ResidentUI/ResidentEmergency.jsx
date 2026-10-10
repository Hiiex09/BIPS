import { useState } from "react";
import { Phone, MapPin, Download, ChevronDown, ChevronUp, Flame, Cross, Zap, ShieldAlert, X, ExternalLink, Navigation } from "lucide-react";
import { emergencyHotlines, nonEmergencyContacts, emergencyFacilities, emergencyProcedures } from "../../data/residentMockData";

/* ── Procedure icon mapper ──────────────────────────── */
const procedureIcons = {
  fire: Flame,
  medical: Cross,
  power: Zap,
  threat: ShieldAlert,
};

/* ── Hotline Button ─────────────────────────────────── */
const HotlineButton = ({ hotline }) => (
  <a
    href={`tel:${hotline.number}`}
    className={`flex items-center justify-between px-4 py-3 rounded-xs ${hotline.colorClass} transition-opacity hover:opacity-90`}
  >
    <div className="flex items-center gap-3">
      <Phone size={18} />
      <div>
        <p className="font-bold text-sm">{hotline.name}</p>
        <p className="text-xs opacity-80">{hotline.subtitle}</p>
      </div>
    </div>
    <span className="text-2xl font-black tracking-tight">{hotline.number}</span>
  </a>
);

/* ── Procedure Accordion ────────────────────────────── */
const ProcedureItem = ({ proc, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = procedureIcons[proc.id] || ShieldAlert;

  return (
    <div className="border border-base-300 rounded-xs overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-base-100 hover:bg-base-200 transition-colors text-left"
      >
        <div className="flex items-center gap-2 font-semibold text-sm text-base-content">
          <Icon size={16} className="text-primary" />
          {proc.title}
        </div>
        {open ? <ChevronUp size={14} className="text-muted shrink-0" /> : <ChevronDown size={14} className="text-muted shrink-0" />}
      </button>
      {open && (
        <div className="px-4 py-3 bg-base-50 border-t border-base-300">
          <ol className="space-y-1.5">
            {proc.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                <span className="w-5 h-5 rounded-full bg-primary text-primary-content text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

/* ── Main Page ──────────────────────────────────────── */
const ResidentEmergency = () => {
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(emergencyFacilities[0]);

  return (
    <div className="space-y-5 w-full">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-base-content">Emergency Services</h2>
        <p className="text-sm text-muted mt-0.5">
          Quick access to emergency contacts, nearby facilities, and safety procedures.
        </p>
      </div>

      {/* Weather / Active Warning Alert */}
      {!alertDismissed && (
        <div role="alert" className="alert bg-accent text-accent-content shadow-sm">
          <div>
            <p className="font-bold text-sm">Active Weather Warning: Severe Thunderstorm</p>
            <p className="text-xs opacity-85">Take shelter immediately if outdoors. High winds expected until 10:00 PM.</p>
          </div>
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <button onClick={() => setAlertDismissed(true)} className="btn btn-sm btn-circle btn-ghost">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* ── LEFT: Hotlines ── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-5 gap-4">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <h3 className="font-bold text-sm text-base-content">Call Now</h3>
              </div>
              <div className="space-y-3">
                {emergencyHotlines.map((h) => (
                  <HotlineButton key={h.name} hotline={h} />
                ))}
              </div>

              <div className="divider my-0 text-xs text-muted">Non-Emergency Contacts</div>

              <div className="space-y-2">
                {nonEmergencyContacts.map((c) => (
                  <div key={c.name} className="flex items-center justify-between py-1">
                    <span className="text-sm text-base-content">{c.name}</span>
                    <a href={`tel:${c.number}`} className="text-sm font-semibold text-primary link link-hover">
                      {c.number}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Map + Procedures ── */}
        <div className="lg:col-span-3 space-y-4">
          {/* Nearest Facilities */}
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-5 gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-primary" />
                  <h3 className="font-bold text-sm text-base-content">Nearest Emergency Facilities</h3>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedFacility.query || selectedFacility.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary text-xs font-semibold inline-flex items-center gap-1"
                >
                  Expand Map <ExternalLink size={12} />
                </a>
              </div>

              {/* Facility Selectors */}
              <div className="flex flex-wrap gap-2">
                {emergencyFacilities.map((f) => {
                  const isSelected = selectedFacility.name === f.name;
                  return (
                    <button
                      key={f.name}
                      type="button"
                      onClick={() => setSelectedFacility(f)}
                      className={`badge badge-sm gap-1.5 cursor-pointer transition-all ${
                        isSelected
                          ? "badge-primary text-white font-semibold shadow-xs"
                          : "badge-soft badge-ghost hover:badge-neutral text-base-content/70"
                      }`}
                    >
                      <MapPin size={11} /> {f.name} ({f.distance})
                    </button>
                  );
                })}
              </div>

              {/* Map Embed */}
              <div className="aspect-[16/7] md:aspect-[16/8] bg-base-200 rounded-xs overflow-hidden border border-base-300 relative shadow-inner">
                <iframe
                  title={`Map showing ${selectedFacility.name}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(selectedFacility.query || selectedFacility.name)}&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Facility Details & Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-base-200">
                <div className="text-xs text-muted">
                  <span className="font-semibold text-base-content">{selectedFacility.name}:</span>{" "}
                  {selectedFacility.address || "Cebu City, Philippines"} · Approx. {selectedFacility.distance} away
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedFacility.query || selectedFacility.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-xs btn-primary rounded-xs gap-1.5 font-semibold text-white shadow-xs"
                >
                  <Navigation size={12} /> Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* Emergency Procedures */}
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-5 gap-4">
              <div className="flex items-center gap-2">
                <ShieldAlert size={15} className="text-primary" />
                <h3 className="font-bold text-sm text-base-content">Emergency Procedures: What To Do</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {emergencyProcedures.map((proc, i) => (
                  <ProcedureItem key={proc.id} proc={proc} defaultOpen={i === 0} />
                ))}
              </div>
            </div>
          </div>

          {/* Download Evacuation Plan */}
          <div className="card bg-primary/5 border border-primary/20 shadow-sm">
            <div className="card-body p-4 flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-xs bg-primary/10 flex items-center justify-center shrink-0">
                <Download size={22} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-primary">Download Evacuation Plan</p>
                <p className="text-xs text-muted leading-snug">
                  Keep a physical copy of the building evacuation routes and emergency exit locations.
                </p>
              </div>
              <button className="btn btn-primary btn-sm gap-2 shrink-0">
                <Download size={13} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-center text-xs text-muted pb-2">
        In case of life-threatening emergency, always dial <strong>911</strong> first.
      </p>
    </div>
  );
};

export default ResidentEmergency;
