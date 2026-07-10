import Image from "next/image";
import { Container } from "@/components/Container";
import { IconBadge } from "@/components/IconBadge";
import { IconCheck } from "@/components/icons";
import { IconBriefcase, IconCrown, IconHeart, IconSprout } from "@/components/icons";

const PILLARS = [
  {
    id: "life-skills",
    title: "Life Skills",
    tagline: "Practical skills for everyday confidence.",
    description:
      "Girls build the everyday habits and skills that carry them through school, home, and life — the foundation everything else is built on.",
    points: [
      "Time management and organization",
      "Communication and conflict resolution",
      "Health, wellness, and self-care",
      "Personal responsibility and goal-setting",
    ],
    icon: IconSprout,
    color: "purple" as const,
    photo:
      "https://images.pexels.com/photos/8456136/pexels-photo-8456136.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Two teen girls smiling in a school hallway holding notebooks",
  },
  {
    id: "leadership-development",
    title: "Leadership Development",
    tagline: "Growing tomorrow's leaders today.",
    description:
      "Through mentorship and hands-on practice, girls discover their own voice and learn what it means to lead with confidence and purpose.",
    points: [
      "Public speaking and confidence building",
      "Team leadership and collaboration",
      "Peer mentorship circles",
      "Self-advocacy",
    ],
    icon: IconCrown,
    color: "teal" as const,
    photo:
      "https://images.pexels.com/photos/8872471/pexels-photo-8872471.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "A young woman speaking confidently into a microphone",
  },
  {
    id: "career-entrepreneurship",
    title: "Career & Entrepreneurship",
    tagline: "Preparing girls for what's next.",
    description:
      "We prepare girls for college, careers, and business ownership with real, practical tools — not just advice, but skills they can use now.",
    points: [
      "College readiness and applications",
      "Financial literacy and budgeting",
      "Resume building and interview skills",
      "Business and entrepreneurship basics",
    ],
    icon: IconBriefcase,
    color: "gold" as const,
    photo:
      "https://images.pexels.com/photos/6937704/pexels-photo-6937704.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "A teen girl focused on her laptop at a desk",
  },
  {
    id: "community-engagement",
    title: "Community Engagement",
    tagline: "Raising girls who give back.",
    description:
      "Girls learn that leadership means service — giving back to the same community that's investing in them.",
    points: [
      "Community service projects",
      "Civic engagement and volunteering",
      "Peer-to-peer mentorship",
      "Local school and business partnerships",
    ],
    icon: IconHeart,
    color: "purple" as const,
    photo:
      "https://images.pexels.com/photos/10643688/pexels-photo-10643688.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Two teen girls in uniform laughing together outdoors",
  },
];

export function ProgramPillars() {
  return (
    <section className="py-20">
      <Container className="space-y-20">
        {PILLARS.map((pillar, index) => (
          <div
            key={pillar.id}
            id={pillar.id}
            className="grid scroll-mt-24 items-center gap-12 lg:grid-cols-2"
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src={pillar.photo}
                  alt={pillar.alt}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>

            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
              <IconBadge icon={<pillar.icon />} color={pillar.color} />
              <h2 className="mt-4 font-display text-2xl font-bold text-brand-purple-dark sm:text-3xl">
                {pillar.title}
              </h2>
              <p className="mt-1 font-semibold text-brand-teal">
                {pillar.tagline}
              </p>
              <p className="mt-4 text-brand-purple-dark/70">
                {pillar.description}
              </p>
              <ul className="mt-5 space-y-2">
                {pillar.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm text-brand-purple-dark"
                  >
                    <IconCheck className="h-4 w-4 shrink-0 text-brand-teal" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
