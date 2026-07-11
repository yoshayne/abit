import { query } from "@/lib/db";
import { renderEmail } from "@/lib/emailTemplates";
import { syncNewsletterContact } from "@/lib/email";
import { escapeHtml, handleFormSubmission } from "@/lib/formHandler";
import { newsletterSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: newsletterSchema,
    rateLimitKey: "newsletter",
    rateLimit: { limit: 10, windowSeconds: 60 * 60 },
    onValid: async (data) => {
      await query(
        `INSERT INTO newsletter_subscribers (email, first_name)
         VALUES ($1, $2)
         ON CONFLICT (email) DO UPDATE SET first_name = COALESCE(EXCLUDED.first_name, newsletter_subscribers.first_name)`,
        [data.email, data.firstName ?? null]
      );
      // Fire-and-forget: syncs to a real Brevo list (auto-created on first
      // use) so the newsletter is actually sendable from Brevo, not just a
      // row in Postgres. Never throws, so it can't fail the submission.
      void syncNewsletterContact(data.email, data.firstName ?? null);
    },
    notification: (data) => ({
      subject: `New newsletter subscriber`,
      html: renderEmail({
        heading: "New Newsletter Subscriber",
        bodyHtml: `
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>First name:</strong> ${escapeHtml(data.firstName ?? "—")}</p>
        `,
      }),
    }),
    confirmation: (data) => ({
      to: data.email,
      toName: data.firstName ?? undefined,
      subject: "You're subscribed to the ABIT newsletter",
      html: renderEmail({
        heading: "You're subscribed!",
        bodyHtml: `
          <p>Hi${data.firstName ? ` ${escapeHtml(data.firstName)}` : ""},</p>
          <p>Thanks for subscribing to the ABIT Community Development Group
          newsletter. We'll keep you posted on programs, events, and ways to
          get involved.</p>
        `,
      }),
    }),
  });
}
