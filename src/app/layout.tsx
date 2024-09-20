import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxLayout from "@/components/ReduxLayout";
import Provider from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Good Reads",
  description: "Good Reads",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${inter.className} bg-primary`}>{children}</body>
      </Provider>
    </html>
  );
}
