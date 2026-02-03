import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLandingPage from "./pages/AdminUI/AdminLandingPage";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import LandingPage from "./components/LandingPage.jsx";
import ResidentDashboard from "./pages/ResidentUI/ResidentDashboard.jsx";
import PublicLayout from "./Layout/PublicLayout.jsx";
import AdminLayout from "./Layout/AdminLayout.jsx";
import AdminHomepage from "./pages/AdminUI/AdminHomepage.jsx";
const App = () => {
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
            <Route path="/resident" element={<ResidentDashboard />} />
          </Route>

          <Route path="/welcome" element={<AdminLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
