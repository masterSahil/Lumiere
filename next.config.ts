import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

try {
  const middlewareJsPath = path.join(process.cwd(), 'middleware.js');
  if (fs.existsSync(middlewareJsPath)) {
    fs.unlinkSync(middlewareJsPath);
    console.log("Deleted middleware.js to resolve conflict");
  }
} catch (e) {}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default nextConfig;
