import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";

interface Props {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
}
const Footer = ({ authorLabel, createdAtLabel, isFavorite, title, disabled, onClick }: Props) => {
  const onFavoriteClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate m-w-[calc(100% - 20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-80 transition-opacity text-[11px] text-muted-foreground ">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        onClick={onFavoriteClickHandler}
        disabled={disabled}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute text-muted-foreground top-3 right-3 hover:text-blue-500",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star className={cn("h-4 w-4", isFavorite && "fill-blue-500")} />
      </button>
    </div>
  );
};

export default Footer;
