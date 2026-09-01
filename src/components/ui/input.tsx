import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      suppressHydrationWarning
      className={cn(
        "min-h-12 w-full rounded-lg border border-line bg-surface px-4 text-base text-ink placeholder:text-subtle",
        className,
      )}
      {...props}
    />
  );
}
