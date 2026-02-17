import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // ═══════════════════════════════════════════════════════════
  // 🖼️ Image Optimization
  // ═══════════════════════════════════════════════════════════
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],

    formats: ['image/avif', 'image/webp'], //  AVIF WebP
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Cache
    dangerouslyAllowSVG: true, //SVG
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ═══════════════════════════════════════════════════════════
  // ⚡ Compiler Optimizations
  // ═══════════════════════════════════════════════════════════
  compiler: {
    //  console.log production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], //  error و warn 
    } : false,
  },

  // ═══════════════════════════════════════════════════════════
  // 🚀 Performance Optimizations
  // ═══════════════════════════════════════════════════════════
  reactStrictMode: true, // تفعيل Strict Mode
  poweredByHeader: false, // إخفاء X-Powered-By header

  // ═══════════════════════════════════════════════════════════
  // 🔒 Security & Performance Headers
  // ═══════════════════════════════════════════════════════════
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Security Headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL'
          },
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors *'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
      // Cache 
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache  fonts
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // ═══════════════════════════════════════════════════════════
  // 📦 Webpack Optimizations (Optional)
  // ═══════════════════════════════════════════════════════════
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Tree shaking 
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };
    }

    return config;
  },

  // ═══════════════════════════════════════════════════════════
  // 🌐 Internationalization (  next-intl)
  // ═══════════════════════════════════════════════════════════
  // withNextIntl

  // ═══════════════════════════════════════════════════════════
  // 📊 Analytics & Monitoring (Optional)
  // ═══════════════════════════════════════════════════════════
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default withNextIntl(nextConfig);