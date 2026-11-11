'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  ArrowRight,
  Database,
} from 'lucide-react';

export interface ProcessingStatus {
  active: boolean;
  paperId: string | null;
  paperTitle: string | null;
  filename: string | null;
  stage: string;
  stageLabel: string;
  currentPage: number;
  totalPages: number;
  questionsFound: number;
  totalExpected: number;
  percent: number;
  completed: boolean;
  error?: string | null;
  redirectUrl?: string | null;
  updatedAt?: string;
}

interface PaperProgressBarProps {
  onPaperReady?: (paperId: string) => void;
}

export default function PaperProgressBar({ onPaperReady }: PaperProgressBarProps) {
  const router = useRouter();
  const [status, setStatus] = useState<ProcessingStatus | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const res = await fetch('/api/processing-status', { cache: 'no-store' });
        if (res.ok) {
          const data: ProcessingStatus = await res.json();
          setStatus(data);

          // If completed and not already counting down
          if (data.completed && data.redirectUrl && redirectCountdown === null) {
            setRedirectCountdown(3);
          }
        }
      } catch (err) {
        console.error('Failed to poll status', err);
      }
    };

    checkStatus();
    interval = setInterval(checkStatus, 1500);

    return () => clearInterval(interval);
  }, [redirectCountdown]);

  // Handle countdown redirect
  useEffect(() => {
    if (redirectCountdown === null) return;

    if (redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (redirectCountdown === 0 && status?.redirectUrl) {
      if (onPaperReady && status.paperId) {
        onPaperReady(status.paperId);
      }
      router.push(status.redirectUrl);
    }
  }, [redirectCountdown, status, router, onPaperReady]);

  if (!status || (!status.active && !status.completed)) {
    return null;
  }

  const isCompleted = status.completed;
  const isError = !!status.error;

  return (
    <div
      className={`w-full rounded-lg border p-4 sm:p-5 transition-all mb-6 ${
        isCompleted
          ? 'bg-emerald-50 border-emerald-300'
          : isError
          ? 'bg-red-50 border-red-300'
          : 'bg-blue-50 border-blue-300 shadow-sm'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-md ${
              isCompleted
                ? 'bg-emerald-600 text-white'
                : isError
                ? 'bg-red-600 text-white'
                : 'bg-navy-900 text-white'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-white" />
            ) : isError ? (
              <AlertCircle className="w-5 h-5 text-white" />
            ) : (
              <Loader2 className="w-5 h-5 animate-spin text-white" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-navy-800 bg-white/80 px-2 py-0.5 rounded border border-navy-200">
                {isCompleted ? 'Ready to Start' : 'Auto Extraction Engine'}
              </span>
              <span className="text-xs text-navy-700">
                {status.filename || 'New PYQ Paper'}
              </span>
            </div>
            <h3 className="text-base font-bold text-navy-900 mt-0.5">
              {status.paperTitle || 'Processing Question Paper...'}
            </h3>
          </div>
        </div>

        <div className="text-right flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-2xl font-black text-navy-900">
              {status.percent}%
            </span>
            <span className="text-xs text-navy-600">
              {status.questionsFound > 0
                ? `${status.questionsFound} / ${status.totalExpected} Questions`
                : 'Analyzing document'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-navy-200/50 rounded-full h-3 overflow-hidden p-0.5 mb-2">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isCompleted
              ? 'bg-emerald-600'
              : 'bg-gradient-to-r from-blue-600 via-sky-500 to-navy-900 animate-pulse'
          }`}
          style={{ width: `${Math.min(100, Math.max(5, status.percent))}%` }}
        />
      </div>

      {/* Status Details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-navy-800 gap-2 pt-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-navy-600 flex-shrink-0" />
          <span className="font-medium">{status.stageLabel}</span>
        </div>

        {isCompleted && redirectCountdown !== null && (
          <div className="flex items-center gap-2 font-semibold text-emerald-800">
            <span>Auto-launching exam in {redirectCountdown}s...</span>
            <button
              onClick={() => {
                if (status.redirectUrl) router.push(status.redirectUrl);
              }}
              className="inline-flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 py-1 rounded text-xs transition"
            >
              Start Now <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Stages Pipeline */}
      <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-navy-200/60 text-center">
        <div
          className={`text-xs py-1 px-1.5 rounded font-medium ${
            status.percent >= 15
              ? 'bg-white text-navy-900 shadow-sm border border-navy-200'
              : 'text-navy-400'
          }`}
        >
          1. PDF Structure
        </div>
        <div
          className={`text-xs py-1 px-1.5 rounded font-medium ${
            status.percent >= 35
              ? 'bg-white text-navy-900 shadow-sm border border-navy-200'
              : 'text-navy-400'
          }`}
        >
          2. OCR & Layout
        </div>
        <div
          className={`text-xs py-1 px-1.5 rounded font-medium ${
            status.percent >= 75
              ? 'bg-white text-navy-900 shadow-sm border border-navy-200'
              : 'text-navy-400'
          }`}
        >
          3. Boxed Answer Keys
        </div>
        <div
          className={`text-xs py-1 px-1.5 rounded font-medium ${
            status.percent >= 100
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-navy-400'
          }`}
        >
          4. 150 Qs Verified
        </div>
      </div>
    </div>
  );
}
