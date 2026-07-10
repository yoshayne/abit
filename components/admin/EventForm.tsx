"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { Field, TextArea, TextInput } from "@/components/forms/fields";
import { FormError } from "@/components/forms/FormError";
import { ImageUpload } from "@/components/admin/ImageUpload";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toDatetimeLocal(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

export type EventFormValues = {
  id?: number;
  title: string;
  slug: string;
  description: string | null;
  location: string | null;
  starts_at: string | null;
  ends_at: string | null;
  image_url: string | null;
  capacity: number | null;
  published: boolean;
};

export function EventForm({ event }: { event?: EventFormValues }) {
  const router = useRouter();
  const [slugValue, setSlugValue] = useState(event?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(event));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      location: formData.get("location"),
      startsAt: formData.get("startsAt"),
      endsAt: formData.get("endsAt"),
      imageUrl: formData.get("imageUrl"),
      capacity: formData.get("capacity"),
      published: (formData.get("published") as string) === "on",
    };

    try {
      const res = await fetch(
        event ? `/api/admin/events/${event.id}` : "/api/admin/events",
        {
          method: event ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error ?? "Failed to save event");
      }
      router.push("/admin/events");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save event");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormError message={error} />

      <Field label="Title" htmlFor="event-title" required>
        <TextInput
          id="event-title"
          name="title"
          defaultValue={event?.title}
          required
          onChange={(e) => {
            if (!slugTouched) setSlugValue(slugify(e.target.value));
          }}
        />
      </Field>

      <Field label="Slug (used in the URL)" htmlFor="event-slug" required>
        <TextInput
          id="event-slug"
          name="slug"
          value={slugValue}
          onChange={(e) => {
            setSlugTouched(true);
            setSlugValue(slugify(e.target.value));
          }}
          required
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Starts" htmlFor="event-startsAt" required>
          <TextInput
            id="event-startsAt"
            name="startsAt"
            type="datetime-local"
            defaultValue={toDatetimeLocal(event?.starts_at)}
            required
          />
        </Field>
        <Field label="Ends" htmlFor="event-endsAt">
          <TextInput
            id="event-endsAt"
            name="endsAt"
            type="datetime-local"
            defaultValue={toDatetimeLocal(event?.ends_at)}
          />
        </Field>
        <Field label="Location" htmlFor="event-location">
          <TextInput id="event-location" name="location" defaultValue={event?.location ?? ""} />
        </Field>
        <Field label="Capacity" htmlFor="event-capacity">
          <TextInput
            id="event-capacity"
            name="capacity"
            type="number"
            min={1}
            defaultValue={event?.capacity ?? ""}
          />
        </Field>
      </div>

      <Field label="Description" htmlFor="event-description">
        <TextArea
          id="event-description"
          name="description"
          rows={6}
          defaultValue={event?.description ?? ""}
        />
      </Field>

      <div>
        <label className="block text-sm font-semibold text-brand-purple-dark">
          Cover Image
        </label>
        <div className="mt-1.5">
          <ImageUpload name="imageUrl" keyPrefix="events" defaultValue={event?.image_url} />
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-sm font-semibold text-brand-purple-dark">
        <input
          type="checkbox"
          name="published"
          defaultChecked={event?.published ?? false}
          className="h-4 w-4 rounded border-black/20 text-brand-purple focus:ring-brand-purple"
        />
        Published (visible on the public site)
      </label>

      <Button type="submit" variant="purple" shape="rounded" disabled={submitting}>
        {submitting ? "Saving…" : event ? "Save Changes" : "Create Event"}
      </Button>
    </form>
  );
}
