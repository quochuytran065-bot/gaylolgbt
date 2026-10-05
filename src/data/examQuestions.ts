 import type { Question, SubjectInfo } from '../types/exam';

export const subjects: SubjectInfo[] = [
  {
    id: 'math',
    name: 'Toán Học',
    vietnameseName: 'Môn Toán',
    icon: 'Calculator',
    color: 'from-blue-600 to-indigo-600',
    badgeBg: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    topics: [
      'Hàm số & Đạo hàm',
      'Mũ & Logarit',
      'Nguyên hàm & Tích phân',
      'Số phức',
      'Hình học không gian Oxyz',
      'Khối đa diện & Thể tích'
    ]
  },
  {
    id: 'physics',
    name: 'Vật Lý',
    vietnameseName: 'Môn Vật Lý',
    icon: 'Zap',
    color: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    topics: [
      'Dao động điều hòa',
      'Sóng cơ & Sóng âm',
      'Dòng điện xoay chiều',
      'Sóng ánh sáng',
      'Vật lý lượng tử & Hạt nhân'
    ]
  },
  {
    id: 'chemistry',
    name: 'Hóa Học',
    vietnameseName: 'Môn Hóa Học',
    icon: 'FlaskConical',
    color: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    topics: [
      'Este & Lipit',
      'Cacbohiđrat',
      'Amin & Amino axit',
      'Kim loại kiềm & kiềm thổ',
      'Hóa học vô cơ thực tiễn'
    ]
  },
  {
    id: 'english',
    name: 'Tiếng Anh',
    vietnameseName: 'Môn Tiếng Anh',
    icon: 'Languages',
    color: 'from-purple-500 to-pink-600',
    badgeBg: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    topics: [
      'Thì & Phối hợp thì',
      'Mệnh đề quan hệ & Rút gọn',
      'Câu điều kiện & Đảo ngữ',
      'Collocations & Idioms',
      'Đọc hiểu & Tìm lỗi sai'
    ]
  },
  {
    id: 'informatics',
    name: 'Tin Học',
    vietnameseName: 'Môn Tin Học',
    icon: 'Terminal',
    color: 'from-cyan-500 to-blue-600',
    badgeBg: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
    topics: [
      'Cấu trúc dữ liệu & Thuật toán',
      'Lập trình Python/C++',
      'Cơ sở dữ liệu quan hệ (SQL)',
      'Mạng máy tính & An toàn thông tin'
    ]
  }
];

export const questionBank: Question[] = [
  // ─── TOÁN HỌC ─────────────────────────────────────────────────────────────
  {
    id: 'math-01',
    subject: 'math',
    grade: 12,
    topic: 'Hàm số & Đạo hàm',
    difficulty: 'easy',
    content: 'Cho hàm số y = f(x) có đạo hàm f\'(x) = x(x - 1)²(x + 2)³. Số điểm cực trị của hàm số đã cho là:',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: '2' },
      { id: 'C', text: '3' },
      { id: 'D', text: '4' }
    ],
    correctOptionId: 'B',
    solution: `Bước 1: Cho f'(x) = 0 ⇔ x(x - 1)²(x + 2)³ = 0
Nghiệm gồm:
• x = 0 (nghiệm bội 1, bậc lẻ) ➔ f'(x) ĐỔI DẤU khi qua x = 0.
• x = 1 (nghiệm bội 2, bậc chẵn) ➔ f'(x) KHÔNG đổi dấu khi qua x = 1.
• x = -2 (nghiệm bội 3, bậc lẻ) ➔ f'(x) ĐỔI DẤU khi qua x = -2.
Bước 2: Cực trị chỉ xuất hiện tại các điểm mà đạo hàm ĐỔI DẤU (nghiệm bậc lẻ).
Do đó, hàm số có đúng 2 điểm cực trị (tại x = 0 và x = -2).`,
    mistakeAnalysis: {
      A: {
        whyWrong: 'Bạn chỉ đếm nghiệm x = 0 mà bỏ quên nghiệm bội 3 x = -2.',
        commonMistake: 'Nghĩ rằng chỉ có nghiệm đơn bậc 1 mới là cực trị, quên mất nghiệm bội lẻ (bội 3, 5, 7...) vẫn đổi dấu bình thường.',
        knowledgeGap: 'Chưa phân biệt rõ: Đạo hàm đổi dấu qua nghiệm bội lẻ (bậc 1, 3, 5...) tạo thành cực trị.'
      },
      C: {
        whyWrong: 'Bạn đã đếm cả x = 1 (nghiệm bội 2, bậc chẵn) vào số điểm cực trị.',
        commonMistake: 'Sập bẫy phương trình f\'(x) = 0 có 3 nghiệm phân biệt (0, 1, -2) nên vội vàng kết luận có 3 điểm cực trị mà không xét dấu.',
        knowledgeGap: 'Cực trị của hàm số yêu cầu f\'(x) phải ĐỔI DẤU. Qua nghiệm bội chẵn thì f\'(x) không đổi dấu.'
      },
      D: {
        whyWrong: 'Đếm sai số lượng nghiệm hoặc nhầm sang bậc của đa thức tổng.',
        commonMistake: 'Cộng tất cả các số mũ 1 + 2 + 3 = 6 rồi chọn phương án bất kỳ.',
        knowledgeGap: 'Cần lập bảng xét dấu hoặc quan sát số mũ chẵn/lẻ của từng thừa số.'
      }
    },
    errorType: 'trap',
    remedyTip: 'Khi tìm số điểm cực trị từ f\'(x), chỉ cần đếm số thừa số có số mũ LẺ. Bỏ qua hoàn toàn các thừa số mũ CHẴN như (x - a)², (x - b)⁴.',
    formulaRef: 'f\'(x) đổi dấu qua nghiệm bội lẻ ➔ Đạt cực trị. Không đổi dấu qua nghiệm bội chẵn ➔ Không đạt cực trị.'
  },
  {
    id: 'math-02',
    subject: 'math',
    grade: 12,
    topic: 'Hàm số & Đạo hàm',
    difficulty: 'medium',
    content: 'Tìm giá trị cực tiểu y_CT của hàm số y = x³ - 3x + 2.',
    options: [
      { id: 'A', text: 'x = 1' },
      { id: 'B', text: 'y = 0' },
      { id: 'C', text: 'y = 4' },
      { id: 'D', text: 'x = -1' }
    ],
    correctOptionId: 'B',
    solution: `Bước 1: Tính đạo hàm: y' = 3x² - 3.
Bước 2: Giải y' = 0 ⇔ 3x² - 3 = 0 ⇔ x = ±1.
Bước 3: Lập bảng xét dấu y':
• x < -1: y' > 0 (hàm đồng biến)
• -1 < x < 1: y' < 0 (hàm nghịch biến) ➔ x = -1 là điểm cực đại, y_CĐ = (-1)³ - 3(-1) + 2 = 4.
• x > 1: y' > 0 (hàm đồng biến) ➔ x = 1 là điểm cực tiểu.
Bước 4: Đề bài hỏi GIÁ TRỊ CỰC TIỂU y_CT (tức là tung độ y tại x = 1):
y_CT = 1³ - 3(1) + 2 = 0.`,
    mistakeAnalysis: {
      A: {
        whyWrong: 'Bạn đã chọn x = 1 (điểm cực tiểu) thay vì y = 0 (giá trị cực tiểu).',
        commonMistake: 'Bẫy đề bài kinh điển: Nhầm lẫn giữa "Điểm cực tiểu của hàm số" (hỏi x) với "Giá trị cực tiểu của hàm số" (hỏi y).',
        knowledgeGap: 'Quy ước thuật ngữ giải tích: Điểm cực trị là x, Giá trị cực trị là y, Điểm cực trị của đồ thị là cặp tọa độ (x; y).'
      },
      C: {
        whyWrong: 'Bạn đã tính ra giá trị cực đại y_CĐ = 4 thay vì cực tiểu.',
        commonMistake: 'Xác định nhầm dấu y\' hoặc nhầm giữa cực đại và cực tiểu.',
        knowledgeGap: 'y\' đổi dấu từ (-) sang (+) khi qua x thì đó là điểm Cực Tiểu.'
      },
      D: {
        whyWrong: 'Chọn x = -1 là điểm cực đại của hàm số, lại là x chứ không phải y.',
        commonMistake: 'Nhầm lẫn cả điểm cực đại sang cực tiểu và nhầm giữa x và y.',
        knowledgeGap: 'Cần vẽ trục số xét dấu y\' = 3(x-1)(x+1) thật cẩn thận.'
      }
    },
    errorType: 'trap',
    remedyTip: 'Luôn gạch chân từ khóa trong đề: "Điểm cực trị" ➔ x; "Giá trị cực trị" / "Cực trị" ➔ y; "Điểm cực trị của đồ thị" ➔ (x, y).',
    formulaRef: 'y_CT = f(x_CT); y_CĐ = f(x_CĐ).'
  },
  {
    id: 'math-03',
    subject: 'math',
    grade: 12,
    topic: 'Nguyên hàm & Tích phân',
    difficulty: 'medium',
    content: 'Tính tích phân I = ∫[0 đến π/2] x · sin(x) dx.',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: 'π/2' },
      { id: 'C', text: '-1' },
      { id: 'D', text: 'π/2 - 1' }
    ],
    correctOptionId: 'A',
    solution: `Sử dụng phương pháp tích phân từng phần:
Đặt:
  u = x  ➔ du = dx
  dv = sin(x)dx  ➔ chọn v = -cos(x)
Theo công thức I = u·v|[0 đến π/2] - ∫[0 đến π/2] v du:
  I = [-x · cos(x)]|[0 đến π/2] - ∫[0 đến π/2] (-cos(x)) dx
  I = (-π/2 · cos(π/2) - 0) + ∫[0 đến π/2] cos(x) dx
  Vì cos(π/2) = 0 nên phần tử thứ nhất = 0.
  I = sin(x)|[0 đến π/2] = sin(π/2) - sin(0) = 1 - 0 = 1.`,
    mistakeAnalysis: {
      B: {
        whyWrong: 'Bạn quên không tính tích phân của cos(x) hoặc tính nhầm [-x·cos(x)].',
        commonMistake: 'Nghĩ rằng phần [-x·cos(x)] ra π/2 do quên cos(π/2) = 0.',
        knowledgeGap: 'Giá trị lượng giác góc đặc biệt: cos(π/2) = 0, sin(π/2) = 1.'
      },
      C: {
        whyWrong: 'Bạn đã sai dấu ở bước tích phân từng phần (chọn v = cos(x) thay vì -cos(x)).',
        commonMistake: 'Nguyên hàm của sin(x) là -cos(x), nhưng rất nhiều bạn nhầm với đạo hàm của sin(x) là cos(x).',
        knowledgeGap: 'Hay nhầm dấu giữa đạo hàm và nguyên hàm hàm lượng giác: ∫sin(x)dx = -cos(x) + C.'
      },
      D: {
        whyWrong: 'Tính sai dấu của tích phân từng phần thành u·v + ∫v du.',
        commonMistake: 'Quên dấu trừ trong công thức tích phân từng phần: ∫u dv = u·v - ∫v du.',
        knowledgeGap: 'Thuộc sai công thức tích phân từng phần.'
      }
    },
    errorType: 'calculation',
    remedyTip: 'Khắc cốt ghi tâm: Đạo hàm sin ra cos, nhưng Nguyên hàm sin ra -cos. Dùng quy tắc "Nhất Lô, Nhì Đa, Tam Lượng, Tứ Mũ" để đặt u.',
    formulaRef: '∫ u dv = u·v - ∫ v du; ∫ sin(x) dx = -cos(x) + C.'
  },
  {
    id: 'math-04',
    subject: 'math',
    grade: 12,
    topic: 'Số phức',
    difficulty: 'easy',
    content: 'Cho số phức z = 3 - 4i. Môđun của số phức z (kí hiệu |z|) bằng:',
    options: [
      { id: 'A', text: '5' },
      { id: 'B', text: '7' },
      { id: 'C', text: '25' },
      { id: 'D', text: '-1' }
    ],
    correctOptionId: 'A',
    solution: `Số phức z = a + bi có môđun được tính theo định nghĩa:
|z| = √(a² + b²)
Ở đây a = 3, b = -4:
|z| = √(3² + (-4)²) = √(9 + 16) = √25 = 5.`,
    mistakeAnalysis: {
      B: {
        whyWrong: 'Bạn đã lấy |3| + |-4| = 7 (cộng số học) thay vì tính căn tổng bình phương.',
        commonMistake: 'Nhầm môđun số phức với tổng giá trị tuyệt đối của phần thực và phần ảo.',
        knowledgeGap: 'Môđun số phức là độ dài vectơ biểu diễn: |z| = √(a² + b²).'
      },
      C: {
        whyWrong: 'Bạn tính ra a² + b² = 25 nhưng quên lấy dấu căn bậc hai.',
        commonMistake: 'Quên bước khai căn: |z|² = 25 ➔ |z| = 5.',
        knowledgeGap: 'Môđun có dấu căn bậc hai ở ngoài.'
      },
      D: {
        whyWrong: 'Lấy 3 + (-4) = -1.',
        commonMistake: 'Cộng đại số phần thực và phần ảo mà không dùng công thức môđun.',
        knowledgeGap: 'Môđun của số phức luôn là một số thực KHÔNG ÂM (|z| ≥ 0).'
      }
    },
    errorType: 'conceptual',
    remedyTip: 'Môđun số phức z = a + bi luôn luôn ≥ 0 và bằng √(a² + b²). Hãy liên tưởng đến định lý Pytago trong tam giác vuông.',
    formulaRef: '|z| = √(a² + b²); |z| ≥ 0 ∀ z ∈ ℂ.'
  },
  {
    id: 'math-05',
    subject: 'math',
    grade: 12,
    topic: 'Hình học không gian Oxyz',
    difficulty: 'hard',
    content: 'Trong không gian Oxyz, cho mặt phẳng (P): 2x - y + 2z - 6 = 0. Khoảng cách từ điểm M(1; -2; 3) đến mặt phẳng (P) bằng:',
    options: [
      { id: 'A', text: '4/3' },
      { id: 'B', text: '4' },
      { id: 'C', text: '2' },
      { id: 'D', text: '14/3' }
    ],
    correctOptionId: 'A',
    solution: `Công thức tính khoảng cách từ điểm M(x0; y0; z0) đến mp (P): Ax + By + Cz + D = 0:
d(M, (P)) = |A·x0 + B·y0 + C·z0 + D| / √(A² + B² + C²)

Thay tọa độ điểm M(1; -2; 3) và các hệ số A=2, B=-1, C=2, D=-6 vào:
Tử số = |2·(1) - (-2) + 2·(3) - 6| = |2 + 2 + 6 - 6| = |4| = 4.
Mẫu số = √(2² + (-1)² + 2²) = √(4 + 1 + 4) = √9 = 3.

Vậy khoảng cách d(M, (P)) = 4/3.`,
    mistakeAnalysis: {
      B: {
        whyWrong: 'Bạn đã tính ra tử số bằng 4 nhưng quên chia cho độ dài vectơ pháp tuyến ở mẫu số.',
        commonMistake: 'Bỏ quên mẫu số √(A² + B² + C²) = 3.',
        knowledgeGap: 'Công thức khoảng cách luôn có mẫu số là độ dài vectơ pháp tuyến.'
      },
      C: {
        whyWrong: 'Bạn tính sai dấu ở tử số: nhầm -(-2) thành -2 khiến tử ra |2 - 2 + 6 - 6| = 0 hoặc nhầm lẫn hệ số.',
        commonMistake: 'Lỗi sai dấu: -y0 với y0 = -2 phải là -(-2) = +2.',
        knowledgeGap: 'Cẩn thận dấu âm của tọa độ khi thay vào phương trình có dấu trừ.'
      },
      D: {
        whyWrong: 'Tính nhầm D = +6 thay vì D = -6 dẫn đến tử số ra |2 + 2 + 6 + 6| = 14.',
        commonMistake: 'Đổi sai dấu hệ số tự do D.',
        knowledgeGap: 'Phương trình dạng tổng quát: Ax + By + Cz + D = 0 giữ nguyên dấu của D.'
      }
    },
    errorType: 'calculation',
    remedyTip: 'Luôn viết rõ từng hệ số A, B, C, D ra nháp trước khi thay số để tránh sai dấu ở các giá trị âm như -(-y).',
    formulaRef: 'd(M, (P)) = |Ax0 + By0 + Cz0 + D| / √(A² + B² + C²).'
  },

  // ─── VẬT LÝ ───────────────────────────────────────────────────────────────
  {
    id: 'phy-01',
    subject: 'physics',
    grade: 12,
    topic: 'Dao động điều hòa',
    difficulty: 'easy',
    content: 'Một con lắc lò xo gồm vật nặng khối lượng m và lò xo có độ cứng k dao động điều hòa. Chu kỳ dao động T của con lắc được tính bằng công thức:',
    options: [
      { id: 'A', text: 'T = 2π √(k/m)' },
      { id: 'B', text: 'T = 2π √(m/k)' },
      { id: 'C', text: 'T = (1/2π) √(m/k)' },
      { id: 'D', text: 'T = 2π √(g/l)' }
    ],
    correctOptionId: 'B',
    solution: `Tần số góc của con lắc lò xo là: ω = √(k/m).
Chu kỳ dao động T = 2π / ω = 2π / √(k/m) = 2π √(m/k).
Mẹo nhớ: "Thấy 2 Pi Mua Kẹo" (T = 2π √(m/k)).`,
    mistakeAnalysis: {
      A: {
        whyWrong: 'Bạn đã đảo ngược phân số thành k/m. Đó là tần số góc ω = √(k/m).',
        commonMistake: 'Nhầm lẫn giữa công thức tính tần số góc ω và chu kỳ T (quên nghịch đảo phân số).',
        knowledgeGap: 'T = 2π/ω, do đó khi chia cho phân số phải đảo ngược mẫu lên tử.'
      },
      C: {
        whyWrong: 'Bạn đã nhầm hệ số 2π ở tử số thành 1/(2π).',
        commonMistake: 'Nhầm công thức chu kỳ T với công thức tần số f = (1/2π) √(k/m).',
        knowledgeGap: 'Chu kỳ T có thứ nguyên thời gian (s) nên 2π ở trên tử.'
      },
      D: {
        whyWrong: 'Đây là công thức chu kỳ của con lắc đơn (chiều dài l, gia tốc g), không phải con lắc lò xo.',
        commonMistake: 'Nhầm lẫn giữa con lắc đơn và con lắc lò xo.',
        knowledgeGap: 'Con lắc lò xo phụ thuộc m và k; con lắc đơn phụ thuộc l và g.'
      }
    },
    errorType: 'conceptual',
    remedyTip: 'Dùng câu thần chú vui: Con lắc lò xo ➔ T = 2π √(m/k) ("Tiền 2 Pi Mua Kẹo"). Con lắc đơn ➔ T = 2π √(l/g) ("Tiền 2 Pi Lấy Gạo").',
    formulaRef: 'T = 2π/ω = 2π√(m/k); f = 1/T = (1/2π)√(k/m).'
  },
  {
    id: 'phy-02',
    subject: 'physics',
    grade: 12,
    topic: 'Dòng điện xoay chiều',
    difficulty: 'medium',
    content: 'Đặt điện áp xoay chiều u = U0 cos(ωt) vào hai đầu đoạn mạch R, L, C nối tiếp đang có cộng hưởng điện. Hệ số công suất cosφ của đoạn mạch khi đó bằng:',
    options: [
      { id: 'A', text: '0' },
      { id: 'B', text: '0.5' },
      { id: 'C', text: '1' },
      { id: 'D', text: '√2 / 2' }
    ],
    correctOptionId: 'C',
    solution: `Khi mạch RLC xảy ra hiện tượng CỘNG HƯỞNG ĐIỆN:
• Cảm kháng bằng dung kháng: ZL = ZC ➔ ZL - ZC = 0.
• Tổng trở của mạch đạt giá trị nhỏ nhất: Z = √(R² + (ZL - ZC)²) = R.
• Độ lệch pha giữa u và i: tanφ = (ZL - ZC)/R = 0 ➔ φ = 0 (u và i cùng pha).
• Hệ số công suất: cosφ = cos(0) = 1 (đạt giá trị cực đại).`,
    mistakeAnalysis: {
      A: {
        whyWrong: 'Bạn chọn cosφ = 0 (đây là mạch chỉ có L thuần cảm hoặc chỉ có C, góc lệch φ = ±π/2).',
        commonMistake: 'Nhớ nhầm cos(0) = 0 thay vì cos(0) = 1.',
        knowledgeGap: 'Lượng giác: cos(0) = 1, sin(0) = 0.'
      },
      B: {
        whyWrong: 'Chọn cosφ = 0.5 (tương ứng góc lệch pha π/3).',
        commonMistake: 'Đoán mò giá trị không có căn cứ lý thuyết.',
        knowledgeGap: 'Hiện tượng cộng hưởng đưa hệ số công suất lên giá trị cực đại cosφ = 1.'
      },
      D: {
        whyWrong: 'Chọn cosφ = √2/2 (tương ứng góc lệch pha π/4, khi |ZL - ZC| = R).',
        commonMistake: 'Nhầm với trường hợp công suất mạch tiêu thụ đạt cực đại khi biến trở R thay đổi.',
        knowledgeGap: 'Khi cộng hưởng điện thì ZL = ZC nên φ = 0, cos(0) luôn bằng 1.'
      }
    },
    errorType: 'conceptual',
    remedyTip: 'Ghi nhớ trọn bộ hệ quả cộng hưởng RLC: ZL = ZC, Zmin = R, Imax = U/R, Pmax = U²/R, u cùng pha i (φ = 0), cosφ = 1.',
    formulaRef: 'Cộng hưởng điện: ZL = ZC ⇔ ω = 1/√(LC) ➔ cosφ = 1.'
  },
  {
    id: 'phy-03',
    subject: 'physics',
    grade: 12,
    topic: 'Sóng ánh sáng',
    difficulty: 'medium',
    content: 'Trong thí nghiệm Y-âng về giao thoa ánh sáng, khoảng cách giữa 2 khe là a = 1 mm, khoảng cách từ mặt phẳng chứa 2 khe đến màn là D = 2 m. Chiếu bằng ánh sáng đơn sắc có bước sóng λ = 0.5 µm. Khoảng vân i trên màn đo được là:',
    options: [
      { id: 'A', text: '1 mm' },
      { id: 'B', text: '0.5 mm' },
      { id: 'C', text: '2 mm' },
      { id: 'D', text: '1 m' }
    ],
    correctOptionId: 'A',
    solution: `Công thức tính khoảng vân i:
i = (λ · D) / a

Lưu ý quy tắc đổi đơn vị chuẩn:
• λ = 0.5 µm
• D = 2 m
• a = 1 mm
Mẹo: Khi λ tính bằng µm, D tính bằng m, a tính bằng mm thì khoảng vân i tự động có đơn vị là mm!
i = (0.5 · 2) / 1 = 1.0 mm.`,
    mistakeAnalysis: {
      B: {
        whyWrong: 'Bạn đã tính ra 0.5 do quên nhân với khoảng cách D = 2 m.',
        commonMistake: 'Viết công thức thiếu biến D: i = λ/a.',
        knowledgeGap: 'Khoảng vân tỷ lệ thuận với khoảng cách đến màn D: i = λD/a.'
      },
      C: {
        whyWrong: 'Tính ra 2 mm do nhầm lẫn phép nhân chia: i = aD/λ.',
        commonMistake: 'Nhầm vị trí của bước sóng λ và khoảng cách hai khe a.',
        knowledgeGap: 'Bước sóng λ luôn ở trên tử số vì bước sóng càng lớn thì vân càng thưa.'
      },
      D: {
        whyWrong: 'Tính đúng độ lớn là 1 nhưng sai đơn vị từ mm sang m (sai số gấp 1000 lần).',
        commonMistake: 'Không chú ý đơn vị đo thực tế của giao thoa trên màn hứng vân (vân giao thoa đo bằng milimet chứ không phải mét).',
        knowledgeGap: 'Đơn vị thực tế trong thí nghiệm Y-âng: khoảng vân i luôn ở cỡ mm.'
      }
    },
    errorType: 'calculation',
    remedyTip: 'Áp dụng bộ đơn vị "vàng" trong thí nghiệm Y-âng: λ (µm), D (m), a (mm) ➔ i ra thẳng (mm), không cần đổi lũy thừa 10^(-6)!',
    formulaRef: 'i = (λ · D) / a; Tọa độ vân sáng bậc k: x = k·i; Vân tối: x = (k + 0.5)·i.'
  },

  // ─── HÓA HỌC ─────────────────────────────────────────────────────────────
  {
    id: 'chem-01',
    subject: 'chemistry',
    grade: 12,
    topic: 'Este & Lipit',
    difficulty: 'easy',
    content: 'Đun nóng este etyl axetat (CH3COOC2H5) với dung dịch NaOH vừa đủ, sản phẩm thu được gồm:',
    options: [
      { id: 'A', text: 'CH3COONa và C2H5OH' },
      { id: 'B', text: 'C2H5COONa và CH3OH' },
      { id: 'C', text: 'CH3COOH và C2H5ONa' },
      { id: 'D', text: 'HCOONa và C3H7OH' }
    ],
    correctOptionId: 'A',
    solution: `Phương trình thủy phân este trong môi trường kiềm (phản ứng xà phòng hóa):
CH3COOC2H5 + NaOH ➔ CH3COONa + C2H5OH
Giải thích:
• Gốc axit là CH3COO- tạo muối natri axetat (CH3COONa).
• Gốc ancol là -C2H5 tạo ancol etylic (C2H5OH). Phản ứng xảy ra một chiều khi đun nóng.`,
    mistakeAnalysis: {
      B: {
        whyWrong: 'Bạn đã đảo ngược số nguyên tử cacbon giữa gốc axit và gốc ancol.',
        commonMistake: 'Nhầm lẫn giữa etyl axetat (CH3COOC2H5) và metyl propionat (C2H5COOCH3).',
        knowledgeGap: 'Quy tắc đọc tên este: Tên gốc hiđrocacbon của ancol + Tên gốc axit đuôi "at". "Etyl" là C2H5, "axetat" là CH3COO-.'
      },
      C: {
        whyWrong: 'Tạo axit CH3COOH và ancolat C2H5ONa là sai bản chất hóa học.',
        commonMistake: 'Nghĩ rằng NaOH chỉ phản ứng với ancol.',
        knowledgeGap: 'Phản ứng xà phòng hóa: NaOH phản ứng tạo muối của axit cacboxylic và giải phóng ancol.'
      },
      D: {
        whyWrong: 'Công thức cấu tạo este trong đáp án này là propyl fomat, không liên quan đến etyl axetat.',
        commonMistake: 'Đoán bừa công thức đồng phân C4H8O2 khác.',
        knowledgeGap: 'Xác định chính xác công thức cấu tạo từ danh pháp IUPAC.'
      }
    },
    errorType: 'conceptual',
    remedyTip: 'Khi cắt este R-COO-R\' trong NaOH: Nhát cắt nằm ở giữa COO và R\'. Gốc RCOO gắn thêm Na ➔ RCOONa; Gốc R\' gắn thêm OH ➔ R\'OH.',
    formulaRef: 'RCOOR\' + NaOH --t°--> RCOONa + R\'OH.'
  },
  {
    id: 'chem-02',
    subject: 'chemistry',
    grade: 12,
    topic: 'Cacbohiđrat',
    difficulty: 'medium',
    content: 'Chất nào sau đây khi thủy phân hoàn toàn trong môi trường axit chỉ thu được duy nhất một loại monosaccarit là glucozơ?',
    options: [
      { id: 'A', text: 'Saccarozơ' },
      { id: 'B', text: 'Tinh bột' },
      { id: 'C', text: 'Fructozơ' },
      { id: 'D', text: 'Protein' }
    ],
    correctOptionId: 'B',
    solution: `Phân tích từng chất:
• Tinh bột: Polisaccarit gồm các gốc α-glucozơ liên kết với nhau. Khi thủy phân hoàn toàn chỉ thu được duy nhất Glucozơ: (C6H10O5)n + nH2O ➔ n C6H12O6 (glucozơ).
• Saccarozơ: Đisaccarit khi thủy phân tạo hỗn hợp 1 phân tử Glucozơ + 1 phân tử Fructozơ.
• Fructozơ: Monosaccarit, không bị thủy phân.
• Protein: Thủy phân tạo các α-amino axit, không phải cacbohiđrat.`,
    mistakeAnalysis: {
      A: {
        whyWrong: 'Saccarozơ khi thủy phân tạo ra cả 2 loại monosaccarit: Glucozơ và Fructozơ (không phải "duy nhất").',
        commonMistake: 'Nhớ là saccarozơ có tạo glucozơ nhưng quên mất nó còn tạo ra cả fructozơ nữa.',
        knowledgeGap: 'Cấu tạo phân tử saccarozơ gồm 1 gốc α-glucozơ và 1 gốc β-fructozơ liên kết qua cầu oxi.'
      },
      C: {
        whyWrong: 'Fructozơ là monosaccarit (đường đơn) nên KHÔNG tham gia phản ứng thủy phân.',
        commonMistake: 'Nhầm lẫn giữa monosaccarit và polisaccarit.',
        knowledgeGap: 'Monosaccarit (Glucozơ, Fructozơ) là đơn vị nhỏ nhất, không thể thủy phân được nữa.'
      },
      D: {
        whyWrong: 'Protein thuộc hợp chất hữu cơ chứa nitơ, thủy phân ra α-amino axit.',
        commonMistake: 'Nhầm nhóm chất.',
        knowledgeGap: 'Protein là polipeptit cấu thành từ các chuỗi amino axit.'
      }
    },
    errorType: 'trap',
    remedyTip: 'Ghi nhớ nhanh: Thủy phân chỉ ra Glucozơ ➔ Tinh bột và Xenlulozơ. Thủy phân ra Glucozơ + Fructozơ ➔ Saccarozơ. Không bị thủy phân ➔ Glucozơ, Fructozơ.',
    formulaRef: 'Tinh bột/Xenlulozơ: (C6H10O5)n + nH2O --H+, t°--> n C6H12O6 (glucozơ).'
  },

  // ─── TIẾNG ANH ────────────────────────────────────────────────────────────
  {
    id: 'eng-01',
    subject: 'english',
    grade: 12,
    topic: 'Thì & Phối hợp thì',
    difficulty: 'medium',
    content: 'By the time my brother arrives home tomorrow evening, I ________ dinner for the whole family.',
    options: [
      { id: 'A', text: 'will prepare' },
      { id: 'B', text: 'will have prepared' },
      { id: 'C', text: 'prepared' },
      { id: 'D', text: 'have prepared' }
    ],
    correctOptionId: 'B',
    solution: `Cấu trúc phối hợp thì với "By the time":
Trong tương lai: By the time + S + V(hiện tại đơn), S + will have + V3/ed (Tương lai hoàn thành).
Giải thích: Hành động nấu bữa tối ("prepare dinner") sẽ được HOÀN TẤT TRƯỚC một thời điểm/hành động khác trong tương lai ("brother arrives tomorrow evening").
Do đó bắt buộc phải dùng thì Tương lai hoàn thành: "will have prepared".`,
    mistakeAnalysis: {
      A: {
        whyWrong: 'Bạn đã dùng thì Tương lai đơn (will prepare) thay vì Tương lai hoàn thành.',
        commonMistake: 'Thấy "tomorrow" nên vội vàng chọn tương lai đơn (will + V), không để ý cụm từ chỉ mốc hoàn tất "By the time".',
        knowledgeGap: '"By the time" mang ý nghĩa "trước lúc", diễn tả hành động đã hoàn thành trước nên phải chia ở dạng hoàn thành (have + V3).'
      },
      C: {
        whyWrong: 'Dùng thì Quá khứ đơn (prepared) trong khi câu có trạng từ tương lai "tomorrow evening".',
        commonMistake: 'Nhầm cấu trúc "By the time + QKĐ, QKHT" trong quá khứ.',
        knowledgeGap: 'Cần quan sát trạng từ thời gian trong mệnh đề phụ: "arrives" (hiện tại đơn mang nghĩa tương lai) và "tomorrow evening".'
      },
      D: {
        whyWrong: 'Dùng thì Hiện tại hoàn thành (have prepared) ở mệnh đề chính.',
        commonMistake: 'Nhầm lẫn về quy tắc phối hợp thì trong tương lai.',
        knowledgeGap: 'Mệnh đề chính trong cấu trúc By the time ở tương lai phải có trợ động từ "will".'
      }
    },
    errorType: 'trap',
    remedyTip: 'Công thức thần thánh: By the time + V(s/es) ➔ will have + V3/ed. By the time + V(ed/cột 2) ➔ had + V3/ed.',
    formulaRef: 'By the time + S + V(present simple), S + will have + P.P.'
  },
  {
    id: 'eng-02',
    subject: 'english',
    grade: 12,
    topic: 'Câu điều kiện & Đảo ngữ',
    difficulty: 'hard',
    content: '________ you need any further assistance with your application, please do not hesitate to contact our admissions office.',
    options: [
      { id: 'A', text: 'If should' },
      { id: 'B', text: 'Should' },
      { id: 'C', text: 'Had' },
      { id: 'D', text: 'Were' }
    ],
    correctOptionId: 'B',
    solution: `Đây là cấu trúc ĐẢO NGỮ CÂU ĐIỀU KIỆN LOẠI 1 (dùng để diễn đạt sự trang trọng, lịch thiệp trong giao tiếp/thư từ):
Cấu trúc gốc: If you should need any further assistance...
Khi bỏ "If", đảo trợ động từ "Should" lên đầu câu:
➔ "Should + S + (not) + V(nguyên thể)..., Mệnh đề chính"
Vậy đáp án đúng là "Should".`,
    mistakeAnalysis: {
      A: {
        whyWrong: 'Thừa cả "If" và "should" ở đầu câu cạnh nhau trước chủ ngữ.',
        commonMistake: 'Khi đã dùng đảo ngữ thì phải BỎ "If". Nếu giữ "If" thì phải là "If you should need...".',
        knowledgeGap: 'Nguyên tắc đảo ngữ câu điều kiện: Bỏ liên từ IF và đảo trợ động từ (Should / Were / Had) ra trước chủ ngữ S.'
      },
      C: {
        whyWrong: 'Dùng "Had" là đảo ngữ câu điều kiện loại 3 (quá khứ không có thật: Had + S + V3).',
        commonMistake: 'Nhớ mang máng công thức đảo ngữ nhưng nhầm loại điều kiện.',
        knowledgeGap: 'Mệnh đề chính là câu mệnh lệnh hiện tại ("please do not hesitate") ➔ Phải là điều kiện loại 1.'
      },
      D: {
        whyWrong: 'Dùng "Were" là đảo ngữ câu điều kiện loại 2 (giả định trái với hiện tại: Were + S + to V).',
        commonMistake: 'Áp dụng nhầm công thức đảo ngữ loại 2.',
        knowledgeGap: 'Điều kiện loại 2 dùng Were; Điều kiện loại 1 dùng Should.'
      }
    },
    errorType: 'conceptual',
    remedyTip: 'Bộ ba đảo ngữ câu điều kiện cần thuộc làu: Loại 1: "Should + S + V...", Loại 2: "Were + S + to V...", Loại 3: "Had + S + V3/ed...".',
    formulaRef: 'Đảo ngữ ĐK loại 1: Should + S + V(bare), S + will/can/imperative + V.'
  },

  // ─── TIN HỌC ──────────────────────────────────────────────────────────────
  {
    id: 'it-01',
    subject: 'informatics',
    grade: 11,
    topic: 'Cấu trúc dữ liệu & Thuật toán',
    difficulty: 'medium',
    content: 'Trong thuật toán tìm kiếm nhị phân (Binary Search) trên một mảng đã được sắp xếp tăng dần gồm n phần tử, độ phức tạp thời gian trong trường hợp xấu nhất (Worst-case time complexity) là:',
    options: [
      { id: 'A', text: 'O(1)' },
      { id: 'B', text: 'O(n)' },
      { id: 'C', text: 'O(log n)' },
      { id: 'D', text: 'O(n²)' }
    ],
    correctOptionId: 'C',
    solution: `Thuật toán Tìm kiếm nhị phân (Binary Search) hoạt động bằng cách:
Ở mỗi bước so sánh phần tử cần tìm với phần tử ở giữa mảng (mid).
Sau mỗi lần so sánh, không gian tìm kiếm giảm đi MỘT NỬA (n/2, n/4, n/8, ..., n/2^k).
Thuật toán dừng lại khi không gian tìm kiếm còn lại 1 phần tử: n / 2^k = 1 ➔ 2^k = n ➔ k = log2(n).
Do đó, số phép so sánh tối đa trong trường hợp xấu nhất là ⌈log2(n)⌉ + 1, tức là O(log n).`,
    mistakeAnalysis: {
      A: {
        whyWrong: 'O(1) là trường hợp tốt nhất (Best-case) khi phần tử cần tìm nằm ngay chính giữa mảng ở lần kiểm tra đầu tiên.',
        commonMistake: 'Nhầm lẫn giữa trường hợp tốt nhất (Best-case) và trường hợp xấu nhất (Worst-case).',
        knowledgeGap: 'Độ phức tạp trường hợp xấu nhất phản ánh số bước tối đa khi phần tử nằm ở rìa mảng hoặc không tồn tại.'
      },
      B: {
        whyWrong: 'O(n) là độ phức tạp của thuật toán Tìm kiếm tuyến tính (Linear Search), không phải tìm kiếm nhị phân.',
        commonMistake: 'Nhầm với thuật toán duyệt tuần tự từng phần tử từ đầu đến cuối mảng.',
        knowledgeGap: 'Binary search tận dụng tính chất mảng ĐÃ SẮP XẾP để loại bỏ 50% số phần tử sau mỗi lần chia đôi.'
      },
      D: {
        whyWrong: 'O(n²) là độ phức tạp của các thuật toán sắp xếp cơ bản như Bubble Sort, Insertion Sort, Selection Sort.',
        commonMistake: 'Nhầm sang độ phức tạp của thuật toán sắp xếp.',
        knowledgeGap: 'Thuật toán tìm kiếm không thể có độ phức tạp n² trừ khi có 2 vòng lặp lồng nhau.'
      }
    },
    errorType: 'conceptual',
    remedyTip: 'Bất cứ khi nào bài toán chia đôi không gian tìm kiếm sau mỗi bước (chia để trị), độ phức tạp chắc chắn chứa O(log n).',
    formulaRef: 'Binary Search: Worst-case = O(log n), Best-case = O(1), Space = O(1).'
  },
  // ─── THÊM CÂU HỎI TOÁN HỌC ────────────────────────────────────────────────
  {
    id: 'math-06',
    subject: 'math',
    grade: 12,
    topic: 'Mũ & Logarit',
    difficulty: 'easy',
    content: 'Tập nghiệm của phương trình log2(x - 1) = 3 là:',
    options: [
      { id: 'A', text: 'S = {7}' },
      { id: 'B', text: 'S = {9}' },
      { id: 'C', text: 'S = {10}' },
      { id: 'D', text: 'S = {8}' }
    ],
    correctOptionId: 'B',
    solution: `Điều kiện xác định: x - 1 > 0 ⇔ x > 1.
Phương trình tương đương:
x - 1 = 2³
x - 1 = 8
x = 9 (thỏa mãn điều kiện x > 1).
Vậy tập nghiệm S = {9}.`,
    mistakeAnalysis: {
      A: {
        whyWrong: 'Bạn đã lấy 8 - 1 = 7 thay vì 8 + 1 = 9 khi chuyển vế.',
        commonMistake: 'Lỗi chuyển vế đổi dấu: x - 1 = 8 ➔ x = 8 - 1 (sai lầm ngớ ngẩn).',
        knowledgeGap: 'Quy tắc chuyển vế: -1 chuyển sang vế phải phải đổi thành +1.'
      },
      C: {
        whyWrong: 'Bạn lấy 3² = 9 rồi cộng 1 = 10 (nhầm cơ số với số mũ).',
        commonMistake: 'Nhầm loga(b) = c ⇔ b = c^a thay vì b = a^c (lấy 3² thay vì 2³).',
        knowledgeGap: 'Định nghĩa logarit: loga(b) = c ⇔ b = a^c với a > 0, a ≠ 1.'
      },
      D: {
        whyWrong: 'Tính ra 2³ = 8 nhưng quên mất số -1 ở vế trái (x - 1).',
        commonMistake: 'Nghĩ rằng x = 2³ = 8.',
        knowledgeGap: 'Biểu thức trong dấu logarit là (x - 1), không phải x.'
      }
    },
    errorType: 'calculation',
    remedyTip: 'Luôn viết điều kiện xác định trước. Công thức: log_a(f(x)) = b ⇔ f(x) = a^b. Chuyển vế cẩn thận đổi dấu.',
    formulaRef: 'log_a(x) = b ⇔ x = a^b (với 0 < a ≠ 1, x > 0).'
  },
  {
    id: 'math-07',
    subject: 'math',
    grade: 12,
    topic: 'Khối đa diện & Thể tích',
    difficulty: 'medium',
    content: 'Cho hình chóp S.ABC có đáy ABC là tam giác vuông tại B, AB = a, BC = a√3. Cạnh bên SA vuông góc với đáy và SA = 2a. Thể tích V của khối chóp S.ABC là:',
    options: [
      { id: 'A', text: 'V = a³√3 / 3' },
      { id: 'B', text: 'V = a³√3' },
      { id: 'C', text: 'V = 2a³√3 / 3' },
      { id: 'D', text: 'V = a³√3 / 6' }
    ],
    correctOptionId: 'A',
    solution: `Bước 1: Tính diện tích đáy ABC (tam giác vuông tại B):
S_ABC = 1/2 · AB · BC = 1/2 · a · a√3 = (a²√3) / 2.
Bước 2: Chiều cao của khối chóp h = SA = 2a.
Bước 3: Thể tích khối chóp:
V = 1/3 · S_đáy · h = 1/3 · ((a²√3) / 2) · 2a = (a³√3) / 3.`,
    mistakeAnalysis: {
      B: {
        whyWrong: 'Bạn đã quên hệ số 1/3 của khối chóp và quên hệ số 1/2 của tam giác vuông.',
        commonMistake: 'Tính theo công thức thể tích khối lăng trụ hoặc hộp: V = S · h.',
        knowledgeGap: 'Thể tích hình CHÓP luôn có hệ số 1/3: V = 1/3 · B · h.'
      },
      C: {
        whyWrong: 'Bạn quên nhân 1/2 khi tính diện tích tam giác vuông ABC (lấy S = AB · BC).',
        commonMistake: 'Nhầm diện tích tam giác vuông với diện tích hình chữ nhật.',
        knowledgeGap: 'Diện tích tam giác vuông bằng một nửa tích hai cạnh góc vuông.'
      },
      D: {
        whyWrong: 'Bạn chia thêm cho 2 không rõ lý do hoặc tính nhầm chiều cao.',
        commonMistake: 'Nhầm lẫn trong việc rút gọn phân số 1/3 · 1/2 · 2 = 1/3.',
        knowledgeGap: 'Rút gọn phân số chứa căn thức.'
      }
    },
    errorType: 'calculation',
    remedyTip: 'Công thức khối chóp: BẮT BUỘC có 1/3. Diện tích tam giác vuông: BẮT BUỘC có 1/2. Gộp lại: V = 1/3 · (1/2 · a · b) · h.',
    formulaRef: 'V_chóp = 1/3 · S_đáy · h.'
  },

  // ─── THÊM CÂU HỎI VẬT LÝ ──────────────────────────────────────────────────
  {
    id: 'phy-04',
    subject: 'physics',
    grade: 12,
    topic: 'Sóng cơ & Sóng âm',
    difficulty: 'easy',
    content: 'Một sóng cơ lan truyền trong môi trường với tốc độ v và tần số f. Bước sóng λ được tính theo công thức:',
    options: [
      { id: 'A', text: 'λ = v / f' },
      { id: 'B', text: 'λ = v · f' },
      { id: 'C', text: 'λ = f / v' },
      { id: 'D', text: 'λ = 2π v / f' }
    ],
    correctOptionId: 'A',
    solution: `Bước sóng λ là quãng đường sóng truyền đi được trong một chu kỳ T:
λ = v · T = v / f.
Mẹo nhớ: "Người v/f" hoặc "v = λ · f" (Vận tốc = Bước sóng × Tần số).`,
    mistakeAnalysis: {
      B: {
        whyWrong: 'Bạn đã lấy tích v · f thay vì phép chia v / f.',
        commonMistake: 'Nhớ nhầm công thức v = λ·f thành λ = v·f.',
        knowledgeGap: 'Từ v = λ·f rút ra λ = v/f (vận tốc chia cho tần số).'
      },
      C: {
        whyWrong: 'Nghịch đảo ngược lại thành f / v.',
        commonMistake: 'Nhầm thứ nguyên: bước sóng là khoảng cách (m), f là (1/s), v là (m/s). Nếu f/v thì đơn vị là 1/m (sai).',
        knowledgeGap: 'Kiểm tra đơn vị: [m] = [m/s] / [1/s] ➔ λ = v/f.'
      },
      D: {
        whyWrong: 'Thừa hệ số 2π của tần số góc ω.',
        commonMistake: 'Nhầm lẫn giữa tần số f và tần số góc ω (v/ω = λ/2π).',
        knowledgeGap: 'Đề bài hỏi theo tần số f, không phải tần số góc ω.'
      }
    },
    errorType: 'conceptual',
    remedyTip: 'Ghi nhớ công thức gốc: v = λ/T = λ·f. Để tìm bước sóng: λ = v·T = v/f.',
    formulaRef: 'λ = v·T = v/f; v = λ·f.'
  },

  // ─── THÊM CÂU HỎI HÓA HỌC ─────────────────────────────────────────────────
  {
    id: 'chem-03',
    subject: 'chemistry',
    grade: 12,
    topic: 'Amin & Amino axit',
    difficulty: 'medium',
    content: 'Dung dịch chất nào sau đây làm quỳ tím chuyển sang màu xanh?',
    options: [
      { id: 'A', text: 'Anilin (C6H5NH2)' },
      { id: 'B', text: 'Metylamin (CH3NH2)' },
      { id: 'C', text: 'Glyxin (H2N-CH2-COOH)' },
      { id: 'D', text: 'Axit glutamic' }
    ],
    correctOptionId: 'B',
    solution: `Phân tích sự đổi màu quỳ tím của các amin và amino axit:
• Metylamin (CH3NH2): Amin no mạch hở, tính bazơ mạnh hơn NH3 ➔ Làm đổi màu quỳ tím sang XANH.
• Anilin (C6H5NH2): Amin thơm, gốc phenyl hút e làm tính bazơ RẤT YẾU (yếu hơn NH3) ➔ KHÔNG làm đổi màu quỳ tím (Cạm bẫy kinh điển!).
• Glyxin: Có 1 nhóm -NH2 và 1 nhóm -COOH (số nhóm bazơ = số nhóm axit) ➔ Môi trường trung tính, quỳ KHÔNG đổi màu.
• Axit glutamic: Có 2 nhóm -COOH và 1 nhóm -NH2 ➔ Môi trường axit, quỳ hóa ĐỎ.`,
    mistakeAnalysis: {
      A: {
        whyWrong: 'Anilin là amin nhưng lực bazơ cực kỳ yếu do vòng benzen hút electron, KHÔNG đủ làm đổi màu quỳ tím!',
        commonMistake: 'BẪY KINH ĐIỂN CỦA HÓA 12: Cứ thấy nhóm -NH2 là nghĩ làm xanh quỳ tím.',
        knowledgeGap: 'Anilin và các amin thơm không làm đổi màu giấy quỳ tím và dung dịch phenolphtalein.'
      },
      C: {
        whyWrong: 'Glyxin có số nhóm NH2 bằng số nhóm COOH (đều bằng 1) nên môi trường trung tính.',
        commonMistake: 'Nghĩ rằng glyxin chứa nhóm amin nên sẽ có tính bazơ làm xanh quỳ.',
        knowledgeGap: 'Amino axit: n(-NH2) = n(-COOH) ➔ Không đổi màu quỳ.'
      },
      D: {
        whyWrong: 'Axit glutamic làm quỳ tím chuyển màu ĐỎ, không phải xanh.',
        commonMistake: 'Nhầm lẫn giữa Axit glutamic (hóa đỏ) và Lysin (hóa xanh).',
        knowledgeGap: 'Axit glutamic có 2 nhóm axit (-COOH) > 1 nhóm amin (-NH2).'
      }
    },
    errorType: 'trap',
    remedyTip: 'Quy tắc quỳ tím với hợp chất nitơ: Amin mạch hở & Lysin ➔ XANH. Anilin & Glyxin, Valin, Alanin ➔ KHÔNG ĐỔI MÀU. Axit glutamic ➔ ĐỎ.',
    formulaRef: 'CH3NH2 + H2O ⇄ CH3NH3+ + OH- (quỳ hóa xanh). C6H5NH2 không đổi màu quỳ.'
  },

  // ─── THÊM CÂU HỎI TIẾNG ANH ───────────────────────────────────────────────
  {
    id: 'eng-03',
    subject: 'english',
    grade: 12,
    topic: 'Mệnh đề quan hệ & Rút gọn',
    difficulty: 'hard',
    content: 'The scientists ________ the groundbreaking research were awarded the prestigious Nobel Prize in Medicine.',
    options: [
      { id: 'A', text: 'conducted' },
      { id: 'B', text: 'conducting' },
      { id: 'C', text: 'who conducting' },
      { id: 'D', text: 'were conducted' }
    ],
    correctOptionId: 'B',
    solution: `Đây là cấu trúc RÚT GỌN MỆNH ĐỀ QUAN HỆ ở thể CHỦ ĐỘNG:
Câu đầy đủ: The scientists WHO CONDUCTED the groundbreaking research were awarded...
Vì chủ ngữ "The scientists" tự mình thực hiện hành động nghiên cứu (chủ động), nên khi rút gọn mệnh đề quan hệ:
➔ Bỏ đại từ quan hệ (who) và chuyển động từ sang dạng V-ing: "conducting".
Do đó đáp án chính xác là "conducting".`,
    mistakeAnalysis: {
      A: {
        whyWrong: 'Nếu chọn "conducted" sẽ tạo thành dạng rút gọn BỊ ĐỘNG (V3/ed), tức là "nhà khoa học bị/được nghiên cứu".',
        commonMistake: 'Thấy hành động đã xảy ra trong quá khứ nên chọn dạng quá khứ V2/V3 mà không phân biệt chủ động hay bị động.',
        knowledgeGap: 'Rút gọn chủ động dùng V-ing; Rút gọn bị động mới dùng V3/ed.'
      },
      C: {
        whyWrong: 'Sai ngữ pháp: Đã có đại từ quan hệ "who" thì động từ phải chia theo thì (who conducted hoặc who were conducting), không thể đứng trơ trọi "who conducting".',
        commonMistake: 'Ghép đại từ quan hệ với V-ing mà thiếu to-be.',
        knowledgeGap: 'Cấu trúc mệnh đề quan hệ chuẩn: Who + Verb chia thì.'
      },
      D: {
        whyWrong: 'Làm câu bị thừa vị ngữ (2 động từ to-be chia thì "were conducted" và "were awarded" đứng cạnh nhau).',
        commonMistake: 'Nhầm lẫn cấu trúc câu phức và câu đơn.',
        knowledgeGap: 'Một câu chỉ có một động từ chính (ở đây là "were awarded").'
      }
    },
    errorType: 'conceptual',
    remedyTip: 'Khi rút gọn MĐQH: Nếu danh từ thực hiện hành động (chủ động) ➔ dùng V-ing. Nếu danh từ chịu tác động (bị động) ➔ dùng V3/ed.',
    formulaRef: 'Active reduced relative clause: N + V-ing. Passive: N + V-ed/P.P.'
  }
];

