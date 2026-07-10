import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { IconMail, IconPhone, IconPin } from "@/components/icons";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact | ABIT Community Development Group",
  description:
    "Get in touch with ABIT Community Development Group in Columbia, SC.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="CONTACT US"
        title="We'd Love to Hear From You."
        description="Questions about our programs, partnerships, or getting involved? Send us a message and we'll get back to you soon."
      />
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-8">
              <ContactForm />
            </Card>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <IconPhone className="mt-1 h-5 w-5 shrink-0 text-brand-teal" />
              <div>
                <p className="font-semibold text-brand-purple-dark">Phone</p>
                <a href="tel:+18035093487" className="text-sm text-brand-purple-dark/70">
                  (803) 509-3487
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <IconMail className="mt-1 h-5 w-5 shrink-0 text-brand-teal" />
              <div>
                <p className="font-semibold text-brand-purple-dark">Email</p>
                <a
                  href="mailto:abitcommunity@gmail.com"
                  className="text-sm text-brand-purple-dark/70"
                >
                  abitcommunity@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <IconPin className="mt-1 h-5 w-5 shrink-0 text-brand-teal" />
              <div>
                <p className="font-semibold text-brand-purple-dark">Location</p>
                <p className="text-sm text-brand-purple-dark/70">Columbia, SC</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
