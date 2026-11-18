import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Caveat, Cormorant_Garamond, Jost } from "next/font/google";
import { profile } from "@/content/portfolio";
import { theme, themeCssVars } from "@/lib/theme";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.firstName}, ${profile.job}`,
  description: profile.intro,
  openGraph: {
    title: `${profile.firstName}, ${profile.job}`,
    description: profile.intro,
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: theme.bg,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${serif.variable} ${sans.variable} ${hand.variable}`}
      style={themeCssVars(theme)}
    >
      <body>{children}</body>
    </html>
  );
}
