import { useState } from "react";
import { Phone, MapPin, Download, ChevronDown, ChevronUp, TriangleAlert, Flame, Cross, Zap, ShieldAlert, X } from "lucide-react";
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
    className={`flex items-center justify-between px-4 py-3 rounded-xl ${hotline.colorClass} transition-opacity hover:opacity-90`}
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
    <div className="border border-base-300 rounded-xl overflow-hidden">
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

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-base-content">Emergency Services</h2>
        <p className="text-sm text-muted mt-0.5">
          Quick access to emergency contacts, nearby facilities, and safety procedures.
        </p>
      </div>

      {/* Weather / Active Warning Alert */}
      {!alertDismissed && (
        <div role="alert" className="alert bg-error text-error-content shadow-sm">
          <TriangleAlert size={18} />
          <div>
            <p className="font-bold text-sm">Active Weather Warning: Severe Thunderstorm</p>
            <p className="text-xs opacity-85">Take shelter immediately if outdoors. High winds expected until 10:00 PM.</p>
          </div>
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <button className="btn btn-sm bg-white/20 hover:bg-white/30 text-error-content border-0">Details</button>
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
                <Phone size={16} className="text-error" />
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
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-primary" />
                <h3 className="font-bold text-sm text-base-content">Nearest Emergency Facilities</h3>
              </div>
              {/* Facility Tags */}
              <div className="flex flex-wrap gap-2">
                {emergencyFacilities.map((f) => (
                  <span key={f.name} className="badge badge-soft badge-primary badge-sm gap-1">
                    <MapPin size={10} /> {f.name} ({f.distance})
                  </span>
                ))}
              </div>
              {/* Map Placeholder */}
              <div className="aspect-[16/7] bg-base-200 rounded-xl flex items-center justify-center border border-base-300">
                <div className="text-center text-muted">
                  <MapPin size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-xs opacity-50">Map — Nearest Emergency Facilities</p>
                </div>
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
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
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
