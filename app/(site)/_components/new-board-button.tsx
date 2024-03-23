"use client";
import React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface Props {
  orgId: string;
  disabled: boolean;
}
const NewBoardButton = ({ orgId, disabled }: Props) => {
  const { mutate, isLoading } = useApiMutation(api.board.createBoard);
  const router = useRouter();
  const createNewBoard = async () => {
    const boardId = await mutate({ orgId, title: "Борд" });
    if (!boardId) {
      toast.error("Не удалось создать борд");
    } else {
      router.push(`/board/${boardId}`);
      toast.success("Борд успешно создан!");
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      onClick={createNewBoard}
      className={cn(
        "flex flex-col items-center justify-center gap-1 bg-blue-600  text-white rounded-lg text-sm transition enabled:hover:bg-blue-700 enabled:active:bg-blue-900",
        (disabled || isLoading) && "opacity-75 cursor-not-allowed"
      )}
    >
      <Plus className="h-12 w-12 stroke-1" />
      Новый борд
    </button>
  );
};

export default NewBoardButton;
