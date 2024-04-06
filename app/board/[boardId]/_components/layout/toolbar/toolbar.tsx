"use client";

import {
  Circle,
  MousePointer2,
  Pencil,
  Square,
  StickyNote,
  Type,
  Redo2,
  Undo2,
} from "lucide-react";
import ToolButton from "./tool-button";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

interface Props {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  redo: () => void;
  undo: () => void;
  canRedo: boolean;
  canUndo: boolean;
}

export default function Toolbar({
  undo,
  redo,
  canUndo,
  canRedo,
  canvasState,
  setCanvasState,
}: Props) {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2  flex flex-col gap-y-4  p-1">
      <div className="flex flex-col gap-2 p-2.5  bg-white rounded-md shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          isDisabled={false}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
          action={() =>
            setCanvasState({
              mode: CanvasMode.None,
            })
          }
        />
        <ToolButton
          label="Pencil"
          icon={Pencil}
          isDisabled={false}
          isActive={canvasState.mode === CanvasMode.Pencil}
          action={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
        />
        <ToolButton
          label="Sticky note"
          icon={StickyNote}
          isDisabled={false}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
          action={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
        />
        <ToolButton
          label="Text"
          icon={Type}
          isDisabled={false}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
          action={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          isDisabled={false}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
          action={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
        />
        <ToolButton
          label="Ellips"
          icon={Circle}
          isDisabled={false}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
          action={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
        />
      </div>
      <div className="flex flex-col gap-y-2 px-2  bg-white rounded-md shadow-md">
        <ToolButton
          label="Undo"
          icon={Undo2}
          isDisabled={!canUndo}
          action={undo}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          isDisabled={!canRedo}
          action={redo}
        />
      </div>
    </div>
  );
}

export function ToolbarSkeleton() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 h-[360px] w-12  bg-white rounded-md shadow-md" />
  );
}
