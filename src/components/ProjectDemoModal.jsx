import React, { useState } from 'react';
import { X, Play, RefreshCw, Sparkles, Cpu, Activity, CheckCircle, AlertCircle, Terminal, Flame, Zap, BarChart2 } from 'lucide-react';

export default function ProjectDemoModal({ project, onClose }) {
  if (!project) return null;

  // State for Prompt Generator Demo
  const [userPrompt, setUserPrompt] = useState('a futuristic cyberpunk city with neon reflections');
  const [promptStyle, setPromptStyle] = useState('Photorealistic');
  const [promptResult, setPromptResult] = useState(null);
  const [loadingPrompt, setLoadingPrompt] = useState(false);

  // State for Turbofan RUL Demo
  const [temp, setTemp] = useState(620);
  const [pressure, setPressure] = useState(18);
  const [vibration, setVibration] = useState(1.4);
  const [rulResult, setRulResult] = useState(null);
  const [loadingRul, setLoadingRul] = useState(false);

  // State for Interview Bot Demo
  const [interviewAnswer, setInterviewAnswer] = useState('FastAPI uses ASGI and Pydantic to deliver asynchronous request handling with fast validation and non-blocking I/O operations.');
  const [interviewResult, setInterviewResult] = useState(null);
  const [loadingInterview, setLoadingInterview] = useState(false);

  // State for Quiz Generator Demo
  const [quizData, setQuizData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  // State for Breast Cancer CNN Demo
  const [scanResult, setScanResult] = useState(null);
  const [loadingScan, setLoadingScan] = useState(false);


  // Handler for Prompt Generator API
  const handleEnhancePrompt = async () => {
    setLoadingPrompt(true);
    try {
      const res = await fetch('/api/ai/prompt-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_prompt: userPrompt, style: promptStyle })
      });
      const data = await res.json();
      setPromptResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPrompt(false);
    }
  };

  // Handler for Turbofan RUL API
  const handlePredictRul = async () => {
    setLoadingRul(true);
    try {
      const res = await fetch('/api/ai/predict-life', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ temperature: temp, pressure: pressure, vibration: vibration })
      });
      const data = await res.json();
      setRulResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRul(false);
    }
  };

  // Handler for Interview Bot API
  const handleSimulateInterview = async () => {
    setLoadingInterview(true);
    try {
      const res = await fetch('/api/ai/interview-sim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: interviewAnswer, question_topic: "FastAPI Concurrency" })
      });
      const data = await res.json();
      setInterviewResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInterview(false);
    }
  };

  // Handler for Quiz Generator API
  const handleGenerateQuiz = async () => {
    setLoadingQuiz(true);
    setSelectedOption(null);
    try {
      const res = await fetch('/api/ai/quiz-gen', { method: 'POST' });
      const data = await res.json();
      setQuizData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQuiz(false);
    }
  };

  // Handler for Cancer CNN API
  const handleRunCancerScan = async () => {
    setLoadingScan(true);
    try {
      const res = await fetch('/api/ai/cancer-predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_type: "Ultrasound Breast Tissue Scan" })
      });
      const data = await res.json();
      setScanResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingScan(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-sky-500/30 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded border border-sky-500/30">
                  Python Backend Live Demo
                </span>
                <span className="text-xs text-slate-400 font-mono">{project.date}</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">{project.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Interactive Playground */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-slate-300 leading-relaxed text-xs">
            <span className="font-semibold text-white">Summary: </span>{project.summary}
          </div>

          {/* DEMO 1: Prompt to Image Generator */}
          {project.id === 'prompt-image-gen' && (
            <div className="space-y-5">
              <h4 className="font-bold text-white flex items-center gap-2 text-base">
                <Zap className="w-5 h-5 text-sky-400" /> Hugging Face Prompt Optimization Playground
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Enter Raw Image Prompt:</label>
                  <input
                    type="text"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input text-xs font-mono"
                    placeholder="e.g. A futuristic robot reading a book"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Select Target Render Style:</label>
                  <div className="flex flex-wrap gap-2">
                    {['Photorealistic', 'Cinematic 8K', 'Cyberpunk', 'Anime Studio'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setPromptStyle(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                          promptStyle === st
                            ? 'bg-sky-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleEnhancePrompt}
                  disabled={loadingPrompt}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold shadow-lg shadow-sky-500/25 hover:brightness-110 disabled:opacity-50"
                >
                  {loadingPrompt ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Optimizing via Hugging Face...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" /> Execute Prompt Transformer Optimization
                    </>
                  )}
                </button>
              </div>

              {promptResult && (
                <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/30 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono text-sky-300">
                    <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-400" /> Optimization Complete</span>
                    <span>Latency: {promptResult.processing_time_ms}ms ({promptResult.latency_reduction})</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-sky-500/20 font-mono text-xs text-sky-200">
                    <div className="text-[10px] text-slate-400 mb-1">Generated High-Yield Hugging Face Prompt:</div>
                    "{promptResult.enhanced_prompt}"
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-400">
                    <div>Guidance: {promptResult.parameters.guidance_scale}</div>
                    <div>Inference Steps: {promptResult.parameters.inference_steps}</div>
                    <div>Model: {promptResult.parameters.model}</div>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* DEMO 2: NASA Turbofan RUL Prediction */}
          {project.id === 'nasa-turbofan-rul' && (
            <div className="space-y-5">
              <h4 className="font-bold text-white flex items-center gap-2 text-base">
                <Activity className="w-5 h-5 text-cyan-400" /> NASA Turbofan Sensor Telemetry Playground
              </h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>Exhaust Temperature (K):</span>
                    <span className="text-cyan-400 font-bold">{temp} K</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="750"
                    value={temp}
                    onChange={(e) => setTemp(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>Turbine Pressure (psi):</span>
                    <span className="text-cyan-400 font-bold">{pressure} psi</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="35"
                    value={pressure}
                    onChange={(e) => setPressure(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>Vibration Sensor Amplitude (g):</span>
                    <span className="text-cyan-400 font-bold">{vibration} g</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="5.0"
                    step="0.1"
                    value={vibration}
                    onChange={(e) => setVibration(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <button
                  onClick={handlePredictRul}
                  disabled={loadingRul}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:brightness-110 disabled:opacity-50"
                >
                  {loadingRul ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Running LSTM Telemetry Model...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" /> Run LSTM Remaining Useful Life Prediction
                    </>
                  )}
                </button>
              </div>

              {rulResult && (
                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
                    <span className="font-bold text-base text-white">
                      Predicted RUL: <span className="text-emerald-400">{rulResult.predicted_rul_cycles} Engine Cycles</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] bg-cyan-500/20 border border-cyan-500/30">
                      {rulResult.rmse_improvement}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/20 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Engine Health Status:</span>
                    <span className="font-bold text-cyan-300">{rulResult.health_status}</span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400">
                    Architecture: {rulResult.model_architecture}
                  </div>
                </div>
              )}
            </div>
          )}


          {/* DEMO 3: AI Interview Bot */}
          {project.id === 'ai-interview-bot' && (
            <div className="space-y-5">
              <h4 className="font-bold text-white flex items-center gap-2 text-base">
                <Terminal className="w-5 h-5 text-emerald-400" /> FastAPI Technical Interview Evaluator Simulator
              </h4>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300">
                  <span className="font-bold text-white">Interview Question: </span>
                  "Explain how FastAPI handles asynchronous concurrency and request validation in production."
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Technical Answer:</label>
                  <textarea
                    rows={3}
                    value={interviewAnswer}
                    onChange={(e) => setInterviewAnswer(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input text-xs font-mono"
                    placeholder="Type your response here..."
                  />
                </div>

                <button
                  onClick={handleSimulateInterview}
                  disabled={loadingInterview}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:brightness-110 disabled:opacity-50"
                >
                  {loadingInterview ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Evaluating Answer via FastAPI...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" /> Submit Answer for AI Evaluation (&lt;1.5s)
                    </>
                  )}
                </button>
              </div>

              {interviewResult && (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-base text-emerald-400">
                      Technical Score: {interviewResult.score}/100 ({interviewResult.status})
                    </span>
                    <span className="text-slate-400">Latency: {interviewResult.latency_s}s</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 text-xs text-slate-200">
                    <span className="font-semibold text-emerald-300 font-mono">Feedback: </span>
                    {interviewResult.feedback}
                  </div>
                </div>
              )}
            </div>
          )}


          {/* DEMO 4: AI Enabled Quiz App */}
          {project.id === 'ai-quiz-app' && (
            <div className="space-y-5">
              <h4 className="font-bold text-white flex items-center gap-2 text-base">
                <BarChart2 className="w-5 h-5 text-amber-400" /> Gemini API Dynamic Quiz Engine
              </h4>

              <button
                onClick={handleGenerateQuiz}
                disabled={loadingQuiz}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold shadow-lg shadow-amber-500/25 hover:brightness-110 disabled:opacity-50"
              >
                {loadingQuiz ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Generating Quiz via Gemini API...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Auto-Generate Dynamic Question
                  </>
                )}
              </button>

              {quizData && (
                <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-4 animate-fadeIn">
                  <div className="text-xs font-mono text-amber-400">{quizData.generated_by}</div>
                  
                  <div className="font-bold text-white text-sm">
                    {quizData.quiz.question}
                  </div>

                  <div className="space-y-2">
                    {quizData.quiz.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedOption(i)}
                        className={`w-full text-left p-3 rounded-xl text-xs font-mono border transition-all ${
                          selectedOption === i
                            ? i === quizData.quiz.correct
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                              : 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-amber-500/40'
                        }`}
                      >
                        {i + 1}. {opt}
                      </button>
                    ))}
                  </div>

                  {selectedOption !== null && (
                    <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-500/20 text-xs font-mono text-slate-300">
                      <span className="font-bold text-amber-400">Explanation: </span>
                      {quizData.quiz.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}


          {/* DEMO 5: Breast Cancer Diagnostic CNN */}
          {project.id === 'breast-cancer-cnn' && (
            <div className="space-y-5">
              <h4 className="font-bold text-white flex items-center gap-2 text-base">
                <Flame className="w-5 h-5 text-rose-400" /> PyTorch CNN Ultrasound Diagnostic Classifier
              </h4>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
                <div className="text-xs font-mono text-slate-400">Ultrasound Sample Dataset (780+ Scans)</div>
                <div className="w-full h-32 rounded-xl bg-gradient-to-r from-slate-950 via-sky-950 to-slate-950 border border-rose-500/20 flex items-center justify-center text-xs font-mono text-rose-300">
                  [PyTorch CNN Feature Map Tensor Extraction Matrix]
                </div>
                <button
                  onClick={handleRunCancerScan}
                  disabled={loadingScan}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-teal-600 text-white font-semibold shadow-lg shadow-rose-500/25 hover:brightness-110 disabled:opacity-50"
                >
                  {loadingScan ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Inferring PyTorch CNN Model...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" /> Run Deep Learning Diagnosis Inference
                    </>
                  )}
                </button>
              </div>

              {scanResult && (
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-3 animate-fadeIn font-mono text-xs">
                  <div className="flex items-center justify-between text-white">
                    <span className="font-bold text-sm">Diagnosis: {scanResult.diagnosis}</span>
                    <span className="text-rose-400 font-bold">{scanResult.confidence_score} Confidence</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-rose-500/20 text-slate-300">
                    Model Accuracy: {scanResult.model_accuracy} | Architecture: {scanResult.architecture}
                  </div>
                </div>
              )}
            </div>
          )}


          {/* Tech stack badge list */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2">Technologies Used:</span>
            {project.tech.map((t, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-sky-500/10 text-sky-300 border border-sky-500/20">
                {t}
              </span>
            ))}
          </div>

        </div>

        {/* Footer Close Button */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Close Interactive Playground
          </button>
        </div>

      </div>
    </div>
  );
}
