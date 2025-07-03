"use client";
import { useContext, useCallback } from "react";
import { AdminContext } from "@/context/AdminContext";
import { redirect } from "next/navigation";

export const useAdmin = () => {
  const {
    userName,
    setUsername,
    usersMap,
    setUsersMap,
    stats,
    setStats,
    refreshChart,
    setRefreshChart,
  } = useContext(AdminContext);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) {
        redirect("/login");
      }
      const data = await res.json();
      setStats(data);
      return data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return null;
    }
  }, []);
  return {
    userName,
    setUsername,
    usersMap,
    setUsersMap,
    stats,
    setStats,
    fetchMessages,
    refreshChart,
    setRefreshChart,
  };
};
