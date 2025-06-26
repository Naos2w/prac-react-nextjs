"use client";
import { createContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

interface UserContextType {
  username: string | null;
  setUsername: (username: string) => void;
  userId: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  username: null,
  setUsername: () => {},
  userId: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "include", // 確保帶 cookie
        });
        const data = await res.json();

        if (data.isLoggedIn) {
          setUserId(data.userId);
          setUsername(data.username || "");
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchMe();
  }, []);

  const login = (token: string) => {
    const decoded = jwt.decode(token) as { id: string; username?: string };
    if (decoded?.id) {
      setUserId(decoded.id);
      console.log(`login decoded.username: ${decoded.username}`);
      setUsername(decoded.username || "");
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    setUsername("");
    setUserId(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{ username, setUsername, userId, isLoggedIn, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
