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
// 2. KHO KHÓA HỌC TRỰC TUYẾN & BÀI GIẢNG VIDEO (LMS)
// ═════════════════════════════════════════════════════════════════════
export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-toan-12-master',
    title: 'Chinh Phục 9+ Toán 12 Tốt Nghiệp THPT (Chương Trình Mới)',
    description: 'Khóa học video toàn diện bao quát 100% chuyên đề: Khảo sát hàm số nâng cao, Tích phân & Ứng dụng thực tế, Hình học không gian Oxyz và Xác suất thống kê phân hóa 9+.',
    instructor: 'ThS. Trần Quốc Hùng',
    instructorTitle: 'Giáo viên Chuyên Toán - 15 năm luyện thi THPT Quốc Gia',
    subject: 'Toán học',
    grade: 'Lớp 12',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60',
    totalDuration: '18 giờ 45 phút',
    totalLessons: 18,
    rating: 4.95,
    enrolledCount: 14200,
    badge: 'Khóa học nổi bật nhất',
    chapters: [
      {
        id: 'chap-1',
        title: 'Chương 1: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số',
        lessons: [
          {
            id: 'les-1',
            title: 'Bài 1: Tính đơn điệu của hàm số và kỹ thuật xét dấu đạo hàm nhanh',
            durationMinutes: 45,
            videoUrl: 'https://www.youtube.com/embed/OmJ-4B-mS-Y',
            summary: 'Nắm vững định lý mở rộng về tính đơn điệu, kỹ thuật phân tích tam thức bậc hai và xét dấu hàm hợp f(u(x)).',
            isCompleted: true,
          },
          {
            id: 'les-2',
            title: 'Bài 2: Cực trị của hàm số và các bài toán chứa tham số m',
            durationMinutes: 52,
            videoUrl: 'https://www.youtube.com/embed/OmJ-4B-mS-Y',
            summary: 'Phương pháp giải nhanh bài toán cực trị hàm bậc 3, hàm trùng phương và kỹ thuật cô lập m.',
            isCompleted: true,
          },
          {
            id: 'les-3',
            title: 'Bài 3: Giá trị lớn nhất, nhỏ nhất và bài toán ứng dụng thực tế',
            durationMinutes: 48,
            videoUrl: 'https://www.youtube.com/embed/OmJ-4B-mS-Y',
            summary: 'Tối ưu hóa chi phí sản xuất, bài toán hình học cực trị trong kiến trúc và đời sống thực tiễn.',
            isCompleted: false,
          },
          {
            id: 'les-4',
            title: 'Bài 4: Đường tiệm cận của đồ thị hàm số & bẫy mẫu số vô nghiệm',
            durationMinutes: 40,
            videoUrl: 'https://www.youtube.com/embed/OmJ-4B-mS-Y',
            summary: 'Quy tắc tìm tiệm cận đứng, tiệm cận ngang và tiệm cận xiên của hàm phân thức bậc 2 trên bậc 1.',
            isCompleted: false,
          }
        ]
      },
      {
        id: 'chap-2',
        title: 'Chương 2: Tọa độ trong không gian Oxyz và ứng dụng vectơ',
        lessons: [
          {
            id: 'les-5',
            title: 'Bài 5: Tọa độ vectơ và tích có hướng trong giải toán không gian',
            durationMinutes: 50,
            videoUrl: 'https://www.youtube.com/embed/OmJ-4B-mS-Y',
            summary: 'Ứng dụng tích có hướng để tính diện tích tam giác, thể tích khối chóp và khoảng cách giữa 2 đường chéo nhau.',
            isCompleted: false,
          },
          {
            id: 'les-6',
            title: 'Bài 6: Phương trình mặt phẳng và mặt cầu trong Oxyz',
            durationMinutes: 55,
            videoUrl: 'https://www.youtube.com/embed/OmJ-4B-mS-Y',
            summary: 'Lập phương trình mặt phẳng đi qua 3 điểm, phương trình tiếp diện mặt cầu và bài toán cực trị khoảng cách.',
            isCompleted: false,
          }
        ]
      }
    ]
  },
  {
    id: 'course-ly-12-speedup',
    title: 'Tổng Ôn Cấp Tốc Vật Lý 12 – Chuẩn Cấu Trúc BGD Mới',
    description: 'Chinh phục toàn diện phần Nhiệt học, Khí lý tưởng, Từ trường và Vật lý hạt nhân. Tập trung giải quyết dạng câu hỏi Đúng/Sai và Trả lời ngắn.',
    instructor: 'ThS. Nguyễn Văn Đạt',
    instructorTitle: 'Tổ trưởng chuyên môn Vật Lý - Chuyên viên luyện thi',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60',
    totalDuration: '15 giờ 20 phút',
    totalLessons: 14,
    rating: 4.92,
    enrolledCount: 9800,
    badge: 'Mới cập nhật 2026',
    chapters: [
      {
        id: 'chap-ly-1',
        title: 'Chương 1: Vật lý nhiệt và thuyết động học phân tử chất khí',
        lessons: [
          {
            id: 'les-ly-1',
            title: 'Bài 1: Cấu trúc chất và chuyển thể. Nhiệt dung riêng và nhiệt hóa hơi',
            durationMinutes: 42,
            videoUrl: 'https://www.youtube.com/embed/OmJ-4B-mS-Y',
            summary: 'Định luật truyền nhiệt, cân bằng nhiệt và phương pháp tính nhiệt nóng chảy, nhiệt hóa hơi riêng.',
            isCompleted: true,
          },
          {
            id: 'les-ly-2',
            title: 'Bài 2: Các định luật chất khí và phương trình trạng thái khí lý tưởng',
            durationMinutes: 46,
            videoUrl: 'https://www.youtube.com/embed/OmJ-4B-mS-Y',
            summary: 'Quá trình đẳng nhiệt (Boyle), đẳng tích (Charles), đồ thị trạng thái p-V, p-T, V-T.',
            isCompleted: false,
          }
        ]
      }
    ]
  },
  {
    id: 'course-anh-12-mastery',
    title: 'Thực Chiến Ngữ Pháp & 1000 Từ Vựng Tiếng Anh Chinh Phục 8.5+',
    description: 'Lộ trình bứt phá điểm số Tiếng Anh THPT Quốc Gia: Kỹ năng đọc hiểu bài dài, xử lý câu hỏi suy luận, thành ngữ (Idioms) và mệnh đề đảo ngữ nâng cao.',
    instructor: 'Cô Mai Phương (ThS. TESOL)',
    instructorTitle: 'Giảng viên Anh ngữ - Thủ khoa Sư phạm Anh',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=60',
    totalDuration: '16 giờ 40 phút',
    totalLessons: 16,
    rating: 4.97,
    enrolledCount: 16800,
    badge: 'Được đánh giá cao nhất',
    chapters: [
      {
        id: 'chap-anh-1',
        title: 'Chương 1: Các chủ điểm ngữ pháp then chốt trong đề thi THPT',
        lessons: [
          {
            id: 'les-anh-1',
            title: 'Bài 1: Mệnh đề quan hệ & kỹ thuật rút gọn đạt điểm tuyệt đối',
            durationMinutes: 40,
            videoUrl: 'https://www.youtube.com/embed/OmJ-4B-mS-Y',
            summary: 'Rút gọn chủ động bằng V-ing, bị động bằng V-ed/V3 và to-V với số thứ tự.',
            isCompleted: true,
          },
          {
            id: 'les-anh-2',
            title: 'Bài 2: Đảo ngữ nâng cao với No sooner, Not only, Harder và Only when',
            durationMinutes: 45,
            videoUrl: 'https://www.youtube.com/embed/OmJ-4B-mS-Y',
            summary: 'Nguyên tắc đảo trợ động từ lên trước chủ ngữ, cấu trúc đảo ngữ câu điều kiện loại 1, 2, 3.',
            isCompleted: false,
          }
        ]
      }
    ]
  },
  {
    id: 'course-hoa-12-speed',
    title: 'Đột Phá Tư Duy Hóa Học 12: Este - Lipit & Hóa Học Đời Sống',
    description: 'Phương pháp tư duy dồn chất, quy đổi este tạp chức, phân tích bài toán thực nghiệm, điện phân và hợp chất hữu cơ gắn liền với sản xuất công nghiệp.',
    instructor: 'Thầy Nguyễn Hữu Tuấn',
    instructorTitle: 'Chuyên gia luyện thi Hóa Học - Huấn luyện đội tuyển HSG',
    subject: 'Hóa học',
    grade: 'Lớp 12',
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=60',
    totalDuration: '14 giờ 10 phút',
    totalLessons: 12,
    rating: 4.89,
    enrolledCount: 8200,
    chapters: [
      {
        id: 'chap-hoa-1',
        title: 'Chương 1: Chuyên đề Este và Lipit bám sát form 2026',
        lessons: [
          {
            id: 'les-hoa-1',
            title: 'Bài 1: Phản ứng xà phòng hóa và bảo toàn khối lượng/nguyên tố',
            durationMinutes: 48,
            videoUrl: 'https://www.youtube.com/embed/OmJ-4B-mS-Y',
            summary: 'Phương pháp thủy phân este đa chức, bài toán đốt cháy este no đơn chức mạch hở.',
            isCompleted: false,
          }
        ]
      }
    ]
  },
  // ── KHÓA HỌC MẸO LÀM BÀI TRẮC NGHIỆM TẤT CẢ CÁC MÔN ───────────────
  {
    id: 'course-meo-tracnghiem',
    title: 'Mẹo & Kỹ Thuật Làm Bài Trắc Nghiệm THPT Siêu Tốc (Đầy Đủ 8 Môn)',
    description: 'Tổng hợp mẹo loại trừ đáp án, kỹ thuật đoán thông minh, quản lý thời gian 50 phút và tránh các bẫy tâm lý phổ biến trong đề thi trắc nghiệm chuẩn BGD 2025/2026 cho tất cả các môn.',
    instructor: 'Thầy Lê Đình Tường & Ban Chuyên Môn EduViet',
    instructorTitle: 'Chuyên gia luyện thi – 15 năm kinh nghiệm giải mã ma trận đề BGD',
    subject: 'Toán học',
    grade: 'Lớp 12',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60',
    totalDuration: '8 giờ 40 phút',
    totalLessons: 14,
    rating: 4.98,
    enrolledCount: 34200,
    badge: 'HOT – Xem nhiều nhất',
    chapters: [
      {
        id: 'chap-meo-1',
        title: 'Phần 1: Kỹ thuật xử lý đề thi & quản lý thời gian 50 phút chuẩn BGD',
        lessons: [
          {
            id: 'les-meo-1',
            title: 'Mẹo 1: Quy tắc 2-3-5 phút phân bổ thời gian cho 28 câu chuẩn BGD',
            durationMinutes: 30,
            videoUrl: 'https://www.youtube.com/embed/Y7l8Q5GzFPs',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=Y7l8Q5GzFPs',
            summary: 'Chiến thuật chia thời gian: 15 phút đầu làm chắc 18 câu Phần I, 20 phút cho 4 câu Đúng/Sai Phần II, 10 phút cho 6 câu Trả lời ngắn Phần III và 5 phút rà soát phiếu tô.',
            keySteps: [
              'Bước 1: Quét nhanh toàn đề trong 60 giây đầu tiên để nhận diện dạng quen thuộc.',
              'Bước 2: Xử lý dứt điểm 18 câu Phần I (mục tiêu 4.5/4.5 điểm, không để mất điểm nhận biết).',
              'Bước 3: Tập trung cao độ cho Phần II vì tính điểm bậc thang (đúng 4 ý = 1.0đ, đúng 1 ý = 0.1đ).',
              'Bước 4: Phần III điền số cần kiểm tra kỹ đơn vị, làm tròn và dấu âm/dương.'
            ],
            formulaTips: 'Tốc độ vàng: Nhận biết ≤ 30s/câu; Thông hiểu ≤ 60s/câu; Vận dụng ≤ 120s/câu.',
            isCompleted: false,
          },
          {
            id: 'les-meo-2',
            title: 'Mẹo 2: Kỹ thuật loại trừ đáp án bẫy – Tăng 25% xác suất câu khó',
            durationMinutes: 35,
            videoUrl: 'https://www.youtube.com/embed/Jkf-fy63lAc',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=Jkf-fy63lAc',
            summary: 'Cách nhận diện 4 loại bẫy phổ biến của người ra đề: bẫy đổi dấu, bẫy đơn vị (rad/độ, cm/m), bẫy điểm cực trị x so với giá trị cực trị y, và bẫy nghiệm ngoại lai.',
            keySteps: [
              'Bước 1: Tìm cặp đáp án đối xứng hoặc ngược dấu (thường 1 trong 2 là đáp án đúng).',
              'Bước 2: Loại bỏ ngay đáp án có giá trị quá dị biệt hoặc không phù hợp với thực tế vật lý/hóa học.',
              'Bước 3: Sử dụng kỹ thuật thử đáp án ngược từ các phương án có số liệu nguyên đẹp.',
              'Bước 4: Kiểm tra điều kiện xác định trước khi chọn đáp án.'
            ],
            formulaTips: 'Bẫy cực trị: Điểm cực trị là x; Giá trị cực trị là y = f(x); Điểm cực trị của đồ thị là M(x; y).',
            isCompleted: false,
          },
          {
            id: 'les-meo-3',
            title: 'Mẹo 3: Tâm lý thi cử – Xử lý câu lạ, không hoảng loạn & Rà soát 5 phút cuối',
            durationMinutes: 25,
            videoUrl: 'https://www.youtube.com/embed/WuyWAFeMrDw',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=WuyWAFeMrDw',
            summary: 'Kỹ thuật giữ bình tĩnh khi gặp câu hỏi mô hình thực tế dài dòng, phương pháp đọc lướt tìm từ khóa mấu chốt và quy trình rà soát phiếu trả lời không bị lệch dòng.',
            keySteps: [
              'Bước 1: Nếu đọc đề quá 45 giây mà chưa định hình phương pháp -> Đánh dấu tròn và chuyển câu ngay.',
              'Bước 2: Với bài toán thực tế dài: đọc câu hỏi cuối cùng trước để biết đại lượng cần tìm.',
              'Bước 3: Dành 5 phút cuối cùng đối chiếu số thứ tự câu trên đề và trên phiếu trắc nghiệm.',
              'Bước 4: Tuyệt đối không để trống bất kỳ câu trắc nghiệm 4 lựa chọn nào.'
            ],
            formulaTips: 'Quy tắc 45s: Không để bị kẹt tại một câu quá 2 phút trong vòng 1 làm bài.',
            isCompleted: false,
          },
        ],
      },
      {
        id: 'chap-meo-2',
        title: 'Phần 2: Mẹo giải nhanh Khoa học Tự nhiên (Toán - Lý - Hóa - Sinh)',
        lessons: [
          {
            id: 'les-meo-4',
            title: 'Mẹo Toán: Thử giá trị đặc biệt (x=0, 1, -1) & Kỹ thuật vi phân nháp',
            durationMinutes: 40,
            videoUrl: 'https://www.youtube.com/embed/Y7l8Q5GzFPs',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=Y7l8Q5GzFPs',
            summary: 'Thay các số đặc biệt vào hàm số chứa tham số m, nguyên hàm - tích phân chứa f(x), và kỹ thuật vẽ phác đồ thị trong 30 giây để nhận diện số nghiệm phương trình.',
            keySteps: [
              'Bước 1: Chọn giá trị m đặc biệt (m=0, m=1 hoặc m=-1) làm biểu thức triệt tiêu.',
              'Bước 2: Dùng lệnh CALC kiểm tra sự khác biệt giữa các phương án A, B, C, D.',
              'Bước 3: Với bài toán nguyên hàm: bấm d/dx(F(x))|_{x=x₀} rồi trừ đi f(x₀). Nếu bằng 0 thì đúng.',
              'Bước 4: Nhận diện dạng đồ thị bậc 3, bậc 4 qua dấu hệ số a và số điểm cực trị.'
            ],
            formulaTips: 'Nguyên hàm: d/dx[Phương án đúng] - Đề bài = 0 tại điểm ngẫu nhiên x = 1.25.',
            isCompleted: false,
          },
          {
            id: 'les-meo-5',
            title: 'Mẹo Vật Lý: Phân tích thứ nguyên & Suy luận đáp án từ đơn vị đo',
            durationMinutes: 38,
            videoUrl: 'https://www.youtube.com/embed/wGMb_mYJdgg',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=wGMb_mYJdgg',
            summary: 'Kiểm tra công thức bằng thứ nguyên (đơn vị), nhận diện đồ thị dao động điều hòa qua pha ban đầu, trục thời gian t và mẹo tính nhanh công suất cực đại.',
            keySteps: [
              'Bước 1: Phân tích đơn vị vế trái và vế phải xem có khớp nhau không (loại 50% phương án sai).',
              'Bước 2: Tìm vị trí ban đầu t=0 trên đồ thị: nếu x đang đi xuống thì v < 0 (pha dương), đi lên thì v > 0 (pha âm).',
              'Bước 3: Mạch RLC có R biến thiên để P max: R = |Z_L - Z_C| và P_max = U² / (2R).',
              'Bước 4: Hạt nhân: số khối A và điện tích Z luôn bảo toàn trong mọi phản ứng.'
            ],
            formulaTips: 'Pha ban đầu: x = A cos(φ). Nếu v > 0 thì φ < 0; nếu v < 0 thì φ > 0.',
            isCompleted: false,
          },
          {
            id: 'les-meo-6',
            title: 'Mẹo Hóa Học: Bảo toàn electron, bảo toàn nguyên tố & Kỹ thuật dồn chất',
            durationMinutes: 42,
            videoUrl: 'https://www.youtube.com/embed/VHUqCbz0vyo',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=VHUqCbz0vyo',
            summary: 'Phương pháp bảo toàn electron giải nhanh bài toán kim loại tác dụng HNO3/H2SO4 đặc, quy đổi hỗn hợp oxit sắt, và kỹ thuật dồn chất Este về COO, CH2, H2.',
            keySteps: [
              'Bước 1: Lập phương trình trao đổi electron: Tổng mol e cho = Tổng mol e nhận (3n_Fe + 2n_Cu = 3n_NO + n_NO2...).',
              'Bước 2: Dồn chất Este no đơn hở thành: COO (bằng n_NaOH) và hidrocacbon tương ứng.',
              'Bước 3: Bảo toàn nguyên tố C, H, O để tính khối lượng CO2, H2O mà không cần viết phương trình phản ứng.',
              'Bước 4: Kỹ thuật đường chéo pha trộn dung dịch: (m₁/m₂) = |C₂ - C_tb| / |C₁ - C_tb|.'
            ],
            formulaTips: 'Bảo toàn electron: ∑ n_cho . hóa trị = ∑ n_khí . số e trao đổi (NO: 3e, NO₂: 1e, N₂O: 8e, N₂: 10e).',
            isCompleted: false,
          },
          {
            id: 'les-meo-7',
            title: 'Mẹo Sinh Học: Phân tích phả hệ di truyền 30 giây & Bài toán quần thể',
            durationMinutes: 35,
            videoUrl: 'https://www.youtube.com/embed/i-7ZxdVb0sQ',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=i-7ZxdVb0sQ',
            summary: 'Nhận dạng nhanh bệnh do gen trội/lặn, nằm trên NST thường hay NST giới tính X qua sơ đồ phả hệ, và mẹo tính tần số alen trong quần thể tự thụ/ngẫu phối.',
            keySteps: [
              'Bước 1: Bố mẹ bình thường sinh con bị bệnh => Bệnh do gen LẶN quy định.',
              'Bước 2: Bố mẹ bị bệnh sinh con bình thường => Bệnh do gen TRỘI quy định.',
              'Bước 3: Bệnh lặn mà bố bình thường nhưng con gái bị bệnh => Gen nằm trên NST THƯỜNG (không thể trên X).',
              'Bước 4: Cân bằng Hacdi-Vanbec: Tần số alen lặn q = √(tỉ lệ cá thể đồng hợp lặn aa).'
            ],
            formulaTips: 'Quần thể cân bằng: p² AA + 2pq Aa + q² aa = 1 với p + q = 1.',
            isCompleted: false,
          },
        ],
      },
      {
        id: 'chap-meo-3',
        title: 'Phần 3: Mẹo Khoa học Xã hội & Ngoại ngữ (Anh - Sử - Địa - KT&PL)',
        lessons: [
          {
            id: 'les-meo-8',
            title: 'Mẹo Tiếng Anh: Quy tắc phát âm -s/es/ed trong 5 giây & Nhấn trọng âm',
            durationMinutes: 36,
            videoUrl: 'https://www.youtube.com/embed/C4gq-xKxJdY',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=C4gq-xKxJdY',
            summary: 'Câu thần chú nhớ đuôi -s/es ("thời phong kiến phương tây"), đuôi -ed ("tiền đô / chính phủ phát sách...") và quy tắc trọng âm từ 2-3 âm tiết đạt điểm tuyệt đối.',
            keySteps: [
              'Bước 1: Phát âm -s đọc là /s/ khi tận cùng là: /p/, /k/, /f/, /t/, /θ/ ("Thời Phong Kiến Phương Tây").',
              'Bước 2: Phát âm -ed đọc là /ɪd/ khi tận cùng là /t/, /d/ ("Tiền Đô"). Đọc /t/ khi tận cùng là âm vô thanh.',
              'Bước 3: Trọng âm: Danh từ và tính từ 2 âm tiết thường nhấn âm 1; Động từ 2 âm tiết thường nhấn âm 2.',
              'Bước 4: Hậu tố giữ nguyên trọng âm: -ment, -ful, -less, -ness, -ly; Hậu tố nhấn ngay trước nó: -tion, -ic, -ity.'
            ],
            formulaTips: 'Quy tắc trọng âm: Hậu tố -tion/-sion/-ic/-ian luôn nhấn vào âm tiết NGAY TRƯỚC nó.',
            isCompleted: false,
          },
          {
            id: 'les-meo-9',
            title: 'Mẹo Tiếng Anh: Kỹ thuật Scan & Skim đọc hiểu siêu tốc 2 bài đọc',
            durationMinutes: 38,
            videoUrl: 'https://www.youtube.com/embed/WuyWAFeMrDw',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=WuyWAFeMrDw',
            summary: 'Chiến thuật đọc câu hỏi trước tìm Keyword, định vị vị trí câu trả lời trong đoạn văn, xử lý câu hỏi từ đồng nghĩa trong ngữ cảnh và loại trừ câu hỏi suy luận.',
            keySteps: [
              'Bước 1: Đọc câu hỏi và gạch chân các từ khóa đặc biệt (Tên riêng, con số, thuật ngữ in hoa).',
              'Bước 2: Skim (đọc lướt câu đầu và câu cuối mỗi đoạn văn) để nắm ý chính (Main Idea).',
              'Bước 3: Scan (quét mắt nhanh) để tìm lại đúng câu chứa Keyword trong bài.',
              'Bước 4: Đối chiếu ý nghĩa với 4 phương án; chú ý các từ mang tính cực đoan như always, never, completely (thường sai).'
            ],
            formulaTips: 'Phương án chứa "always, only, all, never" có xác suất sai lên đến 85%.',
            isCompleted: false,
          },
          {
            id: 'les-meo-10',
            title: 'Mẹo Lịch Sử: Móc xích dòng thời gian & Nhận dạng từ khóa bước ngoặt',
            durationMinutes: 32,
            videoUrl: 'https://www.youtube.com/embed/LqznkMr9Bm0',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=LqznkMr9Bm0',
            summary: 'Ghi nhớ các mốc lịch sử then chốt 1930 - 1945 - 1954 - 1975, phân biệt bản chất các bước ngoặt kháng chiến và nhận diện từ khóa bản quyền của từng sự kiện.',
            keySteps: [
              'Bước 1: Chiến dịch Việt Bắc 1947: "Phá tan thế bao vây, đưa cuộc kháng chiến sang giai đoạn mới".',
              'Bước 2: Chiến dịch Biên Giới 1950: "Giành quyền chủ động chiến lược trên chiến trường chính Bắc Bộ".',
              'Bước 3: Chiến dịch Điện Biên Phủ 1954: "Đập tan kế hoạch Nava, xoay chuyển cục diện chiến tranh Đông Dương".',
              'Bước 4: Nhận dạng từ khóa: "Bước ngoặt", "Mở đầu", "Kết thúc hoàn toàn", "Quyết định nhất".'
            ],
            formulaTips: 'Việt Bắc = thế chủ động; Biên Giới = quyền chủ động; Điện Biên Phủ = thắng lợi quân sự lớn nhất.',
            isCompleted: false,
          },
          {
            id: 'les-meo-11',
            title: 'Mẹo Địa Lí: Nhận diện 5 dạng biểu đồ trong 3 giây & Công thức tính nhanh',
            durationMinutes: 30,
            videoUrl: 'https://www.youtube.com/embed/OmJ-4B-mS-Y',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=OmJ-4B-mS-Y',
            summary: 'Dấu hiệu nhận biết biểu đồ tròn, miền, cột, đường, kết hợp theo từ khóa trong đề bài và các công thức tính mật độ dân số, cự ly vận chuyển, năng suất cây trồng.',
            keySteps: [
              'Bước 1: Đề có từ "Cơ cấu", "Tỉ trọng" mà số năm ≤ 3 năm => Chọn Biểu đồ TRÒN.',
              'Bước 2: Đề có từ "Chuyển dịch cơ cấu", "Thay đổi cơ cấu" mà số năm ≥ 4 năm => Chọn Biểu đồ MIỀN.',
              'Bước 3: Đề có từ "Tốc độ tăng trưởng", "Tốc độ phát triển" (%) => Chọn Biểu đồ ĐƯỜNG.',
              'Bước 4: Đề có từ "Quy mô và cơ cấu", 2 đơn vị khác nhau (tấn và ha) => Chọn Biểu đồ KẾT HỢP.'
            ],
            formulaTips: 'Mật độ dân số = Dân số / Diện tích (người/km²); Năng suất = Sản lượng / Diện tích (tạ/ha).',
            isCompleted: false,
          },
          {
            id: 'les-meo-12',
            title: 'Mẹo GDKT & PL: Phân tích hành vi vi phạm & Xử lý tình huống pháp luật',
            durationMinutes: 28,
            videoUrl: 'https://www.youtube.com/embed/WuyWAFeMrDw',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=WuyWAFeMrDw',
            summary: 'Kỹ thuật phân tích 4 loại vi phạm pháp luật (hình sự, dân sự, hành chính, kỷ luật) và mẹo vẽ sơ đồ mối quan hệ giữa các nhân vật trong bài tập tình huống.',
            keySteps: [
              'Bước 1: Vi phạm hình sự (tội phạm): mức độ nguy hiểm cao cho xã hội, quy định trong Bộ luật Hình sự.',
              'Bước 2: Vi phạm hành chính: xâm phạm trật tự quản lý nhà nước, xử phạt vi phạm hành chính (phạt tiền, tước giấy phép).',
              'Bước 3: Vi phạm dân sự: xâm phạm quan hệ tài sản và quan hệ nhân thân.',
              'Bước 4: Với câu hỏi tình huống: gạch chân hành vi của từng người (A, B, C) để xem ai vi phạm điều gì, ai không vi phạm.'
            ],
            formulaTips: 'Vi phạm kỷ luật: xâm phạm kỷ luật lao động, học tập của cơ quan, trường học, doanh nghiệp.',
            isCompleted: false,
          },
        ],
      },
    ],
  },
  // ── KHÓA HỌC KỸ THUẬT BẤM MÁY TÍNH CASIO FX-580VN X ĐẦY ĐỦ CÁC MÔN ──
  {
    id: 'course-casio-allsubjects',
    title: 'Bấm Máy Tính Casio FX-580VN X – Tuyệt Kỹ Cho Tất Cả Các Môn Thi',
    description: 'Nắm trọn các phím tắt, chức năng ẩn và thủ thuật bấm máy siêu tốc của Casio FX-580VN X cho 4 môn thi chính: Toán học, Vật lý, Hóa học và Sinh học. Tiết kiệm 15-20 phút làm bài và kiểm tra đáp án chính xác 100%.',
    instructor: 'Thầy Nguyễn Tiến Đạt & Đội Ngũ Thủ Khoa',
    instructorTitle: 'Chuyên gia máy tính Casio – Tác giả bộ cẩm nang Casio thực chiến THPT',
    subject: 'Toán học',
    grade: 'Lớp 12',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=60',
    totalDuration: '7 giờ 15 phút',
    totalLessons: 12,
    rating: 4.99,
    enrolledCount: 38900,
    badge: 'Kỹ năng bắt buộc 100%',
    chapters: [
      {
        id: 'chap-casio-1',
        title: 'Chương 1: Cài đặt tối ưu phòng thi & Phím tắt bí mật',
        lessons: [
          {
            id: 'les-casio-1',
            title: 'Bài 1: Cài đặt máy tính chuẩn phòng thi & Reset bộ nhớ sạch sẽ',
            durationMinutes: 25,
            videoUrl: 'https://www.youtube.com/embed/5GVmw58-MFY',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=5GVmw58-MFY',
            casioKeys: 'SHIFT → 9 → 3 → = → = (Reset All)',
            summary: 'Hướng dẫn Reset toàn bộ máy trước khi thi, cài đặt đơn vị đo góc DEG (Độ) hoặc RAD (Radian), cài đặt hiển thị phân số MathI/MathO và cách chỉnh độ tương phản màn hình.',
            keySteps: [
              'Bước 1: Reset máy về mặc định: Bấm SHIFT 9 3 = = để xóa toàn bộ biến rác và công thức cũ.',
              'Bước 2: Cài đặt đơn vị góc: SHIFT MENU 2 -> Chọn 1 (Degree) cho hình học/Vật lý, chọn 2 (Radian) cho Lượng giác/Tích phân.',
              'Bước 3: Cài đặt hiển thị: SHIFT MENU 1 -> Chọn 1 (Input/Output MathI/MathO).',
              'Bước 4: Bật chế độ 1 bảng hàm số trong TABLE: SHIFT MENU cuộn xuống -> Chọn Table -> Chọn 1 (f(x)) để lấy tối đa 45 dòng dữ liệu.'
            ],
            formulaTips: 'Luôn kiểm tra ký hiệu "D" hoặc "R" trên đỉnh màn hình trước khi tính lượng giác.',
            isCompleted: false,
          },
          {
            id: 'les-casio-2',
            title: 'Bài 2: Tính toán biểu thức phức tạp, gán biến nhớ A-F & Phím CALC',
            durationMinutes: 35,
            videoUrl: 'https://www.youtube.com/embed/bqh3KNZQoK4',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=bqh3KNZQoK4',
            casioKeys: 'STO → [A/B/C/D/x/y] & CALC',
            summary: 'Cách gán kết quả trung gian vào các biến nhớ A, B, C, D, x, y để không bị sai số làm tròn; sử dụng phím CALC để thử nghiệm nhiều giá trị x trong 10 giây.',
            keySteps: [
              'Bước 1: Tính biểu thức bất kỳ -> Bấm phím STO rồi bấm phím chữ cái (ví dụ A) để lưu giá trị.',
              'Bước 2: Để gọi lại biến nhớ: Bấm ALPHA + chữ cái đó trong biểu thức tiếp theo.',
              'Bước 3: Nhập biểu thức chứa x -> Bấm CALC -> Nhập x = 1000 hoặc 0.001 để dò cấu trúc hàm số.',
              'Bước 4: Sử dụng phím ANS để gọi lại kết quả phép tính vừa thực hiện trước đó.'
            ],
            formulaTips: 'Phím STO không cần bấm SHIFT trên dòng máy fx-580VN X.',
            isCompleted: false,
          },
        ],
      },
      {
        id: 'chap-casio-2',
        title: 'Chương 2: Tuyệt kỹ Casio cho môn TOÁN HỌC 12',
        lessons: [
          {
            id: 'les-casio-3',
            title: 'Bài 3: MENU 8 TABLE – Tìm GTLN, GTNN & Khảo sát đồ thị siêu nhanh',
            durationMinutes: 45,
            videoUrl: 'https://www.youtube.com/embed/Y7l8Q5GzFPs',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=Y7l8Q5GzFPs',
            casioKeys: 'MENU → 8 → f(x) → Start → End → Step = (End - Start) / 29',
            summary: 'Sử dụng chức năng Bảng giá trị (TABLE) để tìm Min, Max của hàm số trên đoạn [a; b], đếm số nghiệm phương trình f(x) = 0 và tìm khoảng đồng biến nghịch biến.',
            keySteps: [
              'Bước 1: Bấm MENU 8 để vào chức năng Bảng giá trị.',
              'Bước 2: Nhập hàm số f(x) theo yêu cầu đề bài.',
              'Bước 3: Cài đặt phạm vi: Start = a; End = b; Step = (b - a) / 29 (hoặc chia 44 nếu tắt g(x)).',
              'Bước 4: Rà soát cột F(x): Số lớn nhất là Max, số nhỏ nhất là Min. Vị trí F(x) đổi dấu là nơi có nghiệm.'
            ],
            formulaTips: 'Công thức bước nhảy tối ưu: Step = (End - Start) / 29 để có độ phân giải chính xác nhất.',
            isCompleted: false,
          },
          {
            id: 'les-casio-4',
            title: 'Bài 4: Bấm máy Đạo hàm tại điểm d/dx & Tính Tích phân xác định ∫dx',
            durationMinutes: 40,
            videoUrl: 'https://www.youtube.com/embed/OmJ-4B-mS-Y',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=OmJ-4B-mS-Y',
            casioKeys: 'SHIFT → ∫dx (d/dx) & phím ∫dx',
            summary: 'Kiểm tra đáp án câu hỏi nguyên hàm, tính tích phân phân thức hữu tỉ, tích phân lượng giác và tìm tiếp tuyến của đồ thị hàm số.',
            keySteps: [
              'Bước 1: Kiểm tra nguyên hàm: Nhập d/dx[Phương án A]|_{x = x₀} - [Đề bài f(x₀)].',
              'Bước 2: Chọn x₀ là một số bất kỳ thỏa ĐKXĐ (ví dụ x₀ = 2.3). Nếu kết quả ra 0 hoặc 10⁻¹⁰ thì chọn A.',
              'Bước 3: Bấm tích phân xác định: Bấm phím ∫dx, nhập hàm số và cận dưới, cận trên rồi bấm =.',
              'Bước 4: Lưu kết quả tích phân vào biến A bằng phím STO A để đối chiếu với biểu thức a ln2 + b ln3.'
            ],
            formulaTips: 'Đạo hàm của nguyên hàm F(x) luôn bằng f(x): F\'(x) = f(x).',
            isCompleted: false,
          },
          {
            id: 'les-casio-5',
            title: 'Bài 5: MENU 2 CMPLX – Giải toán Số Phức & Cực trị môđun',
            durationMinutes: 42,
            videoUrl: 'https://www.youtube.com/embed/5GVmw58-MFY',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=5GVmw58-MFY',
            casioKeys: 'MENU → 2 (CMPLX) → Phím ENG (i) & OPTN',
            summary: 'Chuyển sang chế độ số phức, bấm đơn vị ảo i bằng phím ENG, tìm số phức liên hợp Conjg(z), tính môđun |z| bằng phím Abs và giải phương trình bậc hai nghiệm phức.',
            keySteps: [
              'Bước 1: Bấm MENU 2 để chuyển sang môi trường số phức CMPLX.',
              'Bước 2: Bấm phím ENG để nhập đơn vị ảo i.',
              'Bước 3: Bấm OPTN 1 để tính Argument, OPTN 2 để tìm số phức liên hợp Conjg.',
              'Bước 4: Bấm SHIFT ( (Abs) để tính môđun của số phức |z|.'
            ],
            formulaTips: 'Phím OPTN trong CMPLX chứa đầy đủ các phép toán số phức chuyên sâu.',
            isCompleted: false,
          },
          {
            id: 'les-casio-6',
            title: 'Bài 6: MENU 5 VECTOR – Tọa độ Oxyz, Tích có hướng, Khoảng cách & Thể tích',
            durationMinutes: 44,
            videoUrl: 'https://www.youtube.com/embed/bqh3KNZQoK4',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=bqh3KNZQoK4',
            casioKeys: 'MENU → 5 (Vector) → Khai báo VctA, VctB → OPTN 3 × OPTN 4',
            summary: 'Nhập tọa độ các vectơ trong không gian Oxyz, tính tích có hướng [u, v] trong 15 giây, kiểm tra tính đồng phẳng của 4 điểm và tính khoảng cách từ điểm đến mặt phẳng.',
            keySteps: [
              'Bước 1: Bấm MENU 5 -> Chọn 1 (VctA) -> Kích thước 3 -> Nhập tọa độ x, y, z.',
              'Bước 2: Bấm OPTN 1 2 để nhập tiếp vectơ B (VctB).',
              'Bước 3: Tích có hướng [a, b]: Bấm OPTN 3 (VctA) × OPTN 4 (VctB) =.',
              'Bước 4: Tích vô hướng a . b: Bấm OPTN 3 -> OPTN cuộn xuống chọn 2 (Dot Product) -> OPTN 4 =.'
            ],
            formulaTips: 'Tích có hướng: Dấu nhân × giữa 2 vectơ trong Casio tự động hiểu là tích có hướng.',
            isCompleted: false,
          },
        ],
      },
      {
        id: 'chap-casio-3',
        title: 'Chương 3: Tuyệt kỹ Casio cho môn VẬT LÝ 12',
        lessons: [
          {
            id: 'les-casio-7',
            title: 'Bài 7: MENU 2 CMPLX – Tổng hợp dao động điều hòa bằng Số Phức',
            durationMinutes: 42,
            videoUrl: 'https://www.youtube.com/embed/K2OSbMWFpfE',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=K2OSbMWFpfE',
            casioKeys: 'MENU → 2 → Nhập A ∠ φ (SHIFT (-)) → OPTN cuộn xuống 1 (r∠θ)',
            summary: 'Chuyển phương trình dao động điều hòa x = A cos(ωt + φ) thành số phức dạng A ∠ φ; bấm tổng hợp x = x1 + x2 trong 5 giây mà không cần vẽ giản đồ Fresnel.',
            keySteps: [
              'Bước 1: Cài đặt góc Radian (SHIFT MENU 2 2) và vào MENU 2 (CMPLX).',
              'Bước 2: Nhập dao động 1: A₁ SHIFT (-) φ₁ (ký hiệu ∠ nằm ở phím (-)).',
              'Bước 3: Bấm phím + rồi nhập dao động 2: A₂ SHIFT (-) φ₂.',
              'Bước 4: Bấm OPTN cuộn xuống -> Chọn 1 (dạng r∠θ) -> Bấm = để hiển thị Biên độ tổng hợp A và Pha ban đầu φ.'
            ],
            formulaTips: 'Cú pháp: A₁ ∠ φ₁ + A₂ ∠ φ₂ = A_tổng ∠ φ_tổng.',
            isCompleted: false,
          },
          {
            id: 'les-casio-8',
            title: 'Bài 8: Casio cho Điện Xoay Chiều RLC – Tính Z, góc lệch pha φ & Biểu thức i, u',
            durationMinutes: 40,
            videoUrl: 'https://www.youtube.com/embed/wGMb_mYJdgg',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=wGMb_mYJdgg',
            casioKeys: 'Z_phức = R + (Z_L - Z_C)i & i = u / Z_phức',
            summary: 'Biểu diễn trở kháng toàn mạch dưới dạng số phức Z = R + (Z_L - Z_C)i, viết biểu thức cường độ dòng điện tức thời i = u / Z và điện áp các phần tử u_L, u_C, u_R.',
            keySteps: [
              'Bước 1: Tính Z_L = ωL, Z_C = 1/(ωC).',
              'Bước 2: Nhập số phức tổng trở: R + (Z_L - Z_C)i.',
              'Bước 3: Tìm i: Nhập U₀∠φ_u chia cho [R + (Z_L - Z_C)i] rồi chuyển về dạng r∠θ.',
              'Bước 4: Tìm điện áp cuộn cảm u_L: i_phức × (Z_L . i); Tìm u_C: i_phức × (-Z_C . i).'
            ],
            formulaTips: 'Định luật Ôm dạng phức: u_phức = i_phức × Z_phức.',
            isCompleted: false,
          },
        ],
      },
      {
        id: 'chap-casio-4',
        title: 'Chương 4: Tuyệt kỹ Casio cho HÓA HỌC & SINH HỌC',
        lessons: [
          {
            id: 'les-casio-9',
            title: 'Bài 9: Casio MENU 9 – Giải hệ 3-4 ẩn cho bài toán Hóa Học',
            durationMinutes: 38,
            videoUrl: 'https://www.youtube.com/embed/VHUqCbz0vyo',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=VHUqCbz0vyo',
            casioKeys: 'MENU → 9 → 1 (Simul Equation) → Chọn số ẩn 2, 3, 4',
            summary: 'Giải hệ phương trình 3-4 ẩn trong bài toán hỗn hợp kim loại phản ứng axit, bảo toàn electron, bảo toàn nguyên tố và kiểm tra nghiệm âm/dương để loại giả thiết sai.',
            keySteps: [
              'Bước 1: Bấm MENU 9 -> Chọn 1 (Hệ phương trình).',
              'Bước 2: Chọn số lượng ẩn từ 2 đến 4 (Casio 580 hỗ trợ tối đa 4 ẩn).',
              'Bước 3: Nhập các hệ số phương trình theo hàng ngang (a_i, b_i, c_i, d_i và hằng số tự do vế phải).',
              'Bước 4: Bấm = để đọc nghiệm x, y, z tương ứng với số mol các chất.'
            ],
            formulaTips: 'Hệ 4 ẩn: Phương trình khối lượng + Bảo toàn e + Bảo toàn nguyên tố H + Bảo toàn gốc sunfat.',
            isCompleted: false,
          },
          {
            id: 'les-casio-10',
            title: 'Bài 10: Casio Tính Nhanh Số Mol, Tỉ Khối Khí & Dồn Chất Este',
            durationMinutes: 36,
            videoUrl: 'https://www.youtube.com/embed/bqh3KNZQoK4',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=bqh3KNZQoK4',
            casioKeys: 'Phím ab/c & STO gán khối lượng phân tử M',
            summary: 'Kỹ thuật lưu phân tử khối các chất thường gặp (H2SO4=98, NaOH=40, Fe=56, BaSO4=233...) vào biến A-F, tính nhanh tỉ lệ mol và dồn chất este hữu cơ.',
            keySteps: [
              'Bước 1: Lưu các M thường dùng: 56 STO A, 64 STO B, 27 STO C.',
              'Bước 2: Tính tỉ khối d(X/Y) = M_X / M_Y -> Dùng phím phân số ab/c để giữ tỉ lệ đẹp.',
              'Bước 3: Dồn chất Este về COO, CH2, H2: giải hệ 3 phương trình 3 ẩn n_COO, n_CH2, n_H2.',
              'Bước 4: Tính số C trung bình = n_CO2 / n_hỗn hợp để chặn khoảng giá trị.'
            ],
            formulaTips: 'Dồn chất este: n_COO = n_NaOH; n_H2 = n_este; n_CH2 = n_CO2 - n_COO.',
            isCompleted: false,
          },
          {
            id: 'les-casio-11',
            title: 'Bài 11: Casio Sinh Học – Phím nCr tính Tổ hợp Di truyền & Xác suất Mendel',
            durationMinutes: 35,
            videoUrl: 'https://www.youtube.com/embed/i-7ZxdVb0sQ',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=i-7ZxdVb0sQ',
            casioKeys: 'SHIFT → ÷ (nCr) & SHIFT → × (nPr)',
            summary: 'Sử dụng phím nCr (Tổ hợp) để tính xác suất sinh con mang kiểu gen/kiểu hình nhất định, xác suất sinh con trai/gái, và số kiểu gen tối đa trong quần thể.',
            keySteps: [
              'Bước 1: Tính số tổ hợp C(n, k): Bấm n -> SHIFT ÷ -> k (ví dụ: 10 C 3: bấm 10 SHIFT ÷ 3 = 120).',
              'Bước 2: Tính xác suất sinh 3 con có 2 trai 1 gái: C(3, 2) × (1/2)² × (1/2)¹ = 3/8.',
              'Bước 3: Số kiểu gen của gen có n alen trên NST thường: n(n + 1) / 2.',
              'Bước 4: Tính tỉ lệ phân ly kiểu hình theo định luật nhị thức Niutơn (3/4 + 1/4)ⁿ.'
            ],
            formulaTips: 'Số kiểu gen gen có n alen: C(n, 2) + n = n(n + 1)/2.',
            isCompleted: false,
          },
          {
            id: 'les-casio-12',
            title: 'Bài 12: Tổng hợp 50 Phím Tắt Casio fx-580VN X – Tiết Kiệm 20 Phút/Đề',
            durationMinutes: 45,
            videoUrl: 'https://www.youtube.com/embed/5GVmw58-MFY',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=5GVmw58-MFY',
            casioKeys: 'Tổng hợp phím tắt: ENG, STO, CALC, SOLVE, M+, ANS, REPLAY',
            summary: 'Trọn bộ 50 thủ thuật bàn phím: chuyển đổi phân số sang số thập phân S<=>D, phân tích ra thừa số nguyên tố FACT, phím nhớ ANS gọi lại số liệu cũ và tránh các lỗi cú pháp Math ERROR.',
            keySteps: [
              'Bước 1: Phân tích số ra thừa số nguyên tố: Nhập số -> Bấm = -> Bấm SHIFT °\'" (FACT).',
              'Bước 2: Phím chuyển đổi S<=>D: Chuyển tức thì giữa phân số, căn thức và số thập phân.',
              'Bước 3: Nhập lại biểu thức cũ bằng các phím mũi tên Replay để sửa sai mà không cần gõ lại từ đầu.',
              'Bước 4: Sử dụng phím ENG để dịch chuyển dấu phẩy động theo lũy thừa của 10³ (rất tiện cho Vật lý micro/nano/mega).'
            ],
            formulaTips: 'Phím S<=>D: Bấm 1 lần ra số thập phân, bấm SHIFT S<=>D ra hỗn số.',
            isCompleted: false,
          },
        ],
      },
    ],
  },
  // ── KHÓA HỌC CHUYÊN SÂU SINH HỌC 12 ───────────────────────────────
  {
    id: 'course-sinh-12-mastery',
    title: 'Chinh Phục 9+ Sinh Học 12 – Di Truyền Học & Phả Hệ Thực Chiến',
    description: 'Chuyên đề đột phá điểm số Sinh học: Cơ chế di truyền phân tử, quy luật phân ly độc lập, hoán vị gen 3 điểm, phương pháp đọc phả hệ phức tạp và di truyền quần thể.',
    instructor: 'ThS. Chu Văn Nam',
    instructorTitle: 'Tổ phó chuyên môn Sinh Học - Luyện thi THPT Quốc Gia & HSG',
    subject: 'Sinh học',
    grade: 'Lớp 12',
    thumbnail: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=60',
    totalDuration: '12 giờ 30 phút',
    totalLessons: 10,
    rating: 4.93,
    enrolledCount: 11200,
    badge: 'Chương trình mới 2026',
    chapters: [
      {
        id: 'chap-sinh-1',
        title: 'Chương 1: Di truyền học phân tử & Đột biến gen',
        lessons: [
          {
            id: 'les-sinh-1',
            title: 'Bài 1: Cơ chế nhân đôi ADN, phiên mã, dịch mã & bài toán liên kết hidro',
            durationMinutes: 45,
            videoUrl: 'https://www.youtube.com/embed/i-7ZxdVb0sQ',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=i-7ZxdVb0sQ',
            summary: 'Nguyên tắc bổ sung và bán bảo tồn trong nhân đôi ADN, công thức tính số liên kết hidro H = 2A + 3G, số liên kết photphodieste và số chuỗi polipeptit tạo thành.',
            keySteps: [
              'Bước 1: Chiều tổng hợp mạch mới luôn là 5\' -> 3\'.',
              'Bước 2: Mạch khuôn 3\' -> 5\' tổng hợp liên tục; Mạch khuôn 5\' -> 3\' tổng hợp gián đoạn thành đoạn Okazaki.',
              'Bước 3: Enzim tháo xoắn: Helicase; Enzim tổng hợp mạch: ADN pôlimeraza; Enzim nối: Ligaza.',
              'Bước 4: Đột biến thay thế cặp nuclêôtit chỉ làm thay đổi tối đa 1 axit amin.'
            ],
            formulaTips: 'H = 2A + 3G; N = 2A + 2G; L = (N / 2) × 3.4 Å; C = N / 20.',
            isCompleted: false,
          },
          {
            id: 'les-sinh-2',
            title: 'Bài 2: Đột biến số lượng & cấu trúc nhiễm sắc thể',
            durationMinutes: 42,
            videoUrl: 'https://www.youtube.com/embed/bqh3KNZQoK4',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=bqh3KNZQoK4',
            summary: 'Đột biến cấu trúc (mất, lặp, đảo, chuyển đoạn) và đột biến số lượng (thể lệch bội 2n±1, thể đa bội 3n, 4n). Kỹ thuật giải bài toán giảm phân không phân ly.',
            keySteps: [
              'Bước 1: Rối loạn giảm phân I tạo giao tử (n+1) và (n-1) chứa cả 2 chiếc của cặp tương đồng.',
              'Bước 2: Rối loạn giảm phân II tạo giao tử (n+1) chứa 2 cromatit giống hệt nhau.',
              'Bước 3: Hội chứng Đao (3 NST 21), Tocnơ (XO), Claiphentơ (XXY).',
              'Bước 4: Đa bội lẻ (3n, 5n) thường bất thụ, quả không hạt.'
            ],
            formulaTips: 'Thể một: 2n - 1; Thể ba: 2n + 1; Thể tam bội: 3n; Thể tứ bội: 4n.',
            isCompleted: false,
          }
        ]
      }
    ]
  },
  // ── KHÓA HỌC CHUYÊN SÂU LỊCH SỬ & ĐỊA LÍ 12 ────────────────────────
  {
    id: 'course-su-dia-speedup',
    title: 'Bí Quyết 9+ Lịch Sử & Địa Lí THPT Quốc Gia (Đọc Biểu Đồ & Mốc Sự Kiện)',
    description: 'Chinh phục toàn diện khối môn Xã hội: Phương pháp sơ đồ tư duy dòng thời gian Lịch sử Việt Nam (1919-2000), mẹo khai thác biểu đồ và bảng số liệu Địa lí đạt điểm tối đa.',
    instructor: 'Cô Lê Thu Hà & Thầy Hoàng Minh',
    instructorTitle: 'Giáo viên trường Chuyên – Đội ngũ biên soạn đề thi uy tín',
    subject: 'Lịch sử',
    grade: 'Lớp 12',
    thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=60',
    totalDuration: '10 giờ 15 phút',
    totalLessons: 8,
    rating: 4.95,
    enrolledCount: 15600,
    badge: 'Tổng ôn cấp tốc',
    chapters: [
      {
        id: 'chap-sudia-1',
        title: 'Chương 1: Các mốc lịch sử cốt lõi & Cách mạng giải phóng dân tộc',
        lessons: [
          {
            id: 'les-sudia-1',
            title: 'Bài 1: Sơ đồ tư duy phong trào dân tộc dân chủ (1919 - 1930)',
            durationMinutes: 40,
            videoUrl: 'https://www.youtube.com/embed/LqznkMr9Bm0',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=LqznkMr9Bm0',
            summary: 'Chuyển biến kinh tế xã hội sau khai thác thuộc địa lần hai, hoạt động của Nguyễn Ái Quốc tại Pháp - Liên Xô - Trung Quốc và sự thành lập 3 tổ chức cộng sản năm 1929.',
            keySteps: [
              'Bước 1: Khai thác thuộc địa lần 2 (1919-1929): Tư bản Pháp đầu tư nhiều nhất vào Nông nghiệp (cao su) và Khai mỏ (than).',
              'Bước 2: Giai cấp mới ra đời: Giai cấp công nhân và giai cấp tư sản, tiểu tư sản.',
              'Bước 3: Mốc 1920: Nguyễn Ái Quốc đọc Sơ thảo luận cương của Lênin -> Đi theo con đường cách mạng vô sản.',
              'Bước 4: Ngày 3/2/1930: Hợp nhất 3 tổ chức thành Đảng Cộng sản Việt Nam tại Hương Cảng.'
            ],
            formulaTips: 'Hội VN Cách mạng Thanh niên (1925) = Tiền thân của Đảng Cộng sản Việt Nam.',
            isCompleted: false,
          },
          {
            id: 'les-sudia-2',
            title: 'Bài 2: Kỹ năng xử lý câu hỏi trắc nghiệm Địa lí biểu đồ & bảng số liệu',
            durationMinutes: 38,
            videoUrl: 'https://www.youtube.com/embed/OmJ-4B-mS-Y',
            youtubeWatchUrl: 'https://www.youtube.com/watch?v=OmJ-4B-mS-Y',
            summary: 'Công thức tính toán nhanh, nhận xét bảng số liệu tăng/giảm bao nhiêu lần hoặc bao nhiêu %, cách đọc lát cắt địa hình và kỹ thuật loại trừ phương án nhiễu.',
            keySteps: [
              'Bước 1: Tính tốc độ tăng trưởng: Lấy năm sau chia năm gốc × 100% (năm gốc = 100%).',
              'Bước 2: Tính cơ cấu (%): Lấy giá trị từng phần chia cho tổng số × 100%.',
              'Bước 3: Phân biệt "tăng nhanh hơn" (so sánh số lần chia) và "tăng nhiều hơn" (so sánh số tuyệt đối trừ nhau).',
              'Bước 4: Biểu đồ đường thể hiện tốc độ phát triển; Biểu đồ tròn thể hiện quy mô và cơ cấu.'
            ],
            formulaTips: 'Tốc độ tăng trưởng (%) = (Giá trị năm sau / Giá trị năm gốc) × 100%.',
            isCompleted: false,
          }
        ]
      }
    ]
  },
];


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
export const INITIAL_FOCUS_PARTICIPANTS: FocusParticipant[] = [
  {
    id: 'f-1',
    name: 'Hoàng Yến (Hà Nội)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    currentTask: 'Giải 50 câu Toán Chuyên Sư Phạm 2026',
    focusMinutesToday: 135,
    isCamOn: true,
  },
  {
    id: 'f-2',
    name: 'Đức Minh (TP.HCM)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    currentTask: 'Học 30 từ vựng Academic English',
    focusMinutesToday: 90,
    isCamOn: true,
  },
  {
    id: 'f-3',
    name: 'Phương Linh (Đà Nẵng)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    currentTask: 'Ôn tập Este & Lipit Hóa 12',
    focusMinutesToday: 180,
    isCamOn: false,
  },
  {
    id: 'f-4',
    name: 'Tuấn Anh (Nam Định)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    currentTask: 'Làm đề khảo sát Sở Nam Định 2026',
    focusMinutesToday: 210,
    isCamOn: true,
  }
];

// ═════════════════════════════════════════════════════════════════════
// 5. DIỄN ĐÀN HỌI ĐÁP & HỌC TẬP 24/7 (Q&A FORUM)
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
    repliesCount: 2,
    isSolved: true,
    replies: [
      {
        id: 'rep-1',
        authorName: 'Thầy Hùng (GV Toán)',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        authorRole: 'teacher',
        content: 'Chào em! Khi chia đa thức ta có: (2x² + 3x - 1) / (x + 1) = 2x + 1 - 2/(x + 1). Khi x → ±∞ thì phần dư -2/(x + 1) tiến dần về 0. Do đó phương trình tiệm cận xiên chính là phần thương nguyên: y = 2x + 1 nhé!',
        createdAt: '2026-03-25T14:45:00Z',
        likesCount: 24,
      },
      {
        id: 'rep-2',
        authorName: 'EduViet AI Tutor',
        authorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
        authorRole: 'ai_tutor',
        content: 'Mẹo nhớ nhanh: lim[x→±∞] [y - (ax + b)] = 0. Hệ số a = lim(y/x) = 2, hệ số b = lim(y - 2x) = 1. Đồ thị hàm phân thức bậc hai trên bậc nhất luôn có 1 TCĐ và 1 TCX.',
        createdAt: '2026-03-25T14:50:00Z',
        likesCount: 15,
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
        authorName: 'EduViet AI Tutor',
        authorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
        authorRole: 'ai_tutor',
        content: '• "In case" diễn tả hành động chuẩn bị phòng ngừa trước một khả năng có thể xảy ra: Mang dù phòng khi trời mưa (dù có thể chưa mưa vẫn mang theo).\n• "If" diễn tả hành động chỉ làm KHI sự việc kia xảy ra: Chỉ mang dù nếu trời bắt đầu mưa.',
        createdAt: '2026-03-24T19:10:00Z',
        likesCount: 31,
      }
    ]
  }
];
