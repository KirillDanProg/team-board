import React from "react";
import EmptyResult from "./empty-result";
import { useQuery } from "convex/react";
import EmptyBoards from "./empty-boards";
import { api } from "@/convex/_generated/api";
import BoardCard from "./board-card";
import NewBoardButton from "./new-board-button";
import Loading from "./loading";

interface Props {
  query: {
    search?: string;
    favorites?: string;
  };
  orgId: string;
}
const BoardList = ({ query, orgId }: Props) => {
  const data = useQuery(api.boards.getBoards, { orgId, ...query });
  if (data === undefined) {
    return <Loading />;
  }
  if (!data.length && query.search) {
    return (
      <EmptyResult
        img="/empty-search.svg"
        title="По запросу ничего не найдено"
        text="Попробуй другой запрос"
      />
    );
  }

  if (!data.length && query.favorites) {
    return (
      <EmptyResult
        img="/empty-favs.svg"
        title="Нет избранных бордов"
        text="Попробуй добавить борд в избранное"
      />
    );
  }

  if (!data.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className="text-2xl">
        {query.favorites ? "Избранные борды" : "Борды"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} disabled={false} />
        {data?.map(
          ({
            _id,
            title,
            authorId,
            authorName,
            imageUrl,
            orgId,
            _creationTime,
            isFavorite,
          }) => (
            <BoardCard
              key={_id}
              id={_id}
              title={title}
              isFavorite={isFavorite}
              imageUrl={imageUrl}
              orgId={orgId}
              authorId={authorId}
              authorName={authorName}
              createdAt={_creationTime}
            />
          )
        )}
      </div>
    </div>
  );
};

export default BoardList;
