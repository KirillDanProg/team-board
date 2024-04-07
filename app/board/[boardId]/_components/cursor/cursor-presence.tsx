import React from "react";
import Cursor from "./cursor";
import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";
import { shallow } from "@liveblocks/client";
import Path from "../layers/path";
import { colorToCss } from "@/lib/utils";

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
function Drafts() {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.pencilColor,
    }),
    shallow
  );
  return (
    <>
      {/* All the drawing of other users in the room that are currently in progress */}
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss(other.penColor) : "#000"}
            />
          );
        }
        return null;
      })}
    </>
  );
}
function CursorPresence() {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
}

export default React.memo(CursorPresence);
