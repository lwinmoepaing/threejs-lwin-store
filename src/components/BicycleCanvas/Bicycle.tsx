"use client";
import useBicycle from "./useBicycle";

const Bicycle = () => {
  const { model, modelRef } = useBicycle();

  // rotation={[0, Math.PI * 0.5, 0]}
  // position={[-2, -0.2, -3]}

  return (
    <group>
      <primitive
        object={model.scene}
        scale={1}
        rotation={[0, - Math.PI * 0.12, 0]}
        position={[0.2, 0.2, 0.7]}
        ref={modelRef}
        castShadow
        receiveShadow
      />
    </group>
  );
};
export default Bicycle;
