"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/hooks/use-rename-modal";

import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface Props {
  children?: React.ReactNode;
  header?: string;
  content?: string;
  disabled?: boolean;
}

const RenameModal = () => {
  const { isOpen, onClose, initialValues } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);
  const { mutate, isLoading } = useApiMutation(api.board.updateBoard);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await mutate({ id: initialValues.id, title });
    if (!res) {
      toast.error("Не удалось изменить название");
    } else {
      toast.success("Название изменено!");
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader className="gap-y-4">
          <DialogTitle>Изменить название</DialogTitle>
          <DialogDescription>Новое название борда:</DialogDescription>
          <form className="space-y-4" onSubmit={onSubmitHandler}>
            <Input
              required
              value={title}
              onChange={onChangeHandler}
              maxLength={60}
              disabled={isLoading}
              placeholder="Название борда"
            />
            <DialogFooter className="gap-4">
              <DialogClose asChild>
                <Button variant="outline" type="button" onClick={onClose}>
                  Отменить
                </Button>
              </DialogClose>
              <Button disabled={isLoading} type="submit">
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default RenameModal;
