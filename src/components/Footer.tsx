import React from 'react';
import { AppTab } from './Navbar';
import { BookOpen, Sparkles, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: AppTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-white dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3.5 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-slate-50 font-heading tracking-tight">
                Edu<span className="text-sky-600 dark:text-sky-400">Viet</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
              Hệ thống học tập và luyện thi trắc nghiệm trực tuyến thế hệ mới dành cho học sinh THPT Việt Nam. Bám sát chuẩn cấu trúc ma trận Bộ GD&ĐT 2025/2026 và kỳ thi Đánh Giá Năng Lực ĐHQG.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Chẩn đoán lỗ hổng kiến thức · Đề thi thực chiến · Học tập tập trung</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3.5 font-heading">
              Hệ Thống Luyện Thi
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li>
                <button onClick={() => onSelectTab('exams')} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left">
                  Đề thi chuẩn cấu trúc Bộ GD&ĐT (3 phần)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dgnl')} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <span>Luyện thi ĐGNL ĐHQG (V-ACT & HSA)</span>
                  <span className="px-1 py-0.2 rounded bg-amber-500 text-slate-900 font-extrabold text-[9px]">HOT</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('courses')} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left">
                  Khóa học video bài giảng chuyên sâu
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('documents')} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left">
                  Kho đề cương, sổ tay công thức & tài liệu
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3.5 font-heading">
              Tiện Ích & Phát Triển
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li>
                <button onClick={() => onSelectTab('analytics')} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left">
                  Mục tiêu Aim & Đồng hồ đếm ngược ngày thi
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('arena')} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left">
                  Đấu trường tri thức 1v1 & Bảng xếp hạng
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('notebook')} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left">
                  Sổ tay Flashcards ghi nhớ công thức
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('focus')} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left">
                  Phòng tự học Pomodoro & Lofi Chill
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('community')} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left">
                  Diễn đàn trao đổi bài tập 24/7
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <p className="flex items-center gap-1.5">
            <span>© 2026 - 2027 EduViet. Thiết kế vì sự tiến bộ của học sinh Việt Nam.</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Chuẩn GDPT 2018
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>Tiêu chuẩn WCAG 2.1 AA</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>Tối ưu hóa đa thiết bị</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
