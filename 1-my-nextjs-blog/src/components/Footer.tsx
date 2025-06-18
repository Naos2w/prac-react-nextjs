"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type FooterProps = {
  children?: React.ReactNode;
  backgroundColor?: string;
  color?: string;
  name: string;
};

const Footer = ({
  children,
  backgroundColor = "black",
  color = "white",
  name,
}: FooterProps) => {
  const year = new Date().getFullYear();

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: backgroundColor,
        color: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
        position: "relative",
        bottom: 0,
      }}
    >
      {children ? (
        children
      ) : (
        <Typography variant="body1" fontSize={"10px"}>
          © {year} {name} Tsai Next.js Blog. | All rights reserved.
        </Typography>
      )}
    </Box>
  );
};

export default Footer;
