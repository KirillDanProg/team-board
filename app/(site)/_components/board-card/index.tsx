import React from "react";
import Link from "next/link";
import Image from "next/image";
import Overlay from "./overlay";
import Footer from "./footer";
import Actions from "@/components/actions";
import { useAuth } from "@clerk/nextjs";
import { ru } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

interface Props {
  id: string;
  title: string;
  imageUrl: string;
  orgId: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  isFavorite: boolean;
}
const BoardCard = ({
  id,
  title,
  imageUrl,
  authorName,
  authorId,
  createdAt,
  orgId,
  isFavorite,
}: Props) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "Вы" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ru,
  });
  const { mutate: onAddToFavorites, isLoading: isAddToFavoritesLoading } =
    useApiMutation(api.board.addToFavorites);
  const {
    mutate: onDeleteFromFavorites,
    isLoading: isDeleteFromFavoritesLoading,
  } = useApiMutation(api.board.deleteFromFavorites);

  const toggleFavorites = async () => {
    if (isFavorite) {
      const res = await onDeleteFromFavorites({ id });
      res
        ? toast.success("Борд удален из избранных")
        : toast.error("Не удалось удалить борд из избранных");
    } else {
      const res = await onAddToFavorites({ id });
      res
        ? toast.success("Борд добавлен в избранные")
        : toast.error("Не удалось добавить борд в избранное");
    }
  };
  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} className="object-fit" fill alt={title} />
          <Overlay />
          <Actions
            title={title}
            id={id}
            side="right"
            className="opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal className="absolute top-1 right-1 z-50 w-10 h-6 text-white" />
          </Actions>
        </div>
        <Footer
          title={title}
          isFavorite={isFavorite}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorites}
          disabled={isAddToFavoritesLoading || isDeleteFromFavoritesLoading}
        />
      </div>
    </Link>
  );
};

export default BoardCard;
