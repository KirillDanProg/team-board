"use client";

import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

interface Props {
  boardId: string;
}
export default function Canvas({ boardId }: Props) {
  return (
    <main className="bg-neutral-100 h-full w-full relative touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
}
