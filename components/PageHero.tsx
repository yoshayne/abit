import type { ReactNode } from "react";
import { Container } from "./Container";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-gradient-to-br from-brand-purple to-brand-purple-dark py-16 text-white sm:py-20">
      <Container>
        {eyebrow && (
          <p className="text-sm font-bold tracking-widest text-brand-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-white/85">{description}</p>
        )}
        {children}
      </Container>
    </section>
  );
}
