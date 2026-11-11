'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface SubmitConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
  totalQuestions: number;
  answeredCount: number;
  notAnsweredCount: number;
  markedForReviewCount: number;
}

export default function SubmitConfirmationModal({
  isOpen,
  onClose,
  onConfirmSubmit,
  totalQuestions,
  answeredCount,
  notAnsweredCount,
  markedForReviewCount,
}: SubmitConfirmationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFinalSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    onConfirmSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 select-none">
      <div className="bg-white rounded-lg shadow-xl border border-slate-300 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center gap-2.5 border-b border-slate-800">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm tracking-wide uppercase">
            Submit Examination Confirmation
          </h3>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <p className="text-slate-800 font-semibold text-sm mb-4">
            Are you sure you want to submit your examination? Once submitted, you cannot change your answers.
          </p>

          {/* Exam Summary Table */}
          <div className="bg-slate-50 border border-slate-200 rounded p-4 mb-6 space-y-2.5 text-xs md:text-sm">
            <div className="flex justify-between items-center py-1 border-b border-slate-200">
              <span className="text-slate-600 font-medium">Total Questions:</span>
              <span className="font-bold text-slate-900">{totalQuestions}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200">
              <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                Answered:
              </span>
              <span className="font-bold text-emerald-800">{answeredCount}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200">
              <span className="text-red-700 font-medium flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                Not Answered / Visited:
              </span>
              <span className="font-bold text-red-800">{notAnsweredCount}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-purple-700 font-medium flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                Marked for Review:
              </span>
              <span className="font-bold text-purple-800">{markedForReviewCount}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded text-xs md:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors uppercase tracking-wider"
            >
              Go Back to Exam
            </button>
            <button
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="px-5 py-2 rounded text-xs md:text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-colors uppercase tracking-wider shadow-sm flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Final Submit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
