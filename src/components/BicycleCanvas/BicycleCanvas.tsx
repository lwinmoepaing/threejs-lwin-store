"use client";

import { preLoadBicycleModels } from "@/data/mockStickers";
import {
  Environment,
  OrbitControls,
  useGLTF,
  useProgress
} from "@react-three/drei";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import Bicycle from "./Bicycle";
import * as THREE from 'three';

const cameraPosition = [1.8, 1.1, -1.12] as const;
const cameraFov = 25;

const BicycleCanvas = () => {
  const [eventSource] = useState<HTMLElement | undefined>(() => {
    return typeof document === "undefined"
      ? undefined
      : document?.getElementById("canvas") || undefined;
  });

  useEffect(() => {
    preLoadBicycleModels.forEach((model) => {
      useGLTF.preload(`/models/${model}.glb`);
    });
  }, []);

  const { progress } = useProgress();
  const fullyLoaded = useMemo(() => progress === 100, [progress]);

  return (
    <div className="canvas" id="canvas">
      {fullyLoaded && (
        <ThreeCanvas
          camera={{
            position: cameraPosition,
            fov: cameraFov,
          }}
          shadows={true}
          eventSource={eventSource}
          eventPrefix="client"
          gl={{
            pixelRatio: Math.min(window.devicePixelRatio, 2),
            preserveDrawingBuffer: true,
          }}
        >
          <ambientLight intensity={0.5} />
          <Environment preset="city" />

          <Bicycle />
          {/* <Backdrop /> */}

          <OrbitControls />
        </ThreeCanvas>
      )}
    </div>
  );
};

export default BicycleCanvas;
