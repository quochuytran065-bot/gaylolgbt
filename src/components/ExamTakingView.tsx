import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Exam, ChoiceKey, ExamResult, TrueFalseUserAnswer } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Clock, 
  Flag, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  RotateCcw,
  HelpCircle,
  Sparkles,
  Check,
  X,
  FileCheck,
  Calculator,
  Scissors,
  BookMarked
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { CasioCalculator } from './CasioCalculator';

interface ExamTakingViewProps {
  exam: Exam;
  onFinishExam: (result: ExamResult) => void;
  onCancelExam: () => void;
}

export const ExamTakingView: React.FC<ExamTakingViewProps> = ({ 
  exam, 
  onFinishExam, 
  onCancelExam 
}) => {
  const { currentUser } = useAuth();
  const toast = useToast();
  
  // Total duration in seconds
  const totalSeconds = exam.durationMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(totalSeconds);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // User answers by part type
  const [userAnswers, setUserAnswers] = useState<Record<number, ChoiceKey>>({});
  const [userTrueFalseAnswers, setUserTrueFalseAnswers] = useState<Record<number, TrueFalseUserAnswer>>({});
  const [userShortAnswers, setUserShortAnswers] = useState<Record<number, string>>({});

  // CBT Tools State: Flags, Eliminations, 4-Box Bubble Mask error
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<number, ChoiceKey[]>>({});
  const [bubbleErrorMsg, setBubbleErrorMsg] = useState<string>('');

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isTimeUpAlert, setIsTimeUpAlert] = useState<boolean>(false);
  const [isCalcOpen, setIsCalcOpen] = useState<boolean>(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState<boolean>(false);
  const [paletteFilter, setPaletteFilter] = useState<'all' | 'unanswered' | 'flagged'>('all');

  // Auto scroll top when changing question
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestionIndex]);

  // Submit test handler
  const handleSubmitExam = useCallback(() => {
    const timeSpent = totalSeconds - secondsRemaining;
    let totalEarnedScore = 0;
    let maxPossibleScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    let partIScore = 0;
    let partIIScore = 0;
    let partIIIScore = 0;

    const topicErrors: Record<string, number> = {};
    const categoryErrors: Record<string, number> = {
      'Lý thuyết': 0,
      'Tính toán': 0,
      'Bẫy đề thi': 0,
      'Phương pháp': 0
    };

    const isBGD = exam.isBGDFormat || exam.questions.some(q => q.part === 'I' || q.part === 'II' || q.part === 'III');

    exam.questions.forEach((q) => {
      const cat = q.errorCategory || 'Lý thuyết';
      const topic = q.topic || 'Kiến thức chung';

      if (q.type === 'true_false' || q.part === 'II') {
        // PHẦN II: Đúng / Sai chuẩn BGD (Tối đa 1.0 điểm / câu)
        maxPossibleScore += 1.0;
        const tfAns = userTrueFalseAnswers[q.id] || {};
        const items = q.trueFalseItems || [];
        let itemsCorrect = 0;
        let itemsAnswered = 0;

        items.forEach((item) => {
          const studentVal = tfAns[item.id];
          if (studentVal !== undefined) {
            itemsAnswered++;
            if (studentVal === item.correctAnswer) {
              itemsCorrect++;
            }
          }
        });

        if (itemsAnswered === 0) {
          unansweredCount++;
          categoryErrors[cat] = (categoryErrors[cat] || 0) + 1;
          topicErrors[topic] = (topicErrors[topic] || 0) + 1;
        } else {
          // Quy chuẩn điểm thi BGD Phần II (4 lệnh hỏi a, b, c, d):
          // Đúng 1 ý -> 0.1đ; Đúng 2 ý -> 0.25đ; Đúng 3 ý -> 0.5đ; Đúng cả 4 ý -> 1.0đ
          let qScore = 0;
          if (itemsCorrect === 1) qScore = 0.1;
          else if (itemsCorrect === 2) qScore = 0.25;
          else if (itemsCorrect === 3) qScore = 0.5;
          else if (itemsCorrect === 4) qScore = 1.0;

          totalEarnedScore += qScore;
          partIIScore += qScore;
          if (itemsCorrect === 4) {
            correctCount++;
          } else {
            incorrectCount++;
            categoryErrors[cat] = (categoryErrors[cat] || 0) + 1;
            topicErrors[topic] = (topicErrors[topic] || 0) + 1;
          }
        }
      } else if (q.type === 'short_answer' || q.part === 'III') {
        // PHẦN III: Trả lời ngắn điền số (Chuẩn BGD: 0.25đ/câu, 6 câu = 1.5đ)
        const qWeight = isBGD ? 0.25 : 1.0;
        maxPossibleScore += qWeight;
        const ans = userShortAnswers[q.id]?.trim();
        if (!ans) {
          unansweredCount++;
          categoryErrors[cat] = (categoryErrors[cat] || 0) + 1;
          topicErrors[topic] = (topicErrors[topic] || 0) + 1;
        } else {
          const target = q.shortAnswerCorrect?.trim() || '';
          const isMatch = ans.toLowerCase() === target.toLowerCase() || 
            (!isNaN(Number(ans)) && !isNaN(Number(target)) && Math.abs(Number(ans) - Number(target)) < 0.02);
          
          if (isMatch) {
            totalEarnedScore += qWeight;
            partIIIScore += qWeight;
            correctCount++;
          } else {
            incorrectCount++;
            categoryErrors[cat] = (categoryErrors[cat] || 0) + 1;
            topicErrors[topic] = (topicErrors[topic] || 0) + 1;
          }
        }
      } else {
        // PHẦN I: Trắc nghiệm 4 lựa chọn (Chuẩn BGD: 0.25đ/câu)
        const qWeight = isBGD ? 0.25 : 1.0;
        maxPossibleScore += qWeight;
        const ans = userAnswers[q.id];
        if (!ans) {
          unansweredCount++;
          categoryErrors[cat] = (categoryErrors[cat] || 0) + 1;
          topicErrors[topic] = (topicErrors[topic] || 0) + 1;
        } else if (ans === q.correctAnswer) {
          totalEarnedScore += qWeight;
          partIScore += qWeight;
          correctCount++;
        } else {
          incorrectCount++;
          categoryErrors[cat] = (categoryErrors[cat] || 0) + 1;
          topicErrors[topic] = (topicErrors[topic] || 0) + 1;
        }
      }
    });

    // Score on 10.0 scale (chuẩn quy đổi hoặc tính thẳng theo ma trận BGD)
    const rawScore = maxPossibleScore > 0 ? (totalEarnedScore / maxPossibleScore) * 10 : 0;
    const finalScore = Math.round(rawScore * 100) / 100;
    const scorePercentage = maxPossibleScore > 0 ? Math.round((totalEarnedScore / maxPossibleScore) * 100) : 0;

    // Actionable recommendations
    const recommendations: string[] = [];
    if (categoryErrors['Lý thuyết'] > 0) {
      recommendations.push(`Củng cố lại lý thuyết định nghĩa và tính chất cơ bản (sai ${categoryErrors['Lý thuyết']} câu dạng lý thuyết).`);
    }
    if (categoryErrors['Bẫy đề thi'] > 0) {
      recommendations.push(`Đọc kỹ điều kiện ràng buộc, tập xác định và dấu của đạo hàm để tránh rơi vào bẫy đề thi (mắc ${categoryErrors['Bẫy đề thi']} bẫy).`);
    }
    if (categoryErrors['Tính toán'] > 0) {
      recommendations.push(`Cải thiện tốc độ và sự cẩn thận khi bấm máy tính Casio và biến đổi phân số (sai ${categoryErrors['Tính toán']} câu do tính toán).`);
    }
    if (categoryErrors['Phương pháp'] > 0) {
      recommendations.push(`Luyện thêm các dạng bài ứng dụng thực tế và cực trị tối ưu để nắm vững phương pháp giải.`);
    }
    if (recommendations.length === 0) {
      recommendations.push(`Rất xuất sắc! Bạn nắm rất vững kiến thức và kỹ năng giải đề, hãy tiếp tục duy trì phong độ!`);
    }

    const todayStr = new Date().toISOString().split('T')[0];

    const result: ExamResult = {
      id: 'result-' + Date.now(),
      examId: exam.id,
      examTitle: exam.title,
      examCode: exam.examCode,
      subject: exam.subject,
      grade: exam.grade,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || 'Khách học tập',
      score: finalScore,
      scorePercentage,
      partScores: {
        partI: Math.round(partIScore * 100) / 100,
        partII: Math.round(partIIScore * 100) / 100,
        partIII: Math.round(partIIIScore * 100) / 100,
      },
      totalQuestions: exam.questions.length,
      correctCount,
      incorrectCount,
      unansweredCount,
      timeSpentSeconds: timeSpent,
      submittedAt: new Date().toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      dateKey: todayStr,
      userAnswers,
      userTrueFalseAnswers,
      userShortAnswers,
      questions: exam.questions,
      mistakeAnalysis: {
        topicErrors,
        categoryErrors,
        recommendations
      }
    };

    onFinishExam(result);
  }, [exam, secondsRemaining, totalSeconds, userAnswers, userTrueFalseAnswers, userShortAnswers, currentUser, onFinishExam]);

  // ── Anti-Drift Timestamp Timer & Crash Recovery (Chuẩn Module 1) ──
  const TIMER_STORAGE_KEY = `cbt_exam_endtime_${exam.id}`;
  const SESSION_STORAGE_KEY = `cbt_session_${exam.id}`;

  // 1. Crash recovery: Khôi phục phiên thi nếu F5 hoặc rớt mạng
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.userAnswers) setUserAnswers(parsed.userAnswers);
        if (parsed.userTrueFalseAnswers) setUserTrueFalseAnswers(parsed.userTrueFalseAnswers);
        if (parsed.userShortAnswers) setUserShortAnswers(parsed.userShortAnswers);
        if (parsed.flaggedQuestions) setFlaggedQuestions(parsed.flaggedQuestions);
        if (parsed.eliminatedOptions) setEliminatedOptions(parsed.eliminatedOptions);
        toast.info('Đã khôi phục bài làm', 'Toàn bộ câu trả lời trước đó đã được tự động phục hồi an toàn.');
      }
    } catch (e) {
      console.warn('Lỗi khôi phục session:', e);
    }
  }, [exam.id]);

  // 2. Debounced auto-save (200ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
          userAnswers,
          userTrueFalseAnswers,
          userShortAnswers,
          flaggedQuestions,
          eliminatedOptions
        }));
      } catch (e) {
        console.warn('Lỗi ghi nhớ LocalStorage:', e);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [userAnswers, userTrueFalseAnswers, userShortAnswers, flaggedQuestions, eliminatedOptions, exam.id]);

  // 3. Anti-drift countdown timer dựa trên mốc thời gian thực endTime
  useEffect(() => {
    let targetEndTime = 0;
    try {
      const savedEndTime = localStorage.getItem(TIMER_STORAGE_KEY);
      if (savedEndTime) {
        const parsed = Number(savedEndTime);
        if (parsed > Date.now()) {
          targetEndTime = parsed;
        }
      }
    } catch (e) { /* noop */ }

    if (!targetEndTime) {
      targetEndTime = Date.now() + totalSeconds * 1000;
      try {
        localStorage.setItem(TIMER_STORAGE_KEY, String(targetEndTime));
      } catch (e) { /* noop */ }
    }

    const updateTimer = () => {
      const remaining = Math.max(0, Math.floor((targetEndTime - Date.now()) / 1000));
      setSecondsRemaining(remaining);
      if (remaining <= 0) {
        setIsTimeUpAlert(true);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    // Chống đứng giờ khi chuyển tab hoặc mở ứng dụng khác trên Mobile
    const handleVisibility = () => {
      if (!document.hidden) updateTimer();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [exam.id, totalSeconds]);

  // 4. Toggle gạch bỏ đáp án nhiễu (Right click hoặc nút kéo)
  const toggleEliminateOption = (qId: number, optKey: ChoiceKey) => {
    setEliminatedOptions(prev => {
      const currentList = prev[qId] || [];
      const isElim = currentList.includes(optKey);
      const updated = isElim ? currentList.filter(k => k !== optKey) : [...currentList, optKey];
      // Nếu đang chọn đáp án này mà gạch bỏ thì hủy chọn
      if (!isElim && userAnswers[qId] === optKey) {
        setUserAnswers(curr => {
          const next = { ...curr };
          delete next[qId];
          return next;
        });
      }
      return { ...prev, [qId]: updated };
    });
  };

  // 5. Logic 4 Ô Phiếu Trả Lời Ngắn (4-Box Bubble Sheet Mask)
  const handleBubbleInputChange = (qId: number, pos: number, val: string) => {
    let char = val;
    if (char === ',') char = '.';

    let isValid = false;
    if (pos === 0 && (/[0-9\-]/.test(char) || char === '')) isValid = true;
    if ((pos === 1 || pos === 2) && (/[0-9\.]/.test(char) || char === '')) isValid = true;
    if (pos === 3 && (/[0-9]/.test(char) || char === '')) isValid = true;

    if (!isValid && char !== '') {
      setBubbleErrorMsg('Ký tự không hợp lệ! Ô 1 chỉ nhận số hoặc dấu "-", ô 2-3 nhận số hoặc dấu ".", ô 4 chỉ nhận số.');
      setTimeout(() => setBubbleErrorMsg(''), 3500);
      return;
    }

    setBubbleErrorMsg('');

    const currentStr = String(userShortAnswers[qId] || '');
    const chars = currentStr.padEnd(4, ' ').split('').slice(0, 4);
    chars[pos] = char || ' ';
    const newStr = chars.join('').trimEnd();

    setUserShortAnswers(prev => ({
      ...prev,
      [qId]: newStr
    }));

    // Tự động nhảy sang ô tiếp theo
    if (char && pos < 3) {
      const nextInput = document.getElementById(`bubble-box-${qId}-${pos + 1}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
    }
  };

  const handleBubbleKeyDown = (qId: number, pos: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const currentVal = (e.target as HTMLInputElement).value;
      if (!currentVal && pos > 0) {
        const prevInput = document.getElementById(`bubble-box-${qId}-${pos - 1}`) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  // Handle time up trigger
  useEffect(() => {
    if (isTimeUpAlert && secondsRemaining === 0) {
      setTimeout(() => {
        handleSubmitExam();
      }, 1500);
    }
  }, [isTimeUpAlert, secondsRemaining, handleSubmitExam]);

  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = exam.questions[currentQuestionIndex];
  const isFlagged = flaggedQuestions.includes(currentQuestion.id);

  // 4 Status Evaluation (Module 1 Tiêu Chuẩn 6)
  // Gray (unanswered) | Amber pulsating (incomplete 1-3 True/False) | Emerald (completed) | Purple/Red (flagged)
  const getQuestionStatus = useCallback((q: typeof exam.questions[0]): 'unanswered' | 'incomplete' | 'completed' | 'flagged' => {
    if (flaggedQuestions.includes(q.id)) return 'flagged';

    if (q.type === 'true_false' || q.part === 'II') {
      const tf = userTrueFalseAnswers[q.id] || {};
      const answeredItemsCount = Object.keys(tf).length;
      const totalItems = q.trueFalseItems?.length || 4;
      if (answeredItemsCount === 0) return 'unanswered';
      if (answeredItemsCount < totalItems) return 'incomplete';
      return 'completed';
    }

    if (q.type === 'short_answer' || q.part === 'III') {
      const val = userShortAnswers[q.id]?.trim();
      return val ? 'completed' : 'unanswered';
    }

    // Part I: multiple choice
    return userAnswers[q.id] ? 'completed' : 'unanswered';
  }, [flaggedQuestions, userTrueFalseAnswers, userShortAnswers, userAnswers]);

  // Helper check if question has any answer
  const isQuestionAnswered = useCallback((q: typeof exam.questions[0]) => {
    return getQuestionStatus(q) === 'completed' || getQuestionStatus(q) === 'incomplete';
  }, [getQuestionStatus]);

  // Keyboard navigation & shortcuts for Part I (A, B, C, D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitModalOpen || isTimeUpAlert) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        const currentQ = exam.questions[currentQuestionIndex];
        if (currentQ && (currentQ.type === 'multiple_choice' || (!currentQ.type && currentQ.options))) {
          setUserAnswers(prev => ({
            ...prev,
            [currentQ.id]: key as ChoiceKey
          }));
        }
      } else if (e.key === 'ArrowRight') {
        if (currentQuestionIndex < exam.questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex, exam.questions, isSubmitModalOpen, isTimeUpAlert]);

  const toggleFlag = (qId: number) => {
    setFlaggedQuestions(prev => {
      const willFlag = !prev.includes(qId);
      if (willFlag) {
        toast.info(`🚩 Đã gắn cờ câu ${currentQuestionIndex + 1}`, 'Bạn có thể lọc xem lại trước khi nộp bài');
      }
      return willFlag ? [...prev, qId] : prev.filter(id => id !== qId);
    });
  };

  const selectOption = (optKey: ChoiceKey) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optKey
    }));
  };

  const setTrueFalseAnswer = (itemId: 'a' | 'b' | 'c' | 'd', value: boolean) => {
    setUserTrueFalseAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...(prev[currentQuestion.id] || {}),
        [itemId]: value
      }
    }));
  };

  const setShortAnswer = (value: string) => {
    setUserShortAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const answeredCount = useMemo(() => {
    return exam.questions.filter(q => isQuestionAnswered(q)).length;
  }, [exam.questions, isQuestionAnswered]);

  const fullyCompletedCount = useMemo(() => {
    return exam.questions.filter(q => getQuestionStatus(q) === 'completed').length;
  }, [exam.questions, getQuestionStatus]);

  const incompleteCount = useMemo(() => {
    return exam.questions.filter(q => getQuestionStatus(q) === 'incomplete').length;
  }, [exam.questions, getQuestionStatus]);

  const unansweredCount = useMemo(() => {
    return exam.questions.filter(q => getQuestionStatus(q) === 'unanswered').length;
  }, [exam.questions, getQuestionStatus]);

  const remainingCount = exam.questions.length - answeredCount;

  // Warning thresholds
  const isLowTime = secondsRemaining <= 300; // < 5 minutes
  const isCriticalTime = secondsRemaining <= 60; // < 1 minute

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col pb-12 transition-colors">
      
      {/* Casio Calculator floating widget */}
      <CasioCalculator isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />

      {/* Sticky Test Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Exam Title & Subject */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc chắn muốn thoát khỏi bài thi? Kết quả hiện tại sẽ không được lưu.')) {
                  onCancelExam();
                }
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Thoát khỏi bài thi"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate font-heading">
                  {exam.title}
                </h2>
                {exam.examCode && (
                  <span className="px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 font-mono font-bold text-xs tracking-wider border border-sky-300 dark:border-sky-800">
                    {exam.examCode}
                  </span>
                )}
                {exam.isBGDFormat && (
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-bold text-[10px] tracking-wide uppercase border border-amber-200 dark:border-amber-800">
                    Chuẩn BGD 2025
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{exam.subject}</span>
                <span aria-hidden="true">·</span>
                <span>{exam.grade}</span>
                <span aria-hidden="true">·</span>
                <span>Câu {currentQuestionIndex + 1}/{exam.questions.length}</span>
              </div>
            </div>
          </div>

          {/* Countdown Clock & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Calculator Button */}
            <button
              onClick={() => setIsCalcOpen(c => !c)}
              title="Mở máy tính Casio FX-580VN X"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                isCalcOpen
                  ? 'bg-slate-800 dark:bg-slate-700 border-slate-600 text-cyan-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Máy tính</span>
            </button>

            {/* Live Countdown Timer */}
            <div 
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm sm:text-base transition-colors ${
                isCriticalTime
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-400 animate-pulse'
                  : isLowTime
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
                  : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              <Clock className={`w-4 h-4 ${isCriticalTime ? 'text-rose-600 dark:text-rose-400' : isLowTime ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`} />
              <span className="tabular-nums tracking-wider">{formatTime(secondsRemaining)}</span>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Nộp bài</span>
            </button>
          </div>

        </div>

        {/* Progress bar based on answered questions */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1">
          <div 
            className="bg-sky-600 h-1 transition-all duration-300"
            style={{ width: `${(answeredCount / exam.questions.length) * 100}%` }}
          />
        </div>
      </header>

      {/* Main Testing Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Area: Current Question Card (8 Cols on Desktop) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 sm:p-8 space-y-6 transition-colors">
            
            {/* Question Header & Flag control */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 font-bold text-xs font-mono">
                  CÂU {currentQuestionIndex + 1}
                </span>

                {/* BGD Part Indicator Badge */}
                {currentQuestion.part && (
                  <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${
                    currentQuestion.part === 'I' 
                      ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300'
                      : currentQuestion.part === 'II'
                      ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                      : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                  }`}>
                    {currentQuestion.part === 'I' && 'PHẦN I: TRẮC NGHIỆM 4 PHƯƠNG ÁN'}
                    {currentQuestion.part === 'II' && 'PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI'}
                    {currentQuestion.part === 'III' && 'PHẦN III: TRẢ LỜI NGẮN (ĐIỀN SỐ)'}
                  </span>
                )}

                {currentQuestion.topic && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline">
                    · Chuyên đề: {currentQuestion.topic}
                  </span>
                )}
              </div>

              <button
                onClick={() => toggleFlag(currentQuestion.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  isFlagged
                    ? 'bg-amber-50 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 font-semibold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{isFlagged ? 'Đã gắn cờ' : 'Đánh dấu xem lại'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              {currentQuestion.text}
            </div>

            {/* CASE 1: PART I - Multiple Choice (A, B, C, D) */}
            {(!currentQuestion.type || currentQuestion.type === 'multiple_choice') && currentQuestion.options && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-1">
                  <span>Chọn 1 trong 4 phương án (nhấn phím A, B, C, D để chọn nhanh):</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Scissors className="w-3.5 h-3.5 text-slate-400" />
                    <span>Chuột phải hoặc bấm kéo để gạch bỏ phương án nhiễu</span>
                  </span>
                </div>

                <div className="space-y-2.5">
                  {currentQuestion.options.map((option) => {
                    const isSelected = userAnswers[currentQuestion.id] === option.key;
                    const isEliminated = (eliminatedOptions[currentQuestion.id] || []).includes(option.key);

                    return (
                      <div
                        key={option.key}
                        className="group relative flex items-center gap-2"
                      >
                        <button
                          onClick={() => {
                            if (isEliminated) {
                              toggleEliminateOption(currentQuestion.id, option.key);
                            }
                            selectOption(option.key);
                          }}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            toggleEliminateOption(currentQuestion.id, option.key);
                          }}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                            isEliminated
                              ? 'opacity-40 line-through bg-slate-100/70 dark:bg-slate-900/60 border-dashed border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                              : isSelected
                              ? 'bg-sky-50/90 dark:bg-sky-950/60 border-sky-600 dark:border-sky-500 shadow-2xs text-slate-900 dark:text-slate-100 ring-1 ring-sky-600 dark:ring-sky-500'
                              : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/60 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <div 
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                              isEliminated
                                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 line-through'
                                : isSelected 
                                ? 'bg-sky-700 text-white shadow-2xs' 
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {option.key}
                          </div>
                          <div className={`text-sm sm:text-base font-normal pt-0.5 leading-snug flex-1 ${isEliminated ? 'line-through text-slate-400' : ''}`}>
                            {option.label}
                          </div>
                        </button>

                        {/* Nút gạch bỏ / khôi phục phương án nhiễu */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleEliminateOption(currentQuestion.id, option.key);
                          }}
                          title={isEliminated ? 'Khôi phục phương án này' : 'Gạch bỏ phương án nhiễu (Right click)'}
                          className={`p-2.5 rounded-xl border text-xs transition-colors shrink-0 cursor-pointer ${
                            isEliminated
                              ? 'bg-rose-50 dark:bg-rose-950/80 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-100'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-600 hover:border-rose-300 dark:hover:border-rose-700'
                          }`}
                        >
                          <Scissors className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CASE 2: PART II - True / False (4 Items a, b, c, d) */}
            {(currentQuestion.type === 'true_false' || currentQuestion.part === 'II') && currentQuestion.trueFalseItems && (
              <div className="space-y-4 pt-2">
                <div className="p-3 bg-amber-50/80 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>
                    <strong>Cấu trúc chuẩn BGD:</strong> Mỗi câu gồm 4 lệnh hỏi a, b, c, d. Đúng 1 ý: 0.1đ · Đúng 2 ý: 0.25đ · Đúng 3 ý: 0.5đ · Đúng cả 4 ý: 1.0đ.
                  </span>
                </div>

                <div className="space-y-3">
                  {currentQuestion.trueFalseItems.map((item) => {
                    const currentAnswer = userTrueFalseAnswers[currentQuestion.id]?.[item.id];

                    return (
                      <div 
                        key={item.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          currentAnswer !== undefined 
                            ? 'bg-slate-50/90 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700' 
                            : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                            {item.id})
                          </span>
                          <span className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-snug pt-0.5">
                            {item.text}
                          </span>
                        </div>

                        {/* True / False Toggle Buttons */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => setTrueFalseAnswer(item.id, true)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              currentAnswer === true
                                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400'
                                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-300'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>ĐÚNG</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setTrueFalseAnswer(item.id, false)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              currentAnswer === false
                                ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-400'
                                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/60 hover:text-rose-700 dark:hover:text-rose-300 hover:border-rose-300'
                            }`}
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>SAI</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CASE 3: PART III - Short Answer (Numerical Input - 4-Box Bubble Sheet Mask) */}
            {(currentQuestion.type === 'short_answer' || currentQuestion.part === 'III') && (
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-sky-50/80 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-900/60 text-xs text-sky-900 dark:text-sky-300 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-sky-700 dark:text-sky-400 shrink-0" />
                  <span>
                    <strong>Quy chuẩn Phiếu Trả Lời Ngắn Bộ GD&ĐT (Tối đa 4 ô ký tự):</strong> Ô 1 nhận dấu trừ (-) hoặc số; ô 2-3 nhận số hoặc dấu phẩy (,/.); ô 4 chỉ nhận số.
                  </span>
                </div>

                {bubbleErrorMsg && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 rounded-xl text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{bubbleErrorMsg}</span>
                  </div>
                )}

                <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Phiếu Trả Lời Ngắn (Đúng 4 Ô Ký Tự Chuẩn BGD):
                    </label>
                    <span className="text-[11px] font-mono text-slate-500">
                      Độ dài: {(userShortAnswers[currentQuestion.id] || '').length}/4 ô
                    </span>
                  </div>

                  {/* 4 Discrete Boxes */}
                  <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto">
                    {[0, 1, 2, 3].map((pos) => {
                      const curChar = (userShortAnswers[currentQuestion.id] || '')[pos] || '';
                      return (
                        <div key={pos} className="flex flex-col items-center gap-1.5">
                          <input
                            id={`bubble-box-${currentQuestion.id}-${pos}`}
                            type="text"
                            maxLength={1}
                            value={curChar === ' ' ? '' : curChar}
                            onChange={(e) => handleBubbleInputChange(currentQuestion.id, pos, e.target.value)}
                            onKeyDown={(e) => handleBubbleKeyDown(currentQuestion.id, pos, e)}
                            placeholder={pos === 0 ? '±/0' : pos === 1 || pos === 2 ? './0' : '0'}
                            className="w-full h-14 sm:h-16 text-center text-xl sm:text-2xl font-black font-mono rounded-xl border-2 border-slate-300 dark:border-slate-700 focus:border-sky-600 focus:ring-4 focus:ring-sky-100 dark:focus:ring-sky-950 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none transition-all shadow-xs"
                          />
                          <span className="text-[10px] font-mono text-slate-400 uppercase">
                            Ô {pos + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick clear and Result summary */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    {userShortAnswers[currentQuestion.id]?.trim() ? (
                      <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Giá trị ghi nhận: <strong className="font-mono text-sm underline">{userShortAnswers[currentQuestion.id]}</strong></span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Chưa nhập đáp số cho câu này</span>
                    )}

                    {userShortAnswers[currentQuestion.id] && (
                      <button
                        type="button"
                        onClick={() => setUserShortAnswers(prev => {
                          const n = { ...prev };
                          delete n[currentQuestion.id];
                          return n;
                        })}
                        className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Xóa nhập lại</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Nav inside question card: Prev / Next */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Câu trước</span>
              </button>

              <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline">
                Câu {currentQuestionIndex + 1} / {exam.questions.length}
              </span>

              {currentQuestionIndex < exam.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(exam.questions.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Câu kế tiếp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Hoàn thành & Nộp bài</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Right Area: Question Navigation Matrix (4 Cols on Desktop) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 space-y-4 sticky top-24 transition-colors">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-heading">
                Bảng danh sách câu hỏi
              </h3>
              <div className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">
                {answeredCount}/{exam.questions.length} đã làm
              </div>
            </div>

            {/* Status Legend - 4 Color Standards */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-600 shrink-0 shadow-2xs"></span>
                <span>Đã làm đủ ({fullyCompletedCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-400 border border-amber-500 animate-pulse shrink-0"></span>
                <span>Làm dở ({incompleteCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-purple-600 shrink-0"></span>
                <span>Gắn cờ ({flaggedQuestions.length})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0"></span>
                <span>Chưa làm ({unansweredCount})</span>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setPaletteFilter('all')}
                className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
                  paletteFilter === 'all'
                    ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Tất cả ({exam.questions.length})
              </button>
              <button
                type="button"
                onClick={() => setPaletteFilter('unanswered')}
                className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
                  paletteFilter === 'unanswered'
                    ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Chưa xong ({unansweredCount + incompleteCount})
              </button>
              <button
                type="button"
                onClick={() => setPaletteFilter('flagged')}
                className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
                  paletteFilter === 'flagged'
                    ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Gắn cờ ({flaggedQuestions.length})
              </button>
            </div>

            {/* Question Grid Buttons */}
            <div className="grid grid-cols-6 sm:grid-cols-5 gap-1.5 max-h-80 overflow-y-auto pr-1 hide-scrollbar">
              {exam.questions
                .map((q, idx) => ({ q, idx }))
                .filter(({ q }) => {
                  if (paletteFilter === 'unanswered') return getQuestionStatus(q) === 'unanswered' || getQuestionStatus(q) === 'incomplete';
                  if (paletteFilter === 'flagged') return flaggedQuestions.includes(q.id);
                  return true;
                })
                .map(({ q, idx }) => {
                const status = getQuestionStatus(q);
                const isCurrent = currentQuestionIndex === idx;
                const partColor = q.part === 'I' ? 'border-t-2 border-t-blue-400' :
                                  q.part === 'II' ? 'border-t-2 border-t-amber-400' :
                                  q.part === 'III' ? 'border-t-2 border-t-emerald-400' : '';

                let statusStyle = '';
                if (status === 'flagged') {
                  statusStyle = 'bg-purple-600 text-white shadow-xs hover:bg-purple-700 border-purple-700 font-bold';
                } else if (status === 'incomplete') {
                  statusStyle = 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border-2 border-amber-400 dark:border-amber-500 animate-pulse font-extrabold';
                } else if (status === 'completed') {
                  statusStyle = 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700';
                } else {
                  statusStyle = 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    title={`Câu ${idx + 1}${q.part ? ` • Phần ${q.part}` : ''}${status === 'completed' ? ' ✓ Đã hoàn thành' : status === 'incomplete' ? ' ⚠️ Đang làm dở' : ' • Chưa làm'}${status === 'flagged' ? ' 🚩 Đã gắn cờ' : ''}`}
                    className={`relative h-9 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 ${partColor} ${
                      isCurrent
                        ? 'ring-2 ring-sky-500 ring-offset-1 dark:ring-offset-slate-900 shadow-md font-black'
                        : ''
                    } ${statusStyle}`}
                  >
                    <span>{idx + 1}</span>
                    {status === 'flagged' && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white dark:border-slate-900 shadow-xs" />
                    )}
                    {status === 'incomplete' && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-amber-500 rounded-full border border-white dark:border-slate-700 animate-ping" />
                    )}
                    {status === 'completed' && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-300 rounded-full border border-white dark:border-slate-700" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick summary stats */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Đã làm đủ:</span>
                <strong className="text-emerald-700 dark:text-emerald-400">{fullyCompletedCount} câu</strong>
              </div>
              {incompleteCount > 0 && (
                <div className="flex justify-between text-amber-700 dark:text-amber-400">
                  <span>Làm dở (thiếu ý):</span>
                  <strong>{incompleteCount} câu</strong>
                </div>
              )}
              <div className="flex justify-between">
                <span>Chưa làm:</span>
                <strong className={unansweredCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}>
                  {unansweredCount} câu
                </strong>
              </div>
              {flaggedQuestions.length > 0 && (
                <div className="flex justify-between text-purple-700 dark:text-purple-400">
                  <span>Cần xem lại:</span>
                  <strong>{flaggedQuestions.length} câu</strong>
                </div>
              )}
            </div>

            {/* Submit CTA button */}
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Nộp bài & Xem kết quả</span>
            </button>

          </div>
        </div>

      </main>

      {/* Confirmation Modal Before Submission */}
      {isSubmitModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsSubmitModalOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150 transition-colors max-h-[calc(100dvh-2rem)] overflow-y-auto my-auto"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-heading">
                  Xác nhận nộp bài kiểm tra?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {exam.title}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Tổng số câu hỏi:</span>
                <strong className="text-slate-900 dark:text-slate-100">{exam.questions.length} câu</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Đã hoàn thành đủ:</span>
                <strong className="text-emerald-700 dark:text-emerald-400">{fullyCompletedCount} câu</strong>
              </div>
              {incompleteCount > 0 && (
                <div className="flex justify-between text-amber-700 dark:text-amber-400">
                  <span>Câu làm dở (Đúng/Sai thiếu ý):</span>
                  <strong>{incompleteCount} câu</strong>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Số câu chưa làm:</span>
                <strong className={unansweredCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}>
                  {unansweredCount} câu
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Thời gian làm bài còn:</span>
                <strong className="font-mono text-slate-900 dark:text-slate-100">{formatTime(secondsRemaining)}</strong>
              </div>
            </div>

            {(unansweredCount > 0 || incompleteCount > 0) && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg text-xs text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <span>
                  <strong>Cảnh báo nộp bài sớm:</strong> Bạn còn <strong>{unansweredCount}</strong> câu chưa làm
                  {incompleteCount > 0 ? ` và ${incompleteCount} câu Đúng/Sai chưa chọn đủ 4 ý` : ''}. Các câu/ý còn thiếu sẽ bị tính 0 điểm theo quy chuẩn GDPT 2018!
                </span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  handleSubmitExam();
                }}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                Xác nhận nộp bài
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auto Submit When Time Runs Out Alert */}
      {isTimeUpAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-6 text-center space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-heading">
                Đã hết thời gian làm bài!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Hệ thống đang tiến hành chấm điểm và lưu kết quả của bạn...
              </p>
            </div>
            <div className="w-8 h-8 border-3 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      )}

      {/* Mobile Sticky Question Grid Drawer Toggle Button */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsMobilePaletteOpen(true)}
          className="flex-1 py-3 px-4 bg-slate-900/90 dark:bg-slate-800/95 backdrop-blur-md text-white rounded-2xl shadow-xl border border-white/20 flex items-center justify-between font-bold text-xs active:scale-95 transition-all cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>📋 Bảng câu hỏi</span>
          </span>
          <span className="font-mono bg-white/20 px-2 py-0.5 rounded-lg text-emerald-300">
            {fullyCompletedCount}/{exam.questions.length} đã làm đủ
          </span>
        </button>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Nộp</span>
        </button>
      </div>

      {/* Mobile Question Palette Bottom Sheet Drawer */}
      {isMobilePaletteOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl max-h-[82vh] flex flex-col shadow-2xl p-5 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-heading">
                  Bảng danh sách câu hỏi
                </h3>
              </div>
              <button
                onClick={() => setIsMobilePaletteOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-[11px] font-semibold shrink-0">
              <button
                type="button"
                onClick={() => setPaletteFilter('all')}
                className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
                  paletteFilter === 'all'
                    ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-2xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                Tất cả ({exam.questions.length})
              </button>
              <button
                type="button"
                onClick={() => setPaletteFilter('unanswered')}
                className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
                  paletteFilter === 'unanswered'
                    ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-2xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                Chưa xong ({unansweredCount + incompleteCount})
              </button>
              <button
                type="button"
                onClick={() => setPaletteFilter('flagged')}
                className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
                  paletteFilter === 'flagged'
                    ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-2xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                Gắn cờ ({flaggedQuestions.length})
              </button>
            </div>

            {/* Question Grid Buttons */}
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 overflow-y-auto max-h-[50vh] p-1 hide-scrollbar">
              {exam.questions
                .map((q, idx) => ({ q, idx }))
                .filter(({ q }) => {
                  if (paletteFilter === 'unanswered') return getQuestionStatus(q) === 'unanswered' || getQuestionStatus(q) === 'incomplete';
                  if (paletteFilter === 'flagged') return flaggedQuestions.includes(q.id);
                  return true;
                })
                .map(({ q, idx }) => {
                const status = getQuestionStatus(q);
                const isCurrent = currentQuestionIndex === idx;
                const partColor = q.part === 'I' ? 'border-t-2 border-t-blue-400' :
                                  q.part === 'II' ? 'border-t-2 border-t-amber-400' :
                                  q.part === 'III' ? 'border-t-2 border-t-emerald-400' : '';

                let statusStyle = '';
                if (status === 'flagged') {
                  statusStyle = 'bg-purple-600 text-white shadow-xs font-bold';
                } else if (status === 'incomplete') {
                  statusStyle = 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border-2 border-amber-400 animate-pulse font-extrabold';
                } else if (status === 'completed') {
                  statusStyle = 'bg-emerald-600 text-white shadow-xs';
                } else {
                  statusStyle = 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestionIndex(idx);
                      setIsMobilePaletteOpen(false);
                    }}
                    className={`relative h-11 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center cursor-pointer active:scale-95 ${partColor} ${
                      isCurrent
                        ? 'ring-2 ring-sky-600 ring-offset-2 dark:ring-offset-slate-900 shadow-md font-black'
                        : ''
                    } ${statusStyle}`}
                  >
                    <span>{idx + 1}</span>
                    {status === 'flagged' && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white dark:border-slate-900 shadow-xs" />
                    )}
                    {status === 'incomplete' && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-amber-500 rounded-full border border-white dark:border-slate-700 animate-ping" />
                    )}
                    {status === 'completed' && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-300 rounded-full border border-white dark:border-slate-700" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span>Đã làm đủ: <strong className="text-slate-900 dark:text-slate-100">{fullyCompletedCount}/{exam.questions.length}</strong></span>
              <button
                onClick={() => {
                  setIsMobilePaletteOpen(false);
                  setIsSubmitModalOpen(true);
                }}
                className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl active:scale-95"
              >
                Nộp bài ngay
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
