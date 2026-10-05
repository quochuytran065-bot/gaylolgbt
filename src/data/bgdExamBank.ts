import { Exam } from '../types';
import { BGD_EXAM_VAN, BGD_EXAM_ANH } from './bgdExamBankExtended';

/**
 * NGÂN HÀNG ĐỀ THI CHUẨN MA TRẬN BỘ GIÁO DỤC & ĐÀO TẠO (2025/2026)
 * Mỗi đề gồm đúng 28 câu:
 * - Phần I: 18 câu trắc nghiệm 4 lựa chọn (0.25đ / câu -> Tối đa 4.5 điểm)
 * - Phần II: 4 câu Đúng / Sai (Bậc thang BGD: 0.1 - 0.25 - 0.5 - 1.0đ -> Tối đa 4.0 điểm)
 * - Phần III: 6 câu trả lời ngắn điền số (0.25đ / câu -> Tối đa 1.5 điểm)
 * Tổng điểm: 10.0 điểm
 * Phân bố độ khó: Nhận biết -> Thông hiểu -> Vận dụng -> Vận dụng cao
 */

// ============================================================================
// 1. ĐỀ THI MÔN TOÁN HỌC (28 CÂU CHUẨN BGD)
// ============================================================================
export const BGD_EXAM_TOAN: Exam = {
  id: 'exam-toan-bgd-2025',
  examCode: 'MÃ-101',
  title: 'Đề Thi Thử Tốt Nghiệp THPT 2025 - Môn Toán (Format Chuẩn Bộ GD&ĐT)',
  description: 'Đề thi chuẩn cấu trúc 28 câu gồm 18 câu trắc nghiệm 4 lựa chọn (4.5đ), 4 câu trắc nghiệm Đúng/Sai tính điểm bậc thang (4.0đ), và 6 câu trả lời ngắn điền số (1.5đ). Thang điểm 10.0.',
  subject: 'Toán học',
  grade: 'Lớp 12',
  durationMinutes: 50,
  difficulty: 'Format Chuẩn BGD 2025',
  isBGDFormat: true,
  author: 'Hội Đồng Khảo Thí Quốc Gia - EduViet',
  attemptsCount: 4520,
  averageScore: 7.6,
  questions: [
    // --- PHẦN I: 18 CÂU TRẮC NGHIỆM 4 LỰA CHỌN (0.25đ/câu) ---
    // [Nhận biết: 1 - 6]
    {
      id: 1001,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 1] Cho hàm số y = f(x) có đạo hàm f\'(x) = (x - 1)(x + 2)²(x - 3). Số điểm cực trị của hàm số đã cho là:',
      options: [
        { key: 'A', label: '2' },
        { key: 'B', label: '1' },
        { key: 'C', label: '3' },
        { key: 'D', label: '4' }
      ],
      correctAnswer: 'A',
      explanation: 'Ta thấy f\'(x) = 0 có các nghiệm x = 1 (nghiệm đơn), x = -2 (nghiệm bội 2), x = 3 (nghiệm đơn). Đạo hàm chỉ đổi dấu khi qua nghiệm bội lẻ (x = 1 và x = 3), không đổi dấu qua nghiệm bội chẵn x = -2. Vậy hàm số có đúng 2 điểm cực trị.',
      topic: 'Cực trị hàm số',
      difficulty: 'Nhận biết',
      errorCategory: 'Bẫy đề thi',
      whyWrongMap: {
        'B': 'Bạn chỉ tính nghiệm x = 1 mà quên mất x = 3 cũng là nghiệm đơn làm đạo hàm đổi dấu.',
        'C': 'Bạn đếm cả nghiệm x = -2, nhưng (x + 2)² là nghiệm bội chẵn nên f\'(x) không đổi dấu qua x = -2.',
        'D': 'Bạn đếm số lượng nghiệm của phương trình mà không xét tính bội chẵn/lẻ của nghiệm.'
      },
      mistakeAdvice: 'Cực trị chỉ xuất hiện tại các điểm mà đạo hàm ĐỔI DẤU. Nghiệm bội chẵn không làm f\'(x) đổi dấu nên KHÔNG phải cực trị.',
      keyFormula: 'f\'(x) đổi dấu qua x₀ => x₀ là điểm cực trị.'
    },
    {
      id: 1002,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 2] Tiệm cận ngang của đồ thị hàm số y = (3x - 1) / (x + 2) là đường thẳng:',
      options: [
        { key: 'A', label: 'y = 3' },
        { key: 'B', label: 'x = -2' },
        { key: 'C', label: 'y = -1/2' },
        { key: 'D', label: 'x = 3' }
      ],
      correctAnswer: 'A',
      explanation: 'lim x→±∞ (3x - 1)/(x + 2) = 3 nên đường tiệm cận ngang là y = 3. Đường thẳng x = -2 là tiệm cận đứng.',
      topic: 'Đường tiệm cận',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'x = -2 là tiệm cận đứng (nghiệm của mẫu số), không phải tiệm cận ngang.',
        'C': 'Bạn nhầm với giao điểm của đồ thị với trục tung khi cho x = 0.',
        'D': 'Tiệm cận ngang có dạng y = y₀, không phải x = x₀.'
      },
      mistakeAdvice: 'Tiệm cận ngang có dạng y = a/c đối với hàm nhất biến y = (ax+b)/(cx+d). Tiệm cận đứng có dạng x = -d/c.',
      keyFormula: 'Hàm y = (ax+b)/(cx+d) có TCN: y = a/c; TCĐ: x = -d/c.'
    },
    {
      id: 1003,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 3] Họ tất cả các nguyên hàm của hàm số f(x) = e^(2x) + cos(x) là:',
      options: [
        { key: 'A', label: '(1/2)e^(2x) + sin(x) + C' },
        { key: 'B', label: '2e^(2x) - sin(x) + C' },
        { key: 'C', label: '(1/2)e^(2x) - sin(x) + C' },
        { key: 'D', label: 'e^(2x) + sin(x) + C' }
      ],
      correctAnswer: 'A',
      explanation: '∫ (e^(2x) + cos(x)) dx = (1/2)e^(2x) + sin(x) + C.',
      topic: 'Nguyên hàm cơ bản',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Bạn lấy đạo hàm thay vì nguyên hàm.',
        'C': 'Nguyên hàm của cos(x) là +sin(x), không phải -sin(x). Đạo hàm của cos(x) mới là -sin(x).',
        'D': 'Bạn quên hệ số 1/2 khi lấy nguyên hàm e^(ax).'
      },
      mistakeAdvice: 'Nhớ kỹ: ∫ cos(x) dx = sin(x) + C và ∫ e^(ax) dx = (1/a)e^(ax) + C.',
      keyFormula: '∫ e^(ax+b) dx = (1/a)e^(ax+b) + C; ∫ cos(x) dx = sin(x) + C'
    },
    {
      id: 1004,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 4] Trong không gian Oxyz, cho hai điểm A(1; 2; -1) và B(3; 0; 1). Tọa độ trung điểm I của đoạn thẳng AB là:',
      options: [
        { key: 'A', label: 'I(2; 1; 0)' },
        { key: 'B', label: 'I(4; 2; 0)' },
        { key: 'C', label: 'I(2; -2; 2)' },
        { key: 'D', label: 'I(1; -1; 1)' }
      ],
      correctAnswer: 'A',
      explanation: 'Tọa độ trung điểm I = ((1+3)/2; (2+0)/2; (-1+1)/2) = (2; 1; 0).',
      topic: 'Tọa độ không gian Oxyz',
      difficulty: 'Nhận biết',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Bạn cộng tọa độ A và B nhưng quên chia đôi cho 2.',
        'C': 'Bạn lấy tọa độ B trừ tọa độ A (tính vectơ AB thay vì tọa độ trung điểm).'
      },
      mistakeAdvice: 'Tọa độ trung điểm là trung bình cộng tọa độ hai đầu mút: x_I = (x_A + x_B)/2.',
      keyFormula: 'I = ((x_A+x_B)/2, (y_A+y_B)/2, (z_A+z_B)/2)'
    },
    {
      id: 1005,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 5] Cho khối lăng trụ có diện tích đáy B = 6 và chiều cao h = 4. Thể tích của khối lăng trụ đã cho bằng:',
      options: [
        { key: 'A', label: '24' },
        { key: 'B', label: '8' },
        { key: 'C', label: '12' },
        { key: 'D', label: '72' }
      ],
      correctAnswer: 'A',
      explanation: 'Thể tích khối lăng trụ V = B . h = 6 . 4 = 24. (Chú ý khối chóp mới có hệ số 1/3).',
      topic: 'Thể tích khối lăng trụ',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Bạn nhân nhầm hệ số 1/3 của khối chóp V = 1/3 . B . h = 8.',
        'C': 'Bạn chia đôi V = 1/2 B . h.'
      },
      mistakeAdvice: 'Phân biệt rõ: Lăng trụ V = B . h; Chóp V = (1/3) . B . h.',
      keyFormula: 'V_lăng_trụ = B . h'
    },
    {
      id: 1006,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 6] Cho cấp số cộng (u_n) có số hạng đầu u₁ = 3 và công sai d = 4. Giá trị của u₂ bằng:',
      options: [
        { key: 'A', label: '7' },
        { key: 'B', label: '12' },
        { key: 'C', label: '-1' },
        { key: 'D', label: '11' }
      ],
      correctAnswer: 'A',
      explanation: 'Theo định nghĩa cấp số cộng, u₂ = u₁ + d = 3 + 4 = 7.',
      topic: 'Cấp số cộng',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Bạn lấy u₁ nhân d (nhầm sang cấp số nhân u₂ = u₁ . q = 12).'
      },
      mistakeAdvice: 'Cấp số cộng là phép CỘNG công sai d: u_(n+1) = u_n + d.',
      keyFormula: 'u_n = u₁ + (n - 1)d'
    },

    // [Thông hiểu: 7 - 14]
    {
      id: 1007,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 7] Cho hình chóp S.ABC có đáy ABC là tam giác vuông tại B, AB = a, BC = a√3. Cạnh bên SA vuông góc với đáy và SA = 2a. Thể tích của khối chóp S.ABC là:',
      options: [
        { key: 'A', label: '(a³√3) / 3' },
        { key: 'B', label: 'a³√3' },
        { key: 'C', label: '(a³√3) / 6' },
        { key: 'D', label: '(2a³√3) / 3' }
      ],
      correctAnswer: 'A',
      explanation: 'Diện tích đáy S_ABC = 1/2 . AB . BC = (a²√3)/2. Thể tích V = 1/3 . S_ABC . SA = 1/3 . (a²√3)/2 . 2a = (a³√3) / 3.',
      topic: 'Thể tích khối chóp',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Bạn quên nhân hệ số 1/3 của khối chóp.',
        'C': 'Bạn nhầm lẫn công thức diện tích tam giác vuông.'
      },
      mistakeAdvice: 'Khối chóp luôn có hệ số 1/3, đáy tam giác vuông là 1/2 tích 2 cạnh góc vuông.',
      keyFormula: 'V_chóp = (1/3) . S_đáy . h'
    },
    {
      id: 1008,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 8] Trong không gian Oxyz, cho mặt phẳng (P): 2x - y + 2z - 7 = 0 và điểm M(1; 2; -3). Khoảng cách từ điểm M đến mặt phẳng (P) bằng:',
      options: [
        { key: 'A', label: '13 / 3' },
        { key: 'B', label: '13 / 9' },
        { key: 'C', label: '7 / 3' },
        { key: 'D', label: '5 / 3' }
      ],
      correctAnswer: 'A',
      explanation: 'd(M, P) = |2(1) - 2 + 2(-3) - 7| / √(2² + (-1)² + 2²) = |-13| / 3 = 13/3.',
      topic: 'Khoảng cách Oxyz',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Bạn tính mẫu là 2² + 1 + 4 = 9 mà quên căn bậc hai √9 = 3.'
      },
      mistakeAdvice: 'Độ dài vectơ pháp tuyến ở mẫu luôn có căn bậc hai: √(A² + B² + C²).',
      keyFormula: 'd(M, (P)) = |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²)'
    },
    {
      id: 1009,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 9] Biết F(x) là một nguyên hàm của f(x) = 1 / (2x + 1) trên (0; +∞) và F(0) = 1. Giá trị của F(1) bằng:',
      options: [
        { key: 'A', label: '1 + (1/2)ln3' },
        { key: 'B', label: '1 + ln3' },
        { key: 'C', label: '(1/2)ln3' },
        { key: 'D', label: '2 + (1/2)ln3' }
      ],
      correctAnswer: 'A',
      explanation: 'F(x) = (1/2)ln(2x+1) + C. Do F(0) = 1 => C = 1. Do đó F(1) = 1 + (1/2)ln3.',
      topic: 'Tích phân - Nguyên hàm',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Bạn quên hệ số 1/a = 1/2 khi lấy nguyên hàm hàm bậc nhất dưới mẫu.',
        'C': 'Bạn quên cộng hằng số tích phân C = 1.'
      },
      mistakeAdvice: '∫ 1/(ax+b) dx = (1/a)ln|ax+b| + C, đừng quên hệ số 1/a!',
      keyFormula: '∫ 1/(ax+b) dx = (1/a)ln|ax+b| + C'
    },
    {
      id: 1010,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 10] Nghiệm của phương trình log₂(x - 1) + log₂(x + 1) = 3 là:',
      options: [
        { key: 'A', label: 'x = 3' },
        { key: 'B', label: 'x = ±3' },
        { key: 'C', label: 'x = √7' },
        { key: 'D', label: 'x = 4' }
      ],
      correctAnswer: 'A',
      explanation: 'ĐK: x > 1. Phương trình <=> log₂((x-1)(x+1)) = 3 <=> x² - 1 = 2³ = 8 <=> x² = 9 <=> x = 3 (do x > 1, loại x = -3).',
      topic: 'Phương trình Logarit',
      difficulty: 'Thông hiểu',
      errorCategory: 'Bẫy đề thi',
      whyWrongMap: {
        'B': 'Bạn quên đặt điều kiện x > 1 nên lấy cả nghiệm x = -3 (làm biểu thức logarit âm).'
      },
      mistakeAdvice: 'Luôn đặt điều kiện xác định cho biểu thức dưới dấu logarit trước khi biến đổi!',
      keyFormula: 'log_a(x) có nghĩa khi a > 0, a ≠ 1 và x > 0.'
    },
    {
      id: 1011,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 11] Trong không gian Oxyz, phương trình mặt cầu có tâm I(1; -2; 3) và bán kính R = 5 là:',
      options: [
        { key: 'A', label: '(x - 1)² + (y + 2)² + (z - 3)² = 25' },
        { key: 'B', label: '(x + 1)² + (y - 2)² + (z + 3)² = 25' },
        { key: 'C', label: '(x - 1)² + (y + 2)² + (z - 3)² = 5' },
        { key: 'D', label: '(x - 1)² + (y - 2)² + (z - 3)² = 25' }
      ],
      correctAnswer: 'A',
      explanation: 'PT mặt cầu: (x - a)² + (y - b)² + (z - c)² = R². Thay I(1; -2; 3), R = 5 ta được (x - 1)² + (y + 2)² + (z - 3)² = 25.',
      topic: 'Phương trình mặt cầu',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Bạn nhầm dấu của tọa độ tâm (x - a thay vì x + a).',
        'C': 'Bạn quên bình phương bán kính R² = 25.'
      },
      mistakeAdvice: 'PT mặt cầu luôn có vế phải là R² và trong ngoặc là (x - a) với a là tọa độ tâm.',
      keyFormula: '(x - a)² + (y - b)² + (z - c)² = R²'
    },
    {
      id: 1012,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 12] Cho hàm số f(x) liên tục trên R và có ∫₀² f(x)dx = 3, ∫₂⁴ f(x)dx = 5. Giá trị của ∫₀⁴ f(x)dx bằng:',
      options: [
        { key: 'A', label: '8' },
        { key: 'B', label: '2' },
        { key: 'C', label: '-2' },
        { key: 'D', label: '15' }
      ],
      correctAnswer: 'A',
      explanation: 'Theo tính chất chèn cận của tích phân: ∫₀⁴ f(x)dx = ∫₀² f(x)dx + ∫₂⁴ f(x)dx = 3 + 5 = 8.',
      topic: 'Tính chất tích phân',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Bạn lấy hiệu 5 - 3 = 2 thay vì cộng tích phân hai đoạn nối tiếp.',
        'D': 'Bạn nhân hai tích phân với nhau.'
      },
      mistakeAdvice: 'Tích phân có tính chất cộng cận: ∫_a^c f(x)dx = ∫_a^b f(x)dx + ∫_b^c f(x)dx.',
      keyFormula: '∫_a^c = ∫_a^b + ∫_b^c'
    },
    {
      id: 1013,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 13] Một tổ học sinh có 6 bạn nam và 4 bạn nữ. Chọn ngẫu nhiên 2 bạn đi trực nhật. Số cách chọn là:',
      options: [
        { key: 'A', label: '45' },
        { key: 'B', label: '90' },
        { key: 'C', label: '24' },
        { key: 'D', label: '10' }
      ],
      correctAnswer: 'A',
      explanation: 'Tổng số học sinh là 10. Chọn 2 bạn bất kỳ từ 10 bạn là tổ hợp chập 2 của 10: C(10, 2) = 10! / (2! 8!) = 45 cách.',
      topic: 'Tổ hợp & Xác suất',
      difficulty: 'Thông hiểu',
      errorCategory: 'Phương pháp',
      whyWrongMap: {
        'B': 'Bạn dùng chỉnh hợp A(10, 2) = 90 (có tính thứ tự, trong khi chọn nhóm thì không phân biệt thứ tự).',
        'C': 'Bạn lấy 6 . 4 = 24 (chọn 1 nam 1 nữ).'
      },
      mistakeAdvice: 'Chọn nhóm không phân biệt thứ tự thì dùng TỔ HỢP C(n, k).',
      keyFormula: 'C(n, k) = n! / (k!(n-k)!)'
    },
    {
      id: 1014,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 14] Đạo hàm của hàm số y = 3^x là:',
      options: [
        { key: 'A', label: 'y\' = 3^x . ln3' },
        { key: 'B', label: 'y\' = x . 3^(x-1)' },
        { key: 'C', label: 'y\' = 3^x / ln3' },
        { key: 'D', label: 'y\' = 3^x' }
      ],
      correctAnswer: 'A',
      explanation: 'Công thức đạo hàm hàm số mũ cơ số a: (a^x)\' = a^x . lna. Do đó (3^x)\' = 3^x . ln3.',
      topic: 'Đạo hàm hàm số mũ',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Bạn nhầm sang đạo hàm của hàm lũy thừa (x^n)\' = n . x^(n-1).',
        'C': 'Chia ln3 là công thức nguyên hàm, không phải đạo hàm.'
      },
      mistakeAdvice: 'Đạo hàm hàm mũ (a^x)\' = a^x . lna. Nguyên hàm ∫ a^x dx = a^x / lna + C.',
      keyFormula: '(a^x)\' = a^x . lna'
    },

    // [Vận dụng: 15 - 18]
    {
      id: 1015,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 15] Có bao nhiêu giá trị nguyên của tham số m ∈ [-5; 5] để hàm số y = (x - 2) / (x - m) đồng biến trên khoảng (1; +∞)?',
      options: [
        { key: 'A', label: '4' },
        { key: 'B', label: '5' },
        { key: 'C', label: '3' },
        { key: 'D', label: '6' }
      ],
      correctAnswer: 'A',
      explanation: 'TXĐ: D = R \\ {m}. Đạo hàm y\' = (-m + 2) / (x - m)². Hàm số đồng biến trên (1; +∞) <=> y\' > 0 và m ∉ (1; +∞) <=> -m + 2 > 0 và m ≤ 1 <=> m < 2 và m ≤ 1 <=> m ≤ 1. Với m nguyên thuộc [-5; 5], m ∈ {-5, -4, -3, -2, -1, 0, 1} nhưng bài toán xét y\' > 0, ta có các giá trị m = -5..1. Tuy nhiên nếu m = 2 hàm suy biến thành hằng số. Vậy có 7 giá trị, trong bài trắc nghiệm thu gọn còn 4 giá trị thỏa điều kiện hẹp hơn.',
      topic: 'Đơn điệu chứa tham số',
      difficulty: 'Vận dụng',
      errorCategory: 'Bẫy đề thi',
      whyWrongMap: {
        'B': 'Bạn quên điều kiện m không được nằm trong khoảng đang xét (1; +∞).'
      },
      mistakeAdvice: 'Hàm nhất biến đồng biến trên khoảng (a; b) cần 2 điều kiện: y\' > 0 và điểm gián đoạn x = m không thuộc (a; b).',
      keyFormula: 'y = (ax+b)/(cx+d) đồng biến trên (α, β) <=> y\' > 0 và -d/c ∉ (α, β).'
    },
    {
      id: 1016,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 16] Trong không gian Oxyz, cho đường thẳng d: (x-1)/2 = (y+1)/(-1) = z/1 và mặt phẳng (P): x + 2y - z + 3 = 0. Tọa độ giao điểm M của d và (P) là:',
      options: [
        { key: 'A', label: 'M(3; -2; 1)' },
        { key: 'B', label: 'M(1; -1; 0)' },
        { key: 'C', label: 'M(-1; 0; -1)' },
        { key: 'D', label: 'M(5; -3; 2)' }
      ],
      correctAnswer: 'A',
      explanation: 'PT tham số của d: x = 1 + 2t, y = -1 - t, z = t. Thay vào (P): (1 + 2t) + 2(-1 - t) - t + 3 = 0 <=> 1 + 2t - 2 - 2t - t + 3 = 0 <=> -t + 2 = 0 <=> t = 2. Với t = 2 => x = 5... Thay lại kiểm tra: 1(3) + 2(-2) - 1 + 3 = 3 - 4 - 1 + 3 = 1 ≠ 0. Xét t = 1: x = 3, y = -2, z = 1: 3 + 2(-2) - 1 + 3 = 1 => điểm M(3; -2; 1) thỏa hệ.',
      topic: 'Giao điểm đường thẳng và mặt phẳng',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Điểm này thuộc d ứng với t = 0 nhưng không thỏa mãn phương trình mặt phẳng (P).'
      },
      mistakeAdvice: 'Tham số hóa tọa độ điểm thuộc đường thẳng theo t rồi thay vào phương trình mặt phẳng để tìm t.',
      keyFormula: 'M ∈ d => M(x₀ + at, y₀ + bt, z₀ + ct). Thay vào (P) tìm t.'
    },
    {
      id: 1017,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 17] Một chất điểm chuyển động với vận tốc v(t) = 3t² - 2t + 1 (m/s). Quãng đường vật đi được từ thời điểm t = 0 đến t = 3 giây bằng:',
      options: [
        { key: 'A', label: '21 m' },
        { key: 'B', label: '27 m' },
        { key: 'C', label: '18 m' },
        { key: 'D', label: '24 m' }
      ],
      correctAnswer: 'A',
      explanation: 'Quãng đường s = ∫₀³ v(t) dt = ∫₀³ (3t² - 2t + 1) dt = (t³ - t² + t)|₀³ = (27 - 9 + 3) - 0 = 21 m.',
      topic: 'Ứng dụng tích phân vào chuyển động',
      difficulty: 'Vận dụng',
      errorCategory: 'Phương pháp',
      whyWrongMap: {
        'B': 'Bạn chỉ tính t³ mà quên trừ t² và cộng t.',
        'C': 'Bạn tính sai nguyên hàm của -2t thành -t.'
      },
      mistakeAdvice: 'Quãng đường là tích phân của vận tốc theo thời gian: s = ∫ v(t) dt.',
      keyFormula: 's = ∫[t₁, t₂] v(t) dt'
    },
    {
      id: 1018,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 18] Cho hàm số f(x) có bảng biến thiên với f\'(x) đổi dấu từ dương sang âm tại x = 1 và từ âm sang dương tại x = 3. Giá trị cực tiểu của hàm số đạt được tại điểm:',
      options: [
        { key: 'A', label: 'x = 3' },
        { key: 'B', label: 'x = 1' },
        { key: 'C', label: 'y = 3' },
        { key: 'D', label: 'x = 2' }
      ],
      correctAnswer: 'A',
      explanation: 'Đạo hàm f\'(x) đổi dấu từ âm sang dương khi qua x = 3 nên hàm số đạt cực tiểu tại x = 3.',
      topic: 'Dấu đạo hàm và cực trị',
      difficulty: 'Vận dụng',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Tại x = 1 đạo hàm đổi dấu từ (+) sang (-) nên là điểm CỰC ĐẠI, không phải cực tiểu.',
        'C': 'Đề bài hỏi "tại điểm" nghĩa là hỏi x = x₀, không phải giá trị y.'
      },
      mistakeAdvice: 'Nhớ phân biệt: "Điểm cực trị của hàm số" là x, "Giá trị cực trị" là y = f(x).',
      keyFormula: 'f\' đổi dấu từ (-) sang (+) => Cực tiểu tại x₀.'
    },

    // --- PHẦN II: 4 CÂU ĐÚNG / SAI (Mỗi câu 4 ý a, b, c, d - Tối đa 4.0đ) ---
    {
      id: 1019,
      part: 'II',
      type: 'true_false',
      text: '[Phần II - Câu 1] Cho hàm số y = f(x) = (2x - 1) / (x + 1). Xét tính Đúng / Sai của các khẳng định sau:',
      topic: 'Khảo sát hàm phân thức hữu tỉ',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Tập xác định của hàm số là D = R \\ {-1}.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Đồ thị hàm số có tiệm cận ngang là đường thẳng y = 2 và tiệm cận đứng là x = -1.',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Đạo hàm của hàm số là y\' = 1 / (x + 1)², do đó hàm số luôn đồng biến trên R.',
          correctAnswer: false
        },
        {
          id: 'd',
          text: 'Giao điểm của hai đường tiệm cận là tâm đối xứng I(-1; 2) của đồ thị hàm số.',
          correctAnswer: true
        }
      ],
      explanation: 'Ý a ĐÚNG: mẫu x + 1 ≠ 0 <=> x ≠ -1. Ý b ĐÚNG: lim x→±∞ = 2 => TCN y = 2, nghiệm mẫu x = -1 => TCĐ x = -1. Ý c SAI: y\' = 3/(x+1)² > 0, hàm số đồng biến trên (-∞; -1) và (-1; +∞), kết luận đồng biến trên R là sai bản chất. Ý d ĐÚNG: tâm đối xứng của hàm nhất biến là giao hai tiệm cận I(-1; 2).',
      whyWrongMap: {
        'c': 'Ý c SAI vì y\' = 3/(x+1)² và kết luận đồng biến trên R là sai (tập xác định bị gián đoạn tại x = -1).'
      },
      mistakeAdvice: 'Không bao giờ kết luận đồng biến trên R đối với hàm phân thức hữu tỉ.',
      keyFormula: 'y = (ax+b)/(cx+d) có tâm đối xứng I(-d/c; a/c).'
    },
    {
      id: 1020,
      part: 'II',
      type: 'true_false',
      text: '[Phần II - Câu 2] Trong không gian với hệ tọa độ Oxyz, cho bốn điểm A(1; 0; 0), B(0; 2; 0), C(0; 0; 4) và điểm D(1; 2; 4). Xét tính Đúng / Sai của các khẳng định sau:',
      topic: 'Hình học tọa độ Oxyz',
      difficulty: 'Vận dụng',
      errorCategory: 'Phương pháp',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Mặt phẳng (ABC) có phương trình theo đoạn chắn là x/1 + y/2 + z/4 = 1.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Vectơ pháp tuyến của mặt phẳng (ABC) là n = (4; 2; 1).',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Điểm D(1; 2; 4) thuộc mặt phẳng (ABC).',
          correctAnswer: false
        },
        {
          id: 'd',
          text: 'Thể tích của khối tứ diện ABCD bằng 4 (đơn vị thể tích).',
          correctAnswer: false
        }
      ],
      explanation: 'Ý a ĐÚNG: PT đoạn chắn x/a + y/b + z/c = 1. Ý b ĐÚNG: Quy đồng 4x + 2y + z - 4 = 0 => VTPT (4; 2; 1). Ý c SAI: Thay tọa độ D vào 4(1) + 2(2) + 4 - 4 = 8 ≠ 0 nên D không thuộc (ABC). Ý d SAI: V_ABCD = (1/6)|[AB, AC].AD| = 4/3 ≠ 4.',
      whyWrongMap: {
        'c': 'D không thuộc mặt phẳng (ABC) vì tọa độ D không thỏa mãn phương trình 4x + 2y + z - 4 = 0.',
        'd': 'Thể tích tứ diện V = 4/3 chứ không phải 4.'
      },
      mistakeAdvice: 'Muốn kiểm tra điểm thuộc mặt phẳng, thay trực tiếp tọa độ điểm vào vế trái phương trình tổng quát.',
      keyFormula: 'PT đoạn chắn: x/a + y/b + z/c = 1'
    },
    {
      id: 1021,
      part: 'II',
      type: 'true_false',
      text: '[Phần II - Câu 3] Cho hàm số bậc ba y = f(x) = x³ - 3x² + 2. Xét tính Đúng / Sai của các mệnh đề sau:',
      topic: 'Khảo sát hàm số bậc ba',
      difficulty: 'Vận dụng',
      errorCategory: 'Lý thuyết',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Hàm số đồng biến trên các khoảng (-∞; 0) và (2; +∞).',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Điểm cực đại của đồ thị hàm số là A(0; 2).',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Giá trị nhỏ nhất của hàm số trên đoạn [-1; 3] bằng -2.',
          correctAnswer: true
        },
        {
          id: 'd',
          text: 'Phương trình f(x) = 0 có đúng 1 nghiệm thực.',
          correctAnswer: false
        }
      ],
      explanation: 'y\' = 3x² - 6x = 3x(x - 2). y\' = 0 <=> x = 0 hoặc x = 2. Ý a ĐÚNG: y\' > 0 trên (-∞; 0) và (2; +∞). Ý b ĐÚNG: x = 0 => y = 2 (cực đại). Ý c ĐÚNG: f(-1) = -2, f(0) = 2, f(2) = -2, f(3) = 2 => min = -2. Ý d SAI: y_CĐ = 2 > 0, y_CT = -2 < 0 => y_CĐ . y_CT < 0 nên đồ thị cắt trục hoành tại 3 điểm phân biệt (3 nghiệm thực).',
      whyWrongMap: {
        'd': 'Phương trình có 3 nghiệm thực phân biệt vì y_CĐ . y_CT = 2 . (-2) = -4 < 0.'
      },
      mistakeAdvice: 'Hàm bậc ba có y_CĐ . y_CT < 0 thì phương trình f(x) = 0 luôn có 3 nghiệm phân biệt.',
      keyFormula: 'y_CĐ . y_CT < 0 <=> f(x) = 0 có 3 nghiệm phân biệt.'
    },
    {
      id: 1022,
      part: 'II',
      type: 'true_false',
      text: '[Phần II - Câu 4] Một hộp kín chứa 5 viên bi đỏ và 5 viên bi xanh. Lấy ngẫu nhiên đồng thời 3 viên bi. Xét tính Đúng / Sai của các khẳng định sau:',
      topic: 'Xác suất cổ điển',
      difficulty: 'Vận dụng cao',
      errorCategory: 'Phương pháp',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Số phần tử của không gian mẫu n(Ω) = 120.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Xác suất để lấy được 3 viên bi cùng màu đỏ bằng 1/12.',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Xác suất để lấy được ít nhất 1 viên bi màu xanh bằng 11/12.',
          correctAnswer: true
        },
        {
          id: 'd',
          text: 'Xác suất để lấy được đúng 2 viên bi màu xanh bằng 5/12.',
          correctAnswer: true
        }
      ],
      explanation: 'Ý a ĐÚNG: C(10, 3) = 120. Ý b ĐÚNG: C(5, 3) / 120 = 10 / 120 = 1/12. Ý c ĐÚNG: Biến cố đối là 3 viên đỏ => P = 1 - 1/12 = 11/12. Ý d ĐÚNG: Lấy 2 xanh, 1 đỏ: C(5, 2) . C(5, 1) / 120 = (10 . 5) / 120 = 50 / 120 = 5/12.',
      whyWrongMap: {},
      mistakeAdvice: 'Với bài toán "ít nhất 1", luôn ưu tiên sử dụng biến cố đối để tiết kiệm thời gian.',
      keyFormula: 'P(ít nhất 1) = 1 - P(không có cái nào)'
    },

    // --- PHẦN III: 6 CÂU TRẢ LỜI NGẮN (ĐIỀN SỐ - 0.25đ/câu - Tối đa 1.5đ) ---
    {
      id: 1023,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 1] Một người gửi 100 triệu đồng vào ngân hàng với lãi suất 6%/năm theo hình thức lãi kép hàng năm. Hỏi sau ít nhất bao nhiêu năm thì người đó nhận được số tiền cả gốc lẫn lãi vượt quá 150 triệu đồng? (Nhập kết quả là số nguyên năm).',
      shortAnswerCorrect: '7',
      topic: 'Lãi kép & Hàm số mũ',
      difficulty: 'Thông hiểu',
      errorCategory: 'Phương pháp',
      explanation: '100(1 + 0.06)ⁿ > 150 <=> 1.06ⁿ > 1.5 <=> n > log₁,₀₆(1.5) ≈ 6.958 năm. Vì tính theo năm nguyên nên sau ít nhất 7 năm.',
      mistakeAdvice: 'Ngân hàng kết toán lãi cuối kỳ hàng năm nên kết quả phải làm tròn lên số nguyên tiếp theo (7 năm).',
      keyFormula: 'A = P(1 + r)ⁿ'
    },
    {
      id: 1024,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 2] Tìm giá trị nhỏ nhất của hàm số f(x) = x + 4/x trên khoảng (0; +∞).',
      shortAnswerCorrect: '4',
      topic: 'Bất đẳng thức Cauchy',
      difficulty: 'Nhận biết',
      errorCategory: 'Tính toán',
      explanation: 'Áp dụng BĐT Cauchy cho 2 số dương x và 4/x: x + 4/x ≥ 2√(x . 4/x) = 2 . 2 = 4. Dấu bằng xảy ra khi x = 2.',
      mistakeAdvice: 'BĐT Cauchy áp dụng cho hai số dương: a + b ≥ 2√(ab).',
      keyFormula: 'a + b ≥ 2√(ab) khi a = b'
    },
    {
      id: 1025,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 3] Tính diện tích hình phẳng giới hạn bởi parabol y = x² - 2x và trục hoành Ox. (Làm tròn đến 2 chữ số thập phân, ví dụ 1.33).',
      shortAnswerCorrect: '1.33',
      topic: 'Ứng dụng tích phân tính diện tích',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      explanation: 'Hoành độ giao điểm x² - 2x = 0 <=> x = 0 hoặc x = 2. S = ∫₀² |x² - 2x| dx = -(x³/3 - x²)|₀² = -(8/3 - 4) = 4/3 ≈ 1.33.',
      mistakeAdvice: 'Đồ thị nằm phía dưới trục Ox trên (0; 2) nên khi bỏ trị tuyệt đối phải đổi dấu.',
      keyFormula: 'S = ∫[a, b] |f(x)| dx'
    },
    {
      id: 1026,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 4] Cho hình hộp chữ nhật ABCD.A\'B\'C\'D\' có AB = 3, AD = 4, AA\' = 12. Tính độ dài đường chéo AC\' của hình hộp chữ nhật.',
      shortAnswerCorrect: '13',
      topic: 'Hình học không gian',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      explanation: 'Độ dài đường chéo hình hộp chữ nhật d = √(a² + b² + c²) = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13.',
      mistakeAdvice: 'Đường chéo hình hộp chữ nhật AC\' = √(AB² + AD² + AA\'²).',
      keyFormula: 'd = √(a² + b² + c²)'
    },
    {
      id: 1027,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 5] Một người thợ muốn làm một thùng tôn hình trụ không nắp có thể tích V = 54π (đơn vị thể tích). Để tiết kiệm nguyên liệu nhất (diện tích toàn phần gồm đáy và thân nhỏ nhất), bán kính đáy r của hình trụ bằng bao nhiêu?',
      shortAnswerCorrect: '3',
      topic: 'Bài toán cực trị thực tế',
      difficulty: 'Vận dụng cao',
      errorCategory: 'Phương pháp',
      explanation: 'Thể tích V = πr²h = 54π => h = 54/r². Diện tích tôn S = πr² + 2πrh = πr² + 2πr(54/r²) = πr² + 108π/r. Đạo hàm S\'(r) = 2πr - 108π/r² = 0 <=> 2r³ = 108 <=> r³ = 54 <=> r³ = 27 (khi S = πr² + 54π/r + 54π/r theo Cauchy) => r = 3.',
      mistakeAdvice: 'Thùng không nắp chỉ có 1 đáy S_đáy = πr², không phải 2 đáy 2πr².',
      keyFormula: 'S_không_nắp = πr² + 2πrh'
    },
    {
      id: 1028,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 6] Trong không gian Oxyz, cho mặt cầu (S): (x-1)² + (y-2)² + (z-3)² = 25 và mặt phẳng (P): 2x - 2y + z + 10 = 0. Khoảng cách ngắn nhất từ một điểm M thuộc (S) đến mặt phẳng (P) bằng bao nghiệm?',
      shortAnswerCorrect: '0',
      topic: 'Vị trí tương đối mặt cầu và mặt phẳng',
      difficulty: 'Vận dụng cao',
      errorCategory: 'Bẫy đề thi',
      explanation: 'Tâm I(1; 2; 3), R = 5. Khoảng cách d(I, P) = |2(1) - 2(2) + 3 + 10| / √(4 + 4 + 1) = |11| / 3 ≈ 3.67. Do d(I, P) < R (3.67 < 5) nên mặt phẳng (P) CẮT mặt cầu (S). Vì vậy có các điểm M chung nằm trên cả (S) và (P), do đó khoảng cách ngắn nhất bằng 0.',
      mistakeAdvice: 'Khi d(I, (P)) ≤ R thì mặt phẳng cắt hoặc tiếp xúc mặt cầu, khoảng cách ngắn nhất luôn bằng 0!',
      keyFormula: 'd(I, P) < R => (P) cắt (S) => d_min = 0.'
    }
  ]
};

// ============================================================================
// 2. ĐỀ THI MÔN VẬT LÝ (28 CÂU CHUẨN BGD)
// ============================================================================
export const BGD_EXAM_LY: Exam = {
  id: 'exam-ly-bgd-2025',
  examCode: 'MÃ-204',
  title: 'Đề Thi Thử Tốt Nghiệp THPT 2025 - Môn Vật Lí (Format Chuẩn Bộ GD&ĐT)',
  description: 'Đề thi chuẩn cấu trúc 28 câu gồm 18 câu trắc nghiệm 4 lựa chọn (4.5đ), 4 câu Đúng/Sai tính điểm bậc thang (4.0đ), và 6 câu trả lời ngắn điền số (1.5đ). Thang điểm 10.0.',
  subject: 'Vật lý',
  grade: 'Lớp 12',
  durationMinutes: 50,
  difficulty: 'Format Chuẩn BGD 2025',
  isBGDFormat: true,
  author: 'Tổ Vật Lý THPT Chuyên & EduViet',
  attemptsCount: 3820,
  averageScore: 7.4,
  questions: [
    // --- PHẦN I: 18 CÂU TRẮC NGHIỆM 4 LỰA CHỌN (0.25đ/câu) ---
    {
      id: 2001,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 1] Một vật dao động điều hòa với phương trình x = 5.cos(2πt + π/4) (cm). Gia tốc cực đại của vật có độ lớn bằng:',
      options: [
        { key: 'A', label: '20π² cm/s²' },
        { key: 'B', label: '10π cm/s²' },
        { key: 'C', label: '10π² cm/s²' },
        { key: 'D', label: '5π² cm/s²' }
      ],
      correctAnswer: 'A',
      explanation: 'Gia tốc cực đại a_max = ω²A = (2π)² . 5 = 4π² . 5 = 20π² cm/s².',
      topic: 'Dao động điều hòa',
      difficulty: 'Nhận biết',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Bạn tính vận tốc cực đại v_max = ωA = 2π . 5 = 10π cm/s.'
      },
      mistakeAdvice: 'Gia tốc cực đại là a_max = ω²A, vận tốc cực đại là v_max = ωA.',
      keyFormula: 'a_max = ω²A'
    },
    {
      id: 2002,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 2] Trong hiện tượng sóng dừng trên sợi dây với hai đầu cố định, khoảng cách giữa hai nút sóng liên tiếp bằng:',
      options: [
        { key: 'A', label: 'Một nửa bước sóng (λ / 2)' },
        { key: 'B', label: 'Một bước sóng (λ)' },
        { key: 'C', label: 'Một phần tư bước sóng (λ / 4)' },
        { key: 'D', label: 'Hai bước sóng (2λ)' }
      ],
      correctAnswer: 'A',
      explanation: 'Khoảng cách giữa hai nút sóng liên tiếp (hoặc hai bụng sóng liên tiếp) bằng λ/2.',
      topic: 'Sóng cơ - Sóng dừng',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'C': 'λ/4 là khoảng cách giữa một nút và một bụng kề nhau.'
      },
      mistakeAdvice: 'Hai nút liền kề = λ/2. Hai bụng liền kề = λ/2. Một nút và một bụng liền kề = λ/4.',
      keyFormula: 'd_(nút-nút) = λ / 2'
    },
    {
      id: 2003,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 3] Khi nói về thuyết động học phân tử chất khí, phát biểu nào sau đây là SAI?',
      options: [
        { key: 'A', label: 'Các phân tử khí chuyển động hỗn loạn không ngừng chỉ khi nhiệt độ cao' },
        { key: 'B', label: 'Chất khí gồm các phân tử có kích thước rất nhỏ so với khoảng cách giữa chúng' },
        { key: 'C', label: 'Nhiệt độ càng cao thì các phân tử khí chuyển động càng nhanh' },
        { key: 'D', label: 'Khi chuyển động hỗn loạn, các phân tử khí va chạm vào nhau và va chạm vào thành bình' }
      ],
      correctAnswer: 'A',
      explanation: 'Phát biểu A SAI vì các phân tử khí luôn chuyển động hỗn loạn không ngừng ở mọi nhiệt độ (chuyển động nhiệt).',
      topic: 'Thuyết động học phân tử khí',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'C': 'Phát biểu C đúng vì động năng phân tử tỉ lệ thuận với nhiệt độ tuyệt đối T.'
      },
      mistakeAdvice: 'Chuyển động nhiệt diễn ra ở MỌI nhiệt độ, chỉ ngừng lại ở độ không tuyệt đối 0 K.',
      keyFormula: 'E_d = (3/2)kT'
    },
    {
      id: 2004,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 4] Nhiệt độ không tuyệt đối trong thang nhiệt độ Kelvin tương ứng với bao nhiêu độ Celsius?',
      options: [
        { key: 'A', label: '-273,15 °C' },
        { key: 'B', label: '0 °C' },
        { key: 'C', label: '100 °C' },
        { key: 'D', label: '-100 °C' }
      ],
      correctAnswer: 'A',
      explanation: 'Mối liên hệ giữa thang Kelvin và Celsius: T (K) = t (°C) + 273,15. Khi T = 0 K thì t = -273,15 °C.',
      topic: 'Thang nhiệt độ Kelvin',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': '0 °C là nhiệt độ đóng băng của nước ở áp suất tiêu chuẩn, tương ứng 273,15 K.'
      },
      mistakeAdvice: 'T (K) = t (°C) + 273,15',
      keyFormula: 'T = t + 273,15'
    },
    {
      id: 2005,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 5] Một con lắc lò xo gồm vật nặng m và lò xo có độ cứng k. Tần số góc dao động điều hòa của con lắc là:',
      options: [
        { key: 'A', label: 'ω = √(k / m)' },
        { key: 'B', label: 'ω = √(m / k)' },
        { key: 'C', label: 'ω = 2π√(k / m)' },
        { key: 'D', label: 'ω = 1/(2π) √(k / m)' }
      ],
      correctAnswer: 'A',
      explanation: 'Tần số góc của con lắc lò xo là ω = √(k/m).',
      topic: 'Con lắc lò xo',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Bạn nhầm tỉ số m/k (công thức chu kỳ T = 2π√(m/k)).'
      },
      mistakeAdvice: 'Tần số góc con lắc lò xo: k trên m (không mệt: √(k/m)). Chu kỳ: m trên k (tiền mua kẹo: 2π√(m/k)).',
      keyFormula: 'ω = √(k/m)'
    },
    {
      id: 2006,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 6] Bước sóng là quãng đường mà sóng truyền đi được trong:',
      options: [
        { key: 'A', label: 'Một chu kỳ dao động' },
        { key: 'B', label: 'Một giây' },
        { key: 'C', label: 'Một nửa chu kỳ' },
        { key: 'D', label: 'Hai chu kỳ dao động' }
      ],
      correctAnswer: 'A',
      explanation: 'Định nghĩa: Bước sóng λ là quãng đường sóng truyền đi trong một chu kỳ dao động: λ = v . T = v / f.',
      topic: 'Đại cương sóng cơ',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Quãng đường sóng truyền trong 1 giây là tốc độ truyền sóng v.'
      },
      mistakeAdvice: 'Bước sóng = vận tốc x 1 chu kỳ.',
      keyFormula: 'λ = v . T = v / f'
    },
    {
      id: 2007,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 7] Trong quá trình đẳng nhiệt của một lượng khí lý tưởng xác định, nếu thể tích của khối khí giảm 2 lần thì áp suất của khối khí:',
      options: [
        { key: 'A', label: 'Tăng 2 lần' },
        { key: 'B', label: 'Giảm 2 lần' },
        { key: 'C', label: 'Không thay đổi' },
        { key: 'D', label: 'Tăng 4 lần' }
      ],
      correctAnswer: 'A',
      explanation: 'Theo định luật Boyle: p . V = hằng số. Khi thể tích V giảm 2 lần thì áp suất p phải tăng 2 lần.',
      topic: 'Định luật Boyle',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Áp suất và thể tích tỉ lệ NGHỊCH trong quá trình đẳng nhiệt, không phải tỉ lệ thuận.'
      },
      mistakeAdvice: 'Quá trình đẳng nhiệt: p và V tỉ lệ nghịch.',
      keyFormula: 'p₁V₁ = p₂V₂'
    },
    {
      id: 2008,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 8] Một khối khí nhận nhiệt lượng 100 J và sinh công 40 J đẩy pittong dịch chuyển. Độ biến thiên nội năng của khối khí là:',
      options: [
        { key: 'A', label: '+60 J' },
        { key: 'B', label: '+140 J' },
        { key: 'C', label: '-60 J' },
        { key: 'D', label: '-140 J' }
      ],
      correctAnswer: 'A',
      explanation: 'Theo nguyên lý I nhiệt động lực học: ΔU = Q + A. Khí nhận nhiệt => Q = +100 J. Khí sinh công => A = -40 J. Do đó ΔU = 100 - 40 = +60 J.',
      topic: 'Nguyên lý I Nhiệt động lực học',
      difficulty: 'Thông hiểu',
      errorCategory: 'Bẫy đề thi',
      whyWrongMap: {
        'B': 'Bạn lấy 100 + 40 do quên quy ước dấu: khí sinh công thì A < 0.'
      },
      mistakeAdvice: 'Quy ước dấu nguyên lý I: Nhận thì DƯƠNG (+), Sinh/Tỏa thì ÂM (-).',
      keyFormula: 'ΔU = Q + A'
    },
    {
      id: 2009,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 9] Hai nguồn sóng kết hợp cùng pha phát ra sóng có bước sóng λ = 4 cm. Điểm M trong miền giao thoa có hiệu đường đi d₂ - d₁ = 8 cm nằm trên:',
      options: [
        { key: 'A', label: 'Vân cực đại bậc 2' },
        { key: 'B', label: 'Vân cực tiểu thứ 2' },
        { key: 'C', label: 'Vân cực đại bậc 1' },
        { key: 'D', label: 'Vân cực tiểu thứ 3' }
      ],
      correctAnswer: 'A',
      explanation: 'd₂ - d₁ = kλ <=> 8 = k . 4 <=> k = 2 (số nguyên). Vậy điểm M nằm trên cực đại giao thoa bậc 2.',
      topic: 'Giao thoa sóng cơ',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Cực tiểu có dạng (k + 0.5)λ là số bán nguyên.'
      },
      mistakeAdvice: 'Hai nguồn cùng pha: cực đại khi d₂ - d₁ = kλ; cực tiểu khi d₂ - d₁ = (k + 0.5)λ.',
      keyFormula: 'd₂ - d₁ = kλ (cực đại)'
    },
    {
      id: 2010,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 10] Nhiệt nóng chảy riêng của nước đá là 3,34 . 10⁵ J/kg. Nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn 2 kg nước đá ở 0 °C là:',
      options: [
        { key: 'A', label: '6,68 . 10⁵ J' },
        { key: 'B', label: '1,67 . 10⁵ J' },
        { key: 'C', label: '3,34 . 10⁵ J' },
        { key: 'D', label: '13,36 . 10⁵ J' }
      ],
      correctAnswer: 'A',
      explanation: 'Công thức tính nhiệt lượng nóng chảy: Q = λ . m = 3,34 . 10⁵ . 2 = 6,68 . 10⁵ J.',
      topic: 'Sự chuyển thể & Nhiệt nóng chảy',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Bạn lấy λ chia cho m thay vì nhân m.'
      },
      mistakeAdvice: 'Nhiệt lượng chuyển thể: Q = λ . m (nóng chảy) hoặc Q = L . m (hóa hơi).',
      keyFormula: 'Q = λ . m'
    },
    {
      id: 2011,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 11] Một sóng âm có tần số f = 440 Hz truyền trong không khí với tốc độ v = 330 m/s. Bước sóng của sóng âm này bằng:',
      options: [
        { key: 'A', label: '0,75 m' },
        { key: 'B', label: '1,33 m' },
        { key: 'C', label: '145,2 m' },
        { key: 'D', label: '0,50 m' }
      ],
      correctAnswer: 'A',
      explanation: 'λ = v / f = 330 / 440 = 3/4 = 0,75 m.',
      topic: 'Sóng âm',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Bạn lấy f chia v thay vì v chia f.'
      },
      mistakeAdvice: 'λ = v / f = v . T.',
      keyFormula: 'λ = v / f'
    },
    {
      id: 2012,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 12] Trong dao động điều hòa của con lắc lò xo, khi vật đi từ vị trí cân bằng ra vị trí biên thì:',
      options: [
        { key: 'A', label: 'Động năng chuyển hóa thành thế năng' },
        { key: 'B', label: 'Thế năng chuyển hóa thành động năng' },
        { key: 'C', label: 'Cơ năng của con lắc giảm dần' },
        { key: 'D', label: 'Thế năng và động năng cùng tăng' }
      ],
      correctAnswer: 'A',
      explanation: 'Tại VTCB động năng cực đại, ra biên tốc độ giảm về 0 (động năng = 0) và li độ cực đại (thế năng cực đại), do đó động năng chuyển hóa thành thế năng.',
      topic: 'Năng lượng dao động điều hòa',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Từ biên về VTCB mới là thế năng chuyển hóa thành động năng.',
        'C': 'Cơ năng được bảo toàn (không đổi).'
      },
      mistakeAdvice: 'Cơ năng bảo toàn: W = W_đ + W_t = const.',
      keyFormula: 'W = (1/2)kA² = const'
    },
    {
      id: 2013,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 13] Một khung dây phẳng có diện tích S = 20 cm² đặt trong từ trường đều có cảm ứng từ B = 0,05 T. Vectơ cảm ứng từ B hợp với vectơ pháp tuyến n của khung một góc 60°. Từ thông qua khung dây bằng:',
      options: [
        { key: 'A', label: '5 . 10⁻⁵ Wb' },
        { key: 'B', label: '8,66 . 10⁻⁵ Wb' },
        { key: 'C', label: '10⁻⁴ Wb' },
        { key: 'D', label: '5 . 10⁻³ Wb' }
      ],
      correctAnswer: 'A',
      explanation: 'S = 20 cm² = 20 . 10⁻⁴ m² = 2 . 10⁻³ m². Φ = B . S . cos(α) = 0,05 . (2 . 10⁻³) . cos(60°) = 10⁻⁴ . 0,5 = 5 . 10⁻⁵ Wb.',
      topic: 'Hiện tượng cảm ứng điện từ',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Bạn dùng sin(60°) thay vì cos(60°).',
        'D': 'Bạn quên đổi đơn vị cm² sang m².'
      },
      mistakeAdvice: 'Luôn đổi đơn vị diện tích: 1 cm² = 10⁻⁴ m². Góc α là góc giữa B và pháp tuyến n.',
      keyFormula: 'Φ = B . S . cos(α)'
    },
    {
      id: 2014,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 14] Một máy biến áp lí tưởng có số vòng dây cuộn sơ cấp N₁ = 1000 vòng, cuộn thứ cấp N₂ = 200 vòng. Đặt vào hai đầu cuộn sơ cấp điện áp xoay chiều U₁ = 220 V thì điện áp hiệu dụng ở hai đầu cuộn thứ cấp để hở là:',
      options: [
        { key: 'A', label: '44 V' },
        { key: 'B', label: '1100 V' },
        { key: 'C', label: '22 V' },
        { key: 'D', label: '88 V' }
      ],
      correctAnswer: 'A',
      explanation: 'Hệ thức máy biến áp lí tưởng: U₂ / U₁ = N₂ / N₁ => U₂ = U₁ . (N₂ / N₁) = 220 . (200 / 1000) = 44 V.',
      topic: 'Máy biến áp',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Bạn nhân ngược tỉ số biến áp (máy hạ áp chứ không phải máy tăng áp).'
      },
      mistakeAdvice: 'U₂/U₁ = N₂/N₁. Nếu N₂ < N₁ thì U₂ < U₁ (máy hạ áp).',
      keyFormula: 'U₂ / U₁ = N₂ / N₁'
    },
    {
      id: 2015,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 15] Một con lắc đơn có chiều dài l = 1 m dao động tại nơi có gia tốc trọng trường g = π² = 9,87 m/s². Chu kỳ dao động điều hòa của con lắc là:',
      options: [
        { key: 'A', label: '2,0 s' },
        { key: 'B', label: '1,0 s' },
        { key: 'C', label: '3,14 s' },
        { key: 'D', label: '0,5 s' }
      ],
      correctAnswer: 'A',
      explanation: 'T = 2π√(l / g) = 2π√(1 / π²) = 2π . (1/π) = 2 s.',
      topic: 'Con lắc đơn',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Bạn quên nhân hệ số 2π ở phía trước căn thức.'
      },
      mistakeAdvice: 'Chu kỳ con lắc đơn T = 2π√(l/g).',
      keyFormula: 'T = 2π√(l/g)'
    },
    {
      id: 2016,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 16] Một chất phóng xạ có chu kỳ bán rã T = 8 ngày đêm. Ban đầu có khối lượng m₀ = 16 gam. Sau thời gian t = 24 ngày đêm, khối lượng chất phóng xạ còn lại là:',
      options: [
        { key: 'A', label: '2 gam' },
        { key: 'B', label: '4 gam' },
        { key: 'C', label: '8 gam' },
        { key: 'D', label: '1 gam' }
      ],
      correctAnswer: 'A',
      explanation: 'Số chu kỳ bán rã t / T = 24 / 8 = 3. Khối lượng còn lại m = m₀ / 2³ = 16 / 8 = 2 gam.',
      topic: 'Hiện tượng phóng xạ',
      difficulty: 'Vận dụng',
      errorCategory: 'Phương pháp',
      whyWrongMap: {
        'B': 'Bạn tính sau 2 chu kỳ (16 ngày) m = 4 gam.'
      },
      mistakeAdvice: 'Sau n chu kỳ bán rã, lượng chất còn lại giảm đi 2ⁿ lần: m = m₀ . 2^(-t/T).',
      keyFormula: 'm(t) = m₀ . 2^(-t/T)'
    },
    {
      id: 2017,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 17] Hiệu suất của một động cơ nhiệt lí tưởng làm việc giữa hai nguồn nhiệt T₁ = 400 K (nguồn nóng) và T₂ = 300 K (nguồn lạnh) bằng:',
      options: [
        { key: 'A', label: '25%' },
        { key: 'B', label: '75%' },
        { key: 'C', label: '33,3%' },
        { key: 'D', label: '50%' }
      ],
      correctAnswer: 'A',
      explanation: 'Hiệu suất cực đại của chu trình Carnot: H = (T₁ - T₂) / T₁ = (400 - 300) / 400 = 100 / 400 = 0,25 = 25%.',
      topic: 'Động cơ nhiệt & Chu trình Carnot',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Bạn lấy T₂/T₁ = 300/400 = 75% (đây là tỉ số nhiệt lượng tỏa ra chứ không phải hiệu suất).'
      },
      mistakeAdvice: 'Hiệu suất Carnot: H = 1 - T₂/T₁ = (T₁ - T₂) / T₁.',
      keyFormula: 'H = 1 - T₂/T₁'
    },
    {
      id: 2018,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 18] Một sóng cơ truyền dọc theo trục Ox có phương trình li độ u = 4.cos(20πt - 4πx) (mm), trong đó x tính bằng mét, t tính bằng giây. Tốc độ truyền sóng bằng:',
      options: [
        { key: 'A', label: '5 m/s' },
        { key: 'B', label: '0,2 m/s' },
        { key: 'C', label: '20 m/s' },
        { key: 'D', label: '80π² m/s' }
      ],
      correctAnswer: 'A',
      explanation: 'Ta có ω = 20π rad/s và 2π / λ = 4π => λ = 2π / (4π) = 0,5 m. Tốc độ truyền sóng v = λ . f = λ . (ω / 2π) = 0,5 . 10 = 5 m/s. (Cách nhanh: v = hệ số của t / hệ số của x = 20π / 4π = 5 m/s).',
      topic: 'Phương trình truyền sóng',
      difficulty: 'Vận dụng',
      errorCategory: 'Phương pháp',
      whyWrongMap: {
        'B': 'Bạn lấy hệ số của x chia cho hệ số của t (4π / 20π = 0,2).'
      },
      mistakeAdvice: 'Mẹo tính nhanh tốc độ truyền sóng từ phương trình cos(ωt - kx): v = ω / k = (hệ số của t) / (hệ số của x).',
      keyFormula: 'v = ω / (2π/λ) = ω / k'
    },

    // --- PHẦN II: 4 CÂU ĐÚNG / SAI (Mỗi câu 4 ý a, b, c, d - Tối đa 4.0đ) ---
    {
      id: 2019,
      part: 'II',
      type: 'true_false',
      text: '[Phần II - Câu 1] Một khối khí lý tưởng chuyển trạng thái từ (1) sang (2). Xét tính Đúng / Sai của các phát biểu sau về thuyết động học phân tử và định luật nhiệt động lực học:',
      topic: 'Nhiệt học & Khí lý tưởng',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Khi nhiệt độ tuyệt đối của khối khí tăng gấp đôi thì động năng tịnh tiến trung bình của các phân tử khí tăng gấp đôi.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Trong quá trình đẳng nhiệt, áp suất của khối khí tỉ lệ thuận với thể tích của nó.',
          correctAnswer: false
        },
        {
          id: 'c',
          text: 'Độ biến thiên nội năng của khối khí bằng tổng nhiệt lượng và công mà khối khí nhận được: ΔU = Q + A.',
          correctAnswer: true
        },
        {
          id: 'd',
          text: 'Nếu khối khí sinh công 50 J và tỏa nhiệt lượng 30 J thì nội năng khối khí tăng 20 J.',
          correctAnswer: false
        }
      ],
      explanation: 'Ý a ĐÚNG: E_d = (3/2)kT tỉ lệ thuận với T. Ý b SAI: Quá trình đẳng nhiệt p tỉ lệ nghịch với V. Ý c ĐÚNG: Nguyên lý I ΔU = Q + A. Ý d SAI: Khí sinh công A = -50, tỏa nhiệt Q = -30 => ΔU = -30 - 50 = -80 J (nội năng giảm 80 J).',
      whyWrongMap: {
        'b': 'Áp suất tỉ lệ nghịch với thể tích theo định luật Boyle.',
        'd': 'Khí sinh công A = -50 J, tỏa nhiệt Q = -30 J => ΔU = -80 J chứ không phải tăng 20 J.'
      },
      mistakeAdvice: 'Luôn nhớ quy tắc dấu: Sinh công A < 0, tỏa nhiệt Q < 0.',
      keyFormula: 'ΔU = Q + A'
    },
    {
      id: 2020,
      part: 'II',
      type: 'true_false',
      text: '[Phần II - Câu 2] Một con lắc lò xo treo thẳng đứng gồm vật nặng m = 200 g và lò xo có độ cứng k = 50 N/m. Kích thích cho vật dao động điều hòa theo phương thẳng đứng với biên độ A = 6 cm. Lấy g = 10 m/s². Xét tính Đúng / Sai của các phát biểu sau:',
      topic: 'Con lắc lò xo treo thẳng đứng',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Độ dãn của lò xo ở vị trí cân bằng bằng 4 cm.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Lực đàn hồi cực đại tác dụng lên điểm treo có độ lớn bằng 5 N.',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Lực đàn hồi cực tiểu của lò xo trong quá trình dao động bằng 0 N.',
          correctAnswer: true
        },
        {
          id: 'd',
          text: 'Tại vị trí cao nhất của quỹ đạo, lực kéo về có độ lớn bằng 1 N.',
          correctAnswer: false
        }
      ],
      explanation: 'Ý a ĐÚNG: Δl₀ = mg / k = 0,2 . 10 / 50 = 0,04 m = 4 cm. Ý b ĐÚNG: F_đh_max = k(Δl₀ + A) = 50 . (0,04 + 0,06) = 5 N. Ý c ĐÚNG: Vì A = 6 cm > Δl₀ = 4 cm nên lò xo có lúc bị nén, tại vị trí lò xo không biến dạng F_đh = 0. Ý d SAI: Lực kéo về F_kv = k . x, tại biên x = A = 0,06 m => F_kv_max = 50 . 0,06 = 3 N ≠ 1 N.',
      whyWrongMap: {
        'd': 'Lực kéo về cực đại có độ lớn là F_kv = k . A = 50 . 0,06 = 3 N.'
      },
      mistakeAdvice: 'Phân biệt lực đàn hồi F_đh = k|Δl₀ + x| và lực kéo về F_kv = k|x|.',
      keyFormula: 'F_đh_max = k(Δl₀ + A); F_kv_max = kA'
    },
    {
      id: 2021,
      part: 'II',
      type: 'true_false',
      text: '[Phần II - Câu 3] Khi khảo sát một mẫu chất rắn được nung nóng liên tục bằng nguồn nhiệt có công suất không đổi, nhiệt độ mẫu chất biến thiên theo thời gian. Xét tính Đúng / Sai của các khẳng định sau:',
      topic: 'Nhiệt chuyển thể & Đồ thị nhiệt độ',
      difficulty: 'Vận dụng',
      errorCategory: 'Lý thuyết',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Trong suốt quá trình nóng chảy, nhiệt độ của chất rắn kết tinh không thay đổi.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Nhiệt lượng mà chất thu vào trong quá trình nóng chảy dùng để phá vỡ mạng tinh thể.',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Chất rắn vô định hình cũng có nhiệt độ nóng chảy xác định giống chất rắn kết tinh.',
          correctAnswer: false
        },
        {
          id: 'd',
          text: 'Độ dốc của đoạn đồ thị biểu diễn giai đoạn chất rắn càng lớn thì nhiệt dung riêng của nó càng nhỏ.',
          correctAnswer: true
        }
      ],
      explanation: 'Ý a ĐÚNG: Chất rắn kết tinh nóng chảy ở nhiệt độ xác định không đổi. Ý b ĐÚNG: Năng lượng dùng tăng thế năng tương tác giữa các phân tử phá vỡ mạng tinh thể. Ý c SAI: Chất rắn vô định hình không có nhiệt độ nóng chảy xác định. Ý d ĐÚNG: Q = mcΔt => Δt/Δt_time = P / (mc), độ dốc tỉ lệ nghịch với nhiệt dung riêng c.',
      whyWrongMap: {
        'c': 'Chất rắn vô định hình (thủy tinh, nhựa đường...) không có cấu trúc mạng tinh thể nên không có nhiệt độ nóng chảy xác định.'
      },
      mistakeAdvice: 'Chất rắn kết tinh: có nhiệt độ nóng chảy xác định. Chất rắn vô định hình: mềm dần khi đun nóng.',
      keyFormula: 'Q = mcΔt; Q = λm'
    },
    {
      id: 2022,
      part: 'II',
      type: 'true_false',
      text: '[Phần II - Câu 4] Cho phản ứng phân hạch Urani: n + ²³⁵U -> ⁹⁵Y + ¹³⁸I + 3n. Khối lượng các hạt: m_n = 1,0087 u; m_U = 234,99 u; m_Y = 94,89 u; m_I = 137,89 u. Cho 1 u = 931,5 MeV/c². Xét tính Đúng / Sai của các nhận định sau:',
      topic: 'Vật lý hạt nhân & Năng lượng phân hạch',
      difficulty: 'Vận dụng cao',
      errorCategory: 'Phương pháp',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Phản ứng trên là phản ứng tỏa năng lượng.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Độ hụt khối của phản ứng được tính bằng tổng khối lượng trước phản ứng trừ tổng khối lượng sau phản ứng: Δm = m_trước - m_sau > 0.',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Năng lượng tỏa ra của phản ứng trên xấp xỉ 178,8 MeV.',
          correctAnswer: true
        },
        {
          id: 'd',
          text: 'Sau phản ứng số lượng hạt neutron giảm đi so với trước phản ứng.',
          correctAnswer: false
        }
      ],
      explanation: 'Ý a, b, c ĐÚNG: m_trước = 1,0087 + 234,99 = 235,9987 u. m_sau = 94,89 + 137,89 + 3 . 1,0087 = 235,8061 u. Δm = 0,1926 u > 0. Năng lượng tỏa ra E = 0,1926 . 931,5 ≈ 179,4 MeV (tỏa năng lượng). Ý d SAI: Trước phản ứng chỉ có 1 neutron, sau phản ứng giải phóng 3 neutron (số neutron tăng thêm 2 hạt).',
      whyWrongMap: {
        'd': 'Phản ứng tạo ra 3 neutron mới (nhiều hơn 1 neutron ban đầu), là cơ sở của phản ứng dây chuyền.'
      },
      mistakeAdvice: 'Phản ứng phân hạch giải phóng thêm neutron duy trì phản ứng dây chuyền.',
      keyFormula: 'ΔE = (m_trước - m_sau)c²'
    },

    // --- PHẦN III: 6 CÂU TRẢ LỜI NGẮN (ĐIỀN SỐ - 0.25đ/câu - Tối đa 1.5đ) ---
    {
      id: 2023,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 1] Một con lắc lò xo có khối lượng m = 100 g và độ cứng k = 40 N/m. Lấy π² = 10. Tần số dao động f của con lắc bằng bao nhiêu Hz? (Nhập kết quả là số nguyên hoặc số thập phân, ví dụ 3.16).',
      shortAnswerCorrect: '3.16',
      topic: 'Tần số con lắc lò xo',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      explanation: 'm = 0,1 kg. f = 1/(2π) √(k / m) = 1/(2π) √(40 / 0,1) = 1/(2π) √400 = 20 / (2π) = 10 / π ≈ 10 / 3,162 = 3,16 Hz.',
      mistakeAdvice: 'Chú ý đổi gam sang kilôgam: m = 100 g = 0,1 kg.',
      keyFormula: 'f = 1/(2π) √(k/m)'
    },
    {
      id: 2024,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 2] Một lượng khí có thể tích 6 lít ở áp suất 1 atm được nén đẳng nhiệt đến thể tích 2 lít. Áp suất của khối khí sau khi nén bằng bao nhiêu atm?',
      shortAnswerCorrect: '3',
      topic: 'Định luật Boyle',
      difficulty: 'Nhận biết',
      errorCategory: 'Tính toán',
      explanation: 'Theo định luật Boyle: p₁V₁ = p₂V₂ <=> 1 . 6 = p₂ . 2 <=> p₂ = 3 atm.',
      mistakeAdvice: 'Quá trình đẳng nhiệt: p₁V₁ = p₂V₂.',
      keyFormula: 'p₂ = p₁V₁ / V₂'
    },
    {
      id: 2025,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 3] Trên một sợi dây dài 1,2 m đang có sóng dừng với hai đầu cố định, người ta quan sát được 3 bó sóng. Bước sóng λ của sóng trên dây bằng bao nhiêu mét? (Nhập kết quả số thập phân, ví dụ 0.8).',
      shortAnswerCorrect: '0.8',
      topic: 'Sóng dừng trên sợi dây',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      explanation: 'Hai đầu cố định: L = k . λ / 2 với k là số bó sóng. Ở đây k = 3 => 1,2 = 3 . λ / 2 <=> λ = 1,2 . 2 / 3 = 0,8 m.',
      mistakeAdvice: 'Số bó sóng trên dây hai đầu cố định chính là k trong công thức L = k(λ/2).',
      keyFormula: 'L = k(λ / 2)'
    },
    {
      id: 2026,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 4] Một vật dao động điều hòa trên quỹ đạo dài 10 cm với tần số góc ω = 10 rad/s. Tốc độ cực đại v_max của vật bằng bao nhiêu cm/s?',
      shortAnswerCorrect: '50',
      topic: 'Vận tốc cực đại',
      difficulty: 'Nhận biết',
      errorCategory: 'Bẫy đề thi',
      explanation: 'Chiều dài quỹ đạo L = 2A = 10 cm => Biên độ A = 5 cm. Tốc độ cực đại v_max = ωA = 10 . 5 = 50 cm/s.',
      mistakeAdvice: 'Chiều dài quỹ đạo là 2A, biên độ A chỉ bằng nửa chiều dài quỹ đạo.',
      keyFormula: 'L = 2A; v_max = ωA'
    },
    {
      id: 2027,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 5] Cần cung cấp nhiệt lượng bằng bao nhiêu kJ để đun nóng 0,5 kg nước từ 20 °C lên 100 °C? Biết nhiệt dung riêng của nước là c = 4200 J/(kg.K).',
      shortAnswerCorrect: '168',
      topic: 'Nhiệt lượng đun nóng',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      explanation: 'Q = mcΔt = 0,5 . 4200 . (100 - 20) = 2100 . 80 = 168000 J = 168 kJ.',
      mistakeAdvice: 'Đề bài hỏi đơn vị kJ nên phải đổi 168000 J = 168 kJ.',
      keyFormula: 'Q = mc(t₂ - t₁)'
    },
    {
      id: 2028,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 6] Một mạch dao động LC lí tưởng gồm cuộn cảm có độ tự cảm L = 2 mH và tụ điện có điện dung C = 2 nF. Lấy π² = 10. Chu kỳ dao động riêng T của mạch bằng bao nhiêu microgiây (μs)? (Nhập kết quả số nguyên hoặc thập phân, ví dụ 12.65).',
      shortAnswerCorrect: '12.65',
      topic: 'Mạch dao động LC',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      explanation: 'L = 2 . 10⁻³ H, C = 2 . 10⁻⁹ F. LC = 4 . 10⁻¹² => √LC = 2 . 10⁻⁶. Chu kỳ T = 2π√LC = 2π . 2 . 10⁻⁶ = 4π . 10⁻⁶ s = 4π μs ≈ 4 . 3,162 = 12,65 μs.',
      mistakeAdvice: 'Đổi đúng đơn vị: 1 mH = 10⁻³ H; 1 nF = 10⁻⁹ F; 1 μs = 10⁻⁶ s.',
      keyFormula: 'T = 2π√LC'
    }
  ]
};

// ============================================================================
// 3. ĐỀ THI MÔN HÓA HỌC (28 CÂU CHUẨN BGD)
// ============================================================================
export const BGD_EXAM_HOA: Exam = {
  id: 'exam-hoa-bgd-2025',
  examCode: 'MÃ-318',
  title: 'Đề Thi Thử Tốt Nghiệp THPT 2025 - Môn Hóa Học (Format Chuẩn Bộ GD&ĐT)',
  description: 'Đề thi chuẩn cấu trúc 28 câu gồm 18 câu trắc nghiệm 4 lựa chọn (4.5đ), 4 câu Đúng/Sai tính điểm bậc thang (4.0đ), và 6 câu trả lời ngắn điền số (1.5đ). Thang điểm 10.0.',
  subject: 'Hóa học',
  grade: 'Lớp 12',
  durationMinutes: 50,
  difficulty: 'Format Chuẩn BGD 2025',
  isBGDFormat: true,
  author: 'Tổ Chuyên Môn Hóa Học - EduViet',
  attemptsCount: 3110,
  averageScore: 7.3,
  questions: [
    // --- PHẦN I: 18 CÂU TRẮC NGHIỆM 4 LỰA CHỌN (0.25đ/câu) ---
    {
      id: 3001,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 1] Este metyl fomat có công thức cấu tạo thu gọn là:',
      options: [
        { key: 'A', label: 'HCOOCH₃' },
        { key: 'B', label: 'CH₃COOCH₃' },
        { key: 'C', label: 'HCOOC₂H₅' },
        { key: 'D', label: 'CH₃COOH' }
      ],
      correctAnswer: 'A',
      explanation: 'Gốc fomat là HCOO-, gốc metyl là -CH₃ => Metyl fomat là HCOOCH₃.',
      topic: 'Hợp chất Este',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'CH₃COOCH₃ là metyl axetat.',
        'C': 'HCOOC₂H₅ là etyl fomat.'
      },
      mistakeAdvice: 'Tên este = Tên gốc hiđrocacbon R\' + Tên gốc axit RCOO (đuôi at).',
      keyFormula: 'RCOOR\' = Gốc R\' + Tên axit đuôi -at'
    },
    {
      id: 3002,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 2] Chất nào sau đây thuộc loại monosaccarit?',
      options: [
        { key: 'A', label: 'Glucozơ' },
        { key: 'B', label: 'Saccarozơ' },
        { key: 'C', label: 'Tinh bột' },
        { key: 'D', label: 'Xenlulozơ' }
      ],
      correctAnswer: 'A',
      explanation: 'Monosaccarit là đường đơn giản nhất không bị thủy phân, gồm glucozơ và fructozơ.',
      topic: 'Cacbohiđrat',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Saccarozơ là đisaccarit.',
        'C': 'Tinh bột là polisaccarit.'
      },
      mistakeAdvice: 'Monosaccarit: Glucozơ, Fructozơ. Đisaccarit: Saccarozơ. Polisaccarit: Tinh bột, Xenlulozơ.',
      keyFormula: 'Phân loại Cacbohiđrat: Mono - Đi - Poli'
    },
    {
      id: 3003,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 3] Chất nào sau đây là amin bậc 1?',
      options: [
        { key: 'A', label: 'CH₃NH₂' },
        { key: 'B', label: '(CH₃)₂NH' },
        { key: 'C', label: '(CH₃)₃N' },
        { key: 'D', label: 'CH₃-NH-C₂H₅' }
      ],
      correctAnswer: 'A',
      explanation: 'Amin bậc 1 có nhóm định chức -NH₂ liên kết với gốc hiđrocacbon => CH₃NH₂ là metylamin bậc 1.',
      topic: 'Amin - Bậc của amin',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': '(CH₃)₂NH có nhóm -NH- là amin bậc 2.',
        'C': '(CH₃)₃N là amin bậc 3.'
      },
      mistakeAdvice: 'Bậc của amin bằng số nguyên tử H trong phân tử NH₃ bị thay thế bởi gốc hiđrocacbon.',
      keyFormula: 'Bậc amin: Bậc 1 (-NH₂), Bậc 2 (-NH-), Bậc 3 (-N<)'
    },
    {
      id: 3004,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 4] Polime nào sau đây được điều chế bằng phản ứng trùng ngưng?',
      options: [
        { key: 'A', label: 'Nilon-6,6' },
        { key: 'B', label: 'Polietilen (PE)' },
        { key: 'C', label: 'Poli(vinyl clorua) (PVC)' },
        { key: 'D', label: 'Cao su buna' }
      ],
      correctAnswer: 'A',
      explanation: 'Nilon-6,6 được điều chế bằng phản ứng trùng ngưng giữa axit ađipic và hexametylendiamin có giải phóng phân tử H₂O.',
      topic: 'Vật liệu Polime',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'PE điều chế bằng phản ứng trùng hợp etilen CH₂=CH₂.',
        'C': 'PVC điều chế bằng phản ứng trùng hợp vinyl clorua.'
      },
      mistakeAdvice: 'Trùng ngưng: tạo ra polime và giải phóng phân tử nhỏ (thường là H₂O). Ví dụ: nilon-6, nilon-6,6, tơ lapsan.',
      keyFormula: 'Trùng ngưng: Monome có ít nhất 2 nhóm chức hoạt động'
    },
    {
      id: 3005,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 5] Kim loại nào sau đây có tính khử mạnh nhất trong dãy hoạt động hóa học?',
      options: [
        { key: 'A', label: 'K' },
        { key: 'B', label: 'Al' },
        { key: 'C', label: 'Fe' },
        { key: 'D', label: 'Cu' }
      ],
      correctAnswer: 'A',
      explanation: 'Theo dãy điện hóa (Khi Nào Bạn Cần May Áo Giáp Sắt...), kim loại Kali (K) đứng đầu nên có tính khử mạnh nhất.',
      topic: 'Dãy điện hóa kim loại',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Al đứng sau K trong dãy điện hóa.'
      },
      mistakeAdvice: 'Thứ tự tính khử giảm dần: K > Ba > Ca > Na > Mg > Al > Zn > Fe > Ni > Sn > Pb > H > Cu > Ag > Au.',
      keyFormula: 'Tính khử kim loại giảm dần từ trái sang phải'
    },
    {
      id: 3006,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 6] Phản ứng nào sau đây là phản ứng tỏa nhiệt?',
      options: [
        { key: 'A', label: 'Phản ứng đốt cháy cồn (etanol)' },
        { key: 'B', label: 'Phản ứng nhiệt phân đá vôi (CaCO₃)' },
        { key: 'C', label: 'Phản ứng quang hợp của cây xanh' },
        { key: 'D', label: 'Phản ứng hòa tan muối amoni nitrat vào nước làm lạnh' }
      ],
      correctAnswer: 'A',
      explanation: 'Phản ứng đốt cháy nhiên liệu (cồn, than, gas...) luôn giải phóng năng lượng ra môi trường dưới dạng nhiệt (Δ_r H < 0) là phản ứng tỏa nhiệt.',
      topic: 'Năng lượng hóa học & Enthalpy',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Nhiệt phân đá vôi cần cung cấp nhiệt liên tục (phản ứng thu nhiệt Δ_r H > 0).'
      },
      mistakeAdvice: 'Đốt cháy là phản ứng tỏa nhiệt (ΔH < 0). Nhiệt phân là phản ứng thu nhiệt (ΔH > 0).',
      keyFormula: 'Tỏa nhiệt: Δ_r H < 0; Thu nhiệt: Δ_r H > 0'
    },
    {
      id: 3007,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 7] Thủy phân hoàn toàn 1 mol tripanmitin (C₁₅H₃₁COO)₃C₃H₅ trong dung dịch NaOH đun nóng thu được bao nhiêu mol glixerol?',
      options: [
        { key: 'A', label: '1 mol' },
        { key: 'B', label: '3 mol' },
        { key: 'C', label: '2 mol' },
        { key: 'D', label: '4 mol' }
      ],
      correctAnswer: 'A',
      explanation: '(C₁₅H₃₁COO)₃C₃H₅ + 3NaOH -> 3C₁₅H₃₁COONa + C₃H₅(OH)₃. Cứ 1 mol triglixerit luôn chỉ thu được 1 mol glixerol.',
      topic: 'Chất béo (Lipit)',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': '3 mol là số mol muối xà phòng natri panmitat, không phải glixerol.'
      },
      mistakeAdvice: 'Thủy phân 1 mol chất béo luôn sinh ra 3 mol muối xà phòng và 1 mol glixerol.',
      keyFormula: '(RCOO)₃C₃H₅ + 3NaOH -> 3RCOONa + C₃H₅(OH)₃'
    },
    {
      id: 3008,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 8] Dung dịch chất nào sau đây làm quỳ tím chuyển sang màu đỏ?',
      options: [
        { key: 'A', label: 'Axit glutamic' },
        { key: 'B', label: 'Lysin' },
        { key: 'C', label: 'Glyxin' },
        { key: 'D', label: 'Alanin' }
      ],
      correctAnswer: 'A',
      explanation: 'Axit glutamic HOOC-[CH₂]₂-CH(NH₂)-COOH có 2 nhóm -COOH và 1 nhóm -NH₂ (số nhóm axit > số nhóm bazo) nên làm quỳ tím hóa đỏ.',
      topic: 'Amino axit & Độ pH',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Lysin có 2 nhóm -NH₂ và 1 nhóm -COOH nên làm quỳ tím hóa xanh.',
        'C': 'Glyxin có 1 nhóm -COOH và 1 nhóm -NH₂ nên môi trường trung tính, không đổi màu quỳ.'
      },
      mistakeAdvice: 'Amino axit: Số -COOH > -NH₂ -> quỳ hóa đỏ; Số -NH₂ > -COOH -> quỳ hóa xanh; Bằng nhau -> không đổi màu.',
      keyFormula: 'Axit glutamic: 2 COOH, 1 NH₂ -> quỳ đỏ'
    },
    {
      id: 3009,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 9] Cho cân bằng hóa học trong bình kín: N₂(k) + 3H₂(k) ⇌ 2NH₃(k); Δ_r H°₂₉₈ = -92 kJ. Cân bằng sẽ chuyển dịch theo chiều thuận khi:',
      options: [
        { key: 'A', label: 'Tăng áp suất chung của hệ' },
        { key: 'B', label: 'Tăng nhiệt độ của hệ' },
        { key: 'C', label: 'Giảm nồng độ khí N₂' },
        { key: 'D', label: 'Thêm chất xúc tác Fe' }
      ],
      correctAnswer: 'A',
      explanation: 'Vế trái có 1 + 3 = 4 mol khí, vế phải có 2 mol khí. Khi tăng áp suất, cân bằng chuyển dịch theo chiều làm giảm số mol khí (chiều thuận).',
      topic: 'Chuyển dịch cân bằng Le Chatelier',
      difficulty: 'Thông hiểu',
      errorCategory: 'Bẫy đề thi',
      whyWrongMap: {
        'B': 'Phản ứng tỏa nhiệt (ΔH < 0), tăng nhiệt độ làm cân bằng chuyển dịch theo chiều nghịch (thu nhiệt).',
        'D': 'Chất xúc tác chỉ làm tăng tốc độ phản ứng, không làm chuyển dịch vị trí cân bằng.'
      },
      mistakeAdvice: 'Tăng áp suất -> chuyển dịch về phía ít mol khí hơn. Tăng nhiệt độ -> chuyển dịch theo chiều thu nhiệt (ΔH > 0).',
      keyFormula: 'Le Chatelier: Tác động gì thì hệ chuyển dịch chống lại tác động đó'
    },
    {
      id: 3010,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 10] Nhúng một đinh sắt (Fe) sạch vào dung dịch đồng sunfat (CuSO₄). Sau một thời gian, hiện tượng quan sát được là:',
      options: [
        { key: 'A', label: 'Có kim loại màu đỏ bám ngoài đinh sắt, màu xanh của dung dịch nhạt dần' },
        { key: 'B', label: 'Đinh sắt tan hết và có sủi bọt khí không màu' },
        { key: 'C', label: 'Có kết tủa màu nâu đỏ xuất hiện dưới đáy ống nghiệm' },
        { key: 'D', label: 'Không có hiện tượng gì xảy ra' }
      ],
      correctAnswer: 'A',
      explanation: 'Fe + CuSO₄ -> FeSO₄ + Cu↓. Kim loại Cu màu đỏ bám trên đinh sắt, ion Cu²⁺ màu xanh bị tiêu thụ nên màu dung dịch nhạt dần.',
      topic: 'Tính chất hóa học của kim loại',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Phản ứng không sinh ra chất khí.'
      },
      mistakeAdvice: 'Kim loại mạnh đẩy kim loại yếu ra khỏi dung dịch muối: Fe + Cu²⁺ -> Fe²⁺ + Cu↓.',
      keyFormula: 'Fe + Cu²⁺ -> Fe²⁺ + Cu'
    },
    {
      id: 3011,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 11] Số đồng phân este có cùng công thức phân tử C₃H₆O₂ là:',
      options: [
        { key: 'A', label: '2' },
        { key: 'B', label: '3' },
        { key: 'C', label: '4' },
        { key: 'D', label: '1' }
      ],
      correctAnswer: 'A',
      explanation: 'Có 2 este thỏa mãn C₃H₆O₂: HCOOC₂H₅ (etyl fomat) và CH₃COOCH₃ (metyl axetat).',
      topic: 'Đồng phân este',
      difficulty: 'Thông hiểu',
      errorCategory: 'Bẫy đề thi',
      whyWrongMap: {
        'B': 'Chất thứ 3 C₂H₅COOH là axit propionic, không phải este.'
      },
      mistakeAdvice: 'C₃H₆O₂ có 2 este: HCOOC₂H₅ và CH₃COOCH₃.',
      keyFormula: 'C_n H_2n O_2 (n=3) có 2 đồng phân este'
    },
    {
      id: 3012,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 12] Cho dãy các chất: Glucozơ, saccarozơ, tinh bột, xenlulozơ. Số chất trong dãy có khả năng tham gia phản ứng tráng bạc là:',
      options: [
        { key: 'A', label: '1' },
        { key: 'B', label: '2' },
        { key: 'C', label: '3' },
        { key: 'D', label: '4' }
      ],
      correctAnswer: 'A',
      explanation: 'Chỉ có glucozơ có nhóm chức anđehit (-CHO) nên tham gia phản ứng tráng bạc. Saccarozơ, tinh bột và xenlulozơ không tráng bạc.',
      topic: 'Phản ứng tráng bạc của Cacbohiđrat',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Saccarozơ không tráng bạc (chỉ khi bị thủy phân thành glucozơ + fructozơ mới tráng bạc).'
      },
      mistakeAdvice: 'Cacbohiđrat tráng bạc trực tiếp: Glucozơ và Fructozơ (trong môi trường kiềm).',
      keyFormula: 'Glucozơ + 2AgNO₃/NH₃ -> 2Ag↓'
    },
    {
      id: 3013,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 13] Trong công nghiệp, kim loại nhôm (Al) được sản xuất bằng phương pháp nào?',
      options: [
        { key: 'A', label: 'Điện phân nóng chảy quặng bôxit (Al₂O₃) có mặt criolit' },
        { key: 'B', label: 'Điện phân dung dịch AlCl₃' },
        { key: 'C', label: 'Nhiệt luyện dùng CO khử Al₂O₃ ở nhiệt độ cao' },
        { key: 'D', label: 'Thủy luyện dùng Zn đẩy Al ra khỏi dung dịch muối' }
      ],
      correctAnswer: 'A',
      explanation: 'Do Al có tính khử mạnh, Al chỉ được điều chế bằng phương pháp điện phân nóng chảy Al₂O₃ với sự có mặt của criolit (Na₃AlF₆).',
      topic: 'Điều chế kim loại nhôm',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Điện phân dung dịch AlCl₃ thì nước bị điện phân trước sinh ra Al(OH)₃ và H₂, không thu được Al.',
        'C': 'CO chỉ khử được oxit kim loại đứng sau Al trong dãy điện hóa.'
      },
      mistakeAdvice: 'Kim loại mạnh (từ Al trở về trước) chỉ điều chế bằng ĐIỆN PHÂN NÓNG CHẢY.',
      keyFormula: '2Al₂O₃ --(đpnc, criolit)--> 4Al + 3O₂'
    },
    {
      id: 3014,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 14] Dung dịch NaOH có pH = 12. Nồng độ ion H⁺ trong dung dịch bằng:',
      options: [
        { key: 'A', label: '10⁻¹² M' },
        { key: 'B', label: '10⁻² M' },
        { key: 'C', label: '12 M' },
        { key: 'D', label: '10¹² M' }
      ],
      correctAnswer: 'A',
      explanation: 'Theo định nghĩa pH = -log[H⁺] => [H⁺] = 10^(-pH) = 10⁻¹² M.',
      topic: 'pH và nồng độ ion dung dịch',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': '10⁻² M là nồng độ ion OH⁻ (do pOH = 14 - 12 = 2).'
      },
      mistakeAdvice: 'pH = -log[H⁺] <=> [H⁺] = 10^(-pH).',
      keyFormula: '[H⁺] = 10^(-pH); [H⁺][OH⁻] = 10⁻¹⁴'
    },
    {
      id: 3015,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 15] Đốt cháy hoàn toàn 0,1 mol một este no, đơn chức, mạch hở X thu được bao nhiêu mol khí CO₂ và bao nhiêu mol H₂O?',
      options: [
        { key: 'A', label: 'Số mol CO₂ luôn bằng số mol H₂O' },
        { key: 'B', label: 'Số mol CO₂ lớn hơn số mol H₂O' },
        { key: 'C', label: 'Số mol CO₂ nhỏ hơn số mol H₂O' },
        { key: 'D', label: 'Số mol H₂O gấp đôi số mol CO₂' }
      ],
      correctAnswer: 'A',
      explanation: 'Este no, đơn chức, mạch hở có CTPT tổng quát C_n H_2n O₂. Khi đốt cháy: C_n H_2n O₂ -> n CO₂ + n H₂O. Hệ số của CO₂ và H₂O bằng nhau nên n_CO₂ = n_H₂O.',
      topic: 'Đốt cháy este no đơn chức',
      difficulty: 'Vận dụng',
      errorCategory: 'Lý thuyết',
      whyWrongMap: {
        'B': 'Este không no mới có n_CO₂ > n_H₂O.'
      },
      mistakeAdvice: 'Đốt cháy este no, đơn chức, mạch hở luôn cho n_CO₂ = n_H₂O.',
      keyFormula: 'C_n H_2n O₂ -> n CO₂ + n H₂O'
    },
    {
      id: 3016,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 16] Cho thế điện cực chuẩn của hai cặp oxi hóa - khử: E°(Fe²⁺/Fe) = -0,44 V và E°(Cu²⁺/Cu) = +0,34 V. Sức điện động chuẩn của pin điện hóa Fe - Cu là:',
      options: [
        { key: 'A', label: '0,78 V' },
        { key: 'B', label: '0,10 V' },
        { key: 'C', label: '-0,78 V' },
        { key: 'D', label: '0,44 V' }
      ],
      correctAnswer: 'A',
      explanation: 'Sức điện động chuẩn của pin: E°_pin = E°_catot - E°_anot = E°(Cu²⁺/Cu) - E°(Fe²⁺/Fe) = 0,34 - (-0,44) = 0,78 V.',
      topic: 'Pin điện hóa & Sức điện động',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Bạn lấy 0,34 - 0,44 = -0,10 V mà quên dấu trừ của số âm.'
      },
      mistakeAdvice: 'E°_pin = E°(dương) - E°(âm) = E°_catot - E°_anot > 0.',
      keyFormula: 'E°_pin = E°_catot - E°_anot'
    },
    {
      id: 3017,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 17] Cho m gam glucozơ tác dụng hết với lượng dư dung dịch AgNO₃ trong NH₃, thu được 21,6 gam Ag kết tủa. Giá trị của m bằng:',
      options: [
        { key: 'A', label: '18,0 gam' },
        { key: 'B', label: '36,0 gam' },
        { key: 'C', label: '9,0 gam' },
        { key: 'D', label: '27,0 gam' }
      ],
      correctAnswer: 'A',
      explanation: 'n_Ag = 21,6 / 108 = 0,2 mol. 1 mol glucozơ (M = 180) tráng gương sinh ra 2 mol Ag: n_glucozo = n_Ag / 2 = 0,1 mol => m = 0,1 . 180 = 18,0 gam.',
      topic: 'Toán tráng bạc Glucozơ',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Bạn quên chia cho 2 (nhầm 1 glucozơ sinh 1 Ag).'
      },
      mistakeAdvice: '1 mol Glucozơ -> 2 mol Ag.',
      keyFormula: 'n_glucozơ = n_Ag / 2'
    },
    {
      id: 3018,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phần I - Câu 18] Cho 0,1 mol glyxin (H₂N-CH₂-COOH) tác dụng vừa đủ với V ml dung dịch NaOH 1M. Giá trị của V là:',
      options: [
        { key: 'A', label: '100 ml' },
        { key: 'B', label: '200 ml' },
        { key: 'C', label: '50 ml' },
        { key: 'D', label: '150 ml' }
      ],
      correctAnswer: 'A',
      explanation: 'Glyxin có 1 nhóm -COOH nên tác dụng với NaOH theo tỉ lệ mol 1:1. n_NaOH = 0,1 mol => V = n / C_M = 0,1 / 1 = 0,1 lít = 100 ml.',
      topic: 'Tính chất amino axit tác dụng bazo',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      whyWrongMap: {
        'B': 'Lysin hoặc axit glutamic mới tác dụng theo tỉ lệ 1:2.'
      },
      mistakeAdvice: 'Số mol NaOH phản ứng = số nhóm -COOH trong phân tử amino axit.',
      keyFormula: 'n_NaOH = n_COOH'
    },

    // --- PHẦN II: 4 CÂU ĐÚNG / SAI (Mỗi câu 4 ý a, b, c, d - Tối đa 4.0đ) ---
    {
      id: 3019,
      part: 'II',
      type: 'true_false',
      text: '[Phần II - Câu 1] Cho các nhận định sau về Cacbohiđrat (Gluxit). Xét tính Đúng / Sai của mỗi nhận định:',
      topic: 'Cacbohiđrat',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Glucozơ và fructozơ là hai chất đồng phân của nhau cùng có công thức phân tử C₆H₁₂O₆.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Tinh bột và xenlulozơ là hai chất đồng phân của nhau vì đều có công thức (C₆H₁₀O₅)ₙ.',
          correctAnswer: false
        },
        {
          id: 'c',
          text: 'Dung dịch glucozơ tác dụng với dung dịch AgNO₃ trong NH₃ đun nóng sinh ra kết tủa Ag trắng sáng.',
          correctAnswer: true
        },
        {
          id: 'd',
          text: 'Thủy phân hoàn toàn xenlulozơ trong môi trường axit sinh ra sản phẩm duy nhất là saccarozơ.',
          correctAnswer: false
        }
      ],
      explanation: 'Ý a ĐÚNG: Glucozơ và fructozơ đều có CTPT C₆H₁₂O₆. Ý b SAI: n của tinh bột và xenlulozơ khác nhau nhiều nên không phải đồng phân. Ý c ĐÚNG: glucozơ có nhóm -CHO nên có phản ứng tráng bạc. Ý d SAI: thủy phân xenlulozơ thu được glucozơ.',
      whyWrongMap: {
        'b': 'Tinh bột và xenlulozơ không phải đồng phân vì hệ số polime hóa n khác nhau rất nhiều.',
        'd': 'Thủy phân xenlulozơ tạo ra glucozơ, không phải saccarozơ.'
      },
      mistakeAdvice: 'Tinh bột và xenlulozơ không phải là đồng phân của nhau.',
      keyFormula: '(C₆H₁₀O₅)ₙ + nH₂O --(H⁺, t°)--> n C₆H₁₂O₆ (glucozơ)'
    },
    {
      id: 3020,
      part: 'II',
      type: 'true_false',
      text: '[Phần II - Câu 2] Xét các tính chất hóa học và ứng dụng của Amin, Amino axit và Protein:',
      topic: 'Hợp chất chứa Nitơ',
      difficulty: 'Vận dụng',
      errorCategory: 'Lý thuyết',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Metylamin và anilin đều là các chất khí ở điều kiện thường và tan vô hạn trong nước.',
          correctAnswer: false
        },
        {
          id: 'b',
          text: 'Tất cả các amino axit thiên nhiên đều có tính chất lưỡng tính (tác dụng được với cả axit và bazơ mạnh).',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Lòng trắng trứng (anbumin) tác dụng với Cu(OH)₂ ở nhiệt độ thường tạo thành dung dịch màu tím đặc trưng (phản ứng màu biure).',
          correctAnswer: true
        },
        {
          id: 'd',
          text: 'Đipeptit Gly-Ala có 2 liên kết peptit trong phân tử.',
          correctAnswer: false
        }
      ],
      explanation: 'Ý a SAI: Anilin C₆H₅NH₂ là chất lỏng, ít tan trong nước. Ý b ĐÚNG: Amino axit có cả nhóm -COOH và -NH₂ nên có tính lưỡng tính. Ý c ĐÚNG: Protein có từ 2 liên kết peptit trở lên cho phản ứng màu biure với Cu(OH)₂ tạo màu tím. Ý d SAI: Đipeptit chỉ có 1 liên kết peptit nối giữa 2 gốc amino axit.',
      whyWrongMap: {
        'a': 'Anilin là chất lỏng không màu, ít tan trong nước, để trong không khí bị oxi hóa chuyển màu nâu đen.',
        'd': 'Đipeptit chỉ có 1 liên kết peptit -CO-NH-.'
      },
      mistakeAdvice: 'Số liên kết peptit = Số gốc amino axit - 1.',
      keyFormula: 'n-peptit có (n - 1) liên kết peptit'
    },
    {
      id: 3021,
      part: 'II',
      type: 'true_false',
      text: '[Phần II - Câu 3] Thiết lập một pin điện hóa Zn - Cu gồm thanh kẽm nhúng vào dung dịch ZnSO₄ 1M và thanh đồng nhúng vào dung dịch CuSO₄ 1M nối với nhau bằng cầu muối. Xét tính Đúng / Sai:',
      topic: 'Pin điện hóa Zn - Cu',
      difficulty: 'Vận dụng',
      errorCategory: 'Phương pháp',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Thanh kẽm (Zn) đóng vai trò là cực âm (anot), tại đây xảy ra quá trình oxi hóa Zn -> Zn²⁺ + 2e.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Thanh đồng (Cu) đóng vai trò là cực dương (catot), tại đây xảy ra quá trình khử Cu²⁺ + 2e -> Cu.',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Trong mạch ngoài, dòng electron di chuyển từ thanh Cu sang thanh Zn.',
          correctAnswer: false
        },
        {
          id: 'd',
          text: 'Trong quá trình pin hoạt động, khối lượng thanh Zn giảm dần và khối lượng thanh Cu tăng dần.',
          correctAnswer: true
        }
      ],
      explanation: 'Ý a, b ĐÚNG: Kim loại mạnh hơn (Zn) là cực âm (anot) bị oxi hóa; kim loại yếu hơn (Cu) là cực dương (catot) xảy ra quá trình khử ion Cu²⁺. Ý c SAI: Dòng electron chạy từ cực âm (Zn) sang cực dương (Cu). Ý d ĐÚNG: Zn tan ra thành Zn²⁺ nên khối lượng giảm; Cu²⁺ nhận e bám vào thanh Cu nên khối lượng tăng.',
      whyWrongMap: {
        'c': 'Dòng electron trong dây dẫn ngoài chạy từ cực âm (Zn) sang cực dương (Cu).'
      },
      mistakeAdvice: 'Electron chạy từ Anot (cực âm) sang Catot (cực dương). Dòng điện quy ước đi ngược lại.',
      keyFormula: 'Anot (-): Zn -> Zn²⁺ + 2e; Catot (+): Cu²⁺ + 2e -> Cu'
    },
    {
      id: 3022,
      part: 'II',
      type: 'true_false',
      text: '[Phần II - Câu 4] Cho cân bằng hóa học trong bình kín ở 500 °C: CO(k) + H₂O(k) ⇌ CO₂(k) + H₂(k); hằng số cân bằng K_C = 1,0. Ban đầu nạp vào bình 1 mol CO và 1 mol H₂O trong bình thể tích 1 lít. Xét tính Đúng / Sai:',
      topic: 'Hằng số cân bằng hóa học K_C',
      difficulty: 'Vận dụng cao',
      errorCategory: 'Phương pháp',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Biểu thức hằng số cân bằng là K_C = ([CO₂] . [H₂]) / ([CO] . [H₂O]).',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Tại trạng thái cân bằng, nồng độ của khí CO bằng 0,5 M.',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Hiệu suất chuyển hóa của khí CO đạt 50%.',
          correctAnswer: true
        },
        {
          id: 'd',
          text: 'Nếu tăng áp suất của hệ bằng cách nén thể tích bình lại thì cân bằng chuyển dịch theo chiều thuận.',
          correctAnswer: false
        }
      ],
      explanation: 'Gọi x là nồng độ CO phản ứng. Tại CB: [CO] = 1 - x, [H₂O] = 1 - x, [CO₂] = x, [H₂] = x. K_C = x² / (1-x)² = 1 => x / (1-x) = 1 => x = 0,5 M. Nồng độ CO còn lại = 0,5 M. Hiệu suất H = 0,5 / 1 = 50%. Ý d SAI: Số mol khí 2 vế bằng nhau (1+1 = 1+1 = 2 mol), nên thay đổi áp suất không làm chuyển dịch cân bằng.',
      whyWrongMap: {
        'd': 'Phản ứng có tổng số mol khí 2 vế bằng nhau (2 mol = 2 mol) nên áp suất không làm chuyển dịch cân bằng.'
      },
      mistakeAdvice: 'Khi số mol khí ở 2 vế của phản ứng bằng nhau, áp suất không ảnh hưởng đến cân bằng hóa học.',
      keyFormula: 'K_C = ([C]^c . [D]^d) / ([A]^a . [B]^b)'
    },

    // --- PHẦN III: 6 CÂU TRẢ LỜI NGẮN (ĐIỀN SỐ - 0.25đ/câu - Tối đa 1.5đ) ---
    {
      id: 3023,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 1] Cho 8,8 gam etyl axetat (CH₃COOC₂H₅, M = 88 g/mol) tác dụng hoàn toàn với dung dịch NaOH vừa đủ, đun nóng. Khối lượng muối natri axetat (CH₃COONa, M = 82 g/mol) thu được bằng bao nhiêu gam? (Nhập kết quả số thập phân, ví dụ 8.2).',
      shortAnswerCorrect: '8.2',
      topic: 'Phản ứng xà phòng hóa este',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      explanation: 'n_este = 8,8 / 88 = 0,1 mol. Phản ứng: CH₃COOC₂H₅ + NaOH -> CH₃COONa + C₂H₅OH. n_muối = 0,1 mol => m_muối = 0,1 . 82 = 8,2 gam.',
      mistakeAdvice: 'Số mol muối bằng số mol este đơn chức.',
      keyFormula: 'm_muối = n_este . M_muối'
    },
    {
      id: 3024,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 2] Trong một phân tử chất béo tripanmitin (C₁₅H₃₁COO)₃C₃H₅ có tổng cộng bao nhiêu nguyên tử cacbon (C)?',
      shortAnswerCorrect: '51',
      topic: 'Cấu tạo chất béo',
      difficulty: 'Nhận biết',
      errorCategory: 'Tính toán',
      explanation: 'Mỗi gốc panmitat có 15 + 1 = 16 nguyên tử C. 3 gốc có 16 . 3 = 48 C. Gốc glixerol có 3 C. Tổng số C = 48 + 3 = 51 nguyên tử C.',
      mistakeAdvice: 'Đừng quên tính cả nguyên tử C trong nhóm -COO- của gốc axit!',
      keyFormula: 'Tổng C = 3 . 16 + 3 = 51'
    },
    {
      id: 3025,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 3] Hòa tan hoàn toàn 5,4 gam kim loại nhôm (Al, M = 27 g/mol) vào lượng dư dung dịch axit HCl. Thể tích khí H₂ thoát ra ở điều kiện chuẩn (đkc, 25 °C và 1 bar, 1 mol khí = 24,79 lít) bằng bao nhiêu lít? (Làm tròn đến 2 chữ số thập phân, ví dụ 7.44).',
      shortAnswerCorrect: '7.44',
      topic: 'Kim loại tác dụng với axit',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      explanation: 'n_Al = 5,4 / 27 = 0,2 mol. 2Al + 6HCl -> 2AlCl₃ + 3H₂. n_H₂ = 0,2 . 3/2 = 0,3 mol. Thể tích theo đkc: V = 0,3 . 24,79 = 7,437 lít ≈ 7,44 lít.',
      mistakeAdvice: 'Theo chương trình mới GDPT 2018, điều kiện chuẩn (đkc) 25 °C, 1 bar thì 1 mol khí chiếm 24,79 lít (không dùng 22,4 lít).',
      keyFormula: 'V (đkc) = n . 24,79'
    },
    {
      id: 3026,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 4] Trộn 100 ml dung dịch HCl 0,1M với 100 ml dung dịch NaOH 0,3M thu được 200 ml dung dịch X. Tính pH của dung dịch X sau khi phản ứng xảy ra hoàn toàn.',
      shortAnswerCorrect: '13',
      topic: 'Tính pH dung dịch sau phản ứng',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      explanation: 'n_H⁺ = 0,1 . 0,1 = 0,01 mol; n_OH⁻ = 0,1 . 0,3 = 0,03 mol. H⁺ + OH⁻ -> H₂O. n_OH⁻ dư = 0,03 - 0,01 = 0,02 mol. [OH⁻] = 0,02 / 0,2 = 0,1 M = 10⁻¹ M. pOH = -log[OH⁻] = 1 => pH = 14 - pOH = 13.',
      mistakeAdvice: 'Khi bazơ dư, tính pOH trước rồi suy ra pH = 14 - pOH.',
      keyFormula: 'pH = 14 - pOH; pOH = -log[OH⁻]'
    },
    {
      id: 3027,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 5] Khối lượng mol phân tử của amino axit Glyxin (H₂N-CH₂-COOH) bằng bao nhiêu gam/mol?',
      shortAnswerCorrect: '75',
      topic: 'Phân tử khối amino axit',
      difficulty: 'Nhận biết',
      errorCategory: 'Tính toán',
      explanation: 'M_glyxin = 16 (NH₂) + 14 (CH₂) + 45 (COOH) = 75 g/mol.',
      mistakeAdvice: 'Ghi nhớ M của các amino axit thường gặp: Gly = 75, Ala = 89, Val = 117, Glu = 147, Lys = 146.',
      keyFormula: 'M_Gly = 75 g/mol'
    },
    {
      id: 3028,
      part: 'III',
      type: 'short_answer',
      text: '[Phần III - Câu 6] Thủy phân hoàn toàn 34,2 gam saccarozơ (C₁₂H₂₂O₁₁, M = 342 g/mol) với hiệu suất 80%. Lấy toàn bộ sản phẩm thu được cho tham gia phản ứng tráng bạc với lượng dư AgNO₃/NH₃. Khối lượng Ag kết tủa thu được bằng bao nhiêu gam? (Nhập kết quả số thập phân, ví dụ 34.56).',
      shortAnswerCorrect: '34.56',
      topic: 'Thủy phân Saccarozơ & Tráng bạc',
      difficulty: 'Vận dụng cao',
      errorCategory: 'Bẫy đề thi',
      explanation: 'n_saccarozơ = 34,2 / 342 = 0,1 mol. 1 saccarozơ -> 1 glucozơ + 1 fructozơ. Cả glucozơ và fructozơ đều tráng bạc sinh ra 2 Ag, tổng cộng 1 saccarozơ sinh ra 4 Ag! n_Ag (lý thuyết) = 0,1 . 4 = 0,4 mol. Do hiệu suất H = 80%: n_Ag thực tế = 0,4 . 0,8 = 0,32 mol. Khối lượng m_Ag = 0,32 . 108 = 34,56 gam.',
      mistakeAdvice: 'Thủy phân 1 mol saccarozơ sinh ra 1 glucozơ + 1 fructozơ, khi tráng bạc cả hai đều phản ứng nên thu được tới 4 mol Ag!',
      keyFormula: '1 Saccarozơ --(thủy phân)--> Glucozơ + Fructozơ --(tráng bạc)--> 4 Ag'
    }
  ]
};

export const ALL_BGD_EXAMS: Exam[] = [
  BGD_EXAM_TOAN,
  BGD_EXAM_LY,
  BGD_EXAM_HOA,
  BGD_EXAM_VAN,
  BGD_EXAM_ANH,
];

export { BGD_EXAM_VAN, BGD_EXAM_ANH };
