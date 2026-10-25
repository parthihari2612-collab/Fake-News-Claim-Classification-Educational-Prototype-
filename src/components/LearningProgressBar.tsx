import React from 'react';
import { ModuleId } from '../types';
import { MODULES } from '../data/dataset';
import { Check, Award, Compass, RotateCcw } from 'lucide-react';

interface LearningProgressBarProps {
  visitedModules: ModuleId[];
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  onResetProgress?: () => void;
}

export const LearningProgressBar: React.FC<LearningProgressBarProps> = ({
  visitedModules,
  activeModule,
  onSelectModule,
  onResetProgress,
}) => {
  const total = MODULES.length;
  const visitedCount = visitedModules.length;
  const percentage = Math.round((visitedCount / total) * 100);
  const isCompleted = visitedCount === total;

  return (
    <div className="bg-white border border-[#e5eaf0] rounded-2xl p-4 sm:p-5 mb-6 shadow-xs">
      {/* Top Status Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#edf3ff] text-[#315fce] flex items-center justify-center">
            {isCompleted ? (
              <Award className="w-4 h-4 text-[#eab308]" />
            ) : (
              <Compass className="w-4 h-4" />
            )}
          </div>
          <div>
            <div className="text-xs font-extrabold text-[#17263d] flex items-center gap-2">
              <span>Learning Journey Progress</span>
              {isCompleted ? (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#fefce8] text-[#a16207] border border-[#fef08a] inline-flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#eab308]" />
                  Full Lab Journey Completed!
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e9f7f4] text-[#168579] border border-[#bbf7d0]">
                  In Progress
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#66758a]">
              Visit all 8 research modules to complete the comprehensive classification audit.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-[#17263d]">
              {visitedCount} of {total} Modules Visited
            </span>
            <span className="text-xs font-mono font-extrabold text-[#315fce] ml-2">
              ({percentage}%)
            </span>
          </div>

          {onResetProgress && visitedCount > 0 && (
            <button
              onClick={onResetProgress}
              className="text-[11px] text-[#94a3b8] hover:text-[#b91c1c] flex items-center gap-1 p-1 hover:bg-[#fef2f2] rounded transition-colors"
              title="Reset visited progress"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full bg-[#f1f5f9] h-2.5 rounded-full overflow-hidden mb-4 border border-[#e2e8f0]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#315fce] via-[#244aa5] to-[#168579] transition-all duration-500 ease-out"
          style={{ width: `${Math.max(percentage, 4)}%` }}
        ></div>
      </div>

      {/* Stepper Dots Row */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1">
        {MODULES.map((mod, idx) => {
          const isVisited = visitedModules.includes(mod.id);
          const isActive = activeModule === mod.id;

          return (
            <button
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all group ${
                isActive
                  ? 'border-[#315fce] bg-[#edf3ff]/60 shadow-xs ring-2 ring-[#315fce]/20'
                  : isVisited
                  ? 'border-[#bbf7d0] bg-[#f0fdf4] hover:border-[#86efac]'
                  : 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1]'
              }`}
              title={`Module ${mod.number}: ${mod.title} (${isVisited ? 'Visited' : 'Pending'})`}
            >
              {/* Step indicator dot with checkmark or number */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 transition-all ${
                  isActive
                    ? 'bg-[#315fce] text-white shadow-xs'
                    : isVisited
                    ? 'bg-[#168579] text-white'
                    : 'bg-[#f1f5f9] text-[#64748b] group-hover:bg-[#e2e8f0]'
                }`}
              >
                {isVisited ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : mod.number}
              </div>

              {/* Module short name */}
              <span
                className={`text-[10px] font-bold truncate max-w-full leading-tight ${
                  isActive
                    ? 'text-[#315fce]'
                    : isVisited
                    ? 'text-[#166534]'
                    : 'text-[#64748b] group-hover:text-[#17263d]'
                }`}
              >
                {mod.title.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
