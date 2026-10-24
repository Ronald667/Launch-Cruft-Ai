export type SectionType =
  | "hero"
  | "features"
  | "pricing"
  | "testimonials"
  | "cta"
  | "faq"
  | "gallery"
  | "team"
  | "stats"
  | "contact"
  | "footer"
  | "newsletter";

export interface SectionItem {
  title?: string;
  description?: string;
  icon?: string;
  price?: string;
  period?: string;
  featuresList?: string[];
  author?: string;
  role?: string;
  avatarUrl?: string;
  rating?: number;
  imageUrl?: string;
  statNumber?: string;
  statLabel?: string;
}

export interface WebsiteSection {
  id: string;
  type: SectionType;
  name: string;
  badge?: string;
  title: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  accentColor?: "indigo" | "blue" | "emerald" | "violet" | "rose" | "amber";
  alignment?: "left" | "center";
  imageUrl?: string;
  items?: SectionItem[];
  backgroundColor?: "white" | "slate" | "zinc" | "dark";
}

export interface PageData {
  id: string;
  title: string;
  path: string;
  sections: WebsiteSection[];
}

export interface ThemeSettings {
  siteName: string;
  fontFamily: "Inter" | "Poppins" | "Roboto" | "Space Grotesk" | "Outfit";
  borderRadius: "rounded-none" | "rounded-lg" | "rounded-2xl" | "rounded-full";
  accentColor: "indigo" | "blue" | "emerald" | "violet" | "rose" | "amber";
  isDarkMode: boolean;
}

export interface WebsiteProject {
  id: string;
  title: string;
  subdomain: string;
  theme: ThemeSettings;
  pages: PageData[];
  activePageId: string;
}
