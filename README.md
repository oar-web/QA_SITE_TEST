
# 🚀 QA-Nexus: 통합 품질 관리 시스템

QA-Nexus는 4개 주요 제품군의 릴리즈와 이슈를 한눈에 관리하고, Google Gemini AI를 활용해 릴리즈 노트를 자동 생성하는 스마트 QA 협업 플랫폼입니다.

## ✨ 주요 기능
- **통합 대시보드**: 4대 핵심 제품(CoreX, Nexus, Cloud, Mobile)의 최신 버전 및 이슈 현황 실시간 시각화
- **AI 릴리즈 요약**: Gemini API를 사용하여 수많은 이슈 리스트를 전문가급 릴리즈 노트로 자동 변환
- **이슈 추적 시스템**: 필드 이슈, 내부 테스트, 고객 요구사항을 우선순위별로 관리
- **문서 보관함**: 테스트 계획서 및 매뉴얼 등 품질 산출물의 버전 관리 및 아카이빙

## 🛠 기술 스택
- **Frontend**: React, TypeScript, Tailwind CSS
- **Visualization**: Recharts
- **AI**: Google Gemini API (@google/genai)
- **Environment**: ESM based development

## 🚀 시작하기

1. **저장소 복제**
   ```bash
   git clone https://github.com/사용자이름/qa-nexus.git
   ```

2. **API 키 설정**
   이 프로젝트는 Gemini API를 사용합니다. 실행 환경의 환경 변수로 `API_KEY`를 설정해야 합니다.

3. **실행**
   별도의 빌드 과정 없이 현대적인 브라우저에서 `index.html`을 실행하거나 로컬 서버(Live Server 등)를 통해 확인할 수 있습니다.

## 📄 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.
