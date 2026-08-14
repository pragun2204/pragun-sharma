import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

const avatarImage = '/assets/pragun-square-avatar.png';

// These windows replay the matching eye regions from the avatar image. Moving them
// slightly lets the character's actual pupils follow the pointer without adding
// separate artificial eyes over the face.
const eyeWindows = [
  { id: 'left', left: '38.3%', imageLeft: '-319.167%' },
  { id: 'right', left: '48.7%', imageLeft: '-405.833%' },
];

export default function Interactive3DCharacter({ onOpenChat }) {
  const containerRef = useRef(null);
  const [clickCount, setClickCount] = useState(0);
  const [speechBubble, setSpeechBubble] = useState('Hey there! Move your mouse around!');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let center = { x: 0, y: 0 };
    let reqId = null;
    let targetX = 0;
    let targetY = 0;

    const updateCenter = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      center.x = rect.left + rect.width / 2;
      center.y = rect.top + rect.height / 3;
    };

    updateCenter();
    window.addEventListener('resize', updateCenter, { passive: true });
    window.addEventListener('scroll', updateCenter, { passive: true });

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!reqId) {
        reqId = requestAnimationFrame(() => {
          reqId = null;
          const deltaX = targetX - center.x;
          const deltaY = targetY - center.y;
          const distance = Math.hypot(deltaX, deltaY);
          const maxEyeShift = 3.5;

          const gazeX = distance ? (deltaX / distance) * Math.min(maxEyeShift, distance / 150) : 0;
          const gazeY = distance ? (deltaY / distance) * Math.min(maxEyeShift, distance / 150) : 0;
          const tiltX = (deltaY / window.innerHeight) * -12;
          const tiltY = (deltaX / window.innerWidth) * 12;

          container.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
          container.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
          container.style.setProperty('--gaze-x', `${gazeX.toFixed(2)}px`);
          container.style.setProperty('--gaze-y', `${gazeY.toFixed(2)}px`);
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', updateCenter);
      window.removeEventListener('scroll', updateCenter);
      if (reqId) cancelAnimationFrame(reqId);
    };
  }, []);

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--gaze-x', '0px');
      containerRef.current.style.setProperty('--gaze-y', '0px');
      containerRef.current.style.setProperty('--tilt-x', '0deg');
      containerRef.current.style.setProperty('--tilt-y', '0deg');
    }
  };

  const handleCharacterClick = () => {
    setClickCount((previous) => previous + 1);
    if (containerRef.current) {
      containerRef.current.style.setProperty('--gaze-x', '0px');
      containerRef.current.style.setProperty('--gaze-y', '3.5px');
      window.setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.setProperty('--gaze-x', '0px');
          containerRef.current.style.setProperty('--gaze-y', '0px');
        }
      }, 420);
    }

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
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer select-none max-w-md w-full mx-auto"
      style={{
        transform: 'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
        willChange: 'transform',
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
                className="absolute max-w-none"
                style={{
                  width: '833.333%',
                  height: '952.381%',
                  maxWidth: 'none',
                  left: eye.imageLeft,
                  top: '-190.476%',
                  transform: 'translate(var(--gaze-x, 0px), var(--gaze-y, 0px))',
                  willChange: 'transform',
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
