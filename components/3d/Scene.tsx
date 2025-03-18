'use client';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

interface SceneProps {
  children: React.ReactNode;
}

const Scene = ({ children }: SceneProps) => {
  return (
    <div className="h-screen w-full absolute top-0 left-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <color attach="background" args={['#050816']} />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;