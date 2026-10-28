import React, { useState } from "react";
import { WebsiteSection } from "../types";
import { X, Sparkles, Wand2, Loader2 } from "lucide-react";

interface AIAssistantModalProps {
  onClose: () => void;
  onAddGeneratedSection: (section: WebsiteSection) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  onClose,
  onAddGeneratedSection,
}) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/generate-component", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate component from AI");
      }

      const newSection = await res.json();
      onAddGeneratedSection(newSection);
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const presetPrompts = [
    "A crypto staking calculator section with 3 tiers and dark styling",
    "An FAQ section for a modern SaaS startup with 4 questions",
    "A gorgeous feature grid highlighting AI copilot capabilities",
    "A testimonials section featuring quotes from tech founders",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl text-white">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold">
              ← Back
            </button>
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg">AI Component Generator</h3>
              <p className="text-xs text-slate-400">Describe any section in plain English</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleGenerate} className="p-6 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              What kind of section do you want to build?
            </label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A high-converting pricing table for an AI writing tool with 3 tiers and monthly/annual switch..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-500 resize-none"
              required
            />
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Or click a popular prompt suggestion:
            </div>
            <div className="flex flex-wrap gap-2">
              {presetPrompts.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(preset)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-xl transition-colors text-left"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-sm font-semibold shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Section...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-amber-300" />
                  Generate with AI
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
