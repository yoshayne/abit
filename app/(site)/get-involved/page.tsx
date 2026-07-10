import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { MentorForm } from "@/components/forms/MentorForm";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { IconBadge } from "@/components/IconBadge";
import { IconHandshake, IconHeart, IconPerson } from "@/components/icons";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Get Involved | ABIT Community Development Group",
  description:
    "Become a mentor, volunteer, or partner with ABIT Community Development Group to help girls in Columbia, SC thrive.",
};

export default function GetInvolvedPage() {
  return (
    <main>
      <PageHero
        eyebrow="GET INVOLVED"
        title="There Are Many Ways to Make an Impact."
        description="Whether you have an hour a month or a whole organization behind you, there's a way to invest in ABIT girls."
      />

      <section id="mentor" className="scroll-mt-24 py-20">
        <Container className="max-w-3xl">
          <IconBadge icon={<IconPerson />} color="purple" />
          <h2 className="mt-4 font-display text-2xl font-bold text-brand-purple-dark sm:text-3xl">
            Become a Mentor
          </h2>
          <p className="mt-2 text-brand-purple-dark/70">
            Your time and guidance can change a girl&apos;s life forever.
            Mentors commit to regular check-ins and support as part of our
            program pillars.
          </p>
          <Card className="mt-8 p-6 sm:p-8">
            <MentorForm />
          </Card>
        </Container>
      </section>

      <section id="volunteer" className="scroll-mt-24 bg-slate-50 py-20">
        <Container className="max-w-3xl">
          <IconBadge icon={<IconHeart />} color="teal" />
          <h2 className="mt-4 font-display text-2xl font-bold text-brand-purple-dark sm:text-3xl">
            Volunteer
          </h2>
          <p className="mt-2 text-brand-purple-dark/70">
            One-time or ongoing, there&apos;s a role for you at events,
            workshops, and in day-to-day program support.
          </p>
          <Card className="mt-8 p-6 sm:p-8">
            <VolunteerForm />
          </Card>
        </Container>
      </section>

      <section id="partner" className="scroll-mt-24 py-20">
        <Container className="max-w-3xl">
          <IconBadge icon={<IconHandshake />} color="gold" />
          <h2 className="mt-4 font-display text-2xl font-bold text-brand-purple-dark sm:text-3xl">
            Partner with ABIT
          </h2>
          <p className="mt-2 text-brand-purple-dark/70">
            We collaborate with schools, businesses, churches, and
            organizations to expand our impact across Columbia, SC.
          </p>
          <Card className="mt-8 p-6 sm:p-8">
            <PartnerForm />
          </Card>
        </Container>
      </section>

      <section id="host-event" className="scroll-mt-24 bg-slate-50 py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-brand-purple-dark sm:text-3xl">
            Want to Host an Event with Us?
          </h2>
          <p className="mt-2 text-brand-purple-dark/70">
            Event hosting details are coming soon. For now, send us a message
            and we&apos;ll follow up.
          </p>
          <Card className="mt-8 p-6 sm:p-8">
            <ContactForm />
          </Card>
        </Container>
      </section>
    </main>
  );
}
