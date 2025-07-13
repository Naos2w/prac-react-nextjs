"use client";
import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Link, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { apiRequest } from "@/utils/apiRequest";
import { useMessages } from "@/hooks/useMessages";
import { PopupMessage } from "@/components/PopupMessage";

export default function LoginPage() {
  const { username, setUsername, login } = useUser();
  const [userError, setUserError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [pwdError, setPwdError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URL(window.location.href).searchParams;
    const errorParam = params.get("err");

    if (errorParam) {
      if (errorParam === "user_not_found") {
        const msg = "User is not found. Please login again.";
        setError("User is not found. Please login again.");
        showMessage(msg, "error");
      } else if (errorParam === "invalid_token") {
        const msg = "Invalid token. Please login again.";
        setError(msg);
        showMessage(msg, "error");
      }
    }
  }, [router]);

  const showMessage = async (
    message: string,
    type: "info" | "success" | "error" | "warning" | undefined
  ) => {
    showResultMessage(message, type);
    if (type === "success") {
      if (username === "admin") {
        setRedirectAfterPopup("/admin");
      } else setRedirectAfterPopup("/");
    }
  };
  const handleMessageClose = () => {
    setResultMessageOpenFlag(false);
    if (redirectAfterPopup) {
      router.push(redirectAfterPopup);
      setRedirectAfterPopup(null); // 重置狀態
    }
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const data = await apiRequest<{ token: string }>("/api/login", "POST", {
        username: username.toLowerCase(),
        password,
      });

      if (data?.token) {
        login(data.token);
      }
      await showMessage("Login Successfully. Redirecting ...", "success");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      if (errorMsg === "Request timed out") {
        const msg = `Ruquest timed out. Please try again later. ${errorMsg}`;
        showMessage(msg, "error");
        setError(msg);
      } else {
        const msg = `Login failed. Error: ${errorMsg}`;
        showMessage(msg, "error");
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      onSubmit={handleLogin}
    >
      <PopupMessage
        open={resultMessageOpenFlag}
        message={resultMessage}
        type={resultMessageType}
        onClose={handleMessageClose}
        duration={2000}
      />
      <Paper
        elevation={3}
        sx={{ padding: 4, maxWidth: 500, width: "90%", m: 2 }}
      >
        <Typography variant="h5" mb={2}>
          Login
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
          error={pwdError}
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
          loading={isLoading}
          type="submit"
        >
          Login
        </Button>
        <Typography mt={2} textAlign="center" variant="body2">
          {"Don't have an account? "}
          <Link href="/create-user" underline="hover">
            Create one
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
