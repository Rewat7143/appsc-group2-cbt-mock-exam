import { CandidateDetails, ExamResult, Question } from '@/types/exam';

export function calculateExamScore(
  paperId: string,
  paperTitle: string,
  candidate: CandidateDetails,
  questions: Question[],
  userAnswers: Record<number, string>,
  negativeMarking: number = 0
): ExamResult {
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  questions.forEach((q) => {
    const selected = userAnswers[q.questionNumber];
    if (!selected) {
      unansweredCount++;
    } else if (selected === q.correctOption) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const totalQuestions = questions.length;
  // Score formula: (Correct * 1) - (Incorrect * negativeMarking)
  const rawScore = correctCount * 1 - incorrectCount * negativeMarking;
  const marksObtained = Math.max(0, parseFloat(rawScore.toFixed(2)));

  const totalAttempted = correctCount + incorrectCount;
  const accuracyPercentage =
    totalAttempted > 0 ? parseFloat(((correctCount / totalAttempted) * 100).toFixed(2)) : 0;

  return {
    paperId,
    paperTitle,
    candidate,
    completionDate: new Date().toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }),
    totalQuestions,
    correctAnswers: correctCount,
    incorrectAnswers: incorrectCount,
    unansweredQuestions: unansweredCount,
    totalMarks: totalQuestions,
    marksObtained,
    accuracyPercentage,
    negativeMarking,
    userAnswers,
  };
}
