/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic configuration for Netlify
  trailingSlash: true,
  images: {
    domains: ['localhost'],
    unoptimized: true, // Required for static export
  },
  // Ensure API routes work on Netlify
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./src/lib/**/*'],
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // PDF.js compatibility fixes
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    
    // Fix for PDF.js worker and other externals
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        canvas: false,
        encoding: false,
      };
    }

    // Ensure proper module resolution
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
}

module.exports = nextConfig
