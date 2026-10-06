import React, { useState } from 'react';
import {
  GraduationCap,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Star,
  Users,
  Search,
  Filter,
  ChevronRight,
  Sparkles,
  Download,
  Share2,
  X,
  ExternalLink,
  Calculator,
  RotateCcw,
  Lightbulb,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Course, CourseLesson, CourseCertificate } from '../types';
import { INITIAL_COURSES } from '../data/learningPlatformData';
import { CasioCalculator } from './CasioCalculator';

interface CoursesViewProps {
  currentUserName?: string;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ currentUserName = 'Há»c ViĂªn EduViet' }) => {
  // Sync with INITIAL_COURSES on load to ensure new courses and updated video links are always visible
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem('eduviet_courses');
      if (saved) {
        const parsed = JSON.parse(saved) as Course[];
        const completedMap = new Set<string>();
        for (const c of parsed) {
          for (const chap of c.chapters || []) {
            for (const les of chap.lessons || []) {
              if (les.isCompleted) completedMap.add(`${c.id}-${les.id}`);
            }
          }
        }
        return INITIAL_COURSES.map(course => ({
          ...course,
          chapters: course.chapters.map(chap => ({
            ...chap,
            lessons: chap.lessons.map(les => ({
              ...les,
              isCompleted: completedMap.has(`${course.id}-${les.id}`) || !!les.isCompleted,
            })),
          })),
        }));
      }
    } catch { /* noop */ }
    return INITIAL_COURSES;
  });

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>('Tất cả môn');
  const [search, setSearch] = useState('');
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [lessonTab, setLessonTab] = useState<'video' | 'cheatsheet'>('video');
  const [backupStream, setBackupStream] = useState(false);

  // Certificate Modal State
  const [activeCertificate, setActiveCertificate] = useState<CourseCertificate | null>(null);

  const saveCourses = (updated: Course[]) => {
    setCourses(updated);
    try {
      localStorage.setItem('eduviet_courses', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  // Re-sync all courses from latest initial data
  const handleRefreshCourses = () => {
    try {
      localStorage.removeItem('eduviet_courses');
    } catch { /* noop */ }
    setCourses(INITIAL_COURSES);
    alert('Đã cập nhật toàn bộ khóa học, video bài giảng và mẹo bấm máy mới nhất!');
  };

  // Toggle lesson completion
  const handleToggleLesson = (courseId: string, lessonId: string) => {
    const updatedCourses = courses.map(c => {
      if (c.id !== courseId) return c;
      const updatedChapters = c.chapters.map(chap => ({
        ...chap,
        lessons: chap.lessons.map(les =>
          les.id === lessonId ? { ...les, isCompleted: !les.isCompleted } : les
        )
      }));
      return { ...c, chapters: updatedChapters };
    });

    saveCourses(updatedCourses);

    // Update selected course view
    const current = updatedCourses.find(c => c.id === courseId);
    if (current) setSelectedCourse(current);
  };

  // Calculate course completion percentage
  const getCourseProgress = (course: Course) => {
    let total = 0;
    let completed = 0;
    for (const chap of course.chapters) {
      for (const les of chap.lessons) {
        total++;
        if (les.isCompleted) completed++;
      }
    }
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  // Generate certificate
  const handleIssueCertificate = (course: Course) => {
    const cert: CourseCertificate = {
      id: `cert-${Date.now()}`,
      userId: 'user-current',
      userName: currentUserName,
      courseId: course.id,
      courseTitle: course.title,
      issueDate: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      certificateCode: `EDV-${Math.floor(100000 + Math.random() * 900000)}`,
      score: 9.5,
    };
    setActiveCertificate(cert);
  };

  // Filtered courses
  const filteredCourses = courses.filter(c => {
    let matchSubject = true;
    if (subjectFilter === 'Mẹo thi & Casio') {
      matchSubject = c.id.includes('meo') || c.id.includes('casio');
    } else if (subjectFilter !== 'Tất cả môn') {
      matchSubject = c.subject === subjectFilter;
    }

    const matchSearch = !search || 
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchSubject && matchSearch;
  });

  // Normalize YouTube URL for embedding
  const getEmbedUrl = (lesson: CourseLesson, useBackup = false) => {
    const rawUrl = (useBackup && lesson.backupVideoUrl) ? lesson.backupVideoUrl : lesson.videoUrl;
    if (!rawUrl) return '';

    // If already in embed format
    if (rawUrl.includes('/embed/')) {
      const base = rawUrl.split('?')[0];
      return `${base}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
    }

    // If watch format
    const match = rawUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|v\/|embed\/))([\w-]{11})/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
    }

    return rawUrl;
  };

  const getWatchUrl = (lesson: CourseLesson) => {
    if (lesson.youtubeWatchUrl) return lesson.youtubeWatchUrl;
    const match = (lesson.videoUrl || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|v\/|embed\/))([\w-]{11})/);
    if (match && match[1]) {
      return `https://www.youtube.com/watch?v=${match[1]}`;
    }
    return lesson.videoUrl;
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in font-sans">
      
      {/* Floating Casio Calculator */}
      <CasioCalculator isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />

      {/* â”€â”€ Header Banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-purple-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span>HỆ THỐNG QUẢN LÝ HỌC TẬP (LMS) & VIDEO BÀI GIẢNG CHUYÊN SÂU</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
            Khóa Học Trực Tuyến & Tuyệt Kỹ Bấm Máy Casio THPT
          </h1>

          <p className="text-sm text-purple-200/90 max-w-2xl leading-relaxed">
            Hệ thống video bài giảng chuẩn cấu trúc Bộ GD&ĐT 2025/2026, bí quyết phân bổ thời gian, mẹo loại trừ đáp án bẫy và trọn bộ kỹ thuật bấm máy Casio FX-580VN X cho tất cả các môn thi.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsCalcOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 text-xs font-semibold hover:bg-cyan-500/30 transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-cyan-300" />
              <span>Bật Máy Tính Casio fx-580VN X Ảo</span>
            </button>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Video bài giảng kèm giáo trình tóm tắt
            </span>
            <button
              onClick={handleRefreshCourses}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/30 hover:bg-purple-500/50 text-purple-200 border border-purple-400/40 text-xs transition-colors cursor-pointer ml-auto"
              title="Đồng bộ cập nhật bài giảng mới nhất"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Làm Mới Bài Giảng</span>
            </button>
          </div>
        </div>

        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <GraduationCap className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* ── Modal Chi tiết khóa học & Xem bài giảng Video ────────── */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Top Bar */}
            <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/70">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                <BookOpen className="w-4 h-4 text-purple-500 shrink-0" />
                <span className="line-clamp-1">{selectedCourse.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCalcOpen(c => !c)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-cyan-200 transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Casio 580</span>
                </button>
                <button
                  onClick={() => { setSelectedCourse(null); setSelectedLesson(null); }}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-sm text-slate-700 dark:text-slate-300">
              
              {/* Video Player Box & Cheatsheet View */}
              {selectedLesson && (
                <div className="space-y-3">
                  {/* Mode Selector and Quick Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setLessonTab('video')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          lessonTab === 'video'
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Video Bài Giảng</span>
                      </button>
                      <button
                        onClick={() => setLessonTab('cheatsheet')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          lessonTab === 'cheatsheet'
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                        <span>Mẹo & Giáo Trình Tóm Tắt</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={getWatchUrl(selectedLesson)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                        title="Mở video trực tiếp trên YouTube để xem không bị giới hạn"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Má»Ÿ TrĂªn YouTube</span>
                      </a>
                      <button
                        onClick={() => setBackupStream(b => !b)}
                        className="px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
                        title="Đổi nguồn phát"
                      >
                        <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                        <span>{backupStream ? 'Nguồn 2' : 'Nguồn 1'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Display Area */}
                  {lessonTab === 'video' ? (
                    <div className="space-y-2">
                      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 shadow-inner relative flex items-center justify-center border border-slate-800">
                        {selectedLesson.videoUrl ? (
                          <iframe
                            key={`${selectedLesson.id}-${backupStream}`}
                            src={getEmbedUrl(selectedLesson, backupStream)}
                            title={selectedLesson.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white space-y-3 bg-gradient-to-br from-slate-900 to-indigo-950">
                            <Play className="w-8 h-8 text-indigo-400 fill-current" />
                            <h3 className="text-lg font-bold">{selectedLesson.title}</h3>
                            <p className="text-xs text-slate-300 max-w-lg">{selectedLesson.summary}</p>
                          </div>
                        )}
                      </div>

                      {/* Helper notification for iframe playback */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Nếu video không hiển thị do giới hạn của YouTube hoặc mạng trường học, bạn có thể bấm <strong>"Mở Trên YouTube"</strong> hoặc chuyển sang tab <strong>"Mẹo & Giáo Trình Tóm Tắt"</strong>.</span>
                        </div>
                        <a
                          href={getWatchUrl(selectedLesson)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 font-bold underline ml-2 hover:text-amber-700"
                        >
                          Xem YouTube ↗
                        </a>
                      </div>
                    </div>
                  ) : (
                    /* Cheatsheet and Key Sequence Viewer */
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/40 dark:from-slate-800/80 dark:to-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/60 space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Tóm tắt chuyên đề</span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">{selectedLesson.title}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{selectedLesson.summary}</p>
                      </div>

                      {/* Casio Keys Badge */}
                      {selectedLesson.casioKeys && (
                        <div className="p-3.5 rounded-xl bg-slate-900 text-cyan-300 border border-slate-700 space-y-1.5 shadow-sm">
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
                              Tổ hợp phím Casio fx-580VN X:
                            </span>
                            <button
                              onClick={() => setIsCalcOpen(true)}
                              className="px-2 py-0.5 rounded bg-cyan-700/60 hover:bg-cyan-600 text-white text-[10px] font-bold cursor-pointer transition-colors"
                            >
                              Thử bấm ngay
                            </button>
                          </div>
                          <div className="text-sm sm:text-base font-mono font-bold tracking-wide text-cyan-200 break-words">
                            {selectedLesson.casioKeys}
                          </div>
                        </div>
                      )}

                      {/* Formula Tip */}
                      {selectedLesson.formulaTips && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <strong>Công thức / Mẹo cốt lõi:</strong> {selectedLesson.formulaTips}
                          </div>
                        </div>
                      )}

                      {/* Step-by-Step Practical Guide */}
                      {selectedLesson.keySteps && selectedLesson.keySteps.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-indigo-500" />
                            Các bước thực hành thực chiến:
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {selectedLesson.keySteps.map((step, sIdx) => (
                              <div
                                key={sIdx}
                                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed shadow-2xs"
                              >
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Course Progress & Certificate Banner */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                      Tiến độ hoàn thành: {getCourseProgress(selectedCourse)}%
                    </span>
                    {getCourseProgress(selectedCourse) === 100 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Đã đủ điều kiện cấp chứng chỉ!
                      </span>
                    )}
                  </div>
                  <div className="w-full sm:w-64 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 transition-all duration-500"
                      style={{ width: `${getCourseProgress(selectedCourse)}%` }}
                    />
                  </div>
                </div>

                {getCourseProgress(selectedCourse) === 100 ? (
                  <button
                    onClick={() => handleIssueCertificate(selectedCourse)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0 animate-bounce"
                  >
                    <Award className="w-4 h-4" />
                    <span>Nhận Chứng Chỉ Ngay</span>
                  </button>
                ) : (
                  <span className="text-xs text-slate-500 dark:text-slate-400 italic">
                    (Hoàn thành 100% bài học để mở khóa chứng chỉ số)
                  </span>
                )}
              </div>

              {/* Chapters & Lessons Checklist */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  Danh Sách Chương & Bài Giảng ({selectedCourse.chapters.reduce((acc, c) => acc + c.lessons.length, 0)} bài)
                </h4>

                <div className="space-y-3">
                  {selectedCourse.chapters.map((chap) => (
                    <div key={chap.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="px-4 py-3 bg-slate-100/60 dark:bg-slate-800/80 font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between">
                        <span>{chap.title}</span>
                        <span className="text-[11px] font-normal text-slate-500">{chap.lessons.length} bài</span>
                      </div>

                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {chap.lessons.map(les => {
                          const isCurrent = selectedLesson?.id === les.id;
                          return (
                            <div
                              key={les.id}
                              onClick={() => {
                                setSelectedLesson(les);
                                setLessonTab('video');
                              }}
                              className={`p-3.5 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                                isCurrent
                                  ? 'bg-indigo-50/90 dark:bg-indigo-950/60'
                                  : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleLesson(selectedCourse.id, les.id);
                                  }}
                                  title={les.isCompleted ? 'Đánh dấu chưa học' : 'Đánh dấu đã học xong'}
                                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                                    les.isCompleted
                                      ? 'bg-emerald-500 text-white'
                                      : 'border border-slate-300 dark:border-slate-600 hover:border-emerald-500 text-transparent'
                                  }`}
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                                <div>
                                  <h5 className={`text-xs font-bold leading-snug ${isCurrent ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-800 dark:text-slate-200'}`}>
                                    {les.title}
                                  </h5>
                                  <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> {les.durationMinutes} phút
                                    </span>
                                    {les.casioKeys && (
                                      <span className="px-1.5 py-0.2 rounded bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 text-[10px] font-mono font-bold">
                                        Casio 580
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isCurrent
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                                }`}>
                                  {isCurrent ? 'Đang học' : 'Vào bài'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ── Modal Chứng Chỉ Hoàn Thành Khóa Học (Certificate) ───── */}
      {activeCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-amber-50 to-white text-slate-900 rounded-3xl p-8 shadow-2xl border-4 border-amber-300 space-y-6 text-center">
            
            <button
              onClick={() => setActiveCertificate(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              ✕
            </button>

            {/* Certificate Header */}
            <div className="space-y-1 border-b-2 border-amber-200 pb-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-md">
                <Award className="w-8 h-8 text-amber-900" />
              </div>
              <span className="text-xs uppercase tracking-widest text-amber-800 font-extrabold">HỆ THỐNG GIÁO DỤC TRỰC TUYẾN EDUVIET</span>
              <h2 className="text-2xl font-black text-slate-900 font-serif tracking-wide uppercase pt-1">
                CHỨNG CHỈ HOÀN THÀNH KHÓA HỌC
              </h2>
              <p className="text-xs text-slate-600 italic">Certificate of Course Completion</p>
            </div>

            {/* Certificate Body */}
            <div className="space-y-3 py-2">
              <p className="text-xs text-slate-600">Chứng nhận học viên:</p>
              <h3 className="text-2xl font-black text-indigo-950 font-serif tracking-normal">
                {activeCertificate.userName}
              </h3>
              <p className="text-xs text-slate-600">Đã hoàn thành xuất sắc toàn bộ bài giảng và bài kiểm tra đánh giá năng lực khóa học:</p>
              <h4 className="text-lg font-bold text-amber-900 max-w-lg mx-auto font-heading">
                {activeCertificate.courseTitle}
              </h4>
            </div>

            {/* Certificate Stamp & Details */}
            <div className="flex items-center justify-between border-t-2 border-amber-200 pt-4 text-xs text-slate-600 px-6">
              <div className="text-left space-y-1">
                <p>Mã chứng chỉ: <strong>{activeCertificate.certificateCode}</strong></p>
                <p>Ngày cấp: <strong>{activeCertificate.issueDate}</strong></p>
              </div>

              <div className="text-right space-y-1">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-800 border-2 border-red-500 rounded-full font-bold text-[10px] uppercase tracking-wider rotate-[-5deg]">
                  âœ“ EDUVIET CERTIFIED
                </span>
                <p className="text-[11px] font-bold text-slate-800">Ban Chuyên Môn Khảo Thí</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md cursor-pointer transition-all"
              >
                <Download className="w-4 h-4" />
                <span>In / Tải PDF Chứng Chỉ</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Đã sao chép liên kết chứng chỉ!');
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Chia sẻ</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── Filters & Search ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-400 dark:text-slate-500 font-medium shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-purple-600" /> Chủ đề:
          </span>
          {[
            'Tất cả môn',
            'Mẹo thi & Casio',
            'Toán học',
            'Vật lý',
            'Hóa học',
            'Sinh học',
            'Tiếng Anh',
            'Lịch sử'
          ].map(s => (
            <button
              key={s}
              onClick={() => setSubjectFilter(s)}
              className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap font-medium ${
                subjectFilter === s
                  ? 'bg-purple-600 text-white font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700/60'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm khóa học, mẹo làm bài, Casio..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/40 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* ── Course Grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map(course => {
          const progress = getCourseProgress(course);

          return (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Course Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  {course.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-xs text-white text-[11px] font-bold shadow-xs">
                      {course.badge}
                    </span>
                  )}

                  {/* Subject Tag */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-purple-300 text-[10px] font-bold border border-purple-500/30">
                    {course.subject}
                  </span>

                  {/* Rating & Learners */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1 font-bold text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-current" /> {course.rating}
                    </span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Users className="w-3.5 h-3.5" /> {(course.enrolledCount / 1000).toFixed(1)}k học viên
                    </span>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-6 space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-purple-500" />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.totalDuration}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Tiến độ học tập</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setSelectedLesson(course.chapters[0]?.lessons[0] || null);
                    setLessonTab('video');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-sm hover:shadow-purple-500/25 active:scale-98 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Vào Học Video & Mẹo Bài Giảng</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
