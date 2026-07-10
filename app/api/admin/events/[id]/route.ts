import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { adminEventSchema } from "@/lib/validation";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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
      `UPDATE events
       SET title = $1, slug = $2, description = $3, location = $4, starts_at = $5,
           ends_at = $6, image_url = $7, capacity = $8, published = $9
       WHERE id = $10
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
        id,
      ]
    );
    if (rows.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof Error && "code" in err && (err as { code: string }).code === "23505") {
      return NextResponse.json(
        { error: "An event with that slug already exists" },
        { status: 409 }
      );
    }
    console.error("Failed to update event:", err);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await query("DELETE FROM events WHERE id = $1", [id]);
  return NextResponse.json({ ok: true });
}
