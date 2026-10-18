/**
 * dynamicA00Engine.ts
 * ─────────────────────────────────────────────────────────────────
 * Engine xử lý câu hỏi Biến thiên số liệu (Dynamic Parameter Questions)
 * & Bộ dò bẫy sai sót kinh điển (Trap Detector) cho Khối A00 (Toán - Lý - Hóa).
 * ─────────────────────────────────────────────────────────────────
 */

import { Subject } from '../types';

export interface DynamicVariable {
  name: string;        // Tên biến trong đề bài (ví dụ: "m", "V", "H", "t", "p")
  min: number;
  max: number;
  step?: number;
  unit?: string;
  decimals?: number;   // Số chữ số thập phân khi random
}

export interface TrapFormula {
  id: string;
  name: string;        // Tên bẫy học sinh hay mắc (VD: "Quên đổi °C sang Kelvin")
  formula_js: string;  // Biểu thức JS tính ra kết quả bẫy
  warningMessage: string;
}

export interface DynamicQuestionDefinition {
  id: string | number;
  subject: Subject;
  topic: string;
  difficulty: 'Vận dụng 8.0 - 8.8' | 'Vận dụng cao 9.0 - 10.0';
  templateContent: string; // Chứa placeholder: {m}, {H}, {V}...
  variables: DynamicVariable[];
  formula_js: string;      // Công thức tính đáp án chuẩn
  roundTo: 'unit' | 'tenth' | 'hundredth'; // Làm tròn: đơn vị | hàng phần mười (0.1) | hàng phần trăm (0.01)
  tolerance?: number;
  common_wrong_formulas?: TrapFormula[];
  explanationTemplate: string;
}

export interface InstantiatedQuestion {
  id: string | number;
  definitionId: string | number;
  subject: Subject;
  topic: string;
  difficulty: string;
  content: string;               // Đề bài đã thay số liệu
  generatedVars: Record<string, number>;
  exactAnswer: number;
  exactAnswerFormatted: string;   // Đáp án đúng đã làm tròn theo chuẩn
  prematureRoundedAnswer?: string;// Đáp án nếu làm tròn sớm từ bước trung gian
  traps: {
    trapName: string;
    calculatedVal: number;
    formattedVal: string;
    warningMessage: string;
  }[];
  explanation: string;
}

/**
 * Sinh số ngẫu nhiên trong khoảng [min, max] theo step hoặc decimals
 */
function randomValue(variable: DynamicVariable): number {
  const { min, max, step = 1, decimals = 0 } = variable;
  const stepsCount = Math.floor((max - min) / step);
  const randomStep = Math.floor(Math.random() * (stepsCount + 1));
  const raw = min + randomStep * step;
  return Number(raw.toFixed(decimals));
}

/**
 * Định dạng số theo quy tắc làm tròn chuẩn BGD
 */
export function formatAnswerByRounding(val: number, roundTo: 'unit' | 'tenth' | 'hundredth'): string {
  if (isNaN(val)) return '0';
  if (roundTo === 'unit') {
    return String(Math.round(val));
  } else if (roundTo === 'tenth') {
    return val.toFixed(1).replace(/\.0$/, '');
  } else {
    return val.toFixed(2).replace(/\.?0+$/, '');
  }
}

/**
 * Thực thi an toàn biểu thức toán học JS dựa trên bộ biến số
 */
function evaluateFormula(formula: string, vars: Record<string, number>): number {
  try {
    // Tạo hàm tính toán với phạm vi biến đóng gói an toàn
    const varKeys = Object.keys(vars);
    const varVals = Object.values(vars);
    const func = new Function(...varKeys, `return (${formula});`);
    const result = func(...varVals);
    return Number(result);
  } catch (err) {
    console.error('Lỗi tính công thức dynamic question:', formula, vars, err);
    return 0;
  }
}

/**
 * Khởi tạo câu hỏi thực tế từ khuôn mẫu động
 */
export function instantiateDynamicQuestion(def: DynamicQuestionDefinition): InstantiatedQuestion {
  // 1. Sinh bộ số ngẫu nhiên
  const generatedVars: Record<string, number> = {};
  def.variables.forEach(v => {
    generatedVars[v.name] = randomValue(v);
  });

  // 2. Thay biến vào đề bài
  let renderedContent = def.templateContent;
  let renderedExplanation = def.explanationTemplate;

  Object.entries(generatedVars).forEach(([varName, val]) => {
    const regex = new RegExp(`\\{${varName}\\}`, 'g');
    renderedContent = renderedContent.replace(regex, String(val));
    renderedExplanation = renderedExplanation.replace(regex, String(val));
  });

  // 3. Tính đáp án chuẩn bằng công thức chính thức
  const exactAnswer = evaluateFormula(def.formula_js, generatedVars);
  const exactAnswerFormatted = formatAnswerByRounding(exactAnswer, def.roundTo);

  // 4. Tính toán các bẫy thường gặp
  const traps: InstantiatedQuestion['traps'] = [];
  if (def.common_wrong_formulas) {
    def.common_wrong_formulas.forEach(trapDef => {
      const trapVal = evaluateFormula(trapDef.formula_js, generatedVars);
      const trapFormatted = formatAnswerByRounding(trapVal, def.roundTo);
      traps.push({
        trapName: trapDef.name,
        calculatedVal: trapVal,
        formattedVal: trapFormatted,
        warningMessage: trapDef.warningMessage
      });
    });
  }

  return {
    id: `${def.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    definitionId: def.id,
    subject: def.subject,
    topic: def.topic,
    difficulty: def.difficulty,
    content: renderedContent,
    generatedVars,
    exactAnswer,
    exactAnswerFormatted,
    traps,
    explanation: renderedExplanation
  };
}

/**
 * Kiểm tra câu trả lời của thí sinh & phát hiện bẫy nếu làm sai
 */
export function checkAnswerWithTrapDetection(
  userAnswerRaw: string,
  question: InstantiatedQuestion,
  tolerance = 0.05
): {
  isCorrect: boolean;
  isTrapMatched: boolean;
  trapDetails?: { trapName: string; warningMessage: string };
  feedback: string;
} {
  const cleanUser = String(userAnswerRaw || '').trim().replace(',', '.');
  const userNum = parseFloat(cleanUser);

  if (isNaN(userNum) || cleanUser === '') {
    return {
      isCorrect: false,
      isTrapMatched: false,
      feedback: 'Thí sinh chưa nhập đáp án hoặc đáp án không phải số hợp lệ.'
    };
  }

  const cleanCorrect = parseFloat(question.exactAnswerFormatted.replace(',', '.'));

  // 1. Kiểm tra đúng tuyệt đối hoặc trong khoảng dung sai
  const isExact = Math.abs(userNum - cleanCorrect) <= tolerance;
  if (isExact) {
    return {
      isCorrect: true,
      isTrapMatched: false,
      feedback: 'Chính xác! Bạn đã tính toán và làm tròn kết quả chuẩn xác.'
    };
  }

  // 2. Dò tìm trong danh sách các bẫy phổ biến
  for (const trap of question.traps) {
    const trapNum = parseFloat(trap.formattedVal.replace(',', '.'));
    if (Math.abs(userNum - trapNum) <= tolerance) {
      return {
        isCorrect: false,
        isTrapMatched: true,
        trapDetails: {
          trapName: trap.trapName,
          warningMessage: trap.warningMessage
        },
        feedback: `Cảnh báo: Bạn đã mắc bẫy [${trap.trapName}]! ${trap.warningMessage}`
      };
    }
  }

  // 3. Sai thông thường
  return {
    isCorrect: false,
    isTrapMatched: false,
    feedback: `Đáp án chưa chính xác. Đáp án đúng của đề bài này là ${question.exactAnswerFormatted}.`
  };
}

/**
 * Ngân hàng câu hỏi động khối A00 chuẩn form 2026
 */
export const A00_DYNAMIC_QUESTION_BANK: DynamicQuestionDefinition[] = [
  // HÓA HỌC: LÊN MEN GLUCOSE
  {
    id: 'dyn-hoa-01',
    subject: 'Hóa học',
    topic: 'Carbohydrate - Lên men',
    difficulty: 'Vận dụng cao 9.0 - 10.0',
    templateContent: 'Lên men {m} gam glucose ($C_6H_{12}O_6$) thành ethanol với hiệu suất toàn bộ quá trình là {H}%. Toàn bộ lượng khí $CO_2$ sinh ra được hấp thụ hoàn toàn vào dung dịch $Ca(OH)_2$ dư, thu được kết tủa trắng. Cho $C = 12, H = 1, O = 16, Ca = 40$. Khối lượng kết tủa $CaCO_3$ thu được là bao nhiêu gam? (Làm tròn kết quả đến hàng đơn vị).',
    variables: [
      { name: 'm', min: 180, max: 540, step: 45, unit: 'g', decimals: 0 },
      { name: 'H', min: 70, max: 90, step: 5, unit: '%', decimals: 0 }
    ],
    formula_js: '(m / 180) * 2 * (H / 100) * 100', // m_CaCO3 = n_CO2 * 100
    roundTo: 'unit',
    common_wrong_formulas: [
      {
        id: 'trap-no-h',
        name: 'Quên nhân hiệu suất H%',
        formula_js: '(m / 180) * 2 * 100',
        warningMessage: 'Bạn đã tính ra khối lượng kết tủa lý thuyết khi hiệu suất 100% mà quên nhân với hiệu suất H% của phản ứng lên men.'
      },
      {
        id: 'trap-divide-h',
        name: 'Nhầm chia hiệu suất thay vì nhân',
        formula_js: '(m / 180) * 2 / (H / 100) * 100',
        warningMessage: 'Khi tính lượng chất sản phẩm tạo thành từ chất ban đầu, bạn phải NHÂN với hiệu suất (H/100), không phải CHIA.'
      },
      {
        id: 'trap-no-factor-2',
        name: 'Quên hệ số 2 của CO2',
        formula_js: '(m / 180) * 1 * (H / 100) * 100',
        warningMessage: 'Phương trình lên men sinh ra 2 phân tử CO2: C6H12O6 → 2C2H5OH + 2CO2. Bạn đã quên nhân hệ số 2.'
      }
    ],
    explanationTemplate: 'Phương trình phản ứng: $C_6H_{12}O_6 \\xrightarrow{\\text{men}} 2C_2H_5OH + 2CO_2$.\nSố mol glucose: $n_{\\text{glu}} = \\frac{\\{m\\}}{180}\\text{ mol}$.\nSố mol $CO_2$ thực tế: $n_{CO_2} = 2 \\cdot n_{\\text{glu}} \\cdot \\frac{\\{H\\}}{100}$.\nVì $Ca(OH)_2$ dư nên $n_{CaCO_3} = n_{CO_2}$.\nKhối lượng kết tủa: $m_{CaCO_3} = n_{CO_2} \\cdot 100\\text{ gam}$.'
  },

  // VẬT LÍ: KHÍ LÝ TƯỞNG ĐẲNG TÍCH
  {
    id: 'dyn-ly-01',
    subject: 'Vật lý',
    topic: 'Khí lý tưởng - Đẳng tích',
    difficulty: 'Vận dụng 8.0 - 8.8',
    templateContent: 'Một bình kín chịu nhiệt chứa một khối khí lí tưởng ở nhiệt độ ban đầu {t1}°C và áp suất {p1} atm. Người ta đun nóng khối khí đến nhiệt độ {t2}°C. Bỏ qua sự dãn nở nhiệt của bình. Áp suất của khối khí sau khi đun nóng là bao nhiêu atm? (Làm tròn kết quả đến hàng phần mười).',
    variables: [
      { name: 't1', min: 20, max: 40, step: 5, unit: '°C', decimals: 0 },
      { name: 'p1', min: 1.5, max: 3.5, step: 0.5, unit: 'atm', decimals: 1 },
      { name: 't2', min: 80, max: 160, step: 10, unit: '°C', decimals: 0 }
    ],
    formula_js: 'p1 * (t2 + 273.15) / (t1 + 273.15)',
    roundTo: 'tenth',
    common_wrong_formulas: [
      {
        id: 'trap-celsius',
        name: 'Quên đổi độ C sang Kelvin',
        formula_js: 'p1 * (t2 / t1)',
        warningMessage: 'Định luật Sác-lơ yêu cầu tính nhiệt độ theo thang đo Kelvin tuyệt đối (T = t + 273). Bạn đã dùng trực tiếp giá trị độ Celsius (°C).'
      }
    ],
    explanationTemplate: 'Quá trình biến đổi đẳng tích ($V = \\text{const}$), theo định luật Sác-lơ:\n$\\frac{p_1}{T_1} = \\frac{p_2}{T_2} \\implies p_2 = p_1 \\cdot \\frac{T_2}{T_1} = \\{p1\\} \\cdot \\frac{\\{t2\\} + 273}{\\{t1\\} + 273}\\text{ atm}$.'
  },

  // TOÁN HỌC: TỐI ƯU HÓA CHI PHÍ SẢN XUẤT THÙNG CHỨA
  {
    id: 'dyn-toan-01',
    subject: 'Toán học',
    topic: 'Ứng dụng đạo hàm - Tối ưu hóa',
    difficulty: 'Vận dụng cao 9.0 - 10.0',
    templateContent: 'Một công ty cần sản xuất một thùng chứa hình trụ bằng tôn không có nắp đậy với thể tích cố định là {V} mét khối ($m^3$). Để tiết kiệm chi phí vật liệu tối đa, diện tích tôn cần sử dụng $S$ phải nhỏ nhất. Tính bán kính đáy $r$ của thùng chứa theo đơn vị mét (m) để đạt mục tiêu trên. (Làm tròn kết quả đến hàng phần mười).',
    variables: [
      { name: 'V', min: 15, max: 45, step: 5, unit: 'm³', decimals: 0 }
    ],
    formula_js: 'Math.cbrt(V / Math.PI)', // r = cbrt(V / pi)
    roundTo: 'tenth',
    common_wrong_formulas: [
      {
        id: 'trap-with-lid',
        name: 'Nhầm có cả nắp thùng',
        formula_js: 'Math.cbrt(V / (2 * Math.PI))',
        warningMessage: 'Đề bài nêu rõ thùng tôn "KHÔNG CÓ NẮP ĐẬY" nên diện tích chỉ gồm 1 đáy hình tròn (πr²) và thân trụ (2πrh).'
      }
    ],
    explanationTemplate: 'Thùng không có nắp: $S = \\pi r^2 + 2\\pi r h$. Thể tích: $V = \\pi r^2 h \\implies h = \\frac{\\{V\\}}{\\pi r^2}$.\nSuy ra: $S(r) = \\pi r^2 + \\frac{2\\{V\\}}{r}$.\nĐạo hàm: $S\'(r) = 2\\pi r - \\frac{2\\{V\\}}{r^2} = 0 \\implies r^3 = \\frac{\\{V\\}}{\\pi} \\implies r = \\sqrt[3]{\\frac{\\{V\\}}{\\pi}}\\text{ m}$.'
  }
];
