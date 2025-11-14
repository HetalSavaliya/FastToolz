/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {}, // ⚠ correct type
  },
  eslint: {
    // ✅ Ignore ESLint errors during builds (useful for Docker)
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
