import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Sparkles, User, RefreshCw, MessageSquare } from 'lucide-react';

export default function PragunAIChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am Pragun's AI assistant, an assistant representing Pragun Sharma. Pragun is a Data Science & CSE student pursing dual degrees at IIT Madras and ABES. Ask me anything about Pragun's PyTorch projects, coursework, or internships!"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const suggestedQuestions = [
    "What PyTorch projects has Pragun built?",
    "Tell me about Pragun's IIT Madras BS degree",
    "What did Pragun accomplish at IBM SkillsBuild?",
    "How can I contact or hire Pragun?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (queryToSend) => {
    const q = queryToSend || inputQuery;
    if (!q.trim() || loading) return;

    // Add user query
    setMessages((prev) => [...prev, { sender: 'user', text: q }]);
    if (!queryToSend) setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "Pragun is an AI/ML developer skilled in PyTorch, FastAPI, Deep Learning, and Generative AI! Feel free to reach out to him directly at pragunsharma2204@gmail.com." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md glass-panel rounded-3xl border border-sky-500/40 shadow-2xl overflow-hidden flex flex-col h-[520px] animate-fadeIn">
      
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-600 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center text-sky-400">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 absolute -bottom-0.5 -right-0.5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              AI Assistant
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
                FastAPI Engine
              </span>
            </h4>
            <div className="text-[11px] text-slate-400">Ask about Pragun's ML & AI skills</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#06101E]/90 text-xs">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              msg.sender === 'user'
                ? 'bg-cyan-600 text-white'
                : 'bg-sky-600/20 text-sky-400 border border-sky-500/30'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-medium shadow-md'
                : 'glass-card border border-slate-800 text-slate-200'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> I'm formulating response...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800 flex flex-wrap gap-1.5">
        {suggestedQuestions.map((sq, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(sq)}
            className="text-[10px] font-mono px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-sky-600/30 text-sky-300 hover:text-white border border-slate-700 transition-colors truncate max-w-full"
          >
            💡 {sq}
          </button>
        ))}
      </div>

      {/* Input Footer */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask PragunAI anything..."
          className="flex-1 px-3 py-2 rounded-xl glass-input text-xs text-white placeholder-slate-500 font-mono"
        />
        <button
          type="submit"
          disabled={loading || !inputQuery.trim()}
          className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-40 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
