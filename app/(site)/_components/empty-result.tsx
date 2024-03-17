import React from "react";
import Image from "next/image";

interface Props {
  img: string;
  title: string;
  text: string;
  children?: React.ReactNode;
}
const EmptyResult = ({ children, title, img, text }: Props) => {
  return (
    <div className="h-full flex flex-col items-center justify-center ">
      <Image src={img} width={200} height={200} alt="Empty" />
      <h2 className="text-2xl semibold mt-6">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
};

export default EmptyResult;
