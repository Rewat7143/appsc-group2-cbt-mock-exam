'use client';

import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { formatSecondsToHHMMSS } from '@/lib/exam-engine';

interface CountdownTimerProps {
  remainingSeconds: number;
  onTimeUp?: () => void;
  compact?: boolean;
}

export default function CountdownTimer({
  remainingSeconds,
  compact = false,
}: CountdownTimerProps) {
  const isUrgent = remainingSeconds <= 300 && remainingSeconds > 0; // Less than 5 mins

  if (compact) {
    return (
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-xs font-bold border transition-colors ${
          isUrgent
            ? 'bg-red-950 text-red-400 border-red-700 animate-pulse'
            : 'bg-slate-800 text-amber-400 border-slate-700'
        }`}
      >
        <Clock className="w-3.5 h-3.5" />
        <span>{formatSecondsToHHMMSS(remainingSeconds)}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-3 px-4 py-1.5 rounded-md border shadow-sm transition-all ${
        isUrgent
          ? 'bg-red-950/80 text-red-300 border-red-600 animate-pulse'
          : 'bg-slate-800/90 text-slate-100 border-slate-700'
      }`}
    >
      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans uppercase tracking-wider">
        {isUrgent ? (
          <AlertTriangle className="w-4 h-4 text-red-400" />
        ) : (
          <Clock className="w-4 h-4 text-amber-400" />
        )}
        <span className="font-semibold text-slate-300">Time Left:</span>
      </div>
      <div
        className={`font-mono text-lg font-bold tracking-wider ${
          isUrgent ? 'text-red-400' : 'text-amber-300'
        }`}
      >
        {formatSecondsToHHMMSS(remainingSeconds)}
      </div>
    </div>
  );
}
