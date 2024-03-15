import { ReactNode } from "react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface Props {
  label: string;
  children: ReactNode;
  side?: "right" | "left" | "bottom" | "top";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}

const Hint = ({ label, children, side, align, sideOffset, alignOffset }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="text-white bg-black border-black"
          align={align}
          side={side}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
        >
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;
