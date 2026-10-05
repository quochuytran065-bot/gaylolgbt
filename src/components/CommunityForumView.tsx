import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Send,
  Plus,
  ThumbsUp,
  CheckCircle2,
  Filter,
  Search,
  Bot,
  GraduationCap,
  HelpCircle,
  Clock,
  Share2
} from 'lucide-react';
import { ForumPost, ForumReply, Subject } from '../types';
import { INITIAL_FORUM_POSTS } from '../data/learningPlatformData';

interface CommunityForumViewProps {
  currentUserName?: string;
}

const SUBJECT_LIST: Subject[] = [
  'Tất cả môn',
  'Toán học',
  'Vật lý',
  'Hóa học',
  'Tiếng Anh',
  'Ngữ văn',
  'Sinh học',
  'Lịch sử',
  'Địa lí',
];

export const CommunityForumView: React.FC<CommunityForumViewProps> = ({
  currentUserName = 'Học Viên EduViet'
}) => {
  const [posts, setPosts] = useState<ForumPost[]>(() => {
    try {
      const saved = localStorage.getItem('eduviet_forum_posts');
      if (saved) return JSON.parse(saved) as ForumPost[];
    } catch { /* noop */ }
    return INITIAL_FORUM_POSTS;
  });

  const [selectedSubject, setSelectedSubject] = useState<Subject>('Tất cả môn');
  const [search, setSearch] = useState('');
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);

  // New post form
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSubject, setNewSubject] = useState<Subject>('Toán học');

  // Reply inputs: postId -> reply text
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  const savePosts = (updated: ForumPost[]) => {
    setPosts(updated);
    try {
      localStorage.setItem('eduviet_forum_posts', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const handleLikePost = (postId: string) => {
    const updated = posts.map(p =>
      p.id === postId ? { ...p, likesCount: p.likesCount + 1 } : p
    );
    savePosts(updated);
  };

  const handleAddReply = (postId: string) => {
    const text = replyInputs[postId]?.trim();
    if (!text) return;

    const newReply: ForumReply = {
      id: `rep-${Date.now()}`,
      authorName: currentUserName,
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      authorRole: 'student',
      content: text,
      createdAt: new Date().toISOString(),
      likesCount: 0,
    };

    const updated = posts.map(p =>
      p.id === postId
        ? { ...p, repliesCount: p.repliesCount + 1, replies: [...p.replies, newReply] }
        : p
    );

    savePosts(updated);
    setReplyInputs(prev => ({ ...prev, [postId]: '' }));
  };

  // AI Tutor instant response
  const handleAskAITutor = (post: ForumPost) => {
    const aiReply: ForumReply = {
      id: `ai-rep-${Date.now()}`,
      authorName: 'EduViet AI Gia Sư 24/7',
      authorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      authorRole: 'ai_tutor',
      content: `[Phân tích tự động của AI Tutor cho câu hỏi môn ${post.subject}]:\n• Bản chất vấn đề: Câu hỏi này thuộc dạng bài trọng tâm thường xuất hiện trong đề thi tốt nghiệp THPT Quốc gia.\n• Hướng dẫn giải chi tiết: Bạn cần bám sát phương pháp quy nạp hoặc khai triển công thức cơ bản, chú ý kiểm tra điều kiện xác định và dấu của các hệ số.\n• Mẹo thi cử: Đừng quên kiểm tra lại kết quả bằng việc thay số đặc biệt hoặc máy tính cầm tay để tránh bẫy đề thi nhé!`,
      createdAt: new Date().toISOString(),
      likesCount: 12,
    };

    const updated = posts.map(p =>
      p.id === post.id
        ? { ...p, isSolved: true, repliesCount: p.repliesCount + 1, replies: [...p.replies, aiReply] }
        : p
    );

    savePosts(updated);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      authorId: 'user-current',
      authorName: currentUserName,
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      subject: newSubject,
      grade: 'Lớp 12',
      title: newTitle.trim(),
      content: newContent.trim(),
      createdAt: new Date().toISOString(),
      likesCount: 1,
      repliesCount: 0,
      isSolved: false,
      replies: [],
    };

    savePosts([newPost, ...posts]);
    setIsNewPostOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  // Filtered posts
  const filteredPosts = posts.filter(p => {
    const matchSubject = selectedSubject === 'Tất cả môn' || p.subject === selectedSubject;
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase());
    return matchSubject && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* ── Top Header Banner ─────────────────────────────────── */}
      <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-sky-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>DIỄN ĐÀN HỎI ĐÁP & HỖ TRỢ TRỰC TUYẾN 24/7</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading leading-tight">
                Hỏi Đáp Bài Tập & AI Gia Sư
              </h1>
              <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed max-w-2xl mt-1">
                Gặp câu hỏi khó trong đề thi thử hay bài tập trên lớp? Đăng câu hỏi để được các thầy cô, bạn học cùng trợ lý AI Gia Sư EduViet giải đáp chi tiết từng bước 24/7.
              </p>
            </div>

            <button
              onClick={() => setIsNewPostOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Đặt Câu Hỏi Mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Filters & Search ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-400 dark:text-slate-500 font-medium shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-sky-600" /> Môn:
          </span>
          {SUBJECT_LIST.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap font-medium ${
                selectedSubject === s
                  ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-bold border border-sky-300 dark:border-sky-800'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700/60'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm câu hỏi thảo luận..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* ── Posts Stream ──────────────────────────────────────── */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs space-y-4 transition-all"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img src={post.authorAvatar} alt={post.authorName} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{post.authorName}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="font-semibold text-sky-600">{post.subject}</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>

              {post.isSolved && (
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đã có lời giải
                </span>
              )}
            </div>

            {/* Post Title & Content */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-heading leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {/* Post Actions: Like, AI Ask */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Hữu ích ({post.likesCount})</span>
                </button>

                <button
                  onClick={() => handleAskAITutor(post)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold cursor-pointer transition-all shadow-xs"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Nhờ AI Gia Sư Giải Ngay</span>
                </button>
              </div>

              <span className="text-slate-400 text-xs flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" /> {post.repliesCount} câu trả lời
              </span>
            </div>

            {/* Replies Thread */}
            {post.replies.length > 0 && (
              <div className="space-y-3 pt-2 pl-4 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-700">
                {post.replies.map(rep => (
                  <div
                    key={rep.id}
                    className={`p-4 rounded-2xl border text-xs space-y-1.5 leading-relaxed ${
                      rep.authorRole === 'ai_tutor'
                        ? 'bg-purple-50/70 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/60'
                        : rep.authorRole === 'teacher'
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60'
                        : 'bg-slate-50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={rep.authorAvatar} alt={rep.authorName} className="w-6 h-6 rounded-full object-cover" />
                        <span className="font-bold text-slate-900 dark:text-slate-100">{rep.authorName}</span>
                        {rep.authorRole === 'ai_tutor' && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-purple-200 text-purple-900">AI TUTOR</span>
                        )}
                        {rep.authorRole === 'teacher' && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-200 text-emerald-900">GIÁO VIÊN</span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(rep.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line pl-8">
                      {rep.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Reply Box */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={replyInputs[post.id] || ''}
                onChange={(e) => setReplyInputs({ ...replyInputs, [post.id]: e.target.value })}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddReply(post.id); }}
                placeholder="Viết câu trả lời hoặc trao đổi thêm..."
                className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              />
              <button
                onClick={() => handleAddReply(post.id)}
                className="p-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white cursor-pointer transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ── Modal Đặt Câu Hỏi Mới ─────────────────────────────── */}
      {isNewPostOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-sky-600" />
                Đặt Câu Hỏi Mới Lên Diễn Đàn
              </h3>
              <button
                onClick={() => setIsNewPostOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  Môn học
                </label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value as Subject)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  {SUBJECT_LIST.filter(s => s !== 'Tất cả môn').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  Tiêu đề câu hỏi tóm tắt *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="VD: Cách giải phương trình logarit chứa tham số m?"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  Nội dung chi tiết câu hỏi / Đề bài *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Ghi rõ đề bài, các phương án A/B/C/D hoặc chỗ bạn đang gặp khó khăn..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewPostOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold cursor-pointer transition-all shadow-sm"
                >
                  Đăng câu hỏi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
