import { notFound } from "next/navigation";
import { NewsForm, type NewsFormValues } from "@/components/admin/NewsForm";
import { query } from "@/lib/db";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await query<NewsFormValues>(
    `SELECT id, title, slug, excerpt, body, cover_image_url, author, published
     FROM news_posts WHERE id = $1`,
    [id]
  );
  const post = rows[0];
  if (!post) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-brand-purple-dark">Edit Post</h1>
      <div className="mt-6 rounded-lg border border-black/10 bg-white p-6">
        <NewsForm post={post} />
      </div>
    </div>
  );
}
