import { Link } from "react-router-dom";
import { Mail, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-sm">N</span>
            </div>
            <span className="font-display font-medium text-xl">
              News<span className="text-orange-500">More</span>
            </span>
          </Link>
          <p className="text-white/50 max-w-md leading-relaxed mb-8">
            Expert insights, strategies, and engineering guides for the modern digital era. Helping you scale your skills and career with data-driven content.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500/20 hover:text-orange-500 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500/20 hover:text-orange-500 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500/20 hover:text-orange-500 transition-colors">
              <Github size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-white mb-6">Navigation</h4>
          <ul className="space-y-4 text-white/50 text-sm">
            <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
            <li><Link to="/blog" className="hover:text-orange-500 transition-colors">Articles</Link></li>
            <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Me</Link></li>
            <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-white mb-6">Legal</h4>
          <ul className="space-y-4 text-white/50 text-sm">
            <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
            <li><Link to="/glossary" className="hover:text-orange-500 transition-colors">Intelligence Lexicon</Link></li>
            <li className="flex items-center gap-2 pt-2 text-white/80">
              <Mail size={14} className="text-orange-500" />
              <a href="mailto:info.axelionscale@gmail.com" className="text-[12px] truncate">info.axelionscale@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/30 uppercase tracking-widest">
        <p>© {currentYear} News More. All rights reserved.</p>
        <p>Built for Success & Performance</p>
      </div>
    </footer>
  );
}
