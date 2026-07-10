import { query } from "@/lib/db";
import { escapeHtml, handleFormSubmission } from "@/lib/formHandler";
import { rsvpSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: rsvpSchema,
    rateLimitKey: "rsvp",
    onValid: async (data) => {
      const events = await query<{ title: string }>(
        "SELECT title FROM events WHERE id = $1 AND published = true",
        [data.eventId]
      );
      if (events.length === 0) {
        throw new Error("Event not found");
      }
      await query(
        `INSERT INTO event_registrations (event_id, name, email, phone, party_size)
         VALUES ($1, $2, $3, $4, $5)`,
        [data.eventId, data.name, data.email, data.phone ?? null, data.partySize ?? 1]
      );
    },
    notification: (data) => ({
      subject: `New event RSVP: ${data.name}`,
      html: `
        <h2>New Event RSVP</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone ?? "—")}</p>
        <p><strong>Party size:</strong> ${escapeHtml(data.partySize ?? 1)}</p>
      `,
    }),
  });
}
