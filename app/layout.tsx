import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from './components/SessionProvider'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BriefBuzz",
  description: "Your daily news fix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
      <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
