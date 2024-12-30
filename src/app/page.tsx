import { auth, } from "@/auth";
import BreadCrumb from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Command, CommandIcon } from "lucide-react";
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";


export default async function HomePage() {
  const session = await auth();
  if (!session) return <>
    <div className=" flex flex-row items-center gap-x-2 justify-center mt-20">
      <h2 className=" sm:text-xl md:text-2xl lg:text-6xl ">Welcome to Nihongo Gakkou </h2>
      <Command className=" sm:size-5 " />
    </div>
    <h2 className=" text-base sm:text-lg md:text-2xl text-center">Web Belajar Bahasa Jepang dengan Latihan dan TryOut!  </h2>
    <div className=" pt-10 mx-10 lg:pt-20 grid grid-cols-2 gap-y-4 lg:grid-cols-4 gap-x-4 text-black [&>*]:rounded-xl [&>*]:bg-slate-200 [&>*]:h-28 [&>*]:lg:h-40 [&>*]:lg:text-4xl text-2xl [&>*]:text-center [&>*]:p-2 [&>*]:lg:p-8">
      <div>
        <h2 >文字語彙</h2>
        <h4>Moji Goi</h4>
      </div>
      <div>
        <h2 >文法</h2>
        <h4>Bunpou</h4>
      </div>
      <div>
        <h2 >聴解</h2>
        <h4>Choukai</h4>
      </div><div>
        <h2 >読解</h2>
        <h4>Dokkai</h4>
      </div>

    </div>

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
