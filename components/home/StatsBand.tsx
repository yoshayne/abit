import { Container } from "@/components/Container";
import { IconGrad, IconGroup, IconHeart, IconStar } from "@/components/icons";

const STATS = [
  { value: "500+", label: "Girls Impacted", icon: IconGroup },
  { value: "50+", label: "Community Volunteers", icon: IconHeart },
  { value: "10+", label: "School Partnerships", icon: IconGrad },
  { value: "100%", label: "Committed to Every Girl's Success", icon: IconStar },
];

export function StatsBand() {
  return (
    <section className="bg-brand-purple-dark py-14 text-white">
      <Container className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {STATS.map(({ value, label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-4">
            <Icon className="h-9 w-9 shrink-0 text-brand-gold" />
            <div>
              <p className="font-display text-2xl font-bold sm:text-3xl">{value}</p>
              <p className="text-sm text-white/70">{label}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
