'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExamResult } from '@/types/exam';
import { getExamResult, clearExamSession, setActivePaperId } from '@/lib/storage';
import ResultSummary from '@/components/ResultSummary';
import { ShieldCheck, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paperId = searchParams.get('paperId') || 'paper-01';

  const [result, setResult] = useState<ExamResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setActivePaperId(paperId);
    const res = getExamResult(paperId);
    if (!res) {
      // If no result exists for this paper, redirect to home or instructions
      router.push('/');
      return;
    }
    setResult(res);
    setIsLoading(false);
  }, [paperId, router]);

  const handleRetake = () => {
    clearExamSession(paperId);
    router.push(`/instructions?paperId=${paperId}`);
  };

  const handleReview = () => {
    router.push(`/review?paperId=${paperId}`);
  };

  if (isLoading || !result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-700">Loading Scorecard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <span className="font-extrabold text-sm md:text-base tracking-wider uppercase">
              APPSC Group 2 Result Dashboard
            </span>
          </div>
          <Link
            href="/"
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors bg-slate-800 px-3 py-1.5 rounded border border-slate-700 font-semibold"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Portal Home</span>
          </Link>
        </div>
      </header>

      {/* Main Scorecard View */}
      <main className="flex-1 py-8 px-4">
        <ResultSummary
          result={result}
          onRetake={handleRetake}
          onReview={handleReview}
        />
      </main>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold text-slate-600">Loading results...</div>}>
      <ResultContent />
    </Suspense>
  );
}
