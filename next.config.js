/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'via.placeholder.com' },
      { hostname: 'placehold.co' }
    ],
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Only use export in production to allow dev server to work properly
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  // Enable error checking during build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Set trailing slash for better compatibility with static hosts
  trailingSlash: true,
  // Make sure we generate the correct asset paths
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : undefined,
}

module.exports = nextConfig 