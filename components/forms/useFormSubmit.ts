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
    const formData = new FormData(form);
    const payload: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      if (form.elements.namedItem(key) instanceof HTMLInputElement) {
        const input = form.elements.namedItem(key) as HTMLInputElement;
        if (input.type === "checkbox") {
          payload[key] = input.checked;
          return;
        }
      }
      payload[key] = value;
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
