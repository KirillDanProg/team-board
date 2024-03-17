import React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface Props {
  orgId: string;
  disabled: boolean;
}
const NewBoardButton = ({ orgId, disabled }: Props) => {
  const { mutate, isLoading } = useApiMutation(api.board.createBoard);
  const createNewBoard = async () => {
    const res = await mutate({ orgId, title: "Борд" });
    res ? toast.success("Борд успешно создан!") : toast.error("Не удалось создать борд");
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
