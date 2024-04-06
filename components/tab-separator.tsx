interface Props {
  height: number;
  color?: string;
}
export function TabSeparator({ height = 12, color = "neutral-300" }) {
  const heightVariants: Record<string, string> = {
    4: "h-[4px]",
    8: "h-[8px]",
    12: "h-[12px]",
    16: "h-[16px]",
    20: "h-[20px]",
    24: "h-[24px]",
    32: "h-[32px]",
    48: "h-[48px]",
    54: "h-[54px]",
  };
  return (
    <div
      className={`${heightVariants[height]} w-[1px] bg-${color} mx-1.5`}
    ></div>
  );
}
