import Image from "next/image";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { IconBadge } from "@/components/IconBadge";
import { IconBriefcase, IconCrown, IconHeart, IconSprout } from "@/components/icons";

const PROGRAMS = [
  {
    title: "Life Skills",
    description:
      "Teaching responsibility, communication, conflict resolution, time management, and decision-making.",
    icon: IconSprout,
    color: "purple" as const,
    photo:
      "https://images.pexels.com/photos/8456136/pexels-photo-8456136.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Two teen girls smiling in a school hallway holding notebooks",
  },
  {
    title: "Leadership Development",
    description:
      "Helping girls discover confidence, purpose, and self-worth through mentorship.",
    icon: IconCrown,
    color: "teal" as const,
    photo:
      "https://images.pexels.com/photos/8872471/pexels-photo-8872471.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "A young woman speaking confidently into a microphone",
  },
  {
    title: "Career & Entrepreneurship",
    description:
      "Preparing young women for college, careers, financial literacy, and business ownership.",
    icon: IconBriefcase,
    color: "gold" as const,
    photo:
      "https://images.pexels.com/photos/6937704/pexels-photo-6937704.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "A teen girl focused on her laptop at a desk",
  },
  {
    title: "Community Engagement",
    description:
      "Developing respectful, responsible citizens who positively impact their communities.",
    icon: IconHeart,
    color: "purple" as const,
    photo:
      "https://images.pexels.com/photos/10643688/pexels-photo-10643688.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Two teen girls in uniform laughing together outdoors",
  },
];

export function HowWeHelp() {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-brand-purple">
            HOW WE HELP
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-purple-dark sm:text-4xl">
            We Equip Girls to{" "}
            <span className="font-script text-4xl font-normal text-brand-teal sm:text-5xl">
              Succeed
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map(({ title, description, icon: Icon, color, photo, alt }) => (
            <Card key={title} className="flex flex-col overflow-hidden">
              <div className="p-6">
                <IconBadge icon={<Icon />} color={color} />
                <h3 className="mt-4 font-display text-lg font-bold text-brand-purple-dark">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-brand-purple-dark/70">
                  {description}
                </p>
              </div>
              <div className="relative mt-auto aspect-[4/3] w-full">
                <Image src={photo} alt={alt} fill unoptimized className="object-cover" />
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
