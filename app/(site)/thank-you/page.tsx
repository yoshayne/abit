import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Thank You | ABIT Community Development Group",
};

const MESSAGES: Record<string, { title: string; body: string }> = {
  mentor: {
    title: "Thank You for Applying to Mentor!",
    body: "We've received your mentor application. Our team will review it and follow up by email soon.",
  },
  enroll: {
    title: "Enrollment Received!",
    body: "Thank you for enrolling your daughter with ABIT. We'll reach out to the parent/guardian email you provided with next steps.",
  },
  volunteer: {
    title: "Thanks for Signing Up to Volunteer!",
    body: "We've received your volunteer signup and will be in touch about upcoming opportunities.",
  },
  partner: {
    title: "Thank You for Reaching Out!",
    body: "We've received your partnership inquiry and will follow up soon to talk through how we can work together.",
  },
  contact: {
    title: "Message Sent!",
    body: "Thanks for reaching out — we'll get back to you as soon as we can.",
  },
  rsvp: {
    title: "You're on the List!",
    body: "Thanks for your RSVP — we look forward to seeing you there.",
  },
};

const DEFAULT_MESSAGE = {
  title: "Thank You!",
  body: "We've received your submission.",
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const message = (type && MESSAGES[type]) || DEFAULT_MESSAGE;

  return (
    <main className="bg-gradient-to-br from-brand-purple to-brand-purple-dark py-28 text-white">
      <Container className="max-w-xl text-center">
        <p className="text-sm font-bold tracking-widest text-brand-gold">
          ABIT COMMUNITY DEVELOPMENT GROUP
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold">{message.title}</h1>
        <p className="mt-5 text-white/85">{message.body}</p>
        <Button href="/" variant="white" shape="rounded" className="mt-8">
          Back to Home
        </Button>
      </Container>
    </main>
  );
}
