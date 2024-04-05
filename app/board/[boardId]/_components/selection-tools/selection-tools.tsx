import { memo } from "react";
import { Camera, Color } from "@/types/canvas";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import ColorPicker from "./color-picker";

type SelectionToolsProps = {
  isAnimated: boolean;
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
};

function SelectionTools({ camera, setLastUsedColor }: SelectionToolsProps) {
  const deleteLayers = useDeleteLayers();
  const selection = useSelf((me) => me.presence.selection);
  const selectionBounds = useSelectionBounds();

  const setFill = useMutation(
    ({ storage }, fill: Color) => {
      const liveLayers = storage.get("layers");
      setLastUsedColor(fill);
      selection.forEach((id) => {
        liveLayers.get(id)?.set("fill", fill);
      });
    },
    [selection, setLastUsedColor]
  );

  if (!selectionBounds) {
    return null;
  }

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;
  return (
    <div
      className="absolute flex flex-row justify-end p-4 shadow-lg rounded-md select-none "
      style={{
        transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
      }}
    >
      <ColorPicker onChange={setFill} />

      <Button
        onClick={deleteLayers}
        variant="ghost"
        className="flex items-center px-1 ml-1 "
      >
        <Trash2 className="w-4 h-4 text-red-600" />
      </Button>
    </div>
  );
}

export default memo(SelectionTools);
