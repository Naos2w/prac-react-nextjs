import { Box, Typography } from "@mui/material";
import styles from "../page.module.css";
import getData from "@/data/posts";
import PostCard from "@/components/PostCard";

const Blog = async () => {
  const posts = await getData();
  return (
    <Box className={styles.page_ctn}>
      <Typography variant="h2">My Blog</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          flexWrap: "wrap",
          mt: 2,
        }}
      >
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </Box>
    </Box>
  );
};

export default Blog;
