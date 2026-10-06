import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Clock, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Target,
  Flame,
  ShieldCheck,
  Sun,
  Moon,
  Home,
  FileCheck2,
  PlayCircle,
  Swords,
  Sparkles,
  BookMarked,
  Headphones,
  MessageSquare
} from 'lucide-react';

export type AppTab = 
  | 'home' 
  | 'exams' 
  | 'courses' 
  | 'arena' 
  | 'notebook' 
  | 'focus' 
  | 'community' 
  | 'documents' 
  | 'analytics' 
  | 'history';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onOpenHistory: () => void;
  onOpenAdminPanel?: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenHistory,
  onOpenAdminPanel,
  isDarkMode,
  onToggleDarkMode
}) => {
  const { currentUser, isAdmin, logout, openAuthModal, loginAsDemo } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUtilityMenuOpen, setIsUtilityMenuOpen] = useState(false);

  const isUtilityActive = ['notebook', 'focus', 'community', 'analytics'].includes(activeTab);

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors duration-300 ev-glass ${
      isDarkMode
        ? 'border-slate-700/60'
        : 'border-slate-200/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:shadow-sky-400/30 group-hover:scale-105 transition-all duration-200">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div className="leading-tight">
              <span className={`text-lg font-extrabold tracking-tight font-heading transition-colors ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}>
                Edu<span className="text-sky-600">Viet</span>
              </span>
            </div>
          </button>

          {/* Main Desktop Navigation - Compact & Modern */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/70 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-md shadow-2xs">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'home'
                  ? isDarkMode ? 'bg-sky-600 text-white shadow-xs' : 'bg-white text-sky-700 shadow-xs'
                  : isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700/60' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Trang chủ</span>
            </button>

            <button
              onClick={() => setActiveTab('exams')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'exams'
                  ? isDarkMode ? 'bg-sky-600 text-white shadow-xs' : 'bg-white text-sky-700 shadow-xs'
                  : isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700/60' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Đề thi</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'courses'
                  ? isDarkMode ? 'bg-purple-600 text-white shadow-xs' : 'bg-white text-purple-700 shadow-xs'
                  : isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700/60' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5 text-purple-500" />
              <span>Khóa học</span>
            </button>

            <button
              onClick={() => setActiveTab('arena')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'arena'
                  ? isDarkMode ? 'bg-rose-600 text-white shadow-xs' : 'bg-white text-rose-700 shadow-xs'
                  : isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700/60' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Swords className="w-3.5 h-3.5 text-rose-500" />
              <span>Đấu trường</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'documents'
                  ? isDarkMode ? 'bg-sky-600 text-white shadow-xs' : 'bg-white text-sky-700 shadow-xs'
                  : isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700/60' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tài liệu</span>
            </button>

            {/* Dropdown Tiện ích học tập (Sổ tay, Phòng học, Hỏi đáp, Aim) */}
            <div className="relative">
              <button
                onClick={() => setIsUtilityMenuOpen(v => !v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isUtilityActive
                    ? isDarkMode ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-indigo-700 shadow-xs'
                    : isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700/60' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {activeTab === 'notebook' ? 'Sổ tay' :
                   activeTab === 'focus' ? 'Phòng học' :
                   activeTab === 'community' ? 'Hỏi đáp' :
                   activeTab === 'analytics' ? 'Mục tiêu Aim' : 'Tiện ích'}
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isUtilityMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isUtilityMenuOpen && (
                <div 
                  className={`absolute right-0 mt-2 w-60 rounded-2xl shadow-xl border p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 backdrop-blur-md ${
                    isDarkMode ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-slate-200'
                  }`}
                  onMouseLeave={() => setIsUtilityMenuOpen(false)}
                >
                  <button
                    onClick={() => { setActiveTab('notebook'); setIsUtilityMenuOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                      activeTab === 'notebook'
                        ? isDarkMode ? 'bg-amber-950/70 text-amber-300 font-bold' : 'bg-amber-50 text-amber-800 font-bold'
                        : isDarkMode ? 'text-slate-300 hover:bg-slate-700/60' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                      <BookMarked className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold leading-tight">Sổ tay ghi nhớ</p>
                      <p className="text-[10px] text-slate-400">Flashcards & công thức</p>
                    </div>
                  </button>

                  <button
                    onClick={() => { setActiveTab('focus'); setIsUtilityMenuOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                      activeTab === 'focus'
                        ? isDarkMode ? 'bg-teal-950/70 text-teal-300 font-bold' : 'bg-teal-50 text-teal-800 font-bold'
                        : isDarkMode ? 'text-slate-300 hover:bg-slate-700/60' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                      <Headphones className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold leading-tight">Phòng tự học</p>
                      <p className="text-[10px] text-slate-400">Pomodoro & lofi chill</p>
                    </div>
                  </button>

                  <button
                    onClick={() => { setActiveTab('community'); setIsUtilityMenuOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                      activeTab === 'community'
                        ? isDarkMode ? 'bg-sky-950/70 text-sky-300 font-bold' : 'bg-sky-50 text-sky-800 font-bold'
                        : isDarkMode ? 'text-slate-300 hover:bg-slate-700/60' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold leading-tight">Hỏi đáp 24/7</p>
                      <p className="text-[10px] text-slate-400">AI giải đáp & cộng đồng</p>
                    </div>
                  </button>

                  <button
                    onClick={() => { setActiveTab('analytics'); setIsUtilityMenuOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                      activeTab === 'analytics'
                        ? isDarkMode ? 'bg-indigo-950/70 text-indigo-300 font-bold' : 'bg-indigo-50 text-indigo-800 font-bold'
                        : isDarkMode ? 'text-slate-300 hover:bg-slate-700/60' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                      <Target className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold leading-tight">Mục tiêu Aim</p>
                      <p className="text-[10px] text-slate-400">Lộ trình & phân tích điểm</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Dark mode toggle + user actions */}
          <div className="hidden md:flex items-center gap-2">

            {/* Dark Mode Toggle */}
            <button
              id="dark-mode-toggle"
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-700 text-amber-400 hover:bg-slate-600'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isDarkMode
                ? <Sun className="w-4 h-4" />
                : <Moon className="w-4 h-4" />
              }
            </button>

            {/* Admin Portal Button - ONLY visible to Admin */}
            {isAdmin && (
              <button
                onClick={onOpenAdminPanel}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-700 via-indigo-600 to-sky-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer border border-purple-400/30"
                title="Bảng Quản Trị Hệ Thống (Chỉ Quản trị viên mới có quyền truy cập)"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>👑 Quản Trị Admin</span>
              </button>
            )}

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border transition-colors focus:outline-none cursor-pointer ${
                    isAdmin 
                      ? 'border-purple-300 bg-purple-50/50 hover:bg-purple-100/50 text-slate-800' 
                      : isDarkMode
                        ? 'border-slate-600 bg-slate-800 hover:bg-slate-700 text-slate-100'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full font-semibold text-xs flex items-center justify-center border ${
                    isAdmin 
                      ? 'bg-purple-600 text-white border-purple-400' 
                      : 'bg-sky-100 text-sky-800 border-sky-200'
                  }`}>
                    {isAdmin ? '👑' : currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left text-xs leading-none">
                    <p className={`font-semibold truncate max-w-[130px] ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}>
                      {currentUser.name}
                    </p>
                    <span className={`text-[11px] font-mono ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {isAdmin ? 'Quản Trị Viên' : currentUser.grade}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </button>

                {isUserMenuOpen && (
                  <div 
                    className={`absolute right-0 mt-2 w-64 rounded-xl shadow-lg border py-2 z-50 animate-in fade-in zoom-in-95 duration-100 ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-600'
                        : 'bg-white border-slate-200'
                    }`}
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                  >
                    <div className={`px-4 py-2 border-b ${
                      isDarkMode ? 'border-slate-700' : 'border-slate-100'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isAdmin 
                            ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                            : 'bg-sky-100 text-sky-800'
                        }`}>
                          {isAdmin ? '👑 Quản Trị Viên' : 'Học sinh'}
                        </span>
                        <span className={`text-[11px] font-mono ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-400'
                        }`}>@{currentUser.username}</span>
                      </div>
                      <p className={`text-sm font-semibold truncate mt-1 ${
                        isDarkMode ? 'text-slate-100' : 'text-slate-900'
                      }`}>{currentUser.name}</p>
                      <p className={`text-xs truncate ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}>{currentUser.email}</p>
                      {currentUser.school && (
                        <p className={`text-xs mt-0.5 truncate ${
                          isDarkMode ? 'text-slate-500' : 'text-slate-400'
                        }`}>{currentUser.school}</p>
                      )}
                    </div>

                    <div className="py-1">
                      {isAdmin && (
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onOpenAdminPanel?.();
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-bold text-purple-700 hover:bg-purple-50 flex items-center gap-2 cursor-pointer border-b border-purple-100"
                        >
                          <ShieldCheck className="w-4 h-4 text-purple-600" />
                          <span>Bảng Điều Khiển Admin</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenHistory();
                        }}
                        className={`w-full px-4 py-2 text-left text-xs font-medium flex items-center gap-2 cursor-pointer ${
                          isDarkMode
                            ? 'text-slate-300 hover:bg-slate-700'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Clock className="w-4 h-4 text-slate-400" />
                        Lịch sử bài làm &amp; Điểm số
                      </button>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setActiveTab('documents');
                        }}
                        className={`w-full px-4 py-2 text-left text-xs font-medium flex items-center gap-2 cursor-pointer ${
                          isDarkMode
                            ? 'text-slate-300 hover:bg-slate-700'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        Tài liệu đã lưu ({currentUser.savedDocuments?.length || 0})
                      </button>
                    </div>

                    <div className={`border-t pt-1 ${
                      isDarkMode ? 'border-slate-700' : 'border-slate-100'
                    }`}>
                      <div className={`px-4 py-1.5 text-[11px] font-medium ${
                        isDarkMode ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        Đổi tài khoản mẫu:
                      </div>
                      <div className="px-2 flex gap-1 mb-1">
                        <button
                          onClick={() => {
                            loginAsDemo(0);
                            setIsUserMenuOpen(false);
                          }}
                          className={`flex-1 text-[11px] py-1 px-2 rounded font-medium text-center cursor-pointer ${
                            isDarkMode
                              ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                              : 'bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600'
                          }`}
                        >
                          Lớp 12
                        </button>
                        <button
                          onClick={() => {
                            loginAsDemo(1);
                            setIsUserMenuOpen(false);
                          }}
                          className={`flex-1 text-[11px] py-1 px-2 rounded font-medium text-center cursor-pointer ${
                            isDarkMode
                              ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                              : 'bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600'
                          }`}
                        >
                          Lớp 11
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => loginAsDemo(0)}
                  className={`px-3 py-2 text-xs font-medium border rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isDarkMode
                      ? 'text-slate-300 border-slate-600 hover:bg-slate-700'
                      : 'text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Dùng thử nhanh
                </button>
                <button
                  onClick={openAuthModal}
                  className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-all whitespace-nowrap cursor-pointer shadow-sm hover:shadow-sky-700/25"
                >
                  Đăng nhập / Đăng ký
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile nav drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-1 text-xs font-semibold">
          <button
            onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}
            className={`block w-full text-left px-3 py-2 rounded-xl ${
              activeTab === 'home' ? 'bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            🏠 Trang chủ
          </button>
          <button
            onClick={() => { setActiveTab('exams'); setIsMobileMenuOpen(false); }}
            className={`block w-full text-left px-3 py-2 rounded-xl ${
              activeTab === 'exams' ? 'bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            📝 Đề thi & Thi thử (Mock Test)
          </button>
          <button
            onClick={() => { setActiveTab('courses'); setIsMobileMenuOpen(false); }}
            className={`block w-full text-left px-3 py-2 rounded-xl ${
              activeTab === 'courses' ? 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            🎓 Khóa học trực tuyến (Video LMS)
          </button>
          <button
            onClick={() => { setActiveTab('arena'); setIsMobileMenuOpen(false); }}
            className={`block w-full text-left px-3 py-2 rounded-xl ${
              activeTab === 'arena' ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            ⚔️ Đấu trường & Bảng xếp hạng (1v1)
          </button>
          <button
            onClick={() => { setActiveTab('notebook'); setIsMobileMenuOpen(false); }}
            className={`block w-full text-left px-3 py-2 rounded-xl ${
              activeTab === 'notebook' ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            📖 Sổ tay từ vựng & Công thức (Flashcards)
          </button>
          <button
            onClick={() => { setActiveTab('focus'); setIsMobileMenuOpen(false); }}
            className={`block w-full text-left px-3 py-2 rounded-xl ${
              activeTab === 'focus' ? 'bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            ⏱️ Phòng tự học chung (Focus & Pomodoro)
          </button>
          <button
            onClick={() => { setActiveTab('community'); setIsMobileMenuOpen(false); }}
            className={`block w-full text-left px-3 py-2 rounded-xl ${
              activeTab === 'community' ? 'bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            💬 Hỏi đáp bài tập 24/7 (AI Gia Sư)
          </button>
          <button
            onClick={() => { setActiveTab('documents'); setIsMobileMenuOpen(false); }}
            className={`block w-full text-left px-3 py-2 rounded-xl ${
              activeTab === 'documents' ? 'bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            📚 Thư viện tài liệu học tập
          </button>
          <button
            onClick={() => { setActiveTab('analytics'); setIsMobileMenuOpen(false); }}
            className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-xl ${
              activeTab === 'analytics' ? 'bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-sky-600" />
              <span>Mục tiêu & Lộ trình cá nhân hóa</span>
            </span>
            <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-amber-500 text-white">Aim</span>
          </button>
          <button
            onClick={() => {
              if (currentUser) {
                onOpenHistory();
              } else {
                openAuthModal();
              }
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300"
          >
            🕒 Lịch sử kết quả thi
          </button>

          <div className="pt-3 border-t border-slate-200 mt-2">
            {currentUser ? (
              <div className="space-y-2">
                {isAdmin && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAdminPanel?.();
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>👑 Bảng Quản Trị Admin</span>
                  </button>
                )}
                <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full font-semibold text-xs flex items-center justify-center ${
                    isAdmin ? 'bg-purple-600 text-white' : 'bg-sky-100 text-sky-800'
                  }`}>
                    {isAdmin ? '👑' : currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{currentUser.name}</p>
                    <p className="text-xs text-slate-500 font-mono">
                      {isAdmin ? '👑 Quản Trị Viên' : currentUser.grade} · @{currentUser.username}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-rose-600 font-medium cursor-pointer"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    openAuthModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-4 text-center text-sm font-semibold text-white bg-sky-700 rounded-lg"
                >
                  Đăng nhập / Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
