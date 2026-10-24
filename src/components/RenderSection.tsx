import React from "react";
import { WebsiteSection } from "../types";
import { 
  Zap, Shield, Star, Users, Globe, Heart, Lock, Check, 
  ArrowRight, Mail, Phone, MapPin, ChevronDown, Sparkles, Edit3, Trash2, ArrowUp, ArrowDown, Copy
} from "lucide-react";

interface RenderSectionProps {
  section: WebsiteSection;
  isDarkMode: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onAiCopywrite?: () => void;
}

export const RenderSection: React.FC<RenderSectionProps> = ({
  section,
  isDarkMode,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onAiCopywrite,
}) => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "Shield": return <Shield className="w-6 h-6" />;
      case "Star": return <Star className="w-6 h-6" />;
      case "Users": return <Users className="w-6 h-6" />;
      case "Globe": return <Globe className="w-6 h-6" />;
      case "Heart": return <Heart className="w-6 h-6" />;
      case "Lock": return <Lock className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  const bgClass = section.backgroundColor === "dark" 
    ? "bg-slate-950 text-white" 
    : section.backgroundColor === "slate" 
    ? "bg-slate-50 text-slate-900" 
    : isDarkMode ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900";

  return (
    <div className={`group relative py-20 px-6 md:px-12 transition-all border border-transparent hover:border-indigo-500/40 ${bgClass}`}>
      {/* Floating Action Toolbar on Hover */}
      <div className="absolute right-4 top-4 z-20 hidden group-hover:flex items-center gap-1 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl shadow-xl border border-slate-700">
        <button onClick={onEdit} title="Edit Section" className="p-1.5 hover:bg-indigo-600 rounded-lg transition-colors">
          <Edit3 className="w-4 h-4" />
        </button>
        {onAiCopywrite && (
          <button onClick={onAiCopywrite} title="AI Copy Enhancer" className="p-1.5 hover:bg-purple-600 rounded-lg transition-colors text-purple-300">
            <Sparkles className="w-4 h-4" />
          </button>
        )}
        <button onClick={onDuplicate} title="Duplicate" className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors">
          <Copy className="w-4 h-4" />
        </button>
        <button onClick={onMoveUp} title="Move Up" className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors">
          <ArrowUp className="w-4 h-4" />
        </button>
        <button onClick={onMoveDown} title="Move Down" className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors">
          <ArrowDown className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-slate-700 mx-1" />
        <button onClick={onDelete} title="Delete" className="p-1.5 hover:bg-rose-600 rounded-lg transition-colors text-rose-300">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* HERO SECTION */}
        {section.type === "hero" && (
          <div className={`grid md:grid-cols-2 gap-12 items-center ${section.alignment === "center" ? "md:grid-cols-1 text-center max-w-4xl mx-auto" : ""}`}>
            <div className="space-y-6">
              {section.badge && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 font-medium text-xs border border-indigo-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  {section.badge}
                </div>
              )}
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                {section.title}
              </h1>
              {section.subtitle && (
                <p className={`text-lg md:text-xl opacity-80 leading-relaxed ${section.alignment === "center" ? "max-w-2xl mx-auto" : ""}`}>
                  {section.subtitle}
                </p>
              )}
              <div className={`flex flex-wrap gap-4 pt-2 ${section.alignment === "center" ? "justify-center" : ""}`}>
                {section.primaryButtonText && (
                  <button className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5">
                    {section.primaryButtonText}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {section.secondaryButtonText && (
                  <button className={`px-6 py-3.5 rounded-xl border font-semibold transition-all ${section.backgroundColor === "dark" ? "border-slate-700 hover:bg-slate-800 text-white" : "border-slate-300 hover:bg-slate-100"}`}>
                    {section.secondaryButtonText}
                  </button>
                )}
              </div>
            </div>
            {section.imageUrl && section.alignment !== "center" && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 aspect-video md:aspect-[4/3]">
                  <img src={section.imageUrl} alt={section.title} className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* FEATURES / PERKS */}
        {section.type === "features" && (
          <div className="space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              {section.badge && (
                <span className="text-xs uppercase tracking-widest font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">
                  {section.badge}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{section.title}</h2>
              {section.subtitle && <p className="text-lg opacity-75">{section.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {section.items?.map((item, idx) => (
                <div key={idx} className={`p-8 rounded-2xl border transition-all hover:-translate-y-1 ${section.backgroundColor === "dark" ? "bg-slate-900 border-slate-800" : section.backgroundColor === "slate" ? "bg-white border-slate-200 shadow-sm" : "bg-slate-50 border-slate-200"}`}>
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-500 flex items-center justify-center mb-6">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="opacity-75 leading-relaxed text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRICING TIERS */}
        {section.type === "pricing" && (
          <div className="space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              {section.badge && (
                <span className="text-xs uppercase tracking-widest font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">
                  {section.badge}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{section.title}</h2>
              {section.subtitle && <p className="text-lg opacity-75">{section.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {section.items?.map((item, idx) => {
                const isPopular = idx === 1;
                return (
                  <div key={idx} className={`relative p-8 rounded-3xl border flex flex-col justify-between transition-all ${isPopular ? "bg-indigo-600 text-white shadow-2xl scale-105 border-indigo-500" : section.backgroundColor === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-xl"}`}>
                    {isPopular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow">
                        Most Popular
                      </span>
                    )}
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <div className="flex items-baseline gap-1 my-6">
                        <span className="text-4xl font-extrabold">{item.price}</span>
                        <span className={`text-sm opacity-80`}>{item.period}</span>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {item.featuresList?.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-3 text-sm">
                            <Check className={`w-4 h-4 ${isPopular ? "text-amber-300" : "text-indigo-500"}`} />
                            <span className="opacity-90">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className={`w-full py-3.5 rounded-xl font-semibold transition-all ${isPopular ? "bg-white text-indigo-900 hover:bg-slate-100" : "bg-indigo-600 text-white hover:bg-indigo-500"}`}>
                      Choose {item.title}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TESTIMONIALS */}
        {section.type === "testimonials" && (
          <div className="space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              {section.badge && (
                <span className="text-xs uppercase tracking-widest font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">
                  {section.badge}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{section.title}</h2>
              {section.subtitle && <p className="text-lg opacity-75">{section.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {section.items?.map((item, idx) => (
                <div key={idx} className={`p-8 rounded-3xl border flex flex-col justify-between ${section.backgroundColor === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <div className="space-y-4">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-lg font-medium leading-relaxed italic">"{item.title}"</p>
                    <p className="text-sm opacity-75">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-200/20">
                    {item.avatarUrl && (
                      <img src={item.avatarUrl} alt={item.author} className="w-12 h-12 rounded-full object-cover" />
                    )}
                    <div>
                      <h4 className="font-bold">{item.author}</h4>
                      <p className="text-xs opacity-65">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STATS */}
        {section.type === "stats" && (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{section.title}</h2>
              {section.subtitle && <p className="text-lg opacity-75">{section.subtitle}</p>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {section.items?.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-indigo-600/5 border border-indigo-500/10">
                  <div className="text-4xl md:text-5xl font-extrabold text-indigo-500 mb-2">{item.statNumber}</div>
                  <div className="text-sm font-medium opacity-75">{item.statLabel}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GALLERY / SHOWCASE */}
        {section.type === "gallery" && (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              {section.badge && (
                <span className="text-xs uppercase tracking-widest font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">
                  {section.badge}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{section.title}</h2>
              {section.subtitle && <p className="text-lg opacity-75">{section.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {section.items?.map((item, idx) => (
                <div key={idx} className="group overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900 shadow-xl">
                  {item.imageUrl && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEAM */}
        {section.type === "team" && (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              {section.badge && (
                <span className="text-xs uppercase tracking-widest font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">
                  {section.badge}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{section.title}</h2>
              {section.subtitle && <p className="text-lg opacity-75">{section.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {section.items?.map((item, idx) => (
                <div key={idx} className="text-center group">
                  {item.avatarUrl && (
                    <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 border-2 border-indigo-500/30 shadow-xl">
                      <img src={item.avatarUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-sm opacity-65 mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {section.type === "faq" && (
          <div className="space-y-12 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              {section.badge && (
                <span className="text-xs uppercase tracking-widest font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">
                  {section.badge}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{section.title}</h2>
              {section.subtitle && <p className="text-lg opacity-75">{section.subtitle}</p>}
            </div>
            <div className="space-y-4">
              {section.items?.map((item, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border ${section.backgroundColor === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <h3 className="text-lg font-bold mb-2 flex items-center justify-between">
                    {item.title}
                    <ChevronDown className="w-5 h-5 opacity-50" />
                  </h3>
                  <p className="text-sm opacity-75 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT */}
        {section.type === "contact" && (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {section.badge && (
                <span className="text-xs uppercase tracking-widest font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">
                  {section.badge}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{section.title}</h2>
              {section.subtitle && <p className="text-lg opacity-75 leading-relaxed">{section.subtitle}</p>}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-sm opacity-80">
                  <Mail className="w-5 h-5 text-indigo-500" />
                  <span>support@launchcraft.ai</span>
                </div>
                <div className="flex items-center gap-3 text-sm opacity-80">
                  <Phone className="w-5 h-5 text-indigo-500" />
                  <span>+1 (555) 234-5678</span>
                </div>
                <div className="flex items-center gap-3 text-sm opacity-80">
                  <MapPin className="w-5 h-5 text-indigo-500" />
                  <span>100 Innovation Way, Silicon Valley, CA</span>
                </div>
              </div>
            </div>
            <div className={`p-8 rounded-3xl border shadow-xl ${section.backgroundColor === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <form onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-75">Your Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-slate-800/5 border border-slate-700/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-75">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl bg-slate-800/5 border border-slate-700/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-75">Message</label>
                  <textarea rows={4} placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl bg-slate-800/5 border border-slate-700/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/25 transition-all">
                  {section.primaryButtonText || "Send Message"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* CTA */}
        {section.type === "cta" && (
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-12 md:p-16 text-center shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">{section.title}</h2>
              {section.subtitle && <p className="text-lg opacity-90 max-w-2xl mx-auto">{section.subtitle}</p>}
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button className="px-8 py-4 rounded-xl bg-white text-indigo-950 font-bold shadow-xl hover:bg-slate-100 transition-all">
                  {section.primaryButtonText || "Get Started Free"}
                </button>
                {section.secondaryButtonText && (
                  <button className="px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 font-bold transition-all">
                    {section.secondaryButtonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        {section.type === "footer" && (
          <div className="py-12 border-t border-slate-800 text-slate-400">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="space-y-4">
                <div className="text-xl font-bold text-white">{section.title}</div>
                <p className="text-sm">{section.subtitle}</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800/50 text-xs">
              <p>&copy; {new Date().getFullYear()} {section.title}. All rights reserved.</p>
              <p className="flex items-center gap-1 mt-4 md:mt-0">
                Built with <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> <span className="text-white font-semibold">LaunchCraft AI</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
