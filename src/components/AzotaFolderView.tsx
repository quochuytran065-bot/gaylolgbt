import React, { useState } from 'react';
import { 
  Folder, 
  ChevronRight, 
  Download, 
  Sparkles, 
  Play, 
  Clock, 
  FileText, 
  BookOpen, 
  CheckCircle2, 
  Zap, 
  ArrowLeft,
  Flame,
  UserCheck,
  Crown
} from 'lucide-react';
import { Exam, Subject } from '../types';
import { 
  getAzotaGrade12Folders, 
  AzotaFolderItem, 
  autoSynthesizeAzotaExam, 
  SynthesizerMode 
} from '../services/azotaExamSynthesizer';

interface AzotaFolderViewProps {
  onStartExam: (exam: Exam) => void;
}

export const AzotaFolderView: React.FC<AzotaFolderViewProps> = ({ onStartExam }) => {
  const folders = getAzotaGrade12Folders();
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<Subject | 'Tổ hợp A00'>('Toán học');
  const [synthMode, setSynthMode] = useState<SynthesizerMode>('auto_balance');
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const selectedFolder = folders.find(f => f.id === selectedFolderId);

  const handleAutoGenerate = (sub?: Subject | 'Tổ hợp A00') => {
    setIsGenerating(true);
    const targetSubject = sub || selectedSubjectFilter;
    
    setTimeout(() => {
      const generatedExam = autoSynthesizeAzotaExam({
        subject: targetSubject,
        mode: synthMode
      });
      setIsGenerating(false);
      onStartExam(generatedExam);
    }, 350);
  };

  const handleDownloadAll = () => {
    setNotification('Đang chuẩn bị gói đề thi Azota Khối 12 (JSON & PDF)... Hoàn tất!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* ── BREADCRUMB & HEADER GIAO DIỆN QUẢN LÝ AZOTA ──────────────────────── */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
            {selectedFolderId && (
              <button
                onClick={() => setSelectedFolderId(null)}
                className="flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline cursor-pointer mr-2 font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại</span>
              </button>
            )}
            <span 
              onClick={() => setSelectedFolderId(null)}
              className="cursor-pointer hover:text-sky-600 transition-colors"
            >
              Tất cả
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span 
              onClick={() => setSelectedFolderId(null)}
              className="cursor-pointer hover:text-sky-600 transition-colors font-semibold text-slate-800 dark:text-slate-200"
            >
              Kho đề Azota
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-sky-700 dark:text-sky-400">
              Khối 12
            </span>
            {selectedFolder && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {selectedFolder.name}
                </span>
              </>
            )}
          </div>

          {/* User Status & Action Buttons */}
          <div className="flex items-center gap-2.5">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Quốc Huy Trần <span className="text-slate-400 font-normal">(Giáo viên)</span></span>
            </div>
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Tải xuống toàn bộ</span>
            </button>
          </div>
        </div>

        {notification && (
          <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs rounded-xl flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notification}</span>
          </div>
        )}
      </div>

      {/* ── BANNER TRÌNH TỰ ĐỘNG TỔNG HỢP & SINH ĐỀ AZOTA (KHÔNG CẦN QUAN TÂM ĐIỂM) ── */}
      <div className="relative overflow-hidden bg-linear-to-r from-sky-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-sky-700/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 border border-amber-300/30 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Auto Exam Synthesizer 2026</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Tự Động Tổng Hợp & Sinh Đề Thi Azota Khối 12
            </h2>
            <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
              Tự động quét và gom toàn bộ ngân hàng câu hỏi phân hóa <strong>7-9+ VDC</strong> từ Azota, Chuyên KHTN, Sở Hà Nội, Bắc Ninh, Nam Định. Tự động xáo trộn và sinh đề không giới hạn điểm số, vào phòng thi ngay!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 bg-white/10 dark:bg-black/30 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-sky-200 font-medium">Chọn môn thi tổng hợp:</span>
              <select
                value={selectedSubjectFilter}
                onChange={(e) => setSelectedSubjectFilter(e.target.value as any)}
                className="bg-slate-900 text-white border border-sky-400/30 text-xs sm:text-sm rounded-xl px-3 py-2 font-semibold focus:outline-hidden focus:ring-2 focus:ring-sky-400"
              >
                <option value="Toán học">Môn Toán</option>
                <option value="Vật lý">Môn Lý</option>
                <option value="Hóa học">Môn Hóa</option>
                <option value="Tổ hợp A00">Tổ hợp A00 (Toán - Lý - Hóa)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-sky-200 font-medium">Chế độ sinh đề:</span>
              <select
                value={synthMode}
                onChange={(e) => setSynthMode(e.target.value as SynthesizerMode)}
                className="bg-slate-900 text-white border border-sky-400/30 text-xs sm:text-sm rounded-xl px-3 py-2 font-semibold focus:outline-hidden focus:ring-2 focus:ring-sky-400"
              >
                <option value="auto_balance">Tự do tổng hợp (Chuẩn 28 câu)</option>
                <option value="hardcore_vdc">Cực hạn 9+ VDC (Khó nhất)</option>
                <option value="speed_sprint">Luyện phản xạ nhanh (10 câu)</option>
              </select>
            </div>

            <button
              onClick={() => handleAutoGenerate()}
              disabled={isGenerating}
              className="mt-auto sm:mt-5 flex items-center justify-center gap-2 px-5 py-2.5 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Đang tổng hợp...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Sinh Đề & Thi Ngay</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── NẾU CHƯA CHỌN FOLDER: HIỂN THỊ DANH SÁCH THƯ MỤC NHƯ TRONG ẢNH ───────── */}
      {!selectedFolder ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
            <span>Danh sách thư mục môn học</span>
            <span>3 thư mục có sẵn</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => setSelectedFolderId(folder.id)}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500 rounded-2xl p-5 transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                        <Folder className="w-7 h-7 fill-amber-500 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {folder.name}
                        </h3>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {folder.count} bộ đề khảo sát Azota
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {folder.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400">
                    Bấm để mở thư mục
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAutoGenerate(folder.subject);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 text-sky-700 dark:text-sky-300 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Sinh đề nhanh</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ── KHI ĐÃ CHỌN 1 FOLDER: HIỂN THỊ DANH SÁCH ĐỀ BÊN TRONG FOLDER ĐÓ ───── */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5 fill-amber-500 text-amber-600" />
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Thư mục: {selectedFolder.name} ({selectedFolder.exams.length} đề thi)
              </h3>
            </div>
            <button
              onClick={() => handleAutoGenerate(selectedFolder.subject)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tự động sinh đề ngẫu nhiên từ {selectedFolder.name}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {selectedFolder.exams.map((exam, index) => (
              <div
                key={exam.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-sky-400 dark:hover:border-sky-500 transition-all shadow-xs"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                      {exam.examCode || `AZ-${index + 101}`}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                      {exam.difficulty}
                    </span>
                    <span className="text-xs text-slate-400">
                      {exam.author}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {exam.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {exam.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {exam.durationMinutes} phút
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {exam.questions.length} câu hỏi
                    </span>
                    <span>
                      {exam.attemptsCount.toLocaleString('vi-VN')} lượt thi
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onStartExam(exam)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Vào Thi Ngay</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
