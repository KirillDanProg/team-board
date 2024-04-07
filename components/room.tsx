"use client";

import { ReactNode } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { Layer } from "@/types/canvas";
import { LiveMap, LiveObject, LiveList } from "@liveblocks/client";

interface Props {
  roomId: string;
  children: React.ReactNode;
  fallback: NonNullable<ReactNode> | null;
}

export function Room({ children, roomId, fallback }: Props) {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        pencilColor: null,
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
