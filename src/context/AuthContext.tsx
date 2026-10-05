import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, ExamResult } from '../types';
import { DEMO_USERS } from '../data/mockData';

export interface RegisterData {
  username: string;
  password: string;
  name: string;
  email?: string;
  grade?: string;
  school?: string;
  role?: 'student' | 'admin';
}

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  examHistory: ExamResult[];
  allUsers: User[];
  isAuthModalOpen: boolean;
  login: (usernameOrEmail: string, password?: string) => { success: boolean; message: string };
  register: (
    dataOrName: RegisterData | string, 
    email?: string, 
    grade?: string, 
    school?: string
  ) => { success: boolean; message: string };
  logout: () => void;
  loginAsDemo: (demoIndex: number) => void;
  loginAsAdmin: () => void;
  toggleSaveDocument: (docId: string) => void;
  isDocumentSaved: (docId: string) => boolean;
  saveExamResult: (result: ExamResult) => void;
  getResultsForExam: (examId: string) => ExamResult[];
  deleteUser?: (userId: string) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'eduviet_current_user_v2';
const STORAGE_KEY_ALL_USERS = 'eduviet_registered_users_v2';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load registered users or seed with demo users including pre-configured Admin
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ALL_USERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure admin user exists in list
        const hasAdmin = parsed.some((u: User) => u.username === 'admin');
        if (!hasAdmin) {
          const merged = [DEMO_USERS[0], ...parsed];
          localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(DEMO_USERS));
    return DEMO_USERS;
  });

  // Current logged in user
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) return JSON.parse(saved);
      // Default to student Minh
      return DEMO_USERS[1];
    } catch {
      return DEMO_USERS[1];
    }
  });

  // User-specific exam history (isolated per user account!)
  const [examHistory, setExamHistory] = useState<ExamResult[]>([]);

  // Load exam history whenever currentUser changes
  useEffect(() => {
    if (!currentUser) {
      setExamHistory([]);
      return;
    }

    try {
      const userHistoryKey = `eduviet_exam_history_user_${currentUser.id}`;
      const savedHistory = localStorage.getItem(userHistoryKey);
      if (savedHistory) {
        setExamHistory(JSON.parse(savedHistory));
      } else {
        // If it's a demo user, check if global history existed, otherwise empty
        if (currentUser.id === 'user-01') {
          const oldGlobal = localStorage.getItem('eduviet_exam_history_v1');
          if (oldGlobal) {
            setExamHistory(JSON.parse(oldGlobal));
            return;
          }
        }
        setExamHistory([]);
      }
    } catch (e) {
      setExamHistory([]);
    }
  }, [currentUser]);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync current user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [currentUser]);

  // Sync exam history per user
  useEffect(() => {
    if (!currentUser) return;
    try {
      const userHistoryKey = `eduviet_exam_history_user_${currentUser.id}`;
      localStorage.setItem(userHistoryKey, JSON.stringify(examHistory));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [examHistory, currentUser]);

  // Login handler with username and password
  const login = (usernameOrEmail: string, password?: string): { success: boolean; message: string } => {
    const trimmedIdentifier = usernameOrEmail.trim().toLowerCase();
    const trimmedPass = (password || '').trim();

    // Check in allUsers
    const foundUser = allUsers.find(u => 
      (u.username && u.username.toLowerCase() === trimmedIdentifier) || 
      (u.email && u.email.toLowerCase() === trimmedIdentifier)
    );

    if (!foundUser) {
      return { 
        success: false, 
        message: 'Tài khoản không tồn tại! Vui lòng kiểm tra lại tên đăng nhập hoặc chuyển sang tab Đăng ký.' 
      };
    }

    // If user has a password set, verify it
    if (foundUser.password && trimmedPass) {
      if (foundUser.password !== trimmedPass) {
        return { 
          success: false, 
          message: 'Mật khẩu không chính xác! Vui lòng kiểm tra lại.' 
        };
      }
    } else if (foundUser.password && !trimmedPass) {
      return {
        success: false,
        message: 'Vui lòng nhập mật khẩu của bạn.'
      };
    }

    setCurrentUser(foundUser);
    return { 
      success: true, 
      message: `Chào mừng ${foundUser.name}${foundUser.role === 'admin' ? ' (Admin)' : ''} đã đăng nhập thành công!` 
    };
  };

  // Register handler with username and password
  const register = (
    dataOrName: RegisterData | string, 
    email?: string, 
    grade?: string, 
    school?: string
  ): { success: boolean; message: string } => {
    let regData: RegisterData;

    if (typeof dataOrName === 'string') {
      regData = {
        name: dataOrName,
        username: (email?.split('@')[0] || dataOrName.replace(/\s+/g, '').toLowerCase()),
        password: '123',
        email: email || '',
        grade: grade || 'Lớp 12',
        school: school || 'THPT',
        role: 'student'
      };
    } else {
      regData = dataOrName;
    }

    const cleanUsername = regData.username.trim().toLowerCase();
    const cleanPassword = regData.password.trim();

    if (!cleanUsername) {
      return { success: false, message: 'Tên đăng nhập không được để trống!' };
    }
    if (cleanUsername.length < 3) {
      return { success: false, message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' };
    }
    if (!cleanPassword || cleanPassword.length < 3) {
      return { success: false, message: 'Mật khẩu phải có ít nhất 3 ký tự!' };
    }

    // Check if username already exists
    const exists = allUsers.some(u => u.username && u.username.toLowerCase() === cleanUsername);
    if (exists) {
      return { 
        success: false, 
        message: `Tên đăng nhập "${cleanUsername}" đã có người sử dụng. Vui lòng chọn tên khác!` 
      };
    }

    const isExplicitAdmin = regData.role === 'admin' || cleanUsername === 'admin';

    const newUser: User = {
      id: 'user-' + Date.now(),
      username: cleanUsername,
      password: cleanPassword,
      name: regData.name.trim() || cleanUsername,
      email: (regData.email || `${cleanUsername}@eduviet.vn`).trim().toLowerCase(),
      grade: regData.grade || 'Lớp 12',
      school: regData.school?.trim() || 'THPT',
      role: isExplicitAdmin ? 'admin' : 'student',
      savedDocuments: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedList = [...allUsers, newUser];
    setAllUsers(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(updatedList));
    } catch (e) {
      console.error(e);
    }

    // New user starts with empty exam history!
    setCurrentUser(newUser);
    setExamHistory([]);

    return { 
      success: true, 
      message: `Đăng ký tài khoản ${isExplicitAdmin ? 'Admin' : ''} thành công!` 
    };
  };

  const logout = () => {
    setCurrentUser(null);
    setExamHistory([]);
  };

  const loginAsDemo = (index: number) => {
    const demo = DEMO_USERS[index] || DEMO_USERS[1];
    setCurrentUser(demo);
  };

  // Quick helper to log in as Admin
  const loginAsAdmin = () => {
    const adminUser = allUsers.find(u => u.role === 'admin') || DEMO_USERS[0];
    setCurrentUser(adminUser);
  };

  const deleteUser = (userId: string) => {
    if (userId === 'user-admin') {
      alert('Không thể xóa tài khoản Quản trị viên gốc!');
      return;
    }
    const updated = allUsers.filter(u => u.id !== userId);
    setAllUsers(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleSaveDocument = (docId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    const currentSaved = currentUser.savedDocuments || [];
    const exists = currentSaved.includes(docId);
    const updatedDocs = exists
      ? currentSaved.filter(id => id !== docId)
      : [...currentSaved, docId];

    setCurrentUser({
      ...currentUser,
      savedDocuments: updatedDocs
    });
  };

  const isDocumentSaved = (docId: string): boolean => {
    return !!currentUser?.savedDocuments?.includes(docId);
  };

  const saveExamResult = (result: ExamResult) => {
    setExamHistory(prev => [result, ...prev]);
  };

  const getResultsForExam = (examId: string): ExamResult[] => {
    return examHistory.filter(r => r.examId === examId);
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        examHistory,
        allUsers,
        isAuthModalOpen,
        login,
        register,
        logout,
        loginAsDemo,
        loginAsAdmin,
        toggleSaveDocument,
        isDocumentSaved,
        saveExamResult,
        getResultsForExam,
        deleteUser,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
