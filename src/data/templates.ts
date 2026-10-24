import { WebsiteProject } from "../types";

export const TEMPLATES: { id: string; name: string; category: string; description: string; image: string; project: WebsiteProject }[] = [
  {
    id: "saas-startup",
    name: "Nexus SaaS",
    category: "SaaS & Tech",
    description: "High-converting SaaS landing page with hero, pricing tiers, and social proof.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    project: {
      id: "proj_saas",
      title: "Nexus AI Platform",
      subdomain: "nexus-ai",
      theme: {
        siteName: "Nexus AI",
        fontFamily: "Inter",
        borderRadius: "rounded-2xl",
        accentColor: "indigo",
        isDarkMode: false,
      },
      activePageId: "home",
      pages: [
        {
          id: "home",
          title: "Home",
          path: "/",
          sections: [
            {
              id: "sec_hero",
              type: "hero",
              name: "Hero Section",
              badge: "v2.0 Released - Explore Now",
              title: "Supercharge Your Workflow with AI Automation",
              subtitle: "Build, deploy, and scale intelligent business workflows in minutes without writing complex infrastructure code.",
              primaryButtonText: "Start Free Trial",
              secondaryButtonText: "Watch Demo",
              accentColor: "indigo",
              alignment: "center",
              imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
              backgroundColor: "white",
            },
            {
              id: "sec_stats",
              type: "stats",
              name: "Key Metrics",
              title: "Trusted by Fast-Growing Teams Worldwide",
              subtitle: "Our platform powers mission-critical operations for thousands of forward-thinking enterprises.",
              items: [
                { statNumber: "99.99%", statLabel: "Uptime SLA" },
                { statNumber: "4.5x", statLabel: "Average ROI" },
                { statNumber: "120M+", statLabel: "API Calls / Day" },
                { statNumber: "24/7", statLabel: "Expert Support" },
              ],
              backgroundColor: "slate",
            },
            {
              id: "sec_features",
              type: "features",
              name: "Features Grid",
              badge: "Powerful Capabilities",
              title: "Everything You Need to Scale Faster",
              subtitle: "Designed from the ground up to eliminate engineering bottlenecks and maximize team velocity.",
              accentColor: "indigo",
              items: [
                { title: "Real-time Collaboration", description: "Work simultaneously with your team members with live cursor tracking and instant sync.", icon: "Users" },
                { title: "Enterprise Security", description: "SOC2 Type II certified with end-to-end encryption and advanced RBAC access controls.", icon: "Shield" },
                { title: "Lightning Fast Engine", description: "Optimized distributed architecture delivers sub-millisecond response times globally.", icon: "Zap" },
              ],
              backgroundColor: "white",
            },
            {
              id: "sec_pricing",
              type: "pricing",
              name: "Pricing Tiers",
              badge: "Simple Pricing",
              title: "Transparent Plans for Every Stage",
              subtitle: "Start free and scale as your user base grows. No hidden fees or surprise lock-ins.",
              accentColor: "indigo",
              items: [
                { title: "Starter", price: "$29", period: "/month", featuresList: ["Up to 5 team members", "10GB secure storage", "Community support", "Basic analytics"] },
                { title: "Pro", price: "$79", period: "/month", featuresList: ["Unlimited team members", "100GB secure storage", "Priority 24/7 support", "Advanced AI workflows", "Custom domain"] },
                { title: "Enterprise", price: "$199", period: "/month", featuresList: ["Dedicated cloud cluster", "Unlimited storage", "Dedicated account manager", "Custom SLA agreements"] },
              ],
              backgroundColor: "slate",
            },
            {
              id: "sec_testimonials",
              type: "testimonials",
              name: "Testimonials",
              badge: "Customer Love",
              title: "Loved by Engineering Leaders",
              subtitle: "See how Nexus transformed productivity for our engineering and product teams.",
              items: [
                { title: "Game changer for our entire engineering squad.", description: "We cut our deployment pipeline setup time from 3 weeks down to under 2 hours. Unbelievable experience.", author: "Sarah Jenkins", role: "VP of Engineering at FinScale", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", rating: 5 },
                { title: "The AI automation features are next level.", description: "Our team saves over 25 hours every single week thanks to Nexus intelligent workflow triggers.", author: "Marcus Vance", role: "Lead Architect at CloudScale", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", rating: 5 },
              ],
              backgroundColor: "white",
            },
            {
              id: "sec_faq",
              type: "faq",
              name: "FAQ Section",
              badge: "Got Questions?",
              title: "Frequently Asked Questions",
              subtitle: "Everything you need to know about getting started with Nexus.",
              items: [
                { title: "Can I try the platform for free?", description: "Yes! We offer a 14-day free trial on all Pro features with no credit card required." },
                { title: "How does billing work?", description: "You can choose monthly or annual billing. Annual plans include a 20% discount." },
                { title: "Is my data secure?", description: "We use enterprise-grade AES-256 encryption at rest and TLS 1.3 in transit." },
              ],
              backgroundColor: "slate",
            },
            {
              id: "sec_cta",
              type: "cta",
              name: "Call to Action",
              title: "Ready to Transform Your Workflow?",
              subtitle: "Join over 10,000 forward-thinking companies building the future today.",
              primaryButtonText: "Get Started Free",
              secondaryButtonText: "Talk to Sales",
              accentColor: "indigo",
              backgroundColor: "white",
            },
            {
              id: "sec_footer",
              type: "footer",
              name: "Footer",
              title: "Nexus AI",
              subtitle: "Building the next generation of intelligent software tools.",
              backgroundColor: "dark",
            }
          ]
        }
      ]
    }
  },
  {
    id: "creative-agency",
    name: "Studio Elevate",
    category: "Agency & Portfolio",
    description: "Sleek portfolio & creative agency showcase with stunning imagery and case studies.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    project: {
      id: "proj_agency",
      title: "Studio Elevate",
      subdomain: "studio-elevate",
      theme: {
        siteName: "Studio Elevate",
        fontFamily: "Outfit",
        borderRadius: "rounded-lg",
        accentColor: "violet",
        isDarkMode: true,
      },
      activePageId: "home",
      pages: [
        {
          id: "home",
          title: "Home",
          path: "/",
          sections: [
            {
              id: "sec_hero_ag",
              type: "hero",
              name: "Agency Hero",
              badge: "Award-Winning Creative Studio",
              title: "We Craft Digital Masterpieces That Convert",
              subtitle: "Brand identity, immersive web design, and cutting-edge digital experiences for visionary brands.",
              primaryButtonText: "View Our Work",
              secondaryButtonText: "Book a Call",
              accentColor: "violet",
              alignment: "center",
              imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
              backgroundColor: "dark",
            },
            {
              id: "sec_gallery",
              type: "gallery",
              name: "Work Showcase",
              badge: "Selected Projects",
              title: "Featured Case Studies",
              subtitle: "A glimpse into our recent collaborations with industry leaders.",
              items: [
                { title: "Vortex 3D E-Commerce", description: "Immersive WebGL storefront with 300% conversion boost.", imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80" },
                { title: "Fintech Mobile App", description: "Sleek neon UI for next-gen decentralized banking.", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" },
                { title: "Luxury Apparel Brand", description: "Minimalist editorial experience for high fashion.", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80" },
              ],
              backgroundColor: "dark",
            },
            {
              id: "sec_team",
              type: "team",
              name: "Our Team",
              badge: "Expert Minds",
              title: "Meet the Creators",
              subtitle: "Designers, engineers, and strategists obsessed with pixel perfection.",
              items: [
                { title: "Elena Rostova", description: "Founder & Creative Director", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" },
                { title: "Liam Thorne", description: "Head of Interactive 3D", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
                { title: "Maya Lin", description: "Lead Brand Strategist", avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" },
              ],
              backgroundColor: "dark",
            },
            {
              id: "sec_contact",
              type: "contact",
              name: "Contact Section",
              badge: "Let's Talk",
              title: "Start Your Next Project",
              subtitle: "Tell us about your vision and let's bring it to life together.",
              primaryButtonText: "Send Message",
              accentColor: "violet",
              backgroundColor: "dark",
            },
            {
              id: "sec_footer_ag",
              type: "footer",
              name: "Footer",
              title: "Studio Elevate",
              subtitle: "Crafting digital distinction.",
              backgroundColor: "dark",
            }
          ]
        }
      ]
    }
  },
  {
    id: "ecommerce-store",
    name: "Aura Home",
    category: "E-Commerce",
    description: "Minimalist online storefront with featured products, customer reviews, and perks.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
    project: {
      id: "proj_ecommerce",
      title: "Aura Home & Living",
      subdomain: "aura-home",
      theme: {
        siteName: "Aura Home",
        fontFamily: "Poppins",
        borderRadius: "rounded-lg",
        accentColor: "emerald",
        isDarkMode: false,
      },
      activePageId: "home",
      pages: [
        {
          id: "home",
          title: "Home",
          path: "/",
          sections: [
            {
              id: "sec_hero_ec",
              type: "hero",
              name: "Store Hero",
              badge: "Summer Collection 2026",
              title: "Elevate Your Living Space with Mindful Design",
              subtitle: "Handcrafted sustainable furniture and artisanal home decor designed for modern sanctuaries.",
              primaryButtonText: "Shop Collection",
              secondaryButtonText: "Explore Lookbook",
              accentColor: "emerald",
              alignment: "center",
              imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
              backgroundColor: "white",
            },
            {
              id: "sec_features_ec",
              type: "features",
              name: "Store Perks",
              title: "The Aura Promise",
              subtitle: "We believe in conscious craftsmanship and uncompromising quality.",
              accentColor: "emerald",
              items: [
                { title: "Carbon Neutral Shipping", description: "Every order is 100% offset with verified reforestation projects.", icon: "Globe" },
                { title: "Lifetime Warranty", description: "Built with heirloom-grade solid hardwoods and natural fabrics.", icon: "Shield" },
                { title: "30-Day Home Trial", description: "Experience any piece in your home risk-free with free returns.", icon: "Heart" },
              ],
              backgroundColor: "slate",
            },
            {
              id: "sec_gallery_ec",
              type: "gallery",
              name: "Featured Products",
              badge: "Bestsellers",
              title: "Designed for Everyday Living",
              subtitle: "Explore our most sought-after handcrafted pieces.",
              items: [
                { title: "Nordic Oak Lounge Chair", description: "$840.00", imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80" },
                { title: "Ceramic Minimalist Vase", description: "$120.00", imageUrl: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a5c?auto=format&fit=crop&w=600&q=80" },
                { title: "Hemp Linen Throw Pillow", description: "$85.00", imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80" },
              ],
              backgroundColor: "white",
            },
            {
              id: "sec_cta_ec",
              type: "cta",
              name: "Call to Action",
              title: "Join the Aura Club & Get 15% Off",
              subtitle: "Receive exclusive invites to private sales and interior styling tips directly to your inbox.",
              primaryButtonText: "Claim 15% Off",
              accentColor: "emerald",
              backgroundColor: "slate",
            },
            {
              id: "sec_footer_ec",
              type: "footer",
              name: "Footer",
              title: "Aura Home",
              subtitle: "Mindful living for modern spaces.",
              backgroundColor: "dark",
            }
          ]
        }
      ]
    }
  }
];
