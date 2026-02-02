import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLandingPage from "./pages/AdminUI/AdminLandingPage";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

import AlertBar from "./components/AlertBar.jsx";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./components/LandingPage.jsx";
const App = () => {
  return (
    <>
      {/* <AdminLandingPage /> */}

      <BrowserRouter>
        <Navbar />
        <AlertBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminLandingPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
