import type { ReactNode } from "react";

type Color = "purple" | "teal" | "gold";

const colorClasses: Record<Color, string> = {
  purple: "bg-brand-purple text-white",
  teal: "bg-brand-teal text-white",
  gold: "bg-brand-gold text-brand-purple-dark",
};

export function IconBadge({
  icon,
  color = "purple",
  size = "md",
  className = "",
}: {
  icon: ReactNode;
  color?: Color;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "h-10 w-10 [&>svg]:h-5 [&>svg]:w-5",
    md: "h-14 w-14 [&>svg]:h-7 [&>svg]:w-7",
    lg: "h-16 w-16 [&>svg]:h-8 [&>svg]:w-8",
  }[size];

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full ${colorClasses[color]} ${sizeClasses} ${className}`}
    >
      {icon}
    </div>
  );
}
