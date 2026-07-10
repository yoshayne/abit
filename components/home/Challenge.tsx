import { Container } from "@/components/Container";
import { IconBadge } from "@/components/IconBadge";
import {
  IconBook,
  IconDollar,
  IconGroup,
  IconHome,
  IconPerson,
  IconStar,
} from "@/components/icons";

const CHALLENGES = [
  { label: "Limited Educational Support", icon: IconBook, color: "purple" as const },
  { label: "Low Self-Confidence", icon: IconPerson, color: "teal" as const },
  { label: "Lack of Positive Mentors", icon: IconGroup, color: "gold" as const },
  { label: "Economic Barriers", icon: IconDollar, color: "purple" as const },
  { label: "Unstable Home Environments", icon: IconHome, color: "teal" as const },
  { label: "Limited Opportunities", icon: IconStar, color: "gold" as const },
];

export function Challenge() {
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-brand-purple">
            THE CHALLENGE
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-purple-dark sm:text-4xl">
            Girls We{" "}
            <span className="underline decoration-brand-gold decoration-4 underline-offset-4">
              Serve
            </span>{" "}
            Often Face
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {CHALLENGES.map(({ label, icon: Icon, color }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <IconBadge icon={<Icon />} color={color} />
              <p className="mt-4 text-sm font-semibold text-brand-purple-dark">
                {label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
