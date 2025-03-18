/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'placehold.co'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig 