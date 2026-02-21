import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Papatya Taksi - Çayırova / Kocaeli",
  description: "Papatya Taksi - 7/24 Hizmetinizdeyiz. Emek, Çayırova/Kocaeli. Güvenli ve konforlu ulaşım hizmeti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
