"use client";

import cn from "@/util/cn";
import Dot from "../ui/Dot/Dot";
import { useSnapshot } from "valtio";
import { state } from "@/store/store";

export const colorList = [
  "#ccc",
  "#efbd4e",
  "#80c670",
  "#726de8",
  "#ef674e",
  "#353934",
] as const;

const ColorPicker = () => {
  const { shirt } = useSnapshot(state);

  return colorList.map((color) => (
    <Dot
      color={color}
      key={color}
      selected={shirt.color === color}
      onClick={() => {
        state.shirt.color = color;
      }}
    />
  ));
};

export default ColorPicker;
