"use client";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useMessages } from "@/hooks/useMessages";
import { PopupMessage } from "@/components/PopupMessage";
import { apiRequest } from "@/utils/apiRequest";
import { LoadingScreen } from "@/components/LoadingScreen";

export const MessageForm = () => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [textError, setTextError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    fetchMessages,
    showResultMessage,
    resultMessage,
    resultMessageType,
    resultMessageOpenFlag,
    setResultMessageOpenFlag,
  } = useMessages();

  const showMessage = async (
    message: string,
    type: "info" | "success" | "error" | "warning" | undefined
  ) => {
    showResultMessage(message, type);
    if (type === "success") {
      await fetchMessages();
      setMessage("");
    } else if (type === "error") {
      setTextError(true);
      setError(message);
    }
  };
  const handleMessageSend = async () => {
    setIsLoading(true);
    try {
      await apiRequest("/api/messages", "POST", {
        message: message,
      });
      await showMessage("Message sent successfully.", "success");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      showMessage(`Message sent failed. error: ${errorMsg}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? <LoadingScreen /> : null}
      <PopupMessage
        open={resultMessageOpenFlag}
        message={resultMessage}
        type={resultMessageType}
        onClose={() => setResultMessageOpenFlag(false)}
      />
      <Paper sx={{ p: 4, maxWidth: 500, width: "90%", m: 1, mb: 1 }}>
        <TextField
          fullWidth
          type="text"
          label="Leave your message here"
          value={message}
          onChange={(e) => {
            setTextError(false);
            setMessage(e.target.value);
          }}
          sx={{ mt: 1 }}
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
