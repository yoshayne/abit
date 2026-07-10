"use client";

import { type FormEvent, useState } from "react";

export function NewsletterForm({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error" | "rate-limited">(
    "idle"
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.status === 429) {
        setStatus("rate-limited");
        return;
      }
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className={`text-sm font-medium text-brand-teal ${className}`}>
        You&apos;re subscribed — thank you!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex overflow-hidden rounded-lg">
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          aria-label="Email address"
          className="w-0 min-w-0 flex-1 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="shrink-0 bg-brand-teal px-4 text-xs font-bold tracking-wide text-white hover:bg-brand-teal/90 disabled:opacity-60"
        >
          {status === "submitting" ? "…" : "SUBSCRIBE"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-300">
          Something went wrong. Please try again.
        </p>
      )}
      {status === "rate-limited" && (
        <p className="mt-2 text-xs text-red-300">
          Too many attempts. Please try again later.
        </p>
      )}
    </form>
  );
}
