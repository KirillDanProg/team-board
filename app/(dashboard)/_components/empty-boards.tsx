"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useOrganization } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

const EmptyBoards = () => {
  const { organization } = useOrganization();
  const { mutate, isLoading, error } = useApiMutation(api.board.createBoard);

  const onCreateBoardHandler = async () => {
    if (!organization) return;

    const result = await mutate({
      orgId: organization.id,
      title: "Доска",
    });

    if (!result || error) {
      toast("Не удалось создать доску");
    } else {
      toast("Доска успешно создана!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/create-board.svg" width={300} height={300} alt="Empty" />
      <h2 className="text-2xl semibold mt-6">Создай свою первую доску</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Начни с создания доски для своего проекта
      </p>
      <div className="mt-8">
        <Button disabled={isLoading} onClick={onCreateBoardHandler} size="lg">
          Создать доску
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
