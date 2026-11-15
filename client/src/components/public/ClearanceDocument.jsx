import { REQUEST_STEPS } from "../../data/hall";

const STEP_DELAY_MS = 350;

const today = new Date().toLocaleDateString("en-PH", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const Field = ({ label, value }) => (
  <div className="flex items-baseline gap-3 border-b border-dashed border-base-content/25 pb-1.5">
    <dt className="text-xs text-base-content/60 w-20 shrink-0">{label}</dt>
    <dd className="text-sm font-semibold">{value}</dd>
  </div>
);

/**
 * The hero object: a sample barangay clearance moving through the hall
 * and receiving its stamp. Decorative; the steps are also listed in text on the Services page.
 */
const ClearanceDocument = ({ className = "" }) => (
  <figure className={`relative ${className}`}>
    {/* Manila folder behind the sheet */}
    <div
      aria-hidden="true"
      className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 rounded-sm bg-deep"
    />

    <div className="relative rounded-sm bg-white border border-base-300 px-5 py-6 sm:px-8 sm:py-8 shadow-[0_1px_0_rgba(0,23,31,0.06),0_18px_40px_-24px_rgba(0,23,31,0.45)]">
      <header className="text-center">
        <p className="text-[11px] leading-snug text-base-content/60">
          Republic of the Philippines
          <br />
          City of Cebu
        </p>
        <p className="mt-1 text-xs font-semibold">Office of the Punong Barangay, Tejero</p>
        <p className="mt-4 text-2xl sm:text-[1.75rem] font-extrabold tracking-tight [font-stretch:125%]">
          Barangay Clearance
        </p>
      </header>

      <dl className="mt-6 space-y-3">
        <Field label="Name" value="Juan Dela Cruz" />
        <Field label="Purpose" value="Employment" />
        <Field label="Request" value={<span className="type-condensed">No. 2026-0147</span>} />
      </dl>

      {/* Request status track */}
      <ol className="mt-7 grid grid-cols-4 gap-1.5" aria-label="Request status">
        {REQUEST_STEPS.map((step, i) => (
          <li key={step.title}>
            <span
              className="step-bar block h-1.5 rounded-full bg-primary"
              style={{ animationDelay: `${300 + i * STEP_DELAY_MS}ms` }}
            />
            <span
              className="step-label mt-2 block text-[11px] leading-tight font-medium type-condensed"
              style={{ animationDelay: `${300 + i * STEP_DELAY_MS}ms` }}
            >
              {step.title}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex items-end justify-between gap-4">
        <div className="text-[11px] text-base-content/60">
          <span className="block w-28 border-b border-base-content/40 mb-1" aria-hidden="true" />
          Punong Barangay
        </div>

        {/* The stamp */}
        <div
          aria-hidden="true"
          className="stamp -mb-2 mr-1 select-none rounded-md border-[3px] border-primary px-3 py-1.5 text-center text-primary/90 mix-blend-multiply"
        >
          <span className="block text-lg font-black leading-none tracking-wide [font-stretch:125%]">
            APPROVED
          </span>
          <span className="block mt-1 text-[10px] font-semibold leading-none type-condensed">
            Brgy. Tejero
            <br />
            {today}
          </span>
        </div>
      </div>
    </div>

    <figcaption className="sr-only">
      A sample barangay clearance request that has moved from requested to ready for pickup and been stamped approved.
    </figcaption>
  </figure>
);

export default ClearanceDocument;
