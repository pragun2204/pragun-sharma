import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Brain, Cpu, ArrowRight, Download, Terminal, Layers, Code, Bot, CheckCircle } from 'lucide-react';
import Interactive3DCharacter from './Interactive3DCharacter';

export default function HeroSection({ profile, onOpenResume, onOpenChat }) {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef(null);

  const roles = [
    "AI/ML & Data Science Student",
    "PyTorch & Deep Learning Learner",
    "BS Data Science Student @ IIT Madras",
    "Generative AI & Computer Vision Developer",
    "FastAPI & Python Developer"
  ];

  // Dynamic Typewriter Effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setTypedText(
          isDeleting
            ? currentRole.substring(0, typedText.length - 1)
            : currentRole.substring(0, typedText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

  // Interactive Neural Mesh Canvas (High-Performance 60 FPS)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let canvasRect = canvas.getBoundingClientRect();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      canvasRect = canvas.getBoundingClientRect();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const numNodes = Math.min(35, Math.floor(width / 30));
    const nodes = Array.from({ length: numNodes }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1.5,
    }));

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX - canvasRect.left;
      mouse.y = e.clientY - canvasRect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & Draw Nodes without expensive canvas shadowBlur
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse attraction
        const dxMouse = mouse.x - node.x;
        const dyMouse = mouse.y - node.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);
        if (distMouse < 140) {
          node.x += (dxMouse / distMouse) * 0.4;
          node.y += (dyMouse / distMouse) * 0.4;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(125, 211, 252, 0.85)' : 'rgba(45, 212, 191, 0.85)';
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - node.x;
          const dy = n2.y - node.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(n2.x, n2.y);
            const alpha = (1 - dist / 120) * 0.22;
            ctx.strokeStyle = i % 3 === 0
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(20, 184, 166, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const metrics = [
    { label: "PyTorch CNN Accuracy", value: "85%", icon: Brain, detail: "Breast Cancer Diagnostic Model" },
    { label: "Latency Optimized", value: "25%", icon: Cpu, detail: "Hugging Face Prompt Inference" },
    { label: "RMSE Reduced", value: "18%", icon: Layers, detail: "NASA Turbofan LSTM Model" },
    { label: "FastAPI Latency", value: "<1.5s", icon: Terminal, detail: "AI Interview Bot Endpoints" },
  ];

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background Neural Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-auto opacity-70"
      />

      {/* Glow Ambient Orbs */}
      <div className="glow-orb-sky top-1/4 -left-40 blur-3xl opacity-50" />
      <div className="glow-orb-cyan bottom-10 -right-40 blur-3xl opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Dual Education Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/30 shadow-sm shadow-sky-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                🎓 IIT Madras BS Data Science
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                🏛️ ABES B.Tech CSE
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
                Hi, I'm <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent drop-shadow-sm">Pragun Sharma</span>
              </h1>
              
              <div className="h-12 flex items-center justify-center lg:justify-start text-xl sm:text-2xl lg:text-3xl font-mono text-sky-300 font-bold">
                <span>{typedText}</span>
                <span className="w-0.5 h-7 bg-sky-400 ml-1 animate-pulse" />
              </div>
            </div>

            {/* Bio Paragraph */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Building practical AI models and exploring deep learning with <span className="text-sky-400 font-semibold">PyTorch</span>, <span className="text-cyan-400 font-semibold">Generative AI</span>, and <span className="text-emerald-400 font-semibold">FastAPI backends</span>. Currently pursuing dual degrees at IIT Madras & ABES CSE.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-600 hover:brightness-110 text-white font-semibold text-sm shadow-xl shadow-sky-600/30 transition-all duration-200 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-sky-200 group-hover:rotate-12 transition-transform" />
                Explore Projects & Demos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenChat}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-sky-300 hover:text-white font-semibold text-sm border border-sky-500/30 backdrop-blur-md transition-all duration-200 shadow-lg shadow-black/30"
              >
                <Bot className="w-4 h-4 text-sky-400" />
                Ask AI Assistant
              </button>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm border border-slate-700 backdrop-blur-md transition-all duration-200"
              >
                <Download className="w-4 h-4 text-slate-400" />
                Resume PDF
              </button>
            </div>

            {/* Social Links & Quick Contact info */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-mono">
              <a href="https://github.com/pragun2204" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" /> github.com/pragun2204
              </a>
              <a href="https://www.linkedin.com/in/pragun-sharma-0444a722b/" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> LinkedIn Profile
              </a>
            </div>

          </div>

          {/* Right Column: Interactive 3D Character Avatar */}
          <div className="lg:col-span-5 flex justify-center">
            <Interactive3DCharacter onOpenChat={onOpenChat} />
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div 
                key={idx}
                className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-sky-500/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                    {m.value}
                  </div>
                </div>
                <div className="text-xs font-semibold text-slate-200">{m.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{m.detail}</div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
