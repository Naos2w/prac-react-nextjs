"use client";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import Lottie from "lottie-react";
import loadingAnimation from "@/utils/loading.json";

const slideUp = keyframes`
  0%   { opacity: 1; transform: translateY(0); }
  80%  { opacity: 1; transform: translateY(-20px); }
  100% { opacity: 0; transform: translateY(-40px); }
`;

export default function SplashScreen() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: `${slideUp} 3s ease-in-out forwards`,
        zIndex: 1300,
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Message System
      </Typography>
      <Typography variant="body2" fontWeight="bold" mb={2}>
        create by Naos
      </Typography>
      <Box sx={{ width: 150, height: 150 }}>
        <Lottie animationData={loadingAnimation} loop={true} />
      </Box>
    </Box>
  );
}
