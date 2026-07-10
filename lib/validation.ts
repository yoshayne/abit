import { z } from "zod";

const email = z.string().trim().toLowerCase().email("Enter a valid email address");
const requiredText = (label: string, max = 200) =>
  z.string().trim().min(1, `${label} is required`).max(max);
const optionalText = (max = 500) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));
const requiredCheckbox = (message: string) =>
  z.preprocess(
    (v) => (v === undefined || v === null ? false : v),
    z.boolean()
  ).refine((v) => v === true, { message });
const optionalNumber = (min: number, max: number) =>
  z.preprocess(
    (v) => (v === "" || v === undefined || v === null ? undefined : v),
    z.coerce.number().int().min(min).max(max).optional()
  );

export const mentorSchema = z.object({
  name: requiredText("Name"),
  email,
  phone: optionalText(40),
  city: optionalText(120),
  confirmAdult: requiredCheckbox("You must confirm you are 18 or older"),
  occupation: optionalText(200),
  interest: requiredText("Area of interest"),
  availability: optionalText(300),
  message: optionalText(2000),
  consent: requiredCheckbox(
    "Background-check consent is required to apply"
  ),
});

export const enrollSchema = z.object({
  studentName: requiredText("Student name"),
  studentAge: optionalNumber(4, 19),
  grade: optionalText(40),
  school: optionalText(200),
  guardianName: requiredText("Parent/guardian name"),
  guardianPhone: optionalText(40),
  guardianEmail: email,
  city: optionalText(120),
  programs: optionalText(300),
  notes: optionalText(2000),
  consent: requiredCheckbox(
    "Parent/guardian consent is required to enroll a student"
  ),
});

export const volunteerSchema = z.object({
  name: requiredText("Name"),
  email,
  phone: optionalText(40),
  interests: optionalText(500),
  availability: optionalText(300),
  commitment: optionalText(60),
});

export const partnerSchema = z.object({
  org: requiredText("Organization"),
  contactName: requiredText("Contact name"),
  email,
  phone: optionalText(40),
  partnerType: optionalText(60),
  message: optionalText(2000),
});

export const contactSchema = z.object({
  name: requiredText("Name"),
  email,
  subject: optionalText(200),
  message: requiredText("Message", 3000),
});

export const newsletterSchema = z.object({
  email,
  firstName: optionalText(120),
});
