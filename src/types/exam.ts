 // ─── Exam Types ──────────────────────────────────────────────────────────────

export type SubjectId = 'math' | 'physics' | 'chemistry' | 'english' | 'informatics' | 'biology';

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  vietnameseName: string;
  icon: string;
  color: string;
  badgeBg: string;
  topics: string[];
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export type ErrorType = 'conceptual' | 'calculation' | 'trap' | 'misreading' | 'time_pressure';

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  formula?: string;
}

export interface Question {
  id: string;
  subject: SubjectId;
  grade: number; // 10, 11, 12
  topic: string;
  difficulty: DifficultyLevel;
  content: string;
  imageUrl?: string;
  options: QuestionOption[];
  correctOptionId: string;
  solution: string; // Lời giải chi tiết
  /**
   * Chú thích sai ở đâu:
   * Map từ optionId (ví dụ 'A', 'B', 'C') sang phân tích tại sao phương án đó sai
   * và học sinh hay nhầm lẫn ở điểm nào.
   */
  mistakeAnalysis: Record<string, {
    whyWrong: string; // Sai ở đâu
    commonMistake: string; // Cạm bẫy / nguyên nhân nhầm lẫn phổ biến
    knowledgeGap: string; // Kiến thức cốt lõi bị hổng
  }>;
  errorType: ErrorType;
  remedyTip: string; // Lời khuyên & phương pháp giải chuẩn
  formulaRef?: string; // Công thức / Định lý cần nhớ
}

export interface ExamConfig {
  id: string;
  code: string; // Mã đề: ví dụ "MÃ 204", "MÃ 508"
  title: string;
  subject: SubjectId;
  grade: number;
  questionCount: number;
  durationMinutes: number; // Thời gian làm bài (phút)
  difficulty: 'mixed' | DifficultyLevel;
  mode: 'exam' | 'practice'; // 'exam': bấm giờ chuẩn thi thử, 'practice': luyện tập tự do
  topics?: string[];
}

export interface ExamSessionQuestion {
  question: Question;
  selectedOptionId?: string;
  isFlagged?: boolean;
  timeSpentSeconds?: number;
}

export interface ExamSession {
  id: string;
  examCode: string;
  title: string;
  subject: SubjectId;
  totalQuestions: number;
  durationMinutes: number;
  timeRemainingSeconds: number;
  startedAt: string;
  completedAt?: string;
  isSubmitted: boolean;
  questions: ExamSessionQuestion[];
}

export interface ExamResult {
  id: string;
  sessionId: string;
  examCode: string;
  title: string;
  subject: SubjectId;
  score: number; // Thang 10 (ví dụ 8.5)
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  timeSpentSeconds: number;
  completedAt: string;
  questions: Array<{
    question: Question;
    userAnswer?: string;
    isCorrect: boolean;
    mistakeDetail?: {
      whyWrong: string;
      commonMistake: string;
      knowledgeGap: string;
    };
  }>;
  // Thống kê phân tích
  topicBreakdown: Array<{
    topic: string;
    total: number;
    correct: number;
    incorrect: number;
    accuracyPercent: number;
  }>;
  errorTypeStats: Record<ErrorType, number>;
  // Giải pháp đề xuất
  remedyPlan: {
    overallDiagnosis: string;
    weakestTopics: string[];
    priorityActions: Array<{
      topic: string;
      advice: string;
      keyFormulas: string[];
      suggestedPracticeCount: number;
    }>;
  };
}

export interface MistakeHistoryItem {
  id: string;
  question: Question;
  userAnswer: string;
  examCode: string;
  examTitle: string;
  date: string;
  resolved: boolean;
}
