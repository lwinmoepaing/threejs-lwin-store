"use client";

import { FC, PropsWithChildren, useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { Group, Object3DEventMap } from "three";
import { useSnapshot } from "valtio";
import { state } from "@/store/store";

const BodyMomentControl: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { curSelected } = useSnapshot(state);
  const groupRef = useRef<Group<Object3DEventMap>>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      easing.dampE(
        groupRef.current?.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        0.15,
        delta
      );
    }

    if (curSelected === "cup") {
      easing.dampLookAt(state.camera, [-0.6, 0, 0.12], 0.15, delta);
    }

    if (curSelected === "shirt") {
      easing.dampLookAt(state.camera, [0, 0, 0], 0.15, delta);
    }

    if (curSelected === "cap") {
      easing.dampLookAt(state.camera, [0.6, 0.12, 0], 0.15, delta);
    }
  });

  return <group ref={groupRef}>{children}</group>;
};
export default BodyMomentControl;
