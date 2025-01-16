import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Idea Suggestion Chatbot",
  description: "Developed y ANchal Raj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
          {children}
      </body>
    </html>
  );
}
