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
  CheckCircle2,
  Headphones,
  Maximize2,
  X,
  Bell,
  RefreshCw,
  AlertCircle,
  Video,
  ShieldCheck
} from 'lucide-react';
import { FocusParticipant, AmbientSoundType } from '../types';
import { INITIAL_FOCUS_PARTICIPANTS } from '../data/learningPlatformData';

export const FocusStudyRoomView: React.FC = () => {
  // Pomodoro Modes: 'focus' (25 min), 'shortBreak' (5 min), 'longBreak' (15 min)
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(3);
  
  // In-app Notification
  const [bannerNotification, setBannerNotification] = useState<{
    title: string;
    message: string;
    icon: 'success' | 'break';
  } | null>(null);

  // ── Ambient Sound Engine State ─────────────────────────────────────
  const [selectedSound, setSelectedSound] = useState<AmbientSoundType>('lofi');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5); // 0.0 - 1.0
  
  // Web Audio Context & Node Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeSourcesRef = useRef<AudioNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioIntervalRef = useRef<number | null>(null);

  // ── Webcam Video State ─────────────────────────────────────────────
  const [isCamActive, setIsCamActive] = useState<boolean>(false);
  const [camFacingMode, setCamFacingMode] = useState<'user' | 'environment'>('user');
  const [camErrorMessage, setCamErrorMessage] = useState<string | null>(null);
  const [isFullscreenCam, setIsFullscreenCam] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  
  // User Focus Task
  const [userTask, setUserTask] = useState('Ôn tập 50 câu trắc nghiệm Toán 12');
  const [isEditingTask, setIsEditingTask] = useState(false);

  // Participants
  const [participants] = useState<FocusParticipant[]>(INITIAL_FOCUS_PARTICIPANTS);

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
        setBannerNotification({
          title: '🎉 Hoàn thành phiên tập trung!',
          message: 'Bạn đã hoàn thành xuất sắc 25 phút tập trung cao độ. Hãy đứng dậy vươn vai và nghỉ ngơi 5 phút nhé!',
          icon: 'success'
        });
        handleSwitchMode('shortBreak');
      } else {
        setBannerNotification({
          title: '⏰ Đã hết giờ giải lao!',
          message: 'Thời gian nghỉ đã kết thúc. Hãy sẵn sàng cho phiên tập trung tiếp theo với tinh thần sảng khoái!',
          icon: 'break'
        });
        handleSwitchMode('focus');
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  // ═══════════════════════════════════════════════════════════════════
  // WEB AUDIO ENGINE: REAL AMBIENT FOCUS SOUNDS
  // ═══════════════════════════════════════════════════════════════════

  // Clean up all currently playing nodes
  const stopAllAudioNodes = () => {
    if (audioIntervalRef.current) {
      window.clearInterval(audioIntervalRef.current);
      audioIntervalRef.current = null;
    }
    activeSourcesRef.current.forEach(node => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch { /* noop */ }
    });
    activeSourcesRef.current = [];
  };

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  // Build audio synthesizer according to chosen soundscape
  const startAmbientAudio = (sound: AmbientSoundType) => {
    stopAllAudioNodes();
    if (sound === 'silence') {
      setIsAudioPlaying(false);
      return;
    }

    try {
      const ctx = getAudioContext();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      if (sound === 'lofi') {
        // LO-FI: Soft soothing chord progression generator (Emaj9 -> C#m7 -> Aadd9)
        const chordNotes = [
          [164.81, 196.00, 246.94, 293.66], // E3, G3, B3, D4
          [138.59, 164.81, 207.65, 246.94], // C#3, E3, G#3, B3
          [110.00, 164.81, 220.00, 277.18], // A2, E3, A3, C#4
          [123.47, 185.00, 220.00, 293.66], // B2, F#3, A3, D4
        ];
        let chordIndex = 0;

        const playLofiChord = () => {
          if (!audioContextRef.current || audioContextRef.current.state !== 'running') return;
          const notes = chordNotes[chordIndex % chordNotes.length];
          chordIndex++;

          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const noteGain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(450 + idx * 80, ctx.currentTime);

            const now = ctx.currentTime;
            noteGain.gain.setValueAtTime(0.001, now);
            noteGain.gain.exponentialRampToValueAtTime(0.06, now + 0.4);
            noteGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

            osc.connect(filter);
            filter.connect(noteGain);
            noteGain.connect(masterGain);

            osc.start(now);
            osc.stop(now + 4.0);
            activeSourcesRef.current.push(osc);
          });
        };

        // Play initial chord and loop every 4.2 seconds
        playLofiChord();
        audioIntervalRef.current = window.setInterval(playLofiChord, 4200);

        // Add soft vinyl crackle noise
        const crackleBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
        const data = crackleBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = Math.random() < 0.004 ? (Math.random() * 2 - 1) * 0.15 : (Math.random() * 2 - 1) * 0.008;
        }
        const crackle = ctx.createBufferSource();
        crackle.buffer = crackleBuffer;
        crackle.loop = true;
        const crackleFilter = ctx.createBiquadFilter();
        crackleFilter.type = 'bandpass';
        crackleFilter.frequency.value = 1200;
        crackle.connect(crackleFilter);
        crackleFilter.connect(masterGain);
        crackle.start();
        activeSourcesRef.current.push(crackle);

      } else if (sound === 'rain') {
        // RAIN: Continuous gentle pink noise + droplets
        const bufferSize = ctx.sampleRate * 3;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
          b6 = white * 0.115926;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const lowpass = ctx.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.value = 850;

        noise.connect(lowpass);
        lowpass.connect(masterGain);
        noise.start();
        activeSourcesRef.current.push(noise);

      } else if (sound === 'cafe') {
        // CAFE: Warm ambient cafe room reverberation
        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          lastOut = (lastOut + 0.04 * white) / 1.04;
          data[i] = lastOut * 0.1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;

        noise.connect(filter);
        filter.connect(masterGain);
        noise.start();
        activeSourcesRef.current.push(noise);

      } else if (sound === 'waves') {
        // WAVES: Periodic surging ocean waves with oscillating filter
        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.08;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(250, ctx.currentTime);
        filter.Q.value = 2.0;

        // Modulate filter frequency slowly like ocean waves (0.15 Hz LFO)
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.16;
        lfoGain.gain.value = 220;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

        noise.connect(filter);
        filter.connect(masterGain);
        noise.start();
        activeSourcesRef.current.push(noise, lfo);
      }

      setIsAudioPlaying(true);
    } catch (err) {
      console.warn('Audio synthesis initialisation error:', err);
      setIsAudioPlaying(false);
    }
  };

  // Adjust volume dynamically
  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
    }
  }, [volume]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopAllAudioNodes();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try { audioContextRef.current.close(); } catch { /* noop */ }
      }
    };
  }, []);

  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      stopAllAudioNodes();
      setIsAudioPlaying(false);
    } else {
      startAmbientAudio(selectedSound);
    }
  };

  const handleSelectSound = (sound: AmbientSoundType) => {
    setSelectedSound(sound);
    startAmbientAudio(sound);
  };

  // ═══════════════════════════════════════════════════════════════════
  // WEBCAM CAMERA ENGINE: REAL HARDWARE CAMERA STREAM
  // ═══════════════════════════════════════════════════════════════════

  const stopWebcam = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCamActive(false);
  };

  const startWebcam = async (facing: 'user' | 'environment' = camFacingMode) => {
    stopWebcam();
    setCamErrorMessage(null);

    // Verify browser mediaDevices support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCamErrorMessage('Trình duyệt hiện tại không hỗ trợ webcam hoặc đang chạy trong ngữ cảnh bảo mật không phù hợp (cần HTTPS/localhost).');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing,
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      });

      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.warn('Video play error:', e));
      }
      setIsCamActive(true);
      setCamFacingMode(facing);
    } catch (err: unknown) {
      const error = err as { name?: string; message?: string };
      console.error('Camera access failed:', error);
      setIsCamActive(false);
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setCamErrorMessage('Quyền truy cập Camera bị từ chối. Vui lòng bấm vào biểu tượng ổ khóa / camera trên thanh địa chỉ trình duyệt và chọn "Cho phép" (Allow).');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setCamErrorMessage('Không tìm thấy thiết bị Webcam trên máy tính hoặc camera đang bị ứng dụng khác (Zoom, Meet, v.v.) chiếm dụng.');
      } else {
        setCamErrorMessage(`Không thể bật camera: ${error.message || 'Lỗi không xác định'}. Vui lòng kiểm tra lại thiết bị.`);
      }
    }
  };

  const handleToggleCam = () => {
    if (isCamActive) {
      stopWebcam();
    } else {
      startWebcam(camFacingMode);
    }
  };

  const handleFlipCam = () => {
    const nextFacing = camFacingMode === 'user' ? 'environment' : 'user';
    startWebcam(nextFacing);
  };

  // Re-attach video stream whenever videoRef attaches (e.g. after render or mode change)
  useEffect(() => {
    if (isCamActive && mediaStreamRef.current && videoRef.current) {
      if (videoRef.current.srcObject !== mediaStreamRef.current) {
        videoRef.current.srcObject = mediaStreamRef.current;
        videoRef.current.play().catch(() => {/* noop */});
      }
    }
  }, [isCamActive]);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

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
                Phòng Tự Học Chung (Focus Room 2026)
              </h1>
              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-2xl mt-1">
                Ứng dụng kỹ thuật Pomodoro khoa học kết hợp âm thanh kích thích sóng não tập trung và Webcam học tập thời gian thực. Cùng các sĩ tử 2008 & 2007 nỗ lực bứt phá mục tiêu điểm 9+!
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-md shrink-0">
              <Users className="w-4 h-4 text-emerald-300" />
              <span className="text-xs font-bold text-white">48 bạn đang học cùng phòng</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Optional Notification Banner ─────────────────────── */}
      {bannerNotification && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 dark:from-teal-950/40 dark:via-emerald-950/40 dark:to-teal-950/40 border border-teal-500/30 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {bannerNotification.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {bannerNotification.message}
              </p>
            </div>
          </div>
          <button
            onClick={() => setBannerNotification(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Camera Error Alert (If Any) ────────────────────────── */}
      {camErrorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 flex items-center justify-between gap-3 animate-in fade-in duration-200 text-xs">
          <div className="flex items-center gap-2.5 text-rose-800 dark:text-rose-200">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <p>{camErrorMessage}</p>
          </div>
          <button
            onClick={() => setCamErrorMessage(null)}
            className="p-1 rounded-lg text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/60 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Main Workspace Grid ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Pomodoro Timer & Ambient Sounds (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden transition-colors">
            
            {/* Mode Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold">
              <button
                onClick={() => handleSwitchMode('focus')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  mode === 'focus'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Tập trung (25p)
              </button>
              <button
                onClick={() => handleSwitchMode('shortBreak')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  mode === 'shortBreak'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Nghỉ ngắn (5p)
              </button>
              <button
                onClick={() => handleSwitchMode('longBreak')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  mode === 'longBreak'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
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
                  className="stroke-slate-100 dark:stroke-slate-800 fill-none"
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
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-wider">
                  {mode === 'focus' ? '🎯 Đang tập trung' : '☕ Thời gian nghỉ ngơi'}
                </span>
              </div>
            </div>

            {/* Timer Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const nextRunning = !isRunning;
                  setIsRunning(nextRunning);
                  if (nextRunning && !isAudioPlaying && selectedSound !== 'silence') {
                    startAmbientAudio(selectedSound);
                  }
                }}
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
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Sessions count */}
            <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
              <CheckCircle2 className="w-4 h-4 text-teal-500" />
              <span>Hôm nay bạn đã hoàn thành: <strong className="text-slate-700 dark:text-slate-300">{sessionsCompleted} phiên Pomodoro</strong> ({sessionsCompleted * 25} phút)</span>
            </div>
          </div>

          {/* ── Ambient Sound Selector & Real Web Audio Player ─────── */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                  isAudioPlaying ? 'bg-teal-500/20 text-teal-600 dark:text-teal-400 animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}>
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                    Âm Thanh Nền Tập Trung (Web Audio API)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {isAudioPlaying ? '🎵 Đang phát trực tiếp từ bộ tổng hợp âm thanh' : '🔇 Đang tạm dừng phát âm thanh'}
                  </p>
                </div>
              </div>

              {/* Master Play/Mute & Volume */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
                  <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 sm:w-24 accent-teal-600 h-1.5 cursor-pointer"
                    title={`Âm lượng: ${Math.round(volume * 100)}%`}
                  />
                  <span className="text-[10px] font-mono text-slate-500 font-bold">{Math.round(volume * 100)}%</span>
                </div>

                <button
                  onClick={handleToggleAudio}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                    isAudioPlaying
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                      : 'bg-teal-600 text-white hover:bg-teal-700 shadow-xs'
                  }`}
                >
                  {isAudioPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isAudioPlaying ? 'Tắt âm' : 'Bật âm'}</span>
                </button>
              </div>
            </div>

            {/* Sound Preset Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-semibold">
              {[
                { id: 'lofi', label: 'Lo-Fi Piano', icon: '🎧', desc: 'Hợp âm êm dịu' },
                { id: 'rain', label: 'Mưa Êm Đêm', icon: '🌧️', desc: 'Tiếng mưa rơi nhẹ' },
                { id: 'cafe', label: 'Quán Cà Phê', icon: '☕', desc: 'Không gian ấm cúng' },
                { id: 'waves', label: 'Sóng Biển', icon: '🌊', desc: 'Nhịp thở biển khơi' },
              ].map(s => {
                const isSelected = selectedSound === s.id && isAudioPlaying;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSound(s.id as AmbientSoundType)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-200 shadow-sm ring-1 ring-teal-500'
                        : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                      </span>
                    )}
                    <span className="block text-2xl mb-1.5 transform group-hover:scale-110 transition-transform">{s.icon}</span>
                    <span className="block font-bold text-xs">{s.label}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{s.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Real Webcam Feed & Virtual Study Together (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* ── User's Own Camera & Focus Card ────────────────────── */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xs transition-colors">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Webcam Của Bạn
              </span>

              <div className="flex items-center gap-1.5">
                {isCamActive && (
                  <>
                    <button
                      onClick={handleFlipCam}
                      title="Đổi camera trước / sau"
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer text-xs"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsFullscreenCam(!isFullscreenCam)}
                      title="Mở rộng khung camera"
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer text-xs"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}

                <button
                  onClick={handleToggleCam}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isCamActive
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                      : 'bg-teal-600 text-white hover:bg-teal-700 shadow-xs'
                  }`}
                >
                  {isCamActive ? <CameraOff className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
                  <span>{isCamActive ? 'Tắt Cam' : 'Bật Webcam Thật'}</span>
                </button>
              </div>
            </div>

            {/* Video Viewport */}
            <div className={`relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 transition-all ${
              isFullscreenCam ? 'h-80 sm:h-96' : 'h-52 sm:h-60'
            }`}>
              {/* Actual Video Element */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isCamActive ? 'opacity-100 transform -scale-x-100' : 'opacity-0 absolute pointer-events-none'
                }`}
              />

              {/* Inactive State Avatar & Guide */}
              {!isCamActive && (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400">
                    <Camera className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Camera đang tắt</h5>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                      Bấm nút <strong>"Bật Webcam Thật"</strong> ở trên để cho phép trình duyệt hiển thị camera học tập của bạn.
                    </p>
                  </div>
                  <button
                    onClick={() => startWebcam()}
                    className="px-4 py-2 rounded-xl bg-teal-600/90 hover:bg-teal-600 text-white text-xs font-bold cursor-pointer transition-all shadow-xs"
                  >
                    Bật Camera Ngay
                  </button>
                </div>
              )}

              {/* Active Badges Overlay */}
              {isCamActive && (
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-rose-600/90 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" /> TRỰC TIẾP (LIVE)
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-black/60 text-slate-300 font-mono text-[10px] backdrop-blur-md">
                    HD 720p · 30fps
                  </span>
                </div>
              )}

              {/* Task Tag at bottom of video */}
              <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs flex items-center justify-between border border-white/10">
                <span className="truncate max-w-[200px] text-[11px]">🎯 {userTask}</span>
                <span className="text-[10px] text-emerald-400 font-bold font-mono">Đang tập trung</span>
              </div>
            </div>

            {/* Task Edit Area */}
            <div className="pt-1">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                Mục tiêu cần hoàn thành trong phiên này:
              </span>
              {isEditingTask ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={userTask}
                    onChange={(e) => setUserTask(e.target.value)}
                    className="flex-1 p-2 text-xs rounded-xl border border-teal-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <button
                    onClick={() => setIsEditingTask(false)}
                    className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                  >
                    Lưu
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => setIsEditingTask(true)}
                  className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer hover:border-teal-400 transition-colors"
                >
                  <span className="truncate">{userTask}</span>
                  <span className="text-[10px] text-teal-600 dark:text-teal-400 underline shrink-0 ml-2">Đổi mục tiêu</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Bảng Thống Kê Phiên Học Tập Cá Nhân (Thực Tế 100%) ────────── */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Không Gian Tự Học Cá Nhân
              </h4>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold bg-teal-50 dark:bg-teal-950/80 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" /> Phiên học thực chiến
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Tập trung hôm nay</span>
                <span className="text-xl font-black text-teal-600 dark:text-teal-400 font-mono mt-1 block">
                  {Math.floor(sessionsCompleted * 25)} phút
                </span>
                <span className="text-[10px] text-slate-500">{sessionsCompleted} chu kỳ Pomodoro</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Chế độ âm thanh</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block truncate">
                  {selectedSound === 'lofi' ? 'Lo-Fi Piano' : selectedSound === 'rain' ? 'Mưa Êm Đêm' : selectedSound === 'cafe' ? 'Quán Cà Phê' : selectedSound === 'waves' ? 'Sóng Biển' : 'Tắt âm'}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {isAudioPlaying ? '● Đang phát' : '○ Tắt'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Quy chuẩn phòng tự học Deep Work:</span>
              </div>
              <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-4 leading-relaxed">
                <li>Bật webcam tự soi gương để rèn tư thế ngồi nghiêm túc chuẩn phòng thi.</li>
                <li>Không sử dụng mạng xã hội hoặc chuyển tab làm gián đoạn chu kỳ 25 phút.</li>
                <li>Nghỉ ngắn 5 phút sau mỗi hiệp để não bộ củng cố kiến thức.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-center text-xs text-teal-800 dark:text-teal-200">
              💡 <em>&quot;Mỗi phút bạn tập trung kiên trì hôm nay là một bước tiến gần hơn đến cánh cổng trường Đại học mơ ước!&quot;</em>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
