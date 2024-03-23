"use client";

import { ReactNode } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

interface Props {
  roomId: string;
  children: React.ReactNode;
  fallback: NonNullable<ReactNode> | null;
}

export function Room({ children, roomId, fallback }: Props) {
  
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
