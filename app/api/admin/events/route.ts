import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { adminEventSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = adminEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const data = parsed.data;

  try {
    const rows = await query<{ id: number }>(
      `INSERT INTO events (title, slug, description, location, starts_at, ends_at, image_url, capacity, published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [
        data.title,
        data.slug,
        data.description ?? null,
        data.location ?? null,
        data.startsAt,
        data.endsAt || null,
        data.imageUrl || null,
        data.capacity ?? null,
        data.published,
      ]
    );
    return NextResponse.json({ ok: true, id: rows[0].id });
  } catch (err) {
    if (err instanceof Error && "code" in err && (err as { code: string }).code === "23505") {
      return NextResponse.json(
        { error: "An event with that slug already exists" },
        { status: 409 }
      );
    }
    console.error("Failed to create event:", err);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
