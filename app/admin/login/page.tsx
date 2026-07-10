"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, Suspense, useState } from "react";
import { Button } from "@/components/Button";
import { Field, TextInput } from "@/components/forms/fields";
import { FormError } from "@/components/forms/FormError";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 429) {
        setError("Too many login attempts. Please try again later.");
        return;
      }
      if (!res.ok) {
        setError("Invalid email or password.");
        return;
      }

      const next = searchParams.get("next") || "/admin";
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-purple to-brand-purple-dark px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex justify-center">
          <Image src="/logo.png" alt="ABIT" width={120} height={60} unoptimized className="h-12 w-auto" />
        </div>
        <h1 className="mt-6 text-center font-display text-xl font-bold text-brand-purple-dark">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <FormError message={error} />
          <Field label="Email" htmlFor="login-email" required>
            <TextInput id="login-email" name="email" type="email" required autoFocus />
          </Field>
          <Field label="Password" htmlFor="login-password" required>
            <TextInput id="login-password" name="password" type="password" required />
          </Field>
          <Button type="submit" variant="purple" shape="rounded" disabled={submitting} className="w-full">
            {submitting ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}
