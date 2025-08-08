# TypeScript 타입 정의 디렉토리

이 폴더에는 프로젝트 전반에서 사용되는 TypeScript 타입 정의들이 저장됩니다.

## 예상 파일 구조

- `mbti.ts` - MBTI 관련 타입
- `user.ts` - 사용자 관련 타입
- `chat.ts` - 채팅 관련 타입
- `api.ts` - API 응답 타입
- `components.ts` - 컴포넌트 Props 타입
- `database.ts` - 데이터베이스 모델 타입
- `common.ts` - 공통 타입

## 타입 정의 예시

```typescript
// mbti.ts
export type MBTIType = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export interface MBTIProfile {
  type: MBTIType;
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  compatibility: MBTIType[];
}

// user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  mbtiType?: MBTIType;
  createdAt: Date;
  updatedAt: Date;
}

// chat.ts
export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  mbtiContext?: MBTIType;
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: Date;
  lastActivity: Date;
}
```