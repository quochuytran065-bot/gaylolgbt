import React, { useState, useCallback, useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronUp, Calculator } from 'lucide-react';

interface CasioCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const BUTTON_ROWS = [
  [
    { label: 'sin', action: 'sin(', cls: 'fn' },
    { label: 'cos', action: 'cos(', cls: 'fn' },
    { label: 'tan', action: 'tan(', cls: 'fn' },
    { label: 'ln', action: 'ln(', cls: 'fn' },
    { label: 'log', action: 'log(', cls: 'fn' },
  ],
  [
    { label: 'x\u00B2', action: '**2', cls: 'fn' },
    { label: 'x\u00B3', action: '**3', cls: 'fn' },
    { label: '\u221A', action: 'sqrt(', cls: 'fn' },
    { label: '\u03C0', action: 'pi', cls: 'fn' },
    { label: 'e', action: 'e', cls: 'fn' },
  ],
  [
    { label: '(', action: '(', cls: 'gray' },
    { label: ')', action: ')', cls: 'gray' },
    { label: '%', action: '%', cls: 'gray' },
    { label: 'DEL', action: 'DEL', cls: 'del' },
    { label: 'AC', action: 'AC', cls: 'ac' },
  ],
  [
    { label: '7', action: '7', cls: 'num' },
    { label: '8', action: '8', cls: 'num' },
    { label: '9', action: '9', cls: 'num' },
    { label: '\u00F7', action: '/', cls: 'op' },
    { label: 'x^y', action: '**', cls: 'fn' },
  ],
  [
    { label: '4', action: '4', cls: 'num' },
    { label: '5', action: '5', cls: 'num' },
    { label: '6', action: '6', cls: 'num' },
    { label: '\u00D7', action: '*', cls: 'op' },
    { label: '1/x', action: '(1/', cls: 'fn' },
  ],
  [
    { label: '1', action: '1', cls: 'num' },
    { label: '2', action: '2', cls: 'num' },
    { label: '3', action: '3', cls: 'num' },
    { label: '\u2212', action: '-', cls: 'op' },
    { label: '|x|', action: 'abs(', cls: 'fn' },
  ],
  [
    { label: '0', action: '0', cls: 'num w2' },
    { label: '.', action: '.', cls: 'num' },
    { label: '+', action: '+', cls: 'op' },
    { label: '=', action: '=', cls: 'eq' },
  ],
];

const BTN_STYLE: Record<string, string> = {
  fn: 'bg-slate-700 hover:bg-slate-600 text-cyan-300 text-xs',
  gray: 'bg-slate-600 hover:bg-slate-500 text-slate-200 text-sm',
  del: 'bg-amber-700 hover:bg-amber-600 text-white text-sm font-bold',
  ac: 'bg-rose-700 hover:bg-rose-600 text-white text-sm font-bold',
  num: 'bg-slate-800 hover:bg-slate-700 text-white text-base font-semibold',
  op: 'bg-orange-700 hover:bg-orange-600 text-white text-base font-bold',
  eq: 'bg-orange-500 hover:bg-orange-400 text-white text-base font-bold',
};

function calcEval(expr: string): string {
  try {
    const e = expr
      .replace(/pi/g, 'Math.PI')
      .replace(/\be\b/g, 'Math.E')
      .replace(/sin\(/g, 'Math.sin(Math.PI/180*')
      .replace(/cos\(/g, 'Math.cos(Math.PI/180*')
      .replace(/tan\(/g, 'Math.tan(Math.PI/180*')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/abs\(/g, 'Math.abs(')
      .replace(/%/g, '/100');
    // eslint-disable-next-line no-new-func
    const r = new Function('return (' + e + ')')();
    if (r == null || isNaN(r)) return 'Lỗi';
    if (!isFinite(r)) return r > 0 ? 'Inf' : '-Inf';
    return String(parseFloat(r.toPrecision(10)));
  } catch {
    return 'Lỗi';
  }
}

export const CasioCalculator: React.FC<CasioCalculatorProps> = ({ isOpen, onClose }) => {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('0');
  const [mem, setMem] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [isDeg] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 24, y: 90 });
  const dragging = useRef(false);
  const off = useRef({ x: 0, y: 0 });

  const act = useCallback((action: string) => {
    if (action === 'AC') {
      setExpr('');
      setResult('0');
    } else if (action === 'DEL') {
      setExpr(p => p.slice(0, -1));
    } else if (action === '=') {
      const r = calcEval(expr);
      setResult(r);
      if (r !== 'Lỗi') setExpr(r);
    } else if (action === 'M+') {
      setMem(m => m + parseFloat(result === 'Lỗi' ? '0' : result));
    } else if (action === 'MR') {
      setExpr(p => p + String(mem));
    } else if (action === 'MC') {
      setMem(0);
    } else {
      setExpr(p => p + action);
    }
  }, [expr, result, mem]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (ev: KeyboardEvent) => {
      const t = ev.target as HTMLElement;
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return;
      if (ev.key === 'Escape') {
        onClose();
        return;
      }
      if (/[0-9]/.test(ev.key)) setExpr(p => p + ev.key);
      if (['+', '-', '*', '/'].includes(ev.key)) setExpr(p => p + ev.key);
      if (ev.key === '.') setExpr(p => p + '.');
      if (ev.key === 'Enter' || ev.key === '=') act('=');
      if (ev.key === 'Backspace') act('DEL');
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, act, onClose]);

  useEffect(() => {
    const mv = (ev: MouseEvent) => {
      if (!dragging.current) return;
      pos.current = { x: ev.clientX - off.current.x, y: ev.clientY - off.current.y };
      if (ref.current) {
        ref.current.style.left = pos.current.x + 'px';
        ref.current.style.top = pos.current.y + 'px';
      }
    };
    const mu = () => {
      dragging.current = false;
    };
    window.addEventListener('mousemove', mv);
    window.addEventListener('mouseup', mu);
    return () => {
      window.removeEventListener('mousemove', mv);
      window.removeEventListener('mouseup', mu);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="fixed z-[9999] shadow-2xl rounded-2xl overflow-hidden select-none border border-slate-700 font-sans"
      style={{ left: pos.current.x, top: pos.current.y, width: 280 }}
    >
      <div
        className="bg-slate-900 px-3 py-2 flex items-center justify-between cursor-grab active:cursor-grabbing border-b border-slate-700"
        onMouseDown={ev => {
          dragging.current = true;
          off.current = { x: ev.clientX - pos.current.x, y: ev.clientY - pos.current.y };
        }}
      >
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-cyan-300 tracking-wider">CASIO fx-580VN X</span>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-700/80 text-amber-200">
            {isDeg ? 'DEG' : 'RAD'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCollapsed(c => !c)}
            className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
            title="Thu nhỏ / Mở rộng"
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer transition-colors"
            title="Đóng máy tính"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="bg-slate-900">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800">
            {mem !== 0 && <div className="text-[10px] text-cyan-500 font-mono">M={mem}</div>}
            <div className="text-right text-slate-400 text-xs font-mono truncate min-h-[18px]">
              {expr || '0'}
            </div>
            <div
              className={`text-right font-mono font-bold truncate mt-1 ${
                result === 'Lỗi' ? 'text-rose-400 text-lg' : 'text-white text-2xl'
              }`}
            >
              {result}
            </div>
          </div>

          <div className="flex gap-1 px-2 pt-2">
            {['MC', 'MR', 'M+'].map(b => (
              <button
                key={b}
                onClick={() => act(b)}
                className="flex-1 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-[11px] font-bold cursor-pointer transition-colors"
              >
                {b}
              </button>
            ))}
          </div>

          <div className="p-2 space-y-1.5">
            {BUTTON_ROWS.map((row, ri) => (
              <div key={ri} className="grid grid-cols-5 gap-1.5">
                {row.map(btn => (
                  <button
                    key={btn.label}
                    onClick={() => act(btn.action)}
                    className={`py-2 rounded-xl text-center font-medium transition-all active:scale-95 cursor-pointer ${
                      BTN_STYLE[btn.cls.split(' ')[0]] || BTN_STYLE.num
                    } ${btn.cls.includes('w2') ? 'col-span-2' : ''}`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="px-3 pb-2 flex justify-between text-[9px] text-slate-500 font-mono">
            <span>EduViet Casio Virtual</span>
            <span>Chế độ thi trực tuyến</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CasioCalculator;
