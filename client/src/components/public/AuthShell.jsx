import { NavLink } from "react-router-dom";
import { HALL } from "../../data/hall";

const tabClass = ({ isActive }) =>
  `flex-1 rounded-md py-2 text-center text-sm font-semibold transition-colors ${
    isActive ? "bg-base-100 text-base-content shadow-sm" : "text-base-content/60 hover:text-base-content"
  }`;

/** Shared frame for Login and Signup: a short ink panel and the form on paper. */
const AuthShell = ({ title, intro, children, footnote }) => (
  <main className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
    <aside className="hidden lg:flex flex-col justify-between bg-accent text-accent-content p-12 xl:p-16">
      <div>
        <p className="type-title max-w-sm">One account for every request at the hall.</p>
        <ul className="mt-10 space-y-5 text-accent-content/80 max-w-sm">
          <li>File clearances and certificates from your phone.</li>
          <li>See when your document is approved and ready for pickup.</li>
          <li>Report concerns on your street and follow what happens next.</li>
        </ul>
      </div>
      <p className="text-sm text-accent-content/60">
        Need help signing in? Email{" "}
        <a href={`mailto:${HALL.email}`} className="underline underline-offset-4 hover:text-accent-content">
          {HALL.email}
        </a>
      </p>
    </aside>

    <div className="flex items-start justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-md">
        <nav aria-label="Account" className="flex gap-1 rounded-lg bg-base-200 p-1">
          <NavLink to="/login" className={tabClass}>
            Log in
          </NavLink>
          <NavLink to="/signup" className={tabClass}>
            Register
          </NavLink>
        </nav>

        <h1 className="type-title mt-10">{title}</h1>
        <p className="mt-3 text-base-content/70">{intro}</p>

        <div className="mt-8">{children}</div>

        <p className="mt-10 border-t border-base-300 pt-6 text-xs leading-relaxed text-base-content/60">
          {footnote} We handle your data according to the Data Privacy Act of 2012.
        </p>
      </div>
    </div>
  </main>
);

export default AuthShell;
