import Sidebar from "../../pages/AdminUI/components/Sidebar";
import AdminNavbar from "./AdminNavbar";

const PageLayout = ({ children, title, showSearch = true }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        aria-label="Toggle admin navigation drawer"
      />
      <div className="drawer-content flex flex-col">
        <AdminNavbar title={title} showSearch={showSearch} />
        <main className="flex-1 p-6 bg-base-200/30">
          {children}
        </main>
      </div>
      <Sidebar />
    </div>
  );
};

export default PageLayout;
