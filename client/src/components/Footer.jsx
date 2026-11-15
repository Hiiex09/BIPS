import { Link } from "react-router-dom";
import { HALL } from "../data/hall";

const EXTERNAL_LINKS = [
  { href: "https://cebucity.gov.ph", label: "Cebu City Government" },
  { href: "https://dilg.gov.ph", label: "DILG" },
  { href: "https://comelec.gov.ph", label: "COMELEC voter registration" },
  { href: "https://www.philhealth.gov.ph", label: "PhilHealth" },
  { href: "https://www.sss.gov.ph", label: "SSS" },
  { href: "https://philjobnet.gov.ph", label: "PhilJobNet" },
];

const Footer = () => (
  <footer className="border-t border-base-300 bg-base-200">
    <div className="page-wrap grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
      <div>
        <p className="text-lg font-extrabold [font-stretch:118%]">{HALL.name}</p>
        <p className="mt-2 max-w-xs text-sm text-base-content/70">
          The resident portal of Barangay Tejero, Cebu City. Request documents,
          report concerns and read notices from the hall.
        </p>
      </div>

      <nav aria-label="Portal">
        <h2 className="text-sm font-semibold text-base-content/60">Portal</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li><Link to="/services" className="link-ink">Services</Link></li>
          <li><Link to="/announcements" className="link-ink">Notices</Link></li>
          <li><Link to="/about" className="link-ink">About the barangay</Link></li>
          <li><Link to="/login" className="link-ink">Log in</Link></li>
        </ul>
      </nav>

      <nav aria-label="Government links">
        <h2 className="text-sm font-semibold text-base-content/60">Government</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {EXTERNAL_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <h2 className="text-sm font-semibold text-base-content/60">Contact the hall</h2>
        <address className="mt-3 space-y-2 text-sm not-italic">
          <p>{HALL.address}</p>
          <p>
            <a href={`tel:${HALL.phone.replace(/[^\d+]/g, "")}`} className="link-ink">{HALL.phone}</a>
          </p>
          <p>
            <a href={`mailto:${HALL.email}`} className="link-ink break-all">{HALL.email}</a>
          </p>
        </address>
      </div>
    </div>

    <div className="border-t border-base-300">
      <p className="page-wrap py-4 text-xs text-base-content/55">
        © {new Date().getFullYear()} Barangay Tejero, Cebu City
      </p>
    </div>
  </footer>
);

export default Footer;
