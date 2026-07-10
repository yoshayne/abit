"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

type FieldErrors = Record<string, string[] | undefined>;

export function useFormSubmit(endpoint: string, thankYouType: string) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    const form = event.currentTarget;
    const payload: Record<string, unknown> = {};
    // Iterate form controls directly rather than FormData — unchecked
    // checkboxes are omitted from FormData entirely, which would leave
    // required consent fields missing from the payload instead of `false`.
    Array.from(form.elements).forEach((el) => {
      if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)) {
        return;
      }
      if (!el.name) return;
      if (el instanceof HTMLInputElement && el.type === "checkbox") {
        payload[el.name] = el.checked;
        return;
      }
      payload[el.name] = el.value;
    });

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 429) {
        setFormError(
          "You've submitted this form too many times recently. Please try again later."
        );
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.fieldErrors) {
          setFieldErrors(data.fieldErrors);
          setFormError("Please fix the highlighted fields and try again.");
        } else {
          setFormError(
            data?.error ?? "Something went wrong. Please try again."
          );
        }
        return;
      }

      router.push(`/thank-you?type=${thankYouType}`);
    } catch {
      setFormError(
        "Something went wrong connecting to the server. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return { handleSubmit, submitting, formError, fieldErrors };
}
