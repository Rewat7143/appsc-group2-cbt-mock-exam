'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  Settings,
  ArrowLeft,
  User,
} from 'lucide-react';
import { getPaperMetadata } from '@/lib/paper-registry';
import { getCandidate, clearExamSession, setActivePaperId } from '@/lib/storage';

function InstructionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paperId = searchParams.get('paperId') || 'paper-01';

  const [paper, setPaper] = useState(getPaperMetadata(paperId));
  const [candidate, setCandidate] = useState(getCandidate(paperId));
  const [acknowledged, setAcknowledged] = useState(false);
  const [negativeMarking, setNegativeMarking] = useState<number>(0);

  useEffect(() => {
    setActivePaperId(paperId);
    setPaper(getPaperMetadata(paperId));
    const cand = getCandidate(paperId);
    setCandidate(cand);
    if (!cand) {
      router.push(`/candidate?paperId=${paperId}`);
    }
  }, [paperId, router]);

  const handleStartExam = () => {
    if (!acknowledged) return;

    // Clear previous incomplete session to start fresh attempt
    clearExamSession(paperId);

    // Store negative marking in localStorage for this paper attempt
    localStorage.setItem(`appsc_negative_marking_${paperId}`, negativeMarking.toString());

    router.push(`/exam?paperId=${paperId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <div>
              <span className="font-extrabold text-sm md:text-base tracking-wider uppercase">
                General Instructions
              </span>
              <span className="hidden sm:inline text-xs text-slate-400 ml-2">
                | {paper?.title}
              </span>
            </div>
          </div>
          {candidate && (
            <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
              <User className="w-3.5 h-3.5 text-blue-300" />
              <span>{candidate.name}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Instructions Area */}
      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full space-y-6">
        <div className="bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden">
          {/* Title Banner */}
          <div className="bg-slate-100 border-b border-slate-300 p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h1 className="text-lg md:text-xl font-bold text-slate-900">
                Please Read the Examination Instructions Carefully
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Duration: 150 Minutes • Total Questions: 150 • Maximum Marks: 150
              </p>
            </div>
            <Link
              href={`/candidate?paperId=${paperId}`}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 self-start md:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </Link>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Instructions List */}
            <div className="space-y-3.5 text-xs md:text-sm text-slate-800 leading-relaxed font-normal">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  <strong>Total 150 Questions:</strong> The examination paper contains exactly 150 multiple choice questions divided into Section A (Social & Cultural History of Andhra Pradesh, Q1-75) and Section B (General Overview of the Indian Constitution, Q76-150).
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  <strong>Examination Duration is 150 Minutes:</strong> The countdown timer will start automatically as soon as you click the &quot;START TEST&quot; button and will display the remaining time in HH:MM:SS format.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  <strong>Marking Scheme:</strong> Each correctly answered question carries <strong>1.00 Mark</strong>. Unanswered questions carry <strong>0.00 Marks</strong>.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  4
                </span>
                <p>
                  <strong>Four Options:</strong> Each question is provided with four answer options. Candidates must select only one option as their intended answer.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  5
                </span>
                <p>
                  <strong>Single Selection:</strong> Clicking an option selects it. You can change your chosen answer at any time prior to final submission.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  6
                </span>
                <p>
                  <strong>Free Navigation:</strong> You can navigate between any questions freely using the Question Palette or the &quot;Previous&quot; and &quot;Save &amp; Next&quot; buttons.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  7
                </span>
                <p>
                  <strong>Mark for Review:</strong> You can mark questions for review if you wish to revisit them later. Questions marked for review with a selected answer will be considered for final scoring.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  8
                </span>
                <p>
                  <strong>Clear Response:</strong> If you wish to deselect an answered option without selecting a replacement, click &quot;Clear Response&quot;.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  9
                </span>
                <p>
                  <strong>Automatic Submission:</strong> The examination will automatically submit when the countdown timer reaches zero (00:00:00). All saved responses will be locked and evaluated.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  10
                </span>
                <p>
                  <strong>Confidentiality During Test:</strong> Official correct answers and detailed subject explanations are strictly hidden during the exam and will only be displayed on the post-submission Review page.
                </p>
              </div>
            </div>

            {/* Configurable Negative Marking Box */}
            <div className="bg-slate-50 border border-slate-300 rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-slate-600" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Negative Marking Configuration
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    The paper specifies 1 mark per question with 0 negative marking initially. You may configure negative penalty if practicing with standard deduction.
                  </p>
                </div>
              </div>

              <select
                value={negativeMarking}
                onChange={(e) => setNegativeMarking(parseFloat(e.target.value))}
                className="bg-white border border-slate-300 rounded px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer self-start sm:self-auto"
              >
                <option value={0}>0.00 (No Negative Marking - Official Paper)</option>
                <option value={0.33}>0.33 (1/3rd Negative Marking)</option>
                <option value={0.25}>0.25 (1/4th Negative Marking)</option>
              </select>
            </div>

            {/* Acknowledgment Checkbox */}
            <div className="pt-4 border-t border-slate-200">
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs md:text-sm font-semibold text-slate-900 group-hover:text-blue-900 leading-snug">
                  I have read, understood and agree to all the examination instructions above. I declare that I will attempt the mock exam honestly.
                </span>
              </label>
            </div>

            {/* Start Button */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={handleStartExam}
                disabled={!acknowledged}
                className={`w-full md:w-auto px-10 py-3 rounded text-sm md:text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-sm ${
                  acknowledged
                    ? 'bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
                }`}
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Start Test</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function InstructionsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold text-slate-600">Loading instructions...</div>}>
      <InstructionsContent />
    </Suspense>
  );
}
