import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X, Trophy } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'achievement';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  achievement: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5" />,
  error: <XCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
  achievement: <Trophy className="w-5 h-5" />,
};

const COLORS: Record<ToastType, { bg: string; border: string; icon: string; progress: string }> = {
  success: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/80',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900',
    progress: 'bg-emerald-500',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-950/80',
    border: 'border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900',
    progress: 'bg-red-500',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-950/80',
    border: 'border-amber-200 dark:border-amber-800',
    icon: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900',
    progress: 'bg-amber-500',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/80',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900',
    progress: 'bg-blue-500',
  },
  achievement: {
    bg: 'bg-violet-50 dark:bg-violet-950/80',
    border: 'border-violet-300 dark:border-violet-700',
    icon: 'text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900',
    progress: 'bg-gradient-to-r from-violet-500 to-amber-500',
  },
};

const ToastItem: React.FC<{ toast: Toast; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  const colors = COLORS[toast.type];
  const duration = toast.duration ?? 4000;

  return (
    <div
      className={`
        flex items-start gap-3 w-full max-w-sm rounded-2xl border shadow-xl backdrop-blur-md p-4
        ${colors.bg} ${colors.border}
        animate-[slideInRight_0.3s_ease-out]
      `}
      style={{ animationFillMode: 'both' }}
    >
      {/* Icon */}
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colors.icon}`}>
        {ICONS[toast.type]}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
          {toast.title}
        </p>
        {toast.message && (
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
            {toast.message}
          </p>
        )}
      </div>

      {/* Close */}
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 w-6 h-6 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Auto-dismiss progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl overflow-hidden">
        <div
          className={`h-full ${colors.progress} origin-left`}
          style={{
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    const newToast: Toast = { ...toast, id };
    setToasts(prev => [newToast, ...prev].slice(0, 5)); // max 5 toasts

    const duration = toast.duration ?? 4000;
    setTimeout(() => dismissToast(id), duration);
  }, [dismissToast]);

  const success = useCallback((title: string, message?: string) => showToast({ type: 'success', title, message }), [showToast]);
  const error = useCallback((title: string, message?: string) => showToast({ type: 'error', title, message }), [showToast]);
  const warning = useCallback((title: string, message?: string) => showToast({ type: 'warning', title, message }), [showToast]);
  const info = useCallback((title: string, message?: string) => showToast({ type: 'info', title, message }), [showToast]);
  const achievement = useCallback((title: string, message?: string) => showToast({ type: 'achievement', title, message, duration: 6000 }), [showToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast, success, error, warning, info, achievement }}>
      {children}
      {/* Toast Container */}
      <div
        className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 items-end"
        style={{ maxWidth: '24rem' }}
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map(toast => (
          <div key={toast.id} className="relative w-full">
            <ToastItem toast={toast} onDismiss={dismissToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
