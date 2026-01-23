import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Services } from "./pages/Services";
import Announcements from "./pages/Announcements";
import About from "./pages/About";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
