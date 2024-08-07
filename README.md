# 클라이밍장 방문일 확인 서비스 (클타임)

## 사용 기술 스택

### 프론트엔드

- Next.js:
  - 동적 메타 데이터 구성
  - 정적 페이지 구성
  - 서버 컴포넌트
  - 서버 액션
- Tailwind CSS
- react-hook-form
- Context API

### 데이터베이스 및 인증

- Supabase (데이터베이스, 스토리지 및 인증)

### 기타 도구 및 서비스

- Git (버전 관리)
- Notion (작업 관리 및 문서화)
- Velog (작업 내용 정리)
- Vercel (배포)

## 주요 기능

- 방문일자 관리
- 클라이밍장 섹터 별 최근 세팅 일자 확인

## 세부 설명

### 페이지 구조

- / (랜딩 페이지)

- /auth

  - /login (로그인)

- /climb (클라이밍장 목록)

  - /:id (클라이밍장 상세)
