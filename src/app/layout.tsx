import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "zobun - youtube to mp3 & mp4 converter",
  description: "convert youtube videos to mp3, mp4, webm & more. clean, fast, and free youtube downloader with support for all quality levels.",
  icons: {
    icon: "/zobun2.png",
    shortcut: "/zobun2.png",
    apple: "/zobun2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
