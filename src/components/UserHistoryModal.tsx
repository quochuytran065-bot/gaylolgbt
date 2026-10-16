import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ExamResult } from '../types';
import { 
  X, 
  Clock, 
  Award, 
  ArrowRight, 
  Calendar,
  BookOpen
} from 'lucide-react';

interface UserHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (result: ExamResult) => void;
}

export const UserHistoryModal: React.FC<UserHistoryModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectResult 
}) => {
  const { currentUser, examHistory } = useAuth();

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter history for current user if applicable
  const userResults = currentUser 
    ? examHistory.filter(r => r.userId === currentUser.id || r.userName === currentUser.name)
    : examHistory;

  const averageScore = userResults.length > 0
    ? (userResults.reduce((acc, curr) => acc + curr.score, 0) / userResults.length).toFixed(1)
    : '0.0';

  const bestScore = userResults.length > 0
    ? Math.max(...userResults.map(r => r.score)).toFixed(1)
    : '0.0';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[calc(100dvh-2rem)] my-auto animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/70 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 font-heading">
                Lịch sử khảo thí & Bảng điểm
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentUser?.name || 'Khách'} · {currentUser?.grade || 'Thí sinh'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats bar */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-800 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 text-center p-3 shrink-0">
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Số ca thi đã làm</span>
            <strong className="text-sm sm:text-base font-mono text-slate-900 dark:text-slate-100">{userResults.length}</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Điểm trung bình</span>
            <strong className="text-sm sm:text-base font-mono text-sky-600 dark:text-sky-400">{averageScore} / 10</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Điểm cao nhất</span>
            <strong className="text-sm sm:text-base font-mono text-emerald-600 dark:text-emerald-400">{bestScore} / 10</strong>
          </div>
        </div>

        {/* List of submissions */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {userResults.length > 0 ? (
            userResults.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectResult(item);
                  onClose();
                }}
                className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-sky-400 dark:hover:border-sky-500 bg-white dark:bg-slate-800/60 hover:bg-sky-50/30 dark:hover:bg-sky-950/20 transition-all flex items-center justify-between gap-3 sm:gap-4 cursor-pointer group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                    <span className="font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-1.5 py-0.5 rounded">
                      {item.subject}
                    </span>
                    <span>·</span>
                    <span>{item.grade}</span>
                    <span>·</span>
                    <span className="font-mono text-[11px]">{item.submittedAt}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
                    {item.examTitle}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Đúng {item.correctCount}/{item.totalQuestions} câu · Thời gian làm: {Math.floor(item.timeSpentSeconds / 60)}p {item.timeSpentSeconds % 60}s
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100">
                      {item.score.toFixed(1)}
                      <span className="text-xs font-normal text-slate-400">/10</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">{item.scorePercentage}%</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400 space-y-2">
              <Award className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Chưa có kết quả kiểm tra nào</p>
              <p className="text-xs text-slate-400">
                Hãy bắt đầu thử sức với các ca thi trắc nghiệm để ghi nhận điểm số tại đây.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
