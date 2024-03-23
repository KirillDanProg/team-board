"use client";

import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <main className="bg-neutral-100 h-full w-full relative touch-none flex items-center justify-center">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  );
}
