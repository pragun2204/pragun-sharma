import React from 'react';
import { X, Download, FileText, Printer, CheckCircle, Mail, MapPin, ExternalLink, GraduationCap, Briefcase, Award } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose, profile }) {
  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    // Generate text/document blob download
    const resumeText = `
PRAGUN SHARMA
Noida, Uttar Pradesh | pragunsharma2204@gmail.com
LinkedIn: https://www.linkedin.com/in/pragun-sharma-0444a722b/ | GitHub: https://github.com/pragun2204

EDUCATION
- B.Tech in Computer Science and Engineering (2024 - 2028)
  ABES Engineering College | CGPA: 7.6 / 10
- BS in Data Science and Applications (2024 - 2028)
  IIT Madras | Completed 8 foundational courses in Data Science, Math, & Programming

TECHNICAL SKILLS
- Developer Tools: Git, GitHub, Linux, VS Code, Jupyter Notebook, Google Colab, Kaggle
- Core Skills: Machine Learning, Deep Learning, Computer Vision, NLP, Generative AI, Transfer Learning, Time Series Forecasting, REST APIs, Prompt Engineering
- Languages & Frameworks: Python, C++, C, Java, SQL, PyTorch, FastAPI, Flask, OpenCV, Scikit-learn, Pandas, NumPy, MySQL, PostgreSQL, SQLite, HTML, CSS, JavaScript

INTERNSHIPS & EXPERIENCE
- CrowdGen | AI Data Evaluator & Quality Analyst (Jan 2026 - Present)
  * Evaluated web content relevancy, search result quality, and multimodal datasets to optimize AI training models.
  * Generated detailed image captions and text annotations to enhance dataset quality for computer vision models.
- IBM SkillsBuild Virtual | Generative AI Virtual Intern (Sept 2025 - Nov 2025)
  * Developed a text-to-image prompt generator using Hugging Face Transformers, reducing inference latency by 25%.
  * Fine-tuned prompt generation models on 1,000+ text samples to construct scalable Generative AI pipelines.

KEY PROJECTS
1. Breast Cancer Detection using Deep Learning (July 2026)
   - Developed a PyTorch CNN from scratch on 780+ ultrasound images, achieving 85% accuracy.
2. NASA Turbofan Remaining Useful Life Prediction (July 2026)
   - Programmed LSTM models on 20,000+ sensor logs, reducing predictive maintenance RMSE by 18%.
3. Prompt to Image Generator (Oct 2025)
   - Engineered a text-to-image prompt generator using Hugging Face Transformers, cutting prompt processing time by 25%.
4. AI Interview Bot (Sep 2025)
   - Formulated 5+ REST APIs in FastAPI and OpenAI API, serving feedback responses in under 1.5s.
5. AI Enabled Quiz Application (Sep 2025)
   - Integrated Gemini API with FastAPI to auto-generate 10+ dynamic quiz questions and performance reports.

ACHIEVEMENTS & CERTIFICATES
- Secured merit-based selection for DTU Summer School on AI: Deep Dive into Deep Learning (July 2026)
- Shortlisted for AI/ML Internship at IIT Ropar Vichaarnaashala Lab (out of 200+ candidates)
- Certificates: DTU AI Summer School (2026), IBM Make Agentic AI Work for You (2026), IBM GenAI Virtual Internship (2025), Python for Data Science (Cognitive Class, 2025).
    `;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Pragun_Sharma_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-sky-500/30 overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Pragun Sharma — Official Resume</h3>
              <div className="text-xs font-mono text-slate-400">AI/ML & Data Science Engineer</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4" /> Download Resume
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - High Quality Resume Preview */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-200 bg-[#081827] text-xs leading-relaxed font-sans">
          
          {/* Header Contact Block */}
          <div className="text-center space-y-2 border-b border-slate-800 pb-6">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Pragun Sharma</h1>
            <p className="text-xs text-sky-300 font-mono">Noida, Uttar Pradesh, India</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-400">
              <span>✉️ pragunsharma2204@gmail.com</span>
              <a href="https://www.linkedin.com/in/pragun-sharma-0444a722b/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                LinkedIn: pragun-sharma-0444a722b
              </a>
              <a href="https://github.com/pragun2204" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                GitHub: pragun2204
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-1 text-sky-400">
              EDUCATION
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-white">
                <span>B.Tech in Computer Science and Engineering — ABES Engineering College</span>
                <span className="font-mono text-sky-300">2024 – 2028 | CGPA: 7.6</span>
              </div>
              <div className="flex justify-between font-bold text-white">
                <span>BS in Data Science and Applications — IIT Madras</span>
                <span className="font-mono text-sky-300">2024 – 2028</span>
              </div>
              <p className="text-slate-400 text-[11px]">Completed 8 foundational courses in Data Science, Programming, and Mathematics.</p>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-1 text-sky-400">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-1.5 text-[11px]">
              <div><strong className="text-white font-mono">Developer Tools:</strong> Git, GitHub, Linux, VS Code, Jupyter Notebook, Google Colab, Kaggle</div>
              <div><strong className="text-white font-mono">Skills:</strong> Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, Generative AI, Transfer Learning, Time Series Forecasting, REST APIs, Data Preprocessing, Feature Engineering, Model Evaluation, Prompt Engineering</div>
              <div><strong className="text-white font-mono">Languages & Frameworks:</strong> Python, C++, C, Java, SQL, PyTorch, FastAPI, Flask, OpenCV, Scikit-learn, Pandas, NumPy, MySQL, PostgreSQL, SQLite, HTML, CSS, JavaScript</div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-1 text-sky-400">
              INTERNSHIPS & EXPERIENCE
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between font-bold text-white">
                  <span>CrowdGen — AI Data Evaluator & Quality Analyst</span>
                  <span className="font-mono text-sky-300">Jan 2026 – Present</span>
                </div>
                <ul className="list-disc list-inside text-slate-300 space-y-1 mt-1 pl-1">
                  <li>Evaluated web content relevancy, search result quality, and multi-modal datasets to optimize AI training models.</li>
                  <li>Generated detailed image captions and text annotations to enhance dataset quality for computer vision models.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-white">
                  <span>IBM SkillsBuild Virtual — Generative AI Virtual Intern</span>
                  <span className="font-mono text-sky-300">Sept 2025 – Nov 2025</span>
                </div>
                <ul className="list-disc list-inside text-slate-300 space-y-1 mt-1 pl-1">
                  <li>Developed a text-to-image prompt generator using Hugging Face Transformers, reducing inference latency by 25%.</li>
                  <li>Fine-tuned prompt generation models on 1,000+ text samples to construct scalable Generative AI pipelines.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-1 text-sky-400">
              PROJECTS
            </h2>
            <div className="space-y-2 text-[11px]">
              <div>
                <strong className="text-white font-bold">Breast Cancer Detection using Deep Learning</strong> (July 2026): Developed a PyTorch CNN from scratch on 780+ ultrasound images, achieving 85% diagnostic accuracy.
              </div>
              <div>
                <strong className="text-white font-bold">NASA Turbofan Remaining Useful Life Prediction</strong> (July 2026): Programmed LSTM models on 20,000+ sensor logs, reducing predictive maintenance RMSE by 18%.
              </div>
              <div>
                <strong className="text-white font-bold">Prompt to Image Generator</strong> (Oct 2025): Engineered a text-to-image prompt generator using Hugging Face Transformers, cutting prompt processing time by 25%.
              </div>
              <div>
                <strong className="text-white font-bold">AI Interview Bot</strong> (Sep 2025): Formulated 5+ REST APIs in FastAPI and OpenAI API, serving feedback responses in under 1.5s.
              </div>
              <div>
                <strong className="text-white font-bold">AI Enabled Quiz Application</strong> (Sep 2025): Integrated Gemini API with FastAPI to auto-generate 10+ dynamic quiz questions and performance reports.
              </div>
            </div>
          </div>

          {/* Achievements & Certificates */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-1 text-sky-400">
              ACHIEVEMENTS & CERTIFICATIONS
            </h2>
            <ul className="list-disc list-inside text-slate-300 space-y-1 text-[11px] pl-1">
              <li>Secured merit-based selection for DTU Summer School on AI: Deep Dive into Deep Learning (July 2026)</li>
              <li>Secured AI/ML internship shortlist at IIT Ropar Vichaarnaashala Lab out of 200+ candidates</li>
              <li>Certificates: DTU Summer School on AI (July 2026), IBM Make Agentic AI Work for You (July 2026), IBM GenAI Virtual Internship (Nov 2025), Python for Data Science - Cognitive Class (Oct 2025).</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
