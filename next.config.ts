/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {}, // ⚠ should be an object, not `true` or `false`
  },
  // remove invalid `api` key if it exists
};

export default nextConfig;
