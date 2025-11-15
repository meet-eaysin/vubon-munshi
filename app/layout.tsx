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
          <div id="home" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(23,23,23,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(23,23,23,0.4)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] h-full mt-[63px]" />
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
