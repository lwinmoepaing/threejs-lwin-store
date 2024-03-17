"use client";

import { tShirtStickers } from "@/data/mockStickers";
import { state } from "@/store/store";
import cn from "@/util/cn";
import { computePosition, offset, shift } from "@floating-ui/dom";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GiDervishSwords } from "react-icons/gi";
import {
  TbBrandGolang,
  TbBrandJavascript,
  TbBrandLaravel,
  TbBrandPhp,
  TbBrandReactNative,
  TbBrandRust,
  TbBrandThreejs,
} from "react-icons/tb";
import { useSnapshot } from "valtio";
interface FloatingMenuCords {
  x: number;
  y: number;
}

const stickerIconClass = "hover:opacity-100 opacity-50 cursor-pointer";

const Icons: {
  Component: React.FC<PropsWithChildren<{ className: string }>>;
  name: (typeof tShirtStickers)[number];
}[] = [
  {
    name: "lmp",
    Component: () => <span className="text-[10px]">LMP</span>,
  },
  {
    name: "mmswe",
    Component: () => <span className="text-[10px]">MMswe</span>,
  },
  {
    name: "var_camp",
    Component: GiDervishSwords,
  },
  {
    name: "react",
    Component: TbBrandReactNative,
  },
  {
    name: "javascript",
    Component: TbBrandJavascript,
  },
  {
    name: "php",
    Component: TbBrandPhp,
  },
  {
    name: "laravel",
    Component: TbBrandLaravel,
  },
  {
    name: "go",
    Component: TbBrandGolang,
  },
  {
    name: "rust",
    Component: TbBrandRust,
  },
  {
    name: "three",
    Component: TbBrandThreejs,
  },
];

const StickerPicker = () => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const showRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const [floatingMenuCords, setFloatingMenuCords] = useState<
    FloatingMenuCords | undefined
  >(undefined);
  const snapShot = useSnapshot(state);

  const handleSticker = (sticker: (typeof tShirtStickers)[number]) => {
    state.shirt.sticker = sticker;
    setIsShow(false);
  };

  const selectedItem = useMemo(() => {
    return Icons.find((icon) => icon.name === snapShot.shirt.sticker);
  }, [snapShot.shirt.sticker]);

  const computeCords = useCallback(() => {
    if (buttonRef.current && showRef.current && isShow) {
      computePosition(buttonRef.current, showRef.current, {
        middleware: [shift(), offset(20)],
        placement: "top",
      })
        .then(({ x, y }) => {
          setFloatingMenuCords({ x, y });
        })
        .catch(() => {
          setFloatingMenuCords(undefined);
        });
    }
  }, [isShow]);

  useEffect(() => {
    computeCords();
    const removeCords = () => {
      setFloatingMenuCords(undefined);
      computeCords();
    };
    window.addEventListener("resize", removeCords);

    return () => {
      window.removeEventListener("resize", removeCords);
    };
  }, [computeCords]);

  return (
    <>
      {isShow && (
        <div
          ref={showRef}
          className="absolute flex flex-wrap items-center gap-x-[12px] rounded-lg bg-[#fff] shadow-xl px-5 py-2"
          style={{
            left: (floatingMenuCords?.x || 0) - 10,
            top: (floatingMenuCords?.y || 0) + 10,
            opacity: !floatingMenuCords ? 0 : 1,
            visibility: !floatingMenuCords ? "hidden" : "visible",
          }}
        >
          {Icons.map(({ name, Component }) => (
            <span
              key={name}
              className={cn(
                stickerIconClass,
                snapShot.shirt.sticker === name && "text-rose-400 opacity-80"
              )}
              onClick={() => {
                handleSticker(name);
              }}
            >
              <Component className="h-4 w-4" />
            </span>
          ))}
        </div>
      )}
      <div
        ref={buttonRef}
        className={cn(
          "bg-white shadow-xl px-5 py-1 rounded-full cursor-pointer hover:bg-black/85 hover:text-white relative"
        )}
        onClick={() => setIsShow((prev) => !prev)}
      >
        {selectedItem ? <selectedItem.Component className="" /> : "💯"}
      </div>
    </>
  );
};
export default StickerPicker;
