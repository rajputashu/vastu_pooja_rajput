import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-[background-color,color,transform] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-peacock text-ivory shadow-soft hover:bg-forest",
        secondary: "bg-marigold-soft text-forest ring-1 ring-gold/50 hover:bg-lotus-soft",
        inverse: "bg-ivory text-forest hover:bg-ivory-deep",
        quiet: "bg-transparent text-forest hover:bg-sage-soft",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, asChild = false, type = "button", ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant }), className);
  if (asChild) return <Slot className={classes} {...props} />;
  return <button className={classes} type={type} {...props} />;
}

export { buttonVariants };
