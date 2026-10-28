import React, { useState, useEffect } from "react";
import { WebsiteProject, WebsiteSection, SectionType, ThemeSettings } from "./types";
import { TEMPLATES } from "./data/templates";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Canvas } from "./components/Canvas";
import { SectionEditorModal } from "./components/SectionEditorModal";
import { AIAssistantModal } from "./components/AIAssistantModal";
import { BusinessGeneratorModal } from "./components/BusinessGeneratorModal";
import { SeoAssistantModal } from "./components/SeoAssistantModal";
import { SmartLayoutModal } from "./components/SmartLayoutModal";
import { TemplatesModal } from "./components/TemplatesModal";
import { ProjectsModal } from "./components/ProjectsModal";
import { CodeExportModal } from "./components/CodeExportModal";
import { PublishModal } from "./components/PublishModal";
import { PreviewModal } from "./components/PreviewModal";
import { Sparkles, X, Check } from "lucide-react";

export default function App() {
  // Saved Projects List State
  const [savedProjects, setSavedProjects] = useState<WebsiteProject[]>([
    TEMPLATES[0].project,
    TEMPLATES[1].project,
    TEMPLATES[2].project,
  ]);

  // History Stack State for Undo / Redo on active project
  const [history, setHistory] = useState<WebsiteProject[]>([TEMPLATES[0].project]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const project = history[historyIndex];

  const updateActiveProjectInList = (updatedProj: WebsiteProject) => {
    const list = savedProjects.some(p => p.id === updatedProj.id)
      ? savedProjects.map(p => p.id === updatedProj.id ? updatedProj : p)
      : [updatedProj, ...savedProjects];
    setSavedProjects(list);
  };

  const setProjectWithHistory = (newProject: WebsiteProject) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newProject);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    updateActiveProjectInList(newProject);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      showToast("Undone last action");
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      showToast("Redone action");
    }
  };

  // Keyboard shortcut listener for Ctrl+Z / Ctrl+Y
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        handleRedo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyIndex, history]);

  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Asset Library State
  const [assets, setAssets] = useState<string[]>([
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
  ]);

  // Modals state
  const [editingSection, setEditingSection] = useState<WebsiteSection | null>(null);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [showBusinessGenerator, setShowBusinessGenerator] = useState(false);
  const [showSeoAssistant, setShowSeoAssistant] = useState(false);
  const [showSmartLayout, setShowSmartLayout] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTargetProject, setPreviewTargetProject] = useState<WebsiteProject | null>(null);

  const [auditResult, setAuditResult] = useState<{ score: number; feedback: string[] } | null>(null);
  const [auditing, setAuditing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const activePage = project.pages.find((p) => p.id === project.activePageId) || project.pages[0];

  const updateActivePageSections = (newSections: WebsiteSection[]) => {
    const updatedPages = project.pages.map((p) => p.id === activePage.id ? { ...p, sections: newSections } : p);
    setProjectWithHistory({
      ...project,
      pages: updatedPages,
    });
  };

  const handleAddSection = (type: SectionType) => {
    const defaultTitles: Record<SectionType, { title: string; subtitle: string; name: string }> = {
      hero: { title: "Welcome to Our Platform", subtitle: "Build your dream project today with zero friction.", name: "Hero Section" },
      features: { title: "Core Features", subtitle: "Discover what makes our platform stand out from the crowd.", name: "Features Grid" },
      pricing: { title: "Flexible Pricing", subtitle: "Choose the plan that fits your growth stage.", name: "Pricing Tiers" },
      testimonials: { title: "Loved by Customers", subtitle: "See what our users have to say about their success.", name: "Testimonials" },
      cta: { title: "Ready to Get Started?", subtitle: "Join thousands of satisfied users today.", name: "Call to Action" },
      faq: { title: "Frequently Asked Questions", subtitle: "Got questions? We've got answers.", name: "FAQ" },
      gallery: { title: "Project Showcase", subtitle: "Explore our recent works and portfolio items.", name: "Gallery" },
      team: { title: "Meet Our Expert Team", subtitle: "Passionate individuals dedicated to your success.", name: "Team" },
      stats: { title: "Our Impact in Numbers", subtitle: "Milestones we have achieved together.", name: "Key Metrics" },
      contact: { title: "Get in Touch", subtitle: "We'd love to hear from you. Send us a message.", name: "Contact Form" },
      footer: { title: project.theme.siteName, subtitle: "Building the future of web experiences.", name: "Footer" },
      newsletter: { title: "Stay Up to Date", subtitle: "Subscribe to our newsletter for weekly updates.", name: "Newsletter" },
    };

    const def = defaultTitles[type] || { title: "New Section", subtitle: "Section description goes here.", name: "Custom Section" };

    const newSec: WebsiteSection = {
      id: "sec_" + Math.random().toString(36).substring(2, 9),
      type,
      name: def.name,
      badge: "New Release",
      title: def.title,
      subtitle: def.subtitle,
      primaryButtonText: type === "hero" || type === "cta" ? "Get Started" : undefined,
      secondaryButtonText: type === "hero" ? "Learn More" : undefined,
      accentColor: "indigo",
      alignment: "center",
      imageUrl: type === "hero" ? assets[0] : undefined,
      items: type === "features" || type === "pricing" || type === "testimonials" || type === "stats" || type === "gallery" || type === "team" || type === "faq" ? [
        { title: "Item One", description: "Description for item one.", statNumber: "99%", statLabel: "Success Rate" },
        { title: "Item Two", description: "Description for item two.", statNumber: "24/7", statLabel: "Support" },
        { title: "Item Three", description: "Description for item three.", statNumber: "10x", statLabel: "Faster" },
      ] : undefined,
      backgroundColor: "white",
    };

    updateActivePageSections([...activePage.sections, newSec]);
    showToast("Section added successfully!");
  };

  const handleUpdateSection = (updated: WebsiteSection) => {
    const updatedSections = activePage.sections.map((s) => s.id === updated.id ? updated : s);
    updateActivePageSections(updatedSections);
    showToast("Section updated!");
  };

  const handleDeleteSection = (sectionId: string) => {
    const updatedSections = activePage.sections.filter((s) => s.id !== sectionId);
    updateActivePageSections(updatedSections);
    showToast("Section deleted.");
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...activePage.sections];
    const temp = newSections[index];
    newSections[index] = newSections[index - 1];
    newSections[index - 1] = temp;
    updateActivePageSections(newSections);
  };

  const handleMoveDown = (index: number) => {
    if (index === activePage.sections.length - 1) return;
    const newSections = [...activePage.sections];
    const temp = newSections[index];
    newSections[index] = newSections[index + 1];
    newSections[index + 1] = temp;
    updateActivePageSections(newSections);
  };

  const handleDuplicate = (section: WebsiteSection) => {
    const duplicate: WebsiteSection = {
      ...section,
      id: "sec_" + Math.random().toString(36).substring(2, 9),
      title: `${section.title} (Copy)`,
    };
    const index = activePage.sections.findIndex((s) => s.id === section.id);
    const newSections = [...activePage.sections];
    newSections.splice(index + 1, 0, duplicate);
    updateActivePageSections(newSections);
    showToast("Section duplicated!");
  };

  const handleAiCopywrite = async (section: WebsiteSection) => {
    try {
      const res = await fetch("/api/ai/copywrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: section.title, tone: "high converting and punchy" }),
      });
      const data = await res.json();
      if (data.enhancedText) {
        const updated = { ...section, title: data.enhancedText };
        handleUpdateSection(updated);
      }
    } catch (err) {
      console.error("Copywriting failed", err);
    }
  };

  const handleGenerateAiImage = async (prompt: string) => {
    try {
      const res = await fetch("/api/ai/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setAssets([data.imageUrl, ...assets]);
        showToast("AI Image generated and added to library!");
      }
    } catch (err) {
      console.error("AI image generation failed", err);
    }
  };

  const handleUploadImage = (url: string) => {
    setAssets([url, ...assets]);
    showToast("Image added to asset library!");
  };

  const handleRunAudit = async () => {
    setAuditing(true);
    try {
      const res = await fetch("/api/ai/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteData: project }),
      });
      const data = await res.json();
      setAuditResult(data);
    } catch (err) {
      console.error("Audit failed", err);
    } finally {
      setAuditing(false);
    }
  };

  const handleUpdateTheme = (newTheme: Partial<ThemeSettings>) => {
    setProjectWithHistory({
      ...project,
      theme: { ...project.theme, ...newTheme },
    });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 font-sans">
      {/* Top Navbar */}
      <Navbar
        project={project}
        deviceView={deviceView}
        setDeviceView={setDeviceView}
        onOpenTemplates={() => setShowTemplates(true)}
        onOpenProjects={() => setShowProjects(true)}
        onOpenAiAssistant={() => setShowAiAssistant(true)}
        onOpenBusinessGenerator={() => setShowBusinessGenerator(true)}
        onOpenSeoAssistant={() => setShowSeoAssistant(true)}
        onOpenSmartLayout={() => setShowSmartLayout(true)}
        onOpenExport={() => setShowExport(true)}
        onOpenPublish={() => setShowPublish(true)}
        onOpenPreview={() => {
          setPreviewTargetProject(project);
          setShowPreview(true);
        }}
        onRunAudit={handleRunAudit}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
      />

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          project={project}
          assets={assets}
          onAddSection={handleAddSection}
          onUpdateTheme={handleUpdateTheme}
          onUploadImage={handleUploadImage}
          onGenerateAiImage={handleGenerateAiImage}
          onSelectAsset={(url) => {
            showToast("Asset URL ready to paste!");
          }}
        />
        <Canvas
          project={project}
          deviceView={deviceView}
          onEditSection={(sec) => setEditingSection(sec)}
          onDeleteSection={handleDeleteSection}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onDuplicate={handleDuplicate}
          onAiCopywrite={handleAiCopywrite}
          onOpenAiAssistant={() => setShowAiAssistant(true)}
        />
      </div>

      {/* Modals */}
      {editingSection && (
        <SectionEditorModal
          section={editingSection}
          onClose={() => setEditingSection(null)}
          onSave={handleUpdateSection}
          onAiCopywrite={() => handleAiCopywrite(editingSection)}
        />
      )}

      {showAiAssistant && (
        <AIAssistantModal
          onClose={() => setShowAiAssistant(false)}
          onAddGeneratedSection={(newSec) => {
            updateActivePageSections([...activePage.sections, newSec]);
            showToast("AI Component added!");
          }}
        />
      )}

      {showBusinessGenerator && (
        <BusinessGeneratorModal
          onClose={() => setShowBusinessGenerator(false)}
          onApplyGeneratedProject={(newProj) => {
            setHistory([newProj]);
            setHistoryIndex(0);
            updateActiveProjectInList(newProj);
            showToast("Generated full website from business description!");
          }}
        />
      )}

      {showSeoAssistant && (
        <SeoAssistantModal
          project={project}
          onClose={() => setShowSeoAssistant(false)}
          onUpdateMeta={(title, desc) => {
            showToast("Meta tags updated for SEO!");
          }}
        />
      )}

      {showSmartLayout && (
        <SmartLayoutModal
          sections={activePage.sections}
          onClose={() => setShowSmartLayout(false)}
          onApplyLayout={(newSections) => {
            updateActivePageSections(newSections);
            showToast("AI Smart Layout applied successfully!");
          }}
        />
      )}

      {showTemplates && (
        <TemplatesModal
          onClose={() => setShowTemplates(false)}
          onSelectTemplate={(newProj) => {
            setHistory([newProj]);
            setHistoryIndex(0);
            updateActiveProjectInList(newProj);
            showToast("Template loaded successfully!");
          }}
        />
      )}

      {showProjects && (
        <ProjectsModal
          projects={savedProjects}
          currentProjectId={project.id}
          onClose={() => setShowProjects(false)}
          onSelectProject={(proj) => {
            setHistory([proj]);
            setHistoryIndex(0);
            showToast(`Switched to project: ${proj.title}`);
          }}
          onPreviewProject={(proj) => {
            setPreviewTargetProject(proj);
            setShowPreview(true);
          }}
          onDeleteProject={(pid) => {
            const filtered = savedProjects.filter(p => p.id !== pid);
            setSavedProjects(filtered);
            showToast("Project deleted from list");
          }}
        />
      )}

      {showExport && (
        <CodeExportModal
          project={project}
          onClose={() => setShowExport(false)}
        />
      )}

      {showPublish && (
        <PublishModal
          project={project}
          onClose={() => setShowPublish(false)}
        />
      )}

      {showPreview && previewTargetProject && (
        <PreviewModal
          project={previewTargetProject}
          onClose={() => {
            setShowPreview(false);
            setPreviewTargetProject(null);
          }}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/50 px-5 py-3 rounded-2xl shadow-2xl text-white flex items-center gap-3 animate-bounce">
          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* AI Audit Popup Toast */}
      {(auditing || auditResult) && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-2xl text-white max-w-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h4 className="font-bold text-base">AI Page Quality Audit</h4>
            </div>
            <button onClick={() => { setAuditResult(null); }} className="p-1 hover:bg-slate-800 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>
          {auditing ? (
            <p className="text-sm text-slate-400 animate-pulse">Analyzing layout, conversion pathways, and responsiveness...</p>
          ) : auditResult ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Overall Score</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-sm">
                  {auditResult.score} / 100
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {auditResult.feedback.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
