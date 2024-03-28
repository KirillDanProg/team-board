import React, { useState } from "react";
import { Edit2, Link2, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";
import { Button } from "./ui/button";
import ConfirmModal from "./confirm-modal";
import { useRenameModal } from "@/hooks/use-rename-modal";

interface Props {
  id: string;
  title?: string;
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  className?: string;
}
const Actions = ({
  children,
  side = "right",
  sideOffset = 0,
  id,
  className,
  title = "",
}: Props) => {
  const { mutate: deleteBoardMutate, isLoading } = useApiMutation(
    api.board.deleteBoard
  );
  const { onOpen, initialValues } = useRenameModal();

  const copyBoardLinkHandler = () => {
    window.navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Ссылка на борд скопирована"))
      .catch(() => toast.error("Не удалось копировать ссылку"));
  };

  const deleteBoardHandler = async () => {
    const res = await deleteBoardMutate({ id });
    if (!res) {
      toast.error("Не удалось удалить борд");
    } else {
      toast.success("Борд успешно удален!");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`${className} px-2`} asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60 m-2"
      >
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={copyBoardLinkHandler}
        >
          <Link2 className="w-4 h-4 mr-2" />
          Скопировать ссылку
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className="cursor-pointer"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Изменить название
        </DropdownMenuItem>
        <ConfirmModal
          action="Удалить"
          header="Удалить борд?"
          content="Борд и весь его контент будет удален"
          disabled={isLoading}
          onConfirm={deleteBoardHandler}
        >
          <Button
            variant="ghost"
            className="w-full text-start pl-2 justify-start"
          >
            <Trash2 className="w-4 h-4 mr-2 text-red-600" />
            Удалить
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
