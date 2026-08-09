import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Linkedin, Github, RefreshCw, Sparkles, MessageSquare } from 'lucide-react';

const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactSection({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg(null);
    setErrorMsg(null);

    try {
      if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
        throw new Error('EmailJS is not configured');
      }

      await emailjs.send(emailServiceId, emailTemplateId, {
        from_name: formData.name,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
      }, {
        publicKey: emailPublicKey,
      });

      setResponseMsg(`Thank you ${formData.name}! Your message has been received.`);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const reason = err?.text || err?.message || 'Unknown EmailJS error';
      if (reason === 'EmailJS is not configured') {
        setErrorMsg('EmailJS is not configured for this deploy. Add all three VITE_EMAILJS variables in Netlify, then redeploy the site.');
      } else {
        setErrorMsg(`Email delivery failed: ${reason}. Check the EmailJS service, template, public key, and allowed domain.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950/90">
      
      {/* Glow Orbs */}
      <div className="glow-orb-sky top-1/4 -left-40 blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Mail className="w-4 h-4" /> Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">Something Intelligent</span> Together
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Interested in AI model development, computer vision, PyTorch pipelines, or full-time / internship opportunities? Drop a message below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-sky-400" /> Contact Information
              </h3>

              <div className="space-y-4 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Direct Email</div>
                    <a href="mailto:pragunsharma2204@gmail.com" className="text-white hover:text-sky-400 font-semibold transition-colors">
                      pragunsharma2204@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Location</div>
                    <div className="text-white font-semibold">Noida, Uttar Pradesh, India</div>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="text-xs font-mono text-slate-400">Social & Professional Profiles:</div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/pragun-sharma-0444a722b/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-sky-600/20 text-slate-300 hover:text-white border border-slate-800 hover:border-sky-500/30 text-xs font-semibold font-mono transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-sky-400" /> LinkedIn
                  </a>
                  <a
                    href="https://github.com/pragun2204"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-cyan-600/20 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/30 text-xs font-semibold font-mono transition-all"
                  >
                    <Github className="w-4 h-4 text-cyan-400" /> GitHub
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: EmailJS submission */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-5"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Send className="w-5 h-5 text-sky-400" /> Send a Direct Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs text-white"
                    placeholder="e.g. Alex Johnson"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Your Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs text-white"
                    placeholder="alex@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white"
                  placeholder="AI Internship / Model Collaboration"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Message Content *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white"
                  placeholder="Describe your project, role, or query..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-600 hover:brightness-110 text-white font-semibold text-xs shadow-xl shadow-sky-600/30 transition-all duration-200 active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Sending your message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message to Pragun
                  </>
                )}
              </button>

              {responseMsg && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{responseMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
