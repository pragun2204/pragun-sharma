import { useEffect, useRef, useState } from 'react';

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
];

const projects = [
  {
    number: '01',
    category: 'HEALTH TECH / COMPUTER VISION',
    title: 'OptiPulse',
    description: 'Contactless vital-sign monitoring built with MediaPipe, rPPG signal processing and PhysNet 3D-CNNs.',
    metric: '±0.8–1.4 BPM',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    ],
  },
  {
    number: '02',
    category: 'DEEP LEARNING / MEDICAL AI',
    title: 'Breast Cancer CNN',
    description: 'A PyTorch CNN trained from scratch on 780+ ultrasound images for accessible diagnostic support.',
    metric: '85% ACCURACY',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    ],
  },
  {
    number: '03',
    category: 'TIME SERIES / PREDICTIVE AI',
    title: 'Turbofan RUL',
    description: 'LSTM models that learn from 20,000+ NASA sensor logs to predict remaining useful life.',
    metric: '18% RMSE REDUCTION',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    ],
  },
];

const services = [
  ['01', 'Machine Learning', 'Training focused models that turn noisy data into useful predictions.'],
  ['02', 'Computer Vision', 'Building vision pipelines for medical images, video feeds and real-world signals.'],
  ['03', 'Generative AI', 'Designing practical LLM and Transformer workflows with measurable improvements.'],
  ['04', 'Data Engineering', 'Connecting preprocessing, feature engineering and reliable data pipelines.'],
  ['05', 'Backend APIs', 'Shipping FastAPI services that make intelligent systems usable in production.'],
];

function ContactButton() {
  return <a className="contact-button" href="mailto:pragunsharma2204@gmail.com">CONTACT ME <span>↗</span></a>;
}

function FadeIn({ children, className = '' }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function App() {
  const [activeProject, setActiveProject] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.12 });
    root.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const movePortrait = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMouse({ x: (event.clientX - rect.left - rect.width / 2) / 18, y: (event.clientY - rect.top - rect.height / 2) / 18 });
  };

  return (
    <div className="creator-site" ref={rootRef}>
      <section className="hero-section" id="top">
        <nav className="site-nav">
          <a href="#about">ABOUT</a><a href="#services">SERVICES</a><a href="#projects">PROJECTS</a><a href="#contact">CONTACT</a>
        </nav>
        <FadeIn className="hero-heading-wrap"><h1 className="hero-heading">HI, I&apos;M PRAGUN</h1></FadeIn>
        <FadeIn className="hero-description"><p>AI/ML ENGINEER<br />DRIVEN BY BUILDING<br />USEFUL INTELLIGENCE.</p></FadeIn>
        <FadeIn className="hero-contact"><ContactButton /></FadeIn>
        <div className="portrait-stage" onMouseMove={movePortrait} onMouseLeave={() => setMouse({ x: 0, y: 0 })}>
          <img className="creator-portrait" style={{ transform: `translate3d(${mouse.x}px, ${mouse.y}px, 0)` }} src="/assets/pragun_3d_avatar.jpg" alt="3D character portrait of Pragun Sharma" />
        </div>
        <div className="hero-scroll">SCROLL TO EXPLORE ↓</div>
      </section>

      <section className="marquee-section" aria-label="Creative work previews">
        <div className="marquee-row marquee-forward">{[...marqueeImages, ...marqueeImages].map((image, index) => <img key={`${image}-${index}`} src={image} alt="" loading="lazy" />)}</div>
        <div className="marquee-row marquee-backward">{[...marqueeImages.slice().reverse(), ...marqueeImages.slice().reverse()].map((image, index) => <img key={`${image}-${index}`} src={image} alt="" loading="lazy" />)}</div>
      </section>

      <section className="about-section" id="about">
        <div className="orb orb-left">✦</div><div className="orb orb-right">◒</div>
        <FadeIn><h2 className="section-heading">ABOUT ME</h2></FadeIn>
        <FadeIn className="about-copy"><p>I&apos;m a Computer Science student at ABES Engineering College and a BS Data Science student at IIT Madras. I enjoy working where research, engineering and real-world impact meet — from computer vision and generative AI to data pipelines and fast APIs.</p></FadeIn>
        <FadeIn className="about-contact"><ContactButton /></FadeIn>
      </section>

      <section className="services-section" id="services">
        <FadeIn><h2 className="section-heading dark-heading">SERVICES</h2></FadeIn>
        <div className="services-list">{services.map(([number, title, description]) => <FadeIn className="service-item" key={number}><b>{number}</b><div><h3>{title}</h3><p>{description}</p></div></FadeIn>)}</div>
      </section>

      <section className="projects-section" id="projects">
        <FadeIn><h2 className="section-heading">PROJECTS</h2></FadeIn>
        <div className="project-stack">
          {projects.map((project, index) => (
            <article className={`project-card ${activeProject === index ? 'project-active' : ''}`} key={project.title} style={{ '--stack-index': index }}>
              <div className="project-top"><span className="project-number">{project.number}</span><div><small>{project.category}</small><h3>{project.title}</h3></div><button onClick={() => setActiveProject(index)}>VIEW CASE <span>↗</span></button></div>
              <div className="project-body"><div className="project-copy"><p>{project.description}</p><strong>{project.metric}</strong></div><div className="project-images"><div><img src={project.images[0]} alt="" loading="lazy" /><img src={project.images[1]} alt="" loading="lazy" /></div><img src={project.images[2]} alt="" loading="lazy" /></div></div>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer" id="contact"><div><span>LET&apos;S BUILD SOMETHING</span><h2>MAKE IT<br /><em>INTELLIGENT.</em></h2></div><ContactButton /><p>© 2026 PRAGUN SHARMA · NOIDA, INDIA</p></footer>
    </div>
  );
}

export default App;
