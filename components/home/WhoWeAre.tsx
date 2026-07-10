import Image from "next/image";
import { Container } from "@/components/Container";

const PHOTOS = [
  {
    src: "https://images.pexels.com/photos/8005649/pexels-photo-8005649.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "A girl focused on writing in her notebook",
  },
  {
    src: "https://images.pexels.com/photos/31367501/pexels-photo-31367501.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "A student in a hijab holding a book",
  },
  {
    src: "https://images.pexels.com/photos/18367687/pexels-photo-18367687.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "A teen girl smiling",
  },
  {
    src: "https://images.pexels.com/photos/32082811/pexels-photo-32082811.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "A teen girl with curly hair smiling",
  },
];

export function WhoWeAre() {
  return (
    <section className="py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold tracking-widest text-brand-purple">
            WHO WE ARE
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-brand-purple-dark sm:text-4xl">
            Every Girl Deserves the Opportunity to{" "}
            <span className="font-script text-4xl font-normal text-brand-teal sm:text-5xl">
              Thrive.
            </span>
          </h2>
          <p className="mt-6 text-brand-purple-dark/70">
            ABIT Community Development Group equips girls with the life
            skills, mentorship, leadership development, and educational
            support they need to overcome adversity and become confident,
            successful young women.
          </p>
          <p className="mt-4 font-semibold text-brand-purple">
            We believe every girl deserves someone who believes in her before
            she believes in herself.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-[3/4] overflow-hidden rounded-xl"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
