import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import LandingPage from "./components/LandingPage.jsx";
import ResidentDashboard from "./pages/ResidentUI/ResidentDashboard.jsx";
import PublicLayout from "./Layout/PublicLayout.jsx";
import AdminLayout from "./Layout/AdminLayout.jsx";
import { checkAuth } from "./hooks/checkAuth.js";

const App = () => {
  const { user, isLoading, error } = checkAuth();

  return (
    <>
      {/* <AdminLandingPage /> */}

      <BrowserRouter>
        <Routes>
          {/* RESIDENT NAVBAR USER HERE */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/resident"
              element={
                user ? <ResidentDashboard /> : <Navigate to={"/login"} />
              }
            />
          </Route>

          <Route
            path="/welcome"
            element={user ? <AdminLayout /> : <Navigate to={"/"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
