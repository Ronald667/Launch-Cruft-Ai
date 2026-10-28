import React, { useState } from "react";
import { WebsiteProject } from "../types";
import { X, Sparkles, Wand2, Loader2, Building2 } from "lucide-react";

interface BusinessGeneratorModalProps {
  onClose: () => void;
  onApplyGeneratedProject: (project: WebsiteProject) => void;
}

export const BusinessGeneratorModal: React.FC<BusinessGeneratorModalProps> = ({
  onClose,
  onApplyGeneratedProject,
}) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/generate-business-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessDescription: description }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate website from business description");
      }

      const data = await res.json();
      const newProject: WebsiteProject = {
        id: "proj_" + Math.random().toString(36).substring(2, 9),
        title: data.title || "My Business Site",
        subdomain: data.subdomain || "mysite",
        theme: data.theme || {
          siteName: data.title || "Business Site",
          fontFamily: "Inter",
          borderRadius: "rounded-xl",
          accentColor: "indigo",
          isDarkMode: false,
        },
        activePageId: "home",
        pages: [
          {
            id: "home",
            title: "Home",
            path: "/",
            sections: data.sections || [],
          }
        ]
      };

      onApplyGeneratedProject(newProject);
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const examples = [
    "A boutique artisanal coffee roaster focused on single-origin beans and sustainability.",
    "A boutique digital marketing agency helping SaaS startups scale through SEO and paid ads.",
    "A luxury interior design studio offering bespoke minimalist home decor and furniture.",
    "A modern fitness coaching platform with AI-tailored workout plans and nutrition guides."
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
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg">AI Business Website Generator</h3>
              <p className="text-xs text-slate-400">Generate copy, headlines, and layouts from your business idea</p>
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
              Describe your business or product in detail:
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. A boutique artisanal coffee roaster focused on single-origin beans and sustainability..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-500 resize-none"
              required
            />
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Or pick an example:
            </div>
            <div className="flex flex-col gap-2">
              {examples.map((ex, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setDescription(ex)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 p-2.5 rounded-xl transition-colors text-left"
                >
                  {ex}
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
                  Generating Full Website...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-amber-300" />
                  Generate Website
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
