import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export → `out/` for cPanel public_html (no Node.js required)
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Security headers for Apache/cPanel live in public/.htaccess (copied into out/)
};

module.exports = nextConfig;
