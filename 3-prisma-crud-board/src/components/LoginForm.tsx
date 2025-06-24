"use client";
import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Link, Paper } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 秒 timeout

  useEffect(() => {
    const errorParam = searchParams.get("err");
    if (errorParam) {
      if (errorParam === "user_not_found") {
        setErrMsg("User is not found. Please login again.");
      } else if (errorParam === "invalid_token") {
        setErrMsg("Invalid token. Please login again.");
      }
      console.log(`errMsg: ${errMsg}`);
      setTimeout(() => {
        router.replace("/login", undefined);
        setErrMsg("");
      }, 3000);
    }
  }, [router]);
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        setError(error || "Login failed");
        setIsLoading(false);
        return;
      }

      // 登入成功，導向首頁或後台
      router.push("/");
    } catch (err) {
      setError(`Login Error: ${err}`);
    } finally {
      setIsLoading(false);
      clearTimeout(timeoutId);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {errMsg && <ErrorMessage msg={errMsg} />}
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
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleLogin}
          loading={isLoading}
        >
          Login
        </Button>
        <Typography mt={2} textAlign="center" variant="body2">
          Don't have an account?{" "}
          <Link href="/create-user" underline="hover">
            Create one
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
