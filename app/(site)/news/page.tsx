import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { query } from "@/lib/db";

export const metadata: Metadata = {
  title: "News | ABIT Community Development Group",
  description: "Updates and stories from ABIT Community Development Group.",
};

type NewsListRow = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  author: string | null;
  published_at: string | null;
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const posts = await query<NewsListRow>(
    `SELECT id, title, slug, excerpt, cover_image_url, author, published_at
     FROM news_posts
     WHERE published = true
     ORDER BY published_at DESC NULLS LAST`
  );

  return (
    <main>
      <PageHero
        eyebrow="NEWS"
        title="Stories & Updates."
        description="What's happening at ABIT Community Development Group."
      />
      <section className="py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-center text-brand-purple-dark/60">
              No news posts yet — check back soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/news/${post.slug}`}>
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                    {post.cover_image_url && (
                      <div className="relative aspect-[16/9] w-full">
                        <Image
                          src={post.cover_image_url}
                          alt={post.title}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {post.published_at && (
                        <p className="text-sm font-bold text-brand-teal">
                          {new Date(post.published_at).toLocaleDateString("en-US", {
                            dateStyle: "medium",
                          })}
                        </p>
                      )}
                      <h2 className="mt-1 font-display text-lg font-bold text-brand-purple-dark">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-2 line-clamp-3 text-sm text-brand-purple-dark/70">
                          {post.excerpt}
                        </p>
                      )}
                      {post.author && (
                        <p className="mt-3 text-xs font-semibold text-brand-purple-dark/50">
                          By {post.author}
                        </p>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
