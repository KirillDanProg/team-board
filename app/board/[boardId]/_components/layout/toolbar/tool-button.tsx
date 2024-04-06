import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  icon: LucideIcon;
  action: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}
export default function ToolButton({
  label,
  icon: Icon,
  action,
  isActive,
  isDisabled,
}: Props) {
  return (
    <Hint label={label} side="right" sideOffset={10}>
      <Button
        onClick={action}
        className={cn(
          "p-1.5",
          isDisabled && " cursor-not-allowed opacity-50 hover:bg-transparent"
        )}
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
}
