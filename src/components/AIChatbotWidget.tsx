import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `Bạn là trợ lý AI thông minh của nền tảng TEST360/EduViet - hệ thống khảo thí và luyện thi THPT hàng đầu Việt Nam. 
Bạn hỗ trợ học sinh:
- Giải thích đáp án và hướng dẫn bài toán
- Gợi ý chiến lược ôn thi hiệu quả
- Giải đáp thắc mắc về môn Toán, Lý, Hóa, Sinh, Tiếng Anh, Ngữ văn
- Hỗ trợ hiểu cấu trúc đề thi BGD 2025-2026 (3 phần: Trắc nghiệm 4 phương án, Đúng/Sai, Điền số)
- Tư vấn lộ trình ôn thi THPT Quốc gia và ĐGNL

Trả lời ngắn gọn, rõ ràng, dễ hiểu. Dùng emoji phù hợp để sinh động hơn. Ưu tiên trả lời bằng tiếng Việt.`;

const QUICK_QUESTIONS = [
  '📐 Cách làm bài Toán phần III nhanh nhất?',
  '⚡ Chiến lược ôn thi cuối kỳ trong 1 tuần',
  '🎯 Phân tích cấu trúc đề thi BGD 2025',
  '🧪 Bẫy thường gặp trong đề Hóa học',
];

export const AIChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 Xin chào! Tôi là **AI Trợ Lý TEST360**. Tôi có thể giúp bạn:\n\n• 🧠 Giải thích kiến thức và bài toán\n• 📋 Phân tích cấu trúc đề thi BGD 2025\n• 📈 Tư vấn lộ trình ôn tập\n\nBạn cần hỗ trợ gì hôm nay?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      let reply: string;

      if (apiKey) {
        const conversationHistory = messages
          .filter(m => m.id !== 'welcome')
          .map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          }));

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
                { role: 'model', parts: [{ text: 'Được, tôi sẽ hỗ trợ học sinh theo hướng dẫn đó.' }] },
                ...conversationHistory,
                { role: 'user', parts: [{ text: content }] },
              ],
            }),
          }
        );
        const data = await res.json();
        reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Xin lỗi, tôi không thể trả lời lúc này. Hãy thử lại!';
      } else {
        // Intelligent educational assistant fallback
        await new Promise(r => setTimeout(r, 500));
        const lower = content.toLowerCase();
        if (lower.includes('phần iii') || lower.includes('toán') || lower.includes('điền số')) {
          reply = '📐 **Chiến lược làm bài Toán phần III (Trả lời ngắn):**\n\n1. **Đọc kỹ đơn vị**: Đề hay bẫy về $km/h$ vs $m/s$, rad vs độ.\n2. **Quy tắc làm tròn**: Đề yêu cầu làm tròn đến hàng phần mười hay phần trăm thì tuyệt đối tuân thủ.\n3. **Thử lại nghiệm**: Luôn thay ngược kết quả vào đề bài để loại trừ nghiệm ngoại lai.';
        } else if (lower.includes('chiến lược') || lower.includes('ôn thi') || lower.includes('1 tuần')) {
          reply = '⚡ **Kế hoạch ôn thi nước rút trong 7 ngày:**\n\n• **Ngày 1-2**: Rà soát sổ tay công thức, làm lại 10 câu hay sai nhất.\n• **Ngày 3-4**: Thi thử 2 đề bấm giờ chuẩn 50 phút tại TEST360.\n• **Ngày 5-6**: Phân tích lỗi sai ở phần Đúng/Sai và Điền số.\n• **Ngày 7**: Giữ tinh thần thoải mái, ngủ đủ 8 tiếng, chuẩn bị dụng cụ thi!';
        } else if (lower.includes('cấu trúc') || lower.includes('bgd') || lower.includes('2025')) {
          reply = '🎯 **Cấu trúc đề thi tốt nghiệp THPT theo Bộ GD&ĐT:**\n\n• **Phần I**: Trắc nghiệm 4 lựa chọn quen thuộc (0.25đ/câu).\n• **Phần II**: Trắc nghiệm Đúng/Sai (tối đa 1.0đ cho câu đủ 4 ý đúng - phân hóa cao độ).\n• **Phần III**: Câu hỏi trả lời ngắn/điền số (đòi hỏi tự giải quyết mà không có đáp án mồi).';
        } else if (lower.includes('hóa') || lower.includes('bẫy')) {
          reply = '🧪 **Các bẫy phổ biến trong đề Hóa học:**\n\n• Nhầm lẫn giữa tính chất oxi hóa và tính chất khử.\n• Quên tính toán lượng chất dư trong phản ứng este hóa/thủy phân.\n• Điều kiện nhiệt độ và xúc tác trong phương trình điện phân dung dịch.';
        } else {
          reply = `💡 **AI TEST360 đã ghi nhận câu hỏi:** "${content}"\n\nĐể đạt điểm tối đa dạng này:\n• Nắm vững lý thuyết cốt lõi trong mục **Tài liệu**.\n• Luyện tập thêm dạng bài tương ứng ở mục **Đề thi**.\n• Lưu công thức vào **Sổ tay ghi nhớ** để ôn luyện bằng Flashcards nhé!`;
        }
      }

      const assistantMsg: Message = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      const errMsg: Message = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: '💡 **Mẹo:** Bạn có thể tham khảo mục **Sổ tay ghi nhớ** hoặc làm thử một bài thi ngắn ở mục **Đề thi** để củng cố kiến thức nhé!',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: '👋 Xin chào! Tôi là **AI Trợ Lý TEST360**. Bạn cần hỗ trợ gì hôm nay?',
      timestamp: new Date(),
    }]);
  };

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: boldText }} />
          {i < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-20 right-4 z-[9990] w-[calc(100vw-2rem)] sm:w-96 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300 overflow-hidden ${
            isMinimized ? 'h-14' : 'h-[560px] sm:h-[600px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white">AI Trợ Lý TEST360</p>
              <p className="text-[10px] text-violet-200">Powered by Gemini 2.0</p>
            </div>
            <button
              onClick={resetChat}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              title="Làm mới hội thoại"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsMinimized(p => !p)}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              title={isMinimized ? 'Mở rộng' : 'Thu nhỏ'}
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              title="Đóng"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 hide-scrollbar">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-sky-600 text-white rounded-br-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {renderContent(msg.content)}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-xl bg-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick questions */}
              {messages.length <= 1 && (
                <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                  {QUICK_QUESTIONS.map(q => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-[10px] font-medium px-2.5 py-1.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-950/70 transition-colors cursor-pointer text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-3 pb-3 shrink-0 border-t border-slate-100 dark:border-slate-800 pt-2.5">
                <div className="flex items-end gap-2 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:border-violet-400 dark:focus-within:border-violet-600 transition-colors px-3 py-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập câu hỏi... (Enter để gửi)"
                    rows={1}
                    className="flex-1 bg-transparent text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 outline-none resize-none max-h-24 leading-relaxed"
                    style={{ minHeight: '20px' }}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="w-8 h-8 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all cursor-pointer shrink-0 hover:scale-105 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => { setIsOpen(p => !p); setIsMinimized(false); }}
        className={`fixed bottom-4 right-4 z-[9990] w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 ${
          isOpen
            ? 'bg-slate-700 dark:bg-slate-600 text-white'
            : 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-violet-500/30'
        }`}
        title={isOpen ? 'Đóng AI Chat' : 'Mở AI Trợ Lý TEST360'}
        aria-label="AI Chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </span>
          </>
        )}
      </button>
    </>
  );
};
