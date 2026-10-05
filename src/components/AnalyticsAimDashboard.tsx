import React, { useState, useEffect, useMemo } from 'react';
import { StudyGoal, DailyStats, SubjectOverview, ExamResult, Subject, Exam } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Target, 
  Flame, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Award, 
  BookOpen, 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  ArrowUpRight, 
  Edit3, 
  Sparkles,
  AlertCircle,
  Play,
  RotateCcw,
  Check,
  X,
  Info
} from 'lucide-react';
import { DEFAULT_STUDY_GOAL } from '../data/mockData';

interface AnalyticsAimDashboardProps {
  onStartExam: (exam: Exam) => void;
  exams: Exam[];
  onSelectTab: (tab: 'home' | 'documents' | 'exams' | 'analytics') => void;
  onViewResult: (result: ExamResult) => void;
  studyGoal?: StudyGoal;
  onUpdateGoal?: (goal: StudyGoal) => void;
}

const ALL_SUBJECTS: Subject[] = [
  'Toán học',
  'Vật lý',
  'Hóa học',
  'Sinh học',
  'Tiếng Anh',
  'Ngữ văn',
  'Lịch sử',
  'Tin học'
];

export const AnalyticsAimDashboard: React.FC<AnalyticsAimDashboardProps> = ({
  onStartExam,
  exams,
  onSelectTab,
  onViewResult,
  studyGoal: propStudyGoal,
  onUpdateGoal
}) => {
  const { examHistory, currentUser } = useAuth();
  const hasExamData = examHistory.length > 0;

  // Real-time current date and clock
  const [currentDateTime, setCurrentDateTime] = useState<string>(() => {
    return new Date().toLocaleString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Internal Study Goal fallback
  const [internalGoal, setInternalGoal] = useState<StudyGoal>(() => {
    try {
      const saved = localStorage.getItem('eduviet_study_goal');
      if (saved) {
        const parsed: StudyGoal = JSON.parse(saved);
        if (new Date(parsed.targetDate).getTime() < Date.now() || parsed.targetDate.includes('2027-06-25')) {
          localStorage.setItem('eduviet_study_goal', JSON.stringify(DEFAULT_STUDY_GOAL));
          return DEFAULT_STUDY_GOAL;
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_STUDY_GOAL;
  });

  const activeGoal = propStudyGoal || internalGoal;

  const [isEditGoalModalOpen, setIsEditGoalModalOpen] = useState(false);
  const [editFormGoal, setEditFormGoal] = useState<StudyGoal>(activeGoal);

  // Keep form in sync when activeGoal changes
  useEffect(() => {
    setEditFormGoal(activeGoal);
  }, [activeGoal]);

  // Time remaining state for countdown
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  // Update countdown every second
  useEffect(() => {
    const updateCountdown = () => {
      const targetTime = new Date(activeGoal.targetDate).getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds, isPast: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [activeGoal.targetDate]);

  // Handle saving customized goal
  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateGoal) {
      onUpdateGoal(editFormGoal);
    } else {
      setInternalGoal(editFormGoal);
      try {
        localStorage.setItem('eduviet_study_goal', JSON.stringify(editFormGoal));
      } catch {
        // ignore
      }
    }
    setIsEditGoalModalOpen(false);
  };

  // Cross-Subject Overviews calculated dynamically from user's actual exam history
  const subjectOverviews: SubjectOverview[] = useMemo(() => {
    return ALL_SUBJECTS.map((subj) => {
      const subjExams = examHistory.filter(h => h.subject === subj);
      if (subjExams.length === 0) {
        return {
          subject: subj,
          examsTaken: 0,
          averageScore: 0,
          highestScore: 0,
          accuracyRate: 0,
          strengthLevel: 'Chưa thi' as const
        };
      }

      const sumScore = subjExams.reduce((acc, h) => acc + h.score, 0);
      const avg = Math.round((sumScore / subjExams.length) * 10) / 10;
      const highest = Math.max(...subjExams.map(h => h.score));
      const totalQ = subjExams.reduce((acc, h) => acc + (h.totalQuestions || 0), 0);
      const correctQ = subjExams.reduce((acc, h) => acc + (h.correctCount || 0), 0);
      const acc = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0;
      
      let strength: 'Thế mạnh' | 'Ổn định' | 'Cần cải thiện' = 'Ổn định';
      if (avg >= 8.5) strength = 'Thế mạnh';
      else if (avg < 7.5) strength = 'Cần cải thiện';

      return {
        subject: subj,
        examsTaken: subjExams.length,
        averageScore: avg,
        highestScore: highest,
        accuracyRate: acc,
        strengthLevel: strength
      };
    });
  }, [examHistory]);

  // Overall current average score across all user exams
  const currentOverallScore = useMemo(() => {
    if (!hasExamData) return null;
    const sum = examHistory.reduce((acc, h) => acc + h.score, 0);
    return Math.round((sum / examHistory.length) * 10) / 10;
  }, [examHistory, hasExamData]);

  // Gap between target score and current score
  const scoreGap = useMemo(() => {
    if (currentOverallScore === null) return null;
    const diff = activeGoal.targetScore - currentOverallScore;
    return Math.round(diff * 10) / 10;
  }, [activeGoal.targetScore, currentOverallScore]);

  // Subject filter
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<'all' | 'Thế mạnh' | 'Ổn định' | 'Cần cải thiện' | 'Chưa thi'>('all');
  const filteredSubjects = useMemo(() => {
    if (selectedSubjectFilter === 'all') return subjectOverviews;
    return subjectOverviews.filter(s => s.strengthLevel === selectedSubjectFilter);
  }, [subjectOverviews, selectedSubjectFilter]);

  // 7-day stats calculated dynamically from actual user activity
  const dailyStats: DailyStats[] = useMemo(() => {
    const days: DailyStats[] = [];
    const dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const isToday = i === 0;
      const dayLabel = isToday ? 'Hôm nay' : dayNames[d.getDay()];

      const examsOnDay = examHistory.filter(h => {
        if (!h.submittedAt) return false;
        return h.submittedAt.split('T')[0] === dateStr;
      });

      const examsCount = examsOnDay.length;
      const questionsSolved = examsOnDay.reduce((acc, h) => acc + (h.totalQuestions || 0), 0);
      const avgScore = examsCount > 0
        ? Math.round((examsOnDay.reduce((acc, h) => acc + h.score, 0) / examsCount) * 10) / 10
        : 0;
      const studyTime = Math.round(examsOnDay.reduce((acc, h) => acc + (h.timeSpentSeconds || 0), 0) / 60);

      days.push({
        date: dateStr,
        dayLabel,
        examsCount,
        questionsSolved,
        averageScore: avgScore,
        studyTimeMinutes: studyTime
      });
    }

    return days;
  }, [examHistory]);

  const todayStats = dailyStats[dailyStats.length - 1];
  const todayQuestions = todayStats.questionsSolved;
  const todayPercent = Math.round((todayQuestions / activeGoal.dailyQuestionsTarget) * 100);

  // Overall metric totals
  const totalQuestionsSolved = useMemo(() => {
    return examHistory.reduce((acc, h) => acc + (h.totalQuestions || 0), 0);
  }, [examHistory]);

  const totalExamsCompleted = examHistory.length;

  const totalStudyTimeMinutes = useMemo(() => {
    return Math.round(examHistory.reduce((acc, h) => acc + (h.timeSpentSeconds || 0), 0) / 60);
  }, [examHistory]);

  // Real consecutive active streak
  const streakDays = useMemo(() => {
    if (!hasExamData) return 0;
    let streak = 0;
    for (let i = dailyStats.length - 1; i >= 0; i--) {
      if (dailyStats[i].examsCount > 0) {
        streak++;
      } else {
        if (i === dailyStats.length - 1) {
          continue; // Today not finished yet
        }
        break;
      }
    }
    return streak;
  }, [dailyStats, hasExamData]);

  return (
    <div className="space-y-10 pb-16">
      
      {/* ============================================================== */}
      {/* 1. HERO TARGET & LIVE COUNTDOWN CARD */}
      {/* ============================================================== */}
      <section className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-white overflow-hidden shadow-xl border border-sky-900/40 p-6 sm:p-10">
        
        {/* Subtle decorative glow elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          
          {/* Top Row: Title, Tag, and Edit Target Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 font-bold text-xs tracking-wider uppercase flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-sky-400" />
                  MỤC TIÊU ĐIỂM SỐ & KẾ HOẠCH BỨT PHÁ
                </span>
                <span className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-bold ${
                  streakDays > 0 
                    ? 'bg-amber-500/20 border-amber-400/40 text-amber-300' 
                    : 'bg-slate-700/50 border-slate-600 text-slate-300'
                }`}>
                  <Flame className={`w-3.5 h-3.5 ${streakDays > 0 ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                  Chuỗi {streakDays} ngày
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
                {activeGoal.examName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Môn học trọng tâm: <strong className="text-sky-300">{activeGoal.targetSubject}</strong> · Mục tiêu: <strong>{activeGoal.dailyQuestionsTarget} câu/ngày</strong>
              </p>
            </div>

            <button
              onClick={() => {
                setEditFormGoal(activeGoal);
                setIsEditGoalModalOpen(true);
              }}
              className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md shadow-sm"
            >
              <Edit3 className="w-4 h-4 text-sky-300" />
              <span>Chỉnh sửa mục tiêu</span>
            </button>
          </div>

          {/* Grid: Countdown Timer (Left) + Score Aim Progress (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            
            {/* Live Countdown Box (7 cols) */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-6 space-y-4">
              
              {/* Real-time System Clock */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/70 border border-white/10 text-xs">
                <div className="flex items-center gap-1.5 text-sky-300">
                  <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Thời gian hiện tại:</span>
                  <strong className="text-white font-mono">{currentDateTime}</strong>
                </div>
                <div className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Đang đếm ngược đến Kỳ thi 2027</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-semibold text-sky-200 tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  Thời Gian Đếm Ngược Đến Kỳ Thi 2027:
                </span>
                <span className="text-xs text-amber-300 font-mono font-bold bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-400/30">
                  Ngày thi: {new Date(activeGoal.targetDate).toLocaleDateString('vi-VN')}
                </span>
              </div>

              {/* Countdown Digits */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                <div className="bg-slate-900/60 rounded-xl p-3 sm:p-4 border border-white/10">
                  <div className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                    {countdown.days}
                  </div>
                  <div className="text-[11px] sm:text-xs text-sky-300 uppercase tracking-wider font-semibold mt-1">
                    Ngày
                  </div>
                </div>

                <div className="bg-slate-900/60 rounded-xl p-3 sm:p-4 border border-white/10">
                  <div className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                    {String(countdown.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] sm:text-xs text-sky-300 uppercase tracking-wider font-semibold mt-1">
                    Giờ
                  </div>
                </div>

                <div className="bg-slate-900/60 rounded-xl p-3 sm:p-4 border border-white/10">
                  <div className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                    {String(countdown.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] sm:text-xs text-sky-300 uppercase tracking-wider font-semibold mt-1">
                    Phút
                  </div>
                </div>

                <div className="bg-slate-900/60 rounded-xl p-3 sm:p-4 border border-white/10">
                  <div className="text-2xl sm:text-4xl font-extrabold font-mono text-amber-300 tracking-tight">
                    {String(countdown.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] sm:text-xs text-amber-300 uppercase tracking-wider font-semibold mt-1">
                    Giây
                  </div>
                </div>
              </div>

              {/* Summary Countdown Banner */}
              <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-400/20 text-xs text-sky-200 flex flex-wrap items-center justify-between gap-2">
                <span>Khoảng thời gian còn lại:</span>
                <strong className="text-white font-mono text-sm">
                  {countdown.days} ngày · {countdown.hours} giờ · {countdown.minutes} phút · {countdown.seconds} giây
                </strong>
              </div>

              <p className="text-xs text-slate-300 italic text-center sm:text-left">
                💡 "Mỗi câu hỏi ôn luyện hôm nay là 0.2 điểm quý giá trong ngày thi chính thức 2027."
              </p>
            </div>

            {/* Target Score Gap Box (5 cols) */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase font-semibold text-sky-200 tracking-wider">
                  Mức Điểm Aim & Hiện Tại
                </span>
                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-xs text-slate-300">Điểm hiện tại</span>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                      {hasExamData && currentOverallScore !== null ? (
                        `${currentOverallScore.toFixed(1)}đ`
                      ) : (
                        <span className="text-lg font-normal text-slate-300 italic">Chưa có điểm</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-300 font-semibold">Mục tiêu (Aim)</span>
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">
                      {activeGoal.targetScore.toFixed(1)}đ
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Tiến độ đạt Aim:</span>
                  <span className="text-sky-300">
                    {hasExamData && currentOverallScore !== null 
                      ? `${Math.min(100, Math.round((currentOverallScore / activeGoal.targetScore) * 100))}%`
                      : '0% (Chưa bắt đầu)'}
                  </span>
                </div>
                <div className="w-full bg-slate-800/80 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div 
                    className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: hasExamData && currentOverallScore !== null 
                        ? `${Math.min(100, (currentOverallScore / activeGoal.targetScore) * 100)}%` 
                        : '0%' 
                    }}
                  />
                </div>
              </div>

              {/* Gap Status */}
              <div className="p-3 bg-white/10 rounded-xl text-xs flex items-center justify-between border border-white/10">
                <span className="text-slate-200">Khoảng cách cần bứt phá:</span>
                {hasExamData && scoreGap !== null ? (
                  <strong className={`font-mono text-sm ${scoreGap <= 0 ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {scoreGap <= 0 ? 'Đã đạt mục tiêu! 🎉' : `+${scoreGap.toFixed(1)} điểm`}
                  </strong>
                ) : (
                  <span className="text-sky-200 font-medium italic text-[11px]">
                    Làm đề đầu tiên để đánh giá
                  </span>
                )}
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ============================================================== */}
      {/* 2. THỐNG KÊ TỪNG NGÀY & STREAK STUDYING */}
      {/* ============================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm ${
              streakDays > 0 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              <Flame className={`w-5 h-5 ${streakDays > 0 ? 'fill-white' : ''}`} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
                Thống Kê Tiến Độ Từng Ngày
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  streakDays > 0 ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-600'
                }`}>
                  🔥 {streakDays} ngày liên tiếp
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Biểu đồ số câu hỏi đã giải, đề thi đã làm và điểm số qua từng ngày học.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
            <span>Hôm nay: <strong className={todayQuestions > 0 ? 'text-emerald-600 font-bold' : 'text-slate-700'}>
              {todayQuestions} / {activeGoal.dailyQuestionsTarget} câu
            </strong></span>
            <span>·</span>
            <span className={todayPercent >= 100 ? 'text-emerald-700 font-semibold' : 'text-slate-500'}>
              Đạt {todayPercent}% kế hoạch
            </span>
          </div>
        </div>

        {/* Empty State Banner for New Users */}
        {!hasExamData && (
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sky-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Chào mừng {currentUser?.name || 'bạn mới'} đến với EduViet!</span>
              </div>
              <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                Tài khoản của bạn chưa có lịch sử làm bài kiểm tra nào. Biểu đồ 7 ngày và số câu hỏi sẽ tự động ghi nhận ngay sau khi bạn nộp đề thi đầu tiên. Bạn có thể đặt mục tiêu Aim hoặc bắt đầu thử sức ngay bây giờ!
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setEditFormGoal(activeGoal);
                  setIsEditGoalModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
              >
                🎯 Cài đặt mục tiêu Aim
              </button>
              <button
                onClick={() => onSelectTab('exams')}
                className="px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Vào làm bài thi ngay</span>
              </button>
            </div>
          </div>
        )}

        {/* 7-Day Bar Graph */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">7 ngày học tập gần nhất:</span>
            <span>Cột màu xanh: Số câu hỏi giải được · Chỉ số trên: Điểm trung bình</span>
          </div>

          <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-4">
            {dailyStats.map((d, idx) => {
              const maxQuestions = Math.max(60, activeGoal.dailyQuestionsTarget * 2);
              const heightPct = d.questionsSolved > 0 
                ? Math.min(100, Math.max(15, Math.round((d.questionsSolved / maxQuestions) * 100)))
                : 4;
              const isToday = idx === dailyStats.length - 1;

              return (
                <div key={d.date} className="flex flex-col items-center space-y-2">
                  
                  {/* Top Score Badge */}
                  <span className={`text-[10px] sm:text-xs font-mono font-bold ${
                    d.averageScore > 0 ? (isToday ? 'text-sky-700' : 'text-slate-700') : 'text-slate-400'
                  }`}>
                    {d.averageScore > 0 ? `${d.averageScore}đ` : '—'}
                  </span>

                  {/* Vertical Bar Container */}
                  <div className="w-full bg-slate-100 rounded-xl h-40 flex items-end p-1.5 border border-slate-200/80 relative">
                    <div 
                      className={`w-full rounded-lg transition-all duration-500 flex flex-col justify-end items-center pb-2 ${
                        d.questionsSolved > 0 
                          ? (isToday 
                              ? 'bg-gradient-to-t from-sky-600 to-emerald-500 shadow-sm' 
                              : 'bg-gradient-to-t from-slate-400 to-sky-500 hover:from-slate-500 hover:to-sky-600')
                          : 'bg-slate-200/60'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    >
                      {d.questionsSolved > 0 && (
                        <span className="text-[10px] font-bold text-white font-mono hidden sm:inline">
                          {d.questionsSolved}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Day Label */}
                  <div className="text-center">
                    <span className={`text-xs font-semibold block ${isToday ? 'text-sky-700 font-bold' : 'text-slate-600'}`}>
                      {d.dayLabel}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {d.examsCount} đề
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Summary Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Tổng câu hỏi đã luyện</p>
              <p className="text-lg font-bold text-slate-900 font-mono">
                {totalQuestionsSolved} câu
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Đề thi đã hoàn thành</p>
              <p className="text-lg font-bold text-slate-900 font-mono">
                {totalExamsCompleted} bài thi
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Tổng thời gian ôn luyện</p>
              <p className="text-lg font-bold text-slate-900 font-mono">
                {totalStudyTimeMinutes} phút {totalStudyTimeMinutes > 60 ? `(~${(totalStudyTimeMinutes / 60).toFixed(1)}h)` : ''}
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* ============================================================== */}
      {/* 3. TỔNG HỢP NĂNG LỰC KHI LÀM BÀI CÁC MÔN */}
      {/* ============================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-sm">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Bảng Tổng Hợp Khi Làm Bài Các Môn
              </h2>
              <p className="text-xs text-slate-500">
                Theo dõi điểm số trung bình, tỉ lệ đúng và phân loại thế mạnh từng môn học dựa trên lịch sử thi của bạn.
              </p>
            </div>
          </div>

          {/* Filter strength tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs self-start sm:self-center">
            <button
              onClick={() => setSelectedSubjectFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedSubjectFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả môn ({subjectOverviews.length})
            </button>
            <button
              onClick={() => setSelectedSubjectFilter('Thế mạnh')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedSubjectFilter === 'Thế mạnh'
                  ? 'bg-white text-emerald-700 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Thế mạnh
            </button>
            <button
              onClick={() => setSelectedSubjectFilter('Ổn định')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedSubjectFilter === 'Ổn định'
                  ? 'bg-white text-sky-700 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ổn định
            </button>
            <button
              onClick={() => setSelectedSubjectFilter('Cần cải thiện')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedSubjectFilter === 'Cần cải thiện'
                  ? 'bg-white text-rose-700 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cần cải thiện
            </button>
            <button
              onClick={() => setSelectedSubjectFilter('Chưa thi')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedSubjectFilter === 'Chưa thi'
                  ? 'bg-white text-slate-800 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Chưa thi
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px] font-semibold tracking-wider">
                <th className="py-3 px-3">Môn học</th>
                <th className="py-3 px-3 text-center">Số đề đã thi</th>
                <th className="py-3 px-3 text-center">Điểm TB</th>
                <th className="py-3 px-3 text-center">Điểm cao nhất</th>
                <th className="py-3 px-3">Tỉ lệ đúng (%)</th>
                <th className="py-3 px-3 text-center">Đánh giá</th>
                <th className="py-3 px-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubjects.map((sub) => {
                const relatedExam = exams.find(e => e.subject === sub.subject);

                return (
                  <tr key={sub.subject} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Subject Name */}
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>{sub.subject}</span>
                      </div>
                    </td>

                    {/* Exams Taken */}
                    <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-700">
                      {sub.examsTaken} đề
                    </td>

                    {/* Average Score */}
                    <td className="py-3.5 px-3 text-center">
                      {sub.examsTaken > 0 ? (
                        <span className="font-mono font-bold text-slate-900 text-sm bg-slate-100 px-2 py-0.5 rounded-md">
                          {sub.averageScore.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono">—</span>
                      )}
                    </td>

                    {/* Highest Score */}
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-emerald-700">
                      {sub.examsTaken > 0 ? sub.highestScore.toFixed(1) : '—'}
                    </td>

                    {/* Accuracy Progress Bar */}
                    <td className="py-3.5 px-3 min-w-[140px]">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono text-slate-600">
                          <span>{sub.examsTaken > 0 ? `${sub.accuracyRate}%` : '0%'}</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              sub.accuracyRate >= 80 
                                ? 'bg-emerald-500' 
                                : sub.accuracyRate >= 70 
                                ? 'bg-sky-500' 
                                : sub.examsTaken > 0 ? 'bg-amber-500' : 'bg-transparent'
                            }`}
                            style={{ width: `${sub.accuracyRate}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Strength Level */}
                    <td className="py-3.5 px-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-block ${
                        sub.strengthLevel === 'Thế mạnh'
                          ? 'bg-emerald-100 text-emerald-800'
                          : sub.strengthLevel === 'Ổn định'
                          ? 'bg-sky-100 text-sky-800'
                          : sub.strengthLevel === 'Cần cải thiện'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {sub.strengthLevel}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-3 text-right">
                      {relatedExam ? (
                        <button
                          onClick={() => onStartExam(relatedExam)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold transition-colors cursor-pointer border border-sky-200"
                        >
                          <Play className="w-3 h-3 fill-sky-700" />
                          <span>Luyện đề ngay</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onSelectTab('exams')}
                          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 text-xs font-medium cursor-pointer"
                        >
                          <span>Xem đề</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </section>

      {/* ============================================================== */}
      {/* 4. MODAL CHỈNH SỬA MỤC TIÊU HỌC TẬP */}
      {/* ============================================================== */}
      {isEditGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div 
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-150"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    Cài Đặt Mục Tiêu Điểm Số
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tùy chỉnh kỳ thi, số điểm Aim mong muốn và ngày thi năm 2027 để kích hoạt đồng hồ đếm ngược.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsEditGoalModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGoal} className="space-y-4">
              
              {/* Quick 2027 Presets */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-semibold text-slate-700">
                  Phím Tắt Chọn Nhanh Ngày Thi 2027 (Ngày 11-12):
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setEditFormGoal({
                      ...editFormGoal,
                      examName: 'Kỳ thi Tốt nghiệp THPT 2027 (Ngày 11-12)',
                      targetDate: '2027-11-12T07:30:00'
                    })}
                    className="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    🎯 Ngày 11-12/2027 (11/12/2027)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditFormGoal({
                      ...editFormGoal,
                      examName: 'Kỳ thi Tốt nghiệp THPT 2027 (Ngày 11-12)',
                      targetDate: '2027-12-11T07:30:00'
                    })}
                    className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    🎯 Ngày 11/12/2027 (11 Tháng 12)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditFormGoal({
                      ...editFormGoal,
                      examName: 'Kỳ thi Tốt nghiệp THPT 2027 (Ngày 11-12 Tháng 6)',
                      targetDate: '2027-06-11T07:30:00'
                    })}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    🎯 Ngày 11-12/06/2027
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditFormGoal({
                      ...editFormGoal,
                      examName: 'Kỳ thi ĐGNL ĐHQG Hà Nội 2027',
                      targetDate: '2027-04-10T07:30:00'
                    })}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    🎯 ĐGNL HN 2027 (10/04/2027)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditFormGoal({
                      ...editFormGoal,
                      examName: 'Kỳ thi ĐGNL ĐHQG TP.HCM 2027',
                      targetDate: '2027-03-28T07:30:00'
                    })}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    🎯 ĐGNL HCM 2027 (28/03/2027)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên Kỳ Thi Mục Tiêu:
                </label>
                <input
                  type="text"
                  required
                  value={editFormGoal.examName}
                  onChange={(e) => setEditFormGoal({ ...editFormGoal, examName: e.target.value })}
                  placeholder="Ví dụ: Kỳ thi Tốt nghiệp THPT 2027 (Ngày 11-12)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mức Điểm Mục Tiêu (Aim):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    required
                    value={editFormGoal.targetScore}
                    onChange={(e) => setEditFormGoal({ ...editFormGoal, targetScore: parseFloat(e.target.value) || 9.0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 text-sm font-mono font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Môn / Khối Xét Tuyển:
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormGoal.targetSubject}
                    onChange={(e) => setEditFormGoal({ ...editFormGoal, targetSubject: e.target.value })}
                    placeholder="Ví dụ: Toán học & Khối A00"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ngày Diễn Ra Kỳ Thi Năm 2027:
                  </label>
                  <input
                    type="date"
                    required
                    value={editFormGoal.targetDate.split('T')[0]}
                    onChange={(e) => setEditFormGoal({ ...editFormGoal, targetDate: `${e.target.value}T07:30:00` })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mục Tiêu Câu Hỏi / Ngày:
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="200"
                    required
                    value={editFormGoal.dailyQuestionsTarget}
                    onChange={(e) => setEditFormGoal({ ...editFormGoal, dailyQuestionsTarget: parseInt(e.target.value) || 25 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 text-sm font-mono font-bold outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditGoalModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Lưu mục tiêu
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
