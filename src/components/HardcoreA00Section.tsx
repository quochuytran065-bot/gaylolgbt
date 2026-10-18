import React, { useState, useMemo } from 'react';
import { Subject } from '../types';
import { 
  A00_DYNAMIC_QUESTION_BANK, 
  instantiateDynamicQuestion, 
  checkAnswerWithTrapDetection, 
  InstantiatedQuestion,
  DynamicQuestionDefinition
} from '../services/dynamicA00Engine';
import { 
  Zap, 
  Shuffle, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Clock, 
  Target, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Calculator, 
  HelpCircle,
  Flame,
  Check
} from 'lucide-react';

interface HardcoreA00SectionProps {
  onStartExamWithSubject?: (subject: Subject) => void;
}

export const HardcoreA00Section: React.FC<HardcoreA00SectionProps> = ({ onStartExamWithSubject }) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
  
  // Store instantiated dynamic questions in state: definitionId -> InstantiatedQuestion
  const [questionsMap, setQuestionsMap] = useState<Record<string | number, InstantiatedQuestion>>(() => {
    const initialMap: Record<string | number, InstantiatedQuestion> = {};
    A00_DYNAMIC_QUESTION_BANK.forEach(def => {
      initialMap[def.id] = instantiateDynamicQuestion(def);
    });
    return initialMap;
  });

  // User input answers: definitionId -> string
  const [userInputs, setUserInputs] = useState<Record<string | number, string>>({});

  // Grading feedback: definitionId -> ReturnType<typeof checkAnswerWithTrapDetection>
  const [feedbackMap, setFeedbackMap] = useState<Record<string | number, ReturnType<typeof checkAnswerWithTrapDetection>>>({});

  // Expanded explanations: definitionId -> boolean
  const [expandedExplanations, setExpandedExplanations] = useState<Record<string | number, boolean>>({});

  // Time-Attack Sprint mode state
  const [isSprintActive, setIsSprintActive] = useState<boolean>(false);

  // Filter definitions
  const filteredDefs = useMemo(() => {
    if (selectedSubject === 'all') return A00_DYNAMIC_QUESTION_BANK;
    return A00_DYNAMIC_QUESTION_BANK.filter(q => q.subject === selectedSubject);
  }, [selectedSubject]);

  // Re-roll a single question's random parameters
  const handleRegenerateQuestion = (def: DynamicQuestionDefinition) => {
    const newInstantiated = instantiateDynamicQuestion(def);
    setQuestionsMap(prev => ({
      ...prev,
      [def.id]: newInstantiated
    }));
    // Clear previous input & feedback for this question
    setUserInputs(prev => {
      const next = { ...prev };
      delete next[def.id];
      return next;
    });
    setFeedbackMap(prev => {
      const next = { ...prev };
      delete next[def.id];
      return next;
    });
    setExpandedExplanations(prev => ({
      ...prev,
      [def.id]: false
    }));
  };

  // Re-roll all questions in the bank
  const handleRegenerateAll = () => {
    const newMap: Record<string | number, InstantiatedQuestion> = {};
    A00_DYNAMIC_QUESTION_BANK.forEach(def => {
      newMap[def.id] = instantiateDynamicQuestion(def);
    });
    setQuestionsMap(newMap);
    setUserInputs({});
    setFeedbackMap({});
    setExpandedExplanations({});
  };

  // Grade student answer with trap detector
  const handleCheckAnswer = (defId: string | number) => {
    const q = questionsMap[defId];
    const input = userInputs[defId] || '';
    if (!q || !input.trim()) return;

    const result = checkAnswerWithTrapDetection(input, q);
    setFeedbackMap(prev => ({
      ...prev,
      [defId]: result
    }));
  };

  // 4-box bubble sheet character input handler
  const handleBubbleBoxChange = (defId: string | number, pos: number, val: string) => {
    let char = val;
    if (char === ',') char = '.';

    let isValid = false;
    if (pos === 0 && (/[0-9\-]/.test(char) || char === '')) isValid = true;
    if ((pos === 1 || pos === 2) && (/[0-9\.]/.test(char) || char === '')) isValid = true;
    if (pos === 3 && (/[0-9]/.test(char) || char === '')) isValid = true;

    if (!isValid && char !== '') return;

    const currentStr = String(userInputs[defId] || '');
    const chars = currentStr.padEnd(4, ' ').split('').slice(0, 4);
    chars[pos] = char || ' ';
    const newStr = chars.join('').trimEnd();

    setUserInputs(prev => ({
      ...prev,
      [defId]: newStr
    }));

    // Auto advance focus to next bubble box
    if (char && pos < 3) {
      const nextInput = document.getElementById(`bubble-hardcore-${defId}-${pos + 1}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
    }
  };

  return (
    <div className="space-y-6">

      {/* Hero Banner: Hardcore 8+ A00 Engine Overview */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-extrabold text-xs flex items-center gap-1.5 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              Chế Độ Hardcore 8+ A00
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 font-bold text-xs">
              ⚡ Biến Thiên Số Liệu Động & Bộ Dò Bẫy Sai Sót
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
              GDPT 2018 - 2026
            </span>
          </div>

          <div className="max-w-3xl space-y-2">
            <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              Luyện 3 Điểm Cuối Đề Thi: Chống Học Vẹt & Bắt Trọn Bẫy Kinh Điển
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mỗi lần mở đề hoặc bấm <strong className="text-amber-400">"Tạo Bộ Số Liệu Mới"</strong>, hệ thống tự động sinh số ngẫu nhiên cho các biến số <code className="text-cyan-300 font-mono font-bold">{'{m}'}</code>, <code className="text-cyan-300 font-mono font-bold">{'{V}'}</code>, <code className="text-cyan-300 font-mono font-bold">{'{H}'}</code>. Nếu bạn làm tròn số ở bước trung gian hoặc quên đổi đơn vị °C sang K, bộ dò bẫy sẽ cảnh báo chính xác ngay lập tức!
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleRegenerateAll}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Shuffle className="w-4 h-4 text-slate-950" />
              <span>Random Toàn Bộ Số Liệu Ngân Hàng</span>
            </button>

            <button
              onClick={() => setIsSprintActive(s => !s)}
              className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isSprintActive
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md ring-2 ring-rose-400'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{isSprintActive ? 'Đang bật Time-Attack 25 Phút' : 'Bật Áp Lực Thời Gian (25 Phút)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs by Subject (Toán - Lý - Hóa) */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-fit border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
        <button
          onClick={() => setSelectedSubject('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedSubject === 'all'
              ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Tất cả môn A00 ({A00_DYNAMIC_QUESTION_BANK.length})
        </button>
        <button
          onClick={() => setSelectedSubject('Toán học')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedSubject === 'Toán học'
              ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Toán Học
        </button>
        <button
          onClick={() => setSelectedSubject('Vật lý')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedSubject === 'Vật lý'
              ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Vật Lí
        </button>
        <button
          onClick={() => setSelectedSubject('Hóa học')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedSubject === 'Hóa học'
              ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Hóa Học
        </button>
      </div>

      {/* Dynamic Questions List */}
      <div className="space-y-6">
        {filteredDefs.map((def, index) => {
          const instantiated = questionsMap[def.id] || instantiateDynamicQuestion(def);
          const feedback = feedbackMap[def.id];
          const isExpanded = expandedExplanations[def.id];
          const currentVal = userInputs[def.id] || '';

          return (
            <div 
              key={def.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-5 transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs font-mono flex items-center justify-center shrink-0">
                    #{index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold text-xs font-mono">
                        {def.subject}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold text-xs">
                        {def.difficulty}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 block">
                      Chuyên đề: {def.topic}
                    </span>
                  </div>
                </div>

                {/* Randomize Button for this question */}
                <button
                  onClick={() => handleRegenerateQuestion(def)}
                  title="Tạo lại bộ số ngẫu nhiên mới cho bài toán này"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Đổi Số Liệu Mới</span>
                </button>
              </div>

              {/* Dynamic Variables Badge Bar */}
              <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Calculator className="w-3.5 h-3.5 text-sky-600" />
                  Bộ thông số ngẫu nhiên phiên này:
                </span>
                {Object.entries(instantiated.generatedVars).map(([vName, vVal]) => (
                  <span 
                    key={vName}
                    className="px-2.5 py-0.5 rounded-lg bg-white dark:bg-slate-800 font-mono font-bold text-sky-700 dark:text-sky-300 border border-slate-200 dark:border-slate-700 text-xs shadow-2xs"
                  >
                    {vName} = {vVal}
                  </span>
                ))}
                <span className="text-[11px] text-slate-400 ml-auto">
                  Quy chuẩn làm tròn: {def.roundTo === 'tenth' ? 'hàng phần mười (0.1)' : def.roundTo === 'hundredth' ? 'hàng phần trăm (0.01)' : 'hàng đơn vị'}
                </span>
              </div>

              {/* Problem Content (KaTeX / Formula) */}
              <div className="text-base font-medium text-slate-900 dark:text-slate-100 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {instantiated.content}
              </div>

              {/* 4-Box Bubble Sheet Numerical Input Area */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-emerald-600" />
                    Phiếu Trả Lời Ngắn (Tối Đa 4 Ô Ký Tự Chuẩn BGD):
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    Độ dài: {currentVal.length}/4 ô (chỉ số, dấu '-' hoặc '.')
                  </span>
                </div>

                {/* 4 Discrete Boxes */}
                <div className="flex items-center gap-2 sm:gap-3 max-w-sm">
                  {[0, 1, 2, 3].map((pos) => {
                    const charAtPos = currentVal[pos] || '';
                    return (
                      <div key={pos} className="flex-1 flex flex-col items-center gap-1">
                        <input
                          id={`bubble-hardcore-${def.id}-${pos}`}
                          type="text"
                          maxLength={1}
                          value={charAtPos === ' ' ? '' : charAtPos}
                          onChange={(e) => handleBubbleBoxChange(def.id, pos, e.target.value)}
                          placeholder={pos === 0 ? '±/0' : pos === 1 || pos === 2 ? './0' : '0'}
                          className="w-full h-13 text-center text-xl font-black font-mono rounded-xl border-2 border-slate-300 dark:border-slate-700 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none transition-all shadow-xs"
                        />
                        <span className="text-[9px] font-mono text-slate-400 uppercase">
                          Ô {pos + 1}
                        </span>
                      </div>
                    );
                  })}

                  <button
                    onClick={() => handleCheckAnswer(def.id)}
                    disabled={!currentVal.trim()}
                    className="px-4 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
                  >
                    Kiểm Tra & Dò Bẫy
                  </button>
                </div>

                {/* Feedback Banner (Correct, Trap, or Wrong) */}
                {feedback && (
                  <div className="pt-2 animate-in fade-in duration-200">
                    {feedback.isCorrect ? (
                      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs space-y-1">
                        <div className="font-extrabold flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>CHÍNH XÁC 100%! (+0.25 điểm chuẩn BGD)</span>
                        </div>
                        <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed">
                          Đáp số chuẩn đã làm tròn: <strong className="font-mono text-sm underline">{instantiated.exactAnswerFormatted}</strong>. Bạn đã xử lý rất chuẩn các bước tính toán và quy tắc làm tròn số.
                        </p>
                      </div>
                    ) : feedback.isTrapMatched ? (
                      <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/80 border-2 border-rose-400 dark:border-rose-700 text-rose-900 dark:text-rose-200 text-xs space-y-2 animate-shake">
                        <div className="font-extrabold flex items-center gap-2 text-sm text-rose-700 dark:text-rose-300">
                          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                          <span>CẢNH BÁO: BẠN ĐÃ MẮC BẪY [{feedback.trapDetails?.trapName || 'Bẫy đề thi'}]!</span>
                        </div>
                        <p className="text-rose-800 dark:text-rose-300 leading-relaxed font-medium">
                          {feedback.trapDetails?.warningMessage || feedback.feedback}
                        </p>
                        <div className="text-[11px] text-rose-700 dark:text-rose-400 bg-rose-100/70 dark:bg-rose-900/40 p-2.5 rounded-lg border border-rose-300/60">
                          Số bạn nhập là <strong>{currentVal}</strong> (trùng khớp với công thức sai thường gặp). Hãy bấm xem lời giải chi tiết bên dưới để rèn phản xạ tránh bẫy!
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                        <div className="font-bold flex items-center gap-2 text-amber-800 dark:text-amber-300">
                          <XCircle className="w-4 h-4 text-amber-600" />
                          <span>Đáp số chưa chính xác</span>
                        </div>
                        <p className="text-amber-800 dark:text-amber-300">
                          Số bạn nhập là <strong className="font-mono">{currentVal}</strong>, khác với đáp án chuẩn <strong className="font-mono">{instantiated.exactAnswerFormatted}</strong>. Hãy kiểm tra lại các bước biến đổi trung gian.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Collapsible Detailed Explanation & Trap Avoidance Guide */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setExpandedExplanations(prev => ({
                    ...prev,
                    [def.id]: !prev[def.id]
                  }))}
                  className="flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isExpanded ? 'Thu gọn lời giải chi tiết' : 'Xem lời giải chi tiết & mẹo phòng tránh bẫy'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {isExpanded && (
                  <div className="mt-3 p-5 rounded-2xl bg-indigo-50/70 dark:bg-slate-850 border border-indigo-200/80 dark:border-slate-800 space-y-3 text-xs leading-relaxed animate-in fade-in duration-200">
                    <div className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center justify-between border-b border-indigo-200/60 dark:border-slate-700 pb-2">
                      <span>Các bước giải chi tiết theo bộ số liệu ngẫu nhiên hiện tại:</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-extrabold">
                        Đáp án chuẩn: {instantiated.exactAnswerFormatted}
                      </span>
                    </div>

                    <div className="whitespace-pre-line text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
                      {instantiated.explanation}
                    </div>

                    {/* Trap Summary Box */}
                    {instantiated.traps.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs space-y-2 mt-3">
                        <strong className="text-rose-900 dark:text-rose-300 block font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          Các bẫy nguy hiểm của bài toán này trong phòng thi:
                        </strong>
                        <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                          {instantiated.traps.map((t, idx) => (
                            <li key={idx}>
                              <strong>{t.trapName}:</strong> {t.warningMessage} (Đáp án bẫy: <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{t.formattedVal}</span>).
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
