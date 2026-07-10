import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "purple" | "teal" | "white" | "gold";
type Shape = "pill" | "rounded";

const variantClasses: Record<Variant, string> = {
  purple: "bg-brand-purple text-white hover:bg-brand-purple-dark",
  teal: "bg-brand-teal text-white hover:bg-brand-teal/90",
  white: "bg-white text-brand-purple hover:bg-white/90",
  gold: "bg-brand-gold text-brand-purple-dark hover:bg-brand-gold/90",
};

const shapeClasses: Record<Shape, string> = {
  pill: "rounded-full",
  rounded: "rounded-lg",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  shape?: Shape;
  icon?: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  type?: never;
  onClick?: never;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseClasses =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export function Button({
  children,
  variant = "purple",
  shape = "pill",
  icon,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${shapeClasses[shape]} ${className}`;

  if ("href" in rest && rest.href) {
    return (
      <Link href={rest.href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = rest as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {icon}
      {children}
    </button>
  );
}
