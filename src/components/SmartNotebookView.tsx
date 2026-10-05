import React, { useState, useMemo } from 'react';
import {
  BookMarked,
  Sparkles,
  Plus,
  Search,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  Filter,
  GraduationCap,
  Calculator,
  Languages,
  HelpCircle,
  Trash2,
  ExternalLink,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { NotebookEntry, NotebookEntryType, Subject, GradeLevel } from '../types';
import { INITIAL_NOTEBOOK_ENTRIES } from '../data/learningPlatformData';

interface SmartNotebookViewProps {
  onStartPracticeWithEntry?: (entry: NotebookEntry) => void;
}

const SUBJECT_LIST: Subject[] = [
  'Tất cả môn',
  'Toán học',
  'Tiếng Anh',
  'Vật lý',
  'Hóa học',
  'Sinh học',
  'Ngữ văn',
  'Lịch sử',
  'Địa lí',
];

export const SmartNotebookView: React.FC<SmartNotebookViewProps> = ({ onStartPracticeWithEntry }) => {
  // Lấy dữ liệu từ localStorage hoặc initial
  const [entries, setEntries] = useState<NotebookEntry[]>(() => {
    try {
      const saved = localStorage.getItem('eduviet_notebook_entries');
      if (saved) return JSON.parse(saved) as NotebookEntry[];
    } catch { /* noop */ }
    return INITIAL_NOTEBOOK_ENTRIES;
  });

  const [activeTypeTab, setActiveTypeTab] = useState<'all' | NotebookEntryType>('all');
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Tất cả môn');
  const [search, setSearch] = useState('');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New entry form state
  const [newType, setNewType] = useState<NotebookEntryType>('formula');
  const [newSubject, setNewSubject] = useState<Subject>('Toán học');
  const [newTitle, setNewTitle] = useState('');
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newCategory, setNewCategory] = useState('');

  // Persist to localStorage
  const saveEntries = (updated: NotebookEntry[]) => {
    setEntries(updated);
    try {
      localStorage.setItem('eduviet_notebook_entries', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const handleToggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = entries.map(item =>
      item.id === id ? { ...item, isMastered: !item.isMastered } : item
    );
    saveEntries(updated);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc chắn muốn xóa mục này khỏi sổ tay?')) {
      const updated = entries.filter(item => item.id !== id);
      saveEntries(updated);
    }
  };

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddNewEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newFront.trim() || !newBack.trim()) return;

    const newEntry: NotebookEntry = {
      id: `nb-custom-${Date.now()}`,
      type: newType,
      subject: newSubject,
      grade: 'Lớp 12',
      title: newTitle.trim(),
      front: newFront.trim(),
      back: newBack.trim(),
      exampleOrNote: newNote.trim() || undefined,
      category: newCategory.trim() || undefined,
      isMastered: false,
      savedAt: new Date().toISOString(),
    };

    saveEntries([newEntry, ...entries]);
    setIsAddModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewFront('');
    setNewBack('');
    setNewNote('');
    setNewCategory('');
  };

  // Filtered entries
  const filteredEntries = useMemo(() => {
    return entries.filter(item => {
      const matchType = activeTypeTab === 'all' || item.type === activeTypeTab;
      const matchSubject = selectedSubject === 'Tất cả môn' || item.subject === selectedSubject;
      const matchSearch = !search || 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        (item.front || item.content || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.back || item.explanation || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(search.toLowerCase()));

      return matchType && matchSubject && matchSearch;
    });
  }, [entries, activeTypeTab, selectedSubject, search]);

  const masteredCount = entries.filter(e => e.isMastered).length;
  const progressPercent = entries.length > 0 ? Math.round((masteredCount / entries.length) * 100) : 0;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* ── Header Banner ─────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-amber-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
            <BookMarked className="w-4 h-4 text-amber-400" />
            <span>SỔ TAY CÁ NHÂN HÓA & FLASHCARD THÔNG MINH</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading leading-tight">
                Sổ Tay Từ Vựng & Công Thức
              </h1>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed max-w-2xl mt-1">
                Lưu giữ các công thức Toán - Lý - Hóa trọng tâm, từ vựng Tiếng Anh 8+ và các câu hỏi khó làm sai trong các bài thi thử. Ôn tập dạng Flashcard lật thẻ phản xạ nhanh trước kỳ thi.
              </p>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm ghi chú mới</span>
            </button>
          </div>

          {/* Tiến độ đã thuộc */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Đã thuộc: <strong>{masteredCount}/{entries.length}</strong> ({progressPercent}%)</span>
            </div>
            <div className="w-36 h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Type Tabs & Search Controls ────────────────────────── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Segmented Type Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl overflow-x-auto no-scrollbar text-xs font-semibold">
            <button
              onClick={() => setActiveTypeTab('all')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTypeTab === 'all'
                  ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Tất cả ({entries.length})
            </button>
            <button
              onClick={() => setActiveTypeTab('formula')}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTypeTab === 'formula'
                  ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-sky-600" />
              <span>Công thức ({entries.filter(e => e.type === 'formula').length})</span>
            </button>
            <button
              onClick={() => setActiveTypeTab('vocab')}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTypeTab === 'vocab'
                  ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-300 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-rose-600" />
              <span>Từ vựng 8+ ({entries.filter(e => e.type === 'vocab').length})</span>
            </button>
            <button
              onClick={() => setActiveTypeTab('question')}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTypeTab === 'question'
                  ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
              <span>Câu hỏi khó ({entries.filter(e => e.type === 'question').length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm công thức, từ vựng..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-400 dark:text-slate-500 font-medium shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-amber-600" /> Môn:
          </span>
          {SUBJECT_LIST.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium ${
                selectedSubject === s
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-800'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Flashcard Grid ────────────────────────────────────────── */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 space-y-3">
          <BookMarked className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
            Chưa có ghi chú nào phù hợp
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Bấm "Thêm ghi chú mới" hoặc lưu các câu hỏi khó sau mỗi lần thi thử để luyện tập lại tại đây.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntries.map(item => {
            const isFlipped = !!flippedCards[item.id];

            return (
              <div
                key={item.id}
                onClick={() => toggleFlip(item.id)}
                className={`group rounded-2xl border transition-all duration-300 cursor-pointer p-5 flex flex-col justify-between min-h-[260px] relative select-none hover:shadow-md ${
                  item.isMastered
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                    : isFlipped
                    ? 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/60 ring-1 ring-amber-400/40'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700'
                }`}
              >
                {/* Card Top: Badges & Controls */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.type === 'formula'
                        ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                        : item.type === 'vocab'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                    }`}>
                      {item.type === 'formula' ? 'Công thức' : item.type === 'vocab' ? 'Từ vựng' : 'Câu hỏi khó'}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {item.subject}
                    </span>
                    {item.category && (
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleToggleMastered(item.id, e)}
                      title={item.isMastered ? 'Đánh dấu cần ôn lại' : 'Đánh dấu đã thuộc'}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        item.isMastered
                          ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200'
                          : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      title="Xóa khỏi sổ tay"
                      className="p-1.5 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Main: Front / Back */}
                <div className="flex-1 flex flex-col justify-center my-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 flex items-center gap-1">
                    {isFlipped ? (
                      <>
                        <Eye className="w-3 h-3 text-amber-500" /> Mặt sau: Đáp án & Giải thích
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-3 h-3 text-slate-400" /> Mặt trước (Nhấn để lật)
                      </>
                    )}
                  </span>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-heading mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line font-medium p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                    {isFlipped ? (item.back || item.explanation) : (item.front || item.content)}
                  </div>

                  {isFlipped && item.exampleOrNote && (
                    <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-2 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg leading-relaxed border border-amber-200/50 dark:border-amber-800/40">
                      💡 <strong>Ghi chú:</strong> {item.exampleOrNote}
                    </p>
                  )}
                </div>

                {/* Card Bottom: Flip hint & status */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-semibold group-hover:underline">
                    <RotateCcw className="w-3 h-3" />
                    {isFlipped ? 'Nhấn để xem câu hỏi' : 'Nhấn để xem lời giải'}
                  </span>
                  <span>{item.isMastered ? '✨ Đã ghi nhớ' : '⏳ Cần ôn luyện'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Add New Entry Modal ─────────────────────────────────── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Thêm Ghi Chú & Flashcard Mới
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewEntry} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    Loại nội dung
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as NotebookEntryType)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    <option value="formula">📐 Công thức trọng tâm</option>
                    <option value="vocab">📖 Từ vựng Tiếng Anh</option>
                    <option value="question">❓ Câu hỏi khó / Dạng bẫy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    Môn học
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value as Subject)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    {SUBJECT_LIST.filter(s => s !== 'Tất cả môn').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  Tiêu đề tóm tắt *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="VD: Công thức đạo hàm hàm hợp, Từ vựng 'Mitigate'..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  Mặt trước Flashcard (Câu hỏi / Tên công thức / Từ vựng) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={newFront}
                  onChange={(e) => setNewFront(e.target.value)}
                  placeholder="Nội dung hiển thị khi chưa lật thẻ..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  Mặt sau Flashcard (Công thức chi tiết / Nghĩa & Giải thích) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newBack}
                  onChange={(e) => setNewBack(e.target.value)}
                  placeholder="Nội dung lời giải, công thức toán học hoặc định nghĩa..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    Chuyên đề (tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="VD: Oxyz, Este, Collocations..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    Ghi chú / Mẹo nhớ
                  </label>
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="VD: Chú ý điều kiện mẫu số..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer transition-all shadow-sm"
                >
                  Lưu vào sổ tay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
