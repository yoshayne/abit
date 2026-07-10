import { query } from "@/lib/db";
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
    },
    notification: (data) => ({
      subject: `New newsletter subscriber`,
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>First name:</strong> ${escapeHtml(data.firstName ?? "—")}</p>
      `,
    }),
  });
}
