import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, Phone, Clock, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCheckAuth, useLogout } from "../hooks/UseAuthRouteHooks.js";

const Navbar = () => {
  const { user } = useCheckAuth();
  const { mutate: logoutUser } = useLogout();
  const navigate = useNavigate();

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const megaMenuRef = useRef(null);

  // Close mega-menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser();
  };

  const serviceItems = [
    {
      num: "01",
      title: "Barangay Clearance",
      desc: "For employment, identification, and postal transactions",
      link: user ? "/Resident/documents" : "/login",
    },
    {
      num: "02",
      title: "Certificate of Indigency",
      desc: "Medical, legal, and scholarship assistance requirements",
      link: user ? "/Resident/documents" : "/login",
    },
    {
      num: "03",
      title: "Certificate of Residency",
      desc: "Proof of address and long-term residency validation",
      link: user ? "/Resident/documents" : "/login",
    },
    {
      num: "04",
      title: "Business Clearance",
      desc: "Local commerce permits and operational clearances",
      link: user ? "/Resident/documents" : "/login",
    },
    {
      num: "05",
      title: "Report a Concern",
      desc: "File complaints, peace & order reports, or sanitation issues",
      link: user ? "/Resident/concerns" : "/login",
    },
    {
      num: "06",
      title: "Emergency Services",
      desc: "Disaster hotline directory, hospital & police contacts",
      link: user ? "/Resident/emergency" : "/login",
    },
  ];

  return (
    <header className="w-full select-none">
      {/* ── 01. Top Utility Bar (Civic Trust & Hours) ── */}
      <div className="bg-accent text-accent-content text-xs border-b border-white/10 px-4 sm:px-8 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[11px] font-medium tracking-wide">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Hall Open <span className="opacity-75 hidden sm:inline">• 8:00 AM – 5:00 PM (Mon–Fri)</span>
          </span>
          <span className="hidden md:inline-block opacity-40">|</span>
          <span className="hidden md:flex items-center gap-1.5 opacity-90">
            <Phone size={12} className="text-secondary" />
            Hotlines: <span className="font-bold">117</span> (Police) • <span className="font-bold">160</span> (Fire) • <span className="font-bold">911</span> (Ambulance)
          </span>
        </div>
      </div>

      {/* ── 02. Main Swiss Navbar ── */}
      <nav className="bg-base-100 border-b border-base-300 w-full px-4 sm:px-8 py-2 relative">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xs bg-primary text-primary-content flex items-center justify-center font-black text-base shadow-2xs group-hover:brightness-110 transition-all">
              T
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black text-sm tracking-tight text-base-content group-hover:text-primary transition-colors">
                Barangay Tejero
              </span>
              <span className="text-[10px] font-medium tracking-wider uppercase text-base-content/60">
                Public Portal
              </span>
            </div>
          </Link>

          {/* Desktop Links + Mega Menu trigger */}
          <div className="hidden lg:flex items-center gap-7 font-semibold text-xs tracking-wide">
            <Link
              to="/"
              className="text-base-content/80 hover:text-primary transition-colors py-1"
            >
              Home
            </Link>

            {/* Mega Menu Button Container */}
            <div className="relative" ref={megaMenuRef}>
              <button
                type="button"
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 py-1 transition-colors ${
                  isServicesOpen
                    ? "text-primary font-bold"
                    : "text-base-content/80 hover:text-primary"
                }`}
                aria-expanded={isServicesOpen}
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    isServicesOpen ? "rotate-180 text-primary" : "opacity-60"
                  }`}
                />
              </button>

              {/* Mega Menu Dropdown */}
              {isServicesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[620px] bg-base-100 border border-base-300 rounded-xs shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-base-300">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                      Official Barangay Public Services
                    </span>
                    <Link
                      to="/services"
                      onClick={() => setIsServicesOpen(false)}
                      className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      View All Catalog &rarr;
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {serviceItems.map((s) => (
                      <Link
                        key={s.num}
                        to={s.link}
                        onClick={() => setIsServicesOpen(false)}
                        className="group p-2.5 rounded-xs border border-transparent hover:border-base-300 hover:bg-base-200/50 transition-all flex items-start gap-3 text-left"
                      >
                        <span className="font-mono text-xs font-black text-primary/80 group-hover:text-primary mt-0.5">
                          {s.num}
                        </span>
                        <div>
                          <p className="font-bold text-xs text-base-content group-hover:text-primary transition-colors">
                            {s.title}
                          </p>
                          <p className="text-[10px] text-base-content/60 leading-snug mt-0.5">
                            {s.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-base-300 bg-base-200/40 -mx-4 -mb-4 p-3 px-4 flex items-center justify-between text-[11px] text-base-content/70">
                    <span>Need to follow up an existing application?</span>
                    <Link
                      to={user ? "/Resident/documents" : "/login"}
                      onClick={() => setIsServicesOpen(false)}
                      className="font-bold text-primary hover:underline"
                    >
                      Track Request &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/announcements"
              className="text-base-content/80 hover:text-primary transition-colors py-1"
            >
              Announcements
            </Link>
            <Link
              to="/about"
              className="text-base-content/80 hover:text-primary transition-colors py-1"
            >
              About
            </Link>
          </div>

          {/* Desktop Right: Auth Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/Resident"
                  className="btn btn-sm btn-ghost border border-base-300 rounded-xs text-xs font-bold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-error btn-outline rounded-xs text-xs font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="btn btn-sm btn-primary rounded-xs text-xs font-bold px-4 shadow-2xs"
                >
                  Resident Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Dropdown */}
          <div className="lg:hidden dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-sm p-1"
              aria-label="Toggle navigation menu"
            >
              <Menu size={22} />
            </button>

            <div
              tabIndex={0}
              className="dropdown-content mt-3 p-4 shadow-xl bg-base-100 rounded-xs border border-base-300 w-72 space-y-3 z-50 text-xs font-medium"
            >
              <div className="flex flex-col gap-1 border-b border-base-300 pb-2">
                <Link to="/" className="py-1.5 px-2 hover:bg-base-200 rounded-xs">
                  Home
                </Link>
                <Link to="/services" className="py-1.5 px-2 hover:bg-base-200 rounded-xs">
                  All Services
                </Link>
                <Link to="/announcements" className="py-1.5 px-2 hover:bg-base-200 rounded-xs">
                  Announcements
                </Link>
                <Link to="/about" className="py-1.5 px-2 hover:bg-base-200 rounded-xs">
                  About Barangay
                </Link>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-base-content/50 px-2">
                  Quick Document Requests
                </span>
                <Link
                  to={user ? "/Resident/documents" : "/login"}
                  className="block py-1 px-2 hover:text-primary"
                >
                  • Barangay Clearance
                </Link>
                <Link
                  to={user ? "/Resident/documents" : "/login"}
                  className="block py-1 px-2 hover:text-primary"
                >
                  • Certificate of Indigency
                </Link>
                <Link
                  to={user ? "/Resident/documents" : "/login"}
                  className="block py-1 px-2 hover:text-primary"
                >
                  • Certificate of Residency
                </Link>
              </div>

              <div className="pt-2 border-t border-base-300">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/Resident"
                      className="btn btn-sm btn-primary w-full rounded-xs"
                    >
                      Resident Portal
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn btn-sm btn-outline btn-error w-full rounded-xs"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-sm btn-primary w-full rounded-xs font-bold"
                  >
                    Resident Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
