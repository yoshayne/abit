import Image from "next/image";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";

export function Team() {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-brand-purple">
            OUR TEAM
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-purple-dark sm:text-4xl">
            Leadership &amp; Board
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          <Card className="overflow-hidden text-center">
            <div className="relative aspect-square w-full">
              <Image
                src="/photos/founder-cierra.png"
                alt="Cierra Jenkins"
                fill
                unoptimized
                className="object-cover object-top"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-bold text-brand-purple-dark">
                Cierra Jenkins
              </h3>
              <p className="text-sm text-brand-teal">Founder &amp; Executive Director</p>
            </div>
          </Card>

          <Card className="flex flex-col items-center justify-center p-6 text-center text-brand-purple-dark/70">
            <p className="font-display text-lg font-bold text-brand-purple-dark">
              Board of Directors
            </p>
            <p className="mt-2 text-sm">
              We&apos;re growing our board and mentor team — check back soon
              to meet the volunteers and community leaders behind ABIT.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
