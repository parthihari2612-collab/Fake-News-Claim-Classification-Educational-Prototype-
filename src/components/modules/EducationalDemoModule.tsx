import React, { useState } from 'react';
import { FileCheck, CheckCircle2, Copy, Printer, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

const PRESET_CLAIMS = [
  {
    title: 'Economic Jobs Claim',
    claim: 'The United States added more manufacturing jobs in 2023 than in the entire preceding decade.',
    source: 'National Economic Address',
    expectedPrimaryRepo: 'Bureau of Labor Statistics (BLS) Current Employment Statistics',
  },
  {
    title: 'Health / Medical Claim',
    claim: 'Consuming raw garlic and hot lemon extract eliminates over 95 percent of active airborne respiratory viruses within 4 hours.',
    source: 'Viral Social Media Video',
    expectedPrimaryRepo: 'National Institutes of Health (NIH) / PubMed Peer-Reviewed Clinical Trials',
  },
  {
    title: 'Energy Policy Claim',
    claim: 'Renewable solar and wind generation provided over 80 percent of California peak electricity demand during spring months.',
    source: 'State Environmental Briefing',
    expectedPrimaryRepo: 'California ISO (CAISO) Grid Real-Time Reliability Dashboard',
  },
  {
    title: 'Government Budget Claim',
    claim: 'The proposed federal omnibus legislation directs $45 billion exclusively to foreign climate projects with zero domestic oversight.',
    source: 'Press Conference Statement',
    expectedPrimaryRepo: 'Congressional Budget Office (CBO) & Library of Congress Legislative Text (Congress.gov)',
  },
];

export const EducationalDemoModule: React.FC = () => {
  const [claimInput, setClaimInput] = useState<string>(PRESET_CLAIMS[0].claim);
  const [worksheetActive, setWorksheetActive] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCreateWorksheet = () => {
    if (!claimInput.trim()) return;
    setWorksheetActive(true);
  };

  const handleCopyMarkdown = () => {
    const text = `# Verification Worksheet: Signal & Source Lab\n\nClaim to Investigate:\n"${claimInput}"\n\nGenerated Checkpoints:\n1. Primary Source: Locate the exact unedited transcript, audio, or document.\n2. Context: Who stated it, in what venue, on what date, and in response to what inquiry?\n3. Benchmark Repositories: Check primary data sources (BLS, CBO, peer-reviewed records).\n4. Multi-Source Independent Fact-Checks: Cross-examine Google Fact Check Explorer, AP, and PolitiFact.\n5. Nuanced Verdict Note: Document citations and caveats instead of assigning a binary badge.\n\nNotice: Produced for educational media literacy. No machine classification was performed.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#e5eaf0] rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#f1f5f9]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#315fce] uppercase tracking-wider mb-1">
              <FileCheck className="w-4 h-4" />
              <span>Module 06 · Educational Verification Worksheet Builder</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#17263d]">
              Pause Before You Share: Evidence-First Protocol
            </h2>
            <p className="text-xs text-[#66758a] mt-1">
              Convert any factual statement into a rigorous, primary-source verification plan. Teaches investigative inquiry instead of passive trust in AI stamps.
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#168579] bg-[#e9f7f4] px-3 py-1.5 rounded-lg border border-[#bbf7d0] self-start">
            Human-in-the-Loop Tool
          </span>
        </div>

        {/* Preset Sample Claims */}
        <div className="my-5">
          <div className="text-xs font-bold text-[#334155] mb-2">
            Load Pre-Configured Sample Claims to Investigate:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {PRESET_CLAIMS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setClaimInput(p.claim);
                  setWorksheetActive(true);
                }}
                className="p-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-white hover:border-[#cbd5e1] text-left transition-all group"
              >
                <div className="text-[10px] font-bold text-[#315fce] mb-0.5">{p.title}</div>
                <div className="text-xs text-[#1e293b] font-medium line-clamp-2 mb-1">
                  “{p.claim}”
                </div>
                <div className="text-[10px] text-[#64748b] truncate">{p.source}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Form & Worksheet Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Claim Input Column */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <label htmlFor="custom-claim" className="block text-xs font-bold text-[#334155] mb-1.5">
                Statement / Claim to Verify
              </label>
              <textarea
                id="custom-claim"
                rows={4}
                value={claimInput}
                onChange={(e) => setClaimInput(e.target.value)}
                placeholder="Paste any verifiable claim, news headline, or statistical statement..."
                className="w-full p-3.5 text-xs bg-white border border-[#dce3ec] rounded-xl text-[#17263d] focus:outline-none focus:border-[#315fce] focus:ring-2 focus:ring-[#315fce]/15 leading-relaxed"
              ></textarea>
              <div className="flex justify-between items-center text-[11px] text-[#64748b] mt-1">
                <span>Maximum 1,200 characters</span>
                <span className="text-[#168579] font-medium">Text stays private on your local client</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCreateWorksheet}
                className="px-4 py-2 bg-[#315fce] hover:bg-[#244aa5] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Verification Worksheet</span>
              </button>
              {worksheetActive && (
                <button
                  onClick={handleCopyMarkdown}
                  className="px-3 py-2 bg-white hover:bg-[#f8fafc] text-[#334155] border border-[#dce3ec] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Markdown'}</span>
                </button>
              )}
            </div>

            {/* External Verification Engines */}
            <div className="pt-4 border-t border-[#f1f5f9]">
              <div className="text-xs font-bold text-[#334155] mb-2">
                External Fact-Checking Repositories:
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`https://toolbox.google.com/factcheck/explorer/search/list:recent;hl=en`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-[#e2e8f0] bg-white hover:border-[#315fce] hover:text-[#315fce] flex items-center justify-between"
                >
                  <span className="font-semibold">Google Fact Check Explorer</span>
                  <ExternalLink className="w-3 h-3 text-[#94a3b8]" />
                </a>
                <a
                  href="https://www.politifact.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-[#e2e8f0] bg-white hover:border-[#315fce] hover:text-[#315fce] flex items-center justify-between"
                >
                  <span className="font-semibold">PolitiFact Deep Archive</span>
                  <ExternalLink className="w-3 h-3 text-[#94a3b8]" />
                </a>
                <a
                  href="https://apnews.com/hub/ap-fact-check"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-[#e2e8f0] bg-white hover:border-[#315fce] hover:text-[#315fce] flex items-center justify-between"
                >
                  <span className="font-semibold">Associated Press Fact Check</span>
                  <ExternalLink className="w-3 h-3 text-[#94a3b8]" />
                </a>
                <a
                  href="https://www.snopes.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-[#e2e8f0] bg-white hover:border-[#315fce] hover:text-[#315fce] flex items-center justify-between"
                >
                  <span className="font-semibold">Snopes Archive</span>
                  <ExternalLink className="w-3 h-3 text-[#94a3b8]" />
                </a>
              </div>
            </div>
          </div>

          {/* Generated Worksheet Column */}
          <div className="lg:col-span-6">
            <div className="bg-[#f8faff] border border-[#d7e2fb] rounded-2xl p-5 shadow-xs h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#168579]"></span>
                    <span className="text-xs font-bold text-[#17263d]">
                      Generated 5-Point Verification Worksheet
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#168579] bg-[#e9f7f4] px-2 py-0.5 rounded border border-[#bbf7d0]">
                    Zero Model Bias
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#d7e2fb] text-xs font-semibold text-[#1e293b] leading-relaxed mb-4">
                  <span className="text-[10px] font-bold text-[#64748b] block mb-0.5">Target Statement:</span>
                  “{claimInput}”
                </div>

                <ol className="space-y-3 text-xs text-[#334155]">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#edf3ff] text-[#315fce] font-extrabold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-[#17263d] block">Locate the Original Transcript / Footage:</strong>
                      <span>Find the uninterrupted recording or verbatim text to ensure the quote was not selectively edited or taken out of sequence.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#edf3ff] text-[#315fce] font-extrabold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-[#17263d] block">Anchor Context &amp; Temporal Baseline:</strong>
                      <span>Record exactly when the claim was delivered, the geography referenced, and the question being answered.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#edf3ff] text-[#315fce] font-extrabold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-[#17263d] block">Query Primary Statistical Repositories:</strong>
                      <span>Directly inspect official records (e.g. BLS, Census, CBO, SEC filings) rather than relying on secondary blog summaries.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#edf3ff] text-[#315fce] font-extrabold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      4
                    </span>
                    <div>
                      <strong className="text-[#17263d] block">Cross-Examine Multiple Independent Newsrooms:</strong>
                      <span>Compare assessments from at least two news organizations with distinct ownership structures and editorial boards.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#edf3ff] text-[#315fce] font-extrabold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      5
                    </span>
                    <div>
                      <strong className="text-[#17263d] block">Draft Nuanced Contextual Summary:</strong>
                      <span>Synthesize findings into an evidence summary highlighting what is established, what is unverified, and what is in dispute.</span>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center gap-2 text-[11px] text-[#64748b]">
                <CheckCircle2 className="w-4 h-4 text-[#168579] shrink-0" />
                <span>Worksheet formatted for academic journalism and educational critical-thinking courses.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
