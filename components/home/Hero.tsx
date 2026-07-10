import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { IconGrad, IconHeart, IconMentor } from "@/components/icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-purple to-brand-purple-dark pb-24 pt-16 text-white sm:pb-32">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            <span className="block">Empowering Girls.</span>
            <span className="block text-brand-gold">Building Leaders.</span>
            <span className="block">Transforming Communities.</span>
          </h1>
          <p className="mt-6 max-w-lg text-white/85">
            Helping girls from underserved communities develop the confidence,
            life skills, and leadership they need to succeed in school, at
            home, and in life.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              href="/get-involved#mentor"
              variant="purple"
              icon={<IconMentor className="h-4 w-4" />}
              className="ring-1 ring-white/20"
            >
              Become a Mentor
            </Button>
            <Button
              href="/enroll"
              variant="teal"
              icon={<IconGrad className="h-4 w-4" />}
            >
              Enroll a Student
            </Button>
            <Button
              href="/donate"
              variant="white"
              icon={<IconHeart className="h-4 w-4" />}
            >
              Support Our Mission
            </Button>
          </div>
        </div>

        <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="/photos/header-image.png"
            alt="Four ABIT girls smiling together with arms around each other, one wearing an ABIT hoodie"
            width={1797}
            height={875}
            priority
            unoptimized
            className="h-auto w-full object-cover"
          />
        </div>
      </Container>

      <svg
        className="absolute inset-x-0 bottom-0"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 32C360 2 1080 2 1440 32"
          fill="none"
          stroke="#E5A823"
          strokeWidth="6"
          vectorEffect="non-scaling-stroke"
        />
        <path d="M0 36C360 6 1080 6 1440 36V60H0z" fill="white" />
      </svg>
    </section>
  );
}
