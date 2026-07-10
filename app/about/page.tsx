import type { Metadata } from "next";
import { AbitFramework } from "@/components/about/AbitFramework";
import { FounderStory } from "@/components/about/FounderStory";
import { Mission } from "@/components/about/Mission";
import { Team } from "@/components/about/Team";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us | ABIT Community Development Group",
  description:
    "Meet ABIT Community Development Group: our mission, our founder Cierra Jenkins, and the ABIT framework that guides every program we run.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="ABOUT ABIT"
        title="Our Story, Our Mission, Our Girls."
        description="ABIT Community Development Group was built on a simple belief: every girl deserves someone who believes in her before she believes in herself."
      />
      <Mission />
      <FounderStory />
      <AbitFramework />
      <Team />
    </main>
  );
}
