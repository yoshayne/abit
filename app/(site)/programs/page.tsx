import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FeaturedAcademy } from "@/components/programs/FeaturedAcademy";
import { ProgramPillars } from "@/components/programs/ProgramPillars";

export const metadata: Metadata = {
  title: "Programs | ABIT Community Development Group",
  description:
    "Life Skills, Leadership Development, Career & Entrepreneurship, and Community Engagement — explore ABIT's programs, including the Girlfriends Leadership Academy.",
};

export default function ProgramsPage() {
  return (
    <main>
      <PageHero
        eyebrow="OUR PROGRAMS"
        title="Four Pillars. One Goal."
        description="Every ABIT program is built around the same four pillars — life skills, leadership, career readiness, and community engagement — so every girl leaves with more than she came in with."
      />
      <ProgramPillars />
      <FeaturedAcademy />
    </main>
  );
}
