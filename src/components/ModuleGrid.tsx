import React from 'react';
import { ModuleId } from '../types';
import { MODULES } from '../data/dataset';
import {
  HelpCircle,
  Database,
  Cpu,
  BarChart3,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface ModuleGridProps {
  onSelectModule: (id: ModuleId) => void;
  visitedModules?: ModuleId[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  HelpCircle,
  Database,
  Cpu,
  BarChart3,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  BookOpen,
};

export const ModuleGrid: React.FC<ModuleGridProps> = ({ onSelectModule, visitedModules = [] }) => {
  return (
    <section className="py-10 bg-[#f8fafc] border-b border-[#e5eaf0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="text-[11px] font-extrabold text-[#315fce] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#168579]"></span>
              <span>Research Modules Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17263d] tracking-tight">
              Select a Laboratory Module
            </h2>
            <p className="text-xs sm:text-sm text-[#66758a] mt-1.5 max-w-2xl leading-relaxed">
              Click any module icon below to open its dedicated page. Each module features its own focused workspace, interactive dataset queries, and diagnostic tools.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-xs font-semibold text-[#168579] bg-[#e9f7f4] px-3.5 py-1.5 rounded-xl border border-[#bbf7d0] inline-flex items-center gap-2 self-start">
            <span className="w-2 h-2 rounded-full bg-[#168579]"></span>
            <span>{visitedModules.length} of {MODULES.length} Modules Explored</span>
          </div>
        </div>

        {/* 8 Module Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MODULES.map((mod) => {
            const Icon = ICON_MAP[mod.iconName] || HelpCircle;
            const isVisited = visitedModules.includes(mod.id);

            const accentStyles = {
              blue: {
                bg: 'bg-[#edf3ff]',
                text: 'text-[#315fce]',
                hoverBorder: 'hover:border-[#315fce] hover:shadow-[0_14px_35px_rgba(49,95,206,0.12)]',
                badge: 'bg-[#edf3ff] text-[#315fce]',
              },
              teal: {
                bg: 'bg-[#e9f7f4]',
                text: 'text-[#168579]',
                hoverBorder: 'hover:border-[#168579] hover:shadow-[0_14px_35px_rgba(22,133,121,0.12)]',
                badge: 'bg-[#e9f7f4] text-[#168579]',
              },
              amber: {
                bg: 'bg-[#fff6e7]',
                text: 'text-[#a86e18]',
                hoverBorder: 'hover:border-[#a86e18] hover:shadow-[0_14px_35px_rgba(168,110,24,0.12)]',
                badge: 'bg-[#fff6e7] text-[#a86e18]',
              },
            }[mod.accent];

            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`relative flex flex-col items-start p-6 rounded-2xl bg-white border ${
                  isVisited ? 'border-[#bbf7d0] shadow-xs' : 'border-[#e5eaf0]'
                } text-left transition-all duration-200 group hover:-translate-y-1.5 cursor-pointer ${accentStyles.hoverBorder}`}
              >
                {/* Header with Icon and Module Number */}
                <div className="flex items-center justify-between w-full mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs ${accentStyles.bg} ${accentStyles.text}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isVisited && (
                      <span className="text-[10px] font-bold text-[#166534] bg-[#dcfce7] px-2 py-0.5 rounded-full border border-[#86efac]">
                        ✓ Visited
                      </span>
                    )}
                    <span className="text-xs font-mono font-extrabold text-[#94a3b8] group-hover:text-[#315fce] transition-colors">
                      #{mod.number}
                    </span>
                  </div>
                </div>

                {/* Badge */}
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md mb-2 ${accentStyles.badge}`}>
                  {mod.badge}
                </span>

                {/* Title */}
                <h3 className="text-base font-extrabold text-[#17263d] group-hover:text-[#315fce] transition-colors mb-1.5">
                  {mod.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-[#66758a] leading-relaxed mb-6 flex-grow">
                  {mod.subtitle}
                </p>

                {/* Action CTA Button */}
                <div className="w-full pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#315fce] group-hover:translate-x-1 transition-transform">
                  <span>Enter Dedicated Page</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
