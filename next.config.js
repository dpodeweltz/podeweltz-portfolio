/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Keep your image domains so placeholders don't break
  images: {
    remotePatterns:[
      { hostname: 'via.placeholder.com' },
      { hostname: 'placehold.co' }
    ],
    formats:['image/avif', 'image/webp'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Keep TypeScript strictness during build
  typescript: {
    ignoreBuildErrors: false,
  },

  // Notice we removed 'output: export', 'eslint', 'trailingSlash', and 'assetPrefix'!
}

module.exports = nextConfig;