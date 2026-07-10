import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

type NewsDetail = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  cover_image_url: string | null;
  author: string | null;
  published_at: string | null;
};

async function getPost(slug: string) {
  const rows = await query<NewsDetail>(
    "SELECT * FROM news_posts WHERE slug = $1 AND published = true",
    [slug]
  );
  return rows[0] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found | ABIT Community Development Group" };
  return {
    title: `${post.title} | ABIT Community Development Group`,
    description: post.excerpt ?? undefined,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const dateLabel = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", { dateStyle: "long" })
    : null;
  const byline = [dateLabel, post.author ? `By ${post.author}` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <main>
      <PageHero eyebrow="NEWS" title={post.title} description={byline || undefined} />
      <section className="py-20">
        <Container className="max-w-3xl">
          {post.cover_image_url && (
            <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}
          {post.body && (
            <div className="whitespace-pre-line text-brand-purple-dark/80">{post.body}</div>
          )}
        </Container>
      </section>
    </main>
  );
}
