import { useEffect, useMemo, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { profile } from './data/profile';

const mailto = `mailto:${profile.email}`;
const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];

function Icon({ name }) {
  const paths = {
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="1" /><circle cx="8" cy="9" r="1.5" /><path d="m4 17 5-5 3 3 2-2 6 5" /></>,
  };
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Reveal({ children, className = '' }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function ProfilePhoto() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="profile-frame">
      {failed ? (
        <div className="photo-placeholder" role="img" aria-label="Profile photo placeholder">
          <Icon name="image" />
          <span>Add Profile Photo</span>
          <small>public/images/profile.jpg</small>
        </div>
      ) : (
        <img src={profile.photo} alt="Pragun Sharma" width="640" height="640" onError={() => setFailed(true)} />
      )}
      <span className="profile-caption mono">PROFILE / 01</span>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [formState, setFormState] = useState({ status: 'idle', message: '' });
  const [time, setTime] = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.1 });
    const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)), { rootMargin: '-25% 0px -65% 0px' });
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) sectionObserver.observe(element);
    });
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
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
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateTime = () => setTime(new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date()));
    updateTime();
    const interval = window.setInterval(updateTime, 60000);
    return () => window.clearInterval(interval);
  }, []);

  const navItems = useMemo(() => sections.map((id) => ({ id, label: id[0].toUpperCase() + id.slice(1) })), []);
  const submitForm = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.website.value) return;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setFormState({ status: 'error', message: 'Email form is not configured. Please use the email link.' });
      return;
    }
    setFormState({ status: 'sending', message: 'Sending...' });
    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      form.reset();
      setFormState({ status: 'success', message: 'Thanks — your message is on its way.' });
    } catch {
      setFormState({ status: 'error', message: 'Something went wrong. Please use the email link.' });
    }
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <span className="page-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
        <a className="wordmark" href="#home">Pragun Sharma</a>
        <nav ref={navRef} className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><Icon name="close" /></button>
          {navItems.map(({ id, label }) => <a key={id} className={`nav-link ${activeSection === id ? 'is-active' : ''}`} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-link resume-link" href="/Pragun_Sharma_Resume.pdf" download="Pragun_Sharma_Resume.pdf">Resume</a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Icon name="menu" /></button>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <Reveal><p className="mono eyebrow">{profile.roleLabel}</p></Reveal>
            <Reveal className="hero-title"><h1>{profile.name}</h1></Reveal>
            <Reveal className="hero-lede"><p>I build computer vision, time-series and machine learning solutions and turn them into real-world applications with FastAPI.</p></Reveal>
            <Reveal className="hero-links"><a href="#projects">View projects <Icon name="arrow" /></a><a href={mailto}>Email me <Icon name="arrow" /></a></Reveal>
            <Reveal className="hero-study"><span className="mono">STUDYING</span><span>B.Tech Computer Science and Engineering — ABES Engineering College</span><span>BS Data Science and Applications — IIT Madras</span></Reveal>
            <Reveal className="social-links"><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></Reveal>
          </div>
          <Reveal className="hero-visual"><ProfilePhoto /></Reveal>
        </section>

        <section className="section-wrap content-section about-section" id="about">
          <Reveal className="section-intro"><p className="mono section-kicker">01 / ABOUT</p><h2>Built between theory and practice.</h2></Reveal>
          <Reveal className="about-copy"><p>{profile.bio}</p><p className="about-note">I care about clear systems, honest metrics and software that can be explained in plain language.</p></Reveal>
        </section>

        <section className="section-wrap content-section" id="experience">
          <Reveal className="section-intro"><p className="mono section-kicker">02 / EXPERIENCE</p><h2>Where I&apos;ve worked.</h2></Reveal>
          <div className="timeline">{profile.experience.map((item) => <Reveal className="timeline-item" key={item.company}><span className="timeline-dot" /><div><p className="mono">{item.dates}</p><h3>{item.company}</h3><strong>{item.role}</strong><p>{item.details}</p></div></Reveal>)}</div>
          <div className="certificates"><p className="mono section-kicker">CERTIFICATIONS</p>{profile.certificates.map(([date, title]) => <Reveal className="thin-row" key={title}><span className="mono">{date}</span><strong>{title}</strong></Reveal>)}<p className="mono section-kicker achievement-heading">ACHIEVEMENTS</p>{profile.achievements.map((achievement) => <Reveal className="achievement-line" key={achievement}><p>{achievement}</p></Reveal>)}</div>
        </section>

        <section className="section-wrap content-section projects-section" id="projects">
          <Reveal className="section-intro"><p className="mono section-kicker">03 / PROJECTS</p><h2>Selected work.</h2><p>Systems, experiments and applications built around useful outcomes.</p></Reveal>
          <div className="project-grid">{profile.projects.map((project, index) => <Reveal className="project-card" key={project.title}><div className="project-art" aria-hidden="true"><span className="mono">{String(index + 1).padStart(2, '0')}</span><i /></div><div className="project-meta"><span className="mono">{project.year}</span><span className="mono">PROJECT / {String(index + 1).padStart(2, '0')}</span></div><h3>{project.title}</h3><strong>{project.result}</strong><p>{project.summary}</p><div className="project-tags">{project.tags.map((tag) => <span className="mono" key={tag}>{tag}</span>)}</div><div className="project-links">{project.repo ? <a href={project.repo} target="_blank" rel="noreferrer">GitHub <Icon name="arrow" /></a> : <span className="mono unavailable">Repository link not provided</span>}{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo <Icon name="arrow" /></a>}</div></Reveal>)}</div>
        </section>

        <section className="section-wrap content-section skills-section" id="skills">
          <Reveal className="section-intro"><p className="mono section-kicker">04 / SKILLS</p><h2>Technical Arsenal.</h2><p>Technologies, tools and concepts I use to build intelligent applications.</p></Reveal>
          <div className="skills-block">{Object.entries(profile.skills).map(([group, skills]) => <Reveal className="skill-group" key={group}><h3>{group}</h3><div>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></Reveal>)}</div>
        </section>

        <section className="section-wrap content-section education-section" id="education">
          <Reveal className="section-intro"><p className="mono section-kicker">05 / EDUCATION</p><h2>Learning in public.</h2></Reveal>
          <div className="education-list">{profile.education.map(([school, degree, details]) => <Reveal className="education-row" key={school}><span className="mono">{details}</span><h3>{degree}</h3><p>{school}</p></Reveal>)}</div>
        </section>

        <section className="section-wrap content-section contact-section" id="contact">
          <Reveal className="section-intro"><p className="mono section-kicker">06 / CONTACT</p><h2>Let&apos;s build something.</h2><p>Open to useful problems, thoughtful collaborators and new conversations.</p></Reveal>
          <div className="contact-grid"><div className="contact-links"><a href={mailto}>Email <Icon name="arrow" /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <Icon name="arrow" /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Icon name="arrow" /></a><a href="/Pragun_Sharma_Resume.pdf" download="Pragun_Sharma_Resume.pdf">Resume <Icon name="arrow" /></a></div><form className="contact-form" onSubmit={submitForm}><label>Name<input name="name" required autoComplete="name" /></label><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Message<textarea name="message" rows="5" required /></label><input className="honeypot" name="website" tabIndex="-1" autoComplete="off" /><button disabled={formState.status === 'sending'} type="submit">{formState.status === 'sending' ? 'Sending...' : 'Send message'} <Icon name="arrow" /></button><p className={`form-message ${formState.status}`}>{formState.message}</p></form></div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><span>© {new Date().getFullYear()} Pragun Sharma</span><span>Noida, local time · {time}</span><a href="#home">Back to top ↑</a></footer>
    </div>
  );
}

export default App;
