import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Announcements from "./pages/Announcements.jsx";
import About from "./pages/About.jsx";
import ResidentDashboard from "./pages/ResidentUI/ResidentDashboard.jsx";
import PublicLayout from "./Layout/PublicLayout.jsx";
import AdminLayout from "./Layout/AdminLayout.jsx";
import { checkAuthUsers } from "./hooks/UseAuthRouteHooks.js";
import AdminHomepage from "./pages/AdminUI/AdminHomepage.jsx";
import AdminLandingPage from "./pages/AdminUI/AdminLandingPage.jsx";
import UserManagement from "./pages/AdminUI/pages/UserManagement.jsx";
import DocumentsManagement from "./pages/AdminUI/pages/DocumentsManagement.jsx";
import IncidentReports from "./pages/AdminUI/pages/IncidentReports.jsx";
import AnnouncementsManagement from "./pages/AdminUI/pages/AnnouncementsManagement.jsx";
import DemoPage from "./pages/AdminUI/DemoPage.jsx";

const App = () => {
  const { user, isLoading, error } = checkAuthUsers();

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <>
      {/* <AdminLandingPage /> */}

      <BrowserRouter>
        <Routes>
          {/* RESIDENT NAVBAR USER HERE */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={
                !user ? (
                  <Login />
                ) : user.role === "Resident" ? (
                  <Navigate to="/Resident" />
                ) : (
                  <Navigate to="/welcome" />
                )
              }
            />

            <Route path="/signup" element={<Signup />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route
              path="/Resident"
              element={
                user ? <ResidentDashboard /> : <Navigate to={"/login"} />
              }
            />
          </Route>

          <Route
            path="/welcome"
            element={
              user && (user.role === "Admin" || user.role === "Staff") ? (
                <AdminLandingPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/user-management"
            element={
              user && (user.role === "Admin" || user.role === "Staff") ? (
                <UserManagement />
              ) : (
                <Navigate to="/welcome" />
              )
            }
          />

          <Route
            path="/document-management"
            element={
              user && (user.role === "Admin" || user.role === "Staff") ? (
                <DocumentsManagement />
              ) : (
                <Navigate to="/welcome" />
              )
            }
          />

          <Route
            path="/incident-reports"
            element={
              user && (user.role === "Admin" || user.role === "Staff") ? (
                <IncidentReports />
              ) : (
                <Navigate to="/welcome" />
              )
            }
          />

          <Route
            path="/announcements"
            element={
              user && (user.role === "Admin" || user.role === "Staff") ? (
                <AnnouncementsManagement />
              ) : (
                <Navigate to="/welcome" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
