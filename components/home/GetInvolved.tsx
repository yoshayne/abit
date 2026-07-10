import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { IconBadge } from "@/components/IconBadge";
import { TextLink } from "@/components/TextLink";
import { IconHandshake, IconHeart, IconPerson } from "@/components/icons";

const WAYS = [
  {
    title: "Become a Mentor",
    description: "Your time and guidance can change a girl's life forever.",
    icon: IconPerson,
    color: "purple" as const,
    linkLabel: "Learn More",
    linkColor: "purple" as const,
    href: "/get-involved#mentor",
  },
  {
    title: "Partner with ABIT",
    description:
      "We collaborate with schools, businesses, churches, and organizations to expand our impact.",
    icon: IconHandshake,
    color: "teal" as const,
    linkLabel: "Partner With Us",
    linkColor: "teal" as const,
    href: "/get-involved#partner",
  },
  {
    title: "Donate",
    description:
      "Your support helps us provide programs, resources, and opportunities for girls in our community.",
    icon: IconHeart,
    color: "gold" as const,
    linkLabel: "Donate Today",
    linkColor: "gold" as const,
    href: "/donate",
  },
];

export function GetInvolved() {
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-brand-purple">
            GET INVOLVED
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-purple-dark sm:text-4xl">
            There Are Many Ways to{" "}
            <span className="font-script text-4xl font-normal text-brand-teal sm:text-5xl">
              Make an Impact
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {WAYS.map(({ title, description, icon: Icon, color, linkLabel, linkColor, href }) => (
            <Card key={title} className="p-8">
              <IconBadge icon={<Icon />} color={color} />
              <h3 className="mt-4 font-display text-lg font-bold text-brand-purple-dark">
                {title}
              </h3>
              <p className="mt-2 text-sm text-brand-purple-dark/70">{description}</p>
              <TextLink href={href} color={linkColor} className="mt-4">
                {linkLabel}
              </TextLink>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
