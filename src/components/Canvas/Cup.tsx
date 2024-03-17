"use client";
import { state } from "@/store/store";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, NormalBufferAttributes } from "three";
import { useSnapshot } from "valtio";

const Cup = () => {
  const { nodes, materials } = useGLTF("/models/cup.glb");
  const { shirt } = useSnapshot(state);
  const texure = useTexture(`/mock/${shirt.sticker}.png`);
  const cup = useRef<any>(null);

  const geometry = (nodes.Cylinder_Material_0 as any)
    ?.geometry as BufferGeometry<NormalBufferAttributes>;

  useFrame(({ clock }, delta) => {
    cup.current.position.x = Math.sin(clock.getElapsedTime()) * 0.01 - 0.73;
    cup.current.position.y = Math.sin(clock.getElapsedTime()) * 0.01;
  });

  return (
    <group>
      <mesh
        geometry={geometry}
        material={materials["Material.002"]}
        dispose={null}
        scale={0.18}
        position={[-0.73, 0, 0]}
        rotation={[0, -0.8, -0.2]}
        castShadow
        receiveShadow
        ref={cup}
      >
        <Decal
          position={[0.1, 0.33, 0.28]}
          rotation={[0, 0, 0]}
          scale={0.33}
          map={texure}
          material-anisotropy={16}
          depthTest={true}
        />
      </mesh>
    </group>
  );
};
export default Cup;
