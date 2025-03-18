'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshProps } from '@react-three/fiber';

const Model = () => {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} scale={[1.5, 1.5, 1.5]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#2563eb" metalness={0.2} roughness={0.5} />
    </mesh>
  );
};

export default Model;