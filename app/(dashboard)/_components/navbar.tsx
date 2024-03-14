"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center gap-x-4 bg-slate-600 p-5">
      <div className="hidden lg:flex flex-1 bg-slate-900">search</div>
      <UserButton />
    </div>
  );
};

export default Navbar;
