"use client";

import { Room } from "@/components/room";
import Canvas from "./_components/canvas";
import Loading from "./_components/loading";

interface Props {
  params: {
    boardId: string;
  };
}

export default function BoardPage({ params }: Props) {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
}
