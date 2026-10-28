import React from "react";
import { WebsiteProject } from "../types";
import { X, FolderOpen, ExternalLink, Trash2, Sparkles, Globe, Edit3 } from "lucide-react";

interface ProjectsModalProps {
  projects: WebsiteProject[];
  currentProjectId: string;
  onClose: () => void;
  onSelectProject: (project: WebsiteProject) => void;
  onPreviewProject: (project: WebsiteProject) => void;
  onDeleteProject: (projectId: string) => void;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({
  projects,
  currentProjectId,
  onClose,
  onSelectProject,
  onPreviewProject,
  onDeleteProject,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold">
              ← Back
            </button>
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <FolderOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg">My Generated Websites & Projects</h3>
              <p className="text-xs text-slate-400">Preview, manage, and switch between your created websites</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {projects.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Sparkles className="w-8 h-8 text-indigo-400 mx-auto animate-pulse" />
              <p className="text-slate-400 text-sm">No saved projects yet. Generate one with AI or load a template!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((proj) => {
                const isActive = proj.id === currentProjectId;
                const sectionCount = proj.pages[0]?.sections?.length || 0;
                return (
                  <div
                    key={proj.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${isActive ? "bg-indigo-950/30 border-indigo-500 shadow-xl" : "bg-slate-800/40 border-slate-700/60 hover:border-slate-600"}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase tracking-wider font-bold text-indigo-400 flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5" />
                          {proj.subdomain || "mysite"}.launchcraft.ai
                        </span>
                        {isActive && (
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold">
                            Active
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-lg text-white mb-1">{proj.title}</h4>
                      <p className="text-xs text-slate-400">
                        {sectionCount} section{sectionCount === 1 ? "" : "s"} • Font: {proj.theme.fontFamily}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80">
                      <button
                        onClick={() => {
                          onPreviewProject(proj);
                          onClose();
                        }}
                        className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                        Preview Site
                      </button>
                      {!isActive && (
                        <button
                          onClick={() => {
                            onSelectProject(proj);
                            onClose();
                          }}
                          className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Open Editor
                        </button>
                      )}
                      {projects.length > 1 && !isActive && (
                        <button
                          onClick={() => onDeleteProject(proj.id)}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
