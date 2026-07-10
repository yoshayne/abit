import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABIT Community Development Group",
  description:
    "Empowering girls from underserved communities to build the confidence, life skills, and leadership they need to succeed in school, at home, and in life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
