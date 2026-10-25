import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "checking" | "done";

export function useDemoForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "done") headingRef.current?.focus();
  }, [status]);

  function onSubmit(event: FormEvent<HTMLFormElement>, validate: (data: FormData) => Record<string, string>) {
    event.preventDefault();
    const nextErrors = validate(new FormData(event.currentTarget));
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }
    setStatus("checking");
    window.setTimeout(() => setStatus("done"), 350);
  }

  function reset() {
    setStatus("idle");
    setErrors({});
  }

  return { status, errors, headingRef, onSubmit, reset };
}

export function emailError(value: string) {
  if (!value.trim()) return "Enter an email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter an email that looks like name@example.com.";
  return "";
}

export function DemoNotice({ children }: { children: ReactNode }) {
  return <p className="rounded-md bg-lavender/70 px-4 py-3 text-sm text-forest">{children}</p>;
}

export function DemoConfirmation({
  headingRef,
  title,
  children,
  onEdit,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  title: string;
  children: ReactNode;
  onEdit: () => void;
}) {
  return (
    <div className="rounded-lg border border-line bg-paper p-6 md:p-8">
      <h2 ref={headingRef} tabIndex={-1} className="font-serif text-3xl text-forest outline-none">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-muted">{children}</div>
      <Button className="mt-6" variant="secondary" onClick={onEdit}>
        Edit the form
      </Button>
    </div>
  );
}
