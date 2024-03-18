import React from "react";
import Link from "next/link";
import Image from "next/image";
import Overlay from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import Footer from "./footer";
import Actions from "@/components/actions";
import { MoreHorizontal } from "lucide-react";

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
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true, locale: ru });

  return (
    <Link href={`/boards/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} className="object-fit" fill alt={title} />
          <Overlay />
          <Actions title={title} id={id} side="right" className="opacity-0 group-hover:opacity-100">
            <MoreHorizontal className="absolute top-1 right-1 z-50 w-10 h-6 text-white" />
          </Actions>
        </div>
        <Footer
          title={title}
          isFavorite={isFavorite}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
};

export default BoardCard;
