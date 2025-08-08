# App Directory

Next.js 15 App Router를 사용하는 애플리케이션의 라우팅 구조입니다.

## 페이지 구조

### `/` (홈페이지)
- `page.tsx` - 랜딩 페이지, 서비스 소개 및 시작 버튼

### `/setup`
- `page.tsx` - MBTI, 성별, 관계 설정 페이지

### `/chat`
- `page.tsx` - 메인 채팅 인터페이스 페이지

### `/api`
API 라우트 엔드포인트

#### `/api/chat`
- `route.ts` - 채팅 메시지 처리 API (Gemini AI 연동)

## 레이아웃

### `layout.tsx`
- 전체 애플리케이션의 루트 레이아웃
- 메타데이터 설정
- ThemeProvider 적용
- 폰트 및 기본 스타일 설정

### `globals.css`
- 전역 스타일 정의
- Tailwind CSS 설정
- 커스텀 CSS 변수
- 다크/라이트 테마 색상 정의

## 라우팅 규칙
- 파일 기반 라우팅 사용
- 동적 라우트는 `[param]` 형식 사용
- API 라우트는 `/api` 하위에 위치