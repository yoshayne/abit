"use client";

import { Button } from "@/components/Button";
import { CheckboxField, Field, Select, TextArea, TextInput } from "@/components/forms/fields";
import { FormError } from "@/components/forms/FormError";
import { useFormSubmit } from "@/components/forms/useFormSubmit";

const INTERESTS = [
  "Life Skills",
  "Leadership Development",
  "Career & Entrepreneurship",
  "Community Engagement",
];

export function MentorForm() {
  const { handleSubmit, submitting, formError, fieldErrors } = useFormSubmit(
    "/api/mentor",
    "mentor"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormError message={formError} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="mentor-name" required error={fieldErrors.name?.[0]}>
          <TextInput id="mentor-name" name="name" required />
        </Field>
        <Field label="Email" htmlFor="mentor-email" required error={fieldErrors.email?.[0]}>
          <TextInput id="mentor-email" name="email" type="email" required />
        </Field>
        <Field label="Phone" htmlFor="mentor-phone" error={fieldErrors.phone?.[0]}>
          <TextInput id="mentor-phone" name="phone" type="tel" />
        </Field>
        <Field label="City" htmlFor="mentor-city" error={fieldErrors.city?.[0]}>
          <TextInput id="mentor-city" name="city" />
        </Field>
        <Field label="Occupation / employer" htmlFor="mentor-occupation" error={fieldErrors.occupation?.[0]}>
          <TextInput id="mentor-occupation" name="occupation" />
        </Field>
        <Field
          label="Area of interest"
          htmlFor="mentor-interest"
          required
          error={fieldErrors.interest?.[0]}
        >
          <Select id="mentor-interest" name="interest" required defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {INTERESTS.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Availability" htmlFor="mentor-availability" error={fieldErrors.availability?.[0]}>
        <TextInput
          id="mentor-availability"
          name="availability"
          placeholder="e.g. weekday evenings, one Saturday a month"
        />
      </Field>

      <Field label="Why do you want to mentor?" htmlFor="mentor-message" error={fieldErrors.message?.[0]}>
        <TextArea id="mentor-message" name="message" />
      </Field>

      <div className="space-y-3">
        <CheckboxField
          id="mentor-confirmAdult"
          name="confirmAdult"
          required
          error={fieldErrors.confirmAdult?.[0]}
        >
          I confirm that I am 18 years of age or older.
        </CheckboxField>
        <CheckboxField id="mentor-consent" name="consent" required error={fieldErrors.consent?.[0]}>
          I consent to a background check as part of the mentor application process.
        </CheckboxField>
      </div>

      <Button type="submit" variant="purple" shape="rounded" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Mentor Application"}
      </Button>
    </form>
  );
}
