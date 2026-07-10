import { query } from "@/lib/db";
import { escapeHtml, handleFormSubmission } from "@/lib/formHandler";
import { volunteerSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: volunteerSchema,
    rateLimitKey: "volunteer",
    onValid: async (data) => {
      await query(
        `INSERT INTO volunteers (name, email, phone, interests, availability, commitment)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          data.name,
          data.email,
          data.phone ?? null,
          data.interests ?? null,
          data.availability ?? null,
          data.commitment ?? null,
        ]
      );
    },
    notification: (data) => ({
      subject: `New volunteer signup: ${data.name}`,
      html: `
        <h2>New Volunteer Signup</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone ?? "—")}</p>
        <p><strong>Interests:</strong> ${escapeHtml(data.interests ?? "—")}</p>
        <p><strong>Availability:</strong> ${escapeHtml(data.availability ?? "—")}</p>
        <p><strong>Commitment:</strong> ${escapeHtml(data.commitment ?? "—")}</p>
      `,
    }),
  });
}
