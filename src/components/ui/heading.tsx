import { cn } from "@/lib/utils";
import React from "react";

const sizes = {
  "h1": "text-3xl",
  "h2": "text-2xl",
  "h3": "text-xl",
  "h4": "text-base"
};

export type HeadingParams = {
  size: "h1"|"h2"|"h3"|"h4"
} & React.PropsWithChildren
export default function Headine({ size, children }: HeadingParams) {
  const textSize = sizes[size];
  return React.createElement(
    size,
    { className: cn("font-serif text-darkgray", textSize) },
    children
  );
}
