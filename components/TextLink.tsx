import Link from "next/link";
import type { ReactNode } from "react";
import { IconChevronRight } from "./icons";

type Color = "purple" | "teal" | "gold";

const colorClasses: Record<Color, string> = {
  purple: "text-brand-purple hover:text-brand-purple-dark",
  teal: "text-brand-teal hover:text-brand-teal/80",
  gold: "text-brand-gold hover:text-brand-gold/80",
};

export function TextLink({
  href,
  color = "purple",
  children,
  className = "",
}: {
  href: string;
  color?: Color;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 text-sm font-bold tracking-wide ${colorClasses[color]} ${className}`}
    >
      {children}
      <IconChevronRight className="h-3.5 w-3.5" />
    </Link>
  );
}
