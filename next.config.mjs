import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 이미지 최적화 설정
  images: {
    unoptimized: false, // Vercel에서 이미지 최적화 활성화
    domains: [], // 외부 이미지 도메인 추가 시 사용
    formats: ['image/webp', 'image/avif'], // 최신 이미지 포맷 지원
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // 1분 캐시
  },

  // TypeScript 설정 - 점진적으로 strict로 전환
  typescript: {
    ignoreBuildErrors: false, // 타입 에러 체크 활성화
  },

  // ESLint 설정
  eslint: {
    ignoreDuringBuilds: false, // ESLint 체크 활성화
  },

  // React Strict Mode - 개발 모드에서 잠재적 문제 감지
  reactStrictMode: true,

  // 압축 활성화 (production)
  compress: true,

  // 정적 페이지 생성 타임아웃
  staticPageGenerationTimeout: 300, // 5분

  // 개발 환경 최적화
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      maxInactiveAge: 60 * 1000, // 60초
      pagesBufferLength: 5,
    },
  }),

  // Webpack 설정
  webpack: (config, { isServer }) => {
    // 클라이언트 사이드에서 Node.js 모듈 polyfill 제거
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // 프로덕션 빌드 최적화
    if (config.mode === 'production') {
      config.optimization = {
        ...config.optimization,
        minimize: true,
      };
    }

    return config;
  },

  // 헤더 설정 (보안 강화)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // 리다이렉트 설정 (필요시)
  async redirects() {
    return [];
  },

  // favicon 요청 차단
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/api/block-favicon',
      },
    ];
  },
};

// Bundle Analyzer 설정 적용
export default withBundleAnalyzer(nextConfig);
