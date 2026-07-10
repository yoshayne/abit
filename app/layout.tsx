import type { Metadata } from "next";
import { Dancing_Script, Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-script",
});

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
      <body
        className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} font-sans`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
