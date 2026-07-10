import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { IconCheck } from "@/components/icons";

const CHECKLIST = [
  "Weekly Mentorship",
  "Self-Confidence Coaching",
  "Leadership Workshops",
  "Community Service Projects",
  "Financial Literacy",
  "College & Career Readiness",
];

export function FeaturedAcademy() {
  return (
    <section id="girlfriends-leadership-academy" className="scroll-mt-24 bg-brand-purple-dark py-20 text-white">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
          <Image
            src="https://images.pexels.com/photos/8499571/pexels-photo-8499571.jpeg?auto=compress&cs=tinysrgb&w=900"
            alt="Teen girls together for the Girlfriends Leadership Academy"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-bold tracking-widest text-brand-gold">
            OUR FLAGSHIP PROGRAM
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Girlfriends{" "}
            <span className="font-script text-4xl font-normal text-brand-gold sm:text-5xl">
              Leadership Academy
            </span>
          </h2>
          <p className="mt-5 text-white/80">
            A mentoring experience where girls receive guidance,
            encouragement, and the tools they need to rise above their
            circumstances and achieve their personal goals. The Academy
            brings together every ABIT program pillar — life skills,
            leadership, career readiness, and community engagement — into
            one ongoing mentorship experience.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <IconCheck className="h-4 w-4 shrink-0 text-brand-gold" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/enroll" variant="teal" shape="rounded">
              Enroll a Student
            </Button>
            <Button href="/get-involved#mentor" variant="white" shape="rounded">
              Become a Mentor
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
