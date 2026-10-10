import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "./Layout/PublicLayout.jsx";
import ResidentLayout from "./Layout/ResidentLayout.jsx";
import { useCheckAuth } from "./hooks/UseAuthRouteHooks.js";
import PageLoader from "./components/common/PageLoader.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

// Route-based Code Splitting: Public Pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const Announcements = lazy(() => import("./pages/Announcements.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const DemoPage = lazy(() => import("./pages/AdminUI/DemoPage.jsx"));

// Route-based Code Splitting: Admin Pages
const AdminLandingPage = lazy(() => import("./pages/AdminUI/AdminLandingPage.jsx"));
const UserManagement = lazy(() => import("./pages/AdminUI/pages/UserManagement.jsx"));
const DocumentsManagement = lazy(() => import("./pages/AdminUI/pages/DocumentsManagement.jsx"));
const IncidentReports = lazy(() => import("./pages/AdminUI/pages/IncidentReports.jsx"));
const AnnouncementsManagement = lazy(() => import("./pages/AdminUI/pages/AnnouncementsManagement.jsx"));

// Route-based Code Splitting: Resident Portal Pages
const ResidentDashboard = lazy(() => import("./pages/ResidentUI/ResidentDashboard.jsx"));
const ResidentDocuments = lazy(() => import("./pages/ResidentUI/ResidentDocuments.jsx"));
const ResidentConcerns = lazy(() => import("./pages/ResidentUI/ResidentConcerns.jsx"));
const ResidentNews = lazy(() => import("./pages/ResidentUI/ResidentNews.jsx"));
const ResidentHealth = lazy(() => import("./pages/ResidentUI/ResidentHealth.jsx"));
const ResidentOrdinances = lazy(() => import("./pages/ResidentUI/ResidentOrdinances.jsx"));
const ResidentEmergency = lazy(() => import("./pages/ResidentUI/ResidentEmergency.jsx"));

// Route-based Code Splitting: Fallback Page
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

// Route Guard Helpers
const AdminRoute = ({ user, children }) => {
  if (!user || (user.role !== "Admin" && user.role !== "Staff")) {
    return <Navigate to={user ? "/welcome" : "/"} replace />;
  }
  return children;
};

const LoginRoute = ({ user }) => {
  if (!user) return <Login />;
  return <Navigate to={user.role === "Resident" ? "/Resident" : "/welcome"} replace />;
};

const App = () => {
  const { user, isLoading } = useCheckAuth();

  if (isLoading) {
    return <PageLoader fullScreen message="Initializing Barangay Portal..." />;
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageLoader fullScreen message="Loading page..." />}>
          <Routes>
            {/* Public Routes with PublicLayout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LoginRoute user={user} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/demo" element={<DemoPage />} />
            </Route>

            {/* Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute user={user}>
                  <AdminLandingPage />
                </AdminRoute>
              }
            />

            <Route
              path="/user-management"
              element={
                <AdminRoute user={user}>
                  <UserManagement />
                </AdminRoute>
              }
            />

            <Route
              path="/document-management"
              element={
                <AdminRoute user={user}>
                  <DocumentsManagement />
                </AdminRoute>
              }
            />

            <Route
              path="/incident-reports"
              element={
                <AdminRoute user={user}>
                  <IncidentReports />
                </AdminRoute>
              }
            />

            <Route
              path="/announcement-management"
              element={
                <AdminRoute user={user}>
                  <AnnouncementsManagement />
                </AdminRoute>
              }
            />

            {/* Resident Protected Routes with ResidentLayout */}
            <Route
              path="/Resident"
              element={user ? <ResidentLayout /> : <Navigate to="/login" replace />}
            >
              <Route index element={<ResidentDashboard />} />
              <Route path="documents" element={<ResidentDocuments />} />
              <Route path="concerns" element={<ResidentConcerns />} />
              <Route path="news" element={<ResidentNews />} />
              <Route path="health" element={<ResidentHealth />} />
              <Route path="ordinances" element={<ResidentOrdinances />} />
              <Route path="emergency" element={<ResidentEmergency />} />
            </Route>

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
