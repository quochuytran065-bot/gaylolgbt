import React, { useState } from 'react';
import {
  GraduationCap,
  Video,
  FileText,
  Play,
  ExternalLink,
  Search,
  Flame,
  Sparkles,
  Upload,
  Copy,
  Check,
  BookOpen,
  Download,
  CheckCircle2,
  Info,
  Clock,
  Layers,
  HelpCircle,
  FolderOpen,
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Exam, DocumentItem } from '../types';
import { INITIAL_DOCUMENTS } from '../data/mockData';
import {
  EMPIRE_YOUTUBE_VIDEOS,
  EMPIRE_LMS_PDFS,
  EMPIRE_LMS_LESSONS,
  DGNL_MOCK_EXAM_2026,
  EmpireYouTubeVideo,
  EmpireLmsPdf,
  EmpireLmsLesson
} from '../data/dgnlEmpireData';

interface DGNLHubViewProps {
  onTakeExam?: (exam: Exam) => void;
  onSelectDocument?: (doc: DocumentItem) => void;
}

type MainTab = 'youtube' | 'pdfs' | 'lessons' | 'exam' | 'sync';
type VideoCategoryFilter = 'all' | 'vact' | 'hsa_dot5' | 'hsa_dot4' | 'skills' | 'career';

// Script trích xuất dữ liệu Empire qua F12 Console
const EXTRACT_SCRIPT = `// ════ SCRIPT TRÍCH XUẤT BÀI GIẢNG EMPIRE ════
// Chạy script này khi đang ở trang khóa học Empire đã đăng nhập
// Bước 1: Mở trang https://empire.edu.vn/khoa-hoc/khoa-thi-thu-danh-gia-nang-luc-1790486537251
// Bước 2: F12 → Console → Dán vào → Enter
(function() {
  const found = [];
  document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="voh.empire"]').forEach(el => {
    const src = el.src || el.getAttribute('src');
    if (src) found.push({ type: 'video', url: src, title: document.title });
  });
  document.querySelectorAll('a[href*=".pdf"], a[href*="/document/"], a[href*="download"]').forEach(a => {
    found.push({ type: 'pdf', url: a.href, title: a.innerText.trim() || a.title });
  });
  const blob = new Blob([JSON.stringify(found, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'empire_data.json';
  a.click();
  alert('✅ Đã xuất ' + found.length + ' bài giảng & tài liệu về máy!');
})();`;

export const DGNLHubView: React.FC<DGNLHubViewProps> = ({ onTakeExam, onSelectDocument }) => {
  const [activeTab, setActiveTab] = useState<MainTab>('youtube');
  const [videoCategory, setVideoCategory] = useState<VideoCategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<EmpireYouTubeVideo | null>(null);

  // Sync / Import state
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);
  const [importJson, setImportJson] = useState('');
  const [importMsg, setImportMsg] = useState('');
  const [customItems, setCustomItems] = useState<{ id: string; title: string; url: string; type: string }[]>(() => {
    try {
      const s = localStorage.getItem('eduviet_dgnl_custom');
      return s ? JSON.parse(s) : [];
    } catch { return []; }
  });

  const handleCopyScript = () => {
    navigator.clipboard.writeText(EXTRACT_SCRIPT);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrlId(id);
    setTimeout(() => setCopiedUrlId(null), 2000);
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importJson);
      const items = (Array.isArray(parsed) ? parsed : []).map((item: Record<string, unknown>, i: number) => ({
        id: 'custom-' + Date.now() + '-' + i,
        title: String(item.title || 'Nội dung Empire'),
        url: String(item.url || item.fileUrl || ''),
        type: String(item.type || 'video')
      })).filter(it => it.url);

      const updated = [...items, ...customItems];
      setCustomItems(updated);
      localStorage.setItem('eduviet_dgnl_custom', JSON.stringify(updated));
      setImportMsg(`✅ Đã nạp thành công ${items.length} tài liệu/video vào hệ thống!`);
      setImportJson('');
    } catch {
      setImportMsg('⚠️ File JSON không hợp lệ! Vui lòng kiểm tra lại cấu trúc.');
      setTimeout(() => setImportMsg(''), 4000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImportJson(ev.target?.result as string);
    reader.readAsText(file);
  };

  // Helper to open PDF in EduViet reader if document exists
  const handleOpenEduVietPdf = (pdf: EmpireLmsPdf) => {
    if (pdf.eduvietDocId) {
      const found = INITIAL_DOCUMENTS.find(d => d.id === pdf.eduvietDocId);
      if (found && onSelectDocument) {
        onSelectDocument(found);
        return;
      }
    }
    // Fallback: create virtual DocumentItem and open in reader
    if (onSelectDocument) {
      const virtualDoc: DocumentItem = {
        id: pdf.id,
        title: pdf.title,
        description: pdf.description,
        subject: 'Toán học',
        grade: 'Đại học',
        fileType: 'pdf',
        fileSize: pdf.fileSize,
        pageCount: 20,
        author: 'Hệ Thống Luyện Thi Empire',
        views: 15400,
        downloads: 4200,
        publishedDate: '2026',
        readTimeMinutes: 45,
        downloadUrl: pdf.cdnUrl,
        directContent: {
          summary: pdf.description,
          sections: [
            {
              title: 'Cấu Trúc Đề Thi ĐGNL Chuẩn Ma Trận',
              content: 'Tài liệu đề thi & đáp án chi tiết biên soạn theo cấu trúc mới nhất gồm: Phần 1 (Ngôn ngữ), Phần 2 (Toán - Logic - Số liệu), Phần 3 (Giải quyết vấn đề).',
              formulasOrNotes: ['Lưu ý: Đăng nhập tài khoản empire.edu.vn để tải file PDF gốc chất lượng cao từ CDN.']
            }
          ],
          importantTakeaways: [
            'Phân bổ thời gian hợp lý: 150 phút cho 120 câu.',
            'Tập trung làm chắc các câu hỏi cơ bản và thông hiểu trước.',
            'Luyện đề kết hợp bấm giờ thực tế để rèn tâm lý phòng thi.'
          ]
        }
      };
      onSelectDocument(virtualDoc);
    }
  };

  // Filter YouTube videos
  const filteredVideos = EMPIRE_YOUTUBE_VIDEOS.filter(video => {
    if (videoCategory !== 'all' && video.category !== videoCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        video.title.toLowerCase().includes(q) ||
        video.subject.toLowerCase().includes(q) ||
        video.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filter PDFs
  const filteredPdfs = EMPIRE_LMS_PDFS.filter(pdf => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        pdf.title.toLowerCase().includes(q) ||
        pdf.subject.toLowerCase().includes(q) ||
        pdf.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filter Lessons
  const filteredLessons = EMPIRE_LMS_LESSONS.filter(l => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        l.title.toLowerCase().includes(q) ||
        l.subject.toLowerCase().includes(q) ||
        l.set.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-20 font-sans">
      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-6 md:p-10 text-white border border-indigo-500/30 shadow-2xl">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-purple-500/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            TRUNG TÂM LUYỆN THI ĐÁNH GIÁ NĂNG LỰC 2026-2027 • EMPIRE HUB
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200">
            Kho Tư Liệu ĐGNL<br />
            <span className="text-amber-400">V-ACT &amp; HSA Empire</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            Tổng hợp <strong>30 video bài giảng thật 100%</strong> từ kênh chính thức của đội ngũ Empire Team, trọn bộ <strong>10 file đề thi &amp; đáp án chi tiết</strong> chuẩn ma trận ĐHQG TP.HCM &amp; Hà Nội, kèm <strong>47 bài giảng hệ thống LMS</strong> và đề thi thử trực tuyến.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>V-ACT ĐHQG TP.HCM (120 câu • 150p)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>HSA ĐHQG Hà Nội (150 câu • 195p)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/15 border border-red-400/30 text-red-300 text-xs font-semibold backdrop-blur-md">
              <Video className="w-3.5 h-3.5" />
              <span>30 Video xem ngay không cần đăng nhập</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-300" />
              <span>Dữ liệu xác thực từ Empire</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN TAB NAVIGATION BAR ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => { setActiveTab('youtube'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'youtube'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-[1.02]'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Video className="w-4 h-4 text-red-400" />
            <span>30 Video Kênh Empire</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${activeTab === 'youtube' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
              30
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('pdfs'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'pdfs'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-[1.02]'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>10 Bộ Đề &amp; Đáp Án PDF</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${activeTab === 'pdfs' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
              10
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('lessons'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'lessons'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-[1.02]'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>47 Bài Giảng LMS Empire</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${activeTab === 'lessons' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
              47
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('exam'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'exam'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-[1.02]'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Thi Thử ĐGNL Trực Tuyến</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-600 dark:text-amber-400">
              Hot
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('sync'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'sync'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-[1.02]'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Đồng Bộ Tài Khoản</span>
          </button>
        </div>

        {/* Search input (visible in content tabs) */}
        {activeTab !== 'exam' && activeTab !== 'sync' && (
          <div className="relative min-w-[200px] w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm môn, bài thi..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
            />
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB 1: 30 YOUTUBE VIDEOS FROM OFFICIAL EMPIRE TEAM CHANNEL          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'youtube' && (
        <div className="space-y-6">
          {/* Sub category filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { key: 'all', label: 'Tất Cả', count: EMPIRE_YOUTUBE_VIDEOS.length },
              { key: 'vact', label: 'V-ACT TP.HCM', count: EMPIRE_YOUTUBE_VIDEOS.filter(v => v.category === 'vact').length },
              { key: 'hsa_dot5', label: 'HSA Đợt 5', count: EMPIRE_YOUTUBE_VIDEOS.filter(v => v.category === 'hsa_dot5').length },
              { key: 'hsa_dot4', label: 'HSA Đợt 4', count: EMPIRE_YOUTUBE_VIDEOS.filter(v => v.category === 'hsa_dot4').length },
              { key: 'skills', label: 'Tư Duy & Pháp Luật', count: EMPIRE_YOUTUBE_VIDEOS.filter(v => v.category === 'skills').length },
              { key: 'career', label: 'Hướng Nghiệp & Talkshow', count: EMPIRE_YOUTUBE_VIDEOS.filter(v => v.category === 'career').length },
            ].map(pill => (
              <button
                key={pill.key}
                onClick={() => setVideoCategory(pill.key as VideoCategoryFilter)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  videoCategory === pill.key
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span>{pill.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${videoCategory === pill.key ? 'bg-white/20 dark:bg-slate-900/20' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                  {pill.count}
                </span>
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVideos.map(video => (
              <div
                key={video.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-xl dark:hover:shadow-indigo-950/40 transition-all duration-300"
              >
                {/* Thumbnail Header */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Play Overlay Button */}
                  <button
                    onClick={() => setActiveVideo(video)}
                    aria-label={`Xem video ${video.title}`}
                    className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg shadow-red-600/50 backdrop-blur-sm hover:bg-red-600 transition-colors">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </button>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-mono font-bold backdrop-blur-md">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{video.duration}</span>
                  </div>

                  {/* Exam badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black tracking-wide uppercase shadow-sm ${
                      video.examType === 'VACT' ? 'bg-emerald-600 text-white' :
                      video.examType === 'HSA' ? 'bg-sky-600 text-white' :
                      'bg-purple-600 text-white'
                    }`}>
                      {video.examType === 'ALL' ? 'CHUYÊN ĐỀ' : video.examType}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">
                      <span>{video.subject}</span>
                      <span className="text-slate-400 text-[10px] font-medium">Kênh Empire Team</span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {video.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveVideo(video)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm shadow-indigo-500/20"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Xem Bài Giảng</span>
                    </button>

                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 font-medium transition-colors"
                      title="Mở trên YouTube"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Mở YouTube</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <Video className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Không tìm thấy video phù hợp</p>
              <button
                onClick={() => { setVideoCategory('all'); setSearchQuery(''); }}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB 2: 10 OFFICIAL PDF EXAMS AND SOLUTIONS FROM EMPIRE LMS          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'pdfs' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 dark:text-blue-300 space-y-1">
              <p className="font-bold">Trọn bộ 5 bộ đề rèn luyện thực chiến chuẩn cấu trúc ĐHQG TP.HCM (V-ACT) + 5 File đáp án chi tiết:</p>
              <p>Tất cả file PDF gốc được lưu trữ trên hệ thống khóa học Empire. Bạn có thể bấm <strong>"Đọc Ngay Trên EduViet"</strong> để mở trực tiếp trong trình đọc tài liệu tích hợp, hoặc bấm <strong>"Tải Tại Empire"</strong> nếu đã đăng nhập tài khoản tại <code>empire.edu.vn</code>.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPdfs.map(pdf => (
              <div
                key={pdf.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400/60 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {pdf.examType}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-blue-500" />
                      {pdf.fileSize}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-white leading-snug">
                    {pdf.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {pdf.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEduVietPdf(pdf)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm shadow-indigo-500/20"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Đọc Ngay</span>
                    </button>

                    <a
                      href="https://empire.edu.vn/khoa-hoc/khoa-thi-thu-danh-gia-nang-luc-1790486537251"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Mở Trên Empire</span>
                    </a>
                  </div>

                  <button
                    onClick={() => handleCopyLink(pdf.cdnUrl, pdf.id)}
                    className="text-[11px] font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
                    title="Sao chép link CDN"
                  >
                    {copiedUrlId === pdf.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-bold">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Link CDN</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB 3: 47 LMS LESSONS FROM THE EMPIRE COURSE                       */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'lessons' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
            <UserCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-300 space-y-1">
              <p className="font-bold">Hệ thống 47 bài giảng video trong khóa luyện thi Empire LMS:</p>
              <p>Mỗi bài giảng giải chi tiết từng môn (Toán, Tiếng Việt, Tiếng Anh, Logic, Số liệu, Lý, Hóa, Sinh, KHXH). Vì bạn đã đăng nhập tài khoản Empire trên máy, hãy bấm <strong>"Mở Bài Học Trên Empire"</strong> để học trực tiếp trên hệ thống mà không gặp bất kỳ lỗi chặn quyền truy cập nào.</p>
            </div>
          </div>

          {/* Grouped by Set */}
          {['Đề số 1', 'Đề số 2', 'Đề số 3'].map(setGroup => {
            const groupLessons = filteredLessons.filter(l => l.set === setGroup);
            if (groupLessons.length === 0) return null;
            return (
              <div key={setGroup} className="space-y-3">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-indigo-500" />
                  <h3 className="font-extrabold text-sm md:text-base text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                    {setGroup} • 10 Bài Giảng Chi Tiết Theo Phân Môn
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {groupLessons.map(lesson => (
                    <div
                      key={lesson.id}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="min-w-0 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                          <Play className="w-3.5 h-3.5 fill-indigo-600 dark:fill-indigo-400" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">
                            {lesson.title}
                          </h4>
                          <span className="text-[10px] font-semibold text-slate-400">
                            Môn: {lesson.subject}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href="https://empire.edu.vn/khoa-hoc/khoa-thi-thu-danh-gia-nang-luc-1790486537251"
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Học Ngay</span>
                        </a>
                        <button
                          onClick={() => handleCopyLink(lesson.cdnUrl, lesson.id)}
                          className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
                          title="Sao chép link video MP4"
                        >
                          {copiedUrlId === lesson.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB 4: DIRECT PRACTICE EXAM RUNNER                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'exam' && (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-8 text-white border border-indigo-500/30 shadow-xl">
            <div className="max-w-2xl space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black uppercase tracking-wider">
                THI THỬ TRỰC TUYẾN 100% TƯƠNG TÁC
              </span>

              <h2 className="text-2xl md:text-3xl font-black leading-tight">
                Đề Thi Thử Thực Chiến V-ACT 2026 – ĐHQG TP.HCM
              </h2>

              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Đề thi 15 câu chọn lọc bao quát 3 phần cốt lõi: Sử dụng ngôn ngữ (Tiếng Việt &amp; Tiếng Anh), Toán học - Tư duy logic - Phân tích số liệu, và Giải quyết vấn đề Khoa học tự nhiên &amp; xã hội. Tích hợp tính giờ 30 phút, chấm điểm tự động và lời giải chi tiết cho từng câu.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-center">
                  <p className="text-[10px] text-slate-300">Số câu hỏi</p>
                  <p className="text-lg font-black text-amber-400">15 Câu</p>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-center">
                  <p className="text-[10px] text-slate-300">Thời gian</p>
                  <p className="text-lg font-black text-emerald-400">30 Phút</p>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-center">
                  <p className="text-[10px] text-slate-300">Ma trận</p>
                  <p className="text-lg font-black text-sky-400">3 Phần ĐGNL</p>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-center">
                  <p className="text-[10px] text-slate-300">Chấm điểm</p>
                  <p className="text-lg font-black text-purple-400">Tự động 10.0</p>
                </div>
              </div>

              {onTakeExam && (
                <button
                  onClick={() => onTakeExam(DGNL_MOCK_EXAM_2026)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Bắt Đầu Làm Bài Thi Thử Ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB 5: SYNC / EXTRACT TOOL FROM EMPIRE ACCOUNT                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'sync' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-lg">1</div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Trích Xuất Thêm Từ Tài Khoản Empire</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Chạy script khi đang mở khóa học Empire</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {[
                ['1', 'Mở trình duyệt đang đăng nhập tài khoản Empire của bạn.'],
                ['2', 'Truy cập vào trang khóa học bất kỳ tại empire.edu.vn.'],
                ['3', 'Nhấn F12 → chọn tab Console → dán đoạn mã bên dưới → nhấn Enter.'],
                ['4', 'File empire_data.json sẽ tự động tải về máy bạn.'],
              ].map(([step, text]) => (
                <div key={step} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="font-black text-indigo-600 text-xs shrink-0">Bước {step}:</span>
                  <span className="text-xs">{text}</span>
                </div>
              ))}
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-700">
              <div className="flex items-center justify-between px-3 py-2 bg-slate-800 text-slate-300 text-[11px] font-mono">
                <span>empire_extract.js</span>
                <button
                  onClick={handleCopyScript}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold transition-all"
                >
                  {copiedScript ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                  {copiedScript ? 'Đã Copy!' : 'Copy Mã Script'}
                </button>
              </div>
              <pre className="p-3 bg-slate-950 text-emerald-400 text-[10px] font-mono max-h-40 overflow-y-auto leading-relaxed">
                {EXTRACT_SCRIPT}
              </pre>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg">2</div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Nạp Thêm Vào Web EduViet</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Nhập file JSON vừa xuất để mở rộng danh mục</p>
              </div>
            </div>

            {importMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {importMsg}
              </div>
            )}

            <div>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">Tải lên file JSON từ máy tính:</p>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-950 dark:file:text-indigo-300 cursor-pointer"
              />
            </div>

            <div>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">Hoặc dán nội dung JSON:</p>
              <textarea
                rows={4}
                value={importJson}
                onChange={e => setImportJson(e.target.value)}
                placeholder='[{"type":"video","url":"...","title":"..."}]'
                className="w-full p-3 text-[11px] font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-none"
              />
            </div>

            <button
              onClick={handleImport}
              disabled={!importJson.trim()}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm shadow-indigo-500/20"
            >
              <Upload className="w-4 h-4" />
              Nạp Thêm Dữ Liệu
            </button>

            {customItems.length > 0 && (
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span>Đã nạp {customItems.length} tài liệu tùy chỉnh</span>
                <button
                  onClick={() => {
                    setCustomItems([]);
                    localStorage.removeItem('eduviet_dgnl_custom');
                  }}
                  className="text-red-500 hover:underline font-bold"
                >
                  Xóa tất cả
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* VIDEO PLAYER MODAL                                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn overflow-y-auto"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden shadow-2xl flex flex-col max-h-[calc(100dvh-1.5rem)] my-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950 gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-extrabold tracking-wider ${
                  activeVideo.examType === 'VACT' ? 'bg-emerald-600 text-white' :
                  activeVideo.examType === 'HSA' ? 'bg-sky-600 text-white' :
                  'bg-purple-600 text-white'
                }`}>
                  {activeVideo.examType === 'ALL' ? 'CHUYÊN ĐỀ' : activeVideo.examType}
                </span>
                <h3 id="video-modal-title" className="font-bold text-sm text-white line-clamp-1 min-w-0">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Đóng video"
                className="shrink-0 w-8 h-8 rounded-full bg-slate-800 hover:bg-red-900/60 flex items-center justify-center text-slate-300 hover:text-white transition-all text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* YouTube IFrame Embed */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between flex-wrap gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-indigo-400">{activeVideo.subject}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 font-medium">Thời lượng: {activeVideo.duration}</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1">{activeVideo.description}</p>
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm shadow-red-600/30"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Xem Trên YouTube</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
