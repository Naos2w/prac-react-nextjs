"use client";
import { Box, Link, Typography } from "@mui/material";

type PostCardProps = {
  post: {
    slug: string;
    title: string;
    date: string;
    content: string;
  };
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Box
      key={post.slug}
      sx={{
        border: "1px solid #ccc",
        m: 2,
        p: 2,
        width: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={`/blog/${post.slug}`}>
        <Typography variant="h4">{post.title}</Typography>
      </Link>
      <Typography variant="h6">{post.date}</Typography>
    </Box>
  );
};

export default PostCard;
