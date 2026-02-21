import { Playfair_Display, Inter } from "next/font/google";

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
