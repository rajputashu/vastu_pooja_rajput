import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { DemoConfirmation, DemoNotice, emailError, useDemoForm } from "@/components/forms/demo-form";
import { Field, SelectInput, TextArea, TextInput } from "@/components/forms/fields";

export function EnquiryForm({ initialService = "" }: { initialService?: string }) {
  const { status, errors, headingRef, onSubmit, reset } = useDemoForm();

  if (status === "done") {
    return (
      <DemoConfirmation headingRef={headingRef} title="This enquiry was not sent." onEdit={reset}>
        <p>
          The form checked your details in this browser only. Nothing was emailed, stored, or booked. When a real
          inbox is connected, this confirmation will change.
        </p>
        <p>Until then, use the placeholder email in the footer if you need to write to the studio.</p>
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
          const service = String(data.get("service") ?? "");
          const message = String(data.get("message") ?? "");
          if (name.trim().length < 2) next.name = "Enter your name.";
          const emailMessage = emailError(email);
          if (emailMessage) next.email = emailMessage;
          if (!service) next.service = "Choose a service.";
          if (message.trim().length < 12) next.message = "Add a short note — at least a sentence.";
          return next;
        })
      }
    >
      <DemoNotice>
        Demonstration form. Your enquiry is not sent or stored. Please do not include sensitive personal information.
      </DemoNotice>
      <Field label="Name" error={errors.name}>
        <TextInput name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} />
      </Field>
      <Field label="Email" error={errors.email}>
        <TextInput name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} />
      </Field>
      <Field label="Service" error={errors.service}>
        <SelectInput name="service" defaultValue={initialService} required aria-invalid={Boolean(errors.service)}>
          <option value="">Select a consultation</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
          <option value="unsure">Not sure yet</option>
        </SelectInput>
      </Field>
      <Field label="Message" hint="Tell us about the home or workplace. No payment details." error={errors.message}>
        <TextArea name="message" required aria-invalid={Boolean(errors.message)} />
      </Field>
      <Button type="submit" disabled={status === "checking"}>
        {status === "checking" ? "Checking…" : "Review enquiry"}
      </Button>
    </form>
  );
}
