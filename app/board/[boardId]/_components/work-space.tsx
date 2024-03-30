"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useMutation, useOthersMapped, useStorage } from "@/liveblocks.config";
import {
  Camera,
  CanvasMode,
  Color,
  LayerType,
  Point,
  CanvasState,
  Layer,
  EllipseLayer,
} from "@/types/canvas";
import { connectionIdToColor, pointerEventToCanvasPoint } from "@/lib/utils";
import CursorPresence from "./cursor-presence";
import { History, LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";
import { LayerPreview } from "./layer-preview";
import Ellipse from "./layers/ellipse";

const MAX_LAYERS = 100;

type Props = {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  history: History;
};

function WorkSpace({ canvasState, setCanvasState, history }: Props) {
  const layerIds = useStorage((root) => root.layerIds);
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject<Layer>({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );
  const onPointerMoveHandler = useMutation(({ setMyPresence }, e) => {
    e.preventDefault();
    const current = pointerEventToCanvasPoint(e, camera);
    setMyPresence({ cursor: current });
  }, []);

  const onPointerLeaveHandler = useMutation(({ setMyPresence }, e) => {
    e.preventDefault();
    setMyPresence({ cursor: null });
  }, []);

  const onPointerUp = useMutation(
    ({}, e) => {
      let point = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer]
  );

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();
      const point = pointerEventToCanvasPoint(e, camera);
      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode]
  );

  const selections = useOthersMapped((other) => other.presence.selection);
  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};
    console.log(selections);
    for (const user of selections) {
      const [connectionId, selection] = user;
      console.log(user);
      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

  return (
    <svg
      className="h-[100vh] w-[100vw]"
      onWheel={onWheel}
      onPointerMove={onPointerMoveHandler}
      onPointerLeave={onPointerLeaveHandler}
      onPointerUp={onPointerUp}
    >
      <g
        style={{
          transform: `translate(${camera.x}px, ${camera.y}px)`,
        }}
      >
        {layerIds.map((layerId) => (
          <LayerPreview
            key={layerId}
            id={layerId}
            onLayerPointerDown={onLayerPointerDown}
            selectionColor={layerIdsToColorSelection[layerId]}
          />
        ))}
        <CursorPresence />
      </g>
    </svg>
  );
}

export default React.memo(WorkSpace);
