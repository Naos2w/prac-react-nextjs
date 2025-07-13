"use client";
import { LinearProgress, Box } from "@mui/material";
import { useEffect, useState } from "react";

const CountdownBar = ({
  duration = 3000,
  onComplete,
}: {
  duration?: number;
  onComplete?: () => void;
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percentage = Math.max(100 - (elapsed / duration) * 100, 0);
      setProgress(percentage);
      if (elapsed >= duration) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 4,
          borderRadius: 2,
          backgroundColor: "rgba(207, 79, 79, 0.3)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "white",
          },
        }}
      />
    </Box>
  );
};

export default CountdownBar;
