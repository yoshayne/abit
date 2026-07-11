import { query } from "@/lib/db";
import { renderEmail } from "@/lib/emailTemplates";
import { escapeHtml, handleFormSubmission } from "@/lib/formHandler";
import { partnerSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: partnerSchema,
    rateLimitKey: "partner",
    onValid: async (data) => {
      await query(
        `INSERT INTO partner_inquiries (org, contact_name, email, phone, partner_type, message)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          data.org,
          data.contactName,
          data.email,
          data.phone ?? null,
          data.partnerType ?? null,
          data.message ?? null,
        ]
      );
    },
    notification: (data) => ({
      subject: `New partner inquiry: ${data.org}`,
      html: renderEmail({
        heading: "New Partner Inquiry",
        bodyHtml: `
          <p><strong>Organization:</strong> ${escapeHtml(data.org)}</p>
          <p><strong>Contact name:</strong> ${escapeHtml(data.contactName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone ?? "—")}</p>
          <p><strong>Partner type:</strong> ${escapeHtml(data.partnerType ?? "—")}</p>
          <p><strong>Message:</strong> ${escapeHtml(data.message ?? "—")}</p>
        `,
      }),
      replyTo: data.email,
    }),
    confirmation: (data) => ({
      to: data.email,
      toName: data.contactName,
      subject: "We received your partnership inquiry",
      html: renderEmail({
        heading: "Thanks for reaching out about partnering with ABIT",
        bodyHtml: `
          <p>Hi ${escapeHtml(data.contactName)},</p>
          <p>We've received your partnership inquiry on behalf of
          ${escapeHtml(data.org)} and will follow up soon.</p>
        `,
      }),
    }),
  });
}
