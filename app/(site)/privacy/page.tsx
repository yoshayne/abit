import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | ABIT Community Development Group",
  description: "How ABIT Community Development Group collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <main>
      <PageHero eyebrow="LEGAL" title="Privacy Policy" />
      <section className="py-16">
        <Container className="max-w-3xl space-y-8 text-brand-purple-dark/80">
          <p className="text-sm text-brand-purple-dark/50">
            Last updated: July 2026
          </p>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-purple-dark">
              Information We Collect
            </h2>
            <p className="mt-3">
              We collect information you provide directly through forms on
              this site: mentor applications, student enrollments, volunteer
              signups, partner inquiries, contact messages, and newsletter
              subscriptions. This may include your name, email, phone
              number, and any details you choose to share in a message.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-purple-dark">
              Information About Minors
            </h2>
            <p className="mt-3">
              Our Enroll a Student form collects information about a
              prospective program participant who may be a minor. This
              information is only ever submitted by, and requires the
              consent of, a parent or legal guardian. We collect the minimum
              information needed to enroll a student in our programs — we do
              not collect information directly from minors, and we never
              include a minor&apos;s personal information in email
              notifications. Enrollment records are stored in our secured
              database and are only accessible to authorized ABIT staff.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-purple-dark">
              How We Use Your Information
            </h2>
            <p className="mt-3">
              We use the information you provide to respond to your
              submission, administer our programs, communicate with mentors,
              volunteers, partners, and guardians, and — if you subscribe —
              to send our newsletter. We do not sell your information.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-purple-dark">
              How We Store Your Information
            </h2>
            <p className="mt-3">
              Form submissions are stored in a secured database hosted on
              Railway. We use Brevo to send email notifications and our
              newsletter. When our online donation platform (Zeffy)
              launches, donations will be processed entirely on their
              platform — we never handle or store your payment card details
              ourselves.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-purple-dark">
              Your Choices
            </h2>
            <p className="mt-3">
              You can unsubscribe from our newsletter at any time using the
              link in any email we send. To request that we delete or
              correct information you&apos;ve submitted, contact us using
              the details below.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-purple-dark">
              Contact Us
            </h2>
            <p className="mt-3">
              Questions about this policy or your information? Email us at{" "}
              <a href="mailto:abitcommunity1@gmail.com" className="text-brand-teal underline">
                abitcommunity1@gmail.com
              </a>{" "}
              or use our{" "}
              <a href="/contact" className="text-brand-teal underline">
                Contact page
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
