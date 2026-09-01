import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-surface-2 px-3 py-1 text-sm font-medium text-clay",
        className,
      )}
      {...props}
    />
  );
}
