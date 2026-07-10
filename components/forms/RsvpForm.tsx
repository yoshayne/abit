"use client";

import { Button } from "@/components/Button";
import { Field, TextInput } from "@/components/forms/fields";
import { FormError } from "@/components/forms/FormError";
import { useFormSubmit } from "@/components/forms/useFormSubmit";

export function RsvpForm({ eventId }: { eventId: number }) {
  const { handleSubmit, submitting, formError, fieldErrors } = useFormSubmit(
    "/api/rsvp",
    "rsvp"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormError message={formError} />
      <input type="hidden" name="eventId" value={eventId} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="rsvp-name" required error={fieldErrors.name?.[0]}>
          <TextInput id="rsvp-name" name="name" required />
        </Field>
        <Field label="Email" htmlFor="rsvp-email" required error={fieldErrors.email?.[0]}>
          <TextInput id="rsvp-email" name="email" type="email" required />
        </Field>
        <Field label="Phone" htmlFor="rsvp-phone" error={fieldErrors.phone?.[0]}>
          <TextInput id="rsvp-phone" name="phone" type="tel" />
        </Field>
        <Field label="Party Size" htmlFor="rsvp-partySize" error={fieldErrors.partySize?.[0]}>
          <TextInput id="rsvp-partySize" name="partySize" type="number" min={1} defaultValue={1} />
        </Field>
      </div>
      <Button type="submit" variant="teal" shape="rounded" disabled={submitting}>
        {submitting ? "Submitting…" : "RSVP"}
      </Button>
    </form>
  );
}
