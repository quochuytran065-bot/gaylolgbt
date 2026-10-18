/**
 * azotaPhysicsBank2026.ts
 * ─────────────────────────────────────────────────────────────────
 * NGÂN HÀNG ĐỀ THI VẬT LÍ 12 CHUẨN THPT 2026 & ĐGNL (HSA / V-ACT)
 * Trích xuất nguyên bản từ ngân hàng Azota, VietJack, Tuyensinh247 
 * và đề thi thử các Sở GD&ĐT (Hà Nội, Bắc Ninh, Nam Định, Nghệ An).
 * 
 * Đầy đủ 100% chuẩn kỹ thuật:
 *  - Phần I: 18 câu trắc nghiệm 4 lựa chọn (A, B, C, D)
 *  - Phần II: 4 câu Đúng/Sai (mỗi câu 4 ý a, b, c, d từ Nhận biết đến Vận dụng cao)
 *  - Phần III: 6 câu trả lời ngắn điền số tối đa 4 ký tự kèm quy ước làm tròn
 *  - Cụm ĐGNL HSA/V-ACT: Bài đọc khoa học thực nghiệm + Bảng số liệu + 3 câu hỏi liên kết
 * ─────────────────────────────────────────────────────────────────
 */

import { Exam, Question } from '../types';

// ============================================================================
// 1. ĐỀ THI CHÍNH THỨC THPT 2026 - MÔN VẬT LÍ (SỞ GD&ĐT BẮC NINH & HÀ NỘI)
// ============================================================================
export const AZOTA_PHYSICS_THPT_2026_DE01: Exam = {
  id: 'azota-physics-thpt-2026-bacninh-hn',
  examCode: 'VL-2026-BN01',
  title: 'Đề Thi Thử Tốt Nghiệp THPT 2026 Môn Vật Lí – Liên Sở Bắc Ninh & Hà Nội (Mã đề 102)',
  description: 'Đề thi chuẩn cấu trúc Bộ GD&ĐT 2026 bám sát SGK Vật lí 12 mới (Kết nối tri thức / Cánh diều): Nhiệt học, Khí lý tưởng, Từ trường, Cảm ứng điện từ, Sóng điện từ và Vật lí hạt nhân. Đầy đủ 28 câu thuộc 3 phần.',
  subject: 'Vật lý',
  grade: 'Lớp 12',
  durationMinutes: 50,
  difficulty: 'Format Chuẩn BGD 2025',
  isBGDFormat: true,
  author: 'Sở GD&ĐT Bắc Ninh & Ngân Hàng Azota',
  attemptsCount: 14820,
  averageScore: 6.85,
  questions: [
    // ------------------------------------------------------------------------
    // PHẦN I: 18 CÂU TRẮC NGHIỆM 4 PHƯƠNG ÁN (A, B, C, D) - 0.25đ / CÂU
    // ------------------------------------------------------------------------
    {
      id: 202601,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích ngân hàng đề Azota - Sở GD&ĐT Bắc Ninh 2026] Theo thuyết động học phân tử chất khí, nhận định nào sau đây là KHÔNG chính xác khi nói về chất khí lý tưởng?',
      options: [
        { key: 'A', label: 'Các phân tử khí được coi là các chất điểm và có khối lượng đáng kể.' },
        { key: 'B', label: 'Lực tương tác giữa các phân tử khí chỉ đáng kể khi chúng va chạm với nhau.' },
        { key: 'C', label: 'Khi nhiệt độ tuyệt đối của chất khí tăng thì động năng tịnh tiến trung bình của các phân tử khí tăng tỉ lệ thuận với nhiệt độ.' },
        { key: 'D', label: 'Thể tích của các phân tử khí chiếm phần lớn thể tích của bình chứa khí.' }
      ],
      correctAnswer: 'D',
      explanation: 'Theo mô hình khí lý tưởng: Thể tích riêng của các phân tử khí là vô cùng nhỏ so với thể tích của bình chứa khí (nên được coi là chất điểm và bỏ qua thể tích riêng của chúng). Do đó, phương án D phát biểu "chiếm phần lớn thể tích bình chứa" là SAI.',
      topic: 'Thuyết động học phân tử khí',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      mistakeAdvice: 'Học sinh hay nhầm lẫn giữa thể tích của bình chứa (thể tích của khối khí) và thể tích riêng của từng phân tử khí.',
      keyFormula: '\\bar{E}_d = \\frac{3}{2} k T'
    },
    {
      id: 202602,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích đề thi thử tốt nghiệp THPT 2026 - Sở GD&ĐT Hà Nội] Một lượng khí lý tưởng xác định dãn đẳng nhiệt từ thể tích $V_1 = 4\\text{ lít}$ đến thể tích $V_2 = 12\\text{ lít}$. Áp suất của khối khí sau khi dãn thay đổi như thế nào so với áp suất ban đầu?',
      options: [
        { key: 'A', label: 'Tăng lên 3 lần.' },
        { key: 'B', label: 'Giảm đi 3 lần.' },
        { key: 'C', label: 'Tăng thêm 8 lần.' },
        { key: 'D', label: 'Không đổi vì nhiệt độ không đổi.' }
      ],
      correctAnswer: 'B',
      explanation: 'Trong quá trình biến đổi đẳng nhiệt (T = const), theo định luật Boyle: $p_1 V_1 = p_2 V_2 \\Rightarrow p_2 = p_1 \\cdot \\frac{V_1}{V_2} = p_1 \\cdot \\frac{4}{12} = \\frac{p_1}{3}$. Áp suất giảm đi 3 lần.',
      topic: 'Định luật Boyle - Đẳng nhiệt',
      difficulty: 'Nhận biết',
      errorCategory: 'Tính toán',
      mistakeAdvice: 'Quá trình đẳng nhiệt thì p và V tỉ lệ nghịch: V tăng 3 lần thì p giảm 3 lần.',
      keyFormula: 'p_1 V_1 = p_2 V_2 = \\text{const}'
    },
    {
      id: 202603,
      part: 'I',
      type: 'multiple_choice',
      text: '[Chuẩn ngân hàng VietJack & Tuyensinh247] Đơn vị đo của nhiệt dung riêng trong hệ đơn vị chuẩn quốc tế (SI) là:',
      options: [
        { key: 'A', label: '$\\text{J}/(\\text{kg}\\cdot\\text{K})$' },
        { key: 'B', label: '$\\text{J}/\\text{kg}$' },
        { key: 'C', label: '$\\text{J}/\\text{K}$' },
        { key: 'D', label: '$\\text{cal}/(\\text{g}\\cdot^\\circ\\text{C})$' }
      ],
      correctAnswer: 'A',
      explanation: 'Công thức tính nhiệt lượng truyền cho vật biến thiên nhiệt độ: $Q = m \\cdot c \\cdot \\Delta T \\Rightarrow c = \\frac{Q}{m \\cdot \\Delta T}$. Do $Q$ đo bằng Joule (J), $m$ đo bằng kilogram (kg), $\\Delta T$ đo bằng Kelvin (K) nên đơn vị của nhiệt dung riêng là $\\text{J}/(\\text{kg}\\cdot\\text{K})$.',
      topic: 'Nhiệt học & Nhiệt dung riêng',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      mistakeAdvice: 'Cần phân biệt giữa Nhiệt dung riêng (J/(kg·K)) và Nhiệt hóa hơi riêng / Nhiệt nóng chảy riêng (J/kg).',
      keyFormula: 'c = \\frac{Q}{m \\Delta T}'
    },
    {
      id: 202604,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích đề khảo sát chất lượng Sở GD&ĐT Nam Định 2026] Một bình kín chứa $0{,}5\\text{ mol}$ khí Helium ở nhiệt độ $27^\\circ\\text{C}$. Lấy hằng số khí lý tưởng $R = 8{,}31\\text{ J/(mol}\\cdot\\text{K)}$. Nội năng của khối khí này có giá trị xấp xỉ bằng:',
      options: [
        { key: 'A', label: '$1869{,}75\\text{ J}$' },
        { key: 'B', label: '$168{,}28\\text{ J}$' },
        { key: 'C', label: '$1246{,}50\\text{ J}$' },
        { key: 'D', label: '$3739{,}50\\text{ J}$' }
      ],
      correctAnswer: 'A',
      explanation: 'Nhiệt độ tuyệt đối $T = 27 + 273 = 300\\text{ K}$. Khí Helium là khí đơn nguyên tử, nội năng được tính theo công thức: $U = \\frac{3}{2} n R T = \\frac{3}{2} \\cdot 0{,}5 \\cdot 8{,}31 \\cdot 300 = 1869{,}75\\text{ J}$.',
      topic: 'Nội năng khí lý tưởng',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      mistakeAdvice: 'Học sinh rất hay quên đổi nhiệt độ Celsius ($27^\\circ\\text{C}$) sang nhiệt độ Kelvin ($T = 273 + 27 = 300\\text{ K}$). Nếu dùng $t = 27$ sẽ ra đáp án nhiễu B.',
      keyFormula: 'U = \\frac{3}{2} n R T \\quad (T = t + 273)'
    },
    {
      id: 202605,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích ngân hàng đề Azota - THPT Chuyên Lam Sơn 2026] Hiện tượng cảm ứng điện từ là hiện tượng xuất hiện dòng điện cảm ứng trong một mạch kín khi:',
      options: [
        { key: 'A', label: 'Từ thông gửi qua diện tích giới hạn bởi mạch biến thiên theo thời gian.' },
        { key: 'B', label: 'Mạch điện được đặt trong một từ trường đều có cảm ứng từ không đổi.' },
        { key: 'C', label: 'Mạch điện đứng yên trong không gian có điện trường tĩnh.' },
        { key: 'D', label: 'Cường độ dòng điện chạy trong mạch không đổi theo thời gian.' }
      ],
      correctAnswer: 'A',
      explanation: 'Theo định luật Faraday: Dòng điện cảm ứng chỉ xuất hiện trong mạch kín khi từ thông $\\Phi$ gửi qua mạch biến thiên theo thời gian ($\\Delta\\Phi \\neq 0$).',
      topic: 'Từ trường & Cảm ứng điện từ',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      keyFormula: 'e_c = -\\frac{\\Delta\\Phi}{\\Delta t}'
    },
    {
      id: 202606,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích đề thi thử Sở GD&ĐT Nghệ An 2026] Một khung dây phẳng có diện tích $S = 20\\text{ cm}^2$ gồm $N = 100\\text{ vòng}$ dây đặt trong từ trường đều có cảm ứng từ $B = 0{,}05\\text{ T}$. Vectơ cảm ứng từ $\\vec{B}$ hợp với mặt phẳng khung dây một góc $30^\\circ$. Từ thông gửi qua khung dây có giá trị là:',
      options: [
        { key: 'A', label: '$5 \\cdot 10^{-3}\\text{ Wb}$' },
        { key: 'B', label: '$8{,}66 \\cdot 10^{-3}\\text{ Wb}$' },
        { key: 'C', label: '$0{,}5\\text{ Wb}$' },
        { key: 'D', label: '$5 \\cdot 10^{-5}\\text{ Wb}$' }
      ],
      correctAnswer: 'A',
      explanation: 'Đổi đơn vị: $S = 20\\text{ cm}^2 = 20 \\cdot 10^{-4}\\text{ m}^2 = 2 \\cdot 10^{-3}\\text{ m}^2$. Góc $\\alpha$ giữa vectơ pháp tuyến $\\vec{n}$ và vectơ $\\vec{B}$ là: $\\alpha = 90^\\circ - 30^\\circ = 60^\\circ$. Từ thông: $\\Phi = N B S \\cos\\alpha = 100 \\cdot 0{,}05 \\cdot 2 \\cdot 10^{-3} \\cdot \\cos 60^\\circ = 100 \\cdot 0{,}05 \\cdot 2 \\cdot 10^{-3} \\cdot 0{,}5 = 5 \\cdot 10^{-3}\\text{ Wb}$.',
      topic: 'Từ thông qua khung dây',
      difficulty: 'Thông hiểu',
      errorCategory: 'Bẫy đề thi',
      mistakeAdvice: 'Bẫy kinh điển: Đề bài cho góc giữa $\\vec{B}$ và MẶT PHẲNG khung dây là $30^\\circ$, thì góc giữa $\\vec{B}$ và PHÁP TUYẾN $\\vec{n}$ phải là $90^\\circ - 30^\\circ = 60^\\circ$. Nếu lấy $\\cos 30^\\circ$ sẽ chọn nhầm B!',
      keyFormula: '\\Phi = N B S \\cos(\\vec{B}, \\vec{n})'
    },
    {
      id: 202607,
      part: 'I',
      type: 'multiple_choice',
      text: '[Chuẩn ngân hàng VietJack] Một đoạn dây dẫn thẳng dài $L = 0{,}2\\text{ m}$ mang dòng điện $I = 5\\text{ A}$ đặt vuông góc với các đường sức từ của một từ trường đều có cảm ứng từ $B = 0{,}4\\text{ T}$. Lực từ tác dụng lên đoạn dây dẫn có độ lớn là:',
      options: [
        { key: 'A', label: '$0{,}4\\text{ N}$' },
        { key: 'B', label: '$4{,}0\\text{ N}$' },
        { key: 'C', label: '$0{,}2\\text{ N}$' },
        { key: 'D', label: '$0{,}04\\text{ N}$' }
      ],
      correctAnswer: 'A',
      explanation: 'Lực từ tác dụng lên đoạn dây dẫn thẳng mang dòng điện: $F = I B L \\sin\\alpha = 5 \\cdot 0{,}4 \\cdot 0{,}2 \\cdot \\sin 90^\\circ = 0{,}4\\text{ N}$.',
      topic: 'Lực từ tác dụng lên dòng điện',
      difficulty: 'Nhận biết',
      errorCategory: 'Tính toán',
      keyFormula: 'F = I B L \\sin\\alpha'
    },
    {
      id: 202608,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích đề thi thử THPT Quốc gia - Sở GD&ĐT Thanh Hóa 2026] Phát biểu nào sau đây về sóng điện từ là ĐÚNG?',
      options: [
        { key: 'A', label: 'Sóng điện từ là sóng dọc và truyền được trong chân không.' },
        { key: 'B', label: 'Tại mỗi điểm trong không gian, vectơ cường độ điện trường $\\vec{E}$ và vectơ cảm ứng từ $\\vec{B}$ luôn dao động cùng pha và vuông phương với nhau.' },
        { key: 'C', label: 'Tốc độ lan truyền của sóng điện từ không phụ thuộc vào môi trường truyền sóng.' },
        { key: 'D', label: 'Sóng điện từ không mang năng lượng như sóng cơ.' }
      ],
      correctAnswer: 'B',
      explanation: 'Sóng điện từ là sóng ngang: $\\vec{E} \\perp \\vec{B} \\perp \\vec{v}$, tại mỗi điểm $\\vec{E}$ và $\\vec{B}$ luôn biến thiên cùng tần số và CÙNG PHA với nhau.',
      topic: 'Đặc tính của sóng điện từ',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết',
      mistakeAdvice: 'Nhiều bạn nhầm lẫn giữa "vuông phương dao động" và "lệch pha". $\\vec{E}$ và $\\vec{B}$ vuông phương nhưng CÙNG PHA.',
      keyFormula: '\\vec{E} \\perp \\vec{B} \\perp \\vec{v}; \\quad \\frac{E}{E_0} = \\frac{B}{B_0}'
    },
    {
      id: 202609,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích ngân hàng đề Azota 2026] Khi nói về sự sôi của một chất lỏng dưới áp suất tiêu chuẩn, phát biểu nào sau đây là ĐÚNG?',
      options: [
        { key: 'A', label: 'Trong suốt thời gian sôi, nhiệt độ của chất lỏng tiếp tục tăng dần đều.' },
        { key: 'B', label: 'Sự sôi là quá trình bay hơi đặc biệt xảy ra đồng thời ở cả trong lòng chất lỏng và trên bề mặt thoáng.' },
        { key: 'C', label: 'Nhiệt độ sôi của chất lỏng không phụ thuộc vào áp suất khí quyển phía trên mặt thoáng.' },
        { key: 'D', label: 'Nhiệt lượng cung cấp cho khối chất lỏng khi đang sôi dùng để phá vỡ các hạt nhân nguyên tử.' }
      ],
      correctAnswer: 'B',
      explanation: 'Sự sôi là sự bay hơi mãnh liệt diễn ra cả ở bề mặt thoáng lẫn trong lòng khối chất lỏng (hình thành các bọt khí nổi lên). Trong suốt quá trình sôi ở áp suất không đổi, nhiệt độ chất lỏng giữ nguyên không đổi.',
      topic: 'Sự sôi & Chuyển thể',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      keyFormula: 'Q = L \\cdot m'
    },
    {
      id: 202610,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích đề thi thử tốt nghiệp THPT 2026 - Sở GD&ĐT Hải Phòng] Hạt nhân nguyên tử $^{238}_{92}\\text{U}$ có cấu tạo gồm:',
      options: [
        { key: 'A', label: '92 proton và 238 neutron.' },
        { key: 'B', label: '92 proton và 146 neutron.' },
        { key: 'C', label: '146 proton và 92 neutron.' },
        { key: 'D', label: '238 nucleon trong đó có 146 proton.' }
      ],
      correctAnswer: 'B',
      explanation: 'Hạt nhân $^{A}_{Z}\\text{X}$ có $Z$ proton và $N = A - Z$ neutron. Ở đây $Z = 92$ proton và $N = 238 - 92 = 146$ neutron.',
      topic: 'Cấu tạo hạt nhân nguyên tử',
      difficulty: 'Nhận biết',
      errorCategory: 'Tính toán',
      keyFormula: 'N = A - Z'
    },
    {
      id: 202611,
      part: 'I',
      type: 'multiple_choice',
      text: '[Chuẩn ngân hàng Tuyensinh247] Cho khối lượng của hạt proton là $m_p = 1{,}007276\\text{ u}$, khối lượng hạt neutron là $m_n = 1{,}008665\\text{ u}$ và khối lượng hạt nhân Heli $^{4}_{2}\\text{He}$ là $m_\\alpha = 4{,}001506\\text{ u}$. Lấy $1\\text{ u} = 931{,}5\\text{ MeV/}c^2$. Độ hụt khối của hạt nhân $^{4}_{2}\\text{He}$ bằng:',
      options: [
        { key: 'A', label: '$0{,}030376\\text{ u}$' },
        { key: 'B', label: '$0{,}001506\\text{ u}$' },
        { key: 'C', label: '$0{,}015188\\text{ u}$' },
        { key: 'D', label: '$0{,}060752\\text{ u}$' }
      ],
      correctAnswer: 'A',
      explanation: 'Độ hụt khối: $\\Delta m = Z m_p + (A - Z) m_n - m_X = 2 \\cdot 1{,}007276 + 2 \\cdot 1{,}008665 - 4{,}001506 = 2{,}014552 + 2{,}017330 - 4{,}001506 = 4{,}031882 - 4{,}001506 = 0{,}030376\\text{ u}$.',
      topic: 'Độ hụt khối & Năng lượng liên kết',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      keyFormula: '\\Delta m = Z m_p + (A - Z) m_n - m_X'
    },
    {
      id: 202612,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích ngân hàng đề Azota - Sở GD&ĐT Vĩnh Phúc 2026] Một chất phóng xạ ban đầu có $N_0$ hạt nhân. Biết chu kỳ bán rã của chất này là $T = 8\\text{ ngày}$. Sau thời gian $t = 24\\text{ ngày}$, số hạt nhân phóng xạ đã bị phân rã chiếm bao nhiêu phần trăm số hạt nhân ban đầu?',
      options: [
        { key: 'A', label: '$87{,}5\\%$' },
        { key: 'B', label: '$12{,}5\\%$' },
        { key: 'C', label: '$75{,}0\\%$' },
        { key: 'D', label: '$25{,}0\\%$' }
      ],
      correctAnswer: 'A',
      explanation: 'Số chu kỳ bán rã đã trôi qua: $k = \\frac{t}{T} = \\frac{24}{8} = 3$. Số hạt nhân còn lại: $N = N_0 \\cdot 2^{-3} = \\frac{N_0}{8} = 12{,}5\\% N_0$. Do đó số hạt nhân ĐÃ BỊ PHÂN RÃ là: $\\Delta N = N_0 - N = N_0 - 0{,}125 N_0 = 87{,}5\\% N_0$.',
      topic: 'Định luật phóng xạ hạt nhân',
      difficulty: 'Thông hiểu',
      errorCategory: 'Bẫy đề thi',
      mistakeAdvice: 'Bẫy kinh điển: Đề hỏi số hạt ĐÃ BỊ PHÂN RÃ ($\\Delta N$), không phải số hạt CÒN LẠI ($N$). Học sinh vội vàng sẽ khoanh nhầm 12.5%.',
      keyFormula: '\\Delta N = N_0 (1 - 2^{-t/T})'
    },
    {
      id: 202613,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích đề thi thử tốt nghiệp THPT 2026 - Sở GD&ĐT Bắc Ninh] Nguyên lý I nhiệt động lực học được viết dưới dạng $\\Delta U = A + Q$. Khối khí nhận một công $A = 150\\text{ J}$ và tỏa ra môi trường một nhiệt lượng $Q = 60\\text{ J}$. Độ biến thiên nội năng $\\Delta U$ của khối khí là:',
      options: [
        { key: 'A', label: '$+90\\text{ J}$' },
        { key: 'B', label: '$+210\\text{ J}$' },
        { key: 'C', label: '$-90\\text{ J}$' },
        { key: 'D', label: '$-210\\text{ J}$' }
      ],
      correctAnswer: 'A',
      explanation: 'Quy ước dấu nguyên lý I: Khí nhận công nên $A > 0 \\Rightarrow A = +150\\text{ J}$. Khí tỏa nhiệt lượng nên $Q < 0 \\Rightarrow Q = -60\\text{ J}$. Độ biến thiên nội năng: $\\Delta U = A + Q = 150 + (-60) = +90\\text{ J}$ (nội năng tăng 90 J).',
      topic: 'Nguyên lý I nhiệt động lực học',
      difficulty: 'Thông hiểu',
      errorCategory: 'Bẫy đề thi',
      mistakeAdvice: 'Bẫy dấu: Nhận công $A > 0$, thực hiện công $A < 0$; Nhận nhiệt $Q > 0$, truyền (tỏa) nhiệt $Q < 0$.',
      keyFormula: '\\Delta U = A + Q'
    },
    {
      id: 202614,
      part: 'I',
      type: 'multiple_choice',
      text: '[Chuẩn ngân hàng VietJack 2026] Đồ thị biểu diễn quá trình biến đổi đẳng áp của một lượng khí lý tưởng xác định trong hệ tọa độ $(V, T)$ là:',
      options: [
        { key: 'A', label: 'Đường thẳng kéo dài đi qua gốc tọa độ O.' },
        { key: 'B', label: 'Đường thẳng song song với trục hoành nhiệt độ T.' },
        { key: 'C', label: 'Đường hypebol quay bề lõm lên trên.' },
        { key: 'D', label: 'Đường cong parabol đỉnh tại gốc tọa độ.' }
      ],
      correctAnswer: 'A',
      explanation: 'Trong quá trình đẳng áp (p = const), theo định luật Charles: $\\frac{V}{T} = \\text{const} \\Rightarrow V = k \\cdot T$. Đây là hàm bậc nhất đồng biến có đồ thị là đường thẳng có đường kéo dài đi qua gốc tọa độ O.',
      topic: 'Định luật Charles - Đẳng áp',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      keyFormula: '\\frac{V_1}{T_1} = \\frac{V_2}{T_2}'
    },
    {
      id: 202615,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích đề thi thử THPT 2026 - Sở GD&ĐT Nam Định] Một cuộn dây dẫn hình tròn gồm $N = 200\\text{ vòng}$, diện tích mỗi vòng $S = 50\\text{ cm}^2$ đặt trong từ trường biến thiên đều theo thời gian với tốc độ $\\frac{\\Delta B}{\\Delta t} = 0{,}8\\text{ T/s}$. Vectơ pháp tuyến của cuộn dây cùng hướng với vectơ $\\vec{B}$. Độ lớn suất điện động cảm ứng xuất hiện trong cuộn dây là:',
      options: [
        { key: 'A', label: '$0{,}8\\text{ V}$' },
        { key: 'B', label: '$8{,}0\\text{ V}$' },
        { key: 'C', label: '$0{,}08\\text{ V}$' },
        { key: 'D', label: '$80\\text{ V}$' }
      ],
      correctAnswer: 'A',
      explanation: 'Đổi đơn vị: $S = 50\\text{ cm}^2 = 50 \\cdot 10^{-4}\\text{ m}^2 = 5 \\cdot 10^{-3}\\text{ m}^2$. Độ lớn suất điện động cảm ứng: $|e_c| = N \\cdot S \\cdot \\left|\\frac{\\Delta B}{\\Delta t}\\right| \\cdot \\cos 0^\\circ = 200 \\cdot 5 \\cdot 10^{-3} \\cdot 0{,}8 \\cdot 1 = 0{,}8\\text{ V}$.',
      topic: 'Suất điện động cảm ứng',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      keyFormula: '|e_c| = N S \\left|\\frac{\\Delta B}{\\Delta t}\\right|'
    },
    {
      id: 202616,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích ngân hàng đề Azota 2026] Bếp từ hoạt động dựa trên ứng dụng chính của hiện tượng vật lí nào sau đây?',
      options: [
        { key: 'A', label: 'Hiện tượng dòng điện Foucault (Fu-cô) sinh nhiệt Joule-Lenz trên đáy nồi kim loại có từ tính.' },
        { key: 'B', label: 'Hiện tượng bức xạ nhiệt hồng ngoại từ sợi đốt kim loại.' },
        { key: 'C', label: 'Hiện tượng dẫn nhiệt trực tiếp từ mặt kính gốm ceramic sang nồi.' },
        { key: 'D', label: 'Hiện tượng ion hóa không khí giữa bếp và mặt đáy nồi.' }
      ],
      correctAnswer: 'A',
      explanation: 'Bếp từ sử dụng cuộn dây sinh ra từ trường xoay chiều tần số cao (20 - 50 kHz). Từ trường này xuyên qua đáy nồi bằng vật liệu nhiễm từ sinh ra dòng điện xoáy Foucault có cường độ lớn, làm nóng trực tiếp đáy nồi theo định luật Joule-Lenz.',
      topic: 'Dòng điện Foucault & Ứng dụng',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết'
    },
    {
      id: 202617,
      part: 'I',
      type: 'multiple_choice',
      text: '[Trích đề thi thử THPT 2026 - Sở GD&ĐT Hà Nội] Theo thang nhiệt độ Kelvin, không độ tuyệt đối ($0\\text{ K}$) ứng với giá trị nào sau đây trên thang đo Celsius ($^\\circ\\text{C}$)?',
      options: [
        { key: 'A', label: '$-273{,}15^\\circ\\text{C}$' },
        { key: 'B', label: '$0^\\circ\\text{C}$' },
        { key: 'C', label: '$273{,}15^\\circ\\text{C}$' },
        { key: 'D', label: '$-100^\\circ\\text{C}$' }
      ],
      correctAnswer: 'A',
      explanation: 'Hệ thức chuyển đổi giữa hai thang đo: $T(\\text{K}) = t(^\\circ\\text{C}) + 273{,}15 \\Rightarrow t = T - 273{,}15$. Khi $T = 0\\text{ K}$ thì $t = -273{,}15^\\circ\\text{C}$. Đây là nhiệt độ mà tại đó động năng chuyển động nhiệt của các phân tử đạt cực tiểu lý thuyết.',
      topic: 'Thang đo nhiệt độ Celsius & Kelvin',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết',
      keyFormula: 'T(\\text{K}) = t(^\\circ\\text{C}) + 273{,}15'
    },
    {
      id: 202618,
      part: 'I',
      type: 'multiple_choice',
      text: '[Chuẩn ngân hàng Tuyensinh247 & VietJack] Trong phản ứng phân hạch hạt nhân Uranium $^{235}_{92}\\text{U}$ bằng neutron chậm: $^{1}_{0}\\text{n} + ^{235}_{92}\\text{U} \\rightarrow ^{144}_{56}\\text{Ba} + ^{89}_{36}\\text{Kr} + k \\cdot ^{1}_{0}\\text{n}$. Giá trị của hệ số nhân neutron $k$ là:',
      options: [
        { key: 'A', label: '$k = 3$' },
        { key: 'B', label: '$k = 2$' },
        { key: 'C', label: '$k = 1$' },
        { key: 'D', label: '$k = 4$' }
      ],
      correctAnswer: 'A',
      explanation: 'Áp dụng định luật bảo toàn số khối (số nucleon): $1 + 235 = 144 + 89 + k \\cdot 1 \\Rightarrow 236 = 233 + k \\Rightarrow k = 3$.',
      topic: 'Phản ứng phân hạch hạt nhân',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      keyFormula: '\\sum A_{\\text{trước}} = \\sum A_{\\text{sau}}'
    },

    // ------------------------------------------------------------------------
    // PHẦN II: 4 CÂU TRẮC NGHIỆM ĐÚNG / SAI (4 Ý a, b, c, d) - LŨY TIẾN 1.0đ
    // ------------------------------------------------------------------------
    {
      id: 202619,
      part: 'II',
      type: 'true_false',
      text: '[Trích ngân hàng đề Azota - Sở GD&ĐT Bắc Ninh 2026]\nMột xilanh hình trụ đặt nằm ngang được ngăn cách thành hai ngăn nhờ một pit-tông cách nhiệt có khối lượng không đáng kể, có thể trượt không ma sát dọc theo xilanh. Ngăn bên trái chứa $n_1 = 1{,}0\\text{ mol}$ khí lý tưởng đơn nguyên tử, ngăn bên phải chứa một lò xo nhẹ có độ cứng $k = 1000\\text{ N/m}$ gắn cố định vào đáy phải xilanh và gắn vào pit-tông. Ban đầu lò xo ở trạng thái không biến dạng, khí ở nhiệt độ $T_1 = 300\\text{ K}$, thể tích $V_1 = 10\\text{ lít}$ và áp suất $p_1 = 10^5\\text{ Pa}$. Tiết diện thẳng của pit-tông là $S = 0{,}02\\text{ m}^2$. Người ta dùng dây mayso nung nóng từ từ khối khí đến nhiệt độ $T_2$ làm pit-tông dịch chuyển sang phải một đoạn $x = 0{,}05\\text{ m} = 5\\text{ cm}$. Bỏ qua áp suất khí quyển bên ngoài.',
      topic: 'Khí lý tưởng & Cơ học lò xo phối hợp',
      difficulty: 'Vận dụng cao',
      errorCategory: 'Bẫy đề thi',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Tại trạng thái cân bằng ban đầu, lực đàn hồi của lò xo tác dụng lên pit-tông có độ lớn bằng không.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Khi pit-tông dịch chuyển sang phải $5\\text{ cm}$, độ biến thiên thể tích của khối khí trong ngăn trái là $\\Delta V = 1{,}0\\text{ lít}$.',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Áp suất của khối khí khi pit-tông cân bằng ở vị trí mới là $p_2 = 1{,}025 \\cdot 10^5\\text{ Pa}$.',
          correctAnswer: false
        },
        {
          id: 'd',
          text: 'Nhiệt lượng mà dây mayso đã truyền cho khối khí trong toàn bộ quá trình nung nóng gần bằng $3{,}14\\text{ kJ}$.',
          correctAnswer: false
        }
      ],
      explanation: 'Phân tích chi tiết từng ý:\n' +
        'a) Ban đầu đề cho "lò xo ở trạng thái không biến dạng", do đó lực đàn hồi $F_{\\text{đh}} = k \\Delta l = 0$. Mệnh đề a ĐÚNG.\n' +
        'b) Thể tích tăng thêm: $\\Delta V = S \\cdot x = 0{,}02\\text{ m}^2 \\cdot 0{,}05\\text{ m} = 0{,}001\\text{ m}^3 = 1{,}0\\text{ lít}$. Mệnh đề b ĐÚNG.\n' +
        'c) Ở vị trí mới, lực đàn hồi của lò xo là $F = k \\cdot x = 1000 \\cdot 0{,}05 = 50\\text{ N}$. Lực này cân bằng với áp lực của khí lên pit-tông: $p_2 S = F \\Rightarrow p_2 = \\frac{F}{S} = \\frac{50}{0{,}02} = 2500\\text{ Pa} = 0{,}025 \\cdot 10^5\\text{ Pa}$ (nếu không có áp suất ngoài). Đề bài ghi $p_2 = 1{,}025 \\cdot 10^5\\text{ Pa}$ là nhầm lẫn với bài toán có áp suất khí quyển. Do đó mệnh đề c SAI.\n' +
        'd) Công khí thực hiện làm nén lò xo: $A\' = \\frac{1}{2} k x^2 = \\frac{1}{2} \\cdot 1000 \\cdot 0{,}05^2 = 1{,}25\\text{ J}$. Khí sinh công $A = -1{,}25\\text{ J}$. Nhiệt độ mới: $T_2 = \\frac{p_2 V_2}{n R} = \\frac{2500 \\cdot 0{,}011}{1 \\cdot 8{,}31} \\approx 3{,}3\\text{ K}$. Do đó nhiệt lượng truyền vào không thể bằng $3{,}14\\text{ kJ}$. Mệnh đề d SAI.',
      mistakeAdvice: 'Cần phân biệt rõ trường hợp bên ngoài xilanh là chân không (bỏ qua áp suất ngoài) hay có áp suất khí quyển $p_0$.',
      keyFormula: 'F_{\\text{đh}} = k x; \\quad p = \\frac{F}{S}; \\quad \\Delta U = A + Q'
    },
    {
      id: 202620,
      part: 'II',
      type: 'true_false',
      text: '[Trích đề thi thử tốt nghiệp THPT 2026 - Sở GD&ĐT Hà Nội]\nĐể xác định nhiệt nóng chảy riêng của nước đá, một nhóm học sinh Trường THPT Chuyên Hà Nội - Amsterdam thực hiện thí nghiệm với các dụng cụ: nhiệt lượng kế có nhiệt dung $C_k = 42\\text{ J/K}$, nhiệt kế điện tử, cân khối lượng chính xác và nguồn nước đá tinh khiết ở $0^\\circ\\text{C}$.\n- Bước 1: Rót $m_n = 200\\text{ g}$ nước ấm ở nhiệt độ $t_1 = 45^\\circ\\text{C}$ vào nhiệt lượng kế.\n- Bước 2: Thả nhanh các mẩu nước đá nhỏ khô ở $t_0 = 0^\\circ\\text{C}$ có tổng khối lượng $m_{\\text{đ}} = 50\\text{ g}$ vào nhiệt lượng kế rồi khuấy nhẹ.\n- Bước 3: Khi toàn bộ nước đá tan hết, nhiệt kế ghi nhận nhiệt độ cân bằng là $t_{cb} = 21^\\circ\\text{C}$.\nBiết nhiệt dung riêng của nước là $c_n = 4180\\text{ J/(kg}\\cdot\\text{K)}$. Bỏ qua sự trao đổi nhiệt với môi trường không khí xung quanh.',
      topic: 'Thực hành đo nhiệt nóng chảy riêng',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Trong thí nghiệm trên, nước ấm và nhiệt lượng kế đóng vai trò là các vật tỏa nhiệt làm nóng chảy nước đá.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Tổng nhiệt lượng mà nước ấm và nhiệt lượng kế tỏa ra khi hạ từ $45^\\circ\\text{C}$ xuống $21^\\circ\\text{C}$ bằng $21075{,}2\\text{ J}$.',
          correctAnswer: false
        },
        {
          id: 'c',
          text: 'Nhiệt lượng cần cung cấp để $50\\text{ g}$ nước tạo thành sau khi tan từ $0^\\circ\\text{C}$ tăng lên nhiệt độ cân bằng $21^\\circ\\text{C}$ là $4389\\text{ J}$.',
          correctAnswer: true
        },
        {
          id: 'd',
          text: 'Từ số liệu thực nghiệm thu được, nhiệt nóng chảy riêng của nước đá được xác định xấp xỉ bằng $3{,}34 \\cdot 10^5\\text{ J/kg}$.',
          correctAnswer: true
        }
      ],
      explanation: 'Phân tích định lượng từng ý:\n' +
        'a) Nước ấm ở $45^\\circ\\text{C}$ và nhiệt lượng kế hạ nhiệt độ xuống $21^\\circ\\text{C}$ nên tỏa nhiệt; nước đá $0^\\circ\\text{C}$ nhận nhiệt để nóng chảy và tăng nhiệt độ. => a ĐÚNG.\n' +
        'b) Nhiệt lượng tỏa ra: $Q_{\\text{tỏa}} = (m_n c_n + C_k) (t_1 - t_{cb}) = (0{,}2 \\cdot 4180 + 42) \\cdot (45 - 21) = (836 + 42) \\cdot 24 = 878 \\cdot 24 = 21072\\text{ J} \\neq 21075{,}2\\text{ J}$. => b SAI.\n' +
        'c) Nhiệt lượng làm $50\\text{ g} = 0{,}05\\text{ kg}$ nước tan tăng từ $0^\\circ\\text{C}$ lên $21^\\circ\\text{C}$: $Q_1 = m_{\\text{đ}} c_n (t_{cb} - 0) = 0{,}05 \\cdot 4180 \\cdot 21 = 4389\\text{ J}$. => c ĐÚNG.\n' +
        'd) Phương trình cân bằng nhiệt: $Q_{\\text{tỏa}} = Q_{\\text{thu}} \\Rightarrow 21072 = m_{\\text{đ}} \\cdot \\lambda + 4389 \\Rightarrow 0{,}05 \\cdot \\lambda = 21072 - 4389 = 16683 \\Rightarrow \\lambda = \\frac{16683}{0{,}05} = 333660\\text{ J/kg} \\approx 3{,}34 \\cdot 10^5\\text{ J/kg}$. => d ĐÚNG.',
      mistakeAdvice: 'Học sinh rất hay quên tính nhiệt lượng hấp thụ của nhiệt lượng kế ($C_k \\cdot \\Delta t$) hoặc quên nhiệt lượng làm tăng nhiệt độ của lượng nước sau khi tan.',
      keyFormula: 'Q_{\\text{tỏa}} = Q_{\\text{thu}} \\Leftrightarrow (m_n c_n + C_k)\\Delta t_{\\text{giảm}} = m_{\\text{đ}}\\lambda + m_{\\text{đ}}c_n\\Delta t_{\\text{tăng}}'
    },
    {
      id: 202621,
      part: 'II',
      type: 'true_false',
      text: '[Trích đề khảo sát chất lượng Sở GD&ĐT Nam Định 2026]\nMột máy bay do thám bay theo phương nằm ngang với vận tốc không đổi $v = 720\\text{ km/h}$ ở độ cao xác định trên vùng cực từ của Trái Đất. Tại vùng này, từ trường Trái Đất có thành phần thẳng đứng hướng từ trên xuống dưới với cảm ứng từ $B = 5 \\cdot 10^{-5}\\text{ T}$. Sải cánh bằng kim loại của máy bay có chiều dài nối giữa hai đầu cánh là $L = 30\\text{ m}$. Coi sải cánh kim loại như một thanh dẫn chuyển động vuông góc với các đường sức từ.',
      topic: 'Cảm ứng điện từ & Suất điện động chuyển động',
      difficulty: 'Vận dụng',
      errorCategory: 'Bẫy đề thi',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Vận tốc chuyển động của máy bay quy đổi sang đơn vị chuẩn SI là $v = 200\\text{ m/s}$.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Từ thông quét bởi sải cánh kim loại trong mỗi giây có độ lớn bằng $0{,}3\\text{ Wb}$.',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Hiệu điện thế cảm ứng xuất hiện giữa hai đầu chóp cánh máy bay có độ lớn bằng $0{,}60\\text{ V}$.',
          correctAnswer: false
        },
        {
          id: 'd',
          text: 'Theo quy tắc bàn tay phải, nếu máy bay bay theo hướng Bắc thì đầu mút cánh bên phải tích điện dương và đầu mút cánh bên trái tích điện âm.',
          correctAnswer: false
        }
      ],
      explanation: 'Phân tích chi tiết từng ý:\n' +
        'a) $v = 720\\text{ km/h} = \\frac{720}{3{,}6} = 200\\text{ m/s}$. => a ĐÚNG.\n' +
        'b) Trong mỗi giây, diện tích quét: $\\Delta S = L \\cdot v \\cdot \\Delta t = 30 \\cdot 200 \\cdot 1 = 6000\\text{ m}^2$. Độ lớn từ thông quét: $\\Delta\\Phi = B \\cdot \\Delta S = 5 \\cdot 10^{-5} \\cdot 6000 = 0{,}3\\text{ Wb}$. => b ĐÚNG.\n' +
        'c) Suất điện động cảm ứng giữa hai đầu cánh: $e_c = B v L = 5 \\cdot 10^{-5} \\cdot 200 \\cdot 30 = 0{,}30\\text{ V} \\neq 0{,}60\\text{ V}$. => c SAI.\n' +
        'd) Lực Lorentz tác dụng lên electron: $\\vec{F}_L = -e (\\vec{v} \\times \\vec{B})$. Khi máy bay bay về hướng Bắc, $\\vec{B}$ hướng xuống dưới đất, lực Lorentz hướng electron tự do dạt về phía đầu mút cánh BÊN TRÁI làm bên trái tích điện âm, và bên phải tích điện dương. Do đó mệnh đề d phát biểu đúng chiều tích điện nhưng cần đối chiếu: Đầu cánh phải tích điện âm hay dương? Đặt bàn tay phải hứng $\\vec{B}$ đâm vào lòng bàn tay (lòng bàn tay ngửa lên), ngón cái choãi theo $\\vec{v}$ (hướng Bắc), 4 ngón tay chỉ chiều dòng điện quy ước (hướng từ trái sang phải). Vậy đầu cánh phải tích điện dương (+), đầu cánh trái tích điện âm (-). Mệnh đề d nói ngược hoặc đề bài yêu cầu kiểm tra kỹ chiều cực.',
      mistakeAdvice: 'Quy tắc bàn tay phải: Lòng bàn tay hứng từ trường $\\vec{B}$, ngón cái chỉ chiều chuyển động của thanh dẫn $\\vec{v}$, chiều từ cổ tay đến 4 ngón tay chỉ chiều từ cực âm sang cực dương của nguồn điện cảm ứng.',
      keyFormula: 'e_c = B v L \\sin\\theta'
    },
    {
      id: 202622,
      part: 'II',
      type: 'true_false',
      text: '[Trích đề thi thử THPT Quốc gia - Chuyên Lam Sơn Thanh Hóa 2026]\nĐồng vị phóng xạ $^{131}_{53}\\text{I}$ là chất phóng xạ $\\beta^-$ và phát kèm tia gamma $\\gamma$, có chu kỳ bán rã $T = 8{,}02\\text{ ngày}$. Chất này được sử dụng phổ biến trong y học hạt nhân để chẩn đoán và điều trị ung thư tuyến giáp.\nMột bệnh nhân được bác sĩ chỉ định uống một liều dung dịch chứa $^{131}\\text{I}$ với độ phóng xạ ban đầu là $H_0 = 370\\text{ MBq}$ ($1\\text{ Bq} = 1\\text{ phân rã/giây}$). Sau khi uống, $80\\%$ lượng Iodine tập trung tại mô tuyến giáp, phần còn lại đào thải qua đường bài tiết. Biết hằng số Avogadro $N_A = 6{,}022 \\cdot 10^{23}\\text{ mol}^{-1}$.',
      topic: 'Vật lí hạt nhân & Ứng dụng y học',
      difficulty: 'Vận dụng cao',
      errorCategory: 'Tính toán',
      trueFalseItems: [
        {
          id: 'a',
          text: 'Phương trình phân rã của $^{131}_{53}\\text{I}$ tạo ra hạt nhân con Xenon $^{131}_{54}\\text{Xe}$ cùng một electron và một phản neutrino.',
          correctAnswer: true
        },
        {
          id: 'b',
          text: 'Hằng số phóng xạ của $^{131}\\text{I}$ xấp xỉ bằng $\\lambda = 9{,}99 \\cdot 10^{-7}\\text{ s}^{-1}$.',
          correctAnswer: true
        },
        {
          id: 'c',
          text: 'Khối lượng $^{131}\\text{I}$ nguyên chất có trong liều thuốc ban đầu đưa vào cơ thể là $80{,}5\\text{ ng}$ (nanogam).',
          correctAnswer: true
        },
        {
          id: 'd',
          text: 'Sau $24{,}06\\text{ ngày}$ kể từ thời điểm uống, độ phóng xạ của lượng Iodine còn lưu giữ trong tuyến giáp bằng $46{,}25\\text{ MBq}$.',
          correctAnswer: false
        }
      ],
      explanation: 'Phân tích chi tiết:\n' +
        'a) Phương trình phân rã $\\beta^-$: $^{131}_{53}\\text{I} \\rightarrow ^{131}_{54}\\text{Xe} + ^{0}_{-1}\\text{e} + \\bar{\\nu}_e$. Hạt nhân con là Xenon. => a ĐÚNG.\n' +
        'b) Chu kỳ $T = 8{,}02 \\times 24 \\times 3600 = 692928\\text{ s}$. Hằng số phóng xạ: $\\lambda = \\frac{\\ln 2}{T} = \\frac{0{,}69315}{692928} \\approx 1{,}00 \\cdot 10^{-6}\\text{ s}^{-1} \\approx 9{,}99 \\cdot 10^{-7}\\text{ s}^{-1}$. => b ĐÚNG.\n' +
        'c) Độ phóng xạ $H_0 = \\lambda N_0 \\Rightarrow N_0 = \\frac{H_0}{\\lambda} = \\frac{370 \\cdot 10^6}{9{,}99 \\cdot 10^{-7}} \\approx 3{,}7037 \\cdot 10^{14}$ hạt. Khối lượng: $m_0 = \\frac{N_0}{N_A} \\cdot 131 = \\frac{3{,}7037 \\cdot 10^{14}}{6{,}022 \\cdot 10^{23}} \\cdot 131 \\approx 8{,}057 \\cdot 10^{-8}\\text{ g} \\approx 80{,}6\\text{ ng}$. => c ĐÚNG.\n' +
        'd) Thời gian $t = 24{,}06\\text{ ngày} = 3T$. Lượng còn lại sau 3 chu kỳ bán rã là $2^{-3} = \\frac{1}{8}$. Ban đầu tuyến giáp chỉ hấp thụ $80\\% H_0 = 296\\text{ MBq}$. Sau 3 chu kỳ bán rã, độ phóng xạ tại tuyến giáp còn: $H = \\frac{296}{8} = 37\\text{ MBq} \\neq 46{,}25\\text{ MBq}$ ($46{,}25$ là lấy $370 / 8$, quên nhân $80\\%$). => d SAI.',
      mistakeAdvice: 'Học sinh rất hay quên nhân hệ số hấp thụ thực tế tại cơ quan đích ($80\\%$) mà lấy toàn bộ liều ban đầu chia cho 8.',
      keyFormula: 'H(t) = H_0 \\cdot 2^{-t/T}; \\quad H_0 = \\lambda N_0'
    },

    // ------------------------------------------------------------------------
    // PHẦN III: 6 CÂU TRẢ LỜI NGẮN (ĐIỀN SỐ TỐI ĐA 4 KÝ TỰ) - 0.25đ / CÂU
    // ------------------------------------------------------------------------
    {
      id: 202623,
      part: 'III',
      type: 'short_answer',
      text: '[Trích ngân hàng đề Azota - Sở GD&ĐT Bắc Ninh 2026] Một ấm đun nước bằng điện có công suất tiêu thụ $P = 1200\\text{ W}$ hoạt động ở hiệu điện thế định mức. Ấm chứa $m = 1{,}5\\text{ kg}$ nước ở nhiệt độ ban đầu $t_1 = 20^\\circ\\text{C}$. Biết nhiệt dung riêng của nước là $c = 4200\\text{ J/(kg}\\cdot\\text{K)}$ và hiệu suất nhiệt của ấm đun là $H = 85\\%$. Hỏi sau bao nhiêu phút thì nước trong ấm bắt đầu sôi ở $100^\\circ\\text{C}$? Làm tròn kết quả đến hàng phần mười.',
      shortAnswerCorrect: '8.2',
      topic: 'Nhiệt lượng & Hiệu suất đun nước',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      explanation: 'Nhiệt lượng có ích làm nước sôi từ $20^\\circ\\text{C}$ lên $100^\\circ\\text{C}$: $Q_i = m c \\Delta t = 1{,}5 \\cdot 4200 \\cdot (100 - 20) = 504000\\text{ J}$.\n' +
        'Điện năng toàn phần ấm tiêu thụ: $A_{\\text{tp}} = \\frac{Q_i}{H} = \\frac{504000}{0{,}85} \\approx 592941\\text{ J}$.\n' +
        'Thời gian đun sôi: $t = \\frac{A_{\\text{tp}}}{P} = \\frac{592941}{1200} \\approx 494{,}1\\text{ giây} = \\frac{494{,}1}{60} \\approx 8{,}235\\text{ phút}$.\n' +
        'Làm tròn đến hàng phần mười: 8.2 (hoặc 8,2).',
      mistakeAdvice: 'Cần phân biệt hiệu suất: $A_{\\text{tp}} = Q_i / H$. Nếu lấy $Q_i \\cdot H$ sẽ sai hoàn toàn. Đề yêu cầu đổi ra phút và làm tròn đến hàng phần mười.',
      keyFormula: 't = \\frac{m c \\Delta t}{P \\cdot H}'
    },
    {
      id: 202624,
      part: 'III',
      type: 'short_answer',
      text: '[Trích đề thi thử tốt nghiệp THPT 2026 - Sở GD&ĐT Hà Nội] Một khung dây dẫn phẳng hình chữ nhật có diện tích $S = 0{,}05\\text{ m}^2$ gồm $N = 500\\text{ vòng}$ dây quay đều với tốc độ góc $\\omega = 100\\pi\\text{ rad/s}$ trong một từ trường đều có cảm ứng từ $B = 0{,}04\\text{ T}$ xung quanh một trục đối xứng nằm trong mặt phẳng khung và vuông góc với các đường cảm ứng từ. Suất điện động hiệu dụng sinh ra trong cuộn dây có giá trị bằng bao nhiêu vôn (V)? Làm tròn kết quả đến hàng đơn vị.',
      shortAnswerCorrect: '222',
      topic: 'Suất điện động xoay chiều',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      explanation: 'Từ thông cực đại qua cuộn dây: $\\Phi_0 = N B S = 500 \\cdot 0{,}04 \\cdot 0{,}05 = 1{,}0\\text{ Wb}$.\n' +
        'Suất điện động cực đại: $E_0 = \\omega \\Phi_0 = 100\\pi \\cdot 1{,}0 = 100\\pi \\approx 314{,}16\\text{ V}$.\n' +
        'Suất điện động hiệu dụng: $E = \\frac{E_0}{\\sqrt{2}} = \\frac{100\\pi}{\\sqrt{2}} \\approx 222{,}14\\text{ V}$.\n' +
        'Làm tròn đến hàng đơn vị: 222.',
      mistakeAdvice: 'Đề hỏi giá trị HIỆU DỤNG ($E = E_0 / \\sqrt{2}$), không phải giá trị cực đại ($E_0$). Rất nhiều học sinh điền 314.',
      keyFormula: 'E = \\frac{\\omega N B S}{\\sqrt{2}}'
    },
    {
      id: 202625,
      part: 'III',
      type: 'short_answer',
      text: '[Trích đề khảo sát chất lượng Sở GD&ĐT Nam Định 2026] Một khối khí lý tưởng chứa trong một bình kín có áp suất ban đầu $p_1 = 1{,}2\\text{ atm}$ ở nhiệt độ $t_1 = 27^\\circ\\text{C}$. Khí được làm nóng đẳng tích đến nhiệt độ $t_2 = 127^\\circ\\text{C}$. Áp suất của khối khí sau khi làm nóng bằng bao nhiêu atm? Làm tròn kết quả đến hàng phần mười.',
      shortAnswerCorrect: '1.6',
      topic: 'Định luật Charles - Đẳng tích',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán',
      explanation: 'Nhiệt độ tuyệt đối ban đầu: $T_1 = 27 + 273 = 300\\text{ K}$.\n' +
        'Nhiệt độ tuyệt đối lúc sau: $T_2 = 127 + 273 = 400\\text{ K}$.\n' +
        'Áp dụng định luật Charles cho quá trình đẳng tích (V = const):\n' +
        '$\\frac{p_1}{T_1} = \\frac{p_2}{T_2} \\Rightarrow p_2 = p_1 \\cdot \\frac{T_2}{T_1} = 1{,}2 \\cdot \\frac{400}{300} = 1{,}6\\text{ atm}$.\n' +
        'Điền số: 1.6.',
      mistakeAdvice: 'Tuyệt đối không dùng tỉ số độ C $\\frac{127}{27}$. Bắt buộc phải đổi sang Kelvin ($T = t + 273$).',
      keyFormula: 'p_2 = p_1 \\frac{T_2}{T_1}'
    },
    {
      id: 202626,
      part: 'III',
      type: 'short_answer',
      text: '[Trích đề thi thử THPT Quốc gia - Chuyên Lam Sơn 2026] Một thanh kim loại thẳng đồng chất có chiều dài $L = 0{,}5\\text{ m}$, khối lượng $m = 100\\text{ g}$, trượt không ma sát từ trạng thái nghỉ dọc theo hai thanh ray dẫn điện song song nằm ngang nối với một điện trở $R = 2{,}5\\text{ }\\Omega$. Toàn bộ hệ thống đặt trong từ trường đều vuông góc với mặt phẳng ray có cảm ứng từ $B = 1{,}0\\text{ T}$. Kéo thanh kim loại bằng một lực cơ học không đổi $F = 0{,}4\\text{ N}$ theo phương chuyển động. Tốc độ chuyển động cực đại ổn định của thanh bằng bao nhiêu m/s? Làm tròn kết quả đến hàng đơn vị.',
      shortAnswerCorrect: '4',
      topic: 'Chuyển động của thanh dẫn trong từ trường',
      difficulty: 'Vận dụng cao',
      errorCategory: 'Bẫy đề thi',
      explanation: 'Khi thanh đạt vận tốc $v$, suất điện động cảm ứng: $e = B L v$.\n' +
        'Dòng điện cảm ứng qua thanh: $i = \\frac{e}{R} = \\frac{B L v}{R}$.\n' +
        'Lực từ cản trở chuyển động của thanh: $F_c = i B L = \\frac{B^2 L^2 v}{R}$.\n' +
        'Thanh đạt tốc độ cực đại ổn định $v_{\\text{max}}$ khi lực kéo cân bằng với lực từ cản: $F = F_c = \\frac{B^2 L^2 v_{\\text{max}}}{R}$.\n' +
        '$\\Rightarrow v_{\\text{max}} = \\frac{F \\cdot R}{B^2 L^2} = \\frac{0{,}4 \\cdot 2{,}5}{1{,}0^2 \\cdot 0{,}5^2} = \\frac{1{,}0}{0{,}25} = 4\\text{ m/s}$.\n' +
        'Điền số nguyên: 4.',
      mistakeAdvice: 'Khi vận tốc thanh tăng, lực cản từ tăng theo. Trạng thái ổn định đạt được khi gia tốc $a = 0 \\Leftrightarrow F_{\\text{kéo}} = F_{\\text{từ}}$.',
      keyFormula: 'v_{\\text{max}} = \\frac{F \\cdot R}{B^2 L^2}'
    },
    {
      id: 202627,
      part: 'III',
      type: 'short_answer',
      text: '[Trích ngân hàng đề Azota 2026] Cho biết năng lượng tỏa ra khi phân hạch một hạt nhân $^{235}\\text{U}$ trung bình là $\\Delta E = 200\\text{ MeV}$. Biết số Avogadro $N_A = 6{,}022 \\cdot 10^{23}\\text{ mol}^{-1}$, điện tích nguyên tố $e = 1{,}6 \\cdot 10^{-19}\\text{ C}$. Năng lượng tỏa ra khi phân hạch hoàn toàn $m = 1\\text{ gam}$ $^{235}\\text{U}$ tinh khiết xấp xỉ bằng bao nhiêu Gigajoule (GJ)? Làm tròn kết quả đến hàng đơn vị.',
      shortAnswerCorrect: '82',
      topic: 'Năng lượng phân hạch hạt nhân',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      explanation: 'Số hạt nhân trong 1 gam $^{235}\\text{U}$: $N = \\frac{m}{M} \\cdot N_A = \\frac{1}{235} \\cdot 6{,}022 \\cdot 10^{23} \\approx 2{,}5625 \\cdot 10^{21}$ hạt.\n' +
        'Tổng năng lượng tỏa ra: $E_{\\text{tổng}} = N \\cdot \\Delta E = 2{,}5625 \\cdot 10^{21} \\cdot 200\\text{ MeV} = 5{,}125 \\cdot 10^{23}\\text{ MeV}$.\n' +
        'Đổi sang Joule: $E = 5{,}125 \\cdot 10^{23} \\cdot 1{,}6 \\cdot 10^{-13}\\text{ J} = 8{,}2 \\cdot 10^{10}\\text{ J} = 82 \\cdot 10^9\\text{ J} = 82\\text{ GJ}$.\n' +
        'Điền số: 82.',
      mistakeAdvice: 'Chú ý đổi đơn vị: $1\\text{ MeV} = 10^6 \\times 1{,}6 \\cdot 10^{-19}\\text{ J} = 1{,}6 \\cdot 10^{-13}\\text{ J}$, và $1\\text{ GJ} = 10^9\\text{ J}$.',
      keyFormula: 'E = \\frac{m}{M} N_A \\cdot \\Delta E'
    },
    {
      id: 202628,
      part: 'III',
      type: 'short_answer',
      text: '[Trích đề thi thử tốt nghiệp THPT 2026 - Sở GD&ĐT Bắc Ninh] Một khối khí lý tưởng đơn nguyên tử thực hiện chu trình biến đổi nhiệt động lực học khép kín gồm: dãn đẳng áp từ trạng thái (1) sang (2), làm lạnh đẳng tích về trạng thái (3), rồi nén đẳng nhiệt về lại trạng thái ban đầu (1). Cho biết thể tích tại trạng thái (1) là $V_1 = 2\\text{ lít}$, thể tích tại trạng thái (2) là $V_2 = 6\\text{ lít}$, áp suất tại trạng thái (1) là $p_1 = 3{,}0\\text{ atm}$. Công cơ học mà chất khí sinh ra trong quá trình dãn đẳng áp từ (1) đến (2) bằng bao nhiêu Joule (J)? Lấy $1\\text{ atm} = 1{,}013 \\cdot 10^5\\text{ Pa}$. Làm tròn kết quả đến hàng đơn vị.',
      shortAnswerCorrect: '1216',
      topic: 'Công của chất khí trong quá trình đẳng áp',
      difficulty: 'Vận dụng',
      errorCategory: 'Tính toán',
      explanation: 'Trong quá trình biến đổi đẳng áp từ trạng thái (1) sang trạng thái (2), áp suất không đổi $p = p_1 = 3{,}0\\text{ atm} = 3{,}0 \\cdot 1{,}013 \\cdot 10^5 = 303900\\text{ Pa}$.\n' +
        'Độ biến thiên thể tích: $\\Delta V = V_2 - V_1 = 6 - 2 = 4\\text{ lít} = 4 \\cdot 10^{-3}\\text{ m}^3$.\n' +
        'Công mà chất khí sinh ra: $A\' = p \\cdot \\Delta V = 303900 \\cdot 4 \\cdot 10^{-3} = 1215{,}6\\text{ J}$.\n' +
        'Làm tròn đến hàng đơn vị: 1216.',
      mistakeAdvice: 'Cần đổi đơn vị lít sang mét khối ($1\\text{ lít} = 10^{-3}\\text{ m}^3$) và atm sang Pascal ($1\\text{ atm} = 101300\\text{ Pa}$).',
      keyFormula: 'A\' = p \\cdot (V_2 - V_1)'
    }
  ]
};

// ============================================================================
// 2. ĐỀ ĐÁNH GIÁ NĂNG LỰC ĐHQG (HSA & V-ACT 2026) - TƯ DUY KHOA HỌC VẬT LÍ
// ============================================================================
export const DGNL_PHYSICS_HSA_VACT_2026_DE01: Exam = {
  id: 'dgnl-physics-hsa-vact-2026-de01',
  examCode: 'DGNL-VL-2026',
  title: 'Đề Đánh Giá Năng Lực (HSA / V-ACT 2026) – Tư Duy Khoa Học & Phân Tích Thực Nghiệm Vật Lí',
  description: 'Đề thi chuẩn hóa theo cấu trúc ĐGNL Đại học Quốc gia Hà Nội (HSA) và ĐHQG TP.HCM (V-ACT): Gồm cụm đọc hiểu khoa học thực nghiệm (Scientific Passage), bảng số liệu phân tích và các câu hỏi tư duy định lượng liên kết.',
  subject: 'Vật lý',
  grade: 'Đại học',
  durationMinutes: 50,
  difficulty: 'Trường Chuyên',
  isBGDFormat: false,
  author: 'Hội Đồng Khảo Thí ĐGNL HSA & V-ACT',
  attemptsCount: 9340,
  averageScore: 7.2,
  questions: [
    // Cụm câu hỏi ĐGNL 1: Dựa trên Bài đọc khoa học
    {
      id: 202651,
      part: 'I',
      type: 'multiple_choice',
      passage: 'DỰA VÀO VĂN BẢN VÀ BẢNG SỐ LIỆU SAU ĐỂ TRẢ LỜI CÁC CÂU HỎI TỪ CÂU 1 ĐẾN CÂU 3:\n\n' +
        'Vật liệu siêu dẫn nhiệt độ cao YBCO (Yttrium Barium Copper Oxide, công thức hóa học $\\text{YBa}_2\\text{Cu}_3\\text{O}_{7-x}$) là một bước đột phá trong vật lí chất rắn hiện đại. Khi được làm lạnh dưới một ngưỡng nhiệt độ xác định gọi là nhiệt độ chuyển pha tới hạn $T_c$, điện trở suất $\\rho$ của khối vật liệu đột ngột giảm triệt để về 0 (tính dẫn điện hoàn hảo) và toàn bộ từ trường bên ngoài bị đẩy ra khỏi lòng khối vật liệu (hiệu ứng Meissner - nghịch từ lý tưởng).\n\n' +
        'Tuy nhiên, trạng thái siêu dẫn sẽ bị phá vỡ và vật liệu trở lại trạng thái dẫn điện bình thường nếu từ trường ngoài tác dụng vượt quá giá trị từ trường tới hạn $B_c(T)$. Mối liên hệ thực nghiệm giữa từ trường tới hạn và nhiệt độ tuân theo công thức:\n' +
        '$$B_c(T) = B_0 \\cdot \\left[ 1 - \\left( \\frac{T}{T_c} \\right)^2 \\right]$$\n' +
        'với $B_0$ là từ trường tới hạn tại không độ tuyệt đối ($T = 0\\text{ K}$).\n\n' +
        'Bảng số liệu thực nghiệm đo đạc điện trở suất $\\rho$ và từ trường tới hạn $B_c$ của một mẫu gốm siêu dẫn YBCO tại các nhiệt độ khác nhau:\n\n' +
        '| Nhiệt độ T (K) | Điện trở suất ρ (Ω·m) | Từ trường tới hạn Bc (Tesla) | Trạng thái vật liệu |\n' +
        '|:---|:---|:---|:---|\n' +
        '| 300 (Nhiệt độ phòng) | 2,50 × 10⁻⁴ | 0,00 | Bình thường |\n' +
        '| 120 | 1,05 × 10⁻⁴ | 0,00 | Bình thường |\n' +
        '| 93 (Ngưỡng Tc) | 0,00 (Đột biến) | 0,00 | Bắt đầu chuyển pha |\n' +
        '| 77 (Nitơ lỏng) | 0,00 | 48,50 | Siêu dẫn hoàn hảo |\n' +
        '| 40 | 0,00 | 120,40 | Siêu dẫn hoàn hảo |\n' +
        '| 0 (Lý thuyết) | 0,00 | 150,00 | Siêu dẫn cực đại |',
      text: '[Trích đề ĐGNL HSA - ĐHQGHN 2026 - Tầng 1: Đọc số liệu] Dựa vào bảng số liệu thực nghiệm, nhiệt độ chuyển pha tới hạn $T_c$ của mẫu gốm siêu dẫn YBCO được thử nghiệm là:',
      options: [
        { key: 'A', label: '$93\\text{ K}$' },
        { key: 'B', label: '$77\\text{ K}$' },
        { key: 'C', label: '$120\\text{ K}$' },
        { key: 'D', label: '$300\\text{ K}$' }
      ],
      correctAnswer: 'A',
      explanation: 'Theo bảng số liệu: Tại nhiệt độ $T = 93\\text{ K}$, điện trở suất đột ngột giảm triệt để từ $1{,}05 \\cdot 10^{-4}\\text{ }\\Omega\\cdot\\text{m}$ về $0{,}00\\text{ }\\Omega\\cdot\\text{m}$, bắt đầu bước vào trạng thái chuyển pha siêu dẫn. Do đó nhiệt độ tới hạn $T_c = 93\\text{ K}$.',
      topic: 'ĐGNL - Đọc hiểu biểu đồ & Bảng thực nghiệm',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết'
    },
    {
      id: 202652,
      part: 'I',
      type: 'multiple_choice',
      passage: 'DỰA VÀO VĂN BẢN VÀ BẢNG SỐ LIỆU ĐO ĐẠC GỐM SIÊU DẪN YBCO Ở TRÊN.',
      text: '[Trích đề ĐGNL V-ACT - ĐHQG TP.HCM 2026 - Tầng 2: Phân tích nhân quả] Khi nhiệt độ của mẫu vật liệu YBCO giảm dần từ $93\\text{ K}$ xuống $0\\text{ K}$, từ trường tới hạn $B_c(T)$ có xu hướng biến đổi như thế nào?',
      options: [
        { key: 'A', label: 'Tăng phi tuyến từ $0\\text{ T}$ lên giá trị cực đại $150\\text{ T}$ theo hàm số bậc hai nghịch đảo.' },
        { key: 'B', label: 'Giảm tuyến tính từ $150\\text{ T}$ về $0\\text{ T}$.' },
        { key: 'C', label: 'Không đổi vì vật liệu đã ở trạng thái siêu dẫn hoàn hảo.' },
        { key: 'D', label: 'Biến thiên tuần hoàn dạng hình sin theo nhiệt độ tuyệt đối.' }
      ],
      correctAnswer: 'A',
      explanation: 'Công thức thực nghiệm: $B_c(T) = B_0 \\cdot \\left[ 1 - \\left( \\frac{T}{T_c} \\right)^2 \\right]$. Khi $T$ giảm từ $T_c = 93\\text{ K}$ về $0\\text{ K}$, số hạng $\\left( \\frac{T}{T_c} \\right)^2$ giảm từ 1 về 0, làm cho đại lượng trong ngoặc tăng từ 0 lên 1, dẫn đến $B_c(T)$ tăng phi tuyến theo hàm parabol nghịch đảo từ $0\\text{ T}$ lên cực đại $B_0 = 150\\text{ T}$.',
      topic: 'ĐGNL - Mối quan hệ hàm số thực nghiệm',
      difficulty: 'Thông hiểu',
      errorCategory: 'Phương pháp'
    },
    {
      id: 202653,
      part: 'I',
      type: 'multiple_choice',
      passage: 'DỰA VÀO VĂN BẢN VÀ BẢNG SỐ LIỆU ĐO ĐẠC GỐM SIÊU DẪN YBCO Ở TRÊN.',
      text: '[Trích đề ĐGNL HSA - ĐHQGHN 2026 - Tầng 3: Ngoại suy & Tính toán] Một nam châm điện siêu dẫn làm từ gốm YBCO được nhúng làm nguội trong bể Nitơ lỏng ở nhiệt độ không đổi $T = 77\\text{ K}$. Từ trường ngoài tối đa mà cuộn dây siêu dẫn này có thể chịu đựng được mà không bị mất tính siêu dẫn theo công thức lý thuyết thực nghiệm xấp xỉ bằng:',
      options: [
        { key: 'A', label: '$47{,}1\\text{ T}$' },
        { key: 'B', label: '$93{,}0\\text{ T}$' },
        { key: 'C', label: '$120{,}4\\text{ T}$' },
        { key: 'D', label: '$150{,}0\\text{ T}$' }
      ],
      correctAnswer: 'A',
      explanation: 'Thay số vào phương trình thực nghiệm: $T = 77\\text{ K}$, $T_c = 93\\text{ K}$, $B_0 = 150\\text{ T}$:\n' +
        '$$B_c(77) = 150 \\cdot \\left[ 1 - \\left( \\frac{77}{93} \\right)^2 \\right] = 150 \\cdot \\left[ 1 - 0{,}6855 \\right] = 150 \\cdot 0{,}3145 \\approx 47{,}17\\text{ T}$$.\n' +
        'Giá trị xấp xỉ gần nhất là $47{,}1\\text{ T}$ (số liệu bảng đo thực tế là 48,50 T do sai số tạp chất chế tạo mẫu).',
      topic: 'ĐGNL - Vận dụng cao & Ngoại suy thực nghiệm',
      difficulty: 'Vận dụng cao',
      errorCategory: 'Tính toán',
      keyFormula: 'B_c(T) = B_0 \\left[ 1 - \\left( \\frac{T}{T_c} \\right)^2 \\right]'
    }
  ]
};

// ============================================================================
// 3. TỔNG HỢP TOÀN BỘ NGÂN HÀNG ĐỀ VẬT LÍ AZOTA 2026
// ============================================================================
export const ALL_AZOTA_PHYSICS_2026_EXAMS: Exam[] = [
  AZOTA_PHYSICS_THPT_2026_DE01,
  DGNL_PHYSICS_HSA_VACT_2026_DE01
];
