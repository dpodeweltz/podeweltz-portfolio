import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/dark-mode-fix.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ThemeProvider from "@/components/ThemeProvider";

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "David Podeweltz | Portfolio",
  description:
    "Personal portfolio showcasing my work as a Full Stack Developer & UX Designer",
  authors: [{ name: "David Podeweltz" }],
};

// Define viewport separately according to Next.js warnings
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#111827"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
