# MBTI ChatBot 프로젝트 컨텍스트

## 프로젝트 개요

MBTI ChatBot은 사용자가 원하는 MBTI 성격 유형과 관계 설정을 통해 개인화된 가상 대화 상대와의 자연스러운 한국어 대화를 제공하는 AI 기반 챗봇 서비스입니다.

- **도메인**: www.mbtichatbot.com
- **기술 스택**: Next.js 15.4.2, React 19.1.0, TypeScript 5.6.3, Tailwind CSS 3.4.17
- **AI 엔진**: Google Generative AI (Gemini 2.0 Flash)
- **데이터베이스**: PostgreSQL with Drizzle ORM / Prisma
- **UI 스타일**: 카카오톡 스타일의 채팅 인터페이스

## 핵심 서비스

### 1. 챗봇 캐릭터 커스터마이징
사용자는 대화할 챗봇의 특성을 다음과 같이 설정할 수 있습니다:

**Step 1: MBTI 선택**
- 16가지 MBTI 유형 중 선택 (INTJ, ENFP, ISFJ 등)
- 각 MBTI별 고유한 성격 특성과 대화 스타일
- src/data/mbti 폴더에 각 유형별 상세 페르소나 정의

**Step 2: 성별 선택**
- 남성 / 여성 선택
- 성별에 따른 언어 스타일과 호칭 차이

**Step 3: 관계 설정**
- **부모**: 따뜻하고 보호적인 조언자 역할
- **자식**: 귀엽고 의존적인 캐릭터
- **연인**: 로맨틱하고 애정 표현이 풍부한 관계
- **짝사랑**: 설레는 감정과 조심스러운 접근
- **친구**: 편안하고 솔직한 대화 상대 (가벼운 비속어 허용)
- **동료**: 전문적이면서도 친근한 관계 (직장 생활 공감)

### 2. 자연스러운 대화 시스템
- **감정 인식**: 사용자의 감정 상태를 파악하여 적절한 반응
- **맥락 유지**: 이전 대화 내용을 기억하여 연속성 있는 대화
- **개성 있는 말투**: 설정된 MBTI와 관계에 따른 고유한 말투
- **이모티콘 사용**: MBTI 성격 유형별 이모티콘 패턴
- **메시지 분할**: [SPLIT] 태그를 사용한 자연스러운 메시지 분할
- **시간 인식**: 한국 시간(KST) 기반 상황별 대화

### 3. 기술적 특징
- **세션 관리**: 메모리 기반 세션 스토어 (30분 자동 정리)
- **Rate Limiting**: 세션별 과도한 요청 방지 (블로킹 시스템)
- **다국어 지원**: Google Cloud Translate API 연동 준비
- **반응형 디자인**: 모바일 우선 설계

## 프로젝트 구조

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API 라우트
│   │   └── chat/          # 채팅 API 엔드포인트
│   ├── chat/              # 채팅 페이지
│   ├── setup/             # 설정 페이지
│   └── layout.tsx         # 루트 레이아웃
├── components/            # React 컴포넌트
│   ├── chat/             # 채팅 관련 컴포넌트
│   └── setup/            # 설정 관련 컴포넌트
├── data/                 # 정적 데이터
│   └── mbti/            # MBTI 유형별 페르소나 정의
├── lib/                  # 유틸리티 함수
│   ├── constants/       # 상수 정의
│   ├── db/              # 데이터베이스 스키마
│   └── utils/           # 헬퍼 함수
└── types/               # TypeScript 타입 정의
```

## 개발 가이드라인

### 코드 스타일
- TypeScript strict mode 사용
- 함수형 컴포넌트 및 React Hooks 사용
- 의미 있는 변수명과 함수명 사용
- 주석은 필요한 경우에만 간결하게

### 컴포넌트 구조
```typescript
// 컴포넌트 파일 구조 예시
import { ComponentProps } from '@/types/components';

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // 컴포넌트 로직
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### API 구조
- Next.js 13+ Route Handlers 사용
- 타입 안전성을 위한 zod 스키마 검증
- 에러 처리 및 적절한 HTTP 상태 코드 반환

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm run start

# 타입 체크
npm run type-check

# 린트
npm run lint

# Prisma 관련
npm run db:generate
npm run db:migrate
npm run db:push
npm run db:studio
```

## 환경 변수

```env
# .env.local
GEMINI_API_KEY=...          # Google Generative AI API 키
DATABASE_URL=postgresql://... # PostgreSQL 연결 URL
GOOGLE_TRANSLATE_API_KEY=... # Google Translate API 키 (선택)
```

## 주요 의존성

### 프로덕션
- **Next.js 15.4.2**: React 프레임워크
- **React 19.1.0**: UI 라이브러리
- **@google/generative-ai**: Gemini AI 연동
- **@google-cloud/translate**: 번역 서비스
- **Tailwind CSS**: 스타일링
- **Radix UI**: 접근성 컴포넌트
- **Drizzle ORM / Prisma**: 데이터베이스 ORM

### 개발
- **TypeScript 5.6.3**: 타입 시스템
- **ESLint**: 코드 품질
- **tsx**: TypeScript 실행 환경

## 보안 고려사항

1. **API 보안**
   - API 키는 환경 변수로 관리
   - Rate limiting으로 악용 방지
   - 세션 기반 요청 관리

2. **데이터 보호**
   - 사용자 대화 내용은 메모리에만 저장
   - 30분 후 자동 삭제
   - 민감한 정보 로깅 금지

3. **입력 검증**
   - 모든 사용자 입력 검증
   - XSS 방지
   - SQL Injection 방지 (ORM 사용)

## 배포 프로세스

1. **Vercel 배포**
   - main 브랜치 자동 배포
   - 환경 변수 설정 필수
   - 빌드 최적화 자동 적용

2. **모니터링**
   - Vercel Analytics로 성능 모니터링
   - 에러 로깅 및 추적
   - 사용자 피드백 수집

## 추가 참고사항

- 모든 대화는 한국어 기반
- 카카오톡 스타일의 자연스러운 대화 흐름
- MBTI 특성에 맞는 개성 있는 응답
- 시간대별 적절한 인사말과 반응
- 관계 설정에 따른 존댓말/반말 자동 전환

## 개발 중 주의사항

1. **성능 최적화**
   - 불필요한 리렌더링 방지
   - 메모이제이션 적절히 사용
   - 번들 사이즈 최소화

2. **접근성**
   - ARIA 레이블 적용
   - 키보드 네비게이션 지원
   - 스크린 리더 호환성

3. **에러 처리**
   - 사용자 친화적 에러 메시지
   - 폴백 UI 제공
   - 에러 바운더리 활용