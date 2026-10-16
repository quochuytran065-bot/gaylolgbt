/**
 * AdminDashboardView.tsx
 * ─────────────────────────────────────────────────────────────────
 * Trung Tâm Quản Trị Hệ Thống Khảo Thí LMS360 / TEST360
 * Tách biệt hoàn toàn chức năng Quản trị (Admin) với Cổng Thí sinh (User).
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Exam, DocumentItem, StudyGoal, Subject, GradeLevel, Question } from '../types';
import {
  ShieldCheck,
  Users,
  Calendar,
  BookCheck,
  FileText,
  Trash2,
  Plus,
  Check,
  Sparkles,
  Lock,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Save,
  RefreshCw,
  Search,
  ArrowLeft,
  Shuffle,
  BarChart3,
  Award,
  Layers,
  Clock,
  CheckCircle2,
  Sliders,
  UserCheck,
  Download,
  Eye
} from 'lucide-react';

interface AdminDashboardViewProps {
  exams: Exam[];
  documents: DocumentItem[];
  studyGoal: StudyGoal;
  onUpdateGoal: (goal: StudyGoal) => void;
  onAddExam: (exam: Exam) => void;
  onDeleteExam: (id: string) => void;
  onAddDocument: (doc: DocumentItem) => void;
  onDeleteDocument: (id: string) => void;
  onBackToUserView: () => void;
}

function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const SUBJECT_OPTIONS: Subject[] = [
  'Toán học', 'Vật lý', 'Hóa học', 'Sinh học', 'Tiếng Anh', 'Ngữ văn', 'Lịch sử', 'Tin học', 'Địa lí'
];

const GRADE_OPTIONS: GradeLevel[] = ['Lớp 10', 'Lớp 11', 'Lớp 12', 'Đại học'];

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  exams,
  documents,
  studyGoal,
  onUpdateGoal,
  onAddExam,
  onDeleteExam,
  onAddDocument,
  onDeleteDocument,
  onBackToUserView
}) => {
  const { currentUser, isAdmin, allUsers, deleteUser, toggleUserRole, loginAsAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'exams' | 'users' | 'documents' | 'system'>('overview');

  // Search & Filter in Admin
  const [examSearch, setExamSearch] = useState('');
  const [examSubjectFilter, setExamSubjectFilter] = useState<string>('Tất cả');
  const [userSearch, setUserSearch] = useState('');
  const [docSearch, setDocSearch] = useState('');

  // Delete confirms
  const [confirmDeleteExam, setConfirmDeleteExam] = useState<string | null>(null);
  const [confirmDeleteDoc, setConfirmDeleteDoc] = useState<string | null>(null);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState<string | null>(null);

  // New Exam Form State
  const [isAddingExam, setIsAddingExam] = useState(false);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamSubject, setNewExamSubject] = useState<Subject>('Toán học');
  const [newExamGrade, setNewExamGrade] = useState<GradeLevel>('Lớp 12');
  const [newExamDuration, setNewExamDuration] = useState(50);
  const [newExamDesc, setNewExamDesc] = useState('');
  const [newExamAuthor, setNewExamAuthor] = useState('Hội Đồng Khảo Thí');
  const [isBGDFormat, setIsBGDFormat] = useState(true);
  const [examAddSuccess, setExamAddSuccess] = useState(false);

  // New Document Form State
  const [isAddingDoc, setIsAddingDoc] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocSubject, setNewDocSubject] = useState<Subject>('Toán học');
  const [newDocGrade, setNewDocGrade] = useState<GradeLevel>('Lớp 12');
  const [newDocFileType, setNewDocFileType] = useState<'pdf' | 'docx'>('pdf');
  const [newDocDesc, setNewDocDesc] = useState('');
  const [newDocAuthor, setNewDocAuthor] = useState('Ban Chuyên Môn');
  const [docAddSuccess, setDocAddSuccess] = useState(false);

  // System Goal State
  const [sysExamName, setSysExamName] = useState(studyGoal.examName);
  const [sysExamDate, setSysExamDate] = useState(studyGoal.targetDate.split('T')[0] || '2027-11-12');
  const [sysExamTime, setSysExamTime] = useState('07:30');
  const [sysTargetScore, setSysTargetScore] = useState(studyGoal.targetScore);
  const [sysSavedMsg, setSysSavedMsg] = useState('');

  // LMS360 Shuffler feedback
  const [shuffledSuccessId, setShuffledSuccessId] = useState<string | null>(null);

  // Security guard: If not admin
  if (!isAdmin) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-heading">
              Cổng Quản Trị Hệ Thống (TEST360)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Khu vực này được bảo mật và chỉ dành riêng cho <strong>Quản Trị Viên (Admin)</strong> và <strong>Giáo Viên Trưởng Bộ Môn</strong>.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-500">
              Tài khoản hiện tại: {currentUser ? currentUser.name : 'Khách vãng lai'} ({currentUser?.role || 'Chưa đăng nhập'})
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={loginAsAdmin}
              className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Đăng nhập nhanh với quyền Admin (admin/admin123)</span>
            </button>
            <button
              onClick={onBackToUserView}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay về Cổng Thí Sinh</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle LMS360 Exam Shuffler (Trộn đề và đảo đáp án tự động)
  const handleShuffleExam = (originalExam: Exam) => {
    // Clone and shuffle questions
    const shuffledQuestions: Question[] = [...originalExam.questions]
      .sort(() => Math.random() - 0.5)
      .map((q, idx) => {
        // If it's multiple choice with options, also shuffle options
        if (q.options && q.options.length > 0) {
          const shuffledOpts = [...q.options].sort(() => Math.random() - 0.5);
          // Re-key to A, B, C, D
          const keys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
          const newOptions = shuffledOpts.map((opt, i) => ({
            key: keys[i],
            label: opt.label
          }));
          return {
            ...q,
            id: idx + 1,
            options: newOptions
          };
        }
        return {
          ...q,
          id: idx + 1
        };
      });

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const shuffledExam: Exam = {
      ...originalExam,
      id: newId('exam-shuffled'),
      title: `${originalExam.title} (Mã Đề ${randomSuffix})`,
      description: `Đề thi đã được trộn ngẫu nhiên câu hỏi & phương án theo quy chế khảo thí tự động LMS360.`,
      questions: shuffledQuestions,
      attemptsCount: 0,
      averageScore: 0,
    };

    onAddExam(shuffledExam);
    setShuffledSuccessId(originalExam.id);
    setTimeout(() => setShuffledSuccessId(null), 3000);
  };

  // Handle Add Exam Submit
  const handleCreateExamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamTitle.trim()) return;

    const exam: Exam = {
      id: newId('exam'),
      title: newExamTitle.trim(),
      description: newExamDesc.trim() || `Bộ đề thi trắc nghiệm môn ${newExamSubject} ${newExamGrade} được tạo bởi Ban Quản Trị.`,
      subject: newExamSubject,
      grade: newExamGrade,
      durationMinutes: newExamDuration,
      difficulty: 'Chuẩn Bộ GD&ĐT',
      isBGDFormat: isBGDFormat,
      questions: [],
      author: newExamAuthor.trim() || 'Admin',
      attemptsCount: 0,
      averageScore: 0,
    };

    onAddExam(exam);
    setNewExamTitle('');
    setNewExamDesc('');
    setExamAddSuccess(true);
    setTimeout(() => {
      setExamAddSuccess(false);
      setIsAddingExam(false);
    }, 1500);
  };

  // Handle Add Document Submit
  const handleCreateDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;

    const doc: DocumentItem = {
      id: newId('doc'),
      title: newDocTitle.trim(),
      description: newDocDesc.trim() || `Tài liệu tóm tắt ôn tập chuyên đề môn ${newDocSubject} ${newDocGrade}.`,
      subject: newDocSubject,
      grade: newDocGrade,
      fileType: newDocFileType,
      fileSize: '2.4 MB',
      pageCount: 18,
      author: newDocAuthor.trim() || 'Admin',
      views: 0,
      downloads: 0,
      publishedDate: new Date().toISOString().split('T')[0],
      readTimeMinutes: 25,
      directContent: {
        summary: newDocDesc.trim() || newDocTitle.trim(),
        sections: [
          {
            title: 'Chuyên đề trọng tâm',
            content: 'Nội dung kiến thức cốt lõi và phương pháp giải nhanh phục vụ kỳ thi.',
            formulasOrNotes: ['Ghi nhớ phương pháp giải nhanh theo chuyên đề.']
          }
        ],
        importantTakeaways: ['Ôn tập kỹ phần lý thuyết nền tảng.', 'Luyện tập các dạng bài tập tương tự.']
      }
    };

    onAddDocument(doc);
    setNewDocTitle('');
    setNewDocDesc('');
    setDocAddSuccess(true);
    setTimeout(() => {
      setDocAddSuccess(false);
      setIsAddingDoc(false);
    }, 1500);
  };

  // Handle Save System Config
  const handleSaveSystemConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StudyGoal = {
      ...studyGoal,
      examName: sysExamName,
      targetDate: `${sysExamDate}T${sysExamTime}:00`,
      targetScore: sysTargetScore
    };
    onUpdateGoal(updated);
    setSysSavedMsg('Đã lưu cấu hình kỳ thi thành công!');
    setTimeout(() => setSysSavedMsg(''), 3000);
  };

  // Filtered lists
  const filteredExams = exams.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(examSearch.toLowerCase()) ||
                        e.author.toLowerCase().includes(examSearch.toLowerCase());
    const matchSubject = examSubjectFilter === 'Tất cả' || e.subject === examSubjectFilter;
    return matchSearch && matchSubject;
  });

  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    (u.username && u.username.toLowerCase().includes(userSearch.toLowerCase())) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.grade.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredDocs = documents.filter(d =>
    d.title.toLowerCase().includes(docSearch.toLowerCase()) ||
    d.subject.toLowerCase().includes(docSearch.toLowerCase())
  );

  // Overall Stats
  const totalAttempts = exams.reduce((sum, e) => sum + e.attemptsCount, 0);
  const avgScore = exams.length > 0
    ? (exams.reduce((sum, e) => sum + (e.averageScore || 0), 0) / exams.length).toFixed(1)
    : '7.8';

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-200">
      
      {/* ── Top Bar: Admin Branding & Return Button ──────────────── */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-purple-500/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner shrink-0">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider">
                  ADMIN PORTAL
                </span>
                <span className="text-xs text-purple-200 font-mono">TEST360 Control Center</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">
                Trung Tâm Quản Trị Hệ Thống Khảo Thí
              </h1>
              <p className="text-xs sm:text-sm text-purple-200 mt-0.5">
                Quản lý đề thi, ngân hàng câu hỏi, trộn đề tự động và phân quyền người dùng
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onBackToUserView}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all cursor-pointer backdrop-blur-md hover:scale-105"
              title="Chuyển sang giao diện mà học sinh nhìn thấy"
            >
              <Eye className="w-4 h-4 text-sky-300" />
              <span>Xem Cổng Thí Sinh</span>
            </button>
          </div>
        </div>

        {/* Ambient background ornament */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
          <Layers className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* ── Admin Navigation Tabs (Responsive Pill Row) ─────────── */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-x-auto shadow-2xs">
        {[
          { key: 'overview', label: 'Tổng Quan Hệ Thống', icon: BarChart3, count: null },
          { key: 'exams', label: 'Quản Lý Đề Thi & Ca Thi', icon: BookCheck, count: exams.length },
          { key: 'users', label: 'Quản Lý Thí Sinh & Quyền', icon: Users, count: allUsers.length },
          { key: 'documents', label: 'Kho Tài Liệu Học Tập', icon: FileText, count: documents.length },
          { key: 'system', label: 'Cấu Hình Kỳ Thi & Quy Chế', icon: Sliders, count: null }
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {item.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  isActive ? 'bg-purple-900/80 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* TAB 1: OVERVIEW & SYSTEM KPIS                                */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Tổng Thí Sinh Đăng Ký</span>
                <Users className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {allUsers.length}
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Hoạt động ổn định
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Ngân Hàng Đề Thi</span>
                <BookCheck className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {exams.length}
              </div>
              <p className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
                Chuẩn Bộ GD&ĐT & ĐGNL
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Lượt Làm Bài Khảo Thí</span>
                <Award className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {totalAttempts.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-500">
                Tự động chấm điểm & lưu trữ
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Điểm TB Hệ Thống</span>
                <BarChart3 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {avgScore} <span className="text-xs font-normal text-slate-400">/ 10</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Phổ điểm đạt mức Khá - Giỏi
              </p>
            </div>
          </div>

          {/* Quick Action Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-50 via-indigo-50 to-sky-50 dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-sky-950/30 border border-purple-200 dark:border-purple-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Tính năng khảo thí LMS360: Trộn đề & Phân quyền bảo mật
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Bạn có thể tạo các mã đề thi phụ được xáo trộn ngẫu nhiên để chống gian lận, hoặc nâng quyền quản trị cho giáo viên khác.
              </p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setActiveTab('exams')}
                className="px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                Quản lý & Trộn đề ngay
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Xem danh sách thí sinh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* TAB 2: EXAM MANAGEMENT & LMS360 SHUFFLER                     */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Quản Lý Đề Thi & Ca Thi Trực Tuyến ({filteredExams.length} đề thi)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tạo mới, chỉnh sửa, xóa và áp dụng thuật toán trộn đề tự động của TEST360
              </p>
            </div>

            <button
              onClick={() => setIsAddingExam(v => !v)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingExam ? 'Đóng form thêm đề' : 'Thêm đề thi mới'}</span>
            </button>
          </div>

          {/* Add Exam Form Accordion */}
          {isAddingExam && (
            <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 border-2 border-purple-300 dark:border-purple-800 shadow-xl space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                <h3 className="text-sm font-bold text-purple-900 dark:text-purple-300 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-purple-600" />
                  Biểu Mẫu Khởi Tạo Đề Thi Khảo Thí Mới
                </h3>
                <span className="text-xs text-slate-400">* Các trường bắt buộc</span>
              </div>

              {examAddSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Đã thêm đề thi vào hệ thống thành công! Thí sinh đã có thể vào thi.</span>
                </div>
              )}

              <form onSubmit={handleCreateExamSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Tên đề thi / Ca thi *
                    </label>
                    <input
                      required
                      value={newExamTitle}
                      onChange={e => setNewExamTitle(e.target.value)}
                      placeholder="VD: Đề Khảo Thí Đợt 1 – Môn Toán 12 – Sở GD Hà Nội"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Môn học *
                    </label>
                    <select
                      value={newExamSubject}
                      onChange={e => setNewExamSubject(e.target.value as Subject)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600 font-medium cursor-pointer"
                    >
                      {SUBJECT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Khối lớp *
                    </label>
                    <select
                      value={newExamGrade}
                      onChange={e => setNewExamGrade(e.target.value as GradeLevel)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600 font-medium cursor-pointer"
                    >
                      {GRADE_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Thời lượng (phút) *
                    </label>
                    <input
                      type="number"
                      min={10}
                      max={180}
                      required
                      value={newExamDuration}
                      onChange={e => setNewExamDuration(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600 font-medium font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Tác giả / Hội đồng ra đề
                    </label>
                    <input
                      value={newExamAuthor}
                      onChange={e => setNewExamAuthor(e.target.value)}
                      placeholder="VD: Hội Đồng Khảo Thí"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600 font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-purple-900 dark:text-purple-300">
                      <input
                        type="checkbox"
                        checked={isBGDFormat}
                        onChange={e => setIsBGDFormat(e.target.checked)}
                        className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                      />
                      <span>Áp dụng cấu trúc 3 phần chuẩn Bộ GD&ĐT 2025</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mô tả kỳ thi / Hướng dẫn thí sinh
                  </label>
                  <textarea
                    rows={2}
                    value={newExamDesc}
                    onChange={e => setNewExamDesc(e.target.value)}
                    placeholder="Mô tả ma trận đề thi, yêu cầu thiết bị, quy chế phòng thi..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600 font-medium resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingExam(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu và phát hành ca thi</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search & Subject Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={examSearch}
                onChange={e => setExamSearch(e.target.value)}
                placeholder="Tìm đề thi theo tên, tác giả..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={examSubjectFilter}
                onChange={e => setExamSubjectFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
              >
                <option value="Tất cả">Tất cả môn</option>
                {SUBJECT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Exam List Table */}
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs divide-y divide-slate-100 dark:divide-slate-700/60">
            {filteredExams.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                Không tìm thấy đề thi nào phù hợp với từ khóa tìm kiếm.
              </div>
            ) : (
              filteredExams.map(ex => (
                <div key={ex.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-700/30 transition-colors">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-md border border-sky-200 dark:border-sky-800/60">
                        {ex.subject}
                      </span>
                      <span className="text-slate-500 font-medium">{ex.grade}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500">{ex.durationMinutes} phút</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500">{ex.questions.length} câu hỏi</span>
                      {ex.isBGDFormat && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                          Format BGD
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                      {ex.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {ex.description || 'Chưa có mô tả chi tiết'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    {/* LMS360 Shuffler Button */}
                    <button
                      onClick={() => handleShuffleExam(ex)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        shuffledSuccessId === ex.id
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:bg-purple-50'
                      }`}
                      title="Trộn ngẫu nhiên câu hỏi & đáp án để tạo mã đề thi mới (Thuật toán LMS360)"
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>{shuffledSuccessId === ex.id ? '✓ Đã tạo mã đề mới' : 'Trộn Đề Thi'}</span>
                    </button>

                    {/* Delete with Confirm */}
                    {confirmDeleteExam === ex.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            onDeleteExam(ex.id);
                            setConfirmDeleteExam(null);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold cursor-pointer flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" /> Xóa hẳn
                        </button>
                        <button
                          onClick={() => setConfirmDeleteExam(null)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-bold cursor-pointer"
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteExam(ex.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Xóa đề thi này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* TAB 3: USER & ROLE RBAC MANAGEMENT                           */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Quản Lý Thí Sinh & Phân Quyền Hệ Thống ({allUsers.length} tài khoản)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Phân quyền Quản Trị Viên (Admin) / Thí sinh (Student) và quản lý danh sách truy cập
              </p>
            </div>
          </div>

          {/* User Search Bar */}
          <div className="bg-white dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                placeholder="Tìm tài khoản theo họ tên, username, email, trường lớp..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* User Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.map(u => (
              <div
                key={u.id}
                className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4 hover:border-purple-300 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    u.role === 'admin' 
                      ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-sm' 
                      : 'bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300'
                  }`}>
                    {u.role === 'admin' ? '👑' : u.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-slate-900 dark:text-white font-bold truncate">
                        {u.name}
                      </strong>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                        u.role === 'admin' 
                          ? 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300 border border-purple-200' 
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}>
                        {u.role === 'admin' ? 'Quản Trị Viên' : 'Thí Sinh'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate font-mono">
                      @{u.username || 'user'} · {u.email}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {u.grade} {u.school ? `· ${u.school}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Toggle Role Button */}
                  {u.id !== 'user-admin' && toggleUserRole && (
                    <button
                      onClick={() => toggleUserRole(u.id)}
                      className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                        u.role === 'admin'
                          ? 'border-purple-300 bg-purple-50 text-purple-800 hover:bg-purple-100'
                          : 'border-slate-300 bg-slate-50 text-slate-700 hover:bg-purple-50 hover:text-purple-700'
                      }`}
                      title={u.role === 'admin' ? 'Chuyển về quyền thí sinh' : 'Nâng cấp lên quyền Quản trị viên'}
                    >
                      {u.role === 'admin' ? 'Hạ quyền' : 'Cấp Admin'}
                    </button>
                  )}

                  {/* Delete Button */}
                  {u.id !== 'user-admin' && deleteUser && (
                    confirmDeleteUser === u.id ? (
                      <button
                        onClick={() => {
                          deleteUser(u.id);
                          setConfirmDeleteUser(null);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white text-[11px] font-bold cursor-pointer"
                      >
                        Xác nhận
                      </button>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteUser(u.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Xóa tài khoản này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* TAB 4: DOCUMENT MANAGEMENT                                   */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Kho Tài Liệu & Đề Cương Ôn Tập ({filteredDocs.length} tài liệu)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Thêm mới tài liệu PDF, Docx, chuyên đề ôn thi phân loại theo môn học
              </p>
            </div>

            <button
              onClick={() => setIsAddingDoc(v => !v)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingDoc ? 'Đóng form thêm tài liệu' : 'Thêm tài liệu mới'}</span>
            </button>
          </div>

          {/* Add Doc Form Accordion */}
          {isAddingDoc && (
            <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 border-2 border-purple-300 dark:border-purple-800 shadow-xl space-y-4 animate-in fade-in duration-150">
              <h3 className="text-sm font-bold text-purple-900 dark:text-purple-300 flex items-center gap-2">
                <Plus className="w-4 h-4 text-purple-600" />
                Thêm Tài Liệu Ôn Tập Mới
              </h3>

              {docAddSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Đã thêm tài liệu vào kho thành công!</span>
                </div>
              )}

              <form onSubmit={handleCreateDocSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Tiêu đề tài liệu *
                    </label>
                    <input
                      required
                      value={newDocTitle}
                      onChange={e => setNewDocTitle(e.target.value)}
                      placeholder="VD: Tổng Hợp 100 Câu Vận Dụng Cao Môn Toán 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Môn học *
                    </label>
                    <select
                      value={newDocSubject}
                      onChange={e => setNewDocSubject(e.target.value as Subject)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600 font-medium cursor-pointer"
                    >
                      {SUBJECT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Khối lớp *
                    </label>
                    <select
                      value={newDocGrade}
                      onChange={e => setNewDocGrade(e.target.value as GradeLevel)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600 font-medium cursor-pointer"
                    >
                      {GRADE_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingDoc(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu tài liệu</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Doc List Table */}
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs divide-y divide-slate-100 dark:divide-slate-700/60">
            {filteredDocs.map(d => (
              <div key={d.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-700/30 transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-sky-800 dark:text-sky-300">{d.subject}</span>
                      <span className="text-slate-400 text-xs">·</span>
                      <span className="text-slate-500 text-xs">{d.grade}</span>
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.2 rounded">
                        {d.fileType}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {d.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {confirmDeleteDoc === d.id ? (
                    <button
                      onClick={() => {
                        onDeleteDocument(d.id);
                        setConfirmDeleteDoc(null);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white text-[11px] font-bold cursor-pointer"
                    >
                      Xác nhận
                    </button>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteDoc(d.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* TAB 5: SYSTEM CONFIGURATION & EXAM SETTINGS                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeTab === 'system' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Cấu Hình Kỳ Thi Trọng Điểm & Đồng Hồ Đếm Ngược
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Thay đổi ngày thi, điểm số mục tiêu chuẩn áp dụng cho toàn bộ thí sinh trên hệ thống.
            </p>
          </div>

          {sysSavedMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{sysSavedMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveSystemConfig} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tên kỳ thi trọng điểm toàn quốc:
              </label>
              <input
                required
                value={sysExamName}
                onChange={e => setSysExamName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Ngày thi chính thức:
                </label>
                <input
                  type="date"
                  required
                  value={sysExamDate}
                  onChange={e => setSysExamDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Giờ khởi động ca thi:
                </label>
                <input
                  type="time"
                  required
                  value={sysExamTime}
                  onChange={e => setSysExamTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Áp dụng cấu hình toàn hệ thống</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
