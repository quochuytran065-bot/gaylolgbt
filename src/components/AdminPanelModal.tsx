/**
 * AdminPanelModal.tsx
 * ─────────────────────────────────────────────────────────────────
 * Bảng quản trị nâng cấp – Admin có thể:
 *  • Tab 1: Cấu hình kỳ thi 2027
 *  • Tab 2: Quản lý tài khoản người dùng (xóa)
 *  • Tab 3: Ngân hàng đề thi – Xem / Thêm mới / Xóa
 *  • Tab 4: Kho tài liệu – Xem / Thêm mới / Xóa
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Exam, DocumentItem, StudyGoal, Subject, GradeLevel } from '../types';
import {
  ShieldCheck,
  X,
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
} from 'lucide-react';

// ─── Props ───────────────────────────────────────────────────────

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  exams: Exam[];
  documents: DocumentItem[];
  studyGoal: StudyGoal;
  onUpdateGoal: (goal: StudyGoal) => void;
  onAddExam: (exam: Exam) => void;
  onDeleteExam: (id: string) => void;
  onAddDocument: (doc: DocumentItem) => void;
  onDeleteDocument: (id: string) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────

function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const SUBJECT_OPTIONS: Subject[] = [
  'Toán học', 'Vật lý', 'Hóa học', 'Sinh học', 'Tiếng Anh', 'Ngữ văn', 'Lịch sử', 'Tin học',
];

const GRADE_OPTIONS: GradeLevel[] = ['Lớp 10', 'Lớp 11', 'Lớp 12', 'Đại học'];

// ─── Sub-forms ───────────────────────────────────────────────────

interface AddExamFormProps {
  onAdd: (exam: Exam) => void;
}

const AddExamForm: React.FC<AddExamFormProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState<Subject>('Toán học');
  const [grade, setGrade] = useState<GradeLevel>('Lớp 12');
  const [duration, setDuration] = useState(50);
  const [author, setAuthor] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const exam: Exam = {
      id: newId('exam'),
      title: title.trim(),
      description: description.trim(),
      subject,
      grade,
      durationMinutes: duration,
      difficulty: 'Thi thử THPT',
      isBGDFormat: false,
      questions: [],          // Admin có thể thêm câu hỏi ở phiên bản nâng cao
      author: author.trim() || 'Admin',
      attemptsCount: 0,
      averageScore: 0,
    };
    onAdd(exam);
    setTitle(''); setDescription(''); setAuthor('');
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setOpen(false); }, 1500);
  };

  return (
    <div className="border border-dashed border-purple-300 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-purple-50 hover:bg-purple-100 transition-colors text-sm font-semibold text-purple-800 cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Thêm đề thi mới
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="p-4 space-y-3 bg-white">
          {success && (
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              <Check className="w-4 h-4" /> Đã thêm đề thi thành công!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tiêu đề đề thi *</label>
              <input
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="VD: Đề Thi Thử THPT 2027 – Toán – Sở GD Hà Nội"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Môn học *</label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value as Subject)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-purple-500 text-sm outline-none cursor-pointer bg-white"
              >
                {SUBJECT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lớp *</label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value as GradeLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-purple-500 text-sm outline-none cursor-pointer bg-white"
              >
                {GRADE_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Thời gian (phút) *</label>
              <input
                type="number"
                min={10}
                max={180}
                required
                value={duration}
                onChange={e => setDuration(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-purple-500 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tác giả / Nguồn</label>
              <input
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="VD: Sở GD&ĐT Hà Nội"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-purple-500 text-sm outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mô tả</label>
              <textarea
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Mô tả ngắn về đề thi, chuyên đề, mức độ…"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-purple-500 text-sm outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              Thêm vào ngân hàng
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────

interface AddDocumentFormProps {
  onAdd: (doc: DocumentItem) => void;
}

const AddDocumentForm: React.FC<AddDocumentFormProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState<Subject>('Toán học');
  const [grade, setGrade] = useState<GradeLevel>('Lớp 12');
  const [fileType, setFileType] = useState<'pdf' | 'docx'>('pdf');
  const [author, setAuthor] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const doc: DocumentItem = {
      id: newId('doc'),
      title: title.trim(),
      description: description.trim(),
      subject,
      grade,
      fileType,
      fileSize: 'N/A',
      pageCount: 0,
      author: author.trim() || 'Admin',
      views: 0,
      downloads: 0,
      publishedDate: new Date().toISOString().split('T')[0],
      readTimeMinutes: 0,
      directContent: {
        summary: description.trim(),
        sections: [],
        importantTakeaways: [],
      },
    };
    onAdd(doc);
    setTitle(''); setDescription(''); setAuthor('');
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setOpen(false); }, 1500);
  };

  return (
    <div className="border border-dashed border-sky-300 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-sky-50 hover:bg-sky-100 transition-colors text-sm font-semibold text-sky-800 cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Thêm tài liệu mới
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="p-4 space-y-3 bg-white">
          {success && (
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              <Check className="w-4 h-4" /> Đã thêm tài liệu thành công!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tiêu đề tài liệu *</label>
              <input
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="VD: Sổ tay công thức Toán 12 – Đầy đủ"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Môn học *</label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value as Subject)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 text-sm outline-none cursor-pointer bg-white"
              >
                {SUBJECT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lớp *</label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value as GradeLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 text-sm outline-none cursor-pointer bg-white"
              >
                {GRADE_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Định dạng file</label>
              <select
                value={fileType}
                onChange={e => setFileType(e.target.value as 'pdf' | 'docx')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 text-sm outline-none cursor-pointer bg-white"
              >
                <option value="pdf">PDF</option>
                <option value="docx">DOCX (Word)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tác giả / Nguồn</label>
              <input
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="VD: Thầy Nguyễn Văn A"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 text-sm outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mô tả tài liệu</label>
              <textarea
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Tóm tắt nội dung tài liệu, chuyên đề bao gồm…"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 text-sm outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              Thêm vào kho tài liệu
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

// ─── Main Modal ──────────────────────────────────────────────────

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  exams,
  documents,
  studyGoal,
  onUpdateGoal,
  onAddExam,
  onDeleteExam,
  onAddDocument,
  onDeleteDocument,
}) => {
  const { currentUser, isAdmin, allUsers, deleteUser } = useAuth();
  const [activeAdminTab, setActiveAdminTab] = useState<'system' | 'users' | 'exams' | 'docs'>('system');

  // System config
  const [adminExamName, setAdminExamName] = useState(studyGoal.examName);
  const [adminExamDate, setAdminExamDate] = useState(studyGoal.targetDate.split('T')[0] || '2027-11-12');
  const [adminExamTime, setAdminExamTime] = useState('07:30');
  const [adminTargetScore, setAdminTargetScore] = useState(studyGoal.targetScore);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  // Confirm delete state
  const [confirmDeleteExam, setConfirmDeleteExam] = useState<string | null>(null);
  const [confirmDeleteDoc, setConfirmDeleteDoc] = useState<string | null>(null);

  if (!isOpen) return null;

  // Guard: only admin
  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl border border-slate-200">
          <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-heading">Từ Chối Quyền Truy Cập</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Chức năng này <strong>chỉ dành riêng cho Quản Trị Viên (Admin)</strong>.
            Tài khoản của bạn hiện là <span className="font-semibold">{currentUser?.role || 'Khách'}</span>.
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const handleSaveSystemConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StudyGoal = {
      ...studyGoal,
      examName: adminExamName,
      targetDate: `${adminExamDate}T${adminExamTime}:00`,
      targetScore: adminTargetScore,
    };
    onUpdateGoal(updated);
    try { localStorage.setItem('eduviet_study_goal', JSON.stringify(updated)); } catch { /* noop */ }
    setSavedSuccessMsg('Đã lưu cấu hình kỳ thi năm 2027 thành công!');
    setTimeout(() => setSavedSuccessMsg(''), 3000);
  };

  const TAB_BTN = (key: typeof activeAdminTab, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => setActiveAdminTab(key)}
      className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
        activeAdminTab === key
          ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg'
          : 'border-transparent text-slate-600 hover:text-slate-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-heading">Trung Tâm Quản Trị Hệ Thống</h2>
                <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-bold text-[10px] uppercase">
                  Admin
                </span>
              </div>
              <p className="text-xs text-sky-200">Thêm / xóa đề thi, tài liệu và quản lý người dùng</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Tab Navigation ─────────────────────────────────── */}
        <div className="px-6 pt-3 border-b border-slate-200 bg-slate-50 flex gap-1 overflow-x-auto shrink-0">
          {TAB_BTN('system', <Calendar className="w-3.5 h-3.5" />, 'Cấu Hình Kỳ Thi 2027')}
          {TAB_BTN('users', <Users className="w-3.5 h-3.5" />, `Người Dùng (${allUsers.length})`)}
          {TAB_BTN('exams', <BookCheck className="w-3.5 h-3.5" />, `Ngân Hàng Đề Thi (${exams.length})`)}
          {TAB_BTN('docs', <FileText className="w-3.5 h-3.5" />, `Kho Tài Liệu (${documents.length})`)}
        </div>

        {/* ── Body ───────────────────────────────────────────── */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">

          {/* ════ TAB 1: SYSTEM CONFIG ════ */}
          {activeAdminTab === 'system' && (
            <div className="space-y-5">
              <div className="p-4 bg-purple-50/80 rounded-2xl border border-purple-200 text-xs text-purple-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Admin có thể điều chỉnh ngày thi năm 2027 và mức điểm chuẩn để toàn bộ học sinh thấy thông số chính xác.</span>
              </div>

              {savedSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{savedSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveSystemConfig} className="space-y-4">
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700">Phím Tắt Chọn Nhanh Ngày Thi 2027:</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { date: '2027-11-12', label: '🎯 Ngày 11-12/2027', name: 'Kỳ thi THPT 2027 (11-12/11)' },
                      { date: '2027-12-11', label: '🎯 Ngày 11/12/2027', name: 'Kỳ thi THPT 2027 (11/12)' },
                      { date: '2027-06-11', label: '🎯 Ngày 11-12/06/2027', name: 'Kỳ thi THPT 2027 (Tháng 6)' },
                    ].map(opt => (
                      <button
                        key={opt.date}
                        type="button"
                        onClick={() => { setAdminExamDate(opt.date); setAdminExamName(opt.name); }}
                        className="px-3 py-1.5 rounded-lg bg-white border border-purple-300 hover:bg-purple-50 text-purple-800 text-xs font-semibold cursor-pointer shadow-sm"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tên Kỳ Thi Hiển Thị:</label>
                  <input
                    type="text"
                    required
                    value={adminExamName}
                    onChange={e => setAdminExamName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-sm outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Ngày Thi (YYYY-MM-DD):</label>
                    <input
                      type="date"
                      required
                      value={adminExamDate}
                      onChange={e => setAdminExamDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-sm outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Giờ Khởi Động:</label>
                    <input
                      type="time"
                      value={adminExamTime}
                      onChange={e => setAdminExamTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-sm outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Áp dụng cho toàn hệ thống
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ════ TAB 2: USERS ════ */}
          {activeAdminTab === 'users' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Danh Sách Tài Khoản Người Dùng ({allUsers.length}):
              </h3>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {allUsers.map(u => (
                  <div key={u.id} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-sky-100 text-sky-800'
                      }`}>
                        {u.role === 'admin' ? 'AD' : u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-slate-900 font-semibold">{u.name}</strong>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {u.role === 'admin' ? 'Quản trị viên' : 'Học sinh'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {u.username || u.email} · {u.grade}
                        </p>
                      </div>
                    </div>
                    {u.id !== 'user-admin' && deleteUser && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Xóa tài khoản "${u.name}"?`)) deleteUser(u.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Xóa tài khoản"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════ TAB 3: EXAMS CRUD ════ */}
          {activeAdminTab === 'exams' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Ngân Hàng Đề Thi ({exams.length} bộ đề)
                </h3>
                <span className="text-xs text-slate-400">Đề mới sẽ hiển thị ngay trên trang Đề Thi</span>
              </div>

              {/* Add form */}
              <AddExamForm onAdd={onAddExam} />

              {/* List */}
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {exams.length === 0 && (
                  <div className="p-8 text-center text-xs text-slate-400">Chưa có đề thi nào.</div>
                )}
                {exams.map(ex => (
                  <div key={ex.id} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className="text-sm text-slate-900 font-semibold truncate">{ex.title}</strong>
                        {ex.isBGDFormat && (
                          <span className="shrink-0 px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">BGD</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {ex.subject} · {ex.grade} · {ex.durationMinutes} phút · {ex.questions.length} câu · {ex.author}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        TB: {ex.averageScore ?? 0}đ
                      </span>

                      {confirmDeleteExam === ex.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => { onDeleteExam(ex.id); setConfirmDeleteExam(null); }}
                            className="px-2 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold cursor-pointer flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" /> Xác nhận xóa
                          </button>
                          <button
                            onClick={() => setConfirmDeleteExam(null)}
                            className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold cursor-pointer"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteExam(ex.id)}
                          className="p-1.5 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                          title="Xóa đề thi"
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

          {/* ════ TAB 4: DOCUMENTS CRUD ════ */}
          {activeAdminTab === 'docs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Kho Tài Liệu ({documents.length} tài liệu)
                </h3>
                <span className="text-xs text-slate-400">Tài liệu mới hiển thị ngay trên trang Tài Liệu</span>
              </div>

              {/* Add form */}
              <AddDocumentForm onAdd={onAddDocument} />

              {/* List */}
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {documents.length === 0 && (
                  <div className="p-8 text-center text-xs text-slate-400">Chưa có tài liệu nào.</div>
                )}
                {documents.map(doc => (
                  <div key={doc.id} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <FileText className="w-4 h-4 text-sky-600 shrink-0" />
                        <strong className="text-sm text-slate-900 font-semibold truncate">{doc.title}</strong>
                        <span className="shrink-0 px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-bold text-[10px] uppercase">
                          {doc.fileType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {doc.subject} · {doc.grade} · {doc.author} · {doc.publishedDate}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {confirmDeleteDoc === doc.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => { onDeleteDocument(doc.id); setConfirmDeleteDoc(null); }}
                            className="px-2 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold cursor-pointer flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" /> Xác nhận xóa
          </button>
                          <button
                            onClick={() => setConfirmDeleteDoc(null)}
                            className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold cursor-pointer"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteDoc(doc.id)}
                          className="p-1.5 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                          title="Xóa tài liệu"
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

        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <p className="text-xs text-slate-400">
            Tất cả thay đổi được lưu tự động vào <span className="font-mono">localStorage</span>.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Đóng bảng quản trị
          </button>
        </div>
      </div>
    </div>
  );
};
