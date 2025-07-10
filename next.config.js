const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;
    
    if (!isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
              to: 'static/js/pdf.worker.min.mjs',
            },
          ],
        })
      );
    }
    
    return config;
  },
}

module.exports = nextConfig
