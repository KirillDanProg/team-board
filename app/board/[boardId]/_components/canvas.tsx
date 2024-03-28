"use client";

import { CanvasMode, CanvasState } from "@/types/canvas";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useState } from "react";
import { useCanRedo, useCanUndo, useHistory } from "@/liveblocks.config";

interface Props {
  boardId: string;
}
export default function Canvas({ boardId }: Props) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const redoHandler = () => {
    history.redo();
  };
  const undoHandler = () => {
    history.undo();
  };

  return (
    <main className="bg-neutral-100 h-full w-full relative touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        redo={redoHandler}
        undo={undoHandler}
      />
    </main>
  );
}
