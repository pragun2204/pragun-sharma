import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import PragunAIChat from './components/PragunAIChat';
import SocialSidebar from './components/SocialSidebar';
import { Bot, Sparkles, MessageSquare } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [backendStatus, setBackendStatus] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Fetch backend profile once on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
          setBackendStatus(true);
        }
      } catch (err) {
        // Quiet fallback if backend API is offline
      }
    };

    fetchProfile();
  }, []);

  // Track active section smoothly using IntersectionObserver (zero scroll layout thrashing)
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'];
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-shell min-h-screen text-slate-100 relative">
      
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onOpenResume={() => setIsResumeOpen(true)}
        backendStatus={backendStatus}
      />

      {/* Floating Left Social Bar */}
      <SocialSidebar />

      {/* Main Content Sections */}
      <main>
        <HeroSection
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenChat={() => setIsChatOpen(true)}
        />

        <AboutSection profile={profile} />

        <SkillsSection profile={profile} />

        <ProjectsSection profile={profile} />

        <ExperienceSection profile={profile} />

        <AchievementsSection profile={profile} />

        <ContactSection profile={profile} />
      </main>

      {/* Footer */}
      <Footer backendStatus={backendStatus} />

      {/* Floating PragunAI Trigger Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-600 hover:brightness-110 text-white font-semibold text-xs shadow-2xl shadow-sky-500/40 border border-sky-400/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
        >
          <div className="relative">
            <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 border border-slate-900 absolute -top-0.5 -right-0.5 animate-ping" />
          </div>
          <span className="font-mono">Ask Here</span>
        </button>
      )}

      {/* PragunAI Assistant Drawer */}
      <PragunAIChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Resume Preview & Download Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
      />

    </div>
  );
}
