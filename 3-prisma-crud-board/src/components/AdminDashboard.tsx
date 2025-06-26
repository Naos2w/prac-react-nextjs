"use client";
import { Box, Card, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28EF2",
  "#F28EA6",
  "#82CA9D",
];

export const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats").then(async (res) => {
      if (!res.ok) {
        setError("Failed to load admin stats");
        redirect("/login");
        return;
      }
      const data = await res.json();
      setStats(data);
    });
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!stats) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4, display: "grid", gap: 2 }}>
      <Card sx={{ p: 2 }}>
        <Typography variant="h6">Message Distribution</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={stats.messageDistribution}
              dataKey="messageCount"
              nameKey="username"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {stats.messageDistribution.map((_: any, index: any) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <Typography variant="body2" mt={2}>
          Total Users : {stats.totalUsers}
        </Typography>
        <Typography variant="body2" mt={2}>
          Total Messages : {stats.totalMessages}
        </Typography>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
