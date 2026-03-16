import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AOS Root Cause — Investigation Tickets",
  description: "Root cause decision tree, taxonomy reference, and component dictionary for AOS investigation tickets.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
