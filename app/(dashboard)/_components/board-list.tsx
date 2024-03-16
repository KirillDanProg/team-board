import React from "react";
import Image from "next/image";
import EmptyResult from "./empty-result";
import { Button } from "@/components/ui/button";

interface Props {
  query: {
    search?: string;
    favorites?: string;
  };
}
const BoardList = ({ query }: Props) => {
  const data = [];
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
        title="В избранных пусто"
        text="Попробуй добавить доску в избранное"
      />
    );
  }

  if (!data.length) {
    return (
      <EmptyResult
        img="/hand.svg"
        title="Создай свою первую доску"
        text="Начни с создания доски для своего проекта"
      >
        <Button size="lg">Создать доску</Button>
      </EmptyResult>
    );
  }
  return <div>доски</div>;
};

export default BoardList;
