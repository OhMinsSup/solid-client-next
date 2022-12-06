const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    appDir: true,
    // runtime: 'experimental-edge', // 'node.js' (default) | experimental-edge
  },
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: isProduction
      ? {
          exclude: ['error', 'warn'],
        }
      : false,
  },
  images: {
    domains: [
      'pub-839fae1de7c64f8eae6caecfd852f848.r2.dev',
      'velog.velcdn.com',
      'remix.run',
    ],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
