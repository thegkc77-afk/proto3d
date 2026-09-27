import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Grid, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ProductModel } from './ProductModel';
import type { ColorOption, CameraPreset, LightingPreset } from '../types/product';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface ProductViewerProps {
  color: ColorOption;
  activeView: CameraPreset;
  lightingPreset: LightingPreset;
  autoRotate: boolean;
  wireframe: boolean;
  showGrid: boolean;
  zoomCount: number;
}

// Check if WebGL context creation is supported by the browser
export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return !!(window.WebGLRenderingContext && gl);
  } catch (e) {
    return false;
  }
}

// Preset camera positions & targets
const CAMERA_PRESETS: Record<
  CameraPreset,
  { position: [number, number, number]; target: [number, number, number] }
> = {
  default: { position: [0, 1.2, 4.2], target: [0, 0.1, 0] },
  front: { position: [0, 0.25, 3.6], target: [0, 0.1, 0] },
  side: { position: [3.6, 0.25, 0], target: [0, 0.1, 0] },
  top: { position: [0, 4.2, 0.1], target: [0, 0, 0] },
  detail: { position: [-1.4, 0.5, 1.6], target: [-0.9, 0.2, 0] },
};

// Smooth Camera Controller with Lerp Animation
function CameraController({
  activeView,
  zoomCount,
  controlsRef,
}: {
  activeView: CameraPreset;
  zoomCount: number;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...CAMERA_PRESETS[activeView].position));
  const targetLook = useRef(new THREE.Vector3(...CAMERA_PRESETS[activeView].target));

  useEffect(() => {
    const preset = CAMERA_PRESETS[activeView];
    const zoomOffset = zoomCount * 0.4;

    const baseVector = new THREE.Vector3(...preset.position);
    const length = Math.max(1.8, Math.min(7.5, baseVector.length() + zoomOffset));
    baseVector.normalize().multiplyScalar(length);

    targetPos.current.copy(baseVector);
    targetLook.current.set(...preset.target);
  }, [activeView, zoomCount]);

  useFrame(() => {
    if (controlsRef.current) {
      camera.position.lerp(targetPos.current, 0.08);
      controlsRef.current.target.lerp(targetLook.current, 0.08);
      controlsRef.current.update();
    }
  });

  return null;
}

// 3D Scene Loading Fallback Indicator
function LoaderFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl glass-panel text-white shadow-2xl border border-white/10 min-w-[240px]">
        <div className="relative w-12 h-12 mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-purple-500/20 border-b-purple-500 animate-spin animate-reverse" />
        </div>
        <p className="text-sm font-semibold tracking-wide text-neutral-200">
          Loading 3D Experience...
        </p>
        <span className="text-xs text-neutral-400 mt-1 font-mono">Initializing PBR Shaders</span>
      </div>
    </Html>
  );
}

// WebGL Error Boundary Component
class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorInfo: string | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error?.message || '3D Render context failure' };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL / R3F Canvas caught error:', error);
  }

  render() {
    if (this.state.hasError) {
      const webGLSupported = isWebGLSupported();
      return (
        <div className="w-full h-[450px] sm:h-[520px] lg:h-[620px] flex flex-col items-center justify-center p-8 bg-neutral-900/90 rounded-3xl border border-neutral-800 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400 text-xl">
            ⚠️
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {webGLSupported ? '3D Render Recovering...' : '3D Acceleration Unavailable'}
          </h3>
          <p className="text-sm text-neutral-400 max-w-md mb-6">
            {webGLSupported
              ? 'A temporary graphics issue occurred. Click below to reload the 3D canvas.'
              : 'Your browser or device currently does not support WebGL standard acceleration. Try enabling hardware acceleration in browser settings.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, errorInfo: null })}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/30"
          >
            Reload 3D Canvas
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function ProductViewer({
  color,
  activeView,
  lightingPreset,
  autoRotate,
  wireframe,
  showGrid,
  zoomCount,
}: ProductViewerProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [webGLAvailable, setWebGLAvailable] = useState<boolean>(true);

  useEffect(() => {
    setWebGLAvailable(isWebGLSupported());
  }, []);

  // Map lighting presets to Drei environment presets & light colors
  const getLightingProps = () => {
    switch (lightingPreset) {
      case 'city':
        return { envPreset: 'city' as const, dirColor: '#fef08a', dirIntensity: 1.8, ambient: 0.4 };
      case 'sunset':
        return { envPreset: 'sunset' as const, dirColor: '#fdba74', dirIntensity: 2.2, ambient: 0.3 };
      case 'cyber':
        return { envPreset: 'night' as const, dirColor: '#818cf8', dirIntensity: 2.5, ambient: 0.5 };
      case 'studio':
      default:
        return { envPreset: 'studio' as const, dirColor: '#ffffff', dirIntensity: 2.0, ambient: 0.5 };
    }
  };

  const lightingProps = getLightingProps();

  if (!webGLAvailable) {
    return (
      <div className="w-full h-[450px] sm:h-[520px] lg:h-[620px] flex flex-col items-center justify-center p-8 bg-neutral-900/90 rounded-3xl border border-neutral-800 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400 text-xl">
          ⚠️
        </div>
        <h3 className="text-xl font-bold text-white mb-2">3D Acceleration Unavailable</h3>
        <p className="text-sm text-neutral-400 max-w-md mb-6">
          Your browser or device currently does not support WebGL standard acceleration. Try enabling hardware acceleration in browser settings.
        </p>
      </div>
    );
  }

  return (
    <WebGLErrorBoundary>
      <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[620px] rounded-3xl border border-slate-200/90 bg-gradient-to-b from-[#F8F9FA] via-white to-slate-100 overflow-hidden shadow-xl group">
        {/* Subtle Ambient Background Gradient Orbs */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-all duration-700 opacity-20"
          style={{ backgroundColor: color.hex }}
        />

        {/* 3D R3F Canvas */}
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: CAMERA_PRESETS.default.position, fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false,
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <React.Suspense fallback={<LoaderFallback />}>
            {/* Camera Position Lerp Controller */}
            <CameraController
              activeView={activeView}
              zoomCount={zoomCount}
              controlsRef={controlsRef}
            />

            {/* Orbit Controls */}
            <OrbitControls
              ref={controlsRef}
              enableDamping
              dampingFactor={0.05}
              rotateSpeed={0.8}
              zoomSpeed={0.9}
              panSpeed={0.6}
              minDistance={1.8}
              maxDistance={7.5}
              minPolarAngle={Math.PI / 8}
              maxPolarAngle={Math.PI / 2 + 0.05}
              autoRotate={autoRotate}
              autoRotateSpeed={2.2}
            />

            {/* Lighting Setup */}
            <ambientLight intensity={lightingProps.ambient} />

            {/* Primary Key Directional Light with Shadows */}
            <directionalLight
              position={[5, 8, 5]}
              intensity={lightingProps.dirIntensity}
              color={lightingProps.dirColor}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-near={0.5}
              shadow-camera-far={20}
              shadow-camera-left={-4}
              shadow-camera-right={4}
              shadow-camera-top={4}
              shadow-camera-bottom={-4}
              shadow-bias={-0.0001}
            />

            {/* Soft Secondary Fill Light */}
            <directionalLight position={[-6, 4, -4]} intensity={0.6} color="#a5b4fc" />

            {/* Rim Highlight Light */}
            <pointLight position={[0, 4, -5]} intensity={1.2} color={color.accentHex} />

            {/* Drei Environment Map with fallback */}
            <React.Suspense fallback={null}>
              <Environment preset={lightingProps.envPreset} environmentIntensity={0.8} />
            </React.Suspense>

            {/* 3D Product Model */}
            <ProductModel color={color} wireframe={wireframe} />

            {/* Contact Floor Shadows */}
            <ContactShadows
              position={[0, -0.74, 0]}
              opacity={0.7}
              scale={8}
              blur={1.8}
              far={4}
              color="#000000"
            />

            {/* Subtle Tech Floor Grid */}
            {showGrid && (
              <Grid
                position={[0, -0.745, 0]}
                args={[12, 12]}
                cellSize={0.4}
                cellThickness={0.6}
                cellColor="#cbd5e1"
                sectionSize={1.6}
                sectionThickness={1.2}
                sectionColor="#94a3b8"
                fadeDistance={8}
                fadeStrength={1.5}
              />
            )}
          </React.Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
