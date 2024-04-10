import { state } from "@/store/store";
import { useGLTF, useProgress } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import * as THREE from "three";
import { useControls } from "leva";

let speed = 0.4;

const useBicycle = () => {
  const { shirt } = useSnapshot(state);
  const modelRef = useRef<any>(null);
  const model = useGLTF("/models/bicycle_compress.glb");
  const [startAnimation, setStartAnimation] = useState(false);
  const { progress } = useProgress();

  const leftWheelGp = useRef<any>(null);
  const [body, setBody] = useState<any[]>([]);

  const rightWheelGp = useRef<any>(null);

  const fullyLoaded = useMemo(() => progress === 100, [progress]);

  useFrame((state, delta) => {
    state.camera.lookAt(new THREE.Vector3(0, 0.19, 0));
    if (startAnimation) {
      easing.damp3(modelRef.current.position, [0, 0, 0], 0.25, delta);
      easing.damp3(modelRef.current.rotation, [0, 0, 0], 0.25, delta);

    } else {
      const { x, y, z } = modelRef.current.position;
      speed = 0.4;
      if (x === 0 && y === 0 && z === 0) setStartAnimation(false);
    }

    if (leftWheelGp.current) {
      leftWheelGp.current.rotation.x -= speed * delta;
    }

    if (rightWheelGp.current) {
      rightWheelGp.current.rotation.x -= speed * delta;
    }

    if (body.length) {
      body.forEach((metal: any) => {
        easing.dampC((metal.material as any).color, shirt.color, 0.2, delta);
      });
    }
  });

  useEffect(() => {
    const leftGroupHashMap = new Map();
    const rightGroupHashMap = new Map();

    if (fullyLoaded) {
      modelRef.current?.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          // Solid Body
          const isBody = child?.name.includes?.("Body");
          if (isBody) {
            child.material.map = null;
            child.material.normalMap = null;
            child.material.metalnessMap = null;
            child.material.metalness = 2;
            child.material.roughness = 0.98;
            setBody((prev) => [...prev, child]);
          }

          // Wheels
          const isLeftWheel = child?.name.includes?.("Left_Wheel");
          if (isLeftWheel) {
            leftGroupHashMap.set(child.name, child);
          }
          const isRightWheel = child?.name.includes?.("Right_Wheel");
          if (isRightWheel) {
            rightGroupHashMap.set(child.name, child);
          }
        }
      });

      // Set Group
      const leftContainer = leftGroupHashMap.get("Left_Wheel000");
      const leftPivot = new THREE.Group();
      leftPivot.position.set(0, 0, 0);
      leftContainer.add(leftPivot);
      const arrWheels = ["001", "002", "003"];
      arrWheels.forEach((wheelNo) => {
        const wheel = leftGroupHashMap.get(`Left_Wheel${wheelNo}`);
        wheel.position.set(0, 0, 0);
        if (wheelNo !== "001") {
          wheel.scale.x = 1.05;
          wheel.scale.y = 1.05;
          wheel.scale.z = 1.05;
        }
        leftPivot.add(wheel);
      });
      leftWheelGp.current = leftContainer;

      const rightContainer = rightGroupHashMap.get("Right_Wheel000");
      const rightPivot = new THREE.Group();
      rightPivot.position.set(0, 0, 0);
      rightContainer.add(rightPivot);
      arrWheels.forEach((wheelNo) => {
        const wheel = rightGroupHashMap.get(`Right_Wheel${wheelNo}`);
        wheel.position.set(0, 0, 0);
        if (wheelNo !== "002") {
          wheel.scale.x = 1.05;
          wheel.scale.y = 1.05;
          wheel.scale.z = 1.05;
        }
        rightPivot.add(wheel);
      });
      rightWheelGp.current = rightContainer;

      setTimeout(() => setStartAnimation(true), 400);
    }
  }, [fullyLoaded, modelRef]);

  return {
    model,
    modelRef,
  };
};

export default useBicycle;
