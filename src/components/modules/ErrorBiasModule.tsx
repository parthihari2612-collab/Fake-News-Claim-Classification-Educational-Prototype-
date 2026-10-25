import React, { useState } from 'react';
import { AlertTriangle, Filter, Sparkles, CheckCircle2, RefreshCw, Scissors, ShieldAlert } from 'lucide-react';
import { LABEL_COLORS } from '../../data/dataset';
import { LabelType } from '../../types';

interface ProbeCase {
  id: string;
  originalText: string;
  ablatedText: string;
  entityRemoved: string;
  originalPrediction: LabelType;
  ablatedPrediction: LabelType;
  actualAnnotation: LabelType;
  reason: string;
}

const PROBE_CASES: ProbeCase[] = [
  {
    id: 'case-1',
    originalText: 'Donald Trump claimed that crime in US inner cities has reached 50-year record highs.',
    ablatedText: '[POLITICIAN] claimed that crime in US inner cities has reached 50-year record highs.',
    entityRemoved: 'Donald Trump',
    originalPrediction: 'false',
    ablatedPrediction: 'barely-true',
    actualAnnotation: 'false',
    reason: 'The model has learned strong negative weights associated with specific polarizing speaker names in the LIAR dataset, skewing probability distributions independent of syntax.',
  },
  {
    id: 'case-2',
    originalText: 'Barack Obama stated that over 90 percent of Americans favor universal background checks for all gun purchases.',
    ablatedText: '[POLITICIAN] stated that over 90 percent of Americans favor universal background checks for all gun purchases.',
    entityRemoved: 'Barack Obama',
    originalPrediction: 'mostly-true',
    ablatedPrediction: 'half-true',
    actualAnnotation: 'mostly-true',
    reason: 'Masking the prominent incumbent speaker drops model confidence toward the corpus majority prior (half-true), revealing over-reliance on speaker metadata.',
  },
  {
    id: 'case-3',
    originalText: 'The new tax reform bill will eliminate all federal income taxes for middle-class families.',
    ablatedText: 'The new tax reform bill will [MODIFY] federal income taxes for middle-class families.',
    entityRemoved: 'eliminate all',
    originalPrediction: 'pants-fire',
    ablatedPrediction: 'barely-true',
    actualAnnotation: 'pants-fire',
    reason: 'Extreme hyperbolic intensifiers ("eliminate all", "never", "trillions") serve as superficial triggers for "pants-fire" without understanding legislative mechanics.',
  },
];

export const ErrorBiasModule: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<ProbeCase>(PROBE_CASES[0]);
  const [ablationActive, setAblationActive] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#e5eaf0] rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#f1f5f9]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#168579] uppercase tracking-wider mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Module 05 · Error &amp; Shortcut Diagnostics</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#17263d]">
              What Is the Classifier Actually Learning?
            </h2>
            <p className="text-xs text-[#66758a] mt-1">
              High accuracy scores often mask superficial shortcut exploitation. Lexical ablation tests reveal whether the model reasons about claims or merely memorizes entities.
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#b91c1c] bg-[#fef2f2] px-3 py-1.5 rounded-lg border border-[#fecaca] self-start">
            Diagnostic Probe
          </span>
        </div>

        {/* 3 Core Failure Modes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
            <span className="text-xs font-bold text-[#17263d] block mb-1">
              01 · Named-Entity Shortcuts
            </span>
            <p className="text-xs text-[#66758a] leading-relaxed">
              In a single-outlet dataset like PolitiFact, certain public figures appear predominantly under specific labels. Classifiers memorize speaker identities rather than factual veracity.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
            <span className="text-xs font-bold text-[#17263d] block mb-1">
              02 · Lexical Hyperbole Triggers
            </span>
            <p className="text-xs text-[#66758a] leading-relaxed">
              Words such as <em>“completely”, “never”, “illegal”, “destroy”</em> receive heavy statistical weights for false classes, triggering false positives on legitimate emphatic statements.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
            <span className="text-xs font-bold text-[#17263d] block mb-1">
              03 · Temporal Dataset Shift
            </span>
            <p className="text-xs text-[#66758a] leading-relaxed">
              LIAR was gathered from 2007 to 2016. Statements evaluated as true regarding 2012 economic statistics may be false today, yet the static model cannot update its temporal knowledge.
            </p>
          </div>
        </div>

        {/* Interactive Lexical Ablation Simulator */}
        <div className="p-5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#315fce]" />
              <h3 className="text-xs font-bold text-[#17263d]">
                Interactive Lexical Ablation &amp; Entity Masking Probe
              </h3>
            </div>
            <button
              onClick={() => setAblationActive(!ablationActive)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                ablationActive
                  ? 'bg-[#168579] text-white shadow-xs'
                  : 'bg-white text-[#334155] border border-[#dce3ec] hover:border-[#94a3b8]'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>{ablationActive ? 'Ablation Mask Active' : 'Toggle Named-Entity Mask'}</span>
            </button>
          </div>

          {/* Test Case Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
            {PROBE_CASES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`p-3 rounded-lg text-left border text-xs transition-all ${
                  selectedCase.id === c.id
                    ? 'border-[#315fce] bg-white shadow-xs ring-2 ring-[#315fce]/15 font-bold text-[#17263d]'
                    : 'border-[#e2e8f0] bg-white/70 text-[#64748b] hover:bg-white'
                }`}
              >
                <div className="text-[10px] text-[#315fce] mb-0.5">Entity: {c.entityRemoved}</div>
                <div className="truncate">{c.originalText}</div>
              </button>
            ))}
          </div>

          {/* Statement Comparison Box */}
          <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] space-y-3">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-[#64748b] mb-1">
                <span>Text Fed to TF-IDF Vectorizer:</span>
                <span className="font-mono text-[10px] text-[#315fce]">
                  {ablationActive ? 'Ablated Representation' : 'Raw Text with Proper Nouns'}
                </span>
              </div>
              <div className="p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] text-xs font-medium text-[#1e293b] leading-relaxed">
                {ablationActive ? selectedCase.ablatedText : selectedCase.originalText}
              </div>
            </div>

            {/* Model Outputs Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                <span className="text-[10px] font-bold text-[#64748b] block mb-1">
                  Active Model Prediction
                </span>
                <span
                  className="inline-block text-xs font-extrabold px-2 py-0.5 rounded uppercase"
                  style={{
                    backgroundColor: LABEL_COLORS[ablationActive ? selectedCase.ablatedPrediction : selectedCase.originalPrediction].bg,
                    color: LABEL_COLORS[ablationActive ? selectedCase.ablatedPrediction : selectedCase.originalPrediction].text,
                  }}
                >
                  {ablationActive ? selectedCase.ablatedPrediction : selectedCase.originalPrediction}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                <span className="text-[10px] font-bold text-[#64748b] block mb-1">
                  Human Benchmark Label
                </span>
                <span
                  className="inline-block text-xs font-extrabold px-2 py-0.5 rounded uppercase"
                  style={{
                    backgroundColor: LABEL_COLORS[selectedCase.actualAnnotation].bg,
                    color: LABEL_COLORS[selectedCase.actualAnnotation].text,
                  }}
                >
                  {selectedCase.actualAnnotation}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                <span className="text-[10px] font-bold text-[#64748b] block mb-1">
                  Ablation Impact
                </span>
                <span className="text-xs font-bold text-[#168579]">
                  {selectedCase.originalPrediction !== selectedCase.ablatedPrediction
                    ? 'Shift Detected (Shortcut confirmed)'
                    : 'Invariant (Syntax robust)'}
                </span>
              </div>
            </div>

            <div className="text-xs text-[#334155] leading-relaxed pt-2 border-t border-[#f1f5f9]">
              <strong className="text-[#315fce]">Diagnostic Analysis: </strong>
              {selectedCase.reason}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
