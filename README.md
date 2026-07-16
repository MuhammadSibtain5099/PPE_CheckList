# 안전제일 PPE 체크 (Safety First PPE Check)

공종별 보호구(PPE) 체크리스트 + 툴박스 미팅(TBM) 웹사이트.
미국 [CPWR Toolbox Talks](https://www.cpwr.com/research/research-to-practice-r2p/r2p-library/toolbox-talks/)를 참고하되, **주제별이 아닌 공종별(trade-by-trade)** 로 구성했습니다.

A trade-by-trade PPE checklist and toolbox-meeting website, inspired by CPWR Toolbox Talks.
Korean-first with a one-click English toggle.

## 실행 방법 (How to run)

빌드 과정이 없는 정적 사이트입니다. 두 가지 방법 중 하나로 실행하세요.

```
# 1) 파일로 바로 열기 — index.html 더블클릭

# 2) 로컬 서버 (권장)
cd f:\ContilCompany\Projects\CPWR
python -m http.server 8000
# → http://localhost:8000
```

서버 없이 `index.html`을 직접 열어도 모든 기능(체크리스트, 기록, 내보내기)이 동작합니다.
데이터는 전부 `js/data.js`에 있으며 네트워크 요청이 없습니다(웹폰트 제외 — 오프라인에서는 시스템 글꼴로 대체).

## 주요 기능 (Features)

- **25개 공종** — 철근공, 형틀목공, 콘크리트공, 비계공, 용접공, 전기공, 배관공, 도장공, 조적·미장공, 방수공, 해체공, 건설기계 운전원, 신호수·유도원, 철골공, 토공·굴착공, 내장목공, 타일공, 석공, 도배공, 창호·유리공, 설비·덕트공, 보온공, 포장공, 달비계공, 보통인부
- **좌측 공종 사이드바** — 공종 페이지에서 왼쪽 목록으로 다른 공종을 바로 전환, 공종별 체크 상태는 이동해도 유지
- **요약표(#/summary)** — 전체 공종 × 보호구 매트릭스 (● 필수 / ○ 조건부), 공종명 클릭 시 해당 체크리스트로 이동
- **공종별 체크리스트** — 필수(required) / 조건부(conditional) 보호구 구분, 필수 항목을 모두 확인해야 점검 완료
- **TBM 토론 포인트** — CPWR 방식의 작업 전 토론 질문 3개 + 주요 위험요인
- **한국어 기본 / 영어 전환** — 우측 상단 KO/EN 토글, 선택은 브라우저에 저장
- **점검 기록** — 완료된 점검은 브라우저(localStorage)에 저장, JSON 내보내기 지원
- **인쇄** — 공종 페이지에서 인쇄 버튼 → 서명란이 포함된 종이 점검표 출력

## 파일 구조 (Structure)

```
CPWR/
├── index.html        # 앱 셸 (헤더, 언어 토글, 푸터)
├── css/style.css     # 스타일 (안전표지판 디자인 시스템)
├── js/data.js        # ★ 모든 콘텐츠: i18n 문자열, 보호구 카탈로그, 공종 정의
├── js/app.js         # 해시 라우터, 렌더링, 체크리스트/기록 로직
└── README.md
```

## 데이터 모델 (Data model)

콘텐츠 수정·추가는 `js/data.js`만 편집하면 됩니다.

### 보호구 카탈로그 (`ppeCatalog`)

```js
hard_hat: {
  cat: "head",              // 신체 부위 분류 (categories 참조)
  aiLabel: "hard_hat",      // ★ AI 감지 모델 클래스 라벨
  name: { ko: "안전모", en: "Hard hat" },
  desc: { ko: "...", en: "..." }
}
```

### 공종 (`trades`)

```js
{
  id: "welding",
  plate: "용접",             // 카드에 표시되는 표지판 글자
  name: { ko: "용접공", en: "Welder" },
  hazards: [ { ko, en }, ... ],   // 주요 위험요인
  talk:    [ { ko, en }, ... ],   // TBM 토론 질문
  ppe: [
    { id: "welding_mask", level: "required" },
    { id: "ear_protection", level: "conditional",
      note: { ko: "가우징·연삭 병행 시", en: "When gouging or grinding" } }
  ]
}
```

새 공종 추가 = `trades` 배열에 항목 1개 추가. 화면·라우팅·기록은 자동 반영됩니다.

### 점검 기록 (localStorage → JSON 내보내기)

```json
{
  "id": "chk_1752633600000",
  "ts": "2026-07-16T08:00:00.000Z",
  "tradeId": "welding",
  "trade": { "ko": "용접공", "en": "Welder" },
  "worker": "3반 김OO",
  "checkedItems": ["welding_mask", "welding_gloves", "..."],
  "checkedAiLabels": ["welding_helmet", "welding_gloves", "..."],
  "requiredDone": 7,
  "requiredTotal": 7,
  "itemsTotal": 9
}
```

## AI 로드맵 (AI roadmap)

이 사이트의 데이터 구조는 향후 **공종별 안전행동(보호구 착용) 감지 모델**을 전제로 설계되었습니다.

1. **클래스 정의** — `ppeCatalog`의 `aiLabel`이 감지 모델의 클래스 집합입니다
   (`hard_hat`, `safety_vest`, `safety_harness`, `welding_helmet`, `dust_respirator` 등 20종).
2. **공종별 요구 매핑** — `trades[].ppe`가 "이 공종에서 반드시 감지되어야 할 라벨 목록"입니다.
   예: 영상에서 작업자의 공종이 `welding`이면 `welding_helmet` 미감지 시 경고.
3. **학습 데이터 연계** — 점검 기록의 `checkedAiLabels`는 현장별 착용 실태의 기초 통계가 되고,
   CCTV/엣지 디바이스 감지 결과와 대조하여 모델 검증(ground truth 대비)에 사용할 수 있습니다.
4. **엣지 배포 (예시)** — YOLO 계열 PPE 감지 모델 → ONNX 변환 → 엣지 디바이스(예: DeepX NPU, Triton Inference Server) 배포 →
   감지 결과를 이 사이트의 기록 포맷과 동일한 JSON으로 수집.

## 콘텐츠 출처 (Content basis)

- 「산업안전보건기준에 관한 규칙」 제32조(보호구의 지급 등)
- KOSHA 안전보건 가이드 및 TBM(작업 전 안전점검회의) 실천 가이드
- CPWR Toolbox Talks의 토론형 구성 방식

> 실제 현장 적용 시, 현장 위험성평가 결과에 따라 항목을 조정하세요.
