'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Menu,
  X,
  AlertTriangle,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Bookmark,
} from 'lucide-react';
import { Question, CandidateDetails, ExamSessionState, PaperMetadata } from '@/types/exam';
import { getPaperMetadata, getPaperQuestions } from '@/lib/paper-registry';
import {
  getCandidate,
  getExamSession,
  saveExamSession,
  clearExamSession,
  saveExamResult,
  setActivePaperId,
} from '@/lib/storage';
import { calculateExamScore } from '@/lib/scoring';
import ExamHeader from '@/components/ExamHeader';
import QuestionPanel from '@/components/QuestionPanel';
import QuestionPalette from '@/components/QuestionPalette';
import ExamNavigation from '@/components/ExamNavigation';
import SubmitConfirmationModal from '@/components/SubmitConfirmationModal';

function ExamEngineContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paperId = searchParams.get('paperId') || 'paper-01';

  // Exam state
  const [paper, setPaper] = useState<PaperMetadata | undefined>(undefined);
  const [candidate, setCandidate] = useState<CandidateDetails | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // User responses & status maps
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Record<number, boolean>>({});

  // Timer & Session state
  const [remainingSeconds, setRemainingSeconds] = useState<number>(150 * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [negativeMarking, setNegativeMarking] = useState<number>(0);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Refs for timer and calculations
  const endTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const submissionInProgressRef = useRef<boolean>(false);

  // 1. Initialize candidate and paper data
  useEffect(() => {
    setActivePaperId(paperId);
    const pMeta = getPaperMetadata(paperId);
    setPaper(pMeta);

    const cand = getCandidate(paperId);
    if (!cand) {
      router.push(`/candidate?paperId=${paperId}`);
      return;
    }
    setCandidate(cand);

    // Negative marking configuration
    const savedNeg = localStorage.getItem(`appsc_negative_marking_${paperId}`);
    if (savedNeg !== null) {
      setNegativeMarking(parseFloat(savedNeg));
    }

    // Load questions asynchronously
    getPaperQuestions(paperId).then((data) => {
      setQuestions(data);

      // Check if there is an active session
      const existingSession = getExamSession(paperId);
      const totalDurationSec = (pMeta?.durationMinutes || 150) * 60;
      const now = Date.now();

      if (existingSession && !existingSession.isSubmitted) {
        // Restore session
        setAnswers(existingSession.answers || {});
        setMarkedForReview(existingSession.markedForReview || {});
        setVisitedQuestions(existingSession.visitedQuestions || { 1: true });
        setCurrentIndex(existingSession.currentQuestionIndex || 0);

        // Calculate accurate remaining time based on timestamp
        const leftMs = existingSession.endTime - now;
        const leftSec = Math.max(0, Math.floor(leftMs / 1000));
        setRemainingSeconds(leftSec);
        endTimeRef.current = existingSession.endTime;
      } else {
        // Start fresh 150 min session
        const freshEndTime = now + totalDurationSec * 1000;
        endTimeRef.current = freshEndTime;
        setRemainingSeconds(totalDurationSec);
        setVisitedQuestions({ 1: true });

        const freshState: ExamSessionState = {
          paperId,
          candidate: cand,
          startTime: now,
          endTime: freshEndTime,
          durationSeconds: totalDurationSec,
          currentQuestionIndex: 0,
          answers: {},
          markedForReview: {},
          visitedQuestions: { 1: true },
          isSubmitted: false,
        };
        saveExamSession(freshState);
      }

      setIsLoading(false);
    });
  }, [paperId, router]);

  // Handle final submission (defined early so timer can invoke it)
  const finalizeSubmission = useCallback(() => {
    if (submissionInProgressRef.current) return;
    submissionInProgressRef.current = true;
    setIsSubmitted(true);

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    if (candidate && questions.length > 0) {
      const result = calculateExamScore(
        paperId,
        paper?.title || 'APPSC Group 2 Mains Paper-I',
        candidate,
        questions,
        answers,
        negativeMarking
      );

      saveExamResult(result);
      clearExamSession(paperId);
      router.push(`/result?paperId=${paperId}`);
    }
  }, [candidate, questions, paperId, paper?.title, answers, negativeMarking, router]);

  // 2. Countdown Timer tick using reliable timestamp calculations
  useEffect(() => {
    if (isLoading || isSubmitted || endTimeRef.current === 0) return;

    timerIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const leftSec = Math.max(0, Math.floor((endTimeRef.current - now) / 1000));
      setRemainingSeconds(leftSec);

      if (leftSec <= 0) {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        // Time is up -> Auto-submit
        finalizeSubmission();
      }
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isLoading, isSubmitted, finalizeSubmission]);

  // 3. Persist session updates to LocalStorage on state changes
  useEffect(() => {
    if (isLoading || isSubmitted || !candidate) return;

    const sessionData: ExamSessionState = {
      paperId,
      candidate,
      startTime: endTimeRef.current - (paper?.durationMinutes || 150) * 60 * 1000,
      endTime: endTimeRef.current,
      durationSeconds: (paper?.durationMinutes || 150) * 60,
      currentQuestionIndex: currentIndex,
      answers,
      markedForReview,
      visitedQuestions,
      isSubmitted: false,
    };
    saveExamSession(sessionData);
  }, [currentIndex, answers, markedForReview, visitedQuestions, isLoading, isSubmitted, candidate, paperId, paper?.durationMinutes]);

  // Question navigation and actions
  const currentQ = questions[currentIndex];
  const qNum = currentQ ? currentQ.questionNumber : 1;

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [qNum]: optionId,
    }));
  };

  const handleClearResponse = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[qNum];
      return next;
    });
  };

  const markCurrentVisited = (idx: number) => {
    const targetQNum = questions[idx]?.questionNumber;
    if (targetQNum) {
      setVisitedQuestions((prev) => ({
        ...prev,
        [targetQNum]: true,
      }));
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const nextIdx = currentIndex - 1;
      markCurrentVisited(nextIdx);
      setCurrentIndex(nextIdx);
    }
  };

  const handleSaveAndNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      markCurrentVisited(nextIdx);
      setCurrentIndex(nextIdx);
    } else {
      // Reached last question, prompt review or submission
      setShowSubmitModal(true);
    }
  };

  const handleMarkForReviewAndNext = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [qNum]: true,
    }));

    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      markCurrentVisited(nextIdx);
      setCurrentIndex(nextIdx);
    }
  };

  const handleDirectNavigation = (index: number) => {
    markCurrentVisited(index);
    setCurrentIndex(index);
    setIsMobilePaletteOpen(false);
  };

  // Status counts for confirmation modal
  const totalQuestionsCount = questions.length;
  const answeredCount = Object.keys(answers).length;
  const markedCount = Object.keys(markedForReview).length;
  const notAnsweredCount = totalQuestionsCount - answeredCount;

  if (isLoading || !currentQ || !candidate) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-300 text-center max-w-sm w-full space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <h2 className="text-base font-bold text-slate-800">
            Initializing Examination...
          </h2>
          <p className="text-xs text-slate-500">
            Loading verified 150 questions and authentic TCS iON test environment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col font-sans select-none cbt-container">
      {/* Header with Candidate details and Timer */}
      <ExamHeader
        paperTitle={paper?.title || 'APPSC Group 2 Mains Paper-I'}
        candidateName={candidate.name}
        rollNumber={candidate.rollNumber}
        remainingSeconds={remainingSeconds}
        onTimeUp={finalizeSubmission}
      />

      {/* Mobile Bar to Toggle Question Palette */}
      <div className="bg-slate-800 text-white px-4 py-2 flex items-center justify-between md:hidden border-b border-slate-700">
        <span className="text-xs font-semibold text-slate-300">
          Q {currentIndex + 1} of {questions.length}
        </span>
        <button
          onClick={() => setIsMobilePaletteOpen(!isMobilePaletteOpen)}
          className="flex items-center gap-1.5 text-xs bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded font-bold transition-colors"
        >
          {isMobilePaletteOpen ? (
            <>
              <X className="w-3.5 h-3.5" />
              <span>Close Palette</span>
            </>
          ) : (
            <>
              <Menu className="w-3.5 h-3.5" />
              <span>Question Palette ({questions.length})</span>
            </>
          )}
        </button>
      </div>

      {/* Main Examination Layout: 3-section TCS iON design */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-2 md:p-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 overflow-hidden">
        {/* Left Section: Question Panel & Navigation (75% on desktop: col-span-8 or 9) */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col h-[calc(100vh-125px)] md:h-[calc(100vh-85px)] gap-2 md:gap-3">
          <div className="flex-1 overflow-hidden">
            <QuestionPanel
              question={currentQ}
              selectedOption={answers[qNum]}
              onSelectOption={handleSelectOption}
              negativeMarking={negativeMarking}
            />
          </div>

          <div>
            <ExamNavigation
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              onPrevious={handlePrevious}
              onSaveAndNext={handleSaveAndNext}
              onMarkForReviewAndNext={handleMarkForReviewAndNext}
              onClearResponse={handleClearResponse}
            />
          </div>
        </div>

        {/* Right Section: Desktop Question Palette (25% on desktop: col-span-4 or 3) */}
        <div className="hidden md:flex md:col-span-4 lg:col-span-3 flex-col h-[calc(100vh-85px)]">
          <QuestionPalette
            questions={questions}
            currentQuestionIndex={currentIndex}
            answers={answers}
            markedForReview={markedForReview}
            visitedQuestions={visitedQuestions}
            onNavigateToQuestion={handleDirectNavigation}
            onSubmitClick={() => setShowSubmitModal(true)}
          />
        </div>
      </div>

      {/* Mobile Collapsible Palette Modal/Drawer */}
      {isMobilePaletteOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col md:hidden p-4">
          <div className="bg-white rounded-lg shadow-xl flex-1 flex flex-col overflow-hidden max-w-md mx-auto w-full">
            <div className="p-3 bg-slate-900 text-white flex justify-between items-center">
              <span className="font-bold text-xs uppercase tracking-wider">
                Question Palette
              </span>
              <button
                onClick={() => setIsMobilePaletteOpen(false)}
                className="p-1 rounded text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <QuestionPalette
                questions={questions}
                currentQuestionIndex={currentIndex}
                answers={answers}
                markedForReview={markedForReview}
                visitedQuestions={visitedQuestions}
                onNavigateToQuestion={handleDirectNavigation}
                onSubmitClick={() => {
                  setIsMobilePaletteOpen(false);
                  setShowSubmitModal(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Submission Confirmation Modal */}
      <SubmitConfirmationModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirmSubmit={finalizeSubmission}
        totalQuestions={totalQuestionsCount}
        answeredCount={answeredCount}
        notAnsweredCount={notAnsweredCount}
        markedForReviewCount={markedCount}
      />
    </div>
  );
}

export default function ExamPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold text-slate-600">Loading exam interface...</div>}>
      <ExamEngineContent />
    </Suspense>
  );
}
