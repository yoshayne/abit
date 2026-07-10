"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/mentors", label: "Mentors" },
  { href: "/admin/enrollments", label: "Enrollments" },
  { href: "/admin/volunteers", label: "Volunteers" },
  { href: "/admin/partners", label: "Partners" },
  { href: "/admin/contacts", label: "Contacts" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/news", label: "News" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-1">
      {NAV_LINKS.map((link) => {
        const isActive =
          link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
              isActive
                ? "bg-white/15 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
