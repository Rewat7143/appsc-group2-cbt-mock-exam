'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Filter,
} from 'lucide-react';
import { Question } from '@/types/exam';

interface AnswerReviewProps {
  questions: Question[];
  userAnswers: Record<number, string>;
  paperTitle: string;
}

export default function AnswerReview({
  questions,
  userAnswers,
  paperTitle,
}: AnswerReviewProps) {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered'>('all');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  // Group questions by status
  const categorized = questions.map((q, idx) => {
    const selected = userAnswers[q.questionNumber];
    const isAnswered = !!selected;
    const isCorrect = isAnswered && selected === q.correctOption;
    const isIncorrect = isAnswered && selected !== q.correctOption;
    const isUnanswered = !isAnswered;

    return {
      question: q,
      index: idx,
      selected,
      isCorrect,
      isIncorrect,
      isUnanswered,
    };
  });

  const correctCount = categorized.filter((c) => c.isCorrect).length;
  const incorrectCount = categorized.filter((c) => c.isIncorrect).length;
  const unansweredCount = categorized.filter((c) => c.isUnanswered).length;

  const filteredItems = categorized.filter((item) => {
    if (filter === 'correct') return item.isCorrect;
    if (filter === 'incorrect') return item.isIncorrect;
    if (filter === 'unanswered') return item.isUnanswered;
    return true;
  });

  // Current viewed question
  const currentItem = categorized[activeQuestionIndex] || categorized[0];
  const q = currentItem.question;
  const userSelected = currentItem.selected;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-300 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/result"
              className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              title="Back to Scorecard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">
              Detailed Answer Key & Solutions
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 ml-7">
            {paperTitle} | Official APPSC Group 2 Answer Key Verified
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-200 p-1 rounded-md text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              filter === 'all'
                ? 'bg-white text-blue-800 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({questions.length})
          </button>
          <button
            onClick={() => setFilter('correct')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 whitespace-nowrap ${
              filter === 'correct'
                ? 'bg-emerald-600 text-white shadow-xs font-bold'
                : 'text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Correct ({correctCount})</span>
          </button>
          <button
            onClick={() => setFilter('incorrect')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 whitespace-nowrap ${
              filter === 'incorrect'
                ? 'bg-red-600 text-white shadow-xs font-bold'
                : 'text-red-800 hover:bg-red-100'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Incorrect ({incorrectCount})</span>
          </button>
          <button
            onClick={() => setFilter('unanswered')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 whitespace-nowrap ${
              filter === 'unanswered'
                ? 'bg-slate-700 text-white shadow-xs font-bold'
                : 'text-slate-700 hover:bg-slate-300'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Unanswered ({unansweredCount})</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Interactive Jump Palette */}
        <div className="lg:col-span-1 bg-white border border-slate-300 rounded p-4 shadow-sm order-2 lg:order-1">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Jump to Question
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredItems.length}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 max-h-[460px] overflow-y-auto palette-scroll pr-1">
            {filteredItems.map((item) => {
              const qNum = item.question.questionNumber;
              const isSelected = item.index === activeQuestionIndex;

              let colorClass = 'bg-slate-200 text-slate-700 border-slate-300';
              if (item.isCorrect) {
                colorClass = 'bg-emerald-600 text-white border-emerald-700';
              } else if (item.isIncorrect) {
                colorClass = 'bg-red-500 text-white border-red-600';
              } else {
                colorClass = 'bg-slate-300 text-slate-800 border-slate-400';
              }

              return (
                <button
                  key={qNum}
                  onClick={() => setActiveQuestionIndex(item.index)}
                  className={`h-8 rounded text-xs font-bold border transition-all flex items-center justify-center ${colorClass} ${
                    isSelected ? 'ring-2 ring-blue-600 ring-offset-1 scale-105 shadow-sm' : ''
                  }`}
                  title={`Question ${qNum}`}
                >
                  {qNum}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Question and Solution Viewer */}
        <div className="lg:col-span-3 space-y-4 order-1 lg:order-2">
          <div className="bg-white border border-slate-300 rounded shadow-sm overflow-hidden">
            {/* Question Top Meta */}
            <div className="bg-slate-100 border-b border-slate-300 px-5 py-3 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900 text-base">
                  Question No. {q.questionNumber}
                </span>
                <span className="text-xs font-medium text-slate-600 bg-slate-200 px-2 py-0.5 rounded border border-slate-300">
                  {q.section || 'General Studies'}
                </span>
                <span className="text-xs text-slate-500">
                  PDF Page: {q.sourcePage}
                </span>
              </div>

              {/* Status Badge */}
              <div>
                {currentItem.isCorrect && (
                  <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1 rounded">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>CORRECT (+1.0)</span>
                  </span>
                )}
                {currentItem.isIncorrect && (
                  <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-800 border border-red-300 text-xs font-bold px-3 py-1 rounded">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>INCORRECT (0.0)</span>
                  </span>
                )}
                {currentItem.isUnanswered && (
                  <span className="inline-flex items-center gap-1.5 bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold px-3 py-1 rounded">
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                    <span>NOT ANSWERED</span>
                  </span>
                )}
              </div>
            </div>

            {/* Question Text */}
            <div className="p-5 md:p-6 text-slate-900 text-sm md:text-base font-medium space-y-2 border-b border-slate-200">
              {q.questionText.split('\n').map((line, idx) => (
                <p key={idx} className={line.trim() === '' ? 'h-2' : ''}>
                  {line}
                </p>
              ))}
            </div>

            {/* Options List with Color Highlights */}
            <div className="p-5 md:p-6 space-y-3 bg-slate-50/50">
              {q.options.map((opt) => {
                const isCandidateChoice = userSelected === opt.id;
                const isOfficialCorrect = q.correctOption === opt.id;

                let cardBorder = 'border-slate-300 bg-white text-slate-800';
                let tag = null;

                if (isOfficialCorrect && isCandidateChoice) {
                  // Candidate chose right!
                  cardBorder = 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600';
                  tag = (
                    <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Your Answer (Correct)
                    </span>
                  );
                } else if (isOfficialCorrect && !isCandidateChoice) {
                  // Official correct answer that candidate didn't pick
                  cardBorder = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-600';
                  tag = (
                    <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Official Correct Answer
                    </span>
                  );
                } else if (!isOfficialCorrect && isCandidateChoice) {
                  // Candidate chose wrong!
                  cardBorder = 'border-red-500 bg-red-50 text-red-950 ring-1 ring-red-500';
                  tag = (
                    <span className="ml-auto text-xs font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded border border-red-300 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      Your Answer (Incorrect)
                    </span>
                  );
                }

                return (
                  <div
                    key={opt.id}
                    className={`p-3.5 rounded border text-sm md:text-base flex items-start gap-3 transition-colors ${cardBorder}`}
                  >
                    <span className="font-bold text-slate-800 flex-shrink-0">
                      ({opt.id})
                    </span>
                    <span className="leading-snug">{opt.text}</span>
                    {tag}
                  </div>
                );
              })}
            </div>

            {/* In-Depth Explanation Box */}
            <div className="p-5 md:p-6 bg-blue-50/70 border-t border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-blue-700" />
                <h4 className="font-bold text-xs md:text-sm text-blue-900 uppercase tracking-wider">
                  Detailed Explanation & Subject Analysis
                </h4>
              </div>

              <div className="space-y-3 text-xs md:text-sm text-slate-800 leading-relaxed">
                <p className="bg-white p-3 rounded border border-blue-200 font-medium">
                  {q.explanation}
                </p>

                {q.whyCorrect && (
                  <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-950">
                    <strong className="text-emerald-800">Why Option ({q.correctOption}) is correct: </strong>
                    <span>{q.whyCorrect}</span>
                  </div>
                )}

                {q.whyIncorrect && Object.keys(q.whyIncorrect).length > 0 && (
                  <div className="p-3 bg-white rounded border border-slate-200 space-y-1.5">
                    <strong className="text-slate-700 block">Analysis of other options:</strong>
                    {Object.entries(q.whyIncorrect).map(([key, reason]) => (
                      <div key={key} className="text-slate-600 pl-2 border-l-2 border-slate-300">
                        <span className="font-semibold text-slate-700">Option ({key}): </span>
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Question Navigation in Review */}
            <div className="bg-slate-100 border-t border-slate-300 p-3 flex items-center justify-between">
              <button
                onClick={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeQuestionIndex === 0}
                className={`px-4 py-1.5 rounded text-xs md:text-sm font-semibold border flex items-center gap-1 transition-colors ${
                  activeQuestionIndex === 0
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Question</span>
              </button>

              <span className="text-xs font-semibold text-slate-600">
                {activeQuestionIndex + 1} of {questions.length}
              </span>

              <button
                onClick={() =>
                  setActiveQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))
                }
                disabled={activeQuestionIndex === questions.length - 1}
                className={`px-4 py-1.5 rounded text-xs md:text-sm font-semibold border flex items-center gap-1 transition-colors ${
                  activeQuestionIndex === questions.length - 1
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
                }`}
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
