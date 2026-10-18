import {
  NotebookEntry,
  Course,
  LeaderboardUser,
  ArenaQuestion,
  FocusParticipant,
  ForumPost,
} from '../types';

// ═════════════════════════════════════════════════════════════════════
// 1. SỔ TAY TỪ VỰNG & CÔNG THỨC (FLASHCARDS)
// ═════════════════════════════════════════════════════════════════════
export const INITIAL_NOTEBOOK_ENTRIES: NotebookEntry[] = [
  // CÔNG THỨC TOÁN HỌC
  {
    id: 'nb-toan-01',
    type: 'formula',
    subject: 'Toán học',
    grade: 'Lớp 12',
    title: 'Đạo hàm hàm số hợp & Bảng đạo hàm lượng giác',
    front: 'Công thức đạo hàm hàm hợp y = f(u(x)) và đạo hàm sin, cos, tan, cot?',
    back: 'y\' = f\'(u) · u\'(x)\n• (sin u)\' = u\' · cos u\n• (cos u)\' = -u\' · sin u\n• (tan u)\' = u\' / cos²u\n• (cot u)\' = -u\' / sin²u',
    exampleOrNote: 'Chú ý dấu trừ khi lấy đạo hàm của cos u và cot u. Khi u là hàm số của x, luôn phải nhân thêm u\'.',
    category: 'Giải tích 12',
    isMastered: false,
    savedAt: '2026-03-25T10:00:00Z',
  },
  {
    id: 'nb-toan-02',
    type: 'formula',
    subject: 'Toán học',
    grade: 'Lớp 12',
    title: 'Khoảng cách từ điểm M(x₀, y₀, z₀) đến mặt phẳng (P): Ax + By + Cz + D = 0',
    front: 'Khoảng cách từ điểm M(x₀, y₀, z₀) đến mặt phẳng (P)?',
    back: 'd(M, (P)) = |A·x₀ + B·y₀ + C·z₀ + D| / √(A² + B² + C²)',
    exampleOrNote: 'Tử số có dấu giá trị tuyệt đối, mẫu số là độ dài vectơ pháp tuyến √(A² + B² + C²).',
    category: 'Hình học Oxyz',
    isMastered: true,
    savedAt: '2026-03-24T14:30:00Z',
  },
  {
    id: 'nb-toan-03',
    type: 'formula',
    subject: 'Toán học',
    grade: 'Lớp 12',
    title: 'Thể tích khối tròn xoay quanh trục Ox',
    front: 'Công thức thể tích vật thể tròn xoay khi quay hình phẳng giới hạn bởi y = f(x), trục Ox, x = a, x = b quanh Ox?',
    back: 'V = π · ∫ [a đến b] [f(x)]² dx',
    exampleOrNote: 'Đừng quên hằng số π ở phía trước tích phân và bình phương của hàm số f(x).',
    category: 'Nguyên hàm - Tích phân',
    isMastered: false,
    savedAt: '2026-03-23T08:15:00Z',
  },

  // CÔNG THỨC VẬT LÝ
  {
    id: 'nb-ly-01',
    type: 'formula',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    title: 'Phương trình trạng thái khí lý tưởng (Clapeyron - Mendeleev)',
    front: 'Mối liên hệ giữa áp suất p, thể tích V, nhiệt độ T và lượng khí n?',
    back: 'p·V = n·R·T = (m/M)·R·T\n(với R = 8.31 J/(mol·K), T là nhiệt độ Kelvin: T = t°C + 273)',
    exampleOrNote: 'Luôn đổi nhiệt độ sang độ Kelvin (K) và thể tích sang m³ khi dùng R = 8.31.',
    category: 'Nhiệt học & Khí lý tưởng',
    isMastered: false,
    savedAt: '2026-03-22T16:00:00Z',
  },
  {
    id: 'nb-ly-02',
    type: 'formula',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    title: 'Cảm ứng từ trong lòng ống dây hình trụ dài',
    front: 'Cảm ứng từ B bên trong lòng ống dây mang dòng điện I có N vòng dây, chiều dài L?',
    back: 'B = 4π · 10⁻⁷ · n · I = 4π · 10⁻⁷ · (N/L) · I',
    exampleOrNote: 'n = N/L là số vòng dây trên 1 mét chiều dài ống dây. Đơn vị B là Tesla (T).',
    category: 'Từ trường',
    isMastered: true,
    savedAt: '2026-03-21T09:40:00Z',
  },

  // CÔNG THỨC HÓA HỌC
  {
    id: 'nb-hoa-01',
    type: 'formula',
    subject: 'Hóa học',
    grade: 'Lớp 12',
    title: 'Phản ứng xà phòng hóa este đơn chức',
    front: 'Phương trình tổng quát thủy phân este R-COO-R\' trong môi trường kiềm (NaOH)?',
    back: 'R-COO-R\' + NaOH → R-COONa (muối) + R\'-OH (ancol)\n• Nếu R\' là gốc phenyl (-C₆H₅): Este của phenol tác dụng theo tỉ lệ 1:2 sinh 2 muối + H₂O.',
    exampleOrNote: 'Bẫy đề thi: Este của phenol R-COO-C₆H₅ + 2NaOH → R-COONa + C₆H₅ONa + H₂O.',
    category: 'Este - Lipit',
    isMastered: false,
    savedAt: '2026-03-20T11:20:00Z',
  },

  // TỪ VỰNG TIẾNG ANH (VOCABULARY & COLLOCATIONS)
  {
    id: 'nb-anh-01',
    type: 'vocab',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    title: 'Collocation: "Come to terms with"',
    front: 'Thành ngữ: "Come to terms with something" nghĩa là gì?',
    back: 'Nghĩa: Dần dần chấp nhận một sự thật/tình huống đau buồn hoặc khó khăn để bước tiếp.\nĐồng nghĩa: Accept, come to grips with.',
    exampleOrNote: 'Ví dụ: She found it hard to come to terms with the failure of her first business.',
    category: 'Idioms & Collocations',
    isMastered: false,
    savedAt: '2026-03-25T15:30:00Z',
  },
  {
    id: 'nb-anh-02',
    type: 'vocab',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    title: 'Vocabulary: "Mitigate" /ˈmɪtɪɡeɪt/',
    front: 'Từ vựng: "Mitigate" (động từ) - Nghĩa, loại từ và từ đồng nghĩa?',
    back: 'Động từ: Làm dịu bớt, làm nhẹ bớt tính nghiêm trọng, giảm nhẹ tác hại.\nTừ đồng nghĩa: Alleviate, lessen, ease, diminish.\nDanh từ: Mitigation (sự giảm nhẹ).',
    exampleOrNote: 'Ví dụ: The government takes urgent actions to mitigate the effects of climate change.',
    category: 'Academic Vocabulary 8+',
    isMastered: true,
    savedAt: '2026-03-24T18:00:00Z',
  },
  {
    id: 'nb-anh-03',
    type: 'vocab',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    title: 'Pharasal Verb: "Put off" vs "Put out"',
    front: 'Phân biệt ý nghĩa giữa "Put off" và "Put out"?',
    back: '• Put off: Hoãn lại (Postpone/Delay), hoặc làm cho ai mất hứng thú.\n• Put out: Dập tắt (lửa, thuốc lá - Extinguish), hoặc phát hành (Publish).',
    exampleOrNote: 'Ví dụ: The match was put off due to bad weather. / Firefighters worked hard to put out the blaze.',
    category: 'Phrasal Verbs',
    isMastered: false,
    savedAt: '2026-03-23T20:10:00Z',
  }
];

// ═════════════════════════════════════════════════════════════════════
// 2. KHO CHUYÊN ĐỀ HỌC TẬP & TÀI LIỆU ÔN THI LỚP 12
// Đã loại bỏ toàn bộ video bài giảng theo yêu cầu hệ thống.
// ═════════════════════════════════════════════════════════════════════
export const INITIAL_COURSES: Course[] = [];


// ═════════════════════════════════════════════════════════════════════
// 3. ĐẤU TRƯỜNG GAMIFICATION & BẢNG XẾP HẠNG TOÀN QUỐC
// ═════════════════════════════════════════════════════════════════════
export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    userId: 'user-top-1',
    name: 'Nguyễn Minh Quân',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    school: 'THPT Chuyên Hà Nội - Amsterdam',
    province: 'Hà Nội',
    xp: 18450,
    streakDays: 42,
    tier: 'Cao Thủ',
    accuracyRate: 96.4,
    mockExamsPassed: 68,
  },
  {
    rank: 2,
    userId: 'user-top-2',
    name: 'Trần Thảo Linh',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    school: 'THPT Chuyên Lê Hồng Phong',
    province: 'TP. Hồ Chí Minh',
    xp: 17200,
    streakDays: 38,
    tier: 'Cao Thủ',
    accuracyRate: 94.8,
    mockExamsPassed: 62,
  },
  {
    rank: 3,
    userId: 'user-top-3',
    name: 'Lê Hoàng Nam',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    school: 'THPT Chuyên Lam Sơn',
    province: 'Thanh Hóa',
    xp: 16100,
    streakDays: 35,
    tier: 'Kim Cương',
    accuracyRate: 93.5,
    mockExamsPassed: 57,
  },
  {
    rank: 4,
    userId: 'user-top-4',
    name: 'Phạm Hải Đăng',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    school: 'THPT Chuyên Quốc Học Huế',
    province: 'Thừa Thiên Huế',
    xp: 14850,
    streakDays: 29,
    tier: 'Kim Cương',
    accuracyRate: 91.8,
    mockExamsPassed: 51,
  },
  {
    rank: 5,
    userId: 'user-top-5',
    name: 'Đỗ Phương Anh',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    school: 'THPT Chuyên Lê Khiết',
    province: 'Quảng Ngãi',
    xp: 13900,
    streakDays: 26,
    tier: 'Kim Cương',
    accuracyRate: 90.4,
    mockExamsPassed: 48,
  },
  {
    rank: 6,
    userId: 'user-top-6',
    name: 'Vũ Đức Trọng',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    school: 'THPT Chu Văn An',
    province: 'Hà Nội',
    xp: 12600,
    streakDays: 21,
    tier: 'Bạch Kim',
    accuracyRate: 88.9,
    mockExamsPassed: 42,
  },
  {
    rank: 7,
    userId: 'user-top-7',
    name: 'Hoàng Bảo Ngọc',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    school: 'THPT Chuyên Lương Thế Vinh',
    province: 'Đồng Nai',
    xp: 11400,
    streakDays: 19,
    tier: 'Bạch Kim',
    accuracyRate: 87.2,
    mockExamsPassed: 39,
  }
];

// CÂU HỎI THI ĐẤU ĐỐI KHÁNG TRỰC TIẾP (ARENA BATTLE)
export const ARENA_QUESTIONS: ArenaQuestion[] = [
  {
    id: 1,
    text: 'Đạo hàm của hàm số y = ln(2x + 1) trên khoảng (-1/2; +∞) là gì?',
    options: [
      { key: 'A', label: 'y\' = 1 / (2x + 1)' },
      { key: 'B', label: 'y\' = 2 / (2x + 1)' },
      { key: 'C', label: 'y\' = -2 / (2x + 1)²' },
      { key: 'D', label: 'y\' = 2 ln(2x + 1)' },
    ],
    correctAnswer: 'B',
    explanation: 'Theo công thức đạo hàm hàm hợp: (ln u)\' = u\' / u. Ở đây u = 2x + 1 ⇒ u\' = 2, do đó y\' = 2 / (2x + 1).',
    timeLimitSeconds: 15,
  },
  {
    id: 2,
    text: 'Trong không gian Oxyz, phương trình mặt phẳng đi qua M(1; 2; 3) và có vectơ pháp tuyến n = (2; -1; 3) là:',
    options: [
      { key: 'A', label: '2x - y + 3z - 9 = 0' },
      { key: 'B', label: '2x - y + 3z + 9 = 0' },
      { key: 'C', label: 'x + 2y + 3z - 14 = 0' },
      { key: 'D', label: '2x - y + 3z = 0' },
    ],
    correctAnswer: 'A',
    explanation: 'Mặt phẳng: 2(x - 1) - 1(y - 2) + 3(z - 3) = 0 ⇔ 2x - y + 3z - 2 + 2 - 9 = 0 ⇔ 2x - y + 3z - 9 = 0.',
    timeLimitSeconds: 15,
  },
  {
    id: 3,
    text: 'Nhiệt độ Kelvin tương ứng với 27°C trong điều kiện tiêu chuẩn là bao nhiêu?',
    options: [
      { key: 'A', label: '246 K' },
      { key: 'B', label: '300 K' },
      { key: 'C', label: '373 K' },
      { key: 'D', label: '273 K' },
    ],
    correctAnswer: 'B',
    explanation: 'T(K) = t(°C) + 273.15 ≈ 27 + 273 = 300 K.',
    timeLimitSeconds: 15,
  },
  {
    id: 4,
    text: 'Chất nào sau đây thuộc loại este no, đơn chức, mạch hở?',
    options: [
      { key: 'A', label: 'CH₃COOCH=CH₂' },
      { key: 'B', label: 'HCOOCH₃' },
      { key: 'C', label: 'CH₂=CH-COOCH₃' },
      { key: 'D', label: 'CH₃COOC₆H₅' },
    ],
    correctAnswer: 'B',
    explanation: 'HCOOCH₃ (metyl fomat) có công thức phân tử C₂H₄O₂, thỏa mãn CnH2nO2 (n ≥ 2) là este no, đơn chức, mạch hở.',
    timeLimitSeconds: 15,
  },
  {
    id: 5,
    text: 'Choose the correct word: "The company had to ______ the meeting until next Monday due to heavy rain."',
    options: [
      { key: 'A', label: 'put out' },
      { key: 'B', label: 'put off' },
      { key: 'C', label: 'put on' },
      { key: 'D', label: 'put up' },
    ],
    correctAnswer: 'B',
    explanation: 'Put off = hoãn lại (delay/postpone). Phù hợp nhất với ngữ cảnh hoãn cuộc họp.',
    timeLimitSeconds: 15,
  }
];

// ═════════════════════════════════════════════════════════════════════
// 4. PHÒNG HỌC TẬP CHUNG (FOCUS STUDY ROOM & STUDY TOGETHER)
// ═════════════════════════════════════════════════════════════════════
export const INITIAL_FOCUS_PARTICIPANTS: FocusParticipant[] = [];

// ═════════════════════════════════════════════════════════════════════
// 5. DIỄN ĐÀN HỌI ĐÁP & HỌC TẬP 24/7 (Q&A FORUM - 100% THÀNH VIÊN THỰC)
// ═════════════════════════════════════════════════════════════════════
export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    authorId: 'user-top-3',
    authorName: 'Lê Hoàng Nam',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    subject: 'Toán học',
    grade: 'Lớp 12',
    title: 'Hỏi về cách tìm tiệm cận xiên của hàm số y = (2x² + 3x - 1) / (x + 1)?',
    content: 'Mọi người cho mình hỏi với đề thi mới 2026 có phần tiệm cận xiên, khi chia đa thức thì phần dư ảnh hưởng thế nào đến phương trình tiệm cận xiên ạ? Xin cảm ơn!',
    createdAt: '2026-03-25T14:20:00Z',
    likesCount: 18,
    repliesCount: 1,
    isSolved: true,
    replies: [
      {
        id: 'rep-1',
        authorName: 'Thầy Hùng (GV Toán THPT Chuyên)',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        authorRole: 'teacher',
        content: 'Chào em! Khi chia đa thức ta có: (2x² + 3x - 1) / (x + 1) = 2x + 1 - 2/(x + 1). Khi x → ±∞ thì phần dư -2/(x + 1) tiến dần về 0. Do đó phương trình tiệm cận xiên chính là phần thương nguyên: y = 2x + 1 nhé!',
        createdAt: '2026-03-25T14:45:00Z',
        likesCount: 24,
      }
    ]
  },
  {
    id: 'post-2',
    authorId: 'user-top-5',
    authorName: 'Đỗ Phương Anh',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    title: 'Phân biệt "In case" và "If" trong câu điều kiện đề thi THPT?',
    content: 'Em hay bị nhầm lẫn giữa "take an umbrella in case it rains" và "take an umbrella if it rains". Có mẹo nào để không bị lừa trong bài trắc nghiệm không ạ?',
    createdAt: '2026-03-24T19:00:00Z',
    likesCount: 22,
    repliesCount: 1,
    isSolved: true,
    replies: [
      {
        id: 'rep-3',
        authorName: 'Cô Mai Lan (Tổ Anh Chuyên)',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
        authorRole: 'teacher',
        content: '• "In case" diễn tả hành động chuẩn bị phòng ngừa trước một khả năng có thể xảy ra: Mang dù phòng khi trời mưa (dù có thể chưa mưa vẫn mang theo).\n• "If" diễn tả hành động chỉ làm KHI sự việc kia xảy ra: Chỉ mang dù nếu trời bắt đầu mưa.',
        createdAt: '2026-03-24T19:10:00Z',
        likesCount: 31,
      }
    ]
  }
];
