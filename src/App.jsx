import { useEffect, useMemo, useState } from 'react';

const projects = [
  {
    title: 'OptiPulse',
    meta: 'COMPUTER VISION / HEALTH TECH / 2026',
    summary: 'A contactless vital-signs monitor using MediaPipe, rPPG signal processing and PhysNet 3D-CNNs.',
    metric: '±0.8–1.4 BPM heart-rate error',
    tags: ['Python', 'MediaPipe', 'PhysNet', 'FastAPI'],
  },
  {
    title: 'Breast Cancer CNN',
    meta: 'DEEP LEARNING / COMPUTER VISION / 2026',
    summary: 'A PyTorch convolutional neural network trained from scratch on 780+ ultrasound images.',
    metric: '85% diagnostic accuracy',
    tags: ['PyTorch', 'CNN', 'OpenCV', 'Python'],
  },
  {
    title: 'Turbofan RUL',
    meta: 'TIME SERIES / PREDICTIVE AI / 2026',
    summary: 'LSTM models that learn from 20,000+ NASA sensor logs to predict remaining useful life.',
    metric: '18% predictive RMSE reduction',
    tags: ['PyTorch', 'LSTM', 'Pandas', 'Time Series'],
  },
  {
    title: 'Prompt to Image',
    meta: 'GENERATIVE AI / NLP / 2025',
    summary: 'A Hugging Face Transformer pipeline for generating richer image prompts with lower latency.',
    metric: '25% faster prompt processing',
    tags: ['Transformers', 'Hugging Face', 'Python'],
  },
  {
    title: 'AI Interview Bot',
    meta: 'LLM APIS / BACKEND / 2025',
    summary: 'FastAPI and OpenAI-powered interview feedback APIs designed for quick, useful responses.',
    metric: 'Under 1.5s response time',
    tags: ['FastAPI', 'OpenAI API', 'REST'],
  },
];

const skills = ['Python', 'PyTorch', 'TensorFlow', 'FastAPI', 'Computer Vision', 'Generative AI', 'SQL', 'PySpark', 'Pandas', 'Data Engineering'];

function Arrow({ direction = 'right' }) {
  return <span aria-hidden="true" className={`arrow arrow-${direction}`}>→</span>;
}

export default function App() {
  const [mode, setMode] = useState('hero');
  const [projectIndex, setProjectIndex] = useState(0);
  const [busy, setBusy] = useState(false);

  const project = projects[projectIndex];
  const nextProject = () => setProjectIndex((index) => (index + 1) % projects.length);
  const previousProject = () => {
    if (projectIndex === 0) setMode('hero');
    else setProjectIndex((index) => index - 1);
  };

  const moveToCase = () => {
    if (mode === 'case' || busy) return;
    setBusy(true);
    window.setTimeout(() => {
      setMode('case');
      setBusy(false);
    }, 420);
  };

  const moveToHero = () => {
    if (mode === 'hero' || busy) return;
    setBusy(true);
    window.setTimeout(() => {
      setMode('hero');
      setBusy(false);
    }, 360);
  };

  useEffect(() => {
    const onWheel = (event) => {
      event.preventDefault();
      if (event.deltaY > 18 || event.deltaX > 18) mode === 'hero' ? moveToCase() : nextProject();
      if (event.deltaY < -18 || event.deltaX < -18) mode === 'case' ? previousProject() : null;
    };
    const onKeyDown = (event) => {
      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        mode === 'hero' ? moveToCase() : nextProject();
      }
      if (['ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        mode === 'case' ? previousProject() : null;
      }
      if (event.key === 'Escape') moveToHero();
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const statusText = useMemo(() => mode === 'hero' ? 'SCROLL INTO THE WORK' : `${String(projectIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`, [mode, projectIndex]);

  return (
    <div className={`portfolio-stage ${mode === 'case' ? 'is-case' : ''} ${busy ? 'is-busy' : ''}`}>
      <header className="topbar">
        <button className="tag" onClick={moveToHero}>my studio</button>
        <button className="tag" onClick={moveToCase}>portfolio</button>
        <a className="tag tag-contact" href="mailto:pragunsharma2204@gmail.com">contacts</a>
        <a className="tag tag-discuss" href="mailto:pragunsharma2204@gmail.com?subject=Let's%20build%20something">discuss a project</a>
        <button className="brand" onClick={moveToHero}>PRAGUN SHARMA</button>
      </header>

      <main className="scene" aria-live="polite">
        <section className="hero-panel" aria-label="Pragun Sharma introduction">
          <div className="hero-wordmark">PRAGUN</div>
          <div className="hero-script">ai / data / systems</div>
          <div className="hero-copy">
            <p className="eyebrow">AI/ML ENGINEER · DATA SCIENCE</p>
            <h1>Building useful intelligence<br /><em>from raw signals.</em></h1>
            <p className="intro">Computer Science student at ABES Engineering College and BS Data Science student at IIT Madras. I turn research ideas into reliable models, APIs and data products.</p>
            <div className="hero-links">
              <button className="ink-button" onClick={moveToCase}>view selected work <Arrow /></button>
              <a className="text-link" href="/Pragun_Final_Resume.pdf" download>download resume <Arrow /></a>
            </div>
          </div>
          <div className="portrait-wrap">
            <div className="portrait-glow" />
            <img className="portrait" src="/assets/pragun-developer-avatar.png" alt="Illustrated portrait of Pragun Sharma" />
          </div>
          <div className="badge-card">
            <div className="badge-top">PROFILE / 2026</div>
            <strong>PRAGUN<br />SHARMA</strong>
            <span>AI ENGINEER // BUILDER</span>
            <div className="badge-line"><small>BASED IN</small><b>NOIDA, IN</b></div>
            <div className="badge-line"><small>FOCUS</small><b>ML + DATA</b></div>
            <div className="badge-line"><small>STATUS</small><b>OPEN TO BUILD</b></div>
          </div>
        </section>

        <section className="case-panel" aria-label="Selected portfolio project">
          <div className="case-laptop" onClick={nextProject} role="button" tabIndex="0" onKeyDown={(event) => event.key === 'Enter' && nextProject()}>
            <div className="laptop-screen">
              <div className="screen-top"><span>PRAGUN / LAB</span><span>LIVE MODEL</span></div>
              <div className="screen-grid" />
              <div className="screen-project">{project.title}</div>
              <div className="screen-metric">{project.metric}</div>
              <div className="screen-bars"><i /><i /><i /><i /><i /></div>
            </div>
            <div className="laptop-base"><span>click to switch project</span></div>
          </div>
          <div className="ticket">
            <span className="punch p1" /><span className="punch p2" /><span className="punch p3" /><span className="punch p4" />
            <h2>{project.title}</h2>
            <div className="ticket-meta">{project.meta.split(' / ').map((item) => <span key={item}>{item}</span>)}</div>
          </div>
          <div className="case-description">
            <strong>// selected build</strong>
            <p>{project.summary}</p>
            <b className="case-count">{statusText}</b>
          </div>
          <div className="case-actions">
            <button className="case-nav" onClick={previousProject}><span>←</span><small>previous case</small></button>
            <button className="case-nav case-next" onClick={nextProject}><span>→</span><small>next case</small></button>
          </div>
        </section>
      </main>

      <div className="skills-strip">
        {skills.map((skill) => <span key={skill}>{skill}</span>)}
      </div>
      <div className="scroll-hint"><i />{statusText}</div>
      <div className="availability">● AVAILABLE FOR COLLABORATION</div>
    </div>
  );
}
