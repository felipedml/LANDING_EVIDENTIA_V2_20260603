import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['@google/genai'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],

  // ✅ Add iframe and embedding support headers for Pickaxe Studio and Member App compatibility
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // 1. Web browser iframe allowed options
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
          // 2. Clear CORS rules for cross-origin integration
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,OPTIONS,PUT,DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
          },
          // 3. Clipboard API access is needed for copy/paste of citations and summaries inside iframes
          {
            key: 'Permissions-Policy',
            value: 'clipboard-read=(self), clipboard-write=(self)',
          },
          // 4. Content-Security-Policy frame-ancestors is relaxed to allow local preview and embedding across arbitrary SaaS domains (Pickaxe, Member App, Google AI Studio)
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' * *.pickaxe.co studio.pickaxe.co",
          },
          // 5. Standard security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
