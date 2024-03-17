"use client";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Hint from "@/components/hint";

const AddOrganizationButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint
            label="Create organization"
            side="right"
            sideOffset={16}
            align="start"
            alignOffset={10}
          >
            <button className="bg-white/25 h-full w-full rounded-md flex justify-center items-center">
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[480px] p-0 bg-transparent border-none">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};

export default AddOrganizationButton;
