import React, { useState } from "react";
import { WebsiteProject } from "../types";
import { RenderSection } from "./RenderSection";
import { X, Monitor, Tablet, Smartphone, Globe, Sparkles } from "lucide-react";

interface PreviewModalProps {
  project: WebsiteProject;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  project,
  onClose,
}) => {
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const activePage = project.pages.find((p) => p.id === project.activePageId) || project.pages[0];

  const deviceWidthClass = 
    deviceView === "mobile" 
      ? "max-w-[390px] my-8 rounded-[40px] border-[12px] border-slate-900 shadow-2xl overflow-hidden" 
      : deviceView === "tablet" 
      ? "max-w-[768px] my-6 rounded-3xl border-8 border-slate-900 shadow-2xl overflow-hidden" 
      : "w-full";

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* Preview Top Header Bar */}
      <div className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm">{project.theme.siteName || "Live Preview"}</h3>
            <p className="text-[10px] text-slate-400">Interactive Visitor Mode</p>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button 
            onClick={() => setDeviceView("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${deviceView === "desktop" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Desktop
          </button>
          <button 
            onClick={() => setDeviceView("tablet")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${deviceView === "tablet" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
          >
            <Tablet className="w-3.5 h-3.5" />
            Tablet
          </button>
          <button 
            onClick={() => setDeviceView("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${deviceView === "mobile" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile
          </button>
        </div>

        <button 
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold transition-colors border border-slate-700"
        >
          <X className="w-4 h-4" />
          Exit Preview
        </button>
      </div>

      {/* Preview Canvas Content */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center p-4 md:p-8 bg-slate-950">
        <div className={`transition-all duration-300 w-full bg-white text-slate-900 ${deviceWidthClass} font-${project.theme.fontFamily.toLowerCase()}`}>
          {activePage.sections.map((section) => (
            <RenderSection
              key={section.id}
              section={section}
              isDarkMode={project.theme.isDarkMode}
              onEdit={() => {}}
              onDelete={() => {}}
              onMoveUp={() => {}}
              onMoveDown={() => {}}
              onDuplicate={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
