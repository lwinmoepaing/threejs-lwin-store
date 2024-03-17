import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { titleFont } from "@/util/fontLoader";
import "./globals.css";
import Toast from "@/components/Toast/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "💯 Lwin Store",
  description: "Just Simple Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toast />
      </body>
    </html>
  );
}
