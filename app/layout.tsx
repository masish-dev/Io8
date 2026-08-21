import type { Metadata } from "next";
import "./globals.css";
import ThemeEditor from "./ThemeEditor";

export const metadata: Metadata = {
  title: "Io8 — Private Members' Circle",
  description: "A private members' circle for India's most established founders, families and investors.",
  authors: [{ name: "MaSiSh" }],
  creator: "MaSiSh",
  openGraph: { title: "Io8 — Private Members' Circle", description: "For families who build what outlives them.", type: "website" },
};

// Designed and crafted by MaSiSh.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="momo" data-font="syne"><body><ThemeEditor />{children}</body></html>;
}
