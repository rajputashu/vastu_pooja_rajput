import { Button } from "@/components/ui/button";
import { DemoConfirmation, DemoNotice, emailError, useDemoForm } from "@/components/forms/demo-form";
import { Field, TextArea, TextInput } from "@/components/forms/fields";

export function ContactForm() {
  const { status, errors, headingRef, onSubmit, reset } = useDemoForm();

  if (status === "done") {
    return (
      <DemoConfirmation headingRef={headingRef} title="This message was not sent." onEdit={reset}>
        <p>
          Nothing left this browser. There is no email integration in this version, so the studio will not see what
          you typed.
        </p>
      </DemoConfirmation>
    );
  }

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={(event) =>
        onSubmit(event, (data) => {
          const next: Record<string, string> = {};
          const name = String(data.get("name") ?? "");
          const email = String(data.get("email") ?? "");
          const message = String(data.get("message") ?? "");
          if (name.trim().length < 2) next.name = "Enter your name.";
          const emailMessage = emailError(email);
          if (emailMessage) next.email = emailMessage;
          if (message.trim().length < 12) next.message = "Write at least a sentence so the note is useful.";
          return next;
        })
      }
    >
      <DemoNotice>Demonstration only. Submitting does not send an email or save a message.</DemoNotice>
      <Field label="Name" error={errors.name}>
        <TextInput name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} />
      </Field>
      <Field label="Email" error={errors.email}>
        <TextInput name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} />
      </Field>
      <Field label="Message" error={errors.message}>
        <TextArea name="message" required aria-invalid={Boolean(errors.message)} />
      </Field>
      <Button type="submit" disabled={status === "checking"}>
        {status === "checking" ? "Checking…" : "Review message"}
      </Button>
    </form>
  );
}
