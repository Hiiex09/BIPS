import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import LandingPage from "./components/LandingPage.jsx";
import ResidentDashboard from "./pages/ResidentUI/ResidentDashboard.jsx";
import PublicLayout from "./Layout/PublicLayout.jsx";
import AdminLayout from "./Layout/AdminLayout.jsx";
import { checkAuthUsers } from "./hooks/UseAuthRouteHooks.js";
import AdminHomepage from "./pages/AdminUI/AdminHomepage.jsx";
import AdminLandingPage from "./pages/AdminUI/AdminLandingPage.jsx";
import UserManagement from "./pages/AdminUI/pages/UserManagement.jsx";

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
            <Route path="/" element={<LandingPage />} />
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
