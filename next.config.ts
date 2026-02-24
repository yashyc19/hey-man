/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // IMPORTANT for static export
  },
};

module.exports = nextConfig;