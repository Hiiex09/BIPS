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

const ResidentLayout = () => {
  const { pathname } = useLocation();
  const pageTitle = pageTitles[pathname] || "Resident Portal";

  return (
    <div className="flex h-screen bg-base-200 overflow-hidden">
      {/* Fixed Sidebar */}
      <ResidentSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <ResidentNavbar pageTitle={pageTitle} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ResidentLayout;
