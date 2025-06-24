"use client";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useMessages } from "@/hooks/useMessages";

export const MessageForm = () => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [textError, setTextError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds
  const { fetchMessages } = useMessages();
  const handleMessageSend = async () => {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        if (error === "message is required") {
          setTextError(true);
        }
        setError(error || "Message Send failed");
        return;
      }
      fetchMessages();
    } catch (err) {
      setError(`Message Send Error: ${err}`);
    } finally {
      setIsLoading(false);
      clearTimeout(timeoutId);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 500, width: "90%", m: 2 }}>
        <Typography variant="h5">Message</Typography>
        <TextField
          fullWidth
          type="text"
          label="Message"
          value={message}
          onChange={(e) => {
            setTextError(false);
            setMessage(e.target.value);
          }}
          sx={{ mt: 2 }}
          multiline
          rows={2}
          required
          error={textError}
        />
        {error && (
          <Typography color="error" variant="body2" mt={1}>
            {error}
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleMessageSend}
          loading={isLoading}
        >
          Send
        </Button>
      </Paper>
    </Box>
  );
};

export default MessageForm;
