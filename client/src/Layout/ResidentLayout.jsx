import { Outlet, useLocation } from "react-router-dom";
import ResidentSidebar from "../pages/ResidentUI/components/ResidentSidebar";
import ResidentNavbar from "../pages/ResidentUI/components/ResidentNavbar";

const pageTitles = {
  "/Resident": "Resident Information Dashboard",
  "/Resident/documents": "Document Request Portal",
  "/Resident/concerns": "Resident Concern Submission",
  "/Resident/news": "Community News",
  "/Resident/health": "Health Center",
  "/Resident/ordinances": "Local Ordinances",
  "/Resident/emergency": "Emergency Services",
};

const DRAWER_ID = "resident-drawer";

const ResidentLayout = () => {
  const { pathname } = useLocation();
  const pageTitle = pageTitles[pathname] || "Resident Portal";

  return (
    <div className="drawer lg:drawer-open">
      <input id={DRAWER_ID} type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col h-screen overflow-hidden">
        <ResidentNavbar pageTitle={pageTitle} drawerId={DRAWER_ID} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-base-200">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <ResidentSidebar drawerId={DRAWER_ID} />
    </div>
  );
};

export default ResidentLayout;
