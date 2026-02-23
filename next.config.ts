import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["google-photos-album-image-url-fetch"],
  output: "export",
};

export default nextConfig;
