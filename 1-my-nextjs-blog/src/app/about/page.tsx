"use client";
import { Box, Typography } from "@mui/material";
import styles from "../page.module.css";

export const About = () => {
  return (
    <Box className={styles.page_ctn}>
      <Typography variant="h2">About Me</Typography>
      <Typography variant="body1">
        I am a software engineer with a passion for building web applications. I
        have a degree in computer science and have been working in the field for
        5 years. I have experience with React, Next.js, and TypeScript.
      </Typography>
    </Box>
  );
};
export default About;
