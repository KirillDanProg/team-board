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
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrganization />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
}
