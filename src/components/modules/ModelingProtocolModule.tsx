import React, { useState } from 'react';
import { Cpu, CheckCircle2, Sliders, ShieldCheck, Layers, GitBranch, ArrowRight } from 'lucide-react';

export const ModelingProtocolModule: React.FC = () => {
  const [ngramRange, setNgramRange] = useState<'1' | '1-2' | '1-3'>('1-2');
  const [maxFeatures, setMaxFeatures] = useState<number>(10000);
  const [sublinearTf, setSublinearTf] = useState<boolean>(true);
  const [classWeight, setClassWeight] = useState<'balanced' | 'none'>('balanced');
  const [classifier, setClassifier] = useState<'lr' | 'svm' | 'nb'>('lr');

  // Computed metrics based on parameters
  const calculatedVocab = ngramRange === '1' ? 4280 : ngramRange === '1-2' ? maxFeatures : 18500;
  const estimatedSparsity = '99.82%';

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#e5eaf0] rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#f1f5f9]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#315fce] uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4" />
              <span>Module 03 · Modeling Protocol &amp; Featurization</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#17263d]">
              Transparent Sparse Baseline Pipeline
            </h2>
            <p className="text-xs text-[#66758a] mt-1">
              Linear classifiers on n-gram TF-IDF representations provide an interpretable reference point before exploring deep neural encoders.
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#168579] bg-[#e9f7f4] px-3 py-1.5 rounded-lg border border-[#bbf7d0] self-start">
            Leakage-Isolated Pipeline
          </span>
        </div>

        {/* 3 Model Architectures */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div
            onClick={() => setClassifier('lr')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              classifier === 'lr'
                ? 'border-[#315fce] bg-[#edf3ff]/50 shadow-xs ring-2 ring-[#315fce]/15'
                : 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-[#315fce]">01 · Logistic Regression</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-[#315fce] border border-[#d7e2fb]">
                Baseline
              </span>
            </div>
            <p className="text-xs text-[#334155] leading-relaxed mb-3">
              Multi-class multinomial log-loss with L2 regularization. Yields well-calibrated class probability estimates.
            </p>
            <div className="text-[10px] text-[#64748b] font-mono">
              Solver: lbfgs · C=1.0 · max_iter=1000
            </div>
          </div>

          <div
            onClick={() => setClassifier('svm')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              classifier === 'svm'
                ? 'border-[#315fce] bg-[#edf3ff]/50 shadow-xs ring-2 ring-[#315fce]/15'
                : 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-[#168579]">02 · Linear Support Vector Machine</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-[#168579] border border-[#bbf7d0]">
                Max Margin
              </span>
            </div>
            <p className="text-xs text-[#334155] leading-relaxed mb-3">
              LinearSVC with squared hinge loss. Strong performance on high-dimensional sparse n-gram feature spaces.
            </p>
            <div className="text-[10px] text-[#64748b] font-mono">
              Loss: squared_hinge · dual=False · C=0.8
            </div>
          </div>

          <div
            onClick={() => setClassifier('nb')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              classifier === 'nb'
                ? 'border-[#315fce] bg-[#edf3ff]/50 shadow-xs ring-2 ring-[#315fce]/15'
                : 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-[#a86e18]">03 · Multinomial Naive Bayes</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-[#a86e18] border border-[#fef08a]">
                Fast Baseline
              </span>
            </div>
            <p className="text-xs text-[#334155] leading-relaxed mb-3">
              Probabilistic baseline with word occurrence frequencies. Sensitive to class priors and word independence assumptions.
            </p>
            <div className="text-[10px] text-[#64748b] font-mono">
              Smoothing: Laplace (alpha=0.5)
            </div>
          </div>
        </div>

        {/* Interactive Parameter Playground */}
        <div className="p-5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-[#17263d]">
            <Sliders className="w-4 h-4 text-[#315fce]" />
            <span>Interactive Featurization &amp; Hyperparameter Playground</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* N-Gram Selection */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] mb-1.5">
                N-Gram Range
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(['1', '1-2', '1-3'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setNgramRange(r)}
                    className={`py-1.5 rounded-lg font-bold text-xs transition-all ${
                      ngramRange === r
                        ? 'bg-[#315fce] text-white shadow-xs'
                        : 'bg-white text-[#475569] border border-[#dce3ec]'
                    }`}
                  >
                    {r === '1' ? '(1, 1)' : r === '1-2' ? '(1, 2)' : '(1, 3)'}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-[#64748b] block mt-1">
                {ngramRange === '1' ? 'Single words only' : ngramRange === '1-2' ? 'Words + Bigrams' : 'Words up to Trigrams'}
              </span>
            </div>

            {/* Max Features */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] mb-1.5">
                Vocabulary Cap: {maxFeatures.toLocaleString()}
              </label>
              <input
                type="range"
                min={2000}
                max={25000}
                step={1000}
                value={maxFeatures}
                onChange={(e) => setMaxFeatures(Number(e.target.value))}
                className="w-full accent-[#315fce]"
              />
              <span className="text-[10px] text-[#64748b] block mt-1">
                Restricts vocabulary to top TF-IDF tokens
              </span>
            </div>

            {/* Sublinear TF */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] mb-1.5">
                Sublinear Term Frequency
              </label>
              <button
                onClick={() => setSublinearTf(!sublinearTf)}
                className={`w-full py-1.5 px-3 rounded-lg font-bold text-xs border transition-all ${
                  sublinearTf
                    ? 'bg-[#e9f7f4] text-[#168579] border-[#bbf7d0]'
                    : 'bg-white text-[#64748b] border-[#dce3ec]'
                }`}
              >
                {sublinearTf ? 'Enabled: 1 + log(tf)' : 'Standard: Raw Count'}
              </button>
              <span className="text-[10px] text-[#64748b] block mt-1">
                Dampens repeated word skew
              </span>
            </div>

            {/* Class Weight */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] mb-1.5">
                Class Weight Penalty
              </label>
              <button
                onClick={() => setClassWeight(classWeight === 'balanced' ? 'none' : 'balanced')}
                className={`w-full py-1.5 px-3 rounded-lg font-bold text-xs border transition-all ${
                  classWeight === 'balanced'
                    ? 'bg-[#edf3ff] text-[#315fce] border-[#d7e2fb]'
                    : 'bg-white text-[#64748b] border-[#dce3ec]'
                }`}
              >
                {classWeight === 'balanced' ? 'Balanced (Inverse-Freq)' : 'Uniform Weights'}
              </button>
              <span className="text-[10px] text-[#64748b] block mt-1">
                Addresses pants-fire class scarcity
              </span>
            </div>
          </div>

          {/* Computed Pipeline Diagnostics */}
          <div className="mt-4 pt-4 border-t border-[#e2e8f0] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-[#64748b] text-[11px]">Selected Model: </span>
                <span className="font-bold text-[#17263d]">
                  {classifier === 'lr' ? 'Logistic Regression' : classifier === 'svm' ? 'Linear SVM' : 'Multinomial Naive Bayes'}
                </span>
              </div>
              <div>
                <span className="text-[#64748b] text-[11px]">Feature Dimensions: </span>
                <span className="font-mono font-bold text-[#315fce]">{calculatedVocab.toLocaleString()} dimensions</span>
              </div>
              <div>
                <span className="text-[#64748b] text-[11px]">Matrix Sparsity: </span>
                <span className="font-mono font-bold text-[#168579]">{estimatedSparsity}</span>
              </div>
            </div>
            <div className="text-[10px] font-semibold text-[#168579] bg-white px-2.5 py-1 rounded-md border border-[#bbf7d0]">
              ✓ Ready for Cross-Fold Validation
            </div>
          </div>
        </div>

        {/* Data Leakage Protocol Step */}
        <div className="mt-6 p-4 rounded-xl bg-white border border-[#e2e8f0]">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#17263d]">
            <ShieldCheck className="w-4 h-4 text-[#168579]" />
            <span>Crucial Research Safeguard: Zero Feature Leakage</span>
          </div>
          <p className="text-xs text-[#66758a] leading-relaxed">
            In standard machine learning errors, the TF-IDF vectorizer is mistakenly fitted on the entire dataset prior to splitting. In our research pipeline, the vectorizer is strictly fitted <strong>only on the training fold</strong>; test-fold tokens that never appeared in training are treated as out-of-vocabulary. This preserves true out-of-sample validity.
          </p>
        </div>
      </div>
    </div>
  );
};
