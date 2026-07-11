import { query } from "@/lib/db";
import { renderEmail } from "@/lib/emailTemplates";
import { escapeHtml, handleFormSubmission } from "@/lib/formHandler";
import { rsvpSchema } from "@/lib/validation";

export async function POST(request: Request) {
  // Set inside onValid once the event is looked up, then read by the
  // notification/confirmation callbacks that run right after it.
  let eventTitle = "";

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
      eventTitle = events[0].title;
      await query(
        `INSERT INTO event_registrations (event_id, name, email, phone, party_size)
         VALUES ($1, $2, $3, $4, $5)`,
        [data.eventId, data.name, data.email, data.phone ?? null, data.partySize ?? 1]
      );
    },
    notification: (data) => ({
      subject: `New event RSVP: ${data.name}`,
      html: renderEmail({
        heading: "New Event RSVP",
        bodyHtml: `
          <p><strong>Event:</strong> ${escapeHtml(eventTitle || "—")}</p>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone ?? "—")}</p>
          <p><strong>Party size:</strong> ${escapeHtml(data.partySize ?? 1)}</p>
        `,
      }),
      replyTo: data.email,
    }),
    confirmation: (data) => ({
      to: data.email,
      toName: data.name,
      subject: eventTitle ? `You're registered for ${eventTitle}` : "You're registered",
      html: renderEmail({
        heading: "You're registered!",
        bodyHtml: `
          <p>Hi ${escapeHtml(data.name)},</p>
          <p>You're confirmed for <strong>${escapeHtml(eventTitle)}</strong>${
            Number(data.partySize ?? 1) > 1 ? ` (party of ${escapeHtml(data.partySize)})` : ""
          }. We look forward to seeing you!</p>
        `,
      }),
    }),
  });
}
