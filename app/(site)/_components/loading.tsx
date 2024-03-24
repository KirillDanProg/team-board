"use client";

export default function Loading() {
  return (
    <>
      <div className="bg-neutral-100 w-[160px] h-8 rounded-md" />
      <div
        className="
    grid grid-cols-1
    sm:grid-cols-2
    md:grid-cols-4
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-5 mt-8 pb-10"
      >
        {Array(8)
          .fill(1)
          .map((el, index) => (
            <div
              key={index}
              className="aspect-[100/127] rounded-lg bg-neutral-100"
            />
          ))}
      </div>
    </>
  );
}
