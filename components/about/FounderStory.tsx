import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export function FounderStory() {
  return (
    <section className="bg-slate-50 py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-xl lg:mx-auto">
          <Image
            src="https://images.pexels.com/photos/29852895/pexels-photo-29852895.jpeg?auto=compress&cs=tinysrgb&w=900"
            alt="Cierra Jenkins, founder of ABIT Community Development Group"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-bold tracking-widest text-brand-purple">
            OUR FOUNDER
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-purple-dark sm:text-4xl">
            Meet{" "}
            <span className="font-script text-4xl font-normal text-brand-purple sm:text-5xl">
              Cierra Jenkins
            </span>
          </h2>
          <div className="mt-6 space-y-4 text-brand-purple-dark/70">
            <p>
              Growing up with significant challenges inspired Cierra Jenkins
              to create ABIT Community Development Group so girls facing
              adversity would have access to the mentorship, encouragement,
              and opportunities she wished she&apos;d had.
            </p>
            <p>
              She founded ABIT in Columbia, SC to give girls from
              underserved communities a place to be believed in — long
              before they&apos;re asked to believe in themselves. What
              started as a personal mission has grown into a program built
              on mentorship, life skills, and leadership development.
            </p>
            <p>
              Today, Cierra is dedicated to helping young women discover
              their purpose and become leaders in their communities, one
              girl at a time.
            </p>
          </div>
          <blockquote className="mt-6 border-l-4 border-brand-gold pl-4 font-display text-xl italic text-brand-purple-dark">
            &ldquo;Every girl deserves someone who believes in her before she
            believes in herself.&rdquo;
          </blockquote>
          <Button href="/get-involved#mentor" variant="purple" shape="rounded" className="mt-8">
            Join Cierra&apos;s Mission
          </Button>
        </div>
      </Container>
    </section>
  );
}
