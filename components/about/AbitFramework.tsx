import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { IconBadge } from "@/components/IconBadge";
import { IconBook, IconCrown, IconHeart, IconStar } from "@/components/icons";

const STAGES = [
  {
    letter: "A",
    title: "Achieve",
    description:
      "Setting and reaching real goals in school and in life, building a track record of success one milestone at a time.",
    icon: IconStar,
    color: "purple" as const,
  },
  {
    letter: "B",
    title: "Believe",
    description:
      "Building the self-confidence and self-worth to believe in her own potential, before anyone else has to.",
    icon: IconHeart,
    color: "teal" as const,
  },
  {
    letter: "I",
    title: "Inspire",
    description:
      "Growing into a mentor and leader who inspires her peers, her family, and her community.",
    icon: IconCrown,
    color: "gold" as const,
  },
  {
    letter: "T",
    title: "Teach",
    description:
      "Equipping her with practical life, leadership, and career skills that last well beyond the program.",
    icon: IconBook,
    color: "purple" as const,
  },
];

export function AbitFramework() {
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-brand-purple">
            OUR FRAMEWORK
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-purple-dark sm:text-4xl">
            The{" "}
            <span className="font-script text-4xl font-normal text-brand-teal sm:text-5xl">
              ABIT
            </span>{" "}
            Way
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-purple-dark/70">
            Every program we run is built around four stages girls move
            through as they grow — the same four letters in our name.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map(({ letter, title, description, icon: Icon, color }) => (
            <Card key={title} className="p-6 text-center">
              <div className="relative mx-auto w-fit">
                <IconBadge icon={<Icon />} color={color} />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple-dark text-xs font-bold text-white">
                  {letter}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-brand-purple-dark">
                {title}
              </h3>
              <p className="mt-2 text-sm text-brand-purple-dark/70">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
