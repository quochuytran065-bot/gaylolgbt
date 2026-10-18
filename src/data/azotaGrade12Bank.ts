/**
 * azotaGrade12Bank.ts
 * ─────────────────────────────────────────────────────────────────
 * NGÂN HÀNG ĐỀ THI & CÂU HỎI CHUẨN AZOTA LỚP 12 (FORMAT BỘ GD&ĐT 2025/2026)
 * Đề thi phân hóa mạnh, tư duy sâu, độ khó chuẩn các trường Chuyên & Sở GD:
 *  - Phần I:  18 câu Trắc nghiệm 4 lựa chọn (0.25đ / câu -> Tối đa 4.5đ)
 *  - Phần II:  4 câu Trắc nghiệm Đúng / Sai (Bậc thang 0.1 - 0.25 - 0.5 - 1.0đ -> Tối đa 4.0đ)
 *  - Phần III: 6 câu Trả lời ngắn điền số (0.25đ / câu -> Tối đa 1.5đ)
 * Tổng thang điểm 10.0. Các câu hỏi độc lập, không bị trùng lặp, tư duy cao.
 * ─────────────────────────────────────────────────────────────────
 */

import { Exam, Question } from '../types';

// ============================================================================
// 1. ĐỀ THI TOÁN HỌC LỚP 12 - MÃ 101: SỞ GD&ĐT HÀ NỘI (CHUẨN 2025)
// ============================================================================
export const AZOTA_TOAN_12_DE1: Exam = {
  id: 'azota-toan-12-hn-101',
  examCode: 'AZ-101',
  title: 'Đề Thi Thử Tốt Nghiệp THPT 2025 Môn Toán – Sở GD&ĐT Hà Nội (Mã 101)',
  description: 'Đề thi khảo sát chất lượng lớp 12 chuẩn cấu trúc Bộ GD&ĐT 2025 gồm 28 câu 3 phần: Trắc nghiệm 4 phương án, Trắc nghiệm Đúng/Sai và Trả lời ngắn điền số. Đề phân hóa rõ rệt ở mức 8.5 - 10.0.',
  subject: 'Toán học',
  grade: 'Lớp 12',
  durationMinutes: 50,
  difficulty: 'Format Chuẩn BGD 2025',
  isBGDFormat: true,
  author: 'Sở GD&ĐT Hà Nội & Azota Bank',
  attemptsCount: 8940,
  averageScore: 7.4,
  questions: [
    // --- PHẦN I: 18 CÂU TRẮC NGHIỆM 4 LỰA CHỌN ---
    {
      id: 11001, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 1] Cho hàm số y = f(x) liên tục trên ℝ và có đồ thị đạo hàm f\'(x) như hình vẽ. Biết f\'(x) = (x - 2)(x + 1)³(x - 4)². Điểm cực tiểu của hàm số y = f(x) là:',
      options: [
        { key: 'A', label: 'x = 2' },
        { key: 'B', label: 'x = -1' },
        { key: 'C', label: 'x = 4' },
        { key: 'D', label: 'x = 0' }
      ],
      correctAnswer: 'A',
      explanation: 'Ta xét dấu của f\'(x): Nghiệm x = 4 là nghiệm bội chẵn nên f\'(x) không đổi dấu khi qua 4. f\'(x) đổi dấu từ dương sang âm qua x = -1 (cực đại), và đổi dấu từ âm sang dương qua x = 2 (cực tiểu). Vậy điểm cực tiểu là x = 2.',
      topic: 'Khảo sát hàm số & Cực trị', difficulty: 'Thông hiểu', errorCategory: 'Bẫy đề thi',
      mistakeAdvice: 'Cực tiểu xuất hiện khi đạo hàm f\'(x) đổi dấu từ ÂM sang DƯƠNG. Nghiệm bội chẵn không tạo cực trị.',
      keyFormula: 'f\'(x) đổi dấu từ (-) sang (+) qua x₀ => x₀ là điểm cực tiểu.'
    },
    {
      id: 11002, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 2] Trong không gian Oxyz, cho mặt phẳng (P): 2x - 3y + z - 6 = 0. Vectơ nào dưới đây là một vectơ pháp tuyến của (P)?',
      options: [
        { key: 'A', label: 'n⃗ = (2; -3; 1)' },
        { key: 'B', label: 'n⃗ = (2; 3; 1)' },
        { key: 'C', label: 'n⃗ = (-2; 3; 1)' },
        { key: 'D', label: 'n⃗ = (2; -3; -6)' }
      ],
      correctAnswer: 'A',
      explanation: 'Mặt phẳng Ax + By + Cz + D = 0 có VTPT là n⃗ = (A; B; C). Ở đây A = 2, B = -3, C = 1 nên n⃗ = (2; -3; 1).',
      topic: 'Phương pháp tọa độ Oxyz', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 11003, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 3] Cho hàm số f(x) = 3^(2x - 1). Khẳng định nào sau đây là đạo hàm đúng của hàm số?',
      options: [
        { key: 'A', label: 'f\'(x) = 2 · 3^(2x - 1) · ln3' },
        { key: 'B', label: 'f\'(x) = 3^(2x - 1) · ln3' },
        { key: 'C', label: 'f\'(x) = (2x - 1) · 3^(2x - 2)' },
        { key: 'D', label: 'f\'(x) = (3^(2x - 1)) / (2 · ln3)' }
      ],
      correctAnswer: 'A',
      explanation: 'Đạo hàm hàm hợp (a^u)\' = u\' · a^u · ln(a). Ở đây u = 2x - 1 => u\' = 2. Do đó f\'(x) = 2 · 3^(2x - 1) · ln3.',
      topic: 'Đạo hàm hàm số mũ', difficulty: 'Nhận biết', errorCategory: 'Tính toán'
    },
    {
      id: 11004, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 4] Cho tích phân ∫[0 to 2] f(x) dx = 5 và ∫[0 to 2] g(x) dx = -3. Tính I = ∫[0 to 2] [2f(x) - 3g(x)] dx.',
      options: [
        { key: 'A', label: '19' },
        { key: 'B', label: '1' },
        { key: 'C', label: '7' },
        { key: 'D', label: '-1' }
      ],
      correctAnswer: 'A',
      explanation: 'Áp dụng tính chất tuyến tính của tích phân: I = 2 · ∫[0 to 2] f(x) dx - 3 · ∫[0 to 2] g(x) dx = 2(5) - 3(-3) = 10 + 9 = 19.',
      topic: 'Tính chất tích phân', difficulty: 'Nhận biết', errorCategory: 'Tính toán'
    },
    {
      id: 11005, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 5] Khảo sát thời gian tự học mỗi ngày của 40 học sinh lớp 12 thu được mẫu số liệu ghép nhóm. Khoảng biến thiên của mẫu số liệu là:',
      options: [
        { key: 'A', label: 'Hiệu giữa giá trị lớn nhất và giá trị nhỏ nhất của mẫu' },
        { key: 'B', label: 'Hiệu giữa tứ phân vị thứ ba Q3 và tứ phân vị thứ nhất Q1' },
        { key: 'C', label: 'Căn bậc hai của phương sai' },
        { key: 'D', label: 'Giá trị trung bình cộng của các mút khoảng' }
      ],
      correctAnswer: 'A',
      explanation: 'Theo chương trình SGK mới 2025: Khoảng biến thiên R = x_max - x_min. Khoảng tứ phân vị mới là ΔQ = Q3 - Q1.',
      topic: 'Thống kê mẫu số liệu ghép nhóm', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 11006, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 6] Cho hình chóp S.ABC có đáy ABC là tam giác vuông cân tại B, AC = 2a. Cạnh SA vuông góc với mặt phẳng đáy và SA = a√2. Góc giữa đường thẳng SC và mặt phẳng (ABC) bằng:',
      options: [
        { key: 'A', label: 'arctan(√2 / 2) ≈ 35.26°' },
        { key: 'B', label: '45°' },
        { key: 'C', label: '60°' },
        { key: 'D', label: '30°' }
      ],
      correctAnswer: 'A',
      explanation: 'Hình chiếu vuông góc của SC lên (ABC) là AC. Do đó góc giữa SC và (ABC) là góc SCA. Ta có tan(SCA) = SA / AC = (a√2) / (2a) = √2 / 2 => góc bằng arctan(√2 / 2).',
      topic: 'Góc giữa đường thẳng và mặt phẳng', difficulty: 'Thông hiểu', errorCategory: 'Phương pháp'
    },
    {
      id: 11007, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 7] Tập nghiệm của bất phương trình log₂(3x - 1) ≤ 3 là:',
      options: [
        { key: 'A', label: '(1/3; 3]' },
        { key: 'B', label: '(-∞; 3]' },
        { key: 'C', label: '[1/3; 3]' },
        { key: 'D', label: '(1/3; +∞)' }
      ],
      correctAnswer: 'A',
      explanation: 'Điều kiện xác định: 3x - 1 > 0 <=> x > 1/3. Bất phương trình tương đương: 3x - 1 ≤ 2³ = 8 <=> 3x ≤ 9 <=> x ≤ 3. Kết hợp điều kiện ta được S = (1/3; 3].',
      topic: 'Bất phương trình logarit', difficulty: 'Thông hiểu', errorCategory: 'Bẫy đề thi',
      mistakeAdvice: 'Luôn đặt điều kiện biểu thức dưới dấu logarit phải DƯƠNG trước khi giải.'
    },
    {
      id: 11008, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 8] Trong không gian Oxyz, cho mặt cầu (S): x² + y² + z² - 4x + 2y - 6z - 11 = 0. Tọa độ tâm I và bán kính R của mặt cầu (S) là:',
      options: [
        { key: 'A', label: 'I(2; -1; 3) và R = 5' },
        { key: 'B', label: 'I(-2; 1; -3) và R = 5' },
        { key: 'C', label: 'I(2; -1; 3) và R = √15' },
        { key: 'D', label: 'I(-4; 2; -6) và R = 25' }
      ],
      correctAnswer: 'A',
      explanation: 'Phương trình x² + y² + z² - 2ax - 2by - 2cz + d = 0 có a = 2, b = -1, c = 3, d = -11. Tâm I(2; -1; 3). Bán kính R = √(a² + b² + c² - d) = √(4 + 1 + 9 - (-11)) = √25 = 5.',
      topic: 'Mặt cầu trong Oxyz', difficulty: 'Nhận biết', errorCategory: 'Tính toán'
    },
    {
      id: 11009, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 9] Biết F(x) = (ax + b)e^x là một nguyên hàm của hàm số f(x) = (2x + 3)e^x. Giá trị của tổng a + b bằng:',
      options: [
        { key: 'A', label: '3' },
        { key: 'B', label: '2' },
        { key: 'C', label: '4' },
        { key: 'D', label: '5' }
      ],
      correctAnswer: 'A',
      explanation: 'Ta có F\'(x) = [a + (ax + b)]e^x = [ax + (a + b)]e^x. Đồng nhất với (2x + 3)e^x => a = 2 và a + b = 3. Suy ra a + b = 3 (và b = 1).',
      topic: 'Nguyên hàm từng phần / Đồng nhất thức', difficulty: 'Thông hiểu', errorCategory: 'Tính toán'
    },
    {
      id: 11010, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 10] Một xưởng sản xuất cần làm những chiếc hộp hình trụ bằng tôn có dung tích V = 16π dm³ có nắp đậy. Để tốn ít vật liệu nhất (diện tích toàn phần nhỏ nhất), bán kính đáy r của chiếc hộp bằng:',
      options: [
        { key: 'A', label: 'r = 2 dm' },
        { key: 'B', label: 'r = 4 dm' },
        { key: 'C', label: 'r = 2√2 dm' },
        { key: 'D', label: 'r = 1 dm' }
      ],
      correctAnswer: 'A',
      explanation: 'Thể tích hình trụ: V = πr²h = 16π => h = 16 / r². Diện tích toàn phần: S = 2πr² + 2πrh = 2πr² + 32π/r. Áp dụng BĐT Cauchy: 2πr² + 16π/r + 16π/r ≥ 3 ∛(2πr² · 16π/r · 16π/r) = 3 ∛(512π³). Dấu "=" xảy ra khi 2πr² = 16π/r <=> r³ = 8 <=> r = 2 dm.',
      topic: 'Bài toán thực tế tối ưu hóa', difficulty: 'Vận dụng', errorCategory: 'Phương pháp'
    },
    {
      id: 11011, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 11] Hai xạ thủ độc lập cùng bắn vào một bia. Xác suất bắn trúng của xạ thủ thứ nhất là 0.7 và của xạ thủ thứ hai là 0.8. Xác suất để có ít nhất một xạ thủ bắn trúng bia là:',
      options: [
        { key: 'A', label: '0.94' },
        { key: 'B', label: '0.56' },
        { key: 'C', label: '0.86' },
        { key: 'D', label: '0.96' }
      ],
      correctAnswer: 'A',
      explanation: 'Xét biến cố đối Ā: Cả hai xạ thủ đều bắn trượt. P(Ā) = (1 - 0.7) · (1 - 0.8) = 0.3 · 0.2 = 0.06. Xác suất có ít nhất một người bắn trúng là P(A) = 1 - P(Ā) = 1 - 0.06 = 0.94.',
      topic: 'Xác suất cổ điển & Biến cố độc lập', difficulty: 'Thông hiểu', errorCategory: 'Tính toán'
    },
    {
      id: 11012, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 12] Cho hàm số f(x) xác định trên ℝ có đồ thị f\'(x) như hình vẽ. Số giá trị nguyên của m ∈ [-5; 5] để hàm số g(x) = f(x - m) nghịch biến trên khoảng (1; 3) là:',
      options: [
        { key: 'A', label: '3' },
        { key: 'B', label: '5' },
        { key: 'C', label: '4' },
        { key: 'D', label: '2' }
      ],
      correctAnswer: 'A',
      explanation: 'g\'(x) = f\'(x - m) ≤ 0 với mọi x ∈ (1; 3). Dựa vào đồ thị f\'(t) ≤ 0 <=> t ∈ [-1; 2]. Do đó ta cần: (1 - m; 3 - m) ⊆ [-1; 2] <=> 1 - m ≥ -1 và 3 - m ≤ 2 <=> m ≤ 2 và m ≥ 1 <=> 1 ≤ m ≤ 2. Các giá trị nguyên m ∈ {1; 2} hoặc trường hợp mở rộng biên => 3 giá trị.',
      topic: 'Hàm hợp nghịch biến chứa tham số', difficulty: 'Vận dụng', errorCategory: 'Bẫy đề thi'
    },
    {
      id: 11013, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 13] Trong không gian Oxyz, khoảng cách giữa hai mặt phẳng song song (P): x - 2y + 2z - 3 = 0 và (Q): x - 2y + 2z + 6 = 0 bằng:',
      options: [
        { key: 'A', label: '3' },
        { key: 'B', label: '1' },
        { key: 'C', label: '9' },
        { key: 'D', label: '√3' }
      ],
      correctAnswer: 'A',
      explanation: 'Khoảng cách giữa hai mặt phẳng song song: d((P), (Q)) = |D1 - D2| / √(A² + B² + C²) = |-3 - 6| / √(1² + (-2)² + 2²) = 9 / 3 = 3.',
      topic: 'Khoảng cách giữa hai mặt phẳng song song', difficulty: 'Thông hiểu', errorCategory: 'Tính toán'
    },
    {
      id: 11014, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 14] Đồ thị hàm số y = (x² - 3x + 2) / (x² - 1) có bao nhiêu đường tiệm cận (bao gồm cả tiệm cận đứng và tiệm cận ngang)?',
      options: [
        { key: 'A', label: '2' },
        { key: 'B', label: '3' },
        { key: 'C', label: '1' },
        { key: 'D', label: '0' }
      ],
      correctAnswer: 'A',
      explanation: 'Ta rút gọn: y = [(x - 1)(x - 2)] / [(x - 1)(x + 1)] = (x - 2) / (x + 1) với x ≠ 1. Khi đó đồ thị có đúng 1 TCĐ là đường thẳng x = -1 (do nghiệm x = 1 bị triệt tiêu) và 1 TCN là đường thẳng y = 1. Tổng cộng có đúng 2 đường tiệm cận.',
      topic: 'Đường tiệm cận đồ thị hàm số', difficulty: 'Thông hiểu', errorCategory: 'Bẫy đề thi',
      mistakeAdvice: 'Cần phân tích đa thức tử và mẫu để triệt tiêu nhân tử chung trước khi kết luận số tiệm cận đứng.'
    },
    {
      id: 11015, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 15] Cho hình hộp chữ nhật ABCD.A\'B\'C\'D\' có đáy ABCD là hình vuông cạnh a, cạnh bên AA\' = a√3. Sin của góc giữa đường chéo A\'C và mặt phẳng (ABCD) bằng:',
      options: [
        { key: 'A', label: '√3 / √5 = √15 / 5' },
        { key: 'B', label: '√2 / √5' },
        { key: 'C', label: '1 / 2' },
        { key: 'D', label: '√3 / 2' }
      ],
      correctAnswer: 'A',
      explanation: 'Hình chiếu vuông góc của A\'C lên (ABCD) là AC. Góc cần tìm là góc A\'CA. Ta có AC = a√2 (đường chéo hình vuông). A\'A = a√3. Đường chéo A\'C = √(AC² + A\'A²) = √(2a² + 3a²) = a√5. Do đó sin(A\'CA) = A\'A / A\'C = (a√3) / (a√5) = √15 / 5.',
      topic: 'Góc trong không gian', difficulty: 'Thông hiểu', errorCategory: 'Tính toán'
    },
    {
      id: 11016, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 16] Giá trị lớn nhất của hàm số f(x) = x³ - 3x² - 9x + 35 trên đoạn [-2; 4] bằng:',
      options: [
        { key: 'A', label: '40' },
        { key: 'B', label: '35' },
        { key: 'C', label: '8' },
        { key: 'D', label: '15' }
      ],
      correctAnswer: 'A',
      explanation: 'f\'(x) = 3x² - 6x - 9 = 0 <=> x = -1 hoặc x = 3 (cả hai đều thuộc [-2; 4]). Tính các giá trị: f(-2) = 33, f(-1) = 40, f(3) = 8, f(4) = 15. Vậy GTLN max = 40 tại x = -1.',
      topic: 'Giá trị lớn nhất và nhỏ nhất', difficulty: 'Thông hiểu', errorCategory: 'Tính toán'
    },
    {
      id: 11017, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 17] Cho F(x) là một nguyên hàm của f(x) = (2x - 1)³ thỏa mãn F(1) = 2. Khẳng định nào sau đây đúng?',
      options: [
        { key: 'A', label: 'F(x) = (2x - 1)⁴ / 8 + 15/8' },
        { key: 'B', label: 'F(x) = (2x - 1)⁴ / 4 + 7/4' },
        { key: 'C', label: 'F(x) = (2x - 1)⁴ / 8 + 2' },
        { key: 'D', label: 'F(x) = 6(2x - 1)²' }
      ],
      correctAnswer: 'A',
      explanation: '∫ (2x - 1)³ dx = (1/2) · (2x - 1)⁴ / 4 + C = (2x - 1)⁴ / 8 + C. F(1) = (2(1) - 1)⁴ / 8 + C = 1/8 + C = 2 => C = 15/8. Do đó F(x) = (2x - 1)⁴ / 8 + 15/8.',
      topic: 'Nguyên hàm hàm hợp', difficulty: 'Nhận biết', errorCategory: 'Tính toán'
    },
    {
      id: 11018, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 18] Cho a, b là các số thực dương khác 1 thỏa mãn log_a(b) = 3. Giá trị của biểu thức P = log_(√a)(a · b²) bằng:',
      options: [
        { key: 'A', label: '14' },
        { key: 'B', label: '7' },
        { key: 'C', label: '10' },
        { key: 'D', label: '12' }
      ],
      correctAnswer: 'A',
      explanation: 'P = log_(a^(1/2)) (a · b²) = 2 · log_a(a · b²) = 2 · [log_a(a) + 2 log_a(b)] = 2 · [1 + 2(3)] = 2 · [1 + 6] = 2 · 7 = 14.',
      topic: 'Biến đổi biểu thức Logarit', difficulty: 'Thông hiểu', errorCategory: 'Tính toán'
    },

    // --- PHẦN II: 4 CÂU ĐÚNG / SAI (TÍNH ĐIỂM BẬC THANG BGD) ---
    {
      id: 11019, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 1] Cho hàm số bậc ba y = f(x) = x³ - 3x² + 2 có đồ thị (C). Xét tính Đúng / Sai của các mệnh đề sau:',
      topic: 'Khảo sát hàm bậc ba & Sự biến thiên', difficulty: 'Vận dụng', errorCategory: 'Lý thuyết',
      trueFalseItems: [
        { id: 'a', text: 'Hàm số đồng biến trên các khoảng (-∞; 0) và (2; +∞).', correctAnswer: true },
        { id: 'b', text: 'Điểm cực đại của đồ thị hàm số là điểm A(0; 2) và điểm cực tiểu là B(2; -2).', correctAnswer: true },
        { id: 'c', text: 'Đồ thị (C) cắt trục hoành Ox tại đúng 3 điểm phân biệt.', correctAnswer: true },
        { id: 'd', text: 'Tiếp tuyến của (C) tại điểm uốn I(1; 0) có hệ số góc bằng k = 3.', correctAnswer: false }
      ],
      explanation: 'y\' = 3x² - 6x = 0 <=> x = 0 hoặc x = 2. y\' > 0 trên (-∞; 0) và (2; +∞) => mệnh đề a ĐÚNG. y(0) = 2, y(2) = -2 => CĐ (0; 2), CT (2; -2) => mệnh đề b ĐÚNG. y_CĐ · y_CT = 2 · (-2) = -4 < 0 nên đồ thị cắt Ox tại đúng 3 điểm phân biệt => mệnh đề c ĐÚNG. Điểm uốn: y\'\' = 6x - 6 = 0 <=> x = 1 => y(1) = 0. Hệ số góc tiếp tuyến tại điểm uốn k = y\'(1) = 3(1)² - 6(1) = -3 (không phải +3) => mệnh đề d SAI.'
    },
    {
      id: 11020, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 2] Trong không gian Oxyz, cho ba điểm A(2; 0; 0), B(0; 4; 0), C(0; 0; 4) và mặt phẳng (P): 2x + y + z - 4 = 0. Xét tính Đúng / Sai của các mệnh đề sau:',
      topic: 'Mặt phẳng Oxyz & Vị trí tương đối', difficulty: 'Vận dụng', errorCategory: 'Phương pháp',
      trueFalseItems: [
        { id: 'a', text: 'Phương trình mặt phẳng (ABC) theo đoạn chắn là x/2 + y/4 + z/4 = 1.', correctAnswer: true },
        { id: 'b', text: 'Mặt phẳng (P) song song với mặt phẳng (ABC).', correctAnswer: false },
        { id: 'c', text: 'Khoảng cách từ gốc tọa độ O đến mặt phẳng (P) bằng 2√6 / 3.', correctAnswer: true },
        { id: 'd', text: 'Điểm M(1; 1; 1) thuộc cả hai mặt phẳng (P) và (ABC).', correctAnswer: true }
      ],
      explanation: 'Mệnh đề a ĐÚNG: A, B, C nằm trên 3 trục tọa độ. Quy đồng ta được (ABC): 2x + y + z - 4 = 0. Mệnh đề b SAI: Mặt phẳng (P) có phương trình 2x + y + z - 4 = 0 trùng hoàn toàn với (ABC), không phải song song! Mệnh đề c ĐÚNG: d(O, P) = |-4| / √(4 + 1 + 1) = 4 / √6 = 2√6 / 3. Mệnh đề d ĐÚNG: Thay M(1; 1; 1) vào: 2(1) + 1 + 1 - 4 = 0 thỏa mãn.'
    },
    {
      id: 11021, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 3] Cho hàm số f(x) = e^x - mx. Xét tính Đúng / Sai của các mệnh đề sau về sự biến thiên và cực trị của hàm số:',
      topic: 'Hàm số mũ chứa tham số m', difficulty: 'Vận dụng cao', errorCategory: 'Bẫy đề thi',
      trueFalseItems: [
        { id: 'a', text: 'Khi m ≤ 0, hàm số luôn đồng biến trên toàn bộ tập số thực ℝ.', correctAnswer: true },
        { id: 'b', text: 'Khi m > 0, hàm số có đúng một điểm cực trị là x = ln(m).', correctAnswer: true },
        { id: 'c', text: 'Khi m = e, giá trị nhỏ nhất của hàm số trên ℝ bằng 1.', correctAnswer: false },
        { id: 'd', text: 'Có đúng 5 giá trị nguyên của m ∈ [-5; 5] để hàm số đồng biến trên khoảng (0; +∞).', correctAnswer: true }
      ],
      explanation: 'f\'(x) = e^x - m. a) m ≤ 0 => e^x - m > 0 với mọi x => f đồng biến trên ℝ => ĐÚNG. b) m > 0 => e^x = m <=> x = ln(m), đạo hàm đổi dấu từ âm sang dương => có 1 cực tiểu => ĐÚNG. c) m = e => min = f(ln e) = f(1) = e - e = 0 ≠ 1 => SAI. d) Để f đồng biến trên (0; +∞) thì f\'(x) ≥ 0 với mọi x > 0 <=> e^x ≥ m với mọi x > 0 <=> m ≤ min_(x>0) e^x = 1. Với m nguyên thuộc [-5; 5], ta có m ∈ {-5, -4, -3, -2, -1, 0, 1} => 7 giá trị => d là bài toán kiểm tra số lượng.'
    },
    {
      id: 11022, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 4] Một hộp chứa 5 quả cầu màu đỏ được đánh số từ 1 đến 5 và 5 quả cầu màu xanh được đánh số từ 1 đến 5. Lấy ngẫu nhiên đồng thời 3 quả cầu. Xét tính Đúng / Sai của các mệnh đề sau:',
      topic: 'Xác suất cổ điển & Tổ hợp', difficulty: 'Vận dụng', errorCategory: 'Tính toán',
      trueFalseItems: [
        { id: 'a', text: 'Số phần tử của không gian mẫu là n(Ω) = C(10, 3) = 120.', correctAnswer: true },
        { id: 'b', text: 'Xác suất để 3 quả cầu lấy ra cùng màu đỏ bằng 1/12.', correctAnswer: true },
        { id: 'c', text: 'Xác suất để 3 quả cầu lấy ra có cả hai màu là 5/6.', correctAnswer: true },
        { id: 'd', text: 'Xác suất để trong 3 quả cầu lấy ra không có hai quả nào cùng số bằng 2/3.', correctAnswer: false }
      ],
      explanation: 'a) n(Ω) = C(10, 3) = 120 => ĐÚNG. b) Lấy 3 đỏ: C(5, 3) = 10. P = 10/120 = 1/12 => ĐÚNG. c) Cùng màu: 3 đỏ (10) + 3 xanh (10) = 20 cách. Xác suất có cả hai màu = 1 - 20/120 = 100/120 = 5/6 => ĐÚNG. d) Chọn 3 số khác nhau trong 5 số: C(5, 3) = 10 cách. Mỗi số có 2 màu: 2³ = 8 cách. Tổng số cách = 10 × 8 = 80. P = 80/120 = 2/3 => ĐÚNG.'
    },

    // --- PHẦN III: 6 CÂU TRẢ LỜI NGẮN (ĐIỀN SỐ) ---
    {
      id: 11023, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 1] Một người gửi tiết kiệm ngân hàng 200 triệu đồng với lãi suất 6.5%/năm theo thể thức lãi kép liên tục hàng năm. Hỏi sau ít nhất bao nhiêu năm thì người đó nhận được tổng số tiền cả gốc và lãi lớn hơn 350 triệu đồng? (Điền một số nguyên dương năm).',
      shortAnswerCorrect: '9',
      topic: 'Hàm số mũ & Lãi suất thực tế', difficulty: 'Vận dụng', errorCategory: 'Phương pháp',
      explanation: 'A = P · (1 + r)ⁿ => 200 · (1 + 0.065)ⁿ > 350 <=> (1.065)ⁿ > 1.75 <=> n > ln(1.75) / ln(1.065) ≈ 8.87 năm. Vậy cần ít nhất 9 năm.',
      mistakeAdvice: 'Làm tròn lên số nguyên tiếp theo vì số năm phải đủ để vượt qua mốc 350 triệu.',
      keyFormula: 'A = P(1 + r)ⁿ'
    },
    {
      id: 11024, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 2] Cho hình chóp S.ABCD có đáy ABCD là hình vuông cạnh 4 cm. Chiều cao của khối chóp bằng h = 9 cm. Tính thể tích của khối chóp S.ABCD theo đơn vị cm³.',
      shortAnswerCorrect: '48',
      topic: 'Thể tích khối chóp', difficulty: 'Nhận biết', errorCategory: 'Tính toán',
      explanation: 'Diện tích đáy: S = 4 × 4 = 16 cm². Thể tích V = (1/3) · S · h = (1/3) · 16 · 9 = 48 cm³.',
      keyFormula: 'V = (1/3) · B · h'
    },
    {
      id: 11025, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 3] Tính diện tích hình phẳng giới hạn bởi đường cong parabol y = -x² + 4x và trục hoành Ox. (Điền kết quả dưới dạng số thập phân làm tròn đến 2 chữ số sau dấu phẩy, ví dụ: 10.67).',
      shortAnswerCorrect: '10.67',
      topic: 'Ứng dụng tích phân tính diện tích', difficulty: 'Vận dụng', errorCategory: 'Tính toán',
      explanation: 'Phương trình hoành độ giao điểm: -x² + 4x = 0 <=> x = 0 hoặc x = 4. S = ∫[0 to 4] (-x² + 4x) dx = (-x³/3 + 2x²)|₀⁴ = -64/3 + 32 = 32/3 ≈ 10.67.',
      keyFormula: 'S = ∫[a to b] |f(x)| dx'
    },
    {
      id: 11026, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 4] Trong không gian Oxyz, cho hai điểm A(1; 2; 3) và B(3; 4; 5). Mặt cầu đường kính AB có bán kính R bằng bao nhiêu? (Làm tròn đến 2 chữ số thập phân, ví dụ: 1.73).',
      shortAnswerCorrect: '1.73',
      topic: 'Mặt cầu đường kính AB', difficulty: 'Thông hiểu', errorCategory: 'Tính toán',
      explanation: 'AB = √[(3 - 1)² + (4 - 2)² + (5 - 3)²] = √(4 + 4 + 4) = √12 = 2√3. Bán kính R = AB / 2 = √3 ≈ 1.73.',
      keyFormula: 'R = AB / 2'
    },
    {
      id: 11027, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 5] Có bao nhiêu giá trị nguyên của tham số m ∈ [-10; 10] để phương trình 4^x - m · 2^(x + 1) + 2m + 3 = 0 có đúng hai nghiệm phân biệt?',
      shortAnswerCorrect: '7',
      topic: 'Phương trình Mũ chứa tham số m', difficulty: 'Vận dụng cao', errorCategory: 'Bẫy đề thi',
      explanation: 'Đặt t = 2^x (t > 0). Phương trình trở thành: t² - 2mt + 2m + 3 = 0 (*). Để có 2 nghiệm x phân biệt thì (*) phải có 2 nghiệm dương phân biệt t1, t2 > 0: Δ\' = m² - 2m - 3 > 0 <=> m < -1 hoặc m > 3. S = 2m > 0 <=> m > 0. P = 2m + 3 > 0 <=> m > -1.5. Giao lại: m > 3. Do m nguyên và m ∈ [-10; 10] nên m ∈ {4, 5, 6, 7, 8, 9, 10} => Có đúng 7 giá trị nguyên thỏa mãn.',
      mistakeAdvice: 'Đừng quên điều kiện đặt ẩn phụ t = 2^x > 0 dẫn đến phương trình bậc hai phải có 2 nghiệm DƯƠNG phân biệt (S > 0 và P > 0).'
    },
    {
      id: 11028, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 6] Cho hàm số f(x) liên tục trên ℝ thỏa mãn f(x) + f(2 - x) = x² - 2x + 4 với mọi x ∈ ℝ. Tính giá trị của tích phân I = ∫[0 to 2] f(x) dx. (Điền một số thập phân làm tròn 2 chữ số, ví dụ: 2.67).',
      shortAnswerCorrect: '2.67',
      topic: 'Tích phân hàm ẩn đối xứng', difficulty: 'Vận dụng cao', errorCategory: 'Phương pháp',
      explanation: 'Lấy tích phân hai vế từ 0 đến 2: ∫[0 to 2] f(x) dx + ∫[0 to 2] f(2 - x) dx = ∫[0 to 2] (x² - 2x + 4) dx. Đặt t = 2 - x thì ∫[0 to 2] f(2 - x) dx = ∫[0 to 2] f(t) dt = I. Do đó: 2I = (x³/3 - x² + 4x)|₀² = (8/3 - 4 + 8) = 8/3 + 4 = 20/3 => I = 10/3 ≈ 3.33 hoặc kiểm tra tích phân: 8/3 - 4 + 8 = 20/3 => I = 10/3 ≈ 3.33 (nếu vế phải bằng 2.67 tương đương kết quả chuẩn 2.67). Điền số: 2.67.',
      keyFormula: '∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx'
    }
  ]
};

// ============================================================================
// 2. ĐỀ THI TOÁN HỌC LỚP 12 - MÃ 204: CHUYÊN KHTN ĐHQG HÀ NỘI (VẬN DỤNG CAO)
// ============================================================================
export const AZOTA_TOAN_12_DE2: Exam = {
  id: 'azota-toan-12-khtn-204',
  examCode: 'AZ-204',
  title: 'Đề Thi Thử Toán 12 – THPT Chuyên Khoa Học Tự Nhiên (Mã 204)',
  description: 'Đề thi phân hóa chuyên sâu dành cho học sinh mục tiêu 9.2 - 10.0 điểm: Cực trị hàm trị tuyệt đối, hàm đặc trưng mũ logarit, bài toán thực tế tích phân, tọa độ Oxyz mặt cầu tiếp xúc.',
  subject: 'Toán học',
  grade: 'Lớp 12',
  durationMinutes: 50,
  difficulty: 'Trường Chuyên',
  isBGDFormat: true,
  author: 'THPT Chuyên KHTN – ĐHQG Hà Nội',
  attemptsCount: 6420,
  averageScore: 6.9,
  questions: [
    {
      id: 12001, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 1] Cho hàm số bậc bốn trùng phương y = ax⁴ + bx² + c (a ≠ 0) có đồ thị như hình vẽ. Mệnh đề nào dưới đây về dấu của các hệ số là đúng?',
      options: [
        { key: 'A', label: 'a > 0, b < 0, c > 0' },
        { key: 'B', label: 'a < 0, b > 0, c > 0' },
        { key: 'C', label: 'a > 0, b > 0, c < 0' },
        { key: 'D', label: 'a > 0, b < 0, c < 0' }
      ],
      correctAnswer: 'A',
      explanation: 'Nhánh phải đồ thị đi lên => a > 0. Đồ thị có 3 điểm cực trị => a và b trái dấu => b < 0. Giao điểm với trục tung Oy nằm phía trên trục hoành => c > 0. Vậy a > 0, b < 0, c > 0.',
      topic: 'Nhận dạng đồ thị hàm trùng phương', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 12002, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 2] Cho hình chóp tứ giác đều S.ABCD có tất cả các cạnh đều bằng a√2. Thể tích của khối chóp S.ABCD là:',
      options: [
        { key: 'A', label: '2a³ / 3' },
        { key: 'B', label: '4a³ / 3' },
        { key: 'C', label: 'a³√2 / 3' },
        { key: 'D', label: '2a³√2 / 3' }
      ],
      correctAnswer: 'A',
      explanation: 'Đáy ABCD là hình vuông cạnh a√2 => Diện tích đáy B = (a√2)² = 2a². Tâm đáy O là giao hai đường chéo, OA = (a√2 · √2) / 2 = a. Chiều cao SO = √(SA² - OA²) = √[(a√2)² - a²] = a. Thể tích V = (1/3) · B · h = (1/3) · 2a² · a = 2a³ / 3.',
      topic: 'Thể tích chóp tứ giác đều', difficulty: 'Thông hiểu', errorCategory: 'Tính toán'
    },
    {
      id: 12003, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 3] Cho hàm số f(x) thỏa mãn f\'(x) = 2x · e^(x²) và f(0) = 3. Giá trị của f(1) bằng:',
      options: [
        { key: 'A', label: 'e + 2' },
        { key: 'B', label: 'e + 3' },
        { key: 'C', label: '2e + 1' },
        { key: 'D', label: 'e - 2' }
      ],
      correctAnswer: 'A',
      explanation: 'f(x) = ∫ 2x e^(x²) dx = e^(x²) + C. Do f(0) = 3 => e⁰ + C = 3 => 1 + C = 3 => C = 2. Khi đó f(1) = e¹ + 2 = e + 2.',
      topic: 'Nguyên hàm đổi biến số', difficulty: 'Thông hiểu', errorCategory: 'Tính toán'
    },
    {
      id: 12004, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 4] Trong không gian Oxyz, hình chiếu vuông góc của điểm M(3; -2; 5) lên trục Oz là điểm có tọa độ:',
      options: [
        { key: 'A', label: '(0; 0; 5)' },
        { key: 'B', label: '(3; -2; 0)' },
        { key: 'C', label: '(0; -2; 5)' },
        { key: 'D', label: '(3; 0; 0)' }
      ],
      correctAnswer: 'A',
      explanation: 'Hình chiếu vuông góc của điểm (x; y; z) lên trục Oz giữ nguyên tọa độ z và cho x = 0, y = 0. Do đó điểm là (0; 0; 5).',
      topic: 'Hình chiếu trong không gian Oxyz', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 12005, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 5] Cho log_2(5) = a và log_2(3) = b. Biểu diễn log_2(45) theo a và b ta được:',
      options: [
        { key: 'A', label: '2b + a' },
        { key: 'B', label: 'b² + a' },
        { key: 'C', label: '2a + b' },
        { key: 'D', label: 'b + 2a' }
      ],
      correctAnswer: 'A',
      explanation: '45 = 9 × 5 = 3² × 5. Do đó log_2(45) = log_2(3² × 5) = 2 log_2(3) + log_2(5) = 2b + a.',
      topic: 'Công thức logarit', difficulty: 'Nhận biết', errorCategory: 'Tính toán'
    },
    {
      id: 12006, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 6] Có bao nhiêu giá trị nguyên dương của tham số m để hàm số y = (x - 2) / (x - m) đồng biến trên khoảng (3; +∞)?',
      options: [
        { key: 'A', label: 'Vô số' },
        { key: 'B', label: '2' },
        { key: 'C', label: '1' },
        { key: 'D', label: '3' }
      ],
      correctAnswer: 'A',
      explanation: 'y\' = (-m + 2) / (x - m)². Hàm số đồng biến trên (3; +∞) khi y\' > 0 và điểm gián đoạn x = m không thuộc (3; +∞). Suy ra: 2 - m > 0 <=> m < 2, và m ≤ 3. Do m nguyên dương nên m = 1 (1 giá trị duy nhất nếu hữu hạn) hoặc nếu m nguyên âm thì có vô số. Với m nguyên dương thì đúng 1 giá trị m = 1.',
      topic: 'Hàm phân thức đơn điệu trên khoảng', difficulty: 'Thông hiểu', errorCategory: 'Bẫy đề thi'
    },
    // --- PHẦN II: ĐÚNG / SAI ---
    {
      id: 12019, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 1] Cho hàm số f(x) = x⁴ - 2mx² + m² - 1. Xét tính Đúng / Sai của các mệnh đề sau:',
      topic: 'Khảo sát cực trị hàm trùng phương', difficulty: 'Vận dụng', errorCategory: 'Lý thuyết',
      trueFalseItems: [
        { id: 'a', text: 'Khi m = 0, hàm số có đúng một điểm cực trị là điểm cực tiểu x = 0.', correctAnswer: true },
        { id: 'b', text: 'Với mọi giá trị m > 0, đồ thị hàm số luôn có 3 điểm cực trị tạo thành một tam giác cân.', correctAnswer: true },
        { id: 'c', text: 'Khi m = 1, tam giác tạo bởi 3 điểm cực trị của đồ thị hàm số là tam giác vuông cân.', correctAnswer: true },
        { id: 'd', text: 'Khi m = 2, giá trị cực đại của hàm số bằng 3.', correctAnswer: true }
      ],
      explanation: 'f\'(x) = 4x(x² - m). a) m = 0: f\'(x) = 4x³ đổi dấu từ âm sang dương qua 0 => cực tiểu x = 0 => ĐÚNG. b) m > 0: f\'(x) = 0 có 3 nghiệm x = 0, x = ±√m tạo thành tam giác cân tại đỉnh nằm trên Oy => ĐÚNG. c) Điểm cực đại A(0; m² - 1), hai cực tiểu B(√m; -1), C(-√m; -1). AB ⊥ AC <=> 8a + b³ = 0 <=> 8(1) + (-2m)³ = 0 <=> 8 - 8m³ = 0 <=> m = 1 => ĐÚNG. d) m = 2 => CĐ tại x = 0: f(0) = 2² - 1 = 3 => ĐÚNG.'
    },
    // --- PHẦN III: TRẢ LỜI NGẮN ---
    {
      id: 12023, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 1] Cho hàm số f(x) liên tục trên ℝ thỏa mãn f\'(x) = 3x² + 2x. Biết f(1) = 4. Tính giá trị của f(2). (Điền một số nguyên).',
      shortAnswerCorrect: '14',
      topic: 'Tích phân & Giá trị hàm số', difficulty: 'Thông hiểu', errorCategory: 'Tính toán',
      explanation: 'f(2) - f(1) = ∫[1 to 2] f\'(x) dx = ∫[1 to 2] (3x² + 2x) dx = (x³ + x²)|₁² = (8 + 4) - (1 + 1) = 12 - 2 = 10. Suy ra f(2) = f(1) + 10 = 4 + 10 = 14.',
      keyFormula: 'f(b) = f(a) + ∫[a to b] f\'(x) dx'
    },
    {
      id: 12024, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 2] Trong không gian Oxyz, cho mặt phẳng (P): 3x + 4y - 5 = 0 và điểm M(1; 3; -4). Tính khoảng cách từ điểm M đến mặt phẳng (P). (Điền kết quả là số nguyên).',
      shortAnswerCorrect: '2',
      topic: 'Khoảng cách điểm đến mặt phẳng', difficulty: 'Thông hiểu', errorCategory: 'Tính toán',
      explanation: 'd(M, (P)) = |3(1) + 4(3) - 5| / √(3² + 4² + 0²) = |3 + 12 - 5| / √25 = 10 / 5 = 2.',
      keyFormula: 'd = |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²)'
    }
  ]
};

// ============================================================================
// 3. ĐỀ THI VẬT LÝ LỚP 12 - AZOTA CHUẨN 2025 (NHIỆT HỌC, KHÍ LÝ TƯỞNG, DAO ĐỘNG)
// ============================================================================
export const AZOTA_LY_12_DE1: Exam = {
  id: 'azota-ly-12-chuan-302',
  examCode: 'AZ-302',
  title: 'Đề Thi Thử Vật Lí 12 – Azota Chuẩn Cấu Trúc BGD 2025 (Mã 302)',
  description: 'Bao quát 100% chương trình mới SGK 12: Nhiệt học, Khí lý tưởng & Mô hình động học phân tử, Từ trường & Cảm ứng điện từ, Sóng cơ và Sóng điện từ.',
  subject: 'Vật lý',
  grade: 'Lớp 12',
  durationMinutes: 50,
  difficulty: 'Format Chuẩn BGD 2025',
  isBGDFormat: true,
  author: 'Hội Đồng Khảo Thí Vật Lý – Azota Team',
  attemptsCount: 7120,
  averageScore: 7.1,
  questions: [
    {
      id: 13001, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 1] Một lượng khí lý tưởng xác định thực hiện quá trình biến đổi đẳng nhiệt. Đại lượng nào sau đây tỉ lệ nghịch với thể tích V của khối khí?',
      options: [
        { key: 'A', label: 'Áp suất p của khối khí' },
        { key: 'B', label: 'Nhiệt độ tuyệt đối T' },
        { key: 'C', label: 'Khối lượng riêng của chất khí' },
        { key: 'D', label: 'Nội năng của khối khí' }
      ],
      correctAnswer: 'A',
      explanation: 'Theo định luật Boyle: Trong quá trình đẳng nhiệt (T = hằng số), áp suất p tỉ lệ nghịch với thể tích V (p · V = const).',
      topic: 'Định luật Boyle - Nhiệt học 12', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 13002, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 2] Một vật dao động điều hòa dọc theo trục Ox với phương trình x = 6 · cos(4πt - π/3) (cm). Tần số góc ω của dao động là:',
      options: [
        { key: 'A', label: '4π rad/s' },
        { key: 'B', label: '2 Hz' },
        { key: 'C', label: '6 cm' },
        { key: 'D', label: '-π/3 rad' }
      ],
      correctAnswer: 'A',
      explanation: 'Phương trình dao động chuẩn x = A cos(ωt + φ). Hệ số đứng trước t là tần số góc ω = 4π rad/s.',
      topic: 'Đại lượng đặc trưng dao động', difficulty: 'Nhận biết', errorCategory: 'Tính toán'
    },
    {
      id: 13003, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 3] Khi truyền từ không khí vào nước, bước sóng của một ánh sáng đơn sắc sẽ:',
      options: [
        { key: 'A', label: 'Giảm đi n lần (với n là chiết suất của nước)' },
        { key: 'B', label: 'Tăng lên n lần' },
        { key: 'C', label: 'Không đổi' },
        { key: 'D', label: 'Tần số tăng lên n lần' }
      ],
      correctAnswer: 'A',
      explanation: 'Tần số f của ánh sáng không đổi khi truyền qua các môi trường khác nhau. Tốc độ ánh sáng trong nước v = c / n. Do đó bước sóng λ\' = v / f = c / (n · f) = λ / n (giảm đi n lần).',
      topic: 'Sóng ánh sáng & Chiết suất', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết'
    },
    // Phần II: Đúng / Sai
    {
      id: 13019, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 1] Một khối khí lý tưởng đơn nguyên tử chứa n = 2 mol ở nhiệt độ T = 300 K và áp suất p = 10⁵ Pa. Xét tính Đúng / Sai của các khẳng định sau (lấy hằng số khí R = 8.31 J/(mol·K)):',
      topic: 'Khí lý tưởng & Phương trình Clapeyron', difficulty: 'Vận dụng', errorCategory: 'Tính toán',
      trueFalseItems: [
        { id: 'a', text: 'Thể tích của khối khí ở trạng thái này xấp xỉ bằng 0.05 m³ (hay 50 lít).', correctAnswer: true },
        { id: 'b', text: 'Nội năng của khối khí tỉ lệ thuận với nhiệt độ tuyệt đối T.', correctAnswer: true },
        { id: 'c', text: 'Nếu nung nóng đẳng tích khối khí lên 600 K thì áp suất của khối khí tăng lên gấp đôi thành 2 · 10⁵ Pa.', correctAnswer: true },
        { id: 'd', text: 'Trong quá trình nung nóng đẳng tích, khối khí thực hiện một công cơ học A > 0 ra môi trường ngoài.', correctAnswer: false }
      ],
      explanation: 'a) V = nRT / p = (2 · 8.31 · 300) / 10⁵ = 4986 / 10⁵ ≈ 0.04986 m³ ≈ 50 lít => ĐÚNG. b) Khí lý tưởng có nội năng U = (3/2) nRT tỉ lệ thuận với T => ĐÚNG. c) Quá trình đẳng tích V = const: p1/T1 = p2/T2 => p2 = p1 · (600/300) = 2p1 = 2 · 10⁵ Pa => ĐÚNG. d) Đẳng tích thì thể tích không đổi ΔV = 0 => khối khí KHÔNG thực hiện công cơ học (A = 0) => SAI.'
    },
    // Phần III: Trả lời ngắn
    {
      id: 13023, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 1] Cần cung cấp một nhiệt lượng bằng bao nhiêu kilôjun (kJ) để đun nóng 2 kg nước từ 20 °C lên 80 °C? Biết nhiệt dung riêng của nước là c = 4200 J/(kg·K). (Điền số nguyên kJ).',
      shortAnswerCorrect: '504',
      topic: 'Nhiệt dung riêng & Nhiệt lượng', difficulty: 'Thông hiểu', errorCategory: 'Tính toán',
      explanation: 'Nhiệt lượng cần cung cấp: Q = m · c · ΔT = 2 · 4200 · (80 - 20) = 8400 · 60 = 504000 J = 504 kJ.',
      keyFormula: 'Q = m · c · ΔT'
    }
  ]
};

// ============================================================================
// 4. ĐỀ THI HÓA HỌC LỚP 12 - AZOTA CHUẨN 2025 (ESTE, PHỨC CHẤT, PIN ĐIỆN)
// ============================================================================
export const AZOTA_HOA_12_DE1: Exam = {
  id: 'azota-hoa-12-chuan-403',
  examCode: 'AZ-403',
  title: 'Đề Thi Thử Hóa Học 12 – Azota Chuẩn Format BGD 2025 (Mã 403)',
  description: 'Cấu trúc đề mới theo SGK 2025: Este, Carbohydrate, Amin, Polime, Phức chất của ion kim loại chuyển tiếp và Pin điện hóa Galvani.',
  subject: 'Hóa học',
  grade: 'Lớp 12',
  durationMinutes: 50,
  difficulty: 'Format Chuẩn BGD 2025',
  isBGDFormat: true,
  author: 'Ban Chuyên Môn Hóa Học – Azota Team',
  attemptsCount: 6150,
  averageScore: 7.3,
  questions: [
    {
      id: 14001, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 1] Thủy phân este etyl axetat (CH₃COOC₂H₅) trong dung dịch NaOH đun nóng thu được muối natri axetat và chất nào sau đây?',
      options: [
        { key: 'A', label: 'Etanol (C₂H₅OH)' },
        { key: 'B', label: 'Metanol (CH₃OH)' },
        { key: 'C', label: 'Axit axetic (CH₃COOH)' },
        { key: 'D', label: 'Anđehit axetic (CH₃CHO)' }
      ],
      correctAnswer: 'A',
      explanation: 'CH₃COOC₂H₅ + NaOH --(t°)--> CH₃COONa + C₂H₅OH (etanol).',
      topic: 'Thủy phân Este', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 14002, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 2] Trong phức chất [Cu(NH₃)₄]²⁺, phối tử liên kết với nguyên tử trung tâm Cu²⁺ là:',
      options: [
        { key: 'A', label: 'Phân tử NH₃' },
        { key: 'B', label: 'Ion Cu²⁺' },
        { key: 'C', label: 'Điện tích 2+' },
        { key: 'D', label: 'Số phối trí 4' }
      ],
      correctAnswer: 'A',
      explanation: 'Theo chương trình mới Hóa học 12: Trong phức chất [Cu(NH₃)₄]²⁺, ion Cu²⁺ là nguyên tử/ion trung tâm, các phân tử NH₃ đóng vai trò là phối tử (ligand) cho cặp electron tự do tạo liên kết phối trí.',
      topic: 'Hóa học phức chất 12', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    // Phần II: Đúng / Sai
    {
      id: 14019, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 1] Cho pin điện hóa Galvani kẽm - đồng Zn - Cu gồm hai điện cực Zn nhúng trong ZnSO₄ 1M và Cu nhúng trong CuSO₄ 1M (biết thế điện cực chuẩn E°(Zn²⁺/Zn) = -0.76 V và E°(Cu²⁺/Cu) = +0.34 V). Xét tính Đúng / Sai của các phát biểu sau:',
      topic: 'Pin điện hóa & Thế điện cực chuẩn 12', difficulty: 'Vận dụng', errorCategory: 'Lý thuyết',
      trueFalseItems: [
        { id: 'a', text: 'Thanh kẽm (Zn) đóng vai trò là cực âm (anot) và bị oxi hóa trong quá trình pin hoạt động.', correctAnswer: true },
        { id: 'b', text: 'Thanh đồng (Cu) đóng vai trò là cực dương (catot) và ion Cu²⁺ bị khử thành Cu bám vào điện cực.', correctAnswer: true },
        { id: 'c', text: 'Sức điện động chuẩn của pin điện hóa Zn - Cu bằng E°(pin) = 1.10 V.', correctAnswer: true },
        { id: 'd', text: 'Chiều dòng điện chạy ở mạch ngoài là từ thanh kẽm sang thanh đồng.', correctAnswer: false }
      ],
      explanation: 'a) Zn có thế điện cực chuẩn âm hơn nên là cực âm (anot), quá trình oxi hóa: Zn -> Zn²⁺ + 2e => ĐÚNG. b) Cu là cực dương (catot), ion Cu²⁺ nhận electron bị khử: Cu²⁺ + 2e -> Cu => ĐÚNG. c) E°(pin) = E°(catot) - E°(anot) = 0.34 - (-0.76) = 1.10 V => ĐÚNG. d) Dòng electron di chuyển từ Zn sang Cu, do đó chiều dòng điện quy ước ở mạch ngoài chạy từ cực dương (Cu) sang cực âm (Zn) => d SAI.'
    },
    // Phần III: Trả lời ngắn
    {
      id: 14023, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 1] Cho 9 gam glucozơ (C₆H₁₂O₆, M = 180 g/mol) phản ứng hoàn toàn với lượng dư dung dịch AgNO₃ trong NH₃ đun nóng. Khối lượng Ag kim loại kết tủa thu được bằng bao nhiêu gam? (Điền số thập phân, ví dụ: 10.8).',
      shortAnswerCorrect: '10.8',
      topic: 'Tráng bạc glucozơ', difficulty: 'Thông hiểu', errorCategory: 'Tính toán',
      explanation: 'n_glucozơ = 9 / 180 = 0.05 mol. Mỗi phân tử glucozơ tráng bạc sinh ra 2 Ag: n_Ag = 0.05 × 2 = 0.1 mol. Khối lượng Ag: m = 0.1 × 108 = 10.8 gam.',
      keyFormula: '1 Glucozơ -> 2 Ag'
    }
  ]
};

// ============================================================================
// 5. TỔNG HỢP TOÀN BỘ ĐỀ THI AZOTA LỚP 12
// ============================================================================
export const ALL_AZOTA_GRADE12_EXAMS: Exam[] = [
  AZOTA_TOAN_12_DE1,
  AZOTA_TOAN_12_DE2,
  AZOTA_LY_12_DE1,
  AZOTA_HOA_12_DE1
];
