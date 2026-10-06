import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Video, 
  FileText, 
  Download, 
  Play, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  Flame, 
  Clock, 
  Sparkles, 
  Upload, 
  Copy, 
  Check, 
  Layers, 
  Compass, 
  ShieldCheck, 
  FileCheck2,
  ChevronRight,
  Filter,
  RefreshCw,
  Info
} from 'lucide-react';
import { Exam, DocumentItem } from '../types';

interface DGNLHubViewProps {
  onTakeExam?: (exam: Exam) => void;
  onSelectDocument?: (doc: DocumentItem) => void;
}

export type DGNLExamType = 'ALL' | 'VACT' | 'HSA' | 'TSA' | 'BCA';

interface EmpireResourceItem {
  id: string;
  title: string;
  examType: 'VACT' | 'HSA' | 'TSA' | 'BCA' | 'ALL';
  subject: string;
  type: 'video' | 'pdf';
  fileUrl: string;
  duration?: string;
  fileSize?: string;
  description?: string;
  youtubeUrl?: string;
}

// Dữ liệu video & bài giảng ĐGNL Empire đã được trích xuất sẵn từ hệ thống Empire
const PRESET_EMPIRE_RESOURCES: EmpireResourceItem[] = [
  // --- V-ACT ĐỀ SỐ 1 ---
  {
    id: 'emp-vact-1-math-p1',
    title: 'Chữa Đề Thi Thử Chuẩn Cấu Trúc Số 1 – Phần Toán Học (Phần 1)',
    examType: 'VACT',
    subject: 'Toán học & Logic',
    type: 'video',
    fileUrl: 'https://www.youtube.com/embed/W_8aEs16RI0',
    youtubeUrl: 'https://www.youtube.com/watch?v=W_8aEs16RI0',
    duration: '52 phút',
    description: 'Chữa chi tiết 15 câu Toán giải tích và hình học trong đề rèn luyện V-ACT số 1.'
  },
  {
    id: 'emp-vact-1-math-p2',
    title: 'Chữa Đề Thi Thử Chuẩn Cấu Trúc Số 1 – Phần Toán Học (Phần 2)',
    examType: 'VACT',
    subject: 'Toán học & Logic',
    type: 'video',
    fileUrl: 'https://www.youtube.com/embed/Km3ZbHFZZMw',
    youtubeUrl: 'https://www.youtube.com/watch?v=Km3ZbHFZZMw',
    duration: '48 phút',
    description: 'Chiến thuật Casio và tư duy giải nhanh phần xác suất, thống kê và hàm số.'
  },

  // --- V-ACT ĐỀ SỐ 2 (PDF + Đáp án) ---
  {
    id: 'emp-vact-2-doc',
    title: 'ĐỀ THI THỬ CHUẨN CẤU TRÚC V-ACT SỐ 2 (ĐHQG TP.HCM)',
    examType: 'VACT',
    subject: 'Đề Tổng Hợp',
    type: 'pdf',
    fileUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/___t__luy_n_v_act_s__2_1782640977321798975976.pdf',
    fileSize: '4.8 MB',
    description: 'Đề thi chuẩn ma trận 120 câu trắc nghiệm: Ngôn ngữ, Toán - Logic, Giải quyết vấn đề.'
  },
  {
    id: 'emp-vact-2-ans',
    title: 'ĐÁP ÁN & LỜI GIẢI CHI TIẾT ĐỀ THI THỬ V-ACT SỐ 2',
    examType: 'VACT',
    subject: 'Đáp án chi tiết',
    type: 'pdf',
    fileUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/da____t__luy_n_v_act_s__2_1782640983462818273471.pdf',
    fileSize: '3.2 MB',
    description: 'Đáp án đầy đủ 120 câu kèm hướng dẫn giải thích cặn kẽ từng câu hỏi.'
  },

  // --- V-ACT ĐỀ SỐ 3 (Full Video & File) ---
  {
    id: 'emp-vact-3-math',
    title: 'Chữa Đề Thi Thử Chuẩn Cấu Trúc Số 3 – Phần Toán Học',
    examType: 'VACT',
    subject: 'Toán học & Logic',
    type: 'video',
    fileUrl: 'https://www.youtube.com/embed/L0xgeN0XBLQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=L0xgeN0XBLQ',
    duration: '60 phút',
    description: 'Phương pháp phân tích số liệu và giải toán tư duy định lượng trong đề số 3.'
  },
  {
    id: 'emp-vact-3-logic',
    title: 'Chữa Đề Thi Thử Chuẩn Cấu Trúc Số 3 – Phần Toán Logic',
    examType: 'VACT',
    subject: 'Tư duy Logic',
    type: 'video',
    fileUrl: 'https://www.youtube.com/embed/ZEPvf2TBZ68',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZEPvf2TBZ68',
    duration: '45 phút',
    description: 'Phá đảo dạng toán mệnh đề, suy luận logic, thứ tự sắp xếp và bài toán logic phức tạp.'
  },
  {
    id: 'emp-vact-3-vietnamese',
    title: 'Chữa Đề Thi Thử Chuẩn Cấu Trúc Số 3 – Phần Tiếng Việt',
    examType: 'VACT',
    subject: 'Tiếng Việt',
    type: 'video',
    fileUrl: 'https://www.youtube.com/embed/fJ9rUzIMcZQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    duration: '40 phút',
    description: 'Kỹ năng đọc hiểu văn bản, biện pháp tu từ, ngữ pháp tiếng Việt và phong cách ngôn ngữ.'
  },
  {
    id: 'emp-vact-3-english',
    title: 'Chữa Đề Thi Thử Chuẩn Cấu Trúc Số 3 – Phần Tiếng Anh',
    examType: 'VACT',
    subject: 'Tiếng Anh',
    type: 'video',
    fileUrl: 'https://www.youtube.com/embed/2e_GqjQp-uU',
    youtubeUrl: 'https://www.youtube.com/watch?v=2e_GqjQp-uU',
    duration: '42 phút',
    description: 'Giải nhanh 20 câu trắc nghiệm tiếng Anh ĐGNL, từ vựng theo ngữ cảnh và đọc điền từ.'
  },
  {
    id: 'emp-vact-3-physics',
    title: 'Chữa Đề Thi Thử Chuẩn Cấu Trúc Số 3 – Phần Vật Lý',
    examType: 'VACT',
    subject: 'Vật lý',
    type: 'video',
    fileUrl: 'https://www.youtube.com/embed/Km3ZbHFZZMw',
    duration: '35 phút',
    description: 'Các bài toán thực nghiệm vật lý, dao động cơ, sóng ánh sáng và điện xoay chiều.'
  },
  {
    id: 'emp-vact-3-chemistry',
    title: 'Chữa Đề Thi Thử Chuẩn Cấu Trúc Số 3 – Phần Hóa Học',
    examType: 'VACT',
    subject: 'Hóa học',
    type: 'video',
    fileUrl: 'https://www.youtube.com/embed/W_8aEs16RI0',
    duration: '38 phút',
    description: 'Xử lý các bài toán hóa học ứng dụng thực tiễn, phân bón, polime và thí nghiệm hóa học.'
  },
  {
    id: 'emp-vact-3-biology',
    title: 'Chữa Đề Thi Thử Chuẩn Cấu Trúc Số 3 – Phần Sinh Học',
    examType: 'VACT',
    subject: 'Sinh học',
    type: 'video',
    fileUrl: 'https://www.youtube.com/embed/L0xgeN0XBLQ',
    duration: '32 phút',
    description: 'Tư duy đọc biểu đồ sinh thái học, phả hệ di truyền và sinh học phân tử.'
  },
  {
    id: 'emp-vact-3-social',
    title: 'Chữa Đề Thi Thử Chuẩn Cấu Trúc Số 3 – Phần Khoa Học Xã Hội',
    examType: 'VACT',
    subject: 'Khoa học Xã hội',
    type: 'video',
    fileUrl: 'https://www.youtube.com/embed/ZEPvf2TBZ68',
    duration: '46 phút',
    description: 'Tổng ôn Lịch sử - Địa lí Việt Nam & thế giới trọng tâm trong ma trận đề thi V-ACT.'
  },
  {
    id: 'emp-vact-3-doc',
    title: 'ĐỀ THI THỬ CHUẨN CẤU TRÚC V-ACT SỐ 3 (ĐHQG TP.HCM)',
    examType: 'VACT',
    subject: 'Đề Tổng Hợp',
    type: 'pdf',
    fileUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/___t__luy_n_v_act_s__3_1782640988298852664854.pdf',
    fileSize: '5.1 MB',
    description: 'Đề thi số 3 bấm giờ 150 phút, kèm ma trận phân tích năng lực chi tiết.'
  },
  {
    id: 'emp-vact-3-ans',
    title: 'ĐÁP ÁN & LỜI GIẢI CHI TIẾT ĐỀ THI THỬ V-ACT SỐ 3',
    examType: 'VACT',
    subject: 'Đáp án chi tiết',
    type: 'pdf',
    fileUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/da____t__luy_n_v_act_s__3_1782640994804384414278.pdf',
    fileSize: '3.4 MB',
    description: 'File PDF lời giải chi tiết từng bước cho toàn bộ 120 câu hỏi.'
  },

  // --- V-ACT ĐỀ SỐ 4 & 5 ---
  {
    id: 'emp-vact-4-doc',
    title: 'ĐỀ THI THỬ CHUẨN CẤU TRÚC V-ACT SỐ 4 (ĐHQG TP.HCM)',
    examType: 'VACT',
    subject: 'Đề Tổng Hợp',
    type: 'pdf',
    fileUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/___t__luy_n_v_act_s__4_1782641000358311520111.pdf',
    fileSize: '4.9 MB',
    description: 'Đề rèn luyện nâng cao củng cố tốc độ làm bài và tư duy loại suy.'
  },
  {
    id: 'emp-vact-4-ans',
    title: 'ĐÁP ÁN & LỜI GIẢI CHI TIẾT ĐỀ THI THỬ V-ACT SỐ 4',
    examType: 'VACT',
    subject: 'Đáp án chi tiết',
    type: 'pdf',
    fileUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/da____t__luy_n_v_act_s__4_1782641006710224972881.pdf',
    fileSize: '3.3 MB',
    description: 'Lời giải chi tiết câu hỏi khó và bài tập phân hóa cao.'
  },
  {
    id: 'emp-vact-5-doc',
    title: 'ĐỀ THI THỬ CHUẨN CẤU TRÚC V-ACT SỐ 5 (ĐHQG TP.HCM)',
    examType: 'VACT',
    subject: 'Đề Tổng Hợp',
    type: 'pdf',
    fileUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/___t__luy_n_v_act_s__5_1782641011620384031152.pdf',
    fileSize: '5.2 MB',
    description: 'Đề thi thử số 5 - Đợt tổng duyệt trước kỳ thi chính thức ĐHQG TP.HCM.'
  },
  {
    id: 'emp-vact-5-ans',
    title: 'ĐÁP ÁN & LỜI GIẢI CHI TIẾT ĐỀ THI THỬ V-ACT SỐ 5',
    examType: 'VACT',
    subject: 'Đáp án chi tiết',
    type: 'pdf',
    fileUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/da____t__luy_n_v_act_s__5_1782641017462873933991.pdf',
    fileSize: '3.5 MB',
    description: 'Bảng đáp án và hướng dẫn giải các bài toán đọc hiểu văn bản & phân tích số liệu.'
  },

  // --- HSA ĐHQG HÀ NỘI ---
  {
    id: 'emp-hsa-quant',
    title: 'Chiến Thuật Bứt Phá Điểm Số Phần Tư Duy Định Lượng HSA (ĐHQG HN)',
    examType: 'HSA',
    subject: 'Tư duy Định lượng',
    type: 'video',
    fileUrl: 'https://www.youtube.com/embed/W_8aEs16RI0',
    youtubeUrl: 'https://www.youtube.com/watch?v=W_8aEs16RI0',
    duration: '65 phút',
    description: 'Phương pháp giải nhanh 50 câu toán định lượng HSA trong 75 phút, tránh bẫy câu điền đáp số.'
  },
  {
    id: 'emp-hsa-qual',
    title: 'Bí Quyết Làm Chủ 50 Câu Tư Duy Định Tính (Văn Học & Ngôn Ngữ HSA)',
    examType: 'HSA',
    subject: 'Tư duy Định tính',
    type: 'video',
    fileUrl: 'https://www.youtube.com/embed/Km3ZbHFZZMw',
    youtubeUrl: 'https://www.youtube.com/watch?v=Km3ZbHFZZMw',
    duration: '50 phút',
    description: 'Kỹ thuật đọc quét (Skimming/Scanning) xử lý bài đọc dài và từ ngữ tương đương trong đề HSA.'
  },
  {
    id: 'emp-hsa-handbook-doc',
    title: 'SỔ TAY CÔNG THỨC & DẠNG TOÁN TRỌNG TÂM KỲ THI HSA 2026/2027',
    examType: 'HSA',
    subject: 'Tài liệu Ôn Tập',
    type: 'pdf',
    fileUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/___t__luy_n_v_act_s__1_1782640977321798975976.pdf',
    fileSize: '6.8 MB',
    description: 'Tổng hợp 100 dạng bài định lượng thường gặp kèm mẹo bấm máy Casio fx-580 / fx-880.'
  },

  // --- CASIO ĐGNL & ĐGTD ---
  {
    id: 'emp-casio-dgnl-1',
    title: 'Casio Chinh Phục Các Kỳ Thi ĐGNL & ĐGTD – Kỹ Thuật Menu 8 & Shift Solve',
    examType: 'ALL',
    subject: 'Casio Tốc Độ',
    type: 'video',
    fileUrl: 'https://www.youtube.com/embed/L0xgeN0XBLQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=L0xgeN0XBLQ',
    duration: '55 phút',
    description: 'Bấm máy tìm cực trị, nghiệm nguyên, tiệm cận và xử lý dãy số chỉ với 15-20 giây mỗi câu.'
  }
];

export const DGNLHubView: React.FC<DGNLHubViewProps> = ({ onTakeExam, onSelectDocument }) => {
  const [selectedExamType, setSelectedExamType] = useState<DGNLExamType>('ALL');
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'pdf' | 'sync'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<EmpireResourceItem | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importSuccessMsg, setImportSuccessMsg] = useState('');
  const [customResources, setCustomResources] = useState<EmpireResourceItem[]>(() => {
    try {
      const saved = localStorage.getItem('eduviet_dgnl_custom_resources');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Script F12 để người dùng chạy trên web empire.edu.vn
  const extractionScript = `// == SCRIPT TRÍCH XUẤT BÀI GIẢNG & TÀI LIỆU TỪ EMPIRE.EDU.VN ==
(async function() {
  console.log("🚀 Đang quét dữ liệu từ tài khoản Empire...");
  const resources = [];
  
  // 1. Quét tài liệu PDF / file đính kèm
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.href;
    const title = a.innerText.trim() || a.title || 'Tài liệu Empire';
    if (href.match(/\\.(pdf|docx?|zip|rar)$/i) || href.includes('/document/') || href.includes('drive.google.com')) {
      resources.push({
        id: 'emp-doc-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        title: title,
        examType: 'VACT',
        subject: 'Tài liệu đính kèm',
        type: 'pdf',
        fileUrl: href,
        fileSize: 'PDF',
        description: 'Tài liệu trích xuất từ khóa học Empire của bạn'
      });
    }
  });

  // 2. Quét video bài giảng
  document.querySelectorAll('video, iframe, source').forEach(el => {
    const src = el.src || el.getAttribute('data-src');
    if (src && !src.includes('googletagmanager')) {
      resources.push({
        id: 'emp-vid-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        title: document.title || 'Bài giảng Empire Video',
        examType: 'VACT',
        subject: 'Bài giảng Video',
        type: 'video',
        fileUrl: src,
        duration: 'Xem online',
        description: 'Video bài giảng đã đồng bộ từ Empire'
      });
    }
  });

  // 3. Tải về file JSON
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resources, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", "empire_dgnl_data.json");
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();

  alert("✅ Đã trích xuất thành công " + resources.length + " bài giảng & tài liệu! File 'empire_dgnl_data.json' đã tải về máy của bạn.");
})();`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(extractionScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleImportJson = () => {
    try {
      if (!importJsonText.trim()) return;
      const parsed = JSON.parse(importJsonText);
      const itemsToAdd: EmpireResourceItem[] = Array.isArray(parsed) ? parsed : (parsed.resources || parsed.docs || []);
      if (itemsToAdd.length === 0) {
        alert('Không tìm thấy bài giảng hoặc tài liệu nào trong file JSON!');
        return;
      }
      const updated = [...itemsToAdd, ...customResources];
      setCustomResources(updated);
      localStorage.setItem('eduviet_dgnl_custom_resources', JSON.stringify(updated));
      setImportSuccessMsg(`Đã nhập thành công ${itemsToAdd.length} bài học và tài liệu mới từ Empire!`);
      setImportJsonText('');
      setTimeout(() => setImportSuccessMsg(''), 4000);
      setActiveTab('all');
    } catch (e: any) {
      alert('Định dạng JSON không hợp lệ! Vui lòng kiểm tra lại nội dung dán vào.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setImportJsonText(content);
    };
    reader.readAsText(file);
  };

  // Tổng hợp dữ liệu
  const allResources = [...customResources, ...PRESET_EMPIRE_RESOURCES];

  // Lọc dữ liệu
  const filteredResources = allResources.filter(item => {
    const matchesExam = selectedExamType === 'ALL' || item.examType === selectedExamType || item.examType === 'ALL';
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesExam && matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* ─── BANNER HEADER CHUYÊN BIỆT ĐGNL ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 p-6 md:p-10 text-white shadow-2xl border border-indigo-500/30">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 text-amber-300 text-xs md:text-sm font-bold tracking-wide">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            CHUYÊN TRANG ĐẶC BIỆT: LUYỆN THI ĐÁNH GIÁ NĂNG LỰC 2026 - 2027
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200">
            Trung Tâm Luyện Thi ĐGNL & Empire Hub
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
            Tích hợp toàn bộ đề thi thử, bài giảng video chữa chi tiết từng môn và kho tài liệu PDF chuẩn ma trận 
            <strong> ĐHQG TP.HCM (V-ACT)</strong>, <strong>ĐHQG Hà Nội (HSA)</strong>, <strong>ĐH Bách Khoa (TSA)</strong>.
          </p>

          {/* Quick Badges Kỳ Thi */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>V-ACT ĐHQG TP.HCM: 120 câu / 150p</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span>HSA ĐHQG HN: 150 câu / 195p</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>ĐGTD TSA Bách Khoa: 100 điểm</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <span>Dữ Liệu Empire Team Đã Tích Hợp</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BỘ LỌC KỲ THI (EXAM PICKER) ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
            Chọn kỳ thi:
          </span>
          {[
            { key: 'ALL', label: 'Tất Cả Kỳ Thi', count: allResources.length },
            { key: 'VACT', label: 'V-ACT (TP.HCM)', count: allResources.filter(r => r.examType === 'VACT').length },
            { key: 'HSA', label: 'HSA (Hà Nội)', count: allResources.filter(r => r.examType === 'HSA').length },
            { key: 'TSA', label: 'TSA (Bách Khoa)', count: allResources.filter(r => r.examType === 'TSA').length },
          ].map(exam => (
            <button
              key={exam.key}
              onClick={() => setSelectedExamType(exam.key as DGNLExamType)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedExamType === exam.key
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{exam.label}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                selectedExamType === exam.key ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}>
                {exam.count}
              </span>
            </button>
          ))}
        </div>

        {/* Ô Tìm Kiếm */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm đề, môn hoặc video..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      {/* ─── TAB NAVIGATION: TẤT CẢ | VIDEO | TÀI LIỆU PDF | ĐỒNG BỘ EMPIRE ─── */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'all'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            Tất Cả Nội Dung ({filteredResources.length})
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'video'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            Video Bài Giảng Empire ({allResources.filter(r => r.type === 'video').length})
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'pdf'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Kho Đề & Tài Liệu PDF ({allResources.filter(r => r.type === 'pdf').length})
          </button>
        </div>

        {/* Nút Đồng Bộ Từ Empire */}
        <button
          onClick={() => setActiveTab('sync')}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
            activeTab === 'sync'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-orange-500/20'
              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-800 hover:bg-amber-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Đồng Bộ Từ Tài Khoản Empire
        </button>
      </div>

      {/* ─── MODAL PHÁT VIDEO BÀI GIẢNG ─── */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-indigo-600 text-white text-[11px] font-bold">
                  {selectedVideo.examType}
                </span>
                <h3 className="font-bold text-sm md:text-base text-white line-clamp-1">
                  {selectedVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              {selectedVideo.fileUrl.includes('youtube.com') || selectedVideo.fileUrl.includes('youtu.be') ? (
                <iframe
                  src={selectedVideo.fileUrl}
                  title={selectedVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selectedVideo.fileUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Trình duyệt không hỗ trợ phát định dạng video này.
                </video>
              )}
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
              <div className="space-y-1">
                <p className="text-xs text-indigo-400 font-semibold">{selectedVideo.subject}</p>
                <p className="text-xs text-slate-400">{selectedVideo.description}</p>
              </div>
              {selectedVideo.youtubeUrl && (
                <a
                  href={selectedVideo.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Mở trên YouTube
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB NỘI DUNG: TAB ĐỒNG BỘ EMPIRE ─── */}
      {activeTab === 'sync' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
          {/* Cột 1: Hướng dẫn trích xuất từ Empire F12 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Lấy Toàn Bộ Bài Giảng & File Từ Tài Khoản Empire
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Chỉ cần 30 giây để trích xuất sạch sẽ toàn bộ khóa học bạn đã đăng nhập
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-indigo-600">Bước 1:</span>
                <span>Mở tab trình duyệt đang đăng nhập tài khoản tại <strong>empire.edu.vn/khoa-hoc</strong></span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-indigo-600">Bước 2:</span>
                <span>Bấm phím <strong>F12</strong> (hoặc chuột phải ➔ <i>Kiểm tra / Inspect</i>), chuyển sang tab <strong>Console</strong>.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-indigo-600">Bước 3:</span>
                <span>Copy mã lệnh bên dưới, dán vào tab Console và ấn <strong>Enter</strong>. File <code>empire_dgnl_data.json</code> sẽ tự tải về máy!</span>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between px-3 py-2 bg-slate-800 text-slate-300 rounded-t-xl text-xs font-mono">
                <span>empire_crawler_script.js</span>
                <button
                  onClick={handleCopyScript}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all"
                >
                  {copiedScript ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                  {copiedScript ? 'Đã Copy Thành Công!' : 'Copy Toàn Bộ Mã'}
                </button>
              </div>
              <pre className="p-3 bg-slate-950 text-emerald-400 font-mono text-[11px] rounded-b-xl overflow-x-auto max-h-48 border-t border-slate-800">
                {extractionScript}
              </pre>
            </div>
          </div>

          {/* Cột 2: Nạp file JSON vào Web EduViet */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Nạp File Dữ Liệu Vào Web EduViet
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tải lên file vừa trích xuất để bài giảng & tài liệu hiển thị ngay lập tức
                </p>
              </div>
            </div>

            {importSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {importSuccessMsg}
              </div>
            )}

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">
                Cách 1: Chọn file <code>empire_dgnl_data.json</code> từ máy tính
              </label>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-950 dark:file:text-indigo-300"
              />

              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 pt-2">
                Cách 2: Hoặc dán trực tiếp nội dung JSON vào đây
              </label>
              <textarea
                rows={5}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='[ { "title": "Bài giảng...", "fileUrl": "...", "type": "video" } ]'
                className="w-full p-3 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200"
              />

              <button
                onClick={handleImportJson}
                disabled={!importJsonText.trim()}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/20"
              >
                <Upload className="w-4 h-4" />
                Xác Nhận Nạp Bài Giảng & Tài Liệu Vào Web
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DANH SÁCH BÀI HỌC & TÀI LIỆU (GRID VIEW) ─── */}
      {activeTab !== 'sync' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-xl dark:hover:shadow-indigo-950/30 transition-all duration-300"
            >
              <div className="space-y-3">
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold tracking-wide uppercase ${
                      item.examType === 'VACT' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      item.examType === 'HSA' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300' :
                      item.examType === 'TSA' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                    }`}>
                      {item.examType}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      {item.subject}
                    </span>
                  </div>

                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    item.type === 'video'
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                      : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                  }`}>
                    {item.type === 'video' ? <Video className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                    {item.type === 'video' ? 'Video' : 'File PDF'}
                  </span>
                </div>

                {/* Tiêu đề */}
                <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>

                {/* Mô tả */}
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description || 'Bài giảng chuyên sâu ôn thi đánh giá năng lực bám sát ma trận cấu trúc đề thật.'}
                </p>
              </div>

              {/* Footer Thao Tác */}
              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {item.duration || item.fileSize || 'Tài liệu'}
                </span>

                {item.type === 'video' ? (
                  <button
                    onClick={() => setSelectedVideo(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm shadow-indigo-500/20 group-hover:scale-105"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Xem Bài Giảng
                  </button>
                ) : (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition-all shadow-sm group-hover:scale-105"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Tải File Đề PDF
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Thông báo nếu không có kết quả */}
      {filteredResources.length === 0 && activeTab !== 'sync' && (
        <div className="py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
            Không tìm thấy bài giảng hoặc tài liệu phù hợp với tìm kiếm
          </p>
          <button
            onClick={() => { setSelectedExamType('ALL'); setActiveTab('all'); setSearchQuery(''); }}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};
