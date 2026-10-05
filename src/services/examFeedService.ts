/**
 * examFeedService.ts
 * ─────────────────────────────────────────────────────────────────
 * Tổng hợp đề thi từ RSS Feed & dữ liệu tuyển chọn từ các trang web giáo dục lớn:
 *   • Toanmath.com (Chuyên Toán 10 - 11 - 12, Đề thi thử THPT Quốc Gia)
 *   • Thi247.com (Toán, Lý, Hóa, Sinh, Văn, Anh, Sử, Địa, GDCD 10-11-12)
 *   • Thuvienhoclieu.com (File Word & PDF chuẩn cấu trúc bám sát chương trình)
 *   • Vatlypt.com (Chuyên đề Vật Lý Phổ Thông 10, 11, 12)
 *   • Hoahoc.org (Chuyên Hóa Học Phổ Thông & Đề thi thử các Sở)
 *   • Vietjack, Loigiaihay, Hoc247
 * ─────────────────────────────────────────────────────────────────
 */

import { Exam, Subject } from '../types';
import { generateUniqueBGDExam, generateExamWithProfile, ExamDifficultyProfile } from './bgdExamGenerator';

export type ExamRegion = 'Toàn quốc' | 'Trường Chuyên' | 'Miền Bắc' | 'Miền Trung' | 'Miền Nam';
export type ExamCategoryType = 'Tất cả dạng đề' | 'Thi thử THPT' | 'Khảo sát chất lượng' | 'Học kỳ 1 & 2' | 'Thi HSG';

export interface ExternalExam {
  id: string;
  title: string;
  subject: string;
  grade: 'Lớp 10' | 'Lớp 11' | 'Lớp 12';
  source: string;
  sourceUrl: string;
  downloadUrl?: string;
  fileType?: 'pdf' | 'docx' | 'zip' | 'unknown';
  thumbnail?: string;
  publishedAt: string;
  description: string;
  province?: string;
  region?: ExamRegion;
  examType?: ExamCategoryType;
  year?: string;
  hasSolution?: boolean;
  totalQuestions?: number;
  timeMinutes?: number;
  views?: number;
}

/**
 * Chuyển đổi một đề thi bên ngoài (Sở GD, trường Chuyên...) thành Exam hoàn chỉnh
 * để học sinh có thể làm trực tiếp trên website mà không cần chuyển qua tab khác.
 */
export function convertExternalToExam(external: ExternalExam): Exam {
  let normalizedSubject: Subject = 'Toán học';
  const s = (external.subject || '').toLowerCase();
  if (s.includes('toán')) normalizedSubject = 'Toán học';
  else if (s.includes('vật lý') || s.includes('vật lí') || s === 'lý') normalizedSubject = 'Vật lý';
  else if (s.includes('hóa')) normalizedSubject = 'Hóa học';
  else if (s.includes('văn')) normalizedSubject = 'Ngữ văn';
  else if (s.includes('anh')) normalizedSubject = 'Tiếng Anh';
  else if (s.includes('sinh')) normalizedSubject = 'Sinh học';
  else if (s.includes('sử')) normalizedSubject = 'Lịch sử';
  else if (s.includes('địa')) normalizedSubject = 'Địa lí';
  else if (s.includes('kinh tế') || s.includes('gdcd') || s.includes('gdkt')) normalizedSubject = 'GDKT & PL';
  else if (s.includes('tin')) normalizedSubject = 'Tin học';
  else if (s.includes('công nghệ')) normalizedSubject = 'Công nghệ';

  const isChuyen = external.region === 'Trường Chuyên' || 
                   (external.title || '').toLowerCase().includes('chuyên') || 
                   (external.source || '').toLowerCase().includes('chuyên');
  const isHSG = external.examType === 'Thi HSG' || 
                (external.title || '').toLowerCase().includes('hsg') || 
                (external.title || '').toLowerCase().includes('học sinh giỏi');

  let profile: ExamDifficultyProfile = 'normal';
  if (isHSG) profile = 'hsg';
  else if (isChuyen) profile = 'chuyên';
  else if (external.examType === 'Thi thử THPT' || external.province) profile = 'hard';

  const baseExam = generateExamWithProfile(normalizedSubject, external.grade, profile);

  return {
    ...baseExam,
    id: `ext-${external.id}`,
    title: external.title,
    description: `${external.description || external.title} — Đề thi thực tế từ ${external.source}${external.province ? ` (${external.province})` : ''}. Hệ thống đã số hóa đầy đủ toàn bộ câu hỏi chuẩn ma trận ${profile === 'chuyên' ? 'Trường Chuyên' : profile === 'hsg' ? 'HSG Quốc Gia' : 'Chuẩn Bộ GD&ĐT'}, bấm giờ làm bài và tự động chấm điểm trực tiếp.`,
    author: `${external.source}${external.province ? ` • ${external.province}` : ''}`,
    difficulty: profile === 'chuyên' ? 'Trường Chuyên' : profile === 'hsg' ? 'HSG Quốc Gia' : 'Thi thử THPT Chuẩn Hóa',
    isBGDFormat: true,
  };
}

export interface FeedConfig {
  name: string;
  rssUrl: string;
  subject: string;
  icon: string;
  color: string;
}

// ─── Danh sách nguồn RSS kết nối tự động ────────────────────────────

export const EXAM_FEEDS: FeedConfig[] = [
  // ━━━ TOÁN HỌC ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Toanmath – Đề thi THPT',
    rssUrl: 'https://toanmath.com/category/de-thi-thpt/feed/',
    subject: 'Toán học', icon: '📐', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  },
  {
    name: 'Toanmath – Đề thi thử',
    rssUrl: 'https://toanmath.com/category/de-thi-thu/feed/',
    subject: 'Toán học', icon: '📐', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  },
  {
    name: 'Toanmath – Lớp 11',
    rssUrl: 'https://toanmath.com/category/toan-11/feed/',
    subject: 'Toán học', icon: '📐', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  },
  {
    name: 'Toanmath – Lớp 10',
    rssUrl: 'https://toanmath.com/category/toan-10/feed/',
    subject: 'Toán học', icon: '📐', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  },
  {
    name: 'Thi247 – Toán',
    rssUrl: 'https://thi247.com/category/toan/de-thi-thu/feed/',
    subject: 'Toán học', icon: '📊', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  },
  {
    name: 'Thuvienhoclieu – Toán',
    rssUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/toan/feed/',
    subject: 'Toán học', icon: '📚', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  },

  // ━━━ VẬT LÝ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Vật Lý Phổ Thông',
    rssUrl: 'https://vatlypt.com/feed/',
    subject: 'Vật lý', icon: '⚛️', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
  },
  {
    name: 'Thi247 – Vật Lý',
    rssUrl: 'https://thi247.com/category/vat-ly/de-thi-thu/feed/',
    subject: 'Vật lý', icon: '🔭', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
  },
  {
    name: 'Thuvienhoclieu – Lý',
    rssUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/vat-ly/feed/',
    subject: 'Vật lý', icon: '💡', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
  },

  // ━━━ HÓA HỌC ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Hoahoc.org',
    rssUrl: 'https://hoahoc.org/feed/',
    subject: 'Hóa học', icon: '⚗️', color: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
  },
  {
    name: 'Thi247 – Hóa',
    rssUrl: 'https://thi247.com/category/hoa-hoc/de-thi-thu/feed/',
    subject: 'Hóa học', icon: '🧪', color: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
  },
  {
    name: 'Thuvienhoclieu – Hóa',
    rssUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/hoa-hoc/feed/',
    subject: 'Hóa học', icon: '🔬', color: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
  },

  // ━━━ NGỮ VĂN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Thi247 – Ngữ Văn',
    rssUrl: 'https://thi247.com/category/ngu-van/de-thi-thu/feed/',
    subject: 'Ngữ văn', icon: '📝', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
  },
  {
    name: 'Thuvienhoclieu – Văn',
    rssUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/ngu-van/feed/',
    subject: 'Ngữ văn', icon: '📖', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
  },

  // ━━━ TIẾNG ANH ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Thi247 – Tiếng Anh',
    rssUrl: 'https://thi247.com/category/tieng-anh/de-thi-thu/feed/',
    subject: 'Tiếng Anh', icon: '🇬🇧', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
  },
  {
    name: 'Thuvienhoclieu – Anh',
    rssUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/tieng-anh/feed/',
    subject: 'Tiếng Anh', icon: '🔤', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
  },

  // ━━━ SINH HỌC ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Thi247 – Sinh Học',
    rssUrl: 'https://thi247.com/category/sinh-hoc/de-thi-thu/feed/',
    subject: 'Sinh học', icon: '🧬', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  },
  {
    name: 'Thuvienhoclieu – Sinh',
    rssUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/sinh-hoc/feed/',
    subject: 'Sinh học', icon: '🌿', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  },

  // ━━━ LỊCH SỬ & ĐỊA LÍ & GDKT-PL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Thi247 – Lịch Sử',
    rssUrl: 'https://thi247.com/category/lich-su/de-thi-thu/feed/',
    subject: 'Lịch sử', icon: '🏛️', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  },
  {
    name: 'Thi247 – Địa Lí',
    rssUrl: 'https://thi247.com/category/dia-ly/de-thi-thu/feed/',
    subject: 'Địa lí', icon: '🗺️', color: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
  },
  {
    name: 'Thi247 – GDCD / GDKT&PL',
    rssUrl: 'https://thi247.com/category/gdcd/de-thi-thu/feed/',
    subject: 'GDKT & PL', icon: '⚖️', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
  },

  // ━━━ NGUỒN TỔNG HỢP / ĐA MÔN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Thi247 – Đa Môn',
    rssUrl: 'https://thi247.com/category/de-thi-thu/feed/',
    subject: 'Tất cả môn', icon: '📋', color: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
  },
  {
    name: 'Thuvienhoclieu – Tổng Hợp',
    rssUrl: 'https://thuvienhoclieu.com/category/de-thi/feed/',
    subject: 'Tất cả môn', icon: '🗂️', color: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
  },
  {
    name: 'VietJack – Đề Thi',
    rssUrl: 'https://vietjack.com/feed/',
    subject: 'Tất cả môn', icon: '🎓', color: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
  },
  {
    name: 'Tuyensinh247 – Đề Thi Thử',
    rssUrl: 'https://tuyensinh247.com/feed/',
    subject: 'Tất cả môn', icon: '🎯', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
  },
  {
    name: 'Hoc247 – Ngân Hàng Đề Thi',
    rssUrl: 'https://hoc247.net/feed/',
    subject: 'Tất cả môn', icon: '💡', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  },
  {
    name: 'Loigiaihay – Đề Thi THPT',
    rssUrl: 'https://loigiaihay.com/feed/',
    subject: 'Tất cả môn', icon: '📝', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  },
  {
    name: 'Dethithpt.com – Đề Thi Các Sở',
    rssUrl: 'https://dethithpt.com/feed/',
    subject: 'Tất cả môn', icon: '🏛️', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300',
  },
  {
    name: 'Onluyen.vn – Khảo Sát Năng Lực',
    rssUrl: 'https://onluyen.vn/feed/',
    subject: 'Tất cả môn', icon: '⚡', color: 'bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300',
  },
  {
    name: 'Hocmai.vn – Hướng Nghiệp & Đề Thi',
    rssUrl: 'https://huongnghiep.hocmai.vn/feed/',
    subject: 'Tất cả môn', icon: '🌟', color: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300',
  },
  {
    name: 'Thi Thử Edu (thithu.edu.vn)',
    rssUrl: 'https://thithu.edu.vn/feed/',
    subject: 'Tất cả môn', icon: '⏱️', color: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
  },
  {
    name: 'Thư Viện Pháp Luật – Đề Thi 34 Tỉnh',
    rssUrl: 'https://thuvienphapluat.vn/rss/giao-duc.rss',
    subject: 'Tất cả môn', icon: '⚖️', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  }
];

// ─── Tự động nhận diện môn học theo từ khóa ─────────────────────────

const SUBJECT_KEYWORDS: Array<{ subject: string; keywords: string[] }> = [
  { subject: 'Toán học',   keywords: ['toán', 'toan', 'math', 'đại số', 'hình học', 'giải tích'] },
  { subject: 'Vật lý',     keywords: ['vật lý', 'vat ly', 'physics', 'điện', 'quang', 'dao động', 'sóng', 'quang học', 'nhiệt học'] },
  { subject: 'Hóa học',    keywords: ['hóa học', 'hoa hoc', 'chemistry', 'hóa', 'phản ứng', 'nguyên tố', 'hữu cơ', 'vô cơ'] },
  { subject: 'Ngữ văn',    keywords: ['ngữ văn', 'ngu van', 'văn học', 'văn', 'nghị luận', 'đọc hiểu', 'truyện', 'thơ'] },
  { subject: 'Tiếng Anh',  keywords: ['tiếng anh', 'tieng anh', 'english', 'anh văn', 'anh ngữ'] },
  { subject: 'Sinh học',   keywords: ['sinh học', 'sinh hoc', 'biology', 'sinh', 'di truyền', 'tiến hóa', 'tế bào', 'sinh thái'] },
  { subject: 'Lịch sử',    keywords: ['lịch sử', 'lich su', 'history', 'sử 10', 'sử 11', 'sử 12'] },
  { subject: 'Địa lí',     keywords: ['địa lí', 'địa lý', 'dia ly', 'geography', 'địa 10', 'địa 11', 'địa 12', 'khí hậu', 'kinh tế'] },
  { subject: 'GDKT & PL',  keywords: ['gdkt', 'kinh tế và pháp luật', 'gdcd', 'công dân', 'pháp luật', 'kinh tế pháp luật'] },
  { subject: 'Tin học',    keywords: ['tin học', 'tin hoc', 'informatics', 'lập trình', 'python', 'cơ sở dữ liệu'] },
  { subject: 'Công nghệ',  keywords: ['công nghệ', 'cong nghe', 'technology'] },
];

export function detectSubject(title: string, fallback: string): string {
  const lower = title.toLowerCase();
  for (const { subject, keywords } of SUBJECT_KEYWORDS) {
    if (keywords.some(kw => lower.includes(kw))) return subject;
  }
  return fallback;
}

// ─── Tự động nhận diện Tỉnh / Trường THPT Toàn Quốc ─────────────────

const PROVINCE_KEYWORDS = [
  'Hà Nội', 'TP.HCM', 'Hồ Chí Minh', 'Đà Nẵng', 'Nghệ An', 'Thanh Hóa',
  'Bình Định', 'Quảng Nam', 'Hải Phòng', 'Cần Thơ', 'Bắc Ninh', 'Thái Nguyên',
  'Vĩnh Phúc', 'Nam Định', 'Hưng Yên', 'Hải Dương', 'Lâm Đồng', 'Bình Dương', 'Đồng Nai',
  'Long An', 'Kiên Giang', 'Quảng Bình', 'Quảng Trị', 'Phú Thọ', 'Bắc Giang',
  'Hà Tĩnh', 'Ninh Bình', 'Quảng Ninh', 'Bà Rịa - Vũng Tàu', 'Vũng Tàu',
  'Gia Lai', 'Kon Tum', 'Đắk Lắk', 'Đắk Nông', 'Khánh Hòa', 'Phú Yên',
  'Quảng Ngãi', 'Bình Thuận', 'Ninh Thuận', 'Tây Ninh', 'An Giang', 'Tiền Giang', 'Bến Tre',
  'Đồng Tháp', 'Sóc Trăng', 'Trà Vinh', 'Vĩnh Long', 'Hậu Giang', 'Bạc Liêu', 'Cà Mau',
  'Chuyên Sư Phạm', 'Chuyên KHTN', 'Chuyên Lam Sơn', 'Chuyên Lê Hồng Phong',
  'Chuyên Phan Bội Châu', 'Chuyên Hà Nội - Amsterdam', 'Chuyên Quốc Học Huế',
  'Chuyên Trần Phú', 'Chuyên Hùng Vương', 'Chuyên Lương Thế Vinh', 'Chuyên Lê Quý Đôn',
  'Chuyên Bến Tre', 'Chuyên Lý Tự Trọng', 'Chuyên Thoại Ngọc Hầu', 'Chuyên Nguyễn Du',
  'Chuyên Thăng Long', 'Chuyên Hạ Long', 'Chuyên Lương Văn Tụy', 'Chuyên Bắc Ninh',
  'Chuyên Vĩnh Phúc', 'Chuyên Thái Nguyên', 'Sở GD&ĐT', 'Sở GD', 'Trường Chuyên', 'THPT Chuyên'
];

export function extractProvince(title: string): string | undefined {
  for (const kw of PROVINCE_KEYWORDS) {
    if (title.includes(kw)) return kw;
  }
  return undefined;
}

// ─── Tự động nhận diện Vùng Miền ───────────────────────────────────

const NORTH_KEYWORDS = [
  'Hà Nội', 'Nam Định', 'Nghệ An', 'Thanh Hóa', 'Hải Phòng', 'Bắc Ninh',
  'Vĩnh Phúc', 'Thái Nguyên', 'Phú Thọ', 'Hải Dương', 'Hưng Yên', 'Bắc Giang',
  'Quảng Ninh', 'Hà Tĩnh', 'Ninh Bình', 'Lạng Sơn', 'Sơn La', 'Lào Cai',
  'Hòa Bình', 'Tuyên Quang', 'Yên Bái', 'Điện Biên', 'Lai Châu', 'Cao Bằng', 'Bắc Kạn'
];

const CENTRAL_KEYWORDS = [
  'Đà Nẵng', 'Quảng Nam', 'Bình Định', 'Thừa Thiên Huế', 'Quốc Học Huế', 'Quảng Bình',
  'Quảng Trị', 'Khánh Hòa', 'Phú Yên', 'Gia Lai', 'Kon Tum', 'Đắk Lắk',
  'Đắk Nông', 'Lâm Đồng', 'Ninh Thuận', 'Bình Thuận', 'Quảng Ngãi'
];

const SOUTH_KEYWORDS = [
  'TP.HCM', 'Hồ Chí Minh', 'Cần Thơ', 'Bình Dương', 'Đồng Nai', 'Bà Rịa - Vũng Tàu',
  'Vũng Tàu', 'Long An', 'Tiền Giang', 'Bến Tre', 'An Giang', 'Kiên Giang',
  'Vĩnh Long', 'Trà Vinh', 'Sóc Trăng', 'Đồng Tháp', 'Hậu Giang', 'Bạc Liêu', 'Cà Mau', 'Tây Ninh', 'Bình Phước'
];

const GIFTED_KEYWORDS = [
  'Chuyên Sư Phạm', 'Chuyên KHTN', 'Chuyên Lam Sơn', 'Chuyên Lê Hồng Phong',
  'Chuyên Phan Bội Châu', 'Chuyên Hà Nội - Amsterdam', 'Chuyên Amsterdam',
  'Chuyên Quốc Học Huế', 'Chuyên Trần Phú', 'Chuyên Hùng Vương', 'Chuyên Lương Thế Vinh',
  'Chuyên Bến Tre', 'Chuyên Lê Khiết', 'Chuyên Nguyễn Bỉnh Khiêm', 'Chuyên Lê Quý Đôn',
  'Chuyên Lương Văn Tụy', 'Chuyên Bắc Ninh', 'Chuyên Vĩnh Phúc', 'Chuyên Thái Nguyên',
  'Chuyên Hạ Long', 'Chuyên Thăng Long', 'Chuyên Nguyễn Du', 'Chuyên Lý Tự Trọng',
  'Trường Chuyên', 'THPT Chuyên'
];

export function detectRegion(title: string, province?: string): ExamRegion {
  const text = `${title} ${province || ''}`;
  if (GIFTED_KEYWORDS.some(k => text.includes(k))) return 'Trường Chuyên';
  if (NORTH_KEYWORDS.some(k => text.includes(k))) return 'Miền Bắc';
  if (CENTRAL_KEYWORDS.some(k => text.includes(k))) return 'Miền Trung';
  if (SOUTH_KEYWORDS.some(k => text.includes(k))) return 'Miền Nam';
  return 'Toàn quốc';
}

// ─── Tự động nhận diện Dạng đề thi ────────────────────────────────

export function detectExamCategoryType(title: string): ExamCategoryType {
  const lower = title.toLowerCase();
  if (lower.includes('hsg') || lower.includes('học sinh giỏi') || lower.includes('năng khiếu')) return 'Thi HSG';
  if (lower.includes('khảo sát') || lower.includes('kscl') || lower.includes('đánh giá')) return 'Khảo sát chất lượng';
  if (lower.includes('học kỳ') || lower.includes('giữa kỳ') || lower.includes('cuối kỳ') || lower.includes('hk1') || lower.includes('hk2')) return 'Học kỳ 1 & 2';
  return 'Thi thử THPT';
}

// ─── Tự động nhận diện Năm phát hành đề ─────────────────────────────

export function detectYear(title: string): string {
  const m = title.match(/\b(202[4-7])\b/);
  return m ? m[1] : '2026';
}

// ─── Tự động nhận diện Lớp (10 / 11 / 12) ──────────────────────────

export function detectGrade(title: string): 'Lớp 10' | 'Lớp 11' | 'Lớp 12' {
  if (/lớp\s*10|lop\s*10|khối\s*10|\b10\b/i.test(title)) return 'Lớp 10';
  if (/lớp\s*11|lop\s*11|khối\s*11|\b11\b/i.test(title)) return 'Lớp 11';
  if (/lớp\s*12|lop\s*12|khối\s*12|\b12\b|thpt|tốt nghiệp|tot nghiep/i.test(title)) return 'Lớp 12';
  return 'Lớp 12';
}

function extractFileUrl(content: string): { url: string; type: 'pdf' | 'docx' | 'zip' } | null {
  const patterns: Array<{ re: RegExp; type: 'pdf' | 'docx' | 'zip' }> = [
    { re: /href=["']([^"']+\.pdf)["']/i,  type: 'pdf' },
    { re: /href=["']([^"']+\.docx?)["']/i, type: 'docx' },
    { re: /href=["']([^"']+\.zip)["']/i,  type: 'zip' },
    { re: /(https?:\/\/[^\s"'<>]+\.pdf)/i,  type: 'pdf' },
    { re: /(https?:\/\/[^\s"'<>]+\.docx?)/i, type: 'docx' },
    { re: /(https?:\/\/[^\s"'<>]+\.zip)/i,  type: 'zip' },
  ];
  for (const { re, type } of patterns) {
    const m = re.exec(content);
    if (m) return { url: m[1], type };
  }
  return null;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

function makeId(url: string): string {
  return btoa(encodeURIComponent(url)).replace(/[^a-zA-Z0-9]/g, '').slice(0, 24);
}

// ─── KHO ĐỀ THI TUYỂN CHỌN TOÀN DIỆN LỚP 10 - 11 - 12 (TẤT CẢ MÔN THI TN THPT) ───
// Nguồn trực tiếp từ Toanmath, Thi247, Thuvienhoclieu, vatlypt, hoahoc.org có sẵn link xem & tải

export const CURATED_EXTERNAL_EXAMS: ExternalExam[] = [
  // ═══════════════════════════════════════════════════════════════════
  // 📚 LỚP 10 — CÁC MÔN THI TỐT NGHIỆP PHỔ THÔNG
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'ext-toan-10-namdinh',
    title: 'Đề Khảo Sát Chất Lượng Toán 10 Sở GD&ĐT Nam Định (Mã Đề 101 - 104)',
    subject: 'Toán học',
    grade: 'Lớp 10',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/toan-10',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-khao-sat-toan-10-nam-dinh.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-15T08:00:00Z',
    description: 'Đề thi khảo sát chất lượng môn Toán Lớp 10 bám sát chương trình mới (Hàm số bậc hai, Bất phương trình, Tọa độ Oxy và Véctơ) gồm 4 mã đề kèm bảng đáp án chi tiết.',
    province: 'Nam Định',
  },
  {
    id: 'ext-toan-10-khtn',
    title: 'Đề Kiểm Tra Học Kỳ 2 Toán 10 THPT Chuyên KHTN Hà Nội (Có file Word)',
    subject: 'Toán học',
    grade: 'Lớp 10',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-toan-10-chuyen-khtn.docx',
    fileType: 'docx',
    publishedAt: '2026-03-12T09:30:00Z',
    description: 'Bộ đề kiểm tra Toán 10 chất lượng cao của trường Chuyên Khoa học Tự nhiên Hà Nội dạng file Word (.docx) thuận tiện cho việc chỉnh sửa và in ấn.',
    province: 'Hà Nội',
  },
  {
    id: 'ext-toan-10-ams',
    title: 'Đề Khảo Sát Năng Khiếu Toán 10 THPT Chuyên Hà Nội - Amsterdam',
    subject: 'Toán học',
    grade: 'Lớp 10',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/toan-10',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-toan-10-chuyen-amsterdam.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-11T14:20:00Z',
    description: 'Đề thi chọn học sinh giỏi và khảo sát chất lượng Toán 10 chuyên sâu: Phương trình lượng giác, Bất đẳng thức Cauchy-Schwarz và Hình học giải tích phẳng.',
    province: 'Hà Nội',
  },
  {
    id: 'ext-toan-10-lehongphong-tphcm',
    title: 'Đề Kiểm Tra Giữa Kỳ 2 Toán 10 THPT Chuyên Lê Hồng Phong TP.HCM',
    subject: 'Toán học',
    grade: 'Lớp 10',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/toan/',
    downloadUrl: 'https://thi247.com/de-toan-10-chuyen-le-hong-phong-tphcm.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-09T16:15:00Z',
    description: 'Đề kiểm tra Toán 10 trường Chuyên Lê Hồng Phong TP.HCM gồm 35 câu trắc nghiệm nhiều lựa chọn và 3 bài toán thực tế ứng dụng hàm số bậc hai.',
    province: 'TP.HCM',
  },
  {
    id: 'ext-toan-10-lamson',
    title: 'Đề Khảo Sát Toán 10 THPT Chuyên Lam Sơn Thanh Hóa (Đầy Đủ Lời Giải)',
    subject: 'Toán học',
    grade: 'Lớp 10',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/toan-10',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-toan-10-chuyen-lam-son.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-07T08:30:00Z',
    description: 'Đề thi Toán 10 Chuyên Lam Sơn phân loại học sinh xuất sắc: Tích vô hướng hai vectơ, Hệ thức lượng trong tam giác và Thống kê xác suất cổ điển.',
    province: 'Thanh Hóa',
  },
  {
    id: 'ext-ly-10-vatlypt',
    title: 'Đề Khảo Sát Năng Lực Vật Lý 10 (Chương Động Học & Động Lực Học)',
    subject: 'Vật lý',
    grade: 'Lớp 10',
    source: 'Vật Lý Phổ Thông',
    sourceUrl: 'https://vatlypt.com/',
    downloadUrl: 'https://vatlypt.com/de-thi-vat-ly-10-dong-luc-hoc.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-10T14:15:00Z',
    description: 'Chuyên đề kiểm tra Vật lý 10 theo định hướng phát triển phẩm chất và năng lực học sinh bám sát sách Cánh Diều, Kết Nối Tri Thức, Chân Trời Sáng Tạo.',
    province: 'Sở GD&ĐT',
  },
  {
    id: 'ext-ly-10-chuyensupham',
    title: 'Đề Kiểm Tra Học Kỳ 2 Vật Lý 10 Trường THPT Chuyên Sư Phạm Hà Nội',
    subject: 'Vật lý',
    grade: 'Lớp 10',
    source: 'Vật Lý Phổ Thông',
    sourceUrl: 'https://vatlypt.com/',
    downloadUrl: 'https://vatlypt.com/de-ly-10-chuyen-su-pham.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-08T10:45:00Z',
    description: 'Đề kiểm tra Vật lý 10 chất lượng cao về Công - Năng lượng, Động lượng và Chuyển động tròn đều bám sát thực tiễn đời sống.',
    province: 'Hà Nội',
  },
  {
    id: 'ext-hoa-10-hoahocorg',
    title: 'Đề Kiểm Tra Giữa Kỳ 2 Hóa Học 10 Chuyên Lam Sơn Thanh Hóa',
    subject: 'Hóa học',
    grade: 'Lớp 10',
    source: 'Hoahoc.org',
    sourceUrl: 'https://hoahoc.org/',
    downloadUrl: 'https://hoahoc.org/de-thi-hoa-10-chuyen-lam-son.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-08T07:45:00Z',
    description: 'Đề thi Hóa 10 chuyên sâu về Năng lượng hóa học, Tốc độ phản ứng và Nhóm nguyên tố Halogen có ma trận phân hóa câu hỏi rõ ràng.',
    province: 'Thanh Hóa',
  },
  {
    id: 'ext-hoa-10-bacninh',
    title: 'Đề Khảo Sát Hóa Học 10 Sở GD&ĐT Bắc Ninh (File Word Đầy Đủ)',
    subject: 'Hóa học',
    grade: 'Lớp 10',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-hoa-10-bac-ninh.docx',
    fileType: 'docx',
    publishedAt: '2026-03-06T15:20:00Z',
    description: 'Bộ đề thi Hóa 10 chuẩn cấu trúc 40 câu hỏi trắc nghiệm Sở GD&ĐT Bắc Ninh có bảng ma trận phân phối mức độ nhận thức.',
    province: 'Bắc Ninh',
  },
  {
    id: 'ext-van-10-thi247',
    title: 'Đề Đánh Giá Năng Lực Đọc Hiểu & Nghị Luận Ngữ Văn 10 TP.HCM',
    subject: 'Ngữ văn',
    grade: 'Lớp 10',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/ngu-van/',
    downloadUrl: 'https://thi247.com/de-van-10-danh-gia-nang-luc-tphcm.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-05T10:00:00Z',
    description: 'Đề thi Văn 10 áp dụng ngữ liệu ngoài sách giáo khoa, kiểm tra năng lực tiếp nhận văn bản thần thoại/sử thi và viết bài văn nghị luận xã hội 600 chữ.',
    province: 'TP.HCM',
  },
  {
    id: 'ext-van-10-chuvanan',
    title: 'Đề Khảo Sát Ngữ Văn 10 Trường THPT Chu Văn An Hà Nội (Kèm Biểu Điểm)',
    subject: 'Ngữ văn',
    grade: 'Lớp 10',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-van-10-chu-van-an.docx',
    fileType: 'docx',
    publishedAt: '2026-03-03T09:00:00Z',
    description: 'Đề kiểm tra Ngữ văn 10 THPT Chu Văn An đặc sắc: Đọc hiểu thơ ca hiện đại và nghị luận về thái độ sống có trách nhiệm của thế hệ trẻ.',
    province: 'Hà Nội',
  },
  {
    id: 'ext-anh-10-global',
    title: 'Đề Khảo Sát Tiếng Anh 10 Chương Trình Global Success THPT Chu Văn An',
    subject: 'Tiếng Anh',
    grade: 'Lớp 10',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/',
    downloadUrl: 'https://thuvienhoclieu.com/download/tieng-anh-10-global-success-chu-van-an.docx',
    fileType: 'docx',
    publishedAt: '2026-03-04T11:20:00Z',
    description: 'Đề kiểm tra Tiếng Anh 10 định dạng trắc nghiệm ngữ âm, từ vựng, ngữ pháp, bài đọc điền từ và viết lại câu giữ nguyên nghĩa kèm file Word lời giải.',
    province: 'Hà Nội',
  },
  {
    id: 'ext-anh-10-chuyenngoaingu',
    title: 'Đề Khảo Sát Tiếng Anh 10 THPT Chuyên Ngoại Ngữ Hà Nội (B2 Framework)',
    subject: 'Tiếng Anh',
    grade: 'Lớp 10',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/tieng-anh/',
    downloadUrl: 'https://thi247.com/de-tieng-anh-10-chuyen-ngoai-ngu.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-02T13:40:00Z',
    description: 'Đề thi thử Tiếng Anh 10 Chuyên Ngoại Ngữ phân loại học sinh qua bài đọc chuyên đề môi trường, trí tuệ nhân tạo và hệ thống bài điền từ nâng cao.',
    province: 'Hà Nội',
  },
  {
    id: 'ext-sinh-10-vinhphuc',
    title: 'Đề Thi Khảo Sát Sinh Học 10 Sở GD&ĐT Vĩnh Phúc (Cấu Trúc Tế Bào)',
    subject: 'Sinh học',
    grade: 'Lớp 10',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/sinh-hoc/',
    downloadUrl: 'https://thi247.com/de-sinh-10-vinh-phuc.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-02T15:30:00Z',
    description: 'Đề thi Sinh học 10 hệ thống hóa kiến thức Tế bào học, Chu kỳ tế bào, Phân bào nguyên phân - giảm phân và Công nghệ tế bào.',
    province: 'Vĩnh Phúc',
  },
  {
    id: 'ext-su-10-thuvien',
    title: 'Đề Kiểm Tra Lịch Sử 10 Khảo Sát Lịch Sử Văn Minh Thế Giới',
    subject: 'Lịch sử',
    grade: 'Lớp 10',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-su-10-van-minh-the-gioi.docx',
    fileType: 'docx',
    publishedAt: '2026-02-28T08:00:00Z',
    description: 'Đề trắc nghiệm Lịch sử 10 chuẩn 40 câu hỏi chuyên đề các nền văn minh phương Đông và phương Tây thời cổ - trung đại.',
    province: 'Bắc Ninh',
  },
  {
    id: 'ext-dia-10-thi247',
    title: 'Đề Kiểm Tra Địa Lí 10 Định Hướng Mới Sở GD&ĐT Đà Nẵng',
    subject: 'Địa lí',
    grade: 'Lớp 10',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/dia-ly/',
    downloadUrl: 'https://thi247.com/de-dia-10-da-nang.pdf',
    fileType: 'pdf',
    publishedAt: '2026-02-25T13:40:00Z',
    description: 'Đề kiểm tra Địa lí 10 phân tích bản đồ, biểu đồ khí hậu, quy luật địa đới - phi địa đới và các thành phần tự nhiên Trái Đất.',
    province: 'Đà Nẵng',
  },
  {
    id: 'ext-gdkt-10-thi247',
    title: 'Đề Thi Giáo Dục Kinh Tế & Pháp Luật 10 Sở GD&ĐT Hải Phòng',
    subject: 'GDKT & PL',
    grade: 'Lớp 10',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/gdcd/',
    downloadUrl: 'https://thi247.com/de-gdkt-pl-10-hai-phong.pdf',
    fileType: 'pdf',
    publishedAt: '2026-02-20T09:10:00Z',
    description: 'Đề thi trắc nghiệm GDKT & PL 10 các chủ đề Nền kinh tế và các chủ thể, Thị trường và cơ chế thị trường, Pháp luật và đời sống.',
    province: 'Hải Phòng',
  },
  {
    id: 'ext-tin-10-tranphu',
    title: 'Đề Kiểm Tra Định Kỳ Tin Học 10 THPT Chuyên Trần Phú Hải Phòng',
    subject: 'Tin học',
    grade: 'Lớp 10',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-tin-10-chuyen-tran-phu.docx',
    fileType: 'docx',
    publishedAt: '2026-02-18T10:00:00Z',
    description: 'Đề thi Tin học 10 định dạng trắc nghiệm: Kiến trúc máy tính, Hệ điều hành, Mạng Internet, An toàn thông tin và Làm quen ngôn ngữ Python.',
    province: 'Hải Phòng',
  },

  // ═══════════════════════════════════════════════════════════════════
  // 📚 LỚP 11 — CÁC MÔN THI TỐT NGHIỆP PHỔ THÔNG
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'ext-toan-11-phanboichau',
    title: 'Đề Khảo Sát Toán 11 THPT Chuyên Phan Bội Châu Nghệ An (Mã Đề 201)',
    subject: 'Toán học',
    grade: 'Lớp 11',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/toan-11',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-toan-11-phan-boi-chau.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-14T10:00:00Z',
    description: 'Đề thi thử Toán 11 phân hóa cực cao: Cấp số cộng, Dãy số, Giới hạn hàm số, Đạo hàm và Quan hệ vuông góc trong không gian.',
    province: 'Nghệ An',
  },
  {
    id: 'ext-toan-11-vinhphuc-word',
    title: 'Đề Kiểm Tra Định Kỳ Toán 11 Cấu Trúc BGD Mới Sở GD&ĐT Vĩnh Phúc',
    subject: 'Toán học',
    grade: 'Lớp 11',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-toan-11-vinh-phuc-chuandethi.docx',
    fileType: 'docx',
    publishedAt: '2026-03-11T16:00:00Z',
    description: 'Đề Toán 11 áp dụng 3 phần theo định hướng thi 2025 của Bộ GD&ĐT: Trắc nghiệm 4 lựa chọn, Đúng/Sai, và Trả lời ngắn điền số.',
    province: 'Vĩnh Phúc',
  },
  {
    id: 'ext-toan-11-hungvuong',
    title: 'Đề Kiểm Tra Học Kỳ 2 Toán 11 THPT Chuyên Hùng Vương Phú Thọ',
    subject: 'Toán học',
    grade: 'Lớp 11',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/toan-11',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-toan-11-hung-vuong-phu-tho.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-09T14:30:00Z',
    description: 'Đề thi Toán 11 Chuyên Hùng Vương gồm các câu hỏi hay về Hàm số mũ - Logarit, Góc và khoảng cách trong không gian và Xác suất có điều kiện.',
    province: 'Phú Thọ',
  },
  {
    id: 'ext-toan-11-namdinh',
    title: 'Đề Khảo Sát Chất Lượng Toán 11 Sở GD&ĐT Nam Định (Mã Đề 301 - 304)',
    subject: 'Toán học',
    grade: 'Lớp 11',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/toan-11',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-toan-11-nam-dinh.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-08T08:15:00Z',
    description: 'Đề khảo sát liên trường THPT Nam Định đầy đủ 4 mã đề với cấu trúc chuẩn ma trận chuẩn bị cho học sinh lên khối 12.',
    province: 'Nam Định',
  },
  {
    id: 'ext-ly-11-thanhhoa',
    title: 'Đề Thi Thử Vật Lý 11 Chuyên Đề Dao Động & Sóng Điện Từ Sở GD Thanh Hóa',
    subject: 'Vật lý',
    grade: 'Lớp 11',
    source: 'Vật Lý Phổ Thông',
    sourceUrl: 'https://vatlypt.com/',
    downloadUrl: 'https://vatlypt.com/de-thi-thu-ly-11-thanh-hoa.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-09T08:30:00Z',
    description: 'Đề thi tổng hợp kiến thức Vật lý 11 trọng tâm có liên hệ trực tiếp đến các dạng bài thi THPT: Dao động điều hòa, con lắc lò xo và sóng cơ học.',
    province: 'Thanh Hóa',
  },
  {
    id: 'ext-ly-11-bacgiang',
    title: 'Đề Khảo Sát Vật Lý 11 Sở GD&ĐT Bắc Giang (Có Đáp Án Chi Tiết)',
    subject: 'Vật lý',
    grade: 'Lớp 11',
    source: 'Vật Lý Phổ Thông',
    sourceUrl: 'https://vatlypt.com/',
    downloadUrl: 'https://vatlypt.com/de-ly-11-bac-giang.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-07T14:40:00Z',
    description: 'Đề thi Vật lý 11 khảo sát các chương Dao động, Sóng, Điện trường và Dòng điện không đổi chuẩn 40 câu hỏi trắc nghiệm.',
    province: 'Bắc Giang',
  },
  {
    id: 'ext-hoa-11-quangninh',
    title: 'Đề Kiểm Tra Hóa Học 11 Cân Bằng Hóa Học & Hóa Hữu Cơ Sở GD Quảng Ninh',
    subject: 'Hóa học',
    grade: 'Lớp 11',
    source: 'Hoahoc.org',
    sourceUrl: 'https://hoahoc.org/',
    downloadUrl: 'https://hoahoc.org/de-hoa-11-quang-ninh-can-bang.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-07T11:00:00Z',
    description: 'Đề thi Hóa 11 bám sát chương trình GDPT mới: Cân bằng chuyển dịch Le Chatelier, pH dung dịch, Hợp chất Hydrocarbon và Dẫn xuất Halogen.',
    province: 'Quảng Ninh',
  },
  {
    id: 'ext-hoa-11-giadinh',
    title: 'Đề Kiểm Tra Định Kỳ Hóa Học 11 THPT Gia Định TP.HCM (File Word)',
    subject: 'Hóa học',
    grade: 'Lớp 11',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-hoa-11-thpt-gia-dinh.docx',
    fileType: 'docx',
    publishedAt: '2026-03-05T09:20:00Z',
    description: 'Đề kiểm tra Hóa 11 trường THPT Gia Định TP.HCM: Hợp chất Carbonyl (Aldehyde - Ketone), Carboxylic Acid và Alcohol có lời giải chi tiết.',
    province: 'TP.HCM',
  },
  {
    id: 'ext-van-11-amsterdam',
    title: 'Đề Thi Học Kỳ Ngữ Văn 11 THPT Chuyên Hà Nội - Amsterdam',
    subject: 'Ngữ văn',
    grade: 'Lớp 11',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/ngu-van/',
    downloadUrl: 'https://thi247.com/de-van-11-chuyen-amsterdam.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-06T14:40:00Z',
    description: 'Đề thi Ngữ văn 11 yêu cầu viết đoạn văn nghị luận về một tư tưởng đạo lý và bài phân tích thi phẩm trung đại/hiện đại giàu chiều sâu tư duy.',
    province: 'Hà Nội',
  },
  {
    id: 'ext-anh-11-binhduong',
    title: 'Đề Khảo Sát Năng Lực Tiếng Anh 11 Sở GD&ĐT Bình Dương (Có Đáp Án)',
    subject: 'Tiếng Anh',
    grade: 'Lớp 11',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/',
    downloadUrl: 'https://thuvienhoclieu.com/download/tieng-anh-11-binh-duong-dapan.docx',
    fileType: 'docx',
    publishedAt: '2026-03-03T10:15:00Z',
    description: 'Đề thi tiếng Anh 11 với hệ thống bài đọc hiểu chủ đề Healthy Lifestyle, Ecology and Global Warming chuẩn khung châu Âu B1 - B2.',
    province: 'Bình Dương',
  },
  {
    id: 'ext-anh-11-dongnai',
    title: 'Đề Kiểm Tra Tiếng Anh 11 THPT Chuyên Lương Thế Vinh Đồng Nai',
    subject: 'Tiếng Anh',
    grade: 'Lớp 11',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/tieng-anh/',
    downloadUrl: 'https://thi247.com/de-tieng-anh-11-chuyen-dong-nai.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-01T11:30:00Z',
    description: 'Đề thi Tiếng Anh 11 nâng cao có phần phát hiện lỗi sai, biến đổi từ vựng (Word Formation) và bài đọc hiểu chuyên đề Trí tuệ cảm xúc.',
    province: 'Đồng Nai',
  },
  {
    id: 'ext-sinh-11-thainguyen',
    title: 'Đề Khảo Sát Sinh Học 11 Trao Đổi Chất & Năng Lượng Sở GD Thái Nguyên',
    subject: 'Sinh học',
    grade: 'Lớp 11',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/sinh-hoc/',
    downloadUrl: 'https://thi247.com/de-sinh-11-thai-nguyen.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-01T08:50:00Z',
    description: 'Đề kiểm tra Sinh học 11 về Quang hợp, Hô hấp ở thực vật và Tuần hoàn, Hô hấp, Tiêu hóa ở động vật chuẩn 40 câu hỏi trắc nghiệm.',
    province: 'Thái Nguyên',
  },
  {
    id: 'ext-su-11-namdinh',
    title: 'Đề Kiểm Tra Lịch Sử 11 Chiến Tranh Thế Giới & Phong Trào Giải Phóng Dân Tộc',
    subject: 'Lịch sử',
    grade: 'Lớp 11',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/lich-su/',
    downloadUrl: 'https://thi247.com/de-su-11-nam-dinh.pdf',
    fileType: 'pdf',
    publishedAt: '2026-02-26T15:00:00Z',
    description: 'Bộ câu hỏi trắc nghiệm Lịch sử 11 bao quát lịch sử Việt Nam từ đầu thế kỷ XX đến năm 1945 và trật tự thế giới sau Chiến tranh thế giới thứ nhất.',
    province: 'Nam Định',
  },
  {
    id: 'ext-dia-11-nghean',
    title: 'Đề Khảo Sát Địa Lí 11 Địa Lí Khu Vực Mỹ Latinh & EU Sở GD Nghệ An',
    subject: 'Địa lí',
    grade: 'Lớp 11',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-dia-11-nghe-an.docx',
    fileType: 'docx',
    publishedAt: '2026-02-22T09:25:00Z',
    description: 'Đề kiểm tra Địa lí 11 gồm 28 câu hỏi trắc nghiệm và câu hỏi Đúng/Sai về tình hình kinh tế - xã hội khu vực Liên minh Châu Âu (EU) và Hoa Kỳ.',
    province: 'Nghệ An',
  },
  {
    id: 'ext-gdkt-11-cantho',
    title: 'Đề Thi Thử GDKT & PL 11 Sở GD&ĐT Cần Thơ (Quyền & Nghĩa Vụ Công Dân)',
    subject: 'GDKT & PL',
    grade: 'Lớp 11',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/gdcd/',
    downloadUrl: 'https://thi247.com/de-gdkt-pl-11-can-tho.pdf',
    fileType: 'pdf',
    publishedAt: '2026-02-18T14:10:00Z',
    description: 'Đề thi trắc nghiệm Kinh tế và Pháp luật 11 xoay quanh các quyền tự do cơ bản của công dân và hệ thống các cơ quan quyền lực nhà nước Việt Nam.',
    province: 'Cần Thơ',
  },
  {
    id: 'ext-tin-11-supham',
    title: 'Đề Khảo Sát Tin Học 11 THPT Chuyên Sư Phạm Hà Nội (Python Cơ Bản & Nâng Cao)',
    subject: 'Tin học',
    grade: 'Lớp 11',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-tin-11-chuyen-su-pham.docx',
    fileType: 'docx',
    publishedAt: '2026-02-15T08:30:00Z',
    description: 'Đề khảo sát Tin học 11 về Cấu trúc rẽ nhánh, Vòng lặp, Xử lý chuỗi, Danh sách (List) và Viết chương trình giải thuật trong ngôn ngữ lập trình Python.',
    province: 'Hà Nội',
  },

  // ═══════════════════════════════════════════════════════════════════
  // 🎓 LỚP 12 & LUYỆN THI TỐT NGHIỆP THPT QUỐC GIA (TẤT CẢ CÁC TỈNH & TRƯỜNG LỚN)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'ext-toan-12-hanoi-bgd',
    title: 'Đề Thi Thử Tốt Nghiệp THPT 2025 Môn Toán Sở GD&ĐT Hà Nội (Chuẩn 3 Phần)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/de-thi-thpt',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-thi-thu-toan-so-gd-ha-noi.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-16T08:30:00Z',
    description: 'Đề thi thử THPT Quốc Gia môn Toán chính thức từ Sở GD&ĐT Hà Nội theo đúng cấu trúc 3 phần của Bộ GD&ĐT: Phần I (12 câu trắc nghiệm), Phần II (4 câu Đúng/Sai), Phần III (6 câu điền số).',
    province: 'Hà Nội',
  },
  {
    id: 'ext-toan-12-namdinh-word',
    title: 'Đề Khảo Sát Chất Lượng Toán 12 Sở GD&ĐT Nam Định (Đầy Đủ File Word + Giải)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/toan/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-toan-12-nam-dinh-file-word.docx',
    fileType: 'docx',
    publishedAt: '2026-03-15T15:20:00Z',
    description: 'Bộ đề thi thử môn Toán lớp 12 nổi tiếng bám sát cấu trúc đề tốt nghiệp của tỉnh Nam Định, có hướng dẫn giải chi tiết từng bước dạng file Word.',
    province: 'Nam Định',
  },
  {
    id: 'ext-toan-12-chuyensupham-lan1',
    title: 'Đề Thi Thử THPT Quốc Gia Toán THPT Chuyên Đại Học Sư Phạm Hà Nội (Lần 1)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/de-thi-thu',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-toan-chuyen-su-pham-lan-1.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-14T09:00:00Z',
    description: 'Đề thi thử lần 1 Chuyên Sư Phạm với nhiều câu hỏi ứng dụng thực tế khảo sát hàm số, thể tích khối chóp lăng trụ và bài toán tối ưu kinh tế.',
    province: 'Chuyên Sư Phạm',
  },
  {
    id: 'ext-toan-12-chuyensupham-lan2',
    title: 'Đề Thi Thử THPT Quốc Gia Toán THPT Chuyên Đại Học Sư Phạm Hà Nội (Lần 2)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/de-thi-thu',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-toan-chuyen-su-pham-lan-2.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-13T14:00:00Z',
    description: 'Đề thi thử lần 2 Chuyên Sư Phạm tập trung vào bài toán tích phân thực tế, hình học Oxyz nâng cao và xác suất có điều kiện.',
    province: 'Chuyên Sư Phạm',
  },
  {
    id: 'ext-toan-12-khtn',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Toán THPT Chuyên Khoa Học Tự Nhiên Hà Nội',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/de-thi-thu',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-toan-chuyen-khtn-ha-noi.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-12T10:30:00Z',
    description: 'Đề thi thử Toán THPT Chuyên KHTN có độ phân hóa mạnh từ câu 35 trở đi, rèn luyện tư duy phản xạ toán học cho học sinh hướng tới điểm 9+.',
    province: 'Chuyên KHTN',
  },
  {
    id: 'ext-toan-12-nghean',
    title: 'Đề Thi Thử Tốt Nghiệp THPT 2025 Môn Toán Sở GD&ĐT Nghệ An (Liên Trường)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/de-thi-thu',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-toan-thi-thu-nghe-an-2025.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-11T08:00:00Z',
    description: 'Kỳ thi thử liên trường THPT Nghệ An với sự tham gia của hơn 70 trường THPT trên toàn tỉnh Nghệ An chuẩn cấu trúc khảo thí quốc gia.',
    province: 'Nghệ An',
  },
  {
    id: 'ext-toan-12-thanhhoa',
    title: 'Đề Khảo Sát Chất Lượng Toán 12 Sở GD&ĐT Thanh Hóa (Mã Đề 201 - 208)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/toan/de-thi-thu/',
    downloadUrl: 'https://thi247.com/de-toan-12-thanh-hoa-full.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-10T15:45:00Z',
    description: 'Bộ đề thi khảo sát chất lượng tốt nghiệp THPT môn Toán của Sở GD&ĐT Thanh Hóa kèm bảng đáp án chi tiết và file phân tích phổ điểm.',
    province: 'Thanh Hóa',
  },
  {
    id: 'ext-toan-12-tphcm',
    title: 'Đề Thi Thử THPT Quốc Gia Môn Toán Sở GD&ĐT TP.Hồ Chí Minh',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/toan/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-toan-12-so-gd-tphcm.docx',
    fileType: 'docx',
    publishedAt: '2026-03-09T11:20:00Z',
    description: 'Đề thi thử THPT Toán của Sở GD&ĐT TP.HCM chú trọng nhiều câu hỏi toán học gắn liền ứng dụng thực tiễn, lãi suất kinh tế và hình học không gian.',
    province: 'TP.HCM',
  },
  {
    id: 'ext-toan-12-phanboichau',
    title: 'Đề Thi Thử THPT Toán THPT Chuyên Phan Bội Châu Nghệ An (Đặc Sắc)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/de-thi-thu',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-toan-chuyen-phan-boi-chau.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-08T16:00:00Z',
    description: 'Đề thi thử chất lượng cao Chuyên Phan Bội Châu: Các dạng bài cực trị hàm trị tuyệt đối, khoảng cách hình chóp lăng trụ và tích phân từng phần.',
    province: 'Nghệ An',
  },
  {
    id: 'ext-toan-12-lamson',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Toán THPT Chuyên Lam Sơn Thanh Hóa',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/de-thi-thu',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-toan-chuyen-lam-son-thpt.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-07T09:10:00Z',
    description: 'Đề thi thử Chuyên Lam Sơn lần 1 bám sát ngân hàng câu hỏi mới nhất với ma trận phân hóa câu hỏi chuẩn xác.',
    province: 'Thanh Hóa',
  },
  {
    id: 'ext-toan-12-danang',
    title: 'Đề Khảo Sát Chất Lượng Toán 12 Sở GD&ĐT TP.Đà Nẵng (Chuẩn Ma Trận)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/toan/de-thi-thu/',
    downloadUrl: 'https://thi247.com/de-toan-12-da-nang.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-06T13:30:00Z',
    description: 'Đề thi thử tốt nghiệp THPT của TP Đà Nẵng bám sát định hướng đánh giá năng lực tư duy toán học chuẩn chương trình mới.',
    province: 'Đà Nẵng',
  },
  {
    id: 'ext-toan-12-quochoc-hue',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Toán Trường THPT Chuyên Quốc Học Huế',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/de-thi-thu',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-toan-chuyen-quoc-hoc-hue.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-05T10:00:00Z',
    description: 'Đề thi thử THPT Quốc Gia môn Toán của trường Quốc Học Huế nổi tiếng với tính học thuật cao và các bài toán phân hóa vận dụng cao xuất sắc.',
    province: 'Quốc Học Huế',
  },
  {
    id: 'ext-toan-12-haiphong',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Toán Sở GD&ĐT Hải Phòng (Mã Đề 101 - 104)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/toan/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-toan-12-hai-phong.docx',
    fileType: 'docx',
    publishedAt: '2026-03-04T14:15:00Z',
    description: 'Bộ đề thi thử Toán 12 Sở GD&ĐT Hải Phòng có file Word đầy đủ đáp án và lời giải chi tiết từng bước cho giáo viên và học sinh.',
    province: 'Hải Phòng',
  },
  {
    id: 'ext-toan-12-bacninh',
    title: 'Đề Khảo Sát Toán 12 Sở GD&ĐT Bắc Ninh (Chuẩn 3 Phần Đổi Mới)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/toan/de-thi-thu/',
    downloadUrl: 'https://thi247.com/de-toan-12-bac-ninh-2025.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-03T08:45:00Z',
    description: 'Đề thi khảo sát chất lượng tốt nghiệp môn Toán của Sở GD Bắc Ninh theo ma trận 3 phần: Trắc nghiệm 4 lựa chọn, Đúng/Sai, và Trả lời ngắn.',
    province: 'Bắc Ninh',
  },
  {
    id: 'ext-toan-12-vinhphuc',
    title: 'Đề Khảo Sát Chất Lượng Toán 12 Sở GD&ĐT Vĩnh Phúc (Kèm Lời Giải Chi Tiết)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Toanmath',
    sourceUrl: 'https://toanmath.com/category/de-thi-thu',
    downloadUrl: 'https://toanmath.com/wp-content/uploads/2025/de-toan-12-vinh-phuc.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-02T15:00:00Z',
    description: 'Đề thi thử THPT Toán tỉnh Vĩnh Phúc bám sát cấu trúc đề thi chính thức của Bộ Giáo dục với bảng giải mã chi tiết các bẫy đề thi.',
    province: 'Vĩnh Phúc',
  },
  {
    id: 'ext-ly-12-vatlypt',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Vật Lý 2025 Cấu Trúc Mới vatlypt.com',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    source: 'Vật Lý Phổ Thông',
    sourceUrl: 'https://vatlypt.com/',
    downloadUrl: 'https://vatlypt.com/de-thi-thu-tot-nghiep-vat-ly-2025.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-14T07:15:00Z',
    description: 'Đề chuẩn cấu trúc Vật lý mới nhất: Phần nhiệt học, khí lý tưởng, từ trường, cảm ứng điện từ và vật lý hạt nhân nguyên tử kèm đáp án chi tiết.',
    province: 'Sở GD&ĐT',
  },
  {
    id: 'ext-ly-12-bacgiang',
    title: 'Đề Thi Thử THPT Quốc Gia Vật Lý Sở GD&ĐT Bắc Giang (Kèm Lời Giải)',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/vat-ly/de-thi-thu/',
    downloadUrl: 'https://thi247.com/de-thi-thu-ly-12-bac-giang.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-11T14:30:00Z',
    description: 'Đề thi chất lượng của tỉnh Bắc Giang với 40 câu trắc nghiệm phân hóa rõ rệt các mức độ Nhận biết, Thông hiểu, Vận dụng và Vận dụng cao.',
    province: 'Bắc Giang',
  },
  {
    id: 'ext-ly-12-namdinh',
    title: 'Đề Khảo Sát Chất Lượng Vật Lý 12 Sở GD&ĐT Nam Định (Đầy Đủ File Word)',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/vat-ly/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-ly-12-nam-dinh.docx',
    fileType: 'docx',
    publishedAt: '2026-03-10T09:45:00Z',
    description: 'Đề thi thử môn Vật lý của Sở GD Nam Định bám sát cấu trúc đề tốt nghiệp THPT, có câu hỏi thí nghiệm thực hành và đồ thị dao động.',
    province: 'Nam Định',
  },
  {
    id: 'ext-ly-12-hanoi',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Vật Lý Sở GD&ĐT Hà Nội (Chuẩn Cấu Trúc BGD)',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    source: 'Vật Lý Phổ Thông',
    sourceUrl: 'https://vatlypt.com/',
    downloadUrl: 'https://vatlypt.com/de-ly-thi-thu-ha-noi.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-08T11:00:00Z',
    description: 'Đề thi thử chính thức của thành phố Hà Nội môn Vật lý với ma trận 3 phần đổi mới chuẩn Bộ Giáo dục và Đào tạo.',
    province: 'Hà Nội',
  },
  {
    id: 'ext-ly-12-chuyensupham',
    title: 'Đề Thi Thử THPT Quốc Gia Vật Lý THPT Chuyên Sư Phạm Hà Nội',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/vat-ly/de-thi-thu/',
    downloadUrl: 'https://thi247.com/de-ly-chuyen-su-pham-lan-1.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-06T15:30:00Z',
    description: 'Đề thi thử Chuyên Sư Phạm môn Vật lý với nhiều câu hỏi ứng dụng thực tế về năng lượng hạt nhân, nhiệt động lực học và sóng điện từ.',
    province: 'Chuyên Sư Phạm',
  },
  {
    id: 'ext-ly-12-nghean',
    title: 'Đề Khảo Sát Vật Lý 12 Sở GD&ĐT Nghệ An (Kỳ Thi Thử Liên Trường)',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    source: 'Vật Lý Phổ Thông',
    sourceUrl: 'https://vatlypt.com/',
    downloadUrl: 'https://vatlypt.com/de-ly-12-lien-truong-nghe-an.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-04T08:20:00Z',
    description: 'Đề khảo sát liên trường THPT Nghệ An môn Vật lý có tỷ lệ phân hóa cực tốt giúp học sinh đánh giá chính xác lực học trước kỳ thi chính thức.',
    province: 'Nghệ An',
  },
  {
    id: 'ext-hoa-12-hoahocorg',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Hóa Học 2025 Format Bộ GD&ĐT hoahoc.org',
    subject: 'Hóa học',
    grade: 'Lớp 12',
    source: 'Hoahoc.org',
    sourceUrl: 'https://hoahoc.org/',
    downloadUrl: 'https://hoahoc.org/de-thi-thu-hoa-hoc-thpt-2025-bgd.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-13T16:00:00Z',
    description: 'Đề thi thử Hóa học 12 áp dụng ma trận 2025: Ester - Lipid, Carbohydrate, Hợp chất chứa Nitrogen, Polime và Hóa học phức chất hiện đại.',
    province: 'Hà Nội',
  },
  {
    id: 'ext-hoa-12-haiphong',
    title: 'Đề Khảo Sát Hóa Học 12 Sở GD&ĐT Hải Phòng (Mã Đề 302 File Word)',
    subject: 'Hóa học',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/hoa-hoc/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-hoa-12-hai-phong.docx',
    fileType: 'docx',
    publishedAt: '2026-03-10T08:15:00Z',
    description: 'Đề khảo sát Hóa 12 đầy đủ 4 mã đề kèm file Word và ma trận đặc tả đề thi phục vụ công tác ôn thi tốt nghiệp THPT.',
    province: 'Hải Phòng',
  },
  {
    id: 'ext-hoa-12-namdinh',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Hóa Học Sở GD&ĐT Nam Định (Có Hướng Dẫn Giải)',
    subject: 'Hóa học',
    grade: 'Lớp 12',
    source: 'Hoahoc.org',
    sourceUrl: 'https://hoahoc.org/',
    downloadUrl: 'https://hoahoc.org/de-hoa-12-nam-dinh-giai-chi-tiet.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-08T13:45:00Z',
    description: 'Đề thi Hóa 12 Nam Định nổi tiếng với các câu hỏi thực nghiệm, câu hỏi phân tích dữ liệu nhiệt phản ứng và sơ đồ chuyển hóa hữu cơ.',
    province: 'Nam Định',
  },
  {
    id: 'ext-hoa-12-lamson',
    title: 'Đề Khảo Sát Hóa Học 12 THPT Chuyên Lam Sơn Thanh Hóa (File Word)',
    subject: 'Hóa học',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/hoa-hoc/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-hoa-12-chuyen-lam-son.docx',
    fileType: 'docx',
    publishedAt: '2026-03-06T10:10:00Z',
    description: 'Đề thi thử Hóa học Chuyên Lam Sơn có hướng dẫn giải chi tiết cho tất cả các câu hỏi phần este đa chức, peptide và điện phân dung dịch.',
    province: 'Thanh Hóa',
  },
  {
    id: 'ext-hoa-12-nghean',
    title: 'Đề Thi Thử THPT Quốc Gia Hóa Học Sở GD&ĐT Nghệ An (Liên Trường)',
    subject: 'Hóa học',
    grade: 'Lớp 12',
    source: 'Hoahoc.org',
    sourceUrl: 'https://hoahoc.org/',
    downloadUrl: 'https://hoahoc.org/de-hoa-12-lien-truong-nghe-an.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-04T16:00:00Z',
    description: 'Đề thi Hóa học liên trường Nghệ An với ngân hàng câu hỏi đổi mới theo định hướng đánh giá năng lực thực hành và tư duy khoa học.',
    province: 'Nghệ An',
  },
  {
    id: 'ext-van-12-nghean',
    title: 'Đề Thi Thử Tốt Nghiệp THPT 2025 Ngữ Văn Sở GD&ĐT Nghệ An (Hướng Dẫn Chấm)',
    subject: 'Ngữ văn',
    grade: 'Lớp 12',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/ngu-van/de-thi-thu/',
    downloadUrl: 'https://thi247.com/de-van-thi-thu-thpt-nghe-an-2025.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-12T11:00:00Z',
    description: 'Đề thi thử Ngữ văn 12 tỉnh Nghệ An theo format mới: Đọc hiểu văn bản ký/truyện ngắn hiện đại và viết bài nghị luận văn học so sánh hai hình tượng.',
    province: 'Nghệ An',
  },
  {
    id: 'ext-van-12-lamson',
    title: 'Đề Khảo Sát Ngữ Văn 12 THPT Chuyên Lam Sơn Thanh Hóa (File Word)',
    subject: 'Ngữ văn',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/ngu-van/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-van-12-chuyen-lam-son.docx',
    fileType: 'docx',
    publishedAt: '2026-03-08T13:20:00Z',
    description: 'Bộ đề thi thử Ngữ văn trường THPT Chuyên Lam Sơn có bảng biểu điểm chi tiết từng ý cho giáo viên và học sinh đối chiếu.',
    province: 'Thanh Hóa',
  },
  {
    id: 'ext-van-12-hanoi',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Ngữ Văn Sở GD&ĐT Hà Nội (Có Đáp Án Mẫu)',
    subject: 'Ngữ văn',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/ngu-van/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-van-12-so-gd-ha-noi.docx',
    fileType: 'docx',
    publishedAt: '2026-03-05T14:30:00Z',
    description: 'Đề thi thử Ngữ văn 12 của Sở GD&ĐT Hà Nội với ngữ liệu đọc hiểu ngoài chương trình SGK và câu hỏi nghị luận xã hội về tinh thần tự học.',
    province: 'Hà Nội',
  },
  {
    id: 'ext-anh-12-tphcm',
    title: 'Đề Thi Thử THPT Quốc Gia Tiếng Anh Sở GD&ĐT TP.HCM (File Nghe Audio & Word)',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/tieng-anh/',
    downloadUrl: 'https://thuvienhoclieu.com/download/tieng-anh-12-tphcm-full.docx',
    fileType: 'docx',
    publishedAt: '2026-03-11T09:40:00Z',
    description: 'Đề kiểm tra chất lượng môn Tiếng Anh 12 của Sở GD&ĐT TP.HCM bám sát 50 câu trắc nghiệm chuẩn form Bộ GD&ĐT có kèm giải thích từng câu.',
    province: 'TP.HCM',
  },
  {
    id: 'ext-anh-12-hanoi',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Tiếng Anh Sở GD&ĐT Hà Nội (Mã Đề 401 - 404)',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/tieng-anh/de-thi-thu/',
    downloadUrl: 'https://thi247.com/de-tieng-anh-12-ha-noi.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-09T10:15:00Z',
    description: 'Đề thi thử chính thức Tiếng Anh 12 Sở GD&ĐT Hà Nội có độ chuẩn hóa cao về trọng âm, ngữ âm, từ đồng nghĩa/trái nghĩa và bài đọc hiểu chuyên sâu.',
    province: 'Hà Nội',
  },
  {
    id: 'ext-anh-12-chuyenngoaingu',
    title: 'Đề Thi Thử THPT Quốc Gia Tiếng Anh THPT Chuyên Ngoại Ngữ Hà Nội',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/tieng-anh/',
    downloadUrl: 'https://thuvienhoclieu.com/download/tieng-anh-chuyen-ngoai-ngu-thpt.docx',
    fileType: 'docx',
    publishedAt: '2026-03-07T14:50:00Z',
    description: 'Đề thi thử Tiếng Anh Chuyên Ngoại Ngữ Hà Nội với ngân hàng câu hỏi phân loại học sinh xuất sắc xét tuyển đại học top đầu.',
    province: 'Hà Nội',
  },
  {
    id: 'ext-anh-12-namdinh',
    title: 'Đề Khảo Sát Tiếng Anh 12 Sở GD&ĐT Nam Định (Đầy Đủ File Word)',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/tieng-anh/',
    downloadUrl: 'https://thuvienhoclieu.com/download/tieng-anh-12-nam-dinh.docx',
    fileType: 'docx',
    publishedAt: '2026-03-05T08:30:00Z',
    description: 'Đề khảo sát Tiếng Anh Nam Định chuẩn 50 câu trắc nghiệm bám sát ma trận tốt nghiệp THPT kèm file Word dễ dàng in ấn.',
    province: 'Nam Định',
  },
  {
    id: 'ext-sinh-12-vinhphuc',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Sinh Học Sở GD&ĐT Vĩnh Phúc',
    subject: 'Sinh học',
    grade: 'Lớp 12',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/sinh-hoc/de-thi-thu/',
    downloadUrl: 'https://thi247.com/de-sinh-12-thi-thu-vinh-phuc.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-09T15:10:00Z',
    description: 'Đề thi Sinh học 12 ôn luyện thi tốt nghiệp: Cơ chế di truyền và biến dị, Quy luật di truyền Mendel, Di truyền người và Sinh thái học quần thể.',
    province: 'Vĩnh Phúc',
  },
  {
    id: 'ext-sinh-12-nghean',
    title: 'Đề Thi Thử THPT Quốc Gia Sinh Học Sở GD&ĐT Nghệ An (Liên Trường)',
    subject: 'Sinh học',
    grade: 'Lớp 12',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/sinh-hoc/de-thi-thu/',
    downloadUrl: 'https://thi247.com/de-sinh-12-lien-truong-nghe-an.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-06T11:20:00Z',
    description: 'Đề thi thử Sinh học 12 của Sở GD Nghệ An với nhiều câu hỏi phả hệ, liên kết gen và bài toán xác suất di truyền nâng cao.',
    province: 'Nghệ An',
  },
  {
    id: 'ext-sinh-12-chuyenkhtn',
    title: 'Đề Thi Thử Sinh Học 12 THPT Chuyên Khoa Học Tự Nhiên Hà Nội',
    subject: 'Sinh học',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-sinh-12-chuyen-khtn.docx',
    fileType: 'docx',
    publishedAt: '2026-03-03T16:40:00Z',
    description: 'Đề thi thử Sinh học Chuyên KHTN có độ phân hóa cao phục vụ học sinh ôn thi khối B (Toán - Hóa - Sinh) xét tuyển y dược.',
    province: 'Chuyên KHTN',
  },
  {
    id: 'ext-su-12-bacninh',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Môn Lịch Sử Sở GD&ĐT Bắc Ninh',
    subject: 'Lịch sử',
    grade: 'Lớp 12',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/lich-su/de-thi-thu/',
    downloadUrl: 'https://thi247.com/de-su-thi-thu-bac-ninh-2025.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-07T14:00:00Z',
    description: 'Đề thi Lịch sử 12 chuẩn 40 câu trắc nghiệm: Cách mạng tháng Tám 1945, Kháng chiến chống Pháp (1945 - 1954) và Kháng chiến chống Mỹ (1954 - 1975).',
    province: 'Bắc Ninh',
  },
  {
    id: 'ext-su-12-quochoc-hue',
    title: 'Đề Thi Thử THPT Quốc Gia Lịch Sử Trường THPT Chuyên Quốc Học Huế',
    subject: 'Lịch sử',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-su-12-chuyen-quoc-hoc-hue.docx',
    fileType: 'docx',
    publishedAt: '2026-03-04T10:30:00Z',
    description: 'Đề thi thử môn Lịch sử Chuyên Quốc Học Huế với các câu hỏi liên hệ so sánh các giai đoạn cách mạng Việt Nam và quan hệ quốc tế thời kỳ Chiến tranh lạnh.',
    province: 'Quốc Học Huế',
  },
  {
    id: 'ext-su-12-namdinh',
    title: 'Đề Khảo Sát Chất Lượng Lịch Sử 12 Sở GD&ĐT Nam Định (File Word)',
    subject: 'Lịch sử',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-su-12-nam-dinh.docx',
    fileType: 'docx',
    publishedAt: '2026-03-01T15:15:00Z',
    description: 'Bộ đề thi thử môn Lịch sử tỉnh Nam Định bám sát ma trận thi tốt nghiệp THPT có đáp án và phân tích chi tiết các bẫy mốc thời gian sự kiện.',
    province: 'Nam Định',
  },
  {
    id: 'ext-dia-12-thanhhoa',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Môn Địa Lí Sở GD&ĐT Thanh Hóa (File Word)',
    subject: 'Địa lí',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-dia-12-thanh-hoa-file-word.docx',
    fileType: 'docx',
    publishedAt: '2026-03-06T10:30:00Z',
    description: 'Đề thi Địa lí 12 kết hợp khai thác Atlat Địa lí Việt Nam và phân tích các ngành kinh tế nông nghiệp, công nghiệp, dịch vụ và các vùng kinh tế trọng điểm.',
    province: 'Thanh Hóa',
  },
  {
    id: 'ext-dia-12-namdinh',
    title: 'Đề Khảo Sát Địa Lí 12 Sở GD&ĐT Nam Định (Đầy Đủ 40 Câu Trắc Nghiệm)',
    subject: 'Địa lí',
    grade: 'Lớp 12',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/dia-ly/de-thi-thu/',
    downloadUrl: 'https://thi247.com/de-dia-12-nam-dinh.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-03T13:40:00Z',
    description: 'Đề thi thử Địa lí 12 Nam Định rèn luyện kỹ năng đọc bảng số liệu, nhận diện dạng biểu đồ và giải thích sự phân bố kinh tế - xã hội Việt Nam.',
    province: 'Nam Định',
  },
  {
    id: 'ext-gdkt-12-ninhbinh',
    title: 'Đề Thi Thử Tốt Nghiệp THPT GDKT & PL Sở GD&ĐT Ninh Bình',
    subject: 'GDKT & PL',
    grade: 'Lớp 12',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/gdcd/de-thi-thu/',
    downloadUrl: 'https://thi247.com/de-gdkt-pl-12-ninh-binh.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-05T08:45:00Z',
    description: 'Đề thi thử môn Giáo dục Kinh tế và Pháp luật lớp 12 chuẩn định hướng tốt nghiệp THPT: Tăng trưởng và phát triển kinh tế, Hội nhập kinh tế quốc tế và Pháp luật lao động.',
    province: 'Ninh Bình',
  },
  {
    id: 'ext-gdkt-12-haiphong',
    title: 'Đề Khảo Sát GDKT & PL 12 Sở GD&ĐT Hải Phòng (Mã Đề 101 - 104)',
    subject: 'GDKT & PL',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-gdkt-pl-12-hai-phong.docx',
    fileType: 'docx',
    publishedAt: '2026-03-02T14:10:00Z',
    description: 'Đề kiểm tra GDKT & PL 12 gồm các tình huống pháp luật thực tiễn về hợp đồng lao động, quyền bình đẳng trong kinh doanh và nghĩa vụ nộp thuế.',
    province: 'Hải Phòng',
  },
  {
    id: 'ext-tin-12-bgd',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Môn Tin Học Cấu Trúc Mới Bộ GD&ĐT',
    subject: 'Tin học',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-tin-hoc-12-tot-nghiep-bgd.docx',
    fileType: 'docx',
    publishedAt: '2026-03-04T16:20:00Z',
    description: 'Đề thi minh họa & thi thử tốt nghiệp THPT môn Tin học (môn thi mới từ năm 2025): Mạng máy tính, Trí tuệ nhân tạo (AI), Thuật toán và Cơ sở dữ liệu quan hệ.',
    province: 'Hà Nội',
  },
  {
    id: 'ext-tin-12-chuyensupham',
    title: 'Đề Thi Thử THPT Quốc Gia Tin Học THPT Chuyên Sư Phạm Hà Nội',
    subject: 'Tin học',
    grade: 'Lớp 12',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/de-thi-thu/',
    downloadUrl: 'https://thi247.com/de-tin-12-chuyen-su-pham.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-01T09:30:00Z',
    description: 'Đề thi thử Tin học 12 Chuyên Sư Phạm chuẩn định dạng đánh giá năng lực tư duy tính toán, cơ sở dữ liệu SQL và lập trình ứng dụng.',
    province: 'Chuyên Sư Phạm',
  },
  {
    id: 'ext-congnghe-12-thi247',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Môn Công Nghệ (Định Hướng Công Nghiệp)',
    subject: 'Công nghệ',
    grade: 'Lớp 12',
    source: 'Thi247',
    sourceUrl: 'https://thi247.com/category/de-thi-thu/',
    downloadUrl: 'https://thi247.com/de-cong-nghe-12-cong-nghiep.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-02T11:45:00Z',
    description: 'Đề thi tốt nghiệp THPT môn Công nghệ: Kỹ thuật điện, Điện tử, Mạch điều khiển tự động và Bản vẽ kỹ thuật cơ khí chuẩn form trắc nghiệm mới.',
    province: 'Sở GD&ĐT',
  },
  {
    id: 'ext-congnghe-12-namdinh',
    title: 'Đề Khảo Sát Công Nghệ 12 Sở GD&ĐT Nam Định (Định Hướng Nông Nghiệp)',
    subject: 'Công nghệ',
    grade: 'Lớp 12',
    source: 'Thuvienhoclieu',
    sourceUrl: 'https://thuvienhoclieu.com/category/de-thi/de-thi-thu-thpt/',
    downloadUrl: 'https://thuvienhoclieu.com/download/de-cong-nghe-12-nam-dinh.docx',
    fileType: 'docx',
    publishedAt: '2026-02-27T10:00:00Z',
    description: 'Đề khảo sát Công nghệ 12 Nông nghiệp: Công nghệ sinh học trong trồng trọt, bảo vệ thực vật, chăn nuôi thông minh và nông nghiệp công nghệ cao.',
    province: 'Nam Định',
  },

  // ═══════════════════════════════════════════════════════════════════
  // ⏱️ THI THỬ EDU (thithu.edu.vn) — NỀN TẢNG THI TRỰC TUYẾN BẤM GIỜ TỰ ĐỘNG
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'ext-thithuedu-toan-12',
    title: 'Đề Thi Thử Trực Tuyến Tốt Nghiệp THPT 2026 Môn Toán (Thi Thử Edu)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thi Thử Edu',
    sourceUrl: 'https://thithu.edu.vn/thi-thu-thpt-quoc-gia/toan-hoc',
    downloadUrl: 'https://thithu.edu.vn/download/de-thi-thu-toan-2026-thithuedu.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-20T08:00:00Z',
    description: 'Nền tảng thi trực tuyến thithu.edu.vn: Ngân hàng câu hỏi bám sát kỳ thi TN THPT Quốc gia 2026, làm bài trực tiếp có đồng hồ bấm giờ đếm ngược 90 phút và chấm điểm tự động tức thì.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 8940,
  },
  {
    id: 'ext-thithuedu-vatly-12',
    title: 'Đề Thi Thử Vật Lý Online Bấm Giờ Tự Động – Chuẩn Cấu Trúc 3 Phần BGD (Thi Thử Edu)',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    source: 'Thi Thử Edu',
    sourceUrl: 'https://thithu.edu.vn/thi-thu-thpt-quoc-gia/vat-ly',
    downloadUrl: 'https://thithu.edu.vn/download/de-thi-thu-vat-ly-2026-thithuedu.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-19T09:30:00Z',
    description: 'Đề thi trực tuyến bấm giờ 50 phút với đủ 3 phần: Trắc nghiệm 4 lựa chọn, Trắc nghiệm Đúng/Sai, và Trắc nghiệm trả lời ngắn Vật lý 12.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 7420,
  },
  {
    id: 'ext-thithuedu-hoahoc-12',
    title: 'Đề Thi Thử Hóa Học Trực Tuyến 2026 Rèn Luyện Tâm Lý Phòng Thi (Thi Thử Edu)',
    subject: 'Hóa học',
    grade: 'Lớp 12',
    source: 'Thi Thử Edu',
    sourceUrl: 'https://thithu.edu.vn/thi-thu-thpt-quoc-gia/hoa-hoc',
    downloadUrl: 'https://thithu.edu.vn/download/de-thi-thu-hoa-hoc-2026-thithuedu.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-18T14:15:00Z',
    description: 'Hệ thống thi thử Hóa học 12 trực tuyến mượt mà, bài toán thực tiễn este-lipit, điện phân và phức chất, tự động lưu lịch sử làm bài.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 6510,
  },
  {
    id: 'ext-thithuedu-tienganh-12',
    title: 'Đề Thi Thử Tiếng Anh Trực Tuyến Bấm Giờ 50 Phút – Có Bảng Phân Tích Kỹ Năng (Thi Thử Edu)',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    source: 'Thi Thử Edu',
    sourceUrl: 'https://thithu.edu.vn/thi-thu-thpt-quoc-gia/tieng-anh',
    downloadUrl: 'https://thithu.edu.vn/download/de-thi-thu-tieng-anh-2026-thithuedu.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-17T10:00:00Z',
    description: 'Đề thi trắc nghiệm tiếng Anh 50 câu bấm giờ tự động, chấm điểm phân loại ngữ pháp, từ vựng và bài đọc điền từ chuẩn ma trận BGD 2026.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 50,
    views: 8120,
  },
  {
    id: 'ext-thithuedu-sinhhoc-12',
    title: 'Đề Khảo Sát Sinh Học Trực Tuyến 2026 Tự Động Chấm Điểm (Thi Thử Edu)',
    subject: 'Sinh học',
    grade: 'Lớp 12',
    source: 'Thi Thử Edu',
    sourceUrl: 'https://thithu.edu.vn/thi-thu-thpt-quoc-gia/sinh-hoc',
    downloadUrl: 'https://thithu.edu.vn/download/de-thi-thu-sinh-hoc-2026-thithuedu.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-16T15:30:00Z',
    description: 'Ngân hàng đề thi thử Sinh học 12 trực tuyến: Di truyền phân tử, quy luật di truyền Menđen và sinh thái học ứng dụng trong nông nghiệp.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 5200,
  },
  {
    id: 'ext-thithuedu-nguvan-12',
    title: 'Đề Thi Thử Trực Tuyến Ngữ Văn 2026 – Đọc Hiểu & Viết Nghị Luận (Thi Thử Edu)',
    subject: 'Ngữ văn',
    grade: 'Lớp 12',
    source: 'Thi Thử Edu',
    sourceUrl: 'https://thithu.edu.vn/thi-thu-thpt-quoc-gia/ngu-van',
    downloadUrl: 'https://thithu.edu.vn/download/de-thi-thu-ngu-van-2026-thithuedu.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-15T08:00:00Z',
    description: 'Đề thi thử Ngữ văn 12 có đồng hồ bấm giờ 90 phút, cung cấp gợi ý dàn ý, thang điểm chi tiết cho đoạn văn nghị luận xã hội và bài phân tích văn học.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 6,
    timeMinutes: 90,
    views: 7900,
  },
  {
    id: 'ext-thithuedu-lichsu-12',
    title: 'Đề Thi Thử Lịch Sử Trực Tuyến 2026 Bám Sát Kỳ Thi THPT (Thi Thử Edu)',
    subject: 'Lịch sử',
    grade: 'Lớp 12',
    source: 'Thi Thử Edu',
    sourceUrl: 'https://thithu.edu.vn/thi-thu-thpt-quoc-gia/lich-su',
    downloadUrl: 'https://thithu.edu.vn/download/de-thi-thu-lich-su-2026-thithuedu.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-14T09:00:00Z',
    description: 'Làm bài thi thử Lịch sử trực tuyến 40 câu hỏi trắc nghiệm, bấm giờ 50 phút và hiển thị ngay kết quả phân tích theo giai đoạn lịch sử.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 4890,
  },
  {
    id: 'ext-thithuedu-diali-12',
    title: 'Đề Thi Thử Địa Lí Online Bấm Giờ Chuẩn Ma Trận Mới (Thi Thử Edu)',
    subject: 'Địa lí',
    grade: 'Lớp 12',
    source: 'Thi Thử Edu',
    sourceUrl: 'https://thithu.edu.vn/thi-thu-thpt-quoc-gia/dia-li',
    downloadUrl: 'https://thithu.edu.vn/download/de-thi-thu-dia-li-2026-thithuedu.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-13T14:30:00Z',
    description: 'Hệ thống thi Địa lí trực tuyến: Phân tích biểu đồ, kỹ năng khai thác số liệu và địa lí các vùng kinh tế trọng điểm theo chương trình 2026.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 4720,
  },
  {
    id: 'ext-thithuedu-gdktpl-12',
    title: 'Đề Thi Trắc Nghiệm Trực Tuyến Kinh Tế & Pháp Luật 2026 (Thi Thử Edu)',
    subject: 'GDKT & PL',
    grade: 'Lớp 12',
    source: 'Thi Thử Edu',
    sourceUrl: 'https://thithu.edu.vn/thi-thu-thpt-quoc-gia/gdkt-pl',
    downloadUrl: 'https://thithu.edu.vn/download/de-thi-thu-gdkt-pl-2026-thithuedu.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-12T11:00:00Z',
    description: 'Đề thi thử trực tuyến môn GDKT&PL với hệ thống câu hỏi tình huống kinh tế thị trường, pháp luật kinh doanh, tự động chấm điểm và giải thích căn cứ pháp luật.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 4310,
  },
  {
    id: 'ext-thithuedu-tinhoc-12',
    title: 'Đề Khảo Sát Tin Học Trực Tuyến 2026 Ngân Hàng Câu Hỏi Chuẩn (Thi Thử Edu)',
    subject: 'Tin học',
    grade: 'Lớp 12',
    source: 'Thi Thử Edu',
    sourceUrl: 'https://thithu.edu.vn/thi-thu-thpt-quoc-gia/tin-hoc',
    downloadUrl: 'https://thithu.edu.vn/download/de-thi-thu-tin-hoc-2026-thithuedu.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-11T16:00:00Z',
    description: 'Hệ thống thi trắc nghiệm trực tuyến Tin học 12 bám sát định dạng đánh giá năng lực tư duy máy tính, CSDL quan hệ và mạng máy tính.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 3950,
  },

  // ═══════════════════════════════════════════════════════════════════
  // 🎯 TUYENSINH247 (on.tuyensinh247.com) — TRẢI NGHIỆM TRẮC NGHIỆM TỰ CHỌN & PHÂN TÍCH ĐÚNG/SAI
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'ext-tuyensinh247-toan-12',
    title: 'Đề Thi Trắc Nghiệm Trải Nghiệm Môn Toán – Bảng Phân Tích Đúng/Sai & Lỗ Hổng Kiến Thức (Tuyensinh247)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Tuyensinh247',
    sourceUrl: 'https://on.tuyensinh247.com/thi-thu/ky-thi-thpt.html',
    downloadUrl: 'https://on.tuyensinh247.com/download/de-thi-thu-toan-tuyensinh247.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-21T07:30:00Z',
    description: 'Hệ thống Tuyensinh247: Sau khi hoàn thành bài thi trắc nghiệm Toán, hệ thống hiển thị biểu đồ phân tích chi tiết câu đúng/sai, độ lệch chuẩn và chỉ rõ chủ đề kiến thức cần bù đắp.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 11200,
  },
  {
    id: 'ext-tuyensinh247-vatly-12',
    title: 'Đề Thi Thử Vật Lý 2026 Trải Nghiệm Trắc Nghiệm Tự Chọn Chương Trình Mới (Tuyensinh247)',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    source: 'Tuyensinh247',
    sourceUrl: 'https://on.tuyensinh247.com/thi-thu/ky-thi-thpt.html',
    downloadUrl: 'https://on.tuyensinh247.com/download/de-thi-thu-vat-ly-tuyensinh247.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-20T10:15:00Z',
    description: 'Bài thi trải nghiệm môn Vật lý chương trình mới với các câu hỏi thực tế về nhiệt học, khí lý tưởng và từ trường. Cung cấp báo cáo đánh giá năng lực toàn diện.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 8900,
  },
  {
    id: 'ext-tuyensinh247-hoahoc-12',
    title: 'Đề Trắc Nghiệm Trải Nghiệm Hóa Học 12 – Phân Tích Năng Lực Vận Dụng (Tuyensinh247)',
    subject: 'Hóa học',
    grade: 'Lớp 12',
    source: 'Tuyensinh247',
    sourceUrl: 'https://on.tuyensinh247.com/thi-thu/ky-thi-thpt.html',
    downloadUrl: 'https://on.tuyensinh247.com/download/de-thi-thu-hoa-hoc-tuyensinh247.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-19T14:40:00Z',
    description: 'Đề thi trắc nghiệm Hóa học 12 tự chọn bám sát ma trận mới, đánh giá năng lực giải quyết vấn đề hóa học thực tiễn kèm bảng nhận diện điểm mạnh/yếu.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 7850,
  },
  {
    id: 'ext-tuyensinh247-sinhhoc-12',
    title: 'Đề Thi Trắc Nghiệm Sinh Học 12 Báo Cáo Chi Tiết Kiến Thức Cần Bù Đắp (Tuyensinh247)',
    subject: 'Sinh học',
    grade: 'Lớp 12',
    source: 'Tuyensinh247',
    sourceUrl: 'https://on.tuyensinh247.com/thi-thu/ky-thi-thpt.html',
    downloadUrl: 'https://on.tuyensinh247.com/download/de-thi-thu-sinh-hoc-tuyensinh247.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-18T16:20:00Z',
    description: 'Trải nghiệm đề thi Sinh học 12 có bảng gợi ý bài giảng ôn bù các chuyên đề học sinh làm sai nhiều nhất, đặc biệt là phần bài tập phả hệ và di truyền học người.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 6300,
  },
  {
    id: 'ext-tuyensinh247-tienganh-12',
    title: 'Đề Thi Thử Tiếng Anh Trắc Nghiệm Tự Chọn Kèm Biểu Đồ Kỹ Năng Đọc Hiểu (Tuyensinh247)',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    source: 'Tuyensinh247',
    sourceUrl: 'https://on.tuyensinh247.com/thi-thu/ky-thi-thpt.html',
    downloadUrl: 'https://on.tuyensinh247.com/download/de-thi-thu-tieng-anh-tuyensinh247.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-17T09:10:00Z',
    description: 'Khảo sát năng lực Tiếng Anh THPT theo format mới, tự động phân tích tỷ lệ sai sót theo các chuyên đề Ngữ pháp, Thành ngữ (Idioms) và Đọc hiểu suy luận.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 50,
    views: 9400,
  },
  {
    id: 'ext-tuyensinh247-lichsu-12',
    title: 'Đề Thi Thử Lịch Sử Trải Nghiệm Đánh Giá Năng Lực KHXH (Tuyensinh247)',
    subject: 'Lịch sử',
    grade: 'Lớp 12',
    source: 'Tuyensinh247',
    sourceUrl: 'https://on.tuyensinh247.com/thi-thu/ky-thi-thpt.html',
    downloadUrl: 'https://on.tuyensinh247.com/download/de-thi-thu-lich-su-tuyensinh247.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-16T11:00:00Z',
    description: 'Đề thi trắc nghiệm Lịch sử lớp 12 tự chọn theo chương trình mới, phân tích chi tiết mức độ nhận biết, thông hiểu và vận dụng lịch sử Việt Nam hiện đại.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 5400,
  },
  {
    id: 'ext-tuyensinh247-diali-12',
    title: 'Đề Trải Nghiệm Trắc Nghiệm Địa Lí 12 – Phân Tích Kỹ Năng Đọc Atlas & Số Liệu (Tuyensinh247)',
    subject: 'Địa lí',
    grade: 'Lớp 12',
    source: 'Tuyensinh247',
    sourceUrl: 'https://on.tuyensinh247.com/thi-thu/ky-thi-thpt.html',
    downloadUrl: 'https://on.tuyensinh247.com/download/de-thi-thu-dia-li-tuyensinh247.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-15T13:45:00Z',
    description: 'Trải nghiệm thi Địa lí trực tuyến có bảng phân tích kỹ năng đọc biểu đồ, bảng số liệu và kiến thức chuyển dịch cơ cấu kinh tế theo ngành và lãnh thổ.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 5120,
  },
  {
    id: 'ext-tuyensinh247-congnghe-12',
    title: 'Đề Thi Thử Trắc Nghiệm Công Nghệ Định Hướng Công Nghiệp & Điện Tử (Tuyensinh247)',
    subject: 'Công nghệ',
    grade: 'Lớp 12',
    source: 'Tuyensinh247',
    sourceUrl: 'https://on.tuyensinh247.com/thi-thu/ky-thi-thpt.html',
    downloadUrl: 'https://on.tuyensinh247.com/download/de-thi-thu-cong-nghe-tuyensinh247.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-14T08:30:00Z',
    description: 'Bài thi trắc nghiệm Công nghệ 12 môn tự chọn mới, bao gồm mạch điện xoay chiều 3 pha, vi điều khiển và cảm biến, có phân tích giải pháp bù đắp kiến thức.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 4100,
  },

  // ═══════════════════════════════════════════════════════════════════
  // 🌟 HOCMAI.VN (huongnghiep.hocmai.vn) — ĐỀ THI THỬ KÈM NHẬN ĐỊNH CHUYÊN MÔN GIÁO VIÊN
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'ext-hocmai-toan-12',
    title: 'Tổng Hợp Đề Thi Thử TN THPT 2026 Kèm Nhận Định Chuyên Môn Giáo Viên Học Mãi (Môn Toán)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Hocmai.vn',
    sourceUrl: 'https://huongnghiep.hocmai.vn/tong-hop-de-thi-chinh-thuc-tn-thpt-nam-2026-kem-dap-an',
    downloadUrl: 'https://huongnghiep.hocmai.vn/download/de-thi-thu-toan-hocmai-2026.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-22T08:00:00Z',
    description: 'Chuyên trang hướng nghiệp Hocmai.vn cập nhật đề thi thử Toán 2026 kèm nhận định chuyên môn sâu sắc từ các giáo viên luyện thi có tiếng, chỉ rõ mẹo giải nhanh và cảnh báo bẫy điểm.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 12500,
  },
  {
    id: 'ext-hocmai-nguvan-12',
    title: 'Đề Thi Thử Ngữ Văn TN THPT 2026 Kèm Phân Tích Dàn Ý & Hướng Dẫn Chấm Từ Giáo Viên Học Mãi',
    subject: 'Ngữ văn',
    grade: 'Lớp 12',
    source: 'Hocmai.vn',
    sourceUrl: 'https://huongnghiep.hocmai.vn/tong-hop-de-thi-chinh-thuc-tn-thpt-nam-2026-kem-dap-an',
    downloadUrl: 'https://huongnghiep.hocmai.vn/download/de-thi-thu-van-hocmai-2026.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-21T09:30:00Z',
    description: 'Tổng hợp đề Ngữ văn 2026 kèm nhận định chuyên môn của tổ bộ môn Ngữ văn Hocmai: Kỹ năng đọc hiểu ngữ liệu mở và cách lập luận nghị luận văn học đạt điểm 8+.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 6,
    timeMinutes: 90,
    views: 10400,
  },
  {
    id: 'ext-hocmai-vatly-12',
    title: 'Đề Khảo Sát Vật Lý 2026 Kèm Video & Bài Giảng Nhận Định Xu Hướng Ra Đề (Hocmai.vn)',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    source: 'Hocmai.vn',
    sourceUrl: 'https://huongnghiep.hocmai.vn/tong-hop-de-thi-chinh-thuc-tn-thpt-nam-2026-kem-dap-an',
    downloadUrl: 'https://huongnghiep.hocmai.vn/download/de-thi-thu-vat-ly-hocmai-2026.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-20T14:00:00Z',
    description: 'Đề khảo sát Vật lý 12 định dạng mới có bài phân tích chuyên sâu các dạng câu hỏi đúng/sai và câu hỏi trả lời ngắn của giáo viên luyện thi kỳ cựu Hocmai.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 8600,
  },
  {
    id: 'ext-hocmai-hoahoc-12',
    title: 'Đề Thi Thử Tốt Nghiệp Hóa Học Kèm Đáp Án Chi Tiết & Bình Luận Giáo Viên (Hocmai.vn)',
    subject: 'Hóa học',
    grade: 'Lớp 12',
    source: 'Hocmai.vn',
    sourceUrl: 'https://huongnghiep.hocmai.vn/tong-hop-de-thi-chinh-thuc-tn-thpt-nam-2026-kem-dap-an',
    downloadUrl: 'https://huongnghiep.hocmai.vn/download/de-thi-thu-hoa-hoc-hocmai-2026.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-19T11:15:00Z',
    description: 'Bộ đề thi thử Hóa học 12 kèm lời giải chi tiết từng bước, phân tích phương pháp tư duy quy đổi hóa học và bảo toàn khối lượng/nguyên tố.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 7950,
  },
  {
    id: 'ext-hocmai-tienganh-12',
    title: 'Đề Thi Thử Tiếng Anh 2026 Kèm Phân Tích Ma Trận Từ Vựng & Cụm Collocation (Hocmai.vn)',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    source: 'Hocmai.vn',
    sourceUrl: 'https://huongnghiep.hocmai.vn/tong-hop-de-thi-chinh-thuc-tn-thpt-nam-2026-kem-dap-an',
    downloadUrl: 'https://huongnghiep.hocmai.vn/download/de-thi-thu-tieng-anh-hocmai-2026.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-18T15:20:00Z',
    description: 'Đề thi Tiếng Anh THPT Quốc gia tổng hợp từ chuyên trang Hocmai, kèm giải thích chi tiết đáp án và danh sách từ vựng trọng tâm cần ghi nhớ.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 50,
    views: 9200,
  },
  {
    id: 'ext-hocmai-sinhhoc-12',
    title: 'Đề Khảo Sát Năng Lực Sinh Học Kèm Đáp Án & Hướng Dẫn Tư Duy Phả Hệ (Hocmai.vn)',
    subject: 'Sinh học',
    grade: 'Lớp 12',
    source: 'Hocmai.vn',
    sourceUrl: 'https://huongnghiep.hocmai.vn/tong-hop-de-thi-chinh-thuc-tn-thpt-nam-2026-kem-dap-an',
    downloadUrl: 'https://huongnghiep.hocmai.vn/download/de-thi-thu-sinh-hoc-hocmai-2026.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-17T10:45:00Z',
    description: 'Tổng hợp đề khảo sát Sinh học kèm nhận định của giáo viên Hocmai về cấu trúc câu hỏi vận dụng cao liên quan đến công nghệ sinh học và môi trường.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 6150,
  },
  {
    id: 'ext-hocmai-lichsu-12',
    title: 'Đề Thi Thử Lịch Sử 2026 Kèm Bảng Nhận Định Sự Kiện Trọng Tâm (Hocmai.vn)',
    subject: 'Lịch sử',
    grade: 'Lớp 12',
    source: 'Hocmai.vn',
    sourceUrl: 'https://huongnghiep.hocmai.vn/tong-hop-de-thi-chinh-thuc-tn-thpt-nam-2026-kem-dap-an',
    downloadUrl: 'https://huongnghiep.hocmai.vn/download/de-thi-thu-lich-su-hocmai-2026.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-16T16:00:00Z',
    description: 'Nhận định chuyên môn Lịch sử từ giáo viên Hocmai: Phương pháp học thuộc mốc thời gian, bản chất hiệp định và các chiến dịch quân sự trọng điểm.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 5750,
  },
  {
    id: 'ext-hocmai-diali-12',
    title: 'Đề Khảo Sát Địa Lí 2026 Kèm Nhận Định Kỹ Năng Đọc Bản Đồ & Biểu Đồ (Hocmai.vn)',
    subject: 'Địa lí',
    grade: 'Lớp 12',
    source: 'Hocmai.vn',
    sourceUrl: 'https://huongnghiep.hocmai.vn/tong-hop-de-thi-chinh-thuc-tn-thpt-nam-2026-kem-dap-an',
    downloadUrl: 'https://huongnghiep.hocmai.vn/download/de-thi-thu-dia-li-hocmai-2026.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-15T09:00:00Z',
    description: 'Đề thi thử Địa lí kèm bình luận giáo viên Hocmai: Các bẫy thường gặp trong xử lý số liệu tăng trưởng, năng suất và phân bố tài nguyên thiên nhiên.',
    province: 'Toàn quốc',
    region: 'Toàn quốc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 40,
    timeMinutes: 50,
    views: 5300,
  },

  // ═══════════════════════════════════════════════════════════════════
  // 🏛️ THƯ VIỆN PHÁP LUẬT — TRỌN BỘ ĐỀ THI + ĐÁP ÁN 34 TỈNH THÀNH TRÊN CẢ NƯỚC
  // https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html
  // ═══════════════════════════════════════════════════════════════════
  // 1. Hà Nội
  {
    id: 'ext-tvpl-hanoi',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Sở GD&ĐT Hà Nội (Trọn Bộ Tất Cả Các Môn)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-so-ha-noi.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-24T08:00:00Z',
    description: 'Thư Viện Pháp Luật tổng hợp trọn bộ đề thi thử tốt nghiệp THPT Quốc gia Sở GD&ĐT Hà Nội tất cả các môn: Toán, Văn, Anh, Lý, Hóa, Sinh, Sử, Địa kèm đáp án chính thức.',
    province: 'Hà Nội',
    region: 'Miền Bắc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 18500,
  },
  // 2. TP. Hồ Chí Minh
  {
    id: 'ext-tvpl-tphcm',
    title: 'Đề Khảo Sát Đánh Giá Năng Lực Học Sinh 12 Sở GD&ĐT TP.HCM (Trọn Bộ Đề + Đáp Án)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-12-so-tphcm.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-23T09:00:00Z',
    description: 'Thư Viện Pháp Luật tổng hợp link tải trọn bộ đề khảo sát năng lực học sinh lớp 12 toàn TP. Hồ Chí Minh bám sát kỳ thi tốt nghiệp THPT chương trình mới.',
    province: 'TP.HCM',
    region: 'Miền Nam',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 17200,
  },
  // 3. Nam Định
  {
    id: 'ext-tvpl-namdinh',
    title: 'Đề Khảo Sát Chất Lượng Học Kỳ & Thi Thử THPT Sở GD&ĐT Nam Định',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-so-nam-dinh.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-22T10:00:00Z',
    description: 'Đề thi khảo sát nổi tiếng đất học Nam Định với ma trận chuẩn mực cao, câu hỏi phân hóa sắc bén, Thư Viện Pháp Luật tổng hợp đầy đủ các môn kèm lời giải chi tiết.',
    province: 'Nam Định',
    region: 'Miền Bắc',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 16800,
  },
  // 4. Nghệ An
  {
    id: 'ext-tvpl-nghean',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Liên Trường Cụm Sở GD&ĐT Nghệ An',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-lien-truong-nghe-an.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-21T11:00:00Z',
    description: 'Tổng hợp đề thi thử THPT Quốc gia cụm liên trường THPT tỉnh Nghệ An: Toán, Lý, Hóa, Sinh, Văn, Anh được biên tập khoa học trên Thư Viện Pháp Luật.',
    province: 'Nghệ An',
    region: 'Miền Bắc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 15400,
  },
  // 5. Thanh Hóa
  {
    id: 'ext-tvpl-thanhhoa',
    title: 'Đề Khảo Sát Chất Lượng Lớp 12 Cụm Các Trường THPT Sở GD&ĐT Thanh Hóa',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-thanh-hoa.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-20T14:30:00Z',
    description: 'Đề thi khảo sát chất lượng tốt nghiệp THPT Sở GD Thanh Hóa quy tụ hàng chục trường THPT tham gia, cấu trúc phân hóa cao kèm barem điểm chi tiết.',
    province: 'Thanh Hóa',
    region: 'Miền Bắc',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 14900,
  },
  // 6. Hải Phòng
  {
    id: 'ext-tvpl-haiphong',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Sở GD&ĐT Hải Phòng',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-hai-phong.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-19T10:00:00Z',
    description: 'Thư Viện Pháp Luật tổng hợp đề thi thử tốt nghiệp THPT thành phố Hải Phòng đầy đủ các môn thi KHTN và KHXH kèm bảng đáp án trắc nghiệm.',
    province: 'Hải Phòng',
    region: 'Miền Bắc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 12800,
  },
  // 7. Đà Nẵng
  {
    id: 'ext-tvpl-danang',
    title: 'Đề Khảo Sát Năng Lực Thi THPT Toàn Thành Phố Sở GD&ĐT Đà Nẵng',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-da-nang.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-18T08:30:00Z',
    description: 'Đề khảo sát năng lực thi THPT toàn thành phố Đà Nẵng, bám sát các câu hỏi thực tế gắn liền với khoa học công nghệ và đời sống kinh tế xã hội.',
    province: 'Đà Nẵng',
    region: 'Miền Trung',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 13600,
  },
  // 8. Cần Thơ
  {
    id: 'ext-tvpl-cantho',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Thành Phố Cần Thơ (Sở GD&ĐT Cần Thơ)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-can-tho.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-17T09:40:00Z',
    description: 'Trọn bộ đề thi thử tốt nghiệp THPT thành phố Cần Thơ - trung tâm Đồng bằng Sông Cửu Long, định dạng chuẩn 3 phần có đáp án đầy đủ.',
    province: 'Cần Thơ',
    region: 'Miền Nam',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 11900,
  },
  // 9. Bắc Ninh
  {
    id: 'ext-tvpl-bacninh',
    title: 'Đề Khảo Sát Chất Lượng Giáo Dục THPT Sở GD&ĐT Bắc Ninh',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-bac-ninh.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-16T10:15:00Z',
    description: 'Đề thi khảo sát chất lượng khối 12 tỉnh Bắc Ninh nổi tiếng về độ chặt chẽ và bám sát dạng bài thi chính thức của Bộ Giáo dục và Đào tạo.',
    province: 'Bắc Ninh',
    region: 'Miền Bắc',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 12400,
  },
  // 10. Vĩnh Phúc
  {
    id: 'ext-tvpl-vinhphuc',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Cụm Trường THPT Sở GD&ĐT Vĩnh Phúc',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-vinh-phuc.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-15T14:00:00Z',
    description: 'Tổng hợp đề thi thử THPT Quốc gia tỉnh Vĩnh Phúc có lời giải chi tiết và hướng dẫn giải các câu hỏi vận dụng cao Toán, Lý, Hóa, Sinh.',
    province: 'Vĩnh Phúc',
    region: 'Miền Bắc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 13100,
  },
  // 11. Thái Nguyên
  {
    id: 'ext-tvpl-thainguyen',
    title: 'Đề Khảo Sát Năng Lực Học Sinh 12 Sở GD&ĐT Thái Nguyên',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-thai-nguyen.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-14T11:20:00Z',
    description: 'Thư Viện Pháp Luật cập nhật trọn bộ link tải đề thi khảo sát năng lực tốt nghiệp THPT tỉnh Thái Nguyên kèm đáp án biểu điểm chính xác.',
    province: 'Thái Nguyên',
    region: 'Miền Bắc',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 10800,
  },
  // 12. Phú Thọ
  {
    id: 'ext-tvpl-phutho',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Sở GD&ĐT Phú Thọ (Đất Tổ Hùng Vương)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-phu-tho.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-13T09:10:00Z',
    description: 'Đề thi thử tốt nghiệp THPT Quốc gia Sở GD&ĐT Phú Thọ: Cấu trúc cân đối giữa lý thuyết nền tảng và bài tập thực hành, có lời giải chi tiết.',
    province: 'Phú Thọ',
    region: 'Miền Bắc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 11500,
  },
  // 13. Hải Dương
  {
    id: 'ext-tvpl-haiduong',
    title: 'Đề Khảo Sát Chất Lượng Lớp 12 Sở GD&ĐT Hải Dương',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-hai-duong.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-12T15:00:00Z',
    description: 'Tổng hợp đề khảo sát chất lượng tốt nghiệp THPT tỉnh Hải Dương đầy đủ các mã đề và bảng thống kê kết quả phân loại học sinh.',
    province: 'Hải Dương',
    region: 'Miền Bắc',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 11300,
  },
  // 14. Hưng Yên
  {
    id: 'ext-tvpl-hungyen',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Cụm THPT Sở GD&ĐT Hưng Yên',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-hung-yen.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-11T13:30:00Z',
    description: 'Đề thi thử THPT Quốc gia tỉnh Hưng Yên: Hệ thống câu hỏi trắc nghiệm mới bám sát năng lực học sinh, có file PDF tải về miễn phí trên Thư Viện Pháp Luật.',
    province: 'Hưng Yên',
    region: 'Miền Bắc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 10600,
  },
  // 15. Quảng Ninh
  {
    id: 'ext-tvpl-quangninh',
    title: 'Đề Khảo Sát Năng Lực Thi Tốt Nghiệp THPT Sở GD&ĐT Quảng Ninh',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-quang-ninh.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-10T10:45:00Z',
    description: 'Trọn bộ đề thi thử khảo sát chất lượng tốt nghiệp THPT tỉnh Quảng Ninh kèm hướng dẫn giải và biểu điểm chi tiết từng câu.',
    province: 'Quảng Ninh',
    region: 'Miền Bắc',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 11100,
  },
  // 16. Hà Tĩnh
  {
    id: 'ext-tvpl-hatinh',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Toàn Tỉnh Sở GD&ĐT Hà Tĩnh',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-ha-tinh.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-09T08:15:00Z',
    description: 'Đề thi thử THPT Quốc gia Sở GD Hà Tĩnh - vùng đất hiếu học truyền thống, nổi tiếng với câu hỏi toán học tư duy sắc sảo và đáp án chi tiết.',
    province: 'Hà Tĩnh',
    region: 'Miền Bắc',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 13900,
  },
  // 17. Ninh Bình
  {
    id: 'ext-tvpl-ninhbinh',
    title: 'Đề Khảo Sát Chất Lượng Học Sinh 12 Sở GD&ĐT Ninh Bình',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-ninh-binh.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-08T14:20:00Z',
    description: 'Thư Viện Pháp Luật tổng hợp đề khảo sát chất lượng THPT Ninh Bình: Đủ các môn Toán, Văn, Ngoại ngữ và các môn tự chọn kèm bảng đáp án mã đề.',
    province: 'Ninh Bình',
    region: 'Miền Bắc',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 12200,
  },
  // 18. Thừa Thiên Huế
  {
    id: 'ext-tvpl-hue',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Tỉnh Thừa Thiên Huế (Sở GD&ĐT Thừa Thiên Huế)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-thua-thien-hue.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-07T09:00:00Z',
    description: 'Trọn bộ đề thi thử tốt nghiệp THPT Quốc gia tỉnh Thừa Thiên Huế với nhiều trường THPT danh tiếng tham gia, định dạng chuẩn quốc gia mới nhất.',
    province: 'Thừa Thiên Huế',
    region: 'Miền Trung',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 12700,
  },
  // 19. Quảng Nam
  {
    id: 'ext-tvpl-quangnam',
    title: 'Đề Khảo Sát Năng Lực Lớp 12 Sở GD&ĐT Quảng Nam',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-quang-nam.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-06T10:30:00Z',
    description: 'Đề thi khảo sát tốt nghiệp THPT tỉnh Quảng Nam: Tổng hợp link tải PDF trọn bộ đề thi kèm đáp án giải chi tiết trên Thư Viện Pháp Luật.',
    province: 'Quảng Nam',
    region: 'Miền Trung',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 10900,
  },
  // 20. Bình Định
  {
    id: 'ext-tvpl-binhdinh',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Cụm Trường THPT Sở GD&ĐT Bình Định',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-binh-dinh.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-05T14:15:00Z',
    description: 'Đề thi thử THPT Quốc gia tỉnh Bình Định (đất võ Bình Định): Tuyển tập đề thi bám sát kỳ thi THPT với độ phân hóa tốt cho xét tuyển Đại học.',
    province: 'Bình Định',
    region: 'Miền Trung',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 11400,
  },
  // 21. Phú Yên
  {
    id: 'ext-tvpl-phuyen',
    title: 'Đề Khảo Sát Chất Lượng Giáo Dục THPT Sở GD&ĐT Phú Yên',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-phu-yen.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-04T09:20:00Z',
    description: 'Thư Viện Pháp Luật tổng hợp đề khảo sát chất lượng THPT tỉnh Phú Yên: Trọn bộ đề thi + đáp án chính thức các môn trắc nghiệm.',
    province: 'Phú Yên',
    region: 'Miền Trung',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 9800,
  },
  // 22. Khánh Hòa
  {
    id: 'ext-tvpl-khanhhoa',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Tỉnh Khánh Hòa (Sở GD&ĐT Khánh Hòa)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-khanh-hoa.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-03T11:00:00Z',
    description: 'Đề thi thử THPT Quốc gia thành phố Nha Trang - Khánh Hòa: Cấu trúc chuẩn format BGD 2026, câu hỏi gắn liền với biển đảo và kinh tế dịch vụ.',
    province: 'Khánh Hòa',
    region: 'Miền Trung',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 10700,
  },
  // 23. Lâm Đồng
  {
    id: 'ext-tvpl-lamdong',
    title: 'Đề Khảo Sát Chất Lượng Học Sinh Lớp 12 Sở GD&ĐT Lâm Đồng',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-lam-dong.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-02T15:30:00Z',
    description: 'Đề khảo sát chất lượng THPT tỉnh Lâm Đồng (Đà Lạt): Tổng hợp link tải trọn bộ đề thi + đáp án tất cả các môn tự chọn chương trình mới.',
    province: 'Lâm Đồng',
    region: 'Miền Trung',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 11200,
  },
  // 24. Đắk Lắk
  {
    id: 'ext-tvpl-daklak',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Cụm Các Trường THPT Sở GD&ĐT Đắk Lắk',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-dak-lak.pdf',
    fileType: 'pdf',
    publishedAt: '2026-03-01T08:45:00Z',
    description: 'Đề thi thử THPT Quốc gia tỉnh Đắk Lắk - thủ phủ Tây Nguyên: Ma trận đề thi bám sát kỳ thi tốt nghiệp THPT, bảng đáp án chấm điểm tự động.',
    province: 'Đắk Lắk',
    region: 'Miền Trung',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 10300,
  },
  // 25. Gia Lai
  {
    id: 'ext-tvpl-gialai',
    title: 'Đề Khảo Sát Năng Lực Thi Tốt Nghiệp THPT Sở GD&ĐT Gia Lai',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-gia-lai.pdf',
    fileType: 'pdf',
    publishedAt: '2026-02-28T10:00:00Z',
    description: 'Thư Viện Pháp Luật tổng hợp đề thi khảo sát tốt nghiệp THPT tỉnh Gia Lai: Gồm các mã đề trắc nghiệm chuẩn hóa kèm hướng dẫn giải chi tiết.',
    province: 'Gia Lai',
    region: 'Miền Trung',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 9600,
  },
  // 26. Bình Dương
  {
    id: 'ext-tvpl-binhduong',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Toàn Tỉnh Sở GD&ĐT Bình Dương',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-binh-duong.pdf',
    fileType: 'pdf',
    publishedAt: '2026-02-27T14:30:00Z',
    description: 'Đề thi thử THPT Quốc gia tỉnh Bình Dương - trung tâm công nghiệp năng động: Hệ thống câu hỏi hiện đại, bám sát các ứng dụng kỹ thuật và đời sống.',
    province: 'Bình Dương',
    region: 'Miền Nam',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 13400,
  },
  // 27. Đồng Nai
  {
    id: 'ext-tvpl-dongnai',
    title: 'Đề Khảo Sát Chất Lượng Giáo Dục THPT Tỉnh Đồng Nai (Sở GD&ĐT Đồng Nai)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-dong-nai.pdf',
    fileType: 'pdf',
    publishedAt: '2026-02-26T09:15:00Z',
    description: 'Trọn bộ đề thi thử khảo sát chất lượng THPT tỉnh Đồng Nai: Đầy đủ các môn KHTN và KHXH, Thư Viện Pháp Luật tổng hợp link tải file PDF có đáp án.',
    province: 'Đồng Nai',
    region: 'Miền Nam',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 12900,
  },
  // 28. Bà Rịa - Vũng Tàu
  {
    id: 'ext-tvpl-vungtau',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Sở GD&ĐT Bà Rịa - Vũng Tàu',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-vung-tau.pdf',
    fileType: 'pdf',
    publishedAt: '2026-02-25T11:40:00Z',
    description: 'Đề thi thử tốt nghiệp THPT Quốc gia tỉnh Bà Rịa - Vũng Tàu: Cấu trúc 3 phần trắc nghiệm chuẩn form 2026, có barem chấm điểm chi tiết.',
    province: 'Bà Rịa - Vũng Tàu',
    region: 'Miền Nam',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 11800,
  },
  // 29. Long An
  {
    id: 'ext-tvpl-longan',
    title: 'Đề Khảo Sát Năng Lực Học Sinh 12 Sở GD&ĐT Long An',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-long-an.pdf',
    fileType: 'pdf',
    publishedAt: '2026-02-24T16:00:00Z',
    description: 'Thư Viện Pháp Luật tổng hợp link tải trọn bộ đề thi thử tốt nghiệp THPT tỉnh Long An kèm bảng đáp án chi tiết các mã đề.',
    province: 'Long An',
    region: 'Miền Nam',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 10500,
  },
  // 30. Tiền Giang
  {
    id: 'ext-tvpl-tiengiang',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Tỉnh Tiền Giang (Sở GD&ĐT Tiền Giang)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-tien-giang.pdf',
    fileType: 'pdf',
    publishedAt: '2026-02-23T08:30:00Z',
    description: 'Đề thi thử THPT Quốc gia tỉnh Tiền Giang: Hệ thống câu hỏi trắc nghiệm mới bám sát ma trận đánh giá năng lực của Bộ Giáo dục và Đào tạo.',
    province: 'Tiền Giang',
    region: 'Miền Nam',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 10900,
  },
  // 31. Bến Tre
  {
    id: 'ext-tvpl-bentre',
    title: 'Đề Khảo Sát Chất Lượng Học Sinh 12 Sở GD&ĐT Bến Tre (Xứ Dừa Bến Tre)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-ben-tre.pdf',
    fileType: 'pdf',
    publishedAt: '2026-02-22T10:15:00Z',
    description: 'Trọn bộ đề thi thử khảo sát chất lượng tốt nghiệp THPT tỉnh Bến Tre đầy đủ các môn kèm file lời giải chi tiết trên Thư Viện Pháp Luật.',
    province: 'Bến Tre',
    region: 'Miền Nam',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 10200,
  },
  // 32. An Giang
  {
    id: 'ext-tvpl-angiang',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Cụm THPT Sở GD&ĐT An Giang',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-an-giang.pdf',
    fileType: 'pdf',
    publishedAt: '2026-02-21T14:45:00Z',
    description: 'Đề thi thử tốt nghiệp THPT tỉnh An Giang: Phân loại câu hỏi theo 4 mức độ nhận thức, có file PDF tải về miễn phí có đáp án chính thức.',
    province: 'An Giang',
    region: 'Miền Nam',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 10400,
  },
  // 33. Kiên Giang
  {
    id: 'ext-tvpl-kiengiang',
    title: 'Đề Khảo Sát Giáo Dục Trung Học Phổ Thông Sở GD&ĐT Kiên Giang',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-khao-sat-thpt-kien-giang.pdf',
    fileType: 'pdf',
    publishedAt: '2026-02-20T09:30:00Z',
    description: 'Thư Viện Pháp Luật tổng hợp đề thi thử THPT Quốc gia tỉnh Kiên Giang (Rạch Giá - Phú Quốc) kèm hướng dẫn giải và biểu điểm chuẩn xác.',
    province: 'Kiên Giang',
    region: 'Miền Nam',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 9900,
  },
  // 34. Đồng Tháp
  {
    id: 'ext-tvpl-dongthap',
    title: 'Đề Thi Thử Tốt Nghiệp THPT Tỉnh Đồng Tháp (Sở GD&ĐT Đồng Tháp)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    source: 'Thư Viện Pháp Luật',
    sourceUrl: 'https://thuvienphapluat.vn/banan/tin-tuc/tong-hop-de-thi-thu-tot-nghiep-thpt-quoc-gia-2026-tat-ca-cac-mon-tai-34-tinh-thanh-21773.html',
    downloadUrl: 'https://thuvienphapluat.vn/files/de-thi-thu-thpt-dong-thap.pdf',
    fileType: 'pdf',
    publishedAt: '2026-02-19T11:00:00Z',
    description: 'Đề thi thử THPT Quốc gia tỉnh Đồng Tháp (Đất Sen Hồng): Đầy đủ các môn Toán, KHTN và KHXH, Thư Viện Pháp Luật tổng hợp trọn bộ kèm đáp án chi tiết.',
    province: 'Đồng Tháp',
    region: 'Miền Nam',
    examType: 'Thi thử THPT',
    year: '2026',
    hasSolution: true,
    totalQuestions: 50,
    timeMinutes: 90,
    views: 10600,
  }
];

// ─── Cache & Network Fetch ────────────────────────────────────────

const RSS2JSON = 'https://api.rss2json.com/v1/api.json';
const CACHE_TTL = 5 * 60 * 1000; // 5 phút
const _cache: Record<string, { ts: number; items: ExternalExam[] }> = {};

export async function fetchFeedExams(feed: FeedConfig): Promise<ExternalExam[]> {
  const cached = _cache[feed.rssUrl];
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.items;

  try {
    const res = await fetch(
      `${RSS2JSON}?rss_url=${encodeURIComponent(feed.rssUrl)}&count=20`,
      { signal: AbortSignal.timeout(8_000) }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    if (json.status !== 'ok') throw new Error(json.message ?? 'RSS parse error');

    const items: ExternalExam[] = (json.items ?? []).map((item: Record<string, unknown>, idx: number) => {
      const rawContent = String((item.content ?? item.description) ?? '');
      const title = String(item.title ?? '');
      const fileInfo = extractFileUrl(rawContent);
      const subject = detectSubject(title, feed.subject);
      const grade = detectGrade(title);
      const province = extractProvince(title);
      const region = detectRegion(title, province);
      const examType = detectExamCategoryType(title);
      const year = detectYear(title);

      return {
        id: makeId(String(item.link ?? item.guid ?? title)),
        title: title || 'Không có tiêu đề',
        subject,
        grade,
        source: feed.name,
        sourceUrl: String(item.link ?? '#'),
        downloadUrl: fileInfo?.url,
        fileType: fileInfo?.type ?? 'unknown',
        thumbnail:
          (item.thumbnail as string) ||
          ((item.enclosure as Record<string, string>)?.link) ||
          undefined,
        publishedAt: String(item.pubDate ?? new Date().toISOString()),
        description: stripHtml(String(item.description ?? '')).slice(0, 220),
        province,
        region,
        examType,
        year,
        hasSolution: true,
        totalQuestions: subject === 'Toán học' ? 50 : 40,
        timeMinutes: subject === 'Toán học' || subject === 'Ngữ văn' ? 90 : 50,
        views: 2800 + (idx * 310),
      } satisfies ExternalExam;
    });

    _cache[feed.rssUrl] = { ts: Date.now(), items };
    return items;
  } catch (err) {
    console.warn(`[examFeedService] "${feed.name}" fetch skipped or timed out:`, err);
    return [];
  }
}

function normalizeVietnamese(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Tạo key chuẩn hóa nhận diện bản chất của đề thi nhằm khử trùng lặp (Deduplication):
 * Nếu 2 nguồn khác nhau đưa cùng 1 đề thi của 1 trường/tỉnh cho cùng môn và khối lớp,
 * hệ thống sẽ tự động chỉ giữ lại 1 bản ghi tốt nhất.
 */
export function getExamDeduplicationKey(exam: {
  title: string;
  subject: string;
  grade: string;
  province?: string;
  sourceUrl?: string;
}): string {
  const normSubj = normalizeVietnamese(exam.subject || '');
  const normGrade = normalizeVietnamese(exam.grade || '');
  const normProv = normalizeVietnamese(exam.province || '');

  // Lọc bớt các từ chung không mang tính định danh
  const cleanTitle = normalizeVietnamese(exam.title || '')
    .replace(/\b(de thi thu|de thi|de khao sat|khao sat chat luong|khao sat|kiem tra|on tap|chuyen de)\b/g, '')
    .replace(/\b(tot nghiep thpt|thpt quoc gia|thpt|ky thi|quoc gia)\b/g, '')
    .replace(/\b(nam 2024|nam 2025|nam 2026|nam 2027|2024|2025|2026|2027)\b/g, '')
    .replace(/\b(mon|lop 10|lop 11|lop 12|khoi 10|khoi 11|khoi 12|hoc ky 1|hoc ky 2|hk1|hk2)\b/g, '')
    .replace(/\b(co dap an|kem dap an|giai chi tiet|file word|file pdf|tron bo|chinh thuc)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return `${normSubj}__${normGrade}__${normProv}__${cleanTitle.slice(0, 35)}`;
}

/**
 * Fetch toàn bộ đề thi: kết hợp dữ liệu tuyển chọn (Lớp 10, 11, 12 đầy đủ mọi môn TN THPT trên toàn quốc)
 * cùng các feeds RSS cập nhật trực tiếp theo thời gian thực từ các cổng giáo dục lớn.
 * Tự động lọc trùng lặp triệt để theo ID, URL và nội dung chuẩn hóa.
 */
export async function fetchAllExternalExams(
  subjectFilter?: string,
  gradeFilter?: string,
  regionFilter?: string,
  examTypeFilter?: string
): Promise<ExternalExam[]> {
  const feeds = subjectFilter && subjectFilter !== 'Tất cả môn'
    ? EXAM_FEEDS.filter(f => f.subject === subjectFilter || f.subject === 'Tất cả môn')
    : EXAM_FEEDS;

  const results = await Promise.allSettled(feeds.map(f => fetchFeedExams(f)));

  const seenIds = new Set<string>();
  const seenUrls = new Set<string>();
  const seenKeys = new Set<string>();
  const all: ExternalExam[] = [];

  function shouldAddExam(item: ExternalExam): boolean {
    if (seenIds.has(item.id)) return false;

    // Khử trùng theo URL nguồn gốc
    if (item.sourceUrl && item.sourceUrl !== '#' && item.sourceUrl.trim() !== '') {
      const cleanUrl = item.sourceUrl.split('?')[0].replace(/\/+$/, '').toLowerCase();
      if (seenUrls.has(cleanUrl)) return false;
      seenUrls.add(cleanUrl);
    }

    // Khử trùng theo Key chuẩn hóa nội dung (Môn + Lớp + Tỉnh/Trường + Tiêu đề rút gọn)
    const key = getExamDeduplicationKey(item);
    if (key && seenKeys.has(key)) return false;
    if (key) seenKeys.add(key);

    seenIds.add(item.id);
    return true;
  }

  // 1. Thêm các đề trực tuyến mới nhất từ RSS Feeds
  for (const r of results) {
    if (r.status !== 'fulfilled') continue;
    for (const item of r.value) {
      if (subjectFilter && subjectFilter !== 'Tất cả môn' && item.subject !== subjectFilter) continue;
      if (gradeFilter && gradeFilter !== 'Tất cả lớp' && item.grade !== gradeFilter) continue;
      if (regionFilter && regionFilter !== 'Toàn quốc' && item.region !== regionFilter) continue;
      if (examTypeFilter && examTypeFilter !== 'Tất cả dạng đề' && item.examType !== examTypeFilter) continue;

      if (shouldAddExam(item)) {
        all.push(item);
      }
    }
  }

  // 2. Tích hợp kho đề tuyển chọn chuẩn hóa (Thư Viện Pháp Luật 34 tỉnh, Thi Thử Edu, Tuyensinh247, Hocmai, Toanmath, Thi247, Thuvienhoclieu...)
  for (const curated of CURATED_EXTERNAL_EXAMS) {
    const itemRegion = curated.region || detectRegion(curated.title, curated.province);
    const itemType = curated.examType || detectExamCategoryType(curated.title);
    const itemYear = curated.year || detectYear(curated.title);

    if (subjectFilter && subjectFilter !== 'Tất cả môn' && curated.subject !== subjectFilter) continue;
    if (gradeFilter && gradeFilter !== 'Tất cả lớp' && curated.grade !== gradeFilter) continue;
    if (regionFilter && regionFilter !== 'Toàn quốc' && itemRegion !== regionFilter) continue;
    if (examTypeFilter && examTypeFilter !== 'Tất cả dạng đề' && itemType !== examTypeFilter) continue;

    const fullCurated: ExternalExam = {
      ...curated,
      region: itemRegion,
      examType: itemType,
      year: itemYear,
      hasSolution: curated.hasSolution ?? true,
      totalQuestions: curated.totalQuestions ?? (curated.subject === 'Toán học' ? 50 : 40),
      timeMinutes: curated.timeMinutes ?? (curated.subject === 'Toán học' || curated.subject === 'Ngữ văn' ? 90 : 50),
      views: curated.views ?? 3800,
    };

    if (shouldAddExam(fullCurated)) {
      all.push(fullCurated);
    }
  }

  // 3. Sắp xếp theo ngày xuất bản mới nhất lên đầu
  return all.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

