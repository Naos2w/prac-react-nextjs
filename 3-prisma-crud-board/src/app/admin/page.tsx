import AdminDashboard from "@/components/AdminDashboard";
import UserMessageManager from "@/components/UserMessageManager";
import { AdminContext, AdminProvider } from "@/context/AdminContext";
import { Box } from "@mui/material";

export const AdminDashboardPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}>
      <AdminProvider>
        <AdminDashboard />
        <UserMessageManager />
      </AdminProvider>
    </Box>
  );
};

export default AdminDashboardPage;
