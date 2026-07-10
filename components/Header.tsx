"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./Button";
import { Container } from "./Container";
import { IconClose, IconHeart, IconMenu } from "./icons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="ABIT Community Development Group"
            width={168}
            height={84}
            priority
            unoptimized
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold tracking-widest ${
                  isActive
                    ? "border-b-2 border-brand-gold pb-1 text-brand-purple"
                    : "text-brand-purple-dark/80 hover:text-brand-purple"
                }`}
              >
                {link.label.toUpperCase()}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/donate" variant="purple" icon={<IconHeart className="h-4 w-4" />}>
            Donate
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-brand-purple lg:hidden"
        >
          {open ? <IconClose className="h-7 w-7" /> : <IconMenu className="h-7 w-7" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-black/5 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-bold tracking-wide ${
                    isActive
                      ? "bg-brand-purple/5 text-brand-purple"
                      : "text-brand-purple-dark/80"
                  }`}
                >
                  {link.label.toUpperCase()}
                </Link>
              );
            })}
            <Button
              href="/donate"
              variant="purple"
              icon={<IconHeart className="h-4 w-4" />}
              className="mt-3 w-full"
            >
              Donate
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
