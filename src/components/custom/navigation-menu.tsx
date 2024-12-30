"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { GoogleSignin } from "../google-signin"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Material",
        href: "/material",
        description:
            "Materi-materi N5-N1 yang telah disusun agar mudah dipelajari!",
    },
    {
        title: "Pengayaan",
        href: "/enrichment",
        description:
            "Pengetahuan tentang kebudayaan Jepang.",
    },
    {
        title: "Renshuu",
        href: "/practice",
        description:
            "Latihan soal JLPT tahun-tahun sebelumnya.",
    },
    {
        title: "Shiken",
        href: "/exam",
        description: "Try Out JLPT supaya kamu siap mengahadi Ujian sesungguhnya.",
    },
]

export function NavigationMenuDemo() {
    return (
        <NavigationMenu>
            <NavigationMenuList className=" gap-x-[2px] md:gap-x-3">
                <NavigationMenuItem className=" hidden md:block">
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className=" hidden md:block">
                    <NavigationMenuTrigger>Project Lain</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        {/* <Icons.logo className="h-6 w-6" /> */}
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            Ocinz
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Checkout other project!
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/" title="Nihongo Gakkou">
                                Belajar bahasa Jepang 100% gratis!
                            </ListItem>
                            <ListItem href="https://dqlab-ml.ocinz.tech" title="Machine Learning">
                                Pelajari cara membuat model Machine Learning.
                            </ListItem>
                            <ListItem href="/about" title="About">
                                Mari saling berkenalan!
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="">
                    <Link href="/material" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Materi Pelajaran
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className=" hidden md:block">
                    <Link href="/enrichment" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Pengayaan
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <GoogleSignin />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
