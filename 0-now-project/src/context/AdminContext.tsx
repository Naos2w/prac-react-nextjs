"use client";
import { useState, createContext } from "react";
import type { Stats, UserWithMessagesType } from "@/types/message";

type AdminContextType = {
  userName: string;
  setUsername: (username: string) => void;
  usersMap: Map<string, { username: string; color: string }>;
  setUsersMap: (
    usersMap: Map<string, { username: string; color: string }>
  ) => void;
  stats: Stats | undefined;
  setStats: (stats: Stats) => void;
  refreshChart: boolean;
  setRefreshChart: (refreshChart: boolean) => void;
  messages: UserWithMessagesType | undefined;
  setMessages: (messages: UserWithMessagesType) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const AdminContext = createContext<AdminContextType>({
  userName: "",
  setUsername: () => {},
  usersMap: new Map<string, { username: string; color: string }>(),
  setUsersMap: () => {},
  stats: undefined,
  setStats: () => {},
  refreshChart: false,
  setRefreshChart: () => {},
  messages: undefined,
  setMessages: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUsername] = useState<string>("");
  const [usersMap, setUsersMap] = useState<
    Map<string, { username: string; color: string }>
  >(new Map<string, { username: string; color: string }>());
  const [stats, setStats] = useState<Stats | undefined>(undefined);
  const [refreshChart, setRefreshChart] = useState<boolean>(false);
  const [messages, setMessages] = useState<UserWithMessagesType | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AdminContext.Provider
      value={{
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
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
