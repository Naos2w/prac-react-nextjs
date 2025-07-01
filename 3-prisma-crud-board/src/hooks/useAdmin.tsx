"use client";
import { useContext } from "react";
import { AdminContext } from "@/context/AdminContext";

export const useAdmin = () => {
  const { userName, setUsername, usersMap, setUsersMap } =
    useContext(AdminContext);

  return { userName, setUsername, usersMap, setUsersMap };
};
