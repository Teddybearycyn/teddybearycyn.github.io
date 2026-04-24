import { motion } from "motion/react";
import { ArrowRight, Star, TrendingUp, Users, Cpu, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBlogs } from "../services/blogService.ts";
import { BlogPost } from "../data/blogs.ts";
import SEO from "../components/SEO.tsx";

export default function Home() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs().then(data => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  const featuredPosts = blogs.slice(0, 8);

  return (
    <>
      <SEO 
        title="Home" 
        description="News More - Premium insights for freelancing, IT, customer support, and engineering. Scale your career with our expert updates." 
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "News More",
          "url": "https://newsmore.com",
          "logo": "https://newsmore.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "info.axelionscale@gmail.com",
            "contactType": "customer service"
          },
          "sameAs": [
            "https://twitter.com/newsmore",
            "https://linkedin.com/company/newsmore"
          ]
        }}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 text-sm font-medium"
          >
            <Star className="text-orange-500 fill-orange-500" size={14} />
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
              Exlpore Articles <ArrowRight size={20} />
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

      {/* Stats/Value Section */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Users, label: "Freelancing", value: "Expert Guides" },
            { icon: TrendingUp, label: "Growth", value: "Strategic ROI" },
            { icon: Cpu, label: "Engineering", value: "Scalable Tech" },
            { icon: Star, label: "E-E-A-T", value: "Verified Knowledge" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-orange-500/20 transition-colors group"
            >
              <stat.icon className="text-white/20 group-hover:text-orange-500 transition-colors mb-4" size={32} />
              <div className="text-xs font-mono text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</div>
              <div className="text-2xl font-medium text-white/90">{stat.value}</div>
            </motion.div>
          ))}
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
                <Link to={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 block bg-white/5 border border-white/10">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/1200x630/111827/f97316?text=Expert+Insights";
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
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
