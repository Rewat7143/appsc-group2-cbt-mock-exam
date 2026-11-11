import { QuestionPaletteStatus } from '@/types/exam';

export function getQuestionStatus(
  qNumber: number,
  answers: Record<number, string>,
  markedForReview: Record<number, boolean>,
  visitedQuestions: Record<number, boolean>
): QuestionPaletteStatus {
  const isAnswered = !!answers[qNumber];
  const isMarked = !!markedForReview[qNumber];
  const isVisited = !!visitedQuestions[qNumber];

  if (isAnswered && isMarked) {
    return 'answered-marked-review';
  }
  if (isMarked) {
    return 'marked-review';
  }
  if (isAnswered) {
    return 'answered';
  }
  if (isVisited) {
    return 'not-answered';
  }
  return 'not-visited';
}

export function formatSecondsToHHMMSS(totalSeconds: number): string {
  if (totalSeconds < 0) totalSeconds = 0;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
}
