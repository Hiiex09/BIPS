import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AlertBar from "../components/AlertBar";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <AlertBar />
      <Outlet />
    </>
  );
};

export default PublicLayout;
