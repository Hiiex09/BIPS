import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "./api/auth_api.js";
import ResidentDashboard from "./pages/ResidentUI/ResidentDashboard.jsx";
import Login from "./pages/Login.jsx";

const App = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
  });

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={!user ? <Home /> : <Navigate to="/resident" />}
          />
          <Route
            path="/resident"
            element={user ? <ResidentDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to={"/"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
