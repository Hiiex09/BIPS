import { Link } from "react-router-dom";
import { useCheckAuth } from "../hooks/UseAuthRouteHooks.js";
import { DOCUMENTS, HALL, REQUEST_STEPS } from "../data/hall";

const GENERAL_REQUIREMENTS = [
  "A valid government-issued ID",
  "Proof that you live in Tejero, such as a utility bill or lease",
  "The completed request form, online or at the counter",
];

const Services = () => {
  const { user } = useCheckAuth();
  const requestLink = user ? "/Resident/documents" : "/login";

  return (
    <main>
      <header className="border-b border-base-300">
        <div className="page-wrap py-12 sm:py-16">
          <h1 className="type-display max-w-3xl">Barangay services</h1>
          <p className="type-lede mt-5">
            What the hall can issue, what each one is for, and what to bring.
            Requests marked online can be filed from the resident portal.
          </p>
        </div>
      </header>

      {/* Register of documents */}
      <section className="page-section">
        <div className="page-wrap">
          <div className="hidden sm:grid grid-cols-[1.2fr_2fr_1.6fr_7rem] gap-6 pb-3 text-sm text-base-content/55 border-b border-base-content">
            <span>Document</span>
            <span>What it's for</span>
            <span>What to bring</span>
            <span>How to file</span>
          </div>

          <ul className="ruled border-b border-base-300">
            {DOCUMENTS.map((doc) => (
              <li
                key={doc.title}
                className="grid gap-2 py-5 sm:grid-cols-[1.2fr_2fr_1.6fr_7rem] sm:gap-6 sm:items-baseline"
              >
                <h2 className="type-heading text-lg">{doc.title}</h2>
                <p className="text-base-content/80">{doc.use}</p>
                <p className="text-sm text-base-content/65">
                  <span className="sm:hidden">Bring: </span>
                  {doc.bring}
                </p>
                {doc.online ? (
                  <Link to={requestLink} className="link-ink text-sm font-semibold text-primary">
                    Request online
                  </Link>
                ) : (
                  <span className="text-sm text-base-content/60">At the hall</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How a request moves — a true sequence, so it is numbered */}
      <section className="page-section bg-base-200 border-y border-base-300">
        <div className="page-wrap">
          <h2 className="type-title">How a request moves through the hall</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {REQUEST_STEPS.map((step, i) => (
              <li key={step.title} className="border-t-[3px] border-primary pt-4">
                <span className="type-condensed text-3xl font-bold text-primary">{i + 1}</span>
                <h3 className="type-heading mt-2">{step.title}</h3>
                <p className="mt-2 text-base-content/70">{step.detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-2xl text-base-content/70">
            Most documents are ready in 2 to 3 working days. Rush processing
            within 1 working day is available at the counter for an additional fee.
          </p>
        </div>
      </section>

      {/* General requirements + help */}
      <section className="page-section">
        <div className="page-wrap grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="type-title">Bring these for any request</h2>
            <ul className="mt-6 space-y-3">
              {GENERAL_REQUIREMENTS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-3 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:border-l md:border-base-300 md:pl-16">
            <h2 className="type-title">Not sure what you need?</h2>
            <p className="mt-4 text-base-content/75">
              Ask the hall before you go. Staff can tell you which document fits
              your purpose.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${HALL.phone.replace(/[^\d+]/g, "")}`} className="btn-ink">
                Call {HALL.phone}
              </a>
              <a href={`mailto:${HALL.email}`} className="btn-line">
                Email the hall
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
