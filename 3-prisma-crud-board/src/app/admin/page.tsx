"use client";
import AdminDashboard from "@/components/AdminDashboard";
import UserMessageManager from "@/components/UserMessageManager";
import { AdminProvider } from "@/context/AdminContext";
import { MessageProvider } from "@/context/MessageContext";
import { Box } from "@mui/material";

export default function AdminDashboardPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}>
      <MessageProvider>
        <AdminProvider>
          <AdminDashboard />
          <UserMessageManager />
        </AdminProvider>
      </MessageProvider>
    </Box>
  );
}
