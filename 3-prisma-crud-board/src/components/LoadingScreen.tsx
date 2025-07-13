"use client";

import { Box, Paper, useTheme } from "@mui/material";
import Lottie from "lottie-react";
import loadingAnimation from "@/utils/loading.json";

export const LoadingScreen = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const backgroundColor = isDarkMode
    ? "rgba(0, 0, 0, 0.3)"
    : "rgba(255, 255, 255, 0.15) !important";
  const borderColor = isDarkMode
    ? "rgba(255, 255, 255, 0.2)"
    : "rgba(0, 0, 0, 0.1)";
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: 100, sm: 150, md: 200 },
        height: { xs: 100, sm: 150, md: 200 },
        zIndex: 999,
        bgcolor:
          theme.palette.mode === "dark"
            ? "rgba(0,0,0,0.6)"
            : "rgba(255,255,255,0.6)",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 1,
          bgcolor: backgroundColor,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)", // Safari 相容
          border: `1px solid ${borderColor}`,
          borderRadius: 2,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Lottie animationData={loadingAnimation} loop={true} />
      </Paper>
    </Box>
  );
};
export default LoadingScreen;
