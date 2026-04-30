import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils.ts";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Markets", path: "/market" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
            <span className="font-bold text-xl">N</span>
          </div>
          <span className="font-display font-medium text-2xl tracking-tight hidden sm:block">
            News<span className="text-orange-500">More</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-orange-500",
                  location.pathname === link.path ? "text-orange-500" : "text-white/60"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="mailto:info.axelionscale@gmail.com"
              className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-all"
            >
              Contact Us <ArrowUpRight size={16} />
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-[#0A0A0A] border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-white/80 hover:text-orange-500"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="mailto:info.axelionscale@gmail.com"
              className="bg-orange-500 text-white px-6 py-3 rounded-xl text-center font-medium"
            >
              Contact Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
