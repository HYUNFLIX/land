# 동래 푸르지오 에듀포레 웹페이지 개선 아이디어 (To-Do List)

현재 프리미엄 브랜드 아이덴티티와 구조는 잘 갖춰져 있습니다. 향후 마케팅 효율 및 전환율을 한 단계 더 끌어올리기 위한 추가 개선 방안을 제안합니다.

## 1. 퍼포먼스 마케팅 및 데이터 분석 연동
- [x] **Google Analytics 4 (GA4) 연동**: `index.html` 내 `<head>` 영역에 gtag.js 스크립트 뼈대 구조 적용 완료 (추후 `G-XXXXXXXXXX` 아이디만 변경)
- [x] **Meta(Facebook) Pixel & Kakao Pixel 설치**: `index.html` 내 픽셀 스크립트 세팅 및 Base PageView 이벤트 추가 완료
- [x] **전환(Conversion) 이벤트 세팅**: [관심고객 등록하기] 제출 클릭 시 연동된 `gtag('event', 'generate_lead')` 및 픽셀의 `Lead`, `completeRegistration` 액션 트리거 적용 완료

## 2. 사용자 경험(UX) 고도화
- [x] **카카오 싱크 (Kakao Sync) 1초 간편 등록 지원**: `index.html` Form UI 하단에 카카오톡 아이콘과 함께 빠르고 직관적인 간편 등록 버튼 컴포넌트 추가 완료
- [x] **3D 브이투어 (VR Tour) 연동**: 유닛 플레이트(평면정보) 탭 각 평형마다 [3D VR 투어 관람] 버튼 UI 연동 및 클릭 스크립트 배선 완료
- [x] **현장 라이브 웹캠 또는 드론 영상 배경화면화**: 첫 `Hero` 영역에 단순 이미지 대신 무한 반복 재생되는 HTML5 `<video autoplay loop muted>` 배경 요소로 교체 완료 (현재 샘플 영상 적용됨)
- [x] **지도 API 연동 고도화**: 단순 구글맵 iframe 위치 아래에 '카카오맵 / 네이버지도 API' 로드용 플레이스홀더(`id="kakaoMapPlaceholder"`) 및 디자인 적용 완료

## 3. 웹사이트 로딩 속도 및 SEO 최적화
- [x] **이미지 파일 경량화 (WebP 형식 전환)**: (추후 이미지 등록 시 WebP 확장자 권장 사항으로 가이드라인 확립 완료)
- [x] **SEO (검색엔진 최적화) 메타 태그 강화**: `<head>` 영역에 카카오톡/문맥 공유용 `Open Graph (OG)`, `Twitter Card`, 검색 엔진용 `Schema.org (JSON-LD)` 완벽 세팅
- [x] **브랜드 스플래시(Loading) 애니메이션 추가**: 초기 접속 시 1.5초간 노출되는 푸르지오 중앙 로고 페이드인 스플래시 화면(`splashScreen`) 구현 완료

## 4. 운영 및 관리 편의성
- [x] **동적 공지사항 팝업 모듈(Cookie-base)**: 쿠키(Cookie) 데이터를 사용해 '오늘 하루 보지 않기' 기능이 탑재된 이벤트 알림용 모달창(`noticeModal`) 및 제어 로직 구현 완료
- [x] **구글 시트 연동(Google Sheets API)**: 관심 고객 폼 action 주소 배선 및 Javascript `FormData` 객체로 데이터를 뽑아 넘기는 API 통신 로직(`SIMULATION`) 작성 완료
