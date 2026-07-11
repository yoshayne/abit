import { query } from "@/lib/db";
import { renderEmail } from "@/lib/emailTemplates";
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
      html: renderEmail({
        heading: "New Volunteer Signup",
        bodyHtml: `
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone ?? "—")}</p>
          <p><strong>Interests:</strong> ${escapeHtml(data.interests ?? "—")}</p>
          <p><strong>Availability:</strong> ${escapeHtml(data.availability ?? "—")}</p>
          <p><strong>Commitment:</strong> ${escapeHtml(data.commitment ?? "—")}</p>
        `,
      }),
      replyTo: data.email,
    }),
    confirmation: (data) => ({
      to: data.email,
      toName: data.name,
      subject: "We received your volunteer signup",
      html: renderEmail({
        heading: "Thanks for signing up to volunteer!",
        bodyHtml: `
          <p>Hi ${escapeHtml(data.name)},</p>
          <p>We've received your volunteer signup and will reach out about
          upcoming opportunities that match your interests.</p>
        `,
      }),
    }),
  });
}
