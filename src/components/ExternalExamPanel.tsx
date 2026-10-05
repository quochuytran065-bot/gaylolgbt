/**
 * ExternalExamPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * Panel hiển thị đề thi thu thập từ các trang web giáo dục lớn trên toàn quốc
 * (Toanmath, Thi247, Thuvienhoclieu, Tuyensinh247, Hoc247, Loigiaihay, VietJack...)
 *
 * Tính năng chuẩn như các web lớn:
 *  • Bộ lọc đa chiều: Vùng miền (Miền Bắc, Miền Trung, Miền Nam, Trường Chuyên), Dạng đề, Năm thi
 *  • Từ khóa gợi ý tìm kiếm 1 chạm (Sở Nam Định, Chuyên Sư Phạm, Sở Hà Nội, Chuyên Lam Sơn...)
 *  • Modal xem trước ma trận đề thi chuẩn Bộ GD&ĐT (Phần I, II, III), thời gian làm bài, độ khó
 *  • Nút "Làm đề ngay" trực tiếp trên web với bấm giờ & tự động chấm điểm
 *  • 1-Click tải file đề thi (PDF / Word .docx) kèm đáp án
 *  • Phân trang mượt mà (Infinite scroll / Load more)
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ExternalLink,
  Download,
  Search,
  Filter,
  Globe,
  RefreshCw,
  FileText,
  BookOpen,
  MapPin,
  Calendar,
  ChevronDown,
  AlertCircle,
  GraduationCap,
  Play,
  Sparkles,
  CheckCircle2,
  Copy,
  Clock,
  HelpCircle,
  Award,
  Layers,
  X
} from 'lucide-react';
import {
  fetchAllExternalExams,
  EXAM_FEEDS,
  type ExternalExam,
  type ExamRegion,
  type ExamCategoryType,
  convertExternalToExam,
} from '../services/examFeedService';
import { Exam } from '../types';

// ─── Constants ──────────────────────────────────────────────────

const PAGE_SIZE = 12;

const REGION_TABS: { id: ExamRegion; label: string; icon: string }[] = [
  { id: 'Toàn quốc', label: 'Toàn quốc', icon: '🌐' },
  { id: 'Trường Chuyên', label: 'Trường Chuyên', icon: '🏛️' },
  { id: 'Miền Bắc', label: 'Miền Bắc', icon: '🏔️' },
  { id: 'Miền Trung', label: 'Miền Trung & Tây Nguyên', icon: '🌊' },
  { id: 'Miền Nam', label: 'Miền Nam', icon: '🌴' },
];

const EXAM_TYPE_OPTIONS: ExamCategoryType[] = [
  'Tất cả dạng đề',
  'Thi thử THPT',
  'Khảo sát chất lượng',
  'Học kỳ 1 & 2',
  'Thi HSG',
];

const GRADE_LIST = ['Tất cả lớp', 'Lớp 10', 'Lớp 11', 'Lớp 12'] as const;

const SUBJECT_LIST = [
  'Tất cả môn',
  'Toán học',
  'Ngữ văn',
  'Tiếng Anh',
  'Vật lý',
  'Hóa học',
  'Sinh học',
  'Lịch sử',
  'Địa lí',
  'GDKT & PL',
  'Tin học',
  'Công nghệ',
];

const SOURCE_LIST = [
  'Tất cả nguồn',
  'Thư Viện Pháp Luật',
  'Thi Thử Edu',
  'Tuyensinh247',
  'Hocmai.vn',
  'Toanmath',
  'Thi247',
  'Thuvienhoclieu',
  'VietJack',
  'Hoc247',
  'Loigiaihay',
  'Vật Lý Phổ Thông',
  'Hoahoc.org',
];

const QUICK_SEARCH_TAGS = [
  'Thư Viện Pháp Luật',
  'Thi Thử Edu',
  'Tuyensinh247',
  'Hocmai.vn',
  'Sở Nam Định',
  'Sở Hà Nội',
  'Sở TP.HCM',
  'Sở Nghệ An',
  'Sở Thanh Hóa',
  'Sở Đà Nẵng',
  'Sở Cần Thơ',
  'Chuyên Sư Phạm',
  'Chuyên KHTN',
  'Chuyên Lê Hồng Phong',
  'Chuyên Lam Sơn',
  'Chuyên Quốc Học Huế',
  'Toán 12 2026',
];

// ─── Skeleton Card ───────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="ev-card p-5 space-y-3 animate-pulse">
    <div className="skeleton h-4 w-24 rounded-full" />
    <div className="skeleton h-5 w-full rounded" />
    <div className="skeleton h-4 w-4/5 rounded" />
    <div className="skeleton h-3 w-3/5 rounded" />
    <div className="flex gap-2 pt-1">
      <div className="skeleton h-8 w-24 rounded-lg" />
      <div className="skeleton h-8 w-20 rounded-lg" />
    </div>
  </div>
);

// ─── Exam Preview Modal ──────────────────────────────────────────

interface ExamPreviewModalProps {
  exam: ExternalExam | null;
  onClose: () => void;
  onStartExam?: (exam: Exam) => void;
}

const ExamPreviewModal: React.FC<ExamPreviewModalProps> = ({ exam, onClose, onStartExam }) => {
  const [copied, setCopied] = useState(false);

  if (!exam) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartExam = () => {
    if (onStartExam) {
      const interactive = convertExternalToExam(exam);
      onClose();
      onStartExam(interactive);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/75 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-300">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>THÔNG TIN CHI TIẾT & MA TRẬN ĐỀ THI</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-slate-300">
          
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                {exam.subject}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {exam.grade}
              </span>
              {exam.province && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {exam.province}
                </span>
              )}
              {exam.region && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50">
                  {exam.region}
                </span>
              )}
              {exam.year && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Năm {exam.year}
                </span>
              )}
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-heading leading-snug">
              {exam.title}
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              {exam.description}
            </p>
          </div>

          {/* Ma trận cấu trúc đề thi */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-600" />
              Cấu trúc bài thi chuẩn Bộ Giáo Dục & Đào Tạo
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/50 space-y-1">
                <span className="font-bold text-sky-700 dark:text-sky-300">Phần I (3.0 Điểm)</span>
                <p className="text-slate-600 dark:text-slate-400">12 câu trắc nghiệm 4 lựa chọn (chọn 1 đáp án đúng duy nhất).</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/50 space-y-1">
                <span className="font-bold text-indigo-700 dark:text-indigo-300">Phần II (4.0 Điểm)</span>
                <p className="text-slate-600 dark:text-slate-400">4 câu hỏi Đúng/Sai (mỗi câu gồm 4 ý a, b, c, d độc lập).</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/50 space-y-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-300">Phần III (3.0 Điểm)</span>
                <p className="text-slate-600 dark:text-slate-400">6 câu hỏi trả lời ngắn (điền kết quả số phân loại 9+).</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/50 dark:border-slate-700/40">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {exam.timeMinutes || 90} phút làm bài
                </span>
                <span className="flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" /> {exam.totalQuestions || (exam.subject === 'Toán học' ? 50 : 40)} câu hỏi
                </span>
              </div>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Có đáp án & lời giải chi tiết
              </span>
            </div>
          </div>

          {/* Nguồn cấp */}
          <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-800/40">
            <div>
              <span className="text-slate-500 dark:text-slate-400">Nguồn bài thi: </span>
              <strong className="text-sky-800 dark:text-sky-300">{exam.source}</strong>
            </div>
            {exam.sourceUrl && (
              <a
                href={exam.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-sky-700 dark:text-sky-400 hover:underline"
              >
                <span>Mở trang nguồn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sao chép liên kết đề thi"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã chép link' : 'Chép link'}</span>
            </button>

            {exam.downloadUrl && (
              <a
                href={exam.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Download className="w-4 h-4 text-sky-600" />
                <span>Tải đề ({exam.fileType?.toUpperCase() || 'FILE'})</span>
              </a>
            )}
          </div>

          <button
            onClick={handleStartExam}
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Bắt đầu làm bài thi trực tiếp</span>
          </button>
        </div>

      </div>
    </div>
  );
};

// ─── Exam Card ───────────────────────────────────────────────────

interface ExamCardProps {
  exam: ExternalExam;
  onSelectPreview: (exam: ExternalExam) => void;
  onStartExam?: (exam: Exam) => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onSelectPreview, onStartExam }) => {
  const feedConfig = EXAM_FEEDS.find(f => 
    f.name.toLowerCase().includes(exam.source.toLowerCase()) || 
    exam.source.toLowerCase().includes(f.name.toLowerCase())
  );
  const badgeColor = feedConfig?.color ?? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300';
  const icon = feedConfig?.icon ?? '📄';

  const pubDate = new Date(exam.publishedAt);
  const dateStr = isNaN(pubDate.getTime())
    ? ''
    : pubDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const handleStartExamDirectly = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStartExam) {
      const interactiveExam = convertExternalToExam(exam);
      onStartExam(interactiveExam);
    }
  };

  return (
    <div 
      onClick={() => onSelectPreview(exam)}
      className="ev-card p-5 flex flex-col justify-between gap-3 group hover:border-sky-300 dark:hover:border-sky-700/60 transition-all hover:shadow-md cursor-pointer"
    >
      <div>
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
            {icon} {exam.source}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60">
            {exam.subject}
          </span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {exam.grade}
          </span>
          {exam.province && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5" />
              {exam.province}
            </span>
          )}
          {exam.region && exam.region !== 'Toàn quốc' && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
              {exam.region}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors font-heading">
          {exam.title}
        </h3>

        {/* Description */}
        {exam.description && (
          <p className="text-xs leading-relaxed line-clamp-2 text-slate-600 dark:text-slate-300 mt-2">
            {exam.description}
          </p>
        )}
      </div>

      <div>
        {/* Date & Interactive badge */}
        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          {dateStr && (
            <div className="flex items-center gap-1 text-[11px]">
              <Calendar className="w-3 h-3" />
              <span>{dateStr}</span>
            </div>
          )}
          <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
            <Sparkles className="w-2.5 h-2.5" /> Bấm giờ & Chấm điểm
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 mt-1">
          <button
            onClick={handleStartExamDirectly}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-sm hover:shadow-sky-500/25 flex-1 justify-center cursor-pointer"
            title="Làm đề thi trực tiếp trên web với đầy đủ câu hỏi, bấm giờ và chấm điểm tự động"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Làm đề ngay</span>
          </button>

          {exam.downloadUrl && (
            <a
              href={exam.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
              title={`Tải file ${exam.fileType?.toUpperCase() ?? 'file'}`}
            >
              <Download className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>{exam.fileType === 'pdf' ? 'PDF' : exam.fileType === 'docx' ? 'Word' : 'Tải'}</span>
            </a>
          )}

          <a
            href={exam.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all shadow-2xs"
            title={`Xem nguồn bài viết trên ${exam.source}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Main Panel ──────────────────────────────────────────────────

interface ExternalExamPanelProps {
  defaultSubject?: string;
  onStartExam?: (exam: Exam) => void;
}

export const ExternalExamPanel: React.FC<ExternalExamPanelProps> = ({
  defaultSubject = 'Tất cả môn',
  onStartExam,
}) => {
  const [exams, setExams] = useState<ExternalExam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('Tất cả lớp');
  const [subject, setSubject] = useState(defaultSubject);
  const [selectedRegion, setSelectedRegion] = useState<ExamRegion>('Toàn quốc');
  const [selectedExamType, setSelectedExamType] = useState<ExamCategoryType>('Tất cả dạng đề');
  const [source, setSource] = useState('Tất cả nguồn');
  const [page, setPage] = useState(1);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  // Modal preview state
  const [previewExam, setPreviewExam] = useState<ExternalExam | null>(null);

  // ── Fetch ──────────────────────────────────────────────────────
  const loadExams = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await fetchAllExternalExams(
        subject !== 'Tất cả môn' ? subject : undefined,
        selectedGrade !== 'Tất cả lớp' ? selectedGrade : undefined,
        selectedRegion !== 'Toàn quốc' ? selectedRegion : undefined,
        selectedExamType !== 'Tất cả dạng đề' ? selectedExamType : undefined
      );
      setExams(data);
      setLastFetch(new Date());
      setPage(1);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [subject, selectedGrade, selectedRegion, selectedExamType]);

  useEffect(() => { loadExams(); }, [loadExams]);

  // ── Filter ─────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return exams.filter(e => {
      const searchTarget = `${e.title} ${e.description} ${e.province || ''} ${e.source || ''}`.toLowerCase();
      const matchSearch = !search || searchTarget.includes(search.toLowerCase());
      const matchSource = source === 'Tất cả nguồn' || 
        e.source.toLowerCase().includes(source.toLowerCase()) || 
        source.toLowerCase().includes(e.source.toLowerCase());
      const matchSubject = subject === 'Tất cả môn' || e.subject === subject;
      const matchGrade = selectedGrade === 'Tất cả lớp' || e.grade === selectedGrade;
      const matchRegion = selectedRegion === 'Toàn quốc' || e.region === selectedRegion;
      const matchType = selectedExamType === 'Tất cả dạng đề' || e.examType === selectedExamType;

      return matchSearch && matchSource && matchSubject && matchGrade && matchRegion && matchType;
    });
  }, [exams, search, source, subject, selectedGrade, selectedRegion, selectedExamType]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const resetFilters = () => {
    setSearch('');
    setSelectedGrade('Tất cả lớp');
    setSubject('Tất cả môn');
    setSelectedRegion('Toàn quốc');
    setSelectedExamType('Tất cả dạng đề');
    setSource('Tất cả nguồn');
  };

  // ── Stats ──────────────────────────────────────────────────────
  const statsText = isLoading
    ? 'Đang tải dữ liệu...'
    : `${filtered.length} đề thi từ các Sở GD&ĐT & Trường Chuyên (${new Set(filtered.map(e => e.source)).size} nguồn)`;

  return (
    <div className="space-y-6">

      {/* ── Header Banner ─────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-sky-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 uppercase tracking-wider">
            <Globe className="w-4 h-4 text-sky-400" />
            <span>MẠNG LƯỚI KHẢO THÍ TOÀN QUỐC – 63 TỈNH THÀNH & TRƯỜNG CHUYÊN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading leading-tight">
            Kho Đề Thi & Đề Thi Thử Toàn Quốc
          </h2>
          <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed max-w-2xl">
            Tự động kết nối đề thi thử, đề khảo sát chất lượng từ <strong>{EXAM_FEEDS.length} cổng giáo dục lớn</strong>: Thư Viện Pháp Luật (34 tỉnh), Thi Thử Edu, Tuyển Sinh 247, Học Mãi, Toanmath, Thi247, Thư Viện Học Liệu, VietJack... Bao quát các Sở GD&ĐT và Trường Chuyên danh tiếng trên khắp cả nước.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 rounded-full px-3 py-1 font-semibold flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              Làm đề trực tiếp trên web: Bấm giờ làm bài, tự động chấm điểm & xem lời giải chi tiết
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {EXAM_FEEDS.slice(0, 7).map(f => (
              <span key={f.name} className="text-xs bg-white/10 rounded-full px-2.5 py-1 text-white/80">
                {f.icon} {f.name}
              </span>
            ))}
            {EXAM_FEEDS.length > 7 && (
              <span className="text-xs bg-white/10 rounded-full px-2.5 py-1 text-white/80">
                +{EXAM_FEEDS.length - 7} nguồn khác
              </span>
            )}
          </div>
        </div>
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
          <BookOpen className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* ── 4 Cổng Thi Thử & Khảo Sát Nổi Bật ─────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Thi Thử Edu */}
        <div 
          onClick={() => { setSource('Thi Thử Edu'); setSearch(''); setPage(1); }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
            source === 'Thi Thử Edu'
              ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-400 dark:border-teal-700 shadow-sm'
              : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/70 hover:border-teal-300 dark:hover:border-teal-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl">⏱️</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              Bấm giờ & Tự chấm
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            Thi Thử Edu
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
            Ngân hàng câu hỏi bám sát kỳ thi TN THPT, giao diện thi trực tuyến mượt mà và đồng hồ bấm giờ đếm ngược.
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-teal-600 dark:text-teal-400 font-semibold">
            <span>thithu.edu.vn</span>
            <span className="group-hover:translate-x-0.5 transition-transform">Xem đề →</span>
          </div>
        </div>

        {/* 2. Tuyensinh247 */}
        <div 
          onClick={() => { setSource('Tuyensinh247'); setSearch(''); setPage(1); }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
            source === 'Tuyensinh247'
              ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 dark:border-rose-700 shadow-sm'
              : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/70 hover:border-rose-300 dark:hover:border-rose-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl">🎯</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
              Phân tích đúng/sai
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
            Tuyensinh247
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
            Trắc nghiệm trải nghiệm đủ môn tự chọn, báo cáo phân tích chi tiết đúng/sai & kiến thức cần bù đắp.
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-rose-600 dark:text-rose-400 font-semibold">
            <span>on.tuyensinh247.com</span>
            <span className="group-hover:translate-x-0.5 transition-transform">Xem đề →</span>
          </div>
        </div>

        {/* 3. Hocmai.vn */}
        <div 
          onClick={() => { setSource('Hocmai.vn'); setSearch(''); setPage(1); }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
            source === 'Hocmai.vn'
              ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 dark:border-amber-700 shadow-sm'
              : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/70 hover:border-amber-300 dark:hover:border-amber-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl">🌟</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Nhận định giáo viên
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Hocmai.vn
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
            Hệ thống giáo dục trực tuyến lớn; tổng hợp đề thi thử kèm nhận định chuyên môn từ giáo viên luyện thi có tiếng.
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-semibold">
            <span>huongnghiep.hocmai.vn</span>
            <span className="group-hover:translate-x-0.5 transition-transform">Xem đề →</span>
          </div>
        </div>

        {/* 4. Thư Viện Pháp Luật */}
        <div 
          onClick={() => { setSource('Thư Viện Pháp Luật'); setSearch(''); setPage(1); }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
            source === 'Thư Viện Pháp Luật'
              ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-400 dark:border-blue-700 shadow-sm'
              : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/70 hover:border-blue-300 dark:hover:border-blue-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl">⚖️</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              Trọn bộ 34 Tỉnh
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Thư Viện Pháp Luật
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
            Chuyên mục giáo dục tổng hợp link tải trọn bộ đề thi + đáp án của 34 tỉnh thành trên cả nước rất khoa học.
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold">
            <span>thuvienphapluat.vn</span>
            <span className="group-hover:translate-x-0.5 transition-transform">Xem đề →</span>
          </div>
        </div>
      </div>

      {/* ── Region Segmented Tabs ─────────────────────────────────── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {REGION_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setSelectedRegion(tab.id); setPage(1); }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
              selectedRegion === tab.id
                ? 'bg-sky-700 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700/60'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Filters Container ──────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700/60 shadow-xs space-y-4">
        
        {/* Row 1: Search + Exam Type + Refresh */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Tìm theo tỉnh, trường (Sở Nam Định, Chuyên Sư Phạm, Chuyên Lam Sơn...)"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all"
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Dạng đề thi */}
          <div className="flex items-center gap-1.5 shrink-0">
            <select
              value={selectedExamType}
              onChange={e => { setSelectedExamType(e.target.value as ExamCategoryType); setPage(1); }}
              className="text-xs bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-600 text-slate-800 dark:text-slate-200 font-semibold cursor-pointer"
            >
              {EXAM_TYPE_OPTIONS.map(opt => (
                <option key={opt} value={opt} className="dark:bg-slate-800">{opt}</option>
              ))}
            </select>
          </div>

          <button
            onClick={loadExams}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all disabled:opacity-50 shrink-0 cursor-pointer"
            title="Kiểm tra và đồng bộ lại các nguồn đề thi mới nhất"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Làm mới</span>
          </button>
        </div>

        {/* Row 2: Quick Search Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-400 dark:text-slate-500 font-medium shrink-0">Gợi ý nhanh:</span>
          {QUICK_SEARCH_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => { setSearch(tag); setPage(1); }}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                search === tag
                  ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-bold border border-sky-300 dark:border-sky-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Row 3: Khối lớp selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 text-xs">
          <span className="text-slate-400 dark:text-slate-500 font-medium shrink-0 flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-sky-600" /> Khối lớp:
          </span>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl shrink-0">
            {GRADE_LIST.map(g => (
              <button
                key={g}
                onClick={() => { setSelectedGrade(g); setPage(1); }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedGrade === g
                    ? 'bg-white dark:bg-slate-800 text-sky-700 dark:text-sky-300 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Row 4: Subject tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 dark:text-slate-500 font-medium mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-sky-600" /> Môn thi:
          </span>
          {SUBJECT_LIST.map(s => (
            <button
              key={s}
              onClick={() => { setSubject(s); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                subject === s
                  ? 'bg-sky-700 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Row 5: Source selector + Stats */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <select
              value={source}
              onChange={e => { setSource(e.target.value); setPage(1); }}
              className="text-xs bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-600 text-slate-700 dark:text-slate-300 font-medium cursor-pointer"
            >
              {SOURCE_LIST.map(s => <option key={s} value={s} className="dark:bg-slate-800">{s}</option>)}
            </select>
          </div>

          <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            {statsText}
            {lastFetch && (
              <span className="ml-1">· Cập nhật {lastFetch.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
            )}
          </span>
        </div>

      </div>

      {/* ── Error State ───────────────────────────────────────── */}
      {isError && !isLoading && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center space-y-2">
          <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
          <p className="text-sm font-semibold text-rose-700">Không thể kết nối đến các cổng RSS trực tuyến.</p>
          <p className="text-xs text-rose-500">Hệ thống đang hiển thị kho đề thi dự phòng tuyển chọn. Bấm Thử lại để tải thêm.</p>
          <button
            onClick={loadExams}
            className="mt-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* ── Grid Cards ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
          : paginated.map(exam => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                onSelectPreview={setPreviewExam} 
                onStartExam={onStartExam} 
              />
            ))
        }
      </div>

      {/* ── Empty State ───────────────────────────────────────── */}
      {!isLoading && !isError && filtered.length === 0 && (
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center space-y-3">
          <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-heading">
            Không tìm thấy đề thi phù hợp
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Không có kết quả cho các bộ lọc hiện tại. Bạn hãy thử điều chỉnh lại bộ lọc vùng miền, môn học hoặc từ khóa tìm kiếm.
          </p>
          <button
            onClick={resetFilters}
            className="mt-2 px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Đặt lại tất cả bộ lọc
          </button>
        </div>
      )}

      {/* ── Load More ─────────────────────────────────────────── */}
      {!isLoading && hasMore && (
        <div className="text-center pt-2">
          <button
            onClick={() => setPage(p => p + 1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <ChevronDown className="w-4 h-4" />
            <span>Tải thêm ({filtered.length - paginated.length} đề còn lại)</span>
          </button>
        </div>
      )}

      {/* ── Exam Preview Modal ─────────────────────────────────── */}
      <ExamPreviewModal
        exam={previewExam}
        onClose={() => setPreviewExam(null)}
        onStartExam={onStartExam}
      />

    </div>
  );
};
