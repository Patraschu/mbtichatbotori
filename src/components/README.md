# Components

이 폴더는 MBTI ChatBot의 모든 React 컴포넌트를 포함합니다.

## 폴더 구조

### `/common`
공통으로 사용되는 재사용 가능한 컴포넌트
- `ThemeToggleButton.tsx` - 다크/라이트 테마 전환 버튼
- `ThemeProvider.tsx` - 테마 관리 Provider

### `/chat`
채팅 인터페이스 관련 컴포넌트
- `ChatInterface.tsx` - 메인 채팅 인터페이스
- `ModernChatUI.tsx` - 모던 스타일 채팅 UI
- `KakaoChat.tsx` - 카카오톡 스타일 채팅 UI
- `ChatBubble.tsx` - 채팅 말풍선 컴포넌트
- `ChatHeader.tsx` - 채팅 헤더
- `ChatInput.tsx` - 채팅 입력 컴포넌트

### `/setup`
초기 설정 관련 컴포넌트
- `SetupWizard.tsx` - 설정 마법사 메인 컴포넌트
- `MBTISelector.tsx` - MBTI 유형 선택기
- `GenderSelector.tsx` - 성별 선택기
- `RelationshipSelector.tsx` - 관계 선택기

## 컴포넌트 네이밍 규칙
- PascalCase 사용
- 용도가 명확히 드러나는 이름 사용
- 하나의 파일에 하나의 컴포넌트만 export