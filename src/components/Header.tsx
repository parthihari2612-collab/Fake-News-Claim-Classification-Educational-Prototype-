import React from 'react';
import { UserSession, ModuleId } from '../types';
import { MODULES } from '../data/dataset';
import { LogOut, UserCheck, LayoutGrid, Home } from 'lucide-react';

interface HeaderProps {
  user: UserSession;
  onLogout: () => void;
  currentPage: 'hub' | ModuleId;
  onSelectModule: (id: ModuleId) => void;
  onGoToHub: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  currentPage,
  onSelectModule,
  onGoToHub,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e5eaf0] bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo - click returns to Hub */}
          <button
            onClick={onGoToHub}
            className="flex items-center gap-3 text-left group hover:opacity-95 transition-opacity"
            title="Return to Main Module Hub"
          >
            <div className="w-9 h-9 rounded-xl bg-[#315fce] flex items-center justify-center text-white shadow-sm shrink-0 group-hover:bg-[#244aa5] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M4 18.5V5.5h3.2l4.8 7 4.8-7H20v13h-3V10l-5 7-5-7v8.5H4Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-sm text-[#17263d]">
                  SIGNAL <span className="text-[#8a97a9] font-medium">&amp;</span> SOURCE
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold bg-[#edf3ff] text-[#315fce] px-2 py-0.5 rounded-md border border-[#d7e2fb]">
                  LAB V2.4
                </span>
              </div>
              <span className="hidden sm:block text-[11px] text-[#66758a]">
                LIAR NLP Benchmark &amp; Verification Lab
              </span>
            </div>
          </button>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              onClick={onGoToHub}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                currentPage === 'hub'
                  ? 'bg-[#17263d] text-white shadow-xs'
                  : 'text-[#58677b] hover:text-[#17263d] hover:bg-[#f1f5f9]'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Module Hub</span>
            </button>

            <span className="h-4 w-px bg-[#e2e8f0] mx-1"></span>

            {MODULES.map((mod) => {
              const isActive = currentPage === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => onSelectModule(mod.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#315fce] text-white shadow-xs font-bold'
                      : 'text-[#58677b] hover:text-[#17263d] hover:bg-[#f1f5f9]'
                  }`}
                  title={mod.subtitle}
                >
                  <span className="opacity-70 text-[10px] mr-1">#{mod.number}</span>
                  {mod.title}
                </button>
              );
            })}
          </nav>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-3">
            {currentPage !== 'hub' && (
              <button
                onClick={onGoToHub}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#315fce] bg-[#edf3ff] hover:bg-[#dbeafe] border border-[#d7e2fb] rounded-lg transition-all"
                title="Return to Main Module Hub"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All Modules</span>
              </button>
            )}

            {/* Authenticated User Info */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#e5eaf0]">
              <div className="w-7 h-7 rounded-full bg-[#e9f7f4] text-[#168579] flex items-center justify-center font-bold text-xs border border-[#bbf7d0]">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-[#17263d] leading-none truncate max-w-[120px]">
                  {user.name.split(' ')[1] || user.name}
                </div>
                <div className="text-[10px] text-[#168579] font-medium leading-tight">
                  Verified Analyst
                </div>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#b91c1c] hover:bg-[#fef2f2] border border-[#fecaca] rounded-lg transition-all"
              title="Sign out of research session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
