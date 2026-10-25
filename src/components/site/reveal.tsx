import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={cn("rise-in", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export function HeroEnter({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={cn("rise-in", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
