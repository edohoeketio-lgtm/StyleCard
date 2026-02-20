import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StyleCard (Screenshot Edition)",
  description: "Extract the Style DNA of any website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans flex flex-col min-h-screen relative bg-background overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
