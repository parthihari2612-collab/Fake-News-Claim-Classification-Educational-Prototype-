import React from 'react';
import { ShieldAlert, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { ModuleId } from '../types';

interface HeroSectionProps {
  onExploreMethod: () => void;
  onOpenChecklist: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMethod, onOpenChecklist }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-8 bg-gradient-to-b from-[#f8faff] via-white to-white border-b border-[#e5eaf0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Headline & Intro */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#315fce] tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#168579]"></span>
              Capstone 12 · Educational Natural Language Processing
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#17263d] leading-[1.1] mb-4">
              Reading claims.<br />
              <span className="text-[#315fce]">Reading labels.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#58677b] leading-relaxed mb-6 max-w-xl">
              An interactive research laboratory examining how machine learning models learn statistical patterns from the annotated LIAR benchmark—and why an algorithmic category prediction should never be mistaken for empirical truth.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreMethod}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#315fce] hover:bg-[#244aa5] text-white shadow-[0_8px_18px_rgba(49,95,206,0.18)] active:translate-y-0.5 transition-all"
              >
                <span>Explore Methodology</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenChecklist}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-[#f8fafc] text-[#17263d] border border-[#dce3ec] active:translate-y-0.5 transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-[#168579]" />
                <span>Open Verification Checklist</span>
              </button>
            </div>

            <div className="flex items-center gap-2 mt-5 text-xs text-[#66758a]">
              <ShieldAlert className="w-4 h-4 text-[#168579] shrink-0" />
              <span>
                Demonstration platform for responsible ML education. Does not issue autonomous truth verdicts.
              </span>
            </div>
          </div>

          {/* Research Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#e5eaf0] rounded-2xl p-6 shadow-[0_18px_50px_rgba(26,48,84,0.07)]">
              <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
                <div>
                  <span className="text-[10px] font-bold text-[#8a96a6] uppercase tracking-wider block">
                    Core Epistemological Principle
                  </span>
                  <h2 className="text-base font-bold text-[#17263d]">A label is not a verdict.</h2>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e9f7f4] text-[#168579] border border-[#bbf7d0]">
                  Scientific Lens
                </span>
              </div>

              <div className="my-4 p-3.5 rounded-xl bg-[#f8faff] border-l-4 border-[#315fce] text-xs text-[#334155] leading-relaxed">
                A dataset records how a specific editorial body categorized a statement in historical context under editorial guidelines.
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#17263d]">
                  <span>Statistical Pattern Mapping</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#fff6e7] text-[#a86e18] border border-[#fef08a]">
                    NOT GROUND TRUTH
                  </span>
                </div>

                {/* 6 scale bars */}
                <div className="grid grid-cols-6 gap-1.5 py-1">
                  <div className="h-2 rounded-full bg-[#f87171]" title="pants-fire"></div>
                  <div className="h-2 rounded-full bg-[#fb923c]" title="false"></div>
                  <div className="h-2 rounded-full bg-[#fde047]" title="barely-true"></div>
                  <div className="h-2 rounded-full bg-[#facc15]" title="half-true"></div>
                  <div className="h-2 rounded-full bg-[#86efac]" title="mostly-true"></div>
                  <div className="h-2 rounded-full bg-[#34d399]" title="true"></div>
                </div>

                <div className="flex justify-between text-[10px] font-semibold text-[#8a96a6]">
                  <span>Least supported by editorial check</span>
                  <span>Most supported by editorial check</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f1f5f9] text-[11px] text-[#66758a] leading-relaxed">
                A model only calculates lexical probabilities. It cannot investigate physical reality, evaluate breaking evidence, or replace primary source verification.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
