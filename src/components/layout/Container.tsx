import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Container({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("max-w-6xl mx-auto px-4 sm:px-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}