import { query } from "@/lib/db";
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
      html: `
        <h2>New Student Enrollment</h2>
        <p>A new enrollment form was submitted. The full record (including
           the student's info) is stored in Postgres, not in this email.</p>
        <p><strong>Guardian name:</strong> ${escapeHtml(data.guardianName)}</p>
        <p><strong>Guardian email:</strong> ${escapeHtml(data.guardianEmail)}</p>
      `,
    }),
  });
}
