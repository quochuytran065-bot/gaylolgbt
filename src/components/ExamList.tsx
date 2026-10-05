import React, { useState, useMemo, useEffect } from 'react';
import { Exam, Subject, GradeLevel } from '../types';
import { useAuth } from '../context/AuthContext';
import { generateUniqueBGDExam, generateExamWithProfile, type ExamDifficultyProfile } from '../services/bgdExamGenerator';
import { ExternalExamPanel } from './ExternalExamPanel';
import { 
  Clock, 
  HelpCircle, 
  Play, 
  CheckCircle2, 
  Filter, 
  Search,
  BookCheck,
  TrendingUp,
  Sparkles,
  Zap,
  Globe,
  BookMarked
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

interface ExamListProps {
  exams: Exam[];
  onStartExam: (exam: Exam) => void;
  onViewPreviousResult: (examId: string) => void;
}

const SUBJECT_OPTIONS: Subject[] = [
  'Tất cả môn',
  'Toán học',
  'Ngữ văn',
  'Tiếng Anh',
  'Vật lý',
  'Hóa học',
  'Sinh học',
  'Lịch sử',
  'Tin học'
];

const GRADE_OPTIONS: GradeLevel[] = [
  'Tất cả lớp',
  'Lớp 10',
  'Lớp 11',
  'Lớp 12'
];

export const ExamList: React.FC<ExamListProps> = ({ 
  exams, 
  onStartExam, 
  onViewPreviousResult 
}) => {
  const { examHistory } = useAuth();
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>('internal');
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Tất cả môn');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('Tất cả lớp');
  const [searchQuery, setSearchQuery] = useState('');
  const [bgdOnlyFilter, setBgdOnlyFilter] = useState(false);
  const [generatorSubject, setGeneratorSubject] = useState<Subject>('Toán học');
  const [generatorProfile, setGeneratorProfile] = useState<ExamDifficultyProfile>('normal');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

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

  const filteredExams = useMemo(() => {
    return exams.filter(exam => {
      const matchesSearch = 
        exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = selectedSubject === 'Tất cả môn' || exam.subject === selectedSubject;
      const matchesGrade = selectedGrade === 'Tất cả lớp' || exam.grade === selectedGrade;
      const matchesBgd = !bgdOnlyFilter || Boolean(exam.isBGDFormat);

      return matchesSearch && matchesSubject && matchesGrade && matchesBgd;
    });
  }, [exams, searchQuery, selectedSubject, selectedGrade, bgdOnlyFilter]);

  return (
    <div className="space-y-6">

      {/* ── Tab Switcher ─────────────────────────────────────────── */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-fit border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
        <button
          onClick={() => setActiveTab('internal')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'internal'
              ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookMarked className="w-4 h-4" />
          Đề Thi Nội Bộ
        </button>
        <button
          onClick={() => setActiveTab('external')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'external'
              ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          Kho Đề Tỉnh / Trường
          <span className="ml-1 text-[10px] bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold px-1.5 py-0.5 rounded-full border border-indigo-200/50 dark:border-indigo-800/50">MỚI</span>
        </button>
      </div>

      {/* ── External Tab ─────────────────────────────────────────── */}
      {activeTab === 'external' && (
        <ExternalExamPanel
          defaultSubject={selectedSubject !== 'Tất cả môn' ? selectedSubject : undefined}
          onStartExam={onStartExam}
        />
      )}

      {/* ── Internal Tab ─────────────────────────────────────────── */}
      {activeTab === 'internal' && (
      <>

      {/* Top Banner Overview */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-sky-800/40">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>NGÂN HÀNG ĐỀ THI TRẮC NGHIỆM CHUẨN HÓA 2026 - 2027</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading leading-tight text-white">
            Phòng Luyện Thi Trắc Nghiệm Bấm Giờ
          </h1>
          <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
            Hệ thống đề thi bám sát định dạng cấu trúc mới nhất của Bộ GD&ĐT gồm 3 phần (Trắc nghiệm nhiều lựa chọn, Đúng/Sai tính điểm bậc thang, và Điền đáp số ngắn). Chấm điểm chuẩn và phân tích lỗi sai tự động.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
          <BookCheck className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* KHỐI TỰ ĐỘNG SINH ĐỀ THI RIÊNG BIỆT CHUẨN BỘ GD&ĐT */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-sky-500/10 dark:from-amber-950/20 dark:via-slate-900/40 dark:to-sky-950/20 rounded-2xl p-5 border border-amber-300/80 dark:border-amber-700/50 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                <Zap className="w-3 h-3 fill-white" />
                AI Sinh Đề Tự Động
              </span>
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300">Format BGD 2025</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-heading">
              Tự Động Sinh Đề Mới – Chọn Độ Khó Theo Nhu Cầu
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Sinh đề ngẫu nhiên không trùng lặp – mỗi lần ra đề mới hoàn toàn với mã đề riêng, xáo trộn câu hỏi và đáp án. Chọn độ khó phù hợp với mục tiêu luyện thi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <select
              value={generatorSubject}
              onChange={(e) => setGeneratorSubject(e.target.value as Subject)}
              className="px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="Toán học">📐 Toán học</option>
              <option value="Vật lý">⚛️ Vật lý</option>
              <option value="Hóa học">⚗️ Hóa học</option>
              <option value="Sinh học">🧬 Sinh học</option>
              <option value="Ngữ văn">📝 Ngữ văn</option>
              <option value="Tiếng Anh">🇬🇧 Tiếng Anh</option>
              <option value="Lịch sử">🏛️ Lịch sử</option>
              <option value="Địa lí">🗺️ Địa lí</option>
            </select>

            <button
              onClick={() => {
                const newExam = generateExamWithProfile(
                  generatorSubject,
                  selectedGrade === 'Tất cả lớp' ? 'Lớp 12' : selectedGrade,
                  generatorProfile
                );
                onStartExam(newExam);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-[0.98] text-white font-bold text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>🎲 Sinh Đề & Thi Ngay</span>
            </button>
          </div>
        </div>

        {/* Difficulty Profile Selector */}
        <div className="border-t border-amber-200/60 dark:border-amber-900/60 pt-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Chọn mức độ khó & nguồn đề:
            </span>
            <span className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold">
              {generatorProfile === 'easy' && 'Củng cố nền tảng (80% câu cơ bản)'}
              {generatorProfile === 'normal' && 'Bám sát ma trận chuẩn BGD 2025'}
              {generatorProfile === 'hard' && 'Độ phân hóa tương đương đề thi thật các Sở GD'}
              {generatorProfile === 'chuyên' && '🔥 Chuẩn độ khó THPT Chuyên (Sư Phạm, KHTN, Amsterdam)'}
              {generatorProfile === 'hsg' && '🏆 Cấp độ HSG Quốc Gia (Câu hỏi tư duy sâu)'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              {
                key: 'easy',
                label: '🟢 Ôn Tập Cơ Bản',
                desc: 'NB 67%',
                activeCls: 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400/50',
                inactiveCls: 'bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50'
              },
              {
                key: 'normal',
                label: '🔵 Chuẩn BGD 2025',
                desc: 'NB 44%',
                activeCls: 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/50',
                inactiveCls: 'bg-white dark:bg-slate-800 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800 hover:bg-blue-50'
              },
              {
                key: 'hard',
                label: '🟠 Thi Thử Sở GD',
                desc: 'VD+VDC 44%',
                activeCls: 'bg-orange-600 text-white border-orange-600 shadow-md ring-2 ring-orange-400/50',
                inactiveCls: 'bg-white dark:bg-slate-800 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-800 hover:bg-orange-50'
              },
              {
                key: 'chuyên',
                label: '🔴 Trường Chuyên',
                desc: 'VDC 28%',
                activeCls: 'bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-400/50',
                inactiveCls: 'bg-white dark:bg-slate-800 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800 hover:bg-red-50'
              },
              {
                key: 'hsg',
                label: '🏆 HSG Quốc Gia',
                desc: 'VDC 39%',
                activeCls: 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-400/50',
                inactiveCls: 'bg-white dark:bg-slate-800 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800 hover:bg-purple-50'
              },
            ].map(p => {
              const isActive = generatorProfile === p.key;
              return (
                <button
                  key={p.key}
                  onClick={() => setGeneratorProfile(p.key as ExamDifficultyProfile)}
                  className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive ? p.activeCls : p.inactiveCls
                  }`}
                >
                  <span>{p.label}</span>
                  <span className={`text-[9px] font-normal ${isActive ? 'text-white/90' : 'opacity-70'}`}>
                    ({p.desc})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700/60 shadow-xs space-y-4">
        
        {/* Search Input & Grade Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài kiểm tra theo tên đề thi, chuyên đề..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Format BGD Toggle Button */}
            <button
              onClick={() => setBgdOnlyFilter(!bgdOnlyFilter)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                bgdOnlyFilter 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white ring-2 ring-amber-300 dark:ring-amber-500/50' 
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/50'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Chuẩn BGD 2025</span>
            </button>

            {/* Grade level tabs */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl">
              {GRADE_OPTIONS.map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    selectedGrade === grade
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Subject filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 dark:text-slate-500 font-medium mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Môn thi:
          </span>
          {SUBJECT_OPTIONS.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedSubject === sub
                  ? 'bg-sky-700 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Exam List Cards */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({length: 4}).map((_, i) => <SkeletonExamRow key={i} />)
        ) : filteredExams.map((exam) => {
          const stats = examStats[exam.id];
          const hasTaken = Boolean(stats);

          return (
            <div
              key={exam.id}
              className={`ev-card p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-sky-300 dark:hover:border-sky-700/60 transition-all ${
                exam.isBGDFormat 
                  ? 'ring-1 ring-amber-400/30 dark:ring-amber-500/20' 
                  : ''
              }`}
            >
              {/* Exam Info */}
              <div className="space-y-2.5 flex-1">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {exam.isBGDFormat && (
                    <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[11px] shadow-2xs flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-white" />
                      Chuẩn Format Bộ GD&ĐT 2025
                    </span>
                  )}
                  <span className="font-bold text-sky-800 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-md border border-sky-200 dark:border-sky-800/60">
                    {exam.subject}
                  </span>
                  <span className="font-medium text-slate-600 dark:text-slate-400">{exam.grade}</span>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                  <span className="text-slate-600 dark:text-slate-400">Độ khó: {exam.difficulty}</span>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                  <span className="text-slate-600 dark:text-slate-400">Tác giả: {exam.author}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-heading">
                  {exam.title}
                </h3>

                <p className="text-sm line-clamp-2 leading-relaxed text-slate-600 dark:text-slate-300">
                  {exam.description}
                </p>

                {/* Exam Key Metrics */}
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Thời gian: <strong className="text-slate-800 dark:text-slate-200">{exam.durationMinutes} phút</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>Số lượng: <strong className="text-slate-800 dark:text-slate-200">{exam.questions.length} câu hỏi</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span>Lượt làm: <strong className="text-slate-800 dark:text-slate-200">{exam.attemptsCount.toLocaleString()}</strong></span>
                  </div>
                </div>
              </div>

              {/* Status & CTA Action */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                {hasTaken ? (
                  <div className="text-left md:text-right">
                    <div className="flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Đã làm ({stats.attempts} lần)</span>
                    </div>
                    <p className="text-xs mt-0.5 text-slate-600 dark:text-slate-400">
                      Điểm cao nhất: <strong className="text-slate-900 dark:text-slate-100 font-mono text-sm">{stats.maxScore.toFixed(1)}/10</strong>
                    </p>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 dark:text-slate-500">
                    Chưa làm bài thi này
                  </div>
                )}

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {hasTaken && (
                    <button
                      onClick={() => onViewPreviousResult(exam.id)}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
                    >
                      Xem lại kết quả
                    </button>
                  )}

                  <button
                    onClick={() => onStartExam(exam)}
                    className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow-sky-700/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer flex-1 sm:flex-initial"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{hasTaken ? 'Làm lại đề thi' : 'Bắt đầu làm bài'}</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}

        {!isLoading && filteredExams.length === 0 && (
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Không tìm thấy bài kiểm tra phù hợp</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Vui lòng thử điều chỉnh lại bộ lọc môn học hoặc từ khóa tìm kiếm.</p>
          </div>
        )}
      </div>

      </> /* end internal tab */
      )}

    </div>
  );
};
