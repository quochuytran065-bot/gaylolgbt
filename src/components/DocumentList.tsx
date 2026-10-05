import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { DocumentItem, DocumentCategory, Subject, GradeLevel } from '../types';
import { HERO_IMAGE } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Filter, 
  FileText, 
  Eye, 
  Bookmark, 
  Download, 
  BookOpen, 
  Sparkles,
  ArrowUpDown,
  RefreshCw,
  Globe,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import {
  fetchAllExternalDocuments,
  getLastSyncInfo,
  invalidateDocumentFeedCache,
  DOCUMENT_FEEDS
} from '../services/documentFeedService';

/* Skeleton card component — shown while content loads */
const SkeletonCard = () => (
  <div className="ev-card overflow-hidden">
    <div className="skeleton h-44 w-full rounded-none" />
    <div className="p-5 space-y-3">
      <div className="skeleton h-3 w-1/3" />
      <div className="skeleton h-4 w-4/5" />
      <div className="skeleton h-3 w-full" />
      <div className="skeleton h-3 w-2/3" />
      <div className="pt-3 flex items-center justify-between">
        <div className="skeleton h-3 w-1/4" />
        <div className="skeleton h-8 w-24 rounded-lg" />
      </div>
    </div>
  </div>
);

interface DocumentListProps {
  documents: DocumentItem[];
  onSelectDocument: (doc: DocumentItem) => void;
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
  'Địa lí',
  'GDKT & PL',
  'Tin học',
  'Công nghệ'
];

const GRADE_OPTIONS: GradeLevel[] = [
  'Tất cả lớp',
  'Lớp 10',
  'Lớp 11',
  'Lớp 12',
  'Đại học'
];

const CATEGORY_TABS: { id: DocumentCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'Tất cả tài liệu', icon: '✨' },
  { id: 'de-cuong', label: 'Đề cương học kỳ', icon: '📋' },
  { id: 'chuyen-de', label: 'Chuyên đề trọng tâm', icon: '🎯' },
  { id: 'cong-thuc', label: 'Sổ tay công thức', icon: '📐' },
  { id: 'on-thi', label: 'Tài liệu ôn thi', icon: '📚' }
];

const SOURCE_OPTIONS = [
  'Tất cả nguồn',
  'EduViet Official',
  'Toanmath',
  'Thuvienhoclieu',
  'Thi247',
  'Tuyensinh247',
  'Hoc247',
  'Loigiaihay',
  'Hocmai',
  'Vật Lý Phổ Thông',
  'Hoahoc.org',
  'VietJack'
];

const DOC_QUICK_TAGS = [
  'Chu Văn An Hà Nội',
  'Chuyên Lê Hồng Phong TP.HCM',
  'Sở GD Nam Định',
  'Chuyên Quốc Học Huế',
  'Đề cương Học kỳ 2',
  'Chuyên đề Oxyz',
  'Ngữ pháp Tiếng Anh 12',
  'Sổ tay Hóa hữu cơ',
  'Vật lý 12 Dao động',
  'Tin học 12 BGD'
];

export const DocumentList: React.FC<DocumentListProps> = ({ documents, onSelectDocument }) => {
  const { isDocumentSaved, toggleSaveDocument } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Tất cả môn');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('Tất cả lớp');
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('all');
  const [selectedSource, setSelectedSource] = useState('Tất cả nguồn');
  const [selectedFileType, setSelectedFileType] = useState<'all' | 'pdf' | 'docx' | 'direct'>('all');
  const [sortBy, setSortBy] = useState<'views' | 'newest'>('views');
  const [isLoading, setIsLoading] = useState(true);

  // Auto-sync states
  const [autoSyncedDocs, setAutoSyncedDocs] = useState<DocumentItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncInfo, setSyncInfo] = useState(getLastSyncInfo);
  const [justSyncedToast, setJustSyncedToast] = useState(false);

  // Tự động kiểm tra & đồng bộ khi mở web
  useEffect(() => {
    let isMounted = true;

    const loadSyncedDocs = async () => {
      try {
        const externalDocs = await fetchAllExternalDocuments();
        if (isMounted) {
          setAutoSyncedDocs(externalDocs);
          setSyncInfo(getLastSyncInfo());
        }
      } catch (err) {
        console.warn('[DocumentList] Auto-sync background notice:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadSyncedDocs();
    return () => { isMounted = false; };
  }, []);

  // Thủ công bấm làm mới / kiểm tra tài liệu mới
  const handleCheckNewDocuments = useCallback(async () => {
    setIsSyncing(true);
    invalidateDocumentFeedCache();
    try {
      const refreshedDocs = await fetchAllExternalDocuments(
        selectedSubject !== 'Tất cả môn' ? selectedSubject : undefined,
        selectedGrade !== 'Tất cả lớp' ? selectedGrade : undefined,
        selectedCategory !== 'all' ? selectedCategory : undefined
      );
      setAutoSyncedDocs(refreshedDocs);
      setSyncInfo(getLastSyncInfo());
      setJustSyncedToast(true);
      setTimeout(() => setJustSyncedToast(false), 3000);
    } catch (err) {
      console.warn('[DocumentList] Manual sync error:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [selectedSubject, selectedGrade, selectedCategory]);

  // Kết hợp tài liệu nội bộ + tài liệu tự động đồng bộ (loại bỏ trùng ID)
  const combinedDocuments = useMemo(() => {
    const map = new Map<string, DocumentItem>();
    
    // Nạp tài liệu tự động từ các nguồn web
    autoSyncedDocs.forEach(doc => map.set(doc.id, doc));

    // Nạp tài liệu nội bộ (ghi đè nếu cùng id)
    documents.forEach(doc => map.set(doc.id, doc));

    return Array.from(map.values());
  }, [documents, autoSyncedDocs]);

  // Bộ lọc tổng hợp đa tiêu chí
  const filteredDocuments = useMemo(() => {
    return combinedDocuments.filter(doc => {
      // 1. Tìm kiếm từ khóa
      const searchTarget = `${doc.title} ${doc.description} ${doc.author} ${doc.source || ''}`.toLowerCase();
      const matchesSearch = !searchQuery || searchTarget.includes(searchQuery.toLowerCase());
      
      // 2. Môn học
      const matchesSubject = selectedSubject === 'Tất cả môn' || doc.subject === selectedSubject;
      
      // 3. Khối lớp
      const matchesGrade = selectedGrade === 'Tất cả lớp' || doc.grade === selectedGrade;

      // 4. Danh mục (Đề cương, chuyên đề, công thức, ôn thi)
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;

      // 5. Nguồn cấp
      let matchesSource = true;
      if (selectedSource === 'EduViet Official') {
        matchesSource = !doc.source;
      } else if (selectedSource !== 'Tất cả nguồn') {
        matchesSource = Boolean(doc.source && doc.source.toLowerCase().includes(selectedSource.toLowerCase()));
      }

      // 6. Định dạng file
      const matchesFileType = selectedFileType === 'all' || doc.fileType === selectedFileType;

      return matchesSearch && matchesSubject && matchesGrade && matchesCategory && matchesSource && matchesFileType;
    }).sort((a, b) => {
      if (sortBy === 'views') return b.views - a.views;
      // Sắp xếp theo ngày cập nhật mới nhất
      const dateA = a.publishedDate ? new Date(a.publishedDate.split('/').reverse().join('-')).getTime() || 0 : 0;
      const dateB = b.publishedDate ? new Date(b.publishedDate.split('/').reverse().join('-')).getTime() || 0 : 0;
      return dateB - dateA;
    });
  }, [combinedDocuments, searchQuery, selectedSubject, selectedGrade, selectedCategory, selectedSource, selectedFileType, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('Tất cả môn');
    setSelectedGrade('Tất cả lớp');
    setSelectedCategory('all');
    setSelectedSource('Tất cả nguồn');
    setSelectedFileType('all');
  };

  return (
    <div className="space-y-6">

      {/* ── Auto-Sync Live Status Bar ──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:px-4 bg-gradient-to-r from-sky-50 via-indigo-50/60 to-emerald-50 dark:from-sky-950/40 dark:via-indigo-950/30 dark:to-emerald-950/40 border border-sky-200/80 dark:border-sky-800/50 rounded-2xl shadow-2xs">
        <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <div className="leading-tight">
            <span>
              <strong>Tự động kiểm tra & cập nhật:</strong> Đề cương, ôn thi từ <span className="font-semibold text-sky-700 dark:text-sky-300">Toanmath, Thuvienhoclieu, Thi247, Vietjack...</span>
            </span>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
              <span>Đã kết nối {autoSyncedDocs.length} tài liệu</span>
              <span>•</span>
              <span>Kiểm tra: {syncInfo.lastSyncedText}</span>
              {justSyncedToast && (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Đã cập nhật mới nhất!
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckNewDocuments}
          disabled={isSyncing}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 text-sky-700 dark:text-sky-300 border border-slate-200/80 dark:border-slate-700 hover:bg-sky-50 dark:hover:bg-slate-700 active:scale-95 transition-all shadow-2xs cursor-pointer shrink-0 disabled:opacity-60"
          title="Tự động kiểm tra xem các website nguồn có tài liệu mới không"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-sky-600' : ''}`} />
          <span>{isSyncing ? 'Đang kiểm tra nguồn...' : 'Kiểm tra tài liệu mới'}</span>
        </button>
      </div>

      {/* ── Category Segmented Tabs (Đề cương / Chuyên đề / Công thức / Ôn thi) ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === tab.id
                ? 'bg-sky-700 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700/60'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* ── Search & Filter Controls ───────────────────────────────── */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700/60 shadow-xs space-y-4">
        
        {/* Row 1: Search box + Grade selector */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm đề cương học kỳ, chuyên đề, tài liệu ôn thi..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Quick grade selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl shrink-0">
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

        {/* Row 2: Quick Search Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-400 dark:text-slate-500 font-medium shrink-0">Gợi ý nhanh:</span>
          {DOC_QUICK_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                searchQuery === tag
                  ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-bold border border-sky-300 dark:border-sky-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Row 2: Subject pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 dark:text-slate-500 font-medium mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Môn:
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

        {/* Row 3: Sub-bar: Source filter + Format filter + Sort */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 gap-3">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Source selector */}
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-medium py-1 px-2.5 rounded-lg focus:outline-none cursor-pointer"
              >
                {SOURCE_OPTIONS.map(src => (
                  <option key={src} value={src} className="dark:bg-slate-800">{src}</option>
                ))}
              </select>
            </div>

            {/* File format selector */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <button 
                onClick={() => setSelectedFileType('all')}
                className={`hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer ${selectedFileType === 'all' ? 'font-semibold text-slate-900 dark:text-slate-100' : ''}`}
              >
                Tất cả định dạng
              </button>
              <button 
                onClick={() => setSelectedFileType('pdf')}
                className={`hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer ${selectedFileType === 'pdf' ? 'font-semibold text-slate-900 dark:text-slate-100' : ''}`}
              >
                PDF
              </button>
              <button 
                onClick={() => setSelectedFileType('docx')}
                className={`hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer ${selectedFileType === 'docx' ? 'font-semibold text-slate-900 dark:text-slate-100' : ''}`}
              >
                Word (.docx)
              </button>
            </div>

            <span>
              Tìm thấy <strong className="text-slate-700 dark:text-slate-200">{filteredDocuments.length}</strong> tài liệu
            </span>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 ml-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'views' | 'newest')}
              className="bg-transparent text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none cursor-pointer"
            >
              <option value="views" className="dark:bg-slate-800">Lượt xem nhiều nhất</option>
              <option value="newest" className="dark:bg-slate-800">Mới cập nhật</option>
            </select>
          </div>
        </div>

      </div>

      {/* ── Documents Grid ────────────────────────────────────────── */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocuments.map((doc) => {
            const isSaved = isDocumentSaved(doc.id);
            return (
              <div
                key={doc.id}
                className="ev-card group flex flex-col justify-between overflow-hidden hover:border-sky-300 dark:hover:border-sky-700/60 transition-all hover:shadow-md"
              >
                {/* Visual Thumbnail */}
                <div 
                  onClick={() => onSelectDocument(doc)}
                  className="relative h-44 bg-slate-100 dark:bg-slate-900 overflow-hidden cursor-pointer"
                >
                  <img
                    src={doc.coverImage || HERO_IMAGE}
                    alt={doc.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/hero_digital_learning_1790863793186.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
                    <div className="text-white text-xs w-full flex items-center justify-between">
                      <div>
                        <span className="font-semibold">{doc.subject}</span>
                        <span className="mx-1.5 opacity-60">·</span>
                        <span className="opacity-90">{doc.grade}</span>
                      </div>
                      <span className="uppercase font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 backdrop-blur-xs text-white">
                        {doc.fileType}
                      </span>
                    </div>
                  </div>

                  {/* Top-right source / new badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {doc.isAutoSynced && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                        MỚI
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Source / Attribution pill */}
                    <div className="flex items-center justify-between gap-2 text-xs mb-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                        {doc.source ? `🌐 ${doc.source}` : '✨ EduViet Biên Soạn'}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        {doc.publishedDate}
                      </span>
                    </div>

                    <h3 
                      onClick={() => onSelectDocument(doc)}
                      className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors cursor-pointer line-clamp-2 leading-snug font-heading"
                    >
                      {doc.title}
                    </h3>

                    <p className="text-sm mt-2 line-clamp-2 leading-relaxed text-slate-600 dark:text-slate-300">
                      {doc.description}
                    </p>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{doc.views.toLocaleString()}</span>
                      </div>
                      {doc.pageCount ? (
                        <span>{doc.pageCount} trang</span>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Direct file download button if URL exists */}
                      {doc.downloadUrl && (
                        <a
                          href={doc.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-sky-700 dark:hover:text-sky-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Tải file PDF/Word trực tiếp"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveDocument(doc.id);
                        }}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          isSaved 
                            ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400' 
                            : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                        title={isSaved ? 'Bỏ lưu' : 'Lưu tài liệu'}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
                      </button>

                      <button
                        onClick={() => onSelectDocument(doc)}
                        className="px-3.5 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-800 active:scale-[0.98] text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs hover:shadow-sky-700/20"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Xem đề cương</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-300 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-heading">
            Không tìm thấy đề cương hoặc tài liệu phù hợp
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Vui lòng thử tìm kiếm bằng từ khóa khác hoặc bấm nút "Kiểm tra tài liệu mới" để làm mới nguồn đồng bộ.
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Đặt lại tất cả bộ lọc
            </button>
            <button
              onClick={handleCheckNewDocuments}
              className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Đồng bộ lại nguồn</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
