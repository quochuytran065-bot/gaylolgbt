import React, { useState, useMemo } from 'react';
import { ExamResult, ChoiceKey, Question, Subject, GradeLevel, NotebookEntry } from '../types';
import { INITIAL_NOTEBOOK_ENTRIES } from '../data/learningPlatformData';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  ArrowLeft, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Share2,
  BookOpen,
  AlertTriangle,
  Sparkles,
  Target,
  TrendingDown,
  Brain,
  Check,
  X,
  FileCheck,
  Zap,
  BookmarkPlus,
  BookmarkCheck,
  Printer
} from 'lucide-react';

interface ExamResultViewProps {
  result: ExamResult;
  onRetake: () => void;
  onBackToList: () => void;
  onGoToDocuments: () => void;
  onStartRemedialExam?: (wrongQuestions: Question[]) => void;
  onStartNewBGDExam?: (subject?: Subject, grade?: GradeLevel) => void;
}

export const ExamResultView: React.FC<ExamResultViewProps> = ({ 
  result, 
  onRetake, 
  onBackToList,
  onGoToDocuments,
  onStartRemedialExam,
  onStartNewBGDExam
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [expandedExplanations, setExpandedExplanations] = useState<Record<number, boolean>>({});
  const [savedToNotebook, setSavedToNotebook] = useState<Record<number, boolean>>({});

  const handleSaveToNotebook = (q: Question, idx: number) => {
    try {
      const stored = localStorage.getItem('eduviet_notebook_entries');
      const list: NotebookEntry[] = stored ? JSON.parse(stored) : INITIAL_NOTEBOOK_ENTRIES;

      const newEntry: NotebookEntry = {
        id: `nb-${Date.now()}-${q.id}`,
        title: q.topic ? `${q.topic} - Câu ${idx + 1}` : `Câu hỏi trọng tâm số ${idx + 1}`,
        type: q.keyFormula ? 'formula' : 'difficult_question',
        subject: result.subject,
        grade: result.grade,
        content: q.text,
        keyFormula: q.keyFormula,
        explanation: q.explanation || q.mistakeAdvice,
        source: result.examTitle,
        mastered: false,
        createdAt: new Date().toISOString()
      };

      list.unshift(newEntry);
      localStorage.setItem('eduviet_notebook_entries', JSON.stringify(list));
      setSavedToNotebook(prev => ({ ...prev, [q.id]: true }));
    } catch {
      setSavedToNotebook(prev => ({ ...prev, [q.id]: true }));
    }
  };

  // Toggle explanation expansion
  const toggleExplanation = (qId: number) => {
    setExpandedExplanations(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Expand all / collapse all
  const expandAll = () => {
    const all: Record<number, boolean> = {};
    result.questions.forEach(q => { all[q.id] = true; });
    setExpandedExplanations(all);
  };

  const collapseAll = () => {
    setExpandedExplanations({});
  };

  // Format time spent into mm phút ss giây
  const formatTimeSpent = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes === 0) return `${seconds} giây`;
    return `${minutes} phút ${seconds} giây`;
  };

  // Evaluation text based on score
  const getRankInfo = (score: number) => {
    if (score >= 9.0) return { label: 'Xuất sắc', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', desc: 'Kiến thức rất vững vàng, tư duy nhanh nhạy và nắm chắc cấu trúc đề thi!' };
    if (score >= 8.0) return { label: 'Giỏi', color: 'text-sky-700 bg-sky-50 border-sky-200', desc: 'Nắm chắc kiến thức trọng tâm, chỉ sai một số câu bẫy nhỏ.' };
    if (score >= 6.5) return { label: 'Khá', color: 'text-blue-700 bg-blue-50 border-blue-200', desc: 'Cần chú ý ôn lại một số câu lý thuyết và rèn luyện kỹ năng bấm máy tính.' };
    if (score >= 5.0) return { label: 'Trung bình', color: 'text-amber-700 bg-amber-50 border-amber-200', desc: 'Cần dành thêm thời gian đọc lại tài liệu và làm lại đề thi để bù lấp lỗ hổng.' };
    return { label: 'Cần cố gắng', color: 'text-rose-700 bg-rose-50 border-rose-200', desc: 'Hãy xem lại bảng phân tích lỗi sai bên dưới và ôn tập kỹ từng chuyên đề.' };
  };

  const rank = getRankInfo(result.score);

  // Helper check whether question was answered correctly
  const checkQuestionCorrectness = (q: Question): boolean => {
    if (q.type === 'true_false' || q.part === 'II') {
      const userTF = result.userTrueFalseAnswers?.[q.id];
      if (!userTF) return false;
      const items = q.trueFalseItems || [];
      return items.every(item => userTF[item.id] === item.correctAnswer);
    }
    if (q.type === 'short_answer' || q.part === 'III') {
      const ans = result.userShortAnswers?.[q.id]?.trim();
      if (!ans) return false;
      const target = q.shortAnswerCorrect?.trim() || '';
      return ans.toLowerCase() === target.toLowerCase() || 
        (!isNaN(Number(ans)) && !isNaN(Number(target)) && Math.abs(Number(ans) - Number(target)) < 0.02);
    }
    return result.userAnswers[q.id] === q.correctAnswer;
  };

  // Filter questions
  const displayedQuestions = result.questions.filter(q => {
    const isCorrect = checkQuestionCorrectness(q);
    if (filterMode === 'correct') return isCorrect;
    if (filterMode === 'incorrect') return !isCorrect;
    return true;
  });

  // Calculate deep mistake analysis if not provided in result
  const mistakeAnalysis = useMemo(() => {
    if (result.mistakeAnalysis) return result.mistakeAnalysis;

    const topicErrors: Record<string, number> = {};
    const categoryErrors: Record<string, number> = {
      'Lý thuyết': 0,
      'Tính toán': 0,
      'Bẫy đề thi': 0,
      'Phương pháp': 0
    };

    result.questions.forEach((q) => {
      const isCorrect = checkQuestionCorrectness(q);
      if (!isCorrect) {
        const cat = q.errorCategory || 'Lý thuyết';
        const topic = q.topic || 'Kiến thức chung';
        categoryErrors[cat] = (categoryErrors[cat] || 0) + 1;
        topicErrors[topic] = (topicErrors[topic] || 0) + 1;
      }
    });

    const recommendations: string[] = [];
    if (categoryErrors['Lý thuyết'] > 0) {
      recommendations.push(`Hệ thống phát hiện ${categoryErrors['Lý thuyết']} câu sai về Lý thuyết. Hãy mở Sổ tay công thức để ôn lại các định nghĩa và tính chất cơ bản.`);
    }
    if (categoryErrors['Bẫy đề thi'] > 0) {
      recommendations.push(`Bạn đã mắc ${categoryErrors['Bẫy đề thi']} bẫy đề thi (điều kiện xác định, dấu đạo hàm, khoảng nghịch biến). Cần đọc kỹ từng từ trong câu hỏi.`);
    }
    if (categoryErrors['Tính toán'] > 0) {
      recommendations.push(`Có ${categoryErrors['Tính toán']} câu sai do tính toán hoặc bấm máy nhầm. Hãy luyện thói quen kiểm tra lại các bước đại số.`);
    }
    if (categoryErrors['Phương pháp'] > 0) {
      recommendations.push(`Cần luyện thêm dạng bài ứng dụng thực tế và bài toán tối ưu để nắm vững phương pháp giải.`);
    }
    if (recommendations.length === 0) {
      recommendations.push(`Tuyệt vời! Bạn không mắc lỗi sai đáng kể nào trong bài thi này.`);
    }

    return { topicErrors, categoryErrors, recommendations };
  }, [result]);

  const totalMistakes = result.incorrectCount + result.unansweredCount;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Back Button */}
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <button
          onClick={onBackToList}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách bài kiểm tra</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 border border-slate-700"
            title="In trực tiếp hoặc Lưu file PDF phiếu điểm"
          >
            <Printer className="w-4 h-4 text-sky-400" />
            <span>In / Xuất PDF Phiếu Điểm</span>
          </button>
        </div>
      </div>

      {/* Official Institutional Report Card Header (Print Only) */}
      <div className="print-only hidden p-6 text-center border-b-2 border-slate-900 mb-6 font-sans">
        <p className="text-[11px] uppercase font-bold tracking-widest text-slate-700">
          BỘ GIÁO DỤC VÀ ĐÀO TẠO · HỆ THỐNG KHẢO THÍ TRỰC TUYẾN TEST360 LMS
        </p>
        <h1 className="text-xl font-black uppercase mt-2 text-slate-900">
          PHIẾU BÁO ĐIỂM & ĐÁNH GIÁ NĂNG LỰC THI THỬ THPT
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Bài thi: <strong>{result.examTitle}</strong> {result.examCode ? `· Mã đề: ${result.examCode}` : ''} · Ngày nộp: {result.submittedAt}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs border-t border-b border-slate-300 py-2.5 text-left">
          <div><strong>Thí sinh:</strong> {result.userName}</div>
          <div><strong>Môn thi / Khối:</strong> {result.subject} ({result.grade})</div>
          <div><strong>Điểm số:</strong> <span className="font-bold text-base">{result.score.toFixed(2)}/10</span> ({result.scorePercentage}%)</div>
        </div>
      </div>

      {/* Main Score & Summary Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden transition-colors">
        
        {/* Top Header of Card */}
        <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-sky-200 font-semibold">
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-200 border border-sky-400/30">
                  {result.subject}
                </span>
                <span>·</span>
                <span>{result.grade}</span>
                <span>·</span>
                <span>Nộp lúc: {result.submittedAt}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                {result.examTitle}
              </h1>
              <p className="text-xs text-slate-300">
                Thí sinh: <strong>{result.userName}</strong>
              </p>
            </div>

            {/* Score Badge */}
            <div className="flex items-center sm:flex-col items-end sm:items-center justify-between sm:justify-center bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 shrink-0 shadow-lg">
              <span className="text-[11px] uppercase tracking-wider text-sky-200 font-semibold sm:mb-1">
                Điểm số đạt được
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
                  {result.score.toFixed(1)}
                </span>
                <span className="text-sm font-semibold text-sky-300">/ 10</span>
              </div>
              <span className="text-xs font-mono text-sky-200 mt-0.5">
                ({result.scorePercentage}%)
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-100 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800">
          
          <div className="p-4 sm:p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Số câu đúng</p>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
                {result.correctCount} / {result.totalQuestions}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Số câu sai / bỏ</p>
              <p className="text-lg font-bold text-rose-700 dark:text-rose-400 font-mono">
                {totalMistakes} câu
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Thời gian làm</p>
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                {formatTimeSpent(result.timeSpentSeconds)}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Xếp loại kết quả</p>
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                {rank.label}
              </p>
            </div>
          </div>

        </div>

        {/* BẢNG ĐIỂM CHI TIẾT THEO FORMAT BỘ GIÁO DỤC 2025 */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500/5 via-sky-500/5 to-indigo-500/5 dark:from-amber-500/10 dark:via-sky-500/10 dark:to-indigo-500/10 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-heading flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Bảng Điểm Thành Phần Chuẩn Bộ Giáo Dục & Đào Tạo 2025</span>
              </h3>
            </div>
            {result.examCode && (
              <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 font-mono font-bold text-xs border border-sky-300 dark:border-sky-800">
                MÃ ĐỀ: {result.examCode}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Phần I */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-blue-200/80 dark:border-blue-900/60 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wide">
                  Phần I: 18 Câu Trắc Nghiệm
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                  0.25đ / câu
                </span>
              </div>
              <div className="flex items-baseline gap-1 pt-1">
                <span className="text-2xl font-bold font-mono text-blue-700 dark:text-blue-400">
                  {result.partScores ? result.partScores.partI.toFixed(2) : '-'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ 4.50 điểm</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                18 câu trắc nghiệm 4 lựa chọn A, B, C, D
              </p>
            </div>

            {/* Phần II */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-amber-200/80 dark:border-amber-900/60 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                  Phần II: 4 Câu Đúng / Sai
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Bậc thang BGD
                </span>
              </div>
              <div className="flex items-baseline gap-1 pt-1">
                <span className="text-2xl font-bold font-mono text-amber-700 dark:text-amber-400">
                  {result.partScores ? result.partScores.partII.toFixed(2) : '-'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ 4.00 điểm</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                1 ý: 0.1đ · 2 ý: 0.25đ · 3 ý: 0.5đ · 4 ý: 1.0đ
              </p>
            </div>

            {/* Phần III */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-emerald-200/80 dark:border-emerald-900/60 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wide">
                  Phần III: 6 Câu Điền Số
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800">
                  0.25đ / câu
                </span>
              </div>
              <div className="flex items-baseline gap-1 pt-1">
                <span className="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
                  {result.partScores ? result.partScores.partIII.toFixed(2) : '-'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ 1.50 điểm</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                6 câu trả lời ngắn điền kết quả số học
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons inside card */}
        <div className="p-5 bg-slate-50/80 dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {rank.desc}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {totalMistakes > 0 && onStartRemedialExam && (
              <button
                onClick={() => {
                  const wrongQuestions = result.questions.filter(q => !checkQuestionCorrectness(q));
                  if (wrongQuestions.length > 0) {
                    onStartRemedialExam(wrongQuestions);
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <Target className="w-3.5 h-3.5" />
                <span>Luyện lại {totalMistakes} câu sai</span>
              </button>
            )}

            {onStartNewBGDExam && (
              <button
                onClick={() => onStartNewBGDExam(result.subject, result.grade)}
                className="px-3.5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sinh đề thi mới</span>
              </button>
            )}

            <button
              onClick={onGoToDocuments}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Đọc tài liệu ôn tập</span>
            </button>
            
            <button
              onClick={onRetake}
              className="px-4 py-2 rounded-xl border border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại bài này</span>
            </button>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* HỆ THỐNG PHÂN TÍCH ĐIỂM SỐ KHI SAI & CHUYÊN ĐỀ YẾU */}
      {/* ============================================================== */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6 transition-colors">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-sm">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-heading flex items-center gap-2">
                Hệ Thống Phân Tích Điểm Số Khi Sai
                <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 text-[10px] font-bold uppercase tracking-wider">
                  Chuyên Sâu
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Thống kê nguyên nhân mất điểm và định hướng khắc phục cụ thể theo từng phân loại lỗi.
              </p>
            </div>
          </div>

          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            Tổng số lỗi sai: <strong className="text-rose-600 dark:text-rose-400">{totalMistakes} câu</strong>
          </div>
        </div>

        {/* 4 Error Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Lý thuyết */}
          <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/30 dark:to-slate-800/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                Lý Thuyết
              </span>
              <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold font-mono text-xs flex items-center justify-center">
                {mistakeAnalysis.categoryErrors['Lý thuyết'] || 0}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
              Nhầm lẫn định nghĩa, tính chất, bảng công thức nguyên hàm hoặc tiệm cận.
            </p>
            <div className="pt-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
              {(mistakeAnalysis.categoryErrors['Lý thuyết'] || 0) > 0 ? '⚠️ Cần đọc lại SGK' : '✓ Nắm rất tốt'}
            </div>
          </div>

          {/* 2. Bẫy đề thi */}
          <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-gradient-to-b from-rose-50/50 to-white dark:from-rose-950/30 dark:to-slate-800/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                Bẫy Đề Thi
              </span>
              <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold font-mono text-xs flex items-center justify-center">
                {mistakeAnalysis.categoryErrors['Bẫy đề thi'] || 0}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
              Bỏ quên tập xác định mẫu khác 0, nghiệm bội chẵn của đạo hàm, khoảng đồng biến.
            </p>
            <div className="pt-1 text-[11px] font-semibold text-rose-700 dark:text-rose-400">
              {(mistakeAnalysis.categoryErrors['Bẫy đề thi'] || 0) > 0 ? '⚠️ Cần đọc kỹ từ khóa' : '✓ Rất tỉnh táo'}
            </div>
          </div>

          {/* 3. Tính toán */}
          <div className="p-4 rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-gradient-to-b from-sky-50/50 to-white dark:from-sky-950/30 dark:to-slate-800/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider">
                Tính Toán
              </span>
              <span className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold font-mono text-xs flex items-center justify-center">
                {mistakeAnalysis.categoryErrors['Tính toán'] || 0}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
              Nhầm dấu âm/dương, sai số khi bấm máy tính Casio hoặc quy đồng mẫu thức.
            </p>
            <div className="pt-1 text-[11px] font-semibold text-sky-700 dark:text-sky-400">
              {(mistakeAnalysis.categoryErrors['Tính toán'] || 0) > 0 ? '⚠️ Cần kiểm tra lại dấu' : '✓ Tính toán chuẩn'}
            </div>
          </div>

          {/* 4. Phương pháp */}
          <div className="p-4 rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/30 dark:to-slate-800/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider">
                Phương Pháp
              </span>
              <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-bold font-mono text-xs flex items-center justify-center">
                {mistakeAnalysis.categoryErrors['Phương pháp'] || 0}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
              Chưa định hình được hướng giải câu hỏi vận dụng hoặc bài toán tối ưu thực tế.
            </p>
            <div className="pt-1 text-[11px] font-semibold text-purple-700 dark:text-purple-400">
              {(mistakeAnalysis.categoryErrors['Phương pháp'] || 0) > 0 ? '⚠️ Cần luyện thêm đề' : '✓ Tư duy chuẩn'}
            </div>
          </div>

        </div>

        {/* Chuyên đề có lỗi sai */}
        {Object.keys(mistakeAnalysis.topicErrors).length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Xếp Hạng Chuyên Đề Cần Ôn Tập Lại:
            </h3>
            <div className="space-y-2">
              {Object.entries(mistakeAnalysis.topicErrors).map(([topicName, errorCount]) => (
                <div key={topicName} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">{topicName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">Sai {errorCount} câu</span>
                    <button
                      onClick={onGoToDocuments}
                      className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-sky-700 dark:text-sky-300 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-600 transition-colors cursor-pointer"
                    >
                      Đọc tài liệu ôn tập
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lời khuyên khắc phục */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/40 border border-sky-200/80 dark:border-sky-900/60 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-900 dark:text-sky-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Định Hướng Khắc Phục Từ Hệ Thống EduViet:</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pl-4 list-disc">
            {mistakeAnalysis.recommendations.map((rec, i) => (
              <li key={i} className="leading-relaxed">
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Nút hành động tạo đề khắc phục lỗ hổng & sinh đề ngẫu nhiên mới */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          {totalMistakes > 0 && onStartRemedialExam && (
            <button
              onClick={() => {
                const wrongQuestions = result.questions.filter(q => !checkQuestionCorrectness(q));
                if (wrongQuestions.length > 0) {
                  onStartRemedialExam(wrongQuestions);
                }
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Target className="w-4 h-4 text-white" />
              <span>🎯 Luyện Lại Các Câu Làm Sai ({totalMistakes} câu - Chuẩn BGD)</span>
            </button>
          )}

          {onStartNewBGDExam && (
            <button
              onClick={() => onStartNewBGDExam(result.subject, result.grade)}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>🎲 Sinh Đề Mới Riêng Biệt (Mã Đề Khác)</span>
            </button>
          )}
        </div>

      </div>

      {/* ============================================================== */}
      {/* XEM LẠI ĐÁP ÁN & LỜI GIẢI CHI TIẾT */}
      {/* ============================================================== */}
      <div className="space-y-4">
        
        {/* Controls Bar for Review */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 font-heading">
              Xem Lại Đáp Án & Lời Giải Chi Tiết
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Đối chiếu bài làm của bạn với đáp án chuẩn và phương pháp giải từng bước.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  filterMode === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Tất cả ({result.questions.length})
              </button>
              <button
                onClick={() => setFilterMode('incorrect')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  filterMode === 'incorrect'
                    ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-400 shadow-2xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Câu sai / bỏ ({totalMistakes})
              </button>
              <button
                onClick={() => setFilterMode('correct')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  filterMode === 'correct'
                    ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-2xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Câu đúng ({result.correctCount})
              </button>
            </div>

            {/* Expand / Collapse all toggle */}
            <button
              onClick={() => {
                const areAllExpanded = Object.keys(expandedExplanations).length === result.questions.length;
                if (areAllExpanded) collapseAll();
                else expandAll();
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium transition-colors cursor-pointer hidden sm:flex items-center gap-1"
              title="Mở hoặc thu gọn tất cả lời giải"
            >
              <span>{Object.keys(expandedExplanations).length === result.questions.length ? 'Thu gọn' : 'Mở tất cả'}</span>
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {displayedQuestions.map((q, idx) => {
            const isCorrect = checkQuestionCorrectness(q);
            const isExpanded = expandedExplanations[q.id] ?? true;

            return (
              <div 
                key={q.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all p-5 sm:p-6 space-y-4 shadow-xs ${
                  isCorrect
                    ? 'border-emerald-200/80 dark:border-emerald-900/60 hover:border-emerald-300 dark:hover:border-emerald-700'
                    : 'border-rose-200/80 dark:border-rose-900/60 hover:border-rose-300 dark:hover:border-rose-700'
                }`}
              >
                
                {/* Header row of question review */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-md font-mono font-bold text-xs ${
                      isCorrect 
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300' 
                        : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                    }`}>
                      CÂU {idx + 1}
                    </span>

                    {q.part && (
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[11px]">
                        Phần {q.part}
                      </span>
                    )}

                    {q.errorCategory && (
                      <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[11px] font-medium">
                        Dạng: {q.errorCategory}
                      </span>
                    )}

                    {q.topic && (
                      <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline">
                        · {q.topic}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <button
                      onClick={() => handleSaveToNotebook(q, idx)}
                      disabled={savedToNotebook[q.id]}
                      className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all text-xs cursor-pointer ${
                        savedToNotebook[q.id]
                          ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-bold'
                          : 'bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-800 border-slate-200 dark:border-slate-700'
                      }`}
                      title="Lưu câu hỏi và phương pháp giải vào Sổ tay cá nhân để ôn lại"
                    >
                      {savedToNotebook[q.id] ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>Đã lưu sổ tay</span>
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                          <span>Lưu sổ tay</span>
                        </>
                      )}
                    </button>

                    {isCorrect ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Chính xác</span>
                      </span>
                    ) : (
                      <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-800">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Chưa chính xác</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Question content */}
                <div className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                  {q.text}
                </div>

                {/* CASE 1: Multiple choice review */}
                {(!q.type || q.type === 'multiple_choice') && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {q.options.map((opt) => {
                      const isStudentSelected = result.userAnswers[q.id] === opt.key;
                      const isCorrectKey = q.correctAnswer === opt.key;

                      let stateClass = 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200';
                      if (isCorrectKey) {
                        stateClass = 'bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-500 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-400 dark:ring-emerald-700';
                      } else if (isStudentSelected && !isCorrectKey) {
                        stateClass = 'bg-rose-50/90 dark:bg-rose-950/60 border-rose-400 dark:border-rose-600 text-rose-900 dark:text-rose-200 font-medium line-through';
                      }

                      return (
                        <div 
                          key={opt.key}
                          className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 transition-colors ${stateClass}`}
                        >
                          <span className={`w-6 h-6 rounded-md font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                            isCorrectKey 
                              ? 'bg-emerald-600 dark:bg-emerald-700 text-white' 
                              : isStudentSelected 
                              ? 'bg-rose-600 dark:bg-rose-700 text-white' 
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}>
                            {opt.key}
                          </span>
                          <span className="pt-0.5 leading-snug flex-1">
                            {opt.label}
                          </span>
                          {isCorrectKey && (
                            <span className="text-emerald-700 dark:text-emerald-400 text-xs font-bold shrink-0 self-center">
                              ✓ Đáp án đúng
                            </span>
                          )}
                          {isStudentSelected && !isCorrectKey && (
                            <span className="text-rose-700 dark:text-rose-400 text-xs font-bold shrink-0 self-center">
                              ✗ Bạn đã chọn
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* CASE 2: True/False review */}
                {(q.type === 'true_false' || q.part === 'II') && q.trueFalseItems && (
                  <div className="space-y-2 pt-1">
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Chi Tiết Đánh Giá Từng Ý:
                    </p>
                    <div className="space-y-2">
                      {q.trueFalseItems.map((item) => {
                        const studentChoice = result.userTrueFalseAnswers?.[q.id]?.[item.id];
                        const isItemRight = studentChoice === item.correctAnswer;

                        return (
                          <div 
                            key={item.id}
                            className={`p-3 rounded-xl border text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-colors ${
                              isItemRight 
                                ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60' 
                                : 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60'
                            }`}
                          >
                            <div className="flex items-start gap-2.5 flex-1">
                              <span className="font-mono font-bold text-slate-700 dark:text-slate-300 shrink-0">
                                {item.id})
                              </span>
                              <span className="text-slate-800 dark:text-slate-200 leading-snug">
                                {item.text}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 text-xs font-medium">
                              <span className="text-slate-600 dark:text-slate-400">
                                Bạn chọn: <strong className="text-slate-800 dark:text-slate-200">{studentChoice === true ? 'ĐÚNG' : studentChoice === false ? 'SAI' : 'Chưa chọn'}</strong>
                              </span>
                              <span className="text-slate-400">·</span>
                              <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                                Đáp án: {item.correctAnswer ? 'ĐÚNG' : 'SAI'}
                              </span>
                              <span className="text-slate-400">·</span>
                              <span className={`font-bold ${isItemRight ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                {isItemRight ? '✓ Đúng' : '✗ Sai'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* CASE 3: Short answer review */}
                {(q.type === 'short_answer' || q.part === 'III') && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Câu trả lời của bạn:</span>
                      <strong className={`font-mono text-sm ${isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                        {result.userShortAnswers?.[q.id] || '(Chưa nhập)'}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                      <span className="text-slate-600 dark:text-slate-400">Đáp án chuẩn:</span>
                      <strong className="font-mono text-sm text-emerald-700 dark:text-emerald-400">
                        {q.shortAnswerCorrect}
                      </strong>
                    </div>
                  </div>
                )}

                {/* CHÚ THÍCH: BẠN SAI Ở ĐÂU & BẪY THƯỜNG GẶP */}
                {!isCorrect && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50/80 via-amber-50/60 to-white dark:from-rose-950/40 dark:via-amber-950/30 dark:to-slate-800/80 border border-rose-200 dark:border-rose-900/70 space-y-2.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span>Chú Thích: Bạn Sai Ở Đâu & Bẫy Thường Gặp</span>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed pl-6 space-y-1.5">
                      {/* Reason why wrong based on question type */}
                      {q.part === 'I' || (!q.type || q.type === 'multiple_choice') ? (
                        <>
                          {result.userAnswers[q.id] ? (
                            <p>
                              <strong className="text-rose-700 dark:text-rose-400">Tại sao chọn phương án {result.userAnswers[q.id]} là chưa đúng: </strong>
                              {q.whyWrongMap?.[result.userAnswers[q.id]] || 
                                `Phương án ${result.userAnswers[q.id]} là phương án nhiễu thường gặp trong các đề thi của Bộ GD&ĐT do bỏ sót điều kiện xác định hoặc nhầm lẫn tính chất.`}
                            </p>
                          ) : (
                            <p className="text-rose-700 dark:text-rose-400 font-semibold">
                              Bạn đã bỏ trống câu hỏi này chưa đưa ra phương án lựa chọn.
                            </p>
                          )}
                        </>
                      ) : q.part === 'II' || q.type === 'true_false' ? (
                        <p>
                          <strong className="text-rose-700 dark:text-rose-400">Nguyên nhân mất điểm Phần II: </strong>
                          Theo quy chế tính điểm bậc thang của Bộ GD&ĐT (1 ý đúng = 0.1đ, 2 ý = 0.25đ, 3 ý = 0.5đ, 4 ý = 1.0đ), bạn chưa chọn chính xác đồng thời cả 4 ý của câu hỏi này. Hãy rà soát lại các mệnh đề có dấu '✗ Sai' ở bảng trên để nắm chắc căn cứ chứng minh.
                        </p>
                      ) : (
                        <p>
                          <strong className="text-rose-700 dark:text-rose-400">Nguyên nhân mất điểm Phần III: </strong>
                          {result.userShortAnswers?.[q.id] 
                            ? `Bạn đã điền kết quả "${result.userShortAnswers[q.id]}" trong khi đáp án chuẩn là "${q.shortAnswerCorrect}". Lỗi thường gặp: nhầm dấu, sai số làm tròn hoặc bấm máy tính nhầm thứ tự phép tính.`
                            : `Bạn chưa điền đáp số cho câu hỏi trả lời ngắn này.`}
                        </p>
                      )}

                      {/* Advice & Common Traps */}
                      {q.mistakeAdvice && (
                        <p className="text-amber-800 dark:text-amber-300 flex items-start gap-1.5 pt-0.5">
                          <span className="font-bold shrink-0">💡 Lời khuyên & cạm bẫy:</span>
                          <span>{q.mistakeAdvice}</span>
                        </p>
                      )}

                      {/* Key Formula */}
                      {q.keyFormula && (
                        <div className="mt-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-200/80 dark:border-amber-900/60 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-start gap-2 shadow-2xs">
                          <span className="font-bold text-amber-800 dark:text-amber-400 shrink-0 font-sans">🔑 Công thức cốt lõi:</span>
                          <span className="text-sky-900 dark:text-sky-300 font-semibold">{q.keyFormula}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Explanation toggle & content */}
                <div className="pt-2">
                  <button
                    onClick={() => toggleExplanation(q.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Ẩn lời giải chi tiết' : 'Xem lời giải chi tiết'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-1.5 animate-in fade-in duration-150">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Phương pháp & Lời giải:</span>
                      </p>
                      <p className="whitespace-pre-line text-slate-800 dark:text-slate-200">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
