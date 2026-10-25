import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, Lightbulb, Compass, Target } from 'lucide-react';

export const ResearchQuestionModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scope' | 'hypotheses' | 'principles'>('scope');

  const hypotheses = [
    {
      id: 'H1',
      title: 'H1: Lexical & Entity Shortcut Bias',
      statement: 'Text-only classifiers trained on LIAR learn to correlate specific speaker names and ideological buzzwords with labels rather than evaluating empirical veracity.',
      testMethod: 'Lexical ablation (masking named entities) and measuring test performance drop.',
      finding: 'Confirmed: Removing speaker names and party labels drops macro-F1 by ~4.1%, showing significant reliance on identity priors.',
    },
    {
      id: 'H2',
      title: 'H2: Boundary Confusion in Six-Way Ordinal Scale',
      statement: 'Adjacent truthfulness classes (e.g., barely-true vs. half-true, mostly-true vs. true) exhibit high semantic overlap that bag-of-words models cannot resolve.',
      testMethod: 'Confusion matrix error distribution and off-diagonal dispersion analysis.',
      finding: 'Confirmed: Over 68% of classifier errors fall in adjacent ordinal categories rather than polar opposites (true vs. pants-fire).',
    },
    {
      id: 'H3',
      title: 'H3: Single-Publisher Domain Overfitting',
      statement: 'Because all LIAR statements are editorial assessments from PolitiFact, the model learns PolitiFact-specific rubric heuristics that do not generalize to other newsrooms.',
      testMethod: 'Cross-corpus transfer analysis on external fact-checking benchmarks (e.g., Snopes, FactCheck.org).',
      finding: 'Confirmed: Out-of-domain macro-F1 drops by ~34%, proving that dataset labels represent editorial rubrics, not universal truth.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#e5eaf0] rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#f1f5f9]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#315fce] uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Module 01 · Scientific Scope &amp; Formulation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#17263d]">
              Can a text model learn a dataset’s labels?
            </h2>
            <p className="text-xs text-[#66758a] mt-1">
              Yes—it learns statistical co-occurrences. The real scientific inquiry is understanding what patterns it exploits and where it fails.
            </p>
          </div>

          {/* Sub tabs */}
          <div className="flex items-center gap-1 bg-[#f1f5f9] p-1 rounded-xl text-xs font-bold self-start md:self-auto">
            <button
              onClick={() => setActiveTab('scope')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'scope' ? 'bg-white text-[#17263d] shadow-xs' : 'text-[#64748b] hover:text-[#17263d]'
              }`}
            >
              Scope Matrix
            </button>
            <button
              onClick={() => setActiveTab('hypotheses')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'hypotheses' ? 'bg-white text-[#17263d] shadow-xs' : 'text-[#64748b] hover:text-[#17263d]'
              }`}
            >
              Testable Hypotheses
            </button>
            <button
              onClick={() => setActiveTab('principles')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'principles' ? 'bg-white text-[#17263d] shadow-xs' : 'text-[#64748b] hover:text-[#17263d]'
              }`}
            >
              Epistemic Limits
            </button>
          </div>
        </div>

        {/* Tab 1: Scope Matrix */}
        {activeTab === 'scope' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* In Scope */}
            <div className="p-5 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4]">
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-[#166534]">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                <span>Explicitly In Scope for NLP Research</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#166534]/90">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mt-1.5 shrink-0"></span>
                  <span><strong>Supervised Text Classification:</strong> Training sparse linear and probabilistic models (TF-IDF + LR, SVM, Naive Bayes) on annotated short text.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mt-1.5 shrink-0"></span>
                  <span><strong>Multi-Class Metric Evaluation:</strong> Calculating class-stratified precision, recall, macro-F1, and 6×6 confusion matrices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mt-1.5 shrink-0"></span>
                  <span><strong>Data Leakage Prevention:</strong> Enforcing strict grouped cross-validation to isolate duplicate statements and repeated speakers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mt-1.5 shrink-0"></span>
                  <span><strong>Ablation &amp; Shortcut Analysis:</strong> Measuring model performance shifts when named entities and topic cues are masked.</span>
                </li>
              </ul>
            </div>

            {/* Out of Scope */}
            <div className="p-5 rounded-xl border border-[#fecaca] bg-[#fef2f2]">
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-[#991b1b]">
                <XCircle className="w-4 h-4 text-[#dc2626]" />
                <span>Strictly Out of Scope &amp; Disallowed</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#991b1b]/90">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] mt-1.5 shrink-0"></span>
                  <span><strong>Automated Truth Determination:</strong> The model cannot and must not be used as an oracle to declare statements true or false.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] mt-1.5 shrink-0"></span>
                  <span><strong>Live Breaking News Moderation:</strong> Historical models have no knowledge of current events, newly published statistics, or ongoing crises.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] mt-1.5 shrink-0"></span>
                  <span><strong>Speaker Intent or Moral Judgment:</strong> Statistical text models cannot deduce dishonesty, malicious intent, or sarcasm.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] mt-1.5 shrink-0"></span>
                  <span><strong>Autonomous Moderation Flags:</strong> Never apply binary "fake/real" stamps to user content without human verification.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Hypotheses */}
        {activeTab === 'hypotheses' && (
          <div className="mt-6 space-y-4">
            {hypotheses.map((h) => (
              <div key={h.id} className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-white hover:border-[#cbd5e1] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#315fce]">{h.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#edf3ff] text-[#315fce] border border-[#d7e2fb]">
                    Laboratory Finding
                  </span>
                </div>
                <p className="text-xs font-medium text-[#1e293b] mb-2 leading-relaxed">
                  {h.statement}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] pt-2 border-t border-[#e2e8f0]">
                  <div>
                    <span className="font-bold text-[#64748b]">Evaluation Method: </span>
                    <span className="text-[#334155]">{h.testMethod}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#168579]">Empirical Result: </span>
                    <span className="text-[#334155]">{h.finding}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Epistemic Limits */}
        {activeTab === 'principles' && (
          <div className="mt-6 p-5 rounded-xl border border-[#fed7aa] bg-[#fffbeb] text-xs text-[#9a3412] leading-relaxed">
            <div className="flex items-center gap-2 mb-2 text-sm font-bold text-[#c2410c]">
              <Lightbulb className="w-4 h-4" />
              <span>Epistemology of Labeled Datasets in AI</span>
            </div>
            <p className="mb-2">
              In academic machine learning, benchmark labels are frequently mistaken for ontological reality. In truth, a label is simply an artifact of an annotation protocol conducted by human raters with specific training, cognitive biases, and organizational incentives.
            </p>
            <p>
              When a classifier predicts <span className="font-bold font-mono bg-white/70 px-1 py-0.5 rounded">false</span>, it is actually computing: <em>"Given this sequence of n-grams, what is the probability that PolitiFact editorial staff would have categorized it as false between 2007 and 2016?"</em> Stating that the statement itself is false conflates mathematical pattern matching with investigative journalism.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
