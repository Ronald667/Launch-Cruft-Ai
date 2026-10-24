import React from "react";
import { WebsiteProject, WebsiteSection } from "../types";
import { RenderSection } from "./RenderSection";
import { Plus, Sparkles } from "lucide-react";

interface CanvasProps {
  project: WebsiteProject;
  deviceView: "desktop" | "tablet" | "mobile";
  onEditSection: (section: WebsiteSection) => void;
  onDeleteSection: (sectionId: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDuplicate: (section: WebsiteSection) => void;
  onAiCopywrite: (section: WebsiteSection) => void;
  onOpenAiAssistant: () => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  project,
  deviceView,
  onEditSection,
  onDeleteSection,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onAiCopywrite,
  onOpenAiAssistant,
}) => {
  const activePage = project.pages.find((p) => p.id === project.activePageId) || project.pages[0];

  const deviceWidthClass = 
    deviceView === "mobile" 
      ? "max-w-[390px] my-8 rounded-[40px] border-[10px] border-slate-800 shadow-2xl overflow-hidden" 
      : deviceView === "tablet" 
      ? "max-w-[768px] my-6 rounded-3xl border-8 border-slate-800 shadow-2xl overflow-hidden" 
      : "w-full";

  return (
    <main className="flex-1 bg-slate-950 overflow-y-auto flex flex-col items-center p-4 md:p-8">
      <div className={`transition-all duration-300 w-full bg-white text-slate-900 ${deviceWidthClass} font-${project.theme.fontFamily.toLowerCase()}`}>
        {activePage.sections.length === 0 ? (
          <div className="py-32 px-6 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">Your page is empty</h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Add sections from the left sidebar or use AI to instantly generate professional landing page components.
            </p>
            <button
              onClick={onOpenAiAssistant}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/25 transition-all"
            >
              Generate with AI
            </button>
          </div>
        ) : (
          activePage.sections.map((section, idx) => (
            <RenderSection
              key={section.id}
              section={section}
              isDarkMode={project.theme.isDarkMode}
              onEdit={() => onEditSection(section)}
              onDelete={() => onDeleteSection(section.id)}
              onMoveUp={() => onMoveUp(idx)}
              onMoveDown={() => onMoveDown(idx)}
              onDuplicate={() => onDuplicate(section)}
              onAiCopywrite={() => onAiCopywrite(section)}
            />
          ))
        )}
      </div>
    </main>
  );
};
