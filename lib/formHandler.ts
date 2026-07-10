import { NextResponse } from "next/server";
import type { ZodSchema } from "zod";
import { sendNotificationEmail } from "./email";
import { checkRateLimit, getClientIp } from "./rateLimit";

export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char] as string
  );
}

export async function handleFormSubmission<T>({
  request,
  schema,
  rateLimitKey,
  rateLimit = { limit: 5, windowSeconds: 60 * 60 },
  onValid,
  notification,
}: {
  request: Request;
  schema: ZodSchema<T>;
  rateLimitKey: string;
  rateLimit?: { limit: number; windowSeconds: number };
  onValid: (data: T) => Promise<void>;
  notification: (data: T) => { subject: string; html: string };
}) {
  const ip = getClientIp(request);
  const allowed = await checkRateLimit(
    `${rateLimitKey}:${ip}`,
    rateLimit.limit,
    rateLimit.windowSeconds
  );
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    await onValid(parsed.data);
  } catch (err) {
    console.error(`${rateLimitKey} submission failed:`, err);
    return NextResponse.json(
      { error: "Failed to save your submission. Please try again." },
      { status: 500 }
    );
  }

  const { subject, html } = notification(parsed.data);
  void sendNotificationEmail({ subject, html });

  return NextResponse.json({ ok: true });
}
