import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SELETICA | Premium 10-Piece Limited Edition Fashion",
  description:
    "Quiet Luxury. Modern Elegance. Every SELETICA piece is limited to 10 editions worldwide and tailored to your exact anatomical measurements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-brand-black text-brand-white">
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}