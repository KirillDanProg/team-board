import { memo } from "react";
import { Camera, Color } from "@/types/canvas";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import ColorPicker from "./color-picker";
import Hint from "@/components/hint";
import { TabSeparator } from "@/components/tab-separator";

type SelectionToolsProps = {
  isAnimated: boolean;
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
};

function SelectionTools({ camera, setLastUsedColor }: SelectionToolsProps) {
  const deleteLayers = useDeleteLayers();
  const selection = useSelf((me) => me.presence.selection);
  const selectionBounds = useSelectionBounds();

  const moveToFront = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      const arr = liveLayerIds.toArray();

      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i);
        }
      }

      for (let i = indices.length - 1; i >= 0; i--) {
        liveLayerIds.move(
          indices[i],
          arr.length - 1 - (indices.length - 1 - i)
        );
      }
    },
    [selection]
  );

  const moveToBack = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      const arr = liveLayerIds.toArray();

      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i);
        }
      }
      debugger;
      for (let i = 0; i < indices.length; i++) {
        liveLayerIds.move(indices[i], i);
      }
    },
    [selection]
  );

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
      className="absolute flex flex-row items-center justify-end py-1 px-2 shadow-lg rounded-md select-none bg-white"
      style={{
        transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
      }}
    >
      <ColorPicker onChange={setFill} />
      <TabSeparator height={54} />
      <div className="flex flex-col border-solid ">
        <Hint label="Move to front">
          <Button onClick={moveToFront} variant="board" size="icon">
            <BringToFront className="text-neutral-600" />
          </Button>
        </Hint>
        <Hint label="Move to back">
          <Button onClick={moveToBack} variant="board" size="icon">
            <SendToBack className="text-neutral-600 " />
          </Button>
        </Hint>
      </div>
      <TabSeparator height={54} />
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
