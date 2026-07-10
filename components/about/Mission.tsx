import { Container } from "@/components/Container";

export function Mission() {
  return (
    <section className="py-20">
      <Container className="max-w-3xl text-center">
        <p className="text-sm font-bold tracking-widest text-brand-purple">
          OUR MISSION
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-brand-purple-dark sm:text-4xl">
          Empowering Girls to{" "}
          <span className="font-script text-4xl font-normal text-brand-teal sm:text-5xl">
            Rise.
          </span>
        </h2>
        <p className="mt-6 text-lg text-brand-purple-dark/70">
          ABIT Community Development Group exists to equip girls from
          underserved communities in Columbia, SC with the mentorship, life
          skills, and leadership opportunities they need to overcome
          adversity, discover their own worth, and become confident young
          women who give back to the communities that raised them.
        </p>
      </Container>
    </section>
  );
}
