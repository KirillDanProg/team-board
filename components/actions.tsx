import React from "react";
import { Link2, Trash2 } from "lucide-react";
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

interface Props {
  id: string;
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  className?: string;
}
const Actions = ({ children, side = "right", sideOffset = 0, id, className }: Props) => {
  const { mutate, isLoading } = useApiMutation(api.board.deleteBoard);

  const copyBoardLinkHandler = () => {
    window.navigator.clipboard
      .writeText(`${window.location.origin}/boards/${id}`)
      .then(() => toast.success("Ссылка на борд скопирована"))
      .catch(() => toast.error("Не удалось копировать ссылку"));
  };

  const deleteBoardHandler = async () => {
    const res = await mutate({ id });
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
        className="w-60"
      >
        <DropdownMenuItem className="cursor-pointer" onClick={copyBoardLinkHandler}>
          <Link2 className="w-4 h-4 mr-2" />
          Скопировать ссылку
        </DropdownMenuItem>
        <ConfirmModal
          color="red-600"
          action="Удалить"
          header="Удалить борд?"
          description="Борд и весь его контент будет удален"
          disabled={isLoading}
          onConfirm={deleteBoardHandler}
        >
          <Button variant="ghost" className="w-full text-start pl-2 justify-start">
            <Trash2 className="w-4 h-4 mr-2 text-red-600" />
            Удалить
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
