import { Outlet } from "react-router-dom";
import AdminLandingPage from "../pages/AdminUI/AdminLandingPage";

const AdminLayout = () => {
  return (
    <>
      <AdminLandingPage />
      <Outlet />
    </>
  );
};

export default AdminLayout;
