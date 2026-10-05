---
name: eduviet-web-expert
description: "Expert knowledge of the EduViet project. Use for any task involving the EduViet web app (React + Vite + TypeScript + Tailwind CSS). Provides context about architecture, components, data models, and Vietnamese education domain."
---

# EduViet Web App Expert

## Project Overview
EduViet is a Vietnamese online learning & exam platform built with:
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **Auth**: Custom AuthContext (local state, no backend)
- **Dev server**: `node .\node_modules\vite\bin\vite.js --port 3000`

## Architecture

```
src/
├── App.tsx              # Root – AuthProvider wraps MainApp
├── components/
│   ├── HomeView.tsx     # Landing page with hero, stats, featured content
│   ├── DocumentList.tsx # Browse & filter documents
│   ├── ExamView.tsx     # Take timed multiple-choice exams
│   ├── ExamResult.tsx   # Score & explanations after exam
│   ├── DocumentViewerModal.tsx  # In-app document reader
│   ├── UserHistoryModal.tsx     # Past exam results
│   ├── AuthModal.tsx    # Login/register modal
│   ├── Navbar.tsx       # Top navigation
│   └── Footer.tsx       # Footer with links
├── context/
│   └── AuthContext.tsx  # useAuth hook, openAuthModal()
├── data/
│   └── mockData.ts      # INITIAL_DOCUMENTS, INITIAL_EXAMS, image paths
└── types/               # TypeScript interfaces
```

## Key Data Types
- `DocumentItem`: id, title, subject, grade, fileType, directContent{sections, formulasOrNotes}
- `Exam`: id, questions[]{text, options[{key,label}], correctAnswer, explanation}
- `Subject`: 'Tất cả môn' | 'Toán học' | 'Tiếng Anh' | 'Vật lý' | 'Hóa học' | 'Ngữ văn' | 'Lịch sử'
- `GradeLevel`: 'Tất cả lớp' | 'Lớp 10' | 'Lớp 11' | 'Lớp 12' | 'Đại học'

## Domain Knowledge (Vietnamese Education)
- **THPT**: Trung học phổ thông (High school, grades 10-12)
- **Tốt nghiệp THPT**: National high school graduation exam
- **Đại học**: University
- **Môn học**: Toán (Math), Lý (Physics), Hóa (Chemistry), Anh (English), Văn (Literature), Sử (History)

## Development Rules
- All text content is in Vietnamese
- Use Tailwind classes (sky-700 = primary brand color)
- No backend – all data is in mockData.ts
- Images stored in `src/assets/images/`
- `.env` has `VITE_GEMINI_API_KEY` (if AI chat is re-enabled)

## Common Tasks
- **Add new document**: Add entry to `INITIAL_DOCUMENTS` in mockData.ts
- **Add new exam**: Add entry to `INITIAL_EXAMS` with `questions[]` array
- **Add new subject/grade**: Update `SUBJECT_OPTIONS`/`GRADE_OPTIONS` in DocumentList.tsx and ExamView.tsx
- **Change primary color**: Replace `sky-700` → new color across components
