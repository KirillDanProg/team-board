"use client";

import {
  Circle,
  MousePointer2,
  Pencil,
  Square,
  StickyNote,
  Type,
  Redo2,
  Undo2,
} from "lucide-react";
import ToolButton from "./tool-button";

export default function Toolbar() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2  flex flex-col gap-y-4  p-1">
      <div className="flex flex-col gap-y-2  bg-white rounded-md shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          isDisabled={false}
          isActive={false}
          action={() => {}}
        />
        <ToolButton
          label="Pencil"
          icon={Pencil}
          isDisabled={false}
          isActive={false}
          action={() => {}}
        />
        <ToolButton
          label="Sticky note"
          icon={StickyNote}
          isDisabled={false}
          isActive={false}
          action={() => {}}
        />
        <ToolButton
          label="Text"
          icon={Type}
          isDisabled={false}
          isActive={false}
          action={() => {}}
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          isDisabled={false}
          isActive={false}
          action={() => {}}
        />
        <ToolButton
          label="Ellips"
          icon={Circle}
          isDisabled={false}
          isActive={false}
          action={() => {}}
        />
      </div>
      <div className="flex flex-col gap-y-2 px-2  bg-white rounded-md shadow-md">
        <ToolButton
          label="Undo"
          icon={Undo2}
          isDisabled={true}
          action={() => {}}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          isDisabled={true}
          action={() => {}}
        />
      </div>
    </div>
  );
}

export function ToolbarSkeleton() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 h-[360px] w-12  bg-white rounded-md shadow-md" />
  );
}
