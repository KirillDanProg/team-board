"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const font = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});

const OrganizationSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div className="hidden lg:flex flex-col space-y-6  pl-5 pt-5">
      <Link href="/">
        <div className="flex items-center uppercase ">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className={cn("font-semibold text-l", font.className)}>Team-Board</span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              alignItems: "center",
              justify: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
            },
          },
        }}
      />
      <div className="flex flex-col space-y-1 w-full">
        <Button
          asChild
          className="font-normal w-full justify-start"
          size={"lg"}
          variant={favorites ? "ghost" : "secondary"}
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4  mr-2" />
            Проекты
          </Link>
        </Button>
        <Button
          asChild
          className="font-normal w-full justify-start"
          size={"lg"}
          variant={favorites ? "secondary" : "ghost"}
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className="h-4 w-4 mr-2" />
            Избранные
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrganizationSidebar;
