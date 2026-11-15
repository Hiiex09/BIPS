import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AlertBar from "../components/AlertBar";
import Footer from "../components/Footer";
import PageLoader from "../components/common/PageLoader";

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-content"
      >
        Skip to content
      </a>
      <Navbar />
      <AlertBar />
      <div id="content" className="flex-1">
        <Suspense fallback={<PageLoader message="Loading page..." />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
