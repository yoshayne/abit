import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { query } from "@/lib/db";

type EventRow = {
  id: number;
  title: string;
  slug: string;
  starts_at: string | null;
  published: boolean;
  registration_count: string;
};

export default async function AdminEventsPage() {
  const events = await query<EventRow>(`
    SELECT e.id, e.title, e.slug, e.starts_at, e.published,
           count(r.id) AS registration_count
    FROM events e
    LEFT JOIN event_registrations r ON r.event_id = e.id
    GROUP BY e.id
    ORDER BY e.starts_at DESC NULLS LAST
  `);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-brand-purple-dark">Events</h1>
        <Link
          href="/admin/events/new"
          className="rounded-lg bg-brand-purple px-4 py-2 text-sm font-semibold text-white hover:bg-brand-purple-dark"
        >
          New Event
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
                Starts
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wide text-brand-purple-dark/60">
                Status
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wide text-brand-purple-dark/60">
                RSVPs
              </th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-brand-purple-dark/60">
                  No events yet.
                </td>
              </tr>
            )}
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-2.5 font-medium text-brand-purple-dark">{event.title}</td>
                <td className="px-4 py-2.5 text-brand-purple-dark">
                  {event.starts_at
                    ? new Date(event.starts_at).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "—"}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      event.published
                        ? "bg-brand-teal/10 text-brand-teal"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {event.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-brand-purple-dark">{event.registration_count}</td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="text-xs font-semibold text-brand-purple hover:text-brand-purple-dark"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      endpoint={`/api/admin/events/${event.id}`}
                      confirmMessage={`Delete "${event.title}"? This also deletes its RSVPs.`}
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
