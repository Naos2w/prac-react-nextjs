"use client";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";

export const LoginStatus = () => {
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    redirect("/login"); // 登出後導向登入頁
  };
  const { username } = useUser();

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "unset" },
        display: { xs: "flex", md: "unset" },
        flexDirection: { xs: "column", md: "unset" },
        justifyContent: { xs: "center", md: "unset" },
        alignItems: { xs: "center", md: "unset" },
        position: { xs: "none", md: "fixed" },
        right: { xs: "none", md: 15 },
        top: { xs: "none", md: 0 },
      }}
    >
      <Paper
        sx={{
          p: 4,
          maxWidth: 500,
          width: "90%",
          m: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          height: "10px",
        }}
      >
        <Typography variant="body2">Login User: {username}</Typography>
        <Button onClick={handleLogout} variant="contained">
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginStatus;
