import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev }) => {
    // 仅在 build/watch 模式下生效
    config.watchOptions = {
      ignored: [
        "**/node_modules",
        "**/.next",
        "C:/Users/simpl/Application Data/**",
      ],
    };
    return config;
  },
};

export default nextConfig;
