import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";

import "./globals.css";

import { DialogProvider } from "@/providers/dialog-provider";
import { SessionProvider } from "next-auth/react";

import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner";
import { ActiveStatus } from "@/components/base/chat/active-status";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Oladoc: Find the Best Doctors Near You",
    template: "%s | Oladoc",
  },
  description: "Find the best doctors near you and book an appointment.",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    images: [
      {
        url: "https://oladoc.vercel.app/images/opengraph-image.png",
        alt: "Oladoc: Find the Best Doctors Near You",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          lexend.variable,
          inter.variable,
        )}
      >
        <Toaster />
        <DialogProvider />
        <ActiveStatus />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
