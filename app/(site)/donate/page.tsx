import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { DonateEmbed } from "@/components/DonateEmbed";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Donate | ABIT Community Development Group",
  description:
    "Support ABIT Community Development Group's mission to empower girls from underserved communities in Columbia, SC.",
};

export default function DonatePage() {
  return (
    <main>
      <PageHero
        eyebrow="DONATE"
        title="Invest in Her Future."
        description="Your gift helps us provide mentorship, life skills, and leadership opportunities to girls who need them most. Every dollar goes directly toward ABIT's programs."
      />
      <section className="py-20">
        <Container className="max-w-2xl">
          <DonateEmbed />
        </Container>
      </section>
    </main>
  );
}
