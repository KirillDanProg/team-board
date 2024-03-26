import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLORS = [
  "rgb(249 115 22)",
  "rgb(250 204 21)",
  "rgb(132 204 22)",
  "rgb(45 212 191)",
  "rgb(56 189 248)",
  "rgb(79 70 229)",
  "rgb(232 121 249)",
  "rgb(225 29 72)",
];
export function connectionIdToColor(connectionId: number) {
  return COLORS[connectionId % COLORS.length];
}
