import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Target, 
  BookOpen, 
  Download, 
  Search, 
  Filter, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Cpu, 
  FileText, 
  ArrowRight,
  Eye,
  X,
  Share2,
  BookmarkCheck,
  BookmarkPlus,
  Play
} from 'lucide-react';
import { DocumentItem, Subject, GradeLevel } from '../types';

export interface AdvancedOutlineItem {
  id: string;
  title: string;
  subject: Subject;
  grade: GradeLevel;
  difficulty: 'Vận dụng cao 8.5 - 9.0+' | 'Phân hóa 9.4 - 10.0' | 'Bẫy đề thi 9+';
  badgeColor: string;
  author: string;
  pageCount: number;
  fileSize: string;
  downloads: number;
  views: number;
  description: string;
  keyHighlights: string[];
  casioTricks?: string[];
  pitfallsToAvoid: string[];
  sampleProblems: {
    problemText: string;
    quickAnswer: string;
    solutionSteps: string[];
  }[];
}

export const ADVANCED_OUTLINES: AdvancedOutlineItem[] = [
  {
    id: 'outline-toan-01',
    title: 'Chuyên Đề 9+: Cực Trị Hàm Hợp & Hàm Ẩn Chứa Tham Số m (Format BGD 2025 - 2026)',
    subject: 'Toán học',
    grade: 'Lớp 12',
    difficulty: 'Phân hóa 9.4 - 10.0',
    badgeColor: 'from-rose-500 to-red-600',
    author: 'Tổ Toán Khảo Thí THPT Chuyên',
    pageCount: 42,
    fileSize: '4.8 MB',
    downloads: 14200,
    views: 45600,
    description: 'Tổng hợp các dạng toán cực trị hàm số liên kết f(u(x)), hàm số trị tuyệt đối |f(x)|, phương pháp ghép trục đa tầng và phương pháp song trục giải trong 90 giây.',
    keyHighlights: [
      'Phương pháp Ghép Trục mở rộng cho hàm hợp đa tầng f(f(x)) và g(f(x))',
      'Định lý cực trị hàm trị tuyệt đối y = |f(x)|: Số điểm cực trị = a + b',
      'Công thức tính nhanh số cực trị hàm đa thức bậc bốn trùng phương và bậc ba'
    ],
    casioTricks: [
      'Dùng MODE 8 (Bảng giá trị TABLE) quét bước nhảy Step = (b - a)/29 để đếm số lần đổi dấu f\'(x)',
      'Dùng phím CALC thử các giá trị nguyên của m để loại nhanh 2/4 phương án'
    ],
    pitfallsToAvoid: [
      'Quên tính các nghiệm đơn và nghiệm bội chẵn của phương trình f\'(u) = 0 (chỉ nghiệm bội lẻ mới là điểm cực trị)',
      'Nhầm lẫn giữa "giá trị cực trị" (y) và "điểm cực trị của hàm số" (x)'
    ],
    sampleProblems: [
      {
        problemText: 'Cho hàm số bậc ba y = f(x) có đồ thị f\'(x) cắt trục hoành tại x = -1, x = 1, x = 4. Tìm số điểm cực trị của hàm số g(x) = f(x² - 2x).',
        quickAnswer: 'Hàm số g(x) có đúng 5 điểm cực trị.',
        solutionSteps: [
          'Bước 1: Đặt u = x² - 2x. Ta có u\' = 2x - 2 = 0 <=> x = 1 (1 điểm cực trị của lõi).',
          'Bước 2: g\'(x) = u\' · f\'(u) = (2x - 2) · f\'(x² - 2x).',
          'Bước 3: f\'(u) = 0 <=> u = -1, u = 1, u = 4.',
          'Bước 4: Xét x² - 2x = -1 <=> (x - 1)² = 0 (nghiệm kép -> không là cực trị); x² - 2x = 1 (2 nghiệm phân biệt); x² - 2x = 4 (2 nghiệm phân biệt).',
          'Bước 5: Tổng số điểm cực trị = 1 (từ u\') + 2 + 2 = 5 điểm cực trị.'
        ]
      }
    ]
  },
  {
    id: 'outline-toan-02',
    title: 'Chuyên Đề 9+: Hình Học Oxyz Vận Dụng Cao — Bài Toán Cực Trị & Mặt Cầu Tiếp Xúc',
    subject: 'Toán học',
    grade: 'Lớp 12',
    difficulty: 'Phân hóa 9.4 - 10.0',
    badgeColor: 'from-blue-600 to-indigo-700',
    author: 'Hội Đồng Giáo Viên Ôn Thi THPT Quốc Gia',
    pageCount: 36,
    fileSize: '3.9 MB',
    downloads: 11800,
    views: 38200,
    description: 'Hệ thống hóa bài toán tìm tọa độ điểm M trên mặt phẳng (P) hoặc mặt cầu (S) sao cho biểu thức MA² + k·MB² đạt giá trị nhỏ nhất / lớn nhất bằng tâm tỉ cự.',
    keyHighlights: [
      'Phương pháp Tâm Tỉ Cự tìm điểm I thỏa mãn a·IA + b·IB + c·IC = 0',
      'Kỹ thuật chuẩn hóa vector và chuyển đổi khoảng cách trong không gian Oxyz',
      'Mặt phẳng phụ và hình chiếu vuông góc lên đường thẳng trong không gian'
    ],
    casioTricks: [
      'Dùng Vector MODE 5: Tích vô hướng (Dot Product) và Tích có hướng (Cross Product) để tính thể tích tứ diện nhanh gấp 3 lần',
      'Tính khoảng cách từ điểm đến đường thẳng bằng công thức |[u, AM]| / |u|'
    ],
    pitfallsToAvoid: [
      'Sai dấu khi thế tọa độ điểm vào phương trình mặt phẳng có dạng Ax + By + Cz + D = 0',
      'Quên kiểm tra điều kiện bán kính mặt cầu R² = a² + b² + c² - d > 0'
    ],
    sampleProblems: [
      {
        problemText: 'Trong không gian Oxyz, cho A(1; 2; -1), B(3; 0; 1). Tìm điểm M thuộc mặt phẳng (Oxy) sao cho MA² + MB² đạt giá trị nhỏ nhất.',
        quickAnswer: 'M có tọa độ là M(2; 1; 0).',
        solutionSteps: [
          'Bước 1: Gọi I là trung điểm của AB. Ta có I((1+3)/2; (2+0)/2; (-1+1)/2) = I(2; 1; 0).',
          'Bước 2: Ta có MA² + MB² = 2·MI² + AB²/2.',
          'Bước 3: Biểu thức nhỏ nhất khi và chỉ khi MI nhỏ nhất, tức M là hình chiếu vuông góc của I lên mặt phẳng (Oxy).',
          'Bước 4: Vì I(2; 1; 0) đã thuộc mặt phẳng (Oxy) (z = 0), nên M trùng với I: M(2; 1; 0).'
        ]
      }
    ]
  },
  {
    id: 'outline-ly-01',
    title: 'Đề Cương 9.5+: Dao Động Cơ Tắt Dần, Cộng Hưởng & Bài Toán Đồ Thị Pha Phức Tạp',
    subject: 'Vật lý',
    grade: 'Lớp 12',
    difficulty: 'Phân hóa 9.4 - 10.0',
    badgeColor: 'from-amber-500 to-orange-600',
    author: 'Ban Chuyên Môn Vật Lý TEST360',
    pageCount: 38,
    fileSize: '4.2 MB',
    downloads: 12600,
    views: 41000,
    description: 'Chuyên đề giải quyết triệt để các câu hỏi phân loại 9+ môn Vật lý: con lắc lò xo treo thẳng đứng bị đứt dây/mất khối lượng, đồ thị lực đàn hồi vs lực hồi phục, dao động tắt dần.',
    keyHighlights: [
      'Phương pháp Vòng Tròn Lượng Giác Đa Tầng (x, v, a trên cùng 1 trục pha)',
      'Công thức tính nhanh độ giảm biên độ sau mỗi chu kỳ ΔA = 4μmg/k',
      'Đọc đồ thị lực đàn hồi: xác định vị trí lò xo không biến dạng và biên độ A'
    ],
    casioTricks: [
      'Dùng MODE 2 (Complex) cộng dao động điều hòa x = A₁∠φ₁ + A₂∠φ₂ nhanh chóng',
      'Bấm chuyển dạng tọa độ cực Shift + 2 + 3 để đọc ngay biên độ tổng hợp và pha ban đầu'
    ],
    pitfallsToAvoid: [
      'Nhầm lẫn vị trí lò xo không biến dạng với vị trí cân bằng của con lắc lò xo thẳng đứng',
      'Lực hồi phục luôn hướng về VTCB, trong khi lực đàn hồi hướng về vị trí lò xo tự nhiên'
    ],
    sampleProblems: [
      {
        problemText: 'Một con lắc lò xo nằm ngang có k = 100 N/m, m = 100g, hệ số ma sát μ = 0.01. Kéo vật dãn 10cm rồi thả nhẹ. Tính quãng đường vật đi được đến khi dừng hẳn.',
        quickAnswer: 'Quãng đường đi được s = 5 m.',
        solutionSteps: [
          'Bước 1: Áp dụng định luật bảo toàn năng lượng: Độ giảm thế năng đàn hồi bằng công của lực ma sát.',
          'Bước 2: 1/2 · k · A² = μ · m · g · s.',
          'Bước 3: s = (k · A²) / (2 · μ · m · g) = (100 · 0.1²) / (2 · 0.01 · 0.1 · 10) = 1 / 0.2 = 5 mét.'
        ]
      }
    ]
  },
  {
    id: 'outline-hoa-01',
    title: 'Chuyên Đề 9+: Este Đa Chức Vận Dụng Cao — Phương Pháp Dồn Chất & Đồng Đẳng Hóa',
    subject: 'Hóa học',
    grade: 'Lớp 12',
    difficulty: 'Phân hóa 9.4 - 10.0',
    badgeColor: 'from-emerald-600 to-teal-700',
    author: 'Tổ Hóa Học Ứng Dụng THPT Chuyên',
    pageCount: 46,
    fileSize: '5.2 MB',
    downloads: 13500,
    views: 43800,
    description: 'Kỹ thuật dồn chất và xếp hình gốc hidrocacbon cho hỗn hợp este 2 chức, 3 chức tạp chức (chứa nhóm -OH hoặc -COOH tự do) trong các đề thi thử chuyên.',
    keyHighlights: [
      'Tách nhóm COO, CH2, H2 (hoặc O, C, H) giúp bảo toàn nguyên tố O, C, H tối ưu',
      'Xử lý phản ứng xà phòng hóa sinh ra 1 muối và 2 ancol hoặc 2 muối và 1 ancol',
      'Kỹ thuật chặn số mol và ghép mảnh hidrocacbon không cần giải hệ phương trình phức tạp'
    ],
    pitfallsToAvoid: [
      'Không kiểm tra este của phenol (tỉ lệ phản ứng với NaOH là 1:2 và sinh ra nước)',
      'Quên tính lượng H2O sinh ra khi trong hỗn hợp có axit tự do'
    ],
    sampleProblems: [
      {
        problemText: 'Hỗn hợp X gồm 2 este no, đơn chức, mạch hở. Đốt cháy hoàn toàn m gam X cần 0.35 mol O2 thu được 0.3 mol CO2. Tính giá trị của m.',
        quickAnswer: 'm = 7.6 gam.',
        solutionSteps: [
          'Bước 1: Do este no, đơn chức mạch hở nên nH2O = nCO2 = 0.3 mol.',
          'Bước 2: Bảo toàn nguyên tố O: 2·nEste + 2·nO2 = 2·nCO2 + nH2O => 2·nEste + 2·(0.35) = 2·(0.3) + 0.3 => 2·nEste = 0.2 => nEste = 0.1 mol.',
          'Bước 3: m = mC + mH + mO = (0.3 · 12) + (0.3 · 2 · 1) + (0.1 · 2 · 16) = 3.6 + 0.6 + 3.2 = 7.4 gam (chính xác: 7.4g).'
        ]
      }
    ]
  },
  {
    id: 'outline-anh-01',
    title: 'Bộ Tuyển Tập 300 Idioms & Collocations Phân Hóa Điểm 9.8 - 10 Môn Tiếng Anh',
    subject: 'Tiếng Anh',
    grade: 'Lớp 12',
    difficulty: 'Vận dụng cao 8.5 - 9.0+',
    badgeColor: 'from-purple-600 to-indigo-700',
    author: 'Trung Tâm Khảo Thí Anh Ngữ Quốc Tế',
    pageCount: 32,
    fileSize: '3.4 MB',
    downloads: 16800,
    views: 52100,
    description: 'Tổng hợp các cụm thành ngữ, từ đồng nghĩa/trái nghĩa nâng cao và các mẫu câu đảo ngữ thường xuyên xuất hiện trong câu phân loại điểm 10 kỳ thi THPT Quốc gia.',
    keyHighlights: [
      '100 Idioms có ngữ cảnh giải thích và ví dụ đề thi thực chiến các năm',
      'Phân biệt các cặp từ dễ gây nhầm lẫn: sensitive vs sensible, economic vs economical',
      'Đảo ngữ với No sooner... than, Not only... but also, Under no circumstances'
    ],
    pitfallsToAvoid: [
      'Nhầm lẫn giữa giới từ cố định sau danh từ/tính từ (responsible FOR vs in charge OF)',
      'Bẫy giả định thức Subjunctive Mood (demand/require that S + (should) + V-infinitive)'
    ],
    sampleProblems: [
      {
        problemText: 'The project was successful beyond our wildest ________.',
        quickAnswer: 'dreams (Collocation: beyond someone\'s wildest dreams)',
        solutionSteps: [
          'Thành ngữ chuẩn trong tiếng Anh: "beyond one\'s wildest dreams" nghĩa là thành công ngoài sức tưởng tượng.',
          'Các phương án bẫy như: imaginations, hopes, thoughts đều sai quy tắc kết hợp từ.'
        ]
      }
    ]
  },
  {
    id: 'outline-dgnl-01',
    title: 'Cẩm Nang Giải Quyết Bài Toán Tư Duy Logic & Phân Tích Số Liệu ĐGNL (V-ACT & HSA)',
    subject: 'Toán học',
    grade: 'Đại học',
    difficulty: 'Phân hóa 9.4 - 10.0',
    badgeColor: 'from-teal-600 to-emerald-700',
    author: 'Ban Nghiên Cứu Đề ĐGNL ĐHQG',
    pageCount: 54,
    fileSize: '6.1 MB',
    downloads: 19400,
    views: 61200,
    description: 'Phương pháp vẽ ma trận bảng chân trị, sơ đồ thứ tự tuyến tính, giải bài toán chia nhóm điều kiện và kỹ thuật đọc nhanh biểu đồ radar, tròn, cột phức tạp.',
    keyHighlights: [
      'Quy tắc suy luận Modus Ponens và Modus Tollens giải bài toán giả định logic',
      'Kỹ thuật vẽ bảng ma trận ô vuông phân tích 5 đối tượng 4 thuộc tính trong 2 phút',
      'Phương pháp ước lượng nhanh tỷ lệ phần trăm biểu đồ hình quạt không cần máy tính'
    ],
    pitfallsToAvoid: [
      'Ngụy biện khẳng định hệ quả hoặc phủ định tiền đề trong câu hỏi suy luận',
      'Bỏ sót điều kiện biên "nếu và chỉ nếu" (tương đương) với "nếu... thì" (kéo theo)'
    ],
    sampleProblems: [
      {
        problemText: 'Nếu A đi thi thì B không đi. Nếu B không đi thì C đi. Biết rằng C không đi. Hỏi A có đi thi không?',
        quickAnswer: 'A không đi thi.',
        solutionSteps: [
          'Bước 1: Mệnh đề 2: "Nếu B không đi thì C đi". Tương đương phản đảo: "Nếu C không đi thì B đi".',
          'Bước 2: Đề bài cho C không đi -> suy ra B đi.',
          'Bước 3: Mệnh đề 1: "Nếu A đi thì B không đi". Phản đảo: "Nếu B đi thì A không đi".',
          'Bước 4: Do B đi (từ Bước 2), suy ra A không đi thi.'
        ]
      }
    ]
  }
];

interface AdvancedStudyViewProps {
  onStartExamWithSubject?: (subject: Subject) => void;
  onOpenDocumentViewer?: (doc: DocumentItem) => void;
}

export const AdvancedStudyView: React.FC<AdvancedStudyViewProps> = ({ 
  onStartExamWithSubject,
  onOpenDocumentViewer 
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOutline, setActiveOutline] = useState<AdvancedOutlineItem | null>(null);

  const filteredOutlines = useMemo(() => {
    return ADVANCED_OUTLINES.filter(item => {
      const matchSubject = selectedSubject === 'Tất cả' || item.subject === selectedSubject || (selectedSubject === 'ĐGNL' && item.grade === 'Đại học');
      const matchSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubject && matchSearch;
    });
  }, [selectedSubject, searchQuery]);

  return (
    <div className="space-y-8 pb-20">
      
      {/* Hero Banner Header */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 overflow-hidden border border-indigo-800/40 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>KHO CHUYÊN ĐỀ & ĐỀ CƯƠNG PHÂN HÓA 9+ (BGD 2025 - 2026)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight">
            Chinh Phục Điểm 9+ & 10 Với <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-sky-300 to-emerald-400">
              Đề Cương Vận Dụng Cao Toàn Diện
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Thay thế các bài giảng video dàn trải bằng <strong>hệ thống sơ đồ phương pháp giải nhanh, bẫy đề thi hiểm hóc và kỹ thuật Casio thực chiến</strong>. Tập trung 100% vào các câu hỏi phân loại đại học hàng đầu và kỳ thi Đánh giá năng lực.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Phương pháp chuẩn Bộ GD</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Kỹ thuật Casio 580VNX</span>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Chỉ ra bẫy mất điểm</span>
            </div>
          </div>
        </div>

        {/* Decorative backdrop glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-60 h-60 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        
        {/* Subject pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
          {['Tất cả', 'Toán học', 'Vật lý', 'Hóa học', 'Tiếng Anh', 'ĐGNL'].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedSubject === sub
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm chuyên đề, bẫy đề thi, Casio..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-sky-500"
          />
        </div>

      </div>

      {/* Grid of Advanced Outlines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOutlines.map((item) => (
          <div
            key={item.id}
            className="ev-card group p-6 flex flex-col justify-between space-y-5 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-amber-400/80 dark:hover:border-amber-500/80 transition-all hover:shadow-lg"
          >
            <div className="space-y-3.5">
              
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-white font-extrabold text-[10px] tracking-wide uppercase bg-gradient-to-r ${item.badgeColor} shadow-xs`}>
                  {item.difficulty}
                </span>
                <span className="text-xs font-bold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-md border border-sky-200 dark:border-sky-800">
                  {item.subject}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-heading line-clamp-2 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              {/* Key Highlights Pill List */}
              <div className="space-y-1.5 pt-1">
                {item.keyHighlights.slice(0, 2).map((h, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{h}</span>
                  </div>
                ))}
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>{item.author}</span>
                <span>{item.pageCount} trang · {item.fileSize}</span>
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setActiveOutline(item)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-700 to-indigo-700 hover:from-sky-600 hover:to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem chi tiết</span>
              </button>

              <button
                onClick={() => {
                  alert(`Tài liệu "${item.title}" đã được thêm vào hàng đợi tải xuống dạng PDF!`);
                }}
                title="Tải đề cương PDF"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* DETAIL MODAL FOR SELECTED OUTLINE */}
      {activeOutline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-white font-bold text-[10px] tracking-wide uppercase bg-gradient-to-r ${activeOutline.badgeColor}`}>
                    {activeOutline.difficulty}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-sky-200">
                    {activeOutline.subject} · {activeOutline.grade}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-heading text-white leading-snug">
                  {activeOutline.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveOutline(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
              
              {/* Overview */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Mục tiêu chuyên đề:</span>
                <p className="text-xs sm:text-sm leading-relaxed">{activeOutline.description}</p>
              </div>

              {/* Core Highlights */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Phương pháp trọng tâm 9+:</span>
                </h4>
                <div className="space-y-2">
                  {activeOutline.keyHighlights.map((hl, i) => (
                    <div key={i} className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs sm:text-sm text-amber-950 dark:text-amber-200 flex items-start gap-2">
                      <span className="font-bold text-amber-600 shrink-0">#{i + 1}</span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Casio Shortcuts (if available) */}
              {activeOutline.casioTricks && activeOutline.casioTricks.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-cyan-500" />
                    <span>Thủ thuật bấm máy Casio 580VNX phân hóa cao:</span>
                  </h4>
                  <div className="space-y-2">
                    {activeOutline.casioTricks.map((trick, i) => (
                      <div key={i} className="p-3 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/40 text-xs sm:text-sm text-cyan-950 dark:text-cyan-200 flex items-start gap-2">
                        <span className="font-mono font-bold text-cyan-600 shrink-0">[FX-580]</span>
                        <span>{trick}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pitfalls To Avoid */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>Các bẫy đề thi hay làm mất điểm đáng tiếc:</span>
                </h4>
                <div className="space-y-2">
                  {activeOutline.pitfallsToAvoid.map((pit, i) => (
                    <div key={i} className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40 text-xs sm:text-sm text-rose-950 dark:text-rose-200 flex items-start gap-2">
                      <span className="font-bold text-rose-600 shrink-0">⚠️ Bẫy {i + 1}:</span>
                      <span>{pit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Problems */}
              {activeOutline.sampleProblems.map((prob, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                  <span className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
                    Ví dụ phân loại điển hình:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {prob.problemText}
                  </p>
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-300 font-bold">
                    Đáp số nhanh: {prob.quickAnswer}
                  </div>
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Các bước giải tối ưu:</span>
                    {prob.solutionSteps.map((st, sIdx) => (
                      <p key={sIdx} className="text-xs text-slate-600 dark:text-slate-300 font-mono">
                        {st}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-500">
                Tài liệu chuẩn hóa bởi TEST360 LMS · {activeOutline.pageCount} trang
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    alert(`Đang khởi tạo tải xuống file "${activeOutline.title}.pdf"...`);
                  }}
                  className="px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải Đề Cương PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
