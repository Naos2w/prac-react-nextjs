"use client";
import { useState, createContext } from "react";

type Stats = {
  totalUsers: number;
  totalMessages: number;
  messageDistribution: {
    id: string;
    username: string;
    messageCount: number;
  }[];
};

type AdminContextType = {
  userName: string;
  setUsername: (username: string) => void;
  usersMap: Map<string, { username: string; color: string }>;
  setUsersMap: (
    usersMap: Map<string, { username: string; color: string }>
  ) => void;
  stats: any;
  setStats: (stats: Stats) => void;
  refreshChart: boolean;
  setRefreshChart: (refreshChart: boolean) => void;
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
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUsername] = useState<string>("");
  const [usersMap, setUsersMap] = useState<
    Map<string, { username: string; color: string }>
  >(new Map<string, { username: string; color: string }>());
  const [stats, setStats] = useState<Stats | undefined>(undefined);
  const [refreshChart, setRefreshChart] = useState<boolean>(false);

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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
