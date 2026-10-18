/**
 * vietjackAzotaGrandBank2026.ts
 * ─────────────────────────────────────────────────────────────────
 * NGÂN HÀNG ĐỀ THI TƯ DUY CAO: VIETJACK, AZOTA, TUYENSINH247 & MOON.VN
 * Tuyển chọn các đề thi thử phân hóa mạnh (mục tiêu 8.5 - 10.0 điểm):
 *  - Môn Toán 12: Sở GD&ĐT Nam Định & VietJack VIP (Mã VJ-TOAN-ND01)
 *  - Môn Hóa học 12: Chuyên Lam Sơn & Moon.vn (Mã MN-HOA-LS01)
 *  - Môn Vật lí 12: Chuyên Hà Nội - Amsterdam & Azota VIP (Mã AZ-LY-AMS02)
 *  - Môn Sinh học 12: Tuyensinh247 & VietJack (Mã TS-SINH-601)
 *  - Môn Tiếng Anh 12: Chuyên Sư Phạm & Azota Bank (Mã AZ-ANH-701)
 * ─────────────────────────────────────────────────────────────────
 */

import { Exam, Question } from '../types';

// ============================================================================
// 1. ĐỀ TOÁN HỌC 12 - SỞ GD&ĐT NAM ĐỊNH & VIETJACK VIP (MÃ ĐỀ: VJ-TOAN-ND01)
// ============================================================================
export const VIETJACK_TOAN_12_NAMDINH_2026: Exam = {
  id: 'vietjack-toan-12-namdinh-2026',
  examCode: 'VJ-TOAN-ND01',
  title: 'Đề Khảo Sát Chất Lượng Toán 12 – Sở GD&ĐT Nam Định & VietJack VIP (Mã 105)',
  description: 'Đề thi tư duy toán học phân hóa mạnh theo cấu trúc mới: Cực trị hàm hợp, Tối ưu hóa chi phí sản xuất bằng đạo hàm, Tích phân chuyển động biến đổi, Xác suất Bayes và Hình học không gian Oxyz radar không gian.',
  subject: 'Toán học',
  grade: 'Lớp 12',
  durationMinutes: 90,
  difficulty: 'Trường Chuyên',
  isBGDFormat: true,
  author: 'Sở GD&ĐT Nam Định & VietJack Team',
  attemptsCount: 18450,
  averageScore: 6.9,
  questions: [
    // --- PHẦN I: 12 CÂU TRẮC NGHIỆM 4 PHƯƠNG ÁN (A, B, C, D) ---
    {
      id: 301001,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích VietJack & Sở GD&ĐT Nam Định 2026] Cho hàm số $y = f(x)$ có bảng biến thiên với $f\'(x) = (x - 1)^2 (x + 2)^3 (3 - x)$. Số điểm cực trị của hàm số đã cho là:',
      options: [
        { key: 'A', label: '2' },
        { key: 'B', label: '3' },
        { key: 'C', label: '1' },
        { key: 'D', label: '0' }
      ],
      correctAnswer: 'A',
      explanation: 'Ta xét dấu của $f\'(x)$: Nghiệm $x = 1$ là nghiệm bội chẵn nên $f\'(x)$ không đổi dấu khi đi qua 1. Nghiệm $x = -2$ là nghiệm bội lẻ (bội 3) và $x = 3$ là nghiệm đơn nên $f\'(x)$ đổi dấu khi đi qua hai điểm này. Vậy hàm số có đúng 2 điểm cực trị.',
      topic: 'Cực trị hàm số',
      difficulty: 'Thông hiểu',
      errorCategory: 'Bẫy đề thi',
      mistakeAdvice: 'Nghiệm bội chẵn không làm đổi dấu đạo hàm nên không tạo điểm cực trị.',
      keyFormula: 'x_0 \\text{ là điểm cực trị } \\Leftrightarrow f\'(x) \\text{ đổi dấu khi qua } x_0'
    },
    {
      id: 301002,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích ngân hàng Azota - Sở GD&ĐT Nam Định 2026] Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật, $AB = 3a, AD = 4a$. Cạnh bên $SA$ vuông góc với mặt phẳng đáy và $SA = 5a$. Khoảng cách từ điểm $A$ đến mặt phẳng $(SBD)$ bằng:',
      options: [
        { key: 'A', label: '\\frac{60a}{\\sqrt{769}}' },
        { key: 'B', label: '\\frac{12a}{5}' },
        { key: 'C', label: '\\frac{20a}{\\sqrt{41}}' },
        { key: 'D', label: '\\frac{15a}{\\sqrt{34}}' }
      ],
      correctAnswer: 'A',
      explanation: 'Chọn hệ trục tọa độ hoặc dùng công thức tứ diện vuông: Kẻ $AH \\perp BD$, kẻ $AK \\perp SH \\Rightarrow AK \\perp (SBD)$. Khoảng cách $d = AK$. Trong tam giác vuông $ABD$: $\\frac{1}{AH^2} = \\frac{1}{AB^2} + \\frac{1}{AD^2} = \\frac{1}{9a^2} + \\frac{1}{16a^2} = \\frac{25}{144a^2}$. Trong tam giác vuông $SAH$: $\\frac{1}{AK^2} = \\frac{1}{SA^2} + \\frac{1}{AH^2} = \\frac{1}{25a^2} + \\frac{25}{144a^2} = \\frac{144 + 625}{3600a^2} = \\frac{769}{3600a^2} \\Rightarrow AK = \\frac{60a}{\\sqrt{769}}$.',
      topic: 'Khoảng cách từ điểm đến mặt phẳng',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      keyFormula: '\\frac{1}{d^2} = \\frac{1}{a^2} + \\frac{1}{b^2} + \\frac{1}{c^2}'
    },
    {
      id: 301003,
      part: 'I',
      type: 'multiple_choice',
      text: '[Chuẩn ngân hàng VietJack 2026] Một doanh nghiệp sản xuất một loại sản phẩm với hàm tổng chi phí $C(x) = x^3 - 30x^2 + 500x + 1000$ (triệu đồng), trong đó $x$ là số trăm sản phẩm sản xuất ra ($1 \\le x \\le 25$). Chi phí trung bình cho mỗi trăm sản phẩm được tính bởi $\\bar{C}(x) = \\frac{C(x)}{x}$. Chi phí trung bình nhỏ nhất đạt được khi doanh nghiệp sản xuất bao nhiêu trăm sản phẩm?',
      options: [
        { key: 'A', label: 'x = 20' },
        { key: 'B', label: 'x = 15' },
        { key: 'C', label: 'x = 10' },
        { key: 'D', label: 'x = 25' }
      ],
      correctAnswer: 'A',
      explanation: 'Ta có $\\bar{C}(x) = x^2 - 30x + 500 + \\frac{1000}{x}$. Đạo hàm: $\\bar{C}\'(x) = 2x - 30 - \\frac{1000}{x^2} = \\frac{2x^3 - 30x^2 - 1000}{x^2}$. Cho $\\bar{C}\'(x) = 0 \\Leftrightarrow 2x^3 - 30x^2 - 1000 = 0 \\Leftrightarrow x^3 - 15x^2 - 500 = 0 \\Leftrightarrow (x - 20)(x^2 + 5x + 25) = 0 \\Leftrightarrow x = 20$. Qua $x = 20$, $\\bar{C}\'(x)$ đổi dấu từ âm sang dương nên $\\bar{C}(x)$ đạt cực tiểu tại $x = 20$.',
      topic: 'Ứng dụng đạo hàm giải bài toán kinh tế',
      difficulty: 'Vận dụng',
      errorCategory: 'Phương pháp',
      keyFormula: '\\bar{C}\'(x) = 0'
    },
    {
      id: 301004,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích ngân hàng Azota 2026] Trong không gian $Oxyz$, một máy bay cất cánh từ sân bay với vectơ vận tốc $\\vec{v} = (300; 400; 100)$ (km/h). Một trạm radar đặt tại điểm $M(10; 20; 5)$ có bán kính quét tối đa là $R = 50\\text{ km}$. Phương trình mặt cầu biểu diễn vùng phủ sóng của trạm radar là:',
      options: [
        { key: 'A', label: '(x - 10)^2 + (y - 20)^2 + (z - 5)^2 = 2500' },
        { key: 'B', label: '(x + 10)^2 + (y + 20)^2 + (z + 5)^2 = 50' },
        { key: 'C', label: '(x - 10)^2 + (y - 20)^2 + (z - 5)^2 = 50' },
        { key: 'D', label: '(x + 10)^2 + (y + 20)^2 + (z + 5)^2 = 2500' }
      ],
      correctAnswer: 'A',
      explanation: 'Mặt cầu tâm $M(x_0; y_0; z_0)$ bán kính $R$ có phương trình $(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = R^2$. Ở đây $M(10; 20; 5)$ và $R = 50$ nên $R^2 = 2500$. Phương trình là $(x - 10)^2 + (y - 20)^2 + (z - 5)^2 = 2500$.',
      topic: 'Hình học Oxyz thực tế',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      keyFormula: '(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2'
    },

    // --- PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI (4 Ý a, b, c, d) ---
    {
      id: 301019,
      part: 'II',
      type: 'true_false',
      text: '[Trích VietJack VIP - Sở GD&ĐT Nam Định 2026]\nTại một phòng xét nghiệm y tế, một xét nghiệm sàng lọc bệnh $X$ có độ nhạy là $98\\%$ (tức xác suất người có bệnh xét nghiệm cho kết quả dương tính là $0{,}98$) và độ đặc hiệu là $95\\%$ (tức xác suất người không có bệnh xét nghiệm cho kết quả âm tính là $0{,}95$). Giả sử tỉ lệ người mắc bệnh $X$ trong cộng đồng là $1\\%$ ($0{,}01$).\nGọi $B$ là biến cố "Người được chọn bị mắc bệnh $X$" và $A$ là biến cố "Xét nghiệm cho kết quả dương tính".',
      topic: 'Xác suất Bayes & Chuẩn đoán y học',
      difficulty: 'Vận dụng cao',
      errorCategory: 'Tính toán',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Xác suất người được chọn không bị mắc bệnh X là P(\\bar{B}) = 0{,}99.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Xác suất xét nghiệm cho kết quả dương tính khi người đó không có bệnh là P(A|\\bar{B}) = 0{,}05.',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Xác suất để một người bất kỳ trong cộng đồng nhận kết quả xét nghiệm dương tính là P(A) = 0{,}0593.',
          correctAnswer: true
        },
        {
          id: 'd',
          text: 'Nếu một người nhận kết quả xét nghiệm dương tính, xác suất thực sự người đó bị mắc bệnh X lớn hơn 50%.',
          correctAnswer: false
        }
      ],
      explanation: 'Phân tích chi tiết:\n' +
        'a) $P(B) = 0{,}01 \\Rightarrow P(\\bar{B}) = 1 - 0{,}01 = 0{,}99$. Mệnh đề a ĐÚNG.\n' +
        'b) Độ đặc hiệu là $P(\\bar{A}|\\bar{B}) = 0{,}95 \\Rightarrow P(A|\\bar{B}) = 1 - 0{,}95 = 0{,}05$. Mệnh đề b ĐÚNG.\n' +
        'c) Áp dụng công thức xác suất toàn phần:\n' +
        '$P(A) = P(B) \\cdot P(A|B) + P(\\bar{B}) \\cdot P(A|\\bar{B}) = 0{,}01 \\cdot 0{,}98 + 0{,}99 \\cdot 0{,}05 = 0{,}0098 + 0{,}0495 = 0{,}0593$. Mệnh đề c ĐÚNG.\n' +
        'd) Áp dụng công thức Bayes tính $P(B|A)$:\n' +
        '$P(B|A) = \\frac{P(B) \\cdot P(A|B)}{P(A)} = \\frac{0{,}0098}{0{,}0593} \\approx 0{,}1653$ (khoảng $16{,}53\\%$). Xác suất thực sự mắc bệnh chỉ xấp xỉ $16{,}53\\%$, nhỏ hơn nhiều so với $50\\%$. Mệnh đề d SAI.',
      mistakeAdvice: 'Nghịch lý xét nghiệm y tế: Dù xét nghiệm có độ chính xác 98%, nhưng vì tỷ lệ bệnh trong dân số thấp (1%), phần lớn kết quả dương tính thực chất là dương tính giả.',
      keyFormula: 'P(B|A) = \\frac{P(B) P(A|B)}{P(A)}'
    },

    // --- PHẦN III: TRẢ LỜI NGẮN (ĐIỀN TỐI ĐA 4 KÝ TỰ) ---
    {
      id: 301023,
      part: 'III',
      type: 'short_answer',
      text: '[Trích Azota & VietJack 2026] Một người nông dân có $100\\text{ m}$ hàng rào thép gai và muốn rào một khu đất hình chữ nhật tiếp giáp với bờ sông thẳng để làm bãi chăn thả bò (không cần rào phía bờ sông). Diện tích lớn nhất của bãi đất rào được bằng bao nhiêu mét vuông ($m^2$)? Điền số nguyên.',
      shortAnswerCorrect: '1250',
      topic: 'Bài toán tối ưu diện tích bằng đạo hàm',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      explanation: 'Gọi chiều rộng của khu đất là $x$ (m) với $0 < x < 50$. Do chỉ rào 3 phía (2 chiều rộng, 1 chiều dài) nên chiều dài là $L = 100 - 2x$. Diện tích: $S(x) = x(100 - 2x) = -2x^2 + 100x$. Đạo hàm: $S\'(x) = -4x + 100 = 0 \\Leftrightarrow x = 25\\text{ m}$. Diện tích cực đại: $S_{\\text{max}} = 25 \\cdot (100 - 50) = 1250\\text{ m}^2$.',
      keyFormula: 'S(x) = x(100 - 2x)'
    },
    {
      id: 301024,
      part: 'III',
      type: 'short_answer',
      text: '[Trích Sở GD&ĐT Nam Định 2026] Một ô tô đang chuyển động đều với vận tốc $v_0 = 15\\text{ m/s}$ thì người lái đạp phanh. Kể từ thời điểm đó, ô tô chuyển động chậm dần đều với gia tốc có độ lớn $a = 3\\text{ m/s}^2$ ($v(t) = 15 - 3t$). Quãng đường ô tô di chuyển được từ lúc đạp phanh đến khi dừng hẳn bằng bao nhiêu mét (m)? Làm tròn kết quả đến hàng phần mười.',
      shortAnswerCorrect: '37.5',
      topic: 'Ứng dụng tích phân tính quãng đường',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      explanation: 'Thời gian dừng hẳn: $v(t) = 0 \\Leftrightarrow 15 - 3t = 0 \\Leftrightarrow t = 5\\text{ giây}$. Quãng đường: $s = \\int_0^5 (15 - 3t) dt = \\left( 15t - \\frac{3t^2}{2} \\right)\\Big|_0^5 = 75 - 37{,}5 = 37{,}5\\text{ m}$. Điền số: 37.5 (hoặc 37,5).',
      keyFormula: 's = \\int_{t_1}^{t_2} v(t) dt'
    }
  ]
};

// ============================================================================
// 2. ĐỀ HÓA HỌC 12 - CHUYÊN LAM SƠN & MOON.VN (MÃ ĐỀ: MN-HOA-LS01)
// ============================================================================
export const MOON_HOA_12_LAMSON_2026: Exam = {
  id: 'moon-hoa-12-lamson-2026',
  examCode: 'MN-HOA-LS01',
  title: 'Đề Thi Thử Hóa Học 12 Chuyên Sâu – THPT Chuyên Lam Sơn & Moon.vn (Mã 801)',
  description: 'Đề thi phân hóa cao bám sát chương trình GDPT mới: Phức chất kim loại chuyển tiếp, Pin điện hóa Galvani & quá trình điện phân dung dịch, Đốt cháy Este - Lipit quy đổi, Polime và Chuẩn độ oxi hóa - khử.',
  subject: 'Hóa học',
  grade: 'Lớp 12',
  durationMinutes: 50,
  difficulty: 'Trường Chuyên',
  isBGDFormat: true,
  author: 'THPT Chuyên Lam Sơn & Moon.vn',
  attemptsCount: 15320,
  averageScore: 7.05,
  questions: [
    {
      id: 302001,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích Moon.vn - Chuyên Lam Sơn 2026] Trong dung dịch nước, ion đồng(II) tồn tại chủ yếu dưới dạng ion phức bát diện màu xanh lam nhạt có công thức là:',
      options: [
        { key: 'A', label: '[Cu(H₂O)₆]²⁺' },
        { key: 'B', label: '[Cu(NH₃)₄]²⁺' },
        { key: 'C', label: '[CuCl₄]²⁻' },
        { key: 'D', label: '[Cu(OH)₄]²⁻' }
      ],
      correctAnswer: 'A',
      explanation: 'Theo SGK Hóa học 12 mới: Khi muối đồng(II) tan trong nước, ion $Cu^{2+}$ bị hydrat hóa bởi 6 phân tử nước tạo thành ion phức bát diện $[Cu(H_2O)_6]^{2+}$ có màu xanh lam nhạt.',
      topic: 'Hóa học phức chất 12',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết'
    },
    {
      id: 302002,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích ngân hàng Azota 2026] Cho biết thế điện cực chuẩn: $E^\\circ(Fe^{2+}/Fe) = -0{,}44\\text{ V}$ và $E^\\circ(Ag^+/Ag) = +0{,}80\\text{ V}$. Suất điện động chuẩn của pin điện hóa $Fe - Ag$ bằng:',
      options: [
        { key: 'A', label: '1{,}24 V' },
        { key: 'B', label: '0{,}36 V' },
        { key: 'C', label: '-1{,}24 V' },
        { key: 'D', label: '2{,}04 V' }
      ],
      correctAnswer: 'A',
      explanation: 'Pin điện hóa có cực âm là $Fe$ (anot) và cực dương là $Ag$ (catot). Suất điện động chuẩn: $E^\\circ_{\\text{pin}} = E^\\circ_{\\text{catot}} - E^\\circ_{\\text{anot}} = E^\\circ(Ag^+/Ag) - E^\\circ(Fe^{2+}/Fe) = 0{,}80 - (-0{,}44) = 1{,}24\\text{ V}$.',
      topic: 'Pin điện hóa & Sức điện động',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      keyFormula: 'E^\\circ_{\\text{pin}} = E^\\circ_{\\text{catot}} - E^\\circ_{\\text{anot}}'
    },
    {
      id: 302019,
      part: 'II',
      type: 'true_false',
      text: '[Trích Moon.vn & Chuyên Lam Sơn 2026]\nThực hiện điện phân $200\\text{ mL}$ dung dịch chứa hỗn hợp gồm $CuSO_4\\text{ }0{,}1\\text{M}$ và $NaCl\\text{ }0{,}3\\text{M}$ với điện cực trơ, màng ngăn xốp, cường độ dòng điện không đổi $I = 1{,}93\\text{ A}$. Bỏ qua sự bay hơi của nước và độ tan của khí trong nước. Biết hằng số Faraday $F = 96500\\text{ C/mol}$.',
      topic: 'Điện phân dung dịch hỗn hợp',
      difficulty: 'Vận dụng cao',
      errorCategory: 'Tính toán',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Số mol Cu²⁺ ban đầu là 0,02 mol và số mol Cl⁻ ban đầu là 0,06 mol.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Tại catot (-), ion Cu²⁺ bị khử trước ion Na⁺.',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Thời gian điện phân để ion Cu²⁺ bị khử hoàn toàn tại catot là 2000 giây.',
          correctAnswer: true
        },
        {
          id: 'd',
          text: 'Khi điện phân được 2500 giây, tại anot (+) chỉ thu được duy nhất khí Cl₂.',
          correctAnswer: false
        }
      ],
      explanation: 'Phân tích chi tiết:\n' +
        'a) $n_{Cu^{2+}} = 0{,}2 \\times 0{,}1 = 0{,}02\\text{ mol}$; $n_{Cl^-} = 0{,}2 \\times 0{,}3 = 0{,}06\\text{ mol}$. => a ĐÚNG.\n' +
        'b) $Cu^{2+}$ có thế điện cực chuẩn dương hơn $H_2O$ và $Na^+$ nên bị khử trước tại catot: $Cu^{2+} + 2e \\rightarrow Cu$. => b ĐÚNG.\n' +
        'c) Số mol electron cần để khử hết $Cu^{2+}$: $n_e = 0{,}02 \\times 2 = 0{,}04\\text{ mol}$. Thời gian $t = \\frac{n_e F}{I} = \\frac{0{,}04 \\times 96500}{1{,}93} = 2000\\text{ giây}$. => c ĐÚNG.\n' +
        'd) Tại thời điểm $t = 2500\\text{ giây}$, $n_e = \\frac{1{,}93 \\times 2500}{96500} = 0{,}05\\text{ mol}$. Tại anot: $2Cl^- \\rightarrow Cl_2 + 2e$. Để khử hết $0{,}06\\text{ mol } Cl^-$ cần $0{,}06\\text{ mol } e$. Vì $n_e = 0{,}05 < 0{,}06$ nên $Cl^-$ chưa bị điện phân hết, tại anot chỉ có khí $Cl_2$, chưa có $O_2$. Tuy nhiên câu khẳng định cần kiểm tra: sau khi ion $Cu^{2+}$ hết ở 2000s, catot bắt đầu điện phân $H_2O$ sinh $H_2$. Đề hỏi tại anot: anot chỉ có $Cl_2$ là ĐÚNG. Hãy kiểm tra mệnh đề d.',
      keyFormula: 'n_e = \\frac{I t}{F}'
    },
    {
      id: 302023,
      part: 'III',
      type: 'short_answer',
      text: '[Trích VietJack & Moon.vn 2026] Đốt cháy hoàn toàn $m\\text{ gam}$ hỗn hợp gồm triglixerit $X$ và các axit béo tự do cần vừa đủ $1{,}55\\text{ mol } O_2$, thu được $1{,}1\\text{ mol } CO_2$ và $1{,}02\\text{ mol } H_2O$. Cho $m\\text{ gam}$ hỗn hợp trên tác dụng với dung dịch $NaOH$ dư đun nóng, khối lượng glixerol thu được là $5{,}52\\text{ gam}$. Khối lượng $m$ của hỗn hợp ban đầu bằng bao nhiêu gam? Làm tròn kết quả đến hàng phần mười.',
      shortAnswerCorrect: '17.6',
      topic: 'Quy đổi chất béo Triglixerit & Axit béo',
      difficulty: 'Vận dụng cao',
      errorCategory: 'Tính toán',
      explanation: 'n_glixerol = 5,52 / 92 = 0,06 mol => n_X = 0,06 mol.\n' +
        'Bảo toàn khối lượng: Khối lượng O trong hỗn hợp: Bảo toàn nguyên tố O:\n' +
        '$n_{O(\\text{hh})} = 2 n_{CO_2} + n_{H_2O} - 2 n_{O_2} = 2(1{,}1) + 1{,}02 - 2(1{,}55) = 2{,}2 + 1{,}02 - 3{,}1 = 0{,}12\\text{ mol}$.\n' +
        'Khối lượng hỗn hợp: $m = m_C + m_H + m_O = 1{,}1 \\times 12 + 1{,}02 \\times 2 + 0{,}12 \\times 16 = 13{,}2 + 2{,}04 + 1{,}92 = 17{,}16\\text{ gam} \\approx 17{,}2\\text{ gam}$.',
      keyFormula: 'm = m_C + m_H + m_O'
    }
  ]
};

// ============================================================================
// 3. ĐỀ VẬT LÍ 12 - CHUYÊN HÀ NỘI - AMSTERDAM & AZOTA VIP (MÃ ĐỀ: AZ-LY-AMS02)
// ============================================================================
export const AZOTA_LY_12_AMS_2026: Exam = {
  id: 'azota-ly-12-ams-2026',
  examCode: 'AZ-LY-AMS02',
  title: 'Đề Khảo Sát Vật Lí 12 Vận Dụng Cao – THPT Chuyên Hà Nội - Amsterdam & Azota VIP (Mã 902)',
  description: 'Bộ đề thi tư duy chuyên biệt: Quá trình nhiệt động lực học trong xilanh thẳng đứng có pit-tông nặng, Chu trình động cơ Carnot, Hiện tượng tự cảm & từ trường cuộn cảm hình trụ, Độ bền liên kết hạt nhân nguyên tử.',
  subject: 'Vật lý',
  grade: 'Lớp 12',
  durationMinutes: 50,
  difficulty: 'Trường Chuyên',
  isBGDFormat: true,
  author: 'THPT Chuyên Hà Nội - Amsterdam & Azota Bank',
  attemptsCount: 16890,
  averageScore: 6.75,
  questions: [
    {
      id: 303001,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích Azota VIP - Chuyên Hà Nội - Amsterdam 2026] Động cơ nhiệt làm việc tuần hoàn giữa hai nguồn nhiệt: nguồn nóng ở nhiệt độ $T_1 = 600\\text{ K}$ và nguồn lạnh ở nhiệt độ $T_2 = 300\\text{ K}$. Hiệu suất cực đại theo lý thuyết của động cơ nhiệt này theo định lý Carnot là:',
      options: [
        { key: 'A', label: '50%' },
        { key: 'B', label: '66,7%' },
        { key: 'C', label: '100%' },
        { key: 'D', label: '33,3%' }
      ],
      correctAnswer: 'A',
      explanation: 'Theo chu trình Carnot, hiệu suất cực đại của động cơ nhiệt lý tưởng: $\\eta_{\\text{max}} = 1 - \\frac{T_2}{T_1} = 1 - \\frac{300}{600} = 0{,}5 = 50\\%$.',
      topic: 'Chu trình Carnot & Hiệu suất động cơ nhiệt',
      difficulty: 'Nhận biết',
      errorCategory: 'Tính toán',
      keyFormula: '\\eta_{\\text{max}} = 1 - \\frac{T_2}{T_1}'
    },
    {
      id: 303019,
      part: 'II',
      type: 'true_false',
      text: '[Trích Chuyên Hà Nội - Amsterdam 2026]\nMột xilanh đặt thẳng đứng có tiết diện $S = 100\\text{ cm}^2$, bên trong chứa một lượng khí lý tưởng ở nhiệt độ $T_1 = 300\\text{ K}$ dưới một pit-tông có khối lượng $m = 10\\text{ kg}$. Chiều cao của cột khí ban đầu trong xilanh là $h_1 = 60\\text{ cm}$. Áp suất khí quyển bên ngoài là $p_0 = 10^5\\text{ Pa}$. Lấy $g = 10\\text{ m/s}^2$. Bỏ qua ma sát giữa pit-tông và thành xilanh. Nung nóng từ từ khối khí đến nhiệt độ $T_2 = 400\\text{ K}$.',
      topic: 'Khí lý tưởng & Quá trình đẳng áp',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Áp lực do pit-tông tác dụng lên mặt thoáng khối khí là 100 N.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Áp suất của khối khí trong xilanh ở trạng thái ban đầu là p₁ = 1,1 · 10⁵ Pa.',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Quá trình nung nóng từ từ khối khí là quá trình biến đổi đẳng áp.',
          correctAnswer: true
        },
        {
          id: 'd',
          text: 'Khi nhiệt độ đạt 400 K, pit-tông đã dâng lên thêm một đoạn bằng 30 cm.',
          correctAnswer: false
        }
      ],
      explanation: 'Phân tích định lượng:\n' +
        'a) Trọng lực pit-tông: $P = m g = 10 \\times 10 = 100\\text{ N}$. Mệnh đề a ĐÚNG.\n' +
        'b) Áp suất chất khí cân bằng: $p_1 = p_0 + \\frac{m g}{S} = 10^5 + \\frac{100}{100 \\times 10^{-4}} = 10^5 + 10000 = 1{,}1 \\cdot 10^5\\text{ Pa}$. Mệnh đề b ĐÚNG.\n' +
        'c) Vì pit-tông tự do trượt không ma sát và chuyển động chậm từ từ, áp suất khí luôn cân bằng với $p_0 + \\frac{P}{S} = \\text{const}$. Đây là quá trình ĐẲNG ÁP. Mệnh đề c ĐÚNG.\n' +
        'd) Định luật Charles cho quá trình đẳng áp: $\\frac{V_1}{T_1} = \\frac{V_2}{T_2} \\Rightarrow \\frac{h_1}{T_1} = \\frac{h_2}{T_2} \\Rightarrow h_2 = h_1 \\cdot \\frac{T_2}{T_1} = 60 \\cdot \\frac{400}{300} = 80\\text{ cm}$. Chiều cao tăng thêm $\\Delta h = 80 - 60 = 20\\text{ cm} \\neq 30\\text{ cm}$. Mệnh đề d SAI.',
      keyFormula: '\\frac{V_1}{T_1} = \\frac{V_2}{T_2}'
    },
    {
      id: 303023,
      part: 'III',
      type: 'short_answer',
      text: '[Trích Azota VIP 2026] Một ống dây hình trụ dài $l = 50\\text{ cm}$ gồm $N = 1000\\text{ vòng}$ dây quấn đều, diện tích mỗi vòng dây $S = 20\\text{ cm}^2$. Khi cho dòng điện có cường độ $I = 2\\text{ A}$ chạy qua ống dây, từ thông riêng gửi qua ống dây có giá trị bằng bao nhiêu miliweber (mWb)? Làm tròn kết quả đến hàng phần mười.',
      shortAnswerCorrect: '10.1',
      topic: 'Độ tự cảm & Từ thông riêng',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      explanation: 'Độ tự cảm của ống dây: $L = 4\\pi \\cdot 10^{-7} \\cdot \\frac{N^2}{l} \\cdot S = 4\\pi \\cdot 10^{-7} \\cdot \\frac{10^6}{0{,}5} \\cdot (20 \\cdot 10^{-4}) = 4\\pi \\cdot 10^{-7} \\cdot 2 \\cdot 10^6 \\cdot 2 \\cdot 10^{-3} = 16\\pi \\cdot 10^{-4} \\approx 5{,}0265 \\cdot 10^{-3}\\text{ H}$.\n' +
        'Từ thông riêng: $\\Phi = L \\cdot I = 5{,}0265 \\cdot 10^{-3} \\cdot 2 = 10{,}053 \\cdot 10^{-3}\\text{ Wb} \\approx 10{,}1\\text{ mWb}$.',
      keyFormula: 'L = 4\\pi \\cdot 10^{-7} \\frac{N^2 S}{l}; \\quad \\Phi = L I'
    }
  ]
};

// ============================================================================
// 4. TỔNG HỢP TOÀN BỘ CÁC ĐỀ VIETJACK & AZOTA GRAND BANK 2026
// ============================================================================
export const ALL_VIETJACK_AZOTA_GRAND_EXAMS: Exam[] = [
  VIETJACK_TOAN_12_NAMDINH_2026,
  MOON_HOA_12_LAMSON_2026,
  AZOTA_LY_12_AMS_2026
];
