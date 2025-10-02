import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import Providers from "@/components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Ping Panda | track your events",
  description: "Created using jStack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${eb_garamond.variable} ${inter.variable} bg-brand-50 text-brand-950 antialiased min-h-[calc(100dvh-1px)] flex flex-col`}
        >
          <main className="relative flex-1 flex flex-col">
            <Providers>{children}</Providers>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
