import { auth, } from "@/auth";
import BreadCrumb from "@/components/breadcrumb";
// import { GoogleSignin } from "@/components/google-signin";
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Command, CommandIcon } from "lucide-react";
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import Link from "next/link";


export default async function HomePage() {
  const session = await auth();
  if (!session) return <>
    <div className=" flex flex-row items-center gap-x-2 justify-center mt-20">
      <h2 className=" text-6xl ">Welcome to Nihongo Gakkou </h2>
      <Command size={40} className=" " />
    </div>
    <h2 className=" text-2xl text-center">Web Belajar Bahasa Jepang dengan Latihan dan TryOut!  </h2>

  </>;
  return (
    <main>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <BreadCrumb />
        </div>
      </header>
      <div className=" mx-8 text-center my-16">
        <div>
          <h3 className=" text-4xl inline">Selamat Datang di <span className=" text-blue-500">Nihongo</span> Gakkou <CommandIcon className="inline size-8 fill-blue-800" />!

          </h3>
          <h3 className=" text-xl text-blue-500">Sudah saatnya belajar bahasa Jepang dan meraih masa depan. 100% Gratis!</h3>
        </div>

        <div className=" mt-20 flex flex-row justify-center gap-x-4">
          <Card className="w-[400px] h-[300px]">
            <CardHeader>
              <CardTitle>Belajar Dasar dari 0</CardTitle>
              <CardDescription>Lanjut ke tab Material atau klik tombol dibawah!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row gap-x-5 justify-center">
                <Link href={"/material"}>
                  <Button className=" w-32 font-semibold">Material</Button>
                </Link>
                <Link href={"/enrichment"}>
                  <Button className=" w-32 font-semibold">Pengayaan</Button>
                </Link>
              </div>

            </CardContent>
          </Card>
          <Card className="w-[400px] h-[300px]">
            <CardHeader>
              <CardTitle>練習をしましょう!!</CardTitle>
              <CardDescription>Langsung Renshuu atau coba Shiken!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row gap-x-5 justify-center">
                <Link href={"/practice"}
                >
                  <Button className=" w-32 font-semibold">Renshuu</Button>
                </Link>
                <Link href={"/exam"}>
                  <Button className=" w-32 font-semibold">Shiken</Button>
                </Link>
              </div>
            </CardContent>

          </Card>
        </div>

      </div>
    </main>
  );
};
