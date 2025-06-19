"use client";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMessages } from "@/hooks/useMessages";

export const MessageForm = () => {
  const [message, setMessage] = useState("");
  const { fetchMessages } = useMessages();
  const handleClickSendMessage = async () => {
    if (!message.trim()) return;
    await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message }),
    });
    setMessage("");
    fetchMessages();
  };
  return (
    <Box
      sx={{
        my: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" mb={2}>
        Message Board
      </Typography>

      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        label="Message"
        helperText="Leave a message"
        multiline
        rows={2}
        sx={{ width: "50ch" }}
      ></TextField>
      <Button variant="outlined" onClick={handleClickSendMessage}>
        Send
      </Button>
    </Box>
  );
};
