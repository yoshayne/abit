import Image from "next/image";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
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

export function FeaturedAndFounder() {
  return (
    <section className="py-20">
      <Container className="grid gap-8 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/photos/featured-program-girls.png"
              alt="Four ABIT girls in ABIT t-shirts smiling and collaborating on a planning worksheet together"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="p-8">
            <p className="text-sm font-bold tracking-widest text-brand-purple">
              FEATURED PROGRAM
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-brand-purple-dark">
              Girlfriends{" "}
              <span className="font-script text-3xl font-normal text-brand-teal">
                Leadership Academy
              </span>
            </h3>
            <p className="mt-4 text-sm text-brand-purple-dark/70">
              A mentoring experience where girls receive guidance,
              encouragement, and the tools they need to rise above their
              circumstances and achieve their personal goals.
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {CHECKLIST.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-brand-purple-dark"
                >
                  <IconCheck className="h-4 w-4 shrink-0 text-brand-teal" />
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/programs" variant="teal" shape="rounded" className="mt-6">
              Learn More About Our Programs
            </Button>
          </div>
        </Card>

        <Card className="grid grid-rows-[auto_1fr] overflow-hidden sm:grid-cols-2 sm:grid-rows-1">
          <div className="relative aspect-[4/3] w-full sm:aspect-auto">
            <Image
              src="/photos/founder-cierra.png"
              alt="Cierra Jenkins, founder of ABIT Community Development Group"
              fill
              unoptimized
              className="object-cover object-top"
            />
          </div>
          <div className="p-8">
            <p className="text-sm font-bold tracking-widest text-brand-purple">
              MEET OUR FOUNDER
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-brand-purple-dark">
              Meet{" "}
              <span className="font-script text-3xl font-normal text-brand-purple">
                Cierra Jenkins
              </span>
            </h3>
            <p className="mt-4 text-sm text-brand-purple-dark/70">
              Growing up with significant challenges inspired Cierra Jenkins
              to create ABIT Community Development Group so girls facing
              adversity would have access to the mentorship, encouragement,
              and opportunities she wished she&apos;d had. Today, she is
              dedicated to helping young women discover their purpose and
              become leaders in their communities.
            </p>
            <Button href="/about" variant="purple" shape="rounded" className="mt-6">
              Read Cierra&apos;s Story
            </Button>
          </div>
        </Card>
      </Container>
    </section>
  );
}
