"use client";

export default function Toolbar() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2  flex flex-col gap-y-4  ">
      <div className="flex flex-col gap-y-2 px-2  bg-white rounded-md shadow-md">
        <div>tool 1</div>
        <div>tool 2</div>
        <div>tool 3</div>
      </div>
      <div className="flex flex-col gap-y-2 px-2  bg-white rounded-md shadow-md">
        <div>Undo</div>
        <div>Redo</div>
      </div>
    </div>
  );
}

Toolbar.Skeleton = function ToolbarSekeleton() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 h-[360px] w-12  bg-white rounded-md shadow-md" />
  );
};
