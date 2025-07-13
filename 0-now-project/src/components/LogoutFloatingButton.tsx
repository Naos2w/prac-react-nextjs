"use client";
import { useState, useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { Fab, Tooltip, Zoom } from "@mui/material";
import { redirect } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeContext } from "@/context/ThemeContext";

export const LogoutFloatingButton = () => {
  const { username } = useUser();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const spacing = 55;

  const getFabColor = (name: string, theme: string) => {
    if (name === "Theme Toggle") {
      return theme === "dark" ? "rgb(199, 179, 0)" : "rgb(2, 71, 139)";
    }
    if (name === "Logout") return "#f44336";
    return "grey.500";
  };

  const getFabHoverColor = (name: string, theme: string) => {
    if (name === "Theme Toggle") {
      return theme === "dark" ? "rgb(245, 220, 0)" : "rgb(0, 106, 212)";
    }
    if (name === "Logout") return "#d32f2f";
    return "grey.600";
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    redirect("/login"); // 登出後導向登入頁
  };
  const actionButtons =
    username?.toLowerCase() === "admin"
      ? [
          {
            icon: <LogoutIcon />,
            name: "Logout",
            description: "Logout",
            onClick: handleLogout,
          },
          {
            icon: theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />,
            name: "Theme Toggle",
            description: "Theme Toggle",
            onClick: toggleTheme,
          },
        ]
      : [
          {
            icon: <LogoutIcon />,
            name: "Logout",
            description: "Logout",
            onClick: handleLogout,
          },
          {
            icon: <PermContactCalendarIcon />,
            name: `Login user: ${username}`,
            description: `Login user: ${username}`,
            onClick: () => {},
          },
          {
            icon: theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />,
            name: "Theme Toggle",
            description: "Theme Toggle",
            onClick: toggleTheme,
          },
        ];

  return (
    <>
      <Fab
        sx={{
          position: "fixed",
          bottom: 10,
          right: 20,
          transform: `rotate(${open ? 135 : 0}deg)`,
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
        color="primary"
        onClick={handleToggle}
      >
        <AddIcon />
      </Fab>
      {actionButtons.map((action, index) => (
        <Zoom
          in={open}
          key={action.name}
          style={{ transitionDelay: open ? `${index * 50}ms` : "0ms" }}
        >
          <Tooltip title={action.description} placement="left" arrow>
            <Fab
              size="small"
              aria-label={action.name}
              onClick={action.onClick}
              sx={{
                backgroundColor: getFabColor(action.name, theme),
                "&:hover": {
                  backgroundColor: getFabHoverColor(action.name, theme),
                },
                color: "white",
                position: "fixed",
                bottom: open ? (index + 1.5) * spacing : 0,
                right: 25,
                transition: "bottom 0.3s ease-out, opacity 0.3s ease-out",
                opacity: open ? 1 : 0,
                pointerEvents: open ? "auto" : "none",
              }}
            >
              {action.icon}
            </Fab>
          </Tooltip>
        </Zoom>
      ))}
    </>
  );
};

export default LogoutFloatingButton;
