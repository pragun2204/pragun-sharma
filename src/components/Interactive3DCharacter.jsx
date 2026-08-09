import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

const avatarImage = '/assets/pragun-developer-avatar.png';

// These windows replay the matching eye regions from the avatar image. Moving them
// slightly lets the character's actual pupils follow the pointer without adding
// separate artificial eyes over the face.
const eyeWindows = [
  { id: 'left', left: '38%', imageLeft: '-316.667%' },
  { id: 'right', left: '56%', imageLeft: '-466.667%' },
];

export default function Interactive3DCharacter({ onOpenChat }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ tiltX: 0, tiltY: 0 });
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [speechBubble, setSpeechBubble] = useState('Hey there! Move your mouse around!');

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 3;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);
      const maxEyeShift = 3.5;

      setGaze({
        x: distance ? (deltaX / distance) * Math.min(maxEyeShift, distance / 150) : 0,
        y: distance ? (deltaY / distance) * Math.min(maxEyeShift, distance / 150) : 0,
      });

      setMousePos({
        tiltX: (deltaY / window.innerHeight) * -12,
        tiltY: (deltaX / window.innerWidth) * 12,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCharacterClick = () => {
    setClickCount((previous) => previous + 1);
    setGaze({ x: 0, y: 3.5 });
    window.setTimeout(() => setGaze({ x: 0, y: 0 }), 420);

    const greetings = [
      "Hi! I'm Pragun's 3D Avatar!",
      'I follow your cursor. Try moving it around!',
      'Building cool PyTorch and AI models!',
      'Ask PragunAI anything in the chat below!',
      'Glad you are visiting my portfolio!',
    ];
    setSpeechBubble(greetings[clickCount % greetings.length]);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleCharacterClick}
      onMouseLeave={() => setGaze({ x: 0, y: 0 })}
      className="relative group cursor-pointer select-none max-w-md w-full mx-auto"
      style={{
        transform: `perspective(1000px) rotateX(${mousePos.tiltX}deg) rotateY(${mousePos.tiltY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 border border-cyan-500/40 text-cyan-200 px-4 py-2 rounded-2xl shadow-2xl text-xs font-mono flex items-center gap-2 whitespace-nowrap animate-bounce">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
        <span>{speechBubble}</span>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-cyan-500/40 rotate-45" />
      </div>

      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/30 via-sky-600/30 to-teal-600/30 rounded-[40px] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 -z-10 animate-pulse-slow" />

      <div className="relative rounded-[36px] overflow-hidden border-2 border-cyan-500/40 glass-panel shadow-2xl bg-gradient-to-b from-slate-900/90 via-[#081827] to-slate-950">
        <img
          src={avatarImage}
          alt="Pragun 3D interactive character avatar"
          className="w-full aspect-square object-cover object-center"
        />

        <div className="absolute inset-0 pointer-events-none z-20">
          {eyeWindows.map((eye) => (
            <div
              key={eye.id}
              className="absolute overflow-hidden"
              style={{
                left: eye.left,
                top: '20%',
                width: '12%',
                height: '10.5%',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 48%, transparent 74%)',
                maskImage: 'radial-gradient(ellipse at center, black 48%, transparent 74%)',
              }}
            >
              <img
                src={avatarImage}
                alt=""
                aria-hidden="true"
                draggable="false"
                className="absolute max-w-none transition-transform duration-100 ease-out"
                style={{
                  width: '833.333%',
                  height: '1428.571%',
                  maxWidth: 'none',
                  left: eye.imageLeft,
                  top: '-428.571%',
                  transform: `translate(${gaze.x}px, ${gaze.y}px)`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 right-4 z-20">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onOpenChat();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-semibold shadow-lg shadow-cyan-950/40 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Talk to Me
          </button>
        </div>
      </div>
    </div>
  );
}
