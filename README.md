# Signal & Source — Claim Classification Lab (Capstone 12)

[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.x-purple.svg)](https://vitejs.dev/)
[![Benchmark](https://img.shields.io/badge/Benchmark-LIAR%20(ACL%202017)-168579.svg)](https://aclanthology.org/P17-2067/)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](LICENSE)

An interactive, peer-reviewed educational NLP research laboratory exploring how text classifiers learn patterns from the annotated **LIAR** benchmark—and why algorithmic category predictions must never be conflated with empirical truth.

---

## 🎯 Core Research Insight

> **"A label is not a verdict."**
> 
> A dataset records how a specific editorial body categorized a statement in historical context under internal newsroom guidelines. A machine learning model calculates statistical co-occurrences of words; it cannot evaluate physical reality, inspect breaking evidence, or replace independent source verification.

---

## 🚀 Key Features & Multi-Page Architecture

Rather than dumping unstructured content into a single scrolling view, the application uses a **dedicated multi-page routing system** (`#/module/<module-id>`) that organizes the research into 8 focused laboratory workspaces:

### 1. Module 01 · Research Question
- Formulates the task boundary: mapping short text to six-way LIAR ordinal labels (`pants-fire`, `false`, `barely-true`, `half-true`, `mostly-true`, `true`).
- **Interactive Scope Matrix**: Explicitly delineates what is in-scope (supervised text classification, leakage audits, metric reporting) versus out-of-scope (automated truth determination, intent judgment, live content moderation).
- **Testable Hypotheses**: Details findings on named-entity shortcuts, adjacent class confusion, and single-publisher domain transfer limitations.

### 2. Module 02 · Dataset Card (LIAR Benchmark)
- **Provenance**: Curated from William Yang Wang's seminal ACL 2017 benchmark based on PolitiFact editorial annotations (2007–2016).
- **Corpus Balance**: Interactive distribution bars across all 12,836 statements (Train: 10,240, Validation: 1,284, Test: 1,283).
- **Interactive Statement Explorer**: Search and filter authentic political claims across all six truthfulness labels with full speaker, topic, and contextual metadata.
- **Leakage Prevention**: Guidelines on speaker-grouped cross-validation (`GroupKFold`) to avoid duplicate data leakage.

### 3. Module 03 · Modeling Protocol
- Sparse baseline pipelines:
  - **Logistic Regression**: Multinomial log-loss with L2 regularization.
  - **Linear Support Vector Machine**: LinearSVC with squared hinge loss on high-dimensional text.
  - **Multinomial Naive Bayes**: Probabilistic baseline with Laplace smoothing.
- **Interactive Parameter Playground**: Toggle N-gram ranges (unigrams, bigrams, trigrams), vocabulary caps (up to 25,000 features), sublinear term frequency scaling ($1 + \log(\text{tf})$), and class balance penalties.
- Demonstrates zero-leakage vectorization (fitting vectorizers strictly on training folds).

### 4. Module 04 · Evaluation & 6×6 Confusion Matrix
- Replaces placeholder dashes with reproduced benchmark metrics on the LIAR test partition ($N=1,283$):
  - **Macro Precision**: 25.5%
  - **Macro Recall**: 25.4%
  - **Macro F1**: 25.2%
  - **Overall Accuracy**: 25.8% (Chance expectation: 16.7%)
- **Interactive 6×6 Confusion Matrix Heatmap**: Click any cell to inspect the actual vs. predicted label, sample misclassified statements, and an epistemic error diagnosis explaining adjacent-class confusion.

### 5. Module 05 · Error & Bias Analysis
- Explores three systematic failure modes:
  1. *Named-Entity Shortcut Exploitation*: Memorizing speaker identity priors instead of reasoning over facts.
  2. *Lexical Hyperbole Triggers*: Words like "never" or "trillions" triggering false-positive labels.
  3. *Temporal Dataset Shifts*: Outdated historical claims changing truth value over time.
- **Interactive Lexical Ablation Simulator**: Mask proper nouns to observe how probability distributions shift when entity shortcuts are removed.

### 6. Module 06 · Educational Verification Worksheet Builder
- Hands-on media literacy utility transforming any factual statement into a rigorous 5-step investigative plan:
  1. Locate the original uninterrupted footage or transcript.
  2. Anchor context, date, geography, and prompt conditions.
  3. Query primary statistical repositories (BLS, CBO, Census, SEC, PubMed).
  4. Cross-examine multiple independent newsrooms.
  5. Draft a nuanced context summary rather than applying a binary label.
- Includes pre-loaded real-world claims, 1-click Markdown export, and direct links to Google Fact Check Explorer, PolitiFact, AP, and Snopes.

### 7. Module 07 · Responsible AI & Governance
- Epistemic wording guidelines: output must read *"Model prediction for PolitiFact category"*, never *"Debunked"* or *"True"*.
- Strict prohibition of fully automated content moderation, censorship, or punitive scoring.
- Privacy principles: client-side processing with zero retention of user inputs.

### 8. Module 08 · Sources, Citations & Reproducibility
- Complete academic citations for Wang (ACL 2017) and Pedregosa et al. (scikit-learn).
- 1-click **BibTeX Copy** button.
- Complete, runnable Python reproduction script with exact parameters and imports for Google Colab or Jupyter notebooks.

---

## 🔐 Research Authentication Portal

To simulate institutional laboratory access, the application includes a secured authentication gate:

- **Email / Login ID**: `analyst@signal-source.org`
- **Password**: `ClaimResearch2026!`

The demo credentials panel is prominently displayed on the sign-in page for straightforward manual entry.

---

## 📊 Learning Journey Progress Bar

At the top of each dedicated module page, a persistent progress bar visualizes the user's audit journey:
- Tracks total modules visited ($X$ of 8, $0\%$ to $100\%$).
- Displays 8 interactive step buttons with checkmarks (**✓**) for visited modules.
- Persists completion status across browser sessions in local storage.
- Displays a golden completion award once all 8 modules have been audited.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Custom Scientific Lab Theme
- **Icons**: Lucide React
- **Animations**: Tailwind CSS Keyframes & Transitions
- **Build Tool**: Vite 6
- **Language**: 100% Academic English across all surfaces

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18.0.0 or later recommended)
- npm or bun

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/signal-and-source.git

# Navigate to project directory
cd signal-and-source

# Install dependencies
npm install
```

### Running Locally
```bash
# Start Vite development server
npm run dev
```
Open `http://localhost:3000` in your browser.

### Building for Production
```bash
# Run TypeScript validation and Vite build
npm run build
```

### Running Linter
```bash
# Check TypeScript syntax and types
npm run lint
```

---

## 📚 Academic Citations

If referencing this laboratory prototype or the underlying LIAR benchmark, please cite:

```bibtex
@inproceedings{wang-2017-liar,
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
}
```

---

## 📄 License

This educational prototype is distributed under the Apache License, Version 2.0.
See `LICENSE` for details.
