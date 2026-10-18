import React, { useState, useMemo, useEffect } from 'react';
import { Exam, Subject, GradeLevel } from '../types';
import { useAuth } from '../context/AuthContext';
import { autoSynthesizeAzotaExam, SynthesizerMode } from '../services/azotaExamSynthesizer';
import { 
  Clock, 
  HelpCircle, 
  Play, 
  CheckCircle2, 
  Filter, 
  Search, 
  Sparkles, 
  Zap, 
  Globe, 
  BookMarked, 
  Flame, 
  Folder,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Layers,
  GraduationCap
} from 'lucide-react';

/* Skeleton row for exam list */
const SkeletonExamRow = () => (
  <div className="ev-card p-6">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
      <div className="space-y-3 flex-1">
        <div className="flex gap-2">
          <div className="skeleton h-5 w-24 rounded-md" />
          <div className="skeleton h-5 w-16 rounded-md" />
        </div>
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-2/3" />
        <div className="flex gap-4">
          <div className="skeleton h-3 w-20" />
          <div className="skeleton h-3 w-20" />
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <div className="skeleton h-9 w-28 rounded-xl" />
      </div>
    </div>
  </div>
);

export type ExamCategoryFilter = 'all' | 'azota' | 'vdc_9plus' | 'bgd' | 'so_gd' | 'hardcore';

interface ExamListProps {
  exams: Exam[];
  onStartExam: (exam: Exam) => void;
  onViewPreviousResult: (examId: string) => void;
  initialTab?: string;
  onOpenDocumentViewer?: (doc: any) => void;
}

const QUICK_SUBJECTS: { label: string; value: Subject | 'Tổ hợp A00'; icon: string }[] = [
  { label: 'Toán học', value: 'Toán học', icon: '📐' },
  { label: 'Vật lý', value: 'Vật lý', icon: '⚛️' },
  { label: 'Hóa học', value: 'Hóa học', icon: '⚗️' },
  { label: 'Tổ hợp A00', value: 'Tổ hợp A00', icon: '⚡' },
  { label: 'Sinh học', value: 'Sinh học', icon: '🧬' },
  { label: 'Ngữ văn', value: 'Ngữ văn', icon: '📝' },
  { label: 'Tiếng Anh', value: 'Tiếng Anh', icon: '🇬🇧' },
  { label: 'Lịch sử', value: 'Lịch sử', icon: '🏛️' },
  { label: 'Địa lí', value: 'Địa lí', icon: '🗺️' }
];

const GRADE_OPTIONS: GradeLevel[] = [
  'Tất cả lớp',
  'Lớp 12'
];

export const ExamList: React.FC<ExamListProps> = ({ 
  exams, 
  onStartExam, 
  onViewPreviousResult,
  onOpenDocumentViewer
}) => {
  const { examHistory } = useAuth();
  
  // Quick Launch state
  const [selectedQuickSubject, setSelectedQuickSubject] = useState<Subject | 'Tổ hợp A00'>('Toán học');
  const [quickMode, setQuickMode] = useState<SynthesizerMode>('auto_balance');
  const [isLaunching, setIsLaunching] = useState(false);

  // Filters state
  const [categoryFilter, setCategoryFilter] = useState<ExamCategoryFilter>('all');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('Tất cả');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('Tất cả lớp');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(exams.length === 0);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 120);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Map highest score per examId
  const examStats = useMemo(() => {
    const stats: Record<string, { attempts: number; maxScore: number; lastScore: number }> = {};
    examHistory.forEach(h => {
      if (!stats[h.examId]) {
        stats[h.examId] = { attempts: 1, maxScore: h.score, lastScore: h.score };
      } else {
        stats[h.examId].attempts += 1;
        stats[h.examId].maxScore = Math.max(stats[h.examId].maxScore, h.score);
        stats[h.examId].lastScore = h.score;
      }
    });
    return stats;
  }, [examHistory]);

  // Handler: Chọn môn và vào làm bài luôn ngay lập tức
  const handleQuickLaunch = (sub?: Subject | 'Tổ hợp A00') => {
    const targetSubject = sub || selectedQuickSubject;
    setIsLaunching(true);

    setTimeout(() => {
      const generated = autoSynthesizeAzotaExam({
        subject: targetSubject,
        mode: quickMode
      });
      setIsLaunching(false);
      onStartExam(generated);
    }, 200);
  };

  // Filter unified list of exams
  const filteredExams = useMemo(() => {
    return exams.filter(exam => {
      // Search
      const matchesSearch = 
        exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (exam.examCode && exam.examCode.toLowerCase().includes(searchQuery.toLowerCase()));

      // Subject
      const matchesSubject = 
        selectedSubjectFilter === 'Tất cả' || 
        exam.subject === selectedSubjectFilter;

      // Grade
      const matchesGrade = 
        selectedGrade === 'Tất cả lớp' || 
        exam.grade === selectedGrade;

      // Category filter
      let matchesCategory = true;
      if (categoryFilter === 'azota') {
        matchesCategory = Boolean(
          exam.id.includes('azota') || 
          exam.author?.includes('Azota') || 
          (exam.examCode && exam.examCode.startsWith('AZ'))
        );
      } else if (categoryFilter === 'vdc_9plus') {
        matchesCategory = Boolean(
          exam.difficulty?.includes('Chuyên') || 
          exam.difficulty?.includes('9+') || 
          exam.title.includes('9+') || 
          exam.description.includes('9+')
        );
      } else if (categoryFilter === 'bgd') {
        matchesCategory = Boolean(exam.isBGDFormat);
      } else if (categoryFilter === 'so_gd') {
        matchesCategory = Boolean(
          exam.author?.includes('Sở') || 
          exam.title.includes('Sở') || 
          exam.title.includes('Chuyên')
        );
      } else if (categoryFilter === 'hardcore') {
        matchesCategory = Boolean(
          exam.difficulty?.includes('Hardcore') || 
          exam.title.includes('Hardcore') || 
          exam.id.includes('hardcore') ||
          exam.description.includes('Biến thiên')
        );
      }

      return matchesSearch && matchesSubject && matchesGrade && matchesCategory;
    });
  }, [exams, searchQuery, selectedSubjectFilter, selectedGrade, categoryFilter]);

  return (
    <div className="space-y-6">

      {/* ── 1. KHỐI ĐIỀU KHIỂN CHÍNH: CHỌN MÔN VÀ VÀO LÀM BÀI LUÔN ────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-sky-800/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-5">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 border border-amber-300/30 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>Trực Tiếp Vào Thi – Không Giới Hạn Điểm</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                Chọn Môn Cần Thi & Vào Làm Bài Luôn
              </h1>
              <p className="text-xs sm:text-sm text-sky-200/90 max-w-2xl">
                Hệ thống tự động tổng hợp toàn bộ ngân hàng câu hỏi <strong>Azota Khối 12, Bộ GD&ĐT 2026 & Chuyên đề 7-9+ VDC</strong>. Chọn môn và bấm nút để vào thẳng phòng thi CBT bấm giờ!
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-sky-300/80 hidden sm:inline">Chế độ thi:</span>
              <select
                value={quickMode}
                onChange={(e) => setQuickMode(e.target.value as SynthesizerMode)}
                className="bg-slate-900/90 text-white border border-sky-400/40 text-xs rounded-xl px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
              >
                <option value="auto_balance">Tự do chuẩn ma trận (28 câu)</option>
                <option value="hardcore_vdc">Cực hạn 9+ VDC (Độ khó cao nhất)</option>
                <option value="speed_sprint">Luyện phản xạ nhanh (10 câu / 20 phút)</option>
              </select>
            </div>
          </div>

          {/* Subject Selector Buttons */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-sky-300 uppercase tracking-wider">
              <span>Bấm chọn môn cần thi:</span>
              <span className="text-slate-400 font-normal">Đã chọn: <strong className="text-amber-400 font-bold">{selectedQuickSubject}</strong></span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
              {QUICK_SUBJECTS.map((sub) => {
                const isSelected = selectedQuickSubject === sub.value;
                return (
                  <button
                    key={sub.value}
                    onClick={() => {
                      setSelectedQuickSubject(sub.value);
                      setSelectedSubjectFilter(sub.value === 'Tổ hợp A00' ? 'Toán học' : sub.value);
                    }}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 border-amber-300 shadow-md scale-[1.03] ring-2 ring-amber-300/50'
                        : 'bg-white/10 hover:bg-white/15 text-white border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className="text-base">{sub.icon}</span>
                    <span className="truncate w-full text-center">{sub.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-sky-800/60">
            <div className="flex items-center gap-2 text-xs text-sky-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Đề thi sinh ngẫu nhiên tức thì, đồng hồ chống lệch giờ, phiếu trả lời 4 ô chuẩn GDPT 2018.</span>
            </div>

            <button
              onClick={() => handleQuickLaunch()}
              disabled={isLaunching}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black rounded-2xl text-sm shadow-xl transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLaunching ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Đang khởi tạo phòng thi...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>🚀 VÀO LÀM BÀI MÔN {selectedQuickSubject.toUpperCase()} NGAY</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. TỔNG HỢP TOÀN BỘ KHO ĐỀ (GỘP THÀNH 1 DANH SÁCH DUY NHẤT) ──────── */}
      <div className="space-y-4">
        
        {/* Thanh công cụ lọc & tìm kiếm */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
          
          {/* Category Filter Pills (Gộp 1 chỗ dạng nút lọc nhanh, không đổi trang) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 dark:text-slate-500 font-semibold mr-1 shrink-0 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Nguồn đề:
            </span>

            {[
              { id: 'all', label: 'Tất Cả Đề (Tổng Hợp)', count: exams.length, badge: 'FULL' },
              { id: 'azota', label: 'Kho Đề Azota Khối 12', count: exams.filter(e => e.id.includes('azota') || e.author?.includes('Azota')).length, badge: 'AZOTA' },
              { id: 'vdc_9plus', label: 'Chuyên Đề 7-9+ & Bẫy VDC', count: exams.filter(e => e.difficulty?.includes('Chuyên') || e.title.includes('9+')).length, badge: 'VIP 9+' },
              { id: 'bgd', label: 'Chuẩn Bộ GD&ĐT 2026', count: exams.filter(e => e.isBGDFormat).length, badge: 'BGD' },
              { id: 'so_gd', label: 'Sở GD&ĐT & Chuyên', count: exams.filter(e => e.author?.includes('Sở') || e.title.includes('Sở')).length, badge: 'SỞ' },
              { id: 'hardcore', label: 'Hardcore 8+ A00 (Biến Thiên)', count: exams.filter(e => e.difficulty?.includes('Hardcore') || e.id.includes('hardcore')).length, badge: 'HOT' }
            ].map(cat => {
              const isActive = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id as ExamCategoryFilter)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar & Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1 border-t border-slate-100 dark:border-slate-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm đề theo tên, mã đề Azota, trường chuyên, sở GD..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <select
                value={selectedSubjectFilter}
                onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                <option value="Tất cả">Tất cả môn học</option>
                <option value="Toán học">📐 Môn Toán</option>
                <option value="Vật lý">⚛️ Môn Vật lý</option>
                <option value="Hóa học">⚗️ Môn Hóa học</option>
                <option value="Sinh học">🧬 Môn Sinh học</option>
                <option value="Ngữ văn">📝 Môn Ngữ văn</option>
                <option value="Tiếng Anh">🇬🇧 Môn Tiếng Anh</option>
                <option value="Lịch sử">🏛️ Môn Lịch sử</option>
                <option value="Địa lí">🗺️ Môn Địa lí</option>
              </select>

              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value as GradeLevel)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                <option value="Tất cả lớp">Tất cả lớp</option>
                <option value="Lớp 12">Lớp 12</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danh sách đề thi đã tổng hợp */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
            <span>Danh sách đề thi ({filteredExams.length} đề thi sẵn sàng)</span>
            <span>Bấm "Vào làm luôn" để bắt đầu tính giờ thi</span>
          </div>

          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonExamRow key={i} />)
          ) : filteredExams.length > 0 ? (
            filteredExams.map((exam, index) => {
              const stats = examStats[exam.id];
              const hasTaken = Boolean(stats);
              const isAzota = exam.id.includes('azota') || exam.author?.includes('Azota');

              return (
                <div
                  key={exam.id}
                  className={`bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-sky-400 dark:hover:border-sky-500 transition-all shadow-xs ${
                    isAzota ? 'ring-1 ring-sky-400/30' : ''
                  }`}
                >
                  <div className="space-y-2 flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {isAzota ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800 flex items-center gap-1">
                          <Folder className="w-3 h-3 fill-sky-500 text-sky-600" />
                          <span>Kho Azota</span>
                          <span className="opacity-75">· {exam.examCode || `AZ-${index + 101}`}</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {exam.examCode || `MÃ ${index + 101}`}
                        </span>
                      )}

                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                        {exam.subject}
                      </span>

                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {exam.grade}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {exam.difficulty}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="text-xs text-slate-400">
                        {exam.author}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-heading">
                      {exam.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {exam.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <strong>{exam.durationMinutes} phút</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <FileCheck2 className="w-3.5 h-3.5 text-sky-500" />
                        <strong>{exam.questions.length} câu hỏi</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                        <span>{exam.attemptsCount.toLocaleString('vi-VN')} lượt thi</span>
                      </span>
                      {hasTaken && (
                        <span className="flex items-center gap-1 text-emerald-600 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Điểm cao nhất: {stats.maxScore.toFixed(1)}/10</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Single Action Button: VÀO LÀM LUÔN */}
                  <div className="flex items-center gap-2 shrink-0">
                    {hasTaken && (
                      <button
                        onClick={() => onViewPreviousResult(exam.id)}
                        className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Xem kết quả cũ
                      </button>
                    )}

                    <button
                      onClick={() => onStartExam(exam)}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer hover:shadow-sky-500/20"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>{hasTaken ? 'Làm Lại Đề Này' : 'Vào Làm Luôn'}</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                Không tìm thấy đề thi phù hợp
              </h3>
              <p className="text-xs text-slate-500">
                Hãy thử đổi sang môn khác hoặc bấm nút "VÀO LÀM BÀI NGAY" ở trên cùng để hệ thống tự động sinh đề mới!
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
