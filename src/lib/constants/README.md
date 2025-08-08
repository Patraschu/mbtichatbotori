# 상수 디렉토리

이 폴더에는 앱 전반에서 사용되는 상수들이 저장됩니다.

## 예상 파일 구조

- `mbti.ts` - MBTI 관련 상수
- `api.ts` - API 엔드포인트 상수
- `config.ts` - 앱 설정 상수
- `routes.ts` - 라우트 경로 상수
- `messages.ts` - UI 메시지 상수
- `seo.ts` - SEO 관련 상수

## 사용 예시

```typescript
// mbti.ts
export const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
] as const;

export const MBTI_DESCRIPTIONS = {
  INTJ: '건축가형',
  INTP: '논리적인 사색가',
  // ...
};

// config.ts
export const APP_CONFIG = {
  name: 'MBTI ChatBot',
  domain: 'https://www.mbtichatbot.com',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.mbtichatbot.com',
  supportEmail: 'support@mbtichatbot.com',
};
```