import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const MODEL_PATH = '/models/pragun.glb';

class ModelBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function Model({ onReady }) {
  const group = useRef(null);
  const { scene } = useLoader(GLTFLoader, MODEL_PATH);
  useEffect(() => onReady(), [onReady]);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += (state.pointer.x * 0.08 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (state.pointer.y * 0.03 - group.current.rotation.x) * 0.04;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.025;
  });
  return <primitive ref={group} object={scene} scale={1.8} position={[0, -1.45, 0]} />;
}

export default function Character3D({ reaction = 'idle' }) {
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const posterRef = useRef(null);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowPower = navigator.connection?.saveData || navigator.deviceMemory <= 2;
  const useFallback = failed || reducedMotion || lowPower;

  useEffect(() => {
    if (useFallback || typeof window.requestIdleCallback !== 'function') return undefined;
    const id = window.requestIdleCallback(() => posterRef.current?.classList.add('is-loading'));
    return () => window.cancelIdleCallback?.(id);
  }, [useFallback]);

  return (
    <div className={`character-wrap reaction-${reaction} ${ready ? 'has-model' : ''}`} aria-label="Animated 3D avatar of Pragun, decorative">
      <img className="character-poster" ref={posterRef} src="/assets/pragun_3d_avatar.webp" alt="" width="512" height="512" />
      {!useFallback && (
        <div className="character-canvas">
          <ModelBoundary fallback={null}>
            <Suspense fallback={null}>
              <Canvas dpr={[1, 1.5]} frameloop="demand" camera={{ position: [0, 0, 4.5], fov: 34 }} onError={() => setFailed(true)}>
                <ambientLight intensity={1.1} />
                <directionalLight position={[2, 3, 4]} intensity={1.5} color="#e8d9b5" />
                <pointLight position={[-2, 1, 2]} intensity={2} color="#ff6b2c" />
                <Model onReady={() => setReady(true)} />
              </Canvas>
            </Suspense>
          </ModelBoundary>
        </div>
      )}
      {!useFallback && !ready && <span className="character-note mono">[FILL: /models/pragun.glb]</span>}
    </div>
  );
}
