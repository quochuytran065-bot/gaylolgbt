import React from 'react';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'documents' | 'exams') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-slate-700 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-700 text-white flex items-center justify-center font-bold text-base">
                E
              </div>
              <span className="text-lg font-bold text-slate-900 font-heading">
                EduViet
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md">
              Hệ thống học tập và kiểm tra trực tuyến chất lượng cao dành cho học sinh Việt Nam. 
              Kho tài liệu bám sát chương trình Giáo dục Phổ thông cùng ngân hàng đề thi trắc nghiệm bấm giờ chuẩn xác.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Chuyên Mục Học Tập
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={() => onSelectTab('documents')} className="hover:text-sky-700 transition-colors cursor-pointer">
                  Tài liệu Toán học & Giải tích 12
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('documents')} className="hover:text-sky-700 transition-colors cursor-pointer">
                  Ngữ pháp & Từ vựng Tiếng Anh THPT
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('documents')} className="hover:text-sky-700 transition-colors cursor-pointer">
                  Vật lý & Hóa học nâng cao
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('documents')} className="hover:text-sky-700 transition-colors cursor-pointer">
                  Văn học & Lịch sử cách mạng
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Tính Năng Nổi Bật
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={() => onSelectTab('exams')} className="hover:text-sky-700 transition-colors cursor-pointer">
                  Đề thi thử Tốt nghiệp THPT Quốc Gia
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('exams')} className="hover:text-sky-700 transition-colors cursor-pointer">
                  Đồng hồ đếm ngược & Tự động nộp bài
                </button>
              </li>
              <li>
                <span className="text-slate-500">
                  Xem lại lời giải chi tiết từng bước
                </span>
              </li>
              <li>
                <span className="text-slate-500">
                  Theo dõi tiến độ & Thống kê điểm số
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© 2026 EduViet. Nền tảng học tập & thi trắc nghiệm trực tuyến.</p>
          <div className="flex items-center gap-4">
            <span>Tiêu chuẩn WCAG 2.1 AA</span>
            <span aria-hidden="true">·</span>
            <span>Chương trình GDPT mới</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
