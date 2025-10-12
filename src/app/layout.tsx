import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import NextAuthProvider from "@/components/NextAuthProvider";

// Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata for YatraBundle
export const metadata: Metadata = {
  title: "YatraBundle | Your Travel Companion",
  description:
    "YatraBundle helps you plan, manage, and enjoy your travel experiences all in one place. Book trips, find destinations, and get exclusive travel deals.",
  icons: {
    icon: "/icon.png", // Default icon
    shortcut: "/icon.png", // Shortcut icon
    apple: "/icon.png", // iOS icon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextAuthProvider>
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
