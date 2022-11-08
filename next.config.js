/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    appDir: true,
    runtime: 'experimental-edge', // 'node.js' (default) | experimental-edge
  },
};

module.exports = nextConfig;