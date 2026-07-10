import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { adminNewsSchema } from "@/lib/validation";

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
      `UPDATE news_posts
       SET title = $1, slug = $2, excerpt = $3, body = $4, cover_image_url = $5,
           author = $6, published = $7,
           published_at = CASE WHEN $7 AND published_at IS NULL THEN now() ELSE published_at END
       WHERE id = $8
       RETURNING id`,
      [
        data.title,
        data.slug,
        data.excerpt ?? null,
        data.body ?? null,
        data.coverImageUrl || null,
        data.author ?? null,
        data.published,
        id,
      ]
    );
    if (rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof Error && "code" in err && (err as { code: string }).code === "23505") {
      return NextResponse.json(
        { error: "A post with that slug already exists" },
        { status: 409 }
      );
    }
    console.error("Failed to update news post:", err);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await query("DELETE FROM news_posts WHERE id = $1", [id]);
  return NextResponse.json({ ok: true });
}
