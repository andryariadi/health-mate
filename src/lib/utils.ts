import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toastStyle = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
};

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));
