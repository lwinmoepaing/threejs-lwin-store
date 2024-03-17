import { colorList } from "@/components/ColorPicker/ColorPicker";
import { preLoadModels, tShirtStickers } from "@/data/mockStickers";
import { proxy } from "valtio";

export interface State {
  intro: boolean;
  curSelected: "shirt" | "cup" | "cap";
  shirt: {
    color: (typeof colorList)[number];
    sticker: (typeof tShirtStickers)[number];
  };
}
const state = proxy<State>({
  intro: true,
  curSelected: "shirt",
  shirt: {
    color: "#ccc",
    sticker: "lmp",
  },
});

export { state };
