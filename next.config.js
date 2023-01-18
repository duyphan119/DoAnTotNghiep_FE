/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL:
      process.env.NODE_ENV === "development"
        ? process.env.API_URL_DEV
        : process.env.API_URL_PROD,
    API_VERSION:
      process.env.NODE_ENV === "development"
        ? process.env.API_VERSION_DEV
        : process.env.API_VERSION_PROD,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
