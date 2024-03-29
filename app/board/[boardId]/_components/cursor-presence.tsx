import React, { useCallback, useState } from "react";
import Cursor from "./cursor";
import {
  useMutation,
  useOthers,
  useOthersConnectionIds,
} from "@/liveblocks.config";
import { Camera } from "@/types/canvas";
import { pointerEventToCanvasPoint } from "@/lib/utils";

function Cursors() {
  const othersIds = useOthersConnectionIds();

  return (
    <>
      {othersIds.map((connectionId) => {
        return <Cursor key={connectionId} connectionId={connectionId} />;
      })}
    </>
  );
}
function CursorPresence() {
  const others = useOthers();
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);
  const onPointerMoveHandler = useMutation(({ setMyPresence }, e) => {
    e.preventDefault();
    const current = pointerEventToCanvasPoint(e, camera);
    setMyPresence({ cursor: current });
  }, []);

  const onPointerLeaveHandler = useMutation(({ setMyPresence }, e) => {
    e.preventDefault();
    setMyPresence({ cursor: null });
  }, []);
  return (
    <svg
      className="h-[100vh] w-[100vw]"
      onWheel={onWheel}
      onPointerMove={onPointerMoveHandler}
      onPointerLeave={onPointerLeaveHandler}
    >
      <g>
        <Cursors />
      </g>
    </svg>
  );
}

export default React.memo(CursorPresence);
