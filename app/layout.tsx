import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/query-provider";
import Navbar from "@/components/marketing/navbar";
import Footer from "@/components/marketing/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "With Shakil Sir - Learn with Experts",
  description: "Online learning platform for Bangladeshi students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <QueryProvider>
          <div id="home" className="absolute inset-0 h-full mt-[63px]" />
          <Navbar />
          <main className="mx-auto w-full z-40 relative">
            {children}
          </main>
          <Footer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
