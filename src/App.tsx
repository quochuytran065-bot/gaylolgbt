import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar, AppTab } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { DocumentList } from './components/DocumentList';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { ExamList } from './components/ExamList';
import { ExamTakingView } from './components/ExamTakingView';
import { ExamResultView } from './components/ExamResultView';
import { AnalyticsAimDashboard } from './components/AnalyticsAimDashboard';
import { CoursesView } from './components/CoursesView';
import { GamificationArenaView } from './components/GamificationArenaView';
import { SmartNotebookView } from './components/SmartNotebookView';
import { FocusStudyRoomView } from './components/FocusStudyRoomView';
import { CommunityForumView } from './components/CommunityForumView';
import { UserHistoryModal } from './components/UserHistoryModal';
import { AuthModal } from './components/AuthModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';
import { DocumentItem, Exam, ExamResult, Question, StudyGoal, Subject, GradeLevel } from './types';
import { DEFAULT_STUDY_GOAL, INITIAL_DOCUMENTS, INITIAL_EXAMS } from './data/mockData';
import { generateUniqueBGDExam } from './services/bgdExamGenerator';

function MainApp() {
  const { saveExamResult, getResultsForExam, currentUser } = useAuth();

  // Dark mode state — persisted in localStorage, applied to <html>
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('eduviet_dark_mode');
      return saved === 'true';
    } catch { return false; }
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    try {
      localStorage.setItem('eduviet_dark_mode', String(isDarkMode));
    } catch { /* noop */ }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // App navigation state
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  
  // Active document modal
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);

  // Active exam session
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  
  // Active exam result for review
  const [activeResult, setActiveResult] = useState<ExamResult | null>(null);

  // User history modal state
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Admin management modal state (strictly accessible by Admin)
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Central Study Goal state (defaulted to 2027-11-12, synchronized with Admin & Dashboard)
  const [studyGoal, setStudyGoal] = useState<StudyGoal>(() => {
    try {
      const saved = localStorage.getItem('eduviet_study_goal');
      if (saved) {
        const parsed: StudyGoal = JSON.parse(saved);
        // If saved date is in the past, or old 2027-06-25 date, migrate to 2027-11-12
        if (new Date(parsed.targetDate).getTime() < Date.now() || parsed.targetDate.includes('2027-06-25')) {
          localStorage.setItem('eduviet_study_goal', JSON.stringify(DEFAULT_STUDY_GOAL));
          return DEFAULT_STUDY_GOAL;
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_STUDY_GOAL;
  });

  const handleUpdateGoal = (newGoal: StudyGoal) => {
    setStudyGoal(newGoal);
    try {
      localStorage.setItem('eduviet_study_goal', JSON.stringify(newGoal));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  // Documents and Exams dataset – fully mutable (admin can add/delete)
  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    try {
      const saved = localStorage.getItem('eduviet_documents');
      if (saved) return JSON.parse(saved) as DocumentItem[];
    } catch { /* noop */ }
    return INITIAL_DOCUMENTS;
  });

  const [exams, setExams] = useState<Exam[]>(() => {
    try {
      const saved = localStorage.getItem('eduviet_exams');
      if (saved) return JSON.parse(saved) as Exam[];
    } catch { /* noop */ }
    return INITIAL_EXAMS;
  });

  // Persist exams/documents to localStorage whenever they change
  useEffect(() => {
    try { localStorage.setItem('eduviet_exams', JSON.stringify(exams)); } catch { /* noop */ }
  }, [exams]);

  useEffect(() => {
    try { localStorage.setItem('eduviet_documents', JSON.stringify(documents)); } catch { /* noop */ }
  }, [documents]);

  const handleAddExam = (exam: Exam) => setExams(prev => [exam, ...prev]);
  const handleDeleteExam = (id: string) => setExams(prev => prev.filter(e => e.id !== id));
  const handleAddDocument = (doc: DocumentItem) => setDocuments(prev => [doc, ...prev]);
  const handleDeleteDocument = (id: string) => setDocuments(prev => prev.filter(d => d.id !== id));

  // Handlers
  const handleStartExam = (exam: Exam) => {
    setActiveExam(exam);
    setActiveResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishExam = (result: ExamResult) => {
    saveExamResult(result);
    setActiveResult(result);
    setActiveExam(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelExam = () => {
    setActiveExam(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeExam = () => {
    if (!activeResult) return;
    const examToRetake = exams.find(e => e.id === activeResult.examId);
    if (examToRetake) {
      setActiveResult(null);
      setActiveExam(examToRetake);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartRemedialExam = (wrongQuestions: Question[]) => {
    const remedialExam = generateUniqueBGDExam(
      activeResult?.subject || 'Toán học',
      activeResult?.grade || 'Lớp 12',
      wrongQuestions
    );
    handleStartExam(remedialExam);
  };

  const handleStartNewBGDExam = (subject?: Subject, grade?: GradeLevel) => {
    const newExam = generateUniqueBGDExam(
      subject || activeResult?.subject || 'Toán học',
      grade || activeResult?.grade || 'Lớp 12'
    );
    handleStartExam(newExam);
  };

  const handleViewPreviousResult = (examId: string) => {
    const results = getResultsForExam(examId);
    if (results.length > 0) {
      setActiveResult(results[0]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectHistoryResult = (result: ExamResult) => {
    setActiveResult(result);
    setIsHistoryModalOpen(false);
    setActiveExam(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user is currently taking an exam, render the full-screen testing view
  if (activeExam) {
    return (
      <ExamTakingView
        exam={activeExam}
        onFinishExam={handleFinishExam}
        onCancelExam={handleCancelExam}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col selection:bg-sky-100 selection:text-sky-900 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Primary Top Bar */}
      <Navbar
        activeTab={activeResult ? 'exams' : activeTab}
        setActiveTab={(tab) => {
          setActiveResult(null);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onOpenAdminPanel={() => setIsAdminModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 w-full">
        {/* If viewing a specific exam result */}
        {activeResult ? (
          <ExamResultView
            result={activeResult}
            onRetake={handleRetakeExam}
            onBackToList={() => {
              setActiveResult(null);
              setActiveTab('exams');
            }}
            onGoToDocuments={() => {
              setActiveResult(null);
              setActiveTab('documents');
            }}
            onStartRemedialExam={handleStartRemedialExam}
            onStartNewBGDExam={handleStartNewBGDExam}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeView
                documents={documents}
                exams={exams}
                onSelectTab={setActiveTab}
                onSelectDocument={(doc) => setSelectedDocument(doc)}
                onStartExam={handleStartExam}
              />
            )}

            {activeTab === 'courses' && (
              <CoursesView currentUserName={currentUser?.name} />
            )}

            {activeTab === 'arena' && (
              <GamificationArenaView currentUserName={currentUser?.name} />
            )}

            {activeTab === 'notebook' && (
              <SmartNotebookView
                onStartPracticeWithEntry={() => {
                  setActiveTab('exams');
                }}
              />
            )}

            {activeTab === 'focus' && (
              <FocusStudyRoomView />
            )}

            {activeTab === 'community' && (
              <CommunityForumView currentUserName={currentUser?.name} />
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6 pb-12">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-heading">
                    Kho Tài Liệu Học Tập
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Tổng hợp đề cương, sổ tay công thức, bài giảng và tài liệu PDF/Word chọn lọc theo từng môn học và khối lớp.
                  </p>
                </div>

                <DocumentList
                  documents={documents}
                  onSelectDocument={(doc) => setSelectedDocument(doc)}
                />
              </div>
            )}

            {activeTab === 'exams' && (
              <div className="space-y-6 pb-12">
                <ExamList
                  exams={exams}
                  onStartExam={handleStartExam}
                  onViewPreviousResult={handleViewPreviousResult}
                />
              </div>
            )}

            {activeTab === 'analytics' && (
              <AnalyticsAimDashboard
                exams={exams}
                onStartExam={handleStartExam}
                onSelectTab={setActiveTab}
                studyGoal={studyGoal}
                onUpdateGoal={handleUpdateGoal}
                onViewResult={(res) => {
                  setActiveResult(res);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Modals & Dialogs */}
      <DocumentViewerModal
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />

      <UserHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        onSelectResult={handleSelectHistoryResult}
      />

      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        exams={exams}
        documents={documents}
        studyGoal={studyGoal}
        onUpdateGoal={handleUpdateGoal}
        onAddExam={handleAddExam}
        onDeleteExam={handleDeleteExam}
        onAddDocument={handleAddDocument}
        onDeleteDocument={handleDeleteDocument}
      />

      <AuthModal />

      {/* Footer */}
      <Footer onSelectTab={(tab) => {
        setActiveResult(null);
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
