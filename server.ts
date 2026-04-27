import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import cron from "node-cron";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

import fs from "fs";

const firebaseConfig = JSON.parse(fs.readFileSync(path.join(__dirname, "firebase-applet-config.json"), "utf8"));

const firebaseApp = admin.apps.length === 0 
  ? admin.initializeApp({
      projectId: firebaseConfig.projectId,
    })
  : admin.app();

const firestore = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

/**
 * SEO Masterclass AI Logic
 */
async function runSEOMasterclass(count: number = 5) {
  console.log(`Starting SEO Masterclass AI Run for ${count} blogs...`);
  
  try {
    // 1. Check if AI is enabled (Shutdown switch)
    const configDoc = await firestore.collection("config").doc("system").get();
    const isAiEnabledValue = configDoc.exists ? configDoc.data()?.aiEnabled !== false : true;
    
    if (!isAiEnabledValue) {
      console.log("AI is currently SHUT DOWN. Skipping run.");
      return;
    }

    // 2. Search for trending IT topics using Gemini with Search Grounding
    const trendingPrompt = `Search for ${count} trending IT services, technical engineering, or freelancing topics for April 2026. Focus on high-performing SEO keywords and emerging technologies. provide a list of ${count} distinct titles and keywords for each.`;
    
    const searchResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: trendingPrompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              category: { type: Type.STRING, enum: ["Freelancing", "IT Support", "Customer Support", "Engineering", "Productivity"] }
            },
            required: ["title", "keywords", "category"]
          }
        }
      }
    });

    const topics = JSON.parse(searchResponse.text);
    console.log(`Identified ${topics.length} topics. Generating content...`);

    // 3. For each topic, generate a full SEO blog
    for (const topic of topics) {
      const blogPrompt = `Write a high-quality, SEO-optimized masterclass blog post with the title: "${topic.title}". 
      Use these keywords: ${topic.keywords.join(", ")}. 
      Category: ${topic.category}.
      Structure:
      1. Catchy title.
      2. Engaging excerpt.
      3. Deep-dive content in Markdown (2-3 subheadings, technical insights, actionable steps).
      4. 5-7 FAQs.
      Author should be "AI SEO Master".
      Date should be "${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}".
      
      The content must be unique, authoritative, and helpful. Avoid generic advice.`;

      const blogResponse = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview", // Higher quality for the actual writing
        contents: blogPrompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              content: { type: Type.STRING },
              faqs: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    answer: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });

      const blogData = JSON.parse(blogResponse.text);
      const slug = topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      // Use LoremFlickr with the slug as a unique seed to prevent same-picture issues
      const imageUrl = `https://loremflickr.com/1200/630/${encodeURIComponent(topic.category.toLowerCase().replace(/\s+/g, ""))},technology?lock=${encodeURIComponent(slug)}`;

      const finalBlog = {
        id: slug, // Use slug as ID for consistency
        ...blogData,
        slug,
        category: topic.category,
        keywords: topic.keywords,
        author: "AI SEO Master",
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        image: imageUrl,
        createdAt: admin.firestore.Timestamp.now()
      };

      await firestore.collection("blogs").doc(slug).set(finalBlog);
      console.log(`Published blog: ${topic.title}`);
    }

    await firestore.collection("config").doc("system").update({ lastRun: admin.firestore.Timestamp.now() });
    console.log("SEO Masterclass AI Daily Run completed successfully.");

  } catch (error) {
    console.error("SEO Masterclass AI Run failed:", error);
  }
}

import { BLOG_POSTS } from "./src/data/blogs.ts";

/**
 * Server Startup
 */
async function startServer() {
  // API Routes
  app.get("/api/health", async (req, res) => {
    try {
      const testDoc = await firestore.collection("health").doc("check").get();
      res.json({ status: "ok", firestore: "connected", data: testDoc.exists ? testDoc.data() : "new" });
    } catch (error: any) {
      res.status(500).json({ status: "error", firestore: error.message });
    }
  });

  // Manual trigger (for testing/demo)
  app.get("/api/ai/run", async (req, res) => {
    try {
      const count = parseInt(req.query.count as string) || 5;
      await runSEOMasterclass(count);
      res.json({ success: true, message: `Successfully generated ${count} blogs` });
    } catch (error: any) {
      console.error("AI Run failed:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Seed the database with static blogs
  app.get("/api/seed", async (req, res) => {
    try {
      console.log("Seeding databases with 32 static blogs...");
      const batch = firestore.batch();
      
      for (const blog of BLOG_POSTS) {
        const docRef = firestore.collection("blogs").doc(blog.slug);
        batch.set(docRef, {
          ...blog,
          id: blog.slug,
          createdAt: admin.firestore.Timestamp.now() // For ordering
        }, { merge: true });
      }
      
      await batch.commit();
      res.json({ success: true, message: `Successfully seeded ${BLOG_POSTS.length} blogs to Firestore` });
    } catch (error: any) {
      console.error("Seeding failed:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Shutdown/Enable switch API
  app.post("/api/ai/toggle", express.json(), async (req, res) => {
    const { enabled } = req.body;
    await firestore.collection("config").doc("system").update({ aiEnabled: !!enabled });
    res.json({ message: `AI ${enabled ? 'enabled' : 'shut down'}` });
  });

  app.get("/sitemap.xml", (req, res) => {
    res.header("Content-Type", "application/xml");
    res.sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
  });

  app.get("/robots.txt", (req, res) => {
    res.header("Content-Type", "text/plain");
    res.sendFile(path.join(process.cwd(), "public", "robots.txt"));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
    // Auto-seed on startup to sync static blogs with Firestore images/content
    try {
      const batch = firestore.batch();
      for (const blog of BLOG_POSTS) {
        // Use slug as document ID to ensure uniqueness and easy lookup/overwrite
        const docRef = firestore.collection("blogs").doc(blog.slug);
        batch.set(docRef, { 
          ...blog, 
          id: blog.slug, // Sync ID with slug for consistency in Firestore
          createdAt: admin.firestore.Timestamp.now() 
        }, { merge: true });
      }
      await batch.commit();
      console.log("Auto-seeded Firestore with static blogs (slug-based IDs).");
    } catch (e) {
      console.error("Auto-seed failed:", e);
    }

    // Schedule the AI task: 5 blogs every day (at 00:00)
    // For demo purposes, we could run it once on startup if the database is empty
    cron.schedule("0 0 * * *", () => {
      runSEOMasterclass();
    });
  });
}

startServer();
