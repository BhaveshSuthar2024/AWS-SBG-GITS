import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CrystalObject from './CrystalObject';

function PureWhiteStudioLighting() {
  return (
    <>
      <ambientLight intensity={0.45} />

      {/* Primary Pure White Studio Key Light */}
      <directionalLight
        position={[3.5, 4.5, 3.5]}
        intensity={2.6}
        color="#FFFFFF"
      />

      {/* Pure White Studio Rim Light for crisp optical bevel glints */}
      <directionalLight
        position={[-3.5, 2.0, -1.5]}
        intensity={2.0}
        color="#FFFFFF"
      />

      {/* Pure White Front Specular Light */}
      <directionalLight
        position={[0.0, -2.5, 3.0]}
        intensity={1.2}
        color="#FFFFFF"
      />

      {/* Subtle crisp daylight fill */}
      <pointLight
        position={[1.5, 3.0, 2.5]}
        intensity={0.8}
        color="#F0F6FF"
      />
    </>
  );
}

export default function GlassScene({ mouse, scrollProgress }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 0, 5.0], fov: 38 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <PureWhiteStudioLighting />
        <Suspense fallback={null}>
          <CrystalObject mouse={mouse} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
