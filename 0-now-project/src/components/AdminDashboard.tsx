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
import { useEffect, useMemo } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import generateColors from "@/utils/generatedColors";

interface MessageDistribution {
  id: string;
  username: string;
  messageCount: number;
}
type PieChartData = {
  id: string;
  username: string;
  messageCount: number;
};

type RechartsPieClickEvent = {
  payload: PieChartData;
  name: string;
  value: number;
};

export const AdminDashboard = () => {
  const {
    setUsername,
    setUsersMap,
    stats,
    fetchMessages,
    refreshChart,
    setRefreshChart,
  } = useAdmin();

  const generatedColors: string[] = useMemo(() => {
    if (!stats?.messageDistribution) return [];
    return generateColors(stats.messageDistribution.length);
  }, [stats?.messageDistribution]);

  useEffect(() => {
    const fetchAndUpdate = async () => {
      await fetchMessages();
      setRefreshChart(false);
    };

    fetchAndUpdate();
  }, [refreshChart, fetchMessages, setRefreshChart]);

  useEffect(() => {
    if (!stats || generatedColors.length === 0) return;
    const userMaps = new Map();
    stats.messageDistribution.forEach(
      (user: MessageDistribution, i: number) => {
        const { id, username } = user;
        userMaps.set(id, { username, color: generatedColors[i] });
      }
    );

    setUsersMap(userMaps);
  }, [stats, generatedColors, setUsersMap]);

  if (!stats) return <Typography>Loading...</Typography>;

  const handleClickChart = (data: RechartsPieClickEvent) => {
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
                {stats.messageDistribution.map(
                  (_: MessageDistribution, index: number) => (
                    <Cell key={`cell-${index}`} fill={generatedColors[index]} />
                  )
                )}
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
