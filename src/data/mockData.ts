import { DocumentItem, Exam, StudyGoal, DailyStats, SubjectOverview, User } from '../types';
import { ALL_BGD_EXAMS } from './bgdExamBank';
import heroImg from '../assets/images/hero_digital_learning_1790863793186.jpg';
import stemImg from '../assets/images/cover_stem_study_1790863805933.jpg';
import humanitiesImg from '../assets/images/cover_humanities_study_1790863821410.jpg';

export const HERO_IMAGE = heroImg;
export const STEM_IMAGE = stemImg;
export const HUMANITIES_IMAGE = humanitiesImg;

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-dgnl-vact-de2',
    title: 'ĐỀ THI THỬ CHUẨN CẤU TRÚC ĐGNL V-ACT SỐ 2 (ĐHQG TP.HCM)',
    description: 'Trọn bộ đề thi thử ĐGNL 120 câu chuẩn cấu trúc 3 phần: Sử dụng ngôn ngữ (Tiếng Việt & Tiếng Anh), Toán học - Tư duy logic - Phân tích số liệu, và Giải quyết vấn đề (Lý, Hóa, Sinh, Sử, Địa).',
    subject: 'Toán học',
    grade: 'Đại học',
    fileType: 'pdf',
    fileSize: '4.8 MB',
    pageCount: 16,
    author: 'Hệ Thống Luyện Thi Empire',
    views: 31200,
    downloads: 8940,
    publishedDate: '28/06/2026',
    readTimeMinutes: 60,
    coverImage: STEM_IMAGE,
    downloadUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/___t__luy_n_v_act_s__2_1782640977321798975976.pdf',
    directContent: {
      summary: 'Đề rèn luyện thực chiến đánh giá năng lực V-ACT bám sát cấu trúc của Đại học Quốc gia TP.HCM.',
      sections: [
        {
          title: 'Phần 1: Sử dụng ngôn ngữ (40 câu)',
          content: '20 câu Tiếng Việt kiểm tra từ ngữ, ngữ pháp, biện pháp tu từ và phân tích văn bản. 20 câu Tiếng Anh kiểm tra cấu trúc câu, từ vựng và bài đọc hiểu.',
          formulasOrNotes: ['Chiến thuật: Làm trong 30-35 phút để dành thời gian cho phần logic.']
        },
        {
          title: 'Phần 2: Toán học, Tư duy logic, Phân tích số liệu (30 câu)',
          content: '10 câu toán phổ thông, 10 câu suy luận logic mệnh đề và thứ tự, 10 câu phân tích biểu đồ và bảng số liệu thống kê.',
          formulasOrNotes: ['Mẹo: Sử dụng sơ đồ Venn và lập bảng chân trị cho bài toán logic.']
        },
        {
          title: 'Phần 3: Giải quyết vấn đề (50 câu)',
          content: 'Các câu hỏi khoa học tự nhiên (Vật lý, Hóa học, Sinh học) và khoa học xã hội (Lịch sử, Địa lý) ứng dụng thực tế.',
          formulasOrNotes: ['Tập trung phân tích thông tin được cung cấp trong đề bài thay vì học thuộc lòng.']
        }
      ],
      importantTakeaways: [
        'Phân bổ thời gian: 150 phút cho 120 câu (trung bình 1.25 phút/câu).',
        'Không để trống bất kỳ câu trả lời nào vì bài thi không trừ điểm câu sai.',
        'Đọc kỹ các bảng số liệu trước khi tính toán số liệu.'
      ]
    }
  },
  {
    id: 'doc-dgnl-vact-de3',
    title: 'ĐỀ THI THỬ CHUẨN CẤU TRÚC ĐGNL V-ACT SỐ 3 (KÈM ĐÁP ÁN CHI TIẾT)',
    description: 'Đề thi rèn luyện số 3 kèm giải thích chi tiết từng câu hỏi biên soạn bởi đội ngũ Empire Team, giúp nâng cao tốc độ giải đề và khả năng tư duy phân loại cao.',
    subject: 'Toán học',
    grade: 'Đại học',
    fileType: 'pdf',
    fileSize: '5.1 MB',
    pageCount: 22,
    author: 'Hệ Thống Luyện Thi Empire',
    views: 28400,
    downloads: 7810,
    publishedDate: '28/06/2026',
    readTimeMinutes: 50,
    coverImage: STEM_IMAGE,
    downloadUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/___t__luy_n_v_act_s__3_1782640988298852664854.pdf',
    directContent: {
      summary: 'Đề thi thử số 3 kèm lời giải chi tiết cho tất cả các phần thi năng lực V-ACT.',
      sections: [
        {
          title: 'Hướng dẫn giải Phần Logic & Biểu đồ',
          content: 'Phân tích kỹ lưỡng các dạng câu hỏi logic giả định, bài toán xếp chỗ và biểu đồ phân bổ dân số/kinh tế.',
          formulasOrNotes: ['Dùng phương pháp loại suy nhanh để tiết kiệm 50% thời gian.']
        }
      ],
      importantTakeaways: [
        'Ôn luyện thường xuyên để rèn phản xạ tư duy nhanh.',
        'Luyện tập kỹ năng vẽ sơ đồ tư duy cho bài toán thứ tự logic.'
      ]
    }
  },
  {
    id: 'doc-toan-12-01',
    title: 'Sổ Tay Công Thức Giải Tích 12 & Hình Học Không Gian Ôn Thi Tốt Nghiệp',
    description: 'Hệ thống hóa toàn bộ công thức đạo hàm, khảo sát hàm số, tích phân, số phức và phương pháp tọa độ Oxyz trong không gian.',
    subject: 'Toán học',
    grade: 'Lớp 12',
    fileType: 'pdf',
    fileSize: '4.2 MB',
    pageCount: 38,
    author: 'Tổ Toán THPT Chuyên',
    views: 14200,
    downloads: 3890,
    publishedDate: '15/01/2026',
    readTimeMinutes: 45,
    coverImage: STEM_IMAGE,
    directContent: {
      summary: 'Tài liệu tóm lược toàn diện 5 chuyên đề trọng tâm Giải tích và Hình học Oxyz bám sát đề thi tốt nghiệp THPT Quốc Gia môn Toán.',
      sections: [
        {
          title: 'Chuyên đề 1: Đạo hàm và Ứng dụng để Khảo sát Hàm số',
          content: 'Hàm số y = f(x) đồng biến trên K khi f\'(x) ≥ 0, ∀x ∈ K. Cực trị của hàm số: nếu f\'(x₀) = 0 và f\'(x) đổi dấu qua x₀ thì x₀ là điểm cực trị. Chú ý các điều kiện cực trị hàm bậc ba, hàm trùng phương và hàm phân thức bậc nhất/bậc nhất.',
          formulasOrNotes: [
            'y = ax³ + bx² + cx + d: y\' = 3ax² + 2bx + c (Có 2 cực trị khi Δ\' = b² - 3ac > 0)',
            'y = (ax + b)/(cx + d): y\' = (ad - bc)/(cx + d)², hàm số luôn đơn điệu trên từng khoảng xác định',
            'Đường tiệm cận ngang: y = lim f(x) khi x → ±∞; Tiệm cận đứng: x = x₀ khi mẫu số bằng 0'
          ]
        },
        {
          title: 'Chuyên đề 2: Nguyên hàm - Tích phân và Ứng dụng',
          content: 'Bảng nguyên hàm cơ bản và mở rộng. Hai phương pháp cốt lõi: đổi biến số u = u(x) và nguyên hàm từng phần ∫u dv = uv - ∫v du. Ứng dụng tính diện tích hình phẳng giới hạn bởi các đường cong và tính thể tích khối tròn xoay.',
          formulasOrNotes: [
            '∫x^α dx = (x^(α+1))/(α+1) + C (α ≠ -1)',
            '∫(1/x) dx = ln|x| + C',
            'Diện tích S = ∫[a đến b] |f(x) - g(x)| dx',
            'Thể tích xoay trục Ox: V = π ∫[a đến b] [f(x)]² dx'
          ]
        },
        {
          title: 'Chuyên đề 3: Phương pháp tọa độ trong không gian Oxyz',
          content: 'Tọa độ vectơ, tích có hướng của 2 vectơ [u, v]. Phương trình mặt phẳng đi qua M₀(x₀, y₀, z₀) với VTPT n = (A, B, C). Phương trình chính tắc và tham số của đường thẳng. Phương trình mặt cầu tâm I bán kính R.',
          formulasOrNotes: [
            'Khoảng cách từ M(x₀, y₀, z₀) đến (P): d(M, P) = |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²)',
            'Mặt cầu (S): (x - a)² + (y - b)² + (z - c)² = R²',
            'Vị trí tương đối mặt phẳng và mặt cầu: d(I, P) < R (cắt theo đường tròn), d = R (tiếp xúc), d > R (không cắt)'
          ]
        }
      ],
      importantTakeaways: [
        'Luôn kiểm tra điều kiện xác định trước khi tìm nghiệm đạo hàm.',
        'Nhớ công thức tính nhanh diện tích hình phẳng và thể tích nón, trụ, cầu.',
        'Trong không gian Oxyz, ưu tiên dựng hệ trục vuông góc khi gặp các bài toán khoảng cách và góc.'
      ]
    }
  },
  {
    id: 'doc-anh-12-02',
    title: 'Trọng Tâm Ngữ Pháp Tiếng Anh THPT Quốc Gia & Tuyển Tập 500 Cụm Từ Vựng Cốt Lõi',
    description: 'Bao quát 12 thì tiếng Anh, câu điều kiện, câu bị động, mệnh đề quan hệ, đảo ngữ, cấu trúc so sánh và bộ Collocations xuất hiện tần suất cao trong đề thi.',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    fileType: 'docx',
    fileSize: '3.1 MB',
    pageCount: 42,
    author: 'ThS. Nguyễn Mai Linh',
    views: 21300,
    downloads: 5120,
    publishedDate: '10/02/2026',
    readTimeMinutes: 35,
    coverImage: HUMANITIES_IMAGE,
    directContent: {
      summary: 'Tài liệu chuẩn hóa ngữ pháp và từ vựng tinh gọn giúp học sinh tối ưu điểm số phần điền từ, chọn lỗi sai và đọc hiểu.',
      sections: [
        {
          title: 'Phần 1: Mệnh Đề Quan Hệ Rút Gọn (Reduced Relative Clauses)',
          content: 'Có 3 dạng rút gọn phổ biến: V-ing (chủ động), V-ed/V3 (bị động), to-infinitive (khi có số thứ tự the first, the second, the only, the last hoặc tính từ so sánh nhất).',
          formulasOrNotes: [
            'The man who is standing there -> The man standing there...',
            'The bridge which was built in 1990 -> The bridge built in 1990...',
            'He was the first man who set foot on the Moon -> ...the first man to set foot on the Moon'
          ]
        },
        {
          title: 'Phần 2: Câu Điều Kiện & Đảo Ngữ (Conditionals & Inversion)',
          content: 'Ôn tập câu điều kiện loại 1, 2, 3 và hỗn hợp (Mixed conditionals). Cấu trúc đảo ngữ mang tính phân loại học sinh khá - giỏi.',
          formulasOrNotes: [
            'Đảo ngữ Loại 1: Should + S + V(bare), S + will + V...',
            'Đảo ngữ Loại 2: Were + S + to-V (hoặc Were + S + adj/noun)...',
            'Đảo ngữ Loại 3: Had + S + PII, S + would have + PII...',
            'No sooner + Had + S + PII + than + S + Ved (Ngay khi... thì...)'
          ]
        },
        {
          title: 'Phần 3: Collocations & Phrasal Verbs Ăn Điểm Tuyệt Đối',
          content: 'Nắm chắc các cụm từ kết hợp tự nhiên thay vì dịch từng từ đơn lẻ.',
          formulasOrNotes: [
            'make a decision, make a contribution to, make effort',
            'take into account / consideration (cân nhắc kỹ lưỡng)',
            'pay attention to, catch sight of, keep pace with',
            'run out of (cạn kiệt), carry out (tiến hành), bring about (mang lại)'
          ]
        }
      ],
      importantTakeaways: [
        'Chú ý sự hòa hợp giữa chủ ngữ và động từ khi có cụm từ chêm (as well as, along with).',
        'Phân biệt thì Hiện Tại Hoàn Thành và Quá Khứ Đơn qua các trạng từ chỉ thời gian.',
        'Trong bài đọc hiểu, ưu tiên đọc câu hỏi trước khi rà quét chi tiết văn bản (scanning).'
      ]
    }
  },
  {
    id: 'doc-ly-12-03',
    title: 'Chuyên Đề Dao Động Cơ & Sóng Cơ Học - Phương Pháp Giải Nhanh Vật Lý 12',
    description: 'Tuyển tập lý thuyết cô đọng, đường tròn lượng giác đa trục, bài toán khoảng thời gian ngắn nhất và hiện tượng sóng dừng, giao thoa sóng.',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    fileType: 'pdf',
    fileSize: '5.6 MB',
    pageCount: 50,
    author: 'Thầy Trần Quang Huy',
    views: 11800,
    downloads: 3200,
    publishedDate: '28/01/2026',
    readTimeMinutes: 40,
    coverImage: STEM_IMAGE,
    directContent: {
      summary: 'Bí kíp sử dụng vòng tròn lượng giác giải quyết các bài toán thời gian, quãng đường, vận tốc và lực phục hồi.',
      sections: [
        {
          title: '1. Đại Cương Dao Động Điều Hòa',
          content: 'Phương trình li độ x = A.cos(ωt + φ). Vận tốc v = -ωA.sin(ωt + φ) sớm pha π/2 so với li độ. Gia tốc a = -ω²x sớm pha π/2 so với vận tốc và ngược pha với li độ. Lực kéo về F = -kx.',
          formulasOrNotes: [
            'Tần số góc con lắc lò xo: ω = √(k/m)',
            'Tần số góc con lắc đơn: ω = √(g/l)',
            'Hệ thức độc lập: x² + (v/ω)² = A²; v²/(ωA)² + a²/(ω²A)² = 1'
          ]
        },
        {
          title: '2. Sóng Cơ & Sự Truyền Sóng',
          content: 'Bước sóng λ = v.T = v/f là quãng đường sóng truyền đi trong 1 chu kỳ. Độ lệch pha giữa 2 điểm trên cùng phương truyền sóng: Δφ = 2πd/λ. Giao thoa 2 nguồn cùng pha: cực đại khi d₂ - d₁ = kλ; cực tiểu khi d₂ - d₁ = (k + 0.5)λ.',
          formulasOrNotes: [
            'Sóng dừng 2 đầu cố định: L = k.λ/2 (k là số bó sóng, k+1 nút, k bụng)',
            'Sóng dừng 1 đầu cố định 1 đầu tự do: L = (2k + 1).λ/4'
          ]
        }
      ],
      importantTakeaways: [
        'Chú ý phân biệt tốc độ dao động của phần tử môi trường và tốc độ truyền sóng.',
        'Khi viết phương trình sóng tại điểm M sau nguồn O, luôn nhớ trừ pha trễ 2πx/λ.'
      ]
    }
  },
  {
    id: 'doc-hoa-11-04',
    title: 'Sơ Đồ Tư Duy Hóa Học Vô Cơ & Hữu Cơ Lớp 11 (Chương Trình Mới)',
    description: 'Khái quát chuyên đề Cân bằng hóa học, Sự điện ly, Nitơ - Photpho, Carbon - Silic và Đại cương hóa học hữu cơ Hydrocarbon.',
    subject: 'Hóa học',
    grade: 'Lớp 11',
    fileType: 'pdf',
    fileSize: '3.8 MB',
    pageCount: 32,
    author: 'Cô Lê Hoàng Yến',
    views: 8900,
    downloads: 2450,
    publishedDate: '05/02/2026',
    readTimeMinutes: 30,
    coverImage: STEM_IMAGE,
    directContent: {
      summary: 'Hệ thống bản đồ tư duy mindmap giúp ghi nhớ sâu sắc phản ứng trao đổi ion, hằng số cân bằng Kc và phản ứng thế của Alkane, Alkene.',
      sections: [
        {
          title: 'Chương 1: Cân Bằng Hóa Học & Thuyết Điện Ly',
          content: 'Khái niệm phản ứng thuận nghịch. Hằng số cân bằng Kc chỉ phụ thuộc vào nhiệt độ. Nguyên lý chuyển dịch cân bằng Le Chatelier: Khi thay đổi nồng độ, áp suất hoặc nhiệt độ, cân bằng chuyển dịch theo chiều làm giảm tác động đó.',
          formulasOrNotes: [
            'pH = -log[H+]; [H+] . [OH-] = 10^-14 (ở 25°C)',
            'Phản ứng tỏa nhiệt (ΔH < 0): tăng nhiệt độ cân bằng chuyển dịch theo chiều nghịch'
          ]
        },
        {
          title: 'Chương 2: Hydrocarbon Không No & Thơm',
          content: 'Alkene có liên kết đôi C=C tham gia phản ứng cộng Br2, H2O tuân theo quy tắc cộng Markovnikov (nguyên tử H ưu tiên cộng vào C có nhiều H hơn). Benzene tham gia phản ứng thế ưu tiên vị trí ortho và para khi có nhóm đẩy electron.',
          formulasOrNotes: [
            'Nhận biết Alkyne có nối ba đầu mạch (Alkyne-1) bằng dung dịch AgNO3/NH3 xuất hiện kết tủa vàng',
            'Quy tắc tách Zaitsev: nhóm -OH hoặc halogen ưu tiên tách cùng H ở C liền kề bậc cao hơn'
          ]
        }
      ],
      importantTakeaways: [
        'Chất xúc tác chỉ làm tăng tốc độ đạt tới trạng thái cân bằng chứ không làm thay đổi giá trị Kc.',
        'Quy tắc Markovnikov: "Giàu càng thêm giàu" (H vào vị trí nhiều H hơn).'
      ]
    }
  },
  {
    id: 'doc-van-12-05',
    title: 'Cẩm Nang Nghị Luận Xã Hội & Các Dẫn Chứng Thực Tế Tiêu Biểu',
    description: 'Cấu trúc bài viết 200 chữ nghị luận xã hội chuẩn xác, các mở bài - kết bài sáng tạo và kho 30 dẫn chứng người thật việc thật thuyết phục.',
    subject: 'Ngữ văn',
    grade: 'Lớp 12',
    fileType: 'direct',
    fileSize: '2.5 MB',
    pageCount: 26,
    author: 'ThS. Đỗ Thùy Trang',
    views: 18400,
    downloads: 4700,
    publishedDate: '18/02/2026',
    readTimeMinutes: 25,
    coverImage: HUMANITIES_IMAGE,
    directContent: {
      summary: 'Phương pháp đạt trọn vẹn điểm phần viết đoạn văn 200 chữ nghị luận xã hội trong kỳ thi tốt nghiệp.',
      sections: [
        {
          title: 'Công thức đoạn văn 200 chữ: Giải thích - Bàn luận - Dẫn chứng - Bài học',
          content: '1. Mở đoạn (1-2 câu): Dẫn dắt và nêu trực tiếp vấn đề nghị luận. 2. Giải thích (1-2 câu): Nêu ngắn gọn ý nghĩa trọng tâm của từ khóa. 3. Bàn luận (4-6 câu): Phân tích vì sao vấn đề lại có ý nghĩa thiết thực trong đời sống. 4. Dẫn chứng (2 câu): Dẫn chứng tiêu biểu, xác thực, tránh chung chung. 5. Phản đề & Bài học hành động (2-3 câu): Phê phán lối sống tiêu cực và liên hệ bản thân.',
          formulasOrNotes: [
            'Thời gian làm bài đoạn văn 200 chữ tối đa: 20 - 25 phút',
            'Dung lượng an toàn: khoảng 2/3 trang giấy thi đến 1 trang giấy thi'
          ]
        },
        {
          title: 'Kho Dẫn Chứng Tiêu Biểu & Cập Nhật Mới Nhất',
          content: 'Các tấm gương nghị lực vượt khó, chuyển đổi xanh, tinh thần phụng sự cộng đồng của người trẻ Việt Nam.',
          formulasOrNotes: [
            'Tinh thần cống hiến: Đội ngũ y bác sĩ trẻ tình nguyện vùng sâu vùng xa',
            'Khát vọng vươn lên: Vận động viên khuyết tật phá kỷ lục châu Á',
            'Ý thức bảo vệ môi trường: Dự án phục hồi rừng ngập mặn do sinh viên khởi xướng'
          ]
        }
      ],
      importantTakeaways: [
        'Không xuống dòng trong đoạn văn 200 chữ để đảm bảo đúng quy chuẩn thể thức.',
        'Dẫn chứng phải đi kèm phân tích ngắn gọn lý do vì sao dẫn chứng đó làm sáng tỏ luận điểm.'
      ]
    }
  },
  {
    id: 'doc-su-12-06',
    title: 'Hệ Thống Mốc Lịch Sử Việt Nam 1919 - 1975 & Bảng So Sánh Chiến Dịch',
    description: 'Bản đồ thời gian cô đọng các giai đoạn cách mạng Việt Nam, bảng phân tích so sánh chiến dịch Điện Biên Phủ 1954 và chiến dịch Hồ Chí Minh 1975.',
    subject: 'Lịch sử',
    grade: 'Lớp 12',
    fileType: 'docx',
    fileSize: '3.4 MB',
    pageCount: 35,
    author: 'Thầy Phan Thanh Nam',
    views: 9400,
    downloads: 2180,
    publishedDate: '12/02/2026',
    readTimeMinutes: 30,
    coverImage: HUMANITIES_IMAGE,
    directContent: {
      summary: 'Phương pháp liên kết sự kiện lịch sử theo trục thời gian và nguyên nhân - diễn biến - ý nghĩa lịch sử cốt lõi.',
      sections: [
        {
          title: 'Giai đoạn 1930 - 1945: Phong Trào Cách Mạng Đến Thắng Lợi CMT8',
          content: 'Sự kiện thành lập Đảng Cộng sản Việt Nam đầu năm 1930. Ba phong trào tập dượt cách mạng: 1930-1931 (Xô Viết Nghệ Tĩnh), 1936-1939 (Đòi dân sinh dân chủ), 1939-1945 (Chuẩn bị vũ trang khởi nghĩa). Hội nghị Trung ương 8 (5/1941) hoàn chỉnh chuyển hướng chỉ đạo chiến lược: đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.',
          formulasOrNotes: [
            'Hội nghị TW 8 (1941): Thành lập Mặt trận Việt Minh',
            'Chỉ thị "Nhật - Pháp bắn nhau và hành động của chúng ta" (12/3/1945)'
          ]
        },
        {
          title: 'So Sánh Các Chiến Lược Chiến Tranh Của Mỹ Ở Miền Nam',
          content: 'Chiến tranh đặc biệt (1961-1965), Chiến tranh cục bộ (1965-1968), Việt Nam hóa chiến tranh (1969-1973). Nhận diện rõ lực lượng tham chiến, biện pháp chủ yếu và thất bại chiến lược của từng giai đoạn.',
          formulasOrNotes: [
            'Chiến tranh đặc biệt: Quân đội Sài Gòn làm nòng cốt + cố vấn Mỹ',
            'Chiến tranh cục bộ: Quân viễn chinh Mỹ giữ vai trò chủ lực trên chiến trường',
            'Chiến thắng Ấp Bắc (1963) mở đầu khả năng đánh bại Chiến tranh đặc biệt'
          ]
        }
      ],
      importantTakeaways: [
        'Nhớ chính xác bối cảnh lịch sử và ý nghĩa của các nghị quyết Đại hội Đảng.',
        'Phân biệt rõ nhiệm vụ chiến lược và nhiệm vụ trước mắt qua từng thời kỳ.'
      ]
    }
  }
];

export const INITIAL_EXAMS: Exam[] = [
  ...ALL_BGD_EXAMS,
  {
    id: 'exam-toan-mini-01',
    title: 'Đề Thi Thử Tốt Nghiệp THPT 2025 - Môn Toán (Format Chuẩn Bộ GD&ĐT)',
    description: 'Cấu trúc đề thi mới nhất của Bộ GD&ĐT gồm 3 phần: Phần I (Trắc nghiệm nhiều lựa chọn 4 phương án), Phần II (Trắc nghiệm Đúng/Sai 4 ý a,b,c,d tính điểm bậc thang), Phần III (Trả lời ngắn điền số).',
    subject: 'Toán học',
    grade: 'Lớp 12',
    durationMinutes: 50,
    difficulty: 'Format Chuẩn BGD 2025',
    isBGDFormat: true,
    author: 'Hội Đồng Khảo Thí Quốc Gia - EduViet',
    attemptsCount: 4520,
    averageScore: 7.6,
    questions: [
      // PHẦN I: Trắc nghiệm 4 lựa chọn (Mỗi câu đúng 0.25đ)
      {
        id: 101,
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
        difficulty: 'Thông hiểu',
        errorCategory: 'Bẫy đề thi'
      },
      {
        id: 102,
        part: 'I',
        type: 'multiple_choice',
        text: '[Phần I - Câu 2] Cho hình chóp S.ABC có đáy ABC là tam giác vuông tại B, AB = a, BC = a√3. Cạnh bên SA vuông góc với đáy và SA = 2a. Thể tích của khối chóp S.ABC là:',
        options: [
          { key: 'A', label: '(a³√3) / 3' },
          { key: 'B', label: 'a³√3' },
          { key: 'C', label: '(a³√3) / 6' },
          { key: 'D', label: '(2a³√3) / 3' }
        ],
        correctAnswer: 'A',
        explanation: 'Diện tích đáy S_ABC = 1/2 . AB . BC = 1/2 . a . a√3 = (a²√3) / 2. Thể tích V = 1/3 . S_ABC . SA = 1/3 . (a²√3)/2 . 2a = (a³√3) / 3.',
        topic: 'Thể tích khối chóp',
        difficulty: 'Thông hiểu',
        errorCategory: 'Tính toán'
      },
      {
        id: 103,
        part: 'I',
        type: 'multiple_choice',
        text: '[Phần I - Câu 3] Trong không gian Oxyz, cho mặt phẳng (P): 2x - y + 2z - 7 = 0 và điểm M(1; 2; -3). Khoảng cách từ điểm M đến mặt phẳng (P) bằng:',
        options: [
          { key: 'A', label: '13 / 3' },
          { key: 'B', label: '13 / 9' },
          { key: 'C', label: '7 / 3' },
          { key: 'D', label: '5 / 3' }
        ],
        correctAnswer: 'A',
        explanation: 'Áp dụng công thức khoảng cách: d(M, P) = |2(1) - (2) + 2(-3) - 7| / √(2² + (-1)² + 2²) = |2 - 2 - 6 - 7| / √9 = |-13| / 3 = 13/3.',
        topic: 'Phương pháp tọa độ Oxyz',
        difficulty: 'Thông hiểu',
        errorCategory: 'Tính toán'
      },
      {
        id: 104,
        part: 'I',
        type: 'multiple_choice',
        text: '[Phần I - Câu 4] Biết hàm số F(x) là một nguyên hàm của f(x) = 1 / (2x + 1) trên khoảng (0; +∞) và F(0) = 1. Giá trị của F(1) bằng:',
        options: [
          { key: 'A', label: '1 + (1/2)ln3' },
          { key: 'B', label: '1 + ln3' },
          { key: 'C', label: '(1/2)ln3' },
          { key: 'D', label: '2 + (1/2)ln3' }
        ],
        correctAnswer: 'A',
        explanation: 'F(x) = ∫ 1/(2x+1) dx = (1/2)ln(2x+1) + C. Do F(0) = 1 => (1/2)ln(1) + C = 1 => C = 1. Do đó F(1) = (1/2)ln(3) + 1 = 1 + (1/2)ln3.',
        topic: 'Nguyên hàm - Tích phân',
        difficulty: 'Thông hiểu',
        errorCategory: 'Lý thuyết'
      },

      // PHẦN II: Trắc nghiệm Đúng/Sai (Mỗi câu gồm 4 ý a, b, c, d)
      {
        id: 105,
        part: 'II',
        type: 'true_false',
        text: '[Phần II - Câu 1] Cho hàm số y = f(x) = (2x - 1) / (x + 1). Xét tính Đúng/Sai của các mệnh đề sau:',
        topic: 'Khảo sát hàm phân thức hữu tỉ',
        difficulty: 'Vận dụng',
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
            correctAnswer: false // Sai vì y' = (2.1 - (-1).1)/(x+1)^2 = 3/(x+1)^2, và không được dùng từ "trên R" mà phải là "trên từng khoảng xác định"
          },
          {
            id: 'd',
            text: 'Giao điểm của hai đường tiệm cận là tâm đối xứng I(-1; 2) của đồ thị hàm số.',
            correctAnswer: true
          }
        ],
        explanation: 'Mệnh đề a ĐÚNG: mẫu x + 1 ≠ 0 <=> x ≠ -1. Mệnh đề b ĐÚNG: lim x→±∞ = 2 => TCN y = 2, nghiệm mẫu x = -1 => TCĐ x = -1. Mệnh đề c SAI: y\' = 3/(x+1)² > 0, hàm số đồng biến trên (-∞; -1) và (-1; +∞), kết luận đồng biến trên R là sai bản chất. Mệnh đề d ĐÚNG: tâm đối xứng của hàm nhất biến là giao hai tiệm cận I(-1; 2).'
      },
      {
        id: 106,
        part: 'II',
        type: 'true_false',
        text: '[Phần II - Câu 2] Trong không gian với hệ tọa độ Oxyz, cho bốn điểm A(1; 0; 0), B(0; 2; 0), C(0; 0; 4) và điểm D(1; 2; 4). Xét tính Đúng/Sai của các khẳng định sau:',
        topic: 'Hình học tọa độ Oxyz',
        difficulty: 'Vận dụng cao',
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
            correctAnswer: true // Quy đồng mẫu 4: 4x + 2y + z - 4 = 0 => n = (4; 2; 1)
          },
          {
            id: 'c',
            text: 'Điểm D(1; 2; 4) thuộc mặt phẳng (ABC).',
            correctAnswer: false // 4(1) + 2(2) + 4 - 4 = 4 + 4 + 4 - 4 = 8 ≠ 0
          },
          {
            id: 'd',
            text: 'Thể tích của khối tứ diện ABCD bằng 4 (đơn vị thể tích).',
            correctAnswer: false // V = 1/6 |[AB, AC].AD| = 1/6 |(4; 2; 1).(0; 2; 4)| = 1/6 |0 + 4 + 4| = 8/6 = 4/3 ≠ 4
          }
        ],
        explanation: 'Mệnh đề a ĐÚNG: Ba điểm nằm trên 3 trục tọa độ Ox, Oy, Oz nên PT theo đoạn chắn x/1 + y/2 + z/4 = 1. Mệnh đề b ĐÚNG: Nhân 4 hai vế được 4x + 2y + z - 4 = 0 => VTPT (4; 2; 1). Mệnh đề c SAI: Thay tọa độ D vào ta có 4.1 + 2.2 + 4 = 12 ≠ 4. Mệnh đề d SAI: V_ABCD = 1/3 . S_ABC . d(D, ABC) = 4/3.'
      },

      // PHẦN III: Trắc nghiệm Trả lời ngắn (Thí sinh điền kết quả dạng số)
      {
        id: 107,
        part: 'III',
        type: 'short_answer',
        text: '[Phần III - Câu 1] Một người gửi 100 triệu đồng vào ngân hàng với lãi suất 6%/năm theo hình thức lãi kép hàng năm. Hỏi sau bao nhiêu năm thì người đó nhận được số tiền cả gốc lẫn lãi vượt quá 150 triệu đồng? (Nhập kết quả là số nguyên năm nhỏ nhất).',
        shortAnswerCorrect: '7',
        topic: 'Hàm số mũ & Lãi suất thực tế',
        difficulty: 'Thông hiểu',
        errorCategory: 'Phương pháp',
        explanation: 'Công thức lãi kép: A = P(1 + r)ⁿ. Ta có 100(1 + 0.06)ⁿ > 150 <=> 1.06ⁿ > 1.5 <=> n > log₁,₀₆(1.5) ≈ 6.958 năm. Vậy sau ít nhất 7 năm thì số tiền vượt quá 150 triệu đồng. Đáp số: 7.'
      },
      {
        id: 108,
        part: 'III',
        type: 'short_answer',
        text: '[Phần III - Câu 2] Tìm giá trị nhỏ nhất của hàm số f(x) = x + 4/x trên khoảng (0; +∞).',
        shortAnswerCorrect: '4',
        topic: 'Bất đẳng thức & Cực trị',
        difficulty: 'Nhận biết',
        errorCategory: 'Tính toán',
        explanation: 'Áp dụng bất đẳng thức Cauchy cho hai số dương x và 4/x: x + 4/x ≥ 2√(x . 4/x) = 2√4 = 4. Dấu bằng xảy ra khi x = 4/x <=> x² = 4 <=> x = 2 (do x > 0). Vậy min = 4.'
      },
      {
        id: 109,
        part: 'III',
        type: 'short_answer',
        text: '[Phần III - Câu 3] Tính diện tích hình phẳng giới hạn bởi parabol y = x² - 2x và trục hoành Ox. (Làm tròn đến 2 chữ số thập phân, ví dụ 1.33).',
        shortAnswerCorrect: '1.33',
        topic: 'Ứng dụng tích phân tính diện tích',
        difficulty: 'Vận dụng',
        errorCategory: 'Tính toán',
        explanation: 'Phương trình hoành độ giao điểm x² - 2x = 0 <=> x = 0 hoặc x = 2. Diện tích S = ∫[0 to 2] |x² - 2x| dx = -∫[0 to 2] (x² - 2x) dx = -(x³/3 - x²)|₀² = -(8/3 - 4) = 4/3 ≈ 1.33.'
      },
      {
        id: 110,
        part: 'III',
        type: 'short_answer',
        text: '[Phần III - Câu 4] Một hộp có 6 bi đỏ và 4 bi xanh. Chọn ngẫu nhiên đồng thời 3 viên bi. Xác suất để chọn được ít nhất 1 viên bi xanh bằng bao nhiêu? (Làm tròn đến 3 chữ số thập phân, ví dụ 0.833).',
        shortAnswerCorrect: '0.833',
        topic: 'Xác suất cổ điển',
        difficulty: 'Vận dụng',
        errorCategory: 'Bẫy đề thi',
        explanation: 'Không gian mẫu n(Ω) = C(10, 3) = 120. Biến cố đối Ā là chọn 3 viên đều màu đỏ: n(Ā) = C(6, 3) = 20. Xác suất chọn được ít nhất 1 bi xanh là P(A) = 1 - P(Ā) = 1 - 20/120 = 1 - 1/6 = 5/6 ≈ 0.833.'
      }
    ]
  },
  {
    id: 'exam-ly-mini-01',
    title: 'Đề Thi Thử Tốt Nghiệp THPT 2025 - Môn Vật Lí (Format Chuẩn Bộ GD&ĐT)',
    description: 'Bám sát định dạng cấu trúc 2025 Chương trình GDPT mới gồm 3 phần: Trắc nghiệm 4 lựa chọn, Trắc nghiệm Đúng/Sai, và Trả lời ngắn số học.',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    durationMinutes: 45,
    difficulty: 'Format Chuẩn BGD 2025',
    isBGDFormat: true,
    author: 'Tổ Vật Lý THPT Chuyên & EduViet',
    attemptsCount: 3120,
    averageScore: 7.2,
    questions: [
      {
        id: 201,
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
        errorCategory: 'Tính toán'
      },
      {
        id: 202,
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
        errorCategory: 'Lý thuyết'
      },
      {
        id: 203,
        part: 'II',
        type: 'true_false',
        text: '[Phần II - Câu 1] Một khối khí lý tưởng chuyển trạng thái từ (1) sang (2). Xét tính Đúng/Sai của các phát biểu sau về thuyết động học phân tử và định luật nhiệt động lực học:',
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
            correctAnswer: false // Định luật Boyle: Áp suất tỉ lệ nghịch với thể tích (p.V = const)
          },
          {
            id: 'c',
            text: 'Độ biến thiên nội năng của khối khí bằng tổng nhiệt lượng và công mà khối khí nhận được: ΔU = Q + A.',
            correctAnswer: true
          },
          {
            id: 'd',
            text: 'Nếu khối khí sinh công 50 J và tỏa nhiệt lượng 30 J thì nội năng khối khí tăng 20 J.',
            correctAnswer: false // Khối khí sinh công => A = -50 J; tỏa nhiệt => Q = -30 J. ΔU = -30 + (-50) = -80 J (giảm 80 J)
          }
        ],
        explanation: 'Ý a ĐÚNG: E_d = (3/2)kT, tỉ lệ thuận với T. Ý b SAI: Quá trình đẳng nhiệt thì p và V tỉ lệ nghịch (p.V = hằng số). Ý c ĐÚNG: Nguyên lý I nhiệt động lực học ΔU = Q + A. Ý d SAI: Khối khí sinh công nên A = -50, tỏa nhiệt Q = -30 => ΔU = -80 J.'
      },
      {
        id: 204,
        part: 'III',
        type: 'short_answer',
        text: '[Phần III - Câu 1] Một con lắc lò xo có khối lượng m = 100 g và độ cứng k = 40 N/m. Lấy π² = 10. Tần số dao động của con lắc bằng bao nhiêu Hz? (Nhập kết quả số nguyên hoặc thập phân).',
        shortAnswerCorrect: '3.16',
        topic: 'Con lắc lò xo',
        difficulty: 'Thông hiểu',
        errorCategory: 'Tính toán',
        explanation: 'f = 1/(2π) √(k/m) = 1/(2π) √(40 / 0.1) = 1/(2π) √400 = 20 / (2π) = 10/π ≈ 3.16 Hz.'
      },
      {
        id: 205,
        part: 'III',
        type: 'short_answer',
        text: '[Phần III - Câu 2] Trong thí nghiệm giao thoa ánh sáng Young với a = 1 mm, D = 2 m. Chiếu ánh sáng đơn sắc có bước sóng λ = 0.5 μm. Khoảng vân giao thoa i trên màn bằng bao nhiêu mm?',
        shortAnswerCorrect: '1',
        topic: 'Sóng ánh sáng',
        difficulty: 'Nhận biết',
        errorCategory: 'Tính toán',
        explanation: 'Khoảng vân i = λD / a = (0.5 . 10⁻³ mm . 2000 mm) / 1 mm = 1.0 mm. Đáp số: 1.'
      }
    ]
  },
  {
    id: 'exam-hoa-mini-01',
    title: 'Đề Thi Thử Tốt Nghiệp THPT 2025 - Môn Hóa Học (Format Chuẩn Bộ GD&ĐT)',
    description: 'Chuẩn format đề thi 3 phần Chương trình GDPT 2018: Este-Lipit, Polime, Cân bằng ion và Hóa đại cương vô cơ.',
    subject: 'Hóa học',
    grade: 'Lớp 12',
    durationMinutes: 45,
    difficulty: 'Format Chuẩn BGD 2025',
    isBGDFormat: true,
    author: 'Tổ Chuyên Môn Hóa Học - EduViet',
    attemptsCount: 2890,
    averageScore: 7.1,
    questions: [
      {
        id: 301,
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
        errorCategory: 'Lý thuyết'
      },
      {
        id: 302,
        part: 'II',
        type: 'true_false',
        text: '[Phần II - Câu 1] Cho các nhận định sau về Cacbohiđrat (Gluxit). Xét tính Đúng/Sai của mỗi nhận định:',
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
            correctAnswer: false // Hệ số polime hóa n khác nhau rất nhiều nên không phải đồng phân
          },
          {
            id: 'c',
            text: 'Dung dịch glucozơ tác dụng với dung dịch AgNO₃ trong NH₃ đun nóng sinh ra kết tủa Ag trắng sáng.',
            correctAnswer: true
          },
          {
            id: 'd',
            text: 'Thủy phân hoàn toàn xenlulozơ trong môi trường axit sinh ra sản phẩm duy nhất là saccarozơ.',
            correctAnswer: false // Sinh ra glucozơ
          }
        ],
        explanation: 'Ý a ĐÚNG: Glucozơ và fructozơ đều có CTPT C₆H₁₂O₆. Ý b SAI: n của tinh bột và xenlulozơ khác nhau nhiều nên không phải đồng phân. Ý c ĐÚNG: glucozơ có nhóm -CHO nên có phản ứng tráng bạc. Ý d SAI: thủy phân xenlulozơ thu được glucozơ.'
      },
      {
        id: 303,
        part: 'III',
        type: 'short_answer',
        text: '[Phần III - Câu 1] Cho 8.8 gam etyl axetat (CH₃COOC₂H₅, M = 88 g/mol) tác dụng hoàn toàn với dung dịch NaOH vừa đủ, đun nóng. Khối lượng muối natri axetat (CH₃COONa, M = 82 g/mol) thu được bằng bao nhiêu gam? (Nhập kết quả số thập phân, ví dụ 8.2).',
        shortAnswerCorrect: '8.2',
        topic: 'Phản ứng xà phòng hóa este',
        difficulty: 'Thông hiểu',
        errorCategory: 'Tính toán',
        explanation: 'n_este = 8.8 / 88 = 0.1 mol. Phản ứng: CH₃COOC₂H₅ + NaOH -> CH₃COONa + C₂H₅OH. Số mol muối n_CH₃COONa = 0.1 mol => Khối lượng m = 0.1 . 82 = 8.2 gam. Đáp số: 8.2.'
      }
    ]
  },
  {
    id: 'exam-toan-12-01',
    title: 'Đề Thi Thử Tốt Nghiệp THPT 2026 - Môn Toán (Đề Số 01)',
    description: 'Đề thi trắc nghiệm chuẩn cấu trúc đổi mới của Bộ GD&ĐT gồm 15 câu chọn lọc bao quát hàm số, tích phân, xác suất và hình học không gian Oxyz.',
    subject: 'Toán học',
    grade: 'Lớp 12',
    durationMinutes: 30,
    difficulty: 'Thi thử THPT',
    author: 'Ban Chuyên Môn Toán EduViet',
    attemptsCount: 3840,
    averageScore: 7.4,
    questions: [
      {
        id: 1,
        text: 'Cho hàm số y = f(x) có bảng xét dấu đạo hàm như sau: f\'(x) > 0 trên (-∞, -1) và (2, +∞); f\'(x) < 0 trên (-1, 2). Hỏi hàm số đã cho nghịch biến trên khoảng nào dưới đây?',
        options: [
          { key: 'A', label: '(-1; 2)' },
          { key: 'B', label: '(-∞; -1)' },
          { key: 'C', label: '(2; +∞)' },
          { key: 'D', label: '(0; 3)' }
        ],
        correctAnswer: 'A',
        explanation: 'Hàm số nghịch biến trên khoảng mà đạo hàm f\'(x) < 0. Theo bảng xét dấu, f\'(x) < 0 với mọi x thuộc khoảng (-1; 2). Do đó hàm số nghịch biến trên khoảng (-1; 2).',
        topic: 'Giải tích - Khảo sát hàm số'
      },
      {
        id: 2,
        text: 'Đồ thị của hàm số y = (2x - 1) / (x + 1) có đường tiệm cận đứng là:',
        options: [
          { key: 'A', label: 'x = 2' },
          { key: 'B', label: 'x = -1' },
          { key: 'C', label: 'y = 2' },
          { key: 'D', label: 'y = -1' }
        ],
        correctAnswer: 'B',
        explanation: 'Phương trình tiệm cận đứng là nghiệm của mẫu số x + 1 = 0 ⇔ x = -1. Tiệm cận ngang là y = 2/1 = 2.',
        topic: 'Giải tích - Tiệm cận'
      },
      {
        id: 3,
        text: 'Biết ∫ f(x) dx = F(x) + C. Khẳng định nào sau đây đúng với tích phân của hàm số f(2x)?',
        options: [
          { key: 'A', label: '∫ f(2x) dx = 2F(2x) + C' },
          { key: 'B', label: '∫ f(2x) dx = (1/2) F(2x) + C' },
          { key: 'C', label: '∫ f(2x) dx = F(2x) + C' },
          { key: 'D', label: '∫ f(2x) dx = (1/2) F(x) + C' }
        ],
        correctAnswer: 'B',
        explanation: 'Áp dụng công thức nguyên hàm mở rộng: ∫ f(ax + b) dx = (1/a) F(ax + b) + C với a ≠ 0. Ở đây a = 2, do đó ∫ f(2x) dx = (1/2) F(2x) + C.',
        topic: 'Giải tích - Nguyên hàm'
      },
      {
        id: 4,
        text: 'Trong không gian Oxyz, cho mặt phẳng (P): 2x - 3y + z - 5 = 0. Một vectơ pháp tuyến của (P) là:',
        options: [
          { key: 'A', label: 'n = (2; -3; 1)' },
          { key: 'B', label: 'n = (2; 3; 1)' },
          { key: 'C', label: 'n = (2; -3; -5)' },
          { key: 'D', label: 'n = (-2; -3; 1)' }
        ],
        correctAnswer: 'A',
        explanation: 'Mặt phẳng Ax + By + Cz + D = 0 có một vectơ pháp tuyến n = (A; B; C). Với (P): 2x - 3y + z - 5 = 0, VTPT là n = (2; -3; 1).',
        topic: 'Hình học Oxyz - Mặt phẳng'
      },
      {
        id: 5,
        text: 'Nghiệm của phương trình log₂ (x - 3) = 3 là:',
        options: [
          { key: 'A', label: 'x = 11' },
          { key: 'B', label: 'x = 9' },
          { key: 'C', label: 'x = 8' },
          { key: 'D', label: 'x = 12' }
        ],
        correctAnswer: 'A',
        explanation: 'Điều kiện x > 3. Ta có log₂ (x - 3) = 3 ⇔ x - 3 = 2³ = 8 ⇔ x = 11 (thỏa mãn điều kiện x > 3).',
        topic: 'Mũ và Logarit'
      },
      {
        id: 6,
        text: 'Cho hình chóp S.ABC có đáy ABC là tam giác vuông tại B, SA vuông góc với mặt phẳng đáy (ABC). Góc giữa đường thẳng SB và mặt đáy (ABC) là:',
        options: [
          { key: 'A', label: 'Góc SBA' },
          { key: 'B', label: 'Góc SAB' },
          { key: 'C', label: 'Góc SCB' },
          { key: 'D', label: 'Góc BSA' }
        ],
        correctAnswer: 'A',
        explanation: 'Vì SA ⊥ (ABC) nên A là hình chiếu vuông góc của S lên (ABC). Do đó, hình chiếu của đoạn thẳng SB lên (ABC) chính là đoạn thẳng AB. Góc giữa SB và đáy là góc giữa SB và AB, tức góc SBA.',
        topic: 'Hình học không gian - Góc'
      },
      {
        id: 7,
        text: 'Tính giá trị của tích phân I = ∫[0 đến 1] (2x + 1) dx.',
        options: [
          { key: 'A', label: 'I = 2' },
          { key: 'B', label: 'I = 1' },
          { key: 'C', label: 'I = 3' },
          { key: 'D', label: 'I = 4' }
        ],
        correctAnswer: 'A',
        explanation: 'Ta có ∫(2x + 1) dx = x² + x. Thế cận từ 0 đến 1: I = (1² + 1) - (0² + 0) = 2 - 0 = 2.',
        topic: 'Giải tích - Tích phân'
      },
      {
        id: 8,
        text: 'Số phức z = 3 - 4i có môđun bằng:',
        options: [
          { key: 'A', label: '|z| = 5' },
          { key: 'B', label: '|z| = 7' },
          { key: 'C', label: '|z| = 25' },
          { key: 'D', label: '|z| = √7' }
        ],
        correctAnswer: 'A',
        explanation: 'Môđun của số phức z = a + bi là |z| = √(a² + b²). Ta có |z| = √(3² + (-4)²) = √(9 + 16) = √25 = 5.',
        topic: 'Số phức'
      },
      {
        id: 9,
        text: 'Trong mặt phẳng tọa độ Oxyz, mặt cầu (S): (x - 1)² + (y + 2)² + (z - 3)² = 16 có bán kính R bằng:',
        options: [
          { key: 'A', label: 'R = 4' },
          { key: 'B', label: 'R = 16' },
          { key: 'C', label: 'R = 2' },
          { key: 'D', label: 'R = 8' }
        ],
        correctAnswer: 'A',
        explanation: 'Mặt cầu có dạng (x - a)² + (y - b)² + (z - c)² = R². Ta có R² = 16 nên bán kính R = √16 = 4.',
        topic: 'Hình học Oxyz - Mặt cầu'
      },
      {
        id: 10,
        text: 'Gieo một con súc sắc cân đối và đồng chất một lần. Xác suất để xuất hiện mặt có số chấm chia hết cho 2 là:',
        options: [
          { key: 'A', label: '1/2' },
          { key: 'B', label: '1/3' },
          { key: 'C', label: '2/3' },
          { key: 'D', label: '1/6' }
        ],
        correctAnswer: 'A',
        explanation: 'Không gian mẫu n(Ω) = 6. Các mặt có số chấm chia hết cho 2 là {2; 4; 6}, có 3 kết quả thuận lợi. Xác suất P = 3/6 = 1/2.',
        topic: 'Xác suất thống kê'
      },
      {
        id: 11,
        text: 'Hàm số f(x) = x³ - 3x + 2 đạt cực tiểu tại điểm nào?',
        options: [
          { key: 'A', label: 'x = 1' },
          { key: 'B', label: 'x = -1' },
          { key: 'C', label: 'x = 0' },
          { key: 'D', label: 'x = 2' }
        ],
        correctAnswer: 'A',
        explanation: 'Đạo hàm f\'(x) = 3x² - 3 = 3(x - 1)(x + 1). Nghiệm x = ±1. Qua x = -1, f\'(x) đổi dấu từ dương sang âm => cực đại tại x = -1. Qua x = 1, f\'(x) đổi dấu từ âm sang dương => cực tiểu tại x = 1.',
        topic: 'Giải tích - Cực trị'
      },
      {
        id: 12,
        text: 'Khối lăng trụ có diện tích đáy B = 6 cm² và chiều cao h = 5 cm thì thể tích V bằng:',
        options: [
          { key: 'A', label: '30 cm³' },
          { key: 'B', label: '10 cm³' },
          { key: 'C', label: '15 cm³' },
          { key: 'D', label: '90 cm³' }
        ],
        correctAnswer: 'A',
        explanation: 'Thể tích lăng trụ V = B . h = 6 . 5 = 30 cm³. (Lưu ý: khối chóp mới có hệ số 1/3, lăng trụ thì V = B . h).',
        topic: 'Hình học không gian - Khối đa diện'
      }
    ]
  },
  {
    id: 'exam-anh-12-02',
    title: 'Kiểm Tra Tiếng Anh 12 - Chuyên Đề Ngữ Pháp & Collocations Nâng Cao',
    description: 'Đề thi trắc nghiệm 10 câu kiểm tra khả năng vận dụng ngữ pháp, liên từ, câu bị động và từ vựng thông dụng.',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    durationMinutes: 20,
    difficulty: 'Khá',
    author: 'Cô Mai Linh',
    attemptsCount: 2610,
    averageScore: 8.1,
    questions: [
      {
        id: 1,
        text: 'If she _______ harder during the term, she would have passed the final examination with flying colours.',
        options: [
          { key: 'A', label: 'had studied' },
          { key: 'B', label: 'studied' },
          { key: 'C', label: 'studies' },
          { key: 'D', label: 'would study' }
        ],
        correctAnswer: 'A',
        explanation: 'Mệnh đề chính dùng "would have passed" là câu điều kiện loại 3 (giả định điều trái với quá khứ). Cấu trúc: If + S + had + PII, S + would have + PII. Vì vậy đáp án chính xác là had studied.',
        topic: 'Conditionals'
      },
      {
        id: 2,
        text: 'The historic bridge _______ in the early 19th century has recently been restored to its former glory.',
        options: [
          { key: 'A', label: 'built' },
          { key: 'B', label: 'building' },
          { key: 'C', label: 'was built' },
          { key: 'D', label: 'to build' }
        ],
        correctAnswer: 'A',
        explanation: 'Đây là mệnh đề quan hệ rút gọn ở thể bị động: "The historic bridge which was built..." rút gọn thành "The historic bridge built...". Động từ chính của câu là "has recently been restored".',
        topic: 'Reduced Relative Clauses'
      },
      {
        id: 3,
        text: 'Only after entering the examination room _______ that he had forgotten his national identity card.',
        options: [
          { key: 'A', label: 'did he realize' },
          { key: 'B', label: 'he realized' },
          { key: 'C', label: 'he had realized' },
          { key: 'D', label: 'has he realized' }
        ],
        correctAnswer: 'A',
        explanation: 'Cấu trúc đảo ngữ với "Only after + V-ing / clause": trợ động từ + S + V(bare). Ở đây hành động xảy ra trong quá khứ nên dùng trợ động từ "did": did he realize.',
        topic: 'Inversion'
      },
      {
        id: 4,
        text: 'Environmental experts urged people to cut _______ on single-use plastics to protect marine ecosystems.',
        options: [
          { key: 'A', label: 'down' },
          { key: 'B', label: 'off' },
          { key: 'C', label: 'out' },
          { key: 'D', label: 'up' }
        ],
        correctAnswer: 'A',
        explanation: 'Cụm động từ "cut down on something" mang nghĩa cắt giảm lượng tiêu thụ (giảm thiểu). Cut off: cắt đứt (nguồn điện, liên lạc). Cut out: ngừng hẳn, loại bỏ.',
        topic: 'Phrasal Verbs'
      },
      {
        id: 5,
        text: 'The school board decided to _______ into account the students\' suggestions regarding digital learning tools.',
        options: [
          { key: 'A', label: 'take' },
          { key: 'B', label: 'make' },
          { key: 'C', label: 'give' },
          { key: 'D', label: 'hold' }
        ],
        correctAnswer: 'A',
        explanation: 'Collocation quen thuộc: "take something into account" hoặc "take into consideration" có nghĩa là cân nhắc, xem xét kỹ lưỡng điều gì.',
        topic: 'Collocations'
      },
      {
        id: 6,
        text: 'Neither the team captain nor the players _______ satisfied with the referee\'s controversial decision.',
        options: [
          { key: 'A', label: 'were' },
          { key: 'B', label: 'was' },
          { key: 'C', label: 'is' },
          { key: 'D', label: 'has been' }
        ],
        correctAnswer: 'A',
        explanation: 'Quy tắc hòa hợp chủ vị với "Neither... nor...": Động từ chia theo chủ ngữ gần nhất. Chủ ngữ gần nhất là "the players" (số nhiều), sự việc xảy ra trong quá khứ nên dùng "were".',
        topic: 'Subject-Verb Agreement'
      },
      {
        id: 7,
        text: 'She made a remarkable _______ to the success of the charity marathon campaign.',
        options: [
          { key: 'A', label: 'contribution' },
          { key: 'B', label: 'contribute' },
          { key: 'C', label: 'contributor' },
          { key: 'D', label: 'contributory' }
        ],
        correctAnswer: 'A',
        explanation: 'Sau tính từ "remarkable" và trước giới từ "to" ta cần một danh từ. Cụm "make a contribution to" nghĩa là đóng góp to lớn cho cái gì.',
        topic: 'Word Formation'
      },
      {
        id: 8,
        text: 'Hardly _______ the announcement when applause erupted across the whole auditorium.',
        options: [
          { key: 'A', label: 'had the speaker finished' },
          { key: 'B', label: 'the speaker had finished' },
          { key: 'C', label: 'did the speaker finish' },
          { key: 'D', label: 'was the speaker finishing' }
        ],
        correctAnswer: 'A',
        explanation: 'Cấu trúc đảo ngữ: "Hardly + had + S + PII + when + S + Ved" (Ngay khi... thì...). Do đó đáp án là "had the speaker finished".',
        topic: 'Inversion'
      },
      {
        id: 9,
        text: 'The new scientific policy aims to bridge the _______ between laboratory research and real-world application.',
        options: [
          { key: 'A', label: 'gap' },
          { key: 'B', label: 'hole' },
          { key: 'C', label: 'space' },
          { key: 'D', label: 'crack' }
        ],
        correctAnswer: 'A',
        explanation: 'Collocation chuẩn: "bridge the gap" nghĩa là thu hẹp khoảng cách / nối liền khoảng cách giữa hai mặt.',
        topic: 'Idioms & Collocations'
      },
      {
        id: 10,
        text: 'The teacher advised him _______ more time reading English scientific journals.',
        options: [
          { key: 'A', label: 'to spend' },
          { key: 'B', label: 'spend' },
          { key: 'C', label: 'spending' },
          { key: 'D', label: 'spent' }
        ],
        correctAnswer: 'A',
        explanation: 'Cấu trúc khuyên bảo: advise someone to do something. Do đó dùng to spend.',
        topic: 'Verb Forms'
      }
    ]
  },
  {
    id: 'exam-ly-12-03',
    title: 'Kiểm Tra 25 Phút Vật Lý 12 - Dao Động & Sóng Cơ Học',
    description: 'Bộ 10 câu trắc nghiệm lý thuyết và bài tập trọng tâm con lắc lò xo, con lắc đơn, giao thoa sóng cơ học.',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    durationMinutes: 25,
    difficulty: 'Khá',
    author: 'Thầy Trần Quang Huy',
    attemptsCount: 1950,
    averageScore: 7.2,
    questions: [
      {
        id: 1,
        text: 'Một vật dao động điều hòa theo phương trình x = 6.cos(4πt - π/3) (cm). Biên độ và tần số của dao động lần lượt là:',
        options: [
          { key: 'A', label: 'A = 6 cm, f = 2 Hz' },
          { key: 'B', label: 'A = 6 cm, f = 4 Hz' },
          { key: 'C', label: 'A = 6 cm, f = 4π Hz' },
          { key: 'D', label: 'A = -π/3 cm, f = 2 Hz' }
        ],
        correctAnswer: 'A',
        explanation: 'Biên độ A = 6 cm. Tần số góc ω = 4π rad/s => Tần số f = ω / (2π) = 4π / 2π = 2 Hz.',
        topic: 'Dao động cơ'
      },
      {
        id: 2,
        text: 'Trong dao động điều hòa của con lắc lò xo độ cứng k và khối lượng m, công thức tính chu kỳ T là:',
        options: [
          { key: 'A', label: 'T = 2π √(m/k)' },
          { key: 'B', label: 'T = 2π √(k/m)' },
          { key: 'C', label: 'T = (1/2π) √(m/k)' },
          { key: 'D', label: 'T = 2π √(g/l)' }
        ],
        correctAnswer: 'A',
        explanation: 'Chu kỳ dao động con lắc lò xo là T = 2π √(m/k) ("Thấy hai pi mua kẹo").',
        topic: 'Con lắc lò xo'
      },
      {
        id: 3,
        text: 'Vận tốc trong dao động điều hòa biến thiên:',
        options: [
          { key: 'A', label: 'Sớm pha π/2 so với li độ' },
          { key: 'B', label: 'Trễ pha π/2 so với li độ' },
          { key: 'C', label: 'Cùng pha với li độ' },
          { key: 'D', label: 'Ngược pha với li độ' }
        ],
        correctAnswer: 'A',
        explanation: 'Ta có x = A.cos(ωt + φ) thì v = x\' = -ωA.sin(ωt + φ) = ωA.cos(ωt + φ + π/2). Do đó vận tốc sớm pha π/2 so với li độ.',
        topic: 'Dao động điều hòa'
      },
      {
        id: 4,
        text: 'Khi một sóng cơ học truyền từ không khí vào trong nước thì đại lượng nào sau đây KHÔNG đổi?',
        options: [
          { key: 'A', label: 'Tần số của sóng' },
          { key: 'B', label: 'Vận tốc truyền sóng' },
          { key: 'C', label: 'Bước sóng' },
          { key: 'D', label: 'Biên độ của sóng' }
        ],
        correctAnswer: 'A',
        explanation: 'Khi sóng truyền qua các môi trường khác nhau, tần số f (và chu kỳ T) phụ thuộc vào nguồn phát nên luôn không đổi. Tốc độ truyền sóng và bước sóng sẽ thay đổi.',
        topic: 'Sóng cơ'
      },
      {
        id: 5,
        text: 'Một sợi dây đàn hồi dài L có hai đầu cố định. Để trên dây xuất hiện sóng dừng với k bụng sóng thì chiều dài dây phải thỏa mãn:',
        options: [
          { key: 'A', label: 'L = k . (λ / 2)' },
          { key: 'B', label: 'L = k . λ' },
          { key: 'C', label: 'L = (2k + 1) . (λ / 4)' },
          { key: 'D', label: 'L = (2k + 1) . (λ / 2)' }
        ],
        correctAnswer: 'A',
        explanation: 'Điều kiện có sóng dừng trên dây với hai đầu cố định: L = k.(λ/2) trong đó k là số bó sóng (số bụng sóng).',
        topic: 'Sóng dừng'
      },
      {
        id: 6,
        text: 'Một con lắc đơn có chiều dài l = 1 m dao động tại nơi có g = π² ≈ 9.87 m/s². Chu kỳ dao động của con lắc bằng:',
        options: [
          { key: 'A', label: '2.0 s' },
          { key: 'B', label: '1.0 s' },
          { key: 'C', label: '0.5 s' },
          { key: 'D', label: '3.14 s' }
        ],
        correctAnswer: 'A',
        explanation: 'T = 2π √(l/g) = 2π √(1 / π²) = 2π . (1/π) = 2.0 s.',
        topic: 'Con lắc đơn'
      },
      {
        id: 7,
        text: 'Trong hiện tượng giao thoa sóng trên mặt nước với 2 nguồn cùng pha, vị trí các điểm cực đại giao thoa có hiệu đường đi thỏa mãn:',
        options: [
          { key: 'A', label: 'd₂ - d₁ = kλ (k ∈ Z)' },
          { key: 'B', label: 'd₂ - d₁ = (k + 0.5)λ (k ∈ Z)' },
          { key: 'C', label: 'd₂ - d₁ = (2k + 1)λ / 4' },
          { key: 'D', label: 'd₂ - d₁ = (k + 1)λ / 2' }
        ],
        correctAnswer: 'A',
        explanation: 'Cực đại giao thoa xảy ra khi hai sóng tới cùng pha, tức hiệu đường đi bằng một số nguyên lần bước sóng: d₂ - d₁ = kλ.',
        topic: 'Giao thoa sóng'
      },
      {
        id: 8,
        text: 'Âm thanh có tần số f = 30.000 Hz thuộc dải sóng nào?',
        options: [
          { key: 'A', label: 'Siêu âm' },
          { key: 'B', label: 'Hạ âm' },
          { key: 'C', label: 'Âm thanh nghe được' },
          { key: 'D', label: 'Sóng vô tuyến' }
        ],
        correctAnswer: 'A',
        explanation: 'Dải tần số âm thanh người nghe được là từ 16 Hz đến 20.000 Hz. Tần số dưới 16 Hz là hạ âm, tần số trên 20.000 Hz là siêu âm. 30.000 Hz > 20.000 Hz nên là siêu âm.',
        topic: 'Sóng âm'
      }
    ]
  },
  {
    id: 'exam-hoa-11-04',
    title: 'Trắc Nghiệm Hóa Học 11 - Cân Bằng Hóa Học & Phản Ứng Điện Ly',
    description: '10 câu trắc nghiệm trọng tâm lý thuyết pH, thuyết Bronsted-Lowry, chuyển dịch cân bằng theo nguyên lý Le Chatelier.',
    subject: 'Hóa học',
    grade: 'Lớp 11',
    durationMinutes: 15,
    difficulty: 'Cơ bản',
    author: 'Cô Lê Hoàng Yến',
    attemptsCount: 1420,
    averageScore: 7.8,
    questions: [
      {
        id: 1,
        text: 'Dung dịch có nồng độ ion [H+] = 10⁻⁴ M ở 25°C có pH bằng:',
        options: [
          { key: 'A', label: '4' },
          { key: 'B', label: '10' },
          { key: 'C', label: '7' },
          { key: 'D', label: '14' }
        ],
        correctAnswer: 'A',
        explanation: 'Theo định nghĩa: pH = -log[H+] = -log(10⁻⁴) = 4. Môi trường axit vì pH < 7.',
        topic: 'Độ pH'
      },
      {
        id: 2,
        text: 'Theo thuyết Bronsted - Lowry, axit là chất:',
        options: [
          { key: 'A', label: 'Cho proton H⁺' },
          { key: 'B', label: 'Nhận proton H⁺' },
          { key: 'C', label: 'Phân li ra ion OH⁻' },
          { key: 'D', label: 'Nhận cặp electron' }
        ],
        correctAnswer: 'A',
        explanation: 'Thuyết Bronsted - Lowry: Axit là chất cho proton (H⁺), bazơ là chất nhận proton (H⁺).',
        topic: 'Thuyết Axit - Bazơ'
      },
      {
        id: 3,
        text: 'Cho phản ứng tỏa nhiệt: N₂(k) + 3H₂(k) ⇌ 2NH₃(k) (ΔH < 0). Để cân bằng chuyển dịch theo chiều thuận, ta cần:',
        options: [
          { key: 'A', label: 'Giảm nhiệt độ và tăng áp suất' },
          { key: 'B', label: 'Tăng nhiệt độ và giảm áp suất' },
          { key: 'C', label: 'Tăng nhiệt độ và tăng áp suất' },
          { key: 'D', label: 'Thêm chất xúc tác Fe' }
        ],
        correctAnswer: 'A',
        explanation: 'Phản ứng thuận tỏa nhiệt (ΔH < 0), do đó giảm nhiệt độ làm cân bằng chuyển dịch theo chiều thuận (chiều tỏa nhiệt). Số mol khí vế trái = 4, vế phải = 2, tăng áp suất làm cân bằng chuyển dịch theo chiều giảm số mol khí (chiều thuận).',
        topic: 'Chuyển dịch cân bằng'
      },
      {
        id: 4,
        text: 'Chất nào sau đây là chất điện li mạnh trong nước?',
        options: [
          { key: 'A', label: 'NaCl' },
          { key: 'B', label: 'CH₃COOH' },
          { key: 'C', label: 'H₂O' },
          { key: 'D', label: 'HF' }
        ],
        correctAnswer: 'A',
        explanation: 'NaCl là muối tan hoàn toàn phân li thành ion Na⁺ và Cl⁻ trong nước nên là chất điện li mạnh. CH₃COOH, HF là axit yếu, H₂O là chất điện li rất yếu.',
        topic: 'Sự điện ly'
      },
      {
        id: 5,
        text: 'Biểu thức tính hằng số cân bằng Kc của phản ứng: aA + bB ⇌ cC + dD là:',
        options: [
          { key: 'A', label: 'Kc = ([C]^c . [D]^d) / ([A]^a . [B]^b)' },
          { key: 'B', label: 'Kc = ([A]^a . [B]^b) / ([C]^c . [D]^d)' },
          { key: 'C', label: 'Kc = (c[C] + d[D]) / (a[A] + b[B])' },
          { key: 'D', label: 'Kc = [C].[D] / [A].[B]' }
        ],
        correctAnswer: 'A',
        explanation: 'Kc được tính bằng tích nồng độ các chất sản phẩm ở trạng thái cân bằng lũy thừa hệ số tỉ lượng chia cho tích nồng độ các chất tham gia lũy thừa hệ số tỉ lượng.',
        topic: 'Hằng số cân bằng'
      },
      {
        id: 6,
        text: 'Khi hòa tan khí amoniac (NH₃) vào nước, dung dịch thu được làm quỳ tím chuyển sang màu gì?',
        options: [
          { key: 'A', label: 'Màu xanh' },
          { key: 'B', label: 'Màu đỏ' },
          { key: 'C', label: 'Không đổi màu' },
          { key: 'D', label: 'Màu vàng' }
        ],
        correctAnswer: 'A',
        explanation: 'NH₃ nhận proton từ H₂O: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻. Môi trường có tính bazơ yếu nên làm quỳ tím hóa xanh.',
        topic: 'Hợp chất Nitơ'
      }
    ]
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'user-admin',
    username: 'admin',
    password: 'admin123',
    name: 'Quản Trị Viên (Admin)',
    email: 'admin@eduviet.vn',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=admin',
    grade: 'Ban Quản Trị',
    school: 'Hệ Thống EduViet',
    role: 'admin',
    savedDocuments: [],
    createdAt: '2026-01-01'
  },
  {
    id: 'user-01',
    username: 'minh.nguyen',
    password: '123',
    name: 'Nguyễn Văn Minh',
    email: 'minh.nguyen@eduviet.vn',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=minh',
    grade: 'Lớp 12',
    school: 'THPT Chu Văn An',
    role: 'student',
    savedDocuments: ['doc-toan-12-01', 'doc-anh-12-02'],
    createdAt: '2026-01-10'
  },
  {
    id: 'user-02',
    username: 'thuha.tran',
    password: '123',
    name: 'Trần Thị Thu Hà',
    email: 'thuha.tran@eduviet.vn',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=thuha',
    grade: 'Lớp 11',
    school: 'THPT Chuyên Hà Nội - Amsterdam',
    role: 'student',
    savedDocuments: ['doc-hoa-11-04'],
    createdAt: '2026-02-01'
  }
];

// Mục tiêu học tập mặc định (Kỳ thi năm 2027 ngày 11-12)
export const DEFAULT_STUDY_GOAL: StudyGoal = {
  targetScore: 9.0,
  targetSubject: 'Toán học & Khối A00',
  targetDate: '2027-11-12T07:30:00', // Ngày 11-12 năm 2027
  examName: 'Kỳ thi Tốt nghiệp THPT 2027 (Ngày 11-12)',
  dailyQuestionsTarget: 25
};

// Thống kê 7 ngày học tập gần nhất
export const INITIAL_DAILY_STATS: DailyStats[] = [
  { date: '2026-09-26', dayLabel: 'Thứ 7', examsCount: 2, questionsSolved: 35, averageScore: 7.8, studyTimeMinutes: 65 },
  { date: '2026-09-27', dayLabel: 'Chủ nhật', examsCount: 3, questionsSolved: 50, averageScore: 8.2, studyTimeMinutes: 90 },
  { date: '2026-09-28', dayLabel: 'Thứ 2', examsCount: 1, questionsSolved: 20, averageScore: 8.0, studyTimeMinutes: 40 },
  { date: '2026-09-29', dayLabel: 'Thứ 3', examsCount: 2, questionsSolved: 42, averageScore: 8.5, studyTimeMinutes: 75 },
  { date: '2026-09-30', dayLabel: 'Thứ 4', examsCount: 2, questionsSolved: 38, averageScore: 8.4, studyTimeMinutes: 60 },
  { date: '2026-10-01', dayLabel: 'Thứ 5', examsCount: 3, questionsSolved: 55, averageScore: 8.8, studyTimeMinutes: 95 },
  { date: '2026-10-02', dayLabel: 'Hôm nay', examsCount: 2, questionsSolved: 40, averageScore: 8.6, studyTimeMinutes: 70 }
];

// Bảng tổng hợp năng lực đa môn
export const INITIAL_SUBJECT_OVERVIEWS: SubjectOverview[] = [
  { subject: 'Toán học', examsTaken: 6, averageScore: 8.4, highestScore: 9.5, accuracyRate: 84, strengthLevel: 'Thế mạnh' },
  { subject: 'Vật lý', examsTaken: 4, averageScore: 8.0, highestScore: 9.0, accuracyRate: 80, strengthLevel: 'Ổn định' },
  { subject: 'Hóa học', examsTaken: 4, averageScore: 7.6, highestScore: 8.5, accuracyRate: 76, strengthLevel: 'Cần cải thiện' },
  { subject: 'Tiếng Anh', examsTaken: 5, averageScore: 8.8, highestScore: 9.8, accuracyRate: 88, strengthLevel: 'Thế mạnh' },
  { subject: 'Sinh học', examsTaken: 2, averageScore: 7.2, highestScore: 8.0, accuracyRate: 72, strengthLevel: 'Cần cải thiện' },
  { subject: 'Ngữ văn', examsTaken: 3, averageScore: 7.9, highestScore: 8.5, accuracyRate: 79, strengthLevel: 'Ổn định' },
  { subject: 'Lịch sử', examsTaken: 2, averageScore: 8.2, highestScore: 9.0, accuracyRate: 82, strengthLevel: 'Ổn định' }
];

