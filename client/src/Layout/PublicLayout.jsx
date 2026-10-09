import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AlertBar from "../components/AlertBar";
import PageLoader from "../components/common/PageLoader";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <AlertBar />
      <Suspense fallback={<PageLoader message="Loading page..." />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default PublicLayout;
