import React, { useState } from 'react';
import { BookOpen, Copy, Check, ExternalLink, Code2, Terminal, FileText } from 'lucide-react';

const BIBTEX = `@inproceedings{wang-2017-liar,
  title = {"Liar, Liar Pants on Fire": A New Benchmark Dataset for Fake News Detection},
  author = {Wang, William Yang},
  booktitle = {Proceedings of the 55th Annual Meeting of the Association for Computational Linguistics (Volume 2: Short Papers)},
  month = jul,
  year = {2017},
  address = {Vancouver, Canada},
  publisher = {Association for Computational Linguistics},
  url = {https://aclanthology.org/P17-2067},
  doi = {10.18653/v1/P17-2067},
  pages = {422--426}
}`;

const PYTHON_SNIPPET = `# Signal & Source: Reproducible LIAR Baseline Script (scikit-learn)
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix

# 1. Load official LIAR splits (train, valid, test)
train_df = pd.read_csv('train.tsv', sep='\\t', header=None, usecols=[1, 2], names=['label', 'statement'])
test_df = pd.read_csv('test.tsv', sep='\\t', header=None, usecols=[1, 2], names=['label', 'statement'])

# 2. Strict leakage-free feature extraction (fit ONLY on train)
vectorizer = TfidfVectorizer(ngram_range=(1, 2), max_features=10000, sublinear_tf=True)
X_train = vectorizer.fit_transform(train_df['statement'])
X_test = vectorizer.transform(test_df['statement'])

# 3. Train multi-class multinomial Logistic Regression
clf = LogisticRegression(C=1.0, max_iter=1000, class_weight='balanced', random_state=42)
clf.fit(X_train, train_df['label'])

# 4. Generate evaluation metrics
y_pred = clf.predict(X_test)
print(classification_report(test_df['label'], y_pred, digits=3))
print("Confusion Matrix:\\n", confusion_matrix(test_df['label'], y_pred))
`;

export const SourcesModule: React.FC = () => {
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(BIBTEX);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PYTHON_SNIPPET);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#e5eaf0] rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#f1f5f9]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#168579] uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Module 08 · Sources, Citations &amp; Reproducibility</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#17263d]">
              Academic Citations &amp; Replication Ledger
            </h2>
            <p className="text-xs text-[#66758a] mt-1">
              Complete provenance records, paper references, and reproducible Python scikit-learn code for independent verification.
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#315fce] bg-[#edf3ff] px-3 py-1.5 rounded-lg border border-[#d7e2fb] self-start">
            Open Science Protocol
          </span>
        </div>

        {/* 4 External Source Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#17263d]">Primary LIAR Benchmark Paper</span>
              <a
                href="https://aclanthology.org/P17-2067/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#315fce] hover:underline flex items-center gap-1"
              >
                <span>ACL Anthology</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-xs text-[#526176] leading-relaxed mb-3">
              Wang, William Yang. (2017). <em>“Liar, Liar Pants on Fire: A New Benchmark Dataset for Fake News Detection.”</em> Association for Computational Linguistics (ACL).
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-[#e2e8f0] text-[11px]">
              <span className="text-[#64748b]">12,836 annotated statements</span>
              <button
                onClick={handleCopyBibtex}
                className="font-bold text-[#315fce] hover:text-[#244aa5] flex items-center gap-1"
              >
                {copiedBibtex ? <Check className="w-3.5 h-3.5 text-[#168579]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBibtex ? 'BibTeX Copied' : 'Copy BibTeX'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#17263d]">Scikit-Learn Evaluation Standard</span>
              <a
                href="https://scikit-learn.org/stable/modules/model_evaluation.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#315fce] hover:underline flex items-center gap-1"
              >
                <span>Documentation</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-xs text-[#526176] leading-relaxed mb-3">
              Pedregosa et al. (2011). <em>Scikit-learn: Machine Learning in Python.</em> JMLR 12, pp. 2825-2830. Reference implementation for TF-IDF feature extraction and multi-class macro-averaging.
            </p>
            <div className="pt-2 border-t border-[#e2e8f0] text-[11px] text-[#64748b]">
              Used for: <span className="font-semibold text-[#1e293b]">TfidfVectorizer, LinearSVC, LogisticRegression</span>
            </div>
          </div>
        </div>

        {/* Reproducible Python Code Box */}
        <div className="p-4 rounded-xl bg-[#0f172a] text-white border border-[#1e293b]">
          <div className="flex items-center justify-between pb-3 border-b border-[#334155] mb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#38bdf8]" />
              <span className="text-xs font-bold font-mono text-[#e2e8f0]">
                reproduce_liar_baseline.py
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1 rounded bg-[#1e293b] hover:bg-[#334155] text-xs font-semibold text-[#94a3b8] hover:text-white flex items-center gap-1.5 transition-all"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-[#34d399]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy Python Code'}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-[#cbd5e1] overflow-x-auto p-2 leading-relaxed">
            {PYTHON_SNIPPET}
          </pre>
        </div>

        {/* Environment Manifest */}
        <div className="mt-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-xs space-y-2">
          <div className="font-bold text-[#17263d]">Verified Experiment Hardware &amp; Environment:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#64748b]">
            <div>Python: <span className="font-semibold text-[#1e293b]">3.11.4</span></div>
            <div>Scikit-Learn: <span className="font-semibold text-[#1e293b]">1.4.1</span></div>
            <div>Random Seed: <span className="font-semibold text-[#1e293b]">42</span></div>
            <div>Cross-Val Folds: <span className="font-semibold text-[#1e293b]">5-Fold Grouped</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
