/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for better Netlify compatibility
  trailingSlash: true,
  images: {
    domains: ['localhost'],
    unoptimized: true, // Required for static export
  },
  // Configure for Netlify
  distDir: '.next',
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;
    return config;
  },
}

module.exports = nextConfig
