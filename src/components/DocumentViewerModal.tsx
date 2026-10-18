import React, { useState, useEffect } from 'react';
import { DocumentItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Download, 
  Bookmark, 
  Check, 
  Copy, 
  FileText, 
  BookOpen, 
  Maximize2, 
  Minimize2,
  Share2,
  ZoomIn,
  ZoomOut,
  ExternalLink
} from 'lucide-react';

interface DocumentViewerModalProps {
  document: DocumentItem | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ document, onClose }) => {
  const { isDocumentSaved, toggleSaveDocument } = useAuth();
  const [activeTab, setActiveTab] = useState<'content' | 'preview'>('content');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!document) return;
    const originalOverflow = window.document.body.style.overflow;
    window.document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [document, onClose]);

  if (!document) return null;

  const isSaved = isDocumentSaved(document.id);

  const handleCopyNote = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleDownload = () => {
    // If external direct download URL exists, trigger it directly
    if (document.downloadUrl) {
      window.open(document.downloadUrl, '_blank', 'noopener,noreferrer');
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
      return;
    }

    // Generate text/markdown file for user to download
    const content = `# ${document.title}
Tác giả: ${document.author} | Xuất bản: ${document.publishedDate}
Môn học: ${document.subject} | Phân loại: ${document.grade}
--------------------------------------------------------------------------------
TỔNG QUAN:
${document.directContent.summary}

--------------------------------------------------------------------------------
CÁC CHUYÊN ĐỀ TRỌNG TÂM:
${document.directContent.sections.map((s, idx) => `
${idx + 1}. ${s.title}
${s.content}

GHI CHÚ / CÔNG THỨC:
${s.formulasOrNotes?.map(f => `  • ${f}`).join('\n') || 'Không có ghi chú thêm.'}
`).join('\n')}

--------------------------------------------------------------------------------
ĐIỂM CẦN GHI NHỚ:
${document.directContent.importantTakeaways.map(t => `• ${t}`).join('\n')}
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${document.title.replace(/[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]/g, '_')}.${document.fileType === 'docx' ? 'doc' : 'txt'}`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className={`relative w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all duration-200 my-auto ${
          isFullscreen 
            ? 'h-[98vh] max-w-[98vw]' 
            : 'h-[calc(100dvh-1rem)] sm:h-[92vh] max-w-5xl'
        }`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`p-2 rounded-xl shrink-0 ${
              document.fileType === 'pdf' 
                ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400' 
                : document.fileType === 'docx' 
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400' 
                : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
            }`}>
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate font-heading">
                {document.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span className="font-semibold text-sky-700 dark:text-sky-400">{document.subject}</span>
                <span aria-hidden="true">·</span>
                <span>{document.grade}</span>
                <span aria-hidden="true">·</span>
                <span>{document.fileSize}</span>
                <span aria-hidden="true">·</span>
                <span>{document.pageCount} trang</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleSaveDocument(document.id)}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              title={isSaved ? 'Đã lưu vào danh sách của bạn' : 'Lưu tài liệu'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 dark:fill-amber-400 text-amber-600 dark:text-amber-400' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Đã lưu' : 'Lưu'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-sky-700 hover:bg-sky-800 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              title="Tải về máy"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span className="hidden sm:inline">Đã tải!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Tải về ({document.fileType.toUpperCase()})</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hidden sm:flex cursor-pointer transition-colors"
              title={isFullscreen ? 'Thu nhỏ' : 'Mở rộng'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View mode bar */}
        <div className="px-6 py-2 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'content'
                  ? 'bg-sky-50 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Nội dung chi tiết & Công thức
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-sky-50 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Trình đọc trang mô phỏng ({document.fileType.toUpperCase()})
            </button>
          </div>

          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <button
              onClick={() => setZoomLevel(prev => Math.max(75, prev - 10))}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              title="Thu nhỏ chữ"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs w-10 text-center text-slate-700 dark:text-slate-300">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              title="Phóng to chữ"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body content */}
        <div 
          className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/60 dark:bg-slate-950"
          style={{ fontSize: `${(zoomLevel / 100) * 16}px` }}
        >
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
            
            {activeTab === 'content' ? (
              <>
                {/* Header overview */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div className="flex items-center gap-2 text-xs text-sky-700 dark:text-sky-400 font-semibold mb-2">
                    <BookOpen className="w-4 h-4" />
                    <span>TÓM TẮT TRỌNG TÂM KIẾN THỨC</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 font-heading leading-tight mb-3">
                    {document.title}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {document.directContent.summary}
                  </p>

                  {/* External auto-synced source banner */}
                  {document.source && (
                    <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 p-3 bg-sky-50 dark:bg-sky-950/40 border border-sky-200/70 dark:border-sky-800/50 rounded-xl text-xs">
                      <div className="flex items-center gap-2 text-sky-900 dark:text-sky-200">
                        <span className="font-semibold">Nguồn tài liệu:</span>
                        <span className="px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 font-bold text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-700 shadow-2xs">
                          {document.source}
                        </span>
                        {document.isAutoSynced && (
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                            • Đã tự động đồng bộ
                          </span>
                        )}
                      </div>
                      {document.sourceUrl && (
                        <a
                          href={document.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-sky-700 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-200 transition-colors"
                        >
                          <span>Mở bài viết gốc</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Key sections */}
                <div className="space-y-6">
                  {document.directContent.sections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-heading flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        {section.title}
                      </h3>

                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                        {section.content}
                      </p>

                      {section.formulasOrNotes && section.formulasOrNotes.length > 0 && (
                        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/90 dark:border-slate-700 rounded-xl p-4 space-y-2">
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Công thức & Điểm lưu ý cốt lõi
                          </p>
                          <ul className="space-y-2">
                            {section.formulasOrNotes.map((item, fIdx) => (
                              <li 
                                key={fIdx} 
                                className="flex items-start justify-between gap-3 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200/70 dark:border-slate-700"
                              >
                                <span className="font-semibold text-sky-900 dark:text-sky-300 leading-relaxed">
                                  {item}
                                </span>
                                <button
                                  onClick={() => handleCopyNote(item, idx * 10 + fIdx)}
                                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 shrink-0 cursor-pointer transition-colors"
                                  title="Sao chép công thức"
                                >
                                  {copiedIndex === idx * 10 + fIdx ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Important takeaways */}
                <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 space-y-2.5">
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                    Kinh nghiệm & Mẹo làm bài thi
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
                    {document.directContent.importantTakeaways.map((tip, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">✦</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              /* Simulated Document Page Reader */
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>Trang 1 / {document.pageCount}</span>
                  <span>Định dạng: {document.fileType.toUpperCase()} Reader</span>
                  <span>Được biên soạn bởi: {document.author}</span>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-8 bg-white dark:bg-slate-900 min-h-[500px] shadow-xs space-y-6">
                  <div className="text-center border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      BỘ TÀI LIỆU HỌC TẬP VÀ ÔN LUYỆN
                    </p>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-heading">
                      {document.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Môn: {document.subject} · Đối tượng: {document.grade} · Ngày phát hành: {document.publishedDate}
                    </p>
                  </div>

                  <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-4">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      LỜI NÓI ĐẦU:
                    </p>
                    <p>
                      {document.description} Tài liệu được biên soạn dựa trên cấu trúc đề thi chính thức mới nhất, 
                      giúp học sinh củng cố kiến thức từ nền tảng đến vận dụng cao trong quá trình học tập và ôn thi.
                    </p>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border-l-4 border-sky-600 dark:border-sky-500 my-4">
                      <p className="italic text-xs text-slate-600 dark:text-slate-300">
                        "Học tập không chỉ là tiếp thu kiến thức, mà là rèn luyện tư duy phản biện và khả năng giải quyết vấn đề thực tiễn."
                      </p>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
                      MỤC LỤC TRỌNG TÂM:
                    </h4>
                    <ol className="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                      {document.directContent.sections.map((sec, idx) => (
                        <li key={idx}>
                          <span className="font-medium text-slate-900 dark:text-slate-100">{sec.title}</span>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sec.content.slice(0, 100)}...</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Tải toàn bộ tài liệu ({document.pageCount} trang, {document.fileSize})
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
