import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { ColorOption } from '../types/product';

interface ProductModelProps {
  color: ColorOption;
  wireframe?: boolean;
  modelPath?: string;
}

// 1. Safe GLTF Model Loader
function GLTFModelLoader({
  path,
  color,
  wireframe = false,
}: {
  path: string;
  color: ColorOption;
  wireframe?: boolean;
}) {
  const { scene } = useGLTF(path);
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          // Apply custom color to main body parts
          if (
            mesh.name.toLowerCase().includes('body') ||
            mesh.name.toLowerCase().includes('shell') ||
            mesh.name.toLowerCase().includes('main')
          ) {
            mat.color.set(color.hex);
            mat.roughness = color.roughness;
            mat.metalness = color.metalness;
          }
          mat.wireframe = wireframe;
          mesh.material = mat;
        }
      }
    });
  }, [clonedScene, color, wireframe]);

  return <primitive object={clonedScene} position={[0, 0, 0]} scale={1.2} />;
}

// 2. High-Fidelity Procedural 3D Headphones Model
export function ProceduralProductModel({
  color,
  wireframe = false,
}: {
  color: ColorOption;
  wireframe?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const leftIndicatorRef = useRef<THREE.Mesh>(null);
  const rightIndicatorRef = useRef<THREE.Mesh>(null);

  // Subtle floating levitation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.04;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.015;
    }
  });

  // Dynamic metallic material settings derived from active color option
  const shellMaterialProps = {
    color: color.hex,
    metalness: color.metalness,
    roughness: color.roughness,
    wireframe: wireframe,
    envMapIntensity: 1.5,
  };

  const accentMaterialProps = {
    color: color.accentHex || '#6366F1',
    emissive: color.accentHex || '#6366F1',
    emissiveIntensity: 0.6,
    metalness: 0.9,
    roughness: 0.1,
  };

  const darkLeatherMaterialProps = {
    color: '#111113',
    roughness: 0.7,
    metalness: 0.1,
    wireframe: wireframe,
  };

  const chromeMaterialProps = {
    color: '#E2E8F0',
    metalness: 0.95,
    roughness: 0.08,
    wireframe: wireframe,
  };

  return (
    <group ref={groupRef} position={[0, 0.2, 0]} dispose={null}>
      {/* --- HEADBAND ARCH --- */}
      {/* Outer Metal Band */}
      <mesh position={[0, 1.15, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[1.05, 0.07, 16, 64, Math.PI]} />
        <meshStandardMaterial {...shellMaterialProps} />
      </mesh>

      {/* Inner Ergonomic Cushion Arch */}
      <mesh position={[0, 1.12, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.98, 0.065, 16, 64, Math.PI * 0.85]} />
        <meshStandardMaterial {...darkLeatherMaterialProps} />
      </mesh>

      {/* Chrome Accents & Adjustment Hips */}
      <mesh position={[-1.02, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.085, 0.085, 0.22, 24]} />
        <meshStandardMaterial {...chromeMaterialProps} />
      </mesh>
      <mesh position={[1.02, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.085, 0.085, 0.22, 24]} />
        <meshStandardMaterial {...chromeMaterialProps} />
      </mesh>

      {/* --- SWIVEL FORKS (Left & Right) --- */}
      {/* Left Yoke Mount */}
      <group position={[-1.05, 0.65, 0]}>
        <mesh rotation={[0, 0, 0.15]} castShadow>
          <boxGeometry args={[0.08, 0.65, 0.12]} />
          <meshStandardMaterial {...shellMaterialProps} />
        </mesh>
      </group>

      {/* Right Yoke Mount */}
      <group position={[1.05, 0.65, 0]}>
        <mesh rotation={[0, 0, -0.15]} castShadow>
          <boxGeometry args={[0.08, 0.65, 0.12]} />
          <meshStandardMaterial {...shellMaterialProps} />
        </mesh>
      </group>

      {/* --- LEFT EAR CUP ASSEMBLY --- */}
      <group position={[-1.15, 0.1, 0]} rotation={[0, 0.12, -0.08]}>
        {/* Outer Cup Shell */}
        <mesh rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.55, 0.58, 0.32, 48]} />
          <meshStandardMaterial {...shellMaterialProps} />
        </mesh>

        {/* Outer Bezel Ring */}
        <mesh position={[-0.16, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <torusGeometry args={[0.56, 0.035, 16, 48]} />
          <meshStandardMaterial {...chromeMaterialProps} />
        </mesh>

        {/* LED Glowing Accent Ring */}
        <mesh position={[-0.14, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.42, 0.015, 16, 48]} />
          <meshStandardMaterial {...accentMaterialProps} />
        </mesh>

        {/* LED Status Light Dot */}
        <mesh ref={leftIndicatorRef} position={[-0.17, -0.35, 0.2]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial {...accentMaterialProps} />
        </mesh>

        {/* Inner Ear Cushion */}
        <mesh position={[0.16, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.48, 0.14, 24, 48]} />
          <meshStandardMaterial {...darkLeatherMaterialProps} />
        </mesh>

        {/* Audio Driver Mesh Grille */}
        <mesh position={[0.1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.02, 32]} />
          <meshStandardMaterial color="#262626" metalness={0.8} roughness={0.3} wireframe />
        </mesh>

        {/* Center Metallic Badge */}
        <mesh position={[-0.17, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.01, 32]} />
          <meshStandardMaterial {...chromeMaterialProps} />
        </mesh>
      </group>

      {/* --- RIGHT EAR CUP ASSEMBLY --- */}
      <group position={[1.15, 0.1, 0]} rotation={[0, -0.12, 0.08]}>
        {/* Outer Cup Shell */}
        <mesh rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.55, 0.58, 0.32, 48]} />
          <meshStandardMaterial {...shellMaterialProps} />
        </mesh>

        {/* Outer Bezel Ring */}
        <mesh position={[0.16, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <torusGeometry args={[0.56, 0.035, 16, 48]} />
          <meshStandardMaterial {...chromeMaterialProps} />
        </mesh>

        {/* LED Glowing Accent Ring */}
        <mesh position={[0.14, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.42, 0.015, 16, 48]} />
          <meshStandardMaterial {...accentMaterialProps} />
        </mesh>

        {/* LED Status Light Dot */}
        <mesh ref={rightIndicatorRef} position={[0.17, -0.35, 0.2]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial {...accentMaterialProps} />
        </mesh>

        {/* Inner Ear Cushion */}
        <mesh position={[-0.16, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.48, 0.14, 24, 48]} />
          <meshStandardMaterial {...darkLeatherMaterialProps} />
        </mesh>

        {/* Audio Driver Mesh Grille */}
        <mesh position={[-0.1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.02, 32]} />
          <meshStandardMaterial color="#262626" metalness={0.8} roughness={0.3} wireframe />
        </mesh>

        {/* Center Metallic Badge */}
        <mesh position={[0.17, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.01, 32]} />
          <meshStandardMaterial {...chromeMaterialProps} />
        </mesh>
      </group>

      {/* --- SLEEK CHARGING / DISPLAY DOCK BASE --- */}
      <group position={[0, -0.75, 0]}>
        {/* Dock Base Disc */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.85, 0.95, 0.08, 48]} />
          <meshStandardMaterial color="#18181B" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Dock Bezel Glow */}
        <mesh position={[0, 0.045, 0]}>
          <torusGeometry args={[0.88, 0.012, 16, 48]} />
          <meshStandardMaterial {...accentMaterialProps} />
        </mesh>

        {/* Magnetic Charging Stems */}
        <mesh position={[-0.4, 0.25, 0]} rotation={[0, 0, -0.1]}>
          <cylinderGeometry args={[0.03, 0.04, 0.45, 16]} />
          <meshStandardMaterial {...chromeMaterialProps} />
        </mesh>
        <mesh position={[0.4, 0.25, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.03, 0.04, 0.45, 16]} />
          <meshStandardMaterial {...chromeMaterialProps} />
        </mesh>
      </group>
    </group>
  );
}

// 3. Inner Model Error Boundary to catch any GLTF loading/parsing errors
class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('GLTF Model Error caught, rendering procedural 3D model fallback:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 4. Main ProductModel Component with robust detection & fallback
export function ProductModel({
  color,
  wireframe = false,
  modelPath = '/models/product.glb',
}: ProductModelProps) {
  const [hasValidGLTF, setHasValidGLTF] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  // Accurately check if a real GLTF model file exists on server
  useEffect(() => {
    let isMounted = true;
    fetch(modelPath, { method: 'GET', headers: { Range: 'bytes=0-10' } })
      .then((res) => {
        if (!isMounted) return;
        const contentType = res.headers.get('content-type') || '';
        // If server returns HTML (Vite SPA fallback), it's NOT a GLTF file
        if (res.ok && !contentType.includes('text/html') && contentType !== '') {
          setHasValidGLTF(true);
        } else {
          setHasValidGLTF(false);
        }
        setIsChecking(false);
      })
      .catch(() => {
        if (isMounted) {
          setHasValidGLTF(false);
          setIsChecking(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [modelPath]);

  if (isChecking) {
    return <ProceduralProductModel color={color} wireframe={wireframe} />;
  }

  if (hasValidGLTF) {
    return (
      <ModelErrorBoundary fallback={<ProceduralProductModel color={color} wireframe={wireframe} />}>
        <React.Suspense fallback={<ProceduralProductModel color={color} wireframe={wireframe} />}>
          <GLTFModelLoader path={modelPath} color={color} wireframe={wireframe} />
        </React.Suspense>
      </ModelErrorBoundary>
    );
  }

  return <ProceduralProductModel color={color} wireframe={wireframe} />;
}
