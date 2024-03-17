import React from "react";
import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWindowSize } from "usehooks-ts";

const InviteButton = () => {
  const { width = 0 } = useWindowSize({ debounceDelay: 500 });
  const smallerDevices = width < 768;
  const mobileDevice = width < 420;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="flex items-center gap-x-1 self-streach">
          <Plus className="h-4 w-4" />
          {!mobileDevice && "Добавить участника"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-transparent border-none p-0 max-w-[880px]">
        <OrganizationProfile
          appearance={{
            elements: {
              headerTitle: {
                fontSize: smallerDevices ? "1.5rem" : "2rem",
              },
              pageScrollBox: {
                padding: smallerDevices ? "1rem" : "2rem",
              },
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default InviteButton;
