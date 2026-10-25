import React, { useState, useEffect } from 'react';
import { UserSession, ModuleId } from './types';
import { MODULES } from './data/dataset';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ModuleGrid } from './components/ModuleGrid';

// Import all 8 laboratory module components
import { ResearchQuestionModule } from './components/modules/ResearchQuestionModule';
import { DatasetCardModule } from './components/modules/DatasetCardModule';
import { ModelingProtocolModule } from './components/modules/ModelingProtocolModule';
import { EvaluationModule } from './components/modules/EvaluationModule';
import { ErrorBiasModule } from './components/modules/ErrorBiasModule';
import { EducationalDemoModule } from './components/modules/EducationalDemoModule';
import { ResponsibleAiModule } from './components/modules/ResponsibleAiModule';
import { SourcesModule } from './components/modules/SourcesModule';
import { LearningProgressBar } from './components/LearningProgressBar';

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  CheckCircle2,
  Database,
  BarChart2,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

export default function App() {
  const [session, setSession] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem('signal_source_auth');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 'hub' is the main dashboard with the 8 module cards.
  // When a module is chosen, currentPage becomes that specific ModuleId (a dedicated page).
  const [currentPage, setCurrentPage] = useState<'hub' | ModuleId>(() => {
    const hash = window.location.hash.replace('#/module/', '').replace('#/', '');
    const valid = MODULES.some((m) => m.id === hash);
    return valid ? (hash as ModuleId) : 'hub';
  });

  // Track visited modules for user's learning journey
  const [visitedModules, setVisitedModules] = useState<ModuleId[]>(() => {
    try {
      const saved = localStorage.getItem('signal_source_visited_modules');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Whenever user visits a module page, add it to visitedModules
  useEffect(() => {
    if (currentPage !== 'hub') {
      setVisitedModules((prev) => {
        if (!prev.includes(currentPage)) {
          const updated = [...prev, currentPage];
          try {
            localStorage.setItem('signal_source_visited_modules', JSON.stringify(updated));
          } catch {
            // ignore
          }
          return updated;
        }
        return prev;
      });
    }
  }, [currentPage]);

  const handleResetProgress = () => {
    setVisitedModules([]);
    try {
      localStorage.removeItem('signal_source_visited_modules');
    } catch {
      // ignore
    }
  };

  // Sync hash with state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/module/', '').replace('#/', '');
      const valid = MODULES.some((m) => m.id === hash);
      setCurrentPage(valid ? (hash as ModuleId) : 'hub');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = (user: UserSession) => {
    setSession(user);
    try {
      localStorage.setItem('signal_source_auth', JSON.stringify(user));
    } catch {
      // storage quota fallback
    }
  };

  const handleLogout = () => {
    setSession(null);
    try {
      localStorage.removeItem('signal_source_auth');
    } catch {
      // ignore
    }
  };

  const handleSelectModule = (id: ModuleId) => {
    setCurrentPage(id);
    window.location.hash = `#/module/${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToHub = () => {
    setCurrentPage('hub');
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user is not authenticated, show the authentication portal
  if (!session) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const activeModuleMeta = MODULES.find((m) => m.id === currentPage);
  const activeModuleIndex = MODULES.findIndex((m) => m.id === currentPage);

  const handlePrevModule = () => {
    if (activeModuleIndex > 0) {
      handleSelectModule(MODULES[activeModuleIndex - 1].id);
    }
  };

  const handleNextModule = () => {
    if (activeModuleIndex < MODULES.length - 1) {
      handleSelectModule(MODULES[activeModuleIndex + 1].id);
    }
  };

  const renderModuleComponent = (id: ModuleId) => {
    switch (id) {
      case 'research-question':
        return <ResearchQuestionModule />;
      case 'dataset-card':
        return <DatasetCardModule />;
      case 'modeling':
        return <ModelingProtocolModule />;
      case 'evaluation':
        return <EvaluationModule />;
      case 'error-bias':
        return <ErrorBiasModule />;
      case 'demo':
        return <EducationalDemoModule />;
      case 'ethics':
        return <ResponsibleAiModule />;
      case 'sources':
        return <SourcesModule />;
      default:
        return <ResearchQuestionModule />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#17263d] font-sans antialiased selection:bg-[#315fce] selection:text-white flex flex-col justify-between">
      <div>
        {/* Top Sticky Navigation */}
        <Header
          user={session}
          onLogout={handleLogout}
          currentPage={currentPage}
          onSelectModule={handleSelectModule}
          onGoToHub={handleGoToHub}
        />

        {/* PAGE 1: THE HOME MODULE HUB */}
        {currentPage === 'hub' ? (
          <main className="animate-fadeIn">
            {/* Scientific Hero Banner */}
            <HeroSection
              onExploreMethod={() => handleSelectModule('modeling')}
              onOpenChecklist={() => handleSelectModule('demo')}
            />

            {/* The 8 Module Icon Cards */}
            <ModuleGrid onSelectModule={handleSelectModule} visitedModules={visitedModules} />

            {/* Quick Laboratory Architecture Overview at Bottom of Hub */}
            <section className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#f8fafc] border border-[#e5eaf0] rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e2e8f0]">
                    <div>
                      <span className="text-[11px] font-bold text-[#168579] uppercase tracking-wider block mb-1">
                        Laboratory Architecture &amp; Methodology
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-[#17263d]">
                        LIAR NLP Benchmark Environment At A Glance
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#64748b]">
                      <span className="w-2 h-2 rounded-full bg-[#315fce]"></span>
                      <span>Verified Benchmark Pipeline</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#17263d] mb-1.5">
                        <Database className="w-4 h-4 text-[#315fce]" />
                        <span>Curated Benchmark Corpus</span>
                      </div>
                      <p className="text-xs text-[#66758a] leading-relaxed">
                        12,836 short statements collected from PolitiFact between 2007 and 2016 across 6 ordinal truthfulness categories with speaker and topic metadata.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#17263d] mb-1.5">
                        <BarChart2 className="w-4 h-4 text-[#168579]" />
                        <span>Transparent Evaluation</span>
                      </div>
                      <p className="text-xs text-[#66758a] leading-relaxed">
                        Evaluated under strict GroupKFold cross-validation preventing speaker and text duplicate leakage, with macro-averaged precision, recall, and 6×6 confusion matrices.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#17263d] mb-1.5">
                        <ShieldAlert className="w-4 h-4 text-[#a86e18]" />
                        <span>Ethical Verification Policy</span>
                      </div>
                      <p className="text-xs text-[#66758a] leading-relaxed">
                        Demonstrates why machine classification categories are not factual verdicts. Equips researchers with human-in-the-loop investigative worksheets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        ) : (
          /* PAGE 2: DEDICATED SEPARATE MODULE PAGE VIEW */
          <main className="py-8 bg-[#f8fafc] min-h-[calc(100vh-140px)] animate-fadeIn">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Learning Journey & Completion Status Bar at Top of Module Pages */}
              <LearningProgressBar
                visitedModules={visitedModules}
                activeModule={currentPage}
                onSelectModule={handleSelectModule}
                onResetProgress={handleResetProgress}
              />

              {/* Dedicated Page Header Navigation Bar */}
              <div className="bg-white border border-[#e5eaf0] rounded-2xl p-4 sm:p-5 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Back to Hub Button & Breadcrumbs */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleGoToHub}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#edf3ff] hover:bg-[#dbeafe] text-[#315fce] text-xs font-extrabold border border-[#d7e2fb] transition-all group shrink-0"
                    title="Return to Main Module Hub"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Back to All Modules</span>
                  </button>

                  <div className="h-6 w-px bg-[#e2e8f0] hidden sm:block"></div>

                  <div className="text-xs">
                    <div className="text-[10px] font-bold text-[#8a96a6] uppercase tracking-wider">
                      Module Workspace
                    </div>
                    <div className="font-extrabold text-[#17263d]">
                      Module #{activeModuleMeta?.number}: {activeModuleMeta?.title}
                    </div>
                  </div>
                </div>

                {/* Module Quick Jumper & Next/Previous Controls */}
                <div className="flex items-center gap-2 self-end md:self-auto">
                  <button
                    onClick={handlePrevModule}
                    disabled={activeModuleIndex <= 0}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#475569] bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#dce3ec] rounded-lg disabled:opacity-40 disabled:pointer-events-none transition-all"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <span className="text-xs font-mono font-bold text-[#64748b] px-1">
                    {activeModuleIndex + 1} / {MODULES.length}
                  </span>

                  <button
                    onClick={handleNextModule}
                    disabled={activeModuleIndex >= MODULES.length - 1}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#475569] bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#dce3ec] rounded-lg disabled:opacity-40 disabled:pointer-events-none transition-all"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dedicated Module Content */}
              {renderModuleComponent(currentPage)}

              {/* Dedicated Page Bottom Footer Navigation */}
              <div className="mt-8 pt-6 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold">
                {activeModuleIndex > 0 ? (
                  <button
                    onClick={handlePrevModule}
                    className="flex items-center gap-2 text-[#315fce] hover:underline"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous: Module #{MODULES[activeModuleIndex - 1].number} ({MODULES[activeModuleIndex - 1].title})</span>
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  onClick={handleGoToHub}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#f8fafc] text-[#17263d] border border-[#dce3ec] rounded-xl shadow-xs transition-all"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-[#315fce]" />
                  <span>Return to Module Hub</span>
                </button>

                {activeModuleIndex < MODULES.length - 1 ? (
                  <button
                    onClick={handleNextModule}
                    className="flex items-center gap-2 text-[#315fce] hover:underline"
                  >
                    <span>Next: Module #{MODULES[activeModuleIndex + 1].number} ({MODULES[activeModuleIndex + 1].title})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </main>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#e5eaf0] bg-white py-6 text-xs text-[#64748b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-[#17263d]">SIGNAL &amp; SOURCE</span>
            <span className="text-[#94a3b8]">·</span>
            <span>Capstone 12 NLP Laboratory</span>
            <span className="text-[#94a3b8]">·</span>
            <span className="text-[#168579] font-medium">Educational Research Platform</span>
          </div>
          <div>
            Classifying dataset labels is not the same as establishing empirical truth.
          </div>
        </div>
      </footer>
    </div>
  );
}
