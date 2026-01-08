
import { Question, QuestionType } from './types';

export const QUESTIONS: Question[] = [
  // Day 1: Mindset & Role
  {
    id: 1, day: 1, type: QuestionType.SCENARIO, title: "Day 01: PM의 마인드셋",
    context: "신기능 배포 후 지표 변화가 미비하자 경영진이 '개발 리소스 낭비'라며 질책합니다.",
    question: "이때 PM의 가장 적절한 대응은 무엇입니까?",
    choices: [
      { id: 1, text: "실패를 인정하고 즉시 기능을 롤백(Rollback)한다." },
      { id: 2, text: "개발팀의 노고를 강조하며 배포한 코드의 품질을 증명한다." },
      { id: 3, text: "가설과 실제 결과의 간극을 분석하고, 학습한 내용을 바탕으로 다음 이터레이션을 제안한다." },
      { id: 4, text: "마케팅팀에 홍보 부족을 원인으로 돌려 책임을 회피한다." }
    ],
    correctAnswerId: 3, explanation: "PM은 가설 검증의 관점에서 실패를 학습의 기회로 전환하고 다음 방향성을 제시할 책임이 있습니다."
  },
  {
    id: 2, day: 1, type: QuestionType.MULTIPLE_CHOICE, title: "Day 01: Product-Market Fit",
    question: "PMF(Product-Market Fit)를 찾았음을 시사하는 가장 강력한 정성적 신호는?",
    choices: [
      { id: 1, text: "앱스토어 평점이 4.5점 이상을 기록함" },
      { id: 2, text: "사용자들이 서비스 중단 시 매우 실망할 것이라고 답변함 (Sean Ellis Test 40% 이상)" },
      { id: 3, text: "유명 벤처캐피털로부터 대규모 투자를 유치함" },
      { id: 4, text: "경쟁사 대비 낮은 고객 획득 비용(CAC)을 달성함" }
    ],
    correctAnswerId: 2, explanation: "사용자가 서비스가 없어졌을 때의 실망감을 느끼는 정도는 PMF의 핵심 지표 중 하나입니다."
  },
  {
    id: 3, day: 1, type: QuestionType.SCENARIO, title: "Day 01: 스테이크홀더 관리",
    question: "디자인팀이 UX 원칙을 강조하며 일정 연기를 요청할 때, PM이 취해야 할 '트레이드 오프' 관점의 태도는?",
    choices: [
      { id: 1, text: "무조건 디자이너의 의견을 따라 품질을 최우선한다." },
      { id: 2, text: "출시 연기로 인한 기회 비용과 품질 향상으로 인한 기대 수익을 비교하여 결정한다." },
      { id: 3, text: "디자인 무시하고 강제로 개발을 진행시킨다." },
      { id: 4, text: "디자이너에게 밤을 새워서라도 일정을 맞추라고 요구한다." }
    ],
    correctAnswerId: 2, explanation: "PM은 비즈니스 목표, 시간, 품질 사이에서 데이터 기반의 의사결정을 내려야 합니다."
  },
  // Day 2: Market & Strategy
  {
    id: 4, day: 2, type: QuestionType.MULTIPLE_CHOICE, title: "Day 02: 시장 규모 추정",
    question: "스타트업이 투자자에게 '우리가 당장 장악할 수 있는 시장'으로 제시해야 하는 개념은?",
    choices: [
      { id: 1, text: "TAM (전체 시장)" },
      { id: 2, text: "SAM (유효 시장)" },
      { id: 3, text: "SOM (수익 시장)" },
      { id: 4, text: "GDP (국내총생산)" }
    ],
    correctAnswerId: 3, explanation: "SOM은 제품이 현실적으로 즉시 점유 가능한 구체적인 시장 규모를 뜻합니다."
  },
  {
    id: 5, day: 2, type: QuestionType.SCENARIO, title: "Day 02: 경쟁 분석",
    question: "시장 지배적 사업자가 있는 레드오션에 진입할 때 PM이 가장 먼저 찾아야 할 것은?",
    choices: [
      { id: 1, text: "더 저렴한 가격 정책" },
      { id: 2, text: "기존 사업자가 해결해주지 못하는 특정 타겟의 '언멧 니즈(Unmet Needs)'" },
      { id: 3, text: "더 화려한 마케팅 캠페인" },
      { id: 4, text: "경쟁사와 완전히 동일한 기능 세트" }
    ],
    correctAnswerId: 2, explanation: "틈새 시장(Niche)의 미충족 수요를 찾는 것이 초기 진입 전략의 핵심입니다."
  },
  // Day 3: User Research
  {
    id: 6, day: 3, type: QuestionType.MULTIPLE_CHOICE, title: "Day 03: The Mom Test",
    question: "사용자 인터뷰 시 가장 경계해야 할 질문 유형은?",
    choices: [
      { id: 1, text: "구체적인 과거 사례를 묻는 질문" },
      { id: 2, text: "미래의 행동 의향을 묻는 가설적 질문" },
      { id: 3, text: "현재의 해결 방식을 묻는 질문" },
      { id: 4, text: "불편함을 느낀 맥락을 묻는 질문" }
    ],
    correctAnswerId: 2, explanation: "사람들은 미래의 자신에 대해 긍정적으로 거짓말하는 경향이 있습니다."
  },
  {
    id: 7, day: 3, type: QuestionType.SCENARIO, title: "Day 03: JTBD 이론",
    question: "밀크쉐이크를 사는 고객의 'Job'이 '지루한 출근길을 달래줄 간식'이라면, 이 제품의 진짜 경쟁자는?",
    choices: [
      { id: 1, text: "다른 브랜드의 밀크쉐이크" },
      { id: 2, text: "베이글이나 바나나 같은 다른 아침 식사 대용품" },
      { id: 3, text: "아침 라디오 방송이나 팟캐스트" },
      { id: 4, text: "햄버거" }
    ],
    correctAnswerId: 2, explanation: "JTBD는 고객이 제품을 '고용'하는 목적에 집중하며, 같은 목적을 수행하는 모든 것이 경쟁자입니다."
  },
  // Day 4: Problem Definition
  {
    id: 8, day: 4, type: QuestionType.MULTIPLE_CHOICE, title: "Day 04: 문제 정의",
    question: "문제 정의 시 가장 위험한 함정은?",
    choices: [
      { id: 1, text: "문제를 너무 좁게 정의하는 것" },
      { id: 2, text: "해결책(Solution)을 이미 정해두고 역으로 문제를 정의하는 것" },
      { id: 3, text: "데이터를 기반으로 현상을 파악하는 것" },
      { id: 4, text: "여러 번의 'Why'를 묻는 것" }
    ],
    correctAnswerId: 2, explanation: "해결책 편향(Solution Bias)은 진짜 문제의 본질을 가립니다."
  },
  {
    id: 9, day: 4, type: QuestionType.SCENARIO, title: "Day 04: 5 Whys",
    question: "사용자 이탈률이 높다는 현상에 대해 5 Whys를 적용할 때 최종 목적지는 무엇이어야 합니까?",
    choices: [
      { id: 1, text: "서버 속도가 느리다는 기술적 문제" },
      { id: 2, text: "비즈니스 모델 자체가 사용 가치를 주지 못한다는 근본적 원인" },
      { id: 3, text: "마케팅 예산이 부족하다는 운영적 문제" },
      { id: 4, text: "버튼 색깔이 마음에 들지 않는다는 디자인 문제" }
    ],
    correctAnswerId: 2, explanation: "근본 원인(Root Cause)을 찾아내어 시스템적/전략적 해결을 도모해야 합니다."
  },
  // Day 5: Solution & MVP
  {
    id: 10, day: 5, type: QuestionType.MULTIPLE_CHOICE, title: "Day 05: MVP 정의",
    question: "MVP(Minimum Viable Product)의 가장 중요한 목적은?",
    choices: [
      { id: 1, text: "최소한의 비용으로 최대한 많은 기능을 만드는 것" },
      { id: 2, text: "완성도 높은 제품으로 시장 점유율을 확보하는 것" },
      { id: 3, text: "가장 핵심적인 가설을 검증하기 위한 최소한의 학습 도구" },
      { id: 4, text: "개발팀의 속도를 테스트하는 것" }
    ],
    correctAnswerId: 3, explanation: "MVP는 빌드가 아니라 '학습'을 위한 수단입니다."
  },
  {
    id: 11, day: 5, type: QuestionType.SCENARIO, title: "Day 05: Wizard of Oz",
    question: "자동 AI 추천 기능을 만들고 싶지만 기술이 부족할 때, PM이 수동으로 추천해주는 방식의 이름은?",
    choices: [
      { id: 1, text: "Concierge MVP" },
      { id: 2, text: "Wizard of Oz MVP" },
      { id: 3, text: "Landing Page MVP" },
      { id: 4, text: "Fake Door MVP" }
    ],
    correctAnswerId: 2, explanation: "사용자는 자동이라 믿지만 뒤에서 사람이 수동 처리하는 방식입니다."
  },
  {
    id: 12, day: 5, type: QuestionType.MULTIPLE_CHOICE, title: "Day 05: RICE 스코어",
    question: "RICE 우선순위 모델에서 'E'가 의미하는 것은?",
    choices: [
      { id: 1, text: "Effectiveness (효과성)" },
      { id: 2, text: "Efficiency (효율성)" },
      { id: 3, text: "Effort (개발 노력/리소스)" },
      { id: 4, text: "Engagement (참여도)" }
    ],
    correctAnswerId: 3, explanation: "Effort는 기능을 구현하는 데 필요한 시간과 자원을 의미하며, 점수를 나눌 때 분모가 됩니다."
  },
  // Day 6: Metrics & Data
  {
    id: 13, day: 6, type: QuestionType.MULTIPLE_CHOICE, title: "Day 06: 북극성 지표",
    question: "북극성 지표(North Star Metric)가 갖춰야 할 필수 조건이 아닌 것은?",
    choices: [
      { id: 1, text: "고객이 얻는 가치를 반영해야 함" },
      { id: 2, text: "회사의 매출과 직결되어야 함" },
      { id: 3, text: "선행 지표(Leading Indicator) 성격이 있어야 함" },
      { id: 4, text: "광고 수익 같은 허상 지표여야 함" }
    ],
    correctAnswerId: 4, explanation: "허상 지표는 성장을 가늠하기에 부적절합니다."
  },
  {
    id: 14, day: 6, type: QuestionType.SCENARIO, title: "Day 06: 코호트 분석",
    question: "이번 달 가입자의 리텐션이 지난달보다 낮아졌을 때, PM이 가장 먼저 해야 할 분석은?",
    choices: [
      { id: 1, text: "단순히 평균 리텐션을 확인한다." },
      { id: 2, text: "유입 경로별, 행동 특성별로 코호트를 쪼개어 어디서 이탈이 발생하는지 확인한다." },
      { id: 3, text: "광고 예산을 두 배로 늘린다." },
      { id: 4, text: "전체 사용자에게 설문 조사를 보낸다." }
    ],
    correctAnswerId: 2, explanation: "데이터를 세분화(Segmentation)해야 진짜 원인이 보입니다."
  },
  {
    id: 15, day: 6, type: QuestionType.MULTIPLE_CHOICE, title: "Day 06: AARRR",
    question: "사용자가 서비스의 핵심 가치를 느끼는 순간인 'Aha Moment'는 AARRR의 어느 단계와 밀접합니까?",
    choices: [
      { id: 1, text: "Acquisition (획득)" },
      { id: 2, text: "Activation (활성화)" },
      { id: 3, text: "Retention (유지)" },
      { id: 4, text: "Revenue (매출)" }
    ],
    correctAnswerId: 2, explanation: "활성화 단계에서 사용자는 제품의 가치를 경험해야 합니다."
  },
  // Day 7: Retrospective & Execution
  {
    id: 16, day: 7, type: QuestionType.MULTIPLE_CHOICE, title: "Day 07: KPT 회고",
    question: "KPT 회고 중 'Problem'을 다룰 때 가장 중요한 원칙은?",
    choices: [
      { id: 1, text: "잘못한 사람을 명확히 찾아내어 비판한다." },
      { id: 2, text: "문제의 현상을 나열하고, 그에 대한 Try(시도)를 도출한다." },
      { id: 3, text: "감정적인 서운함을 토로하는 데 집중한다." },
      { id: 4, text: "문제가 없었다면 그냥 넘어간다." }
    ],
    correctAnswerId: 2, explanation: "비난보다는 해결책 지향적인 태도가 회고의 핵심입니다."
  },
  // 추가 고난도 문항 (17-30)
  {
    id: 17, day: 4, type: QuestionType.SCENARIO, title: "비즈니스 전략",
    question: "네트워크 효과를 가진 플랫폼에서 초기 사용자를 확보하기 위한 '닭과 달걀' 문제 해결책으로 부적절한 것은?",
    choices: [
      { id: 1, text: "공급자(한쪽 사이드)에게 먼저 보조금을 지급함" },
      { id: 2, text: "단일 사용자에게도 가치를 주는 도구(Single-user mode)를 제공함" },
      { id: 3, text: "양쪽 사이드에 동시에 엄청난 광고비를 쏟아부음" },
      { id: 4, text: "좁은 특정 지역/카테고리에서 먼저 밀도를 확보함" }
    ],
    correctAnswerId: 3, explanation: "동시 대량 마케팅은 효율이 매우 낮으며, 대개 한쪽을 먼저 공략하는 것이 정석입니다."
  },
  {
    id: 18, day: 6, type: QuestionType.MULTIPLE_CHOICE, title: "데이터 해석",
    question: "A/B 테스트 결과가 통계적으로 유의미(P-value < 0.05)하게 나왔을 때의 의미는?",
    choices: [
      { id: 1, text: "이 결과는 100% 진실이며 무조건 적용해야 한다." },
      { id: 2, text: "이 결과가 우연히 일어났을 확률이 5% 미만임을 의미한다." },
      { id: 3, text: "사용자의 95%가 새로운 기능을 좋아한다는 뜻이다." },
      { id: 4, text: "비즈니스 수익이 5% 상승할 것이라는 뜻이다." }
    ],
    correctAnswerId: 2, explanation: "통계적 유의성은 실험 결과의 신뢰도를 나타냅니다."
  },
  {
    id: 19, day: 5, type: QuestionType.SCENARIO, title: "로드맵 관리",
    question: "긴급한 버그 수정과 중요한 신기능 개발이 충돌할 때 PM의 판단 기준은?",
    choices: [
      { id: 1, text: "개발팀이 더 하고 싶어 하는 것을 먼저 한다." },
      { id: 2, text: "고객의 핵심 경험 저해 여부와 비즈니스 손실 규모를 비교한다." },
      { id: 3, text: "무조건 선착순으로 처리한다." },
      { id: 4, text: "대표님이 시키는 것을 먼저 한다." }
    ],
    correctAnswerId: 2, explanation: "임팩트와 리스크 중심의 우선순위 결정이 필요합니다."
  },
  {
    id: 20, day: 1, type: QuestionType.MULTIPLE_CHOICE, title: "PM의 역할",
    question: "마티 케이건(Marty Cagan)이 말한 '제품 혁신'의 4가지 리스크에 포함되지 않는 것은?",
    choices: [
      { id: 1, text: "가치 리스크 (사용자가 살 것인가?)" },
      { id: 2, text: "사용성 리스크 (어떻게 쓰는지 알 것인가?)" },
      { id: 3, text: "브랜드 리스크 (로고가 예쁜가?)" },
      { id: 4, text: "사업 실현 가능성 리스크 (우리 사업에 도움이 되는가?)" }
    ],
    correctAnswerId: 3, explanation: "4대 리스크는 Value, Usability, Feasibility, Business Viability입니다."
  },
  {
    id: 21, day: 2, type: QuestionType.SCENARIO, title: "전략적 사고",
    question: "우리 서비스가 '전환 비용(Switching Cost)'을 높이기 위해 할 수 있는 전략은?",
    choices: [
      { id: 1, text: "탈퇴 버튼을 숨긴다." },
      { id: 2, text: "사용자의 데이터와 활동 이력이 축적되어 떠나기 아깝게 만든다." },
      { id: 3, text: "가격을 시중보다 훨씬 비싸게 책정한다." },
      { id: 4, text: "광고를 많이 보여준다." }
    ],
    correctAnswerId: 2, explanation: "데이터 축적은 강력한 해자(Moat)가 됩니다."
  },
  {
    id: 22, day: 3, type: QuestionType.MULTIPLE_CHOICE, title: "정성 조사",
    question: "포커스 그룹 인터뷰(FGI)의 가장 큰 단점은?",
    choices: [
      { id: 1, text: "시간이 너무 오래 걸린다." },
      { id: 2, text: "집단 사고(Groupthink)나 목소리 큰 사람에게 동조되는 경향이 발생한다." },
      { id: 3, text: "비용이 저렴하다." },
      { id: 4, text: "데이터가 너무 객관적이다." }
    ],
    correctAnswerId: 2, explanation: "FGI는 다수의 의견이 하나로 수렴되는 편향이 생기기 쉽습니다."
  },
  {
    id: 23, day: 4, type: QuestionType.SCENARIO, title: "가설 설정",
    question: "좋은 가설의 조건으로 가장 적절한 문장은?",
    choices: [
      { id: 1, text: "이 기능을 만들면 사용자가 좋아할 것이다." },
      { id: 2, text: "[특정 행동]을 하면 [지표]가 [얼마만큼] 변할 것이며, 이는 [이유] 때문이다." },
      { id: 3, text: "우리는 최고의 경험을 제공해야 한다." },
      { id: 4, text: "매출이 작년보다 2배 늘어날 것이다." }
    ],
    correctAnswerId: 2, explanation: "가설은 구체적이고 측정 가능하며 논리적이어야 합니다."
  },
  {
    id: 24, day: 5, type: QuestionType.MULTIPLE_CHOICE, title: "우선순위",
    question: "Kano 모델에서 '반드시 있어야 하지만(Must-be), 잘한다고 만족도가 비례해서 오르지 않는' 품질은?",
    choices: [
      { id: 1, text: "매력적 품질 (Attractive)" },
      { id: 2, text: "일차원적 품질 (One-dimensional)" },
      { id: 3, text: "당연적 품질 (Must-be)" },
      { id: 4, text: "무관심 품질 (Indifferent)" }
    ],
    correctAnswerId: 3, explanation: "당연적 품질은 없으면 큰 불만을 사지만, 있어도 당연하게 여겨집니다."
  },
  {
    id: 25, day: 6, type: QuestionType.SCENARIO, title: "지표 관리",
    question: "LTV(고객 생애 가치)를 높이기 위한 방법으로 적절하지 않은 것은?",
    choices: [
      { id: 1, text: "이탈률(Churn Rate)을 낮춘다." },
      { id: 2, text: "평균 주문 금액(AOV)을 높인다." },
      { id: 3, text: "신규 가입자 획득 비용(CAC)을 높인다." },
      { id: 4, text: "구매 빈도를 높인다." }
    ],
    correctAnswerId: 3, explanation: "CAC가 높아지면 LTV 대비 수익성이 악화됩니다."
  },
  {
    id: 26, day: 1, type: QuestionType.MULTIPLE_CHOICE, title: "기획 역량",
    question: "PRD(제품 요구사항 정의서)에 반드시 포함되어야 할 내용이 아닌 것은?",
    choices: [
      { id: 1, text: "문제를 해결하려는 이유와 비즈니스 가치" },
      { id: 2, text: "사용자 시나리오와 기능 상세" },
      { id: 3, text: "성공을 측정할 핵심 지표" },
      { id: 4, text: "개발자의 상세 소스 코드 주석" }
    ],
    correctAnswerId: 4, explanation: "PRD는 '무엇을, 왜' 만드는지에 집중합니다."
  },
  {
    id: 27, day: 2, type: QuestionType.SCENARIO, title: "시장 대응",
    question: "경쟁사가 우리와 똑같은 기능을 반값에 출시했을 때 PM의 전략은?",
    choices: [
      { id: 1, text: "똑같이 가격을 반으로 내린다." },
      { id: 2, text: "우리의 핵심 차별화 요소와 가치 제안(Value Prop)을 재점검하고 고도화한다." },
      { id: 3, text: "경쟁사 기능을 비방하는 광고를 낸다." },
      { id: 4, text: "서비스를 종료한다." }
    ],
    correctAnswerId: 2, explanation: "가격 경쟁은 출혈 경쟁으로 이어지기 쉽습니다. 가치 방어가 우선입니다."
  },
  {
    id: 28, day: 3, type: QuestionType.MULTIPLE_CHOICE, title: "정량 조사",
    question: "데이터 분석 시 '상관관계'와 '인과관계'를 혼동할 때 발생하는 오류는?",
    choices: [
      { id: 1, text: "아무런 문제가 없다." },
      { id: 2, text: "원인이 아닌 것에 리소스를 투입하여 성과를 내지 못함" },
      { id: 3, text: "데이터가 더 정확해짐" },
      { id: 4, text: "보고서가 예뻐짐" }
    ],
    correctAnswerId: 2, explanation: "상관관계는 단순한 동행 현상일 수 있습니다. 인과관계를 찾아야 액션이 유효합니다."
  },
  {
    id: 29, day: 4, type: QuestionType.SCENARIO, title: "커뮤니케이션",
    question: "개발팀이 기술 부채(Technical Debt) 해결을 위해 신기능 개발 중단을 요청할 때 PM의 대응은?",
    choices: [
      { id: 1, text: "기술 부채는 무시하고 기능만 만든다." },
      { id: 2, text: "기술 부채 방치가 미래의 개발 속도와 안정성에 줄 리스크를 파악하고 일정을 조율한다." },
      { id: 3, text: "개발팀을 전원 교체한다." },
      { id: 4, text: "무조건 개발팀 말을 듣고 모든 개발을 멈춘다." }
    ],
    correctAnswerId: 2, explanation: "지속 가능한 제품 성장을 위해 기술 부채 관리는 필수입니다."
  },
  {
    id: 30, day: 7, type: QuestionType.MULTIPLE_CHOICE, title: "성장 마인드",
    question: "PM으로서 가장 경계해야 할 태도는?",
    choices: [
      { id: 1, text: "내가 만든 제품이 틀릴 수 있다고 생각하는 태도" },
      { id: 2, text: "내 직관이 데이터보다 항상 옳다고 믿는 태도" },
      { id: 3, text: "개발자와 디자이너의 의견을 경청하는 태도" },
      { id: 4, text: "실패에서 배우려는 태도" }
    ],
    correctAnswerId: 2, explanation: "확증 편향과 과도한 자신감은 PM의 객관적 판단을 방해합니다."
  }
];
