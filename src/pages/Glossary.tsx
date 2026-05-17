import { motion } from "motion/react";
import { Book, Search, Layers, Zap, Globe, Shield } from "lucide-react";
import { useState } from "react";
import SEO from "../components/SEO.tsx";

const TERMS = [
  {
    term: "Arbitrage",
    definition: "The simultaneous purchase and sale of an asset to profit from an imbalance in the price. It is a trade that profits by exploiting the price differences of identical or similar financial instruments on different markets or in different forms.",
    category: "Economic"
  },
  {
    term: "Blockchain Interoperability",
    definition: "The ability of different blockchain networks to communicate, exchange data, and share assets across various protocols. This is critical for the 2026 decentralized economy as it allows for a seamless flow of value between siloed ecosystems.",
    category: "Technical"
  },
  {
    term: "Digital Sovereignty",
    definition: "The power and right to self-govern digital assets, personal data, and computational resources without interference from centralized authorities or foreign powers.",
    category: "Political"
  },
  {
    term: "E-E-A-T",
    definition: "Experience, Expertise, Authoritativeness, and Trustworthiness. A key framework used by search engines (and News More) to evaluate the quality of information published in YMYL (Your Money Your Life) categories.",
    category: "Editorial"
  },
  {
    term: "Freelance Architecture",
    definition: "The systematic design of a service-based business that utilizes high-level engineering principles to scale client acquisition, project management, and delivery without increasing operational drag.",
    category: "Career"
  },
  {
    term: "Geopolitical Hedge",
    definition: "An investment or strategic career move designed to protect against the risks associated with regional political instability or international conflict.",
    category: "Political"
  },
  {
    term: "Institutional Liquidity",
    definition: "Large-scale capital flows provided by banks, mutual funds, and pension funds. Tracking institutional liquidity is a key indicator for macro-market reversals.",
    category: "Economic"
  },
  {
    term: "K8s-Native",
    definition: "Applications and workflows specifically designed to run within Kubernetes environments, leveraging container orchestration for maximum scalability and resilience.",
    category: "Technical"
  },
  {
    term: "Liquidity Fragmentation",
    definition: "The dispersal of market activity across multiple venues, exchanges, and protocols, which can lead to higher slippage and increased volatility for individual assets.",
    category: "Economic"
  },
  {
    term: "Masterclass Archetype",
    definition: "A professional content format pioneered by News More that combines deep-dive technical tutorials with macro-economic context for high-tier career growth.",
    category: "Editorial"
  },
  {
    term: "Proof of Stake (PoS)",
    definition: "A consensus mechanism for blockchain networks that selects validators based on the amount of cryptocurrency they hold and are willing to 'stake' as collateral.",
    category: "Technical"
  },
  {
    term: "Zero-Knowledge (ZK) Proofs",
    definition: "A cryptographic method by which one party can prove to another that they know a value, without conveying any information apart from the fact that they know the value.",
    category: "Technical"
  }
];

export default function Glossary() {
  const [search, setSearch] = useState("");
  
  const filteredTerms = TERMS.filter(t => 
    t.term.toLowerCase().includes(search.toLowerCase()) || 
    t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#050505] text-white">
      <SEO 
        title="Comprehensive Market & Tech Glossary | News More" 
        description="A massive encyclopedia of terms covering 2026 economic trends, technical engineering, digital sovereignty, and high-tier career strategy."
        canonical="/glossary"
      />
      
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-orange-500/10 rounded-3xl flex items-center justify-center text-orange-500 border border-orange-500/20">
              <Book size={32} />
            </div>
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-medium tracking-tight mb-8 underline decoration-orange-500/10">
            Intelligence <span className="text-orange-500 italic">Lexicon.</span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto leading-loose">
            Defining the concepts that govern the 2026 digital landscape. From macro-economic indicators to Kubernetes-native engineering, our lexicon is a living repository of professional knowledge.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="relative mb-16 max-w-xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input 
            type="text" 
            placeholder="Search the Lexicon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-16 pr-6 focus:outline-none focus:border-orange-500 transition-all font-mono text-sm"
          />
        </div>

        {/* Term Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTerms.map((t, i) => (
            <motion.div
              key={t.term}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-orange-500/30 transition-all hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{t.category}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500/20 group-hover:bg-orange-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-orange-500 transition-colors">{t.term}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed group-hover:text-zinc-400 transition-colors">
                {t.definition}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Massive Educational Content Block for AdSense */}
        <div className="mt-32 pt-20 border-t border-white/5 space-y-20 p-12 bg-white/[0.01] rounded-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-white font-bold">
                <Layers className="text-orange-500" size={20} />
                Deep Learning Architectures
              </div>
              <p className="text-sm text-zinc-500 leading-loose">
                Understanding the underlying architecture of modern intelligent systems is paramount for the 2026 engineer. We focus on the intersection of transformer models and edge computing. The decentralization of processing power is shift the paradigm from cloud-only execution to a hybrid distributed model that prioritizes data privacy and low-latency response times.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-white font-bold">
                <Zap className="text-blue-500" size={20} />
                Agile Execution Models
              </div>
              <p className="text-sm text-zinc-500 leading-loose">
                Agility in 2026 is no longer just a project management buzzword—it is a requirement for financial survival. As market volatility increases and AI-driven market makers dominate the liquidity pools, professionals must adopt execution models that allow for rapid pivoting without compromising long-term strategic integrity.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-white font-bold">
                <Globe className="text-green-500" size={20} />
                The Sovereign Freelancer
              </div>
              <p className="text-sm text-zinc-500 leading-loose">
                Becoming a 'Sovereign Freelancer' means diversifying your client base across multiple jurisdictions and currencies. Our glossary terms like 'Geopolitical Hedge' and 'Digital Sovereignty' are designed to give you the vocabulary needed to navigate international labor laws and cross-border payment rails using verified stablecoin protocols.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-white font-bold">
                <Shield className="text-orange-500" size={20} />
                Cyber-Resilience Frameworks
              </div>
              <p className="text-sm text-zinc-500 leading-loose">
                Security is the silent pillar of high-level freelancing. Implementing zero-trust architectures and encrypted communication pipelines for client interactions is becoming the industry standard. We provide the definitions and implementation paths to ensure your specialized firm remains resilient against emerging 2026 threat vectors.
              </p>
            </div>
          </div>
          
          <div className="bg-orange-600/5 p-12 rounded-[40px] border border-orange-500/10 text-center">
            <h2 className="text-2xl font-bold mb-6 italic text-white">The Ethics of Information in the 2020s.</h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-4xl mx-auto">
              At News More Expert, we believe that definitions have power. By standardizing the vocabulary of the 2026 digital economy, we empower professionals to communicate with institutional-grade authority. Our information is sourced from verified practitioners and is continuously reviewed to ensure alignment with the latest technological and economic shifts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
