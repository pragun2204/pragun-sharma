import React from 'react';
import { GraduationCap, Award, Users, BookOpen, CheckCircle2, ShieldCheck, MapPin, Mail, Calendar } from 'lucide-react';

export default function AboutSection({ profile }) {
  const education = profile?.education || [
    {
      degree: "BS in Data Science and Applications",
      institution: "IIT Madras",
      period: "2024 – 2028",
      detail: "Completed 8 foundational courses in Data Science, Programming, and Mathematics. Active Student Member of Saranda House."
    },
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "ABES Engineering College",
      period: "2024 – 2028",
      detail: "Focused on Deep Learning, Algorithms, and Software Engineering."
    },
    {
      degree: "Class 12th (CBSE)",
      institution: "Govt Boys Sr. Sec. School",
      period: "2024",
      detail: "Score: 78.0%"
    },
    {
      degree: "Class 10th (CBSE)",
      institution: "Gautam Public School",
      period: "2022",
      detail: "Score: 82.0%"
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950/60">
      
      {/* Subtle Glow Backdrop */}
      <div className="glow-orb-sky top-1/2 -right-40 blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <GraduationCap className="w-4 h-4" /> Academic & Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Dual Degree Pursuer & <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">AI Researcher</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Combining data science foundations from IIT Madras with computer science engineering from ABES to build practical AI and Machine Learning projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Personal Highlights & Leadership */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Biography Glass Card */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-400" />
                About Pragun
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                I am an AI/ML developer based in Noida, UP, passionate about neural network architectures, computer vision, time-series forecasting, and scalable API backend design.
              </p>
              <div className="pt-2 border-t border-slate-800 space-y-2.5 text-xs text-slate-300 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sky-400"/> Location:</span>
                  <span>Noida, Uttar Pradesh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-sky-400"/> Email:</span>
                  <a href="mailto:pragunsharma2204@gmail.com" className="text-sky-300 hover:underline">pragunsharma2204@gmail.com</a>
                </div>
              </div>
            </div>

            {/* IIT Madras Saranda House Leadership Card */}
            <div className="glass-card rounded-2xl p-6 border border-sky-500/30 bg-gradient-to-br from-sky-950/30 to-cyan-950/20 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/40">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Saranda House Member</h4>
                  <p className="text-xs text-sky-300 font-mono">IIT Madras (Jan 2025 – Present)</p>
                </div>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Active Student Member at IIT Madras. Coordinated 50+ peers across inter-house technical sessions, code reviews, and governance workshops.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-sky-500/10 text-sky-300 border border-sky-500/20">
                  Leadership
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  50+ Peers Coordinated
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Education Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-cyan-400" />
                Educational Timeline
              </h3>

              <div className="relative border-l-2 border-slate-800 ml-3 space-y-8 pl-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative group">
                    
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-sky-400 group-hover:border-cyan-400 group-hover:bg-sky-500 transition-all duration-300" />

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                          {edu.degree}
                        </h4>
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                          <Calendar className="w-3 h-3" /> {edu.period}
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-cyan-300 font-mono">
                        {edu.institution}
                      </div>

                      <p className="text-slate-300 text-xs leading-relaxed pt-1">
                        {edu.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
