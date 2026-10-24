import React, { useState } from "react";
import { WebsiteProject, SectionType, ThemeSettings } from "../types";
import { 
  Plus, Layers, Palette, FileText, Sparkles, Image as ImageIcon, 
  Upload, Wand2, Loader2, Copy, Check, Trash2, Sun, Moon
} from "lucide-react";

interface SidebarProps {
  project: WebsiteProject;
  assets: string[];
  onAddSection: (type: SectionType) => void;
  onUpdateTheme: (newTheme: Partial<ThemeSettings>) => void;
  onUploadImage: (url: string) => void;
  onGenerateAiImage: (prompt: string) => Promise<void>;
  onSelectAsset: (url: string) => void;
  onDeleteAsset?: (url: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  project,
  assets,
  onAddSection,
  onUpdateTheme,
  onUploadImage,
  onGenerateAiImage,
  onSelectAsset,
  onDeleteAsset,
}) => {
  const [activeTab, setActiveTab] = useState<"sections" | "theme" | "pages" | "images">("sections");
  const [aiImagePrompt, setAiImagePrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const sectionOptions: { type: SectionType; title: string; description: string; icon: string }[] = [
    { type: "hero", title: "Hero Header", description: "High impact heading & call-to-action", icon: "🚀" },
    { type: "features", title: "Features Grid", description: "Highlight key product advantages", icon: "⚡" },
    { type: "pricing", title: "Pricing Tiers", description: "Monetization and subscription plans", icon: "💎" },
    { type: "testimonials", title: "Testimonials", description: "Customer reviews & social proof", icon: "⭐" },
    { type: "stats", title: "Key Metrics", description: "Showcase impressive numbers", icon: "📊" },
    { type: "gallery", title: "Gallery / Showcase", description: "Product shots and case studies", icon: "🖼️" },
    { type: "team", title: "Team Members", description: "Introduce leadership and creators", icon: "👥" },
    { type: "faq", title: "FAQ Accordion", description: "Answer customer objections", icon: "❓" },
    { type: "contact", title: "Contact Form", description: "Lead generation and inquiries", icon: "✉️" },
    { type: "cta", title: "Call to Action", description: "Conversion banner", icon: "🎯" },
    { type: "footer", title: "Footer", description: "Links, copyright and social icons", icon: "🏁" },
  ];

  const handleAiImageGen = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiImagePrompt.trim()) return;
    setGeneratingImg(true);
    try {
      await onGenerateAiImage(aiImagePrompt);
      setAiImagePrompt("");
    } finally {
      setGeneratingImg(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    onUploadImage(customUrlInput);
    setCustomUrlInput("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          onUploadImage(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-[calc(100vh-4rem)] text-white select-none">
      {/* Sidebar Navigation Tabs */}
      <div className="grid grid-cols-4 border-b border-slate-800 p-1.5 gap-1 bg-slate-950/50">
        <button
          onClick={() => setActiveTab("sections")}
          className={`flex flex-col items-center justify-center py-2 rounded-xl text-[10px] font-semibold transition-all ${activeTab === "sections" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
          title="Add Sections"
        >
          <Layers className="w-4 h-4 mb-0.5" />
          Sections
        </button>
        <button
          onClick={() => setActiveTab("images")}
          className={`flex flex-col items-center justify-center py-2 rounded-xl text-[10px] font-semibold transition-all ${activeTab === "images" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
          title="Image Manager"
        >
          <ImageIcon className="w-4 h-4 mb-0.5" />
          Images
        </button>
        <button
          onClick={() => setActiveTab("theme")}
          className={`flex flex-col items-center justify-center py-2 rounded-xl text-[10px] font-semibold transition-all ${activeTab === "theme" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
          title="Theme"
        >
          <Palette className="w-4 h-4 mb-0.5" />
          Theme
        </button>
        <button
          onClick={() => setActiveTab("pages")}
          className={`flex flex-col items-center justify-center py-2 rounded-xl text-[10px] font-semibold transition-all ${activeTab === "pages" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
          title="Pages"
        >
          <FileText className="w-4 h-4 mb-0.5" />
          Pages
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === "sections" && (
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Click to insert section
            </div>
            {sectionOptions.map((opt) => (
              <button
                key={opt.type}
                onClick={() => onAddSection(opt.type)}
                className="w-full text-left p-3.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/50 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-xl bg-slate-900 shadow">{opt.icon}</span>
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors">
                      {opt.title}
                    </div>
                    <div className="text-xs text-slate-400">{opt.description}</div>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
              </button>
            ))}
          </div>
        )}

        {activeTab === "images" && (
          <div className="space-y-6">
            {/* AI Image Generator Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-800/40 border border-indigo-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-300" />
                Generate AI Image Asset
              </div>
              <form onSubmit={handleAiImageGen} className="space-y-2">
                <input
                  type="text"
                  value={aiImagePrompt}
                  onChange={(e) => setAiImagePrompt(e.target.value)}
                  placeholder="e.g. futuristic neon SaaS dashboard..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button
                  type="submit"
                  disabled={generatingImg}
                  className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {generatingImg ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                  Generate Asset
                </button>
              </form>
            </div>

            {/* Upload or URL input */}
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Upload or Add URL</div>
              <div className="flex gap-2">
                <label className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium cursor-pointer flex items-center justify-center gap-2 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Upload File</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Asset Library Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Asset Library ({assets.length})</span>
                <span className="text-[10px] text-slate-500">Click to copy URL</span>
              </div>
              <div className="grid grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-1">
                {assets.map((url, idx) => (
                  <div key={idx} className="group relative rounded-xl overflow-hidden border border-slate-700/60 bg-slate-800 aspect-square shadow">
                    <img src={url} alt={`Asset ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-150 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(url);
                          setCopiedUrl(url);
                          setTimeout(() => setCopiedUrl(null), 2000);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-semibold flex items-center gap-1 shadow"
                      >
                        {copiedUrl === url ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copiedUrl === url ? "Copied" : "Copy URL"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "theme" && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Site Title
              </label>
              <input
                type="text"
                value={project.theme.siteName}
                onChange={(e) => onUpdateTheme({ siteName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Font Family
              </label>
              <select
                value={project.theme.fontFamily}
                onChange={(e: any) => onUpdateTheme({ fontFamily: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Inter">Inter (Modern & Clean)</option>
                <option value="Poppins">Poppins (Friendly Sans)</option>
                <option value="Outfit">Outfit (Geometric)</option>
                <option value="Roboto">Roboto (Classic)</option>
                <option value="Space Grotesk">Space Grotesk (Tech & Crypto)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Dark Mode Toggle
              </label>
              <button
                onClick={() => onUpdateTheme({ isDarkMode: !project.theme.isDarkMode })}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800 border border-slate-700 text-sm font-medium hover:border-indigo-500 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {project.theme.isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                  {project.theme.isDarkMode ? "Dark Theme Active" : "Light Theme Active"}
                </span>
                <div className={`w-10 h-6 rounded-full transition-colors p-1 ${project.theme.isDarkMode ? "bg-indigo-600" : "bg-slate-700"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${project.theme.isDarkMode ? "translate-x-4" : "translate-x-0"}`} />
                </div>
              </button>
            </div>
          </div>
        )}

        {activeTab === "pages" && (
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Website Pages
            </div>
            {project.pages.map((page) => (
              <div 
                key={page.id}
                className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-sm">{page.title}</div>
                  <div className="text-xs text-slate-400">{page.path}</div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 font-medium">
                  Active
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
