"use client";
import { Card, Typography } from "@mui/material";

interface ErrorMessageProps {
  msg: string | undefined | "";
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ msg }) => {
  return (
    <Card
      sx={{
        maxWidth: 500,
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50px",
        m: 2,
      }}
    >
      <Typography variant="h6" color="red">
        {msg}
      </Typography>
    </Card>
  );
};

export default ErrorMessage;
