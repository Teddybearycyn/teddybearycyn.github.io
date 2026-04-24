import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase.ts";
import { MasterAIService } from "../services/masterAIService.ts";
import { collection, query, where, getDocs, setDoc, doc, Timestamp, orderBy, limit } from "firebase/firestore";

/**
 * MasterAIController: The "Invisible" Brain
 * This component runs in the background and ensures the platform is updated daily.
 * It is invisible to all users.
 */
export default function MasterAIController() {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Only davidnweke26@gmail.com acts as the "trigger" for the background tasks 
    // to keep it simple and centralized, but it runs silently.
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email === "davidnweke26@gmail.com") {
        checkForDailyTask();
      }
    });

    // Also run a check every 6 hours if the tab is open
    const interval = setInterval(checkForDailyTask, 1000 * 60 * 60 * 6);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const checkForDailyTask = async () => {
    if (isProcessing) return;
    
    try {
      console.log("Master AI: Checking for daily automated tasks...");
      
      // Check if a blog was already posted today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const blogsRef = collection(db, "blogs");
      const q = query(
        blogsRef, 
        where("createdAt", ">=", Timestamp.fromDate(today)),
        limit(1)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        // No blog today! Master AI takes action.
        await runMasterWorkflow();
      } else {
        console.log("Master AI: Daily content is already up to date.");
      }
    } catch (error) {
      // Fail silently as requested for the "invisible" experience
      console.error("Master AI silently failed check:", error);
    }
  };

  const runMasterWorkflow = async () => {
    setIsProcessing(true);
    try {
      console.log("Master AI: Starting autonomous workflow...");
      
      // 1. Keyword Research
      const keywords = await MasterAIService.performResearch();
      const targetKeyword = keywords[0] || "Advanced Systems Engineering 2026";
      
      // 2. Content Generation
      const blogData = await MasterAIService.generateDailyBlog(targetKeyword);
      
      if (blogData.slug) {
        // 3. Save to Firestore
        await setDoc(doc(db, "blogs", blogData.slug), {
          ...blogData,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          status: "published",
          views: 0
        });
        
        console.log(`Master AI: Successfully research and posted: ${blogData.title}`);
      }
    } catch (error) {
      console.error("Master AI Workflow failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // This component doesn't render anything
  return null;
}
