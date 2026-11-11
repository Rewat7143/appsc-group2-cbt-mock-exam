'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  X,
  FileCheck,
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
  const [dismissed, setDismissed] = useState(false);
  const [lastNotifiedPaper, setLastNotifiedPaper] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const res = await fetch('/api/processing-status', { cache: 'no-store' });
        if (res.ok) {
          const data: ProcessingStatus = await res.json();
          setStatus(data);

          // If extraction completed, notify parent to refresh paper list
          if (data.completed && data.paperId && data.paperId !== lastNotifiedPaper) {
            setLastNotifiedPaper(data.paperId);
            if (onPaperReady) {
              onPaperReady(data.paperId);
            }
          }
        }
      } catch (err) {
        console.error('Failed to poll status', err);
      }
    };

    checkStatus();
    interval = setInterval(checkStatus, 1500);

    return () => clearInterval(interval);
  }, [lastNotifiedPaper, onPaperReady]);

  if (dismissed || !status || (!status.active && !status.completed)) {
    return null;
  }

  const isCompleted = status.completed;
  const isError = !!status.error;

  return (
    <div
      className={`w-full rounded-lg border p-4 sm:p-5 transition-all mb-6 relative ${
        isCompleted
          ? 'bg-emerald-50 border-emerald-300 shadow-xs'
          : isError
          ? 'bg-red-50 border-red-300 shadow-xs'
          : 'bg-blue-50 border-blue-300 shadow-sm'
      }`}
    >
      {/* Dismiss Button */}
      {isCompleted && (
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 text-emerald-600 hover:text-emerald-800 p-1 rounded-md hover:bg-emerald-100/60 transition"
          title="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pr-6 sm:pr-8">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-md ${
              isCompleted
                ? 'bg-emerald-600 text-white'
                : isError
                ? 'bg-red-600 text-white'
                : 'bg-blue-700 text-white'
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
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  isCompleted
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-white text-slate-800 border-slate-300'
                }`}
              >
                {isCompleted ? 'Upload & Extraction Finished' : 'Extracting Question Paper'}
              </span>
              <span className="text-xs text-slate-600 truncate max-w-[200px] sm:max-w-xs">
                {status.filename || 'PYQ Document'}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              {status.paperTitle || 'Processing Question Paper...'}
            </h3>
          </div>
        </div>

        <div className="text-left sm:text-right flex items-center sm:flex-col sm:items-end justify-between">
          <span className="text-2xl font-black text-slate-900">
            {status.percent}%
          </span>
          <span className="text-xs text-slate-600 font-medium">
            {status.questionsFound > 0
              ? `${status.questionsFound} / ${status.totalExpected} Questions Verified`
              : 'Analyzing document structure'}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden p-0.5 mb-2.5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isCompleted
              ? 'bg-emerald-600'
              : 'bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 animate-pulse'
          }`}
          style={{ width: `${Math.min(100, Math.max(5, status.percent))}%` }}
        />
      </div>

      {/* Status Details & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-800 gap-3 pt-1">
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <FileCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
          )}
          <span className={`font-semibold ${isCompleted ? 'text-emerald-900' : 'text-slate-800'}`}>
            {isCompleted
              ? 'Upload finished! 150 questions & official keys ready. Select "Start Test" below whenever you are ready.'
              : status.stageLabel}
          </span>
        </div>

        {isCompleted && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (status.redirectUrl) router.push(status.redirectUrl);
              }}
              className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold px-3 py-1.5 rounded text-xs transition shadow-xs uppercase tracking-wider"
            >
              <span>Start Examination</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Pipeline Stage Indicators */}
      <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-200/80 text-center">
        <div
          className={`text-xs py-1 px-1 rounded font-medium ${
            status.percent >= 15
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-400'
          }`}
        >
          1. PDF Structure
        </div>
        <div
          className={`text-xs py-1 px-1 rounded font-medium ${
            status.percent >= 35
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-400'
          }`}
        >
          2. OCR & Layout
        </div>
        <div
          className={`text-xs py-1 px-1 rounded font-medium ${
            status.percent >= 75
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-400'
          }`}
        >
          3. Boxed Keys
        </div>
        <div
          className={`text-xs py-1 px-1 rounded font-medium ${
            status.percent >= 100
              ? 'bg-emerald-600 text-white font-bold shadow-2xs'
              : 'text-slate-400'
          }`}
        >
          4. 150 Qs Ready
        </div>
      </div>
    </div>
  );
}
