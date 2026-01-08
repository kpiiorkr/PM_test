
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { AppMode, Question, UserAnswer, Choice } from './types.ts';
import { QUESTIONS } from './constants.ts';
import { GoogleGenAI } from "@google/genai";

// Shuffles an array (Fisher-Yates)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// UI Components
const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
    <div 
      className="h-full bg-indigo-500 transition-all duration-300 ease-out"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

const QuizCard = ({ 
  question, 
  onAnswer, 
  selectedId, 
  showExplanation 
}: { 
  question: Question; 
  onAnswer: (id: number) => void; 
  selectedId: number | null;
  showExplanation: boolean;
}) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
    <div className="flex items-center gap-3 mb-4">
      <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-400 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider">
        {question.title}
      </span>
    </div>
    
    <div className="mb-6 md:mb-8">
      {question.context && (
        <p className="text-slate-400 text-xs md:text-sm mb-4 leading-relaxed bg-slate-800/40 p-3 md:p-4 rounded-xl italic border-l-2 border-indigo-500/50">
          "{question.context}"
        </p>
      )}
      <h2 className="text-lg md:text-2xl font-bold leading-tight">
        {question.question}
      </h2>
    </div>

    <div className="space-y-2.5 md:space-y-3">
      {question.choices.map((choice) => {
        const isSelected = selectedId === choice.id;
        const isCorrect = showExplanation && choice.id === question.correctAnswerId;
        const isWrong = showExplanation && isSelected && choice.id !== question.correctAnswerId;
        
        let borderColor = 'border-slate-800';
        let bgColor = 'bg-slate-800/40';
        
        if (isSelected) {
          borderColor = 'border-indigo-500';
          bgColor = 'bg-indigo-500/10';
        }
        
        if (showExplanation) {
          if (isCorrect) {
            borderColor = 'border-emerald-500';
            bgColor = 'bg-emerald-500/10';
          } else if (isWrong) {
            borderColor = 'border-rose-500';
            bgColor = 'bg-rose-500/10';
          }
        }

        return (
          <button
            key={choice.id}
            disabled={showExplanation}
            onClick={() => onAnswer(choice.id)}
            className={`w-full text-left p-3.5 md:p-4 rounded-xl border-2 transition-all group ${borderColor} ${bgColor} hover:border-indigo-400/50 disabled:cursor-default`}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <span className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold border-2 transition-colors
                ${isSelected ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-700 text-slate-500 group-hover:border-indigo-400/50'}
                ${showExplanation && isCorrect ? 'bg-emerald-500 border-emerald-500 text-white' : ''}
                ${showExplanation && isWrong ? 'bg-rose-500 border-rose-500 text-white' : ''}
              `}>
                {String.fromCharCode(65 + question.choices.indexOf(choice))}
              </span>
              <span className={`text-sm md:text-base leading-snug ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                {choice.text}
              </span>
            </div>
          </button>
        );
      })}
    </div>

    {showExplanation && (
      <div className="mt-6 md:mt-8 p-4 md:p-6 bg-slate-800/80 rounded-xl border border-slate-700 animate-in slide-in-from-bottom-2">
        <h4 className={`font-bold mb-1.5 flex items-center gap-2 text-sm md:text-base ${selectedId === question.correctAnswerId ? 'text-emerald-400' : 'text-rose-400'}`}>
          {selectedId === question.correctAnswerId ? '✓ 정답입니다!' : '✕ 오답입니다.'}
        </h4>
        <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
          {question.explanation}
        </p>
      </div>
    )}
  </div>
);

export default function App() {
  const [mode, setMode] = useState<AppMode>(AppMode.START);
  const [questionLimit, setQuestionLimit] = useState(10);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("이미 설치되어 있거나 브라우저에서 '홈 화면에 추가' 메뉴를 사용해 주세요.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const activeQuestions = useMemo(() => {
    if (mode === AppMode.REVIEW) {
      const wrongIds = userAnswers.filter(a => !a.isCorrect).map(a => a.questionId);
      return allQuestions.filter(q => wrongIds.includes(q.id));
    }
    return allQuestions;
  }, [mode, userAnswers, allQuestions]);

  const currentQuestion = activeQuestions[currentIdx];
  const isLastQuestion = currentIdx === activeQuestions.length - 1;

  const handleAnswer = (id: number) => {
    setSelectedId(id);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (mode === AppMode.QUIZ) {
      const isCorrect = selectedId === currentQuestion.correctAnswerId;
      setUserAnswers(prev => [
        ...prev.filter(a => a.questionId !== currentQuestion.id),
        { questionId: currentQuestion.id, selectedId: selectedId!, isCorrect }
      ]);
    }

    if (isLastQuestion) {
      setMode(AppMode.RESULT);
    } else {
      setCurrentIdx(prev => prev + 1);
      setSelectedId(null);
      setShowExplanation(false);
    }
  };

  const handleExitToHome = useCallback(() => {
    setMode(AppMode.START);
    setCurrentIdx(0);
    setSelectedId(null);
    setShowExplanation(false);
    setAiAnalysis(null);
  }, []);

  const startQuiz = () => {
    const shuffled = shuffleArray(QUESTIONS).slice(0, questionLimit);
    setAllQuestions(shuffled);
    setMode(AppMode.QUIZ);
    setCurrentIdx(0);
    setUserAnswers([]);
    setSelectedId(null);
    setShowExplanation(false);
    setAiAnalysis(null);
  };

  const startReview = () => {
    setMode(AppMode.REVIEW);
    setCurrentIdx(0);
    setSelectedId(null);
    setShowExplanation(false);
  };

  const score = userAnswers.filter(a => a.isCorrect).length;
  const percentage = Math.round((score / allQuestions.length) * 100);

  const fetchAiAnalysis = async () => {
    if (allQuestions.length === 0) return;
    
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio.openSelectKey();
    }

    setLoadingAi(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as a senior PM coach. A student just finished a ${allQuestions.length}-question PM mastery quiz and got ${score} correct (${percentage}%). 
      Provide a short, powerful 2-3 sentence analysis in Korean about their PM readiness. Mention specific concepts from the curriculum (Mindset, MVP, Metrics, etc.) if they struggled. Keep it professional.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiAnalysis(response.text || "분석 결과를 생성할 수 없습니다.");
    } catch (error: any) {
      console.error(error);
      if (error.message?.includes("Requested entity was not found")) {
        await (window as any).aistudio.openSelectKey();
        setAiAnalysis(null);
      } else {
        setAiAnalysis("AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } finally {
      setLoadingAi(false);
    }
  };

  // Common Header Component for Quiz/Review/Result
  const Header = ({ title, subTitle, showReviewTag }: { title: string; subTitle: string; showReviewTag?: boolean }) => (
    <header className="flex justify-between items-start mb-4 px-1 w-full max-w-2xl mx-auto">
      <div className="flex flex-col">
        <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">
          {title}
        </h3>
        <div className="text-xl md:text-2xl font-black">
          {subTitle}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {showReviewTag && (
          <span className="hidden sm:inline-block px-2 py-0.5 bg-rose-500/10 text-rose-400 rounded text-[10px] font-bold border border-rose-500/20 mr-1">
            RE-LEARNING
          </span>
        )}
        <button 
          onClick={handleExitToHome}
          className="p-2 bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all border border-slate-700 group flex items-center gap-2 cursor-pointer active:scale-95"
          aria-label="홈으로 나가기"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-tighter">Exit</span>
        </button>
      </div>
    </header>
  );

  if (mode === AppMode.START) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-xl w-full">
          <h1 className="text-4xl md:text-6xl font-black mb-6 gradient-text tracking-tight">PM MASTERY</h1>
          <p className="text-slate-400 text-sm md:text-base mb-10 leading-relaxed px-4">
            7일간의 PM 코어 커리큘럼 기반 고난도 실전 테스트입니다.<br/>
            당신의 비즈니스 논리와 제품 감각을 증명하세요.
          </p>
          
          <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-6 mb-10">
            <label className="block text-slate-300 font-bold mb-4 text-sm uppercase tracking-widest">
              문제 수 선택: <span className="text-indigo-400 text-lg">{questionLimit}문항</span>
            </label>
            <input 
              type="range" 
              min="10" 
              max="30" 
              step="10"
              value={questionLimit}
              onChange={(e) => setQuestionLimit(parseInt(e.target.value))}
              className="w-full h-2 mb-2"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold px-1">
              <span>10</span>
              <span>20</span>
              <span>30</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={startQuiz}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-lg font-bold transition-all shadow-xl shadow-indigo-500/10 active:scale-95"
            >
              챌린지 시작
            </button>
            <button 
              onClick={handleInstallClick}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-all border border-slate-700 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              앱으로 설치하여 실행하기
            </button>
          </div>
          
          <div className="mt-12 text-slate-600 text-[10px] uppercase font-bold tracking-tighter">
            <p className="mb-2">PRODUCED FOR PROFESSIONAL PRODUCT MANAGERS</p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === AppMode.RESULT) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
        <Header title="Final Report" subTitle="Session Summary" />
        <div className="max-w-2xl w-full mt-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <div className="inline-block p-3 bg-indigo-500/10 rounded-xl mb-6">
              <span className="text-indigo-400 font-bold text-xs tracking-widest uppercase">Performance Report</span>
            </div>
            <div className="text-7xl md:text-8xl font-black mb-4 gradient-text">{percentage}%</div>
            <p className="text-lg text-slate-400 mb-8">
              총 {allQuestions.length}문제 중 {score}문제를 맞혔습니다.
            </p>

            {loadingAi ? (
              <div className="animate-pulse bg-slate-800/50 h-32 rounded-2xl mb-8 flex items-center justify-center text-slate-500 text-sm italic border border-slate-700">
                AI 시니어 PM 코치가 당신의 역량을 분석 중입니다...
              </div>
            ) : aiAnalysis ? (
              <div className="bg-slate-800/40 p-5 md:p-6 rounded-2xl mb-8 border border-slate-700/50 text-left animate-in fade-in slide-in-from-bottom-2">
                <h4 className="text-indigo-400 font-bold mb-3 flex items-center gap-2 text-sm uppercase">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM6.464 14.95a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707z"></path></svg>
                  Expert Insight
                </h4>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base">{aiAnalysis}</p>
              </div>
            ) : (
              <div className="mb-8 p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl">
                <p className="text-slate-400 text-sm mb-4">Gemini API 키를 연결하여 시니어 PM 코치의 개인 맞춤 피드백을 받아보세요.</p>
                <button 
                  onClick={fetchAiAnalysis}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  AI 분석 결과 보기 (API 키 필요)
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleExitToHome}
                className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-slate-700"
              >
                메인으로
              </button>
              {score < allQuestions.length && (
                <button 
                  onClick={startReview}
                  className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg"
                >
                  오답 복습하기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <Header 
          title={mode === AppMode.REVIEW ? 'Review Session' : 'Challenge Progress'} 
          subTitle={`${currentIdx + 1} / ${activeQuestions.length}`}
          showReviewTag={mode === AppMode.REVIEW}
        />

        <ProgressBar current={currentIdx + 1} total={activeQuestions.length} />

        {currentQuestion && (
          <QuizCard 
            question={currentQuestion} 
            onAnswer={handleAnswer}
            selectedId={selectedId}
            showExplanation={showExplanation}
          />
        )}

        <div className="mt-8 flex justify-end">
          {showExplanation && (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              {isLastQuestion ? (mode === AppMode.REVIEW ? '복습 완료' : '결과 보기') : '다음 문항'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
