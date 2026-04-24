import { motion } from "motion/react";
import { Mail, Shield, Award, Briefcase, GraduationCap } from "lucide-react";
import SEO from "../components/SEO.tsx";

export default function About() {
  return (
    <>
      <SEO 
        title="About News More" 
        description="Learn more about News More and the expertise behind our professional insights." 
      />
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <div>
            <h1 className="text-5xl md:text-8xl font-display font-medium leading-tight mb-8">
              Expertise <br /> Driven by <br /><span className="text-orange-500 italic">Experience.</span>
            </h1>
            <p className="text-xl text-white/50 leading-relaxed mb-8 max-w-lg">
              News More was founded on the principle that technical engineering and creative freelancing aren't mutual exclusive—they are the two pillars of the modern economy.
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
            <p className="text-white/40 leading-relaxed">
              Our founding team brings over a decade of hands-on experience in cloud infrastructure, global operations, and freelance consulting.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 border border-white/10">
              <GraduationCap size={28} />
            </div>
            <h3 className="text-2xl font-medium">Certified Expertise</h3>
            <p className="text-white/40 leading-relaxed">
              Holding certifications from AWS, Microsoft, and leading project management institutions to ensure every guide is technically sound.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 border border-white/10">
              <Award size={28} />
            </div>
            <h3 className="text-2xl font-medium">Author Credibility</h3>
            <p className="text-white/40 leading-relaxed">
              Every word is crafted by industry practitioners. No ghostwriting, no AI fluff—only real-world strategies that work.
            </p>
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
