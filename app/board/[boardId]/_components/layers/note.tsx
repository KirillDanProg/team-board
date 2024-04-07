import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import type { NoteLayer } from "@/types/canvas";
import ContentEditable, {
  type ContentEditableEvent,
} from "react-contenteditable";
import { useMutation } from "@/liveblocks.config";
import { shantell } from "@/lib/fonts";

interface Props {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export default function Note({
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
    const maxSize = 36;
    const scaleFactor = 0.15;
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
      fill={colorToCss(fill) || "#000"}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: `${colorToCss(fill) || "#000"}`,
      }}
      className="px-4 shadow-md drop-shadow-xl rounded-md"
    >
      <ContentEditable
        html={value ?? value ?? "Текст"}
        onChange={onChangeHandler}
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none",
          shantell.className
        )}
        style={{
          fontWeight: "400",
          fontSize: `${calculateFontSize(width, height)}px`,
          color: fill ? getContrastingTextColor(fill) : "#000",
        }}
      />
    </foreignObject>
  );
}
