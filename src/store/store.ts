import { colorList } from "@/components/ColorPicker/ColorPicker";
import { preLoadModels, tShirtStickers } from "@/data/mockStickers";
import { proxy } from "valtio";

export interface State {
  curSelected: "shirt" | "cup" | "cap";
  shirt: {
    color: (typeof colorList)[number];
    sticker: (typeof tShirtStickers)[number];
  };
}
const state = proxy<State>({
  curSelected: "shirt",
  shirt: {
    color: "#ccc",
    sticker: "lmp",
  },
});

export { state };
