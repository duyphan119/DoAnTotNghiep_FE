/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL:
      process.env.NODE_ENV === "development"
        ? process.env.API_URL_DEV
        : process.env.API_URL_PROD,
  },
  images: {
    // domains: ["scontent.fsgn8-2.fna.fbcdn.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent.fsgn4-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fsgn8-2.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fsgn13-4.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fsgn13-3.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fsgn3-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fsgn13-2.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
