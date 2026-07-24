"use client";

import { Button } from "@/components/Button";
import { CheckboxField, Field, TextArea, TextInput } from "@/components/forms/fields";
import { FormError } from "@/components/forms/FormError";
import { useFormSubmit } from "@/components/forms/useFormSubmit";

export function EnrollForm() {
  const { handleSubmit, submitting, formError, fieldErrors } = useFormSubmit(
    "/api/enroll",
    "enroll"
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormError message={formError} />

      <div>
        <h3 className="text-sm font-bold tracking-widest text-brand-purple">
          STUDENT INFORMATION
        </h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field
            label="Student name"
            htmlFor="enroll-studentName"
            required
            error={fieldErrors.studentName?.[0]}
          >
            <TextInput id="enroll-studentName" name="studentName" required />
          </Field>
          <Field label="Age" htmlFor="enroll-studentAge" error={fieldErrors.studentAge?.[0]}>
            <TextInput id="enroll-studentAge" name="studentAge" type="number" min={4} max={19} />
          </Field>
          <Field label="Grade" htmlFor="enroll-grade" error={fieldErrors.grade?.[0]}>
            <TextInput id="enroll-grade" name="grade" />
          </Field>
          <Field label="School" htmlFor="enroll-school" error={fieldErrors.school?.[0]}>
            <TextInput id="enroll-school" name="school" />
          </Field>
          <Field label="City" htmlFor="enroll-city" error={fieldErrors.city?.[0]}>
            <TextInput id="enroll-city" name="city" />
          </Field>
          <Field
            label="Program(s) of interest"
            htmlFor="enroll-programs"
            error={fieldErrors.programs?.[0]}
          >
            <TextInput
              id="enroll-programs"
              name="programs"
              placeholder="e.g. Girlfriends Leadership Academy"
            />
          </Field>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold tracking-widest text-brand-purple">
          PARENT / GUARDIAN INFORMATION
        </h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field
            label="Parent/guardian name"
            htmlFor="enroll-guardianName"
            required
            error={fieldErrors.guardianName?.[0]}
          >
            <TextInput id="enroll-guardianName" name="guardianName" required />
          </Field>
          <Field
            label="Parent/guardian email"
            htmlFor="enroll-guardianEmail"
            required
            error={fieldErrors.guardianEmail?.[0]}
          >
            <TextInput id="enroll-guardianEmail" name="guardianEmail" type="email" required />
          </Field>
          <Field
            label="Parent/guardian phone"
            htmlFor="enroll-guardianPhone"
            error={fieldErrors.guardianPhone?.[0]}
          >
            <TextInput id="enroll-guardianPhone" name="guardianPhone" type="tel" />
          </Field>
        </div>
      </div>

      <Field
        label="Anything else we should know? (accommodations, how you heard about ABIT, etc.)"
        htmlFor="enroll-notes"
        error={fieldErrors.notes?.[0]}
      >
        <TextArea id="enroll-notes" name="notes" />
      </Field>

      <p className="text-xs text-brand-purple-dark/60">
        We only collect what we need to enroll your daughter in ABIT
        programs. Her information is stored securely and is never shared or
        emailed outside our team. See our{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>{" "}
        for details.
      </p>

      <CheckboxField id="enroll-consent" name="consent" required error={fieldErrors.consent?.[0]}>
        I am this student&apos;s parent or legal guardian, and I consent to
        her enrollment in ABIT Community Development Group programs.
      </CheckboxField>

      <Button type="submit" variant="teal" shape="rounded" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Enrollment"}
      </Button>
    </form>
  );
}
