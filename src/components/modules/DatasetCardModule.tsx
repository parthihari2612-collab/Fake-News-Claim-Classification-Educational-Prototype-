import React, { useState } from 'react';
import { Database, Search, Filter, AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';
import { LIAR_STATISTICS, SAMPLE_DATASET, LABEL_COLORS } from '../../data/dataset';
import { LabelType } from '../../types';

export const DatasetCardModule: React.FC = () => {
  const [selectedLabel, setSelectedLabel] = useState<LabelType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStatements = SAMPLE_DATASET.filter((item) => {
    const matchesLabel = selectedLabel === 'all' || item.label === selectedLabel;
    const matchesSearch =
      searchQuery === '' ||
      item.statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLabel && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white border border-[#e5eaf0] rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#f1f5f9]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#168579] uppercase tracking-wider mb-1">
              <Database className="w-4 h-4" />
              <span>Module 02 · Dataset Provenance &amp; Distribution</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#17263d]">
              LIAR Benchmark Dataset Card
            </h2>
            <p className="text-xs text-[#66758a] mt-1">
              Introduced by William Yang Wang (ACL 2017). Built from ~12.8K statements annotated by PolitiFact between 2007 and 2016.
            </p>
          </div>
          <a
            href="https://aclanthology.org/P17-2067/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#315fce] hover:underline bg-[#edf3ff] px-3 py-1.5 rounded-lg border border-[#d7e2fb] self-start"
          >
            <span>ACL 2017 Anthology Paper</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
            <span className="text-[11px] font-bold text-[#64748b] block">Total Statements</span>
            <span className="text-2xl font-black text-[#17263d] tracking-tight">12,836</span>
            <span className="text-[10px] text-[#64748b] block mt-0.5">Train: 10,240 · Test: 1,283</span>
          </div>
          <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
            <span className="text-[11px] font-bold text-[#64748b] block">Truthfulness Classes</span>
            <span className="text-2xl font-black text-[#168579] tracking-tight">6 Labels</span>
            <span className="text-[10px] text-[#64748b] block mt-0.5">Pants-fire to True</span>
          </div>
          <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
            <span className="text-[11px] font-bold text-[#64748b] block">Unique Speakers</span>
            <span className="text-2xl font-black text-[#315fce] tracking-tight">3,318</span>
            <span className="text-[10px] text-[#64748b] block mt-0.5">US politicians &amp; groups</span>
          </div>
          <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
            <span className="text-[11px] font-bold text-[#64748b] block">Temporal Coverage</span>
            <span className="text-2xl font-black text-[#a86e18] tracking-tight">2007–2016</span>
            <span className="text-[10px] text-[#64748b] block mt-0.5">Single newsroom rubric</span>
          </div>
        </div>

        {/* Class Balance Bars */}
        <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#17263d]">
              Class Balance &amp; Distribution (Full LIAR Corpus)
            </span>
            <span className="text-[11px] text-[#64748b]">Total: 12,836 annotations</span>
          </div>
          <div className="space-y-2">
            {LIAR_STATISTICS.labels.map((item) => {
              const labelInfo = LABEL_COLORS[item.name as LabelType];
              return (
                <div key={item.name} className="flex items-center gap-3 text-xs">
                  <div className="w-24 shrink-0 font-semibold font-mono text-[11px] text-[#334155]">
                    {item.name}
                  </div>
                  <div className="flex-1 bg-[#e2e8f0] h-3 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.pct * 3.5}%`,
                        backgroundColor: labelInfo?.text || '#315fce',
                      }}
                    ></div>
                  </div>
                  <div className="w-24 text-right font-mono text-[11px] text-[#64748b]">
                    {item.count.toLocaleString()} ({item.pct}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Sample Statement Explorer */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <h3 className="text-sm font-bold text-[#17263d]">
                Interactive Benchmark Statement Explorer
              </h3>
              <p className="text-[11px] text-[#64748b]">
                Inspect real PolitiFact statements, context metadata, and original editorial classifications.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#8794a7] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search statements or speakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 text-xs bg-white border border-[#dce3ec] rounded-lg focus:outline-none focus:border-[#315fce]"
              />
            </div>
          </div>

          {/* Label Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <button
              onClick={() => setSelectedLabel('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                selectedLabel === 'all'
                  ? 'bg-[#17263d] text-white'
                  : 'bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]'
              }`}
            >
              All Labels ({SAMPLE_DATASET.length})
            </button>
            {(Object.keys(LABEL_COLORS) as LabelType[]).map((lbl) => {
              const info = LABEL_COLORS[lbl];
              const isSelected = selectedLabel === lbl;
              return (
                <button
                  key={lbl}
                  onClick={() => setSelectedLabel(lbl)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border ${
                    isSelected
                      ? 'shadow-xs ring-2 ring-[#315fce]/20'
                      : 'hover:opacity-90'
                  }`}
                  style={{
                    backgroundColor: info.bg,
                    color: info.text,
                    borderColor: info.border,
                  }}
                >
                  {lbl}
                </button>
              );
            })}
          </div>

          {/* Statement Cards */}
          <div className="space-y-3">
            {filteredStatements.map((item) => {
              const labelStyle = LABEL_COLORS[item.label];
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#cbd5e1] transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span
                      className="text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider"
                      style={{
                        backgroundColor: labelStyle.bg,
                        color: labelStyle.text,
                        border: `1px solid ${labelStyle.border}`,
                      }}
                    >
                      {item.label}
                    </span>
                    <span className="text-[11px] text-[#64748b] font-mono">
                      ID: {item.id} · {item.year}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#1e293b] leading-relaxed mb-3">
                    “{item.statement}”
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#64748b] pt-2 border-t border-[#f1f5f9]">
                    <div>
                      <span className="font-bold text-[#334155]">Speaker: </span>
                      {item.speaker} ({item.party})
                    </div>
                    <div>
                      <span className="font-bold text-[#334155]">Context: </span>
                      {item.context}
                    </div>
                    <div>
                      <span className="font-bold text-[#334155]">Topics: </span>
                      <span className="text-[#315fce]">{item.subject}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredStatements.length === 0 && (
              <div className="p-8 text-center bg-[#f8fafc] rounded-xl border border-dashed border-[#cbd5e1] text-xs text-[#64748b]">
                No benchmark statements match your filter query.
              </div>
            )}
          </div>
        </div>

        {/* Leakage Audit Warning */}
        <div className="mt-6 p-4 rounded-xl bg-[#fffbeb] border border-[#fef08a] flex items-start gap-3 text-xs text-[#92400e]">
          <AlertTriangle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Grouped Leakage Prevention Requirement:</strong> Multiple political claims repeat identical phrasings (e.g., campaign talking points). Naive random train/test splits allow near-duplicate statements and common speakers into the test fold, producing artificially inflated metrics. All evaluations in this lab enforce <em>GroupKFold on speaker and text normalized hashes</em>.
          </div>
        </div>
      </div>
    </div>
  );
};
