'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Question, ExamResult } from '@/types/exam';
import { getPaperQuestions, getPaperMetadata } from '@/lib/paper-registry';
import { getExamResult, setActivePaperId } from '@/lib/storage';
import AnswerReview from '@/components/AnswerReview';
import { ShieldCheck, Home } from 'lucide-react';
import Link from 'next/link';

function ReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paperId = searchParams.get('paperId') || searchParams.get('paper') || 'paper-01';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setActivePaperId(paperId);
    const res = getExamResult(paperId);
    if (!res) {
      router.push('/');
      return;
    }
    setResult(res);

    getPaperQuestions(paperId).then((data) => {
      setQuestions(data);
      setIsLoading(false);
    });
  }, [paperId, router]);

  if (isLoading || !result || questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-700">Loading All 150 Solutions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <span className="font-extrabold text-sm md:text-base tracking-wider uppercase">
              APPSC Group 2 Answer Key & Review
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/result?paperId=${paperId}`}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors bg-slate-800 px-3 py-1.5 rounded border border-slate-700 font-semibold"
            >
              <span>View Scorecard</span>
            </Link>
            <Link
              href="/"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors bg-slate-800 px-3 py-1.5 rounded border border-slate-700 font-semibold"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Answer Review Component */}
      <main className="flex-1 py-4 md:py-6">
        <AnswerReview
          questions={questions}
          userAnswers={result.userAnswers}
          paperTitle={result.paperTitle}
        />
      </main>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold text-slate-600">Loading answer review...</div>}>
      <ReviewContent />
    </Suspense>
  );
}
