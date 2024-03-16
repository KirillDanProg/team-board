import React from "react";
import Image from "next/image";
import { DialogContent, DialogTrigger, Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateOrganization } from "@clerk/nextjs";

const EmptyOrganization = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/prog-boy.svg" width={300} height={300} alt="Empty" />
      <h2 className="text-2xl semibold mt-6">
        Добро пожаловать в <span className="uppercase">team-board</span>
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">Создай проект чтобы начать</p>
      <div className="mt-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Создать проект</Button>
          </DialogTrigger>
          <DialogContent className="bg-transparent border-none p-0 max-w-[480px]">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmptyOrganization;
