import { InfoSkeleton } from "./layout/info";
import { ParticipantsSkeleton } from "./layout/participants/participants";
import { ToolbarSkeleton } from "./layout/toolbar/toolbar";
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <main className="bg-neutral-100 h-full w-full relative touch-none flex items-center justify-center">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  );
}
