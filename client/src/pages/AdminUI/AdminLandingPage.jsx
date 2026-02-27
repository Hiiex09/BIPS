import PageLayout from "../../components/admin/PageLayout";
import AdminHomepage from "./AdminHomepage";

const AdminLandingPage = () => {
  return (
    <PageLayout title="Official Admin Dashboard" showSearch={false}>
      <AdminHomepage />
    </PageLayout>
  );
};

export default AdminLandingPage;
