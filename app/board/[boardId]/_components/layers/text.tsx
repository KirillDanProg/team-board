import { cn, colorToCss } from "@/lib/utils";
import type { TextLayer } from "@/types/canvas";
import ContentEditable, {
  type ContentEditableEvent,
} from "react-contenteditable";
import { useMutation } from "@/liveblocks.config";

interface Props {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export default function Text({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: Props) {
  const { x, y, width, height, fill, value } = layer;

  const onChangeHandler = useMutation(
    ({ storage }, e: ContentEditableEvent) => {
      const value = e.target.value;
      storage.get("layers").get(id)?.update({ value: value });
    },
    []
  );

  const calculateFontSize = (width: number, height: number) => {
    const maxSize = 72;
    const scaleFactor = 0.35;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor;
    return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxSize);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
    >
      <ContentEditable
        html={value ?? value ?? "Текст"}
        onChange={onChangeHandler}
        className={cn(
          "h-full w-full flex items-center justify-center flex-col  outline-none"
        )}
        style={{
          fontWeight: "600",
          fontSize: `${calculateFontSize(width, height)}px`,
          color: fill ? colorToCss(fill) : "#000",
        }}
      />
    </foreignObject>
  );
}
