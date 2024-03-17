"use client";

import { state } from "@/store/store";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { memo, useRef } from "react";
import { useSnapshot } from "valtio";

const Backdrop = () => {
  const shadows = useRef<any>(null);
  const snap = useSnapshot(state);

  useFrame((_s, delta) => {
    if (shadows.current) {
      easing.dampC(
        shadows.current?.getMesh?.()?.material?.color || "#000",
        snap.shirt.color,
        0.25,
        delta
      );
    }
  });

  return (
    <AccumulativeShadows
      ref={shadows}
      position={[0, 0, -0.20]}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={2.8}
      rotation={[Math.PI / 2, 0, 0]}
      receiveShadow
      castShadow
    >
     <RandomizedLight
        amount={4}
        radius={12}
        intensity={2}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={12}
        intensity={2}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};
export default memo(Backdrop);
