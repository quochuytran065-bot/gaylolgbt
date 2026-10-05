import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Users,
  Camera,
  CameraOff,
  Sparkles,
  Coffee,
  CheckCircle2,
  Headphones,
  Maximize2
} from 'lucide-react';
import { FocusParticipant, AmbientSoundType } from '../types';
import { INITIAL_FOCUS_PARTICIPANTS } from '../data/learningPlatformData';

export const FocusStudyRoomView: React.FC = () => {
  // Pomodoro Modes: 'focus' (25 min), 'shortBreak' (5 min), 'longBreak' (15 min)
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(3);
  
  // Ambient Sound State
  const [selectedSound, setSelectedSound] = useState<AmbientSoundType>('lofi');
  const [isMuted, setIsMuted] = useState(false);
  
  // User Focus Task
  const [userTask, setUserTask] = useState('Ôn tập 50 câu trắc nghiệm Toán 12');
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [userCamOn, setUserCamOn] = useState(true);

  // Participants
  const [participants, setParticipants] = useState<FocusParticipant[]>(INITIAL_FOCUS_PARTICIPANTS);

  // Web Audio Noise Generator (White/Brown/Pink noise for focus)
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Switch pomodoro modes
  const handleSwitchMode = (newMode: 'focus' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsRunning(false);
    if (newMode === 'focus') setTimeLeft(25 * 60);
    else if (newMode === 'shortBreak') setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  // Timer tick
  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      if (mode === 'focus') {
        setSessionsCompleted(prev => prev + 1);
        alert('🎉 Chúc mừng bạn đã hoàn thành một phiên tập trung 25 phút! Hãy nghỉ ngơi 5 phút nhé.');
        handleSwitchMode('shortBreak');
      } else {
        alert('⏰ Hết giờ giải lao! Cùng quay lại phiên tập trung tiếp theo nào.');
        handleSwitchMode('focus');
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  // Audio Ambient sound simulation (Synthesizer via Web Audio API)
  useEffect(() => {
    if (!isRunning || isMuted || selectedSound === 'silence') {
      if (audioContextRef.current && audioContextRef.current.state === 'running') {
        audioContextRef.current.suspend();
      }
      return;
    }

    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    } catch { /* Audio not supported */ }
  }, [isRunning, isMuted, selectedSound]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercent = mode === 'focus' 
    ? Math.round(((25 * 60 - timeLeft) / (25 * 60)) * 100)
    : mode === 'shortBreak'
    ? Math.round(((5 * 60 - timeLeft) / (5 * 60)) * 100)
    : Math.round(((15 * 60 - timeLeft) / (15 * 60)) * 100);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* ── Top Header Banner ─────────────────────────────────── */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-teal-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-300 uppercase tracking-wider">
            <Clock className="w-4 h-4 text-teal-400" />
            <span>KHÔNG GIAN TẬP TRUNG CHUNG (STUDY TOGETHER & POMODORO)</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading leading-tight">
                Phòng Tự Học Chung (Focus Room)
              </h1>
              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-2xl mt-1">
                Ứng dụng kỹ thuật Pomodoro khoa học kết hợp âm thanh kích thích sóng não tập trung. Học cùng các bạn học sinh khắp 63 tỉnh thành để xua tan cảm giác trì hoãn.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-md shrink-0">
              <Users className="w-4 h-4 text-emerald-300" />
              <span className="text-xs font-bold text-white">48 bạn đang học cùng phòng</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Workspace Grid ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Pomodoro Timer & Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-xs flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
            
            {/* Mode Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/80 rounded-2xl text-xs font-bold">
              <button
                onClick={() => handleSwitchMode('focus')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  mode === 'focus'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Tập trung (25p)
              </button>
              <button
                onClick={() => handleSwitchMode('shortBreak')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  mode === 'shortBreak'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Nghỉ ngắn (5p)
              </button>
              <button
                onClick={() => handleSwitchMode('longBreak')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  mode === 'longBreak'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Nghỉ dài (15p)
              </button>
            </div>

            {/* Giant Circular Timer Display */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  className="stroke-slate-100 dark:stroke-slate-700 fill-none"
                  strokeWidth="10"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  className={`fill-none transition-all duration-1000 ${
                    mode === 'focus' ? 'stroke-teal-500' : 'stroke-amber-500'
                  }`}
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 110}
                  strokeDashoffset={2 * Math.PI * 110 * (1 - progressPercent / 100)}
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-black font-mono tracking-tight text-slate-900 dark:text-slate-100">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wider">
                  {mode === 'focus' ? '🎯 Đang tập trung' : '☕ Thời gian nghỉ ngơi'}
                </span>
              </div>
            </div>

            {/* Timer Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-8 py-3.5 rounded-2xl text-white font-bold text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2 ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/25'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                <span>{isRunning ? 'Tạm Dừng' : 'Bắt Đầu Tập Trung'}</span>
              </button>

              <button
                onClick={() => handleSwitchMode(mode)}
                title="Đặt lại đồng hồ"
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Sessions count */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-teal-500" />
              <span>Hôm nay bạn đã hoàn thành: <strong>{sessionsCompleted} phiên Pomodoro</strong> (75 phút)</span>
            </div>
          </div>

          {/* Ambient Sound Selector */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Headphones className="w-4 h-4 text-teal-600" />
                Âm Thanh Nền Kích Thích Tập Trung
              </h4>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`text-xs flex items-center gap-1 font-semibold cursor-pointer ${
                  isMuted ? 'text-rose-500' : 'text-teal-600'
                }`}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isMuted ? 'Đã tắt âm' : 'Đang bật âm'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-semibold">
              {[
                { id: 'lofi', label: '🎵 Lo-Fi Chill', icon: '🎧' },
                { id: 'rain', label: '🌧️ Mưa êm dịu', icon: '🌧️' },
                { id: 'cafe', label: '☕ Quán Cà Phê', icon: '☕' },
                { id: 'waves', label: '🌊 Sóng biển', icon: '🌊' },
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedSound(s.id as AmbientSoundType); setIsMuted(false); }}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedSound === s.id && !isMuted
                      ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-800 dark:text-teal-200 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-lg mb-1">{s.icon}</span>
                  <span className="text-[11px]">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Study Together Virtual Room (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* User's own focus card & task */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/80 rounded-3xl border border-teal-200 dark:border-slate-700 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Nhiệm vụ phiên học này
              </span>
              <button
                onClick={() => setUserCamOn(!userCamOn)}
                title={userCamOn ? 'Tắt camera mô phỏng' : 'Bật camera mô phỏng'}
                className="text-xs text-slate-500 flex items-center gap-1 hover:text-teal-600 cursor-pointer"
              >
                {userCamOn ? <Camera className="w-3.5 h-3.5 text-teal-600" /> : <CameraOff className="w-3.5 h-3.5" />}
                <span>{userCamOn ? 'Cam Bật' : 'Cam Tắt'}</span>
              </button>
            </div>

            {isEditingTask ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userTask}
                  onChange={(e) => setUserTask(e.target.value)}
                  className="flex-1 p-2 text-xs rounded-xl border border-teal-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                />
                <button
                  onClick={() => setIsEditingTask(false)}
                  className="px-3 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Lưu
                </button>
              </div>
            ) : (
              <div 
                onClick={() => setIsEditingTask(true)}
                className="p-3 bg-white dark:bg-slate-900/60 rounded-2xl border border-teal-100 dark:border-slate-700/80 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer hover:border-teal-300"
              >
                <span>🎯 {userTask}</span>
                <span className="text-[10px] text-teal-600 underline">Đổi</span>
              </div>
            )}
          </div>

          {/* Virtual Participants List (Study Together) */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                Bạn Học Cùng Phòng Đang Online
              </h4>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Trực tuyến
              </span>
            </div>

            <div className="space-y-3">
              {participants.map(p => (
                <div key={p.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400" />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">{p.name}</h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {p.currentTask}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block">Tập trung</span>
                    <strong className="text-xs text-teal-600 dark:text-teal-400">{p.focusMinutesToday} phút</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 text-center text-xs text-slate-500 dark:text-slate-400">
              💡 <em>"Nhìn thấy những bạn khác đang nỗ lực chăm chỉ sẽ giúp bạn duy trì kỷ luật và không từ bỏ!"</em>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
