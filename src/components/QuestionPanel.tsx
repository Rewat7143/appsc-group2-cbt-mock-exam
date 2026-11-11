'use client';

import React from 'react';
import { Question } from '@/types/exam';

interface QuestionPanelProps {
  question: Question;
  selectedOption: string | undefined;
  onSelectOption: (optionId: string) => void;
  negativeMarking: number;
}

export default function QuestionPanel({
  question,
  selectedOption,
  onSelectOption,
  negativeMarking,
}: QuestionPanelProps) {
  // Format question text with preserved linebreaks and bold labels
  const formattedText = question.questionText.split('\n').map((line, idx) => (
    <p key={idx} className={`${line.trim() === '' ? 'h-2' : 'my-1'} text-slate-800 leading-relaxed`}>
      {line}
    </p>
  ));

  return (
    <div className="bg-white border border-slate-300 rounded shadow-sm flex flex-col h-full overflow-hidden">
      {/* Top Bar: Question Number & Marks */}
      <div className="bg-slate-100 border-b border-slate-300 px-5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-900 text-base">
            Question No. {question.questionNumber}
          </span>
          <span className="text-xs font-medium text-slate-600 bg-slate-200 px-2.5 py-0.5 rounded border border-slate-300">
            {question.section || 'General Studies'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            +1.00 Mark
          </span>
          <span className="text-slate-600 bg-slate-200 px-2 py-0.5 rounded border border-slate-300">
            -{negativeMarking.toFixed(2)} Negative
          </span>
        </div>
      </div>

      {/* Main Question Scrollable Body */}
      <div className="p-5 md:p-6 overflow-y-auto flex-1 font-sans">
        <div className="text-slate-900 text-sm md:text-base font-medium mb-6">
          {formattedText}
        </div>

        {/* Four Selectable Answer Options */}
        <div className="space-y-3 mt-4">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <label
                key={opt.id}
                onClick={() => onSelectOption(opt.id)}
                className={`flex items-start gap-3 p-3.5 rounded border text-sm md:text-base cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-blue-50/90 border-blue-600 text-blue-950 font-medium ring-1 ring-blue-600 shadow-xs'
                    : 'bg-slate-50/70 hover:bg-slate-100 border-slate-300 text-slate-800'
                }`}
              >
                <div className="pt-0.5 flex-shrink-0">
                  <input
                    type="radio"
                    name={`q_${question.questionNumber}`}
                    checked={isSelected}
                    onChange={() => onSelectOption(opt.id)}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
                <div className="flex-1 flex items-start gap-2">
                  <span className="font-bold text-slate-700">({opt.id})</span>
                  <span className="leading-snug">{opt.text}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
