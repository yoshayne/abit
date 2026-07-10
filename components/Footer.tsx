import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconMail,
  IconPhone,
  IconPin,
} from "./icons";

const QUICK_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

const PROGRAM_LINKS = [
  { href: "/programs#girlfriends-leadership-academy", label: "Girlfriends Leadership Academy" },
  { href: "/programs#life-skills", label: "Life Skills" },
  { href: "/programs#leadership-development", label: "Leadership Development" },
  { href: "/programs#career-entrepreneurship", label: "Career & Entrepreneurship" },
  { href: "/programs#community-engagement", label: "Community Engagement" },
];

const GET_INVOLVED_LINKS = [
  { href: "/get-involved#mentor", label: "Become a Mentor" },
  { href: "/get-involved#partner", label: "Partner With Us" },
  { href: "/donate", label: "Donate" },
  { href: "/get-involved#volunteer", label: "Volunteer" },
  { href: "/get-involved#host-event", label: "Host an Event" },
];

function FooterHeading({ children }: { children: string }) {
  return (
    <h3 className="text-xs font-bold tracking-widest text-brand-gold">{children}</h3>
  );
}

function FooterLinkList({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-sm text-white/70 hover:text-white">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-purple-dark text-white">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-10 py-14 sm:grid-cols-3 lg:grid-cols-7">
        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <div className="inline-block rounded-lg bg-white p-2">
            <Image
              src="/logo.png"
              alt="ABIT Community Development Group"
              width={140}
              height={70}
              unoptimized
              className="h-10 w-auto"
            />
          </div>
          <p className="mt-4 font-display text-lg leading-snug">
            <span className="block">Empowering Girls.</span>
            <span className="block text-brand-gold">Building Leaders.</span>
            <span className="block text-brand-teal">Transforming Communities.</span>
          </p>
        </div>

        <div>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLinkList links={QUICK_LINKS} />
        </div>

        <div>
          <FooterHeading>Programs</FooterHeading>
          <FooterLinkList links={PROGRAM_LINKS} />
        </div>

        <div>
          <FooterHeading>Get Involved</FooterHeading>
          <FooterLinkList links={GET_INVOLVED_LINKS} />
        </div>

        <div>
          <FooterHeading>Contact Us</FooterHeading>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <IconPhone className="h-4 w-4 shrink-0 text-brand-gold" />
              <a href="tel:+18035093487" className="hover:text-white">
                (803) 509-3487
              </a>
            </li>
            <li className="flex items-start gap-2">
              <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
              <a
                href="mailto:abitcommunity@gmail.com"
                className="break-all hover:text-white"
              >
                abitcommunity@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <IconPin className="h-4 w-4 shrink-0 text-brand-gold" />
              Columbia, SC
            </li>
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <FooterHeading>Stay Connected</FooterHeading>
          <div className="mt-4 flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ABIT on Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold text-brand-purple-dark"
            >
              <IconFacebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ABIT on Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold text-brand-purple-dark"
            >
              <IconInstagram className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ABIT on LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold text-brand-purple-dark"
            >
              <IconLinkedin className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-5 text-xs font-bold tracking-wide text-white/70">
            Subscribe to our newsletter
          </p>
          <div className="mt-2 flex max-w-xs overflow-hidden rounded-lg">
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email address"
              className="w-0 min-w-0 flex-1 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none"
            />
            <button
              type="button"
              className="shrink-0 bg-brand-teal px-4 text-xs font-bold tracking-wide text-white hover:bg-brand-teal/90"
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container>
          <p className="text-center text-xs text-white/60">
            © {new Date().getFullYear()} ABIT Community Development Group. All Rights
            Reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
