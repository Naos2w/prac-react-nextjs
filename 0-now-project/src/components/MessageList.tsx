"use client";
import { useEffect } from "react";
import { useMessages } from "@/hooks/useMessages";
import { Box, Card, Typography } from "@mui/material";

export const MessageList = () => {
  const { messages, fetchMessages } = useMessages();

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {messages.map((msg, idx) => (
        <Card sx={{ width: "300px", p: 2, border: "1px solid" }} key={idx}>
          <Typography variant="h5">{msg.content}</Typography>
          <Typography variant="caption">{msg.createdAt}</Typography>
        </Card>
      ))}
    </Box>
  );
};
