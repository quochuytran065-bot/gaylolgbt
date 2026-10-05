export type Subject = 
  | 'Tất cả môn'
  | 'Toán học'
  | 'Vật lý'
  | 'Hóa học'
  | 'Sinh học'
  | 'Tiếng Anh'
  | 'Ngữ văn'
  | 'Lịch sử'
  | 'Địa lí'
  | 'GDKT & PL'
  | 'Tin học'
  | 'Công nghệ';

export type GradeLevel = 
  | 'Tất cả lớp'
  | 'Lớp 10'
  | 'Lớp 11'
  | 'Lớp 12'
  | 'Đại học';

export interface User {
  id: string;
  username: string; // Tên đăng nhập
  password?: string; // Mật khẩu
  name: string; // Họ và tên
  email: string;
  avatar?: string;
  grade: string;
  school?: string;
  role: 'student' | 'teacher' | 'admin'; // Quyền hạn (chỉ admin mới có quyền quản trị)
  savedDocuments: string[]; // document IDs
  createdAt: string;
}

export type DocumentCategory = 'all' | 'de-cuong' | 'on-thi' | 'chuyen-de' | 'cong-thuc';

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  grade: GradeLevel;
  fileType: 'pdf' | 'docx' | 'direct';
  fileSize: string;
  pageCount: number;
  author: string;
  views: number;
  downloads: number;
  publishedDate: string;
  readTimeMinutes: number;
  coverImage?: string;
  directContent: {
    summary: string;
    sections: {
      title: string;
      content: string;
      formulasOrNotes?: string[];
    }[];
    importantTakeaways: string[];
  };
  source?: string;
  sourceUrl?: string;
  downloadUrl?: string;
  category?: DocumentCategory;
  isAutoSynced?: boolean;
}

export type ChoiceKey = 'A' | 'B' | 'C' | 'D';
export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer';

export interface QuestionOption {
  key: ChoiceKey;
  label: string;
}

export interface TrueFalseItem {
  id: 'a' | 'b' | 'c' | 'd';
  text: string;
  correctAnswer: boolean; // true = Đúng, false = Sai
}

export interface Question {
  id: number;
  type?: QuestionType; // default 'multiple_choice'
  part?: 'I' | 'II' | 'III'; // Format Bộ GD&ĐT 2025: Phần I, II, III
  text: string;
  passage?: string;
  options?: QuestionOption[]; // Dành cho Phần I (trắc nghiệm 4 lựa chọn)
  correctAnswer?: ChoiceKey;   // Dành cho Phần I
  trueFalseItems?: TrueFalseItem[]; // Dành cho Phần II (Đúng/Sai)
  shortAnswerCorrect?: string;      // Dành cho Phần III (Điền đáp số)
  explanation: string;
  topic?: string;
  difficulty?: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';
  errorCategory?: 'Lý thuyết' | 'Tính toán' | 'Bẫy đề thi' | 'Phương pháp' | 'Ngữ pháp';
  // Chú thích sai ở đâu:
  whyWrongMap?: Record<string, string>; // Map từ đáp án sai A/B/C/D hoặc ý sai a/b/c/d sang giải thích vì sao sai
  mistakeAdvice?: string; // Lời khuyên & cạm bẫy thường gặp
  keyFormula?: string; // Công thức / định lý trọng tâm cần nhớ
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  grade: GradeLevel;
  durationMinutes: number; // e.g. 50, 90
  difficulty: 'Cơ bản' | 'Khá' | 'Nâng cao' | 'Thi thử THPT' | 'Format Chuẩn BGD 2025' | 'Thi thử THPT Chuẩn Hóa' | 'Trường Chuyên' | 'HSG Quốc Gia' | string;
  isBGDFormat?: boolean; // Đề thi theo cấu trúc mới Bộ Giáo Dục 2025/2026
  examCode?: string; // Mã đề: Mã 101, Mã 204...
  questions: Question[];
  author: string;
  attemptsCount: number;
  averageScore?: number;
}

export interface TrueFalseUserAnswer {
  a?: boolean;
  b?: boolean;
  c?: boolean;
  d?: boolean;
}

export interface ExamResult {
  id: string;
  examId: string;
  examTitle: string;
  examCode?: string;
  subject: Subject;
  grade: GradeLevel;
  userId: string;
  userName: string;
  score: number; // Scale 10
  scorePercentage: number;
  partScores?: {
    partI: number; // Điểm Phần I (trắc nghiệm 4 lựa chọn)
    partII: number; // Điểm Phần II (Đúng/Sai theo bậc thang BGD)
    partIII: number; // Điểm Phần III (Trả lời ngắn)
  };
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  timeSpentSeconds: number;
  submittedAt: string;
  dateKey?: string; // YYYY-MM-DD
  userAnswers: Record<number, ChoiceKey>; // questionId -> option key (Phần I)
  userTrueFalseAnswers?: Record<number, TrueFalseUserAnswer>; // questionId -> { a, b, c, d } (Phần II)
  userShortAnswers?: Record<number, string>; // questionId -> input string (Phần III)
  questions: Question[];
  mistakeAnalysis?: {
    topicErrors: Record<string, number>;
    categoryErrors: Record<string, number>;
    recommendations: string[];
  };
}

// Mục tiêu điểm số & đếm ngược
export interface StudyGoal {
  targetScore: number; // e.g. 9.0 or 27.5
  targetSubject: string; // e.g. 'Toán học' or 'Khối A00'
  targetDate: string; // e.g. '2026-06-26'
  examName: string; // e.g. 'Kỳ thi Tốt nghiệp THPT Quốc gia 2026'
  dailyQuestionsTarget: number; // e.g. 20 câu/ngày
}

// Thống kê từng ngày
export interface DailyStats {
  date: string; // YYYY-MM-DD
  dayLabel: string; // Thứ 2, Thứ 3...
  examsCount: number;
  questionsSolved: number;
  averageScore: number;
  studyTimeMinutes: number;
}

// Tổng hợp môn học
export interface SubjectOverview {
  subject: Subject;
  examsTaken: number;
  averageScore: number;
  highestScore: number;
  accuracyRate: number;
  strengthLevel: 'Thế mạnh' | 'Ổn định' | 'Cần cải thiện' | 'Chưa thi';
}

// ─── Sổ tay Từ Vựng & Công Thức ──────────────────────────────────
export type NotebookEntryType = 'formula' | 'vocab' | 'question' | 'difficult_question';

export interface NotebookEntry {
  id: string;
  type: NotebookEntryType;
  subject: Subject;
  grade: GradeLevel;
  title: string;
  front?: string; // Mặt trước flashcard (từ vựng / tên công thức / câu hỏi)
  back?: string;  // Mặt sau flashcard (nghĩa & phiên âm / công thức toán học / đáp án & lời giải)
  content?: string;
  keyFormula?: string;
  explanation?: string;
  source?: string;
  mastered?: boolean;
  createdAt?: string;
  exampleOrNote?: string;
  category?: string;
  isMastered?: boolean; // Đã thuộc hay chưa
  savedAt?: string;
  originalQuestion?: Question;
}

// ─── Khóa Học Trực Tuyến & Chứng Chỉ LMS ─────────────────────────
export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl: string;
  youtubeWatchUrl?: string;
  backupVideoUrl?: string;
  summary: string;
  keySteps?: string[];
  casioKeys?: string;
  formulaTips?: string;
  isCompleted?: boolean;
}

export interface CourseChapter {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorTitle: string;
  subject: Subject;
  grade: GradeLevel;
  thumbnail: string;
  chapters: CourseChapter[];
  totalDuration: string;
  totalLessons: number;
  rating: number;
  enrolledCount: number;
  badge?: string;
}

export interface CourseCertificate {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  certificateCode: string;
  score: number;
}

// ─── Đấu Trường Gamification & Bảng Xếp Hạng ──────────────────────
export type UserRankTier = 'Đồng' | 'Bạc' | 'Vàng' | 'Bạch Kim' | 'Kim Cương' | 'Cao Thủ';

export interface LeaderboardUser {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  school?: string;
  province?: string;
  xp: number;
  streakDays: number;
  tier: UserRankTier;
  accuracyRate: number;
  mockExamsPassed: number;
}

export interface ArenaQuestion {
  id: number;
  text: string;
  options: { key: ChoiceKey; label: string }[];
  correctAnswer: ChoiceKey;
  explanation: string;
  timeLimitSeconds: number;
}

// ─── Phòng Học Tập Chung (Focus Study Room & Pomodoro) ────────────
export type AmbientSoundType = 'rain' | 'waves' | 'cafe' | 'lofi' | 'silence';

export interface FocusParticipant {
  id: string;
  name: string;
  avatar: string;
  currentTask: string;
  focusMinutesToday: number;
  isCamOn: boolean;
}

// ─── Diễn Đàn & Hỏi Đáp Trực Tuyến 24/7 ───────────────────────────
export interface ForumReply {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'student' | 'teacher' | 'ai_tutor';
  content: string;
  createdAt: string;
  likesCount: number;
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  subject: Subject;
  grade: GradeLevel;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likesCount: number;
  repliesCount: number;
  isSolved: boolean;
  replies: ForumReply[];
}
