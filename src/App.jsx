import { useEffect, useMemo, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { profile } from './data/profile';

const mailParts = ['pragunsharma2204', 'gmail.com'];
const mailto = `mailto:${mailParts[0]}@${mailParts[1]}`;

function Icon({ name }) {
  const paths = {
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></>,
    moon: <path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />,
  };
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Reveal({ children, className = '' }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('work');
  const [formState, setFormState] = useState({ status: 'idle', message: '' });
  const [time, setTime] = useState('');
  const [reaction, setReaction] = useState('idle');
  const mainRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 });
    mainRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
        setReaction(entry.target.id === 'work' ? 'work' : entry.target.id === 'contact' ? 'contact' : 'idle');
      }
    }), { rootMargin: '-20% 0px -65% 0px' });
    sections.forEach((section) => document.getElementById(section) && sectionObserver.observe(document.getElementById(section)));
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); sectionObserver.disconnect(); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
      if (event.key !== 'Tab') return;
      const focusable = [...navRef.current.querySelectorAll('a, button')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.body.classList.add('menu-open');
    navRef.current?.querySelector('a')?.focus();
    window.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('menu-open'); window.removeEventListener('keydown', onKey); };
  }, [menuOpen]);

  useEffect(() => {
    const updateTime = () => setTime(new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date()));
    updateTime();
    const interval = window.setInterval(updateTime, 60000);
    return () => window.clearInterval(interval);
  }, []);

  const sections = useMemo(() => ['work', 'about', 'experience', 'contact'], []);
  const submitForm = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.website.value) return;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setFormState({ status: 'error', message: 'Email form is not configured yet. Please use the email link above.' });
      return;
    }
    setFormState({ status: 'sending', message: 'Sending...' });
    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      form.reset();
      setFormState({ status: 'success', message: 'Thanks — your message is on its way.' });
    } catch {
      setFormState({ status: 'error', message: 'Something went wrong. Please use the email link above.' });
    }
  };
  const openEmail = (event) => {
    event.preventDefault();
    window.location.assign(mailto);
  };

  return (
    <div className="site-shell" ref={mainRef}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <span className="page-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
        <a className="wordmark" href="#top">Pragun Sharma</a>
        <nav ref={navRef} className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><Icon name="close" /></button>
          {sections.map((section) => <a key={section} className={`nav-link ${activeSection === section ? 'is-active' : ''}`} href={`#${section}`} onClick={() => setMenuOpen(false)}>{section[0].toUpperCase() + section.slice(1)}</a>)}
          <a className="nav-link" href="/Pragun_Sharma_Resume.pdf" target="_blank" rel="noreferrer">Resume</a>
        </nav>
        <div className="header-actions"><button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Icon name="menu" /></button></div>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="top">
          <Reveal><p className="mono eyebrow">Noida, India — Open to internships</p></Reveal>
          <Reveal className="hero-title"><h1>{profile.name}</h1></Reveal>
          <Reveal className="hero-lede"><p>I build computer vision, time-series and GenAI systems, and ship them behind FastAPI.</p></Reveal>
          <Reveal className="hero-links"><a href="#work">Selected work <Icon name="arrow" /></a><a href={mailto} onClick={openEmail}>Email me <Icon name="arrow" /></a></Reveal>
          <Reveal className="currently"><span className="mono">CURRENTLY</span><span>{profile.currently.join(' · ')}</span></Reveal>
          <div className={`character-wrap reaction-${reaction}`} aria-hidden="true"><img className="character-poster" src="/assets/pragun-professional.webp" alt="" width="531" height="800" /></div>
        </section>

        <section className="section-wrap content-section" id="work">
          <Reveal className="section-intro"><p className="mono section-kicker">01 / WORK</p><h2>Selected work</h2><p>Results first. Open a row for the details.</p></Reveal>
          <div className="work-track">{profile.projects.map((project, index) => <Reveal className="work-panel" key={project.title}><details><summary><span className="work-index mono">{String(index + 1).padStart(2, '0')}</span><span className="work-title">{project.title}</span><span className="work-year mono">{project.year}</span><Icon name="arrow" /></summary><strong className="panel-metric">{project.result}</strong><div className="work-details"><p>{project.summary}</p><span className="mono repo-label">REPO</span><span className="fill-link">{project.repo}</span></div><div className="work-tags mono">{project.tags.join(' · ')}</div></details></Reveal>)}</div>
        </section>

        <section className="section-wrap content-section about-grid" id="about">
          <Reveal className="section-intro"><p className="mono section-kicker">02 / ABOUT</p><h2>A little context</h2></Reveal>
          <Reveal className="about-copy"><p>{profile.bio}</p><p className="about-note">I prefer clear systems, honest metrics and work that can be explained in plain language.</p></Reveal>
          <div className="skills-block"><p className="mono section-kicker">SKILLS</p>{Object.entries(profile.skills).map(([group, skills]) => <Reveal className="skill-group" key={group}><h3>{group}</h3><p>{skills}</p></Reveal>)}</div>
          <div className="education-block"><p className="mono section-kicker">EDUCATION</p>{profile.education.map(([school, degree, details]) => <Reveal className="thin-row" key={school}><strong>{school}</strong><span>{degree}</span><small className="mono">{details}</small></Reveal>)}</div>
        </section>

        <section className="section-wrap content-section" id="experience">
          <Reveal className="section-intro"><p className="mono section-kicker">03 / EXPERIENCE</p><h2>Where I&apos;ve worked</h2></Reveal>
          <div className="timeline">{profile.experience.map((item) => <Reveal className="timeline-item" key={item.company}><span className="timeline-dot" /><div><p className="mono">{item.dates}</p><h3>{item.company}</h3><strong>{item.role}</strong><p>{item.details}</p></div></Reveal>)}</div>
          <div className="certificates"><p className="mono section-kicker">CERTIFICATES &amp; ACHIEVEMENTS</p>{profile.certificates.map(([date, title]) => <Reveal className="thin-row" key={title}><span className="mono">{date}</span><strong>{title}</strong></Reveal>)}<Reveal className="achievement-line"><span className="mono">ACHIEVEMENT</span><p>Shortlisted for AI/ML internship at IIT Ropar Vichaarnaashala Lab (200+ candidates)</p></Reveal></div>
        </section>

        <section className="section-wrap content-section contact-section" id="contact">
          <Reveal className="section-intro"><p className="mono section-kicker">04 / CONTACT</p><h2>Let&apos;s talk</h2><p>Have a question, a useful problem or a project in mind?</p></Reveal>
          <div className="contact-grid"><div className="contact-links"><a href={mailto}>Email me <Icon name="arrow" /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <Icon name="arrow" /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Icon name="arrow" /></a></div><form className="contact-form" onSubmit={submitForm}><label>Name<input name="name" required autoComplete="name" /></label><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Message<textarea name="message" rows="5" required /></label><input className="honeypot" name="website" tabIndex="-1" autoComplete="off" /><button disabled={formState.status === 'sending'} type="submit">{formState.status === 'sending' ? 'Sending...' : 'Send message'} <Icon name="arrow" /></button><p className={`form-message ${formState.status}`}>{formState.message}</p></form></div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><span>© {new Date().getFullYear()} Pragun Sharma</span><span>Noida, local time · {time}</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}

export default App;
