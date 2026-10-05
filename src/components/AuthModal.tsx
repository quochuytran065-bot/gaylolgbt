import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
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
  Sparkles
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, register, loginAsAdmin, loginAsDemo } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>('login');

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
      setTimeout(() => {
        closeAuthModal();
        setSuccessMsg('');
      }, 600);
    } else {
      setErrorMsg(res.message);
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
      setTimeout(() => {
        closeAuthModal();
        setSuccessMsg('');
      }, 700);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-700 text-white flex items-center justify-center font-bold shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-heading">
                {tab === 'login' ? 'Đăng nhập tài khoản' : 'Tạo tài khoản mới'}
              </h2>
              <p className="text-xs text-slate-500">Cổng học tập & thi trắc nghiệm EduViet</p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => {
                setTab('login');
                setErrorMsg('');
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                tab === 'login'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
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
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tạo tài khoản
            </button>
          </div>
        </div>

        {/* Quick Credentials / Admin preset */}
        {tab === 'login' && (
          <div className="px-6 pt-3 space-y-2">
            <div className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200/80 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-purple-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  Đăng nhập quyền Quản Trị Viên:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setLoginUsername('admin');
                    setLoginPassword('admin123');
                    loginAsAdmin();
                    setSuccessMsg('Đăng nhập thành công với quyền Admin!');
                    setTimeout(() => {
                      closeAuthModal();
                      setSuccessMsg('');
                    }, 500);
                  }}
                  className="px-2.5 py-1 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] cursor-pointer shadow-2xs transition-colors"
                >
                  Vào nhanh Admin
                </button>
              </div>
              <p className="text-[11px] text-purple-800">
                Tài khoản: <strong className="font-mono">admin</strong> · Mật khẩu: <strong className="font-mono">admin123</strong>
              </p>
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 pt-4">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: LOGIN */}
          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên Đăng Nhập Hoặc Email:
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Ví dụ: admin hoặc hocsinh2027"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mật Khẩu:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors cursor-pointer mt-2"
              >
                Đăng nhập ngay
              </button>

              <div className="pt-2 text-center">
                <span className="text-xs text-slate-500">Chưa có tài khoản? </span>
                <button
                  type="button"
                  onClick={() => {
                    setTab('register');
                    setErrorMsg('');
                  }}
                  className="text-xs text-sky-700 font-bold hover:underline cursor-pointer"
                >
                  Tạo tài khoản mới
                </button>
              </div>
            </form>
          ) : (
            /* TAB 2: REGISTER */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên Đăng Nhập (Username): <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                    placeholder="Ví dụ: quochuy2027"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all font-mono font-medium"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">Viết liền, không dấu, ít nhất 3 ký tự</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mật Khẩu: <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Mật khẩu"
                      className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nhập Lại Mật Khẩu: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Xác nhận MK"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ Và Tên: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Quốc Huy"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Khối Lớp:</label>
                  <select
                    value={regGrade}
                    onChange={(e) => setRegGrade(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all"
                  >
                    <option value="Lớp 10">Lớp 10</option>
                    <option value="Lớp 11">Lớp 11</option>
                    <option value="Lớp 12">Lớp 12</option>
                    <option value="Đại học">Đại học</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Trường học:</label>
                  <input
                    type="text"
                    value={regSchool}
                    onChange={(e) => setRegSchool(e.target.value)}
                    placeholder="THPT..."
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Admin Privileges Toggle */}
              <div className="pt-1">
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-purple-200 bg-purple-50/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAdminRegistration}
                    onChange={(e) => setIsAdminRegistration(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-purple-900">Đăng ký quyền Quản Trị Viên (Admin)</span>
                    <p className="text-[10px] text-purple-700">Chỉ dành cho quản trị hệ thống (cần mã bí mật)</p>
                  </div>
                </label>

                {isAdminRegistration && (
                  <div className="mt-2 pl-6 space-y-1">
                    <label className="block text-[11px] font-semibold text-purple-900">
                      Mã xác thực Admin:
                    </label>
                    <div className="relative">
                      <KeyRound className="w-3.5 h-3.5 text-purple-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={adminSecretCode}
                        onChange={(e) => setAdminSecretCode(e.target.value)}
                        placeholder="Nhập mã bí mật: admin2027"
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                <span className="text-xs text-slate-500">Đã có tài khoản? </span>
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setErrorMsg('');
                  }}
                  className="text-xs text-sky-700 font-bold hover:underline cursor-pointer"
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
