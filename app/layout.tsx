import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Kenmark ITan Solutions - AI Chatbot",
  description: "AI-powered chatbot for Kenmark ITan Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
        <NavBar />

        <main>{children}</main>

        <footer className="mt-12 border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 backdrop-blur">
          <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span>Kenmark ITan Solutions · AI Assistant</span>
            <div className="flex gap-10">
              <Link href="/chat" className="hover:text-primary-600 dark:hover:text-primary-300">
                Chat
              </Link>
              <Link href="/admin" className="hover:text-primary-600 dark:hover:text-primary-300">
                Upload
              </Link>
              <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-300">
                Home
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

