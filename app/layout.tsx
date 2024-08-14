import './globals.css';
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"

import { Analytics } from '@vercel/analytics/react';


export const metadata = {
  title: 'Book a Dentist Online | Top Dental Care & Appointments Near You',
  description: 'Find and book a trusted dentist online for all your dental care needs. Easy scheduling, verified reviews, and top-rated professionals near you. Your smile deserves the best!',
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  openGraph: {
    title: 'Book a Dentist Online | Top Dental Care & Appointments Near You',
    description: 'Find and book a trusted dentist online for all your dental care needs. Easy scheduling, verified reviews, and top-rated professionals near you. Your smile deserves the best!',
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
