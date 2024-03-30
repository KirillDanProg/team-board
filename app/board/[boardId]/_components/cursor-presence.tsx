import React from "react";
import Cursor from "./cursor";
import { useOthersConnectionIds } from "@/liveblocks.config";

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
  return (
    <>
      <Cursors />
    </>
  );
}

export default React.memo(CursorPresence);
