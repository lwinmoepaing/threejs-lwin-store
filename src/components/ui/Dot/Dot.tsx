import cn from "@/util/cn";

const Dot = ({
  color,
  selected,
  onClick,
}: {
  color: string;
  selected?: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer hover:opacity-50 w-5 h-5 rounded-full ",
        selected ? "border-[.5px] border-[#dfdfdf]" : "border-[1.5px] border-white"
      )}
      style={{ backgroundColor: color }}
    />
  );
};
export default Dot;
