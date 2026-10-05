import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Swords,
  Flame,
  Zap,
  Award,
  Crown,
  Sparkles,
  Timer,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Shield,
  Medal,
  Users
} from 'lucide-react';
import { LeaderboardUser, ArenaQuestion, ChoiceKey } from '../types';
import { INITIAL_LEADERBOARD, ARENA_QUESTIONS } from '../data/learningPlatformData';

interface GamificationArenaViewProps {
  currentUserName?: string;
}

export const GamificationArenaView: React.FC<GamificationArenaViewProps> = ({
  currentUserName = 'Học Viên EduViet'
}) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'arena'>('leaderboard');
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD);

  // Arena Battle State
  const [isPlayingBattle, setIsPlayingBattle] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<ChoiceKey | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [isBattleFinished, setIsBattleFinished] = useState(false);

  const currentQ: ArenaQuestion = ARENA_QUESTIONS[currentQuestionIdx];

  // Opponent details
  const opponent = {
    name: 'Phạm Minh Tuấn (THPT Chuyên Lam Sơn)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    tier: 'Kim Cương',
  };

  // Timer countdown during battle
  useEffect(() => {
    if (!isPlayingBattle || isBattleFinished || isAnswerRevealed) return;

    if (timeLeft <= 0) {
      // Time up: reveal answer as incorrect
      handleAnswer(null);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlayingBattle, isBattleFinished, isAnswerRevealed, timeLeft]);

  const handleStartBattle = () => {
    setIsPlayingBattle(true);
    setCurrentQuestionIdx(0);
    setTimeLeft(15);
    setUserScore(0);
    setOpponentScore(0);
    setCombo(0);
    setSelectedAnswer(null);
    setIsAnswerRevealed(false);
    setIsBattleFinished(false);
  };

  const handleAnswer = (choice: ChoiceKey | null) => {
    if (isAnswerRevealed) return;

    setSelectedAnswer(choice);
    setIsAnswerRevealed(true);

    const isCorrect = choice === currentQ.correctAnswer;
    const opponentCorrect = Math.random() > 0.25; // 75% opponent correct

    let pointsEarned = 0;
    if (isCorrect) {
      const speedBonus = timeLeft * 10;
      const comboMultiplier = combo >= 3 ? 1.5 : combo >= 1 ? 1.2 : 1.0;
      pointsEarned = Math.round((100 + speedBonus) * comboMultiplier);
      setUserScore(prev => prev + pointsEarned);
      setCombo(prev => prev + 1);
    } else {
      setCombo(0);
    }

    if (opponentCorrect) {
      const oppSpeed = Math.floor(Math.random() * 8 + 5);
      setOpponentScore(prev => prev + Math.round(100 + oppSpeed * 8));
    }

    // Auto next after 2 seconds
    setTimeout(() => {
      if (currentQuestionIdx + 1 < ARENA_QUESTIONS.length) {
        setCurrentQuestionIdx(prev => prev + 1);
        setTimeLeft(15);
        setSelectedAnswer(null);
        setIsAnswerRevealed(false);
      } else {
        setIsBattleFinished(true);
      }
    }, 2200);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* ── Top Header Banner ─────────────────────────────────── */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-purple-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-amber-400/30">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-200 uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>ĐẤU TRƯỜNG TRI THỨC & BẢNG VINH DANH TOÀN QUỐC</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading leading-tight">
                Bảng Xếp Hạng & Đấu Trường 1v1
              </h1>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed max-w-2xl mt-1">
                Thi đua tích lũy điểm kinh nghiệm XP, duy trì chuỗi học tập Streak mỗi ngày và tham gia các trận thi đấu đối kháng trực tiếp để thử thách tốc độ phản xạ trước kỳ thi thật.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => { setActiveTab('arena'); handleStartBattle(); }}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <Swords className="w-4 h-4 text-rose-600" />
                <span>Vào Đấu Trường Ngay</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs Selector ─────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'leaderboard'
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Bảng Xếp Hạng Toàn Quốc</span>
        </button>

        <button
          onClick={() => setActiveTab('arena')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'arena'
              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Swords className="w-4 h-4 text-rose-500" />
          <span>Đấu Trường Tốc Độ 1v1</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-500 text-white">LIVE</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 1. BẢNG XẾP HẠNG TOÀN QUỐC                                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          
          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {/* Rank 2 */}
            <div className="ev-card p-6 flex flex-col items-center text-center relative border-slate-300 dark:border-slate-700 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 order-2 md:order-1">
              <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-800 font-extrabold text-sm flex items-center justify-center absolute -top-4 shadow-md">
                2
              </div>
              <img
                src={leaderboard[1].avatar}
                alt={leaderboard[1].name}
                className="w-18 h-18 rounded-full object-cover border-4 border-slate-300 shadow-md mb-3"
              />
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200 mb-1">
                Huy Chương Bạc
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{leaderboard[1].name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{leaderboard[1].school}</p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 w-full flex justify-around text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Điểm XP</span>
                  <strong className="text-indigo-600 dark:text-indigo-400">{leaderboard[1].xp.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Chuỗi ngày</span>
                  <strong className="text-rose-600 flex items-center justify-center gap-0.5">
                    <Flame className="w-3.5 h-3.5 fill-current" /> {leaderboard[1].streakDays}
                  </strong>
                </div>
              </div>
            </div>

            {/* Rank 1 (Champion) */}
            <div className="ev-card p-6 flex flex-col items-center text-center relative border-amber-300 dark:border-amber-700/80 bg-gradient-to-b from-amber-50/80 to-white dark:from-amber-950/40 dark:to-slate-900 shadow-xl order-1 md:order-2 md:-translate-y-2 ring-2 ring-amber-400/50">
              <div className="w-9 h-9 rounded-full bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center absolute -top-4.5 shadow-lg animate-pulse">
                👑 1
              </div>
              <img
                src={leaderboard[0].avatar}
                alt={leaderboard[0].name}
                className="w-22 h-22 rounded-full object-cover border-4 border-amber-400 shadow-xl mb-3"
              />
              <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-amber-200 text-amber-900 dark:bg-amber-900/80 dark:text-amber-200 mb-1 flex items-center gap-1">
                <Crown className="w-3.5 h-3.5" /> Quán Quân Tuần
              </span>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">{leaderboard[0].name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{leaderboard[0].school}</p>
              <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-slate-800 w-full flex justify-around text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Điểm XP</span>
                  <strong className="text-amber-600 dark:text-amber-400 text-sm font-black">{leaderboard[0].xp.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Chuỗi ngày</span>
                  <strong className="text-rose-600 flex items-center justify-center gap-0.5 font-bold">
                    <Flame className="w-4 h-4 fill-current" /> {leaderboard[0].streakDays} ngày
                  </strong>
                </div>
              </div>
            </div>

            {/* Rank 3 */}
            <div className="ev-card p-6 flex flex-col items-center text-center relative border-amber-600/30 dark:border-amber-900/40 bg-gradient-to-b from-orange-50/50 to-white dark:from-orange-950/20 dark:to-slate-900 order-3">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-extrabold text-sm flex items-center justify-center absolute -top-4 shadow-md">
                3
              </div>
              <img
                src={leaderboard[2].avatar}
                alt={leaderboard[2].name}
                className="w-18 h-18 rounded-full object-cover border-4 border-amber-600/60 shadow-md mb-3"
              />
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 mb-1">
                Huy Chương Đồng
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{leaderboard[2].name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{leaderboard[2].school}</p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 w-full flex justify-around text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Điểm XP</span>
                  <strong className="text-indigo-600 dark:text-indigo-400">{leaderboard[2].xp.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Chuỗi ngày</span>
                  <strong className="text-rose-600 flex items-center justify-center gap-0.5">
                    <Flame className="w-3.5 h-3.5 fill-current" /> {leaderboard[2].streakDays}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Full Leaderboard Table */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Medal className="w-4 h-4 text-amber-500" />
                Bảng Điểm Xếp Hạng Khảo Thí Toàn Quốc
              </h3>
              <span className="text-xs text-slate-400">Cập nhật mỗi 24h</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {leaderboard.map(user => (
                <div key={user.userId} className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`w-7 text-center font-bold text-sm ${
                      user.rank === 1 ? 'text-amber-500' : user.rank === 2 ? 'text-slate-400' : user.rank === 3 ? 'text-amber-700' : 'text-slate-400'
                    }`}>
                      #{user.rank}
                    </span>

                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />

                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">{user.name}</h4>
                      <p className="text-[11px] text-slate-400">{user.school} • {user.province}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right">
                    <div className="hidden sm:block">
                      <span className="text-[10px] text-slate-400 block">Độ chính xác</span>
                      <strong className="text-emerald-600 dark:text-emerald-400">{user.accuracyRate}%</strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">Chuỗi Streak</span>
                      <span className="font-bold text-rose-600 flex items-center justify-end gap-0.5">
                        <Flame className="w-3.5 h-3.5 fill-current" /> {user.streakDays} ngày
                      </span>
                    </div>

                    <div className="min-w-[70px]">
                      <span className="text-[10px] text-slate-400 block">Tổng XP</span>
                      <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-sm">
                        {user.xp.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 2. ĐẤU TRƯỜNG TỐC ĐỘ 1v1 (ARENA BATTLE)                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'arena' && (
        <div className="space-y-6">
          {!isPlayingBattle ? (
            <div className="text-center py-12 p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center mx-auto shadow-lg">
                <Swords className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Sẵn Sàng Bước Vào Đấu Trường?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Thử thách 5 câu trắc nghiệm tốc độ (15 giây/câu). Trả lời nhanh và chính xác liên tục để nhân điểm Combo và đánh bại đối thủ!
              </p>
              <button
                onClick={handleStartBattle}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-sm shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Bắt Đầu Trận Đấu (Matchmaking)
              </button>
            </div>
          ) : isBattleFinished ? (
            <div className="text-center py-10 p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg space-y-5 max-w-lg mx-auto animate-fade-in">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-3xl shadow-xl ${
                userScore >= opponentScore ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
              }`}>
                {userScore >= opponentScore ? '🏆' : '⚔️'}
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  {userScore >= opponentScore ? 'CHIẾN THẮNG TUYỆT VỜI!' : 'TRẬN ĐẤU CĂNG THẲNG!'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {userScore >= opponentScore ? 'Bạn đã đánh bại đối thủ và nhận thêm +150 XP!' : 'Cố gắng phản xạ nhanh hơn ở các câu hỏi sau nhé! +50 XP'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 block">Điểm của bạn</span>
                  <strong className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{userScore}</strong>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Điểm đối thủ</span>
                  <strong className="text-2xl font-black text-slate-600 dark:text-slate-400">{opponentScore}</strong>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleStartBattle}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Đấu Trận Khác</span>
                </button>
                <button
                  onClick={() => setIsPlayingBattle(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                >
                  Về Bảng Xếp Hạng
                </button>
              </div>
            </div>
          ) : (
            /* Active Arena Question View */
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md p-6 space-y-6 max-w-3xl mx-auto">
              
              {/* Arena Battle Top Bar: Scores & Opponent */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                
                {/* You */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    Bạn
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Bạn (Học viên)</span>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-black text-indigo-600 dark:text-indigo-400">{userScore} đ</strong>
                      {combo >= 2 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500 text-white animate-bounce">
                          🔥 Combo x{combo}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* VS & Timer */}
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full border-4 border-rose-500 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black text-base shadow-sm mx-auto">
                    {timeLeft}s
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">Câu {currentQuestionIdx + 1}/{ARENA_QUESTIONS.length}</span>
                </div>

                {/* Opponent */}
                <div className="flex items-center gap-3 text-right">
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{opponent.name}</span>
                    <strong className="text-sm font-black text-slate-600 dark:text-slate-400">{opponentScore} đ</strong>
                  </div>
                  <img src={opponent.avatar} alt="Opponent" className="w-10 h-10 rounded-full object-cover border border-rose-300 shadow-md" />
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-heading leading-relaxed">
                  {currentQ.text}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map(opt => {
                  const isSelected = selectedAnswer === opt.key;
                  const isCorrect = opt.key === currentQ.correctAnswer;

                  let btnStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 text-slate-800 dark:text-slate-200';
                  if (isAnswerRevealed) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold ring-2 ring-emerald-500';
                    } else if (isSelected) {
                      btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 font-bold ring-2 ring-rose-500';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      disabled={isAnswerRevealed}
                      onClick={() => handleAnswer(opt.key)}
                      className={`p-4 rounded-2xl border text-xs text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 flex items-center justify-center font-bold">
                          {opt.key}
                        </span>
                        <span>{opt.label}</span>
                      </div>
                      {isAnswerRevealed && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                      {isAnswerRevealed && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when revealed */}
              {isAnswerRevealed && (
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 leading-relaxed animate-fade-in">
                  💡 <strong>Giải thích:</strong> {currentQ.explanation}
                </div>
              )}

            </div>
          )}
        </div>
      )}

    </div>
  );
};
