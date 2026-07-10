"use client";

import { Button } from "@/components/Button";
import { Field, Select, TextArea, TextInput } from "@/components/forms/fields";
import { FormError } from "@/components/forms/FormError";
import { useFormSubmit } from "@/components/forms/useFormSubmit";

export function VolunteerForm() {
  const { handleSubmit, submitting, formError, fieldErrors } = useFormSubmit(
    "/api/volunteer",
    "volunteer"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormError message={formError} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="volunteer-name" required error={fieldErrors.name?.[0]}>
          <TextInput id="volunteer-name" name="name" required />
        </Field>
        <Field label="Email" htmlFor="volunteer-email" required error={fieldErrors.email?.[0]}>
          <TextInput id="volunteer-email" name="email" type="email" required />
        </Field>
        <Field label="Phone" htmlFor="volunteer-phone" error={fieldErrors.phone?.[0]}>
          <TextInput id="volunteer-phone" name="phone" type="tel" />
        </Field>
        <Field label="Commitment" htmlFor="volunteer-commitment" error={fieldErrors.commitment?.[0]}>
          <Select id="volunteer-commitment" name="commitment" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            <option value="One-time">One-time</option>
            <option value="Ongoing">Ongoing</option>
          </Select>
        </Field>
      </div>
      <Field label="Availability" htmlFor="volunteer-availability" error={fieldErrors.availability?.[0]}>
        <TextInput id="volunteer-availability" name="availability" />
      </Field>
      <Field label="What are you interested in helping with?" htmlFor="volunteer-interests" error={fieldErrors.interests?.[0]}>
        <TextArea id="volunteer-interests" name="interests" />
      </Field>
      <Button type="submit" variant="teal" shape="rounded" disabled={submitting}>
        {submitting ? "Submitting…" : "Sign Up to Volunteer"}
      </Button>
    </form>
  );
}
