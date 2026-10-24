import express from "express";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || "dummy-key",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.post("/api/ai/generate-component", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "dummy-key") {
      return res.json({
        id: "ai_" + Math.random().toString(36).substring(2, 9),
        type: "hero",
        name: "AI Generated Section",
        badge: "✨ AI Crafted",
        title: `Custom Section for: ${prompt}`,
        subtitle: "This section was intelligently generated based on your prompt using Gemini AI.",
        primaryButtonText: "Get Started",
        secondaryButtonText: "Learn More",
        accentColor: "indigo",
        alignment: "center",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Generate a JSON object for a website section based on this user request: "${prompt}".
      The JSON object must match this schema:
      {
        "name": "string (short name)",
        "type": "hero" | "features" | "pricing" | "testimonials" | "cta" | "faq" | "gallery" | "team" | "stats" | "contact",
        "badge": "string (optional badge text)",
        "title": "string (compelling heading)",
        "subtitle": "string (supportive paragraph)",
        "primaryButtonText": "string",
        "secondaryButtonText": "string",
        "accentColor": "indigo" | "blue" | "emerald" | "violet" | "rose" | "amber",
        "alignment": "left" | "center",
        "imageUrl": "valid Unsplash image URL fitting the theme",
        "items": [
          {
            "title": "item heading",
            "description": "item description",
            "icon": "Zap" | "Shield" | "Star" | "Check" | "Users" | "Globe" | "Heart" | "Lock"
          }
        ]
      }
      Return ONLY valid JSON.`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const json = JSON.parse(cleaned);
    json.id = "ai_" + Math.random().toString(36).substring(2, 9);
    res.json(json);
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate component" });
  }
});

app.post("/api/ai/copywrite", async (req, res) => {
  try {
    const { text, tone } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "dummy-key") {
      return res.json({ enhancedText: `${text} (Enhanced for maximum conversion)` });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Rewrite the following website text to be more ${tone || "engaging and conversion-optimized"}. Keep it concise and professional.
      Text: "${text}"
      Return ONLY the rewritten text without quotes or markdown.`,
    });

    res.json({ enhancedText: response.text?.trim() || text });
  } catch (error: any) {
    console.error("Copywriting Error:", error);
    res.status(500).json({ error: error.message || "Failed to rewrite copy" });
  }
});

app.post("/api/ai/audit", async (req, res) => {
  try {
    const { siteData } = req.body;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "dummy-key") {
      return res.json({
        score: 94,
        feedback: [
          "Strong hero section with clear value proposition.",
          "Good use of trust signals and testimonials.",
          "Consider adding an FAQ section to answer buyer objections.",
          "Ensure mobile padding is optimized for all screen sizes."
        ]
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Audit this website structure for a landing page and provide conversion and UX recommendations in JSON format:
      ${JSON.stringify(siteData)}
      Return JSON:
      {
        "score": number (0-100),
        "feedback": ["array of 4 actionable recommendations"]
      }`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const cleaned = (response.text || "{}").replace(/```json/g, "").replace(/```/g, "").trim();
    res.json(JSON.parse(cleaned));
  } catch (error: any) {
    console.error("Audit Error:", error);
    res.status(500).json({ error: error.message || "Failed to audit site" });
  }
});

// NEW: AI-powered SEO optimization assistant endpoint
app.post("/api/ai/seo-audit", async (req, res) => {
  try {
    const { siteData, targetKeyword } = req.body;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "dummy-key") {
      return res.json({
        seoScore: 88,
        targetKeyword: targetKeyword || "business growth platform",
        metaTitle: "LaunchCraft AI - #1 Platform to Build & Launch Websites Instantly",
        metaDescription: "Create your own website using a drag-and-drop interface with customizable templates and AI-powered SEO optimization.",
        keywordSuggestions: ["ai website builder", "drag and drop web design", "startup landing page creator", "export clean tailwind code"],
        headingAnalysis: [
          { tag: "H1", text: "Supercharge Your Workflow with AI Automation", status: "Optimized", suggestion: "Keyword well placed." },
          { tag: "H2", text: "Everything You Need to Scale Faster", status: "Good", suggestion: "Consider adding target keyword." }
        ],
        imageAltSuggestions: [
          { imageIndex: 1, currentAlt: "hero image", recommendedAlt: "AI website builder dashboard screenshot showing drag and drop sections" }
        ],
        actionableTips: [
          "Include your primary keyword in the main H1 title.",
          "Add alt text with descriptive keywords to all hero and gallery images.",
          "Ensure meta description is between 150-160 characters."
        ]
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Perform an in-depth SEO analysis for this website data based on target keyword "${targetKeyword || 'business platform'}":
      ${JSON.stringify(siteData)}
      Return a JSON object matching this schema:
      {
        "seoScore": number (0-100),
        "targetKeyword": string,
        "metaTitle": string (optimized title under 60 chars),
        "metaDescription": string (optimized meta description under 160 chars),
        "keywordSuggestions": ["4 high ranking keyword ideas"],
        "headingAnalysis": [{"tag": "H1/H2", "text": "string", "status": "Optimized/Needs Improvement", "suggestion": "string"}],
        "imageAltSuggestions": [{"imageIndex": number, "currentAlt": "string", "recommendedAlt": "string"}],
        "actionableTips": ["3-4 actionable SEO tips"]
      }
      Return ONLY valid JSON.`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const cleaned = (response.text || "{}").replace(/```json/g, "").replace(/```/g, "").trim();
    res.json(JSON.parse(cleaned));
  } catch (error: any) {
    console.error("SEO Audit Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate SEO audit" });
  }
});

// NEW: AI Business Description to Full Website Copy & Structure Generator
app.post("/api/ai/generate-business-site", async (req, res) => {
  try {
    const { businessDescription } = req.body;
    if (!businessDescription) {
      return res.status(400).json({ error: "Business description is required" });
    }

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "dummy-key") {
      return res.json({
        title: "Artisan Coffee Roasters",
        subdomain: "artisan-coffee",
        theme: {
          siteName: "Artisan Coffee Roasters",
          fontFamily: "Poppins",
          borderRadius: "rounded-xl",
          accentColor: "amber",
          isDarkMode: false
        },
        sections: [
          {
            id: "sec_hero",
            type: "hero",
            name: "Hero Section",
            badge: "Sourced Globally • Roasted Locally",
            title: `Single-Origin Coffee Crafted for ${businessDescription.substring(0, 30)}`,
            subtitle: "Experience velvety smooth notes of chocolate, caramel, and berry in every sustainably sourced brew.",
            primaryButtonText: "Shop Fresh Beans",
            secondaryButtonText: "Our Story",
            accentColor: "amber",
            alignment: "center",
            imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
            backgroundColor: "white"
          },
          {
            id: "sec_features",
            type: "features",
            name: "Features Grid",
            badge: "Why Choose Us",
            title: "The Artisan Difference",
            subtitle: "We take pride in every bean from farm to cup.",
            items: [
              { title: "Fair Trade Certified", description: "Direct partnerships with independent coffee farmers ensuring ethical wages.", icon: "Globe" },
              { title: "Small Batch Roasted", description: "Roasted daily in small batches to guarantee peak aroma and flavor freshness.", icon: "Zap" },
              { title: "Eco-Friendly Packaging", description: "100% biodegradable and compostable packaging bags.", icon: "Shield" }
            ],
            backgroundColor: "slate"
          }
        ]
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Create a complete website project JSON structure for this business description: "${businessDescription}".
      Include site name, subdomain slug, theme (fontFamily: Inter, Poppins, Outfit, Space Grotesk, Roboto; accentColor: indigo, amber, emerald, violet, rose), and 3-4 professional sections (hero, features, pricing or gallery, cta).
      Return ONLY valid JSON matching this structure:
      {
        "title": "string",
        "subdomain": "string",
        "theme": { "siteName": "string", "fontFamily": "Poppins", "borderRadius": "rounded-xl", "accentColor": "amber", "isDarkMode": false },
        "sections": [
          {
            "id": "string",
            "type": "hero" | "features" | "pricing" | "testimonials" | "cta" | "faq" | "gallery",
            "name": "string",
            "badge": "string",
            "title": "string",
            "subtitle": "string",
            "primaryButtonText": "string",
            "secondaryButtonText": "string",
            "accentColor": "amber",
            "alignment": "center",
            "imageUrl": "valid Unsplash URL",
            "items": [{"title": "string", "description": "string", "icon": "Zap"}]
          }
        ]
      }`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const cleaned = (response.text || "{}").replace(/```json/g, "").replace(/```/g, "").trim();
    res.json(JSON.parse(cleaned));
  } catch (error: any) {
    console.error("Business Site Generation Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate business site" });
  }
});

// NEW: AI Image Generation using gemini-3.1-flash-lite-image
app.post("/api/ai/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "dummy-key") {
      return res.json({ imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-image",
      contents: {
        parts: [{ text: `Professional website hero image or illustration of ${prompt}, high quality, cinematic lighting` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K"
        }
      }
    });

    let imageUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    res.json({ imageUrl });
  } catch (error: any) {
    console.error("Image Generation Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate image" });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
