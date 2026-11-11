'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Bookmark, RotateCcw } from 'lucide-react';

interface ExamNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onSaveAndNext: () => void;
  onMarkForReviewAndNext: () => void;
  onClearResponse: () => void;
}

export default function ExamNavigation({
  currentIndex,
  totalQuestions,
  onPrevious,
  onSaveAndNext,
  onMarkForReviewAndNext,
  onClearResponse,
}: ExamNavigationProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="bg-slate-100 border border-slate-300 rounded p-3 flex flex-wrap items-center justify-between gap-2 shadow-xs">
      {/* Left Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={onMarkForReviewAndNext}
          className="bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 px-3.5 py-2 rounded text-xs md:text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Bookmark className="w-3.5 h-3.5 text-purple-700" />
          <span>Mark for Review & Next</span>
        </button>

        <button
          onClick={onClearResponse}
          className="bg-slate-200 hover:bg-slate-300 text-slate-700 border border-slate-300 px-3.5 py-2 rounded text-xs md:text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Response</span>
        </button>
      </div>

      {/* Right Navigation: Previous and Save & Next */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`px-4 py-2 rounded text-xs md:text-sm font-semibold flex items-center gap-1 border transition-colors shadow-xs ${
            isFirst
              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
              : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={onSaveAndNext}
          className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white border border-emerald-700 px-5 py-2 rounded text-xs md:text-sm font-bold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span>{isLast ? 'Save & Review' : 'Save & Next'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
