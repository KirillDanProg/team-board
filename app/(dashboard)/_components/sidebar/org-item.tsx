"use client";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { isAscii } from "buffer";
import Hint from "@/app/components/hint";

interface Props {
  id: string;
  name: string;
  imageUrl: string;
}
const OrganizationItem = ({ id, imageUrl, name }: Props) => {
  const { setActive } = useOrganizationList();
  const { organization } = useOrganization();
  const isActive = organization && organization.id === id;

  const onClickHandler = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };
  return (
    <li key={id} className="aspect-square relative">
      <Hint label={name} side="right" sideOffset={16} align="start" alignOffset={8}>
        <Image
          fill
          alt="organization"
          src={imageUrl}
          onClick={onClickHandler}
          className={cn(
            "w-[60px] rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </li>
  );
};

export default OrganizationItem;
