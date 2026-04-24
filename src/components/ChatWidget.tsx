import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader2, Power, PowerOff, ShieldCheck } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { cn } from "../lib/utils.ts";
import { isAIEnabled } from "../services/blogService.ts";
import { auth } from "../lib/firebase.ts";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Initialize AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotEnabled, setIsBotEnabled] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi there! I'm your friendly AI companion. I'm here to chat, answer your questions, or just keep you company while you browse our blogs. How are you doing today?" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isAIEnabled().then(setIsBotEnabled);
    
    // Check if the current user is the owner
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // davidnweke26@gmail.com is the restricted owner
      setIsAdmin(user?.email === "davidnweke26@gmail.com");
    });
    return () => unsubscribe();
  }, []);

  const handleAdminLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading || !isBotEnabled) return;

    const userMessage = inputText.trim();
    setInputText("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }]
        })), { role: "user", parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: "You are a friendly, warm, and human-like conversational ChatBot for the 'News More' platform. Your goal is to be a companion to users, chat with them if they are bored, and answer their questions beautifully. You should have a distinct personality—be empathetic, curious, and engaging. CRITICAL: You are strictly prohibited from discussing anything evil, illegal, dangerous, or harmful. If a user asks about such topics, politely decline and steer the conversation back to something positive. You are here to keep people company and provide helpful, safe insights. Be concise but warm.",
        },
      });

      const botText = response.text || "I'm sorry, my mind went blank for a second. What were we saying?";
      setMessages(prev => [...prev, { role: "bot", text: botText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "bot", text: "I'm feeling a bit disconnected. Can you say that again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-28 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-[#0A0A0A] border border-white/10 rounded-[32px] shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className={cn("p-6 flex items-center justify-between transition-colors", isBotEnabled ? "bg-orange-600" : "bg-zinc-800")}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  {isBotEnabled ? <Bot size={20} className="text-white" /> : <PowerOff size={20} className="text-white" />}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Friendly AI</h3>
                  <p className="text-white/70 text-[10px] uppercase tracking-widest font-bold">{isBotEnabled ? "Here to Chat" : "Resting..."}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <button 
                    onClick={async () => {
                      const next = !isBotEnabled;
                      setIsBotEnabled(next);
                      await fetch("/api/ai/toggle", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ enabled: next })
                      });
                    }}
                    className="p-2 hover:bg-black/10 rounded-lg transition-colors text-white/60 hover:text-white"
                    title={isBotEnabled ? "Hibernate ChatBot" : "Wake Up ChatBot"}
                  >
                    {isBotEnabled ? <Power size={18} /> : <Power size={18} className="text-orange-500" />}
                  </button>
                ) : (
                  <button 
                    onDoubleClick={handleAdminLogin}
                    className="p-2 text-white/5 opacity-0 hover:opacity-10 transition-opacity"
                    title="Admin restricted"
                  >
                    <ShieldCheck size={18} />
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-black/10 rounded-lg transition-colors text-white/60 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isBotEnabled ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <PowerOff size={48} className="text-white/10 mb-6" />
                <h4 className="text-white font-bold mb-2">ChatBot is Offline</h4>
                <p className="text-white/40 text-sm">Your companion is currently resting. Feel free to browse our blogs in the meantime!</p>
              </div>
            ) : (
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
              >
                {messages.map((m, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "flex flex-col max-w-[80%]",
                      m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div className={cn(
                      "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      m.role === "user" 
                        ? "bg-orange-600 text-white rounded-br-none" 
                        : "bg-white/5 text-white/80 border border-white/10 rounded-bl-none"
                    )}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-white/30 text-xs font-medium animate-pulse">
                    <Loader2 size={14} className="animate-spin" /> Thinking...
                  </div>
                )}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-6 pt-0">
              <div className="relative">
                <input
                  type="text"
                  disabled={!isBotEnabled}
                  placeholder={isBotEnabled ? "Say something nice..." : "Chat is offline"}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-sm focus:outline-none focus:border-orange-500 transition-colors disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim() || isLoading || !isBotEnabled}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 disabled:opacity-50 disabled:hover:bg-orange-600 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group",
          isOpen ? "bg-white text-black" : "bg-orange-600 text-white"
        )}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />}
      </button>
    </div>
  );
}
