import { query } from "@/lib/db";
import { renderEmail } from "@/lib/emailTemplates";
import { escapeHtml, handleFormSubmission } from "@/lib/formHandler";
import { mentorSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: mentorSchema,
    rateLimitKey: "mentor",
    onValid: async (data) => {
      await query(
        `INSERT INTO mentor_applications
           (name, email, phone, city, occupation, interest, availability, message, consent)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          data.name,
          data.email,
          data.phone ?? null,
          data.city ?? null,
          data.occupation ?? null,
          data.interest,
          data.availability ?? null,
          data.message ?? null,
          data.consent,
        ]
      );
    },
    notification: (data) => ({
      subject: `New mentor application: ${data.name}`,
      html: renderEmail({
        heading: "New Mentor Application",
        bodyHtml: `
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone ?? "—")}</p>
          <p><strong>City:</strong> ${escapeHtml(data.city ?? "—")}</p>
          <p><strong>Occupation:</strong> ${escapeHtml(data.occupation ?? "—")}</p>
          <p><strong>Area of interest:</strong> ${escapeHtml(data.interest)}</p>
          <p><strong>Availability:</strong> ${escapeHtml(data.availability ?? "—")}</p>
          <p><strong>Message:</strong> ${escapeHtml(data.message ?? "—")}</p>
        `,
      }),
      replyTo: data.email,
    }),
    confirmation: (data) => ({
      to: data.email,
      toName: data.name,
      subject: "We received your mentor application",
      html: renderEmail({
        heading: "Thanks for applying to mentor with ABIT!",
        bodyHtml: `
          <p>Hi ${escapeHtml(data.name)},</p>
          <p>We've received your mentor application and a member of our team
          will be in touch soon to talk through next steps.</p>
          <p>Questions in the meantime? Just reply to this email.</p>
        `,
      }),
    }),
  });
}
