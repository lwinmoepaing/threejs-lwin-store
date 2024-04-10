"use client";

import { state } from "@/store/store";
import cn from "@/util/cn";
import { titleFont } from "@/util/fontLoader";
import { useCallback, useMemo } from "react";
import { FaRedhat, FaTshirt } from "react-icons/fa";
import { TbCup } from "react-icons/tb";
import { useSnapshot } from "valtio";
import toast from "react-hot-toast";
import ColorPicker from "../ColorPicker/ColorPicker";
import StickerPicker from "../StickerPicker/StickerPicker";

const iconClass =
  "border border-[#dfdfdf] rounded-full w-8 h-8 text-sm flex justify-center items-center cursor-pointer";

const Overlay = () => {
  const snap = useSnapshot(state);

  const dynamicStyle = useMemo(() => {
    const color = snap.shirt.color === "#ccc" ? "#222" : snap.shirt.color;
    return {
      color,
      borderColor: color,
    };
  }, [snap.shirt.color]);

  const selectedStyle = useMemo(() => {
    if (snap.shirt.color === "#ccc") {
      return {
        color: "#fff",
        backgroundColor: "#222",
      };
    }
    return {
      color: "#fff",
      backgroundColor: snap.shirt.color,
    };
  }, [snap.shirt.color]);

  const handleLook = useCallback((name: (typeof snap)["curSelected"]) => {
    state.curSelected = name;
  }, []);

  return (
    <section className="relative">
      <header
        className={cn(
          "container-wrapper left-0 right-0 fixed top-0 w-full px-4 h-[100px] flex justify-between items-center text-2xl",
          titleFont.className
        )}
      >
        <span>
          <span className={"relative top-1"}>💯</span>{" "}
          <span style={dynamicStyle}>Lwin Store</span>
        </span>

        <div>
          {/* <div className="flex flex-row gap-x-[10px]">
            <span
              className={cn(iconClass)}
              style={snap.curSelected === "cup" ? selectedStyle : dynamicStyle}
              onClick={() => handleLook("cup")}
            >
              <TbCup />
            </span>
            <span
              className={cn(iconClass)}
              style={
                snap.curSelected === "shirt" ? selectedStyle : dynamicStyle
              }
              onClick={() => handleLook("shirt")}
            >
              <FaTshirt />
            </span>
            <span
              className={cn(iconClass)}
              style={snap.curSelected === "cap" ? selectedStyle : dynamicStyle}
              onClick={() => handleLook("cap")}
            >
              <FaRedhat />
            </span>
          </div> */}
          <button
            className="shadow-xl inline-block hover:opacity-80 transition-all px-3 py-[2px] flex justify-center items-center mt-[6px] min-w-[120px] rounded-md text-[14px]"
            style={selectedStyle}
            onClick={() => {
              toast.success("Coming Soon for Cart Feature");
            }}
          >
            Buy Now
          </button>
        </div>
      </header>

      <div className="container-wrapper left-0 right-0 fixed bottom-0 w-full">
        <div className="w-full flex flex-row justify-center items-center gap-x-5 h-20 relative">
          <ColorPicker />
          <StickerPicker />
        </div>
      </div>
    </section>
  );
};
export default Overlay;
