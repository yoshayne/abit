import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { EnrollForm } from "@/components/forms/EnrollForm";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Enroll a Student | ABIT Community Development Group",
  description:
    "Enroll your daughter in ABIT Community Development Group programs. Parent/guardian consent required.",
};

export default function EnrollPage() {
  return (
    <main>
      <PageHero
        eyebrow="ENROLL A STUDENT"
        title="Give Her a Place to Belong."
        description="Fill out the form below to enroll your daughter in ABIT programs. A parent or legal guardian must complete this form."
      />
      <section className="py-20">
        <Container className="max-w-3xl">
          <Card className="p-6 sm:p-8">
            <EnrollForm />
          </Card>
        </Container>
      </section>
    </main>
  );
}
