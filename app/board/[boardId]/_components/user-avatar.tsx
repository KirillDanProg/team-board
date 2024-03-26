import Hint from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}
export default function UserAvatar({
  src,
  name = "Участник",
  fallback,
  borderColor,
}: Props) {
  return (
    <Hint label={name}>
      <Avatar
        className="w-[28px] h-[28px] border-[4px] border-double"
        style={{ borderColor }}
      >
        <AvatarImage src={src} alt={name} />
        <AvatarFallback className="font-semibold text-xs">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
}
