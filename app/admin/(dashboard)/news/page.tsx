import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { query } from "@/lib/db";

type NewsRow = {
  id: number;
  title: string;
  slug: string;
  author: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

export default async function AdminNewsListPage() {
  const posts = await query<NewsRow>(
    `SELECT id, title, slug, author, published, published_at, created_at
     FROM news_posts
     ORDER BY created_at DESC`
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-brand-purple-dark">News</h1>
        <Link
          href="/admin/news/new"
          className="rounded-lg bg-brand-purple px-4 py-2 text-sm font-semibold text-white hover:bg-brand-purple-dark"
        >
          New Post
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-black/10 bg-white">
        <table className="min-w-full divide-y divide-black/10 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wide text-brand-purple-dark/60">
                Title
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wide text-brand-purple-dark/60">
                Author
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wide text-brand-purple-dark/60">
                Status
              </th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-brand-purple-dark/60">
                  No news posts yet.
                </td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-2.5 font-medium text-brand-purple-dark">{post.title}</td>
                <td className="px-4 py-2.5 text-brand-purple-dark">{post.author ?? "—"}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      post.published
                        ? "bg-brand-teal/10 text-brand-teal"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/news/${post.id}`}
                      className="text-xs font-semibold text-brand-purple hover:text-brand-purple-dark"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      endpoint={`/api/admin/news/${post.id}`}
                      confirmMessage={`Delete "${post.title}"?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
