"use client";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { Fab, Tooltip, Zoom } from "@mui/material";
import { redirect } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export const LogoutFloatingButton = () => {
  const { username } = useUser();
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const spacing = 55;

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
        ];

  return (
    <>
      <Fab
        sx={{
          position: "fixed",
          bottom: 10,
          right: 10,
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
                "&:hover": {
                  backgroundColor: "rgb(158, 207, 255)",
                },
                backgroundColor: "rgb(86, 171, 255)",
                color: "white",
                position: "absolute",
                bottom: open ? (index + 1.5) * spacing : 0,
                right: 10,
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
