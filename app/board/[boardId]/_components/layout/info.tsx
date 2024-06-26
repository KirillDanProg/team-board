"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Hint from "@/components/hint";
import Actions from "@/components/actions";
import { Button } from "@/components/ui/button";
import { TabSeparator } from "@/components/tab-separator";
import { useRenameModal } from "@/hooks/use-rename-modal";
import { Menu } from "lucide-react";

interface Props {
  boardId: string;
}

function Info({ boardId }: Props) {
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
      <TabSeparator height={12} />
      <Hint label="Редактировать" sideOffset={10} align="center">
        <Button
          onClick={onRenameHandler}
          variant="board"
          className="font-normal px-1.5"
        >
          {board.title}
        </Button>
      </Hint>
      <TabSeparator height={12} />
      <Actions id={boardId} title={board.title} sideOffset={12}>
        <Button
          variant="board"
          size="icon"
          className="border-none  focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Menu
            width={24}
            height={24}
            className="text-muted-foreground font-semibold"
          />
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

export default React.memo(Info);
