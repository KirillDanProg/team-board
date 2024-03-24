"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useRenameModal } from "@/hooks/use-rename-modal";
import Actions from "@/components/actions";
import Image from "next/image";
import Link from "next/link";
interface Props {
  boardId: string;
}

function TabSeparator() {
  return <div className="text-neutral-300 px-1.5">|</div>;
}
export default function Info({ boardId }: Props) {
  const { onOpen } = useRenameModal();
  const board = useQuery(api.board.getBoard, {
    id: boardId as Id<"boards">,
  });

  if (!board) {
    return <InfoSkeleton />;
  }

  const onRenameHandler = () => {
    onOpen(boardId, board.title);
  };

  return (
    <div className="absolute top-2 left-2 flex items-center justify-center px-2 bg-white h-12 rounded-md shadow-md">
      <Hint label="К списку бордов" sideOffset={10}>
        <Button variant="board" asChild>
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <div className="text-black uppercase ">team-board</div>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Редактировать" sideOffset={10} align="center">
        <Button onClick={onRenameHandler} variant="board">
          {board.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={boardId} title={board.title}>
        <Button variant="board" size="icon">
          <Menu />
        </Button>
      </Actions>
    </div>
  );
}

export function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 flex items-center justify-center px-2 bg-white h-12 w-[300px] rounded-md shadow-md" />
  );
}
