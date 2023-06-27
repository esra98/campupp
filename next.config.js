/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'campupp.s3.amazonaws.com',
      },
    ],
  }
}

module.exports = nextConfig
