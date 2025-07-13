"use client";
import React, { useEffect, useState } from "react";
import { Box, Fade, Alert, useTheme } from "@mui/material";
import { createPortal } from "react-dom";

//Portal 是 React 提供的「跳脫 component tree 渲染」的方法。
// 適用於彈窗、通知等「需要浮在最上層」的元件。
// Portal + 高 z-index 可以避免被其他元素（像 fieldset、legend）遮住。
// 在 MUI 中，大多數浮層元件（如 <Modal>, <Snackbar>）都是靠 Portal 實現的。
type PopupMessageProps = {
  open: boolean;
  message: string;
  type: "success" | "info" | "error" | "warning";
  duration?: number; // 毫秒，預設 3000
  messageKey?: number;
  onClose: () => void;
};

export const PopupMessage = ({
  open,
  message,
  type = "info",
  duration = 3000,
  messageKey,
  onClose,
}: PopupMessageProps) => {
  const [progress, setProgress] = useState<number>(100);
  const [visible, setVisible] = useState<boolean>(open);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const progrssColor =
    type === "error"
      ? isDarkMode
        ? "rgb(129,30,29)"
        : "rgb(218, 92, 92)"
      : type === "success"
      ? isDarkMode
        ? "rgb(42,115,46)"
        : "rgb(60, 155, 65)"
      : "primary.main";

  // useEffect(() => {
  //   setVisible(open);
  //   console.log(`open: ${open}`);
  // }, [open]);

  useEffect(() => {
    if (!open) return;

    setVisible(true);
    setProgress(100);

    console.log(`open = true`);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.max(100 - (elapsed / duration) * 100, 0);
      setProgress(percent);

      if (elapsed >= duration) {
        clearInterval(interval);
        setVisible(false);
        onClose();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [messageKey, open]);

  if (!visible) return null;

  return createPortal(
    <Fade in={visible} timeout={300}>
      <Box
        id="pop-up-msg"
        sx={{
          position: "fixed",
          top: 16,
          left: "2%",
          transform: "translateX(2%)",
          minWidth: 280,
          maxWidth: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          userSelect: "none",
          zIndex: 2000,
        }}
      >
        <Alert variant={isDarkMode ? undefined : "filled"} severity={type}>
          {message}
        </Alert>
        <Box
          sx={{
            height: 6,
            width: "100%",
            backgroundColor: "grey.300",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: progrssColor,
              transition: "width 0.05s linear",
            }}
          />
        </Box>
      </Box>
    </Fade>,
    document.body
  );
};

export default PopupMessage;
