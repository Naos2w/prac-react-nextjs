"use client";
import { useState, createContext } from "react";
type AdminContextType = {
  userName: string;
  setUsername: (username: string) => void;
  usersMap: Map<string, { username: string; color: string }>;
  setUsersMap: (
    usersMap: Map<string, { username: string; color: string }>
  ) => void;
};

export const AdminContext = createContext<AdminContextType>({
  userName: "",
  setUsername: () => {},
  usersMap: new Map<string, { username: string; color: string }>(),
  setUsersMap: () => {},
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUsername] = useState<string>("");
  const [usersMap, setUsersMap] = useState<
    Map<string, { username: string; color: string }>
  >(new Map<string, { username: string; color: string }>());

  return (
    <AdminContext.Provider
      value={{
        userName,
        setUsername,
        usersMap,
        setUsersMap,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
