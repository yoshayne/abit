import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { IconGrad, IconHeart, IconMentor } from "@/components/icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-purple to-brand-purple-dark pb-16 pt-14 text-white">
      {/* Full-bleed photo, right side, desktop only — fades into the purple on its left edge rather than sitting in a boxed container. */}
      <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block">
        <Image
          src="/photos/header-image.png"
          alt="Four ABIT girls smiling together with arms around each other, one wearing an ABIT hoodie"
          fill
          priority
          unoptimized
          sizes="56vw"
          className="object-cover object-[65%_30%]"
        />
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-brand-purple to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-lg">
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            <span className="block">Empowering Girls.</span>
            <span className="block text-brand-gold">Building Leaders.</span>
            <span className="block">Transforming Communities.</span>
          </h1>
          <p className="mt-5 max-w-md text-white/85">
            Helping girls from underserved communities develop the confidence,
            life skills, and leadership they need to succeed in school, at
            home, and in life.
          </p>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button
            href="/get-involved#mentor"
            variant="purple"
            size="sm"
            icon={<IconMentor className="h-3.5 w-3.5" />}
            className="uppercase ring-1 ring-white/20"
          >
            Become a Mentor
          </Button>
          <Button
            href="/enroll"
            variant="teal"
            size="sm"
            icon={<IconGrad className="h-3.5 w-3.5" />}
            className="uppercase"
          >
            Enroll a Student
          </Button>
          <Button
            href="/donate"
            variant="white"
            size="sm"
            icon={<IconHeart className="h-3.5 w-3.5" />}
            className="uppercase"
          >
            Support Our Mission
          </Button>
        </div>

        {/* Mobile/tablet: normal contained photo below the text instead of full-bleed. */}
        <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-2xl lg:hidden">
          <Image
            src="/photos/header-image.png"
            alt="Four ABIT girls smiling together with arms around each other, one wearing an ABIT hoodie"
            fill
            priority
            unoptimized
            className="object-cover object-top"
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
