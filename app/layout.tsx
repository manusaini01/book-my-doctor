import './globals.css';
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"

import { Analytics } from '@vercel/analytics/react';


export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description: 'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.',
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  openGraph: {
    title: 'Next.js App Router + NextAuth + Tailwind CSS',
    description: 'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.',
    url: 'https://your-domain.com', // Replace with your actual domain
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg', // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: 'Open Graph Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js App Router + NextAuth + Tailwind CSS',
    description: 'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.',
    images: [
      'https://your-domain.com/twitter-image.jpg', // Replace with your actual image URL
    ],
  },
};


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>{children}</body>
      <Analytics />
    </html>
  );
}
