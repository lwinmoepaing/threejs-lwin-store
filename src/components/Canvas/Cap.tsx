"use client";
import { state } from "@/store/store";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import { BufferGeometry, NormalBufferAttributes } from "three";
import { useSnapshot } from "valtio";
import THREE from "three";

const Cap = () => {
  const { nodes, materials } = useGLTF("/models/cap.glb");
  const { shirt } = useSnapshot(state);
  const texure = useTexture("/mock/react.png");
  const hatRef = useRef<any>(null);

  const geometry = (nodes.model_0 as any)
    ?.geometry as BufferGeometry<NormalBufferAttributes>;

  useFrame(({ clock }, delta) => {
    easing.dampC(
      (materials[""] as any).color,
      shirt.color === "#353934" ? "#666" : shirt.color,
      0.2,
      delta
    );

    hatRef.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.09;
    hatRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.05 + 0.8;
  });

  return (
    <group>
      <mesh
        geometry={geometry}
        material={materials[""]}
        dispose={null}
        scale={0.135}
        position={[0.67, 0.24, 0]}
        rotation={[0, 0.8, 0.1]}
        castShadow
        receiveShadow
        ref={hatRef}
      />
    </group>
  );
};
export default Cap;
