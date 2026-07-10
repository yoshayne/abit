import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { RsvpForm } from "@/components/forms/RsvpForm";
import { IconPin } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

type EventDetail = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  location: string | null;
  starts_at: string | null;
  ends_at: string | null;
  image_url: string | null;
  capacity: number | null;
};

async function getEvent(slug: string) {
  const rows = await query<EventDetail>(
    "SELECT * FROM events WHERE slug = $1 AND published = true",
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
  const event = await getEvent(slug);
  if (!event) return { title: "Event Not Found | ABIT Community Development Group" };
  return {
    title: `${event.title} | ABIT Community Development Group`,
    description: event.description ?? undefined,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const dateLabel = event.starts_at
    ? new Date(event.starts_at).toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : null;

  return (
    <main>
      <PageHero eyebrow="EVENT" title={event.title} description={dateLabel ?? undefined} />
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {event.image_url && (
              <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src={event.image_url}
                  alt={event.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            )}
            {event.location && (
              <p className="flex items-center gap-2 text-brand-purple-dark/70">
                <IconPin className="h-4 w-4 text-brand-teal" />
                {event.location}
              </p>
            )}
            {event.description && (
              <p className="mt-4 whitespace-pre-line text-brand-purple-dark/80">
                {event.description}
              </p>
            )}
          </div>

          <div>
            <Card className="p-6">
              <h2 className="font-display text-lg font-bold text-brand-purple-dark">RSVP</h2>
              <div className="mt-4">
                <RsvpForm eventId={event.id} />
              </div>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}
