import React from 'react';
import { Heart, Terminal, Github, Linkedin, ArrowUp } from 'lucide-react';

export default function Footer({ backendStatus }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 relative z-10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Brand & Status */}
          <div className="space-y-2 text-center md:text-left">
            <div className="font-extrabold text-base text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
              Pragun Sharma
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                AI/ML Engineer
              </span>
            </div>
            <div className="text-slate-400 font-mono flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AI/ML & Data Science Engineer
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <a
              href="https://www.linkedin.com/in/pragun-sharma-0444a722b/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a
              href="https://github.com/pragun2204"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>

          {/* Scroll to top action */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-2"
          >
            <ArrowUp className="w-4 h-4 text-sky-400" /> Top
          </button>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-900/80 text-center text-slate-500 font-mono text-[11px]">
          © {new Date().getFullYear()} Pragun Sharma. Built with React 18, Vite, Tailwind CSS, & Python FastAPI Backend.
        </div>
      </div>
    </footer>
  );
}
