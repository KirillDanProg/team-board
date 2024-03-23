"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

const EmptyBoards = () => {
  const { organization } = useOrganization();
  const { mutate, isLoading } = useApiMutation(api.board.createBoard);
  const router = useRouter();

  const onCreateBoardHandler = async () => {
    if (!organization) return;

    const boardId = await mutate({
      orgId: organization.id,
      title: "Борд",
    });

    if (!boardId) {
      toast.error("Не удалось создать борд");
    } else {
      router.push(`/board/${boardId}}`);
      toast.success("Борд успешно создан!");
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/create-board.svg" width={300} height={300} alt="Empty" />
      <h2 className="text-2xl semibold mt-6">Создай свой первый борд</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Начни с создания борда для своего проекта
      </p>
      <div className="mt-8">
        <Button disabled={isLoading} onClick={onCreateBoardHandler} size="lg">
          Создать борд
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
