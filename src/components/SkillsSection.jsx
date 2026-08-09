import React, { useState } from 'react';
import { Code2, Brain, Database, Search, Sparkles, LayoutGrid, Radio } from 'lucide-react';

export default function SkillsSection({ profile }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('orbs'); // 'orbs' or 'grid'

  const skillCategories = [
    {
      title: "AI & Machine Learning",
      icon: Brain,
      color: "from-sky-500 via-cyan-500 to-cyan-400",
      glowColor: "rgba(99, 102, 241, 0.45)",
      borderColor: "border-sky-500/50",
      skills: [
        { name: "PyTorch", level: 92, tag: "Deep Learning", size: "w-36 h-36 sm:w-40 sm:h-40", anim: "float", delay: "0s", duration: "6.2s", offset: "-mt-4 mb-6" },
        { name: "Generative AI", level: 90, tag: "LLMs & Transformers", size: "w-32 h-32 sm:w-36 sm:h-36", anim: "float-reverse", delay: "1.2s", duration: "7.1s", offset: "mt-8 ml-4" },
        { name: "Prompt Engineering", level: 95, tag: "GenAI Optimization", size: "w-32 h-32 sm:w-36 sm:h-36", anim: "float-wide", delay: "0.5s", duration: "5.8s", offset: "-mt-6 mr-6" },
        { name: "Computer Vision", level: 88, tag: "CNNs & OpenCV", size: "w-28 h-28 sm:w-32 sm:h-32", anim: "float", delay: "1.9s", duration: "6.5s", offset: "mt-4 ml-2" },
        { name: "NLP & Transformers", level: 86, tag: "Hugging Face", size: "w-28 h-28 sm:w-32 sm:h-32", anim: "float-wide", delay: "2.1s", duration: "7.4s", offset: "mt-6" },
        { name: "Time Series & LSTM", level: 84, tag: "Forecasting", size: "w-24 h-24 sm:w-28 sm:h-28", anim: "float", delay: "0.3s", duration: "6.0s", offset: "-mt-8 ml-4" },
        { name: "Transfer Learning", level: 88, tag: "Model Fine-tuning", size: "w-28 h-28 sm:w-32 sm:h-32", anim: "float-reverse", delay: "1.5s", duration: "6.8s", offset: "mt-2 mr-4" },
        { name: "Data Preprocessing", level: 92, tag: "Feature Engineering", size: "w-32 h-32 sm:w-36 sm:h-36", anim: "float", delay: "0.9s", duration: "5.6s", offset: "-mt-4" }
      ]
    },
    {
      title: "Languages & Frameworks",
      icon: Code2,
      color: "from-cyan-500 via-teal-500 to-rose-400",
      glowColor: "rgba(168, 85, 247, 0.45)",
      borderColor: "border-cyan-500/50",
      skills: [
        { name: "Python", level: 96, tag: "Primary Language", size: "w-36 h-36 sm:w-44 sm:h-44", anim: "float-wide", delay: "0.1s", duration: "5.5s", offset: "mt-4 mr-6" },
        { name: "FastAPI", level: 90, tag: "Async REST APIs", size: "w-32 h-32 sm:w-36 sm:h-36", anim: "float", delay: "1.4s", duration: "6.3s", offset: "-mt-6 ml-2" },
        { name: "Scikit-learn", level: 90, tag: "ML Algorithms", size: "w-28 h-28 sm:w-32 sm:h-32", anim: "float-reverse", delay: "0.7s", duration: "7.0s", offset: "mt-6" },
        { name: "Pandas & NumPy", level: 94, tag: "Data Analysis", size: "w-32 h-32 sm:w-36 sm:h-36", anim: "float", delay: "1.8s", duration: "5.9s", offset: "-mt-2 ml-6" },
        { name: "OpenCV", level: 86, tag: "Image Processing", size: "w-24 h-24 sm:w-28 sm:h-28", anim: "float-wide", delay: "0.4s", duration: "6.6s", offset: "mt-10" },
        { name: "Flask", level: 82, tag: "Web Backends", size: "w-24 h-24 sm:w-28 sm:h-28", anim: "float-reverse", delay: "2.3s", duration: "5.2s", offset: "-mt-8" },
        { name: "C++", level: 78, tag: "DSA & Logic", size: "w-24 h-24 sm:w-28 sm:h-28", anim: "float", delay: "1.1s", duration: "6.7s", offset: "mt-4 mr-2" },
        { name: "C / Java", level: 75, tag: "Systems & OOP", size: "w-24 h-24 sm:w-28 sm:h-28", anim: "float-wide", delay: "0.6s", duration: "5.7s", offset: "-mt-4" },
        { name: "JS / HTML / CSS", level: 82, tag: "Frontend Apps", size: "w-24 h-24 sm:w-28 sm:h-28", anim: "float-reverse", delay: "1.6s", duration: "6.4s", offset: "mt-8" }
      ]
    },
    {
      title: "Databases & Tools",
      icon: Database,
      color: "from-emerald-500 via-teal-500 to-cyan-400",
      glowColor: "rgba(16, 185, 129, 0.45)",
      borderColor: "border-emerald-500/50",
      skills: [
        { name: "Git & GitHub", level: 92, tag: "Version Control", size: "w-32 h-32 sm:w-36 sm:h-36", anim: "float", delay: "0.2s", duration: "6.1s", offset: "-mt-6" },
        { name: "VS Code", level: 95, tag: "Primary IDE", size: "w-32 h-32 sm:w-36 sm:h-36", anim: "float-wide", delay: "1.3s", duration: "5.3s", offset: "mt-6 ml-4" },
        { name: "Jupyter / Colab", level: 94, tag: "Data Notebooks", size: "w-32 h-32 sm:w-36 sm:h-36", anim: "float-reverse", delay: "0.9s", duration: "6.9s", offset: "-mt-2 mr-6" },
        { name: "MySQL / SQLite", level: 88, tag: "SQL Querying", size: "w-28 h-28 sm:w-32 sm:h-32", anim: "float", delay: "2.0s", duration: "5.8s", offset: "mt-8" },
        { name: "PostgreSQL", level: 85, tag: "Relational DB", size: "w-28 h-28 sm:w-32 sm:h-32", anim: "float-wide", delay: "0.5s", duration: "6.5s", offset: "-mt-8" },
        { name: "Kaggle", level: 88, tag: "ML Benchmarks", size: "w-24 h-24 sm:w-28 sm:h-28", anim: "float-reverse", delay: "1.7s", duration: "5.1s", offset: "mt-4 ml-6" },
        { name: "Linux OS", level: 85, tag: "Shell Scripts", size: "w-28 h-28 sm:w-32 sm:h-32", anim: "float", delay: "1.0s", duration: "7.2s", offset: "-mt-4" }
      ]
    }
  ];

  // Flattened list for filtering
  const allSkills = skillCategories.flatMap(cat => 
    cat.skills.map(s => ({
      ...s,
      category: cat.title,
      color: cat.color,
      glowColor: cat.glowColor,
      borderColor: cat.borderColor
    }))
  );

  const filteredSkills = allSkills.filter(s => {
    const matchesTab = activeTab === 'All' || s.category === activeTab;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-950/90">
      
      {/* Background Glow Orbs */}
      <div className="glow-orb-cyan top-1/3 -left-40 blur-3xl opacity-30 pointer-events-none" />
      <div className="glow-orb-sky bottom-10 -right-40 blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-4 h-4" /> Floating Skill Constellation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Engineering & <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">Skill Constellation</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Hover over any weightless skill orb to inspect proficiency levels across deep learning, PyTorch, and core frameworks.
          </p>
        </div>

        {/* Controls: Category Tabs, Search Bar, & View Switcher */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
            {['All', 'AI & Machine Learning', 'Languages & Frameworks', 'Databases & Tools'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Box */}
            <div className="relative flex-1 md:w-60">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search skill (e.g. PyTorch)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs glass-input text-white placeholder-slate-500 font-mono"
              />
            </div>

            {/* View Switcher Toggle */}
            <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setViewMode('orbs')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'orbs'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Floating Circular Orbs View"
              >
                <Radio className="w-4 h-4" /> Orbs
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Cards Grid View"
              >
                <LayoutGrid className="w-4 h-4" /> Grid
              </button>
            </div>
          </div>

        </div>

        {/* VIEW 1: ORGANIC BORDERLESS FLOATING SKILL SPHERES (DEFAULT) */}
        {viewMode === 'orbs' && (
          <div className="relative min-h-[520px] w-full py-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 overflow-visible">
            
            {filteredSkills.map((skill, idx) => {
              // Select float keyframes style
              const animStyle = skill.anim === 'float-reverse' 
                ? 'animate-[float-reverse_6s_ease-in-out_infinite]' 
                : skill.anim === 'float-wide'
                ? 'animate-[float-wide_7s_ease-in-out_infinite]'
                : 'animate-[float_5s_ease-in-out_infinite]';

              return (
                <div
                  key={idx}
                  style={{
                    animationDuration: skill.duration,
                    animationDelay: skill.delay,
                  }}
                  className={`${animStyle} ${skill.offset} relative group flex flex-col items-center justify-center cursor-pointer transition-all duration-300`}
                >
                  
                  {/* Floating Skill Sphere (NO OUTER BOX BORDER) */}
                  <div
                    className={`relative ${skill.size} rounded-full border-2 ${skill.borderColor} p-1.5 flex flex-col items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:z-50`}
                    style={{
                      boxShadow: `0 0 25px ${skill.glowColor}`,
                      background: 'rgba(15, 23, 42, 0.75)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    
                    {/* SVG Circular Level Progress Arc */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="44%"
                        className="stroke-slate-800/80"
                        strokeWidth="3"
                        fill="transparent"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="44%"
                        className="stroke-current text-sky-400 transition-all duration-1000 ease-out"
                        strokeWidth="3.5"
                        fill="transparent"
                        strokeDasharray={280}
                        strokeDashoffset={280 - (280 * skill.level) / 100}
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Sphere Inner Core */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900/90 via-[#081827] to-slate-950 flex flex-col items-center justify-center p-2 text-center relative overflow-hidden backdrop-blur-md">
                      
                      {/* Subdued Radial Glow Backdrop */}
                      <div className={`absolute inset-0 bg-gradient-to-tr ${skill.color} opacity-15 group-hover:opacity-40 transition-opacity duration-300`} />

                      {/* Initials Badge */}
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-500/30 mb-0.5 group-hover:scale-110 transition-transform">
                        {skill.name.substring(0, 3).toUpperCase()}
                      </span>

                      {/* Skill Name */}
                      <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-sky-300 transition-colors leading-tight px-1 truncate max-w-full">
                        {skill.name}
                      </h4>

                      {/* Level Badge */}
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold text-cyan-400 mt-0.5">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Outer Glowing Neon Halo */}
                    <div
                      className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-300 -z-10"
                      style={{ background: skill.glowColor }}
                    />

                  </div>

                  {/* Floating Orb Tooltip Popup on Hover */}
                  <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none z-50 bg-slate-900/95 border border-sky-500/40 px-3 py-1 rounded-xl shadow-2xl whitespace-nowrap text-center backdrop-blur-md">
                    <span className="text-[10px] font-mono text-slate-300">
                      {skill.tag} • <strong className="text-sky-400">{skill.category}</strong>
                    </span>
                  </div>

                </div>
              );
            })}

          </div>
        )}


        {/* VIEW 2: METRIC CARDS GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-xs font-mono border border-sky-500/20 group-hover:scale-110 transition-transform">
                      {skill.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">
                        {skill.tag}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm font-mono">
            No skills found matching "{searchQuery}"
          </div>
        )}

      </div>
    </section>
  );
}
