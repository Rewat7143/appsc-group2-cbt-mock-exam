'use client';

import React, { useState } from 'react';
import { Question, QuestionPaletteStatus } from '@/types/exam';
import { getQuestionStatus } from '@/lib/exam-engine';

interface QuestionPaletteProps {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  markedForReview: Record<number, boolean>;
  visitedQuestions: Record<number, boolean>;
  onNavigateToQuestion: (index: number) => void;
  onSubmitClick: () => void;
}

export default function QuestionPalette({
  questions,
  currentQuestionIndex,
  answers,
  markedForReview,
  visitedQuestions,
  onNavigateToQuestion,
  onSubmitClick,
}: QuestionPaletteProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'secA' | 'secB'>('all');

  // Compute status counts across all questions
  let countAnswered = 0;
  let countNotAnswered = 0;
  let countNotVisited = 0;
  let countMarkedReview = 0;
  let countAnsweredMarked = 0;

  questions.forEach((q) => {
    const status = getQuestionStatus(
      q.questionNumber,
      answers,
      markedForReview,
      visitedQuestions
    );
    if (status === 'answered') countAnswered++;
    else if (status === 'not-answered') countNotAnswered++;
    else if (status === 'not-visited') countNotVisited++;
    else if (status === 'marked-review') countMarkedReview++;
    else if (status === 'answered-marked-review') countAnsweredMarked++;
  });

  // Filter questions for display
  const filteredQuestions = questions.filter((q) => {
    if (activeTab === 'secA') return q.questionNumber <= 75;
    if (activeTab === 'secB') return q.questionNumber > 75;
    return true;
  });

  return (
    <div className="bg-slate-100 border border-slate-300 rounded shadow-sm flex flex-col h-full overflow-hidden select-none">
      {/* Header */}
      <div className="bg-slate-200 border-b border-slate-300 px-4 py-2 flex items-center justify-between">
        <h2 className="font-bold text-xs uppercase tracking-wider text-slate-800">
          Question Palette ({questions.length} Questions)
        </h2>
      </div>

      {/* TCS iON Status Legend */}
      <div className="p-3 bg-white border-b border-slate-300 text-[11px] grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-sm bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">
            {countAnswered}
          </span>
          <span className="text-slate-700">Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-sm bg-red-600 text-white font-bold flex items-center justify-center text-[10px]">
            {countNotAnswered}
          </span>
          <span className="text-slate-700">Not Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-sm bg-slate-300 text-slate-700 font-bold flex items-center justify-center text-[10px]">
            {countNotVisited}
          </span>
          <span className="text-slate-700">Not Visited</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-sm bg-purple-600 text-white font-bold flex items-center justify-center text-[10px]">
            {countMarkedReview}
          </span>
          <span className="text-slate-700">Marked for Review</span>
        </div>
        <div className="flex items-center gap-1.5 col-span-2">
          <span className="w-5 h-5 rounded-sm bg-purple-600 text-white font-bold flex items-center justify-center text-[10px] relative">
            {countAnsweredMarked}
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 border border-white" />
          </span>
          <span className="text-slate-700">
            Answered & Marked for Review (will be evaluated)
          </span>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex border-b border-slate-300 bg-slate-100 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-1.5 text-center transition-colors border-r border-slate-300 ${
            activeTab === 'all'
              ? 'bg-white text-blue-700 border-b-2 border-b-blue-600 font-bold'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          All (150)
        </button>
        <button
          onClick={() => setActiveTab('secA')}
          className={`flex-1 py-1.5 text-center transition-colors border-r border-slate-300 ${
            activeTab === 'secA'
              ? 'bg-white text-blue-700 border-b-2 border-b-blue-600 font-bold'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Sec A (1-75)
        </button>
        <button
          onClick={() => setActiveTab('secB')}
          className={`flex-1 py-1.5 text-center transition-colors ${
            activeTab === 'secB'
              ? 'bg-white text-blue-700 border-b-2 border-b-blue-600 font-bold'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Sec B (76-150)
        </button>
      </div>

      {/* Grid of Question Numbers */}
      <div className="p-3 overflow-y-auto flex-1 palette-scroll max-h-[380px] md:max-h-[460px]">
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-6 gap-1.5">
          {filteredQuestions.map((q) => {
            const qNum = q.questionNumber;
            const qIdx = qNum - 1;
            const isCurrent = qIdx === currentQuestionIndex;
            const status = getQuestionStatus(
              qNum,
              answers,
              markedForReview,
              visitedQuestions
            );

            // Determine TCS iON color styling
            let btnClass = 'bg-slate-200 text-slate-700 border-slate-300 hover:bg-slate-300';
            if (status === 'answered') {
              btnClass = 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700';
            } else if (status === 'not-answered') {
              btnClass = 'bg-red-500 text-white border-red-600 hover:bg-red-600';
            } else if (status === 'marked-review') {
              btnClass = 'bg-purple-600 text-white border-purple-700 hover:bg-purple-700';
            } else if (status === 'answered-marked-review') {
              btnClass =
                'bg-purple-600 text-white border-purple-700 hover:bg-purple-700 relative';
            }

            return (
              <button
                key={qNum}
                onClick={() => onNavigateToQuestion(qIdx)}
                className={`h-8 rounded text-xs font-bold border transition-all flex items-center justify-center relative ${btnClass} ${
                  isCurrent ? 'ring-2 ring-blue-600 ring-offset-1 scale-105 shadow-sm' : ''
                }`}
                title={`Question ${qNum} (${status})`}
              >
                {qNum}
                {status === 'answered-marked-review' && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Submit Test Button */}
      <div className="p-3 bg-slate-200 border-t border-slate-300">
        <button
          onClick={onSubmitClick}
          className="w-full bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold py-2 px-4 rounded text-sm shadow-sm transition-colors uppercase tracking-wider flex items-center justify-center gap-2"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}
