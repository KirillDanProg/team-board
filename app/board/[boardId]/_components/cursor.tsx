import React from "react";
import { MousePointer2 } from "lucide-react";

type Props = {
  color: string;
  x: number;
  y: number;
};

export default function Cursor({ color, x, y }: Props) {
  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      width={50}
      height={50}
    >
      <MousePointer2
        color={color}
        style={{
          fill: color,
        }}
        width={20}
        height={20}
        className="w-5 h-5"
      />
    </foreignObject>
  );
}
