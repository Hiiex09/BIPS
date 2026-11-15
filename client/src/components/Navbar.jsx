import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCheckAuth, useLogout } from "../hooks/UseAuthRouteHooks.js";
import { DOCUMENTS, HALL, HOTLINES } from "../data/hall";

const navLinkClass = ({ isActive }) =>
  `py-1 border-b-2 transition-colors ${
    isActive
      ? "border-primary text-base-content"
      : "border-transparent text-base-content/70 hover:text-base-content"
  }`;

/* ── Services menu (desktop) ─────────────────────────── */
const ServicesMenu = ({ isOpen, onClose, items, trackLink, menuRef }) => {
  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute left-1/2 top-full z-50 mt-3 w-[560px] -translate-x-1/2 rounded-md border border-base-300 bg-base-100 p-2 shadow-[0_18px_40px_-20px_rgba(0,23,31,0.3)]"
    >
      <ul className="grid grid-cols-2 gap-1">
        {items.map((s) => (
          <li key={s.title}>
            <Link
              to={s.link}
              onClick={onClose}
              className="block rounded-sm px-3 py-2.5 hover:bg-tint"
            >
              <span className="block text-sm font-semibold">{s.title}</span>
              <span className="mt-0.5 block text-xs leading-snug text-base-content/60">{s.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex items-center justify-between border-t border-base-300 px-3 pt-3 pb-1 text-sm">
        <Link to="/services" onClick={onClose} className="link-ink font-semibold">
          All services and requirements
        </Link>
        <Link to={trackLink} onClick={onClose} className="link-ink text-base-content/70">
          Track a request
        </Link>
      </div>
    </div>
  );
};

/* ── Mobile menu ─────────────────────────────────────── */
const MobileMenu = ({ user, onLogout, items }) => (
  <div className="dropdown dropdown-end lg:hidden">
    <button tabIndex={0} className="btn btn-ghost btn-sm btn-square" aria-label="Open menu">
      <Menu size={22} />
    </button>

    <div className="dropdown-content z-50 mt-3 w-72 space-y-4 rounded-md border border-base-300 bg-base-100 p-4 shadow-xl">
      <nav aria-label="Mobile" className="flex flex-col">
        {[
          ["/", "Home"],
          ["/services", "Services"],
          ["/announcements", "Notices"],
          ["/about", "About"],
        ].map(([to, label]) => (
          <Link key={to} to={to} className="rounded-sm px-2 py-2 font-semibold hover:bg-base-200">
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-base-300 pt-3">
        <p className="px-2 text-sm text-base-content/60">Request a document</p>
        {items.slice(0, 3).map((s) => (
          <Link key={s.title} to={s.link} className="block rounded-sm px-2 py-1.5 text-sm hover:bg-base-200">
            {s.title}
          </Link>
        ))}
      </div>

      <div className="border-t border-base-300 pt-3">
        {user ? (
          <div className="space-y-2">
            <Link to="/Resident" className="btn-stamp btn-sm w-full">
              My account
            </Link>
            <button type="button" onClick={onLogout} className="btn-line btn-sm w-full">
              Log out
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-stamp btn-sm w-full">
            Log in
          </Link>
        )}
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const { user } = useCheckAuth();
  const { mutate: logoutUser } = useLogout();
  const { pathname } = useLocation();

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsServicesOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setIsServicesOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleLogout = () => logoutUser();

  const requestLink = user ? "/Resident/documents" : "/login";
  const serviceItems = [
    ...DOCUMENTS.filter((d) => d.online).map((d) => ({ title: d.title, desc: d.use, link: requestLink })),
    {
      title: "Business Clearance",
      desc: "Needed before the city issues or renews a business permit.",
      link: "/services",
    },
    {
      title: "Report a concern",
      desc: "Streetlights, garbage, flooding, peace and order.",
      link: user ? "/Resident/concerns" : "/login",
    },
    {
      title: "Emergency contacts",
      desc: "Hotlines for police, fire, ambulance and disaster response.",
      link: user ? "/Resident/emergency" : "/login",
    },
  ];

  return (
    <header className="w-full">
      {/* Utility bar: hours and hotlines */}
      <div className="bg-accent text-accent-content">
        <div className="page-wrap flex items-center justify-between gap-4 py-1.5 text-xs">
          <span>
            Hall hours: {HALL.hours[0].short} {HALL.hours[0].time}
            <span className="hidden sm:inline">, {HALL.hours[1].short} {HALL.hours[1].time}</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="hidden sm:inline text-accent-content/70">Emergency</span>
            {HOTLINES.map((h) => (
              <a key={h.number} href={`tel:${h.number}`} className="font-bold text-white underline-offset-2 hover:underline" aria-label={`${h.name}: ${h.number}`}>
                {h.number}
              </a>
            ))}
          </span>
        </div>
      </div>

      <nav aria-label="Main" className="border-b border-base-300 bg-base-100">
        <div className="page-wrap flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 -rotate-6 items-center justify-center rounded-md border-2 border-primary text-lg font-black text-primary [font-stretch:125%]"
            >
              T
            </span>
            <span className="leading-tight">
              <span className="block text-base font-extrabold [font-stretch:118%]">{HALL.name}</span>
              <span className="block text-xs text-base-content/60">Resident portal</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 text-sm font-semibold lg:flex">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className={`flex items-center gap-1 border-b-2 py-1 transition-colors ${
                  isServicesOpen || pathname.startsWith("/services")
                    ? "border-primary text-base-content"
                    : "border-transparent text-base-content/70 hover:text-base-content"
                }`}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown size={14} className={`transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
              <ServicesMenu
                isOpen={isServicesOpen}
                onClose={() => setIsServicesOpen(false)}
                items={serviceItems}
                trackLink={requestLink}
                menuRef={menuRef}
              />
            </div>

            <NavLink to="/announcements" className={navLinkClass}>
              Notices
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <>
                <Link to="/Resident" className="btn-stamp btn-sm">
                  My account
                </Link>
                <button type="button" onClick={handleLogout} className="btn btn-ghost btn-sm rounded-md">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn btn-ghost btn-sm rounded-md">
                  Register
                </Link>
                <Link to="/login" className="btn-stamp btn-sm">
                  Log in
                </Link>
              </>
            )}
          </div>

          <MobileMenu user={user} onLogout={handleLogout} items={serviceItems} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
