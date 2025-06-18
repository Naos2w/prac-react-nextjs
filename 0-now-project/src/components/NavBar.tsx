"use client";

import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";

type NavBarProps = {
  logoName: string;
  links: { label: string; to: string }[];
  backgroundColor?: string;
  color?: string;
  minHeight?: string;
};
export default function NavBar({
  logoName,
  links,
  backgroundColor = "black",
  color = "white",
  minHeight = "50px",
}: NavBarProps) {
  const [ToggleIcon, setToggleIcon] = useState(false);
  const handleClickMenu = () => {
    setToggleIcon(!ToggleIcon);
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: backgroundColor }}>
      <Toolbar
        sx={{
          minHeight: minHeight + " !important",
          px: "24px !important",
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href={"/"}>{logoName}</Link>
        </Typography>
        <Box
          sx={{
            color: color,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyItems: "center",
            alignItems: "center",
            gap: { xs: "unset", sm: "1rem" },
            position: { xs: "absolute", sm: "unset" },
            top: { xs: "50px", sm: "unset" },
            left: { xs: ToggleIcon ? "0" : "-110%", sm: "unset" },
            width: { xs: "100%", sm: "unset" },
            backgroundColor: { xs: backgroundColor, sm: "unset" },
            transition: { xs: "left 0.3s ease-in-out", sm: "unset" },
          }}
        >
          {links.map((link) => (
            <Link
              key={link.label}
              sx={{ color: color, py: { xs: "2rem", sm: "unset" } }}
              href={link.to}
            >
              {link.label}
            </Link>
          ))}
        </Box>
        <IconButton
          sx={{
            color: color,
            display: {
              xs: "flex", // 手機尺寸顯示
              sm: "none", // 平板以上隱藏
            },
            alignItems: { xs: "center", sm: "unset" },
            justifyContent: { xs: "center", sm: "unset" },
            alignContent: { xs: "center", sm: "unset" },
            paddingRight: { xs: "0px", sm: "unset" },
            transition: "display 0.3s ease-in-out,transform 0.3s ease-in-out",
          }}
          onClick={handleClickMenu}
        >
          <MenuIcon
            sx={{
              opacity: ToggleIcon ? 0 : 1,
              visibility: ToggleIcon ? "hidden" : "visible",
              transform: ToggleIcon
                ? "rotate(0deg) scale(0.8)"
                : "rotate(0deg) scale(1)",
              transition: "all 0.3s ease-in-out",
              position: "absolute",
            }}
          />
          <CloseIcon
            sx={{
              opacity: ToggleIcon ? 1 : 0,
              visibility: ToggleIcon ? "visible" : "hidden",
              transform: ToggleIcon
                ? "rotate(90deg) scale(1)"
                : "rotate(0deg) scale(0.8)",
              transition: "all 0.3s ease-in-out",
              position: "absolute",
            }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
    // <nav className="navbar">
    //   <div className="navbar_logo_container">
    //     <span className="navbar_logo">Naos</span>
    //   </div>
    //   <div className="navbar-list-container">
    //     <ul className="navbar-list">
    //       <li>
    //         <Link href="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link href="/about">About</Link>
    //       </li>
    //       <li>
    //         <Link href="/contact">Contact</Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="nav-icon" onClick={handleClickMenu}>
    //     {ToggleIcon ? <MenuIcon /> : <CloseIcon />}
    //   </div>
    // </nav>
  );
}
