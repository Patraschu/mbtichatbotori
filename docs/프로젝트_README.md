# MBTI ChatBot 🤖

> 나와 대화하고 싶은 MBTI 유형을 선택하고, 원하는 관계로 자연스러운 한국어 대화를 즐겨보세요!

## 🌟 프로젝트 소개

MBTI ChatBot은 16가지 MBTI 성격 유형을 기반으로 한 AI 대화 서비스입니다. 사용자가 원하는 성격 유형, 성별, 관계를 설정하면 그에 맞는 캐릭터와 카카오톡 스타일로 자연스러운 대화를 나눌 수 있습니다.

### ✨ 주요 특징

- 🎭 **16가지 MBTI 성격**: 각 유형별 고유한 말투와 성격 특성
- 💑 **6가지 관계 설정**: 부모, 자식, 연인, 짝사랑, 친구, 동료
- 💬 **카카오톡 스타일 UI**: 친숙하고 편안한 채팅 인터페이스
- 🤖 **Google Gemini AI**: 최신 AI 기술로 자연스러운 대화
- 🕐 **시간 인식 대화**: 한국 시간 기준 상황별 맞춤 응답
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn
- PostgreSQL 데이터베이스
- Google Gemini API 키

### 설치 방법

1. **저장소 클론**
```bash
git clone https://github.com/yourusername/mbtichatbot.git
cd mbtichatbot
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**
`.env.local` 파일을 생성하고 다음 내용을 추가:
```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/mbtichatbot
```

4. **데이터베이스 설정**
```bash
npm run db:push
```

5. **개발 서버 실행**
```bash
npm run dev
```

6. **브라우저에서 확인**
```
http://localhost:3000
```

## 💡 사용 방법

### 1. 초기 설정
- 홈페이지에서 "시작하기" 클릭
- MBTI 유형 선택 (예: ENFP)
- 성별 선택 (남성/여성)
- 관계 설정 (친구, 연인 등)

### 2. 대화 시작
- 설정 완료 후 채팅방 입장
- 메시지 입력 후 전송
- AI가 설정된 성격과 관계에 맞춰 응답

### 3. 대화 예시
```
사용자: 오늘 너무 힘들었어ㅠㅠ
ENFP 친구: 헐 무슨 일 있었어?? ㅠㅠ 괜찮아??
         일단 푹 쉬고! 얘기하고 싶으면 다 들어줄게!
```

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 15.4.2 (App Router)
- **Language**: TypeScript 5.6.3
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 3.4.17
- **Components**: Radix UI

### Backend
- **API Routes**: Next.js Route Handlers
- **AI Engine**: Google Generative AI (Gemini 2.0 Flash)
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM / Prisma

### DevOps
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics

## 📂 프로젝트 구조

```
mbtichatbot/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 엔드포인트
│   │   │   └── chat/          # 채팅 API
│   │   ├── chat/              # 채팅 페이지
│   │   ├── setup/             # 설정 페이지
│   │   └── layout.tsx         # 루트 레이아웃
│   ├── components/            # React 컴포넌트
│   │   ├── chat/             # 채팅 UI 컴포넌트
│   │   └── setup/            # 설정 UI 컴포넌트
│   ├── data/                 # 정적 데이터
│   │   └── mbti/            # MBTI 페르소나 (16개 파일)
│   ├── lib/                  # 유틸리티
│   │   ├── constants/       # 상수 정의
│   │   ├── db/              # DB 스키마
│   │   └── utils/           # 헬퍼 함수
│   └── types/               # TypeScript 타입
├── public/                  # 정적 파일
├── docs/                    # 프로젝트 문서
└── package.json            # 프로젝트 설정
```

## 🔧 개발 가이드

### 명령어

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm run start

# 타입 체크
npm run type-check

# 린트
npm run lint

# 데이터베이스 마이그레이션
npm run db:migrate

# Prisma Studio
npm run db:studio
```

### 브랜치 전략
- `main`: 프로덕션 배포
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발
- `hotfix/*`: 긴급 수정

### 코드 스타일
- ESLint 규칙 준수
- Prettier 자동 포맷팅
- TypeScript strict mode
- 함수형 컴포넌트 사용

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의

- **이메일**: your.email@example.com
- **웹사이트**: https://www.mbtichatbot.com
- **GitHub**: https://github.com/yourusername/mbtichatbot

## 🙏 감사의 말

- Google Gemini AI 팀
- Next.js 커뮤니티
- 모든 오픈소스 기여자들

---

Made with ❤️ by MBTI ChatBot Team