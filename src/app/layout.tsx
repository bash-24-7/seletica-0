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
  title: "SELETICA | Premium Limited Edition Fashion",
  description: "Quiet Luxury. Modern Elegance. Timeless Fashion. Discover SELETICA's limited edition collections for men and women.",
};

import Script from "next/script";
import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-foreground selection:text-background">
        {!isAdmin && <Navigation />}
        <main className="flex-grow">
          {children}
        </main>
        {!isAdmin && <Footer />}
        {process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID && !isAdmin && (
          <Script id="crisp-chat" strategy="afterInteractive">
            {`
              window.$crisp=[];
              window.CRISP_WEBSITE_ID="${process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID}";
              (function(){
                d=document;s=d.createElement("script");
                s.src="https://client.crisp.chat/l.js";
                s.async=1;d.getElementsByTagName("head")[0].appendChild(s);
              })();
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
