import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { query } from "@/lib/db";

export const metadata: Metadata = {
  title: "Events | ABIT Community Development Group",
  description: "Upcoming events from ABIT Community Development Group.",
};

type EventListRow = {
  id: number;
  title: string;
  slug: string;
  location: string | null;
  starts_at: string | null;
  image_url: string | null;
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await query<EventListRow>(
    `SELECT id, title, slug, location, starts_at, image_url
     FROM events
     WHERE published = true
     ORDER BY starts_at ASC`
  );

  return (
    <main>
      <PageHero
        eyebrow="EVENTS"
        title="Join Us."
        description="Workshops, community days, and celebrations — see what's coming up at ABIT."
      />
      <section className="py-20">
        <Container>
          {events.length === 0 ? (
            <p className="text-center text-brand-purple-dark/60">
              No upcoming events right now — check back soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`}>
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                    {event.image_url && (
                      <div className="relative aspect-[16/9] w-full">
                        <Image
                          src={event.image_url}
                          alt={event.title}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {event.starts_at && (
                        <p className="text-sm font-bold text-brand-teal">
                          {new Date(event.starts_at).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      )}
                      <h2 className="mt-1 font-display text-lg font-bold text-brand-purple-dark">
                        {event.title}
                      </h2>
                      {event.location && (
                        <p className="mt-1 text-sm text-brand-purple-dark/60">
                          {event.location}
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
