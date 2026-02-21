import type { Metadata } from "next";
import { playfairDisplay, inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "HBD",
  description: "A bouquet of lilies, and something hidden beneath",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#EDE7FF]">{children}</body>
    </html>
  );
}
