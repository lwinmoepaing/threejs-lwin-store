"use client";
import { state } from "@/store/store";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import { DirectionalLight } from "three";
import { useSnapshot } from "valtio";

const Room = () => {
  const dirLight = useRef<DirectionalLight>(null);
  const { shirt } = useSnapshot(state);

  const capSquareRef = useRef<any>(null);
  const cupSquareRef = useRef<any>(null);

  useFrame(({ clock }) => {
    capSquareRef.current.rotation.x = clock.getElapsedTime() * 0.09;
    capSquareRef.current.rotation.y = clock.getElapsedTime() * 0.09;
    cupSquareRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <group>
      <mesh position={[-0.7, -0.4, 0.15]} castShadow ref={cupSquareRef}>
        <boxGeometry attach="geometry" args={[0.3, 0.7, 0.3]} />
        <meshStandardMaterial
          attach="material"
          color={shirt.color}
          roughness={0.7}
          metalness={0.8}
        />
      </mesh>

      <mesh
        position={[0.7, 0.15, 0]}
        rotation={[1, 1, 1]}
        castShadow
        ref={capSquareRef}
      >
        <boxGeometry attach="geometry" args={[0.10, 0.10, 0.10]} />
        <meshStandardMaterial
          attach="material"
          color={shirt.color}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};
export default Room;
