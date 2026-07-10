"use client";

import { Button } from "@/components/Button";
import { Field, TextArea, TextInput } from "@/components/forms/fields";
import { FormError } from "@/components/forms/FormError";
import { useFormSubmit } from "@/components/forms/useFormSubmit";

export function ContactForm() {
  const { handleSubmit, submitting, formError, fieldErrors } = useFormSubmit(
    "/api/contact",
    "contact"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormError message={formError} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" required error={fieldErrors.name?.[0]}>
          <TextInput id="contact-name" name="name" required />
        </Field>
        <Field label="Email" htmlFor="contact-email" required error={fieldErrors.email?.[0]}>
          <TextInput id="contact-email" name="email" type="email" required />
        </Field>
      </div>
      <Field label="Subject" htmlFor="contact-subject" error={fieldErrors.subject?.[0]}>
        <TextInput id="contact-subject" name="subject" />
      </Field>
      <Field label="Message" htmlFor="contact-message" required error={fieldErrors.message?.[0]}>
        <TextArea id="contact-message" name="message" rows={6} required />
      </Field>
      <Button type="submit" variant="purple" shape="rounded" disabled={submitting}>
        {submitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
