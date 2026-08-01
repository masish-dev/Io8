import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Io8 — Private Members' Circle",
  description: "A private members' circle for India's most established founders, families and investors.",
  openGraph: { title: "Io8 — Private Members' Circle", description: "For families who build what outlives them.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
