import React from 'react';
import { Github, Linkedin, Twitter, Mail, Instagram } from 'lucide-react';

export default function SocialSidebar() {
  const socials = [
    { icon: Github, href: "https://github.com/pragun2204", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/pragun-sharma-0444a722b/", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter / X" },
    { icon: Mail, href: "mailto:pragunsharma2204@gmail.com", label: "Email" }
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-6">
      
      {/* Top Vertical Neon Line */}
      <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-cyan-500/50 to-cyan-500" />

      {/* Social Buttons */}
      <div className="flex flex-col gap-4 bg-slate-950/80 p-2.5 rounded-full border border-cyan-500/20 backdrop-blur-md shadow-2xl">
        {socials.map((s, idx) => {
          const Icon = s.icon;
          return (
            <a
              key={idx}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              title={s.label}
              className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-cyan-600/30 hover:border-cyan-500/50 border border-transparent transition-all duration-300 hover:scale-110"
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </div>

      {/* Bottom Vertical Neon Line */}
      <div className="w-[1px] h-16 bg-gradient-to-t from-transparent via-cyan-500/50 to-cyan-500" />

    </div>
  );
}
