/**
 * azotaParserService.ts
 * ─────────────────────────────────────────────────────────────────
 * BỘ PHÂN TÍCH & TỰ ĐỘNG PHÂN LOẠI NGÂN HÀNG ĐỀ THI (AZOTA / WORD / PDF PARSER)
 * Tự động trích xuất và lọc câu hỏi thành 3 nhóm chuẩn cấu trúc Bộ GD&ĐT 2025:
 *  - Phần I:   Trắc nghiệm 4 lựa chọn (A, B, C, D)
 *  - Phần II:  Trắc nghiệm Đúng / Sai (4 ý a, b, c, d)
 *  - Phần III: Trả lời ngắn / Tự luận ngắn (Điền số / kết quả ngắn)
 * ─────────────────────────────────────────────────────────────────
 */

import { Question, QuestionOption, TrueFalseItem, Subject, ChoiceKey, Exam } from '../types';

export interface ParsedQuestionItem {
  id: number;
  part: 'I' | 'II' | 'III';
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  text: string;
  options?: QuestionOption[];
  correctAnswer?: ChoiceKey;
  trueFalseItems?: TrueFalseItem[];
  shortAnswerCorrect?: string;
  explanation: string;
  topic?: string;
  difficulty?: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';
  isSelected: boolean;
}

export interface ParsedExamResult {
  title: string;
  subject: Subject;
  totalParsed: number;
  part1Questions: ParsedQuestionItem[];
  part2Questions: ParsedQuestionItem[];
  part3Questions: ParsedQuestionItem[];
  allQuestions: ParsedQuestionItem[];
}

/**
 * Phân tích đoạn văn bản thô (từ file Word, PDF, hoặc copy từ Azota)
 * và tự động phân loại thành các câu hỏi thuộc Phần I, Phần II, Phần III.
 */
export function parseExamDocument(
  rawText: string,
  defaultSubject: Subject = 'Toán học',
  defaultTitle: string = 'Đề Thi Mới Nhập Từ Tài Liệu'
): ParsedExamResult {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  
  const allQuestions: ParsedQuestionItem[] = [];
  let currentPart: 'I' | 'II' | 'III' = 'I';
  
  // Trích xuất các khối câu hỏi dựa trên từ khóa "Câu 1", "Câu 2", ...
  const questionBlocks: { part: 'I' | 'II' | 'III'; text: string }[] = [];
  let currentBlock = '';
  
  for (const line of lines) {
    // Nhận diện chuyển phần
    const upper = line.toUpperCase();
    if (upper.includes('PHẦN I') || upper.includes('PHẦN 1') || upper.includes('TRẮC NGHIỆM NHIỀU LỰA CHỌN')) {
      if (currentBlock) questionBlocks.push({ part: currentPart, text: currentBlock });
      currentBlock = '';
      currentPart = 'I';
      continue;
    } else if (upper.includes('PHẦN II') || upper.includes('PHẦN 2') || upper.includes('ĐÚNG SAI') || upper.includes('ĐÚNG / SAI')) {
      if (currentBlock) questionBlocks.push({ part: currentPart, text: currentBlock });
      currentBlock = '';
      currentPart = 'II';
      continue;
    } else if (upper.includes('PHẦN III') || upper.includes('PHẦN 3') || upper.includes('TRẢ LỜI NGẮN') || upper.includes('TỰ LUẬN NGẮN')) {
      if (currentBlock) questionBlocks.push({ part: currentPart, text: currentBlock });
      currentBlock = '';
      currentPart = 'III';
      continue;
    }

    // Nhận diện bắt đầu câu hỏi mới: "Câu 1:", "Câu 1.", "[Câu 1]", v.v.
    const isNewQuestion = /^(?:Câu|Bài|Question)\s*\d+[\s:.\-]/i.test(line) || /^\[(?:Phần\s*[I|II|III|\d]+\s*-\s*)?Câu\s*\d+\]/i.test(line);
    
    if (isNewQuestion && currentBlock.trim()) {
      questionBlocks.push({ part: currentPart, text: currentBlock });
      currentBlock = line;
    } else {
      currentBlock += (currentBlock ? '\n' : '') + line;
    }
  }

  if (currentBlock.trim()) {
    questionBlocks.push({ part: currentPart, text: currentBlock });
  }

  let counterId = 1;

  for (const block of questionBlocks) {
    const rawContent = block.text;
    
    // Tự động nhận diện lại phần nếu chưa rõ ràng
    let detectedPart = block.part;
    const hasTrueFalsePattern = /[a-d]\)\s*.*?(?:Đúng|Sai|true|false)/i.test(rawContent) || /[a-d]\.\s*.*?(?:Đúng|Sai)/i.test(rawContent);
    const hasABCDOptions = /[A-D][.:)]\s+[^\n]+/i.test(rawContent);

    if (detectedPart === 'I' && hasTrueFalsePattern && !hasABCDOptions) {
      detectedPart = 'II';
    } else if (detectedPart === 'I' && !hasABCDOptions && /(?:đáp số|điền số|kết quả|giá trị của|bằng bao nhiêu)/i.test(rawContent)) {
      detectedPart = 'III';
    }

    if (detectedPart === 'I') {
      // ── PHẦN I: TRẮC NGHIỆM 4 LỰA CHỌN ──────────────────────────
      const options: QuestionOption[] = [];
      const optionKeys: ChoiceKey[] = ['A', 'B', 'C', 'D'];
      
      // Tìm các phương án A, B, C, D
      for (const key of optionKeys) {
        const re = new RegExp(`(?:^|[\\n\\s])${key}[.:)]\\s*([^\\n]+)`, 'i');
        const match = rawContent.match(re);
        if (match) {
          options.push({
            key,
            label: match[1].replace(/^[A-D][.:)]\s*/i, '').trim()
          });
        }
      }

      // Tìm đáp án đúng (VD: "Đáp án: A", "Chọn A", "Đáp án đúng: A")
      let correctAnswer: ChoiceKey = 'A';
      const ansMatch = rawContent.match(/(?:Đáp án|Chọn|Key|Answer)[\s:]*([A-D])/i);
      if (ansMatch) {
        correctAnswer = ansMatch[1].toUpperCase() as ChoiceKey;
      }

      // Tách lời giải
      let explanation = 'Chưa có lời giải chi tiết cho câu hỏi này.';
      const explMatch = rawContent.match(/(?:Lời giải|Hướng dẫn giải|Giải thích|HDG)[\s:]([\s\S]+)$/i);
      if (explMatch) {
        explanation = explMatch[1].trim();
      }

      // Lấy phần thân câu hỏi (bỏ phần A, B, C, D và lời giải)
      let stemText = rawContent
        .replace(/(?:Lời giải|Hướng dẫn giải|Giải thích|HDG)[\s:][\s\S]+$/i, '')
        .replace(/(?:^|[\n\s])[A-D][.:)][\s\S]*$/i, '')
        .trim();
      if (!stemText) stemText = rawContent.slice(0, 150) + '...';

      allQuestions.push({
        id: counterId++,
        part: 'I',
        type: 'multiple_choice',
        text: stemText,
        options: options.length === 4 ? options : [
          { key: 'A', label: options[0]?.label || 'Phương án A' },
          { key: 'B', label: options[1]?.label || 'Phương án B' },
          { key: 'C', label: options[2]?.label || 'Phương án C' },
          { key: 'D', label: options[3]?.label || 'Phương án D' },
        ],
        correctAnswer,
        explanation,
        topic: 'Ôn tập phân loại',
        difficulty: counterId % 3 === 0 ? 'Vận dụng' : 'Thông hiểu',
        isSelected: true
      });

    } else if (detectedPart === 'II') {
      // ── PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI (4 Ý a, b, c, d) ─────────
      const tfKeys = ['a', 'b', 'c', 'd'] as const;
      const trueFalseItems: TrueFalseItem[] = [];

      for (const k of tfKeys) {
        const re = new RegExp(`(?:^|[\\n\\s])${k}[.:)]\\s*([^\\n]+)`, 'i');
        const match = rawContent.match(re);
        if (match) {
          const itemText = match[1].trim();
          const isCorrect = /đúng|true|đ|✓/i.test(itemText) && !/sai|false|s|✗/i.test(itemText);
          trueFalseItems.push({
            id: k,
            text: itemText.replace(/\s*[-–(]?(?:Đúng|Sai|True|False)[)]?/gi, '').trim(),
            correctAnswer: isCorrect
          });
        }
      }

      // Tách lời giải
      let explanation = 'Giải thích chi tiết tính Đúng/Sai của các mệnh đề a, b, c, d.';
      const explMatch = rawContent.match(/(?:Lời giải|Hướng dẫn giải|Giải thích|HDG)[\s:]([\s\S]+)$/i);
      if (explMatch) {
        explanation = explMatch[1].trim();
      }

      let stemText = rawContent
        .replace(/(?:Lời giải|Hướng dẫn giải|Giải thích|HDG)[\s:][\s\S]+$/i, '')
        .replace(/(?:^|[\n\s])[a-d][.:)][\s\S]*$/i, '')
        .trim();
      if (!stemText) stemText = rawContent.slice(0, 150) + '...';

      allQuestions.push({
        id: counterId++,
        part: 'II',
        type: 'true_false',
        text: stemText,
        trueFalseItems: trueFalseItems.length === 4 ? trueFalseItems : [
          { id: 'a', text: trueFalseItems[0]?.text || 'Mệnh đề kiểm tra ý a', correctAnswer: true },
          { id: 'b', text: trueFalseItems[1]?.text || 'Mệnh đề kiểm tra ý b', correctAnswer: false },
          { id: 'c', text: trueFalseItems[2]?.text || 'Mệnh đề kiểm tra ý c', correctAnswer: true },
          { id: 'd', text: trueFalseItems[3]?.text || 'Mệnh đề kiểm tra ý d', correctAnswer: false }
        ],
        explanation,
        topic: 'Trắc nghiệm Đúng / Sai',
        difficulty: 'Vận dụng',
        isSelected: true
      });

    } else {
      // ── PHẦN III: TRẢ LỜI NGẮN / TỰ LUẬN NGẮN (ĐIỀN SỐ) ─────────
      let shortAnswer = '0';
      const ansMatch = rawContent.match(/(?:Đáp số|Đáp án|Kết quả|Điền số|Answer)[\s:]*([0-9.,\-]+)/i);
      if (ansMatch) {
        shortAnswer = ansMatch[1].trim();
      }

      let explanation = 'Hướng dẫn giải chi tiết cho kết quả số điền vào ô trả lời.';
      const explMatch = rawContent.match(/(?:Lời giải|Hướng dẫn giải|Giải thích|HDG)[\s:]([\s\S]+)$/i);
      if (explMatch) {
        explanation = explMatch[1].trim();
      }

      let stemText = rawContent
        .replace(/(?:Lời giải|Hướng dẫn giải|Giải thích|HDG)[\s:][\s\S]+$/i, '')
        .replace(/(?:Đáp số|Đáp án|Kết quả|Điền số)[\s:][^\n]+/gi, '')
        .trim();
      if (!stemText) stemText = rawContent.slice(0, 150) + '...';

      allQuestions.push({
        id: counterId++,
        part: 'III',
        type: 'short_answer',
        text: stemText,
        shortAnswerCorrect: shortAnswer,
        explanation,
        topic: 'Trả lời ngắn điền số',
        difficulty: 'Vận dụng cao',
        isSelected: true
      });
    }
  }

  const part1 = allQuestions.filter(q => q.part === 'I');
  const part2 = allQuestions.filter(q => q.part === 'II');
  const part3 = allQuestions.filter(q => q.part === 'III');

  return {
    title: defaultTitle,
    subject: defaultSubject,
    totalParsed: allQuestions.length,
    part1Questions: part1,
    part2Questions: part2,
    part3Questions: part3,
    allQuestions
  };
}

/**
 * Tạo Exam chuẩn chỉnh từ danh sách câu hỏi đã lọc
 */
export function createExamFromParsedQuestions(
  title: string,
  subject: Subject,
  questions: ParsedQuestionItem[],
  durationMinutes: number = 50
): Exam {
  const convertedQuestions: Question[] = questions.map(q => ({
    id: q.id,
    part: q.part,
    type: q.type,
    text: q.text,
    options: q.options,
    correctAnswer: q.correctAnswer,
    trueFalseItems: q.trueFalseItems,
    shortAnswerCorrect: q.shortAnswerCorrect,
    explanation: q.explanation,
    topic: q.topic || 'Ôn tập ngân hàng đề',
    difficulty: q.difficulty || 'Thông hiểu'
  }));

  return {
    id: `exam-imported-${Date.now()}`,
    examCode: `IMP-${Math.floor(100 + Math.random() * 900)}`,
    title: title || 'Đề Thi Mới Nhập Từ Ngân Hàng',
    description: `Đề thi gồm ${questions.length} câu bám sát cấu trúc mới (Phần I, Phần II, Phần III). Được lọc và tạo tự động từ công cụ Admin LMS360.`,
    subject,
    grade: 'Lớp 12',
    durationMinutes,
    difficulty: 'Format Chuẩn BGD 2025',
    isBGDFormat: true,
    author: 'Admin TEST360 (Tự động lọc)',
    attemptsCount: 0,
    averageScore: 0,
    questions: convertedQuestions
  };
}

/**
 * Mẫu dữ liệu chuẩn Azota Lớp 12 để Admin có thể nạp thử nghiệm ngay lập tức với 1 click
 */
export const SAMPLE_AZOTA_GRADE12_DOCUMENT = `
PHẦN I: CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (Thí sinh chọn 1 phương án đúng A, B, C hoặc D)

Câu 1: Cho hàm số y = f(x) có đạo hàm f'(x) = (x - 1)(x + 2)²(x - 3)³. Số điểm cực đại của hàm số đã cho là:
A. 1
B. 2
C. 3
D. 0
Đáp án: A
Lời giải: Đạo hàm f'(x) đổi dấu từ dương sang âm khi qua x = 1. Qua x = -2 (nghiệm bội chẵn) f'(x) không đổi dấu. Qua x = 3 (nghiệm bội lẻ) f'(x) đổi dấu từ âm sang dương (cực tiểu). Vậy hàm số có đúng 1 điểm cực đại là x = 1. Chọn A.

Câu 2: Trong không gian Oxyz, phương trình mặt phẳng đi qua điểm M(1; 2; -3) và có vectơ pháp tuyến n = (2; -1; 3) là:
A. 2x - y + 3z + 9 = 0
B. 2x - y + 3z - 9 = 0
C. x + 2y - 3z + 9 = 0
D. 2x + y + 3z - 9 = 0
Đáp án: A
Lời giải: Phương trình: 2(x - 1) - 1(y - 2) + 3(z + 3) = 0 <=> 2x - y + 3z - 2 + 2 + 9 = 0 <=> 2x - y + 3z + 9 = 0. Chọn A.

Câu 3: Nguyên hàm của hàm số f(x) = e^(3x) + 2x là:
A. (1/3)e^(3x) + x² + C
B. 3e^(3x) + x² + C
C. (1/3)e^(3x) + 2 + C
D. e^(3x) + x² + C
Đáp án: A
Lời giải: ∫ (e^(3x) + 2x) dx = (1/3)e^(3x) + x² + C. Chọn A.

Câu 4: Thể tích của khối lăng trụ có diện tích đáy B = 12 cm² và chiều cao h = 5 cm bằng:
A. 60 cm³
B. 20 cm³
C. 30 cm³
D. 120 cm³
Đáp án: A
Lời giải: Thể tích khối lăng trụ V = B · h = 12 · 5 = 60 cm³. Chọn A.

PHẦN II: CÂU TRẮC NGHIỆM ĐÚNG / SAI (Thí sinh trả lời từng ý a, b, c, d là Đúng hoặc Sai)

Câu 5: Cho hàm số y = f(x) = (2x - 3) / (x + 1). Xét tính Đúng/Sai của các mệnh đề sau:
a) Tập xác định của hàm số là D = ℝ \\ {-1}. (Đúng)
b) Đồ thị hàm số có đường tiệm cận đứng là x = -1 và đường tiệm cận ngang là y = 2. (Đúng)
c) Hàm số luôn nghịch biến trên ℝ. (Sai)
d) Giao điểm của đồ thị hàm số với trục tung Oy là điểm M(0; -3). (Đúng)
Lời giải: Mệnh đề a Đúng vì mẫu x + 1 ≠ 0 <=> x ≠ -1. Mệnh đề b Đúng vì lim x→-1 = ∞ và lim x→∞ = 2. Mệnh đề c Sai vì hàm số đồng biến trên từng khoảng xác định do y' = 5/(x+1)² > 0, không được kết luận "trên R". Mệnh đề d Đúng vì thay x = 0 được y = -3.

Câu 6: Trong không gian Oxyz, cho hai điểm A(1; 0; -2) và B(3; 2; 0). Xét tính Đúng/Sai:
a) Tọa độ trung điểm I của đoạn thẳng AB là I(2; 1; -1). (Đúng)
b) Độ dài đoạn thẳng AB bằng 2√3. (Đúng)
c) Phương trình mặt cầu đường kính AB có bán kính R = √3. (Đúng)
d) Điểm O(0; 0; 0) nằm bên trong mặt cầu đường kính AB. (Sai)
Lời giải: a) I = (A+B)/2 = (2; 1; -1) (Đúng). b) AB = √[(3-1)² + (2-0)² + (0-(-2))²] = √(4+4+4) = 2√3 (Đúng). c) R = AB/2 = √3 (Đúng). d) Khoảng cách IO = √(2² + 1² + (-1)²) = √6 > √3 nên O nằm bên ngoài mặt cầu (Sai).

PHẦN III: CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (Thí sinh điền kết quả vào ô trả lời)

Câu 7: Một cơ sở sản xuất cần làm một thùng chứa nước hình trụ bằng inox không có nắp với dung tích 54π m³. Để tiết kiệm chi phí vật liệu inox nhất (diện tích toàn phần không nắp nhỏ nhất), bán kính đáy của hình trụ phải bằng bao nhiêu mét?
Đáp số: 3
Lời giải: V = πr²h = 54π => h = 54/r². Diện tích S = πr² + 2πrh = πr² + 108π/r = πr² + 54π/r + 54π/r ≥ 3 ∛(πr² · 54π/r · 54π/r) = 3 ∛(2916π³). Dấu "=" xảy ra khi πr² = 54π/r <=> r³ = 54/2 = 27 <=> r = 3 mét. Đáp số: 3.

Câu 8: Tính diện tích hình phẳng giới hạn bởi đường cong y = 3x² - 6x và trục hoành Ox.
Đáp số: 4
Lời giải: Phương trình hoành độ giao điểm: 3x² - 6x = 0 <=> x = 0 hoặc x = 2. Diện tích S = ∫[0 to 2] |3x² - 6x| dx = -(x³ - 3x²)|₀² = -(8 - 12) = 4. Đáp số: 4.
`.trim();
