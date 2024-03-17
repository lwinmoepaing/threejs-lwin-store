"use client";
import { state } from "@/store/store";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { BufferGeometry, NormalBufferAttributes } from "three";
import { useSnapshot } from "valtio";

const Shirt = () => {
  const { nodes, materials } = useGLTF("/models/shirt_baked_collapsed.glb");
  const { shirt } = useSnapshot(state);
  const texure = useTexture(`/mock/${shirt.sticker}.png`);

  const geometry = (nodes.T_Shirt_male as any)
    ?.geometry as BufferGeometry<NormalBufferAttributes>;

  useFrame((state, delta) => {
    easing.dampC((materials.lambert1 as any).color, shirt.color, 0.2, delta);
  });

  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        geometry={geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        <Decal
          position={[0, 0.05, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.14}
          map={texure}
          material-anisotropy={16}
          depthTest={false}
        />
      </mesh>
    </group>
  );
};
export default Shirt;
