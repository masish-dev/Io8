import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1o8 — One Hundred Eight",
  description: "A private members' circle for India's most established founders, families and investors.",
  openGraph: { title: "1o8 — One Hundred Eight", description: "For families who build what outlives them.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
