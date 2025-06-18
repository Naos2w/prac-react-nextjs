"use client";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import styles from "../page.module.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <Box className={styles.page_ctn}>
      <Typography variant="h2">Contact Me</Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          width: "100%",
          my: 2,
        }}
      >
        <TextField
          label="Name"
          variant="filled"
          type="text"
          sx={{
            input: {
              color: "#000", // 文字顏色
            },
            label: {
              color: "#555", // label 顏色
            },
            backgroundColor: "#f5f5f5", // 背景
            width: "50%",
          }}
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
        <TextField
          label="Email"
          type="email"
          variant="filled"
          sx={{
            input: {
              color: "#000", // 文字顏色
            },
            label: {
              color: "#555", // label 顏色
            },
            backgroundColor: "#f5f5f5", // 背景
            width: "50%",
          }}
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <TextField
          label="Phone number"
          type="text"
          variant="filled"
          sx={{
            input: {
              color: "#000", // 文字顏色
            },
            label: {
              color: "#555", // label 顏色
            },
            backgroundColor: "#f5f5f5", // 背景
            width: "50%",
          }}
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></TextField>
      </Box>
    </Box>
  );
};

export default Contact;
