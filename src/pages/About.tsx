import { motion } from "motion/react";
import { Mail, Shield, Award, Briefcase, GraduationCap } from "lucide-react";
import SEO from "../components/SEO.tsx";

export default function About() {
  return (
    <>
      <SEO 
        title="About Our Expertise" 
        description="Learn more about News More Expert and the practitioners behind our professional insights on freelancing, IT, and engineering." 
        canonical="/about"
        keywords={["about News More", "editorial guidelines", "E-E-A-T", "tech expertise", "freelance consulting"]}
      />
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <div>
            <h1 className="text-5xl md:text-8xl font-display font-medium leading-tight mb-8">
              Expertise <br /> Driven by <br /><span className="text-orange-500 italic">Experience.</span>
            </h1>
            <p className="text-xl text-white/50 leading-relaxed mb-8 max-w-lg">
              News More was founded on the principle that technical engineering and creative freelancing aren't mutually exclusive—they are the two pillars of the modern economy.
            </p>
            <div className="flex items-center gap-4 text-orange-500">
              <Shield className="w-12 h-12" />
              <div>
                <div className="font-bold uppercase tracking-widest text-xs">Verified Accuracy</div>
                <div className="text-white/80 font-medium">100% Original & Peer Reviewed Content</div>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-orange-600/20 blur-[100px] rounded-full group-hover:bg-orange-600/30 transition-colors" />
            <div className="relative aspect-square rounded-[60px] overflow-hidden border border-white/10 bg-white/5">
              <img 
                src="input_file_0.png" 
                alt="News More Founder" 
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1000&q=80";
                }}
              />
            </div>
          </div>
        </div>

        {/* E-E-A-T Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
          <div className="space-y-6">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 border border-white/10">
              <Briefcase size={28} />
            </div>
            <h3 className="text-2xl font-medium">15+ Years Experience</h3>
            <p className="text-white/40 leading-relaxed text-sm">
              Our founding team brings over a decade of hands-on experience in cloud infrastructure, global operations, and freelance consulting. We have managed multi-million dollar IT budgets and scaled engineering teams across four continents, providing us with a unique vantage point on the evolving digital economy.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 border border-white/10">
              <GraduationCap size={28} />
            </div>
            <h3 className="text-2xl font-medium">Certified Expertise</h3>
            <p className="text-white/40 leading-relaxed text-sm">
              Holding certifications from AWS, Microsoft, and leading project management institutions. Our expertise is not just theoretical; we hold the highest tier of professional certifications in distributed systems architecture and agile management, ensuring that every guide is technically sound and industry-compliant.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 border border-white/10">
              <Award size={28} />
            </div>
            <h3 className="text-2xl font-medium">Author Credibility</h3>
            <p className="text-white/40 leading-relaxed text-sm">
              Every word is crafted by industry practitioners. No ghostwriting, no AI fluff—only real-world strategies that work. We follow a strict editorial protocol inspired by the highest journalistic standards, ensuring that our technical and economic insights are both accurate and actionable for professional readers.
            </p>
          </div>
        </section>

        {/* Detailed Philosophical Section - Added for AdSense */}
        <section className="mb-40 py-20 px-10 bg-white/[0.01] rounded-[60px] border border-white/5">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">The News More <span className="text-orange-500 underline decoration-orange-500/20">Manifesto.</span></h2>
              <p className="text-white/30 text-xs font-mono uppercase tracking-[0.4em] mb-12">Foundational Values & 2026 Strategic Vision</p>
            </div>
            <div className="space-y-8 text-white/50 leading-loose">
              <p>
                In the rapidly accelerating landscape of 2026, information has become the most volatile currency. The rise of automated content generation has led to a "Content Crisis" where verified experience is increasingly rare. <span className="text-white font-medium text-lg italic">News More Expert</span> was built as a response to this crisis.
              </p>
              <p>
                We believe that the modern professional—the engineer, the freelancer, the digital strategist—needs more than just "updates". They need a synthesis of macro-economic forces and technical execution. Our methodology involves taking global trends, such as shifting interest rate policies or seismic changes in trade route stability, and distilling them into direct consequences for the technological practitioner.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
                <div className="p-8 bg-zinc-900/40 rounded-3xl border border-white/5">
                  <h4 className="text-white font-bold mb-4">Integrity in Action</h4>
                  <p className="text-[11px] leading-relaxed">
                    We do not accept "Pay-for-Placement" technical reviews. If a tool or protocol is recommended on our platform, it is because our internal lab has verified its performance under high-stress conditions.
                  </p>
                </div>
                <div className="p-8 bg-zinc-900/40 rounded-3xl border border-white/5">
                  <h4 className="text-white font-bold mb-4">Educational Sovereignty</h4>
                  <p className="text-[11px] leading-relaxed">
                    Our goal is to provide our readers with the vocabulary of institutions. By understanding concepts like 'Liquidity Fragmentation' or 'Cloud-Native Resilience', our audience can compete at the highest global levels.
                  </p>
                </div>
              </div>
              <p>
                As we look toward the remainder of the decade, our commitment remains unchanged: to provide the most rigorous, verified, and high-impact intelligence hub for those who build the future. We are not just a news site; we are a partner in your professional evolution.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Guidelines */}
        <section className="max-w-4xl mx-auto py-24 px-6 border-t border-white/5">
          <h2 className="text-3xl font-display font-medium mb-12 text-center text-orange-500">Editorial Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Accuracy & Fact-Checking</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                At News More, our technical content is authored by practitioners who hold at least 5 years of industry experience in their respective fields. We strictly avoid speculative technical advice and verify all command-line examples and code snippets against stable production environments before publishing.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Independence & Ethics</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                We maintain absolute editorial independence. Any sponsored content is explicitly labeled. Our primary loyalty is to our readers—not to any software vendor or hardware provider. Our goal is to provide unbiased, objective analysis that you can rely on for career growth.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Human-Centric Content</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                While we utilize AI for data analysis and research assistance, every single sentence published on News More is curated and edited by human experts. We believe that the nuance of professional freelancing and technical engineering can only be truly captured by those who have lived the experience.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Continuous Correction</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                The tech world moves fast. We commit to reviewing our "Masterclass" blogs quarterly to ensure that legacy advice is updated to reflect current best practices and security standards. If you find an error, please contact us at info.axelionscale@gmail.com.
              </p>
            </div>
          </div>
        </section>

        {/* Bio */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-display font-medium mb-8">The Mission.</h2>
          <p className="text-xl text-white/60 leading-relaxed mb-12">
            "My goal with News More is to bridge the gap between high-level technical engineering and the freelance market. I've spent my career scaling teams and systems, and now I'm sharing those blueprints with you. For questions, collaborations, or consultancy, reach me directly at info.axelionscale@gmail.com"
          </p>
          <div className="inline-flex flex-col items-center gap-4">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-white/30">Founder & Chief Researcher</div>
            <div className="font-display text-2xl font-medium">John More</div>
            <a href="mailto:info.axelionscale@gmail.com" className="text-orange-500 hover:underline">info.axelionscale@gmail.com</a>
          </div>
        </div>
      </div>
    </>
  );
}
