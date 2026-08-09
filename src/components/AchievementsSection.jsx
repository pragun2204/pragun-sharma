import React from 'react';
import { Award, ShieldCheck, CheckCircle, ExternalLink, Sparkles, BookOpen } from 'lucide-react';

export default function AchievementsSection({ profile }) {
  const achievements = profile?.achievements || [
    "Secured merit-based selection for DTU Summer School on AI: Deep Dive into Deep Learning (July 2026)",
    "Secured AI/ML internship shortlist at IIT Ropar Vichaarnaashala Lab out of 200+ candidates",
    "Completed 8 foundational courses in Data Science, Programming, and Mathematics for the IIT Madras B.S. degree"
  ];

  const certificates = profile?.certificates || [
    { title: "Summer School on AI: Deep Dive into Deep Learning", issuer: "Delhi Technological University (DTU)", date: "July 2026" },
    { title: "Make Agentic AI Work for You", issuer: "IBM", date: "July 2026" },
    { title: "IBM Generative AI Virtual Internship", issuer: "IBM", date: "Nov 2025" },
    { title: "Python for Data Science", issuer: "Cognitive Class", date: "Oct 2025" }
  ];

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-slate-950/80">
      
      {/* Glow Orbs */}
      <div className="glow-orb-cyan top-1/2 -left-40 blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="w-4 h-4" /> Honors & Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Achievements & Certifications</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Recognized by top institutions including DTU, IIT Ropar Lab, IBM, and Cognitive Class.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Key Honors */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Honors & Academic Milestones
            </h3>

            <div className="space-y-4">
              {achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex items-start gap-3.5"
                >
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-relaxed">
                      {ach}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Verified Certifications */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-400" />
              Verified Certifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificates.map((cert, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                      {cert.date}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug">
                    {cert.title}
                  </h4>

                  <div className="text-xs font-mono text-sky-300 pt-1">
                    {cert.issuer}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
