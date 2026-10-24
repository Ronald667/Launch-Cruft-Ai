import React from "react";
import { TEMPLATES } from "../data/templates";
import { WebsiteProject } from "../types";
import { X, ArrowRight, Sparkles } from "lucide-react";

interface TemplatesModalProps {
  onClose: () => void;
  onSelectTemplate: (project: WebsiteProject) => void;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  onClose,
  onSelectTemplate,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Professional Templates</h3>
              <p className="text-xs text-slate-400">Choose a template to kickstart your website instantly</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto grid md:grid-cols-3 gap-6">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="group rounded-2xl bg-slate-800/40 border border-slate-700/60 overflow-hidden flex flex-col justify-between hover:border-indigo-500 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={tmpl.image}
                    alt={tmpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/90 text-indigo-400 text-xs font-semibold backdrop-blur-md border border-slate-700">
                    {tmpl.category}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">
                    {tmpl.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    onSelectTemplate(tmpl.project);
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                >
                  Use Template
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
