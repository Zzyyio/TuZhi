import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-transform duration-150 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none",
  {
    variants: {
      variant: {
        primary: "bg-forest text-forest-fg hover:bg-forest-dark",
        secondary: "bg-surface text-ink border border-line hover:bg-surface-2",
        ghost: "bg-transparent text-ink hover:bg-surface-2",
        danger: "bg-danger text-forest-fg",
        wechat: "bg-wechat text-wechat-fg hover:opacity-90",
      },
      size: {
        lg: "min-h-14 rounded-xl px-6 text-xl",
        md: "min-h-12 rounded-lg px-5 text-base",
        sm: "min-h-10 rounded-md px-4 text-sm",
        icon: "size-12 rounded-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: Props) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
