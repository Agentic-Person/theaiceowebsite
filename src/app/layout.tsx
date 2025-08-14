import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "The AI CEO - Custom AI Solutions for SMBs",
  description: "Stop fighting with generic AI tools. Get custom AI that actually understands your business - without the enterprise price tag. Free assessment available.",
  keywords: "AI consulting, small business AI, custom AI solutions, AI implementation, SMB automation",
  authors: [{ name: "The AI CEO" }],
  creator: "The AI CEO",
  publisher: "The AI CEO",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theaiceo.ai",
    siteName: "The AI CEO",
    title: "The AI CEO - Custom AI Solutions for SMBs",
    description: "Stop fighting with generic AI tools. Get custom AI that actually understands your business - without the enterprise price tag.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The AI CEO - Custom AI Solutions for SMBs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The AI CEO - Custom AI Solutions for SMBs",
    description: "Stop fighting with generic AI tools. Get custom AI that actually understands your business - without the enterprise price tag.",
    images: ["/og-image.jpg"],
    creator: "@theaiceo",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} data-theme="dark">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}// Trigger Vercel deploy - Thu, Aug 14, 2025  6:32:08 PM
