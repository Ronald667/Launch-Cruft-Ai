import React, { useState } from "react";
import { WebsiteProject } from "../types";
import { X, Sparkles, Search, CheckCircle2, AlertCircle, Loader2, Wand2 } from "lucide-react";

interface SeoAssistantModalProps {
  project: WebsiteProject;
  onClose: () => void;
  onUpdateMeta: (metaTitle: string, metaDescription: string) => void;
}

export const SeoAssistantModal: React.FC<SeoAssistantModalProps> = ({
  project,
  onClose,
  onUpdateMeta,
}) => {
  const [targetKeyword, setTargetKeyword] = useState("ai landing page builder");
  const [loading, setLoading] = useState(false);
  const [auditData, setAuditData] = useState<any>(null);
  const [applied, setApplied] = useState(false);

  const handleRunSeoAudit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/ai/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteData: project, targetKeyword }),
      });
      const data = await res.json();
      setAuditData(data);
    } catch (err) {
      console.error("SEO Audit failed", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleRunSeoAudit();
  }, []);

  const handleApplyMeta = () => {
    if (auditData) {
      onUpdateMeta(auditData.metaTitle, auditData.metaDescription);
      setApplied(true);
      setTimeout(() => setApplied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg">AI SEO Optimization Assistant</h3>
              <p className="text-xs text-slate-400">Analyze keywords, meta tags, and headings for search engine rankings</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Keyword Search Input */}
          <form onSubmit={handleRunSeoAudit} className="flex gap-3">
            <input
              type="text"
              value={targetKeyword}
              onChange={(e) => setTargetKeyword(e.target.value)}
              placeholder="Enter target keyword (e.g. startup landing page generator)"
              className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
              Analyze SEO
            </button>
          </form>

          {loading ? (
            <div className="py-16 text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
              <p className="text-sm text-slate-400">AI is analyzing keyword density, headings structure, and meta tags...</p>
            </div>
          ) : auditData ? (
            <div className="space-y-6">
              {/* SEO Score Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-indigo-400 font-bold">SEO Health Score</div>
                  <div className="text-3xl font-extrabold mt-1 text-white">{auditData.seoScore} / 100</div>
                  <p className="text-xs text-slate-400 mt-1">Target Keyword: <span className="text-white font-semibold">{auditData.targetKeyword}</span></p>
                </div>
                <button
                  onClick={handleApplyMeta}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition-all flex items-center gap-2"
                >
                  {applied ? <CheckCircle2 className="w-4 h-4" /> : <Wand2 className="w-4 h-4" />}
                  {applied ? "Applied to Site!" : "Apply AI Meta Tags"}
                </button>
              </div>

              {/* Recommended Meta Tags */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Suggested Meta Tags</h4>
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3">
                  <div>
                    <span className="text-xs text-indigo-400 font-medium">Meta Title:</span>
                    <p className="text-sm font-semibold text-white mt-0.5">{auditData.metaTitle}</p>
                  </div>
                  <div>
                    <span className="text-xs text-indigo-400 font-medium">Meta Description:</span>
                    <p className="text-sm text-slate-300 mt-0.5">{auditData.metaDescription}</p>
                  </div>
                </div>
              </div>

              {/* Keyword Ideas */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Recommended High-Ranking Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {auditData.keywordSuggestions?.map((kw: string, idx: number) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-indigo-300 font-medium">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actionable Tips */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Actionable Recommendations</h4>
                <div className="space-y-2">
                  {auditData.actionableTips?.map((tip: string, idx: number) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-800/30 border border-slate-700/50 flex items-start gap-3 text-xs text-slate-300">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
