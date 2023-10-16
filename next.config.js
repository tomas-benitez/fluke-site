/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "via.placeholder.com",
      "www.amprobe.com",
      "www.flukenetworks.com",
      "dam-assets.fluke.com",
      "strapi.fluke.com.ar",
      "dev.fluke.com.ar",
      "fluke.com.ar",
      "localhost",
    ],
  },
};

module.exports = nextConfig;
