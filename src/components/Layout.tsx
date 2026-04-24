import { ReactNode } from "react";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import ChatWidget from "./ChatWidget.tsx";
import MasterAIController from "./MasterAIController.tsx";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-orange-500 selection:text-white">
      <MasterAIController />
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen">
        {children}
      </main>
      <ChatWidget />
      <Footer />
    </div>
  );
}
