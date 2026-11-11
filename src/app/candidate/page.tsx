'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  Hash,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { getPaperMetadata } from '@/lib/paper-registry';
import { getCandidate, saveCandidate, setActivePaperId } from '@/lib/storage';

function CandidateDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paperId = searchParams.get('paperId') || searchParams.get('paper') || 'paper-01';

  const [paper, setPaper] = useState(getPaperMetadata(paperId));
  const [candidateName, setCandidateName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setActivePaperId(paperId);
    setPaper(getPaperMetadata(paperId));

    // Pre-fill if exists in local storage
    const existing = getCandidate(paperId);
    if (existing) {
      setCandidateName(existing.name || '');
      setRollNumber(existing.rollNumber || '');
    }
  }, [paperId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!rollNumber.trim()) {
      setError('Please enter your Hall Ticket / Roll Number.');
      return;
    }

    saveCandidate(paperId, {
      name: candidateName.trim(),
      rollNumber: rollNumber.trim().toUpperCase(),
    });

    router.push(`/instructions?paperId=${paperId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <span className="font-extrabold text-sm md:text-base tracking-wider uppercase">
              APPSC Group 2 Candidate Verification
            </span>
          </div>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change Paper</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-xl mx-auto px-4 py-12 flex-1 w-full flex flex-col justify-center">
        <div className="bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden">
          {/* Card Top Title */}
          <div className="bg-slate-100 border-b border-slate-300 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">
              <FileText className="w-4 h-4 text-blue-700" />
              <span>Selected Examination Paper</span>
            </div>
            <h1 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
              {paper?.title || 'APPSC Group 2 Examination'}
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              {paper?.subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            <div>
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Candidate Information
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Please enter your credentials to initiate your examination session.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-800 p-3 rounded text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Candidate Name Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="candidateName"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wide"
              >
                Candidate Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="candidateName"
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={candidateName}
                  onChange={(e) => {
                    setCandidateName(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Hall Ticket / Roll Number Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="rollNumber"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wide"
              >
                Hall Ticket / Roll Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  id="rollNumber"
                  type="text"
                  required
                  placeholder="e.g. APPSC-2025-10492"
                  value={rollNumber}
                  onChange={(e) => {
                    setRollNumber(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all uppercase font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Enter any alphanumeric mock roll number for your session.
              </p>
            </div>

            {/* Quick Demo Pre-fill Pill */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setCandidateName('Rewat Sharma');
                  setRollNumber('APPSC-2025-0824');
                  setError('');
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
              >
                Click to fill sample details
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200">
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold py-2.5 px-4 rounded text-sm shadow-sm transition-colors uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Continue to Instructions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function CandidatePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold text-slate-600">Loading candidate page...</div>}>
      <CandidateDetailsContent />
    </Suspense>
  );
}
