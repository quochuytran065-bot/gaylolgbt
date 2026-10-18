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
  Eye,
  CheckSquare,
  Square,
  Copy,
  Zap,
  Filter
} from 'lucide-react';
import {
  parseExamDocument,
  createExamFromParsedQuestions,
  SAMPLE_AZOTA_GRADE12_DOCUMENT,
  ParsedQuestionItem,
  ParsedExamResult
} from '../services/azotaParserService';

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

const GRADE_OPTIONS: GradeLevel[] = ['Lớp 12', 'Đại học'];

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
  const [activeTab, setActiveTab] = useState<'overview' | 'exams' | 'users' | 'documents' | 'system' | 'azotaParser'>('overview');

  // Azota & Document Smart Parser State
  const [azotaRawText, setAzotaRawText] = useState('');
  const [azotaExamTitle, setAzotaExamTitle] = useState('Đề Khảo Sát Toán 12 Chuẩn Azota 2025');
  const [azotaSubject, setAzotaSubject] = useState<Subject>('Toán học');
  const [azotaDuration, setAzotaDuration] = useState(50);
  const [parsedResult, setParsedResult] = useState<ParsedExamResult | null>(null);
  const [parserFilter, setParserFilter] = useState<'all' | 'I' | 'II' | 'III'>('all');
  const [importSuccessMsg, setImportSuccessMsg] = useState('');

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

  // ─── Azota Smart Parser Handlers ────────────────────────────────
  const handleParseDocument = () => {
    if (!azotaRawText.trim()) return;
    const result = parseExamDocument(azotaRawText, azotaSubject, azotaExamTitle);
    setParsedResult(result);
  };

  const handleLoadSampleAzota = () => {
    setAzotaRawText(SAMPLE_AZOTA_GRADE12_DOCUMENT);
    setAzotaExamTitle('Đề Khảo Sát Toán 12 Chuẩn Azota 2025');
    setAzotaSubject('Toán học');
    const result = parseExamDocument(SAMPLE_AZOTA_GRADE12_DOCUMENT, 'Toán học', 'Đề Khảo Sát Toán 12 Chuẩn Azota 2025');
    setParsedResult(result);
  };

  const handleCreateExamFromParsed = () => {
    if (!parsedResult || parsedResult.allQuestions.length === 0) return;
    const selectedQuestions = parsedResult.allQuestions.filter(q => q.isSelected);
    if (selectedQuestions.length === 0) return;
    const newExam = createExamFromParsedQuestions(
      azotaExamTitle,
      azotaSubject,
      selectedQuestions,
      azotaDuration
    );
    onAddExam(newExam);
    setImportSuccessMsg(`🎉 Đã thêm thành công đề thi "${newExam.title}" (${newExam.questions.length} câu) vào ngân hàng đề thi!`);
    setTimeout(() => setImportSuccessMsg(''), 4000);
  };

  const handleToggleQuestionSelection = (id: number) => {
    if (!parsedResult) return;
    setParsedResult(prev => {
      if (!prev) return null;
      const updated = prev.allQuestions.map(q => q.id === id ? { ...q, isSelected: !q.isSelected } : q);
      return {
        ...prev,
        allQuestions: updated,
        part1Questions: updated.filter(q => q.part === 'I'),
        part2Questions: updated.filter(q => q.part === 'II'),
        part3Questions: updated.filter(q => q.part === 'III')
      };
    });
  };

  const handleToggleSelectAll = (select: boolean) => {
    if (!parsedResult) return;
    setParsedResult(prev => {
      if (!prev) return null;
      const updated = prev.allQuestions.map(q => ({ ...q, isSelected: select }));
      return {
        ...prev,
        allQuestions: updated,
        part1Questions: updated.filter(q => q.part === 'I'),
        part2Questions: updated.filter(q => q.part === 'II'),
        part3Questions: updated.filter(q => q.part === 'III')
      };
    });
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
          { key: 'azotaParser', label: '📥 Nhập & Tự Lọc Đề Azota', icon: Sparkles, count: 'Mới' },
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

      {/* ════════════════════════════════════════════════════════════ */}
      {/* TAB: AZOTA & DOCUMENT SMART PARSER                           */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeTab === 'azotaParser' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header & Feature Guide */}
          <div className="bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-slate-900 text-white rounded-3xl p-6 border border-purple-700/50 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trí Tuệ Bóc Tách Tự Động Chuẩn Azota / BGD 2025</span>
              </div>
              <h3 className="text-xl font-black font-heading tracking-tight">
                Thêm Tài Liệu Vào Ngân Hàng Đề Thi & Tự Động Phân Loại Câu Hỏi
              </h3>
              <p className="text-xs text-purple-200 max-w-3xl leading-relaxed">
                Quản trị viên chỉ cần sao chép nội dung văn bản thô từ Word, PDF hoặc nguồn đề thi Azota dán vào ô bên dưới.
                Thuật toán bóc tách thông minh sẽ tự động chuẩn hóa và phân loại từng câu hỏi vào: 
                <strong className="text-sky-300"> Phần I (Trắc nghiệm 4 lựa chọn)</strong>, 
                <strong className="text-amber-300"> Phần II (Đúng/Sai 4 ý)</strong>, và 
                <strong className="text-emerald-300"> Phần III (Trả lời ngắn - TLN)</strong>, kèm đáp án đúng và lời giải chi tiết.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleLoadSampleAzota}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>Dán Thử Đề Mẫu Azota Lớp 12 Chuẩn 2025</span>
                </button>
                {azotaRawText && (
                  <button
                    type="button"
                    onClick={() => {
                      setAzotaRawText('');
                      setParsedResult(null);
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-300" />
                    <span>Xoá Trắng Ô Nhập</span>
                  </button>
                )}
              </div>
            </div>
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-6 opacity-10 pointer-events-none">
              <Zap className="w-64 h-64 text-white" />
            </div>
          </div>

          {/* Input Document / Azota Raw Content */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Thiết Lập Thông Tin Đề & Dán Văn Bản Tài Liệu</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tên Đề Thi Mới:
                </label>
                <input
                  type="text"
                  value={azotaExamTitle}
                  onChange={e => setAzotaExamTitle(e.target.value)}
                  placeholder="Ví dụ: Đề Khảo Sát Toán 12 Azota Chuyên KHTN..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Môn Học (Lớp 12):
                </label>
                <select
                  value={azotaSubject}
                  onChange={e => setAzotaSubject(e.target.value as Subject)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600 font-semibold"
                >
                  {SUBJECT_OPTIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Thời Gian Làm Bài (Phút):
                </label>
                <input
                  type="number"
                  min="15"
                  max="180"
                  value={azotaDuration}
                  onChange={e => setAzotaDuration(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-purple-600 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Dán Nội Dung Đề Thi / Tài Liệu (Hỗ trợ định dạng Azota, Word, BGD):</span>
                <span className="text-[11px] text-slate-500 font-normal">
                  Tự động nhận diện: Câu 1, PHẦN I, PHẦN II, PHẦN III, a) b) c) d), v.v.
                </span>
              </label>
              <textarea
                rows={10}
                value={azotaRawText}
                onChange={e => setAzotaRawText(e.target.value)}
                placeholder="Dán nội dung đề thi vào đây...&#10;Ví dụ:&#10;PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn.&#10;Câu 1: Cho hàm số y = f(x) có bảng biến thiên...&#10;A. 1   B. 2   C. 3   D. 4&#10;Đáp án: A&#10;&#10;PHẦN II. Câu trắc nghiệm đúng sai.&#10;Câu 13: Cho hàm số...&#10;a) Đạo hàm... [Đúng]&#10;b) ... [Sai]&#10;&#10;PHẦN III. Câu trắc nghiệm trả lời ngắn.&#10;Câu 17: Tính giá trị nhỏ nhất...&#10;Đáp án: 4.5"
                className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs font-mono leading-relaxed outline-none focus:ring-2 focus:ring-purple-600 resize-y"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-500">
                {azotaRawText ? (
                  <span>Đã nhập <strong>{azotaRawText.length.toLocaleString()}</strong> ký tự</span>
                ) : (
                  <span>Chưa có nội dung. Bạn có thể nhấn <strong>&quot;Dán Thử Đề Mẫu Azota&quot;</strong> ở trên để trải nghiệm ngay.</span>
                )}
              </div>
              <button
                type="button"
                onClick={handleParseDocument}
                disabled={!azotaRawText.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>🚀 Phân Tích & Tự Bóc Tách Câu Hỏi</span>
              </button>
            </div>
          </div>

          {/* Import Success Notification */}
          {importSuccessMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{importSuccessMsg}</span>
            </div>
          )}

          {/* Parsed Results Section */}
          {parsedResult && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* KPI Analytics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tổng Câu Bóc Tách</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 font-heading">
                    {parsedResult.allQuestions.length}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Đã chọn: {parsedResult.allQuestions.filter(q => q.isSelected).length}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-sky-200/80 dark:border-sky-900/50 shadow-2xs">
                  <div className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Phần I (Trắc Nghiệm)</div>
                  <div className="text-2xl font-black text-sky-600 dark:text-sky-400 mt-1 font-heading">
                    {parsedResult.part1Questions.length}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">4 Lựa chọn A, B, C, D</div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-2xs">
                  <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Phần II (Đúng/Sai)</div>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 font-heading">
                    {parsedResult.part2Questions.length}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">4 Ý a), b), c), d)</div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/50 shadow-2xs">
                  <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Phần III (Trả Lời Ngắn)</div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-heading">
                    {parsedResult.part3Questions.length}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Số / Giá trị tư duy</div>
                </div>

                <div className="col-span-2 sm:col-span-4 lg:col-span-1 bg-gradient-to-br from-purple-700 to-indigo-800 p-4 rounded-2xl text-white shadow-md flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-purple-200 uppercase tracking-wider">Trạng Thái Lọc</div>
                    <div className="text-xs font-extrabold mt-1">Đã Chuẩn Hoá</div>
                  </div>
                  <div className="text-[10px] text-purple-200">Sẵn sàng xuất vào Ngân hàng</div>
                </div>
              </div>

              {/* Filter Controls & Batch Actions Bar */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-wrap items-center justify-between gap-4">
                {/* Category Filters */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setParserFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      parserFilter === 'all'
                        ? 'bg-purple-700 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Tất Cả ({parsedResult.allQuestions.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setParserFilter('I')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      parserFilter === 'I'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400'
                    }`}
                  >
                    Phần I: Trắc Nghiệm ({parsedResult.part1Questions.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setParserFilter('II')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      parserFilter === 'II'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400'
                    }`}
                  >
                    Phần II: Đúng / Sai ({parsedResult.part2Questions.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setParserFilter('III')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      parserFilter === 'III'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                    }`}
                  >
                    Phần III: TLN ({parsedResult.part3Questions.length})
                  </button>
                </div>

                {/* Batch Actions & Create Button */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleSelectAll(true)}
                    className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-bold cursor-pointer"
                  >
                    Chọn tất cả
                  </button>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <button
                    type="button"
                    onClick={() => handleToggleSelectAll(false)}
                    className="text-xs text-slate-500 hover:underline font-semibold cursor-pointer"
                  >
                    Bỏ chọn
                  </button>

                  <button
                    type="button"
                    onClick={handleCreateExamFromParsed}
                    disabled={parsedResult.allQuestions.filter(q => q.isSelected).length === 0}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 disabled:opacity-40 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer hover:scale-105"
                  >
                    <BookCheck className="w-4 h-4 text-amber-300" />
                    <span>
                      Tạo Đề Mới & Lưu Vào Ngân Hàng ({parsedResult.allQuestions.filter(q => q.isSelected).length} câu)
                    </span>
                  </button>
                </div>
              </div>

              {/* Filtered Question Cards */}
              <div className="space-y-4">
                {parsedResult.allQuestions
                  .filter(q => {
                    if (parserFilter === 'all') return true;
                    return q.part === parserFilter;
                  })
                  .map(q => {
                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          q.isSelected
                            ? 'bg-white dark:bg-slate-900 border-purple-400 dark:border-purple-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                        }`}
                      >
                        {/* Header bar of question */}
                        <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleToggleQuestionSelection(q.id)}
                              className="text-purple-600 dark:text-purple-400 cursor-pointer transition-transform hover:scale-110"
                            >
                              {q.isSelected ? (
                                <CheckSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                              ) : (
                                <Square className="w-5 h-5 text-slate-400" />
                              )}
                            </button>

                            <span className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                              Câu {q.id}
                            </span>

                            {/* Part Badge */}
                            {q.part === 'I' && (
                              <span className="px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 text-[10px] font-bold border border-sky-300/60 dark:border-sky-800">
                                Phần I: Trắc nghiệm 4 lựa chọn
                              </span>
                            )}
                            {q.part === 'II' && (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[10px] font-bold border border-amber-300/60 dark:border-amber-800">
                                Phần II: Đúng / Sai 4 ý
                              </span>
                            )}
                            {q.part === 'III' && (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300/60 dark:border-emerald-800">
                                Phần III: Trả lời ngắn (TLN)
                              </span>
                            )}

                            {/* Difficulty */}
                            <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[10px] font-semibold">
                              {q.difficulty}
                            </span>
                          </div>

                          <div className="text-[11px] font-mono text-slate-400">
                            {parsedResult.subject} • Lớp 12
                          </div>
                        </div>

                        {/* Question Content */}
                        <div className="py-3.5 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                          {q.text}
                        </div>

                        {/* Render Options for Part I */}
                        {q.part === 'I' && q.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 pb-3">
                            {q.options.map(opt => {
                              const isCorrect = opt.key === q.correctAnswer;
                              return (
                                <div
                                  key={opt.key}
                                  className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                                    isCorrect
                                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                                  }`}
                                >
                                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                                    isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                  }`}>
                                    {opt.key}
                                  </span>
                                  <span>{opt.label}</span>
                                  {isCorrect && (
                                    <span className="ml-auto text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                                      Đáp án đúng
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Render Sub-items for Part II */}
                        {q.part === 'II' && q.trueFalseItems && (
                          <div className="space-y-2 pt-1 pb-3">
                            {q.trueFalseItems.map(item => (
                              <div
                                key={item.id}
                                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                                    {item.id})
                                  </span>
                                  <span className="text-slate-800 dark:text-slate-200">
                                    {item.text}
                                  </span>
                                </div>
                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase shrink-0 ${
                                  item.correctAnswer
                                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                    : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                                }`}>
                                  {item.correctAnswer ? '✓ ĐÚNG' : '✗ SAI'}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Render Answer for Part III */}
                        {q.part === 'III' && (
                          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs flex items-center justify-between gap-2 mb-3">
                            <span className="font-semibold text-emerald-900 dark:text-emerald-200">
                              Đáp số trả lời ngắn (chấm tự động):
                            </span>
                            <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-mono font-black text-xs shadow-xs">
                              {q.shortAnswerCorrect || 'Chưa xác định'}
                            </span>
                          </div>
                        )}

                        {/* Explanation & Reasoning */}
                        {q.explanation && (
                          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-900/60 text-xs space-y-1">
                            <div className="font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                              <span>Lời giải & Tư duy phân hoá:</span>
                            </div>
                            <div className="text-slate-700 dark:text-slate-300 leading-relaxed font-mono text-[11px]">
                              {q.explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
