import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  transpilePackages: ["next-auth"],
  webpack(config) {
    config.resolve.alias["handlebars"] = path.resolve(
      __dirname,
      "node_modules",
      "handlebars",
      "dist",
      "handlebars.js",
    );
    return config;
  },
};

export default nextConfig;
