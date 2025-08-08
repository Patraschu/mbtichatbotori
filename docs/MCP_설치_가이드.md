# MCP (Model Context Protocol) 서버 설치 가이드

## 🤔 MCP란?

MCP(Model Context Protocol)는 Claude Desktop이 외부 도구와 서비스에 접근할 수 있도록 하는 프로토콜입니다. 
프로젝트에 맞는 MCP 서버를 설치하면 Claude가 더 강력한 기능을 수행할 수 있습니다.

## 📋 이 프로젝트의 MCP 서버 구성

### 현재 설치된 MCP 서버들

1. **Sequential Thinking** 
   - 복잡한 문제를 단계별로 사고하는 기능
   - ultrathink 명령어로 활용

2. **Memory Server**
   - 프로젝트 정보를 Knowledge Graph로 저장
   - 대화 중 컨텍스트 유지

3. **Upstash Context MCP**
   - 클라우드 기반 컨텍스트 저장소
   - 세션 간 정보 유지

## 🛠️ MCP 서버 설치 방법

### 사전 준비사항

1. **Node.js 설치 확인**
```bash
node --version  # v18 이상 권장
npm --version   # v9 이상 권장
```

2. **Claude Desktop 설치**
   - [Claude Desktop](https://claude.ai/download) 다운로드 및 설치

### 프로젝트별 MCP 설정 (.mcp.json 방식)

이 프로젝트는 `.mcp.json` 파일을 사용하여 MCP 서버를 관리합니다.

#### 1단계: 필요한 MCP 서버 설치

```bash
# 프로젝트 루트에서 실행
cd G:\python\mbtichatbot

# Sequential Thinking 서버 설치 (전역)
npm install -g @modelcontextprotocol/server-sequential-thinking

# Memory 서버 설치 (프로젝트 로컬)
npm install @modelcontextprotocol/server-memory
```

#### 2단계: .mcp.json 파일 구성

프로젝트 루트에 `.mcp.json` 파일 생성:

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "type": "stdio",
      "command": "node",
      "args": [
        "C:\\Users\\[사용자명]\\AppData\\Roaming\\npm\\node_modules\\@modelcontextprotocol\\server-sequential-thinking\\dist\\index.js"
      ],
      "env": {}
    },
    "memory": {
      "type": "stdio",
      "command": "node",
      "args": [
        "G:\\python\\mbtichatbot\\node_modules\\@modelcontextprotocol\\server-memory\\dist\\index.js"
      ],
      "env": {}
    }
  }
}
```

**주의**: `[사용자명]` 부분을 실제 Windows 사용자명으로 변경하세요.

#### 3단계: Claude Desktop 재시작

1. Claude Desktop을 완전히 종료
2. 시스템 트레이에서도 종료 확인
3. Claude Desktop 재시작
4. 프로젝트 폴더에서 Claude 실행

## 🔧 추가 MCP 서버 설치

### Filesystem MCP (파일 작업 강화)

```bash
# 설치
npm install @modelcontextprotocol/server-filesystem

# .mcp.json에 추가
"filesystem": {
  "type": "stdio",
  "command": "node",
  "args": [
    "./node_modules/@modelcontextprotocol/server-filesystem/dist/index.js"
  ],
  "env": {
    "ALLOWED_DIRECTORIES": "G:\\python\\mbtichatbot"
  }
}
```

### Git MCP (Git 작업 강화)

```bash
# 설치
npm install @modelcontextprotocol/server-git

# .mcp.json에 추가
"git": {
  "type": "stdio",
  "command": "node",
  "args": [
    "./node_modules/@modelcontextprotocol/server-git/dist/index.js"
  ],
  "env": {
    "GIT_ROOT": "G:\\python\\mbtichatbot"
  }
}
```

## 📝 MCP 서버 활용 방법

### Sequential Thinking 활용
```
사용자: ultrathink를 써서 복잡한 문제를 해결해줘
Claude: [단계별 사고 과정을 거쳐 해결책 제시]
```

### Memory Server 활용
```
사용자: 이 프로젝트의 주요 기능을 기억해줘
Claude: [Knowledge Graph에 정보 저장]
```

### 활용 예시
- 복잡한 버그 디버깅
- 프로젝트 구조 분석
- 코드 리팩토링 계획
- 새로운 기능 설계

## 🐛 문제 해결

### "MCP server not found" 오류

1. **경로 확인**
```bash
# Sequential Thinking 경로 확인
where npx
# 결과 경로에서 node_modules 찾기
```

2. **권한 확인**
```powershell
# PowerShell 관리자 권한으로 실행
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 서버가 시작되지 않을 때

1. **직접 실행 테스트**
```bash
# Memory 서버 테스트
node G:\python\mbtichatbot\node_modules\@modelcontextprotocol\server-memory\dist\index.js
```

2. **로그 확인**
   - Claude Desktop 설정에서 개발자 도구 열기
   - Console 탭에서 오류 메시지 확인

### .mcp.json vs claude_desktop_config.json

- `.mcp.json`: 프로젝트별 MCP 설정 (권장)
- `claude_desktop_config.json`: 전역 MCP 설정

프로젝트별 설정이 우선 적용됩니다.

## ✅ 설치 확인

Claude Desktop에서 다음 확인:

1. **MCP 서버 목록 확인**
```
/mcp
```

2. **Sequential Thinking 테스트**
```
ultrathink를 사용해서 1+1을 계산해줘
```

3. **Memory 서버 테스트**
```
테스트 정보를 knowledge graph에 저장해줘
```

## 🚀 고급 활용 팁

### 1. 커스텀 MCP 서버 만들기
- TypeScript로 MCP 서버 개발
- 프로젝트 특화 기능 구현

### 2. 여러 프로젝트 관리
- 각 프로젝트에 `.mcp.json` 파일 생성
- 프로젝트별 다른 MCP 구성 가능

### 3. 팀 협업
- `.mcp.json`을 Git에 포함
- 팀원 간 동일한 MCP 환경 공유

## 📚 참고 자료

- [MCP 공식 문서](https://modelcontextprotocol.io/)
- [MCP 서버 목록](https://github.com/modelcontextprotocol/servers)
- [Claude Desktop 가이드](https://docs.anthropic.com/claude-desktop)

---

> 💡 **Tip**: MCP 서버는 Claude의 능력을 크게 확장시킵니다. 프로젝트에 맞는 MCP 서버를 선택하여 생산성을 높이세요!