export type OptionId = 'A' | 'B' | 'C' | 'D' | '1' | '2' | '3' | '4';

export interface QuestionOption {
  id: string; // "A", "B", "C", "D" (or "1", "2", "3", "4")
  text: string;
  textTelugu?: string;
}

export interface Question {
  id: number;
  questionNumber: number;
  questionText: string;
  questionTextTelugu?: string;
  options: QuestionOption[];
  correctOption: string; // "A" | "B" | "C" | "D" (or "1" | "2" | "3" | "4")
  explanation: string;
  whyCorrect?: string;
  whyIncorrect?: Record<string, string | undefined>;
  sourcePage: number;
  extractionConfidence: 'high' | 'medium' | 'flagged' | string;
  verificationStatus: 'verified' | 'unverified' | string;
  section?: string;
}

export interface PaperSection {
  name: string;
  startQuestion: number;
  endQuestion: number;
}

export interface PaperMetadata {
  id: string;
  paperCode: string;
  title: string;
  subtitle: string;
  examDate: string;
  totalQuestions: number;
  maxMarks: number;
  durationMinutes: number;
  negativeMarking: number;
  sections: PaperSection[];
  extractionStatus?: {
    totalExpected: number;
    extractedCount: number;
    verifiedCount: number;
    uncertainCount: number;
    duplicateCount: number;
  };
}

export interface CandidateDetails {
  name: string;
  rollNumber: string;
}

export type QuestionPaletteStatus =
  | 'not-visited'
  | 'not-answered'
  | 'answered'
  | 'marked-review'
  | 'answered-marked-review';

export interface ExamSessionState {
  paperId: string;
  candidate: CandidateDetails;
  startTime: number; // Unix timestamp ms
  endTime: number; // Unix timestamp ms
  durationSeconds: number;
  currentQuestionIndex: number; // 0-based
  answers: Record<number, string>; // questionNumber -> optionId ('A', 'B', etc.)
  markedForReview: Record<number, boolean>;
  visitedQuestions: Record<number, boolean>;
  isSubmitted: boolean;
  submittedAt?: number;
}

export interface ExamResult {
  paperId: string;
  paperTitle: string;
  candidate: CandidateDetails;
  completionDate: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  totalMarks: number;
  marksObtained: number;
  accuracyPercentage: number;
  negativeMarking: number;
  userAnswers: Record<number, string>;
}
