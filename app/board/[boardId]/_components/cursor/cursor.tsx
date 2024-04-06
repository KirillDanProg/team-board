import React from "react";
import { MousePointer2 } from "lucide-react";
import { useOther } from "@/liveblocks.config";
import { connectionIdToColor } from "@/lib/utils";

type Props = {
  connectionId: number;
};

function Cursor({ connectionId }: Props) {
  const cursor = useOther(connectionId, (user) => user.presence.cursor);
  const { userName } = useOther(connectionId, (user) => user.info);
  const color = connectionIdToColor(connectionId);

  if (cursor === null) {
    return null;
  }
  const { x, y } = cursor;
  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      width={userName.length * 10 + 24}
      height={50}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        style={{
          fill: color,
          color: color,
        }}
        width={20}
        height={20}
        className="w-5 h-5"
      />
      <div
        className="absolute left-4 text-white text-xs font-semibold px-1.5 py-0.5 rounded-md"
        style={{ backgroundColor: color }}
      >
        {userName}
      </div>
    </foreignObject>
  );
}

export default React.memo(Cursor);
