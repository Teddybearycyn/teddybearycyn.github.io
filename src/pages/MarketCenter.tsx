import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  RefreshCw, 
  Target, 
  BarChart3, 
  Zap,
  Globe,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { format } from "date-fns";
import { cn } from "../lib/utils.ts";

interface PriceData {
  time: string;
  price: number;
}

const SYMBOLS = ["BTC/USDT", "NZD/USD", "EUR/USD"];

export default function MarketCenter() {
  const [selectedSymbol, setSelectedSymbol] = useState("NZD/USD");
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);
  const [lastTick, setLastTick] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState(true);

  // Initial History Fetch
  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/trading/history?symbol=${selectedSymbol}`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((d: any) => ({
          time: format(new Date(d.time), 'HH:mm'),
          price: d.price
        }));
        setPriceHistory(formatted);
        setCurrentPrice(formatted[formatted.length - 1].price);
        setIsLoading(false);
      });
  }, [selectedSymbol]);

  // Live Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/trading/ticker?symbol=${selectedSymbol}`)
        .then(res => res.json())
        .then(data => {
          const newPrice = parseFloat(data.price);
          setCurrentPrice(newPrice);
          setLastTick(Date.now());
          setPriceHistory(prev => {
            const newList = [...prev, { time: format(new Date(), 'HH:mm:ss'), price: newPrice }];
            return newList.slice(-50); // Keep last 50 data points for 1m feel
          });
        });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [selectedSymbol]);

  const priceDiff = priceHistory.length > 1 
    ? currentPrice - priceHistory[0].price 
    : 0;
  const pricePercent = priceHistory.length > 1 
    ? (priceDiff / priceHistory[0].price) * 100 
    : 0;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#050505] text-white font-sans selection:bg-orange-500/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Live Market Feed
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-2 italic">
              Market <span className="text-zinc-500 underline decoration-orange-500/30 underline-offset-8">Intelligence</span>
            </h1>
            <p className="text-zinc-500 text-sm max-w-md">
              High-frequency data streaming for major forex pairs and crypto. 1-minute interval analysis powered by News More AI.
            </p>
          </motion.div>

          <div className="flex bg-zinc-900/50 p-1 rounded-2xl border border-white/5 backdrop-blur-xl">
            {SYMBOLS.map(symbol => (
              <button
                key={symbol}
                onClick={() => setSelectedSymbol(symbol)}
                className={cn(
                  "px-6 py-3 rounded-xl transition-all font-mono text-sm",
                  selectedSymbol === symbol 
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Pulse Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Main Chart Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 bg-zinc-900/30 border border-white/5 p-8 rounded-[32px] backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Globe size={200} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center border border-white/5">
                  <BarChart3 className="text-orange-500" size={32} />
                </div>
                <div>
                  <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Current Price</div>
                  <div className="text-5xl font-mono tracking-tighter flex items-baseline gap-2">
                    ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 })}
                    <span className={cn(
                      "text-sm font-bold flex items-center",
                      priceDiff >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {priceDiff >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {Math.abs(pricePercent).toFixed(3)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 text-center">
                  <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Timeframe</div>
                  <div className="text-xs font-mono text-orange-500 flex items-center gap-1 justify-center">
                    <Clock size={12} /> 1M
                  </div>
                </div>
                <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 text-center">
                  <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Latency</div>
                  <div className="text-xs font-mono text-green-500">2ms</div>
                </div>
              </div>
            </div>

            <div className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceHistory}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} opacity={0.3} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#3f3f46" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    minTickGap={30}
                  />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    stroke="#3f3f46" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(val) => `$${val.toFixed(2)}`}
                    orientation="right"
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: '#f97316' }}
                    labelStyle={{ color: '#71717a', fontSize: '10px', textTransform: 'uppercase' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#f97316" 
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                    strokeWidth={3}
                    animationDuration={300}
                    baseLine={0}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 flex items-center justify-between text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-600">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Connection: Secure-TLS
              </div>
              <div>Server Time: {new Date().toLocaleTimeString()}</div>
              <div className="flex items-center gap-2">
                <RefreshCw size={10} className="animate-spin" />
                Auto-refresh Enabled
              </div>
            </div>
          </motion.div>

          {/* Side Panels */}
          <div className="space-y-8 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/50 border border-white/5 p-6 rounded-[32px] flex-1"
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                <Zap size={14} className="text-orange-500" /> AI Quick Insight
              </h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-orange-600/10 border border-orange-500/20 rounded-2xl">
                  <div className="text-[10px] text-orange-500 font-bold mb-2 uppercase">Status</div>
                  <p className="text-xs text-orange-100 leading-relaxed italic">
                    "Market showing signs of distribution. Crossover on 1M SMA detected. Volatility remains within expected bands for {selectedSymbol}."
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-500">RSI (14)</span>
                    <span className="text-orange-400">54.2</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-orange-600 h-full w-[54%]" />
                  </div>
                </div>

                <button className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all text-sm">
                  ASK CHATBOT ANALYSIS
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-orange-600 p-8 rounded-[32px] text-white overflow-hidden relative group cursor-pointer"
            >
              <div className="relative z-10">
                <div className="p-3 bg-white/20 rounded-2xl w-fit mb-6">
                  <Target size={24} />
                </div>
                <h4 className="text-2xl font-display font-bold leading-tight mb-3">Copy-Trading Masters</h4>
                <p className="text-orange-100 text-xs mb-8 leading-relaxed">Join 500+ traders following the News More HFT algorithms automatically.</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold">JOIN NOW</div>
                  <ArrowUpRight size={20} />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["MARKET CAP", "24H VOLUME", "SUPPLY"].map((label, i) => (
                <div key={label} className="bg-zinc-900/20 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
                    <div>
                        <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">{label}</div>
                        <div className="text-xl font-mono tracking-tight underline italic decoration-white/10">
                            {i === 0 ? "$2.4T" : i === 1 ? "$120B" : "19.8M"}
                        </div>
                    </div>
                    <Activity size={20} className="text-zinc-800" />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
