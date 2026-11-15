import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="page-wrap flex min-h-[70vh] flex-col justify-center py-16">
    <p className="type-condensed text-6xl font-extrabold text-primary">404</p>
    <h1 className="type-title mt-4">This page isn't on file</h1>
    <p className="mt-3 max-w-md text-base-content/70">
      The link may be old or mistyped. Start from the home page, or go straight
      to the services list.
    </p>
    <div className="mt-8 flex flex-wrap gap-3">
      <Link to="/" className="btn-stamp">Go to home page</Link>
      <Link to="/services" className="btn-line">See services</Link>
    </div>
  </main>
);

export default NotFound;
