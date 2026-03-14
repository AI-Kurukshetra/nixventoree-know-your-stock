import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nixventoree",
  description: "Nixventoree - Know your stock. Control your orders."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}