"use client";

export default function Info() {
  return (
    <div className="absolute top-2 left-2 flex items-center justify-center px-2 bg-white h-12 rounded-md shadow-md">
      Todo: some board information
    </div>
  );
}

Info.Skeleton = function InfoSekeleton() {
  return (
    <div className="absolute top-2 left-2 flex items-center justify-center px-2 bg-white h-12 w-[300px] rounded-md shadow-md" />
  );
};
