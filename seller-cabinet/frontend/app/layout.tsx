import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seller Panel",
  description: "Seller Panel frontend mock interface",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
