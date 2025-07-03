"use client";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export const useUser = () => {
  const { username, setUsername, userId, isLoggedIn, login, logout } =
    useContext(UserContext);

  return { username, setUsername, userId, isLoggedIn, login, logout };
};
