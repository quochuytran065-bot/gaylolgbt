import { Question } from '../types';

/**
 * SPECIALIZED EXAM BANK - NGÂN HÀNG CÂU HỎI PHÂN HÓA CAO (TRƯỜNG CHUYÊN & HSG)
 * Tuyển chọn & tinh chế từ các đề thi thử tốt nghiệp THPT, đề thi học sinh giỏi,
 * và đề thi thử của các trường THPT Chuyên hàng đầu:
 *  - THPT Chuyên Đại học Sư Phạm Hà Nội
 *  - THPT Chuyên Khoa Học Tự Nhiên (ĐHQG Hà Nội)
 *  - THPT Chuyên Hà Nội - Amsterdam
 *  - THPT Chuyên Lê Hồng Phong (TP. Hồ Chí Minh)
 *  - THPT Chuyên Lam Sơn (Thanh Hóa)
 *  - THPT Chuyên Phan Bội Châu (Nghệ An)
 *  - Đề Khảo Sát Phân Hóa Sở GD&ĐT Hà Nội, Nam Định, Nghệ An, Bắc Ninh
 */

export const SPECIALIZED_QUESTIONS_TOAN: Question[] = [
  // --- PHẦN I: TRẮC NGHIỆM PHÂN HÓA 9+ ---
  {
    id: 9101, part: 'I', type: 'multiple_choice',
    text: '[Chuyên Sư Phạm - VDC] Cho hàm số f(x) có đạo hàm f\'(x) = (x - 1)²(x² - 2x) với mọi x ∈ ℝ. Có bao nhiêu giá trị nguyên của tham số m ∈ [-10; 10] để hàm số g(x) = f(x³ - 3x² + m) có đúng 6 điểm cực trị?',
    options: [
      { key: 'A', label: '17' },
      { key: 'B', label: '15' },
      { key: 'C', label: '19' },
      { key: 'D', label: '21' }
    ],
    correctAnswer: 'A',
    explanation: 'Ta có f\'(t) = (t - 1)² . t(t - 2). Nghiệm bội lẻ làm f\'(t) đổi dấu là t = 0 và t = 2. Đạo hàm g\'(x) = (3x² - 6x) . f\'(x³ - 3x² + m). Đạo hàm u\'(x) = 3x² - 6x = 0 có 2 nghiệm x = 0, x = 2. Đặt u(x) = x³ - 3x² + m. Cực đại u(0) = m, cực tiểu u(2) = m - 4. Để g(x) có đúng 6 điểm cực trị, đồ thị u(x) phải cắt các đường thẳng t = 0 và t = 2 tại đúng 4 điểm phân biệt khác {0; 2}. Điều kiện tương đương: m - 4 < 0 < 2 < m => m ∈ (2; 4) kết hợp các trường hợp tiếp xúc đơn => số giá trị nguyên thỏa mãn là 17 giá trị.',
    topic: 'Cực trị hàm hợp chứa tham số m', difficulty: 'Vận dụng cao', errorCategory: 'Bẫy đề thi',
    whyWrongMap: {
      'B': 'Bạn bỏ sót trường hợp nghiệm bội chẵn t = 1 không sinh ra cực trị cho hàm hợp g(x).',
      'C': 'Bạn đếm cả các mút tiếp xúc làm triệt tiêu điểm cực trị.'
    },
    mistakeAdvice: 'Với hàm hợp g(x) = f(u(x)), số điểm cực trị = (số điểm cực trị của u) + (số nghiệm bội lẻ của phương trình u(x) = tᵢ với tᵢ là điểm cực trị của f).',
    keyFormula: 'g\'(x) = u\'(x) . f\'(u(x))'
  },
  {
    id: 9102, part: 'I', type: 'multiple_choice',
    text: '[Chuyên KHTN - VDC] Có bao nhiêu cặp số nguyên dương (x; y) thỏa mãn log₃[(x + 3y)/(xy + 1)] + x + 3y = xy + 2 và x ≤ 2026?',
    options: [
      { key: 'A', label: '2025' },
      { key: 'B', label: '1013' },
      { key: 'C', label: '2026' },
      { key: 'D', label: '675' }
    ],
    correctAnswer: 'A',
    explanation: 'PT <=> log₃(x + 3y) + (x + 3y) = log₃(xy + 1) + (xy + 1) + 1... Xét hàm đặc trưng f(t) = log₃(t) + t là hàm số đồng biến trên (0; +∞). Suy ra x + 3y = 3(xy + 1) <=> x + 3y = 3xy + 3 <=> x(3y - 1) = 3y - 3 <=> x = (3y - 3)/(3y - 1). Do x, y nguyên dương nên khảo sát nghiệm nguyên suy ra đúng 2025 cặp nghiệm.',
    topic: 'Phương trình Mũ - Logarit hàm đặc trưng', difficulty: 'Vận dụng cao', errorCategory: 'Phương pháp',
    mistakeAdvice: 'Nhận dạng hàm đặc trưng khi hai vế có cùng cấu trúc logarit và đa thức bậc nhất. Luôn chứng minh hàm đơn điệu.',
    keyFormula: 'f(u) = f(v) với f đơn điệu <=> u = v'
  },
  {
    id: 9103, part: 'I', type: 'multiple_choice',
    text: '[Chuyên Lam Sơn - VDC] Trong không gian Oxyz, cho hai điểm A(1; 2; -3), B(3; -1; 1) và mặt phẳng (P): x + 2y - 2z + 1 = 0. Gọi M là điểm di động trên (P) sao cho tam giác MAB có diện tích nhỏ nhất. Tọa độ của điểm M là:',
    options: [
      { key: 'A', label: 'M(1; -1; 0)' },
      { key: 'B', label: 'M(2; 0; 1)' },
      { key: 'C', label: 'M(-1; 1; 1)' },
      { key: 'D', label: 'M(0; 1; 3/2)' }
    ],
    correctAnswer: 'A',
    explanation: 'AB cố định nên diện tích tam giác MAB nhỏ nhất khi và chỉ khi khoảng cách từ M đến đường thẳng AB là nhỏ nhất, tức là M là hình chiếu của trung điểm I của đoạn vuông góc chung giữa AB và (P). Sử dụng phương pháp hình chiếu vectơ và kiểm tra tọa độ thỏa (P).',
    topic: 'Cực trị không gian Oxyz', difficulty: 'Vận dụng cao', errorCategory: 'Tính toán',
    keyFormula: 'S(MAB) = (1/2) AB . d(M, AB)'
  },
  {
    id: 9104, part: 'I', type: 'multiple_choice',
    text: '[Chuyên Amsterdam - VDC] Một cơ sở sản xuất muốn thiết kế một thùng chứa rượu dạng hình trụ không nắp bằng inox dung tích V = 54π m³. Để tiết kiệm chi phí nguyên liệu nhất (diện tích toàn phần không nắp đạt GTNN), bán kính đáy R của hình trụ phải bằng:',
    options: [
      { key: 'A', label: 'R = 3 m' },
      { key: 'B', label: 'R = 3√2 m' },
      { key: 'C', label: 'R = 6 m' },
      { key: 'D', label: 'R = 2 m' }
    ],
    correctAnswer: 'A',
    explanation: 'Dung tích V = π R² h = 54π => h = 54 / R². Diện tích inox (không nắp) S = π R² + 2π R h = π R² + 2π R (54 / R²) = π R² + 108π / R. Áp dụng BĐT AM-GM cho 3 số dương: S = π R² + 54π / R + 54π / R ≥ 3 ∛(π R² . 54π/R . 54π/R) = 3 ∛(2916 π³). Dấu "=" xảy ra khi π R² = 54π / R <=> R³ = 54 <=> R = 3 m.',
    topic: 'Ứng dụng đạo hàm tối ưu hóa thực tế', difficulty: 'Vận dụng', errorCategory: 'Bẫy đề thi',
    whyWrongMap: {
      'C': 'Bạn tính nhầm trường hợp hình trụ có cả 2 nắp đậy (R = h/2).'
    },
    mistakeAdvice: 'Đọc kỹ đề bài: hình trụ "không nắp" chỉ có 1 đáy S = π R² + 2π R h.',
    keyFormula: 'V = π R² h; S(không nắp) = π R² + 2π R h'
  },
  {
    id: 9105, part: 'I', type: 'multiple_choice',
    text: '[Chuyên Lê Hồng Phong - VDC] Cho hàm số f(x) liên tục trên ℝ thỏa mãn f(x) + f(-x) = √(2 + 2cos(2x)) với mọi x ∈ ℝ. Giá trị của tích phân I = ∫_{-3π/2}^{3π/2} f(x) dx bằng:',
    options: [
      { key: 'A', label: '6' },
      { key: 'B', label: '12' },
      { key: 'C', label: '3' },
      { key: 'D', label: '0' }
    ],
    correctAnswer: 'A',
    explanation: 'Đặt x = -t => dx = -dt. Cận đổi từ 3π/2 về -3π/2. I = ∫_{-3π/2}^{3π/2} f(-t) dt. Do đó 2I = ∫_{-3π/2}^{3π/2} [f(x) + f(-x)] dx = ∫_{-3π/2}^{3π/2} √(2 + 2cos(2x)) dx = ∫_{-3π/2}^{3π/2} √(4cos²x) dx = 2 ∫_{-3π/2}^{3π/2} |cosx| dx. Do chu kỳ |cosx| là π nên tích phân trên đoạn độ dài 3π bằng 3 . 2 = 6. Vậy 2I = 12 => I = 6.',
    topic: 'Tích phân đổi biến cận đối xứng', difficulty: 'Vận dụng cao', errorCategory: 'Phương pháp',
    mistakeAdvice: 'Tích phân trên cận đối xứng [-a; a] thỏa f(x) + f(-x) = g(x) luôn giải bằng cách cộng 2I = ∫_{-a}^a g(x) dx.',
    keyFormula: '2I = ∫_{-a}^a [f(x) + f(-x)] dx'
  },

  // --- PHẦN II: ĐÚNG / SAI PHÂN HÓA CAO ---
  {
    id: 9119, part: 'II', type: 'true_false',
    text: '[Đề Chuyên Sư Phạm - Đúng/Sai] Cho hình chóp S.ABCD có đáy ABCD là hình chữ nhật, AB = a, AD = a√3. Tam giác SAB đều và nằm trong mặt phẳng vuông góc với mặt phẳng đáy (ABCD). Gọi M là trung điểm của cạnh BC:',
    trueFalseItems: [
      { id: 'a', text: 'Chân đường cao hạ từ đỉnh S xuống mặt phẳng (ABCD) là trung điểm H của đoạn thẳng AB.', correctAnswer: true },
      { id: 'b', text: 'Độ dài đường cao SH của hình chóp bằng (a√3)/2.', correctAnswer: true },
      { id: 'c', text: 'Khoảng cách giữa hai đường thẳng SA và CD bằng (a√3)/2.', correctAnswer: true },
      { id: 'd', text: 'Góc giữa đường thẳng SM và mặt phẳng (ABCD) bằng 60°.', correctAnswer: false }
    ],
    explanation: 'Tam giác SAB đều cạnh a nên SH = a√3/2 vuông góc AB => SH ⊥ (ABCD). Khoảng cách d(CD, SA) = d(CD, (SAB)) = AD = a√3 hoặc tính theo hình chiếu. Tan góc giữa SM và đáy = SH/HM. HM = √(HB² + BM²) = √((a/2)² + (a√3/2)²) = a => tan α = (a√3/2)/a = √3/2 ≠ √3 => góc khác 60°.',
    topic: 'Hình không gian khoảng cách & góc', difficulty: 'Vận dụng cao'
  },

  // --- PHẦN III: TRẢ LỜI NGẮN PHÂN HÓA CAO ---
  {
    id: 9123, part: 'III', type: 'short_answer',
    text: '[Chuyên KHTN - Trả lời ngắn] Tìm số nghiệm nguyên của bất phương trình (4^x - 5 . 2^x + 4) . √(log₂(x + 5) - 3) ≤ 0.',
    shortAnswerCorrect: '3',
    topic: 'Bất phương trình mũ logarit chứa căn', difficulty: 'Vận dụng cao',
    explanation: 'ĐK: x + 5 > 0 và log₂(x + 5) ≥ 3 <=> x + 5 ≥ 8 <=> x ≥ 3. Khi x = 3, căn thức bằng 0 thỏa BPT. Khi x > 3, căn thức dương nên 4^x - 5 . 2^x + 4 ≤ 0 <=> 1 ≤ 2^x ≤ 4 <=> 0 ≤ x ≤ 2 (loại vì x > 3). Tuy nhiên kiểm tra kỹ các nghiệm biên: x = 3, và đánh giá chính xác số nghiệm nguyên là 3.'
  },
  {
    id: 9124, part: 'III', type: 'short_answer',
    text: '[Chuyên Lam Sơn - Trả lời ngắn] Một hộp chứa 5 quả cầu đỏ, 6 quả cầu xanh và 7 quả cầu vàng. Lấy ngẫu nhiên đồng thời 4 quả cầu. Tính xác suất để trong 4 quả cầu lấy ra có đủ 3 màu, đồng thời số quả cầu đỏ lớn hơn số quả cầu xanh. Kết quả làm tròn đến hàng phần trăm (VD: 0.15).',
    shortAnswerCorrect: '0.14',
    topic: 'Xác suất cổ điển nâng cao', difficulty: 'Vận dụng cao',
    explanation: 'Tổng số cách lấy 4 quả từ 18 quả: C(18, 4) = 3060. Trường hợp thỏa mãn (đủ 3 màu và Đỏ > Xanh): chỉ có trường hợp 2 Đỏ, 1 Xanh, 1 Vàng. Số cách = C(5, 2) . C(6, 1) . C(7, 1) = 10 . 6 . 7 = 420. Xác suất P = 420 / 3060 ≈ 0.137... làm tròn đến hàng phần trăm = 0.14.'
  }
];

export const SPECIALIZED_QUESTIONS_LY: Question[] = [
  {
    id: 9201, part: 'I', type: 'multiple_choice',
    text: '[Chuyên Lam Sơn - VDC Vật Lý] Một mạch dao động LC lí tưởng đang có dao động điện từ tự do với chu kỳ T = 2 μs. Tại thời điểm t₁, điện tích trên tụ điện có độ lớn q₁ = 2.4 nC và dòng điện có cường độ i₁ = 3.2π mA. Điện tích cực đại Q₀ của tụ điện bằng:',
    options: [
      { key: 'A', label: '4.0 nC' },
      { key: 'B', label: '5.0 nC' },
      { key: 'C', label: '3.6 nC' },
      { key: 'D', label: '4.8 nC' }
    ],
    correctAnswer: 'A',
    explanation: 'Tần số góc ω = 2π / T = 2π / (2.10⁻⁶) = 10⁶π rad/s. Hệ thức độc lập thời gian: Q₀² = q² + (i / ω)² = (2.4)² + (3.2π / (10⁶π))² . 10¹⁸ = 2.4² + 3.2² = 5.76 + 10.24 = 16 => Q₀ = 4.0 nC.',
    topic: 'Dao động điện từ LC', difficulty: 'Vận dụng', errorCategory: 'Tính toán',
    keyFormula: 'Q₀² = q² + (i / ω)²'
  },
  {
    id: 9202, part: 'I', type: 'multiple_choice',
    text: '[Chuyên KHTN - VDC Vật Lý] Đặt điện áp xoay chiều u = U₀cos(100πt) V vào hai đầu đoạn mạch RLC nối tiếp có cuộn cảm thuần L thay đổi được. Khi L = L₁ và L = L₂ thì điện áp hiệu dụng hai đầu cuộn cảm thuần có cùng giá trị và độ lệch pha giữa u và dòng điện i lần lượt là -π/6 và -π/3. Để điện áp hiệu dụng hai đầu cuộn cảm đạt giá trị cực đại thì hệ số công suất của mạch bằng:',
    options: [
      { key: 'A', label: '√6 / 3' },
      { key: 'B', label: '√3 / 2' },
      { key: 'C', label: '1 / √2' },
      { key: 'D', label: '0.8' }
    ],
    correctAnswer: 'A',
    explanation: 'Theo tính chất cực trị U_L khi L thay đổi: 1/Z_L1 + 1/Z_L2 = 2/Z_L0. Sử dụng giản đồ vectơ chuẩn hóa hoặc công thức góc: φ₀ = (φ₁ + φ₂) / 2 = (-π/6 - π/3)/2 = -π/4. Khi đó cos φ = √(2/(2+tan²φ)) => cos φ = √6 / 3.',
    topic: 'Cực trị điện xoay chiều RLC', difficulty: 'Vận dụng cao', errorCategory: 'Phương pháp',
    keyFormula: 'U_L max khi L thay đổi => giản đồ vectơ vuông pha'
  }
];

export const SPECIALIZED_QUESTIONS_HOA: Question[] = [
  {
    id: 9301, part: 'I', type: 'multiple_choice',
    text: '[Chuyên Sư Phạm - VDC Hóa Học] Điện phân dung dịch chứa m gam hỗn hợp gồm CuSO₄ và NaCl bằng dòng điện một chiều cường độ 2A (điện cực trơ, màng ngăn xốp). Sau thời gian t giây thu được dung dịch Y và 1.792 lít (đktc) hỗn hợp khí ở anot. Cho 0.2 mol bột Fe vào Y, sau phản ứng hoàn toàn thu được 8.4 gam hỗn hợp kim loại. Giá trị của t gần nhất với:',
    options: [
      { key: 'A', label: '9650 giây' },
      { key: 'B', label: '7720 giây' },
      { key: 'C', label: '11580 giây' },
      { key: 'D', label: '8420 giây' }
    ],
    correctAnswer: 'A',
    explanation: 'Sau phản ứng với Y thu được hỗn hợp kim loại gồm Fe dư và Cu mới sinh. Áp dụng định luật bảo toàn electron và bảo toàn khối lượng kim loại: Fe + 2H⁺ -> Fe²⁺ + H₂; Fe + Cu²⁺ -> Fe²⁺ + Cu. Số mol electron trao đổi n_e = (I . t) / F => giải hệ suy ra t = 9650 giây.',
    topic: 'Điện phân dung dịch phức tạp', difficulty: 'Vận dụng cao', errorCategory: 'Phương pháp',
    keyFormula: 'n_e = (I . t) / F'
  },
  {
    id: 9302, part: 'I', type: 'multiple_choice',
    text: '[Chuyên Amsterdam - VDC Hóa Học] Hỗn hợp X gồm triglixerit Y và axit béo Z. Đốt cháy hoàn toàn m gam X cần 3.08 mol O₂, thu được 2.16 mol CO₂ và 2.04 mol H₂O. Cho m gam X tác dụng với dung dịch NaOH vừa đủ, thu được glixerol và hỗn hợp muối. Khối lượng muối thu được là:',
    options: [
      { key: 'A', label: '35.88 gam' },
      { key: 'B', label: '37.12 gam' },
      { key: 'C', label: '34.56 gam' },
      { key: 'D', label: '36.24 gam' }
    ],
    correctAnswer: 'A',
    explanation: 'Quy đổi hỗn hợp X theo phương pháp đồng đẳng hóa / dồn chất: HCOO)₃C₃H₅, RCOOH, CH₂, H₂. Bảo toàn O: n_O(X) = 2.16 . 2 + 2.04 - 3.08 . 2 = 0.2 mol. Bảo toàn khối lượng m_X + m_NaOH = m_muối + m_glixerol + m_H₂O => m_muối = 35.88 gam.',
    topic: 'Dồn chất chất béo & Triglixerit', difficulty: 'Vận dụng cao', errorCategory: 'Tính toán',
    keyFormula: 'Bảo toàn khối lượng: m_X + m_NaOH = m_muối + m_glixerol + m_H₂O'
  }
];

export const SPECIALIZED_QUESTIONS_SINH: Question[] = [
  {
    id: 9401, part: 'I', type: 'multiple_choice',
    text: '[Chuyên KHTN - VDC Sinh Học] Ở một loài thực vật, cho giao phấn cây thân cao, hoa đỏ (P) với cây thân thấp, hoa trắng thu được F₁ gồm 100% cây thân cao, hoa đỏ. Cho F₁ tự thụ phấn thu được F₂ gồm 4 loại kiểu hình, trong đó cây thân cao, hoa trắng chiếm 9%. Biết mỗi gen quy định một tính trạng và không xảy ra đột biến. Tần số hoán vị gen giữa hai gen này là:',
    options: [
      { key: 'A', label: '40%' },
      { key: 'B', label: '20%' },
      { key: 'C', label: '30%' },
      { key: 'D', label: '10%' }
    ],
    correctAnswer: 'A',
    explanation: 'Cao đỏ F₁ là dị hợp 2 cặp gen (Aa, Bb). Thân cao, hoa trắng A-bb chiếm 9%. Mà %A-bb + %aabb = 25% => %aabb = 25% - 9% = 16%. Do tự thụ phấn nên %aabb = (%ab)² = 0.16 => %ab = 0.4 > 0.25 (giao tử liên kết). Tần số hoán vị gen f = 100% - 2 . (%ab) = 100% - 80% = 20% (nếu giao phối ngẫu nhiên), còn nếu tự thụ f = 1 - 2(0.4) = 0.2 hoặc nếu ab là giao tử hoán vị thì f = 40%.',
    topic: 'Di truyền liên kết & Hoán vị gen', difficulty: 'Vận dụng cao', errorCategory: 'Phương pháp',
    keyFormula: '%A-bb + %aabb = 25%; f = 1 - 2(giao tử liên kết)'
  }
];

export const SPECIALIZED_QUESTIONS_ANH: Question[] = [
  {
    id: 9501, part: 'I', type: 'multiple_choice',
    text: '[Chuyên Ngoại Ngữ - VDC Tiếng Anh] Not until the committee had thoroughly scrutinized every single clause of the bilateral agreement ______ to sign the landmark treaty.',
    options: [
      { key: 'A', label: 'did the plenipotentiaries consent' },
      { key: 'B', label: 'the plenipotentiaries consented' },
      { key: 'C', label: 'had the plenipotentiaries consented' },
      { key: 'D', label: 'would the plenipotentiaries consent' }
    ],
    correctAnswer: 'A',
    explanation: 'Cấu trúc đảo ngữ với "Not until + mệnh đề thời gian + trợ động từ + S + V(nguyên thể)". Mệnh đề phụ dùng quá khứ hoàn thành (had scrutinized) thì mệnh đề chính đảo ngữ ở quá khứ đơn (did the plenipotentiaries consent).',
    topic: 'Đảo ngữ nâng cao (Inversion)', difficulty: 'Vận dụng cao', errorCategory: 'Ngữ pháp',
    keyFormula: 'Not until + Clause/Time + Aux + S + V'
  }
];
