
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// --- TYPES & CONSTANTS ---
const QUESTIONS = [
  { id: 1, title: "PM Mindset", context: "배포 직후 핵심 지표가 하락했습니다.", question: "가장 먼저 취해야 할 액션은?", choices: [{id:1, text:"즉시 롤백 결정"},{id:2, text:"로그와 유입 경로 세분화 분석"},{id:3, text:"개발팀에 원인 추궁"},{id:4, text:"대표님께 사과 보고"}], correctAnswerId: 2, explanation: "현상 파악을 위한 데이터 세분화가 의사결정의 첫 단추입니다." },
  { id: 2, title: "Product-Market Fit", question: "PMF 달성을 판단하는 가장 객관적인 지표는?", choices: [{id:1, text:"유료 결제자 수"},{id:2, text:"리텐션 커브의 평탄화(Flattening)"},{id:3, text:"앱스토어 1위 달성"},{id:4, text:"바이럴 계수 1.0 이상"}], correctAnswerId: 2, explanation: "지속 가능한 가치를 제공하고 있다면 리텐션 커브가 일정 수준에서 유지됩니다." },
  { id: 3, title: "Stakeholder Management", question: "디자인팀과 일정 합의가 안 될 때 PM의 역할은?", choices: [{id:1, text:"디자인 퀄리티 무시"},{id:2, text:"트레이드오프 기준 제시 및 우선순위 조정"},{id:3, text:"강압적 지시"},{id:4, text:"결정 미루기"}], correctAnswerId: 2, explanation: "PM은 가용 자원 내에서 최선의 비즈니스 가치를 조율하는 협상가여야 합니다." },
  { id: 4, title: "Market Size", question: "당장 점유 가능한 구체적인 시장 규모는?", choices: [{id:1, text:"TAM"},{id:2, text:"SAM"},{id:3, text:"SOM"},{id:4, text:"Market Share"}], correctAnswerId: 3, explanation: "SOM은 수익 창출이 가능한 실질적 타겟 시장입니다." },
  { id: 5, title: "Market Analysis", question: "레드오션 진입 시 가장 유효한 전략은?", choices: [{id:1, text:"치킨 게임"},{id:2, text:"언멧 니즈(Unmet Needs) 발굴"},{id:3, text:"카피캣 기능 구현"},{id:4, text:"전방위적 마케팅"}], correctAnswerId: 2, explanation: "기존 강자가 해결하지 못한 틈새 문제를 찾는 것이 승산이 높습니다." },
  { id: 6, title: "The Mom Test", question: "인터뷰 시 반드시 피해야 할 나쁜 질문은?", choices: [{id:1, text:"이런 기능이 있으면 쓰실 건가요?"},{id:2, text:"최근에 이 문제를 어떻게 해결하셨나요?"},{id:3, text:"왜 그렇게 행동하셨나요?"},{id:4, text:"해결을 위해 얼마를 지불하셨나요?"}], correctAnswerId: 1, explanation: "미래 의향을 묻는 질문은 사용자의 거짓 긍정을 유발합니다." },
  { id: 7, title: "JTBD Theory", question: "고객이 제품을 구매하는 진짜 '목적'을 의미하는 개념은?", choices: [{id:1, text:"User Story"},{id:2, text:"Jobs to be Done"},{id:3, text:"Customer Journey"},{id:4, text:"Personas"}], correctAnswerId: 2, explanation: "고객은 제품이 아니라 자신의 문제를 해결해 줄 '솔루션'을 고용합니다." },
  { id: 8, title: "Problem Definition", question: "문제 정의 시 가장 먼저 고려해야 할 요소는?", choices: [{id:1, text:"구현 가능성"},{id:2, text:"비즈니스 임팩트와 문제의 본질"},{id:3, text:"디자인 심미성"},{id:4, text:"경쟁사 동향"}], correctAnswerId: 2, explanation: "진짜 문제를 푸는 것이 PM 역량의 핵심입니다." },
  { id: 9, title: "Root Cause Analysis", question: "문제의 근본 원인을 찾기 위한 반복 질문 기법은?", choices: [{id:1, text:"SWOT"},{id:2, text:"5 Whys"},{id:3, text:"MECE"},{id:4, text:"PEST"}], correctAnswerId: 2, explanation: "Why를 반복하여 표면적 현상 뒤의 본질을 밝혀냅니다." },
  { id: 10, title: "MVP Strategy", question: "MVP의 핵심 철학으로 가장 적절한 것은?", choices: [{id:1, text:"싸고 빠르게 만들기"},{id:2, text:"핵심 가설을 검증하기 위한 최소한의 도구"},{id:3, text:"반쪽짜리 완성품"},{id:4, text:"기능 나열형 제품"}], correctAnswerId: 2, explanation: "MVP는 '빌드'가 목적이 아니라 '학습'이 목적입니다." },
  { id: 11, title: "Concierge MVP", question: "수동으로 서비스를 제공하며 가치를 먼저 검증하는 방식은?", choices: [{id:1, text:"Wizard of Oz"},{id:2, text:"Concierge"},{id:3, text:"Fake Door"},{id:4, text:"Landing Page"}], correctAnswerId: 2, explanation: "기술 구현 없이 수동으로 프로세스를 돌려보며 고객 반응을 봅니다." },
  { id: 12, title: "Prioritization", question: "RICE 점수 계산법에서 리소스는 어디에 위치하는가?", choices: [{id:1, text:"분자"},{id:2, text:"분모"},{id:3, text:"지수"},{id:4, text:"상수"}], correctAnswerId: 2, explanation: "노력(Effort) 대비 가치를 측정하기 위해 분모에 놓습니다." },
  { id: 13, title: "Metric Selection", question: "좋은 북극성 지표(North Star Metric)의 특징은?", choices: [{id:1, text:"매출액 그 자체"},{id:2, text:"고객 가치와 비즈니스 성장의 연결"},{id:3, text:"단순 조회수"},{id:4, text:"개발팀 생산성"}], correctAnswerId: 2, explanation: "고객이 성공할 때 회사도 성장하는 지점을 지표화해야 합니다." },
  { id: 14, title: "Data Analysis", question: "특정 행동을 한 그룹의 리텐션을 비교하는 분석은?", choices: [{id:1, text:"깔때기 분석"},{id:2, text:"코호트 분석"},{id:3, text:"A/B 테스트"},{id:4, text:"회귀 분석"}], correctAnswerId: 2, explanation: "시간이나 속성별 그룹(코호트)의 유지율 변화를 추적합니다." },
  { id: 15, title: "AARRR Framework", question: "제품의 'Aha Moment'를 경험하는 단계는?", choices: [{id:1, text:"Acquisition"},{id:2, text:"Activation"},{id:3, text:"Retention"},{id:4, text:"Referral"}], correctAnswerId: 2, explanation: "활성화 단계에서 사용자는 서비스의 진짜 가치를 발견합니다." },
  { id: 16, title: "Team Retrospective", question: "KPT 회고 중 'Problem'을 다루는 올바른 태도는?", choices: [{id:1, text:"책임자 추궁"},{id:2, text:"현상 파악 및 Try 도출"},{id:3, text:"문제 덮기"},{id:4, text:"감정적 비난"}], correctAnswerId: 2, explanation: "비난이 아닌 시스템적 개선을 위한 논의가 되어야 합니다." },
  { id: 17, title: "Network Effect", question: "초기 플랫폼의 콜드 스타트 문제를 해결하는 법으로 틀린 것은?", choices: [{id:1, text:"단일 가치 제공"},{id:2, text:"한쪽 사이드 집중 보조"},{id:3, text:"무차별 대량 광고"},{id:4, text:"좁은 시장의 밀도 확보"}], correctAnswerId: 3, explanation: "네트워크 효과는 밀도가 중요하며 단순 광고로는 임계점을 넘기 힘듭니다." },
  { id: 18, title: "A/B Testing", question: "A/B 테스트 결과의 통계적 유의성이 낮다면 PM은?", choices: [{id:1, text:"무조건 B안 채택"},{id:2, text:"실험 기간 연장 또는 가설 재정립"},{id:3, text:"데이터 조작"},{id:4, text:"실험 폐기"}], correctAnswerId: 2, explanation: "신뢰할 수 없는 결과에 기반한 의사결정은 위험합니다." },
  { id: 19, title: "Priority Conflict", question: "긴급 버그와 로드맵 기능 중 선택 기준은?", choices: [{id:1, text:"무조건 버그 우선"},{id:2, text:"고객 경험 저해 수준과 비즈니스 손실 비교"},{id:3, text:"선착순"},{id:4, text:"대표님 지시"}], correctAnswerId: 2, explanation: "임팩트 기반의 합리적 트레이드오프가 PM의 실력입니다." },
  { id: 20, title: "Product Risk", question: "4대 제품 리스크(마티 케이건)가 아닌 것은?", choices: [{id:1, text:"가치 리스크"},{id:2, text:"사용성 리스크"},{id:3, text:"브랜드 리스크"},{id:4, text:"사업 실현 가능성 리스크"}], correctAnswerId: 3, explanation: "가치, 사용성, 타당성, 비즈니스 실현 가능성이 핵심입니다." },
  { id: 21, title: "Lock-in Strategy", question: "가장 강력한 전환 비용(Switching Cost)은?", choices: [{id:1, text:"위약금 지불"},{id:2, text:"데이터 및 개인화된 경험 축적"},{id:3, text:"탈퇴 절차 복잡화"},{id:4, text:"독점 공급"}], correctAnswerId: 2, explanation: "사용자가 제품에 쌓아온 시간과 데이터가 가장 큰 락인 효과를 냅니다." },
  { id: 22, title: "User Interview", question: "인터뷰 대상자 선정 시 가장 유의미한 그룹은?", choices: [{id:1, text:"잠재 고객 전체"},{id:2, text:"문제를 해결하기 위해 이미 대안을 쓰고 있는 사람"},{id:3, text:"지인 및 가족"},{id:4, text:"무관심 층"}], correctAnswerId: 2, explanation: "문제를 절실히 느끼는 '익스트림 유저'에게서 진짜 통찰이 나옵니다." },
  { id: 23, title: "Hypothesis", question: "좋은 가설의 필수 조건은?", choices: [{id:1, text:"긍정적인 전망"},{id:2, text:"측정 가능하고 명확한 인과관계"},{id:3, text:"복잡한 논리 구조"},{id:4, text:"누구도 반박할 수 없는 사실"}], correctAnswerId: 2, explanation: "가설은 실험을 통해 증명하거나 기각할 수 있어야 합니다." },
  { id: 24, title: "Kano Model", question: "있어도 만족도가 비례해 늘지 않지만, 없으면 불만이 폭주하는 것은?", choices: [{id:1, text:"매력적 품질"},{id:2, text:"당연적 품질"},{id:3, text:"일차원적 품질"},{id:4, text:"무관심 품질"}], correctAnswerId: 2, explanation: "당연적(Must-be) 품질은 기본기에 해당합니다." },
  { id: 25, title: "LTV/CAC", question: "지속 가능한 사업을 위해 LTV/CAC 비율은 보통 얼마 이상이어야 하는가?", choices: [{id:1, text:"1배"},{id:2, text:"3배 이상"},{id:3, text:"0.5배"},{id:4, text:"무한대"}], correctAnswerId: 2, explanation: "통상 3배 이상일 때 건전한 성장이 가능한 비즈니스로 봅니다." },
  { id: 26, title: "PRD Structure", question: "PRD에 코드 구현 상세가 포함되지 않는 이유는?", choices: [{id:1, text:"PM이 몰라서"},{id:2, text:"Why와 What에 집중하기 위해"},{id:3, text:"문서가 길어져서"},{id:4, text:"비밀 유지"}], correctAnswerId: 2, explanation: "How는 엔지니어링의 영역이며, PM은 문제 정의와 목적에 집중해야 합니다." },
  { id: 27, title: "Value Proposition", question: "가장 차별화된 가격 우위 전략을 뜻하는 용어는?", choices: [{id:1, text:"Cost Leadership"},{id:2, text:"Value Prop"},{id:3, text:"Differential Prop"},{id:4, text:"Core Competency"}], correctAnswerId: 1, explanation: "비용 리더십은 경쟁사보다 효율적인 구조로 낮은 가격을 제공하는 전략입니다." },
  { id: 28, title: "Correlation vs Causation", question: "데이터 해석 시 가장 흔한 실수는?", choices: [{id:1, text:"상관관계를 인과관계로 착각"},{id:2, text:"샘플 수 부족"},{id:3, text:"평균값의 함정 무시"},{id:4, text:"그래프 오인"}], correctAnswerId: 1, explanation: "두 지표가 같이 움직인다고 해서 하나가 다른 하나의 원인은 아닙니다." },
  { id: 29, title: "Technical Debt", question: "기술 부채에 대한 PM의 태도는?", choices: [{id:1, text:"전면 무시"},{id:2, text:"장기적 속도와 리스크를 고려한 상환 관리"},{id:3, text:"즉시 코드 전면 수정 지시"},{id:4, text:"엔지니어 탓"}], correctAnswerId: 2, explanation: "부채는 관리의 대상이며 적절한 시점에 해결해야 무너지지 않습니다." },
  { id: 30, title: "Growth Mindset", question: "PM의 가장 강력한 무기는?", choices: [{id:1, text:"자신의 직관에 대한 확신"},{id:2, text:"가설이 틀릴 수 있다는 유연함과 학습 의지"},{id:3, text:"말솜씨"},{id:4, text:"학벌"}], correctAnswerId: 2, explanation: "끊임없이 가설을 세우고 시장에서 배우는 자세가 성장을 만듭니다." }
];

// --- COMPONENTS ---
const ProgressBar = ({ current, total }: { current: number, total: number }) => (
  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-8">
    <div 
      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out" 
      style={{ width: `${(current / total) * 100}%` }} 
    />
  </div>
);

function App() {
  const [mode, setMode] = useState<'START' | 'QUIZ' | 'RESULT'>('START');
  const [limit, setLimit] = useState(10);
  const [idx, setIdx] = useState(0);
  const [quizSet, setQuizSet] = useState(QUESTIONS.slice(0, 10));
  const [history, setHistory] = useState<{ isCorrect: boolean }[]>([]);
  const [selId, setSelId] = useState<number | null>(null);
  const [showExp, setShowExp] = useState(false);

  const init = () => {
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, limit);
    setQuizSet(shuffled);
    setMode('QUIZ');
    setIdx(0);
    setHistory([]);
    setSelId(null);
    setShowExp(false);
  };

  const handleAnswer = (id: number) => { setSelId(id); setShowExp(true); };

  const handleNext = () => {
    const isCorrect = selId === quizSet[idx].correctAnswerId;
    setHistory([...history, { isCorrect }]);
    if (idx === quizSet.length - 1) setMode('RESULT');
    else { setIdx(idx + 1); setSelId(null); setShowExp(false); }
  };

  if (mode === 'START') return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 animate-slide-in">
      <div className="mb-4 px-4 py-1 glass rounded-full text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase">Executive Challenge</div>
      <h1 className="text-6xl md:text-8xl font-black mb-8 gradient-text tracking-tighter">PM MASTERY</h1>
      <p className="text-slate-400 text-center max-w-md mb-12 leading-relaxed font-medium">
        가설 검증부터 비즈니스 전략까지,<br/>시니어 PM의 사고 체계를 체득하는 실전 챌린지.
      </p>
      
      <div className="w-full max-w-sm glass p-8 rounded-3xl mb-12 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Question Count</span>
          <span className="text-white font-black text-2xl">{limit}</span>
        </div>
        <input 
          type="range" 
          min="10" 
          max="30" 
          step="1" 
          value={limit} 
          onChange={e => setLimit(parseInt(e.target.value))} 
          className="mb-4" 
        />
        <div className="flex justify-between text-[10px] text-slate-600 font-bold">
          <span>10</span>
          <span>20</span>
          <span>30</span>
        </div>
      </div>

      <button 
        onClick={init} 
        className="w-full max-w-sm py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xl font-black transition-all shadow-2xl active:scale-95"
      >
        챌린지 시작하기
      </button>
    </div>
  );

  if (mode === 'RESULT') {
    const correctCount = history.filter(h => h.isCorrect).length;
    const pct = Math.round((correctCount / quizSet.length) * 100);
    
    let levelMessage = "기본기가 탄탄하시네요. 실전 역량을 더 쌓아보세요.";
    if (pct >= 90) levelMessage = "준비된 시니어 PM입니다. 통찰력이 매우 훌륭합니다.";
    else if (pct >= 70) levelMessage = "전략적인 사고가 돋보입니다. 세부 지표 분석을 더 보완해보세요.";
    else if (pct < 50) levelMessage = "기초 개념부터 차근차근 다시 복습해보는 것을 추천합니다.";

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 animate-slide-in">
        <h2 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Challenge Result</h2>
        <div className="text-9xl font-black gradient-text mb-8">{pct}%</div>
        <div className="w-full max-w-lg glass p-8 rounded-3xl mb-10 text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
          <div>
            <h4 className="text-indigo-400 font-bold text-xs mb-4 uppercase flex items-center gap-2 tracking-widest">Performance Report</h4>
            <div className="space-y-4">
              <div className="flex justify-between text-slate-400 text-sm font-bold">
                <span>정답 문항</span>
                <span className="text-white">{correctCount} / {quizSet.length}</span>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <p className="text-slate-200 text-lg leading-relaxed font-semibold">{levelMessage}</p>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setMode('START')} 
          className="w-full max-w-sm py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold border border-slate-700 transition-all"
        >
          다시 도전하기
        </button>
      </div>
    );
  }

  const q = quizSet[idx];
  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto flex flex-col animate-slide-in">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Challenge Phase</h3>
          <div className="text-4xl font-black tabular-nums">{idx + 1}<span className="text-slate-700 text-xl"> / {quizSet.length}</span></div>
        </div>
        <button onClick={() => setMode('START')} className="p-3 bg-slate-800/50 text-slate-500 hover:text-white rounded-xl border border-slate-700">EXIT</button>
      </header>

      <ProgressBar current={idx + 1} total={quizSet.length} />

      <div className="glass p-8 rounded-3xl shadow-2xl flex-grow flex flex-col">
        <div className="mb-6"><span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-500/20">{q.title}</span></div>
        {q.context && <p className="text-slate-400 text-sm mb-4 leading-relaxed bg-slate-800/40 p-4 rounded-2xl italic border-l-4 border-indigo-500/50">"{q.context}"</p>}
        <h2 className="text-2xl md:text-3xl font-black mb-10 leading-tight">{q.question}</h2>
        
        <div className="space-y-4 mb-8">
          {q.choices.map((c, i) => {
            const isSel = selId === c.id;
            const isCor = showExp && c.id === q.correctAnswerId;
            const isWrng = showExp && isSel && c.id !== q.correctAnswerId;
            let style = "border-slate-800 bg-slate-800/30 text-slate-300";
            if (isSel) style = "border-indigo-500 bg-indigo-500/10 text-white";
            if (showExp) {
              if (isCor) style = "border-emerald-500 bg-emerald-500/10 text-emerald-400";
              else if (isWrng) style = "border-rose-500 bg-rose-500/10 text-rose-400";
            }
            return (
              <button 
                key={c.id} 
                disabled={showExp} 
                onClick={() => handleAnswer(c.id)} 
                className={`w-full text-left p-5 rounded-2xl border-2 font-bold flex items-center gap-4 transition-all active:scale-[0.98] ${style}`}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 ${isSel ? 'bg-indigo-500 text-white' : 'text-slate-500 border-slate-700'} ${isCor ? 'bg-emerald-500 border-emerald-500 text-white' : ''} ${isWrng ? 'bg-rose-500 border-rose-500 text-white' : ''}`}>{String.fromCharCode(65+i)}</span>
                {c.text}
              </button>
            );
          })}
        </div>

        {showExp && (
          <div className="animate-slide-in p-6 bg-slate-800/80 rounded-2xl border border-slate-700 mt-auto">
            <h4 className={`font-black mb-2 text-sm uppercase tracking-widest ${selId === q.correctAnswerId ? 'text-emerald-400' : 'text-rose-400'}`}>{selId === q.correctAnswerId ? 'Insight Found' : 'Logic Flaw'}</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{q.explanation}</p>
          </div>
        )}
      </div>

      {showExp && (
        <button 
          onClick={handleNext} 
          className="mt-8 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-lg font-black transition-all shadow-2xl flex items-center justify-center gap-3"
        >
          {idx === quizSet.length - 1 ? '결과 확인하기' : '다음 단계로'}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
