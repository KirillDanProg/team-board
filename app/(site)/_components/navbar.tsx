"use client";

import { OrganizationSwitcher, UserButton, useOrganization } from "@clerk/nextjs";
import React from "react";
import SearchInput from "./search-input";
import InviteButton from "./invite-button";

const Navbar = () => {
  const { organization } = useOrganization();
  return (
    <div className="flex items-center gap-x-4  p-5">
      <div className="hidden lg:flex flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                alignItems: "center",
                justify: "center",
                width: "100%",
                maxWidth: "300px",
              },
              organizationSwitcherTrigger: {
                justifyContent: "space-between",
                padding: "6px",
                width: "100%",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              },
            },
          }}
        />
      </div>

      {organization && <InviteButton />}

      <UserButton />
    </div>
  );
};

export default Navbar;
