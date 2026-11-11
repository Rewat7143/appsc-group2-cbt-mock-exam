import { CandidateDetails, ExamResult, ExamSessionState } from '@/types/exam';

const CANDIDATE_KEY_PREFIX = 'appsc_cbt_candidate_';
const SESSION_KEY_PREFIX = 'appsc_cbt_session_';
const RESULT_KEY_PREFIX = 'appsc_cbt_result_';
const ACTIVE_PAPER_KEY = 'appsc_cbt_active_paper';

export function setActivePaperId(paperId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_PAPER_KEY, paperId);
}

export function getActivePaperId(): string {
  if (typeof window === 'undefined') return 'paper-01';
  return localStorage.getItem(ACTIVE_PAPER_KEY) || 'paper-01';
}

export function saveCandidate(paperId: string, candidate: CandidateDetails): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${CANDIDATE_KEY_PREFIX}${paperId}`, JSON.stringify(candidate));
}

export function getCandidate(paperId: string): CandidateDetails | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(`${CANDIDATE_KEY_PREFIX}${paperId}`);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function saveExamSession(state: ExamSessionState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${SESSION_KEY_PREFIX}${state.paperId}`, JSON.stringify(state));
}

export function getExamSession(paperId: string): ExamSessionState | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(`${SESSION_KEY_PREFIX}${paperId}`);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function clearExamSession(paperId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(`${SESSION_KEY_PREFIX}${paperId}`);
}

export function saveExamResult(result: ExamResult): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${RESULT_KEY_PREFIX}${result.paperId}`, JSON.stringify(result));
}

export function getExamResult(paperId: string): ExamResult | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(`${RESULT_KEY_PREFIX}${paperId}`);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function clearExamResult(paperId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(`${RESULT_KEY_PREFIX}${paperId}`);
}
