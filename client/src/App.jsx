import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLandingPage from "./pages/AdminUI/AdminLandingPage";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

const App = () => {
  return (
    <>
      {/* <AdminLandingPage /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
