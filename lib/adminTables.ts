export type Column = {
  key: string;
  label: string;
  truncate?: boolean;
};

export type AdminTableConfig = {
  slug: string;
  table: string;
  label: string;
  searchColumns: string[];
  columns: Column[];
};

export const ADMIN_TABLES: Record<string, AdminTableConfig> = {
  mentors: {
    slug: "mentors",
    table: "mentor_applications",
    label: "Mentor Applications",
    searchColumns: ["name", "email", "city", "interest"],
    columns: [
      { key: "created_at", label: "Submitted" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "city", label: "City" },
      { key: "occupation", label: "Occupation" },
      { key: "interest", label: "Interest" },
      { key: "availability", label: "Availability" },
      { key: "message", label: "Message", truncate: true },
      { key: "consent", label: "Consent" },
    ],
  },
  enrollments: {
    slug: "enrollments",
    table: "student_enrollments",
    label: "Student Enrollments",
    searchColumns: ["student_name", "guardian_name", "guardian_email", "school"],
    columns: [
      { key: "created_at", label: "Submitted" },
      { key: "student_name", label: "Student" },
      { key: "student_age", label: "Age" },
      { key: "grade", label: "Grade" },
      { key: "school", label: "School" },
      { key: "guardian_name", label: "Guardian" },
      { key: "guardian_phone", label: "Guardian Phone" },
      { key: "guardian_email", label: "Guardian Email" },
      { key: "city", label: "City" },
      { key: "programs", label: "Programs" },
      { key: "notes", label: "Notes", truncate: true },
      { key: "consent", label: "Consent" },
    ],
  },
  volunteers: {
    slug: "volunteers",
    table: "volunteers",
    label: "Volunteers",
    searchColumns: ["name", "email"],
    columns: [
      { key: "created_at", label: "Submitted" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "interests", label: "Interests", truncate: true },
      { key: "availability", label: "Availability" },
      { key: "commitment", label: "Commitment" },
    ],
  },
  partners: {
    slug: "partners",
    table: "partner_inquiries",
    label: "Partner Inquiries",
    searchColumns: ["org", "contact_name", "email"],
    columns: [
      { key: "created_at", label: "Submitted" },
      { key: "org", label: "Organization" },
      { key: "contact_name", label: "Contact" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "partner_type", label: "Type" },
      { key: "message", label: "Message", truncate: true },
    ],
  },
  contacts: {
    slug: "contacts",
    table: "contact_messages",
    label: "Contact Messages",
    searchColumns: ["name", "email", "subject"],
    columns: [
      { key: "created_at", label: "Submitted" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "subject", label: "Subject" },
      { key: "message", label: "Message", truncate: true },
    ],
  },
  newsletter: {
    slug: "newsletter",
    table: "newsletter_subscribers",
    label: "Newsletter Subscribers",
    searchColumns: ["email", "first_name"],
    columns: [
      { key: "created_at", label: "Subscribed" },
      { key: "email", label: "Email" },
      { key: "first_name", label: "First Name" },
    ],
  },
};
