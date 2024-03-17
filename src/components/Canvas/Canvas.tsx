"use client";

import { preLoadModels, tShirtStickers } from "@/data/mockStickers";
import {
  Center,
  Environment,
  useGLTF,
  useProgress,
  useTexture,
} from "@react-three/drei";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import Backdrop from "./Backdrop";
import BodyMomentControl from "./BodyMomentControl";
import Cap from "./Cap";
import Cup from "./Cup";
import Room from "./Room";
import Shirt from "./Shirt";

const cameraPosition = [0, 0.2, 3] as const;
const cameraFov = 25;

const Canvas = () => {
  const [eventSource] = useState<HTMLElement | undefined>(() => {
    return typeof document === "undefined"
      ? undefined
      : document?.getElementById("canvas") || undefined;
  });

  useEffect(() => {
    preLoadModels.forEach((model) => {
      useGLTF.preload(`/models/${model}.glb`);
    });
    tShirtStickers.forEach((tshirt) =>
      useTexture.preload(`/mock/${tshirt}.png`)
    );
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
          <Environment preset="apartment" />

          <Backdrop />
          <BodyMomentControl>
            <Center>
              <Shirt />
            </Center>
            <Room />
            <Cap />
            <Cup />
          </BodyMomentControl>

          {/* <OrbitControls /> */}
        </ThreeCanvas>
      )}
    </div>
  );
};

export default Canvas;
