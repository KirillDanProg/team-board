import { memo } from "react";
import { Camera, Color } from "@/types/canvas";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useSelf } from "@/liveblocks.config";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

type SelectionToolsProps = {
  isAnimated: boolean;
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
};

function SelectionTools({ camera }: SelectionToolsProps) {
  const deleteLayers = useDeleteLayers();
  const selection = useSelf((me) => me.presence.selection);
  const selectionBounds = useSelectionBounds();
  if (!selectionBounds) {
    return null;
  }

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;
  return (
    <div
      className="absolute flex justify-end min-w-[100px] shadow-lg rounded-md select-none"
      style={{
        transform: `translate(${x}px, calc(${y - 16}px - 100%))`,
      }}
    >
      <Button onClick={deleteLayers} variant="ghost" className=" px-1 ">
        <Trash2 className="w-4 h-4 text-red-600" />
      </Button>
    </div>
  );
}

export default memo(SelectionTools);
