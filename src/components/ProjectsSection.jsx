import React, { useState } from 'react';
import { Sparkles, Layers, Activity, Brain, Zap, Terminal } from 'lucide-react';

export default function ProjectsSection({ profile }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const projects = profile?.projects || [
    {
      id: "breast-cancer-cnn",
      title: "Breast Cancer Detection using Deep Learning",
      date: "July 2026",
      tech: ["PyTorch", "CNN", "OpenCV", "Python"],
      summary: "Developed a PyTorch CNN from scratch on 780+ ultrasound images, achieving 85% diagnostic accuracy.",
      impact: "85% Accuracy on 780+ ultrasound scans",
      category: "Deep Learning & Vision",
      github: "https://github.com/pragun2204"
    },
    {
      id: "nasa-turbofan-rul",
      title: "NASA Turbofan Remaining Useful Life Prediction",
      date: "July 2026",
      tech: ["PyTorch", "LSTM", "Time Series", "Pandas"],
      summary: "Programmed LSTM models on 20,000+ sensor logs, reducing predictive maintenance RMSE by 18%.",
      impact: "18% RMSE Reduction on 20,000+ sensor logs",
      category: "Time Series & Predictive AI",
      github: "https://github.com/pragun2204"
    },
    {
      id: "prompt-image-gen",
      title: "Prompt to Image Generator",
      date: "Oct 2025",
      tech: ["Hugging Face", "Generative AI", "Python", "Transformers"],
      summary: "Engineered a text-to-image prompt generator using Hugging Face Transformers, cutting prompt processing time by 25%.",
      impact: "25% Faster Prompt Processing",
      category: "Generative AI & NLP",
      github: "https://github.com/pragun2204"
    },
    {
      id: "ai-interview-bot",
      title: "AI Interview Bot",
      date: "Sep 2025",
      tech: ["FastAPI", "OpenAI API", "Python", "REST APIs"],
      summary: "Formulated 5+ REST APIs in FastAPI and OpenAI API, serving feedback responses in under 1.5s.",
      impact: "< 1.5s Latency across 5+ REST APIs",
      category: "Web APIs & LLMs",
      github: "https://github.com/pragun2204"
    },
    {
      id: "ai-quiz-app",
      title: "AI Enabled Quiz Application",
      date: "Sep 2025",
      tech: ["FastAPI", "Gemini API", "Python", "Web Apps"],
      summary: "Integrated Gemini API with FastAPI to auto-generate 10+ dynamic quiz questions and performance reports.",
      impact: "Automated 10+ Dynamic Quiz Scenarios",
      category: "Generative AI & NLP",
      github: "https://github.com/pragun2204"
    }
  ];

  const categories = ['All', 'Deep Learning & Vision', 'Generative AI & NLP', 'Time Series & Predictive AI', 'Web APIs & LLMs'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Deep Learning & Vision': return Brain;
      case 'Generative AI & NLP': return Sparkles;
      case 'Time Series & Predictive AI': return Activity;
      case 'Web APIs & LLMs': return Terminal;
      default: return Layers;
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-950/90">
      
      {/* Background Orbs */}
      <div className="glow-orb-sky top-1/4 -right-40 blur-3xl opacity-30" />
      <div className="glow-orb-cyan bottom-10 -left-40 blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-4 h-4" /> Portfolio Projects & Demos
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">AI & ML Systems</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Engineered with PyTorch, Hugging Face, FastAPI, and production-minded data workflows.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-lg shadow-sky-500/25'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const Icon = getCategoryIcon(project.category);
            return (
              <div
                key={project.id}
                className="group glass-card rounded-3xl p-6 border border-slate-800 hover:border-sky-500/50 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
              >
                
                {/* Top Header & Impact Badge */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/20">
                      <Icon className="w-3.5 h-3.5" />
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{project.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Impact Highlight Badge */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-sky-500/20 flex items-center gap-2 text-xs font-mono text-sky-300">
                    <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{project.impact}</span>
                  </div>
                </div>

                {/* Technology stack */}
                <div className="pt-6 space-y-4 border-t border-slate-800/80 mt-6">
                  
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/90 text-slate-300 border border-slate-700/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
