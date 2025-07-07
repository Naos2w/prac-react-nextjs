"use client";
import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Link, Paper } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";
import { useUser } from "@/hooks/useUser";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginPage() {
  const { username, setUsername, login } = useUser();
  const [userError, setUserError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPwdFocused, setIsPwdFocused] = useState(false);
  const [pwdError, setPwdError] = useState<boolean>(false);
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
      // console.log(`errMsg: ${errMsg}`);
      setTimeout(() => {
        router.replace("/login", undefined);
        setErrMsg("");
      }, 3000);
    }
  }, [router, searchParams]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (!res.ok) {
        const { error } = await res.json();
        setError(error || "Login failed");
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      if (data?.token) {
        login(data.token);
      }

      if (username === "admin") {
        router.push("/admin");
      } else router.push("/");
    } catch (err) {
      setError(`Login Error: ${err}`);
    } finally {
      setIsLoading(false);
      clearTimeout(timeoutId);
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
          onChange={(e) => {
            setUsername(e.target.value);
            setUserError(false);
          }}
          error={userError}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPwdError(false);
          }}
          error={pwdError}
          onFocus={() => setIsPwdFocused(true)}
          onBlur={() => {
            setIsPwdFocused(false);
            setShowPassword(false); // 離開時強制關閉顯示
          }}
          InputProps={{
            endAdornment: isPwdFocused && (
              <InputAdornment position="end">
                <IconButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  tabIndex={-1} // 防止 tab 聚焦眼睛 icon
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          // onClick={handleLogin}
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
