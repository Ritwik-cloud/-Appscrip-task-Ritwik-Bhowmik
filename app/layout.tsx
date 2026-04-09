import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mettamuse | Discover Our Products",
    template: "%s | Mettamuse",
  },
  description:
    "Browse Mettamuse's curated collection of men's clothing, women's clothing, jewellery and electronics. Sign in to unlock exclusive pricing.",
  keywords: [
    "mettamuse",
    "clothing",
    "jewellery",
    "electronics",
    "fashion",
    "online shopping",
  ],
  authors: [{ name: "Mettamuse" }],
  openGraph: {
    title: "Mettamuse | Discover Our Products",
    description:
      "Browse Mettamuse's curated collection of men's clothing, women's clothing, jewellery and electronics.",
    url: "https://appscrip-task-ritwik-bhowmik.vercel.app",
    siteName: "Mettamuse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mettamuse | Discover Our Products",
    description:
      "Browse Mettamuse's curated collection of men's clothing, women's clothing, jewellery and electronics.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}