import React, { useState, useEffect } from "react";
import { WebsiteSection } from "../types";
import { X, Sparkles, Wand2, Loader2, CheckCircle2, ArrowRight } from "lucide-react";

interface SmartLayoutModalProps {
  sections: WebsiteSection[];
  onClose: () => void;
  onApplyLayout: (newSections: WebsiteSection[]) => void;
}

export const SmartLayoutModal: React.FC<SmartLayoutModalProps> = ({
  sections,
  onClose,
  onApplyLayout,
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ rationale: string; reorderedSections: WebsiteSection[] } | null>(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchSmartLayout = async () => {
      try {
        const res = await fetch("/api/ai/smart-layout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sections }),
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Smart layout fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSmartLayout();
  }, [sections]);

  const handleApply = () => {
    if (data && data.reorderedSections) {
      onApplyLayout(data.reorderedSections);
      setApplied(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold">
              ← Back
            </button>
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg">AI Smart Layout Engine</h3>
              <p className="text-xs text-slate-400">Optimizing section flow and engagement hierarchy</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {loading ? (
            <div className="py-20 text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-400" />
              <p className="text-sm text-slate-400">AI is analyzing conversion funnel and section flow...</p>
            </div>
          ) : data ? (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-500/30 space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-bold text-purple-300">Layout Rationale</h4>
                <p className="text-sm text-slate-200 leading-relaxed">{data.rationale}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Proposed Section Sequence</h4>
                <div className="space-y-2">
                  {data.reorderedSections.map((sec, idx) => (
                    <div key={sec.id} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-semibold text-white">{sec.name}</div>
                          <div className="text-xs text-slate-400 truncate max-w-sm">{sec.title}</div>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-slate-700 text-slate-300 capitalize">
                        {sec.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950/50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={loading || !data}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-sm font-semibold shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {applied ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Wand2 className="w-4 h-4 text-amber-300" />}
            {applied ? "Layout Applied!" : "Apply Optimized Layout"}
          </button>
        </div>
      </div>
    </div>
  );
};
