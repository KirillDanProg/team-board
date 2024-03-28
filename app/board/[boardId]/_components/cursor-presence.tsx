import React from "react";
import Cursor from "./cursor";
import { connectionIdToColor } from "@/lib/utils";
import { useMutation, useMyPresence, useOthers } from "@/liveblocks.config";

export default function CursorPresence() {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const onPointerMoveHandler = useMutation(({ setMyPresence }, e) => {
    e.preventDefault();
    const current = {
      x: Math.round(e.clientX),
      y: Math.round(e.clientY),
    };
    setMyPresence({ cursor: current });
  }, []);

  return (
    <svg
      className="h-[100vh] w-[100vw]"
      onPointerMove={onPointerMoveHandler}
      onPointerLeave={() =>
        updateMyPresence({
          cursor: null,
        })
      }
    >
      <g>
        {others.map(({ connectionId, presence }) => {
          if (presence.cursor === null) {
            return null;
          }

          return (
            <Cursor
              key={connectionId}
              color={connectionIdToColor(connectionId)}
              x={presence.cursor.x}
              y={presence.cursor.y}
            />
          );
        })}
      </g>
    </svg>
  );
}
