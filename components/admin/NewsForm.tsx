"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/Button";
import { Field, TextArea, TextInput } from "@/components/forms/fields";
import { FormError } from "@/components/forms/FormError";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export type NewsFormValues = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  cover_image_url: string | null;
  author: string | null;
  published: boolean;
};

export function NewsForm({ post }: { post?: NewsFormValues }) {
  const router = useRouter();
  const [slugValue, setSlugValue] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
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
      excerpt: formData.get("excerpt"),
      body: formData.get("body"),
      coverImageUrl: formData.get("coverImageUrl"),
      author: formData.get("author"),
      published: (formData.get("published") as string) === "on",
    };

    try {
      const res = await fetch(post ? `/api/admin/news/${post.id}` : "/api/admin/news", {
        method: post ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error ?? "Failed to save post");
      }
      router.push("/admin/news");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormError message={error} />

      <Field label="Title" htmlFor="news-title" required>
        <TextInput
          id="news-title"
          name="title"
          defaultValue={post?.title}
          required
          onChange={(e) => {
            if (!slugTouched) setSlugValue(slugify(e.target.value));
          }}
        />
      </Field>

      <Field label="Slug (used in the URL)" htmlFor="news-slug" required>
        <TextInput
          id="news-slug"
          name="slug"
          value={slugValue}
          onChange={(e) => {
            setSlugTouched(true);
            setSlugValue(slugify(e.target.value));
          }}
          required
        />
      </Field>

      <Field label="Author" htmlFor="news-author">
        <TextInput id="news-author" name="author" defaultValue={post?.author ?? ""} />
      </Field>

      <Field label="Excerpt (short summary shown on the news list)" htmlFor="news-excerpt">
        <TextArea id="news-excerpt" name="excerpt" rows={3} defaultValue={post?.excerpt ?? ""} />
      </Field>

      <Field label="Body" htmlFor="news-body">
        <TextArea id="news-body" name="body" rows={12} defaultValue={post?.body ?? ""} />
      </Field>

      <div>
        <label className="block text-sm font-semibold text-brand-purple-dark">
          Cover Image
        </label>
        <div className="mt-1.5">
          <ImageUpload name="coverImageUrl" keyPrefix="news" defaultValue={post?.cover_image_url} />
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-sm font-semibold text-brand-purple-dark">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published ?? false}
          className="h-4 w-4 rounded border-black/20 text-brand-purple focus:ring-brand-purple"
        />
        Published (visible on the public site)
      </label>

      <Button type="submit" variant="purple" shape="rounded" disabled={submitting}>
        {submitting ? "Saving…" : post ? "Save Changes" : "Create Post"}
      </Button>
    </form>
  );
}
