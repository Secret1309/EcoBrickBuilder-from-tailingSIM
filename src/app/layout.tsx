import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eco-Brick Simulator: Green Infrastructure | GSC 2026",
  description:
    "Platform simulasi eco-brick berbasis limbah tailing untuk infrastruktur hijau berkelanjutan. Inovasi generasi muda mendorong transformasi pembangunan berbasis SDGs menuju Indonesia Hijau — Green Scientific Competition 2026, EneRC Fakultas Teknik ITB.",
  keywords: ["BUMDes", "Eco-Brick", "Tailing HPAL", "Nikel Laterit", "Geopolimer", "Ekonomi Sirkular", "Infrastruktur Hijau", "GSC 2026", "ITB"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
