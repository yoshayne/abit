import { Challenge } from "@/components/home/Challenge";
import { FeaturedAndFounder } from "@/components/home/FeaturedAndFounder";
import { GetInvolved } from "@/components/home/GetInvolved";
import { Hero } from "@/components/home/Hero";
import { HowWeHelp } from "@/components/home/HowWeHelp";
import { StatsBand } from "@/components/home/StatsBand";
import { WhoWeAre } from "@/components/home/WhoWeAre";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhoWeAre />
      <Challenge />
      <HowWeHelp />
      <StatsBand />
      <FeaturedAndFounder />
      <GetInvolved />
    </main>
  );
}
