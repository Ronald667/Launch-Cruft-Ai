import React, { useState } from "react";
import { WebsiteSection } from "../types";
import { X, Check, Sparkles } from "lucide-react";

interface SectionEditorModalProps {
  section: WebsiteSection;
  onClose: () => void;
  onSave: (updated: WebsiteSection) => void;
  onAiCopywrite: () => void;
}

export const SectionEditorModal: React.FC<SectionEditorModalProps> = ({
  section,
  onClose,
  onSave,
  onAiCopywrite,
}) => {
  const [formData, setFormData] = useState<WebsiteSection>({ ...section });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl text-white">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="mr-1 text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold">
              ← Back
            </button>
            <h3 className="font-bold text-lg">Edit Section: {section.name}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {formData.badge !== undefined && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Badge Text</label>
              <input
                type="text"
                value={formData.badge || ""}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">Title / Heading</label>
              <button
                type="button"
                onClick={onAiCopywrite}
                className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-medium"
              >
                <Sparkles className="w-3.5 h-3.5" /> AI Enhance
              </button>
            </div>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {formData.subtitle !== undefined && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Subtitle / Paragraph</label>
              <textarea
                rows={3}
                value={formData.subtitle || ""}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {formData.primaryButtonText !== undefined && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Primary Button</label>
                <input
                  type="text"
                  value={formData.primaryButtonText || ""}
                  onChange={(e) => setFormData({ ...formData, primaryButtonText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
            {formData.secondaryButtonText !== undefined && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Secondary Button</label>
                <input
                  type="text"
                  value={formData.secondaryButtonText || ""}
                  onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>

          {formData.imageUrl !== undefined && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Image URL</label>
              <input
                type="text"
                value={formData.imageUrl || ""}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Background Theme</label>
              <select
                value={formData.backgroundColor || "white"}
                onChange={(e: any) => setFormData({ ...formData, backgroundColor: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="white">Clean White</option>
                <option value="slate">Light Slate</option>
                <option value="dark">Dark Slate</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Entrance Animation</label>
              <select
                value={formData.animation || "none"}
                onChange={(e: any) => setFormData({ ...formData, animation: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="none">None (Default)</option>
                <option value="fade-in">Fade In</option>
                <option value="slide-up">Slide Up</option>
                <option value="zoom">Zoom</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold shadow-lg shadow-indigo-600/25 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
