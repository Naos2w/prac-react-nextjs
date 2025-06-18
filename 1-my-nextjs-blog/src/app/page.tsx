import styles from "./page.module.css";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box className={styles.page_ctn}>
      <div>Naos Tsai</div>
      <div>A Full-Stack Developer. Keep Learning.</div>
      <div>Welcome to my blog.</div>
    </Box>
  );
}
