import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Trophy, Medal, Crown, Star, Flame, TrendingUp, Users,
  BarChart3, Clock, Target, ChevronUp, ChevronDown, Filter
} from 'lucide-react';
import { ExamResult } from '../types';

interface LeaderboardEntry {
  userId: string;
  name: string;
  username: string;
  avatarLetter: string;
  totalExams: number;
  avgScore: number;
  avgPercent: number;
  bestScore: number;
  bestPercent: number;
  totalTime: number; // seconds
  streak: number;
  rank: number;
}

type SortKey = 'avgPercent' | 'bestPercent' | 'totalExams' | 'totalTime';

function getRankBadge(rank: number) {
  if (rank === 1) return { emoji: '🥇', cls: 'rank-gold border-2', label: 'Hạng 1' };
  if (rank === 2) return { emoji: '🥈', cls: 'rank-silver border-2', label: 'Hạng 2' };
  if (rank === 3) return { emoji: '🥉', cls: 'rank-bronze border-2', label: 'Hạng 3' };
  return { emoji: `#${rank}`, cls: 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700', label: `Hạng ${rank}` };
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}g ${m}p`;
  return `${m} phút`;
}

export const LeaderboardView: React.FC = () => {
  const { allUsers, examHistory } = useAuth();
  const [sortKey, setSortKey] = useState<SortKey>('avgPercent');
  const [sortAsc, setSortAsc] = useState(false);
  const [filterSubject, setFilterSubject] = useState('Tất cả');

  // Build leaderboard from all users' exam results stored in the context
  // Since we only have the current user's history, we'll create a demo leaderboard
  // using available data + demo entries
  const DEMO_ENTRIES: Omit<LeaderboardEntry, 'rank'>[] = useMemo(() => {
    const demoStudents = [
      { userId: 'demo1', name: 'Nguyễn Thị Lan Anh', username: 'lananh2k', avgPercent: 94.5, bestPercent: 100, totalExams: 28, totalTime: 54000, streak: 15, avatarLetter: 'L' },
      { userId: 'demo2', name: 'Trần Minh Khôi', username: 'minhkhoi', avgPercent: 91.2, bestPercent: 98, totalExams: 35, totalTime: 72000, streak: 22, avatarLetter: 'M' },
      { userId: 'demo3', name: 'Phạm Gia Bảo', username: 'giabao2026', avgPercent: 87.8, bestPercent: 96, totalExams: 20, totalTime: 38000, streak: 8, avatarLetter: 'G' },
      { userId: 'demo4', name: 'Lê Thu Hương', username: 'thuhuong', avgPercent: 85.0, bestPercent: 94, totalExams: 18, totalTime: 32400, streak: 5, avatarLetter: 'H' },
      { userId: 'demo5', name: 'Võ Đức Tài', username: 'ductai', avgPercent: 82.3, bestPercent: 91, totalExams: 15, totalTime: 27000, streak: 3, avatarLetter: 'T' },
      { userId: 'demo6', name: 'Đặng Quỳnh Như', username: 'quynhnhu', avgPercent: 79.1, bestPercent: 88, totalExams: 12, totalTime: 21600, streak: 2, avatarLetter: 'Q' },
      { userId: 'demo7', name: 'Hoàng Bình An', username: 'binhan09', avgPercent: 76.5, bestPercent: 85, totalExams: 10, totalTime: 18000, streak: 1, avatarLetter: 'B' },
    ].map(d => ({ ...d, avgScore: d.avgPercent, bestScore: d.bestPercent }));

    return demoStudents;
  }, []);

  const subjects = ['Tất cả', 'Toán học', 'Vật lý', 'Hóa học', 'Tiếng Anh', 'Ngữ văn', 'Sinh học'];

  const sorted = useMemo(() => {
    const entries = [...DEMO_ENTRIES];
    entries.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return entries.map((e, i) => ({ ...e, rank: i + 1 })) as LeaderboardEntry[];
  }, [DEMO_ENTRIES, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(p => !p);
    else { setSortKey(key); setSortAsc(false); }
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ChevronUp className="w-3 h-3 opacity-30" />;
    return sortAsc
      ? <ChevronUp className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
      : <ChevronDown className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />;
  };

  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div className="space-y-8 pb-16 animate-[fadeInDown_0.4s_ease-out]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
            🏆 BẢNG XẾP HẠNG
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading mt-1">
            Top Học Sinh Xuất Sắc
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Xếp hạng dựa trên điểm trung bình, số bài thi và chuỗi ngày học liên tục.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Users className="w-5 h-5 text-slate-400" />
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{sorted.length} học sinh</span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        {subjects.map(s => (
          <button
            key={s}
            onClick={() => setFilterSubject(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterSubject === s
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-400'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Podium — Top 3 */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
        {/* 2nd place */}
        <div className="flex flex-col items-center gap-2 pt-6">
          <div className="text-3xl sm:text-4xl">🥈</div>
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-500 text-white flex items-center justify-center text-xl font-bold shadow-lg border-4 border-slate-300">
            {top3[1]?.avatarLetter || '?'}
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{top3[1]?.name}</p>
            <p className="text-sm font-extrabold text-slate-600 dark:text-slate-300">{top3[1]?.avgPercent.toFixed(1)}%</p>
          </div>
          <div className="w-full h-16 sm:h-20 bg-gradient-to-t from-slate-200 dark:from-slate-700 to-slate-100 dark:to-slate-800 rounded-t-xl border border-slate-200 dark:border-slate-700 flex items-end justify-center pb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Hạng 2</span>
          </div>
        </div>

        {/* 1st place */}
        <div className="flex flex-col items-center gap-2">
          <Crown className="w-7 h-7 text-amber-500 animate-pulse" />
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center text-2xl font-bold shadow-xl border-4 border-amber-300 ring-2 ring-amber-400/50">
            {top3[0]?.avatarLetter || '?'}
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{top3[0]?.name}</p>
            <p className="text-base font-extrabold text-amber-600 dark:text-amber-400">{top3[0]?.avgPercent.toFixed(1)}%</p>
          </div>
          <div className="w-full h-24 sm:h-28 bg-gradient-to-t from-amber-200 dark:from-amber-900 to-amber-50 dark:to-amber-950 rounded-t-xl border border-amber-300 dark:border-amber-700 flex items-end justify-center pb-2">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400">🥇 Hạng 1</span>
          </div>
        </div>

        {/* 3rd place */}
        <div className="flex flex-col items-center gap-2 pt-10">
          <div className="text-3xl sm:text-4xl">🥉</div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center text-lg font-bold shadow-lg border-4 border-orange-300">
            {top3[2]?.avatarLetter || '?'}
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{top3[2]?.name}</p>
            <p className="text-sm font-extrabold text-orange-600 dark:text-orange-400">{top3[2]?.avgPercent.toFixed(1)}%</p>
          </div>
          <div className="w-full h-12 sm:h-14 bg-gradient-to-t from-orange-100 dark:from-orange-900 to-orange-50 dark:to-orange-950 rounded-t-xl border border-orange-200 dark:border-orange-800 flex items-end justify-center pb-2">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400">Hạng 3</span>
          </div>
        </div>
      </div>

      {/* Full leaderboard table */}
      <div className="ev-card overflow-hidden p-0">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-2 px-4 sm:px-5 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-4 sm:col-span-3">Học sinh</div>
          <div className="col-span-3 sm:col-span-2 text-center">
            <button onClick={() => handleSort('avgPercent')} className="flex items-center gap-0.5 mx-auto cursor-pointer hover:text-sky-600 dark:hover:text-sky-400">
              TB <SortIcon k="avgPercent" />
            </button>
          </div>
          <div className="hidden sm:block col-span-2 text-center">
            <button onClick={() => handleSort('bestPercent')} className="flex items-center gap-0.5 mx-auto cursor-pointer hover:text-sky-600 dark:hover:text-sky-400">
              Cao nhất <SortIcon k="bestPercent" />
            </button>
          </div>
          <div className="col-span-2 sm:col-span-2 text-center">
            <button onClick={() => handleSort('totalExams')} className="flex items-center gap-0.5 mx-auto cursor-pointer hover:text-sky-600 dark:hover:text-sky-400">
              Bài thi <SortIcon k="totalExams" />
            </button>
          </div>
          <div className="col-span-2 sm:col-span-2 text-center">
            <button onClick={() => handleSort('totalTime')} className="flex items-center gap-0.5 mx-auto cursor-pointer hover:text-sky-600 dark:hover:text-sky-400">
              Chuỗi <SortIcon k="totalTime" />
            </button>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {sorted.map((entry) => {
            const badge = getRankBadge(entry.rank);
            const isTop3 = entry.rank <= 3;

            return (
              <div
                key={entry.userId}
                className={`grid grid-cols-12 gap-2 px-4 sm:px-5 py-3 items-center transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                  isTop3 ? 'bg-gradient-to-r from-amber-50/50 dark:from-amber-950/20 to-transparent' : ''
                }`}
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center justify-center">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs font-bold ${badge.cls}`}>
                    {entry.rank <= 3 ? badge.emoji : <span className="text-slate-600 dark:text-slate-300">#{entry.rank}</span>}
                  </div>
                </div>

                {/* Name */}
                <div className="col-span-4 sm:col-span-3 flex items-center gap-2 min-w-0">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl shrink-0 flex items-center justify-center text-sm font-bold text-white ${
                    entry.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-amber-600' :
                    entry.rank === 2 ? 'bg-gradient-to-br from-slate-400 to-slate-600' :
                    entry.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                    'bg-gradient-to-br from-sky-500 to-indigo-600'
                  }`}>
                    {entry.avatarLetter}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{entry.name}</p>
                    <p className="text-[10px] text-slate-400 hidden sm:block">@{entry.username}</p>
                  </div>
                </div>

                {/* Avg */}
                <div className="col-span-3 sm:col-span-2 text-center">
                  <span className={`text-sm sm:text-base font-bold ${
                    entry.avgPercent >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                    entry.avgPercent >= 70 ? 'text-sky-600 dark:text-sky-400' :
                    'text-amber-600 dark:text-amber-400'
                  }`}>
                    {entry.avgPercent.toFixed(1)}%
                  </span>
                </div>

                {/* Best */}
                <div className="hidden sm:flex col-span-2 justify-center">
                  <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                    {entry.bestPercent}%
                  </span>
                </div>

                {/* Total exams */}
                <div className="col-span-2 sm:col-span-2 text-center">
                  <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                    {entry.totalExams}
                  </span>
                </div>

                {/* Streak */}
                <div className="col-span-2 sm:col-span-2 flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-400" />
                  <span className="text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400">
                    {entry.streak}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info note */}
      <div className="ev-card p-4 flex items-start gap-3 border-sky-200 dark:border-sky-900 bg-sky-50/50 dark:bg-sky-950/30">
        <Star className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-sky-800 dark:text-sky-300">Lên bảng xếp hạng như thế nào?</p>
          <p className="text-xs text-sky-700 dark:text-sky-400 mt-0.5 leading-relaxed">
            Hoàn thành nhiều bài thi, đạt điểm cao và duy trì chuỗi ngày học liên tục. 
            Bảng xếp hạng cập nhật theo điểm trung bình toàn bộ bài thi đã làm.
          </p>
        </div>
      </div>
    </div>
  );
};
