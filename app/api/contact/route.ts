import { query } from "@/lib/db";
import { renderEmail } from "@/lib/emailTemplates";
import { escapeHtml, handleFormSubmission } from "@/lib/formHandler";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: contactSchema,
    rateLimitKey: "contact",
    onValid: async (data) => {
      await query(
        `INSERT INTO contact_messages (name, email, subject, message)
         VALUES ($1, $2, $3, $4)`,
        [data.name, data.email, data.subject ?? null, data.message]
      );
    },
    notification: (data) => ({
      subject: `New contact message: ${data.subject || "(no subject)"}`,
      html: renderEmail({
        heading: "New Contact Message",
        bodyHtml: `
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(data.subject ?? "—")}</p>
          <p><strong>Message:</strong><br />${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
        `,
      }),
      replyTo: data.email,
    }),
    confirmation: (data) => ({
      to: data.email,
      toName: data.name,
      subject: "We received your message",
      html: renderEmail({
        heading: "We received your message",
        bodyHtml: `
          <p>Hi ${escapeHtml(data.name)},</p>
          <p>Thanks for contacting ABIT Community Development Group. We'll
          get back to you as soon as we can.</p>
        `,
      }),
    }),
  });
}
