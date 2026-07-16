/* =========================================================
 * 안전제일 PPE 체크 — 데이터 정의
 * Safety First PPE Check — data definitions
 *
 * 모든 표시 문자열은 {ko, en} 쌍으로 관리합니다.
 * PPE 항목의 aiLabel은 향후 공종별 AI 안전행동(보호구 착용)
 * 감지 모델의 클래스 라벨로 사용됩니다. (README.md 참고)
 * ========================================================= */

window.APP_DATA = (function () {
  "use strict";

  /* ---------- UI 문자열 (i18n) ---------- */
  var i18n = {
    brand:        { ko: "PPE 체크", en: "PPE Check" },
    brandSub:     { ko: "툴박스 미팅 보호구 점검", en: "Toolbox meeting PPE checklist" },
    navTrades:    { ko: "공종별 점검", en: "Trades" },
    navSummary:   { ko: "요약표", en: "Summary" },
    navRecords:   { ko: "점검 기록", en: "Records" },

    heroKicker:   { ko: "오늘도 무재해", en: "Zero accidents today" },
    heroTitleA:   { ko: "작업 전 5분,", en: "Five minutes before work," },
    heroTitleB:   { ko: "보호구부터 점검합니다", en: "check your PPE first" },
    heroSub: {
      ko: "공종을 선택하면 해당 작업의 필수 보호구 체크리스트와 툴박스 미팅(TBM) 토론 포인트가 열립니다.",
      en: "Pick a trade to open its required-PPE checklist and toolbox talk discussion prompts."
    },
    heroCta:      { ko: "공종 선택하기", en: "Choose a trade" },
    heroSummaryLink: { ko: "요약표 보기", en: "View summary table" },
    heroStat: {
      ko: "{trades}개 공종 · {items}종 보호구",
      en: "{trades} trades · {items} PPE items"
    },
    safetyFirst:  { ko: "안전제일", en: "SAFETY FIRST" },

    tradesTitle:  { ko: "공종별 보호구 점검표", en: "PPE checklists by trade" },
    tradesSub: {
      ko: "우리 공종을 선택하세요. 필수 항목을 모두 확인하면 점검이 완료됩니다.",
      en: "Select your trade. The check is complete when every required item is confirmed."
    },
    cardCount:    { ko: "필수 {r} · 조건부 {c}", en: "{r} required · {c} conditional" },

    backLink:     { ko: "전체 공종", en: "All trades" },
    hazardsTitle: { ko: "주요 위험요인", en: "Key hazards" },
    talkTitle:    { ko: "TBM 토론 포인트", en: "Toolbox talk prompts" },
    talkSub: {
      ko: "작업 시작 전, 팀과 함께 소리 내어 확인하세요.",
      en: "Go through these out loud with your crew before work starts."
    },
    checklistTitle: { ko: "보호구 체크리스트", en: "PPE checklist" },
    dateLabel:    { ko: "점검일", en: "Date" },
    workerPlaceholder: { ko: "작업자 또는 팀명 (선택)", en: "Worker or crew name (optional)" },
    requiredBadge:    { ko: "필수", en: "Required" },
    conditionalBadge: { ko: "조건부", en: "Conditional" },
    progressLabel: {
      ko: "필수 보호구 {done} / {total} 확인",
      en: "Required PPE confirmed: {done} / {total}"
    },
    completeBtn:  { ko: "점검 완료", en: "Complete check" },
    completeLocked: {
      ko: "필수 보호구를 모두 확인하면 점검을 완료할 수 있습니다.",
      en: "Confirm every required item to complete the check."
    },
    completedStamp: { ko: "점검 완료", en: "CHECKED" },
    savedNote: {
      ko: "점검 기록이 저장되었습니다. 오늘도 안전 작업하세요.",
      en: "This check was saved to records. Work safe today."
    },
    newCheckBtn:  { ko: "새 점검 시작", en: "Start a new check" },
    printBtn:     { ko: "인쇄", en: "Print" },
    signLine:     { ko: "확인자 서명", en: "Supervisor signature" },

    summaryTitle: { ko: "공종별 보호구 요약표", en: "PPE summary by trade" },
    summarySub: {
      ko: "어느 공종에 어떤 보호구가 필요한지 한눈에 확인하세요. 공종명을 클릭하면 해당 체크리스트로 이동합니다.",
      en: "Every trade's PPE at a glance. Click a trade name to open its checklist."
    },
    colPpeItem:   { ko: "보호구", en: "PPE item" },
    sumTotals:    { ko: "합계", en: "Totals" },

    recordsTitle: { ko: "점검 기록", en: "Check records" },
    recordsSub: {
      ko: "이 브라우저에 저장된 점검 기록입니다. JSON으로 내보내 보관하거나 분석에 활용할 수 있습니다.",
      en: "Checks saved in this browser. Export them as JSON for record-keeping or analysis."
    },
    colTime:      { ko: "일시", en: "Time" },
    colTrade:     { ko: "공종", en: "Trade" },
    colWorker:    { ko: "작업자/팀", en: "Worker/Crew" },
    colItems:     { ko: "확인 항목", en: "Items confirmed" },
    colStatus:    { ko: "상태", en: "Status" },
    statusDone:   { ko: "완료", en: "Done" },
    exportBtn:    { ko: "JSON 내보내기", en: "Export JSON" },
    clearBtn:     { ko: "기록 비우기", en: "Clear records" },
    clearConfirm: {
      ko: "모든 점검 기록을 삭제할까요? 이 작업은 되돌릴 수 없습니다.",
      en: "Delete all check records? This cannot be undone."
    },
    emptyRecords: {
      ko: "아직 저장된 기록이 없습니다. 공종을 선택해 첫 점검을 시작하세요.",
      en: "No records yet. Pick a trade and run your first check."
    },
    notFound: {
      ko: "해당 공종을 찾을 수 없습니다.",
      en: "That trade could not be found."
    },

    footNote: {
      ko: "본 체크리스트는 「산업안전보건기준에 관한 규칙」과 KOSHA 가이드를 참고해 작성되었습니다. 현장 위험성평가 결과에 따라 항목을 조정하여 사용하세요.",
      en: "These checklists reference the Korean Occupational Safety and Health Standards and KOSHA guides. Adjust items to match your site's risk assessment."
    },
    footAi: {
      ko: "저장된 점검 데이터는 향후 공종별 AI 안전행동 감지 모델(보호구 착용 인식)의 기초 자료로 활용됩니다.",
      en: "Saved check data will feed future per-trade AI safety-behavior detection models (PPE wear recognition)."
    }
  };

  /* ---------- 보호구 분류 (신체 부위) ---------- */
  var categories = {
    head:    { ko: "머리",     en: "Head" },
    eyeface: { ko: "눈·얼굴",  en: "Eye · Face" },
    resp:    { ko: "호흡",     en: "Respiratory" },
    hearing: { ko: "청력",     en: "Hearing" },
    hand:    { ko: "손",       en: "Hands" },
    foot:    { ko: "발",       en: "Feet" },
    fall:    { ko: "추락",     en: "Fall" },
    body:    { ko: "몸·피부",  en: "Body · Skin" },
    vis:     { ko: "시인성",   en: "Visibility" }
  };

  /* ---------- 보호구 카탈로그 ----------
   * aiLabel: 향후 영상 기반 PPE 착용 감지 모델의 클래스명 */
  var ppeCatalog = {
    hard_hat: {
      cat: "head", aiLabel: "hard_hat",
      name: { ko: "안전모", en: "Hard hat" },
      desc: { ko: "낙하·비래물, 추락 위험 작업 — ABE종, 턱끈 체결", en: "Falling-object and fall hazards — Type ABE, chin strap fastened" }
    },
    safety_shoes: {
      cat: "foot", aiLabel: "safety_boots",
      name: { ko: "안전화", en: "Safety shoes" },
      desc: { ko: "선심·내답판이 있는 안전화 — 물체 낙하, 찔림 방지", en: "Steel toe cap and puncture-resistant midsole" }
    },
    rubber_boots: {
      cat: "foot", aiLabel: "rubber_boots",
      name: { ko: "내화학 장화", en: "Chemical-resistant boots" },
      desc: { ko: "습식 콘크리트·약품 접촉 작업 — 콘크리트 유입 시 즉시 세척", en: "Wet concrete and chemical contact — rinse immediately if concrete gets inside" }
    },
    insulated_shoes: {
      cat: "foot", aiLabel: "insulated_boots",
      name: { ko: "절연화", en: "Insulated boots" },
      desc: { ko: "저압 전기 작업 시 감전 방지", en: "Prevents electric shock during low-voltage work" }
    },
    safety_vest: {
      cat: "vis", aiLabel: "safety_vest",
      name: { ko: "반사 안전조끼", en: "High-visibility vest" },
      desc: { ko: "건설기계·차량 주변, 야간·우천 작업", en: "Around plant and vehicles; night or rain work" }
    },
    harness: {
      cat: "fall", aiLabel: "safety_harness",
      name: { ko: "안전대 (그네식)", en: "Full-body harness" },
      desc: { ko: "높이 2m 이상 고소작업 — 걸이(지지점) 위치 사전 확인", en: "Work at height of 2 m or more — verify anchorage points first" }
    },
    safety_glasses: {
      cat: "eyeface", aiLabel: "safety_glasses",
      name: { ko: "보안경", en: "Safety glasses" },
      desc: { ko: "비산 파편·분진으로부터 눈 보호 (밀착형 고글 포함)", en: "Protects eyes from flying debris and dust (incl. sealed goggles)" }
    },
    face_shield: {
      cat: "eyeface", aiLabel: "face_shield",
      name: { ko: "보안면", en: "Face shield" },
      desc: { ko: "연삭·파쇄 등 파편이 많은 작업 — 보안경 위에 착용", en: "Grinding and breaking work — worn over safety glasses" }
    },
    welding_mask: {
      cat: "eyeface", aiLabel: "welding_helmet",
      name: { ko: "용접면", en: "Welding helmet" },
      desc: { ko: "아크광선·불티로부터 눈과 얼굴 보호 — 차광도 확인", en: "Arc rays and spatter protection — check shade number" }
    },
    dust_mask: {
      cat: "resp", aiLabel: "dust_respirator",
      name: { ko: "방진마스크", en: "Dust respirator" },
      desc: { ko: "분진·흄 발생 작업 — 등급(특급/1급)과 밀착 상태 확인", en: "Dust and fume work — check filter class and face seal" }
    },
    gas_mask: {
      cat: "resp", aiLabel: "gas_respirator",
      name: { ko: "방독마스크", en: "Gas respirator" },
      desc: { ko: "유기용제 등 가스·증기 작업 — 정화통 유효기간 확인", en: "Organic vapors and gases — check cartridge expiry" }
    },
    ear_protection: {
      cat: "hearing", aiLabel: "ear_protection",
      name: { ko: "귀마개·귀덮개", en: "Hearing protection" },
      desc: { ko: "85dB 이상 소음 작업 (브레이커, 절단기, 항타 등)", en: "Noise at or above 85 dB (breakers, saws, piling)" }
    },
    work_gloves: {
      cat: "hand", aiLabel: "gloves",
      name: { ko: "작업용 장갑", en: "Work gloves" },
      desc: { ko: "자재 취급 시 손 보호 — 회전체 주변에서는 착용 금지", en: "Material handling — never wear near rotating tools" }
    },
    cut_gloves: {
      cat: "hand", aiLabel: "cut_resistant_gloves",
      name: { ko: "절단방지장갑", en: "Cut-resistant gloves" },
      desc: { ko: "철근·강재 등 날카로운 자재 취급", en: "Rebar, steel and sharp materials" }
    },
    welding_gloves: {
      cat: "hand", aiLabel: "welding_gloves",
      name: { ko: "용접용 가죽장갑", en: "Welding gloves" },
      desc: { ko: "불티·복사열·감전으로부터 손 보호", en: "Protects hands from spatter, heat and shock" }
    },
    insulated_gloves: {
      cat: "hand", aiLabel: "insulated_gloves",
      name: { ko: "절연장갑", en: "Insulated gloves" },
      desc: { ko: "충전부 접근·활선 작업 — 사용 전 공기 주입 손상 점검", en: "Energized work — air-test for damage before each use" }
    },
    chem_gloves: {
      cat: "hand", aiLabel: "chemical_gloves",
      name: { ko: "내화학 장갑", en: "Chemical-resistant gloves" },
      desc: { ko: "시멘트·용제·방수재 등 취급 — 피부염 예방", en: "Cement, solvents, membranes — prevents dermatitis" }
    },
    welding_apron: {
      cat: "body", aiLabel: "welding_apron",
      name: { ko: "용접 앞치마·팔덮개", en: "Leather apron & sleeves" },
      desc: { ko: "불티·복사열로부터 몸통과 팔 보호", en: "Protects torso and arms from spatter and radiant heat" }
    },
    chem_suit: {
      cat: "body", aiLabel: "chemical_suit",
      name: { ko: "화학물질용 보호복", en: "Chemical protective clothing" },
      desc: { ko: "도장 뿜칠·방수재 도포 등 유해물질 비산 작업", en: "Spray painting, membrane application and chemical splash work" }
    },
    knee_pads: {
      cat: "body", aiLabel: "knee_pads",
      name: { ko: "무릎보호대", en: "Knee pads" },
      desc: { ko: "장시간 무릎 꿇는 마감·바닥 작업", en: "Extended kneeling for finishing and floor work" }
    },
    leg_guards: {
      cat: "body", aiLabel: "leg_guards",
      name: { ko: "각반", en: "Leg guards" },
      desc: { ko: "하지 찔림·긁힘 방지, 바지 말림 방지", en: "Protects lower legs from punctures and snags" }
    }
  };

  /* ---------- 공종 정의 ----------
   * ppe[].level: "required"(필수) | "conditional"(조건부)
   * ppe[].note : 조건부 착용 조건 등 부가 설명 */
  var trades = [
    {
      id: "rebar",
      plate: "철근",
      name: { ko: "철근공", en: "Rebar Worker" },
      hazards: [
        { ko: "돌출 철근에 찔림·관통", en: "Impalement on protruding rebar" },
        { ko: "철근 다발 인양 중 낙하·전도", en: "Falling or shifting rebar bundles during hoisting" },
        { ko: "결속·절단 시 손 베임", en: "Hand cuts while tying and cutting" },
        { ko: "반복 결속 작업의 근골격계 부담", en: "Musculoskeletal strain from repetitive tying" }
      ],
      talk: [
        { ko: "오늘 작업 구역의 돌출 철근에 보호캡이 모두 씌워져 있습니까?", en: "Are protective caps fitted on every protruding bar in today's work area?" },
        { ko: "철근 인양 시 신호수가 지정되고 인양 반경 출입통제가 되어 있습니까?", en: "Is a signaler assigned and the lifting radius barricaded for rebar hoisting?" },
        { ko: "2m 이상 높이에서 결속할 때 안전대를 걸 지지점이 확보되어 있습니까?", en: "Are anchorage points available for harnesses when tying above 2 m?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "cut_gloves", level: "required" },
        { id: "safety_vest", level: "required" },
        { id: "safety_glasses", level: "conditional", note: { ko: "철근 절단·연마 시", en: "When cutting or grinding rebar" } },
        { id: "harness", level: "conditional", note: { ko: "2m 이상 고소 결속 작업 시", en: "When tying at height of 2 m or more" } },
        { id: "leg_guards", level: "conditional", note: { ko: "배근 위 보행·이동이 많은 작업 시", en: "When walking over placed rebar mats" } }
      ]
    },
    {
      id: "formwork",
      plate: "형틀",
      name: { ko: "형틀목공", en: "Formwork Carpenter" },
      hazards: [
        { ko: "개구부·슬래브 단부 추락", en: "Falls through openings and slab edges" },
        { ko: "못·타카핀 찔림", en: "Puncture wounds from nails and staples" },
        { ko: "원형톱 등 전동공구 절단", en: "Cuts from circular saws and power tools" },
        { ko: "거푸집 해체 시 자재 낙하", en: "Falling materials during form stripping" }
      ],
      talk: [
        { ko: "작업 구역의 개구부 덮개와 안전난간이 제자리에 있습니까?", en: "Are opening covers and guardrails in place across the work area?" },
        { ko: "원형톱의 방호덮개가 정상 작동하고, 밀대를 사용하고 있습니까?", en: "Do saw guards work properly, and are push sticks being used?" },
        { ko: "거푸집 해체 구간 하부에 출입통제가 되어 있습니까?", en: "Is the area below form-stripping work barricaded?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "work_gloves", level: "required" },
        { id: "safety_glasses", level: "required", note: { ko: "절단·타정 작업", en: "Sawing and nailing work" } },
        { id: "harness", level: "conditional", note: { ko: "단부·개구부 인접 및 2m 이상 작업 시", en: "Near edges/openings or at height of 2 m or more" } },
        { id: "ear_protection", level: "conditional", note: { ko: "전동공구 연속 사용 시", en: "During continuous power-tool use" } },
        { id: "dust_mask", level: "conditional", note: { ko: "목분진 다량 발생 작업 시", en: "When heavy wood dust is generated" } }
      ]
    },
    {
      id: "concrete",
      plate: "콘크",
      name: { ko: "콘크리트공", en: "Concrete Worker" },
      hazards: [
        { ko: "시멘트 접촉 피부염·화학 화상", en: "Cement dermatitis and chemical burns" },
        { ko: "타설 중 콘크리트 눈 튐 (강알칼리)", en: "Concrete splash in eyes (highly alkaline)" },
        { ko: "펌프카 호스 요동·타격", en: "Whipping pump hoses" },
        { ko: "젖은 바닥 미끄러짐", en: "Slips on wet surfaces" }
      ],
      talk: [
        { ko: "타설 전 압송 호스 고정 상태와 신호 방법을 확인했습니까?", en: "Are pump hoses secured and signals agreed before the pour?" },
        { ko: "눈·피부에 콘크리트가 닿았을 때 씻을 물이 가까이 있습니까?", en: "Is rinse water close by in case concrete touches skin or eyes?" },
        { ko: "장화 안으로 콘크리트가 들어가면 즉시 벗고 세척하기로 했습니까?", en: "Does everyone know to rinse immediately if concrete gets inside their boots?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "rubber_boots", level: "required" },
        { id: "chem_gloves", level: "required" },
        { id: "safety_glasses", level: "required", note: { ko: "고글형 권장", en: "Sealed goggles recommended" } },
        { id: "safety_vest", level: "required", note: { ko: "펌프카·레미콘 주변", en: "Around pump trucks and mixers" } },
        { id: "knee_pads", level: "conditional", note: { ko: "표면 마감 작업 시", en: "During surface finishing" } },
        { id: "ear_protection", level: "conditional", note: { ko: "바이브레이터 연속 사용 시", en: "During continuous vibrator use" } }
      ]
    },
    {
      id: "scaffold",
      plate: "비계",
      name: { ko: "비계공", en: "Scaffolder" },
      hazards: [
        { ko: "조립·해체 중 추락", en: "Falls during erection and dismantling" },
        { ko: "부재·공구 낙하", en: "Dropped components and tools" },
        { ko: "불완전 발판·가새 상태의 비계 붕괴", en: "Collapse from incomplete planks or bracing" },
        { ko: "자재 인양 중 협착", en: "Pinch points during material hoisting" }
      ],
      talk: [
        { ko: "이동 중에도 안전대 100% 체결(더블 랜야드)을 지키고 있습니까?", en: "Is everyone maintaining 100% tie-off (double lanyard) even while moving?" },
        { ko: "공구에 낙하방지끈을 걸었고, 하부 출입통제가 되어 있습니까?", en: "Are tools tethered and is the area below barricaded?" },
        { ko: "작업 전 발판·가새·벽이음 상태를 점검했습니까?", en: "Were planks, braces and wall ties inspected before work?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required", note: { ko: "턱끈 체결 필수", en: "Chin strap mandatory" } },
        { id: "harness", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "safety_vest", level: "required" },
        { id: "work_gloves", level: "required" },
        { id: "leg_guards", level: "conditional", note: { ko: "강관 취급이 많은 작업 시", en: "When handling many steel tubes" } }
      ]
    },
    {
      id: "welding",
      plate: "용접",
      name: { ko: "용접공", en: "Welder" },
      hazards: [
        { ko: "아크광선에 의한 눈 손상 (전광성 안염)", en: "Arc-eye from ultraviolet radiation" },
        { ko: "용접흄 흡입 (망간·금속 흄)", en: "Welding fume inhalation (manganese, metal fumes)" },
        { ko: "불티에 의한 화상·화재", en: "Burns and fires from spatter" },
        { ko: "홀더·케이블 손상에 의한 감전", en: "Electric shock from damaged holders and cables" }
      ],
      talk: [
        { ko: "불티 비산 방지포와 소화기가 작업 지점에 배치되어 있습니까?", en: "Are spark blankets and an extinguisher placed at the work point?" },
        { ko: "밀폐·협소 공간이라면 국소배기 또는 송기 조치가 되어 있습니까?", en: "In confined spaces, is local exhaust or supplied air in place?" },
        { ko: "홀더와 케이블 피복 손상 여부를 오늘 점검했습니까?", en: "Were holders and cable insulation inspected today?" }
      ],
      ppe: [
        { id: "welding_mask", level: "required" },
        { id: "welding_gloves", level: "required" },
        { id: "welding_apron", level: "required" },
        { id: "dust_mask", level: "required", note: { ko: "용접흄용 — 특급/1급", en: "For welding fume — high-grade filter" } },
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "safety_glasses", level: "required", note: { ko: "슬래그 제거 시 용접면 아래 착용", en: "Under the helmet when chipping slag" } },
        { id: "ear_protection", level: "conditional", note: { ko: "가우징·연삭 병행 시", en: "When gouging or grinding" } },
        { id: "face_shield", level: "conditional", note: { ko: "연삭 작업 시", en: "During grinding work" } }
      ]
    },
    {
      id: "electrical",
      plate: "전기",
      name: { ko: "전기공", en: "Electrician" },
      hazards: [
        { ko: "충전부 접촉 감전", en: "Electric shock from energized parts" },
        { ko: "아크 섬광 화상", en: "Arc-flash burns" },
        { ko: "사다리·고소 작업 추락", en: "Falls from ladders and elevated work" },
        { ko: "정전 미확인 상태 작업", en: "Working on circuits not verified de-energized" }
      ],
      talk: [
        { ko: "정전 → 검전 → 잠금·표지(LOTO) 절차를 오늘 작업에 적용했습니까?", en: "Was de-energize → test → lockout/tagout applied to today's work?" },
        { ko: "절연장갑을 공기 주입으로 손상 점검했습니까?", en: "Were insulated gloves air-tested for damage?" },
        { ko: "활선 접근 한계거리와 감시인 배치를 확인했습니까?", en: "Are approach limits and a safety watcher confirmed for live parts?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required", note: { ko: "절연 성능 AE·ABE종", en: "Insulating type AE/ABE" } },
        { id: "insulated_gloves", level: "required" },
        { id: "insulated_shoes", level: "required" },
        { id: "safety_glasses", level: "required" },
        { id: "face_shield", level: "conditional", note: { ko: "아크 위험 작업(차단기 조작 등) 시", en: "For arc-risk tasks such as switching" } },
        { id: "harness", level: "conditional", note: { ko: "2m 이상 고소 작업 시", en: "At height of 2 m or more" } }
      ]
    },
    {
      id: "plumbing",
      plate: "배관",
      name: { ko: "배관공", en: "Plumber" },
      hazards: [
        { ko: "중량 배관 취급 중 협착·요통", en: "Crush injuries and back strain from heavy pipe" },
        { ko: "피트·맨홀 등 밀폐공간 질식", en: "Asphyxiation in pits, manholes and confined spaces" },
        { ko: "토치·용접 화기 화상", en: "Burns from torches and hot work" },
        { ko: "절단면·나사산에 손 베임", en: "Cuts from pipe edges and threads" }
      ],
      talk: [
        { ko: "밀폐공간 진입 전 산소·유해가스 농도를 측정했습니까?", en: "Were oxygen and toxic-gas levels measured before confined-space entry?" },
        { ko: "일정 무게 이상 배관은 2인 운반 또는 장비 사용 기준을 지키고 있습니까?", en: "Are two-person lifts or equipment used for heavy pipe runs?" },
        { ko: "오늘 화기작업 허가서가 발급되어 있습니까?", en: "Is today's hot-work permit issued?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "work_gloves", level: "required" },
        { id: "safety_glasses", level: "required" },
        { id: "gas_mask", level: "conditional", note: { ko: "접착제 사용·밀폐공간 작업 시", en: "With solvent cements or in confined spaces" } },
        { id: "welding_gloves", level: "conditional", note: { ko: "토치 작업 시", en: "During torch work" } },
        { id: "harness", level: "conditional", note: { ko: "피트 진입·고소 작업 시", en: "For pit entry and work at height" } }
      ]
    },
    {
      id: "painting",
      plate: "도장",
      name: { ko: "도장공", en: "Painter" },
      hazards: [
        { ko: "유기용제 증기 흡입·중독", en: "Solvent vapor inhalation and poisoning" },
        { ko: "밀폐 구역 화재·폭발", en: "Fire and explosion in enclosed areas" },
        { ko: "달비계·고소 작업 추락", en: "Falls from rope-access rigs and heights" },
        { ko: "도료의 눈·피부 자극", en: "Eye and skin irritation from coatings" }
      ],
      talk: [
        { ko: "작업 구역 환기 상태와 방독마스크 정화통 교체 주기를 확인했습니까?", en: "Are ventilation and respirator cartridge change-out schedules confirmed?" },
        { ko: "주변 화기 작업이 통제되고 있습니까? (용제 증기는 폭발 위험)", en: "Is nearby hot work controlled? Solvent vapors can explode." },
        { ko: "달비계 작업 시 작업로프와 수직구명줄 2개 로프를 사용하고 있습니까?", en: "On rope-access work, are both a work rope and a separate lifeline rigged?" }
      ],
      ppe: [
        { id: "gas_mask", level: "required", note: { ko: "유기화합물용 정화통", en: "Organic-vapor cartridges" } },
        { id: "safety_glasses", level: "required", note: { ko: "고글형 권장", en: "Sealed goggles recommended" } },
        { id: "chem_gloves", level: "required" },
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "chem_suit", level: "conditional", note: { ko: "뿜칠(스프레이) 작업 시", en: "During spray application" } },
        { id: "harness", level: "conditional", note: { ko: "달비계·고소 작업 시", en: "On rope-access and elevated work" } }
      ]
    },
    {
      id: "masonry",
      plate: "조적",
      name: { ko: "조적·미장공", en: "Mason & Plasterer" },
      hazards: [
        { ko: "벽돌·석재 절단 분진 (결정형 실리카)", en: "Cutting dust containing crystalline silica" },
        { ko: "모르타르 접촉 피부염", en: "Dermatitis from mortar contact" },
        { ko: "중량물 반복 취급 근골격계 부담", en: "Musculoskeletal strain from repetitive lifting" },
        { ko: "쌓기 자재 낙하", en: "Falling stacked materials" }
      ],
      talk: [
        { ko: "절단 작업에 습식 커팅 또는 집진장치를 사용하고 있습니까?", en: "Is wet cutting or dust extraction used for masonry saws?" },
        { ko: "실리카 분진에 맞는 방진마스크 등급을 착용하고 있습니까?", en: "Are respirators rated for silica dust being worn?" },
        { ko: "모르타르가 피부에 닿지 않도록 장갑·소매 상태를 확인했습니까?", en: "Are gloves and sleeves keeping mortar off the skin?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "chem_gloves", level: "required" },
        { id: "dust_mask", level: "required", note: { ko: "절단·혼합 작업 시 특급/1급", en: "High-grade filter when cutting or mixing" } },
        { id: "safety_glasses", level: "required" },
        { id: "knee_pads", level: "conditional", note: { ko: "바닥 미장 작업 시", en: "During floor screeding" } },
        { id: "ear_protection", level: "conditional", note: { ko: "절단기 사용 시", en: "When using masonry saws" } }
      ]
    },
    {
      id: "waterproofing",
      plate: "방수",
      name: { ko: "방수공", en: "Waterproofing Worker" },
      hazards: [
        { ko: "프라이머·용제 증기 흡입", en: "Primer and solvent vapor inhalation" },
        { ko: "토치 작업 화상·화재", en: "Burns and fires from torch-applied membranes" },
        { ko: "지하·저수조 등 밀폐공간 질식", en: "Asphyxiation in basements and tanks" },
        { ko: "방수재 피부 접촉", en: "Skin contact with membranes and resins" }
      ],
      talk: [
        { ko: "밀폐공간 작업 전 환기와 가스 농도 측정을 했습니까?", en: "Were ventilation and gas measurement done before confined-space work?" },
        { ko: "토치 작업 반경에 가연물이 치워져 있고 소화기가 있습니까?", en: "Are combustibles cleared and an extinguisher present for torch work?" },
        { ko: "방독마스크 정화통이 유효기간 내에 있습니까?", en: "Are respirator cartridges within their service life?" }
      ],
      ppe: [
        { id: "gas_mask", level: "required" },
        { id: "chem_gloves", level: "required" },
        { id: "safety_glasses", level: "required" },
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "chem_suit", level: "conditional", note: { ko: "도포·뿜칠 작업 시", en: "During coating and spray work" } },
        { id: "welding_gloves", level: "conditional", note: { ko: "토치 작업 시", en: "During torch work" } },
        { id: "knee_pads", level: "conditional", note: { ko: "바닥 시공 시", en: "During floor application" } }
      ]
    },
    {
      id: "demolition",
      plate: "해체",
      name: { ko: "해체공", en: "Demolition Worker" },
      hazards: [
        { ko: "구조물 예기치 못한 붕괴", en: "Unexpected structural collapse" },
        { ko: "석면 등 유해 분진", en: "Hazardous dust including asbestos" },
        { ko: "파편 비산", en: "Flying debris" },
        { ko: "브레이커 등 고소음·진동", en: "High noise and vibration from breakers" }
      ],
      talk: [
        { ko: "오늘 해체 순서와 구조 검토 결과를 전원이 공유했습니까?", en: "Has everyone reviewed today's demolition sequence and structural assessment?" },
        { ko: "석면 사전조사 결과를 확인했습니까?", en: "Were asbestos survey results checked?" },
        { ko: "분진 억제를 위한 살수 계획이 준비되어 있습니까?", en: "Is water spraying planned for dust suppression?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "dust_mask", level: "required" },
        { id: "ear_protection", level: "required" },
        { id: "safety_glasses", level: "required" },
        { id: "cut_gloves", level: "required" },
        { id: "safety_vest", level: "required" },
        { id: "face_shield", level: "conditional", note: { ko: "브레이커·파쇄 작업 시", en: "During breaker and crushing work" } },
        { id: "harness", level: "conditional", note: { ko: "단부·개구부 인접 작업 시", en: "Near edges and openings" } }
      ]
    },
    {
      id: "equipment",
      plate: "장비",
      name: { ko: "건설기계 운전원", en: "Equipment Operator" },
      hazards: [
        { ko: "하차 후 장비 주변 협착·충돌", en: "Struck-by and crush hazards around machines" },
        { ko: "연약지반·경사면 장비 전도", en: "Overturns on soft ground and slopes" },
        { ko: "사각지대 근로자 접촉", en: "Contact with workers in blind spots" },
        { ko: "승하차 중 미끄러짐·낙상", en: "Slips and falls when mounting/dismounting" }
      ],
      talk: [
        { ko: "작업 전 일상점검(제동·경보·후방카메라)을 마쳤습니까?", en: "Is the daily walk-around done (brakes, alarms, rear camera)?" },
        { ko: "신호수와 수신호·무전 방법을 통일했습니까?", en: "Are hand signals and radio channels agreed with the signaler?" },
        { ko: "승하차 시 3점 지지를 지키고 있습니까?", en: "Is three-point contact used when mounting and dismounting?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required", note: { ko: "장비에서 내릴 때 항상 착용", en: "Always on when off the machine" } },
        { id: "safety_shoes", level: "required" },
        { id: "safety_vest", level: "required" },
        { id: "ear_protection", level: "conditional", note: { ko: "고소음 장비 운전 시", en: "When operating loud machines" } },
        { id: "work_gloves", level: "conditional", note: { ko: "점검·정비 시", en: "During checks and maintenance" } }
      ]
    },
    {
      id: "flagger",
      plate: "신호",
      name: { ko: "신호수·유도원", en: "Signaler & Flagger" },
      hazards: [
        { ko: "차량·건설기계 충돌", en: "Struck by vehicles and construction plant" },
        { ko: "야간·우천 시 시인성 저하", en: "Reduced visibility at night and in rain" },
        { ko: "후진 장비 경보 미인지", en: "Missed reversing alarms" },
        { ko: "장시간 서서 근무하는 피로", en: "Fatigue from prolonged standing" }
      ],
      talk: [
        { ko: "운전원과 수신호·무전 채널을 사전에 맞췄습니까?", en: "Were hand signals and radio channels agreed with operators beforehand?" },
        { ko: "비상시 대피할 안전 구역을 정해 두었습니까?", en: "Is an escape route and safe zone identified?" },
        { ko: "야간 작업용 경광봉·반사 장구가 정상 작동합니까?", en: "Do light batons and reflective gear work for night duty?" }
      ],
      ppe: [
        { id: "safety_vest", level: "required", note: { ko: "고휘도 반사 — 야간엔 반사 성능 확인", en: "High-visibility class — check reflectivity for night work" } },
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "work_gloves", level: "conditional", note: { ko: "동절기·자재 정리 병행 시", en: "In winter or when also handling materials" } },
        { id: "ear_protection", level: "conditional", note: { ko: "고소음 구간 배치 시 — 경보음 청취 가능 여부 확인", en: "In high-noise zones — confirm alarms stay audible" } }
      ]
    },
    {
      id: "steel",
      plate: "철골",
      name: { ko: "철골공", en: "Steel Erector" },
      hazards: [
        { ko: "고소 철골 위 이동 중 추락", en: "Falls while moving on steel members at height" },
        { ko: "부재 인양 중 낙하·협착", en: "Dropped or swinging members during hoisting" },
        { ko: "볼트·공구 낙하", en: "Falling bolts and tools" },
        { ko: "강풍 등 악천후 고소작업", en: "Wind and weather hazards aloft" }
      ],
      talk: [
        { ko: "이동 구간 전체에 안전대 걸이시설(생명줄)이 설치되어 있습니까?", en: "Are lifelines installed along the entire travel route?" },
        { ko: "풍속 기준(순간풍속 초과 시 작업 중지)을 확인했습니까?", en: "Was the wind-speed stop limit checked before starting?" },
        { ko: "인양 부재 하부 출입통제와 유도 로프를 사용하고 있습니까?", en: "Is the area below hoisting barricaded and are tag lines used?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required", note: { ko: "턱끈 체결 필수", en: "Chin strap mandatory" } },
        { id: "harness", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "work_gloves", level: "required" },
        { id: "safety_vest", level: "required" },
        { id: "safety_glasses", level: "conditional", note: { ko: "드릴링·볼팅 작업 시", en: "When drilling and bolting" } }
      ]
    },
    {
      id: "earthwork",
      plate: "토공",
      name: { ko: "토공·굴착공", en: "Earthwork & Excavation Worker" },
      hazards: [
        { ko: "굴착면 붕괴에 의한 매몰", en: "Burial from trench and slope collapse" },
        { ko: "굴착기 등 장비 접촉", en: "Struck by excavators and plant" },
        { ko: "지하 매설물(가스·전기) 파손", en: "Striking buried gas and power lines" },
        { ko: "분진·소음", en: "Dust and noise" }
      ],
      talk: [
        { ko: "굴착 깊이에 맞는 기울기 또는 흙막이 지보공이 되어 있습니까?", en: "Is the excavation sloped or shored for its depth?" },
        { ko: "장비 선회 반경에 근로자가 접근하지 않도록 신호수가 있습니까?", en: "Is a spotter keeping workers out of the swing radius?" },
        { ko: "지하 매설물 탐사 결과를 전원이 확인했습니까?", en: "Were utility scan results reviewed with the crew?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "safety_vest", level: "required" },
        { id: "work_gloves", level: "required" },
        { id: "dust_mask", level: "conditional", note: { ko: "건조기 분진 다량 발생 시", en: "When heavy dust is generated in dry conditions" } },
        { id: "ear_protection", level: "conditional", note: { ko: "브레이커·항타 작업 인접 시", en: "Near breakers and piling work" } }
      ]
    },
    {
      id: "carpentry",
      plate: "목공",
      name: { ko: "내장목공", en: "Interior Carpenter" },
      hazards: [
        { ko: "원형톱·타카 등 공구 상해", en: "Tool injuries from saws and nailers" },
        { ko: "목분진 흡입", en: "Wood dust inhalation" },
        { ko: "전동공구 소음", en: "Noise from power tools" },
        { ko: "자재 운반 중 요통", en: "Back strain from carrying materials" }
      ],
      talk: [
        { ko: "톱 방호덮개와 타카 안전장치가 정상 작동합니까?", en: "Are saw guards and nailer safeties working properly?" },
        { ko: "절단 작업 구역에 집진·환기가 되어 있습니까?", en: "Is dust collection or ventilation set up at cutting stations?" },
        { ko: "날·비트 교체 시 전원을 분리하고 있습니까?", en: "Is power disconnected before changing blades and bits?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "safety_glasses", level: "required" },
        { id: "work_gloves", level: "required" },
        { id: "dust_mask", level: "conditional", note: { ko: "절단·연마 작업 시", en: "When cutting or sanding" } },
        { id: "ear_protection", level: "conditional", note: { ko: "전동공구 연속 사용 시", en: "During continuous power-tool use" } }
      ]
    },
    {
      id: "tile",
      plate: "타일",
      name: { ko: "타일공", en: "Tiler" },
      hazards: [
        { ko: "타일 절단 분진(실리카)·파편", en: "Silica dust and shards when cutting tile" },
        { ko: "접착제·시멘트 피부 접촉", en: "Skin contact with adhesives and cement" },
        { ko: "장시간 무릎 꿇는 작업", en: "Prolonged kneeling" },
        { ko: "젖은 바닥 미끄러짐", en: "Slips on wet floors" }
      ],
      talk: [
        { ko: "습식 절단기 또는 집진장치를 사용하고 있습니까?", en: "Is a wet saw or dust extraction used for cutting?" },
        { ko: "본드·접착제 사용 구역이 환기되고 있습니까?", en: "Is the adhesive work area ventilated?" },
        { ko: "무릎보호대를 착용하고 주기적으로 자세를 바꾸고 있습니까?", en: "Are knee pads worn and postures rotated regularly?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "chem_gloves", level: "required" },
        { id: "knee_pads", level: "required" },
        { id: "safety_glasses", level: "required", note: { ko: "절단 작업 시", en: "When cutting" } },
        { id: "dust_mask", level: "conditional", note: { ko: "건식 절단 시", en: "During dry cutting" } },
        { id: "gas_mask", level: "conditional", note: { ko: "본드 다량 사용·밀폐 구역", en: "Heavy adhesive use in enclosed areas" } }
      ]
    },
    {
      id: "stone",
      plate: "석공",
      name: { ko: "석공", en: "Stone Mason" },
      hazards: [
        { ko: "석재 절단·연마 분진(결정형 실리카)", en: "Crystalline silica from cutting and grinding stone" },
        { ko: "중량 석재 취급 협착·요통", en: "Crush injuries and strain from heavy stone" },
        { ko: "파편 비산", en: "Flying fragments" },
        { ko: "고소음", en: "High noise" }
      ],
      talk: [
        { ko: "습식 공법 또는 집진장치로 분진을 억제하고 있습니까?", en: "Is dust suppressed with wet methods or extraction?" },
        { ko: "석재 인양·운반 장비와 신호 방법을 확인했습니까?", en: "Are lifting gear and signals confirmed for stone handling?" },
        { ko: "방진마스크 밀착 상태를 오늘 점검했습니까?", en: "Was respirator fit checked today?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "dust_mask", level: "required" },
        { id: "safety_glasses", level: "required" },
        { id: "cut_gloves", level: "required" },
        { id: "ear_protection", level: "required" },
        { id: "face_shield", level: "conditional", note: { ko: "연마·연삭 작업 시", en: "During grinding and polishing" } },
        { id: "knee_pads", level: "conditional", note: { ko: "바닥 석재 시공 시", en: "During floor stone installation" } }
      ]
    },
    {
      id: "wallpaper",
      plate: "도배",
      name: { ko: "도배공", en: "Wallpaperer" },
      hazards: [
        { ko: "사다리·우마 위 작업 중 낙상", en: "Falls from ladders and low work platforms" },
        { ko: "퍼티 연마 분진", en: "Dust from sanding filler" },
        { ko: "접착제 증기", en: "Adhesive vapors" },
        { ko: "천장 반복 작업 어깨·목 부담", en: "Shoulder and neck strain from overhead work" }
      ],
      talk: [
        { ko: "우마·사다리 상태와 사용 기준(2인 1조 등)을 확인했습니까?", en: "Are platforms and ladders inspected and used within the rules?" },
        { ko: "퍼티 연마 시 방진마스크를 착용하고 있습니까?", en: "Are dust masks worn when sanding filler?" },
        { ko: "밀폐된 방은 환기하면서 작업하고 있습니까?", en: "Are closed rooms ventilated during work?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "dust_mask", level: "conditional", note: { ko: "퍼티 연마 작업 시", en: "When sanding filler" } },
        { id: "safety_glasses", level: "conditional", note: { ko: "천장·연마 작업 시", en: "For ceiling and sanding work" } },
        { id: "work_gloves", level: "conditional", note: { ko: "칼날 작업 시 베임 주의", en: "Watch for blade cuts" } }
      ]
    },
    {
      id: "glazing",
      plate: "창호",
      name: { ko: "창호·유리공", en: "Window & Glass Installer" },
      hazards: [
        { ko: "유리 파손에 의한 베임", en: "Cuts from broken glass" },
        { ko: "개구부·외부 창호 설치 중 추락", en: "Falls installing at openings and facades" },
        { ko: "중량 유리 취급 협착", en: "Crush injuries from heavy glass units" },
        { ko: "흡착기 탈락에 의한 낙하", en: "Dropped panes from suction-cup failure" }
      ],
      talk: [
        { ko: "흡착기(석션컵) 흡착력을 사용 전에 확인했습니까?", en: "Are suction cups checked for grip before each lift?" },
        { ko: "개구부 주변에 안전대 체결 지점이 확보되어 있습니까?", en: "Are tie-off points available near openings?" },
        { ko: "파손 유리를 즉시 수거하고 전용 폐기함을 사용합니까?", en: "Is broken glass collected immediately into a dedicated bin?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "cut_gloves", level: "required" },
        { id: "safety_glasses", level: "required" },
        { id: "harness", level: "conditional", note: { ko: "개구부·외벽 설치 작업 시", en: "When installing at openings and facades" } },
        { id: "leg_guards", level: "conditional", note: { ko: "대형 판유리 운반 시", en: "When carrying large panes" } }
      ]
    },
    {
      id: "hvac",
      plate: "설비",
      name: { ko: "설비·덕트공", en: "HVAC & Mechanical Installer" },
      hazards: [
        { ko: "판금 모서리 베임", en: "Cuts from sheet-metal edges" },
        { ko: "사다리·천장 내부 고소 작업 추락", en: "Falls from ladders and ceiling-void work" },
        { ko: "중량 장비 인양·설치 협착", en: "Crush injuries during equipment rigging" },
        { ko: "용접·브레이징 화상", en: "Burns from welding and brazing" }
      ],
      talk: [
        { ko: "천장 내부·샤프트 작업의 발판이 안전합니까?", en: "Are work platforms safe for ceiling-void and shaft work?" },
        { ko: "판금 취급 시 절단방지장갑을 착용하고 있습니까?", en: "Are cut-resistant gloves worn for sheet metal?" },
        { ko: "화기 작업 허가서와 소화기를 확인했습니까?", en: "Hot-work permit and extinguisher confirmed?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "cut_gloves", level: "required" },
        { id: "safety_glasses", level: "required" },
        { id: "harness", level: "conditional", note: { ko: "고소·천장 내부 작업 시", en: "For elevated and ceiling-void work" } },
        { id: "welding_gloves", level: "conditional", note: { ko: "브레이징·용접 시", en: "When brazing or welding" } },
        { id: "ear_protection", level: "conditional", note: { ko: "전동공구 연속 사용 시", en: "During continuous power-tool use" } }
      ]
    },
    {
      id: "insulation",
      plate: "보온",
      name: { ko: "보온공", en: "Insulation Worker" },
      hazards: [
        { ko: "미네랄울·유리섬유 피부·호흡기 자극", en: "Skin and respiratory irritation from mineral wool and fiberglass" },
        { ko: "배관 사이 협소공간 작업", en: "Work in tight spaces between services" },
        { ko: "접착제 증기", en: "Adhesive vapors" },
        { ko: "고온 배관 접촉 화상", en: "Burns from hot pipework" }
      ],
      talk: [
        { ko: "섬유 분진을 차단할 긴소매 보호복을 착용했습니까?", en: "Are long-sleeve coveralls worn against fiber dust?" },
        { ko: "절단 작업 시 방진마스크를 착용하고 있습니까?", en: "Are respirators worn when cutting insulation?" },
        { ko: "고온 배관 구간이 사전에 표시되어 있습니까?", en: "Are hot lines identified and marked before work?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "dust_mask", level: "required" },
        { id: "safety_glasses", level: "required", note: { ko: "고글형 권장", en: "Sealed goggles recommended" } },
        { id: "work_gloves", level: "required" },
        { id: "chem_suit", level: "conditional", note: { ko: "섬유 분진 차단용 보호복", en: "Coveralls against fiber dust" } },
        { id: "gas_mask", level: "conditional", note: { ko: "접착제 다량 사용 시", en: "With heavy adhesive use" } }
      ]
    },
    {
      id: "paving",
      plate: "포장",
      name: { ko: "포장공", en: "Paving Worker" },
      hazards: [
        { ko: "고온 아스팔트 화상·흄", en: "Burns and fumes from hot asphalt" },
        { ko: "롤러·피니셔 등 장비 협착", en: "Caught by rollers and pavers" },
        { ko: "공용도로 차량 충돌", en: "Struck by traffic on live roads" },
        { ko: "폭염·복사열 온열질환", en: "Heat illness from radiant heat" }
      ],
      talk: [
        { ko: "차량 통제 시설(콘·표지판·신호수)이 규정대로 설치되어 있습니까?", en: "Is traffic control (cones, signs, flaggers) set up to standard?" },
        { ko: "고온 아스팔트 취급 시 장갑과 긴옷을 착용합니까?", en: "Are gloves and long clothing worn for hot mix?" },
        { ko: "물·그늘·휴식 주기를 정했습니까?", en: "Are water, shade and rest cycles agreed?" }
      ],
      ppe: [
        { id: "safety_vest", level: "required", note: { ko: "고휘도 반사", en: "High-visibility class" } },
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "work_gloves", level: "required", note: { ko: "고온 아스팔트 — 내열성 확인", en: "Hot asphalt — check heat resistance" } },
        { id: "dust_mask", level: "conditional", note: { ko: "아스팔트 흄 다량 발생 시", en: "When asphalt fumes are heavy" } },
        { id: "ear_protection", level: "conditional", note: { ko: "장비 인접 작업 시", en: "When working next to plant" } }
      ]
    },
    {
      id: "rope_access",
      plate: "달비",
      name: { ko: "달비계공", en: "Rope Access Worker" },
      hazards: [
        { ko: "로프 파단·풀림에 의한 추락", en: "Falls from rope failure or detachment" },
        { ko: "수직구명줄 미사용 작업", en: "Working without an independent lifeline" },
        { ko: "모서리 로프 마모·손상", en: "Rope abrasion and damage at edges" },
        { ko: "공구 낙하", en: "Falling tools" }
      ],
      talk: [
        { ko: "작업로프와 수직구명줄을 각각 별도의 지지점에 걸었습니까?", en: "Are the work rope and lifeline anchored to separate points?" },
        { ko: "모서리 로프 보호대와 로프 상태를 점검했습니까?", en: "Are edge protectors fitted and rope condition checked?" },
        { ko: "지상 감시인이 배치되어 있고 하부 출입이 통제됩니까?", en: "Is a ground watcher posted and the area below controlled?" }
      ],
      ppe: [
        { id: "harness", level: "required", note: { ko: "그네식 + 추락방지대(코브라) 체결", en: "Full-body harness with rope grab on the lifeline" } },
        { id: "hard_hat", level: "required", note: { ko: "턱끈 체결 필수", en: "Chin strap mandatory" } },
        { id: "safety_shoes", level: "required" },
        { id: "work_gloves", level: "required" },
        { id: "safety_glasses", level: "conditional", note: { ko: "외벽 연마·세척 작업 시", en: "When grinding or washing facades" } }
      ]
    },
    {
      id: "laborer",
      plate: "인부",
      name: { ko: "보통인부", en: "General Laborer" },
      hazards: [
        { ko: "자재 운반 중 요통·협착", en: "Strains and pinch points carrying materials" },
        { ko: "상부 작업 구간 낙하물", en: "Falling objects from work above" },
        { ko: "장비·차량 접촉", en: "Contact with plant and vehicles" },
        { ko: "정리정돈 불량에 의한 전도", en: "Trips from poor housekeeping" }
      ],
      talk: [
        { ko: "중량물은 2인 이상 또는 운반기구를 사용하기로 했습니까?", en: "Two-person lifts or handling aids agreed for heavy loads?" },
        { ko: "이동 통로와 장비 작업 구역이 구분되어 있습니까?", en: "Are walkways separated from equipment zones?" },
        { ko: "오늘 작업 구역의 위험 요소를 전원이 공유했습니까?", en: "Were today's area hazards shared with everyone?" }
      ],
      ppe: [
        { id: "hard_hat", level: "required" },
        { id: "safety_shoes", level: "required" },
        { id: "safety_vest", level: "required" },
        { id: "work_gloves", level: "required" },
        { id: "dust_mask", level: "conditional", note: { ko: "분진 작업 보조 시", en: "When assisting dusty work" } },
        { id: "safety_glasses", level: "conditional", note: { ko: "파편 비산 작업 인접 시", en: "Near work with flying debris" } }
      ]
    }
  ];

  return { i18n: i18n, categories: categories, ppeCatalog: ppeCatalog, trades: trades };
})();
