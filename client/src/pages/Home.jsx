import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { useCheckAuth } from "../hooks/UseAuthRouteHooks.js";
import ClearanceDocument from "../components/public/ClearanceDocument";
import {
  DOCUMENTS,
  HALL,
  HOTLINES,
  mapDirectionsUrl,
  mapEmbedUrl,
} from "../data/hall";

const Home = () => {
  const { user } = useCheckAuth();
  const requestLink = user ? "/Resident/documents" : "/login";
  const concernLink = user ? "/Resident/concerns" : "/login";
  const onlineDocs = DOCUMENTS.filter((d) => d.online);

  return (
    <main>
      {/* Hero: the clearance getting stamped */}
      <section className="border-b border-base-300">
        <div className="page-wrap grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24">
          <div>
            <h1 className="type-display">
              Get your barangay papers without the queue.
            </h1>
            <p className="type-lede mt-6">
              Request a clearance or certificate from Barangay Tejero, follow it
              until it's stamped, and come to the hall once — to pick it up.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={requestLink} className="btn-stamp btn-lg">
                Request a document
              </Link>
              <Link to="/services" className="btn-line btn-lg">
                See what to bring
              </Link>
            </div>
          </div>

          <ClearanceDocument className="mx-auto w-full max-w-md lg:max-w-none" />
        </div>
      </section>

      {/* What you can request online */}
      <section className="page-section">
        <div className="page-wrap grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <h2 className="type-title">Request these online</h2>
            <p className="mt-4 text-base-content/70 max-w-sm">
              Fill in the form from your phone. You only visit the hall when
              your document is ready.
            </p>
            <Link to="/services" className="link-ink mt-6 inline-block font-semibold">
              All barangay services
            </Link>
          </div>

          <ul className="ruled border-y border-base-300">
            {onlineDocs.map((doc) => (
              <li key={doc.title}>
                <Link
                  to={requestLink}
                  className="group grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6 hover:bg-tint -mx-3 px-3 rounded-sm"
                >
                  <span className="type-heading group-hover:underline decoration-primary decoration-2 underline-offset-4">{doc.title}</span>
                  <span className="text-base-content/75">
                    {doc.use}
                    <span className="mt-1 block text-sm text-base-content/55">
                      Bring: {doc.bring}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Concerns & emergencies */}
      <section className="bg-accent text-accent-content">
        <div className="page-wrap grid gap-10 py-14 sm:py-16 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="type-title">Something wrong on your street?</h2>
            <p className="mt-4 text-accent-content/75 max-w-md">
              Report a broken streetlight, uncollected garbage, flooding or a
              peace and order concern, with a photo if you have one. You can
              follow what the hall does about it from your account.
            </p>
            <Link
              to={concernLink}
              className="btn btn-lg mt-8 rounded-md border-0 bg-accent-content text-accent font-semibold hover:bg-white"
            >
              Report a concern
            </Link>
          </div>

          <div className="md:border-l md:border-accent-content/20 md:pl-16">
            <h2 className="type-heading">In an emergency, call</h2>
            <ul className="mt-5 space-y-3">
              {HOTLINES.map((line) => (
                <li key={line.number}>
                  <a
                    href={`tel:${line.number}`}
                    className="flex items-baseline gap-4 rounded-sm hover:text-white"
                  >
                    <span className="w-24 text-4xl font-extrabold text-white [font-stretch:125%] tabular-nums">
                      {line.number}
                    </span>
                    <span className="text-lg">{line.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Visit the hall */}
      <section className="page-section">
        <div className="page-wrap grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <h2 className="type-title">Visit the hall</h2>
            <p className="mt-4 flex gap-2 text-base-content/80">
              <MapPin size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
              {HALL.address}
            </p>

            <dl className="mt-8 space-y-3">
              {HALL.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 border-b border-base-300 pb-3">
                  <dt className="text-base-content/70">{h.days}</dt>
                  <dd className="font-semibold tabular-nums">{h.time}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink"
              >
                Get directions
              </a>
              <a href={`tel:${HALL.phone.replace(/[^\d+]/g, "")}`} className="btn-line gap-2">
                <Phone size={16} aria-hidden="true" />
                {HALL.phone}
              </a>
            </div>
          </div>

          <div className="aspect-[4/3] overflow-hidden rounded-sm border border-base-300 bg-base-200">
            <iframe
              title="Map to Barangay Tejero Hall"
              src={mapEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
