import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Pirate Friend",
  description:
    "The easiest, simpliest and most straightforward AARRR metrics tracker for techs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
