"use client";
import { useContext, useCallback } from "react";
import { AdminContext } from "@/context/AdminContext";
import { apiRequest } from "@/utils/apiRequest";
import type { Stats } from "@/types/message";

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
    messages,
    setMessages,
  } = useContext(AdminContext);

  const fetchMessages = useCallback(async () => {
    try {
      const data = await apiRequest<Stats>("/api/admin/messages");
      setStats(data);
      return data;
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      let msg: string = "";
      let redirectFlag: boolean = false;
      switch (errorMsg) {
        case "Request timeod out":
          msg = `Ruquest timed out. Please try again later. ${errorMsg}`;
          break;
        case "Unauthenticated":
          msg = `User is unauthenticated. Redirecting to login page ... Error: ${errorMsg}`;
          redirectFlag = true;
          break;
        case "Forbidden":
          msg = `You don't have permission to view this page. Redirecting to login page ... Error: ${errorMsg}`;
          redirectFlag = true;
          break;
        default:
          msg = `Get messages stats failed. Error: ${errorMsg}`;
          break;
      }

      throw { error: msg, redirectFlag: redirectFlag };
    }
  }, [setStats]);

  const changeSelectedUser = useCallback(
    (selectedUserId: string | undefined) => {
      const selectedUser = stats?.usersWithMessages.find(
        (m) => m.id === selectedUserId
      );
      console.log(`selectedUserId: ${selectedUserId}`);
      if (selectedUser) setMessages(selectedUser);
    },
    [setMessages, stats]
  );

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
    messages,
    setMessages,
    changeSelectedUser,
  };
};
