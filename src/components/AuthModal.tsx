import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  X, 
  CheckCircle, 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  KeyRound,
  Sparkles,
  UserCheck
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, register, loginAsAdmin, loginAsDemo } = useAuth();
  const toast = useToast();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loginRole, setLoginRole] = useState<'student' | 'admin'>('student');

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regGrade, setRegGrade] = useState('Lớp 12');
  const [regSchool, setRegSchool] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Admin registration option
  const [isAdminRegistration, setIsAdminRegistration] = useState(false);
  const [adminSecretCode, setAdminSecretCode] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!loginUsername.trim()) {
      setErrorMsg('Vui lòng nhập tên đăng nhập hoặc email');
      return;
    }
    if (!loginPassword.trim()) {
      setErrorMsg('Vui lòng nhập mật khẩu');
      return;
    }

    const res = login(loginUsername, loginPassword);
    if (res.success) {
      setSuccessMsg(res.message);
      toast.success('🎉 Đăng nhập thành công!', `Chào mừng trở lại!`);
      setTimeout(() => {
        closeAuthModal();
        setSuccessMsg('');
      }, 400);
    } else {
      setErrorMsg(res.message);
      toast.error('Đăng nhập thất bại', res.message);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanUser = regUsername.trim().toLowerCase();
    if (!cleanUser) {
      setErrorMsg('Vui lòng nhập tên đăng nhập');
      return;
    }
    if (cleanUser.length < 3) {
      setErrorMsg('Tên đăng nhập phải có ít nhất 3 ký tự');
      return;
    }
    if (!regPassword) {
      setErrorMsg('Vui lòng nhập mật khẩu');
      return;
    }
    if (regPassword.length < 3) {
      setErrorMsg('Mật khẩu phải có ít nhất 3 ký tự');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp');
      return;
    }
    if (!regName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn');
      return;
    }

    // Verify admin code if registering as admin
    if (isAdminRegistration) {
      if (adminSecretCode.trim() !== 'admin2027') {
        setErrorMsg('Mã bí mật Admin không chính xác! Hãy nhập mã "admin2027"');
        return;
      }
    }

    const res = register({
      username: cleanUser,
      password: regPassword,
      name: regName.trim(),
      grade: regGrade,
      school: regSchool.trim(),
      role: isAdminRegistration ? 'admin' : 'student'
    });

    if (res.success) {
      setSuccessMsg(res.message);
      toast.success('✅ Đăng ký thành công!', `Tài khoản của bạn đã được tạo. Hãy bắt đầu luyện thi!`);
      setTimeout(() => {
        closeAuthModal();
        setSuccessMsg('');
      }, 500);
    } else {
      setErrorMsg(res.message);
      toast.error('Đăng ký thất bại', res.message);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto"
      onClick={closeAuthModal}
    >
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[calc(100dvh-2rem)] my-auto animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 font-heading">
                {tab === 'login' ? 'Đăng nhập khảo thí' : 'Đăng ký tài khoản'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">TEST360 · Hệ thống khảo thí trực tuyến</p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 sm:px-6 pt-4 shrink-0">
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
            <button
              onClick={() => {
                setTab('login');
                setErrorMsg('');
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                tab === 'login'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => {
                setTab('register');
                setErrorMsg('');
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                tab === 'register'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tạo tài khoản
            </button>
          </div>
        </div>

        {/* LMS360 Role Selector: Thí sinh vs Quản trị viên */}
        {tab === 'login' && (
          <div className="px-5 sm:px-6 pt-3 shrink-0">
            <div className="flex rounded-xl p-1 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 gap-1 text-xs">
              <button
                type="button"
                onClick={() => {
                  setLoginRole('student');
                  setLoginUsername('minh_thpt');
                  setLoginPassword('123456');
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  loginRole === 'student'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Thí sinh / Học viên</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginRole('admin');
                  setLoginUsername('admin');
                  setLoginPassword('admin123');
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  loginRole === 'admin'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Quản Trị Viên</span>
              </button>
            </div>
          </div>
        )}

        {/* Form Body - Scrollable on small screens / mobile */}
        <div className="p-5 sm:p-6 pt-3 overflow-y-auto flex-1 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: LOGIN */}
          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {loginRole === 'admin' && (
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs flex items-center justify-between">
                  <div>
                    <strong className="text-purple-900 dark:text-purple-200 block">Tài khoản Quản Trị Hệ Thống:</strong>
                    <span className="text-[11px] text-purple-700 dark:text-purple-300 font-mono">admin / admin123</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      loginAsAdmin();
                      setSuccessMsg('Đăng nhập thành công với quyền Admin!');
                      setTimeout(() => {
                        closeAuthModal();
                        setSuccessMsg('');
                      }, 500);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors shrink-0"
                  >
                    Vào ngay ⚡
                  </button>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tên Đăng Nhập Hoặc Email:
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder={loginRole === 'admin' ? 'admin' : 'Ví dụ: minh_thpt'}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 text-slate-900 dark:text-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mật Khẩu:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Nhập mật khẩu của bạn"
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 text-slate-900 dark:text-white transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-2.5 text-white font-bold text-sm rounded-xl shadow-xs transition-colors cursor-pointer mt-2 ${
                  loginRole === 'admin' 
                    ? 'bg-purple-700 hover:bg-purple-800' 
                    : 'bg-sky-600 hover:bg-sky-700'
                }`}
              >
                {loginRole === 'admin' ? 'Đăng Nhập Quản Trị Viên' : 'Vào Phòng Khảo Thí'}
              </button>

              {/* Quick Demo Student Accounts */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1.5">
                  Tài khoản thí sinh mẫu (dùng thử nhanh):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      loginAsDemo(1);
                      closeAuthModal();
                    }}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-left cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Trần Đức Minh</p>
                    <p className="text-[10px] text-slate-500">Lớp 12 · THPT Chu Văn An</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      loginAsDemo(2);
                      closeAuthModal();
                    }}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-left cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Lê Thu Hà</p>
                    <p className="text-[10px] text-slate-500">Lớp 12 · THPT Chuyên KHTN</p>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* TAB 2: REGISTER */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Họ và tên thí sinh:
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Khối lớp:
                  </label>
                  <select
                    value={regGrade}
                    onChange={(e) => setRegGrade(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 text-slate-900 dark:text-white font-medium"
                  >
                    <option value="Lớp 12">Lớp 12 (Ôn thi THPT Quốc Gia)</option>
                    <option value="Đại học">Đại học / Thí sinh tự do</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Trường học:
                  </label>
                  <input
                    type="text"
                    value={regSchool}
                    onChange={(e) => setRegSchool(e.target.value)}
                    placeholder="THPT..."
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tên Đăng Nhập:
                </label>
                <input
                  type="text"
                  required
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="Tên viết liền không dấu (ít nhất 3 ký tự)"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 text-slate-900 dark:text-white font-medium font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mật Khẩu:
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Ít nhất 3 ký tự"
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 text-slate-900 dark:text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nhập lại:
                  </label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Khớp mật khẩu"
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              {/* Admin Privileges Toggle */}
              <div className="pt-1">
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAdminRegistration}
                    onChange={(e) => setIsAdminRegistration(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-purple-900 dark:text-purple-300">Đăng ký quyền Quản Trị Viên (Admin)</span>
                    <p className="text-[10px] text-purple-700 dark:text-purple-400">Dành cho Giáo viên & Quản trị hệ thống (nhập mã admin2027)</p>
                  </div>
                </label>

                {isAdminRegistration && (
                  <div className="mt-2 pl-6 space-y-1">
                    <label className="block text-[11px] font-semibold text-purple-900 dark:text-purple-300">
                      Mã xác thực Admin:
                    </label>
                    <div className="relative">
                      <KeyRound className="w-3.5 h-3.5 text-purple-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={adminSecretCode}
                        onChange={(e) => setAdminSecretCode(e.target.value)}
                        placeholder="Nhập mã bí mật: admin2027"
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-purple-300 dark:border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors cursor-pointer mt-2"
              >
                Đăng ký tài khoản
              </button>

              <div className="pt-1 text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400">Đã có tài khoản? </span>
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setErrorMsg('');
                  }}
                  className="text-xs text-sky-700 dark:text-sky-400 font-bold hover:underline cursor-pointer"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
