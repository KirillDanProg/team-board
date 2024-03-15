"use client";

import React from "react";
import { useOrganizationList } from "@clerk/nextjs";
import OrganizationItem from "./org-item";

const OrganizationsList = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: true,
    infinite: true,
  });
  console.log(userMemberships);
  if (!userMemberships.data?.length) {
    return null;
  }
  return (
    <ul className="flex flex-col gap-y-3">
      {userMemberships.data?.map(({ organization }) => (
        <OrganizationItem
          key={organization.id}
          id={organization.id}
          name={organization.name}
          imageUrl={organization.imageUrl}
        />
      ))}
    </ul>
  );
};

export default OrganizationsList;
