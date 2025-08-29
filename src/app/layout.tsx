import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollPreventionOnLoad from "@/components/ScrollPreventionOnLoad";

// Suppress hydration warnings caused by browser extensions
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (args[0]?.includes?.('A tree hydrated but some attributes of the server rendered HTML didn\'t match the client properties')) {
      return;
    }
    if (args[0]?.includes?.('cz-shortcut-listen')) {
      return;
    }
    originalError.call(console, ...args);
  };
}

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3002'),
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
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} data-theme="dark">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <ScrollPreventionOnLoad />
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
}

// Trigger Vercel deploy - Thu, Aug 14, 2025  6:32:08 PM
