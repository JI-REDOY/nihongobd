import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({
  className,
  hoverable = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-border shadow-soft p-6",
        hoverable &&
          "hover:shadow-card hover:border-jp-red/20 cursor-pointer transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}