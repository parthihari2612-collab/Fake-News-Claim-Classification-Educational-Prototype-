import React from 'react';
import { ShieldCheck, AlertOctagon, CheckCircle2, Lock, Scale, Eye } from 'lucide-react';

export const ResponsibleAiModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#e5eaf0] rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#f1f5f9]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a86e18] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Module 07 · Responsible AI &amp; Ethical Governance</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#17263d]">
              Make Epistemic Limitations Impossible to Miss
            </h2>
            <p className="text-xs text-[#66758a] mt-1">
              Mislabeling claims can damage reputations, erode public trust, and censor legitimate dissent. An educational tool must reinforce caution over automation.
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#a86e18] bg-[#fff6e7] px-3 py-1.5 rounded-lg border border-[#fef08a] self-start">
            Safety Guardrails Active
          </span>
        </div>

        {/* Warning Banner */}
        <div className="my-5 p-5 rounded-2xl bg-[#fff9f8] border border-[#eed6d5] flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#fdebea] text-[#b94d53] flex items-center justify-center shrink-0">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div className="text-xs leading-relaxed">
            <h3 className="text-sm font-bold text-[#7c3b40] mb-1">
              Fundamental Rule: Never Present an Algorithmic Class as a Ground Truth Verdict
            </h3>
            <p className="text-[#79595b] mb-2">
              Predictions produced by sparse or deep language models are statistical interpolations over historical text. They do not possess ontological awareness, sensor observation, or investigative agency.
            </p>
            <p className="text-[#79595b]">
              Under no circumstances should this software be integrated into automated account suspension, content de-platforming, credit scoring, or judicial risk assessment systems.
            </p>
          </div>
        </div>

        {/* 4 Core Governance Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#17263d]">
              <Scale className="w-4 h-4 text-[#315fce]" />
              <span>01 · Rigorous Prediction Wording</span>
            </div>
            <p className="text-xs text-[#66758a] leading-relaxed mb-2">
              All UI surfaces and API outputs must format predictions as: <em>“Model prediction for PolitiFact category”</em>. The words <strong>“True”</strong>, <strong>“Fake”</strong>, or <strong>“Debunked”</strong> must never be applied autonomously without human attribution.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#17263d]">
              <Eye className="w-4 h-4 text-[#168579]" />
              <span>02 · Visible Uncertainty Disclosures</span>
            </div>
            <p className="text-xs text-[#66758a] leading-relaxed mb-2">
              Whenever probabilities are displayed, the complete probability distribution across all 6 classes must be accessible. High entropy (ambiguous predictions) must prompt an explicit “Low Confidence / Disputed” alert.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#17263d]">
              <Lock className="w-4 h-4 text-[#a86e18]" />
              <span>03 · Data Privacy &amp; Anti-Targeting</span>
            </div>
            <p className="text-xs text-[#66758a] leading-relaxed mb-2">
              Prohibit testing private personal claims regarding non-public figures. Texts submitted into client testing modules are processed strictly in ephemeral memory and never stored in surveillance logs.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#17263d]">
              <CheckCircle2 className="w-4 h-4 text-[#315fce]" />
              <span>04 · Mandatory Human Audit &amp; Recourse</span>
            </div>
            <p className="text-xs text-[#66758a] leading-relaxed mb-2">
              Any classification applied in educational settings must feature an accessible audit trail, citing the benchmark revision, random seed, training split, and a one-click disputation worksheet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
