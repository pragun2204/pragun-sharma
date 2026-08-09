import React from 'react';
import { Briefcase, Calendar, CheckCircle2, Building, Sparkles } from 'lucide-react';

export default function ExperienceSection({ profile }) {
  const experiences = profile?.experience || [
    {
      company: "CrowdGen",
      role: "AI Data Evaluator & Quality Analyst",
      period: "Jan 2026 – Present",
      bullets: [
        "Evaluated web content relevancy, search result quality, and multi-modal datasets to optimize AI training models.",
        "Generated detailed image captions and text annotations to enhance dataset quality for computer vision models."
      ]
    },
    {
      company: "IBM SkillsBuild Virtual",
      role: "Generative AI Virtual Intern",
      period: "Sept 2025 – Nov 2025",
      bullets: [
        "Developed a text-to-image prompt generator using Hugging Face Transformers, reducing inference latency by 25%.",
        "Fine-tuned prompt generation models on 1,000+ text samples to construct scalable Generative AI pipelines."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-950/70">
      
      {/* Background Glow */}
      <div className="glow-orb-sky top-1/3 -right-40 blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Briefcase className="w-4 h-4" /> Professional Work & Internships
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industry <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Hands-on experience evaluating multimodal AI datasets and exploring Generative AI pipelines at IBM SkillsBuild and CrowdGen.
          </p>
        </div>

        {/* Experience Cards Stack */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <div className="text-sm font-semibold font-mono text-emerald-400">{exp.company}</div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800 w-fit">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  {exp.period}
                </div>
              </div>

              {/* Bullet points */}
              <ul className="space-y-3 text-slate-300 text-xs sm:text-sm">
                {exp.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
