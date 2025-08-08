/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 이미지 도메인 설정
  images: {
    domains: ['www.mbtichatbot.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // 리다이렉트 설정
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // 헤더 설정
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
  
  // 환경 변수
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://www.mbtichatbot.com',
  },
  
  // Webpack 설정
  webpack: (config, { isServer }) => {
    // 서버 사이드에서만 실행되는 설정
    if (isServer) {
      // Prisma 클라이언트 외부화
      config.externals.push('_http_common');
    }
    
    return config;
  },
};

module.exports = nextConfig;