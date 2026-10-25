import { cn } from "@/lib/cn";

type PhotoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export function Photo({ src, alt, width, height, className, priority = false }: PhotoProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn("bg-sage-soft object-cover", className)}
    />
  );
}
