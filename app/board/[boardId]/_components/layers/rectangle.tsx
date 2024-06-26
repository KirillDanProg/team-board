import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface Props {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export default function Rectangle({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: Props) {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={colorToCss(fill)}
      stroke={selectionColor || "transparent"}
    />
  );
}
