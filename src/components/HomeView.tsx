import React from 'react';
import { DocumentItem, Exam } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Play, 
  BookCheck, 
  TrendingUp, 
  Sparkles, 
  Users,
  Target,
  Flame,
  Zap,
  Brain,
  BarChart3
} from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

interface HomeViewProps {
  documents: DocumentItem[];
  exams: Exam[];
  onSelectTab: (tab: 'home' | 'documents' | 'exams' | 'history' | 'analytics') => void;
  onSelectDocument: (doc: DocumentItem) => void;
  onStartExam: (exam: Exam) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  documents,
  exams,
  onSelectTab,
  onSelectDocument,
  onStartExam
}) => {
  const { currentUser, openAuthModal } = useAuth();

  const featuredDocs = documents.slice(0, 3);
  // Pick BGD format exams first to highlight them
  const bgdExams = exams.filter(e => e.isBGDFormat);
  const featuredExams = bgdExams.length > 0 ? bgdExams.slice(0, 3) : exams.slice(0, 3);

  return (
    <div className="space-y-24 pb-24">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-white overflow-hidden shadow-xl border border-sky-900/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6 z-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 tracking-wide uppercase">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>NỀN TẢNG LUYỆN THI THPT CHUẨN CẤU TRÚC BỘ GD&ĐT 2026 - 2027</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading leading-tight tracking-tight text-white">
                Chinh Phục Điểm Số <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                  Với Lộ Trình Chuẩn Hóa
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Tích hợp đề thi 3 phần chuẩn format Bộ Giáo Dục 2025, hệ thống tự động phân tích điểm số khi làm sai, theo dõi chuỗi ngày học và đếm ngược thời gian hướng đến mục tiêu điểm Aim mong muốn.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectTab('exams')}
                className="px-6 py-3.5 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold text-sm rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer hover:shadow-sky-500/25"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Làm bài kiểm tra ngay</span>
              </button>

              <button
                onClick={() => onSelectTab('analytics')}
                className="px-5 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer hover:shadow-amber-500/25"
              >
                <Target className="w-4 h-4" />
                <span>Mục tiêu & Phân tích Aim</span>
              </button>

              <button
                onClick={() => onSelectTab('documents')}
                className="px-5 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 font-semibold text-sm rounded-xl border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-sky-300" />
                <span>Kho tài liệu</span>
              </button>
            </div>

            {/* Adjacency proof indicators */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Format mới Bộ GD&ĐT 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-rose-400" />
                <span>Phân tích nguyên nhân sai</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>Đếm ngược ngày thi THPT</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual */}
          <div className="lg:col-span-5 relative hidden lg:block overflow-hidden">
            <img 
              src={HERO_IMAGE} 
              alt="Học tập và thi trực tuyến cùng EduViet" 
              className="absolute inset-0 w-full h-full object-cover object-center opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
            <div className="absolute bottom-8 right-8 p-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 max-w-xs space-y-1.5 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Aim 9.0+ Điểm Thi Tốt Nghiệp</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Phân tích lỗi sai dạng Lý thuyết, Bẫy đề thi và Tính toán theo từng chuyên đề thực chiến.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Spotlight Banner: Cấu trúc BGD 2025 & Phân tích lỗi sai */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Format BGD 2025 */}
        <div 
          onClick={() => onSelectTab('exams')}
          className="ev-card group p-7 flex flex-col space-y-4 cursor-pointer hover:border-amber-300 dark:hover:border-amber-700/60 transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-heading">
            Đề Thi Chuẩn Cấu Trúc BGD 2025
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
            Áp dụng định dạng 3 phần: Phần I (4 lựa chọn), Phần II (Đúng/Sai tính điểm bậc thang), Phần III (Trả lời ngắn điền số).
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
            Luyện đề ngay <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Card 2: Hệ thống phân tích lỗi sai */}
        <div 
          onClick={() => onSelectTab('analytics')}
          className="ev-card group p-7 flex flex-col space-y-4 cursor-pointer hover:border-rose-300 dark:hover:border-rose-700/60 transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-500/20 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <Brain className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-heading">
            Hệ Thống Phân Tích Điểm Số Khi Sai
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
            Phân loại nguyên nhân mất điểm: Lý thuyết, Bẫy đề thi, Tính toán hay Phương pháp kèm đề xuất tài liệu bù lấp lỗ hổng.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-400 group-hover:translate-x-1 transition-transform">
            Xem phân tích <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Card 3: Mục tiêu Aim & Thống kê từng ngày */}
        <div 
          onClick={() => onSelectTab('analytics')}
          className="ev-card group p-7 flex flex-col space-y-4 cursor-pointer hover:border-sky-300 dark:hover:border-sky-700/60 transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400 border border-sky-500/20 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-heading">
            Aim Điểm Số &amp; Đếm Ngược Ngày Thi
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
            Đặt mục tiêu điểm Aim cụ thể, theo dõi đồng hồ đếm ngược từng giây đến kỳ thi THPT và biểu đồ học tập 7 ngày liên tục.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
            Cài đặt Aim <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </section>

      {/* Featured Exams Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-sky-700 dark:text-sky-400 tracking-wider uppercase block">
              LUYỆN TẬP TRẮC NGHIỆM CHỌN LỌC
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 font-heading">
              Đề Thi Chuẩn Cấu Trúc Bộ GD&ĐT 2025
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('exams')}
            className="text-xs font-semibold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Xem tất cả bài thi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredExams.map((exam) => (
            <div
              key={exam.id}
              className={`ev-card flex flex-col justify-between p-7 space-y-4 ${
                exam.isBGDFormat 
                  ? 'ring-1 ring-amber-400/40 dark:ring-amber-500/30' 
                  : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {exam.isBGDFormat && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white font-bold text-[10px] tracking-wide uppercase shadow-2xs">
                      Chuẩn BGD 2025
                    </span>
                  )}
                  <span className="font-bold text-sky-800 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-md border border-sky-200 dark:border-sky-800/60">
                    {exam.subject}
                  </span>
                  <span className="font-medium text-slate-600 dark:text-slate-400">{exam.grade}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-heading line-clamp-2 leading-snug">
                  {exam.title}
                </h3>

                <p className="text-sm line-clamp-2 leading-relaxed text-slate-600 dark:text-slate-300">
                  {exam.description}
                </p>

                <div className="flex items-center gap-4 pt-1 text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <strong>{exam.durationMinutes} phút</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <BookCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <strong>{exam.questions.length} câu</strong>
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  {exam.attemptsCount.toLocaleString()} lượt làm
                </span>

                <button
                  onClick={() => onStartExam(exam)}
                  className="px-4 py-2 rounded-lg bg-sky-700 hover:bg-sky-800 active:scale-[0.98] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer hover:shadow-sky-700/20"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Bắt đầu</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Documents Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-sky-700 dark:text-sky-400 tracking-wider uppercase block">
              KHO TÀI LIỆU CHỌN LỌC
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 font-heading">
              Tài Liệu Ôn Thi & Sổ Tay Công Thức
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('documents')}
            className="text-xs font-semibold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Khám phá kho tài liệu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDocument(doc)}
              className="ev-card group flex flex-col justify-between p-7 space-y-4 cursor-pointer hover:border-sky-300 dark:hover:border-sky-700/60 transition-all"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                  <span className="font-semibold text-sky-700 dark:text-sky-400">{doc.subject}</span>
                  <span aria-hidden="true">·</span>
                  <span>{doc.grade}</span>
                  <span aria-hidden="true">·</span>
                  <span className="uppercase font-mono text-[11px]">{doc.fileType}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug font-heading">
                  {doc.title}
                </h3>

                <p className="text-sm line-clamp-2 leading-relaxed text-slate-600 dark:text-slate-300">
                  {doc.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                <span>{doc.pageCount} trang · {doc.fileSize}</span>
                <span className="text-sky-700 dark:text-sky-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Đọc ngay <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
