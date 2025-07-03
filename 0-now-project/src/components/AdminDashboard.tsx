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
import { useAdmin } from "@/hooks/useAdmin";

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
  const {
    setUsername,
    setUsersMap,
    stats,
    fetchMessages,
    refreshChart,
    setRefreshChart,
  } = useAdmin();

  useEffect(() => {
    const fetchAndUpdate = async () => {
      const data = await fetchMessages();
      setRefreshChart(false);
      if (!data) return;

      const userMaps = new Map<string, { username: string; color: string }>();

      let index = 0;
      for (const { id, username } of data?.messageDistribution) {
        const color = COLORS[index % COLORS.length];
        if (!userMaps.has(id)) {
          userMaps.set(id, { username, color });
        }
        index++;
      }

      setUsersMap(userMaps);
    };

    fetchAndUpdate();
  }, [refreshChart]);

  if (!stats) return <Typography>Loading...</Typography>;

  const handleClickChart = (data: any) => {
    setUsername(data.name);
  };

  return (
    <Box
      sx={{
        width: { md: "50%", xs: "none" },
        height: { md: "100vh", xs: "50vh" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card
        sx={{
          p: 2,
          m: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">Message Distribution</Typography>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            minHeight: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats.messageDistribution}
                dataKey="messageCount"
                nameKey="username"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                onClick={handleClickChart}
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ flex: 1, textAlign: "center" }}
            variant="body2"
            mt={1}
          >
            Total Users : {stats.totalUsers}
          </Typography>
          <Typography
            sx={{ flex: 1, textAlign: "center" }}
            variant="body2"
            mt={1}
          >
            Total Messages : {stats.totalMessages}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
