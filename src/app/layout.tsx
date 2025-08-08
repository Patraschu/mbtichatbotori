import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'MBTI ChatBot - AI 기반 성격 유형별 맞춤 대화',
    template: '%s | MBTI ChatBot'
  },
  description: 'MBTI 성격 유형에 맞춰 개인화된 AI 대화를 제공하는 챗봇 서비스. 16가지 성격 유형별 맞춤형 상담과 조언을 받아보세요.',
  keywords: 'MBTI, 챗봇, AI, 성격유형, INTJ, ENFP, 성격테스트, 심리상담, 인공지능',
  authors: [{ name: 'MBTI ChatBot Team' }],
  creator: 'MBTI ChatBot',
  publisher: 'MBTI ChatBot',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.mbtichatbot.com'),
  alternates: {
    canonical: '/',
    languages: {
      'ko-KR': '/ko',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'MBTI ChatBot - AI 기반 성격 유형별 맞춤 대화',
    description: 'MBTI 성격 유형에 맞춰 개인화된 AI 대화를 제공하는 챗봇 서비스',
    url: 'https://www.mbtichatbot.com',
    siteName: 'MBTI ChatBot',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MBTI ChatBot',
      }
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBTI ChatBot - AI 기반 성격 유형별 맞춤 대화',
    description: 'MBTI 성격 유형에 맞춰 개인화된 AI 대화를 제공하는 챗봇 서비스',
    images: ['/twitter-image.png'],
    creator: '@mbtichatbot',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-site-verification-code',
    other: {
      me: ['support@mbtichatbot.com'],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'MBTI ChatBot',
              url: 'https://www.mbtichatbot.com',
              description: 'MBTI 성격 유형에 맞춰 개인화된 AI 대화를 제공하는 챗봇 서비스',
              applicationCategory: 'LifestyleApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'KRW',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '1024',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}