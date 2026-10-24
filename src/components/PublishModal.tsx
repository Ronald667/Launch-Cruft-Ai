import React, { useState } from "react";
import { WebsiteProject } from "../types";
import { X, Globe, ExternalLink, CheckCircle2, Rocket, Sparkles } from "lucide-react";

interface PublishModalProps {
  project: WebsiteProject;
  onClose: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  project,
  onClose,
}) => {
  const [isPublished, setIsPublished] = useState(true);
  const subdomainUrl = `https://${project.subdomain || "mysite"}.launchcraft.ai`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl text-white">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg">One-Click Publish</h3>
              <p className="text-xs text-slate-400">Deploy your website globally in seconds</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h4 className="text-xl font-bold">Your Website is Live!</h4>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              Published successfully with global SSL certificate and edge content delivery network (CDN).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-between gap-3">
            <span className="text-sm font-mono text-indigo-300 truncate">{subdomainUrl}</span>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("Opening live preview: " + subdomainUrl); }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors shadow"
            >
              Visit Live <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left pt-2">
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
              <div className="text-xs text-slate-400">Total Visitors</div>
              <div className="text-2xl font-bold mt-1 text-white">1,428</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
              <div className="text-xs text-slate-400">Uptime Status</div>
              <div className="text-2xl font-bold mt-1 text-emerald-400">100%</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/25 transition-all"
          >
            Back to Builder
          </button>
        </div>
      </div>
    </div>
  );
};
