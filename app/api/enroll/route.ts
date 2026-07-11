import { query } from "@/lib/db";
import { renderEmail } from "@/lib/emailTemplates";
import { escapeHtml, handleFormSubmission } from "@/lib/formHandler";
import { enrollSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: enrollSchema,
    rateLimitKey: "enroll",
    onValid: async (data) => {
      await query(
        `INSERT INTO student_enrollments
           (student_name, student_age, grade, school, guardian_name, guardian_phone,
            guardian_email, city, programs, notes, consent)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          data.studentName,
          data.studentAge ?? null,
          data.grade ?? null,
          data.school ?? null,
          data.guardianName,
          data.guardianPhone ?? null,
          data.guardianEmail,
          data.city ?? null,
          data.programs ?? null,
          data.notes ?? null,
          data.consent,
        ]
      );
    },
    // Notification is intentionally minimal — no student name, age, school,
    // or notes in the email body. Full record only ever lives in Postgres,
    // per the safeguarding rule in CLAUDE.md (never email raw minor data).
    notification: (data) => ({
      subject: `New student enrollment submitted`,
      html: renderEmail({
        heading: "New Student Enrollment",
        bodyHtml: `
          <p>A new enrollment form was submitted. The full record (including
             the student's info) is stored in Postgres, not in this email.</p>
          <p><strong>Guardian name:</strong> ${escapeHtml(data.guardianName)}</p>
          <p><strong>Guardian email:</strong> ${escapeHtml(data.guardianEmail)}</p>
        `,
      }),
      replyTo: data.guardianEmail,
    }),
    // The confirmation goes straight back to the guardian who typed the
    // student's name in themselves, so a first name here is fine — this is
    // different from the ABIT-facing notification above, which stays fully
    // generic per the safeguarding rule.
    confirmation: (data) => ({
      to: data.guardianEmail,
      toName: data.guardianName,
      subject: "We received your enrollment submission",
      html: renderEmail({
        heading: "We received your enrollment submission",
        bodyHtml: `
          <p>Hi ${escapeHtml(data.guardianName)},</p>
          <p>Thanks for submitting an enrollment for
          ${escapeHtml(data.studentName.split(" ")[0])}. Our team will review
          your submission and follow up at this email address with next
          steps.</p>
        `,
      }),
    }),
  });
}
