import { Exam } from '../types';

// ============================================================================
// ĐỀ THI MÔN NGỮ VĂN (28 CÂU CHUẨN BGD 2025)
// Ma trận: Đọc hiểu (4 câu TN + 2 câu ĐS + 2 SA) + Viết (NLXH + NLVH)
// Phần I: 18 câu TN (0.25đ) | Phần II: 4 câu Đúng/Sai | Phần III: 6 câu SA
// ============================================================================
export const BGD_EXAM_VAN: Exam = {
  id: 'exam-van-bgd-2025',
  examCode: 'MÃ-201',
  title: 'Đề Thi Thử Tốt Nghiệp THPT 2025 - Môn Ngữ Văn (Format Chuẩn Bộ GD&ĐT)',
  description: 'Đề thi chuẩn cấu trúc mới BGD 2025: Đọc hiểu văn bản, nhận biết phong cách ngôn ngữ, biện pháp tu từ, thao tác lập luận. Phân hóa từ nhận biết đến vận dụng cao.',
  subject: 'Ngữ văn',
  grade: 'Lớp 12',
  durationMinutes: 50,
  difficulty: 'Format Chuẩn BGD 2025',
  isBGDFormat: true,
  author: 'Hội Đồng Khảo Thí Quốc Gia - EduViet',
  attemptsCount: 3200,
  averageScore: 6.8,
  questions: [
    // ── PHẦN I: 18 CÂU TRẮC NGHIỆM (0.25đ/câu) ──────────────────────────
    // [Nhận biết: 1–6]
    {
      id: 2001, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 1] Đọc đoạn văn: "Đất nước bắt đầu từ cái đó ta gọi là thiêng liêng... Khi ta lớn lên Đất Nước đã có rồi / Đất Nước có trong những cái ngày xửa ngày xưa mẹ thường hay kể." (Nguyễn Khoa Điềm). Phong cách ngôn ngữ của đoạn thơ là:',
      options: [
        { key: 'A', label: 'Phong cách ngôn ngữ nghệ thuật' },
        { key: 'B', label: 'Phong cách ngôn ngữ báo chí' },
        { key: 'C', label: 'Phong cách ngôn ngữ khoa học' },
        { key: 'D', label: 'Phong cách ngôn ngữ hành chính' }
      ],
      correctAnswer: 'A',
      explanation: 'Đoạn thơ mang phong cách ngôn ngữ nghệ thuật với ngôn từ giàu hình ảnh, biểu cảm, sử dụng thể thơ trữ tình, diễn đạt cảm xúc về đất nước.',
      topic: 'Phong cách ngôn ngữ', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết',
      whyWrongMap: { 'B': 'Báo chí có đặc trưng thông tin nhanh, khách quan. Đoạn thơ này không có đặc điểm đó.', 'C': 'Ngôn ngữ khoa học có tính chính xác, hệ thống. Thơ ca mang tính biểu cảm.', 'D': 'Hành chính có cấu trúc quy phạm, văn phạm hành chính.' },
      mistakeAdvice: 'Nhận biết phong cách qua: ngôn từ (hình ảnh/biểu cảm = nghệ thuật; thông tin/khách quan = báo chí; hệ thống/chính xác = khoa học).',
      keyFormula: 'Phong cách nghệ thuật: hình ảnh, biểu cảm, đa nghĩa, ngôn từ được chọn lọc.'
    },
    {
      id: 2002, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 2] Trong câu "Lom khom dưới núi tiều vài chú / Lác đác bên sông chợ mấy nhà" (Bà Huyện Thanh Quan), biện pháp tu từ nào được sử dụng chủ yếu?',
      options: [
        { key: 'A', label: 'Đảo ngữ (đảo trật tự cú pháp)' },
        { key: 'B', label: 'So sánh' },
        { key: 'C', label: 'Nhân hóa' },
        { key: 'D', label: 'Điệp ngữ' }
      ],
      correctAnswer: 'A',
      explanation: '"Lom khom... tiều vài chú" — vị ngữ (lom khom) đặt trước chủ ngữ (tiều vài chú) → đảo ngữ. Tác dụng: nhấn mạnh hình ảnh và cảm xúc trước.',
      topic: 'Biện pháp tu từ', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết',
      whyWrongMap: { 'B': 'So sánh cần có "như, tựa, bằng..." — câu này không có.', 'C': 'Nhân hóa gán tính chất người cho vật — câu này không có.', 'D': 'Điệp ngữ lặp từ/cụm từ — câu này không có.' },
      mistakeAdvice: 'Đảo ngữ: trạng ngữ / vị ngữ đặt TRƯỚC chủ ngữ. Nhận biết bằng cách tìm CN-VN bình thường rồi so sánh.',
      keyFormula: 'Đảo ngữ: thành phần phụ/VN đứng trước CN → nhấn mạnh.'
    },
    {
      id: 2003, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 3] Đoạn văn: "Bác đã đi rồi sao, Bác ơi! / Mùa thu đang đẹp, nắng xanh trời / Miền Nam đang thắng, mơ ngày hội / Chợt nghe tin Bác, khóc ôi thôi" (Tố Hữu). Thể thơ của đoạn thơ là:',
      options: [
        { key: 'A', label: 'Thất ngôn tứ tuyệt Đường luật' },
        { key: 'B', label: 'Thơ tự do' },
        { key: 'C', label: 'Lục bát' },
        { key: 'D', label: 'Song thất lục bát' }
      ],
      correctAnswer: 'A',
      explanation: 'Mỗi câu có 7 tiếng, bốn câu với vần chân (trời-thôi-ơi): đây là thất ngôn tứ tuyệt (4 câu × 7 chữ) theo thể Đường luật.',
      topic: 'Thể thơ', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết',
      whyWrongMap: { 'B': 'Thơ tự do không có quy luật vần và số chữ cố định.', 'C': 'Lục bát có cấu trúc 6-8 xen kẽ.', 'D': 'Song thất lục bát gồm hai câu 7 rồi một cặp lục bát.' },
      mistakeAdvice: 'Nhận biết thể thơ: đếm số chữ/câu và quan sát quy luật vần.',
      keyFormula: 'Thất ngôn tứ tuyệt: 4 câu × 7 chữ; vần bằng ở câu 1, 2, 4.'
    },
    {
      id: 2004, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 4] Phương thức biểu đạt chính trong đoạn: "Tôi muốn tắt nắng đi / Cho màu đừng nhạt mất; Tôi muốn buộc gió lại / Cho hương đừng bay đi" (Xuân Diệu) là:',
      options: [
        { key: 'A', label: 'Biểu cảm' },
        { key: 'B', label: 'Tự sự' },
        { key: 'C', label: 'Miêu tả' },
        { key: 'D', label: 'Nghị luận' }
      ],
      correctAnswer: 'A',
      explanation: 'Đoạn thơ bộc lộ trực tiếp cảm xúc, khát vọng của nhà thơ muốn giữ lại vẻ đẹp — phương thức biểu cảm là chủ đạo.',
      topic: 'Phương thức biểu đạt', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết',
      whyWrongMap: { 'B': 'Tự sự kể lại sự việc, có cốt truyện.', 'C': 'Miêu tả tái hiện sự vật bằng ngôn ngữ hình ảnh cụ thể.', 'D': 'Nghị luận trình bày luận điểm-luận cứ để thuyết phục.' },
      mistakeAdvice: 'Biểu cảm: bộc lộ cảm xúc, cảm nghĩ trực tiếp/gián tiếp. Thơ trữ tình chủ yếu là biểu cảm.',
      keyFormula: 'Biểu cảm chủ đạo khi: câu thơ bộc lộ cảm xúc chủ quan của tác giả.'
    },
    {
      id: 2005, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 5] Trong văn học Việt Nam hiện đại, tác phẩm "Rừng xà nu" của Nguyễn Trung Thành thuộc thể loại nào?',
      options: [
        { key: 'A', label: 'Truyện ngắn' },
        { key: 'B', label: 'Tiểu thuyết' },
        { key: 'C', label: 'Tùy bút' },
        { key: 'D', label: 'Ký' }
      ],
      correctAnswer: 'A',
      explanation: '"Rừng xà nu" là truyện ngắn tiêu biểu của Nguyễn Trung Thành, in trong tập "Trên quê hương những anh hùng Điện Ngọc" (1969). Đây là thể loại truyện ngắn dung lượng lớn.',
      topic: 'Tác phẩm - thể loại', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết',
      whyWrongMap: { 'B': 'Tiểu thuyết có dung lượng lớn hơn, nhiều tuyến nhân vật.', 'C': 'Tùy bút thiên về cảm xúc chủ quan của tác giả, ít nhân vật hư cấu.', 'D': 'Ký ghi chép sự kiện có thật, người thật.' },
      mistakeAdvice: 'Cần nhớ thể loại của các tác phẩm trọng tâm trong chương trình Ngữ văn 12.',
      keyFormula: 'Rừng xà nu = truyện ngắn; Người lái đò sông Đà = tùy bút; Vợ nhặt = truyện ngắn.'
    },
    {
      id: 2006, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 6] "Chiếc thuyền ngoài xa" của Nguyễn Minh Châu khai thác chủ đề chính là:',
      options: [
        { key: 'A', label: 'Mối quan hệ giữa nghệ thuật và cuộc sống, giữa cái đẹp và sự thật' },
        { key: 'B', label: 'Cuộc kháng chiến chống Mỹ của nhân dân ta' },
        { key: 'C', label: 'Tình yêu đôi lứa trong thời bình' },
        { key: 'D', label: 'Sự phát triển kinh tế biển của Việt Nam' }
      ],
      correctAnswer: 'A',
      explanation: 'Tác phẩm khắc họa nghịch lý: bức ảnh thuyền đẹp (nghệ thuật) ẩn chứa bi kịch đời thực (người phụ nữ bị đánh đập) → đặt vấn đề về cái nhìn nghệ thuật và sự thật cuộc đời.',
      topic: 'Chủ đề tác phẩm', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết',
      whyWrongMap: { 'B': 'Tác phẩm viết sau 1975, thời kỳ đổi mới.', 'C': 'Tình yêu không phải chủ đề chính.', 'D': 'Biển chỉ là bối cảnh.' },
      mistakeAdvice: 'Nắm vững chủ đề và ý nghĩa của các tác phẩm văn xuôi sau 1975.',
      keyFormula: 'Chiếc thuyền ngoài xa: nghệ thuật ≠ cuộc đời; cần nhìn sâu sau vẻ đẹp bề ngoài.'
    },
    // [Thông hiểu: 7–12]
    {
      id: 2007, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 7] Đọc câu: "Ôi sức trẻ! Xưa trai Phù Đổng / Vươn vai, một cái, sức ngàn cân" (Tố Hữu). Hình ảnh "trai Phù Đổng" biểu tượng cho điều gì?',
      options: [
        { key: 'A', label: 'Sức mạnh và tinh thần bất khuất của thanh niên Việt Nam' },
        { key: 'B', label: 'Hình ảnh người chiến sĩ già dặn kinh nghiệm' },
        { key: 'C', label: 'Vẻ đẹp ngoại hình của người anh hùng' },
        { key: 'D', label: 'Truyền thống thượng võ của dân tộc xưa' }
      ],
      correctAnswer: 'A',
      explanation: 'Phù Đổng Thiên Vương (Thánh Gióng) là hình tượng sức mạnh phi thường của tuổi trẻ. Trong thơ Tố Hữu, hình ảnh này ca ngợi sức mạnh, tinh thần vươn lên của thanh niên.',
      topic: 'Phân tích hình ảnh', difficulty: 'Thông hiểu', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': 'Phù Đổng là biểu tượng sức trẻ, không phải kinh nghiệm.', 'C': 'Câu thơ nhấn mạnh sức mạnh nội tại, không phải ngoại hình.', 'D': 'Truyền thống thượng võ đúng nhưng chưa đủ, ý chính là sức mạnh tuổi trẻ.' },
      mistakeAdvice: 'Khi phân tích hình ảnh biểu tượng, cần đặt trong ngữ cảnh bài thơ và ý đồ tác giả.',
      keyFormula: 'Phù Đổng = sức mạnh phi thường của tuổi trẻ Việt Nam.'
    },
    {
      id: 2008, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 8] Trong tác phẩm "Vợ nhặt" (Kim Lân), chi tiết "bát cháo cám" cuối truyện có ý nghĩa gì?',
      options: [
        { key: 'A', label: 'Thể hiện tình người ấm áp, khát vọng sống và sức mạnh của tình thương trong hoàn cảnh khốn cùng' },
        { key: 'B', label: 'Phê phán sự nghèo đói của xã hội nông thôn' },
        { key: 'C', label: 'Nhấn mạnh cái đói khiến con người mất phẩm giá' },
        { key: 'D', label: 'Phản ánh sự lạc hậu trong ẩm thực của người dân' }
      ],
      correctAnswer: 'A',
      explanation: 'Bà cụ Tứ gọi cháo cám là "chè khoán" — chi tiết này thể hiện tình mẫu tử, sự lạc quan và tình thương yêu. Trong cái đói khổ, con người vẫn giữ phẩm giá và sức sống.',
      topic: 'Chi tiết nghệ thuật', difficulty: 'Thông hiểu', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': 'Đây không phải mục đích chính của chi tiết.', 'C': 'Ngược lại, chi tiết cho thấy con người vượt lên hoàn cảnh.', 'D': 'Đây là cách đọc quá hời hợt, không phân tích ý nghĩa sâu xa.' },
      mistakeAdvice: 'Khi phân tích chi tiết, hỏi: chi tiết đó nói lên điều gì về nhân vật, tư tưởng tác giả?',
      keyFormula: 'Chi tiết nghệ thuật = hạt nhân của tư tưởng, bộc lộ tính cách và giá trị nhân đạo.'
    },
    {
      id: 2009, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 9] Từ "xuân" trong câu thơ "Xuân đương tới, nghĩa là xuân đương qua / Xuân còn non, nghĩa là xuân sẽ già" (Xuân Diệu) được dùng theo nghĩa nào?',
      options: [
        { key: 'A', label: 'Cả nghĩa gốc (mùa xuân) và nghĩa chuyển (tuổi trẻ, sức sống)' },
        { key: 'B', label: 'Chỉ nghĩa gốc: mùa xuân trong năm' },
        { key: 'C', label: 'Nghĩa ẩn dụ hoàn toàn, không liên quan mùa xuân' },
        { key: 'D', label: 'Nghĩa hoán dụ: thay thế cho thời gian' }
      ],
      correctAnswer: 'A',
      explanation: '"Xuân" vừa chỉ mùa xuân (nghĩa gốc) vừa ẩn dụ cho tuổi trẻ, sức sống (nghĩa chuyển). Xuân Diệu dùng cả hai tầng nghĩa để diễn tả triết lý về thời gian.',
      topic: 'Nghĩa của từ', difficulty: 'Thông hiểu', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': 'Nếu chỉ là nghĩa gốc thì câu thơ mất đi chiều sâu triết lý.', 'C': 'Nghĩa gốc vẫn hiện diện tạo hình ảnh.', 'D': 'Đây là ẩn dụ, không phải hoán dụ (hoán dụ lấy bộ phận thay toàn thể).' },
      mistakeAdvice: 'Từ nhiều nghĩa: nghĩa gốc + nghĩa chuyển (ẩn dụ/hoán dụ). Cần xác định có bao nhiêu tầng nghĩa.',
      keyFormula: 'Ẩn dụ: A gọi là B nhờ tương đồng. Hoán dụ: A gọi là B nhờ tương cận.'
    },
    {
      id: 2010, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 10] Đặc điểm nổi bật của phong cách nghệ thuật Hồ Xuân Hương là:',
      options: [
        { key: 'A', label: 'Táo bạo, trào phúng sâu cay, giọng thơ bình dân, hình ảnh đôi nghĩa' },
        { key: 'B', label: 'Trang nhã, cổ kính, thiên về điển tích điển cố Trung Hoa' },
        { key: 'C', label: 'Lãng mạn, thoát tục, đậm chất thiền học' },
        { key: 'D', label: 'Hiện thực nghiêm túc, phản ánh xã hội phong kiến suy tàn' }
      ],
      correctAnswer: 'A',
      explanation: 'Hồ Xuân Hương được gọi là "Bà chúa thơ Nôm" với đặc điểm: ngôn ngữ bình dân, hình ảnh đôi nghĩa (nghĩa đen bình thường + nghĩa bóng táo bạo), trào phúng, tiếng cười chua chát.',
      topic: 'Phong cách nghệ thuật', difficulty: 'Thông hiểu', errorCategory: 'Lý thuyết',
      whyWrongMap: { 'B': 'Đây là phong cách của các nhà thơ cung đình như Nguyễn Trãi.', 'C': 'Huyền Quang mới mang chất thiền.', 'D': 'Hiện thực nghiêm túc là phong cách của Nguyễn Du, Nguyễn Khuyến.' },
      mistakeAdvice: 'Nhớ đặc trưng phong cách của các tác giả lớn: Hồ Xuân Hương = táo bạo + đôi nghĩa.',
      keyFormula: 'HXH: thơ Nôm bình dân, hình ảnh đôi nghĩa, tiếng cười trào phúng + xót xa.'
    },
    {
      id: 2011, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 11] Thao tác lập luận chủ yếu trong đoạn: "Sách là người bạn tốt của con người. Sách cung cấp kiến thức, mở rộng tầm nhìn. Sách giúp ta sống tốt hơn..." là:',
      options: [
        { key: 'A', label: 'Giải thích kết hợp chứng minh' },
        { key: 'B', label: 'Bình luận' },
        { key: 'C', label: 'Bác bỏ' },
        { key: 'D', label: 'Phân tích kết hợp so sánh' }
      ],
      correctAnswer: 'A',
      explanation: 'Đoạn văn giải thích "sách là người bạn tốt" bằng cách nêu các lợi ích cụ thể (chứng minh) — đây là kết hợp giải thích + chứng minh.',
      topic: 'Thao tác lập luận', difficulty: 'Thông hiểu', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': 'Bình luận đánh giá, nhận xét, đưa quan điểm cá nhân.', 'C': 'Bác bỏ phản bác luận điểm của đối phương.', 'D': 'Không có yếu tố so sánh rõ ràng trong đoạn.' },
      mistakeAdvice: 'Nhớ 6 thao tác: Giải thích, Chứng minh, Phân tích, So sánh, Bình luận, Bác bỏ.',
      keyFormula: 'Giải thích = nêu ý nghĩa; Chứng minh = dẫn bằng chứng xác thực.'
    },
    {
      id: 2012, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 12] Trong truyện ngắn "Hai đứa trẻ" (Thạch Lam), hình ảnh "đoàn tàu" cuối truyện có ý nghĩa biểu tượng là:',
      options: [
        { key: 'A', label: 'Ánh sáng, niềm hy vọng và khát vọng về một cuộc sống tươi sáng hơn' },
        { key: 'B', label: 'Sự nhộn nhịp, giàu có của đô thị' },
        { key: 'C', label: 'Nỗi buồn chia ly của những người thân' },
        { key: 'D', label: 'Phương tiện giao thông hiện đại thời Pháp thuộc' }
      ],
      correctAnswer: 'A',
      explanation: 'Đoàn tàu xuất hiện mang theo ánh đèn và âm thanh từ Hà Nội — biểu tượng cho thế giới huy hoàng, ánh sáng văn minh, khơi dậy khát vọng của Liên và An thoát khỏi cuộc sống tối tăm.',
      topic: 'Hình ảnh biểu tượng', difficulty: 'Thông hiểu', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': 'Đây chưa phải tầng nghĩa sâu nhất.', 'C': 'Chia ly không phải chủ đề của đoạn này.', 'D': 'Ý nghĩa thực tế không đủ, cần khai thác nghĩa biểu tượng.' },
      mistakeAdvice: 'Hình ảnh biểu tượng trong văn học: luôn có 2 tầng — nghĩa bề mặt và nghĩa biểu tượng.',
      keyFormula: 'Đoàn tàu = ánh sáng, hy vọng, thế giới tươi sáng ≠ cuộc sống tù đọng ở ga xép.'
    },
    // [Vận dụng: 13–16]
    {
      id: 2013, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 13] Đọc đoạn văn nghị luận: "Lối sống ích kỷ là kẻ thù của sự tiến bộ xã hội. Khi mỗi người chỉ nghĩ đến lợi ích cá nhân, cộng đồng sẽ bị suy yếu." Luận điểm của đoạn là:',
      options: [
        { key: 'A', label: 'Lối sống ích kỷ gây hại cho sự phát triển của xã hội' },
        { key: 'B', label: 'Con người nên sống vì cộng đồng hơn là cá nhân' },
        { key: 'C', label: 'Xã hội tiến bộ cần có sự cạnh tranh cá nhân' },
        { key: 'D', label: 'Lợi ích cá nhân và cộng đồng không thể dung hòa' }
      ],
      correctAnswer: 'A',
      explanation: 'Câu mở đầu "Lối sống ích kỷ là kẻ thù của sự tiến bộ xã hội" là luận điểm chính. Câu còn lại là luận cứ giải thích.',
      topic: 'Luận điểm - luận cứ', difficulty: 'Vận dụng', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': 'Đây là kết luận rút ra, không phải luận điểm được nêu trực tiếp.', 'C': 'Ngược với nội dung đoạn văn.', 'D': 'Đoạn văn không đề cập đến việc dung hòa.' },
      mistakeAdvice: 'Luận điểm thường ở câu đầu (hoặc câu cuối) đoạn văn. Luận cứ là các bằng chứng, lý lẽ giải thích cho luận điểm.',
      keyFormula: 'Luận điểm = câu chốt nêu ý kiến cần chứng minh. Luận cứ = dẫn chứng + lý lẽ.'
    },
    {
      id: 2014, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 14] Hình ảnh sóng trong bài thơ "Sóng" (Xuân Quỳnh) có đặc điểm nổi bật là:',
      options: [
        { key: 'A', label: 'Vừa mang đặc điểm tự nhiên vừa là ẩn dụ cho tâm hồn người phụ nữ đang yêu' },
        { key: 'B', label: 'Chỉ mang nghĩa tả thực, không có nghĩa ẩn' },
        { key: 'C', label: 'Biểu trưng cho nỗi đau khổ, bi kịch trong tình yêu' },
        { key: 'D', label: 'Tượng trưng cho sức mạnh vũ bão của thiên nhiên' }
      ],
      correctAnswer: 'A',
      explanation: 'Sóng biển (tự nhiên) và "em" (người phụ nữ) song hành tạo cấu trúc song thể: sóng bao giờ cũng là ẩn dụ cho trái tim người phụ nữ với những trạng thái yêu đương đối lập (dữ dội - dịu êm, ồn ào - lặng lẽ).',
      topic: 'Hình ảnh trong thơ', difficulty: 'Vận dụng', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': 'Nếu chỉ tả thực, bài thơ mất đi giá trị nghệ thuật đặc sắc nhất.', 'C': 'Sóng mang cả niềm vui và khát vọng, không chỉ đau khổ.', 'D': 'Không phải chủ đề chính của bài.' },
      mistakeAdvice: 'Trong bài Sóng: luôn có song song "sóng" và "em" — cả hai cùng biểu đạt tình yêu.',
      keyFormula: 'Sóng = ẩn dụ tâm hồn người phụ nữ đang yêu (đối lập, khát vọng, chung thủy).'
    },
    {
      id: 2015, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 15] Văn bản sau dùng thao tác lập luận nào: "Nghị luận xã hội hiện đại nhấn mạnh tính thực tiễn. Ở Nhật Bản, học sinh được dạy kỹ năng sống từ lớp 1. Ở Phần Lan, chương trình giáo dục tập trung vào tư duy phản biện. Như vậy, xu hướng giáo dục toàn cầu đang dịch chuyển sang phát triển năng lực thực hành."',
      options: [
        { key: 'A', label: 'So sánh kết hợp chứng minh' },
        { key: 'B', label: 'Giải thích đơn thuần' },
        { key: 'C', label: 'Phân tích kết hợp bác bỏ' },
        { key: 'D', label: 'Bình luận' }
      ],
      correctAnswer: 'A',
      explanation: 'Đoạn văn so sánh hai hệ thống giáo dục (Nhật Bản, Phần Lan) và dùng chúng làm bằng chứng (chứng minh) cho luận điểm về xu hướng giáo dục toàn cầu.',
      topic: 'Thao tác lập luận', difficulty: 'Vận dụng', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': 'Không chỉ giải thích, có dẫn chứng cụ thể.', 'C': 'Không có yếu tố bác bỏ.', 'D': 'Bình luận đánh giá chủ quan hơn.' },
      mistakeAdvice: 'Nhận biết so sánh: có ít nhất 2 đối tượng được đặt cạnh nhau. Chứng minh: có dẫn chứng cụ thể.',
      keyFormula: 'So sánh + Chứng minh: lấy ví dụ từ thực tế để đối chiếu và xác nhận luận điểm.'
    },
    {
      id: 2016, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 16] Trong truyện "Người lái đò sông Đà" (Nguyễn Tuân), đặc điểm phong cách nghệ thuật của tác giả thể hiện qua:',
      options: [
        { key: 'A', label: 'Ngôn từ phong phú, tài hoa; nhìn sự vật từ nhiều góc độ khác nhau; uyên bác' },
        { key: 'B', label: 'Giản dị, chân thực, gần gũi với đời thường' },
        { key: 'C', label: 'Trữ tình đằm thắm, giàu cảm xúc nhẹ nhàng' },
        { key: 'D', label: 'Lý trí, sắc bén, thiên về phân tích tâm lý' }
      ],
      correctAnswer: 'A',
      explanation: 'Nguyễn Tuân nổi tiếng với phong cách "Ngông", uyên bác, dùng nhiều kiến thức liên ngành (quân sự, âm nhạc, thể thao...), ngôn từ giàu có và góc nhìn mới mẻ, tài hoa.',
      topic: 'Phong cách tác giả', difficulty: 'Vận dụng', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': 'Đây là phong cách của Nam Cao, Tô Hoài.', 'C': 'Đây là phong cách thơ Xuân Quỳnh, Huy Cận.', 'D': 'Phân tích tâm lý là phong cách của Nguyễn Minh Châu.' },
      mistakeAdvice: 'Nhớ phong cách đặc trưng: Nguyễn Tuân = Ngông, uyên bác, tài hoa; Nam Cao = tâm lý, hiện thực.',
      keyFormula: 'NT: uyên bác + tài hoa + nhìn đẹp từ góc độ nghệ thuật thuần túy.'
    },
    // [Vận dụng cao: 17–18]
    {
      id: 2017, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 17] Phân tích giá trị của yếu tố thời gian trong đoạn thơ: "Thời gian chạy qua tóc mẹ / Một màu trắng đến nôn nao / Lưng mẹ cứ còng dần xuống / Cho con ngày một thêm cao" (Trương Nam Hương). Ý nào KHÔNG phù hợp?',
      options: [
        { key: 'A', label: 'Thời gian là yếu tố làm giàu đẹp thêm vẻ đẹp ngoại hình của người mẹ' },
        { key: 'B', label: 'Thời gian được cảm nhận qua sự biến đổi thể xác của người mẹ' },
        { key: 'C', label: 'Sự tương phản giữa mẹ già yếu và con trưởng thành tạo nên xúc động' },
        { key: 'D', label: 'Thời gian gắn liền với sự hi sinh thầm lặng của người mẹ' }
      ],
      correctAnswer: 'A',
      explanation: 'Thời gian không "làm giàu đẹp" ngoại hình mẹ — ngược lại, thời gian làm tóc mẹ bạc, lưng mẹ còng. Đây là sự hy sinh, không phải vẻ đẹp được thêm.',
      topic: 'Phân tích - vận dụng cao', difficulty: 'Vận dụng cao', errorCategory: 'Bẫy đề thi',
      whyWrongMap: { 'B': 'Đúng: tóc trắng, lưng còng là biến đổi thể xác theo thời gian.', 'C': 'Đúng: mẹ còng - con cao là tương phản rõ nét.', 'D': 'Đúng: thời gian = sự hy sinh.' },
      mistakeAdvice: 'Câu hỏi dạng "KHÔNG phù hợp" cần đọc kỹ từng đáp án và tìm đáp án SAI so với nội dung thơ.',
      keyFormula: 'Dạng "KHÔNG phù hợp": tìm đáp án mâu thuẫn với nội dung/ý nghĩa văn bản.'
    },
    {
      id: 2018, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 18] Nghị luận văn học về đoạn trích "Tây Tiến" (Quang Dũng): "Tây Tiến người đi không hẹn ước / Đường lên thăm thẳm một chia phôi / Ai lên Tây Tiến mùa xuân ấy / Hồn về Sầm Nứa chẳng về xuôi". Từ "chẳng về xuôi" thể hiện:',
      options: [
        { key: 'A', label: 'Tinh thần quyết tâm chiến đấu đến cùng, xem cái chết nhẹ nhàng như mây trắng' },
        { key: 'B', label: 'Sự bi quan, tuyệt vọng của người lính trước cái chết' },
        { key: 'C', label: 'Lời nguyền rủa chiến tranh đã cướp đi sinh mạng người lính' },
        { key: 'D', label: 'Nỗi nhớ quê hương da diết của người lính xa nhà' }
      ],
      correctAnswer: 'A',
      explanation: '"Chẳng về xuôi" = hy sinh hoặc quyết tâm không rời bỏ chiến trường. Cả đoạn thơ mang giọng điệu hào hùng, lãng mạn — đây là tinh thần quả cảm, coi nhẹ cái chết của người lính Tây Tiến.',
      topic: 'Phân tích ngôn ngữ thơ', difficulty: 'Vận dụng cao', errorCategory: 'Bẫy đề thi',
      whyWrongMap: { 'B': 'Toàn bài thơ Tây Tiến mang giọng điệu hào hùng, không bi quan.', 'C': 'Quang Dũng không lên án chiến tranh trong tác phẩm này.', 'D': 'Nỗi nhớ quê không phải ý nghĩa chính của từ "chẳng về xuôi".' },
      mistakeAdvice: 'Đọc giọng điệu cả bài trước khi phân tích từ ngữ cụ thể. Tây Tiến = hào hùng + lãng mạn.',
      keyFormula: 'Tây Tiến: bi tráng = bi (đau thương) + tráng (hào hùng). Không bi lụy, không tuyệt vọng.'
    },

    // ── PHẦN II: 4 CÂU ĐÚNG/SAI (Bậc thang BGD) ──────────────────────────
    {
      id: 2019, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 1] Đọc đoạn thơ: "Ta về, mình có nhớ ta / Ta về ta nhớ những hoa cùng người / Rừng xanh hoa chuối đỏ tươi / Đèo cao nắng ánh dao gài thắt lưng." (Tố Hữu - Việt Bắc). Xác định đúng/sai:',
      trueFalseItems: [
        { id: 'a', text: 'Đoạn thơ sử dụng thể thơ lục bát truyền thống', correctAnswer: true },
        { id: 'b', text: 'Hình ảnh "dao gài thắt lưng" chỉ mang nghĩa tả thực, không có ý nghĩa biểu tượng', correctAnswer: false },
        { id: 'c', text: 'Đại từ "ta" và "mình" là cách xưng hô của ca dao, gợi sự thân mật như đôi lứa', correctAnswer: true },
        { id: 'd', text: 'Câu hỏi tu từ "mình có nhớ ta" thể hiện sự nghi ngờ của người ra đi', correctAnswer: false }
      ],
      explanation: 'b sai: dao gài thắt lưng gợi hình ảnh người lao động sẵn sàng chiến đấu — biểu tượng tinh thần cách mạng. d sai: câu hỏi tu từ không phải nghi ngờ mà là cách bày tỏ nhớ nhung.',
      topic: 'Phân tích thơ ca', difficulty: 'Vận dụng'
    },
    {
      id: 2020, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 2] Về phong cách viết nghị luận văn học, xác định đúng/sai với các phát biểu sau:',
      trueFalseItems: [
        { id: 'a', text: 'Luận điểm cần rõ ràng, đủ ý và được chứng minh bằng dẫn chứng cụ thể trong tác phẩm', correctAnswer: true },
        { id: 'b', text: 'Dẫn chứng trong nghị luận văn học chỉ cần trích dẫn nguyên văn, không cần phân tích', correctAnswer: false },
        { id: 'c', text: 'Bài nghị luận văn học tốt cần có bố cục: Mở bài - Thân bài - Kết bài', correctAnswer: true },
        { id: 'd', text: 'Khi phân tích thơ, chỉ cần tập trung vào nội dung, không cần phân tích hình thức nghệ thuật', correctAnswer: false }
      ],
      explanation: 'b sai: dẫn chứng phải được phân tích, lý giải mới có sức thuyết phục. d sai: nội dung và hình thức thơ gắn bó chặt chẽ, phân tích cả hai mới toàn diện.',
      topic: 'Kỹ năng nghị luận văn học', difficulty: 'Vận dụng'
    },
    {
      id: 2021, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 3] Về tác phẩm "Số phận con người" (Sholokhov) trong chương trình Ngữ văn 12, xác định đúng/sai:',
      trueFalseItems: [
        { id: 'a', text: 'Nhân vật chính Andrei Sokolov đại diện cho sức chịu đựng và phẩm giá con người trong chiến tranh', correctAnswer: true },
        { id: 'b', text: 'Tác phẩm phê phán chiến tranh bằng cách miêu tả chỉ những cảnh bi thảm', correctAnswer: false },
        { id: 'c', text: 'Chi tiết Andrei nhận Vaniusa làm con nuôi thể hiện tình người ấm áp vượt qua bi kịch', correctAnswer: true },
        { id: 'd', text: 'Tác phẩm kết thúc bằng cái chết của nhân vật chính', correctAnswer: false }
      ],
      explanation: 'b sai: tác phẩm vừa tố cáo chiến tranh vừa ca ngợi sức sống con người. d sai: Andrei sống, nhận Vaniusa làm con và tiếp tục cuộc sống.',
      topic: 'Tác phẩm nước ngoài', difficulty: 'Vận dụng cao'
    },
    {
      id: 2022, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 4] Về đặc điểm ngôn ngữ trong văn bản nghị luận, xác định đúng/sai:',
      trueFalseItems: [
        { id: 'a', text: 'Ngôn ngữ nghị luận cần chính xác, rõ ràng và có tính thuyết phục cao', correctAnswer: true },
        { id: 'b', text: 'Văn nghị luận không được sử dụng biện pháp tu từ vì sẽ làm giảm tính logic', correctAnswer: false },
        { id: 'c', text: 'Lập luận chặt chẽ đòi hỏi luận điểm - luận cứ - kết luận phải liên kết mạch lạc', correctAnswer: true },
        { id: 'd', text: 'Dẫn chứng trong văn nghị luận chỉ có thể là số liệu thống kê, không thể là câu chuyện', correctAnswer: false }
      ],
      explanation: 'b sai: văn nghị luận có thể dùng tu từ để tăng tính thuyết phục và sinh động. d sai: dẫn chứng có thể là câu chuyện (ví dụ điển hình), số liệu, lời trích dẫn...',
      topic: 'Đặc điểm ngôn ngữ nghị luận', difficulty: 'Vận dụng cao'
    },

    // ── PHẦN III: 6 CÂU TRẢ LỜI NGẮN ────────────────────────────────────
    {
      id: 2023, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 1] Trong câu thơ "Sóng gợn tràng giang buồn điệp điệp" (Huy Cận), từ láy nào được dùng để diễn tả nỗi buồn triền miên? (Nhập từ láy đó)',
      shortAnswerCorrect: 'điệp điệp',
      topic: 'Từ láy trong thơ', difficulty: 'Nhận biết',
      explanation: '"Điệp điệp" là từ láy diễn tả nỗi buồn kéo dài không dứt, gợi hình ảnh sóng gợn liên tiếp, nỗi buồn chồng chất.'
    },
    {
      id: 2024, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 2] Tên đầy đủ của nhân vật người phụ nữ trong truyện ngắn "Vợ nhặt" (Kim Lân) là gì? (Nếu không có tên cụ thể, nhập "không có tên")',
      shortAnswerCorrect: 'không có tên',
      topic: 'Nhân vật trong tác phẩm', difficulty: 'Thông hiểu',
      explanation: 'Người vợ nhặt trong truyện không được đặt tên cụ thể — đây là dụng ý nghệ thuật của Kim Lân: thân phận bèo bọt, vô danh của người dân nghèo trong nạn đói 1945.'
    },
    {
      id: 2025, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 3] Bài thơ "Đất nước" thuộc trường ca nào của Nguyễn Khoa Điềm? (Nhập tên trường ca)',
      shortAnswerCorrect: 'Mặt đường khát vọng',
      topic: 'Tác phẩm - xuất xứ', difficulty: 'Nhận biết',
      explanation: '"Đất nước" là chương V trong trường ca "Mặt đường khát vọng" (1974) của Nguyễn Khoa Điềm.'
    },
    {
      id: 2026, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 4] Tác phẩm "Người lái đò sông Đà" của Nguyễn Tuân in trong tập tùy bút nào? (Nhập tên tập tùy bút)',
      shortAnswerCorrect: 'Sông Đà',
      topic: 'Xuất xứ tác phẩm', difficulty: 'Nhận biết',
      explanation: '"Người lái đò sông Đà" in trong tập tùy bút "Sông Đà" (1960) của Nguyễn Tuân.'
    },
    {
      id: 2027, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 5] Xác định biện pháp tu từ trong câu: "Bàn tay ta làm nên tất cả / Có sức người sỏi đá cũng thành cơm" (Hoàng Trung Thông). Nhập tên biện pháp tu từ chính.',
      shortAnswerCorrect: 'Hoán dụ',
      topic: 'Biện pháp tu từ', difficulty: 'Thông hiểu',
      explanation: '"Sỏi đá thành cơm" là hoán dụ: lấy cái cụ thể (sỏi đá, cơm) thay cho khái niệm trừu tượng (khó khăn → thành quả). Đây là hoán dụ lấy vật chất thay ý nghĩa.'
    },
    {
      id: 2028, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 6] Trong đoạn văn nghị luận xã hội về "lòng biết ơn", câu nào là luận điểm: (A) "Biết ơn là một trong những đức tính quan trọng nhất của con người." (B) "Ông bà tổ tiên ta có câu: Uống nước nhớ nguồn." Nhập A hoặc B.',
      shortAnswerCorrect: 'A',
      topic: 'Luận điểm - luận cứ', difficulty: 'Vận dụng',
      explanation: 'A là luận điểm (ý kiến cần chứng minh). B là luận cứ (dẫn chứng hỗ trợ cho luận điểm).'
    }
  ]
};

// ============================================================================
// ĐỀ THI MÔN TIẾNG ANH (28 CÂU CHUẨN BGD 2025)
// ============================================================================
export const BGD_EXAM_ANH: Exam = {
  id: 'exam-anh-bgd-2025',
  examCode: 'MÃ-401',
  title: 'Đề Thi Thử Tốt Nghiệp THPT 2025 - Môn Tiếng Anh (Format Chuẩn Bộ GD&ĐT)',
  description: 'Đề thi chuẩn cấu trúc mới BGD 2025 môn Tiếng Anh: ngữ pháp, từ vựng, đọc hiểu, ngữ âm, giao tiếp. Phân hóa từ nhận biết đến vận dụng cao.',
  subject: 'Tiếng Anh',
  grade: 'Lớp 12',
  durationMinutes: 50,
  difficulty: 'Format Chuẩn BGD 2025',
  isBGDFormat: true,
  author: 'Hội Đồng Khảo Thí Quốc Gia - EduViet',
  attemptsCount: 2800,
  averageScore: 6.5,
  questions: [
    // ── PHẦN I: 18 CÂU TRẮC NGHIỆM ──────────────────────────────────────
    // [Ngữ âm - Nhận biết: 1-2]
    {
      id: 4001, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 1] Choose the word whose underlined part is pronounced differently from the others: (A) ch_ange (B) ch_emist (C) ch_urch (D) ch_ildren',
      options: [
        { key: 'A', label: 'change /tʃ/' },
        { key: 'B', label: 'chemist /k/' },
        { key: 'C', label: 'church /tʃ/' },
        { key: 'D', label: 'children /tʃ/' }
      ],
      correctAnswer: 'B',
      explanation: '"Chemist" has "ch" pronounced /k/ (Greek origin). The others have "ch" pronounced /tʃ/.',
      topic: 'Pronunciation - ch sound', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết',
      whyWrongMap: { 'A': '/tʃ/ like "chair"', 'C': '/tʃ/ like "chair"', 'D': '/tʃ/ like "chair"' },
      mistakeAdvice: 'Words from Greek origin: "ch" = /k/ (chemistry, choir, chaos, chronic, character)',
      keyFormula: 'ch = /k/ in Greek-origin words; ch = /tʃ/ in English/French-origin words.'
    },
    {
      id: 4002, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 2] Choose the word whose stress pattern is DIFFERENT: (A) develop (B) consider (C) volunteer (D) remember',
      options: [
        { key: 'A', label: 'de-VEL-op (2nd syllable)' },
        { key: 'B', label: 'con-SID-er (2nd syllable)' },
        { key: 'C', label: 'vol-un-TEER (3rd syllable)' },
        { key: 'D', label: 're-MEM-ber (2nd syllable)' }
      ],
      correctAnswer: 'C',
      explanation: '"Volunteer" is stressed on the 3rd syllable /ˌvɒlənˈtɪə/. The others are stressed on the 2nd syllable.',
      topic: 'Word stress', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết',
      whyWrongMap: { 'A': '2nd syllable stress: de-VEL-op', 'B': '2nd syllable: con-SID-er', 'D': '2nd syllable: re-MEM-ber' },
      mistakeAdvice: 'Nouns/adjectives ending in "-eer, -ier, -ique, -esque, -ette" take stress on the last syllable.',
      keyFormula: '-eer/-ier/-ique suffix → stress on LAST syllable (volunteer, engineer, antique).'
    },
    // [Ngữ pháp - Nhận biết/Thông hiểu: 3-10]
    {
      id: 4003, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 3] By the time she arrives, we _______ dinner. Choose the correct verb form:',
      options: [
        { key: 'A', label: 'will have finished' },
        { key: 'B', label: 'will finish' },
        { key: 'C', label: 'are finishing' },
        { key: 'D', label: 'have finished' }
      ],
      correctAnswer: 'A',
      explanation: '"By the time + present simple" triggers Future Perfect (will have + past participle) to show an action completed before a future point.',
      topic: 'Future Perfect Tense', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết',
      whyWrongMap: { 'B': 'Future Simple is used for single future events, not completion before another event.', 'C': 'Present Continuous expresses present, not future completion.', 'D': 'Present Perfect is for past-to-now, not future.' },
      mistakeAdvice: 'By the time + V(present) → main clause: Future Perfect (will have + PP).',
      keyFormula: 'By the time S + V(present) → S + will have + PP.'
    },
    {
      id: 4004, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 4] The house _______ renovated last year looks much better now.',
      options: [
        { key: 'A', label: 'that was' },
        { key: 'B', label: 'which' },
        { key: 'C', label: 'it was' },
        { key: 'D', label: 'was being' }
      ],
      correctAnswer: 'A',
      explanation: 'We need a relative clause: "that was renovated" (reduced: "renovated"). "That was" creates a correct defining relative clause.',
      topic: 'Relative Clauses', difficulty: 'Thông hiểu', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': '"Which" alone needs a verb: "which was renovated" would be correct but not listed.', 'C': '"It was" creates a run-on sentence.', 'D': 'Missing subject — grammatically incomplete.' },
      mistakeAdvice: 'Relative clause: that/which + verb. Reduced: remove "that/which + be" → past participle.',
      keyFormula: 'Reduced relative: the house (that was) renovated = the house renovated.'
    },
    {
      id: 4005, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 5] She suggested _______ to the cinema after dinner.',
      options: [
        { key: 'A', label: 'going' },
        { key: 'B', label: 'to go' },
        { key: 'C', label: 'go' },
        { key: 'D', label: 'went' }
      ],
      correctAnswer: 'A',
      explanation: '"Suggest" is followed by a gerund (-ing) or "that-clause + should". Never "to-infinitive" directly.',
      topic: 'Verb patterns', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết',
      whyWrongMap: { 'B': '"Suggest to-inf" is incorrect in English.', 'C': 'Bare infinitive is used after modals, not "suggest".', 'D': 'Past tense is not a valid completion here.' },
      mistakeAdvice: 'Suggest + V-ing or suggest + that + S + (should) + V.',
      keyFormula: 'suggest/enjoy/mind/avoid/consider/admit + V-ing (gerund).'
    },
    {
      id: 4006, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 6] If I were you, I _______ that job offer.',
      options: [
        { key: 'A', label: "would accept" },
        { key: 'B', label: 'will accept' },
        { key: 'C', label: 'accepted' },
        { key: 'D', label: 'would have accepted' }
      ],
      correctAnswer: 'A',
      explanation: '"If I were you" = Second Conditional (unreal present/future). Main clause: would + V (bare infinitive).',
      topic: 'Conditional sentences', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết',
      whyWrongMap: { 'B': '"Will" is used in First Conditional (real possibility).', 'C': 'Past tense alone without "would" is incorrect here.', 'D': '"Would have + PP" is Third Conditional (past unreal).' },
      mistakeAdvice: 'Type 2 (unreal present): If + V-past, would + V. Type 3 (unreal past): If + had+PP, would have+PP.',
      keyFormula: 'Type 2: If S + V-ed(past), S + would + V(bare).'
    },
    {
      id: 4007, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 7] The manager asked his assistant _______ the report by Friday.',
      options: [
        { key: 'A', label: 'to complete' },
        { key: 'B', label: 'completing' },
        { key: 'C', label: 'complete' },
        { key: 'D', label: 'that she completes' }
      ],
      correctAnswer: 'A',
      explanation: '"Ask + object + to-infinitive" is the correct pattern for reported requests.',
      topic: 'Reported speech / verb patterns', difficulty: 'Thông hiểu', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': 'Gerund cannot follow an object in this pattern.', 'C': 'Bare infinitive is incorrect after ask+object.', 'D': 'Grammatically awkward in reported speech.' },
      mistakeAdvice: 'ask/tell/order/remind/advise + O + to-V (infinitive).',
      keyFormula: 'ask S to V; tell S to V; advise S to V; remind S to V.'
    },
    {
      id: 4008, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 8] Choose the sentence with CORRECT passive voice: "They are building a new hospital in our town."',
      options: [
        { key: 'A', label: 'A new hospital is being built in our town.' },
        { key: 'B', label: 'A new hospital is built in our town.' },
        { key: 'C', label: 'A new hospital was being built in our town.' },
        { key: 'D', label: 'A new hospital has been built in our town.' }
      ],
      correctAnswer: 'A',
      explanation: 'Active: "are building" (present continuous) → Passive: "is being built" (present continuous passive: am/is/are + being + PP).',
      topic: 'Passive voice', difficulty: 'Thông hiểu', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': '"Is built" = present simple passive, not continuous.', 'C': '"Was being built" = past continuous passive.', 'D': '"Has been built" = present perfect passive.' },
      mistakeAdvice: 'Present Continuous Passive: am/is/are + being + past participle.',
      keyFormula: 'Active: be + V-ing → Passive: be + being + PP.'
    },
    {
      id: 4009, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 9] Choose the word/phrase CLOSEST in meaning to "diligent" in: "She is a diligent student who always completes her work on time."',
      options: [
        { key: 'A', label: 'hardworking' },
        { key: 'B', label: 'creative' },
        { key: 'C', label: 'intelligent' },
        { key: 'D', label: 'ambitious' }
      ],
      correctAnswer: 'A',
      explanation: '"Diligent" means showing care and effort in work (= hardworking, industrious). It specifically refers to work ethic.',
      topic: 'Vocabulary - synonyms', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết',
      whyWrongMap: { 'B': 'Creative = innovative, able to create new ideas.', 'C': 'Intelligent = high mental ability.', 'D': 'Ambitious = having strong desire for success.' },
      mistakeAdvice: 'Diligent ≈ hardworking, industrious, assiduous. Focus on EFFORT, not ability.',
      keyFormula: 'Diligent = hardworking + careful + persistent.'
    },
    {
      id: 4010, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 10] Choose the OPPOSITE of "pessimistic": "He has a pessimistic view about the future."',
      options: [
        { key: 'A', label: 'optimistic' },
        { key: 'B', label: 'realistic' },
        { key: 'C', label: 'skeptical' },
        { key: 'D', label: 'indifferent' }
      ],
      correctAnswer: 'A',
      explanation: 'Pessimistic (expecting the worst) ↔ Optimistic (expecting the best). These are direct antonyms.',
      topic: 'Vocabulary - antonyms', difficulty: 'Nhận biết', errorCategory: 'Lý thuyết',
      whyWrongMap: { 'B': 'Realistic = accepting facts as they are, neither positive nor negative.', 'C': 'Skeptical = having doubts, questioning.', 'D': 'Indifferent = not caring.' },
      mistakeAdvice: 'Know common antonym pairs: pessimistic/optimistic, confident/insecure, generous/stingy.',
      keyFormula: 'pessimistic ↔ optimistic; generous ↔ stingy; courageous ↔ cowardly.'
    },
    // [Đọc hiểu - Thông hiểu/Vận dụng: 11-16]
    {
      id: 4011, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 11] Read: "Social media has revolutionized communication, allowing people worldwide to connect instantly. However, it has also led to the spread of misinformation and cyberbullying." The passage suggests that social media:',
      options: [
        { key: 'A', label: 'Has both positive and negative impacts on society' },
        { key: 'B', label: 'Should be banned to protect people' },
        { key: 'C', label: 'Only creates problems for communication' },
        { key: 'D', label: 'Is mainly used for spreading false information' }
      ],
      correctAnswer: 'A',
      explanation: 'The passage presents both a benefit ("revolutionized communication") and drawbacks ("misinformation and cyberbullying"), suggesting a balanced view.',
      topic: 'Reading comprehension - main idea', difficulty: 'Thông hiểu', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': 'The passage does not suggest banning social media.', 'C': 'The passage explicitly mentions a positive impact first.', 'D': 'Spreading false info is mentioned as one of the negatives, not the main purpose.' },
      mistakeAdvice: 'Main idea questions: look for what the WHOLE passage is about, not just one sentence.',
      keyFormula: 'Both positive ("however" keyword) and negative → balanced view.'
    },
    {
      id: 4012, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 12] Read: "The Amazon rainforest, often called the lungs of the Earth, produces 20% of the world\'s oxygen. Deforestation threatens this vital ecosystem, leading to climate change and biodiversity loss." The word "vital" is closest in meaning to:',
      options: [
        { key: 'A', label: 'essential' },
        { key: 'B', label: 'dangerous' },
        { key: 'C', label: 'fragile' },
        { key: 'D', label: 'ancient' }
      ],
      correctAnswer: 'A',
      explanation: '"Vital" means absolutely necessary or essential for life. The context (lungs of Earth, produces oxygen) confirms its importance.',
      topic: 'Reading - vocabulary in context', difficulty: 'Thông hiểu', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': 'The ecosystem is threatened, not dangerous itself.', 'C': 'Fragile (delicate) might apply but "vital" specifically means essential.', 'D': 'Age is not mentioned in the context.' },
      mistakeAdvice: 'For vocabulary-in-context questions, use surrounding clues to determine meaning.',
      keyFormula: 'Vital = essential, crucial, necessary (for life or success).'
    },
    {
      id: 4013, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 13] Choose the correct sentence with REPORTED SPEECH: Direct: She said, "I have never been to Paris."',
      options: [
        { key: 'A', label: 'She said that she had never been to Paris.' },
        { key: 'B', label: 'She said that she has never been to Paris.' },
        { key: 'C', label: 'She said that she never went to Paris.' },
        { key: 'D', label: 'She said that she would never be to Paris.' }
      ],
      correctAnswer: 'A',
      explanation: 'Present Perfect (have been) in direct speech → Past Perfect (had been) in reported speech. "Never" stays the same.',
      topic: 'Reported speech - tense shift', difficulty: 'Vận dụng', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': 'Present perfect does not shift back — must become past perfect.', 'C': 'Simple past is not the correct backshift of present perfect.', 'D': '"Would be to" is grammatically incorrect here.' },
      mistakeAdvice: 'Tense backshift: am/is/are→was/were; has/have→had; will→would; can→could.',
      keyFormula: 'Present Perfect → Past Perfect in reported speech.'
    },
    {
      id: 4014, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 14] Read the conversation: A: "Would you mind if I opened the window?" B: "_______ , it\'s quite warm in here." Choose the BEST response:',
      options: [
        { key: 'A', label: "Not at all, go ahead." },
        { key: 'B', label: 'Yes, please do.' },
        { key: 'C', label: "I'd rather you didn't." },
        { key: 'D', label: 'Of course not, I mind.' }
      ],
      correctAnswer: 'A',
      explanation: '"Would you mind if I..." → If you AGREE: "Not at all" / "Of course not" (= I don\'t mind). The hint "it\'s quite warm" suggests agreement to open the window.',
      topic: 'Communicative language', difficulty: 'Vận dụng', errorCategory: 'Phương pháp',
      whyWrongMap: { 'B': '"Yes, please do" is grammatically odd as a response to "would you mind".', 'C': '"I\'d rather you didn\'t" means you prefer they NOT open the window — contradicts the warm weather context.', 'D': '"Of course not, I mind" is self-contradictory.' },
      mistakeAdvice: 'Would you mind + V-ing? → Not at all (agree) / I\'d rather you didn\'t (disagree).',
      keyFormula: 'Would you mind...? → Not at all = permission GIVEN; I\'d rather you didn\'t = REFUSED.'
    },
    {
      id: 4015, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 15] Choose the INCORRECT sentence:',
      options: [
        { key: 'A', label: 'Despite being tired, he continued working.' },
        { key: 'B', label: 'Despite he was tired, he continued working.' },
        { key: 'C', label: 'Although he was tired, he continued working.' },
        { key: 'D', label: 'In spite of his tiredness, he continued working.' }
      ],
      correctAnswer: 'B',
      explanation: '"Despite" and "in spite of" must be followed by a noun/gerund, NOT a clause (not "despite + subject + verb"). Use "although" for clauses.',
      topic: 'Connectives - despite/although', difficulty: 'Vận dụng', errorCategory: 'Bẫy đề thi',
      whyWrongMap: { 'A': 'Correct: despite + V-ing.', 'C': 'Correct: although + clause.', 'D': 'Correct: in spite of + noun phrase.' },
      mistakeAdvice: 'Despite/In spite of + noun/gerund. Although/Even though + clause (S+V).',
      keyFormula: 'Despite + N/V-ing vs Although + S + V (never "despite + S + V").'
    },
    {
      id: 4016, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 16] Read: "Renewable energy sources such as solar and wind power are becoming increasingly important. Unlike fossil fuels, they do not produce greenhouse gases." What is the author\'s PURPOSE in this passage?',
      options: [
        { key: 'A', label: 'To argue that renewable energy is superior to fossil fuels' },
        { key: 'B', label: 'To explain what renewable energy sources are and their advantage' },
        { key: 'C', label: 'To criticize the use of fossil fuels worldwide' },
        { key: 'D', label: 'To predict the future of the energy industry' }
      ],
      correctAnswer: 'B',
      explanation: 'The passage defines renewable energy (solar, wind) and states one key advantage (no greenhouse gases). The purpose is informational/explanatory, not argumentative.',
      topic: 'Reading - author\'s purpose', difficulty: 'Vận dụng', errorCategory: 'Phương pháp',
      whyWrongMap: { 'A': 'The author informs, not argues. No strong persuasive language.', 'C': 'Fossil fuels are only mentioned in comparison, not criticized.', 'D': 'No predictions are made in the passage.' },
      mistakeAdvice: 'Author\'s purpose: inform (factual, neutral) vs persuade (opinion, strong language) vs entertain (story).',
      keyFormula: 'Inform = facts + neutral language. Persuade = opinions + emotional/strong words.'
    },
    // [Vận dụng cao: 17-18]
    {
      id: 4017, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 17] Choose the sentence that BEST combines: "The project was delayed. The funding was insufficient." ',
      options: [
        { key: 'A', label: 'The project was delayed due to insufficient funding.' },
        { key: 'B', label: 'The project was delayed because the funding was insufficient.' },
        { key: 'C', label: 'Both A and B are correct but use different connectors.' },
        { key: 'D', label: 'The project was delayed, so the funding was insufficient.' }
      ],
      correctAnswer: 'C',
      explanation: 'Both A (due to + noun phrase) and B (because + clause) correctly express cause-effect. A is more formal/concise. D incorrectly reverses the cause-effect.',
      topic: 'Sentence combining', difficulty: 'Vận dụng cao', errorCategory: 'Bẫy đề thi',
      whyWrongMap: { 'A': 'Correct but not the only correct answer.', 'B': 'Correct but not the only correct answer.', 'D': '"So" shows effect, not cause — reverses the logic.' },
      mistakeAdvice: 'due to + noun; because + clause; because of + noun. "So" = result connector.',
      keyFormula: 'Cause: because + clause = because of/due to + noun/noun phrase.'
    },
    {
      id: 4018, part: 'I', type: 'multiple_choice',
      text: '[Phần I - Câu 18] Read: "Globalization has interconnected economies worldwide, creating both opportunities and challenges. While it enables companies to access global markets, it can also lead to job displacement in developed countries as manufacturing shifts to lower-wage nations." Which inference is BEST supported?',
      options: [
        { key: 'A', label: 'Globalization creates winners and losers depending on the country and sector' },
        { key: 'B', label: 'Developing countries always benefit from globalization' },
        { key: 'C', label: 'Globalization should be stopped to protect workers' },
        { key: 'D', label: 'Companies in developed countries always succeed in global markets' }
      ],
      correctAnswer: 'A',
      explanation: 'The passage explicitly shows dual effects: opportunities (access to global markets) and challenges (job displacement). This supports the inference that outcomes vary.',
      topic: 'Reading - inference', difficulty: 'Vận dụng cao', errorCategory: 'Bẫy đề thi',
      whyWrongMap: { 'B': '"Always benefit" is too absolute; the passage shows mixed effects.', 'C': 'The passage does not advocate stopping globalization.', 'D': '"Always succeed" is too absolute and unsupported by the text.' },
      mistakeAdvice: 'Inference questions: the answer must be LOGICALLY SUPPORTED by the text, not assumed.',
      keyFormula: 'Inference = not directly stated but logically follows from the text evidence.'
    },

    // ── PHẦN II: 4 CÂU ĐÚNG/SAI ──────────────────────────────────────────
    {
      id: 4019, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 1] Read: "Electric vehicles (EVs) are gaining popularity as an eco-friendly alternative to petrol cars. They produce zero emissions during operation, though their batteries require rare minerals to manufacture." Determine True/False:',
      trueFalseItems: [
        { id: 'a', text: 'EVs produce no exhaust emissions while being driven', correctAnswer: true },
        { id: 'b', text: 'EVs are completely environmentally friendly in all aspects', correctAnswer: false },
        { id: 'c', text: 'The batteries of EVs require special materials to make', correctAnswer: true },
        { id: 'd', text: 'The passage suggests EVs are more popular than petrol cars currently', correctAnswer: false }
      ],
      explanation: 'b: False — manufacturing batteries uses rare minerals, which has environmental impact. d: False — "gaining popularity" means increasing, not more popular YET.',
      topic: 'Reading - True/False/Not Given', difficulty: 'Vận dụng'
    },
    {
      id: 4020, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 2] Grammar: Identify True or False for each statement about English grammar:',
      trueFalseItems: [
        { id: 'a', text: '"The news are shocking" is grammatically correct', correctAnswer: false },
        { id: 'b', text: 'After "to" as a preposition, we use V-ing (e.g., "I look forward to seeing you")', correctAnswer: true },
        { id: 'c', text: '"Neither of the students was absent" uses correct subject-verb agreement', correctAnswer: true },
        { id: 'd', text: 'The sentence "She has gone to the market. She is still there." can be rewritten as "She has been to the market"', correctAnswer: false }
      ],
      explanation: 'a: False — "news" is uncountable → singular verb "is". d: False — "has been to" = visited and returned; "has gone to" = still there. These have different meanings.',
      topic: 'Grammar - True/False', difficulty: 'Vận dụng cao'
    },
    {
      id: 4021, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 3] Read the job advertisement: "WANTED: Experienced marketing manager. Requirements: 5+ years experience, fluent English, strong communication skills. Benefits: competitive salary, health insurance, annual bonus." Determine True/False:',
      trueFalseItems: [
        { id: 'a', text: 'The job requires at least five years of relevant experience', correctAnswer: true },
        { id: 'b', text: 'Speaking Chinese is listed as a requirement', correctAnswer: false },
        { id: 'c', text: 'The position offers some form of medical coverage', correctAnswer: true },
        { id: 'd', text: 'The salary is higher than the industry average', correctAnswer: false }
      ],
      explanation: 'b: False — "fluent English" is required, not Chinese. d: "Competitive salary" means comparable to market, not necessarily higher.',
      topic: 'Functional reading', difficulty: 'Thông hiểu'
    },
    {
      id: 4022, part: 'II', type: 'true_false',
      text: '[Phần II - Câu 4] Vocabulary and word formation - Determine True/False:',
      trueFalseItems: [
        { id: 'a', text: 'The prefix "mis-" in "misunderstand" means wrongly or incorrectly', correctAnswer: true },
        { id: 'b', text: '"Unhappy" and "displeased" are synonyms expressing dissatisfaction', correctAnswer: true },
        { id: 'c', text: 'The suffix "-tion" always converts a verb to a noun (e.g., educate → education)', correctAnswer: false },
        { id: 'd', text: '"Economical" and "economic" have exactly the same meaning', correctAnswer: false }
      ],
      explanation: 'c: False — "-tion" usually does, but not ALWAYS (e.g., "fashion" is not derived this way). d: False — "economic" relates to economy; "economical" means cost-effective/thrifty.',
      topic: 'Word formation', difficulty: 'Vận dụng cao'
    },

    // ── PHẦN III: 6 CÂU TRẢ LỜI NGẮN ────────────────────────────────────
    {
      id: 4023, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 1] Write the correct VERB FORM: "By 2030, scientists hope to (find) _______ a cure for Alzheimer\'s disease." (Use future perfect)',
      shortAnswerCorrect: 'have found',
      topic: 'Future Perfect', difficulty: 'Thông hiểu',
      explanation: 'By 2030 (future time marker) + Future Perfect = will have found. Since "hope to" is already there, the bare form is "have found".'
    },
    {
      id: 4024, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 2] Rewrite to use REPORTED SPEECH: He said, "I will call you tomorrow." → He said that he _______ me the next day. (Fill in the blank)',
      shortAnswerCorrect: 'would call',
      topic: 'Reported speech', difficulty: 'Thông hiểu',
      explanation: '"Will" → "would"; "tomorrow" → "the next day" in reported speech backshift.'
    },
    {
      id: 4025, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 3] Give the correct WORD FORM: "The government needs to take _______ action to address climate change." (DECIDE)',
      shortAnswerCorrect: 'decisive',
      topic: 'Word formation', difficulty: 'Vận dụng',
      explanation: '"Decisive" (adjective from decide) = showing clear decision. "Decisive action" = firm, clear action.'
    },
    {
      id: 4026, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 4] Complete with a suitable PREPOSITION: "She is very good _______ playing chess." ',
      shortAnswerCorrect: 'at',
      topic: 'Prepositions', difficulty: 'Nhận biết',
      explanation: '"Good at" + noun/V-ing = skilled in. "Good at playing chess" is the correct collocation.'
    },
    {
      id: 4027, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 5] Identify the ERROR and write the CORRECT word: "She has studied English since three years." (Write only the incorrect word/phrase and its correction, e.g.: "since→for")',
      shortAnswerCorrect: 'since→for',
      topic: 'Error identification', difficulty: 'Vận dụng',
      explanation: '"Since" is used with a point in time (since 2020). "For" is used with a duration (for three years).'
    },
    {
      id: 4028, part: 'III', type: 'short_answer',
      text: '[Phần III - Câu 6] Complete the sentence with the correct PHRASAL VERB meaning "to cancel": "The meeting was _______ because of the storm. " (Use "call" + preposition)',
      shortAnswerCorrect: 'called off',
      topic: 'Phrasal verbs', difficulty: 'Vận dụng',
      explanation: '"Call off" = to cancel an event. Other meanings: "call on" = visit/ask; "call back" = return a call; "call for" = require.'
    }
  ]
};
