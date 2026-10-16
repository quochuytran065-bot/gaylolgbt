import { Exam, DocumentItem } from '../types';

export interface EmpireYouTubeVideo {
  id: string;
  youtubeId: string;
  title: string;
  examType: 'VACT' | 'HSA' | 'ALL';
  category: 'vact' | 'hsa_dot5' | 'hsa_dot4' | 'skills' | 'career';
  subject: string;
  duration: string;
  description: string;
}

export interface EmpireLmsPdf {
  id: string;
  title: string;
  examType: 'VACT' | 'HSA' | 'ALL';
  subject: string;
  fileSize: string;
  description: string;
  cdnUrl: string;
  eduvietDocId?: string; // If available in EduViet mockData for direct in-app reading
}

export interface EmpireLmsLesson {
  id: string;
  title: string;
  set: string; // 'Đề số 1', 'Đề số 2', 'Đề số 3', etc.
  subject: string;
  cdnUrl: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. TRỌN BỘ 30 VIDEO CHÍNH THỨC TỪ KÊNH EMPIRE TEAM (@luyenthidgnl.empire01)
// 100% video thật, tiêu đề chuẩn xác, xem trực tiếp không cần đăng nhập
// ═══════════════════════════════════════════════════════════════════════════
export const EMPIRE_YOUTUBE_VIDEOS: EmpireYouTubeVideo[] = [
  // ─── NHÓM 1: LUYỆN THI V-ACT (ĐHQG TP.HCM) ───
  {
    id: 'vact-mo-phong-full',
    youtubeId: '9zBkh_qxH-Q',
    title: 'Chữa Đề Mô Phỏng V-ACT Đợt 2 Các Môn (Trọn Bộ Thực Chiến)',
    examType: 'VACT',
    category: 'vact',
    subject: 'Tổng hợp V-ACT',
    duration: '4 giờ 50 phút',
    description: 'Video giải chi tiết toàn bộ các phần thi trong Đề mô phỏng V-ACT Đợt 2 năm 2026: Ngôn ngữ, Toán - Logic - Số liệu và Giải quyết vấn đề.'
  },
  {
    id: 'vact-mo-phong-toan',
    youtubeId: 'vu_2QqTEpiA',
    title: 'Giải Chi Tiết Đề Mô Phỏng V-ACT Đợt 2 – Phần Toán Học',
    examType: 'VACT',
    category: 'vact',
    subject: 'Toán học & Logic',
    duration: '1 giờ 24 phút',
    description: 'Chữa chi tiết từng câu hỏi phần Toán học đề mô phỏng V-ACT Đợt 2. Hướng dẫn kỹ năng tư duy định lượng và mẹo xử lý nhanh.'
  },
  {
    id: 'vact-tinh-hoa-4-toan',
    youtubeId: 'QiHvmDUsybY',
    title: 'Giải Chi Tiết Đề Tinh Hoa V-ACT 2026 | Phần Toán Học – Đề Số 04',
    examType: 'VACT',
    category: 'vact',
    subject: 'Toán học & Casio',
    duration: '1 giờ 36 phút',
    description: 'Bộ đề Tinh Hoa V-ACT độc quyền của Empire – Đề số 04 phần Toán học với các câu hỏi phân hóa 900+ điểm, phương pháp giải tối ưu thời gian.'
  },
  {
    id: 'vact-tinh-hoa-4-tieng-viet',
    youtubeId: 'gMsMEu1JDXA',
    title: 'Giải Chi Tiết Đề Tinh Hoa V-ACT 2026 | Phần Tiếng Việt – Đề Số 04',
    examType: 'VACT',
    category: 'vact',
    subject: 'Sử dụng Tiếng Việt',
    duration: '57 phút',
    description: 'Phân tích phương pháp làm 20 câu Tiếng Việt trong Đề Tinh Hoa số 04: Đọc hiểu văn bản, ngữ pháp, ngữ nghĩa và nhận diện biện pháp nghệ thuật.'
  },
  {
    id: 'vact-tinh-hoa-4-tieng-anh',
    youtubeId: 'VqzqOhrDWHg',
    title: 'Giải Chi Tiết Đề Tinh Hoa V-ACT 2026 | Phần Tiếng Anh – Đề Số 04',
    examType: 'VACT',
    category: 'vact',
    subject: 'Tiếng Anh V-ACT',
    duration: '55 phút',
    description: 'Chiến thuật ăn trọn điểm phần Tiếng Anh Đề Tinh Hoa số 04: Từ vựng học thuật theo ngữ cảnh, bài đọc dài và câu hỏi điền từ phức.'
  },

  // ─── NHÓM 2: ĐỀ DỰ ĐOÁN HSA ĐỢT 5/2026 (ĐHQG HÀ NỘI) ───
  {
    id: 'hsa-dot5-toan',
    youtubeId: 'mOKe3lfnUCM',
    title: 'Giải Chi Tiết Đề Dự Đoán HSA Đợt 5/2026 Số 1 – Phần Toán Học',
    examType: 'HSA',
    category: 'hsa_dot5',
    subject: 'Tư duy Định lượng',
    duration: '2 giờ 43 phút',
    description: 'Chữa toàn bộ 50 câu Toán học trong Đề Dự Đoán HSA Đợt 5 số 1 – Phân tích kỹ thuật giải trắc nghiệm 4 lựa chọn và câu hỏi điền đáp số.'
  },
  {
    id: 'hsa-dot5-ly',
    youtubeId: '9eJkfkbL09k',
    title: 'Giải Chi Tiết Đề Dự Đoán HSA Đợt 5/2026 Số 1 – Phần Vật Lý',
    examType: 'HSA',
    category: 'hsa_dot5',
    subject: 'Vật lý (Khoa học)',
    duration: '50 phút',
    description: 'Chữa trọn vẹn phần Vật lý đề dự đoán HSA Đợt 5 số 1: Dao động cơ, sóng cơ, điện xoay chiều và các bài toán thực nghiệm vật lý.'
  },
  {
    id: 'hsa-dot5-hoa',
    youtubeId: 'NTnJbnMSpw4',
    title: 'Giải Chi Tiết Đề Dự Đoán HSA Đợt 5/2026 Số 1 – Phần Hóa Học',
    examType: 'HSA',
    category: 'hsa_dot5',
    subject: 'Hóa học (Khoa học)',
    duration: '22 phút',
    description: 'Chữa phần Hóa học đề dự đoán HSA Đợt 5: Phương pháp bảo toàn electron, đồ thị hóa học và bài toán este-peptit thực tế.'
  },
  {
    id: 'hsa-dot5-sinh',
    youtubeId: 'nCAN6vwwAIo',
    title: 'Giải Chi Tiết Đề Dự Đoán HSA Đợt 5/2026 Số 1 – Phần Sinh Học',
    examType: 'HSA',
    category: 'hsa_dot5',
    subject: 'Sinh học (Khoa học)',
    duration: '11 phút',
    description: 'Phần Sinh học đề dự đoán HSA Đợt 5: Di truyền học phân tử, phả hệ và sinh thái học ứng dụng trong đời sống.'
  },
  {
    id: 'hsa-dot5-su',
    youtubeId: '4xL0Z4Irslk',
    title: 'Giải Chi Tiết Đề Dự Đoán HSA Đợt 5/2026 Số 1 – Phần Lịch Sử',
    examType: 'HSA',
    category: 'hsa_dot5',
    subject: 'Lịch sử (KHXH)',
    duration: '30 phút',
    description: 'Phân tích câu hỏi Lịch sử đề dự đoán HSA Đợt 5: Lịch sử Việt Nam cận hiện đại, chiến dịch lịch sử và bối cảnh quốc tế.'
  },
  {
    id: 'hsa-dot5-dia',
    youtubeId: 'a7Cfg-ICDnM',
    title: 'Giải Chi Tiết Đề Dự Đoán HSA Đợt 5/2026 Số 1 – Phần Địa Lý',
    examType: 'HSA',
    category: 'hsa_dot5',
    subject: 'Địa lý (KHXH)',
    duration: '34 phút',
    description: 'Chữa phần Địa lý đề dự đoán HSA Đợt 5: Khai thác Atlat Địa lý, nhận diện biểu đồ và đặc điểm các vùng kinh tế trọng điểm.'
  },

  // ─── NHÓM 3: ĐỀ DỰ ĐOÁN HSA ĐỢT 4/2026 (ĐHQG HÀ NỘI) ───
  {
    id: 'hsa-dot4-toan',
    youtubeId: 'W-Pqhj8igUY',
    title: 'Giải Chi Tiết Đề Dự Đoán HSA Đợt 4/2026 Số 2 – Phần Toán Học',
    examType: 'HSA',
    category: 'hsa_dot4',
    subject: 'Tư duy Định lượng',
    duration: '2 giờ 37 phút',
    description: 'Chữa chi tiết 50 câu Toán học Đề Dự Đoán HSA Đợt 4 số 2: Hàm số, tích phân, hình học không gian Oxyz và xác suất thống kê.'
  },
  {
    id: 'hsa-dot4-dinh-tinh',
    youtubeId: 'wL43uMfqP-o',
    title: 'Giải Chi Tiết Đề Dự Đoán HSA Đợt 4/2026 Số 1 – Phần Định Tính',
    examType: 'HSA',
    category: 'hsa_dot4',
    subject: 'Tư duy Định tính',
    duration: '32 phút',
    description: 'Chữa phần Tư duy Định tính đề dự đoán HSA Đợt 4: Đọc hiểu văn bản văn học, phong cách ngôn ngữ và nhận diện lỗi câu.'
  },
  {
    id: 'hsa-dot4-ly',
    youtubeId: '11XU7nlX6OM',
    title: 'Giải Chi Tiết Đề Dự Đoán HSA Đợt 4/2026 Số 2 – Phần Vật Lý',
    examType: 'HSA',
    category: 'hsa_dot4',
    subject: 'Vật lý (Khoa học)',
    duration: '30 phút',
    description: 'Giải chi tiết phần Vật lý Đề số 2 Đợt 4 HSA: Các bài toán thí nghiệm thực hành và tư duy đồ thị vật lý hiện đại.'
  },
  {
    id: 'hsa-dot4-hoa',
    youtubeId: '1LYS_4f7NGk',
    title: 'Giải Chi Tiết Đề Dự Đoán HSA Đợt 4/2026 Số 2 – Phần Hóa Học',
    examType: 'HSA',
    category: 'hsa_dot4',
    subject: 'Hóa học (Khoa học)',
    duration: '24 phút',
    description: 'Giải phần Hóa học Đề số 2 Đợt 4 HSA: Kim loại kiềm, axit sunfuric đặc, hóa hữu cơ thực tiễn và nhận biết chất.'
  },
  {
    id: 'hsa-dot4-sinh',
    youtubeId: 'x4WT35m83M0',
    title: 'Giải Chi Tiết Đề Dự Đoán HSA Đợt 4/2026 Số 2 – Phần Sinh Học',
    examType: 'HSA',
    category: 'hsa_dot4',
    subject: 'Sinh học (Khoa học)',
    duration: '11 phút',
    description: 'Giải phần Sinh học Đề số 2 Đợt 4 HSA: Tương tác gen, quy luật di truyền Menđen và công nghệ sinh học ứng dụng.'
  },
  {
    id: 'hsa-dot4-su',
    youtubeId: '4ROhPYNDXpo',
    title: 'Giải Chi Tiết Đề Dự Đoán HSA Đợt 4/2026 Số 2 – Phần Lịch Sử',
    examType: 'HSA',
    category: 'hsa_dot4',
    subject: 'Lịch sử (KHXH)',
    duration: '22 phút',
    description: 'Giải phần Lịch sử Đề số 2 Đợt 4 HSA: Giai đoạn 1919-1945, các hội nghị quốc tế và phong trào giải phóng dân tộc.'
  },
  {
    id: 'hsa-dot4-dia',
    youtubeId: 'KcX4hunok3c',
    title: 'Giải Chi Tiết Đề Dự Đoán HSA Đợt 4/2026 Số 1 – Phần Địa Lý',
    examType: 'HSA',
    category: 'hsa_dot4',
    subject: 'Địa lý (KHXH)',
    duration: '35 phút',
    description: 'Giải phần Địa lý Đề số 1 Đợt 4 HSA: Địa lý dân cư, đô thị hóa, chuyển dịch cơ cấu kinh tế theo ngành và lãnh thổ.'
  },
  {
    id: 'hsa-dot4-anh',
    youtubeId: 'ShWWAkIe4gk',
    title: 'Giải Chi Tiết Đề Dự Đoán HSA Đợt 4/2026 Số 2 – Phần Tiếng Anh',
    examType: 'HSA',
    category: 'hsa_dot4',
    subject: 'Tiếng Anh HSA',
    duration: '41 phút',
    description: 'Giải phần Tiếng Anh Đề số 2 Đợt 4 HSA: Ngữ pháp đảo ngữ, mệnh đề quan hệ rút gọn và kỹ năng đọc hiểu nhanh.'
  },

  // ─── NHÓM 4: CHUYÊN ĐỀ TƯ DUY & KIẾN THỨC NỀN TẢNG ───
  {
    id: 'skills-ham-bac-ba',
    youtubeId: '1vGgcupi_HE',
    title: 'Tư Duy Định Lượng | Giải Mã Các Dạng Toán Hàm Bậc Ba (Thầy Đỗ Văn Đức)',
    examType: 'HSA',
    category: 'skills',
    subject: 'Tư duy Định lượng',
    duration: '2 giờ 30 phút',
    description: 'Bài giảng chuyên sâu của Thầy Đỗ Văn Đức: Khảo sát hàm bậc ba, tương giao đồ thị, tiếp tuyến và các bài toán thực tế mức 9+ điểm.'
  },
  {
    id: 'skills-ktpl',
    youtubeId: 'KN8qTUPrpow',
    title: 'Ôn Tập Kinh Tế Pháp Luật Chuyên Sâu (Phải Vào Xem)',
    examType: 'ALL',
    category: 'skills',
    subject: 'Kinh tế & Pháp luật',
    duration: '1 giờ 32 phút',
    description: 'Hệ thống hóa toàn bộ kiến thức Kinh tế và Pháp luật phục vụ kỳ thi ĐGNL mới: Cơ chế thị trường, quyền sở hữu, hợp đồng dân sự và luật lao động.'
  },

  // ─── NHÓM 5: HƯỚNG NGHIỆP & TALKSHOW CHIẾN LƯỢC TỪ CHUYÊN GIA EMPIRE ───
  {
    id: 'talk-sai-lam-nganh',
    youtubeId: 'QUoBx0yMEAs',
    title: '5 Sai Lầm Lớn Nhất Khi Chọn Ngành Của Học Sinh Việt Nam | TS. Nguyễn Văn Lộc',
    examType: 'ALL',
    category: 'career',
    subject: 'Tư vấn Hướng nghiệp',
    duration: '2 giờ 02 phút',
    description: 'Chia sẻ của Tiến sĩ Nguyễn Văn Lộc về định hướng chọn ngành nghề theo năng lực bản thân, xu thế thị trường và tránh bẫy tâm lý đám đông.'
  },
  {
    id: 'talk-dung-hoc-dai',
    youtubeId: '8AlPK_CpVBU',
    title: 'Đại Học Đừng Học Đại | Hướng Nghiệp Chuyên Sâu Cùng PGS.TS Nguyễn Minh Thuyết',
    examType: 'ALL',
    category: 'career',
    subject: 'Tư vấn Hướng nghiệp',
    duration: '1 giờ 39 phút',
    description: 'Gặp gỡ và trao đổi cùng PGS.TS Nguyễn Minh Thuyết về tư duy chọn trường đại học, giá trị của kỳ thi ĐGNL và định hướng tương lai.'
  },
  {
    id: 'talk-10-bay-nganh',
    youtubeId: 'U5jqrxh8jD4',
    title: '10 Bẫy Chọn Ngành Mà 90% Học Sinh Mắc Phải | TS. Nguyễn Văn Lộc',
    examType: 'ALL',
    category: 'career',
    subject: 'Tư vấn Hướng nghiệp',
    duration: '1 giờ 59 phút',
    description: 'Phân tích chi tiết 10 cái bẫy nguy hiểm nhất khi đăng ký nguyện vọng xét tuyển bằng điểm thi ĐGNL và điểm thi tốt nghiệp THPT.'
  },
  {
    id: 'talk-marketing',
    youtubeId: '-Pn6ynPEgZ4',
    title: 'Giải Mã Ngành Marketing | Sáng Tạo Hay Áp Lực Cùng Tiến Sĩ Nguyễn Văn Lộc',
    examType: 'ALL',
    category: 'career',
    subject: 'Định hướng Ngành nghề',
    duration: '2 giờ 05 phút',
    description: 'Phân tích tường tận về ngành Marketing: Sự thật về cơ hội nghề nghiệp, mức lương, tố chất cần có và trường đại học đào tạo tốt nhất.'
  },
  {
    id: 'talk-hoc-de-lam-gi',
    youtubeId: 'YbVXVxAE-70',
    title: 'Giải Đáp: Học Đại Học Để Làm Gì? Cùng Tiến Sĩ Nguyễn Văn Lộc',
    examType: 'ALL',
    category: 'career',
    subject: 'Định hướng Tương lai',
    duration: '2 giờ 01 phút',
    description: 'Tọa đàm chuyên sâu về mục tiêu học đại học, xây dựng năng lực cốt lõi trong kỷ nguyên số và cách tận dụng tối đa điểm thi ĐGNL.'
  },
  {
    id: 'talk-nganh-tiem-nang-ai',
    youtubeId: 'xds3Ow2homc',
    title: 'Ngành Nào Tiềm Năng 5-10 Năm Tới & Khó Bị Thay Thế Bởi AI? Th.S Trần Ngọc Huy Thịnh',
    examType: 'ALL',
    category: 'career',
    subject: 'Xu hướng Công nghệ & AI',
    duration: '1 giờ 58 phút',
    description: 'Dự báo thị trường lao động 2026-2035: Những ngành nghề nào an toàn trước làn sóng trí tuệ nhân tạo và những kỹ năng sinh viên cần trau dồi.'
  },
  {
    id: 'talk-nganh-hot-viec-lam',
    youtubeId: 'Ru-yNNtuYko',
    title: 'Ngành HOT Có Thực Sự Dễ Xin Việc? | TS. Nguyễn Văn Lộc',
    examType: 'ALL',
    category: 'career',
    subject: 'Cung cầu Thị trường',
    duration: '2 giờ 03 phút',
    description: 'Bóc tách thực trạng về các "ngành HOT" ảo và cung cầu tuyển dụng thực tế của doanh nghiệp hiện nay.'
  },
  {
    id: 'talk-dat-nguyen-vong',
    youtubeId: 'aNWGtfMYgcw',
    title: 'Chiến Thuật: Chọn Ngành – Chọn Trường – Đặt Thứ Tự Nguyện Vọng ĐGNL',
    examType: 'ALL',
    category: 'career',
    subject: 'Chiến thuật Nguyện vọng',
    duration: '1 giờ 46 phút',
    description: 'Thuật toán sắp xếp nguyện vọng thông minh: Tối ưu cơ hội đỗ đại học top đầu bằng điểm thi V-ACT và HSA mà không lo bị rớt oan.'
  },
  {
    id: 'talk-khoi-kinh-te',
    youtubeId: 'RbDkUy7PMsw',
    title: 'Giải Mã Khối Ngành Kinh Tế: Học Gì | Làm Gì | Ai Nên Học?',
    examType: 'ALL',
    category: 'career',
    subject: 'Khối ngành Kinh tế',
    duration: '2 giờ 03 phút',
    description: 'Toàn cảnh về khối ngành Kinh tế - Quản trị - Tài chính ngân hàng - Logistics: Sự khác biệt giữa các chuyên ngành và lộ trình phát triển.'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// 2. TRỌN BỘ 10 TÀI LIỆU PDF CHÍNH THỨC TỪ HỆ THỐNG EMPIRE LMS
// ═══════════════════════════════════════════════════════════════════════════
export const EMPIRE_LMS_PDFS: EmpireLmsPdf[] = [
  {
    id: 'empire-pdf-de-1',
    title: 'ĐỀ THI THỬ CHUẨN CẤU TRÚC V-ACT SỐ 1 (ĐHQG TP.HCM)',
    examType: 'VACT',
    subject: 'Đề thi thực chiến',
    fileSize: '4.5 MB',
    description: 'Đề thi chuẩn ma trận 120 câu: Sử dụng ngôn ngữ (40 câu), Toán học - Logic - Phân tích số liệu (30 câu), Giải quyết vấn đề (50 câu).',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/___t__luy_n_v_act_s__1_1782640141467216195118.pdf',
    eduvietDocId: 'doc-dgnl-vact-de2' // Đọc được ngay trên EduViet viewer
  },
  {
    id: 'empire-pdf-da-1',
    title: 'ĐÁP ÁN ĐỀ THI THỬ CHUẨN CẤU TRÚC V-ACT SỐ 1',
    examType: 'VACT',
    subject: 'Đáp án & Lời giải',
    fileSize: '3.8 MB',
    description: 'Hướng dẫn giải chi tiết từng bước cho toàn bộ 120 câu hỏi trong Đề thi thử chuẩn cấu trúc số 1. Kèm mẹo bấm máy Casio.',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/da____t__luy_n_v_act_s__1_1782640147930831928455.pdf'
  },
  {
    id: 'empire-pdf-de-2',
    title: 'ĐỀ THI THỬ CHUẨN CẤU TRÚC V-ACT SỐ 2 (ĐHQG TP.HCM)',
    examType: 'VACT',
    subject: 'Đề thi thực chiến',
    fileSize: '4.8 MB',
    description: 'Đề thi thử số 2 bám sát đề thi chính thức: Tăng cường các câu hỏi suy luận logic, đồ thị số liệu thống kê và khoa học liên môn.',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/___t__luy_n_v_act_s__2_1782640977321798975976.pdf',
    eduvietDocId: 'doc-dgnl-vact-de2'
  },
  {
    id: 'empire-pdf-da-2',
    title: 'ĐÁP ÁN ĐỀ THI THỬ CHUẨN CẤU TRÚC V-ACT SỐ 2',
    examType: 'VACT',
    subject: 'Đáp án & Lời giải',
    fileSize: '4.1 MB',
    description: 'Lời giải chi tiết Đề số 2, phân tích các bẫy đề thi hay gặp trong phần Ngôn ngữ và bài toán logic phân loại cao.',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/da____t__luy_n_v_act_s__2_1782640983462818273471.pdf'
  },
  {
    id: 'empire-pdf-de-3',
    title: 'ĐỀ THI THỬ CHUẨN CẤU TRÚC V-ACT SỐ 3 (ĐHQG TP.HCM)',
    examType: 'VACT',
    subject: 'Đề thi thực chiến',
    fileSize: '5.1 MB',
    description: 'Đề thi thử số 3 nâng cao tốc độ phản xạ làm bài trong 150 phút. Thiết kế theo chuẩn ma trận ĐHQG TP.HCM.',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/___t__luy_n_v_act_s__3_1782640988298852664854.pdf',
    eduvietDocId: 'doc-dgnl-vact-de3'
  },
  {
    id: 'empire-pdf-da-3',
    title: 'ĐÁP ÁN ĐỀ THI THỬ CHUẨN CẤU TRÚC V-ACT SỐ 3',
    examType: 'VACT',
    subject: 'Đáp án & Lời giải',
    fileSize: '4.4 MB',
    description: 'Đáp án chi tiết Đề số 3: Phân tích kỹ thuật giải sơ đồ Venn cho câu hỏi logic và kỹ năng đọc lướt văn bản Tiếng Anh.',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/da____t__luy_n_v_act_s__3_1782640994804384414278.pdf'
  },
  {
    id: 'empire-pdf-de-4',
    title: 'ĐỀ THI THỬ CHUẨN CẤU TRÚC V-ACT SỐ 4 (ĐHQG TP.HCM)',
    examType: 'VACT',
    subject: 'Đề thi thực chiến',
    fileSize: '5.3 MB',
    description: 'Đề rèn luyện thực chiến số 4 biên soạn bởi Empire Team – Hướng tới mốc điểm 900+ cho học sinh mục tiêu trường top.',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/___t__luy_n_v_act_s__4_1782641000358311520111.pdf'
  },
  {
    id: 'empire-pdf-da-4',
    title: 'ĐÁP ÁN ĐỀ THI THỬ CHUẨN CẤU TRÚC V-ACT SỐ 4',
    examType: 'VACT',
    subject: 'Đáp án & Lời giải',
    fileSize: '4.6 MB',
    description: 'Đáp án chi tiết Đề số 4 kèm giải thích từng câu hỏi mức vận dụng cao trong phần Giải quyết vấn đề tự nhiên & xã hội.',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/da____t__luy_n_v_act_s__4_1782641006710224972881.pdf'
  },
  {
    id: 'empire-pdf-de-5',
    title: 'ĐỀ THI THỬ CHUẨN CẤU TRÚC V-ACT SỐ 5 (ĐHQG TP.HCM)',
    examType: 'VACT',
    subject: 'Đề thi thực chiến',
    fileSize: '5.5 MB',
    description: 'Đề số 5 tổng duyệt kiến thức toàn diện trước ngày thi chính thức. Kiểm tra phản xạ thời gian và độ chính xác tối đa.',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/___t__luy_n_v_act_s__5_1782641011620384031152.pdf'
  },
  {
    id: 'empire-pdf-da-5',
    title: 'ĐÁP ÁN ĐỀ THI THỬ CHUẨN CẤU TRÚC V-ACT SỐ 5',
    examType: 'VACT',
    subject: 'Đáp án & Lời giải',
    fileSize: '4.7 MB',
    description: 'Đáp án chi tiết Đề số 5 hoàn chỉnh – Tổng kết các phương pháp giải nhanh cần ghi nhớ trước khi bước vào phòng thi.',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/document/da____t__luy_n_v_act_s__5_1782641017462873933991.pdf'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// 3. TOÀN BỘ 47 BÀI GIẢNG VIDEO NỘI BỘ TỪ KHÓA THI THỬ EMPIRE LMS
// (khoa-thi-thu-danh-gia-nang-luc-1790486537251)
// ═══════════════════════════════════════════════════════════════════════════
export const EMPIRE_LMS_LESSONS: EmpireLmsLesson[] = [
  // ─── ĐỀ RÈN LUYỆN SỐ 1 ───
  {
    id: 'lms-1-toan-1',
    set: 'Đề số 1',
    title: '(17.11) Chữa đề thi thử chuẩn cấu trúc số 1 phần Toán P1',
    subject: 'Toán học',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/_17.11__ch_a____t__luy_n_v_act_s__1_ph_n_to_n_p1_1782618442467620786136.mp4'
  },
  {
    id: 'lms-1-toan-2',
    set: 'Đề số 1',
    title: '(17.11) Chữa đề thi thử chuẩn cấu trúc số 1 phần Toán P2',
    subject: 'Toán học',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/_17.11__ch_a____t__luy_n_v_act_s__1_ph_n_to_n_p2_1782618459515543024504.mp4'
  },
  {
    id: 'lms-1-viet',
    set: 'Đề số 1',
    title: '(18.11) Chữa đề thi thử chuẩn cấu trúc số 1 phần Tiếng Việt',
    subject: 'Tiếng Việt',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/_18.11__ch_a____t__luy_n_v_act_s__1_ph_n_ti_ng_vi_t_1782618476145916349612.mp4'
  },
  {
    id: 'lms-1-khxh',
    set: 'Đề số 1',
    title: '(20.11) Chữa đề thi thử chuẩn cấu trúc số 1 phần Khoa học xã hội',
    subject: 'KH Xã Hội',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/_20.11__ch_a____t__luy_n_v_act_s__1_ph_n_khoa_h_c_x__h_i_1782618488003954320613.mp4'
  },
  {
    id: 'lms-1-hoa',
    set: 'Đề số 1',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 1 phần Hoá học',
    subject: 'Hóa học',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__1_ph_n_ho__h_c_1782618495097394621267.mp4'
  },
  {
    id: 'lms-1-sl',
    set: 'Đề số 1',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 1 phần Phân tích số liệu',
    subject: 'Phân tích số liệu',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__1_ph_n_ph_n_t_ch_s__li_u_1782618503920219156719.mp4'
  },
  {
    id: 'lms-1-sinh',
    set: 'Đề số 1',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 1 phần Sinh học',
    subject: 'Sinh học',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__1_ph_n_sinh_h_c_1782618520727437508148.mp4'
  },
  {
    id: 'lms-1-anh',
    set: 'Đề số 1',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 1 phần Tiếng Anh',
    subject: 'Tiếng Anh',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__1_ph_n_ti_ng_anh_1782618537841897141148.mp4'
  },
  {
    id: 'lms-1-logic',
    set: 'Đề số 1',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 1 phần Toán logic',
    subject: 'Toán logic',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__1_ph_n_to_n_logic_1782618559888227005096.mp4'
  },
  {
    id: 'lms-1-ly',
    set: 'Đề số 1',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 1 phần Vật lý',
    subject: 'Vật lý',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__1_ph_n_v_t_l__1782618570125812337276.mp4'
  },

  // ─── ĐỀ RÈN LUYỆN SỐ 2 ───
  {
    id: 'lms-2-toan',
    set: 'Đề số 2',
    title: '(17.11) Chữa đề thi thử chuẩn cấu trúc số 2 phần Toán',
    subject: 'Toán học',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/_17.11__ch_a____t__luy_n_v_act_s__2_ph_n_to_n_1782618794389977280711.mp4'
  },
  {
    id: 'lms-2-khxh-1',
    set: 'Đề số 2',
    title: '(20.11) Chữa đề thi thử chuẩn cấu trúc số 2 phần Khoa học xã hội',
    subject: 'KH Xã Hội',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/_20.11__ch_a____t__luy_n_v_act_s__2_ph_n_khoa_h_c_x__h_i_1782618806095971364357.mp4'
  },
  {
    id: 'lms-2-hoa',
    set: 'Đề số 2',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 2 phần Hoá học',
    subject: 'Hóa học',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__2_ph_n_ho__h_c_1782618814753719589374.mp4'
  },
  {
    id: 'lms-2-sl',
    set: 'Đề số 2',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 2 phần phân tích số liệu',
    subject: 'Phân tích số liệu',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__2_ph_n_ph_n_t_ch_s__li_u_1782618829315834865364.mp4'
  },
  {
    id: 'lms-2-sinh',
    set: 'Đề số 2',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 2 phần Sinh học',
    subject: 'Sinh học',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__2_ph_n_sinh_h_c_1782618838035498019818.mp4'
  },
  {
    id: 'lms-2-anh',
    set: 'Đề số 2',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 2 phần Tiếng Anh',
    subject: 'Tiếng Anh',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__2_ph_n_ti_ng_anh_1782618851708337658731.mp4'
  },
  {
    id: 'lms-2-viet',
    set: 'Đề số 2',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 2 phần Tiếng Việt',
    subject: 'Tiếng Việt',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__2_ph_n_ti_ng_vi_t_1782618869870621408742.mp4'
  },
  {
    id: 'lms-2-logic',
    set: 'Đề số 2',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 2 phần Toán logic',
    subject: 'Toán logic',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__2_ph_n_to_n_logic_1782618895627689920074.mp4'
  },
  {
    id: 'lms-2-ly',
    set: 'Đề số 2',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 2 phần Vật lý',
    subject: 'Vật lý',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__2_ph_n_v_t_l__1782618910426465145223.mp4'
  },

  // ─── ĐỀ RÈN LUYỆN SỐ 3 ───
  {
    id: 'lms-3-toan',
    set: 'Đề số 3',
    title: '(17.11) Chữa đề thi thử chuẩn cấu trúc số 3 phần Toán',
    subject: 'Toán học',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/_17.11__ch_a____t__luy_n_v_act_s__3_ph_n_to_n_178261892516947648719.mp4'
  },
  {
    id: 'lms-3-khxh',
    set: 'Đề số 3',
    title: '(20.11) Chữa đề thi thử chuẩn cấu trúc số 3 phần Khoa học xã hội',
    subject: 'KH Xã Hội',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/_20.11__ch_a____t__luy_n_v_act_s__3_ph_n_khoa_h_c_x__h_i_1782618937737544272152.mp4'
  },
  {
    id: 'lms-3-hoa',
    set: 'Đề số 3',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 3 phần Hoá học',
    subject: 'Hóa học',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__3_ph_n_ho__h_c_1782618951307545526512.mp4'
  },
  {
    id: 'lms-3-sl',
    set: 'Đề số 3',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 3 phần phân tích số liệu',
    subject: 'Phân tích số liệu',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__3_ph_n_ph_n_t_ch_s__li_u_1782618965429653705956.mp4'
  },
  {
    id: 'lms-3-sinh',
    set: 'Đề số 3',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 3 phần Sinh học',
    subject: 'Sinh học',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__3_ph_n_sinh_h_c_1782618972504541967791.mp4'
  },
  {
    id: 'lms-3-anh',
    set: 'Đề số 3',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 3 phần Tiếng Anh',
    subject: 'Tiếng Anh',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__3_ph_n_ti_ng_anh_1782618983226993183597.mp4'
  },
  {
    id: 'lms-3-viet',
    set: 'Đề số 3',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 3 phần Tiếng Việt',
    subject: 'Tiếng Việt',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__3_ph_n_ti_ng_vi_t_1782618991471340625368.mp4'
  },
  {
    id: 'lms-3-logic',
    set: 'Đề số 3',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 3 phần Toán logic',
    subject: 'Toán logic',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__3_ph_n_to_n_logic_1782619001306385418147.mp4'
  },
  {
    id: 'lms-3-ly',
    set: 'Đề số 3',
    title: 'Chữa đề thi thử chuẩn cấu trúc số 3 phần Vật lý',
    subject: 'Vật lý',
    cdnUrl: 'https://voh.empire.edu.vn/bucket-empireehanoi/resource/20260628/resources/video/ch_a____t__luy_n_v_act_s__3_ph_n_v_t_l__1782619011708892697843.mp4'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// 4. ĐỀ THI THỬ ĐGNL V-ACT TƯƠNG TÁC (LÀM BÀI TRỰC TIẾP TRÊN WEB)
// ═══════════════════════════════════════════════════════════════════════════
export const DGNL_MOCK_EXAM_2026: Exam = {
  id: 'exam-dgnl-vact-mock-2026',
  examCode: 'VACT-2026',
  title: 'Đề Thi Thử Thực Chiến ĐGNL V-ACT (ĐHQG TP.HCM) – Đề Tinh Hoa Chọn Lọc',
  description: 'Đề thi chọn lọc 15 câu chuẩn cấu trúc 3 phần của kỳ thi Đánh giá năng lực ĐHQG TP.HCM: Sử dụng ngôn ngữ (Tiếng Việt & Tiếng Anh), Toán học - Logic - Phân tích số liệu, và Giải quyết vấn đề Khoa học. Bấm giờ 30 phút, chấm điểm tự động và có lời giải chi tiết.',
  subject: 'Toán học',
  grade: 'Đại học',
  durationMinutes: 30,
  difficulty: 'Format Chuẩn ĐGNL 2026',
  isBGDFormat: false,
  author: 'EduViet x Hệ Thống Luyện Thi ĐGNL Empire',
  attemptsCount: 12480,
  averageScore: 7.2,
  questions: [
    // ── PHẦN 1: SỬ DỤNG NGÔN NGỮ (TIẾNG VIỆT) ──
    {
      id: 9001,
      part: 'I',
      type: 'multiple_choice',
      text: '[Tiếng Việt - Câu 1] Từ nào sau đây viết ĐÚNG chính tả trong tiếng Việt hiện đại?',
      options: [
        { key: 'A', label: 'Xán lạn' },
        { key: 'B', label: 'Sáng lạng' },
        { key: 'C', label: 'Xáng lạn' },
        { key: 'D', label: 'Sán lạn' }
      ],
      correctAnswer: 'A',
      explanation: '"Xán lạn" là từ Hán-Việt (xán: rực rỡ, lạn: sáng sủa), nghĩa là tươi sáng, rực rỡ (ví dụ: tiền đồ xán lạn). Các dạng "sáng lạng" hay "xáng lạn" đều là lỗi phát âm chệch và viết sai chính tả rất phổ biến.',
      topic: 'Chính tả & Từ vựng Tiếng Việt',
      difficulty: 'Thông hiểu',
      errorCategory: 'Ngữ pháp'
    },
    {
      id: 9002,
      part: 'I',
      type: 'multiple_choice',
      text: '[Tiếng Việt - Câu 2] Trong câu: "Chiếc lá cuối cùng của O. Henry mang lại niềm hy vọng sống mãnh liệt cho Johnsy", thành phần "của O. Henry" đóng vai trò ngữ pháp gì?',
      options: [
        { key: 'A', label: 'Định ngữ cho danh từ "Chiếc lá cuối cùng"' },
        { key: 'B', label: 'Khởi ngữ của câu' },
        { key: 'C', label: 'Trạng ngữ chỉ nơi chốn' },
        { key: 'D', label: 'Bổ ngữ cho vị ngữ "mang lại"' }
      ],
      correctAnswer: 'A',
      explanation: '"Chiếc lá cuối cùng của O. Henry" là một cụm danh từ làm chủ ngữ trong câu. Trong đó, "của O. Henry" là thành phần phụ sau đóng vai trò định ngữ chỉ quan hệ sở hữu/tác giả cho danh từ trung tâm "Chiếc lá cuối cùng".',
      topic: 'Cú pháp câu Tiếng Việt',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết'
    },

    // ── PHẦN 1: SỬ DỤNG NGÔN NGỮ (TIẾNG ANH) ──
    {
      id: 9003,
      part: 'I',
      type: 'multiple_choice',
      text: '[Tiếng Anh - Câu 3] Choose the word that best fits the blank: "The committee decided to _______ the implementation of the new policy until further research was conducted."',
      options: [
        { key: 'A', label: 'postpone' },
        { key: 'B', label: 'accelerate' },
        { key: 'C', label: 'commence' },
        { key: 'D', label: 'abolish' }
      ],
      correctAnswer: 'A',
      explanation: 'Dựa vào ngữ cảnh "until further research was conducted" (cho đến khi nghiên cứu thêm được tiến hành), hành động hợp lý là "hoãn lại" (postpone). Các phương án khác: accelerate (đẩy nhanh), commence (bắt đầu), abolish (bãi bỏ).',
      topic: 'Vocabulary in Academic Context',
      difficulty: 'Thông hiểu',
      errorCategory: 'Ngữ pháp'
    },
    {
      id: 9004,
      part: 'I',
      type: 'multiple_choice',
      text: '[Tiếng Anh - Câu 4] "Hardly had the keynote speaker begun his presentation _______ the power went out unexpectedly."',
      options: [
        { key: 'A', label: 'when' },
        { key: 'B', label: 'than' },
        { key: 'C', label: 'then' },
        { key: 'D', label: 'that' }
      ],
      correctAnswer: 'A',
      explanation: 'Cấu trúc đảo ngữ chỉ hành động vừa mới xảy ra thì hành động khác xen vào: "Hardly / Scarcely + had + S + VpII + WHEN + S + Ved". Cần phân biệt với cấu trúc "No sooner + had + S + VpII + THAN + S + Ved". Do đó chọn WHEN.',
      topic: 'Inversion & Conjunctions',
      difficulty: 'Thông hiểu',
      errorCategory: 'Ngữ pháp'
    },

    // ── PHẦN 2: TOÁN HỌC & TƯ DUY ĐỊNH LƯỢNG ──
    {
      id: 9005,
      part: 'I',
      type: 'multiple_choice',
      text: '[Toán học - Câu 5] Cho hàm số y = (2x - 1) / (x + 1). Giao điểm của hai đường tiệm cận của đồ thị hàm số là điểm nào sau đây?',
      options: [
        { key: 'A', label: 'I(-1; 2)' },
        { key: 'B', label: 'I(1; 2)' },
        { key: 'C', label: 'I(-1; -1)' },
        { key: 'D', label: 'I(2; -1)' }
      ],
      correctAnswer: 'A',
      explanation: 'Đường tiệm cận đứng là nghiệm của mẫu số: x = -1. Đường tiệm cận ngang là y = 2/1 = 2. Giao điểm của hai đường tiệm cận là tâm đối xứng I(-1; 2).',
      topic: 'Tiệm cận đồ thị hàm số',
      difficulty: 'Nhận biết',
      errorCategory: 'Tính toán'
    },
    {
      id: 9006,
      part: 'I',
      type: 'multiple_choice',
      text: '[Toán học - Câu 6] Một lớp có 20 nam và 15 nữ. Chọn ngẫu nhiên 3 học sinh đi dự đại hội Đoàn trường. Xác suất để chọn được ít nhất 1 học sinh nữ bằng:',
      options: [
        { key: 'A', label: '115 / 136' },
        { key: 'B', label: '21 / 136' },
        { key: 'C', label: '57 / 70' },
        { key: 'D', label: '3 / 7' }
      ],
      correctAnswer: 'A',
      explanation: 'Số phần tử không gian mẫu: n(Ω) = C(35, 3) = 6545. Biến cố đối Ā: "chọn cả 3 học sinh nam": n(Ā) = C(20, 3) = 1140. Xác suất P(A) = 1 - n(Ā)/n(Ω) = 1 - 1140/6545 = 1 - 228/1309 = 1 - 21/136 = 115/136.',
      topic: 'Xác suất biến cố đối',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán'
    },

    // ── PHẦN 2: TƯ DUY LOGIC ──
    {
      id: 9007,
      part: 'I',
      type: 'multiple_choice',
      text: '[Logic - Câu 7] Trong một cuộc thi chạy, có 4 vận động viên A, B, C, D về đích ở 4 vị trí khác nhau. Biết rằng: \n- B về đích trước C.\n- A không về đích đầu tiên và cũng không về đích cuối cùng.\n- D về đích ngay sau B.\nHỏi ai là người về đích đầu tiên?',
      options: [
        { key: 'A', label: 'B' },
        { key: 'B', label: 'A' },
        { key: 'C', label: 'C' },
        { key: 'D', label: 'D' }
      ],
      correctAnswer: 'A',
      explanation: 'Phân tích: D về ngay sau B => cặp (B, D) đi liền nhau theo thứ tự. A không về nhất và không về bét => A ở vị trí 2 hoặc 3. B về trước C. Nếu D về sau B, và A ở giữa thì thứ tự hợp lý duy nhất là B (hạng 1) -> D (hạng 2) -> A (hạng 3) -> C (hạng 4) hoặc B (hạng 1) -> A (hạng 2) -> D (hạng 3) -> C (hạng 4 - trái với D ngay sau B). Vậy thứ tự duy nhất thỏa mãn là B -> D -> A -> C. Người về nhất là B.',
      topic: 'Suy luận thứ tự logic',
      difficulty: 'Vận dụng',
      errorCategory: 'Phương pháp'
    },
    {
      id: 9008,
      part: 'I',
      type: 'multiple_choice',
      text: '[Logic - Câu 8] Mệnh đề nào sau đây là phủ định logic của mệnh đề: "Mọi học sinh trong lớp 12A đều thi đỗ đại học"?',
      options: [
        { key: 'A', label: 'Có ít nhất một học sinh trong lớp 12A không thi đỗ đại học.' },
        { key: 'B', label: 'Tất cả học sinh trong lớp 12A đều không thi đỗ đại học.' },
        { key: 'C', label: 'Không có học sinh nào trong lớp 12A thi đỗ đại học.' },
        { key: 'D', label: 'Đa số học sinh trong lớp 12A thi trượt đại học.' }
      ],
      correctAnswer: 'A',
      explanation: 'Phủ định của mệnh đề lượng từ với "Mọi (∀x ∈ X, P(x))" là "Tồn tại ít nhất một phần tử không thỏa mãn (∃x ∈ X, ¬P(x))". Do đó phủ định của "mọi học sinh đều đỗ" là "có ít nhất một học sinh không đỗ".',
      topic: 'Logic mệnh đề & Lượng từ',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết'
    },

    // ── PHẦN 2: PHÂN TÍCH SỐ LIỆU ──
    {
      id: 9009,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phân tích số liệu - Câu 9] Doanh thu năm 2024 của một công ty là 120 tỷ đồng. Sang năm 2025, doanh thu tăng trưởng 25%. Kế hoạch năm 2026 doanh thu sẽ tăng tiếp 20% so với năm 2025. Doanh thu dự kiến năm 2026 của công ty bằng:',
      options: [
        { key: 'A', label: '180 tỷ đồng' },
        { key: 'B', label: '174 tỷ đồng' },
        { key: 'C', label: '168 tỷ đồng' },
        { key: 'D', label: '160 tỷ đồng' }
      ],
      correctAnswer: 'A',
      explanation: 'Doanh thu năm 2025 = 120 × (1 + 0.25) = 150 tỷ đồng. Doanh thu dự kiến năm 2026 = 150 × (1 + 0.20) = 180 tỷ đồng.',
      topic: 'Tăng trưởng phần trăm kép',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán'
    },
    {
      id: 9010,
      part: 'I',
      type: 'multiple_choice',
      text: '[Phân tích số liệu - Câu 10] Trong một cuộc khảo sát 200 học sinh về môn thể thao yêu thích: 110 bạn thích bóng đá, 80 bạn thích bóng rổ, và 30 bạn thích cả hai môn. Số học sinh KHÔNG thích môn nào trong hai môn này là:',
      options: [
        { key: 'A', label: '40 học sinh' },
        { key: 'B', label: '30 học sinh' },
        { key: 'C', label: '50 học sinh' },
        { key: 'D', label: '20 học sinh' }
      ],
      correctAnswer: 'A',
      explanation: 'Áp dụng công thức cộng sơ đồ Venn: Số bạn thích ít nhất 1 môn = N(Bóng đá) + N(Bóng rổ) - N(Cả hai) = 110 + 80 - 30 = 160 bạn. Vậy số bạn không thích môn nào = 200 - 160 = 40 bạn.',
      topic: 'Biểu đồ Ven & Thống kê tập hợp',
      difficulty: 'Thông hiểu',
      errorCategory: 'Phương pháp'
    },

    // ── PHẦN 3: GIẢI QUYẾT VẤN ĐỀ (KHOA HỌC TỰ NHIÊN) ──
    {
      id: 9011,
      part: 'I',
      type: 'multiple_choice',
      text: '[Vật lý - Câu 11] Một vật dao động điều hòa với phương trình x = 6cos(4πt - π/3) (cm). Gia tốc cực đại của vật có độ lớn bằng:',
      options: [
        { key: 'A', label: '96π² cm/s²' },
        { key: 'B', label: '24π cm/s²' },
        { key: 'C', label: '144π² cm/s²' },
        { key: 'D', label: '36π cm/s²' }
      ],
      correctAnswer: 'A',
      explanation: 'Biên độ A = 6 cm, tần số góc ω = 4π rad/s. Gia tốc cực đại có độ lớn: a_max = ω²A = (4π)² × 6 = 16π² × 6 = 96π² cm/s².',
      topic: 'Dao động điều hòa',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán'
    },
    {
      id: 9012,
      part: 'I',
      type: 'multiple_choice',
      text: '[Hóa học - Câu 12] Trong công nghiệp, kim loại nhôm (Al) được sản xuất chủ yếu bằng phương pháp nào sau đây?',
      options: [
        { key: 'A', label: 'Điện phân nóng chảy quặng Al2O3 có hòa tan criolit (Na3AlF6)' },
        { key: 'B', label: 'Nhiệt luyện dùng CO khử Al2O3 ở nhiệt độ cao' },
        { key: 'C', label: 'Thủy luyện dùng bột kẽm đẩy ion Al³⁺ ra khỏi dung dịch muối' },
        { key: 'D', label: 'Điện phân dung dịch AlCl3 trong nước với điện cực trơ' }
      ],
      correctAnswer: 'A',
      explanation: 'Nhôm là kim loại có tính khử mạnh (đứng trước Zn trong dãy hoạt động hóa học), do đó chỉ có thể điều chế bằng phương pháp điện phân nóng chảy Al2O3. Criolit (Na3AlF6) được thêm vào để hạ nhiệt độ nóng chảy từ 2050°C xuống khoảng 900°C và tăng độ dẫn điện.',
      topic: 'Sản xuất nhôm & Điện phân nóng chảy',
      difficulty: 'Nhận biết',
      errorCategory: 'Lý thuyết'
    },
    {
      id: 9013,
      part: 'I',
      type: 'multiple_choice',
      text: '[Sinh học - Câu 13] Một phân tử ADN mạch kép có 3000 nuclêôtit, trong đó số nuclêôtit loại A chiếm 20% tổng số nuclêôtit. Số liên kết hiđrô của phân tử ADN này bằng:',
      options: [
        { key: 'A', label: '3900' },
        { key: 'B', label: '3600' },
        { key: 'C', label: '4200' },
        { key: 'D', label: '3000' }
      ],
      correctAnswer: 'A',
      explanation: 'Tổng số nu N = 3000. Ta có: A = T = 20% × 3000 = 600 nu. Do A + G = 50% => G = X = 30% × 3000 = 900 nu. Số liên kết hiđrô H = 2A + 3G = 2 × 600 + 3 × 900 = 1200 + 2700 = 3900 liên kết.',
      topic: 'Cấu trúc ADN & Liên kết hiđrô',
      difficulty: 'Thông hiểu',
      errorCategory: 'Tính toán'
    },

    // ── PHẦN 3: GIẢI QUYẾT VẤN ĐỀ (KHOA HỌC XÃ HỘI) ──
    {
      id: 9014,
      part: 'I',
      type: 'multiple_choice',
      text: '[Lịch sử - Câu 14] Sự kiện lịch sử nào đánh dấu bước ngoặt căn bản trong đường lối cứu nước của Nguyễn Ái Quốc từ chủ nghĩa yêu nước đến chủ nghĩa Mác - Lênin?',
      options: [
        { key: 'A', label: 'Đọc Sơ thảo Luận cương của Lênin về vấn đề dân tộc và thuộc địa (7/1920)' },
        { key: 'B', label: 'Gửi Bản Yêu sách của nhân dân An Nam tới Hội nghị Véc-xai (1919)' },
        { key: 'C', label: 'Thành lập Hội Việt Nam Cách mạng Thanh niên tại Quảng Châu (1925)' },
        { key: 'D', label: 'Chủ trì Hội nghị thành lập Đảng Cộng sản Việt Nam (1930)' }
      ],
      correctAnswer: 'A',
      explanation: 'Tháng 7/1920, khi đọc bản Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và thuộc địa của Lênin, Nguyễn Ái Quốc đã tìm ra con đường cứu nước đúng đắn cho dân tộc: con đường cách mạng vô sản. Đây là bước ngoặt quyết định.',
      topic: 'Lịch sử Việt Nam cận hiện đại',
      difficulty: 'Thông hiểu',
      errorCategory: 'Lý thuyết'
    },
    {
      id: 9015,
      part: 'I',
      type: 'multiple_choice',
      text: '[Địa lý - Câu 15] Nguyên nhân chủ yếu làm cho khí hậu phần lãnh thổ phía Bắc nước ta (từ dãy Bạch Mã trở ra) có một mùa đông lạnh là do:',
      options: [
        { key: 'A', label: 'Tác động của gió mùa Đông Bắc kết hợp với địa hình hướng cánh cung mở rộng về phía bắc' },
        { key: 'B', label: 'Nằm gần chí tuyến Bắc và chịu ảnh hưởng trực tiếp của bão nhiệt đới' },
        { key: 'C', label: 'Địa hình vùng núi cao trên 2000m chiếm ưu thế diện tích' },
        { key: 'D', label: 'Tác động của gió mùa Tây Nam và dải hội tụ nhiệt đới' }
      ],
      correctAnswer: 'A',
      explanation: 'Mùa đông lạnh ở miền Bắc do gió mùa Đông Bắc thổi từ áp cao Xibia qua lục địa Trung Hoa tràn vào nước ta, kết hợp với các cánh cung núi ở vùng Đông Bắc mở rộng hình nan quạt đón gió, hút gió mùa lạnh sâu vào đất liền.',
      topic: 'Khí hậu nhiệt đới ẩm gió mùa',
      difficulty: 'Vận dụng',
      errorCategory: 'Lý thuyết'
    }
  ]
};
