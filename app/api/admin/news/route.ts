import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { adminNewsSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = adminNewsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const data = parsed.data;

  try {
    const rows = await query<{ id: number }>(
      `INSERT INTO news_posts (title, slug, excerpt, body, cover_image_url, author, published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, CASE WHEN $7 THEN now() ELSE NULL END)
       RETURNING id`,
      [
        data.title,
        data.slug,
        data.excerpt ?? null,
        data.body ?? null,
        data.coverImageUrl || null,
        data.author ?? null,
        data.published,
      ]
    );
    return NextResponse.json({ ok: true, id: rows[0].id });
  } catch (err) {
    if (err instanceof Error && "code" in err && (err as { code: string }).code === "23505") {
      return NextResponse.json(
        { error: "A post with that slug already exists" },
        { status: 409 }
      );
    }
    console.error("Failed to create news post:", err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
