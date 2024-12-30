import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster";
import { SidebarInset, SidebarProvider, } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { NavigationMenuDemo } from "@/components/custom/navigation-menu";
import { Command } from "lucide-react";
import Link from "next/link";
import { TooltipProvider } from "@/components/ui/tooltip";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nihongo Gakkou",
  description: "Belajar bahasa Jepang 100% gratis!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {session ? <>
              <SidebarProvider>
                <TooltipProvider>
                  <AppSidebar />
                  <SidebarInset>
                    {children}
                  </SidebarInset>
                </TooltipProvider>
              </SidebarProvider>
            </> : <>
              <div className="my-6 mx-4 md:mx-4 lg:mx-8 xl:mx-16">
                <div className=" flex flex-row justify-between mb-8">
                  <Link href={"/"}>
                    <div className="flex flex-row gap-x-2 items-center">
                      <Command className="size-8 md:size-12 lg:size-18" />
                      <h1 className=" text-sm md:text-base lg:text-2xl xl:text-3xl">NIHONGO GAKKOU</h1>
                    </div>
                  </Link>
                  <NavigationMenuDemo />
                </div>
                {children}
              </div></>}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
