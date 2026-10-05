import { Exam } from '../types';

/**
 * NGÂN HÀNG ĐỀ THI CHUẨN BỘ GIÁO DỤC 2025 BỔ SUNG:
 * Sinh học, Lịch sử, Địa lí, Giáo dục Kinh tế và Pháp luật (GDKT & PL), Tin học
 * Định dạng 3 phần: Phần I (18 câu TN), Phần II (4 câu Đúng/Sai), Phần III (6 câu Trả lời ngắn)
 */

// ============================================================================
// 1. ĐỀ THI MÔN SINH HỌC (28 CÂU CHUẨN BGD 2025)
// ============================================================================
export const BGD_EXAM_SINH: Exam = {
  id: 'exam-sinh-bgd-2025',
  examCode: 'MÃ-501',
  title: 'Đề Thi Thử Tốt Nghiệp THPT 2025 – Môn Sinh Học (Format Chuẩn Bộ GD&ĐT)',
  description: 'Đề thi bám sát ma trận mới: Di truyền học phân tử, Quy luật di truyền, Tiến hóa và Sinh thái học.',
  subject: 'Sinh học',
  grade: 'Lớp 12',
  durationMinutes: 50,
  difficulty: 'Format Chuẩn BGD 2025',
  isBGDFormat: true,
  author: 'Hội Đồng Khảo Thí Quốc Gia – EduViet',
  attemptsCount: 2840,
  averageScore: 7.2,
  questions: [
    {
      id: 5001, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 1] Trong quá trình nhân đôi ADN ở sinh vật nhân sơ, enzim nào có chức năng tháo xoắn phân tử ADN?',
      options: [
        { key: 'A', label: 'Enzim tháo xoắn (Helicase)' },
        { key: 'B', label: 'ADN pôlimeraza' },
        { key: 'C', label: 'ARN pôlimeraza' },
        { key: 'D', label: 'Ligaza' }
      ],
      correctAnswer: 'A',
      explanation: 'Enzim helicase có chức năng bẻ gãy các liên kết hydro giữa hai mạch đơn của phân tử ADN để tạo chạc sao chép chữ Y.',
      topic: 'Nhân đôi ADN', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 5002, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 2] Một phân tử mARN có 1500 nucleotit. Chiều dài của gen phiên mã ra phân tử mARN này là:',
      options: [
        { key: 'A', label: '5100 Å' },
        { key: 'B', label: '2550 Å' },
        { key: 'C', label: '1500 Å' },
        { key: 'D', label: '10200 Å' }
      ],
      correctAnswer: 'A',
      explanation: 'Gen có số nucleotit một mạch bằng số nucleotit của mARN = 1500 nu. Chiều dài L = 1500 × 3.4 Å = 5100 Å.',
      topic: 'Cấu trúc gen', difficulty: 'Thông hiểu', errorCategory: 'Tính toán'
    },
    {
      id: 5003, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 3] Bộ ba nào sau đây quy định tín hiệu mở đầu dịch mã và mã hóa axit amin Metionin ở sinh vật nhân thực?',
      options: [
        { key: 'A', label: '5\'AUG3\'' },
        { key: 'B', label: '5\'UAA3\'' },
        { key: 'C', label: '5\'UAG3\'' },
        { key: 'D', label: '5\'UGA3\'' }
      ],
      correctAnswer: 'A',
      explanation: 'Bộ ba 5\'AUG3\' là codon mở đầu trên mARN, quy định Metionin ở nhân thực (hoặc Formyl-metionin ở nhân sơ).',
      topic: 'Mã di truyền', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 5004, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 4] Cơ thể có kiểu gen AaBbDd khi giảm phân bình thường tạo ra tối đa bao nhiêu loại giao tử?',
      options: [
        { key: 'A', label: '8 loại' },
        { key: 'B', label: '6 loại' },
        { key: 'C', label: '4 loại' },
        { key: 'D', label: '16 loại' }
      ],
      correctAnswer: 'A',
      explanation: 'Số cặp gen dị hợp n = 3 (Aa, Bb, Dd). Số loại giao tử tạo ra = 2³ = 8 loại.',
      topic: 'Quy luật Menđen', difficulty: 'Thông hiểu', errorCategory: 'Tính toán'
    },
    {
      id: 5005, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 5] Hiện tượng các gen cùng nằm trên một nhiễm sắc thể di truyền cùng nhau được gọi là:',
      options: [
        { key: 'A', label: 'Liên kết gen hoàn toàn' },
        { key: 'B', label: 'Phân li độc lập' },
        { key: 'C', label: 'Tương tác gen' },
        { key: 'D', label: 'Tác động cộng gộp' }
      ],
      correctAnswer: 'A',
      explanation: 'Hiện tượng các gen nằm trên một NST cùng phân li về một giao tử trong quá trình giảm phân gọi là liên kết gen.',
      topic: 'Liên kết gen', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 5006, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 6] Theo thuyết tiến hóa hiện đại, nhân tố tiến hóa nào sau đây định hướng chiều hướng tiến hóa?',
      options: [
        { key: 'A', label: 'Chọn lọc tự nhiên' },
        { key: 'B', label: 'Đột biến' },
        { key: 'C', label: 'Giao phối không ngẫu nhiên' },
        { key: 'D', label: 'Yếu tố ngẫu nhiên' }
      ],
      correctAnswer: 'A',
      explanation: 'Chọn lọc tự nhiên là nhân tố tiến hóa duy nhất quy định chiều hướng và nhịp điệu biến đổi tần số alen và thành phần kiểu gen.',
      topic: 'Thuyết tiến hóa', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 5007, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 7] Tập hợp các cá thể cùng loài, cùng sống trong một khoảng không gian xác định vào thời điểm nhất định là:',
      options: [
        { key: 'A', label: 'Quần thể sinh vật' },
        { key: 'B', label: 'Quần xã sinh vật' },
        { key: 'C', label: 'Hệ sinh thái' },
        { key: 'D', label: 'Sinh quyển' }
      ],
      correctAnswer: 'A',
      explanation: 'Quần thể sinh vật là tập hợp các cá thể cùng loài, cùng sinh sống trong một sinh cảnh, có khả năng giao phối sinh ra đời con hữu thụ.',
      topic: 'Sinh thái học', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 5008, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 8] Trong chu trình tuần hoàn nitơ, nhóm vi sinh vật nào có khả năng cố định nitơ khí quyển (N₂) thành amoni (NH₄⁺)?',
      options: [
        { key: 'A', label: 'Vi khuẩn cố định nitơ tự do và nốt sần (Rhizobium)' },
        { key: 'B', label: 'Vi khuẩn phản nitrat hóa' },
        { key: 'C', label: 'Vi khuẩn nitrat hóa' },
        { key: 'D', label: 'Nấm hoại sinh' }
      ],
      correctAnswer: 'A',
      explanation: 'Vi khuẩn Rhizobium (cộng sinh nốt sần cây họ Đậu) và vi khuẩn Anabaena có enzim nitrogenaza để bẻ gãy liên kết ba N≡N.',
      topic: 'Chu trình sinh địa hóa', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết'
    },
    {
      id: 5009, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 9] Ở một loài thực vật, alen A quy định hoa đỏ trội hoàn toàn so với alen a quy định hoa trắng. Cho cây hoa đỏ dị hợp Aa tự thụ phấn, tỉ lệ kiểu hình ở đời con F₁ là:',
      options: [
        { key: 'A', label: '3 hoa đỏ : 1 hoa trắng' },
        { key: 'B', label: '1 hoa đỏ : 1 hoa trắng' },
        { key: 'C', label: '100% hoa đỏ' },
        { key: 'D', label: '1 hoa đỏ : 2 hoa hồng : 1 hoa trắng' }
      ],
      correctAnswer: 'A',
      explanation: 'Aa × Aa → 1 AA : 2 Aa : 1 aa → Kiểu hình: 3 hoa đỏ (AA, Aa) : 1 hoa trắng (aa).',
      topic: 'Quy luật Menđen', difficulty: 'Thông hiểu', errorCategory: 'Tính toán'
    },
    {
      id: 5010, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 10] Bệnh mù màu ở người do gen lặn nằm trên vùng không tương đồng của nhiễm sắc thể giới tính X quy định. Bố bình thường (XᴬY), mẹ mang gen dị hợp (XᴬXᵃ), xác suất sinh con trai đầu lòng bị bệnh mù màu là:',
      options: [
        { key: 'A', label: '25%' },
        { key: 'B', label: '50%' },
        { key: 'C', label: '12.5%' },
        { key: 'D', label: '0%' }
      ],
      correctAnswer: 'A',
      explanation: 'XᴬY × XᴬXᵃ → Giao tử: (1/2 Xᴬ, 1/2 Y) × (1/2 Xᴬ, 1/2 Xᵃ). Con trai bị bệnh (XᵃY) = 1/2 (Y) × 1/2 (Xᵃ) = 1/4 = 25%.',
      topic: 'Di truyền liên kết giới tính', difficulty: 'Vận dụng', errorCategory: 'Tính toán'
    },
    {
      id: 5011, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 11] Một quần thể thực vật giao phấn ngẫu nhiên có tần số alen A = 0.6, a = 0.4. Khi đạt trạng thái cân bằng di truyền Hardy-Weinberg, tỉ lệ kiểu gen dị hợp Aa là:',
      options: [
        { key: 'A', label: '0.48' },
        { key: 'B', label: '0.36' },
        { key: 'C', label: '0.16' },
        { key: 'D', label: '0.24' }
      ],
      correctAnswer: 'A',
      explanation: 'Tỉ lệ kiểu gen dị hợp = 2pq = 2 × 0.6 × 0.4 = 0.48.',
      topic: 'Di truyền quần thể', difficulty: 'Thông hiểu', errorCategory: 'Tính toán'
    },
    {
      id: 5012, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 12] Loại đột biến cấu trúc nhiễm sắc thể nào sau đây làm tăng cường hoặc giảm bớt mức biểu hiện của tính trạng?',
      options: [
        { key: 'A', label: 'Đột biến lặp đoạn' },
        { key: 'B', label: 'Đột biến đảo đoạn' },
        { key: 'C', label: 'Đột biến chuyển đoạn tương hỗ' },
        { key: 'D', label: 'Đột biến mất đoạn nhỏ' }
      ],
      correctAnswer: 'A',
      explanation: 'Đột biến lặp đoạn làm tăng số lượng bản sao của gen trên NST, từ đó có thể làm tăng hoặc giảm cường độ biểu hiện tính trạng (ví dụ: mắt lồi thành mắt dẹt ở ruồi giấm).',
      topic: 'Đột biến NST', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết'
    },
    {
      id: 5013, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 13] Trong một chuỗi thức ăn trên cạn: Cỏ → Châu chấu → Ếch → Rắn → Diều hâu. Bậc dinh dưỡng cấp 3 trong chuỗi thức ăn này là:',
      options: [
        { key: 'A', label: 'Ếch' },
        { key: 'B', label: 'Châu chấu' },
        { key: 'C', label: 'Rắn' },
        { key: 'D', label: 'Cỏ' }
      ],
      correctAnswer: 'A',
      explanation: 'Cỏ (Bậc 1) → Châu chấu (Bậc 2) → Ếch (Bậc dinh dưỡng cấp 3) → Rắn (Bậc 4) → Diều hâu (Bậc 5).',
      topic: 'Chuỗi thức ăn', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 5014, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 14] Động vật nào sau đây có hệ tuần hoàn kép và tim có 4 ngăn hoàn chỉnh?',
      options: [
        { key: 'A', label: 'Chim bồ câu và Thỏ' },
        { key: 'B', label: 'Ếch đồng và Thằn lằn' },
        { key: 'C', label: 'Cá chép và Tôm' },
        { key: 'D', label: 'Châu chấu và Ốc sên' }
      ],
      correctAnswer: 'A',
      explanation: 'Lớp Chim và lớp Thú có hệ tuần hoàn kép với tim 4 ngăn hoàn chỉnh, máu nuôi cơ thể là máu đỏ tươi giàu O₂.',
      topic: 'Trao đổi chất ở động vật', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 5015, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 15] Nhóm thực vật C₄ (ngô, mía, kê) có điểm ưu việt hơn thực vật C₃ ở điều kiện khí hậu nào?',
      options: [
        { key: 'A', label: 'Cường độ ánh sáng mạnh, nhiệt độ cao, nồng độ CO₂ thấp' },
        { key: 'B', label: 'Ánh sáng yếu, khí hậu ẩm ướt mát mẻ' },
        { key: 'C', label: 'Khu vực đầm lầy ngập nước' },
        { key: 'D', label: 'Khí hậu cực kỳ khô hạn sa mạc vào ban đêm' }
      ],
      correctAnswer: 'A',
      explanation: 'Thực vật C₄ có 2 loại lục lạp và chu trình C₄ cố định CO₂ hiệu quả không có hô hấp sáng, thích nghi khí hậu nhiệt đới nóng bức.',
      topic: 'Quang hợp ở thực vật', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết'
    },
    {
      id: 5016, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 16] Hoocmôn nào sau đây kích thích sự chín của quả và rụng lá ở thực vật?',
      options: [
        { key: 'A', label: 'Etilen (Ethylene)' },
        { key: 'B', label: 'Auxin' },
        { key: 'C', label: 'Giberelin' },
        { key: 'D', label: 'Xitôkinin' }
      ],
      correctAnswer: 'A',
      explanation: 'Etilen là chất khí kích thích quá trình chín của quả, thúc đẩy sự vàng lá và rụng lá.',
      topic: 'Hoocmôn thực vật', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 5017, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 17] Cho cây có kiểu gen (AB/ab) Dd giao phấn với cây (ab/ab) dd. Biết tần số hoán vị gen f = 20%. Tỉ lệ cá thể có kiểu hình mang cả 3 tính trạng trội ở đời con là:',
      options: [
        { key: 'A', label: '20%' },
        { key: 'B', label: '40%' },
        { key: 'C', label: '10%' },
        { key: 'D', label: '5%' }
      ],
      correctAnswer: 'A',
      explanation: 'Giao tử AB = (1 - f)/2 = 0.4. Dd tạo D = 0.5. Cây thứ hai tạo ab d. Đời con (A-B- D-) = 0.4 × 0.5 = 0.2 = 20%.',
      topic: 'Hoán vị gen', difficulty: 'Vận dụng cao', errorCategory: 'Tính toán'
    },
    {
      id: 5018, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 18] Phương pháp nào sau đây giúp tạo ra giống cây trồng đồng hợp tử về tất cả các cặp gen trong thời gian ngắn nhất?',
      options: [
        { key: 'A', label: 'Nuôi cấy hạt phấn đơn bội rồi đa bội hóa thành lưỡng bội' },
        { key: 'B', label: 'Tự thụ phấn qua nhiều thế hệ liên tiếp' },
        { key: 'C', label: 'Chiết cành và giâm cành vô tính' },
        { key: 'D', label: 'Nuôi cấy mô tế bào soma' }
      ],
      correctAnswer: 'A',
      explanation: 'Nuôi cấy hạt phấn (n) tạo dòng đơn bội rồi xử lý consixin lưỡng bội hóa (2n) tạo ra dòng thuần chủng tuyệt đối 100% chỉ trong 1 thế hệ.',
      topic: 'Công nghệ tế bào', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết'
    },

    // ── PHẦN II: 4 CÂU ĐÚNG / SAI ──────────────────────────────────
    {
      id: 5019, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 1] Khi nói về quá trình quang hợp ở thực vật và vai trò của các sắc tố quang hợp:',
      trueFalseItems: [
        { id: 'a', text: 'Diệp lục a trực tiếp tham gia vào quá trình chuyển hóa quang năng thành hóa năng.', correctAnswer: true },
        { id: 'b', text: 'Carôtenôit hấp thụ ánh sáng ở vùng bước sóng xanh lục và đỏ.', correctAnswer: false },
        { id: 'c', text: 'Pha sáng của quang hợp diễn ra tại tilacôit của lục lạp.', correctAnswer: true },
        { id: 'd', text: 'Oxi giải phóng trong quang hợp có nguồn gốc từ sự phân ly phân tử CO₂.', correctAnswer: false }
      ],
      explanation: 'O₂ giải phóng bắt nguồn từ quang phân ly nước trong pha sáng, không phải từ CO₂.',
      topic: 'Quang hợp', difficulty: 'Thông hiểu'
    },
    {
      id: 5020, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 2] Cho phả hệ nghiên cứu một bệnh di truyền hiếm gặp do một gen có 2 alen quy định trong một gia đình:',
      trueFalseItems: [
        { id: 'a', text: 'Bố mẹ bình thường sinh con bị bệnh chứng tỏ gen gây bệnh là gen lặn.', correctAnswer: true },
        { id: 'b', text: 'Nếu con gái bị bệnh mà bố bình thường thì gen gây bệnh chắc chắn nằm trên NST thường.', correctAnswer: true },
        { id: 'c', text: 'Bệnh di truyền do gen lặn trên NST X biểu hiện đều ở cả nam và nữ.', correctAnswer: false },
        { id: 'd', text: 'Người mang gen dị hợp chắc chắn sẽ biểu hiện bệnh ra kiểu hình.', correctAnswer: false }
      ],
      explanation: 'Bệnh lặn trên NST X biểu hiện ở nam giới nhiều hơn do nam chỉ có 1 NST X.',
      topic: 'Di truyền học người', difficulty: 'Vận dụng'
    },
    {
      id: 5021, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 3] Khi nghiên cứu về cấu trúc của hệ sinh thái và dòng năng lượng:',
      trueFalseItems: [
        { id: 'a', text: 'Năng lượng đi vào hệ sinh thái chủ yếu qua quang hợp của sinh vật sản xuất.', correctAnswer: true },
        { id: 'b', text: 'Năng lượng được truyền một chiều qua các bậc dinh dưỡng và không được tái sử dụng.', correctAnswer: true },
        { id: 'c', text: 'Hiệu suất sinh thái giữa hai bậc dinh dưỡng liền kề thường đạt khoảng 70% - 80%.', correctAnswer: false },
        { id: 'd', text: 'Vật chất trong hệ sinh thái được tuần hoàn khép kín qua các chu trình sinh địa hóa.', correctAnswer: true }
      ],
      explanation: 'Hiệu suất sinh thái giữa 2 bậc dinh dưỡng chỉ đạt khoảng 10%, 90% còn lại bị thất thoát qua hô hấp và bài tiết.',
      topic: 'Hệ sinh thái', difficulty: 'Thông hiểu'
    },
    {
      id: 5022, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 4] Về cơ chế điều hòa biểu hiện gen ở operon Lac của vi khuẩn E. coli:',
      trueFalseItems: [
        { id: 'a', text: 'Gen điều hòa (R) không nằm trong cấu trúc của operon Lac.', correctAnswer: true },
        { id: 'b', text: 'Khi môi trường có lactôzơ, prôtêin ức chế gắn vào vùng vận hành (O) ngăn cản phiên mã.', correctAnswer: false },
        { id: 'c', text: 'Vùng khởi động (P) là nơi ARN pôlimeraza bám vào để khởi đầu phiên mã.', correctAnswer: true },
        { id: 'd', text: 'Các gen cấu trúc Z, Y, A được phiên mã tạo ra 3 phân tử mARN hoàn toàn riêng biệt.', correctAnswer: false }
      ],
      explanation: 'Các gen Z, Y, A được phiên mã chung tạo thành một phân tử mARN đa cistron duy nhất.',
      topic: 'Điều hòa hoạt động gen', difficulty: 'Vận dụng'
    },

    // ── PHẦN III: 6 CÂU TRẢ LỜI NGẮN ──────────────────────────────
    {
      id: 5023, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 1] Một gen dài 4080 Å có tỉ lệ A/G = 2/3. Số liên kết hiđrô của gen này là bao nhiêu?',
      shortAnswerCorrect: '3120',
      topic: 'Cấu trúc ADN', difficulty: 'Thông hiểu',
      explanation: 'Tổng số nu N = 2 × 4080 / 3.4 = 2400. Ta có 2A + 2G = 2400 và A/G = 2/3 → A = T = 480, G = X = 720. Số liên kết hydro H = 2A + 3G = 2×480 + 3×720 = 3120.'
    },
    {
      id: 5024, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 2] Một tế bào sinh tinh có kiểu gen Aa Bb giảm phân tạo giao tử. Số loại tinh trùng tối đa tạo ra từ 1 tế bào này là bao nhiêu?',
      shortAnswerCorrect: '2',
      topic: 'Giảm phân', difficulty: 'Thông hiểu',
      explanation: 'Một tế bào sinh tinh khi giảm phân chỉ tạo ra 4 tinh trùng thuộc đúng 2 loại giao tử (ví dụ: 2 AB và 2 ab).'
    },
    {
      id: 5025, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 3] Một quần thể có cấu trúc di truyền: 0.36 AA : 0.48 Aa : 0.16 aa. Tần số tương đối của alen A trong quần thể là bao nhiêu? (Điền số thập phân)',
      shortAnswerCorrect: '0.6',
      topic: 'Di truyền quần thể', difficulty: 'Nhận biết',
      explanation: 'p(A) = 0.36 + 0.48/2 = 0.6.'
    },
    {
      id: 5026, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 4] Ở một loài ruồi giấm có bộ NST lưỡng bội 2n = 8. Một thể ba nhiễm (2n + 1) của loài này có số lượng nhiễm sắc thể là bao nhiêu?',
      shortAnswerCorrect: '9',
      topic: 'Đột biến số lượng NST', difficulty: 'Nhận biết',
      explanation: 'Thể ba nhiễm có dạng 2n + 1 = 8 + 1 = 9 nhiễm sắc thể.'
    },
    {
      id: 5027, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 5] Cho phép lai P: AaBb × Aabb. Tỉ lệ cá thể có kiểu gen đồng hợp lặn aabb ở đời con F₁ là bao nhiêu %?',
      shortAnswerCorrect: '12.5',
      topic: 'Quy luật di truyền', difficulty: 'Vận dụng',
      explanation: 'Aa × Aa → 1/4 aa. Bb × bb → 1/2 bb. Tỉ lệ aabb = 1/4 × 1/2 = 1/8 = 12.5%.'
    },
    {
      id: 5028, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 6] Trong một chuỗi thức ăn, năng lượng ở bậc dinh dưỡng cấp 1 là 2.000.000 kcal, bậc dinh dưỡng cấp 2 tích lũy được 200.000 kcal. Hiệu suất sinh thái giữa hai bậc này là bao nhiêu %?',
      shortAnswerCorrect: '10',
      topic: 'Sinh thái học', difficulty: 'Thông hiểu',
      explanation: 'Hiệu suất sinh thái = (200.000 / 2.000.000) × 100% = 10%.'
    }
  ]
};

// ============================================================================
// 2. ĐỀ THI MÔN LỊCH SỬ (28 CÂU CHUẨN BGD 2025)
// ============================================================================
export const BGD_EXAM_SU: Exam = {
  id: 'exam-su-bgd-2025',
  examCode: 'MÃ-601',
  title: 'Đề Thi Thử Tốt Nghiệp THPT 2025 – Môn Lịch Sử (Format Chuẩn Bộ GD&ĐT)',
  description: 'Đề thi chuẩn hóa lịch sử Việt Nam cận - hiện đại (1919-2000) và lịch sử thế giới.',
  subject: 'Lịch sử',
  grade: 'Lớp 12',
  durationMinutes: 50,
  difficulty: 'Format Chuẩn BGD 2025',
  isBGDFormat: true,
  author: 'Hội Đồng Khảo Thí Quốc Gia – EduViet',
  attemptsCount: 3120,
  averageScore: 7.0,
  questions: [
    {
      id: 6001, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 1] Sự kiện lịch sử nào đánh dấu bước ngoặt quyết định trong cuộc đời hoạt động cách mạng của Nguyễn Ái Quốc từ chủ nghĩa yêu nước đến chủ nghĩa cộng sản?',
      options: [
        { key: 'A', label: 'Bỏ phiếu tán thành gia nhập Quốc tế thứ ba và tham gia sáng lập Đảng Cộng sản Pháp (12/1920)' },
        { key: 'B', label: 'Gửi Bản Yêu sách của nhân dân An Nam tới Hội nghị Véc-xai (1919)' },
        { key: 'C', label: 'Đọc Sơ thảo lần thứ nhất Luận cương về vấn đề dân tộc và thuộc địa của Lênin (7/1920)' },
        { key: 'D', label: 'Thành lập Hội Việt Nam Cách mạng Thanh niên tại Quảng Châu (1925)' }
      ],
      correctAnswer: 'A',
      explanation: 'Tháng 12/1920, tại Đại hội Tua, Nguyễn Ái Quốc bỏ phiếu gia nhập Quốc tế Cộng sản và tham gia sáng lập Đảng Cộng sản Pháp, đánh dấu bước ngoặt từ một người yêu nước trở thành chiến sĩ cộng sản.',
      topic: 'Nguyễn Ái Quốc', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 6002, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 2] Hội nghị lần thứ 8 Ban Chấp hành Trung ương Đảng Cộng sản Đông Dương (5/1941) chủ trương đặt nhiệm vụ nào lên hàng đầu?',
      options: [
        { key: 'A', label: 'Giải phóng dân tộc' },
        { key: 'B', label: 'Cách mạng ruộng đất' },
        { key: 'C', label: 'Đấu tranh đòi tự do dân chủ' },
        { key: 'D', label: 'Xây dựng nhà nước Xô viết' }
      ],
      correctAnswer: 'A',
      explanation: 'Hội nghị TW 8 do Nguyễn Ái Quốc chủ trì (5/1941) đã hoàn chỉnh chủ trương chuyển hướng chỉ đạo chiến lược: đặt nhiệm vụ giải phóng dân tộc lên hàng trước tiên.',
      topic: 'Cách mạng Tháng Tám', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết'
    },
    {
      id: 6003, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 3] Thắng lợi quân sự nào của quân dân Việt Nam đã làm phá sản hoàn toàn Kế hoạch Nava của thực dân Pháp?',
      options: [
        { key: 'A', label: 'Chiến dịch Điện Biên Phủ (1954)' },
        { key: 'B', label: 'Chiến dịch Biên giới Thu - Đông (1950)' },
        { key: 'C', label: 'Cuộc tiến công chiến lược Đông - Xuân 1953 - 1954' },
        { key: 'D', label: 'Chiến dịch Việt Bắc Thu - Đông (1947)' }
      ],
      correctAnswer: 'A',
      explanation: 'Chiến thắng lịch sử Điện Biên Phủ "lừng lẫy năm châu, chấn động địa cầu" ngày 7/5/1954 đã đập tan tập đoàn cứ điểm mạnh nhất Đông Dương, làm phá sản hoàn toàn Kế hoạch Nava.',
      topic: 'Kháng chiến chống Pháp', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 6004, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 4] Chiến thắng nào của quân dân miền Nam đã mở ra phong trào "Tìm Mỹ mà đánh, lùng ngụy mà diệt" trên khắp chiến trường?',
      options: [
        { key: 'A', label: 'Chiến thắng Vạn Tường (Quảng Ngãi, 8/1965)' },
        { key: 'B', label: 'Chiến thắng Ấp Bắc (Mỹ Tho, 1/1963)' },
        { key: 'C', label: 'Chiến dịch Tây Nguyên (3/1975)' },
        { key: 'D', label: 'Cuộc Tổng tiến công và nổi dậy Xuân Mậu Thân (1968)' }
      ],
      correctAnswer: 'A',
      explanation: 'Chiến thắng Vạn Tường ngày 18/8/1965 chứng minh quân dân ta hoàn toàn có khả năng đánh bại quân viễn chinh Mỹ trong chiến lược "Chiến tranh cục bộ".',
      topic: 'Kháng chiến chống Mỹ', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết'
    },
    {
      id: 6005, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 5] Hiệp định Pari năm 1973 về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam buộc Hoa Kỳ phải cam kết điều gì?',
      options: [
        { key: 'A', label: 'Rút hết quân đội viễn chinh Mỹ và đồng minh về nước, tôn trọng độc lập chủ quyền của VN' },
        { key: 'B', label: 'Viện trợ kinh tế vô điều kiện cho cả hai miền Nam - Bắc' },
        { key: 'C', label: 'Công nhận vĩ tuyến 17 là biên giới quốc gia vĩnh viễn' },
        { key: 'D', label: 'Giải tán chính quyền Sài Gòn ngay lập tức' }
      ],
      correctAnswer: 'A',
      explanation: 'Hiệp định Pari (27/1/1973) buộc Mỹ phải rút hết quân, tạo thời cơ thuận lợi "đánh cho Mỹ cút" để tiến tới "đánh cho ngụy nhào".',
      topic: 'Hiệp định Pari', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết'
    },
    {
      id: 6006, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 6] Đại hội đại biểu toàn quốc lần thứ VI của Đảng Cộng sản Việt Nam (12/1986) đã đề ra đường lối mang tính bước ngoặt nào?',
      options: [
        { key: 'A', label: 'Đường lối đổi mới đất nước toàn diện' },
        { key: 'B', label: 'Đẩy mạnh công nghiệp hóa, hiện đại hóa' },
        { key: 'C', label: 'Hoàn thành cải cách ruộng đất' },
        { key: 'D', label: 'Thực hiện kế hoạch 5 năm lần thứ nhất' }
      ],
      correctAnswer: 'A',
      explanation: 'Đại hội VI (12/1986) mở ra thời kỳ đổi mới toàn diện, trước hết là đổi mới về kinh tế gắn liền với đổi mới chính trị.',
      topic: 'Thời kỳ Đổi mới', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 6007, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 7] Mục tiêu bao trùm trong chính sách đối ngoại của Mĩ sau Chiến tranh thế giới thứ hai là:',
      options: [
        { key: 'A', label: 'Thực hiện chiến lược toàn cầu nhằm mưu đồ bá chủ thế giới' },
        { key: 'B', label: 'Hợp tác hòa bình và bình đẳng với các nước xã hội chủ nghĩa' },
        { key: 'C', label: 'Ủng hộ phong trào giải phóng dân tộc trên thế giới' },
        { key: 'D', label: 'Rút lui khỏi các liên minh quân sự quốc tế' }
      ],
      correctAnswer: 'A',
      explanation: 'Dựa vào ưu thế vượt trội về kinh tế và vũ khí hạt nhân, Mỹ triển khai Chiến lược toàn cầu với tham vọng bá chủ thế giới.',
      topic: 'Lịch sử thế giới', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 6008, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 8] Cơ quan nào giữ vai trò trọng yếu trong việc duy trì hòa bình và an ninh thế giới của tổ chức Liên hợp quốc?',
      options: [
        { key: 'A', label: 'Hội đồng Bảo an' },
        { key: 'B', label: 'Đại hội đồng' },
        { key: 'C', label: 'Ban Thư ký' },
        { key: 'D', label: 'Tòa án Quốc tế' }
      ],
      correctAnswer: 'A',
      explanation: 'Hội đồng Bảo an là cơ quan chịu trách nhiệm chính về hòa bình và an ninh quốc tế với 5 nước ủy viên thường trực.',
      topic: 'Liên hợp quốc', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 6009, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 9] Năm 1960 được lịch sử ghi nhận là "Năm châu Phi" vì:',
      options: [
        { key: 'A', label: 'Có 17 quốc gia ở châu lục này tuyên bố giành được độc lập' },
        { key: 'B', label: 'Chủ nghĩa phân biệt chủng tộc Apacthai bị xóa bỏ hoàn toàn' },
        { key: 'C', label: 'Tất cả các nước châu Phi gia nhập Liên hợp quốc' },
        { key: 'D', label: 'Liên minh châu Phi (AU) được thành lập' }
      ],
      correctAnswer: 'A',
      explanation: 'Năm 1960 có 17 nước châu Phi giành được độc lập, làm rung chuyển hệ thống thuộc địa của chủ nghĩa đế quốc.',
      topic: 'Phong trào giải phóng dân tộc', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết'
    },
    {
      id: 6010, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 10] Sự kiện nào đánh dấu cuộc Chiến tranh lạnh giữa hai phe tư bản chủ nghĩa và xã hội chủ nghĩa chính thức kết thúc?',
      options: [
        { key: 'A', label: 'Cuộc gặp cấp cao tại Manta giữa M.Goocbachop và G.Busơ (12/1989)' },
        { key: 'B', label: 'Bức tường Béc-lin sụp đổ (11/1989)' },
        { key: 'C', label: 'Liên Xô tan rã (12/1991)' },
        { key: 'D', label: 'Ký định ước Hen-xin-ki (1975)' }
      ],
      correctAnswer: 'A',
      explanation: 'Tháng 12/1989, tại đảo Manta, hai nhà lãnh đạo Liên Xô và Mỹ cùng tuyên bố chấm dứt Chiến tranh lạnh.',
      topic: 'Chiến tranh lạnh', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết'
    },
    {
      id: 6011, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 11] Điểm giống nhau cơ bản giữa trật tự thế giới hai cực Ianta và trật tự Vécxai - Oasinhtơn là:',
      options: [
        { key: 'A', label: 'Đều được thiết lập sau các cuộc chiến tranh thế giới và phản ánh tương quan lực lượng giữa các cường quốc' },
        { key: 'B', label: 'Đều do các nước tư bản phương Tây hoàn toàn chi phối' },
        { key: 'C', label: 'Đều có sự tham gia của Liên Xô với vai trò trụ cột' },
        { key: 'D', label: 'Đều dẫn tới sự sụp đổ ngay tức khắc của chủ nghĩa thực dân' }
      ],
      correctAnswer: 'A',
      explanation: 'Cả hai trật tự đều ra đời sau chiến tranh thế giới, phản ánh tương quan lực lượng giữa các nước thắng trận.',
      topic: 'Quan hệ quốc tế', difficulty: 'Vận dụng', errorCategory: 'Phương pháp'
    },
    {
      id: 6012, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 12] Ý nghĩa lịch sử quan trọng nhất của phong trào cách mạng 1930 - 1931 ở Việt Nam là:',
      options: [
        { key: 'A', label: 'Là cuộc tập dượt đầu tiên chuẩn bị cho thắng lợi của Cách mạng Tháng Tám năm 1945' },
        { key: 'B', label: 'Đập tan hoàn toàn bộ máy chính quyền tay sai thực dân' },
        { key: 'C', label: 'Xóa bỏ hoàn toàn chế độ chiếm hữu ruộng đất phong kiến' },
        { key: 'D', label: 'Buộc thực dân Pháp phải công nhận độc lập của Việt Nam' }
      ],
      correctAnswer: 'A',
      explanation: 'Phong trào 1930-1931 khẳng định vai trò lãnh đạo của Đảng và là cuộc tập dượt đầu tiên cho Cách mạng Tháng Tám.',
      topic: 'Phong trào 1930-1931', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết'
    },
    {
      id: 6013, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 13] Tác phẩm "Kháng chiến nhất định thắng lợi" (1947) của đồng chí Trường Chinh đã hoàn chỉnh đường lối kháng chiến chống Pháp với các nội dung:',
      options: [
        { key: 'A', label: 'Toàn dân, toàn diện, trường kỳ, tự lực cánh sinh và tranh thủ sự ủng hộ quốc tế' },
        { key: 'B', label: 'Đánh nhanh thắng nhanh, chớp thời cơ giải phóng đô thị' },
        { key: 'C', label: 'Vừa đánh vừa đàm phán, kết hợp bao vây kinh tế' },
        { key: 'D', label: 'Tổng khởi nghĩa đồng loạt trên toàn quốc' }
      ],
      correctAnswer: 'A',
      explanation: 'Đường lối kháng chiến chống Pháp: Toàn dân, toàn diện, trường kỳ, tự lực cánh sinh và tranh thủ ủng hộ quốc tế.',
      topic: 'Đường lối kháng chiến', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết'
    },
    {
      id: 6014, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 14] Trong cuộc kháng chiến chống Mỹ (1954 - 1975), chiến lược "Chiến tranh đặc biệt" (1961 - 1965) của Mỹ được tiến hành bằng lực lượng chủ yếu nào?',
      options: [
        { key: 'A', label: 'Quân đội Sài Gòn (ngụy quân), do cố vấn quân sự Mỹ chỉ huy và trang bị vũ khí Mỹ' },
        { key: 'B', label: 'Quân viễn chinh Mỹ trực tiếp tham chiến quy mô lớn' },
        { key: 'C', label: 'Quân đội các nước đồng minh thân Mỹ ở châu Á' },
        { key: 'D', label: 'Lực lượng lính đánh thuê quốc tế' }
      ],
      correctAnswer: 'A',
      explanation: 'Chiến tranh đặc biệt dựa vào xương máu người Việt (quân đội Sài Gòn) dưới sự chỉ huy của cố vấn quân sự Mỹ.',
      topic: 'Chiến tranh đặc biệt', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 6015, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 15] Chiến dịch quân sự nào mở đầu cuộc Tổng tiến công và nổi dậy mùa Xuân năm 1975 giải phóng hoàn toàn miền Nam?',
      options: [
        { key: 'A', label: 'Chiến dịch Tây Nguyên' },
        { key: 'B', label: 'Chiến dịch Huế - Đà Nẵng' },
        { key: 'C', label: 'Chiến dịch Hồ Chí Minh' },
        { key: 'D', label: 'Chiến dịch Đường 14 - Phước Long' }
      ],
      correctAnswer: 'A',
      explanation: 'Chiến dịch Tây Nguyên (bắt đầu ngày 4/3/1975 với đòn điểm huyệt Buôn Ma Thuột) đã chuyển cuộc kháng chiến sang giai đoạn tổng tiến công chiến lược.',
      topic: 'Đại thắng mùa Xuân 1975', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết'
    },
    {
      id: 6016, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 16] Trong xu thế hòa hoãn Đông - Tây những năm 70 của thế kỷ XX, văn kiện nào đã đặt nền tảng cho sự hợp tác an ninh ở châu Âu?',
      options: [
        { key: 'A', label: 'Định ước Henxinki (1975)' },
        { key: 'B', label: 'Hiệp ước Vacxava (1955)' },
        { key: 'C', label: 'Hiệp ước Bắc Đại Tây Dương - NATO (1949)' },
        { key: 'D', label: 'Hiệp ước Maxtrich (1991)' }
      ],
      correctAnswer: 'A',
      explanation: 'Định ước Henxinki (1975) giữa 33 nước châu Âu cùng Mỹ và Canada tạo ra cơ chế giải quyết hòa bình các tranh chấp.',
      topic: 'Quan hệ quốc tế', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết'
    },
    {
      id: 6017, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 17] Nguyên nhân quyết định nhất dẫn đến thắng lợi của cuộc kháng chiến chống Mỹ, cứu nước (1954 - 1975) của nhân dân Việt Nam là:',
      options: [
        { key: 'A', label: 'Sự lãnh đạo đúng đắn, sáng tạo của Đảng Cộng sản Việt Nam' },
        { key: 'B', label: 'Sự giúp đỡ to lớn của Liên Xô, Trung Quốc và các nước XHCN' },
        { key: 'C', label: 'Nhân dân Mỹ và nhân loại tiến bộ phản đối chiến tranh' },
        { key: 'D', label: 'Địa hình hiểm trở và hệ thống hầm hào bí mật' }
      ],
      correctAnswer: 'A',
      explanation: 'Sự lãnh đạo của Đảng là nhân tố quyết định hàng đầu mọi thắng lợi của cách mạng Việt Nam.',
      topic: 'Bài học lịch sử', difficulty: 'Vận dụng', errorCategory: 'Lý thuyết'
    },
    {
      id: 6018, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 18] Xu thế toàn cầu hóa hiện nay là hệ quả trực tiếp của:',
      options: [
        { key: 'A', label: 'Cuộc cách mạng khoa học - công nghệ hiện đại' },
        { key: 'B', label: 'Sự sụp đổ của hệ thống xã hội chủ nghĩa ở Liên Xô' },
        { key: 'C', label: 'Sự hình thành các khối liên minh quân sự' },
        { key: 'D', label: 'Cuộc khủng hoảng năng lượng toàn cầu' }
      ],
      correctAnswer: 'A',
      explanation: 'Cách mạng khoa học công nghệ làm bùng nổ lực lượng sản xuất, thúc đẩy giao lưu kinh tế quốc tế và hình thành xu thế toàn cầu hóa.',
      topic: 'Toàn cầu hóa', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết'
    },

    // ── PHẦN II: 4 CÂU ĐÚNG / SAI ──────────────────────────────────
    {
      id: 6019, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 1] Nhận định về tổ chức Hội Việt Nam Cách mạng Thanh niên (thành lập 6/1925):',
      trueFalseItems: [
        { id: 'a', text: 'Do Nguyễn Ái Quốc trực tiếp sáng lập tại Quảng Châu (Trung Quốc).', correctAnswer: true },
        { id: 'b', text: 'Cơ quan ngôn luận chính thức của Hội là tuần báo "Thanh niên".', correctAnswer: true },
        { id: 'c', text: 'Chủ trương đưa hội viên đi vào các hầm mỏ, nhà máy để thực hiện phong trào "Vô sản hóa" (1928).', correctAnswer: true },
        { id: 'd', text: 'Tổ chức này chủ trương đấu tranh vũ trang theo khuynh hướng dân chủ tư sản.', correctAnswer: false }
      ],
      explanation: 'Hội theo khuynh hướng vô sản, chuẩn bị về tư tưởng và tổ chức cho sự ra đời của Đảng Cộng sản Việt Nam.',
      topic: 'Tổ chức cách mạng', difficulty: 'Thông hiểu'
    },
    {
      id: 6020, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 2] Nhận định về cuộc Tổng tiến công và nổi dậy mùa Xuân năm 1975:',
      trueFalseItems: [
        { id: 'a', text: 'Chiến dịch Tây Nguyên mở đầu bằng trận then chốt Buôn Ma Thuột ngày 10/3/1975.', correctAnswer: true },
        { id: 'b', text: 'Chiến dịch Huế - Đà Nẵng đã quét sạch quân địch ở dải đất miền Trung.', correctAnswer: true },
        { id: 'c', text: 'Chiến dịch Hồ Chí Minh lịch sử bắt đầu từ ngày 26/4 và kết thúc thắng lợi trưa ngày 30/4/1975.', correctAnswer: true },
        { id: 'd', text: 'Quân đội Sài Gòn tự đầu hàng trước khi các cánh quân giải phóng tiến vào Dinh Độc Lập.', correctAnswer: false }
      ],
      explanation: 'Xe tăng quân giải phóng húc đổ cổng Dinh Độc Lập, bắt sống toàn bộ nội các Dương Văn Minh buộc phải tuyên bố đầu hàng vô điều kiện.',
      topic: 'Đại thắng 1975', difficulty: 'Thông hiểu'
    },
    {
      id: 6021, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 3] Khi nói về Hiệp định Giơ-ne-vơ năm 1954 về Đông Dương:',
      trueFalseItems: [
        { id: 'a', text: 'Pháp và các nước tham dự công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Việt Nam.', correctAnswer: true },
        { id: 'b', text: 'Sông Bến Hải (vĩ tuyến 17) được quy định là giới tuyến quân sự tạm thời.', correctAnswer: true },
        { id: 'c', text: 'Thời hạn tổng tuyển cử tự do thống nhất đất nước được ấn định vào tháng 7 năm 1956.', correctAnswer: true },
        { id: 'd', text: 'Hiệp định đã giải phóng hoàn toàn cả hai miền Nam - Bắc khỏi ách thống trị của thực dân và đế quốc.', correctAnswer: false }
      ],
      explanation: 'Miền Bắc được hoàn toàn giải phóng, miền Nam bị đế quốc Mỹ nhảy vào can thiệp biến thành thuộc địa kiểu mới.',
      topic: 'Hiệp định Giơnevơ', difficulty: 'Thông hiểu'
    },
    {
      id: 6022, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 4] Về cuộc Cách mạng khoa học - công nghệ nửa sau thế kỷ XX:',
      trueFalseItems: [
        { id: 'a', text: 'Nguồn gốc sâu xa là do đòi hỏi của cuộc sống và nhu cầu sản xuất ngày càng cao của loài người.', correctAnswer: true },
        { id: 'b', text: 'Đặc điểm lớn nhất là khoa học trở thành lực lượng sản xuất trực tiếp.', correctAnswer: true },
        { id: 'c', text: 'Cuộc cách mạng này chỉ mang lại lợi ích kinh tế mà không gây ra bất kỳ hậu quả tiêu cực nào.', correctAnswer: false },
        { id: 'd', text: 'Máy tính điện tử, năng lượng nguyên tử và vật liệu mới là những thành tựu then chốt.', correctAnswer: true }
      ],
      explanation: 'Cách mạng KH-CN cũng mang lại những mặt trái: ô nhiễm môi trường, vũ khí hủy diệt hàng loạt, tai nạn lao động...',
      topic: 'Cách mạng KH-CN', difficulty: 'Thông hiểu'
    },

    // ── PHẦN III: 6 CÂU TRẢ LỜI NGẮN ──────────────────────────────
    {
      id: 6023, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 1] Đảng Cộng sản Việt Nam được thành lập vào ngày tháng năm nào? (Điền dạng: ngày/tháng/năm, VD: 03/02/1930)',
      shortAnswerCorrect: '03/02/1930',
      topic: 'Thành lập Đảng', difficulty: 'Nhận biết',
      explanation: 'Đảng Cộng sản Việt Nam thành lập ngày 3/2/1930 tại Cửu Long (Hương Cảng, Trung Quốc) do Nguyễn Ái Quốc chủ trì.'
    },
    {
      id: 6024, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 2] Chiến dịch Điện Biên Phủ lịch sử diễn ra trong bao nhiêu ngày đêm? (Điền số ngày)',
      shortAnswerCorrect: '56',
      topic: 'Điện Biên Phủ', difficulty: 'Nhận biết',
      explanation: 'Chiến dịch Điện Biên Phủ kéo dài trong 56 ngày đêm (từ 13/3 đến 7/5/1954): "Năm mươi sáu ngày đêm khoét núi, ngủ hầm, mưa dầm, cơm vắt".'
    },
    {
      id: 6025, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 3] Cuộc Tổng tiến công và nổi dậy giải phóng hoàn toàn miền Nam thống nhất đất nước diễn ra vào năm nào?',
      shortAnswerCorrect: '1975',
      topic: 'Giải phóng miền Nam', difficulty: 'Nhận biết',
      explanation: 'Đại thắng mùa Xuân năm 1975 kết thúc vẻ vang 21 năm kháng chiến chống Mỹ và 30 năm chiến tranh giải phóng dân tộc.'
    },
    {
      id: 6026, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 4] Việt Nam chính thức trở thành thành viên thứ bao nhiêu của tổ chức Liên hợp quốc (vào năm 1977)?',
      shortAnswerCorrect: '149',
      topic: 'Hội nhập quốc tế', difficulty: 'Thông hiểu',
      explanation: 'Ngày 20/9/1977, Việt Nam chính thức được công nhận là thành viên thứ 149 của Liên hợp quốc.'
    },
    {
      id: 6027, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 5] Hiệp hội các quốc gia Đông Nam Á (ASEAN) được thành lập vào năm nào tại Băng Cốc (Thái Lan)?',
      shortAnswerCorrect: '1967',
      topic: 'ASEAN', difficulty: 'Nhận biết',
      explanation: 'Tổ chức ASEAN được thành lập ngày 8/8/1967 tại Bangkok với 5 nước sáng lập: Indonesia, Malaysia, Philippines, Singapore, Thái Lan.'
    },
    {
      id: 6028, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 6] Có bao nhiêu nước ủy viên thường trực trong Hội đồng Bảo an Liên hợp quốc? (Điền số)',
      shortAnswerCorrect: '5',
      topic: 'Liên hợp quốc', difficulty: 'Nhận biết',
      explanation: '5 nước ủy viên thường trực: Mỹ, Nga (kế thừa Liên Xô), Anh, Pháp và Trung Quốc.'
    }
  ]
};

// Danh sách các đề tổ hợp khoa học xã hội & tự nhiên mở rộng
export const ALL_EXPANDED_BGD_EXAMS: Exam[] = [
  BGD_EXAM_SINH,
  BGD_EXAM_SU,
];
