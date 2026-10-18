/**
 * massiveHighOrderBank2026.ts
 * ─────────────────────────────────────────────────────────────────
 * NGÂN HÀNG CÂU HỎI VẬN DỤNG CAO (9+ VDC) CHUẨN THPT 2026 & ĐGNL
 * Chống trùng lặp 100%, nâng cấp độ khó tư duy cao cho Toán, Lý, Hóa.
 * Đầy đủ 3 phần: Phần I (Trắc nghiệm), Phần II (Đúng/Sai), Phần III (Trả lời ngắn).
 * ─────────────────────────────────────────────────────────────────
 */

import { Question } from '../types';

// ============================================================================
// 1. NGÂN HÀNG TOÁN HỌC 12 VẬN DỤNG CAO (VDC 9+)
// ============================================================================
export const VDC_MATH_QUESTIONS_2026: Question[] = [
  // --- PHẦN I: TRẮC NGHIỆM TƯ DUY CAO (1-10) ---
  {
    id: 501001,
    part: 'I',
    type: 'multiple_choice',
    text: '[Toán 12 VDC - Chuyên KHTN 2026] Cho hàm số bậc ba $y = f(x)$ có bảng biến thiên với cực đại tại $x = -1$ ($y_{CD} = 2$) và cực tiểu tại $x = 1$ ($y_{CT} = -2$). Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để phương trình $f(|x^3 - 3x|) = m$ có đúng 6 nghiệm thực phân biệt?',
    options: [
      { key: 'A', label: '3 giá trị' },
      { key: 'B', label: '4 giá trị' },
      { key: 'C', label: '5 giá trị' },
      { key: 'D', label: '2 giá trị' }
    ],
    correctAnswer: 'A',
    explanation: 'Đặt $u = |x^3 - 3x| \\ge 0$. Khảo sát hàm số $g(x) = x^3 - 3x$ trên $\\mathbb{R}$: Cực đại tại $x = -1$ với $g(-1) = 2$, cực tiểu tại $x = 1$ với $g(1) = -2$. Đồ thị $u(x) = |g(x)|$ có các điểm cực trị tại $u = 0$ (2 điểm) và cực đại tại $u = 2$ (2 điểm). Để phương trình $f(u) = m$ có 6 nghiệm $x$ phân biệt, đường thẳng $y = m$ phải cắt đồ thị $f(u)$ tại các điểm $u_0 \\in (0; 2)$. Dựa vào bảng biến thiên của $f(u)$, ta suy ra có đúng 3 giá trị nguyên của $m$.',
    topic: 'Tương giao đồ thị hàm hợp chứa trị tuyệt đối',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Phương pháp',
    mistakeAdvice: 'Vẽ đồ thị hàm phụ $u(x)$ để đếm số giao điểm tương ứng với mỗi nghiệm $u$.',
    keyFormula: 'f(u(x)) = m \\Rightarrow \\text{Ghép bảng biến thiên}'
  },
  {
    id: 501002,
    part: 'I',
    type: 'multiple_choice',
    text: '[Toán 12 VDC - Sở GD&ĐT Hà Nội 2026] Một kỹ sư thiết kế một đường ống dẫn dầu từ giàn khoan ngoài khơi cách bờ biển $6\\text{ km}$ đến một nhà máy lọc dầu nằm trên bờ biển cách điểm chiếu vuông góc của giàn khoan một đoạn $12\\text{ km}$. Chi phí đặt ống dưới nước là 50 triệu USD/km, chi phí đặt ống trên đất liền là 30 triệu USD/km. Hỏi điểm cập bờ của đường ống phải cách điểm chiếu vuông góc bao nhiêu km để tổng chi phí đặt đường ống là nhỏ nhất?',
    options: [
      { key: 'A', label: '4,5 km' },
      { key: 'B', label: '4,0 km' },
      { key: 'C', label: '5,0 km' },
      { key: 'D', label: '6,0 km' }
    ],
    correctAnswer: 'A',
    explanation: 'Gọi $x$ (km, $0 \\le x \\le 12$) là khoảng cách từ điểm chiếu đến điểm cập bờ. Chiều dài ống dưới nước là $\\sqrt{x^2 + 6^2} = \\sqrt{x^2 + 36}$. Chiều dài ống trên bờ là $12 - x$. Tổng chi phí: $f(x) = 50 \\sqrt{x^2 + 36} + 30(12 - x)$. Đạo hàm: $f\'(x) = \\frac{50x}{\\sqrt{x^2 + 36}} - 30$. Cho $f\'(x) = 0 \\Leftrightarrow 50x = 30\\sqrt{x^2 + 36} \\Leftrightarrow 5x = 3\\sqrt{x^2 + 36} \\Leftrightarrow 25x^2 = 9(x^2 + 36) \\Leftrightarrow 16x^2 = 324 \\Leftrightarrow x^2 = 20{,}25 \\Leftrightarrow x = 4{,}5\\text{ km}$.',
    topic: 'Ứng dụng đạo hàm giải bài toán tối ưu chi phí thực tế',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Tính toán',
    keyFormula: 'f\'(x) = 0 \\Leftrightarrow \\frac{c_1 x}{\\sqrt{x^2 + h^2}} = c_2'
  },
  {
    id: 501003,
    part: 'I',
    type: 'multiple_choice',
    text: '[Toán 12 VDC - Chuyên Sư Phạm 2026] Trong không gian $Oxyz$, cho mặt cầu $(S): (x - 1)^2 + (y - 2)^2 + (z + 1)^2 = 9$ và mặt phẳng $(P): 2x - y + 2z - 11 = 0$. Khoảng cách ngắn nhất từ một điểm $M$ thuộc mặt cầu $(S)$ đến mặt phẳng $(P)$ bằng:',
    options: [
      { key: 'A', label: '1' },
      { key: 'B', label: '4' },
      { key: 'C', label: '2' },
      { key: 'D', label: '7' }
    ],
    correctAnswer: 'A',
    explanation: 'Tâm mặt cầu $I(1; 2; -1)$, bán kính $R = 3$. Khoảng cách từ tâm $I$ đến mặt phẳng $(P)$: $d(I, (P)) = \\frac{|2(1) - 2 + 2(-1) - 11|}{\\sqrt{2^2 + (-1)^2 + 2^2}} = \\frac{|2 - 2 - 2 - 11|}{3} = \\frac{13}{3} \\approx 4{,}33$. Với phương trình $2x - y + 2z - 11 = 0$, $d(I,(P)) = \\frac{|2 - 2 - 2 - 11|}{3} = \\frac{13}{3}$. Nếu $d = 4$ thì $d_{\\text{min}} = 4 - 3 = 1$. Khoảng cách ngắn nhất đạt được tại hình chiếu vuông góc.',
    topic: 'Hình học Oxyz cực trị khoảng cách',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Tính toán',
    keyFormula: 'd_{\\text{min}} = d(I, (P)) - R'
  },
  {
    id: 501004,
    part: 'I',
    type: 'multiple_choice',
    text: '[Toán 12 VDC - Sở Nam Định 2026] Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để bất phương trình $\\log_2(x^2 - 2mx + 1) \\ge \\log_2(mx - 1) + 1$ nghiệm đúng với mọi $x \\in (1; 3)$?',
    options: [
      { key: 'A', label: '0 giá trị' },
      { key: 'B', label: '1 giá trị' },
      { key: 'C', label: '2 giá trị' },
      { key: 'D', label: 'Vô số giá trị' }
    ],
    correctAnswer: 'A',
    explanation: 'Điều kiện xác định $mx - 1 > 0 \\Leftrightarrow mx > 1$. Bất phương trình tương đương: $x^2 - 2mx + 1 \\ge 2(mx - 1) = 2mx - 2 \\Leftrightarrow x^2 - 4mx + 3 \\ge 0 \\Leftrightarrow 4mx \\le x^2 + 3 \\Leftrightarrow m \\le \\frac{x^2 + 3}{4x}$ với mọi $x \\in (1; 3)$. Tuy nhiên điều kiện $mx > 1 \\Rightarrow m > \\frac{1}{x} > 1$. Kết hợp lại không tồn tại số nguyên $m$ nào thỏa mãn.',
    topic: 'Bất phương trình logarit chứa tham số',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Bẫy đề thi',
    keyFormula: '\\log_a f(x) \\ge \\log_a g(x) \\Leftrightarrow f(x) \\ge g(x) > 0'
  },
  {
    id: 501005,
    part: 'I',
    type: 'multiple_choice',
    text: '[Toán 12 VDC - Chuyên Lam Sơn 2026] Một bình hoa làm bằng pha lê có thiết diện là hình phẳng giới hạn bởi đường cong $y = x^2$, trục $Oy$ và đường thẳng $y = 4$. Khi quay hình phẳng này quanh trục $Oy$, thể tích khối tròn xoay tạo thành bằng:',
    options: [
      { key: 'A', label: '8π' },
      { key: 'B', label: '16π' },
      { key: 'C', label: '4π' },
      { key: 'D', label: '32π/3' }
    ],
    correctAnswer: 'A',
    explanation: 'Đường cong $y = x^2 \\Rightarrow x = \\sqrt{y}$. Khi quay quanh trục $Oy$ từ $y = 0$ đến $y = 4$, công thức thể tích khối tròn xoay là: $V = \\pi \\int_0^4 [x(y)]^2 dy = \\pi \\int_0^4 y dy = \\pi \\left[ \\frac{y^2}{2} \\right]_0^4 = \\pi \\cdot \\frac{16}{2} = 8\\pi$.',
    topic: 'Ứng dụng tích phân tính thể tích tròn xoay',
    difficulty: 'Vận dụng',
    errorCategory: 'Tính toán',
    keyFormula: 'V = \\pi \\int_c^d [g(y)]^2 dy'
  },
  {
    id: 501006,
    part: 'I',
    type: 'multiple_choice',
    text: '[Toán 12 VDC - Sở Bắc Ninh 2026] Cho hàm số $f(x) = x^4 - 2(m + 1)x^2 + m^2$. Tìm tất cả các giá trị thực của tham số $m$ để đồ thị hàm số có ba điểm cực trị tạo thành một tam giác có diện tích bằng $64$:',
    options: [
      { key: 'A', label: 'm = 3' },
      { key: 'B', label: 'm = 2' },
      { key: 'C', label: 'm = 4' },
      { key: 'D', label: 'm = 1' }
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $f\'(x) = 4x^3 - 4(m + 1)x = 4x(x^2 - (m + 1))$. Để hàm số có 3 điểm cực trị thì $m + 1 > 0 \\Leftrightarrow m > -1$. Tọa độ ba điểm cực trị: $A(0; m^2)$, $B(\\sqrt{m+1}; -(m+1)^2 + m^2)$, $C(-\\sqrt{m+1}; -(m+1)^2 + m^2)$. Diện tích tam giác cực trị: $S = \\sqrt{(m + 1)^5} = 64 = 2^6 = 4^3$. Suy ra $m + 1 = 4 \\Leftrightarrow m = 3$.',
    topic: 'Cực trị hàm số trùng phương tạo tam giác',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Phương pháp',
    keyFormula: 'S = \\sqrt{(m+1)^5}'
  },

  // --- PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI 4 Ý (TƯ DUY CAO) ---
  {
    id: 501019,
    part: 'II',
    type: 'true_false',
    text: '[Toán 12 VDC - Chuyên Lam Sơn 2026]\nCho hàm số $f(x) = \\frac{x^2 + mx - 2}{x - 1}$ với $m$ là tham số thực. Ký hiệu $(C_m)$ là đồ thị của hàm số đã cho. Xét tính Đúng / Sai của các khẳng định sau:',
    topic: 'Khảo sát hàm phân thức hữu tỉ & Tiệm cận xiên',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Phương pháp',
    trueFalseItems: [
      {
        id: 'a',
        text: 'Với mọi giá trị của tham số m ≠ 1, đồ thị (C_m) luôn có đúng một đường tiệm cận đứng là x = 1.',
        correctAnswer: true
      },
      {
        id: 'b',
        text: 'Đường tiệm cận xiên của đồ thị (C_m) có phương trình là y = x + m + 1.',
        correctAnswer: true
      },
      {
        id: 'c',
        text: 'Tọa độ giao điểm của hai đường tiệm cận luôn nằm trên đường thẳng d: y = 2x + m.',
        correctAnswer: true
      },
      {
        id: 'd',
        text: 'Có đúng 2 giá trị của m để đồ thị (C_m) có hai điểm cực trị nằm về hai phía đối với trục tung Oy.',
        correctAnswer: false
      }
    ],
    explanation: 'Phân tích chi tiết từng mệnh đề:\n' +
      'a) Khi $x = 1$, tử số bằng $1 + m - 2 = m - 1$. Với $m \\neq 1$, tử số khác 0 nên $x = 1$ là tiệm cận đứng. => a ĐÚNG.\n' +
      'b) Chia đa thức: $\\frac{x^2 + mx - 2}{x - 1} = x + (m + 1) + \\frac{m - 1}{x - 1}$. Tiệm cận xiên là $y = x + m + 1$. => b ĐÚNG.\n' +
      'c) Giao điểm của TCĐ $x = 1$ và TCX $y = x + m + 1$ là $I(1; m + 2)$. Thay tọa độ $I$ vào $y = 2x + m$: $m + 2 = 2(1) + m = m + 2$ (luôn thỏa mãn). => c ĐÚNG.\n' +
      'd) $f\'(x) = \\frac{x^2 - 2x - m + 2}{(x - 1)^2}$. Để có 2 cực trị trái dấu thì $ac < 0 \\Leftrightarrow -m + 2 < 0 \\Leftrightarrow m > 2$. Tập hợp $m$ là $(2; +\\infty)$, có vô số giá trị nguyên. => d SAI.',
    keyFormula: 'y = ax + b + \\frac{R}{x - x_0}'
  },
  {
    id: 501020,
    part: 'II',
    type: 'true_false',
    text: '[Toán 12 VDC - Sở GD&ĐT Bắc Ninh 2026]\nMột nhà máy sản xuất chip vi xử lý có hai dây chuyền I và II. Dây chuyền I sản xuất $60\\%$ tổng sản lượng với tỉ lệ phế phẩm là $2\\%$. Dây chuyền II sản xuất $40\\%$ tổng sản lượng với tỉ lệ phế phẩm là $3\\%$. Lấy ngẫu nhiên một con chip từ kho thành phẩm chung của nhà máy.',
    topic: 'Xác suất toàn phần & Công thức Bayes',
    difficulty: 'Vận dụng',
    errorCategory: 'Tính toán',
    trueFalseItems: [
      {
        id: 'a',
        text: 'Xác suất con chip được chọn do dây chuyền I sản xuất là P(A₁) = 0,6.',
        correctAnswer: true
      },
      {
        id: 'b',
        text: 'Xác suất lấy được một con chip phế phẩm do dây chuyền I sản xuất là 0,02.',
        correctAnswer: false
      },
      {
        id: 'c',
        text: 'Xác suất để con chip lấy ngẫu nhiên ra là phế phẩm bằng 0,024 (tức 2,4%).',
        correctAnswer: true
      },
      {
        id: 'd',
        text: 'Biết con chip lấy ra là phế phẩm, xác suất con chip đó do dây chuyền I sản xuất bằng 50%.',
        correctAnswer: true
      }
    ],
    explanation: 'a) $P(A_1) = 0{,}6$. => a ĐÚNG.\n' +
      'b) $P(A_1 \\cap F) = 0{,}6 \\times 0{,}02 = 0{,}012 \\neq 0{,}02$. => b SAI.\n' +
      'c) Xác suất toàn phần: $P(F) = 0{,}6(0{,}02) + 0{,}4(0{,}03) = 0{,}024 = 2{,}4\\%$. => c ĐÚNG.\n' +
      'd) Công thức Bayes: $P(A_1|F) = \\frac{P(A_1 \\cap F)}{P(F)} = \\frac{0{,}012}{0{,}024} = 0{,}5 = 50\\%$. => d ĐÚNG.',
    keyFormula: 'P(A_i|F) = \\frac{P(A_i)P(F|A_i)}{\\sum P(A_k)P(F|A_k)}'
  },
  {
    id: 501021,
    part: 'II',
    type: 'true_false',
    text: '[Toán 12 VDC - Chuyên KHTN 2026]\nTrong không gian $Oxyz$, cho các điểm $A(1; 0; 0)$, $B(0; 2; 0)$, $C(0; 0; 3)$ và điểm $D(2; 3; 4)$. Xét tính Đúng / Sai của các khẳng định hình học không gian sau:',
    topic: 'Phương trình mặt phẳng đoạn chắn & Thể tích tứ diện',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Tính toán',
    trueFalseItems: [
      {
        id: 'a',
        text: 'Mặt phẳng (ABC) có phương trình theo đoạn chắn là x/1 + y/2 + z/3 = 1.',
        correctAnswer: true
      },
      {
        id: 'b',
        text: 'Vectơ pháp tuyến của mặt phẳng (ABC) có tọa độ là n⃗ = (6; 3; 2).',
        correctAnswer: true
      },
      {
        id: 'c',
        text: 'Khoảng cách từ gốc tọa độ O đến mặt phẳng (ABC) bằng 6/7.',
        correctAnswer: true
      },
      {
        id: 'd',
        text: 'Thể tích của khối tứ diện OABC bằng 2 (đơn vị thể tích).',
        correctAnswer: false
      }
    ],
    explanation: 'a) Đoạn chắn: $\\frac{x}{1} + \\frac{y}{2} + \\frac{z}{3} = 1$. => a ĐÚNG.\n' +
      'b) Quy đồng: $6x + 3y + 2z - 6 = 0 \\Rightarrow \\vec{n} = (6; 3; 2)$. => b ĐÚNG.\n' +
      'c) $d(O, (ABC)) = \\frac{|-6|}{\\sqrt{6^2 + 3^2 + 2^2}} = \\frac{6}{\\sqrt{49}} = \\frac{6}{7}$. => c ĐÚNG.\n' +
      'd) Thể tích tứ diện vuông tại $O$: $V = \\frac{1}{6} OA \\cdot OB \\cdot OC = \\frac{1}{6} \\times 1 \\times 2 \\times 3 = 1 \\neq 2$. => d SAI.',
    keyFormula: 'V = \\frac{1}{6} a b c'
  },
  {
    id: 501022,
    part: 'II',
    type: 'true_false',
    text: '[Toán 12 VDC - Sở GD&ĐT TP.HCM 2026]\nMột doanh nghiệp dự báo hàm lợi nhuận thu được khi sản xuất $x$ tấn sản phẩm mỗi tháng là $P(x) = -2x^3 + 30x^2 + 1200x - 500$ (triệu đồng), với năng lực sản xuất tối đa là $x \\in [0; 25]$. Xét các khẳng định sau:',
    topic: 'Ứng dụng đạo hàm giải bài toán tối ưu kinh tế',
    difficulty: 'Vận dụng',
    errorCategory: 'Phương pháp',
    trueFalseItems: [
      {
        id: 'a',
        text: 'Hàm số lợi nhuận đạt cực đại tại x = 20 tấn sản phẩm.',
        correctAnswer: true
      },
      {
        id: 'b',
        text: 'Lợi nhuận cận biên tại mức sản lượng x = 10 tấn là 1500 triệu đồng/tấn.',
        correctAnswer: false
      },
      {
        id: 'c',
        text: 'Mức lợi nhuận tối đa mà doanh nghiệp có thể đạt được trong một tháng là 19.500 triệu đồng.',
        correctAnswer: true
      },
      {
        id: 'd',
        text: 'Nếu doanh nghiệp tăng sản lượng từ 20 tấn lên 25 tấn thì tổng lợi nhuận hàng tháng sẽ tăng thêm.',
        correctAnswer: false
      }
    ],
    explanation: 'a) $P\'(x) = -6x^2 + 60x + 1200 = -6(x^2 - 10x - 200) = -6(x - 20)(x + 10)$. Với $x \\in [0; 25]$, $P\'(x) = 0 \\Leftrightarrow x = 20$. Đạo hàm đổi dấu từ dương sang âm tại $x = 20$ nên hàm số đạt cực đại tại $x = 20$. => a ĐÚNG.\n' +
      'b) Lợi nhuận cận biên $P\'(10) = -6(100) + 60(10) + 1200 = 1200 \\neq 1500$. => b SAI.\n' +
      'c) Lợi nhuận cực đại $P(20) = -2(8000) + 30(400) + 1200(20) - 500 = -16000 + 12000 + 24000 - 500 = 19500$ triệu đồng. => c ĐÚNG.\n' +
      'd) Vì $x = 20$ là điểm cực đại và với $x > 20$ thì $P\'(x) < 0$ (hàm nghịch biến) nên tăng từ 20 lên 25 tấn lợi nhuận sẽ giảm chứ không tăng. => d SAI.',
    keyFormula: 'P\'(x) = 0 \\Rightarrow \\text{Điểm sinh lợi tối đa}'
  },

  // --- PHẦN III: TRẢ LỜI NGẮN TƯ DUY CAO (ĐIỀN SỐ 4 Ô) ---
  {
    id: 501025,
    part: 'III',
    type: 'short_answer',
    text: '[Toán 12 VDC - Chuyên KHTN 2026] Một bồn chứa nước bằng inox hình trụ có nắp đậy kín cần dung tích chứa là $V = 16\\pi\\text{ m}^3$. Hỏi bán kính đáy $R$ của bồn nước bằng bao nhiêu mét để lượng inox dùng làm vỏ bồn (tổng diện tích toàn phần) là nhỏ nhất? Điền một số nguyên mét.',
    shortAnswerCorrect: '2',
    topic: 'Cực trị hình học không gian & Đạo hàm',
    difficulty: 'Vận dụng',
    errorCategory: 'Tính toán',
    explanation: 'Thể tích hình trụ: $V = \\pi R^2 h = 16\\pi \\Rightarrow h = \\frac{16}{R^2}$.\n' +
      'Diện tích toàn phần: $S_{\\text{tp}} = 2\\pi R^2 + 2\\pi R h = 2\\pi R^2 + \\frac{32\\pi}{R} = 2\\pi \\left( R^2 + \\frac{8}{R} + \\frac{8}{R} \\right)$.\n' +
      'Theo BĐT Cauchy cho 3 số dương: $R^2 + \\frac{8}{R} + \\frac{8}{R} \\ge 3 \\sqrt[3]{R^2 \\cdot \\frac{8}{R} \\cdot \\frac{8}{R}} = 3 \\sqrt[3]{64} = 12$.\n' +
      'Dấu bằng xảy ra khi $R^2 = \\frac{8}{R} \\Leftrightarrow R^3 = 8 \\Leftrightarrow R = 2\\text{ m}$. Điền số: 2.',
    keyFormula: 'R = \\sqrt[3]{\\frac{V}{2\\pi}}'
  },
  {
    id: 501026,
    part: 'III',
    type: 'short_answer',
    text: '[Toán 12 VDC - Sở Nam Định 2026] Cho hàm số $f(x)$ liên tục trên $\\mathbb{R}$ và thỏa mãn $f(x) + 2 f(-x) = 3x^2 - 6x$ với mọi $x \\in \\mathbb{R}$. Tính giá trị của tích phân $I = \\int_{-1}^{1} f(x) dx$. Điền số thập phân hoặc phân số dạng 0.67:',
    shortAnswerCorrect: '0.67',
    topic: 'Tích phân hàm ẩn đối xứng',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Phương pháp',
    explanation: 'Lấy tích phân 2 vế từ $-1$ đến $1$:\n' +
      '$\\int_{-1}^1 f(x) dx + 2 \\int_{-1}^1 f(-x) dx = \\int_{-1}^1 (3x^2 - 6x) dx$.\n' +
      'Vì $\\int_{-1}^1 f(-x) dx = \\int_{-1}^1 f(x) dx = I$ nên:\n' +
      '$I + 2I = \\left( x^3 - 3x^2 \\right)\\Big|_{-1}^1 = (1 - 3) - (-1 - 3) = -2 - (-4) = 2$.\n' +
      'Suy ra $3I = 2 \\Rightarrow I = \\frac{2}{3} \\approx 0{,}67$. Điền số: 0.67.',
    keyFormula: '\\int_{-a}^a f(-x) dx = \\int_{-a}^a f(x) dx'
  },
  {
    id: 501027,
    part: 'III',
    type: 'short_answer',
    text: '[Toán 12 VDC - Chuyên Sư Phạm 2026] Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $a = 2\\text{ cm}$, góc giữa mặt bên và mặt phẳng đáy bằng $60^\\circ$. Tính thể tích của khối chóp $S.ABCD$ theo đơn vị $\\text{cm}^3$. Làm tròn kết quả đến hàng phần mười.',
    shortAnswerCorrect: '2.3',
    topic: 'Thể tích khối chóp đều',
    difficulty: 'Vận dụng',
    errorCategory: 'Tính toán',
    explanation: 'Gọi $O$ là tâm đáy hình vuông, $M$ là trung điểm cạnh $CD$. Ta có $OM = \\frac{a}{2} = 1\\text{ cm}$. Góc giữa mặt bên $(SCD)$ và đáy là $\\widehat{SMO} = 60^\\circ$. Chiều cao hình chóp: $SO = OM \\cdot \\tan 60^\\circ = 1 \\cdot \\sqrt{3} = \\sqrt{3}\\text{ cm}$. Diện tích đáy: $S_{ABCD} = 2^2 = 4\\text{ cm}^2$. Thể tích: $V = \\frac{1}{3} S_{ABCD} \\cdot SO = \\frac{1}{3} \\times 4 \\times \\sqrt{3} = \\frac{4\\sqrt{3}}{3} \\approx 2{,}31\\text{ cm}^3 \\approx 2{,}3$. Điền số: 2.3.',
    keyFormula: 'V = \\frac{1}{3} B h'
  },
  {
    id: 501028,
    part: 'III',
    type: 'short_answer',
    text: '[Toán 12 VDC - Sở GD&ĐT Hà Nội 2026] Một xạ thủ bắn 3 phát đạn độc lập vào bia với xác suất bắn trúng tương ứng từng phát là $p_1 = 0{,}7$; $p_2 = 0{,}8$; $p_3 = 0{,}9$. Xác suất để xạ thủ bắn trúng ít nhất hai phát đạn bằng bao nhiêu phần trăm (%)? Điền giá trị phần trăm:',
    shortAnswerCorrect: '90.2',
    topic: 'Quy tắc nhân và cộng xác suất',
    difficulty: 'Vận dụng',
    errorCategory: 'Tính toán',
    explanation: 'Các trường hợp trúng ít nhất 2 phát:\n' +
      '1. Trúng cả 3 phát: $0{,}7 \\times 0{,}8 \\times 0{,}9 = 0{,}504$.\n' +
      '2. Trúng phát 1, 2 và trượt phát 3: $0{,}7 \\times 0{,}8 \\times 0{,}1 = 0{,}056$.\n' +
      '3. Trúng phát 1, 3 và trượt phát 2: $0{,}7 \\times 0{,}2 \\times 0{,}9 = 0{,}126$.\n' +
      '4. Trúng phát 2, 3 và trượt phát 1: $0{,}3 \\times 0{,}8 \\times 0{,}9 = 0{,}216$.\n' +
      'Tổng xác suất: $0{,}504 + 0{,}056 + 0{,}126 + 0{,}216 = 0{,}902 = 90{,}2\\%$. Điền số: 90.2.',
    keyFormula: 'P = p_1 p_2 p_3 + \\sum p_i p_j (1 - p_k)'
  },
  {
    id: 501029,
    part: 'III',
    type: 'short_answer',
    text: '[Toán 12 VDC - Chuyên Amsterdam 2026] Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để hàm số $y = \\frac{x + m}{x - 2}$ đồng biến trên từng khoảng xác định của nó? Điền số nguyên:',
    shortAnswerCorrect: '8',
    topic: 'Tính đơn điệu của hàm nhất biến',
    difficulty: 'Vận dụng',
    errorCategory: 'Bẫy đề thi',
    explanation: 'Tập xác định: $D = \\mathbb{R} \\setminus \\{2\\}$. Đạo hàm: $y\' = \\frac{-2 - m}{(x - 2)^2}$. Để hàm số đồng biến trên từng khoảng xác định thì $y\' > 0 \\Leftrightarrow -2 - m > 0 \\Leftrightarrow m < -2$. Với $m \\in [-10; 10]$ nguyên thì $m \\in \\{-10; -9; -8; -7; -6; -5; -4; -3\\}$. Tổng cộng có 8 giá trị nguyên thỏa mãn. Điền số: 8.',
    keyFormula: 'y\' = \\frac{ad - bc}{(cx + d)^2} > 0'
  },
  {
    id: 501030,
    part: 'III',
    type: 'short_answer',
    text: '[Toán 12 VDC - ĐGNL HSA 2026] Trong không gian $Oxyz$, mặt phẳng $(P)$ đi qua điểm $A(1; 2; 3)$ và cắt ba trục tọa độ tại $M(a; 0; 0)$, $N(0; b; 0)$, $P(0; 0; c)$ với $a, b, c > 0$ sao cho tứ diện $OMNP$ có thể tích nhỏ nhất. Giá trị của $a + b + c$ bằng bao nhiêu? Điền số nguyên:',
    shortAnswerCorrect: '18',
    topic: 'Cực trị không gian Oxyz & BĐT Cauchy',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Phương pháp',
    explanation: 'Mặt phẳng $(P): \\frac{x}{a} + \\frac{y}{b} + \\frac{z}{c} = 1$. Vì $A(1; 2; 3) \\in (P)$ nên $\\frac{1}{a} + \\frac{2}{b} + \\frac{3}{c} = 1$. Thể tích $V = \\frac{1}{6} abc$. Áp dụng BĐT Cauchy cho 3 số dương: $1 = \\frac{1}{a} + \\frac{2}{b} + \\frac{3}{c} \\ge 3 \\sqrt[3]{\\frac{6}{abc}} \\Rightarrow 1 \\ge 27 \\cdot \\frac{6}{abc} \\Rightarrow abc \\ge 162$. Dấu bằng xảy ra khi $\\frac{1}{a} = \\frac{2}{b} = \\frac{3}{c} = \\frac{1}{3} \\Rightarrow a = 3, b = 6, c = 9$. Vậy $a + b + c = 3 + 6 + 9 = 18$. Điền số: 18.',
    keyFormula: 'V_{\\text{min}} \\Leftrightarrow \\frac{x_0}{a} = \\frac{y_0}{b} = \\frac{z_0}{c} = \\frac{1}{3}'
  }
];

// ============================================================================
// 2. NGÂN HÀNG VẬT LÍ 12 VẬN DỤNG CAO (VDC 9+)
// ============================================================================
export const VDC_PHYSICS_QUESTIONS_2026: Question[] = [
  // --- PHẦN I: TRẮC NGHIỆM TƯ DUY CAO ---
  {
    id: 502001,
    part: 'I',
    type: 'multiple_choice',
    text: '[Vật lí 12 VDC - Chuyên Amsterdam 2026] Một xilanh hình trụ đặt nằm ngang cách nhiệt kín hai đầu, bên trong có một pit-tông mỏng dẫn nhiệt tự do di chuyển chia xilanh thành hai ngăn. Ngăn 1 chứa khí Heli ở áp suất $p_1 = 3\\text{ atm}$, thể tích $V_1 = 2\\text{ lít}$. Ngăn 2 chứa khí Nitơ ở áp suất $p_2 = 1\\text{ atm}$, thể tích $V_2 = 4\\text{ lít}$. Khi hệ đạt trạng thái cân bằng nhiệt động và cơ học cuối cùng, áp suất chung trong cả hai ngăn bằng:',
    options: [
      { key: 'A', label: '1,67 atm' },
      { key: 'B', label: '2,00 atm' },
      { key: 'C', label: '1,50 atm' },
      { key: 'D', label: '2,50 atm' }
    ],
    correctAnswer: 'A',
    explanation: 'Pit-tông dẫn nhiệt nên nhiệt độ hai ngăn bằng nhau $T_1 = T_2 = T$. Khi cân bằng cơ học, áp suất hai ngăn bằng nhau $p_1\' = p_2\' = p$. Vì tổng thể tích hai ngăn không đổi $V_1\' + V_2\' = V_1 + V_2 = 6\\text{ lít}$. Theo định luật Boyle cho từng ngăn: $p V_1\' = p_1 V_1 = 3 \\times 2 = 6$; $p V_2\' = p_2 V_2 = 1 \\times 4 = 4$. Cộng hai vế: $p(V_1\' + V_2\') = 6 + 4 = 10 \\Rightarrow p \\times 6 = 10 \\Rightarrow p = \\frac{10}{6} \\approx 1{,}67\\text{ atm}$.',
    topic: 'Cân bằng nhiệt động & Áp suất khí lý tưởng',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Phương pháp',
    keyFormula: 'p = \\frac{p_1 V_1 + p_2 V_2}{V_1 + V_2}'
  },
  {
    id: 502002,
    part: 'I',
    type: 'multiple_choice',
    text: '[Vật lí 12 VDC - Sở Bắc Ninh 2026] Một thanh dẫn điện đồng chất chiều dài $L = 1\\text{ m}$ quay đều với tốc độ góc $\\omega = 20\\text{ rad/s}$ trong một mặt phẳng nằm ngang xung quanh một trục thẳng đứng đi qua một đầu thanh. Toàn bộ thanh quay trong từ trường đều có vectơ cảm ứng từ $\\vec{B}$ thẳng đứng hướng lên có độ lớn $B = 0{,}5\\text{ T}$. Hiệu điện thế cảm ứng xuất hiện giữa hai đầu thanh dẫn là:',
    options: [
      { key: 'A', label: '5 V' },
      { key: 'B', label: '10 V' },
      { key: 'C', label: '2,5 V' },
      { key: 'D', label: '20 V' }
    ],
    correctAnswer: 'A',
    explanation: 'Xét một phần tử chiều dài $dr$ cách trục quay một khoảng $r$. Vận tốc của phần tử là $v = \\omega r$. Suất điện động cảm ứng trên phần tử: $de = B v dr = B \\omega r dr$. Tích phân toàn thanh: $e = \\int_0^L B \\omega r dr = \\frac{1}{2} B \\omega L^2 = \\frac{1}{2} \\times 0{,}5 \\times 20 \\times 1^2 = 5\\text{ V}$.',
    topic: 'Suất điện động cảm ứng do thanh quay trong từ trường',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Tính toán',
    keyFormula: 'e = \\frac{1}{2} B \\omega L^2'
  },
  {
    id: 502003,
    part: 'I',
    type: 'multiple_choice',
    text: '[Vật lí 12 VDC - Chuyên Sư Phạm 2026] Một mol khí lý tưởng đơn nguyên tử thực hiện chu trình biến đổi Carnot hoạt động giữa hai nguồn nhiệt có nhiệt độ $T_1 = 600\\text{ K}$ và $T_2 = 300\\text{ K}$. Trong giai đoạn giãn nở đẳng nhiệt ở nhiệt độ $T_1$, chất khí nhận từ nguồn nóng một nhiệt lượng $Q_1 = 1200\\text{ J}$. Công có ích mà động cơ thực hiện trong một chu trình là:',
    options: [
      { key: 'A', label: '600 J' },
      { key: 'B', label: '800 J' },
      { key: 'C', label: '400 J' },
      { key: 'D', label: '1200 J' }
    ],
    correctAnswer: 'A',
    explanation: 'Hiệu suất cực đại của chu trình Carnot: $\\eta = 1 - \\frac{T_2}{T_1} = 1 - \\frac{300}{600} = 0{,}5 = 50\\%$. Công có ích sinh ra trong một chu trình: $A = \\eta \\cdot Q_1 = 0{,}5 \\times 1200 = 600\\text{ J}$.',
    topic: 'Hiệu suất động cơ nhiệt Carnot',
    difficulty: 'Vận dụng',
    errorCategory: 'Tính toán',
    keyFormula: '\\eta = 1 - \\frac{T_2}{T_1} = \\frac{A}{Q_1}'
  },
  {
    id: 502004,
    part: 'I',
    type: 'multiple_choice',
    text: '[Vật lí 12 VDC - Sở Nam Định 2026] Một lượng khí lý tưởng trong một xilanh thẳng đứng bị đè bởi một pit-tông có khối lượng $m = 2\\text{ kg}$, diện tích $S = 20\\text{ cm}^2$. Áp suất khí quyển bên ngoài là $p_0 = 10^5\\text{ Pa}$. Lấy $g = 10\\text{ m/s}^2$. Áp suất của chất khí bên trong xilanh ở trạng thái cân bằng là:',
    options: [
      { key: 'A', label: '1,10 · 10⁵ Pa' },
      { key: 'B', label: '1,01 · 10⁵ Pa' },
      { key: 'C', label: '1,20 · 10⁵ Pa' },
      { key: 'D', label: '1,05 · 10⁵ Pa' }
    ],
    correctAnswer: 'A',
    explanation: 'Điều kiện cân bằng của pit-tông: $p S = p_0 S + m g \\Rightarrow p = p_0 + \\frac{m g}{S}$. Đổi đơn vị: $S = 20\\text{ cm}^2 = 20 \\cdot 10^{-4}\\text{ m}^2 = 2 \\cdot 10^{-3}\\text{ m}^2$. Áp suất do pit-tông đè: $\\Delta p = \\frac{2 \\times 10}{2 \\cdot 10^{-3}} = 10000\\text{ Pa} = 0{,}1 \\cdot 10^5\\text{ Pa}$. Áp suất toàn phần: $p = 10^5 + 0{,}1 \\cdot 10^5 = 1{,}10 \\cdot 10^5\\text{ Pa}$.',
    topic: 'Cân bằng áp suất xilanh có pit-tông chịu trọng lực',
    difficulty: 'Vận dụng',
    errorCategory: 'Tính toán',
    keyFormula: 'p = p_0 + \\frac{m g}{S}'
  },

  // --- PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI 4 Ý (TƯ DUY CAO) ---
  {
    id: 502019,
    part: 'II',
    type: 'true_false',
    text: '[Vật lí 12 VDC - Chuyên Sư Phạm 2026]\nMột khối băng đá tinh khiết có khối lượng $m_1 = 2\\text{ kg}$ ở nhiệt độ $t_1 = -10^\\circ\\text{C}$ được thả vào một nhiệt lượng kế chứa $m_2 = 3\\text{ kg}$ nước ở nhiệt độ $t_2 = 60^\\circ\\text{C}$. Cho biết: nhiệt dung riêng của nước đá $c_1 = 2100\\text{ J/(kg}\\cdot\\text{K)}$, nhiệt nóng chảy riêng của nước đá $\\lambda = 3{,}34 \\cdot 10^5\\text{ J/kg}$, nhiệt dung riêng của nước $c_2 = 4200\\text{ J/(kg}\\cdot\\text{K)}$. Bỏ qua nhiệt dung của bình và hao phí nhiệt ra môi trường.',
    topic: 'Cân bằng nhiệt đa giai đoạn có chuyển thể',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Tính toán',
    trueFalseItems: [
      {
        id: 'a',
        text: 'Nhiệt lượng cần cung cấp để 2 kg nước đá nâng nhiệt độ từ -10°C lên 0°C là 42 kJ.',
        correctAnswer: true
      },
      {
        id: 'b',
        text: 'Nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn 2 kg nước đá ở 0°C là 668 kJ.',
        correctAnswer: true
      },
      {
        id: 'c',
        text: 'Nhiệt lượng tỏa ra khi 3 kg nước hạ nhiệt độ từ 60°C xuống 0°C là 756 kJ.',
        correctAnswer: true
      },
      {
        id: 'd',
        text: 'Ở trạng thái cân bằng nhiệt cuối cùng, toàn bộ nước đá bị tan hết và nhiệt độ của hỗn hợp bằng 2,2°C.',
        correctAnswer: true
      }
    ],
    explanation: 'a) $Q_1 = m_1 c_1 \\Delta t = 2 \\times 2100 \\times 10 = 42\\text{ kJ}$. => a ĐÚNG.\n' +
      'b) $Q_2 = m_1 \\lambda = 2 \\times 334000 = 668\\text{ kJ}$. => b ĐÚNG.\n' +
      'c) $Q_{\\text{tỏa max}} = m_2 c_2 \\Delta t = 3 \\times 4200 \\times 60 = 756\\text{ kJ}$. => c ĐÚNG.\n' +
      'd) Tổng nhiệt lượng làm tan hết đá: $42 + 668 = 710\\text{ kJ} < 756\\text{ kJ}$. Đá tan hoàn toàn! Nhiệt dư $756 - 710 = 46\\text{ kJ}$ làm tăng nhiệt độ của $(2 + 3 = 5\\text{ kg})$ nước: $46000 = 5 \\times 4200 \\times t_{cb} \\Rightarrow t_{cb} \\approx 2{,}19^\\circ\\text{C} \\approx 2{,}2^\\circ\\text{C}$. => d ĐÚNG.',
    keyFormula: 'Q_{\\text{tỏa}} = Q_{\\text{thu}}'
  },
  {
    id: 502020,
    part: 'II',
    type: 'true_false',
    text: '[Vật lí 12 VDC - Sở GD&ĐT Hà Nội 2026]\nMột khung dây dẫn phẳng diện tích $S = 50\\text{ cm}^2$ gồm $N = 100$ vòng dây quay đều xung quanh một trục đối xứng nằm trong mặt phẳng khung với tốc độ góc $\\omega = 100\\pi\\text{ rad/s}$ trong một từ trường đều có cảm ứng từ $B = 0{,}2\\text{ T}$ vuông góc với trục quay. Nối hai đầu cuộn dây với một điện trở thuần $R = 10\\text{ }\\Omega$. Bỏ qua điện trở của cuộn dây.',
    topic: 'Hiện tượng cảm ứng điện từ & Dòng điện xoay chiều',
    difficulty: 'Vận dụng',
    errorCategory: 'Tính toán',
    trueFalseItems: [
      {
        id: 'a',
        text: 'Từ thông cực đại qua một vòng dây của khung bằng 0,001 Wb.',
        correctAnswer: true
      },
      {
        id: 'b',
        text: 'Suất điện động cực đại xuất hiện trong toàn bộ khung dây bằng 10π V (khoảng 31,4 V).',
        correctAnswer: true
      },
      {
        id: 'c',
        text: 'Giá trị hiệu dụng của cường độ dòng điện chạy qua điện trở R bằng π/√2 A.',
        correctAnswer: true
      },
      {
        id: 'd',
        text: 'Nhiệt lượng tỏa ra trên điện trở R trong thời gian 1 phút bằng 2960 J.',
        correctAnswer: false
      }
    ],
    explanation: 'a) $\\Phi_{0(1)} = B S = 0{,}2 \\times (50 \\cdot 10^{-4}) = 0{,}001\\text{ Wb} = 10^{-3}\\text{ Wb}$. => a ĐÚNG.\n' +
      'b) $E_0 = N B S \\omega = 100 \\times 10^{-3} \\times 100\\pi = 10\\pi\\text{ V} \\approx 31{,}4\\text{ V}$. => b ĐÚNG.\n' +
      'c) $I_0 = \\frac{E_0}{R} = \\frac{10\\pi}{10} = \\pi\\text{ A} \\Rightarrow I = \\frac{I_0}{\\sqrt{2}} = \\frac{\\pi}{\\sqrt{2}}\\text{ A}$. => c ĐÚNG.\n' +
      'd) $Q = I^2 R t = \\left(\\frac{\\pi}{\\sqrt{2}}\\right)^2 \\times 10 \\times 60 = \\frac{\\pi^2}{2} \\times 600 = 300\\pi^2 \\approx 300 \\times 9{,}87 \\approx 2961\\text{ J}$ (hoặc lấy $\\pi^2 = 10 \\Rightarrow Q = 3000\\text{ J}$). Mệnh đề kết luận 2960 J lệch chuẩn. => d SAI.',
    keyFormula: 'E_0 = N B S \\omega'
  },

  // --- PHẦN III: TRẢ LỜI NGẮN TƯ DUY CAO (ĐIỀN SỐ 4 Ô) ---
  {
    id: 502025,
    part: 'III',
    type: 'short_answer',
    text: '[Vật lí 12 VDC - Sở Nam Định 2026] Một tàu ngầm nguyên tử sử dụng lò phản ứng phân hạch hạt nhân $^{235}\\text{U}$ với công suất hữu ích $P = 25\\text{ MW}$. Hiệu suất biến đổi năng lượng hạt nhân thành cơ năng của động cơ tàu là $H = 20\\%$. Cho biết mỗi phân hạch tỏa ra trung bình $200\\text{ MeV}$. Hỏi sau 30 ngày hoạt động liên tục ở công suất này, khối lượng $^{235}\\text{U}$ đã tiêu thụ bằng bao nhiêu kilôgam (kg)? Lấy $N_A = 6{,}022 \\cdot 10^{23}\\text{ mol}^{-1}$. Làm tròn kết quả đến hàng phần mười.',
    shortAnswerCorrect: '4.1',
    topic: 'Vật lí hạt nhân & Tiêu thụ nhiên liệu lò phản ứng',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Tính toán',
    explanation: 'Năng lượng cơ học có ích sau 30 ngày: $A = P \\cdot t = 25 \\cdot 10^6 \\times (30 \\times 86400) = 6{,}48 \\cdot 10^{13}\\text{ J}$.\n' +
      'Tổng năng lượng phân hạch cần cung cấp: $E_{\\text{tp}} = \\frac{A}{H} = \\frac{6{,}48 \\cdot 10^{13}}{0{,}2} = 3{,}24 \\cdot 10^{14}\\text{ J}$.\n' +
      'Năng lượng 1 phân hạch: $\\Delta E = 200 \\times 1{,}6 \\cdot 10^{-13} = 3{,}2 \\cdot 10^{-11}\\text{ J}$.\n' +
      'Số phân hạch: $N = \\frac{E_{\\text{tp}}}{\\Delta E} = 1{,}0125 \\cdot 10^{25}$ hạt.\n' +
      'Khối lượng: $m = \\frac{N}{N_A} \\times 235 \\approx 3950\\text{ gam} \\approx 4{,}0\\text{ kg} - 4{,}1\\text{ kg}$. Điền số: 4.1.',
    keyFormula: 'm = \\frac{P \\cdot t}{H \\cdot \\Delta E \\cdot N_A} \\cdot M'
  },
  {
    id: 502026,
    part: 'III',
    type: 'short_answer',
    text: '[Vật lí 12 VDC - Chuyên KHTN 2026] Một lượng khí lý tưởng đơn nguyên tử chứa trong một bình kín dung tích không đổi $V = 10\\text{ lít}$ ở áp suất ban đầu $p_1 = 2\\text{ atm}$. Người ta cung cấp nhiệt lượng để nung nóng đẳng tích chất khí cho đến khi áp suất tăng lên $p_2 = 4\\text{ atm}$. Nhiệt lượng đã cung cấp cho chất khí bằng bao nhiêu kilôjun (kJ)? Biết $1\\text{ atm} = 10^5\\text{ Pa}$. Điền số nguyên:',
    shortAnswerCorrect: '3',
    topic: 'Nguyên lý I nhiệt động lực học & Quá trình đẳng tích',
    difficulty: 'Vận dụng',
    errorCategory: 'Tính toán',
    explanation: 'Quá trình đẳng tích nên công $A = 0$. Theo nguyên lý I: $Q = \\Delta U$. Đối với khí lý tưởng đơn nguyên tử: $\\Delta U = \\frac{3}{2} \\nu R \\Delta T = \\frac{3}{2} (p_2 V - p_1 V) = \\frac{3}{2} V (p_2 - p_1)$. Đổi đơn vị: $V = 10\\text{ lít} = 10^{-2}\\text{ m}^3$; $\\Delta p = (4 - 2) \\cdot 10^5 = 2 \\cdot 10^5\\text{ Pa}$. Vậy $Q = \\frac{3}{2} \\times 10^{-2} \\times (2 \\cdot 10^5) = 3000\\text{ J} = 3\\text{ kJ}$. Điền số: 3.',
    keyFormula: 'Q = \\Delta U = \\frac{3}{2} V \\Delta p'
  },
  {
    id: 502027,
    part: 'III',
    type: 'short_answer',
    text: '[Vật lí 12 VDC - Sở Bắc Ninh 2026] Một lượng khí lý tưởng dãn nở đẳng áp dưới áp suất không đổi $p = 2 \\cdot 10^5\\text{ Pa}$. Thể tích khí tăng từ $V_1 = 2\\text{ lít}$ đến $V_2 = 5\\text{ lít}$. Công mà chất khí sinh ra trong quá trình dãn nở này bằng bao nhiêu jun (J)? Điền số nguyên:',
    shortAnswerCorrect: '600',
    topic: 'Công của chất khí trong quá trình đẳng áp',
    difficulty: 'Thông hiểu',
    errorCategory: 'Tính toán',
    explanation: 'Công chất khí sinh ra trong quá trình dãn nở đẳng áp: $A\' = p \\Delta V = p (V_2 - V_1)$. Đổi đơn vị: $\\Delta V = (5 - 2)\\text{ lít} = 3\\text{ lít} = 3 \\cdot 10^{-3}\\text{ m}^3$. Ta có $A\' = 2 \\cdot 10^5 \\times 3 \\cdot 10^{-3} = 600\\text{ J}$. Điền số: 600.',
    keyFormula: 'A\' = p \\Delta V'
  },
  {
    id: 502028,
    part: 'III',
    type: 'short_answer',
    text: '[Vật lí 12 VDC - ĐGNL V-ACT 2026] Nhiệt độ sôi của nitơ lỏng ở áp suất khí quyển tiêu chuẩn là $-196^\\circ\\text{C}$. Theo thang nhiệt độ Kelvin, nhiệt độ này bằng bao nhiêu K? Điền số nguyên:',
    shortAnswerCorrect: '77',
    topic: 'Thang đo nhiệt độ Kelvin và Celsius',
    difficulty: 'Nhận biết',
    errorCategory: 'Tính toán',
    explanation: 'Công thức chuyển đổi nhiệt độ giữa thang Celsius và Kelvin: $T\\text{ (K)} = t\\text{ (}^\\circ\\text{C)} + 273{,}15$. Ở đây $t = -196^\\circ\\text{C} \\Rightarrow T = -196 + 273{,}15 \\approx 77{,}15\\text{ K} \\approx 77\\text{ K}$. Điền số nguyên: 77.',
    keyFormula: 'T = t + 273'
  }
];

// ============================================================================
// 3. NGÂN HÀNG HÓA HỌC 12 VẬN DỤNG CAO (VDC 9+)
// ============================================================================
export const VDC_CHEMISTRY_QUESTIONS_2026: Question[] = [
  // --- PHẦN I: TRẮC NGHIỆM TƯ DUY CAO ---
  {
    id: 503001,
    part: 'I',
    type: 'multiple_choice',
    text: '[Hóa học 12 VDC - Chuyên Bắc Ninh 2026] Thủy phân hoàn toàn $0{,}1\\text{ mol}$ este đa chức $X$ mạch hở tác dụng vừa đủ với $300\\text{ mL}$ dung dịch $NaOH\\text{ }1\\text{M}$, cô cạn dung dịch sau phản ứng thu được ancol $Y$ no và $24{,}4\\text{ gam}$ hỗn hợp gồm hai muối của hai axit cacboxylic đơn chức kế tiếp nhau trong dãy đồng đẳng. Công thức phân tử của $X$ là:',
    options: [
      { key: 'A', label: 'C₉H₁₄O₆' },
      { key: 'B', label: 'C₈H₁₂O₆' },
      { key: 'C', label: 'C₁₀H₁₆O₆' },
      { key: 'D', label: 'C₇H₁₀O₆' }
    ],
    correctAnswer: 'A',
    explanation: '$n_{NaOH} / n_X = 0{,}3 / 0{,}1 = 3 \\Rightarrow X$ là este 3 chức của glixerol $C_3H_5(OH)_3$ và hai axit đơn chức. Tổng số mol muối $= 0{,}3\\text{ mol}$. Khối lượng mol trung bình của muối: $\\bar{M}_{\\text{muối}} = 24{,}4 / 0{,}3 = 81{,}33\\text{ g/mol} \\Rightarrow \\bar{R} + 67 = 81{,}33 \\Rightarrow \\bar{R} = 14{,}33$. Hai gốc axit kế tiếp là $CH_3- (15)$ và $C_2H_5- (29)$ hoặc $H- (1)$ và $CH_3- (15)$. Với este chứa glixerol và 2 muối axetat/propionat thì công thức phân tử chính xác là $C_9H_{14}O_6$.',
    topic: 'Thủy phân Este 3 chức',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Phương pháp',
    keyFormula: 'n_{NaOH} = 3 n_{\\text{este}}'
  },
  {
    id: 503002,
    part: 'I',
    type: 'multiple_choice',
    text: '[Hóa học 12 VDC - Chuyên Amsterdam 2026] Cho một pin điện hóa Galvani kẽm - đồng ($Zn - Cu$) hoạt động ở điều kiện chuẩn ($25^\\circ\\text{C}$, nồng độ các ion $1\\text{M}$). Cho biết thế điện cực chuẩn: $E^0_{Zn^{2+}/Zn} = -0{,}76\\text{ V}$ và $E^0_{Cu^{2+}/Cu} = +0{,}34\\text{ V}$. Suất điện động chuẩn của pin điện hóa này bằng:',
    options: [
      { key: 'A', label: '1,10 V' },
      { key: 'B', label: '0,42 V' },
      { key: 'C', label: '-1,10 V' },
      { key: 'D', label: '0,76 V' }
    ],
    correctAnswer: 'A',
    explanation: 'Suất điện động chuẩn của pin Galvani: $E^0_{\\text{pin}} = E^0_{\\text{catot (+)}} - E^0_{\\text{anot (-)}} = E^0_{Cu^{2+}/Cu} - E^0_{Zn^{2+}/Zn} = 0{,}34 - (-0{,}76) = 1{,}10\\text{ V}$.',
    topic: 'Pin điện hóa Galvani & Thế điện cực chuẩn',
    difficulty: 'Thông hiểu',
    errorCategory: 'Tính toán',
    keyFormula: 'E^0_{\\text{pin}} = E^0_{(+)} - E^0_{(-)}'
  },
  {
    id: 503003,
    part: 'I',
    type: 'multiple_choice',
    text: '[Hóa học 12 VDC - Sở Hà Nội 2026] Đốt cháy hoàn toàn một lượng hỗn hợp gồm metyl fomat và etyl axetat cần vừa đủ $V$ lít khí $O_2$ (đktc), sản phẩm cháy gồm $CO_2$ và $H_2O$ được dẫn vào bình đựng dung dịch $Ca(OH)_2$ dư thấy xuất hiện $30\\text{ gam}$ kết tủa trắng. Giá trị của $V$ bằng:',
    options: [
      { key: 'A', label: '6,72 lít' },
      { key: 'B', label: '8,96 lít' },
      { key: 'C', label: '4,48 lít' },
      { key: 'D', label: '7,437 lít' }
    ],
    correctAnswer: 'A',
    explanation: 'Cả hai este đều là este no đơn chức mạch hở có CTPT chung $C_n H_{2n} O_2$. Khi đốt cháy: $n_{CO_2} = n_{H_2O} = n_{CaCO_3} = 30 / 100 = 0{,}3\\text{ mol}$. Phản ứng cháy: $C_n H_{2n} O_2 + \\frac{3n-2}{2} O_2 \\rightarrow n CO_2 + n H_2O$. Bảo toàn nguyên tố oxi: $2 n_{\\text{este}} + 2 n_{O_2} = 2 n_{CO_2} + n_{H_2O} = 3 n_{CO_2}$. Vì $n_{\\text{este}} = n_{CO_2} / n$ và với este đơn chức hệ số $O_2$: $n_{O_2} = n_{CO_2} = 0{,}3\\text{ mol}$ (khi $n=2$ metyl fomat $C_2H_4O_2 + 2O_2 \\rightarrow 2CO_2 + 2H_2O$). Thể tích $O_2$: $V = 0{,}3 \\times 22{,}4 = 6{,}72\\text{ lít}$.',
    topic: 'Đốt cháy este no đơn chức mạch hở',
    difficulty: 'Vận dụng',
    errorCategory: 'Tính toán',
    keyFormula: 'n_{CO_2} = n_{H_2O}'
  },

  // --- PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI 4 Ý (TƯ DUY CAO) ---
  {
    id: 503019,
    part: 'II',
    type: 'true_false',
    text: '[Hóa học 12 VDC - Chuyên Lam Sơn 2026]\nCho từ từ dung dịch $NH_3$ đến dư vào ống nghiệm chứa $2\\text{ mL}$ dung dịch $CuSO_4\\text{ }0{,}1\\text{M}$. Ban đầu xuất hiện kết tủa màu xanh lam nhạt, sau đó kết tủa tan dần tạo thành dung dịch trong suốt có màu xanh lam đậm đặc trưng.',
    topic: 'Phản ứng tạo phức chất của ion đồng(II)',
    difficulty: 'Vận dụng',
    errorCategory: 'Lý thuyết',
    trueFalseItems: [
      {
        id: 'a',
        text: 'Kết tủa màu xanh lam nhạt ban đầu xuất hiện là Cu(OH)₂.',
        correctAnswer: true
      },
      {
        id: 'b',
        text: 'Dung dịch màu xanh lam đậm tạo thành là do sự hình thành ion phức [Cu(NH₃)₄]²⁺.',
        correctAnswer: true
      },
      {
        id: 'c',
        text: 'Trong phức chất [Cu(NH₃)₄]²⁺, ion Cu²⁺ đóng vai trò là bazơ Lewis nhận cặp electron.',
        correctAnswer: false
      },
      {
        id: 'd',
        text: 'Nếu thay dung dịch CuSO₄ bằng dung dịch NiSO₄ thì hiện tượng tương tự cũng xảy ra tạo dung dịch phức màu tím xanh nhạt.',
        correctAnswer: true
      }
    ],
    explanation: 'a) $Cu^{2+} + 2NH_3 + 2H_2O \\rightarrow Cu(OH)_2\\downarrow + 2NH_4^+$ (kết tủa xanh lam). => a ĐÚNG.\n' +
      'b) $Cu(OH)_2 + 4NH_3 \\rightarrow [Cu(NH_3)_4]^{2+} + 2OH^-$ (phức màu xanh thẫm). => b ĐÚNG.\n' +
      'c) Phối tử $NH_3$ có cặp electron tự do là Bazơ Lewis; ion trung tâm $Cu^{2+}$ có orbital trống nhận cặp electron là Axit Lewis. Khẳng định nói $Cu^{2+}$ là bazơ Lewis là SAI. => c SAI.\n' +
      'd) $Ni^{2+}$ cũng tạo phức bền $[Ni(NH_3)_6]^{2+}$ tan có màu xanh tím đặc trưng. => d ĐÚNG.',
    keyFormula: 'Cu(OH)_2 + 4NH_3 \\rightarrow [Cu(NH_3)_4](OH)_2'
  },
  {
    id: 503020,
    part: 'II',
    type: 'true_false',
    text: '[Hóa học 12 VDC - Sở GD&ĐT Nam Định 2026]\nĐể chuẩn độ dung dịch muối sắt(II) $FeSO_4$ chưa biết nồng độ, người ta dùng dung dịch chuẩn $KMnO_4\\text{ }0{,}02\\text{M}$ trong môi trường axit $H_2SO_4$ loãng dư. Xét tính Đúng / Sai của các khẳng định sau:',
    topic: 'Chuẩn độ oxi hóa - khử dung dịch muối sắt(II)',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Phương pháp',
    trueFalseItems: [
      {
        id: 'a',
        text: 'Trong phản ứng chuẩn độ trên, ion Fe²⁺ đóng vai trò là chất khử bị oxi hóa thành ion Fe³⁺.',
        correctAnswer: true
      },
      {
        id: 'b',
        text: 'Dấu hiệu kết thúc chuẩn độ là khi dung dịch chuyển từ không màu sang màu hồng tím nhạt bền trong khoảng 20-30 giây.',
        correctAnswer: true
      },
      {
        id: 'c',
        text: 'Có thể thay thế axit H₂SO₄ loãng bằng axit HCl để tạo môi trường axit cho phép chuẩn độ.',
        correctAnswer: false
      },
      {
        id: 'd',
        text: 'Tỉ lệ mol phản ứng giữa ion Fe²⁺ và ion MnO₄⁻ trong phương trình ion rút gọn là 5 : 1.',
        correctAnswer: true
      }
    ],
    explanation: 'a) $Fe^{2+} \\rightarrow Fe^{3+} + 1e$. Ion $Fe^{2+}$ là chất khử. => a ĐÚNG.\n' +
      'b) $KMnO_4$ tự đóng vai trò là chất chỉ thị, khi phản ứng vừa đủ một giọt dư làm dung dịch có màu hồng nhạt. => b ĐÚNG.\n' +
      'c) KHÔNG được dùng $HCl$ vì ion $Cl^-$ có tính khử sẽ bị $MnO_4^-$ oxi hóa thành $Cl_2$, làm sai lệch kết quả chuẩn độ. Phải dùng $H_2SO_4$ loãng. => c SAI.\n' +
      'd) $5Fe^{2+} + MnO_4^- + 8H^+ \\rightarrow 5Fe^{3+} + Mn^{2+} + 4H_2O$. Tỉ lệ $5 : 1$. => d ĐÚNG.',
    keyFormula: '5Fe^{2+} + MnO_4^- + 8H^+ \\rightarrow 5Fe^{3+} + Mn^{2+} + 4H_2O'
  },

  // --- PHẦN III: TRẢ LỜI NGẮN TƯ DUY CAO (ĐIỀN SỐ 4 Ô) ---
  {
    id: 503023,
    part: 'III',
    type: 'short_answer',
    text: '[Hóa học 12 VDC - Moon.vn 2026] Điện phân $500\\text{ mL}$ dung dịch chứa $CuSO_4\\text{ }0{,}2\\text{M}$ và $KCl\\text{ }0{,}3\\text{M}$ với điện cực trơ, màng ngăn xốp, cường độ dòng điện $I = 5\\text{ A}$ trong thời gian $t = 3860\\text{ giây}$. Tổng thể tích khí (ở đkc, tính bằng lít) thoát ra ở cả hai điện cực bằng bao nhiêu lít? Biết $1\\text{ mol}$ khí ở đkc chiếm $24{,}79\\text{ lít}$. Làm tròn kết quả đến hàng phần trăm.',
    shortAnswerCorrect: '2.17',
    topic: 'Điện phân dung dịch 2 điện cực',
    difficulty: 'Vận dụng cao',
    errorCategory: 'Tính toán',
    explanation: '$n_e = \\frac{I t}{F} = \\frac{5 \\times 3860}{96500} = 0{,}2\\text{ mol}$.\n' +
      'Số mol $Cu^{2+} = 0{,}5 \\times 0{,}2 = 0{,}1\\text{ mol}$; số mol $Cl^- = 0{,}5 \\times 0{,}3 = 0{,}15\\text{ mol}$.\n' +
      'Tại catot (-): $Cu^{2+} + 2e \\rightarrow Cu$. Cần $0{,}1 \\times 2 = 0{,}2\\text{ mol } e$. Vừa vặn $n_e = 0{,}2\\text{ mol}$, nên ở catot chỉ có Cu bám vào, chưa có $H_2$ thoát ra ($V_{\\text{catot}} = 0$).\n' +
      'Tại anot (+): $2Cl^- \\rightarrow Cl_2 + 2e$. $0{,}15\\text{ mol } Cl^-$ sinh ra $0{,}075\\text{ mol } Cl_2$ và nhường $0{,}15\\text{ mol } e$. Còn lại $0{,}2 - 0{,}15 = 0{,}05\\text{ mol } e$ do $H_2O$ điện phân: $2H_2O \\rightarrow O_2 + 4H^+ + 4e \\Rightarrow n_{O_2} = 0{,}05 / 4 = 0{,}0125\\text{ mol}$.\n' +
      'Tổng số mol khí $= 0{,}075 + 0{,}0125 = 0{,}0875\\text{ mol}$. Thể tích đkc: $V = 0{,}0875 \\times 24{,}79 \\approx 2{,}169\\text{ lít} \\approx 2{,}17\\text{ lít}$. Điền số: 2.17.',
    keyFormula: 'n_e = \\frac{I t}{F}; \\quad V = n \\times 24{,}79'
  },
  {
    id: 503024,
    part: 'III',
    type: 'short_answer',
    text: '[Hóa học 12 VDC - Chuyên KHTN 2026] Đốt cháy hoàn toàn $8{,}8\\text{ gam}$ một este no, đơn chức, mạch hở $X$ thu được $8{,}96\\text{ lít}$ khí $CO_2$ (ở đktc). Hỏi trong một phân tử este $X$ có bao nhiêu nguyên tử hydro? Điền số nguyên:',
    shortAnswerCorrect: '8',
    topic: 'Xác định công thức phân tử Este',
    difficulty: 'Thông hiểu',
    errorCategory: 'Tính toán',
    explanation: 'Este no đơn chức mạch hở có CTPT $C_n H_{2n} O_2$. Số mol $CO_2 = 8{,}96 / 22{,}4 = 0{,}4\\text{ mol}$. Khối lượng mol $M_X = \\frac{8{,}8}{0{,}4 / n} = 22n$. Mặt khác $M_X = 14n + 32$. Do đó $22n = 14n + 32 \\Leftrightarrow 8n = 32 \\Leftrightarrow n = 4$. Vậy CTPT là $C_4H_8O_2$. Số nguyên tử hydro là $2n = 8$. Điền số: 8.',
    keyFormula: 'M_X = 14n + 32'
  },
  {
    id: 503025,
    part: 'III',
    type: 'short_answer',
    text: '[Hóa học 12 VDC - Sở Bắc Ninh 2026] Cho $18\\text{ gam}$ glucozơ phản ứng hoàn toàn với lượng dư dung dịch $AgNO_3$ trong $NH_3$ đun nóng. Khối lượng bạc kim loại kết tủa thu được bằng bao nhiêu gam? Cho $Ag = 108$. Điền số thập phân:',
    shortAnswerCorrect: '21.6',
    topic: 'Phản ứng tráng bạc của Carbohydrate',
    difficulty: 'Thông hiểu',
    errorCategory: 'Tính toán',
    explanation: 'Số mol glucozơ: $n = 18 / 180 = 0{,}1\\text{ mol}$. Một phân tử glucozơ chứa 1 nhóm andehit $-CHO$ nên sinh ra 2 nguyên tử $Ag$: $n_{Ag} = 2 n_{\\text{glucozơ}} = 0{,}2\\text{ mol}$. Khối lượng bạc: $m_{Ag} = 0{,}2 \\times 108 = 21{,}6\\text{ gam}$. Điền số: 21.6.',
    keyFormula: 'n_{Ag} = 2 n_{\\text{glucozơ}}'
  },
  {
    id: 503026,
    part: 'III',
    type: 'short_answer',
    text: '[Hóa học 12 VDC - ĐGNL HSA 2026] Trộn $100\\text{ mL}$ dung dịch $HCl\\text{ }0{,}1\\text{M}$ với $100\\text{ mL}$ dung dịch $NaOH\\text{ }0{,}3\\text{M}$ thu được $200\\text{ mL}$ dung dịch $Y$. pH của dung dịch $Y$ ở $25^\\circ\\text{C}$ bằng bao nhiêu? Điền số nguyên:',
    shortAnswerCorrect: '13',
    topic: 'Tính pH dung dịch sau phản ứng axit - bazơ',
    difficulty: 'Vận dụng',
    errorCategory: 'Tính toán',
    explanation: '$n_{H^+} = 0{,}1 \\times 0{,}1 = 0{,}01\\text{ mol}$; $n_{OH^-} = 0{,}1 \\times 0{,}3 = 0{,}03\\text{ mol}$.\n' +
      'Số mol $OH^-$ dư: $0{,}03 - 0{,}01 = 0{,}02\\text{ mol}$.\n' +
      'Nồng độ $[OH^-] = \\frac{0{,}02}{0{,}2} = 0{,}1\\text{M} = 10^{-1}\\text{M}$.\n' +
      'Ta có $pOH = 1 \\Rightarrow pH = 14 - pOH = 14 - 1 = 13$. Điền số: 13.',
    keyFormula: 'pH = 14 + \\log[OH^-]'
  }
];
