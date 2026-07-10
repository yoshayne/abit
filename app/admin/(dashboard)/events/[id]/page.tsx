import { notFound } from "next/navigation";
import { EventForm, type EventFormValues } from "@/components/admin/EventForm";
import { query } from "@/lib/db";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await query<EventFormValues>(
    `SELECT id, title, slug, description, location, starts_at, ends_at,
            image_url, capacity, published
     FROM events WHERE id = $1`,
    [id]
  );
  const event = rows[0];
  if (!event) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-brand-purple-dark">
        Edit Event
      </h1>
      <div className="mt-6 rounded-lg border border-black/10 bg-white p-6">
        <EventForm event={event} />
      </div>
    </div>
  );
}
