"use client";
import { CanvasMode, CanvasState } from "@/types/canvas";
import Info from "./layout/info";
import Participants from "./layout/participants/participants";
import Toolbar from "./layout/toolbar/toolbar";
import { useState } from "react";
import { useCanRedo, useCanUndo, useHistory } from "@/liveblocks.config";
import WorkSpace from "./layout/work-space";

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
      <WorkSpace
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        history={history}
      />
    </main>
  );
}
