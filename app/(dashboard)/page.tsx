"use client";
import { useOrganization } from "@clerk/nextjs";
import EmptyOrganization from "./_components/empty-org";
import BoardList from "./_components/board-list";

interface Props {
  searchParams: {
    query?: string;
    favorites?: string;
  };
}
export default function Home({ searchParams }: Props) {
  const { organization } = useOrganization();
  return (
    <div className="flex flex-col flex-1 items-center justify-center h-[calc(100%-80px)]">
      {!organization ? <EmptyOrganization /> : <BoardList query={searchParams} />}
    </div>
  );
}
