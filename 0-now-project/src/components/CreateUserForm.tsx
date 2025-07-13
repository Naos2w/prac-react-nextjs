"use client";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  ButtonGroup,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/apiRequest";
import { useMessages } from "@/hooks/useMessages";
import { PopupMessage } from "@/components/PopupMessage";

export const CreateUserForm = () => {
  const [username, setUsername] = useState<string>("");
  const [userError, setUserError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [pwdError, setPwdError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirectAfterPopup, setRedirectAfterPopup] = useState<null | string>(
    null
  );
  const router = useRouter();

  const {
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
    if (type === "success") setRedirectAfterPopup("/login");
  };
  const handleMessageClose = () => {
    setResultMessageOpenFlag(false);
    if (redirectAfterPopup) {
      router.push(redirectAfterPopup);
      setRedirectAfterPopup(null); // 重置狀態
    }
  };
  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (!username) {
      setUserError(true);
      setIsLoading(false);
    }
    if (!password) {
      setPwdError(true);
      setIsLoading(false);
    }
    if (!username || !password) return;

    try {
      await apiRequest<{ token: string }>("/api/user", "POST", {
        username: username.toLowerCase(),
        password,
      });

      await showMessage(
        "Create Successfully. Redirecting to login page ...",
        "success"
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      if (errorMsg === "Request timed out") {
        const msg = `Ruquest timed out. Please try again later. ${errorMsg}`;
        showMessage(msg, "error");
        setError(msg);
      } else {
        const msg = `Created user failed. Error: ${errorMsg}`;
        showMessage(msg, "error");
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <Box
      component={"form"}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onSubmit={handleCreateUser}
    >
      <PopupMessage
        open={resultMessageOpenFlag}
        message={resultMessage}
        type={resultMessageType}
        onClose={handleMessageClose}
      />
      <Paper
        elevation={3}
        sx={{ padding: 4, maxWidth: 500, width: "90%", m: 2 }}
      >
        <Typography variant="h5" mb={2}>
          Create Account
        </Typography>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setUserError(false);
          }}
          required
          error={userError}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPwdError(false);
          }}
          required
          error={pwdError}
        />
        {error && (
          <Typography color="error" variant="body2" mt={1}>
            {error}
          </Typography>
        )}
        <ButtonGroup
          fullWidth
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            mt: 2,
            gap: 2,
          }}
        >
          <Button variant="contained" loading={isLoading} type="submit">
            Register
          </Button>
          <Button variant="contained" onClick={handleBackToLogin}>
            Cancel
          </Button>
        </ButtonGroup>
      </Paper>
    </Box>
  );
};

export default CreateUserForm;
