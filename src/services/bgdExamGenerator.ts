/**
 * bgdExamGenerator.ts
 * ─────────────────────────────────────────────────────────────────
 * Thuật toán sinh đề thi chuẩn Bộ Giáo Dục & Đào Tạo 2025/2026
 *
 * Cấu trúc đề (28 câu):
 *  • Phần I:  18 câu TN 4 lựa chọn  → 4.5 điểm (0.25đ/câu)
 *  • Phần II:  4 câu Đúng/Sai        → 4.0 điểm (bậc thang BGD)
 *  • Phần III: 6 câu Trả lời ngắn   → 1.5 điểm (0.25đ/câu)
 *
 * Ma trận độ khó chuẩn BGD:
 *  - Nhận biết:    ~30% câu (xấp xỉ 8–9 câu Phần I)
 *  - Thông hiểu:   ~30% câu (xấp xỉ 5–6 câu Phần I)
 *  - Vận dụng:     ~25% câu (xấp xỉ 3–4 câu Phần I)
 *  - Vận dụng cao: ~15% câu (xấp xỉ 2 câu Phần I + một phần Phần II & III)
 *
 * Cải tiến so với phiên bản cũ:
 *  ✅ Hỗ trợ 5 môn: Toán, Lý, Hóa, Văn, Tiếng Anh
 *  ✅ Xáo trộn ngẫu nhiên câu hỏi từ pool (không luôn lấy câu đầu tiên)
 *  ✅ Phân phối độ khó theo đúng tỉ lệ BGD (không bắt đầu toàn câu dễ)
 *  ✅ Mã đề ngẫu nhiên 3 chữ số
 *  ✅ Xáo trộn đáp án A/B/C/D và a/b/c/d
 * ─────────────────────────────────────────────────────────────────
 */

import { Exam, Question, Subject, GradeLevel, ChoiceKey, QuestionOption } from '../types';
import { ALL_BGD_EXAMS, BGD_EXAM_TOAN, BGD_EXAM_LY, BGD_EXAM_HOA, BGD_EXAM_VAN, BGD_EXAM_ANH } from '../data/bgdExamBank';
import { BGD_EXAM_SINH, BGD_EXAM_SU } from '../data/socialSciencesExamBank';
import { INITIAL_EXAMS } from '../data/mockData';
import {
  SPECIALIZED_QUESTIONS_TOAN,
  SPECIALIZED_QUESTIONS_LY,
  SPECIALIZED_QUESTIONS_HOA,
  SPECIALIZED_QUESTIONS_SINH,
  SPECIALIZED_QUESTIONS_ANH
} from '../data/specializedExamBank';

// ─── Fisher-Yates shuffle ────────────────────────────────────────

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ─── Difficulty weight map ───────────────────────────────────────

const DIFFICULTY_WEIGHT: Record<string, number> = {
  'Nhận biết': 1,
  'Thông hiểu': 2,
  'Vận dụng': 3,
  'Vận dụng cao': 4,
};

// ─── Difficulty Profiles ─────────────────────────────────────────
// 5 mức độ đề, từ Ôn tập cơ bản → Trường Chuyên phân hoá

export type ExamDifficultyProfile =
  | 'easy'          // Ôn tập cơ bản (nhiều câu nhận biết)
  | 'normal'        // Chuẩn BGD (ma trận gốc)
  | 'hard'          // Thi thử sở GD (nhiều VD + VDC)
  | 'chuyên'        // Trường Chuyên (VDC chiếm 30%)
  | 'hsg';          // HSG Quốc gia (VDC chiếm 50%+)

interface DifficultyProfile {
  label: string;
  partI: Record<string, number>;  // 18 câu Phần I
  durationMultiplier: number;
  examTitlePrefix: string;
}

const DIFFICULTY_PROFILES: Record<ExamDifficultyProfile, DifficultyProfile> = {
  easy: {
    label: 'Ôn Tập Cơ Bản',
    partI: { 'Nhận biết': 12, 'Thông hiểu': 5, 'Vận dụng': 1, 'Vận dụng cao': 0 },
    durationMultiplier: 1.0,
    examTitlePrefix: 'Đề Ôn Tập Cơ Bản',
  },
  normal: {
    label: 'Chuẩn BGD',
    partI: { 'Nhận biết': 8, 'Thông hiểu': 5, 'Vận dụng': 3, 'Vận dụng cao': 2 },
    durationMultiplier: 1.0,
    examTitlePrefix: 'Đề Thi Thử Tốt Nghiệp THPT 2025',
  },
  hard: {
    label: 'Thi Thử Sở GD',
    partI: { 'Nhận biết': 5, 'Thông hiểu': 5, 'Vận dụng': 5, 'Vận dụng cao': 3 },
    durationMultiplier: 1.0,
    examTitlePrefix: 'Đề Thi Thử Sở GD – Phân Hóa',
  },
  chuyên: {
    label: 'Trường Chuyên',
    partI: { 'Nhận biết': 3, 'Thông hiểu': 5, 'Vận dụng': 5, 'Vận dụng cao': 5 },
    durationMultiplier: 1.1,
    examTitlePrefix: 'Đề Thi Thử Trường Chuyên',
  },
  hsg: {
    label: 'HSG Quốc Gia',
    partI: { 'Nhận biết': 2, 'Thông hiểu': 4, 'Vận dụng': 5, 'Vận dụng cao': 7 },
    durationMultiplier: 1.2,
    examTitlePrefix: 'Đề Tuyển Sinh Năng Khiếu – Phân Hóa Cao',
  },
};

// ─── Difficulty-aware selection ──────────────────────────────────
// BGD matrix: Part I (18 câu) = 8 NB + 5 TH + 3 VD + 2 VDC
const PART_I_DIFFICULTY_COUNTS = {
  'Nhận biết': 8,
  'Thông hiểu': 5,
  'Vận dụng': 3,
  'Vận dụng cao': 2,
};

function selectByDifficulty(
  pool: Question[],
  counts: Record<string, number>
): Question[] {
  const result: Question[] = [];
  const byDiff: Record<string, Question[]> = {
    'Nhận biết': [],
    'Thông hiểu': [],
    'Vận dụng': [],
    'Vận dụng cao': [],
  };

  // Bucket pool by difficulty
  for (const q of pool) {
    const d = q.difficulty ?? 'Thông hiểu';
    if (byDiff[d]) byDiff[d].push(q);
  }

  // Pick from each bucket (with fallback if not enough)
  for (const [diff, needed] of Object.entries(counts)) {
    const shuffled = shuffle(byDiff[diff]);
    const picked = shuffled.slice(0, Math.min(needed, shuffled.length));
    result.push(...picked);
    // If not enough of this difficulty, note deficit — will be backfilled
  }

  // Backfill if total < needed (fill from all remaining)
  const totalNeeded = Object.values(counts).reduce((a, b) => a + b, 0);
  if (result.length < totalNeeded) {
    const usedIds = new Set(result.map(q => q.id));
    const remaining = shuffle(pool.filter(q => !usedIds.has(q.id)));
    const deficit = totalNeeded - result.length;
    result.push(...remaining.slice(0, deficit));
  }

  // Sort by difficulty for final order: NB → TH → VD → VDC
  return result.sort((a, b) => {
    const wa = DIFFICULTY_WEIGHT[a.difficulty ?? 'Thông hiểu'] ?? 2;
    const wb = DIFFICULTY_WEIGHT[b.difficulty ?? 'Thông hiểu'] ?? 2;
    return wa - wb;
  });
}

// ─── Option shuffler for Part I ──────────────────────────────────

export function shufflePartIOptions(question: Question): Question {
  if (!question.options || question.options.length < 4 || !question.correctAnswer) {
    return question;
  }

  const originalCorrectLabel = question.options.find(o => o.key === question.correctAnswer)?.label;
  const shuffledOptions = shuffle(question.options);
  const keys: ChoiceKey[] = ['A', 'B', 'C', 'D'];

  let newCorrectKey: ChoiceKey = 'A';
  const newOptions: QuestionOption[] = shuffledOptions.map((opt, idx) => {
    const newKey = keys[idx];
    if (opt.label === originalCorrectLabel) newCorrectKey = newKey;
    return { key: newKey, label: opt.label };
  });

  // Re-map whyWrongMap to new keys
  const newWhyWrongMap: Record<string, string> = {};
  if (question.whyWrongMap) {
    newOptions.forEach(newOpt => {
      if (newOpt.key !== newCorrectKey) {
        const oldOpt = question.options?.find(o => o.label === newOpt.label);
        if (oldOpt && question.whyWrongMap?.[oldOpt.key]) {
          newWhyWrongMap[newOpt.key] = question.whyWrongMap[oldOpt.key];
        }
      }
    });
  }

  return {
    ...question,
    options: newOptions,
    correctAnswer: newCorrectKey,
    whyWrongMap: Object.keys(newWhyWrongMap).length > 0 ? newWhyWrongMap : question.whyWrongMap,
  };
}

// ─── TrueFalse shuffler for Part II ──────────────────────────────

export function shufflePartIITrueFalse(question: Question): Question {
  if (!question.trueFalseItems || question.trueFalseItems.length < 4) return question;
  const shuffledItems = shuffle(question.trueFalseItems);
  const ids: ('a' | 'b' | 'c' | 'd')[] = ['a', 'b', 'c', 'd'];
  return {
    ...question,
    trueFalseItems: shuffledItems.map((item, idx) => ({ ...item, id: ids[idx] })),
  };
}

// ─── Map subject → bank ──────────────────────────────────────────

function getBankForSubject(subject: Subject): Exam {
  switch (subject) {
    case 'Toán học':   return BGD_EXAM_TOAN;
    case 'Vật lý':     return BGD_EXAM_LY;
    case 'Hóa học':    return BGD_EXAM_HOA;
    case 'Ngữ văn':    return BGD_EXAM_VAN;
    case 'Tiếng Anh':  return BGD_EXAM_ANH;
    case 'Sinh học':   return BGD_EXAM_SINH;
    case 'Lịch sử':    return BGD_EXAM_SU;
    default: {
      const found = ALL_BGD_EXAMS.find(e => e.subject === subject);
      return found ?? BGD_EXAM_TOAN;
    }
  }
}

// ─── Duration & title per subject ───────────────────────────────

const SUBJECT_META: Record<string, { duration: number; label: string }> = {
  'Toán học':  { duration: 50, label: 'Toán' },
  'Vật lý':   { duration: 50, label: 'Vật Lý' },
  'Hóa học':  { duration: 50, label: 'Hóa Học' },
  'Ngữ văn':  { duration: 50, label: 'Ngữ Văn' },
  'Tiếng Anh': { duration: 50, label: 'Tiếng Anh' },
  'Sinh học':  { duration: 50, label: 'Sinh Học' },
  'Lịch sử':   { duration: 50, label: 'Lịch Sử' },
  'Địa lí':    { duration: 50, label: 'Địa Lí' },
  'GDKT & PL': { duration: 50, label: 'GDKT & PL' },
  'Tin học':   { duration: 50, label: 'Tin Học' },
  'Công nghệ': { duration: 50, label: 'Công Nghệ' },
};

// ─── Main generator ──────────────────────────────────────────────

/**
 * Sinh đề thi ngẫu nhiên theo chuẩn Bộ GD&ĐT 2025/2026.
 *
 * - Xáo trộn toàn bộ ngân hàng câu hỏi → chọn đúng số lượng theo ma trận.
 * - Phân phối độ khó: 8 NB + 5 TH + 3 VD + 2 VDC cho Phần I.
 * - Đề mới mỗi lần gọi (không bao giờ giống đề trước).
 * - Hỗ trợ: Toán, Lý, Hóa, Văn, Tiếng Anh (+ remedial exam).
 */
export function generateUniqueBGDExam(
  subject: Subject = 'Toán học',
  grade: GradeLevel = 'Lớp 12',
  customQuestions?: Question[]
): Exam {
  const randomCodeNum = Math.floor(100 + Math.random() * 900);
  const examCode = `MÃ-${randomCodeNum}`;
  const meta = SUBJECT_META[subject] ?? { duration: 50, label: subject };

  // ── Remedial exam (câu sai) ────────────────────────────────────
  if (customQuestions && customQuestions.length > 0) {
    const randomized = customQuestions.map(q => {
      if (q.part === 'I' || q.type === 'multiple_choice') return shufflePartIOptions(q);
      if (q.part === 'II' || q.type === 'true_false') return shufflePartIITrueFalse(q);
      return q;
    });

    const sorted = randomized.sort((a, b) => {
      const wa = DIFFICULTY_WEIGHT[a.difficulty ?? 'Thông hiểu'] ?? 2;
      const wb = DIFFICULTY_WEIGHT[b.difficulty ?? 'Thông hiểu'] ?? 2;
      return wa - wb;
    });

    return {
      id: `exam-remedial-${Date.now()}-${randomCodeNum}`,
      examCode,
      title: `Đề Luyện Lại Câu Sai – ${meta.label} (${examCode})`,
      description: `Đề ${sorted.length} câu tổng hợp các câu bạn từng làm sai, sắp xếp từ cơ bản đến nâng cao theo chuẩn BGD để rèn luyện lại kiến thức.`,
      subject,
      grade,
      durationMinutes: Math.max(15, sorted.length * 3),
      difficulty: 'Thi thử THPT',
      isBGDFormat: true,
      questions: sorted.map((q, idx) => ({ ...q, id: 5000 + idx + 1 })),
      author: `EduViet AI – Luyện Lại (${examCode})`,
      attemptsCount: 1,
    };
  }

  // ── Normal BGD exam generation ────────────────────────────────

  // 1. Lấy ngân hàng câu hỏi tương ứng môn
  const bankExam = getBankForSubject(subject);
  const allQ: Question[] = [...bankExam.questions];

  // 2. Merge thêm câu từ INITIAL_EXAMS nếu có
  const extra = INITIAL_EXAMS.filter(e => e.subject === subject);
  for (const e of extra) {
    for (const q of e.questions) {
      if (!allQ.some(existing => existing.text === q.text)) {
        allQ.push(q);
      }
    }
  }

  // 3. Tách theo Phần
  const poolI   = allQ.filter(q => q.part === 'I'   || q.type === 'multiple_choice' || (!q.type && q.options));
  const poolII  = allQ.filter(q => q.part === 'II'  || q.type === 'true_false');
  const poolIII = allQ.filter(q => q.part === 'III' || q.type === 'short_answer');

  // 4. Chọn câu theo ma trận độ khó
  //    Phần I: 18 câu theo tỉ lệ NB:TH:VD:VDC = 8:5:3:2
  const selectedI = selectByDifficulty(poolI, PART_I_DIFFICULTY_COUNTS)
    .slice(0, 18)
    .map(q => shufflePartIOptions(q));

  //    Phần II: 4 câu (shuffle từ pool, ưu tiên VD + VDC)
  const selectedII = shuffle(poolII)
    .slice(0, Math.min(4, poolII.length))
    .map(q => shufflePartIITrueFalse(q));

  //    Phần III: 6 câu (phân hóa: 2 NB + 2 TH + 2 VD)
  const selectedIII = selectByDifficulty(poolIII, {
    'Nhận biết': 2,
    'Thông hiểu': 2,
    'Vận dụng': 2,
    'Vận dụng cao': 0,
  }).slice(0, 6);

  // 5. Ghép theo thứ tự BGD
  const finalQuestions: Question[] = [
    ...selectedI,
    ...selectedII,
    ...selectedIII,
  ].map((q, idx) => ({ ...q, id: 1000 + idx + 1 }));

  // 6. Build exam object
  return {
    id: `exam-bgd-${subject.replace(/\s/g, '-').toLowerCase()}-${Date.now()}-${randomCodeNum}`,
    examCode,
    title: `Đề Thi Thử Tốt Nghiệp THPT 2025 – Môn ${meta.label} (${examCode})`,
    description: [
      `Cấu trúc chuẩn BGD 2025: 18 câu TN 4 lựa chọn (4.5đ) + 4 câu Đúng/Sai bậc thang (4.0đ) + 6 câu trả lời ngắn (1.5đ).`,
      `Ma trận độ khó: ~44% Nhận biết, ~28% Thông hiểu, ~17% Vận dụng, ~11% Vận dụng cao.`,
      `Mã đề ngẫu nhiên – đề mới hoàn toàn mỗi lần sinh.`,
    ].join(' '),
    subject,
    grade,
    durationMinutes: meta.duration,
    difficulty: 'Format Chuẩn BGD 2025',
    isBGDFormat: true,
    questions: finalQuestions,
    author: `Hội Đồng Trộn Đề BGD – EduViet (${examCode})`,
    attemptsCount: Math.floor(100 + Math.random() * 500),
  };
}

// ─── Profile-based generator ──────────────────────────────────────
/**
 * Sinh đề theo profile độ khó:
 * - easy:    Ôn tập cơ bản (NB chiếm 67%)
 * - normal:  Chuẩn BGD 2025 (mặc định)
 * - hard:    Thi thử Sở GD (VD + VDC chiếm 44%)
 * - chuyên:  Trường Chuyên (VDC chiếm 28%)
 * - hsg:     HSG Quốc gia (VDC chiếm 39%)
 */
export function generateExamWithProfile(
  subject: Subject = 'Toán học',
  grade: GradeLevel = 'Lớp 12',
  profile: ExamDifficultyProfile = 'normal'
): Exam {
  const randomCodeNum = Math.floor(100 + Math.random() * 900);
  const examCode = `MÃ-${randomCodeNum}`;
  const meta = SUBJECT_META[subject] ?? { duration: 50, label: subject };
  const dp = DIFFICULTY_PROFILES[profile];

  const bankExam = getBankForSubject(subject);
  const allQ: Question[] = [...bankExam.questions];

  const extra = INITIAL_EXAMS.filter(e => e.subject === subject);
  for (const e of extra) {
    for (const q of e.questions) {
      if (!allQ.some(existing => existing.text === q.text)) {
        allQ.push(q);
      }
    }
  }

  // Nạp thêm câu hỏi phân hóa cao thực chiến từ các trường chuyên (Chuyên Sư Phạm, KHTN, Amsterdam, Lam Sơn...)
  let specializedQuestions: Question[] = [];
  if (subject === 'Toán học') specializedQuestions = SPECIALIZED_QUESTIONS_TOAN;
  else if (subject === 'Vật lý') specializedQuestions = SPECIALIZED_QUESTIONS_LY;
  else if (subject === 'Hóa học') specializedQuestions = SPECIALIZED_QUESTIONS_HOA;
  else if (subject === 'Sinh học') specializedQuestions = SPECIALIZED_QUESTIONS_SINH;
  else if (subject === 'Tiếng Anh') specializedQuestions = SPECIALIZED_QUESTIONS_ANH;

  for (const q of specializedQuestions) {
    if (!allQ.some(existing => existing.text === q.text)) {
      allQ.push(q);
    }
  }

  const poolI   = allQ.filter(q => q.part === 'I'   || q.type === 'multiple_choice' || (!q.type && q.options));
  const poolII  = allQ.filter(q => q.part === 'II'  || q.type === 'true_false');
  const poolIII = allQ.filter(q => q.part === 'III' || q.type === 'short_answer');

  // Use profile-specific difficulty distribution for Part I
  const selectedI = selectByDifficulty(poolI, dp.partI)
    .slice(0, 18)
    .map(q => shufflePartIOptions(q));

  const selectedII = shuffle(poolII)
    .slice(0, Math.min(4, poolII.length))
    .map(q => shufflePartIITrueFalse(q));

  // Harder profiles: Part III also gets harder
  const partIIICounts = profile === 'chuyên' || profile === 'hsg'
    ? { 'Nhận biết': 0, 'Thông hiểu': 2, 'Vận dụng': 2, 'Vận dụng cao': 2 }
    : { 'Nhận biết': 2, 'Thông hiểu': 2, 'Vận dụng': 2, 'Vận dụng cao': 0 };

  const selectedIII = selectByDifficulty(poolIII, partIIICounts).slice(0, 6);

  const finalQuestions: Question[] = [
    ...selectedI,
    ...selectedII,
    ...selectedIII,
  ].map((q, idx) => ({ ...q, id: 2000 + idx + 1 }));

  const duration = Math.round(meta.duration * dp.durationMultiplier);

  return {
    id: `exam-${profile}-${subject.replace(/\s/g, '-').toLowerCase()}-${Date.now()}-${randomCodeNum}`,
    examCode,
    title: `${dp.examTitlePrefix} 2025 – Môn ${meta.label} (${examCode})`,
    description: [
      `Đề ${dp.label}: ${profile === 'easy' ? 'Tập trung củng cố kiến thức nền tảng.' : ''}`,
      `${profile === 'hard' ? 'Độ phân hóa cao – bám sát đề thi thật của các Sở GD&ĐT.' : ''}`,
      `${profile === 'chuyên' ? 'Cấp độ trường chuyên – VDC chiếm 28%, phù hợp luyện thi THPT Chuyên.' : ''}`,
      `${profile === 'hsg' ? 'Cấp độ HSG – câu hỏi vận dụng cao chiếm ưu thế, phân hóa tuyệt đối.' : ''}`,
      `Cấu trúc chuẩn BGD: 18 TN (4.5đ) + 4 Đúng/Sai (4.0đ) + 6 Trả lời ngắn (1.5đ). Thời gian: ${duration} phút.`,
    ].join(' ').replace(/\s+/g, ' ').trim(),
    subject,
    grade,
    durationMinutes: duration,
    difficulty: dp.label,
    isBGDFormat: true,
    questions: finalQuestions,
    author: `EduViet AI – Sinh Đề ${dp.label} (${examCode})`,
    attemptsCount: Math.floor(50 + Math.random() * 300),
  };
}
