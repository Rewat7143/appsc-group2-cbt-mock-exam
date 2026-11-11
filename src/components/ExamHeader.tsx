'use client';

import React from 'react';
import { User, ShieldCheck } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface ExamHeaderProps {
  paperTitle: string;
  candidateName: string;
  rollNumber: string;
  remainingSeconds: number;
  onTimeUp: () => void;
  showTimer?: boolean;
}

export default function ExamHeader({
  paperTitle,
  candidateName,
  rollNumber,
  remainingSeconds,
  onTimeUp,
  showTimer = true,
}: ExamHeaderProps) {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-700 select-none shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Exam and Commission Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-inner">
              <ShieldCheck className="w-5 h-5 text-blue-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wide text-blue-400 uppercase">
                  APPSC GROUP 2 CBT
                </span>
                <span className="text-[10px] bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded border border-blue-800">
                  PAPER – I
                </span>
              </div>
              <h1 className="text-xs text-slate-300 font-medium truncate max-w-[280px] md:max-w-[400px]">
                {paperTitle}
              </h1>
            </div>
          </div>

          {/* Mobile timer */}
          {showTimer && (
            <div className="block md:hidden">
              <CountdownTimer remainingSeconds={remainingSeconds} onTimeUp={onTimeUp} compact />
            </div>
          )}
        </div>

        {/* Center: Desktop Timer */}
        {showTimer && (
          <div className="hidden md:flex items-center justify-center">
            <CountdownTimer remainingSeconds={remainingSeconds} onTimeUp={onTimeUp} />
          </div>
        )}

        {/* Right: Candidate Profile */}
        <div className="flex items-center gap-3 bg-slate-800/80 px-3 py-1.5 rounded border border-slate-700 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right">
            <div className="text-xs font-semibold text-white tracking-wide">
              {candidateName || 'Candidate'}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Roll: <span className="text-blue-300 font-semibold">{rollNumber || 'APPSC-001'}</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
