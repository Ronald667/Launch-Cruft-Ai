import React from "react";
import { WebsiteProject } from "../types";
import { 
  Layout, Sparkles, Code, Globe, Monitor, Tablet, Smartphone, 
  Layers, Palette, Search, Building2, Rocket, Eye
} from "lucide-react";

interface NavbarProps {
  project: WebsiteProject;
  deviceView: "desktop" | "tablet" | "mobile";
  setDeviceView: (view: "desktop" | "tablet" | "mobile") => void;
  onOpenTemplates: () => void;
  onOpenAiAssistant: () => void;
  onOpenBusinessGenerator: () => void;
  onOpenSeoAssistant: () => void;
  onOpenExport: () => void;
  onOpenPublish: () => void;
  onOpenPreview: () => void;
  onRunAudit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  project,
  deviceView,
  setDeviceView,
  onOpenTemplates,
  onOpenAiAssistant,
  onOpenBusinessGenerator,
  onOpenSeoAssistant,
  onOpenExport,
  onOpenPublish,
  onOpenPreview,
  onRunAudit,
}) => {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between text-white z-40 relative select-none">
      {/* Logo & Project Title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-lg bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
              LaunchCraft AI
            </span>
            <div className="text-[10px] text-indigo-400 font-medium tracking-wide">
              {project.theme.siteName || "Untitled Project"}
            </div>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-slate-800 mx-2 hidden md:block" />

        <button 
          onClick={onOpenTemplates}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium transition-colors border border-slate-700"
        >
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          Samples & Templates
        </button>

        <button 
          onClick={onOpenBusinessGenerator}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium transition-colors border border-slate-700 text-purple-300"
        >
          <Building2 className="w-3.5 h-3.5 text-purple-400" />
          AI Business Generator
        </button>
      </div>

      {/* Device Viewport Switcher */}
      <div className="hidden xl:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner">
        <button 
          onClick={() => setDeviceView("desktop")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${deviceView === "desktop" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
        >
          <Monitor className="w-3.5 h-3.5" />
          Desktop
        </button>
        <button 
          onClick={() => setDeviceView("tablet")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${deviceView === "tablet" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
        >
          <Tablet className="w-3.5 h-3.5" />
          Tablet
        </button>
        <button 
          onClick={() => setDeviceView("mobile")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${deviceView === "mobile" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          Mobile
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenPreview}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium transition-colors border border-slate-700 text-indigo-300"
        >
          <Eye className="w-4 h-4 text-indigo-400" />
          <span className="hidden sm:inline">Preview</span>
        </button>

        <button 
          onClick={onOpenAiAssistant}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-semibold shadow-lg shadow-purple-600/25 transition-all transform hover:-translate-y-0.5"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="hidden sm:inline">AI Component</span>
        </button>

        <button 
          onClick={onOpenSeoAssistant}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium transition-colors border border-slate-700 text-indigo-300"
        >
          <Search className="w-4 h-4 text-indigo-400" />
          <span className="hidden md:inline">SEO</span>
        </button>

        <button 
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium transition-colors border border-slate-700"
        >
          <Code className="w-4 h-4 text-indigo-400" />
          <span className="hidden md:inline">Export</span>
        </button>

        <button 
          onClick={onOpenPublish}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5"
        >
          <Globe className="w-4 h-4" />
          <span>Publish</span>
        </button>
      </div>
    </header>
  );
};
