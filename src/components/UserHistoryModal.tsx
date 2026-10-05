import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ExamResult } from '../types';
import { 
  X, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Trash2,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-heading">
                Lịch sử làm bài kiểm tra
              </h2>
              <p className="text-xs text-slate-500">
                {currentUser?.name} · {currentUser?.grade || 'Học sinh'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats bar */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 bg-slate-50 border-b border-slate-200 text-center p-3">
          <div>
            <span className="text-[11px] text-slate-500 block">Số bài đã thi</span>
            <strong className="text-sm sm:text-base font-mono text-slate-900">{userResults.length}</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Điểm trung bình</span>
            <strong className="text-sm sm:text-base font-mono text-sky-700">{averageScore} / 10</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Điểm cao nhất</span>
            <strong className="text-sm sm:text-base font-mono text-emerald-700">{bestScore} / 10</strong>
          </div>
        </div>

        {/* List of submissions */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {userResults.length > 0 ? (
            userResults.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectResult(item);
                  onClose();
                }}
                className="p-4 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50/30 transition-all flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-sky-800">{item.subject}</span>
                    <span>·</span>
                    <span>{item.grade}</span>
                    <span>·</span>
                    <span>{item.submittedAt}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors truncate">
                    {item.examTitle}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Đúng {item.correctCount}/{item.totalQuestions} câu · Thời gian làm: {Math.floor(item.timeSpentSeconds / 60)}p {item.timeSpentSeconds % 60}s
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-lg font-bold font-mono text-slate-900">
                      {item.score.toFixed(1)}
                      <span className="text-xs font-normal text-slate-400">/10</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">{item.scorePercentage}%</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Award className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">Chưa có kết quả kiểm tra nào</p>
              <p className="text-xs text-slate-400">
                Hãy bắt đầu thử sức với các bài kiểm tra trắc nghiệm để ghi nhận điểm số tại đây.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
