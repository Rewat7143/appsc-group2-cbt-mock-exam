'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BarChart3,
  RotateCcw,
  BookOpen,
  Home,
  User,
  Calendar,
} from 'lucide-react';
import { ExamResult } from '@/types/exam';

interface ResultSummaryProps {
  result: ExamResult;
  onRetake: () => void;
  onReview: () => void;
}

export default function ResultSummary({
  result,
  onRetake,
  onReview,
}: ResultSummaryProps) {
  const percentage = ((result.marksObtained / result.totalMarks) * 100).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 font-sans">
      <div className="bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                Official Examination Scorecard
              </span>
              <h1 className="text-xl md:text-2xl font-bold mt-1 text-white">
                {result.paperTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-300" />
                  {result.candidate.name} (Roll: {result.candidate.rollNumber})
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-300" />
                  {result.completionDate}
                </span>
              </div>
            </div>

            {/* Score Badge */}
            <div className="bg-slate-800 border border-slate-700 px-5 py-3 rounded-md text-center min-w-[150px]">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                Marks Obtained
              </span>
              <div className="text-2xl md:text-3xl font-extrabold text-blue-400">
                {result.marksObtained.toFixed(2)}{' '}
                <span className="text-sm font-medium text-slate-400">/ {result.totalMarks}</span>
              </div>
              <span className="text-xs font-semibold text-emerald-400">
                {percentage}% Score
              </span>
            </div>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Total Questions */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Total Questions
              </span>
              <div className="text-2xl font-bold text-slate-800 mt-1">
                {result.totalQuestions}
              </div>
            </div>

            {/* Correct Answers */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded text-center">
              <div className="flex items-center justify-center gap-1 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Correct</span>
              </div>
              <div className="text-2xl font-bold text-emerald-700 mt-1">
                {result.correctAnswers}
              </div>
              <span className="text-[11px] text-emerald-600 font-medium">
                +{result.correctAnswers} Marks
              </span>
            </div>

            {/* Incorrect Answers */}
            <div className="bg-red-50 border border-red-200 p-4 rounded text-center">
              <div className="flex items-center justify-center gap-1 text-xs font-semibold text-red-700 uppercase tracking-wider">
                <XCircle className="w-3.5 h-3.5" />
                <span>Incorrect</span>
              </div>
              <div className="text-2xl font-bold text-red-700 mt-1">
                {result.incorrectAnswers}
              </div>
              <span className="text-[11px] text-red-600 font-medium">
                -{ (result.incorrectAnswers * result.negativeMarking).toFixed(2) } Marks
              </span>
            </div>

            {/* Unanswered */}
            <div className="bg-slate-100 border border-slate-300 p-4 rounded text-center">
              <div className="flex items-center justify-center gap-1 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Unanswered</span>
              </div>
              <div className="text-2xl font-bold text-slate-700 mt-1">
                {result.unansweredQuestions}
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                0 Marks
              </span>
            </div>
          </div>

          {/* Verification check callout */}
          <div className="bg-blue-50 border border-blue-200 rounded p-4 flex flex-col sm:flex-row items-center justify-between text-xs md:text-sm text-blue-900 gap-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>
                <strong>Formula Check:</strong> {result.correctAnswers} (Correct) +{' '}
                {result.incorrectAnswers} (Incorrect) + {result.unansweredQuestions} (Unanswered) ={' '}
                <strong>{result.totalQuestions} Questions</strong>.
              </span>
            </div>
            <div className="font-semibold text-blue-700">
              Accuracy: <span className="font-bold text-blue-950">{result.accuracyPercentage}%</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-center md:justify-end gap-3">
            <Link
              href="/"
              className="px-5 py-2.5 rounded font-semibold text-xs md:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors uppercase tracking-wider flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <button
              onClick={onRetake}
              className="px-5 py-2.5 rounded font-semibold text-xs md:text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-300 transition-colors uppercase tracking-wider flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Exam</span>
            </button>

            <button
              onClick={onReview}
              className="px-6 py-2.5 rounded font-bold text-xs md:text-sm text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-colors uppercase tracking-wider shadow-sm flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Review All 150 Answers</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
