"use client";

import { Button } from "@/components/Button";
import { Field, Select, TextArea, TextInput } from "@/components/forms/fields";
import { FormError } from "@/components/forms/FormError";
import { useFormSubmit } from "@/components/forms/useFormSubmit";

const PARTNER_TYPES = ["School", "Business", "Church", "Sponsor", "Other"];

export function PartnerForm() {
  const { handleSubmit, submitting, formError, fieldErrors } = useFormSubmit(
    "/api/partner",
    "partner"
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormError message={formError} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Organization" htmlFor="partner-org" required error={fieldErrors.org?.[0]}>
          <TextInput id="partner-org" name="org" required />
        </Field>
        <Field
          label="Contact name"
          htmlFor="partner-contactName"
          required
          error={fieldErrors.contactName?.[0]}
        >
          <TextInput id="partner-contactName" name="contactName" required />
        </Field>
        <Field label="Email" htmlFor="partner-email" required error={fieldErrors.email?.[0]}>
          <TextInput id="partner-email" name="email" type="email" required />
        </Field>
        <Field label="Phone" htmlFor="partner-phone" error={fieldErrors.phone?.[0]}>
          <TextInput id="partner-phone" name="phone" type="tel" />
        </Field>
        <Field label="Partner type" htmlFor="partner-partnerType" error={fieldErrors.partnerType?.[0]}>
          <Select id="partner-partnerType" name="partnerType" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {PARTNER_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Message" htmlFor="partner-message" error={fieldErrors.message?.[0]}>
        <TextArea id="partner-message" name="message" />
      </Field>
      <Button type="submit" variant="purple" shape="rounded" disabled={submitting}>
        {submitting ? "Submitting…" : "Send Partner Inquiry"}
      </Button>
    </form>
  );
}
