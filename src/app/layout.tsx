import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatGPT Clone",
  description: "A clone of the ChatGPT interface built with Next.js, React, and Tailwind CSS",
  icons: {
    icon: '/favicon.ico',
  },
  authors: [
    {
      name: "ChatGPT Clone Creator",
    },
  ],
  openGraph: {
    title: "ChatGPT Clone",
    description: "A clone of the ChatGPT interface built with Next.js, React, and Tailwind CSS",
    url: 'https://chatgpt-clone.example.com',
    siteName: 'ChatGPT Clone',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-zinc-900 text-zinc-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
