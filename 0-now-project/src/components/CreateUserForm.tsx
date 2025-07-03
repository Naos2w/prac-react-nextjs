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

export const CreateUserForm = () => {
  const [username, setUsername] = useState<string>("");
  const [userError, setUserError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [pwdError, setPwdError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 秒 timeout

  const handleCreateUser = async () => {
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
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        setError(error || "Failed to create user");
        return;
      }
      setMessage("User created! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setError(`Create user error: ${err}`);
    } finally {
      setIsLoading(false);
      clearTimeout(timeoutId);
    }
  };
  const handleBackToLogin = () => {
    router.push("/login");
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
        {message && (
          <Typography color="primary" variant="body2" mt={1}>
            {message}
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
          <Button
            variant="contained"
            onClick={handleCreateUser}
            loading={isLoading}
          >
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
