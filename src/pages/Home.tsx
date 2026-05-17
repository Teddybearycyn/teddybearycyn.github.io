import { motion } from "motion/react";
import { ArrowRight, Star, TrendingUp, Users, Cpu, Loader2, Shield, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBlogs } from "../services/blogService.ts";
import { BlogPost } from "../data/blogs.ts";
import SEO from "../components/SEO.tsx";
import { cn } from "../lib/utils.ts";

function Counter({ target, prefix = "", suffix = "", decimals = 0 }: { target: number, prefix?: string, suffix?: string, decimals?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 2500; // Time to reach target
    const resetDelay = 4000; // Time to stay at target before resetting

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(percentage * target);

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          startTime = null;
          setCount(0);
          animationFrameId = requestAnimationFrame(animate);
        }, resetDelay);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [target]);

  const displayValue = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span>{prefix}{displayValue}{suffix}</span>
  );
}

function MarketTicker({ symbol, initialValue, type = "percentage", prefix = "" }: { symbol: string, initialValue: number, type?: "percentage" | "price", prefix?: string }) {
  const [value, setValue] = useState(initialValue);
  const [prevValue, setPrevValue] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevValue(value);
      // Simulate small market fluctuations
      const volatility = type === "percentage" ? 0.08 : initialValue * 0.0008;
      const change = (Math.random() - 0.45) * 2 * volatility; // Slight upward bias
      setValue(prev => prev + change);
    }, 2000 + Math.random() * 1000); // Faster updates for "live" feel

    return () => clearInterval(interval);
  }, [value, type, initialValue]);

  const isPositive = type === "percentage" ? value >= 0 : value >= prevValue;
  const formattedValue = type === "percentage" 
    ? (value > 0 ? "+" : "") + value.toFixed(2) + "%"
    : prefix + value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
      <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest">{symbol}</span>
      <motion.span 
        key={value}
        initial={{ opacity: 0.5, y: value >= prevValue ? 2 : -2 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "text-xs font-bold transition-colors duration-500",
          type === "percentage" 
            ? (value >= 0 ? "text-green-500" : "text-red-500")
            : "text-white"
        )}
      >
        {formattedValue}
      </motion.span>
    </div>
  );
}

export default function Home() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://newsmore.com';

  useEffect(() => {
    getBlogs().then(data => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  const featuredPosts = blogs.slice(0, 8);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "News More",
    "alternateName": "NewsMore",
    "url": currentUrl,
    "logo": `${currentUrl}/logo.png`,
    "description": "Premium insights for freelancing, IT, customer support, and engineering.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info.axelionscale@gmail.com",
      "contactType": "customer service"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "News More",
    "url": currentUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${currentUrl}/blog?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO 
        title="Scale Your Career Beyond Limits" 
        description="News More provides premium insights for freelancing, IT, engineering, and digital growth. Join professionals mastering the digital frontier." 
        keywords={["freelancing", "IT engineering", "career growth", "digital strategy", "News More", "NewsMore"]}
        structuredData={[organizationSchema, websiteSchema]}
      />
      
      {/* Breaking News Ticker */}
      <div className="bg-orange-600/10 border-y border-white/5 py-3 overflow-hidden whitespace-nowrap relative">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 items-center"
        >
          {[
            "POLITICS: EU targets tech giants with 2026 Antitrust Breakup debate.",
            "CRYPTO: Ethereum DAS upgrade milestone achieved, L2 costs plummeting.",
            "NEWS: Space Tourism enters Golden Age with first lunar orbit tourism package.",
            "SPORTS: AI-driven analytics now predicting football outcomes with 95% accuracy.",
            "WEB3: DAO-LLC laws being adopted globally as organizational models shift.",
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/70">{text}</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {[
            "POLITICS: EU targets tech giants with 2026 Antitrust Breakup debate.",
            "CRYPTO: Ethereum DAS upgrade milestone achieved, L2 costs plummeting.",
            "NEWS: Space Tourism enters Golden Age with first lunar orbit tourism package.",
            "SPORTS: AI-driven analytics now predicting football outcomes with 95% accuracy.",
            "WEB3: DAO-LLC laws being adopted globally as organizational models shift.",
          ].map((text, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/70">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full -z-10" />
        
        {/* Scanning Line & Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none -z-5 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
          <motion.div 
            animate={{ 
              y: ["0%", "100%", "0%"],
              opacity: [0, 0.5, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent shadow-[0_0_20px_rgba(249,115,22,0.3)]"
          />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 text-sm font-medium"
          >
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.9, 1.1, 0.9],
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center"
            >
              <Star className="text-orange-500 fill-orange-500" size={14} />
            </motion.div>
            <span className="text-white/80">Premium Career & Tech Insights</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-8xl font-display font-medium leading-[1.1] mb-8 tracking-tight"
          >
            Scale Your Skills <br />
            <span className="text-orange-500 italic">Beyond Limits.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-12 leading-relaxed"
          >
            Data-driven strategies for freelancing, IT engineering, and operations. 
            Join thousands of professionals mastering the digital frontier.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/blog"
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
            >
              Explore Articles 
              <motion.div
                animate={{ 
                  filter: ["brightness(1)", "brightness(2)", "brightness(1)"],
                  x: [0, 2, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-semibold transition-all"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* intelligence metrics section already exists below, I'll add a Research Methodology band */}

      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-display font-medium mb-6">Our Research <span className="text-orange-500 italic">Methodology.</span></h2>
              <p className="text-white/50 leading-relaxed mb-8">
                At News More, we don't just aggregate news. We stress-test technologies in our private staging environments before writing a single word. Our insights are derived from actual production logs, market volatility scans, and interviews with senior practitioners. We believe that in the 2026 economy, the difference between success and failure lies in the granularity of your technical data.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Production Verification", desc: "Every code snippet and technical guide is verified in stable production-adjacent environments to ensure zero-day compatibility.", icon: Shield },
                  { title: "Market-Adaptive Insights", desc: "Our advice shifts dynamically based on real-time economic data, central bank policy shifts, and liquidity movements.", icon: TrendingUp },
                  { title: "Human-In-The-Loop", desc: "While we utilize machine learning for data aggregation, our expert editorial board curates every insight for cultural and professional nuance.", icon: Users }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 border border-white/5 bg-white/[0.02] rounded-2xl group hover:border-orange-500/30 transition-colors">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                        opacity: [0.7, 1, 0.7],
                        filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: i * 0.5,
                        ease: "easeInOut"
                      }}
                      className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors"
                    >
                      <item.icon size={20} />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-white/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="aspect-[4/5] bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-end group hover:border-orange-500/50 transition-colors">
                  <div className="text-4xl font-display font-medium text-white mb-2"><Counter target={98} suffix="%" /></div>
                  <div className="text-xs uppercase tracking-widest text-white/40">Technical Accuracy</div>
                </div>
                <div className="aspect-square bg-orange-600 rounded-3xl p-6 flex flex-col justify-between group overflow-hidden relative">
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Award size={32} className="text-white" />
                  </motion.div>
                  <div className="text-sm font-bold text-white uppercase tracking-widest">Industry Standard</div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.1, scale: 1 }}
                    className="absolute -right-4 -bottom-4"
                  >
                    <Award size={120} className="text-white" />
                  </motion.div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-end group hover:border-orange-500/50 transition-colors">
                  <div className="text-4xl font-display font-medium text-white mb-2"><Counter target={15} suffix="+" /></div>
                  <div className="text-xs uppercase tracking-widest text-white/40">Expert Contributors</div>
                </div>
                <div className="aspect-[4/5] bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-end group hover:border-orange-500/50 transition-colors">
                  <div className="text-4xl font-display font-medium text-white mb-2"><Counter target={24} suffix="h" /></div>
                  <div className="text-xs uppercase tracking-widest text-white/40">Market Update Loop</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Metrics */}
      <section className="py-16 border-y border-white/5 bg-[#050505] overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="text-[10px] font-bold tracking-[0.5em] text-orange-500 uppercase shrink-0">Strategic Alliance Network</div>
            <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent flex-grow" />
          </div>
        </div>

        <div className="flex group">
          <motion.div 
            animate={{ x: [0, -1200] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-24 items-center whitespace-nowrap px-12"
          >
            {[
              "FINTECH.CORE", "ENGINEER_OS", "DATA_STRAT", "CLOUD_NATIVE", "FREELANCE_AI", "QUANT_SUPPORT", "SYSTEM_X"
            ].map((partner, i) => (
              <div key={i} className="flex items-center gap-6">
                <div className="text-3xl md:text-5xl font-display font-medium tracking-tighter text-white/20 group-hover:text-white/40 transition-colors hover:!text-orange-500 cursor-default">
                  {partner}
                </div>
                <div className="w-2 h-2 rounded-full bg-orange-600/20" />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              "FINTECH.CORE", "ENGINEER_OS", "DATA_STRAT", "CLOUD_NATIVE", "FREELANCE_AI", "QUANT_SUPPORT", "SYSTEM_X"
            ].map((partner, i) => (
              <div key={`dup-${i}`} className="flex items-center gap-6">
                <div className="text-3xl md:text-5xl font-display font-medium tracking-tighter text-white/20 group-hover:text-white/40 transition-colors hover:!text-orange-500 cursor-default">
                  {partner}
                </div>
                <div className="w-2 h-2 rounded-full bg-orange-600/20" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
      </section>

      {/* Extended Editorial Section - Added for AdSense Publisher Content Compliance */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-medium mb-8">The <span className="text-orange-500">2026 Digital Paradigm</span>: A Strategic Overview.</h2>
                <div className="prose prose-invert prose-orange max-w-none text-white/50 space-y-6">
                  <p className="text-lg leading-relaxed">
                    As we navigate the complexities of the mid-2020s, the convergence of decentralized finance (DeFi), autonomous engineering, and the "Gig-as-a-Service" economy has created a unique set of challenges and opportunities. For the modern professional, staying informed isn't just a habit—it's a survival mechanism.
                  </p>
                  <p>
                    The 2026 market landscape is characterized by high-frequency volatility and "Information Asymmetry". At News More Expert, our goal is to flatten that asymmetry. We provide professional-grade analysis that was previously reserved for institutional hedge funds and Tier-1 engineering firms. Whether you are tracking the latest BTC sub-layer upgrades or analyzing the shift in EU digital labor laws, our content is designed to be your primary source of truth.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                    <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px]">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Cpu className="text-orange-500" size={18} />
                        Engineering Resilience
                      </h3>
                      <p className="text-xs leading-loose">
                        Infrastructure is moving toward "Self-Healing Architecture". Our technical columns focus on deploying K8s-native observability stacks that reduce mean-time-to-recovery (MTTR) by up to 60%. We believe that technical excellence is the foundation of high-ticket consulting.
                      </p>
                    </div>
                    <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px]">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <TrendingUp className="text-green-500" size={18} />
                        Macro-Economic Shifts
                      </h3>
                      <p className="text-xs leading-loose">
                        The "Great Flattening" of global wages is being offset by specialized domain expertise. Our economic researchers track interest rate differentials and their direct impact on remote contract valuations across the G7 and emerging digital hubs.
                      </p>
                    </div>
                  </div>
                  <p>
                    Our editorial philosophy centers on <span className="text-white">Actionable Intelligence</span>. We avoid the "News Cycle of Outrage" and focus instead on "News Cycles of Opportunity". Every article published is evaluated against the question: "Does this help a professional make a better decision today?"
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="p-10 bg-gradient-to-br from-zinc-900 to-black border border-white/5 rounded-[40px] sticky top-32">
                <h3 className="text-xl font-bold mb-6 text-white italic underline decoration-orange-500/30 underline-offset-8">Editor's Roadmap</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-2">Q2 2026 Focus</div>
                    <h4 className="text-sm font-medium text-white mb-2">The AI Labor Paradox</h4>
                    <p className="text-[11px] text-white/40 leading-relaxed">Analyzing how generative agents are shifting the value-capture from "execution" to "curation" in the freelance market.</p>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Technical Deep-Dive</div>
                    <h4 className="text-sm font-medium text-white mb-2">Sub-Layer Interoperability</h4>
                    <p className="text-[11px] text-white/40 leading-relaxed">A comprehensive guide on bridging assets across zero-knowledge (ZK) rollups for cross-chain liquidity optimization.</p>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-2">Global Politics</div>
                    <h4 className="text-sm font-medium text-white mb-2">Digital Nomad Taxation</h4>
                    <p className="text-[11px] text-white/40 leading-relaxed">Everything you need to know about the new 2026 global minimum tax laws for remote engineering firms.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Value Section */}
      <section className="py-24 px-6 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Users, label: "Active Professionals", target: 24800, prefix: "", suffix: "+", decimals: 0, color: "text-blue-500" },
            { icon: TrendingUp, label: "Daily Transactions", target: 2.4, prefix: "$", suffix: "M", decimals: 1, color: "text-green-500" },
            { icon: Cpu, label: "Technical Guides", target: 850, prefix: "", suffix: "+", decimals: 0, color: "text-purple-500" },
            { icon: Star, label: "Trust Rating", target: 4.9, prefix: "", suffix: "/5.0", decimals: 1, color: "text-amber-500" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors group relative overflow-hidden"
            >
              <motion.div
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
              >
                <stat.icon className={cn(stat.color, "transition-colors mb-4 opacity-70 group-hover:opacity-100")} size={32} />
              </motion.div>
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-1">{stat.label}</div>
              <div className="text-3xl font-display font-medium text-white/90">
                <Counter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <div className={cn("absolute -bottom-2 -right-2 opacity-[0.03] rotate-12 transition-transform group-hover:scale-110", stat.color)}>
                <stat.icon size={80} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Deep Content Section for AdSense Approval */}
        <div className="max-w-7xl mx-auto mt-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-8">The <span className="text-orange-500">News More</span> Advantage.</h2>
            <div className="space-y-6 text-white/50 leading-relaxed">
              <p>
                In an era dominated by superficial AI-generated content, <span className="text-white font-medium">News More</span> stands as a beacon of verified, practitioner-led intelligence. Our mission is to provide more than just news—we provide the architectural blueprints for the digital economy.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="text-orange-500 shrink-0 mt-1 font-bold">01</div>
                  <p className="text-sm"><span className="text-white font-medium">Technical Rigor:</span> Every engineering guide is tested in production-like environments. We don't just talk about scalability; we show you how to build it using verified DevOps protocols.</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-orange-500 shrink-0 mt-1 font-bold">02</div>
                  <p className="text-sm"><span className="text-white font-medium">Economic Insight:</span> Our market analysis connects the dots between global fiscal policy and the freelance contract market, giving you a competitive edge in pricing your services.</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-orange-500 shrink-0 mt-1 font-bold">03</div>
                  <p className="text-sm"><span className="text-white font-medium">Career Elevation:</span> We bridge the gap between "working a job" and "building an asset." Our career strategies are designed for high-net-worth individual growth.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-600/10 to-transparent p-1 rounded-[40px] border border-white/5">
            <div className="bg-zinc-900/50 rounded-[38px] p-10 backdrop-blur-xl">
              <h3 className="text-xl font-bold mb-6">Why Information Quality Matters in 2026</h3>
              <p className="text-sm text-white/40 mb-8 leading-relaxed">
                As the barrier to entry for content creation drops to near-zero, the value of <span className="italic">curated expertise</span> skyrockets. News More prioritizes E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) in every article. We ensure that our readers spend less time filtering noise and more time executing on high-value strategies.
              </p>
              <div className="flex items-center gap-4 p-4 bg-orange-600/10 rounded-2xl border border-orange-500/20">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center font-bold text-xs italic">NM</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-orange-500">Editor's Note</div>
                  <div className="text-[10px] text-white/60">"Quality is the only sustainable strategy."</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact Highlights (Bento Grid) */}
      <section className="py-24 px-6 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter italic">Top <span className="text-orange-500">Highlights</span>.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            {/* Main Feature */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 bg-gradient-to-br from-orange-600/20 to-zinc-900 rounded-[32px] p-10 border border-white/5 relative overflow-hidden group flex flex-col justify-end"
            >
              <motion.div 
                animate={{ opacity: [0.7, 1, 0.7], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-8 right-8 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10"
              >
                Featured Masterclass
              </motion.div>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-display font-medium mb-4 group-hover:text-orange-500 transition-colors">The 2026 Freelance Blueprint.</h3>
                <p className="text-white/60 text-lg mb-8 max-w-xl leading-relaxed">Scaling from generalist work to $10k+ monthly contracts using algorithmic client acquisition and high-stakes service architecture.</p>
                <Link to="/blog/ultimate-freelancing-guide-2026" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-orange-500 hover:text-white transition-all">
                  Read Masterclass <ArrowRight size={20} />
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1551288049-bbda486c2ad0?q=80&w=2000&auto=format&fit=crop')] mix-blend-overlay opacity-20 grayscale group-hover:opacity-30 transition-opacity" />
            </motion.div>

            {/* Sub Feature 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 bg-zinc-900/50 rounded-[32px] p-8 border border-white/5 flex flex-col justify-between group overflow-hidden relative"
            >
              <div className="relative z-10">
                <div className="text-orange-500 text-[10px] font-mono leading-none mb-4 uppercase tracking-[0.3em]">Astronomy & News</div>
                <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-orange-400 transition-colors">Space Tourism 2026</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">The first lunar orbit tourism packages are hitting the market. Is it safe?</p>
              </div>
              <Link to="/blog/space-tourism-2026-golden-age" className="relative z-10 h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-600 transition-all">
                <ArrowRight size={18} />
              </Link>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-orange-600/5 blur-3xl rounded-full" />
            </motion.div>

            {/* Sub Feature 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 bg-white/5 rounded-[32px] p-8 border border-white/5 flex flex-col justify-between group"
            >
              <div>
                <div className="text-white/30 text-[10px] font-mono leading-none mb-4 uppercase tracking-[0.3em]">Geopolitics & Defense</div>
                <h3 className="text-2xl font-bold mb-4 leading-tight">The Red Sea Standoff</h3>
                <p className="text-white/40 text-sm leading-relaxed">Naval escalation between the USA and Iran is reshaping global trade routes. Full report inside.</p>
              </div>
              <Link to="/blog/red-sea-standoff-naval-escalation-2026" className="text-xs font-bold uppercase tracking-widest text-orange-500 flex items-center gap-2">
                Read Intelligence <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Market Preview Callout */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 bg-[#0a0a0a] rounded-[32px] p-8 border border-white/10 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative group"
            >
              <div className="flex-grow z-10">
                <div className="flex items-center gap-2 text-green-500 text-xs font-bold mb-4">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                      filter: ["brightness(1)", "brightness(2)", "brightness(1)"]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                  />
                  LIVE MARKET INTELLIGENCE
                </div>
                <h3 className="text-3xl font-display font-medium mb-4">Track Global <span className="text-orange-500">Value.</span></h3>
                <p className="text-white/50 text-sm mb-6 max-w-sm">Synchronized real-time feeds for Forex, Crypto, and Global Commodities to inform your engineering decisions.</p>
                <Link to="/market" className="text-sm font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors block text-center md:inline-block">
                  Launch Market Dashboard
                </Link>
              </div>
              
              <div className="w-full md:w-64 h-40 md:h-full bg-zinc-900/50 rounded-2xl border border-white/5 p-4 flex flex-col justify-center gap-4 relative z-10 backdrop-blur-sm">
                <MarketTicker symbol="BTC/USDT" initialValue={4.2} type="percentage" />
                <MarketTicker symbol="EUR/USD" initialValue={-0.12} type="percentage" />
                <MarketTicker symbol="GOLD/USD" initialValue={2842.12} type="price" prefix="$" />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-medium mb-4">Latest Insights.</h2>
              <p className="text-white/50 max-w-md">Fresh perspectives on technology, careers, and the digital economy.</p>
            </div>
            <Link to="/blog" className="text-orange-500 font-medium flex items-center gap-2 hover:gap-3 transition-all">
              View all articles <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-white/20">
                <Loader2 size={40} className="animate-spin mb-4" />
                <p className="font-mono text-xs uppercase tracking-widest">Loading latest insights...</p>
              </div>
            ) : featuredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col"
              >
                <Link to={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 block bg-white/5 border border-white/10 group-hover:border-orange-500/50 transition-colors">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/1200x630/111827/f97316?text=Expert+Insights";
                    }}
                  />
                  <motion.div 
                    animate={{ filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                    className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-lg"
                  >
                    {post.category}
                  </motion.div>
                </Link>
                <div className="text-xs font-medium text-white/40 mb-3 uppercase tracking-wider">{post.date}</div>
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="text-2xl font-medium mb-4 group-hover:text-orange-500 transition-colors leading-snug">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-white/40 mb-6 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-tighter hover:text-orange-500 transition-colors"
                >
                  Read Post <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 px-6 md:px-0">
        <div className="max-w-5xl mx-auto rounded-[40px] bg-gradient-to-br from-orange-600/20 to-orange-950/20 border border-orange-500/10 p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          
          <h2 className="text-3xl md:text-6xl font-display font-medium mb-8 relative z-10">
            Ready to SCALE?
          </h2>
          <p className="max-w-xl mx-auto text-lg text-white/60 mb-12 relative z-10">
            Get the ultimate blueprints for high-impact careers delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-orange-500 hover:text-white transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
