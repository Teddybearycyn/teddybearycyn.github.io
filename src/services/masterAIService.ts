import { GoogleGenAI } from "@google/genai";
import { BlogPost } from "../data/blogs.ts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

/**
 * Master AI Service: The "Invisible" Hand
 * Handles research, keyword analysis, and automatic blog generation.
 */
export const MasterAIService = {
  /**
   * Performs deep research on a given topic or finds trending topics automatically.
   */
  async performResearch(): Promise<string[]> {
    console.log("Master AI: Initiating deep research...");
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Find trending blog topics for today.",
        config: {
          systemInstruction: "You are an Elite SEO Strategist and Research Bot. Identify 3 high-growth, low-competition keywords in the IT Support, Customer Support, and Systems Engineering niche for 2026. Return only a comma-separated list of keywords.",
        }
      });
      return response.text?.split(",").map(k => k.trim()) || [];
    } catch (error) {
      console.error("Master AI Research Error:", error);
      return ["IT Transformation", "AI Reliability", "Scalable Support"];
    }
  },

  /**
   * Generates a full-length, high-quality blog post based on research.
   */
  async generateDailyBlog(keyword: string): Promise<Partial<BlogPost>> {
    console.log(`Master AI: Generating blog post for keyword: ${keyword}...`);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: `Create a Master Class blog post about ${keyword}.`,
        config: {
          systemInstruction: `You are the Master AI Content Creator. Generate a comprehensive, technical, yet accessible blog post for the keyword: ${keyword}. 
          The post should include a title, slug, excerpt, category, and full markdown content.
          Format the output as JSON matching the BlogPost structure (use 'excerpt' for the summary).
          Structure:
          {
            "title": "...",
            "slug": "...",
            "excerpt": "...",
            "category": "...",
            "keywords": ["...", "..."],
            "content": "..."
          }`,
          responseMimeType: "application/json"
        }
      });

      const data = JSON.parse(response.text || "{}");
      return {
        ...data,
        author: "News More Master AI",
        date: new Date().toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }),
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1200&q=80" // Modern tech AI image
      };
    } catch (error) {
      console.error("Master AI Generation Error:", error);
      throw error;
    }
  }
};
