'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Clock,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Calendar,
  Layers,
} from 'lucide-react';
import { getAllPapers } from '@/lib/paper-registry';
import { setActivePaperId } from '@/lib/storage';

export default function HomePage() {
  const router = useRouter();
  const papers = getAllPapers();

  const handleStartTest = (paperId: string) => {
    setActivePaperId(paperId);
    router.push(`/candidate?paperId=${paperId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Banner / Navigation */}
      <header className="bg-slate-900 border-b border-slate-800 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center font-bold text-white shadow-inner">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm md:text-base tracking-wider text-blue-400 uppercase">
                  APPSC GROUP 2
                </span>
                <span className="text-[10px] bg-blue-900/80 text-blue-200 px-2 py-0.5 rounded border border-blue-700 font-semibold uppercase">
                  Mock Test Portal
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Andhra Pradesh Public Service Commission • Computer Based Test Interface
              </p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded border border-slate-700 font-medium">
              TCS iON CBT Exam Environment
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-4 border-b border-slate-700">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-950/90 text-blue-300 border border-blue-700/80 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>Official Previous Year Question Papers</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            APPSC GROUP 2 — MOCK TEST PORTAL
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Practice actual previous year examination question papers with authentic official boxed answer keys, real-time TCS iON countdown timer, interactive 150-question palette, and in-depth subject explanations.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              150 Verified Questions & Boxed Keys
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Official 150-Minute CBT Simulator
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Instant Score & Full Solutions Review
            </span>
          </div>
        </div>
      </section>

      {/* Main Papers Selection Section */}
      <main className="max-w-6xl mx-auto px-4 py-10 flex-1 w-full">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-700" />
              <span>Available Question Papers</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an examination paper below to start your timed computer-based mock exam.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-200 px-3 py-1 rounded-full">
            {papers.length} {papers.length === 1 ? 'Paper Available' : 'Papers Available'}
          </span>
        </div>

        {/* Papers Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper, idx) => (
            <div
              key={paper.id}
              className="bg-white border border-slate-300 rounded-lg shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden border-t-4 border-t-blue-700"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded border border-blue-200 uppercase tracking-wider">
                    PAPER {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {paper.examDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {paper.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {paper.subtitle}
                </p>

                {/* Key Metrics */}
                <div className="pt-2 grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded border border-slate-200 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">
                      Questions
                    </span>
                    <span className="font-extrabold text-slate-800 text-sm">
                      {paper.totalQuestions}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">
                      Marks
                    </span>
                    <span className="font-extrabold text-slate-800 text-sm">
                      {paper.maxMarks}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">
                      Duration
                    </span>
                    <span className="font-extrabold text-slate-800 text-sm">
                      {paper.durationMinutes}m
                    </span>
                  </div>
                </div>

                {/* Sections Overview */}
                <div className="pt-1 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-600 block uppercase tracking-wider">
                    Paper Sections:
                  </span>
                  {paper.sections.map((sec, sIdx) => (
                    <div
                      key={sIdx}
                      className="text-xs text-slate-700 bg-slate-100 px-2 py-1 rounded flex justify-between items-center"
                    >
                      <span className="truncate pr-2 font-medium">{sec.name}</span>
                      <span className="text-[11px] font-mono text-slate-500 font-semibold whitespace-nowrap">
                        Q{sec.startQuestion}-{sec.endQuestion}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <button
                  onClick={() => handleStartTest(paper.id)}
                  className="w-full bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold py-2.5 px-4 rounded text-sm shadow-sm transition-colors uppercase tracking-wider flex items-center justify-center gap-2 group"
                >
                  <span>Start Test</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}

          {/* Placeholder cards for future uploaded papers */}
          <div className="bg-slate-100/70 border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-2 text-slate-500">
            <BookOpen className="w-8 h-8 text-slate-400 mb-1" />
            <h4 className="font-bold text-sm text-slate-700">Add More Question Papers</h4>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Drop additional question paper PDFs into the <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700">pyqs/</code> directory. New papers are dynamically registered and rendered here automatically.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 px-4 text-xs select-none">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div>
            <p className="font-semibold text-slate-300">
              APPSC Group 2 Computer-Based Examination Simulator
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Inspired by the TCS iON exam engine. Built for practice and educational analysis.
            </p>
          </div>
          <div className="text-[11px] text-slate-500">
            Deployable on Vercel • Client-Side Persistence
          </div>
        </div>
      </footer>
    </div>
  );
}
